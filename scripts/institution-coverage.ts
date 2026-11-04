/**
 * Coverage of the institution and charity universe lists (scripts/fetch-universe-institutions.ts) by the corpus.
 *
 * A list item counts as held when its name agrees with the name or an alias of an institution record or of a company
 * record (charities are held as either: most as institutions with institutionType "consortium", some as companies
 * with companyType "nonprofit"), or when its website host equals the record's. Names are compared after lower-casing,
 * dropping apostrophes and diacritics, expanding the IRS's abbreviations (FDN, CTR, INST, RES ...) and dropping a
 * leading "the" and a trailing corporate suffix; two names agree when equal, or when the longer begins or ends with
 * the shorter and the shorter has at least 12 characters (two words when it begins the longer; three when it ends it, and not
 * a description such as "institute for cancer research").
 *
 * /completeness/ does not show these lists yet: src/lib/completeness.ts would need a resolver that also reads company
 * records, and that file decides what the page shows (a product change for the owner).
 *
 *   npx tsx scripts/institution-coverage.ts                    every list, one line each
 *   npx tsx scripts/institution-coverage.ts irs-cancer-charities [--all]   one list, with the missing items in rank order
 *   npx tsx scripts/institution-coverage.ts --json             machine-readable
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { host, norm } from "../src/lib/completeness";

export const LISTS = ["irs-cancer-charities", "ccew-cancer-charities", "aaci-members", "cog-members", "ncg-members", "uicc-member-directory", "mhlw-cancer-hospitals"] as const;

const ABBR: Array<[RegExp, string]> = [[/\bfdn\b|\bfndn\b|\bfound\b/g, "foundation"], [/\bctr\b/g, "center"], [/\binst\b/g, "institute"], [/\bres\b/g, "research"], [/\bassn\b|\bassoc\b/g, "association"], [/\bintl\b/g, "international"], [/\bnatl\b/g, "national"], [/\bsoc\b/g, "society"], [/\bhosp\b/g, "hospital"], [/\bchildrens\b/g, "children s"], [/\bst\b/g, "saint"], [/\bcentre\b/g, "center"]];
const SUFFIX = /\s+(inc|incorporated|ltd|limited|llc|corp|corporation|co|cio|charitable incorporated organisation|us ltd|usa)$/;

export function key(s: string): string {
  let n = norm(s.replace(/['’`]/g, ""));
  for (const [re, r] of ABBR) n = n.replace(re, r);
  n = n.replace(/^the\s+/, "");
  for (let i = 0; i < 2; i++) n = n.replace(SUFFIX, "");
  return n.replace(/\s+/g, " ").trim();
}
/** Keys for a set of names: each whole, without its bracketed part, and each bracketed part and " / "-separated part.
 * Commas are not split on: "AIIMS, New Delhi" would otherwise yield the key "new delhi". */
function keysOf(names: string[]): string[] {
  const parts = names.flatMap((n) => [n, n.replace(/\s*\([^)]*\)\s*/g, " "), ...[...n.matchAll(/\(([^)]+)\)/g)].map((m) => m[1]).filter((p) => p.trim().includes(" ")), ...n.split(/\s+\/\s+|;\s*/)]);
  return [...new Set(parts.map(key).filter((k) => k.length >= 4))];
}
/** A shorter name that begins with one of these is a description ("institute for cancer research"), not a proper name, so it must match whole. */
const GENERIC_START = /^(all india institute|institute|cancer|society|foundation|national|american|international|association|center|hospital|research|children s|university|regional|community)\b/;
/** Words that on their own describe a kind of place rather than name one: "children s hospital" must match whole. */
const GENERIC_WORDS = new Set(["children", "s", "hospital", "hospitals", "medical", "center", "cancer", "university", "of", "the", "and", "institute", "research", "foundation", "society", "national", "regional", "community", "clinic", "health", "care", "oncology", "comprehensive"]);
function agree(a: string, b: string): boolean {
  if (a === b) return true;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  if (s.length < 12 || s.split(" ").every((w) => GENERIC_WORDS.has(w))) return false;
  // "American Friends of X" is the US fundraising charity of X, a separate organisation.
  if (/^american friends of /.test(l) && !/^american friends of /.test(s)) return false;
  if (l.startsWith(s + " ")) return s.split(" ").length >= 2 && !/^all india institute/.test(s);
  return l.endsWith(" " + s) && s.split(" ").length >= 3 && !GENERIC_START.test(s);
}

/** The country of a list item where the list says it, as an ISO code; undefined when unknown. */
function countryOf(list: string, it: Item): string | undefined {
  if (list === "irs-cancer-charities") return it.state ? "US" : undefined;
  if (list === "ccew-cancer-charities") return "GB";
  if (list === "aaci-members") return ["BC", "ON", "QC", "AB"].includes(String(it.region)) ? "CA" : "US";
  if (list === "cog-members") return ({ US: "US", CA: "CA", AU: "AU", NZ: "NZ", SA: "SA" } as Record<string, string>)[String(it.country)];
  if (list === "ncg-members") return /^(bangladesh|bhutan|indonesia|kenya|malaysia|nepal|nigeria|rwanda|usa|zambia)$/i.test(String(it.region)) ? undefined : "IN";
  if (list === "mhlw-cancer-hospitals") return "JP";
  return undefined;
}

type Item = { name: string; aka?: string; website?: string; [k: string]: unknown };
export type Coverage = { list: string; total: number; ours: number; pct: number; held: Array<{ item: Item; id: string }>; missing: Item[] };

export function coverage(list: string): Coverage {
  const data = JSON.parse(readFileSync(join(process.cwd(), "src", "data", "universe-lists", `${list}.json`), "utf8")) as { items: Item[] };
  // The Japanese list carries the ministry's Japanese name, and an English name only where one has been checked.
  for (const it of data.items) if (!it.name && typeof it.ja === "string") it.name = it.ja;
  const g = graph();
  const recs = [...g.kind("institution"), ...g.kind("company")].map((e) => {
    const x = e as unknown as { id: string; name: string; aka: string[]; website?: string };
    return { id: x.id, keys: keysOf([x.name, ...x.aka]), host: host(x.website), country: (x as { country?: string }).country };
  });
  const byHost = new Map<string, string>();
  for (const r of recs) if (r.host && !/^(web\.archive\.org|nhs\.uk|gov\.uk|facebook\.com|linkedin\.com)$/.test(r.host)) byHost.set(r.host, r.id);
  const held: Coverage["held"] = [];
  const missing: Item[] = [];
  for (const it of data.items) {
    // List names join a university and its centre with a bare slash ("University of Kentucky/Markey Cancer Center").
    const ks = keysOf([it.name, ...it.name.split(/\s*\/\s*/).filter((p) => p !== it.name), ...(it.aka ? [it.aka] : [])]);
    const cc = countryOf(list, it);
    const inCountry = recs.filter((r) => !cc || !r.country || r.country === cc);
    // An exact name beats a name that merely begins or ends the other.
    let id = inCountry.find((r) => r.keys.some((k) => ks.includes(k)))?.id ?? inCountry.find((r) => r.keys.some((k) => ks.some((c) => agree(c, k))))?.id;
    // The National Cancer Grid links many members to a page on Tata Memorial's site, so for that list a website counts
    // only when it is a home page; elsewhere a deep link on the member's own site is the member's.
    const h = it.website && (list !== "ncg-members" || /^(https?:\/\/)?[^/]+\/?$/i.test(String(it.website).trim())) ? host(it.website) : undefined;
    if (!id && h) id = byHost.get(h);
    if (id) held.push({ item: it, id }); else missing.push(it);
  }
  const total = data.items.length;
  return { list, total, ours: held.length, pct: Math.round((held.length / total) * 1000) / 10, held, missing };
}

if (process.argv[1]?.endsWith("institution-coverage.ts")) {
  const ids = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const json = process.argv.includes("--json");
  const all = process.argv.includes("--all");
  const rows = (ids.length ? ids : [...LISTS]).flatMap((l) => { try { return [coverage(l)]; } catch { return []; } });
  if (json) console.log(JSON.stringify(rows.map((r) => ({ list: r.list, ours: r.ours, total: r.total, pct: r.pct, missing: r.missing.map((m) => m.name) })), null, 1));
  else for (const r of rows) {
    console.log(`${r.list.padEnd(26)} ${String(r.ours).padStart(4)} / ${String(r.total).padEnd(5)} ${r.pct}%`);
    if (ids.length) {
      for (const h of all ? r.held : []) console.log(`   + ${h.item.name}  -> ${h.id}`);
      for (const m of r.missing) console.log(`   - ${m.name}${m.website ? `  ${m.website}` : ""}`);
    }
  }
}
