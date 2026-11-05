import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

/**
 * What the root layout's client code can reach by static import, because it ships with every one of the ~27,000 pages.
 *
 * Roadmap row 140: on a 1.6 Mbps connection the header took about seven seconds to respond. The layout's chrome (the
 * palette, the header, the language strip) had, through chains of ordinary imports, pulled in the whole set of
 * animated schematics (about 2 MB of source under src/data), the structure index, all eight chrome dictionaries, zod
 * through src/lib/schema.ts and MiniSearch: about 3.1 MB of source and a 1.3 MB script on every page. Those are now
 * dynamic imports or split modules (src/lib/kinds.ts, src/lib/i18n/dict-store.ts, src/lib/search-client.ts,
 * MoleculeThumb, Wireframe3D). This test walks the static import graph from src/app/layout.tsx (dynamic `import()`
 * is not followed) and fails if any of them come back, or if the reachable source grows past a budget.
 */
const ROOT = resolve(__dirname, "../..");
const EXTS = [".ts", ".tsx", ".js", ".mjs", ".json"];

function resolveSpec(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(from), spec);
  else return null;
  if (existsSync(base) && statSync(base).isFile()) return base;
  for (const e of EXTS) if (existsSync(base + e)) return base + e;
  for (const e of EXTS) if (existsSync(join(base, "index" + e))) return join(base, "index" + e);
  return null;
}

/** Static imports (not `import type`, not `import()`) of a module. */
function staticImports(src: string): string[] {
  const stripped = src.replace(/import\(\s*["'][^"']+["']\s*\)/g, "");
  const specs: string[] = [];
  for (const m of stripped.matchAll(/^\s*import\s+(type\s+)?[^'"]*?from\s+["']([^"']+)["']/gm)) if (!m[1]) specs.push(m[2]);
  for (const m of stripped.matchAll(/^\s*import\s+["']([^"']+)["']/gm)) specs.push(m[1]);
  for (const m of stripped.matchAll(/^\s*export\s+(type\s+)?(?:\*|\{[^}]*\})\s+from\s+["']([^"']+)["']/gm)) if (!m[1]) specs.push(m[2]);
  return specs;
}

export function walkStatic(entry: string): { files: Map<string, { size: number; importers: Set<string> }>; packages: Set<string> } {
  const files = new Map<string, { size: number; importers: Set<string> }>();
  const packages = new Set<string>();
  const queue = [entry];
  files.set(entry, { size: statSync(entry).size, importers: new Set() });
  while (queue.length) {
    const f = queue.shift()!;
    if (f.endsWith(".json") || f.endsWith(".css")) continue;
    for (const spec of staticImports(readFileSync(f, "utf8"))) {
      const r = resolveSpec(f, spec);
      if (!r) { if (!spec.startsWith(".")) packages.add(spec.split("/")[0].startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]); continue; }
      if (!files.has(r)) { files.set(r, { size: statSync(r).size, importers: new Set() }); queue.push(r); }
      files.get(r)!.importers.add(relative(ROOT, f));
    }
  }
  return { files, packages };
}

const rel = (f: string) => relative(ROOT, f);

describe("root layout static imports", () => {
  const { files, packages } = walkStatic(join(ROOT, "src/app/layout.tsx"));
  const reached = [...files.keys()].map(rel);
  const why = (pattern: RegExp) => reached.filter((f) => pattern.test(f)).map((f) => `${f} <- ${[...files.get(join(ROOT, f))!.importers].join(", ")}`).join("\n");

  it("does not reach the graph, the data files or the structure index", () => {
    // No exceptions. src/lib/region.tsx used to take REGION_META from src/data/regional-approvals.ts, which put the whole
    // approvals table (94 KB of source, growing with every data round) in this count; the seven regulator rows now live
    // in src/lib/region-meta.ts and the approvals file re-exports them. A layout-level component that needs something
    // from a data file takes it from a small module of its own, never from the data file.
    const data = reached.filter((f) => f.startsWith("src/data/"));
    expect(data, why(/^src\/data\//)).toEqual([]);
    expect(reached, why(/graph\.ts$/)).not.toContain("src/lib/graph.ts");
    expect(reached.filter((f) => f.startsWith("public/")), why(/^public\//)).toEqual([]);
  });

  it("loads the chrome dictionaries per language, not all at once", () => {
    const dicts = reached.filter((f) => /^src\/lib\/i18n\/(ui|nav)\//.test(f) || f === "src/lib/i18n/all.ts");
    expect(dicts, why(/^src\/lib\/i18n\/(ui|nav)\/|all\.ts$/)).toEqual([]);
  });

  it("keeps validation and search libraries out of the shared chrome", () => {
    expect([...packages]).not.toContain("zod");
    expect([...packages]).not.toContain("minisearch");
    expect(reached, why(/schema\.ts$/)).not.toContain("src/lib/schema.ts");
    expect(reached, why(/schematics\.ts$/)).not.toContain("src/data/schematics.ts");
  });

  it("stays inside a source budget", () => {
    const total = [...files.values()].reduce((a, f) => a + f.size, 0);
    const biggest = [...files].sort((a, b) => b[1].size - a[1].size).slice(0, 8).map(([f, i]) => `${i.size} ${rel(f)}`).join("\n");
    // 3,105 KB before the split (Sept 2026), about 320 KB after. November 2026: 492,673 B had crept past this budget,
    // 93.8 KB of it the regional approvals table and 58.8 KB globals.css; the table left the chain and one-page rules
    // moved beside their pages, leaving about 388 KB, so the budget leaves room for ordinary growth of the chrome.
    expect(total, `reachable source ${total} B; largest:\n${biggest}`).toBeLessThan(480 * 1024);
  });

  it("reaches no single large module", () => {
    // A file this size in the shared chrome is almost always a table or a dataset that one page needs, pulled in for a
    // label or a constant (as the 94 KB approvals table was, for seven regulator names). The largest legitimate files
    // today are globals.css and src/lib/nav.ts, both well under it. Split the small part out rather than raise this.
    const large = [...files].filter(([, i]) => i.size > 64 * 1024).map(([f, i]) => `${i.size} ${rel(f)} <- ${[...i.importers].join(", ")}`);
    expect(large).toEqual([]);
  });
});
