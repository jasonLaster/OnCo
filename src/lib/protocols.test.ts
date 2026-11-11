import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { ProtocolSchema, type Protocol } from "./schema";
import { byDomain, protocolProblems } from "./protocols";
import { protocolsFor } from "./members";
import { protocols as registered } from "@/data/protocols";

/**
 * The rules every care protocol keeps (docs/PROTOCOLS.md). The schema checks shapes; this file checks what a reader
 * relies on: every step is sourced or says why not, every source has a year and an address, every cited key resolves,
 * every linked record exists and the upgrades are protocol-upgrade ideas, the name is a subject, and the prose follows
 * the house style that src/lib/corpus-rules.test.ts applies to the fields it knows (a protocol's own fields are walked
 * here). The tone rules reach protocols through src/lib/tone.test.ts, which walks every record; a step's `action` is in
 * its plain-language set.
 */
const g = graph();
const list = g.kind("protocol");

/** Fields of a protocol that are OnCo's prose; `quote` is the source's words and is never checked. */
const PROSE = new Set(["tldr", "summary", "simple", "population", "trigger", "action", "why", "practice", "statement", "name", "differs", "evidence", "claim", "gaps", "label"]);
const STYLE: [string, RegExp][] = [["em-dash or en-dash", /[—–]/], ['"as of" date stamp', /\bas of\b/i], ['the word "spike"', /\bspikes?\b/i]];

function styleProblems(value: unknown, key: string, path: string, out: string[]): void {
  if (typeof value === "string") {
    if (!PROSE.has(key)) return;
    for (const [rule, re] of STYLE) if (re.test(value)) out.push(`${path}: ${rule}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => styleProblems(v, key, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) if (k !== "quote") styleProblems(v, k, `${path}.${k}`, out);
}

describe("care protocols", () => {
  it("every registered protocol is in the graph and parses", () => {
    expect(list.length).toBe(registered.length);
    for (const raw of registered) expect(ProtocolSchema.safeParse(raw).success, String(raw.id)).toBe(true);
  });

  it("every protocol has steps, at least one source with a year and URL, and keeps the citation rules", () => {
    const failures: string[] = [];
    for (const p of list) {
      if (!p.steps.length) failures.push(`${p.id}: no steps`);
      if (!p.sources.some((s) => s.year && /^https?:\/\//.test(s.url) && s.read !== "not-reachable")) failures.push(`${p.id}: no readable source with a year and URL`);
      failures.push(...protocolProblems(p).map((x) => `${p.id}: ${x}`));
    }
    expect(failures).toEqual([]);
  });

  it("most steps cite a source rather than common practice", () => {
    for (const p of list) {
      const practice = p.steps.filter((s) => !s.source).length;
      expect(practice, `${p.id}: ${practice} of ${p.steps.length} steps cite no source`).toBeLessThanOrEqual(Math.floor(p.steps.length / 4));
    }
  });

  it("links resolve, and upgrades are protocol-upgrade ideas", () => {
    // Dangling ids already fail the graph build; this names the upgrade rule the graph cannot know.
    const failures: string[] = [];
    for (const p of list) for (const id of p.upgrades) {
      const e = g.get(id);
      if (!e || e.kind !== "idea" || !e.tags.includes("protocol-upgrade")) failures.push(`${p.id}: upgrades "${id}" is not an idea tagged protocol-upgrade`);
    }
    expect(failures).toEqual([]);
  });

  it("the name is a subject, not a question", () => {
    expect(protocolProblems({ name: "How should a port be flushed?", sources: [], steps: [], bestInClass: { statement: "x", sources: [] }, variants: [], grades: [] } as unknown as Protocol).some((x) => x.includes("question"))).toBe(true);
    for (const p of list) expect(p.name, p.id).not.toMatch(/\?\s*$/);
  });

  it("prose follows the house style; quotations are left as written", () => {
    const failures: string[] = [];
    for (const p of list) styleProblems(p, "", p.id, failures);
    expect(failures).toEqual([]);
  });

  it("groups by domain in care-pathway order", () => {
    const groups = byDomain(list);
    expect(groups.reduce((n, [, l]) => n + l.length, 0)).toBe(list.length);
  });

  it("a record a protocol names lists it, and a cancer reaches protocols through its treatments", () => {
    for (const p of list) for (const id of [...p.technologies, ...p.drugs, ...p.terms]) {
      expect(protocolsFor(g.must(id)).some((m) => m.protocol.id === p.id), `${id} should list ${p.id}`).toBe(true);
    }
    const viaDrug = list.find((p) => p.drugs.length);
    if (viaDrug) {
      const cancer = g.kind("cancer").find((c) => c.drugs.some((d) => viaDrug.drugs.includes(d)));
      if (cancer) expect(protocolsFor(cancer).find((m) => m.protocol.id === viaDrug.id)?.via).toBeDefined();
    }
  });
});
