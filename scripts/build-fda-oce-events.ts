/**
 * FDA oncology approval notifications as dated regulatory events on the products they name.
 *
 * Reads src/data/universe-lists/fda-oncology-approvals.json (scripts/fetch-universe-regulatory.ts: every FDA Oncology Center
 * of Excellence approval notification since 1 January 2020) and writes src/data/fda-oce-events.ts, one event per
 * notification on the first product it names that OnCo holds. src/data/index.ts merges them onto the product and skips any
 * notification the record already dates (a United States approval-type event within seven days), so a hand-written event
 * always wins and nothing is doubled.
 *
 * Every event is the FDA's own sentence with its date and its notification URL. Nothing is inferred: the type is
 * "label-change" only for the notifications that are about labelling, dosing or formulation, and "approval" otherwise,
 * including accelerated approvals, whose note says so (the typed accelerated pathway comes from the FDA's own tables). A notification whose product is not in OnCo is
 * left out here and stays listed as a gap on /completeness/.
 *
 * Run after the weekly universe refresh:  npx tsx scripts/build-fda-oce-events.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { drugKeys, nameParts, norm } from "../src/lib/completeness";
import list from "../src/data/universe-lists/fda-oncology-approvals.json";

const OUT = join(process.cwd(), "src", "data", "fda-oce-events.ts");

const g = graph();
const idx = new Map<string, string[]>();
const isTest = (id: string) => /diagnostic|test|imaging/i.test((g.get(id) as { modality?: string } | undefined)?.modality ?? "");
/** Words a record's alias can carry in brackets ("Fosnetupitant and palonosetron (intravenous)") that are not names of anything. */
const GENERIC = /^(intravenous|subcutaneous|intravesical|injection|infusion|tablets?|capsules?|oral|solution|liposomal|chemotherapy|combination|generic|biosimilar|recombinant|formulation)$/;
for (const d of g.kind("drug")) for (const k of drugKeys(d)) if (!GENERIC.test(k)) idx.set(k, [...(idx.get(k) ?? []), d.id]);

/**
 * The product a key names, when several records carry it: the one whose own name is the key (mitomycin, not UGN-103 whose
 * alias mentions mitomycin), then an approved product, then a treatment before a test.
 */
function best(key: string, ids: string[]): string {
  const score = (id: string) => {
    const e = g.get(id) as { name: string; status?: string };
    return (norm(nameParts(e.name)[0] ?? e.name) === key ? 0 : 4) + (e.status === "approved" ? 0 : 2) + (isTest(id) ? 1 : 0);
  };
  return [...ids].sort((a, b) => score(a) - score(b))[0];
}
/** The key and corpus products for one name: the FDA generic with or without its four-letter suffix and salt, or a brand. */
function lookup(n?: string): { key: string; ids: string[] } {
  if (!n) return { key: "", ids: [] };
  for (const p of nameParts(n)) {
    const k = norm(p.replace(/^fam-|^ado-/i, "").replace(/[ -][a-z]{4}$/, ""));
    const k2 = k.replace(/\b(mesylate|acetate|hydrochloride|citrate|phosphate)\b/g, "").replace(/\s+/g, " ").trim();
    const key = idx.has(k) ? k : k2;
    if (idx.get(key)?.length) return { key, ids: idx.get(key)! };
  }
  return { key: "", ids: [] };
}
/**
 * The record for a notification's drug. A record named for the generic wins (Tepotinib, not "Capmatinib & tepotinib"); the
 * brand breaks the remaining ties (Jelmyto and Zusduri are the mitomycin record, not UGN-103 whose alias says mitomycin).
 */
function resolveDrug(d: { generic: string; brand?: string }): string | undefined {
  const gen = lookup(d.generic), brand = lookup(d.brand);
  const pool = [...new Set([...gen.ids, ...brand.ids])];
  if (!pool.length) return undefined;
  const score = (id: string) => {
    const e = g.get(id) as { name: string; status?: string };
    return (gen.key && norm(nameParts(e.name)[0] ?? e.name) === gen.key ? 0 : 4) + (e.status === "approved" ? 0 : 2) + (isTest(id) ? 1 : 0) - (brand.ids.includes(id) ? 1 : 0);
  };
  return pool.sort((a, b) => score(a) - score(b))[0];
}

/**
 * The subject of "FDA approved X (Brand, Sponsor) with Y": the first drug the sentence names. A product the sentence names
 * before the first bracketed one, without a bracket of its own, wins ("approved atezolizumab in combination with
 * bevacizumab (TECENTRIQ and AVASTIN ...)"); `tests` limits the scan to test records, for companion diagnostic notices.
 */
function subject(drugs: Array<{ generic: string; brand?: string }>, text: string, tests = false): string | undefined {
  const t = ` ${norm(text)} `;
  let pick: string | undefined, at = Infinity;
  if (!tests) for (const d of drugs) {
    const id = resolveDrug(d);
    if (!id) continue;
    const i = Math.min(...[d.generic, d.brand].filter(Boolean).map((n) => t.indexOf(` ${norm(n!)} `)).map((i) => (i < 0 ? Infinity : i)));
    if (i < at || pick === undefined) { at = i; pick = id; }
  }
  // Drugs were named and none is in OnCo: the notification is about a product OnCo lacks, not about one it mentions in passing.
  if (!tests && drugs.length && !pick) return undefined;
  for (const [k, ids] of idx) {
    if (k.length < 6) continue;
    const i = t.indexOf(` ${k} `);
    if (i < 0 || i + k.length + 1 > at) continue;
    const pool = ids.filter((x) => tests === isTest(x));
    if (!pool.length) continue;
    // For a test, the whole record name must be in the sentence: "FoundationOne Liquid CDx" is not "FoundationOne CDx".
    const cand = best(k, pool);
    if (tests && !t.includes(` ${norm((g.get(cand) as { name: string }).name)} `)) continue;
    if (i < at) { at = i; pick = cand; }
  }
  return pick;
}

/** "On July 9, 2026, the Food and Drug Administration approved X ..." -> "FDA approved X ...". */
function note(text: string): string {
  return text
    .replace(/^On\s+\w+\s+\d{1,2},\s*\d{4},?\s+/i, "")
    .replace(/^(?:the\s+)?(?:U\.S\.\s+)?Food and Drug Administration(?:\s*\(FDA\))?\s+/i, "FDA ")
    .replace(/\.:\s*\w+$/, ".")
    .replace(/[®™]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
/**
 * "accelerated-approval" events come only from the FDA's own accelerated-approval tables (scripts/fetch-accelerated.ts),
 * which pair each grant with its conversion or withdrawal and feed the confirmation rate. A notification that announces an
 * accelerated approval is written as an "approval" whose note says so in the FDA's words, so it never adds an unpaired grant.
 */
function type(it: { title: string; text: string; accelerated: boolean }): "approval" | "label-change" {
  if (/\b(labeling|labelling|dosing regimen|new dosing|formulation|safety labeling|Project Renewal)\b/i.test(it.title)) return "label-change";
  return "approval";
}
const indication = (title: string) => title.match(/\s(?:for|as)\s+(.+)$/i)?.[1]?.trim();

type Ev = { date: string; type: string; region: "US"; note: string; source: string; indication?: string };
const out: Record<string, Ev[]> = {};
const skipped: string[] = [];
for (const it of list.items) {
  // A notification about a companion diagnostic belongs on the test, not on the drug it selects for.
  const cdxNotice = /companion diagnostic/i.test(it.title);
  const id = subject(it.drugs, note(it.text), cdxNotice) ?? (cdxNotice || it.drugs.length ? undefined : subject([], it.title));
  if (!id) { skipped.push(`${it.date} ${it.title}`); continue; }
  const ind = indication(it.title);
  (out[id] ??= []).push({ date: it.date, type: type(it), region: "US", note: note(it.text), source: it.url, ...(ind ? { indication: ind } : {}) });
}
const ids = Object.keys(out).sort();
const body = ids.map((id) => `  ${JSON.stringify(id)}: [\n${out[id].sort((a, b) => a.date.localeCompare(b.date)).map((e) => `    ${JSON.stringify(e)},`).join("\n")}\n  ],`).join("\n");
writeFileSync(OUT, `/**
 * FDA oncology approval notifications since 1 January 2020 as dated United States regulatory events, keyed by product id.
 * Generated by scripts/build-fda-oce-events.ts from src/data/universe-lists/fda-oncology-approvals.json (read ${list.checked});
 * do not edit by hand. Each note is the first sentence of the FDA notification at \`source\`, from "FDA" onwards, and
 * \`indication\` is the notification's title from "for" onwards. Merged in src/data/index.ts only where the product does not
 * already date the approval itself.
 */
export type FdaOceEvent = { date: string; type: "approval" | "label-change"; region: "US"; note: string; source: string; indication?: string };

export const FDA_OCE_READ_ON = ${JSON.stringify(list.checked)};

export const FDA_OCE_EVENTS: Record<string, FdaOceEvent[]> = {
${body}
};
`);
console.log(`fda-oce-events: ${list.items.length - skipped.length} notifications on ${ids.length} products; ${skipped.length} not matched:`);
for (const s of skipped) console.log(`  ${s}`);
