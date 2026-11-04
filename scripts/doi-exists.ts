/**
 * Does every DOI in the corpus exist? Network (Crossref, then the doi.org handle API), polite, cached.
 *
 * scripts/check-link-dois.ts asks Europe PMC what a DOI is and compares it with the label, but it leaves a DOI that
 * Europe PMC does not index alone, and that is exactly where a DOI that was typed rather than resolved hides. The
 * 3 November 2026 accuracy sweep found three on two pages: KEYNOTE-826 linked 10.1200/JCO.23.00810 (no such DOI;
 * the paper is 10.1200/JCO.23.00914), BEATcc and STARGLO linked Lancet article numbers that were never issued.
 *
 * This script collects every DOI written anywhere in src/data, in any form: doi.org links, `doi:` fields, `doi(...)`
 * helper calls, publisher URLs with `/doi/10....` in them, and Elsevier article numbers (PII) in Lancet and
 * article URLs, which in their punctuated form are the DOI suffix after 10.1016/. It asks Crossref for each one; on a Crossref 404 it
 * asks the doi.org handle server, which also answers for DataCite, mEDRA and the other agencies, before recording
 * the DOI as non-existent. A network failure records nothing, so the DOI is simply asked again next run.
 *
 * Writes src/data/doi-exists.json: one DOI per line, lowercase, `1` if it resolves and `0` if neither Crossref nor
 * doi.org knows it. scripts/doi-exists.test.ts reads it offline, fails on any corpus DOI recorded as `0`, and lists
 * (without failing) DOIs the file has not seen yet. A DOI's existence does not change, so known answers are reused:
 * a normal run only asks about DOIs that are new to the file.
 *
 * Run: npx tsx scripts/doi-exists.ts [--refresh] [--recheck-missing] [--report]
 *   --refresh          ask again about every DOI, not only new ones
 *   --recheck-missing  ask again about DOIs recorded as 0 (after fixing them, or if a registration was late)
 *   --report           print the non-resolving DOIs with where they are written; write nothing
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

export const CACHE = join(process.cwd(), "src", "data", "doi-exists.json");
const DATA = join(process.cwd(), "src", "data");
const UA = "OnCo accuracy sweep (+https://github.com/judegomila/OnCo)";
const CONCURRENCY = 6;
const MIN_GAP_MS = 130; // about 8 requests a second across all workers

export type DoiCache = { fetched: string; source: string; dois: Record<string, 0 | 1> };

/** Turn a raw match into a DOI: URL-decoded, query and fragment dropped, trailing punctuation and unbalanced brackets off. */
export function cleanDoi(raw: string): string | undefined {
  if (raw.includes("${")) return undefined; // a template literal building a URL, not a DOI
  if (/\.svg$/i.test(raw.split("?")[0])) return undefined; // a Zenodo, JOSS or shields badge image, not the DOI itself
  let s = raw;
  try { s = decodeURIComponent(s); } catch { /* keep as written */ }
  s = s.split("?")[0].split("#")[0].split("\\")[0].replace(/\*+$/, "");
  s = s.replace(/[.,;:)\]}]+$/, "");
  while (s.endsWith(")") && (s.match(/\)/g) ?? []).length > (s.match(/\(/g) ?? []).length) s = s.slice(0, -1);
  s = s.replace(/[.,;:]+$/, "").replace(/\/(full|abstract|pdf|epdf|full-text|fulltext)$/i, "");
  // bioRxiv and medRxiv URLs carry a version and a view after the DOI: 10.1101/2024.04.15.589472v1.full.pdf
  if (/^10\.(1101|64898)\//.test(s)) s = s.replace(/v\d+(\.(full|abstract|supplementary-material)(\.pdf)?|\.full-text)?$/i, "").replace(/\.(full|abstract)(\.pdf)?$/i, "");
  return /^10\.\d{4,9}\/\S+$/.test(s) ? s.toLowerCase() : undefined;
}

/**
 * An Elsevier article number written in its punctuated form, "S0140-6736(24)01774-4", as its DOI. The Lancet and
 * Cell sites put this form in their URLs and it is the DOI suffix after 10.1016/. The unpunctuated form in
 * ScienceDirect URLs ("S0923753422000059") is not: most Elsevier journals now have DOIs like 10.1016/j.annonc..., so
 * those are left to Crossref's alternative-id search by hand rather than guessed at here.
 */
export function piiToDoi(pii: string): string | undefined {
  const p = pii.toUpperCase();
  return /^S\d{4}-\d{3}[\dX]\(\d{2}\)\d{5}-[\dX]$/.test(p) ? `10.1016/${p}`.toLowerCase() : undefined;
}

// Old Wiley DOIs (SICI) carry angle brackets: 10.1002/1097-0142(19830201)51:3<430::AID-CNCR2820510313>3.0.CO;2-5.
// A bracketed run without a slash is part of the DOI; "</a>" after a DOI is not.
const DOI_RE = /10\.\d{4,9}\/(?:[^\s"'<>`]|<[^\s"'<>`/]*>)+/g;
const PII_RE = /(?:\/pii\/|\/PII)(S\d{4}-\d{3}[\dX]\(\d{2}\)\d{5}-[\dX])/gi;

/** Every DOI in one file's text, with the 1-based line it sits on. */
export function doisInText(text: string): Array<{ doi: string; line: number }> {
  const out: Array<{ doi: string; line: number }> = [];
  text.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(DOI_RE)) { const d = cleanDoi(m[0]); if (d) out.push({ doi: d, line: i + 1 }); }
    for (const m of line.matchAll(PII_RE)) { const d = piiToDoi(m[1]); if (d) out.push({ doi: d, line: i + 1 }); }
  });
  return out;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(ts|tsx|json)$/.test(name) && !/\.test\.tsx?$/.test(name) && p !== CACHE) files.push(p);
  }
  return files;
}

/** Every DOI written in src/data, with the places it is written (file:line, relative to the repo). */
export function corpusDois(): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const f of walk(DATA)) {
    const rel = relative(process.cwd(), f);
    for (const { doi, line } of doisInText(readFileSync(f, "utf8"))) {
      const at = out.get(doi) ?? [];
      at.push(`${rel}:${line}`);
      out.set(doi, at);
    }
  }
  return out;
}

export function readCache(): DoiCache {
  if (!existsSync(CACHE)) return { fetched: "", source: "", dois: {} };
  return JSON.parse(readFileSync(CACHE, "utf8")) as DoiCache;
}

let last = 0;
async function throttle(): Promise<void> {
  const now = Date.now();
  const at = Math.max(now, last + MIN_GAP_MS);
  last = at;
  if (at > now) await new Promise((r) => setTimeout(r, at - now));
}

/** HTTP status for a GET, retrying rate limits and server errors; -1 when the network never answered. */
async function status(url: string): Promise<number> {
  for (let attempt = 0; attempt < 4; attempt++) {
    await throttle();
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30_000) });
      await res.body?.cancel();
      if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 2000 * (attempt + 1))); continue; }
      return res.status;
    } catch { await new Promise((r) => setTimeout(r, 2000)); }
  }
  return -1;
}

const enc = (doi: string) => encodeURIComponent(doi).replace(/%2F/g, "/");

/** 1 if the DOI is registered, 0 if neither Crossref nor doi.org knows it, undefined if the network did not say. */
export async function exists(doi: string): Promise<0 | 1 | undefined> {
  const cr = await status(`https://api.crossref.org/works/${enc(doi)}`);
  if (cr === 200) return 1;
  if (cr !== 404) return undefined;
  const h = await status(`https://doi.org/api/handles/${enc(doi)}`);
  if (h === 200) return 1;
  return h === 404 ? 0 : undefined;
}

export function serialise(c: DoiCache): string {
  const keys = Object.keys(c.dois).sort();
  return `{"fetched":${JSON.stringify(c.fetched)},"source":${JSON.stringify(c.source)},\n"dois":{\n${keys.map((k) => `${JSON.stringify(k)}:${c.dois[k]}`).join(",\n")}\n}}\n`;
}

async function main() {
  const corpus = corpusDois();
  const previous = readCache().dois;
  const args = process.argv.slice(2);
  if (args.includes("--report")) {
    for (const [d, at] of corpus) if (previous[d] === 0) console.log(`${d}\n    ${at.join("\n    ")}`);
    return;
  }
  const refresh = args.includes("--refresh");
  const recheck = args.includes("--recheck-missing");
  const dois: Record<string, 0 | 1> = {};
  const todo: string[] = [];
  for (const d of corpus.keys()) {
    if (!refresh && previous[d] === 1) dois[d] = 1;
    else if (!refresh && !recheck && previous[d] === 0) dois[d] = 0;
    else todo.push(d);
  }
  console.log(`${corpus.size} DOIs in src/data; ${todo.length} to ask about`);
  let unanswered = 0;
  let next = 0;
  const worker = async () => {
    while (next < todo.length) {
      const d = todo[next++];
      const r = await exists(d);
      if (r === undefined) { unanswered++; if (previous[d] !== undefined) dois[d] = previous[d]; } else dois[d] = r;
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  const missing = Object.keys(dois).filter((d) => dois[d] === 0);
  writeFileSync(CACHE, serialise({ fetched: new Date().toISOString().slice(0, 10), source: "https://api.crossref.org/works; https://doi.org/api/handles", dois }));
  console.log(`wrote ${relative(process.cwd(), CACHE)}: ${Object.keys(dois).length} DOIs, ${missing.length} do not resolve, ${unanswered} unanswered (ask again later)`);
  for (const d of missing) console.log(`  does not resolve: ${d}  (${corpus.get(d)?.join(", ")})`);
}

if (process.argv[1]?.endsWith("doi-exists.ts")) main().catch((e) => { console.error(e); process.exit(1); });
