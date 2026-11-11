import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { GLOBOCAN, sitesForCountry, CONTINENT, type Cell, type CountrySite } from "./globocan";
import { methodMeaning } from "./globocan-methods";
import type { Entity, Trial } from "./schema";
import { CTGOV_COUNTRY, DISPLAY_NAME, EU_MEMBERS, ISO3_TO_ISO2, PART_OF } from "@/data/country-codes";
import { countryExtras, type CountryExtra } from "@/data/country-extras";
import { regionalApprovals } from "@/data/regional-approvals";

/**
 * Every country in GLOBOCAN gets a page at /countries/<iso2>/. Thirty-nine have a deep dive written by hand
 * (src/app/countries/<iso2>/page.tsx); the rest are generated here from data the corpus already holds, with no
 * hand-written claim: IARC's GLOBOCAN estimates, the trials whose ClinicalTrials.gov capture lists a site in the
 * country, the institutions, companies and people recorded there, the approvals rows that cover it, its
 * country-extras row, and the screening, vaccination and law records named for it. Server-only (it reads the app
 * directory and the coverage proposal from disk at build time, as src/lib/sitemap-urls.ts does).
 *
 * A deep dive always wins: the dynamic route (src/app/countries/[iso]/page.tsx) generates only the codes with no
 * folder of their own, so adding a deep dive removes the automatic page in the same build.
 */

const COUNTRIES_DIR = join(process.cwd(), "src", "app", "countries");

/** Upper-case alpha-2 codes of the hand-written deep dives: the two-letter folders under src/app/countries with a page. */
export function deepDiveCodes(dir = COUNTRIES_DIR): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name) && existsSync(join(dir, d.name, "page.tsx")))
    .map((d) => d.name.toUpperCase()).sort();
}

export const countryRoute = (iso2: string) => `/countries/${iso2.toLowerCase()}/`;

/** Anchor of a GLOBOCAN entry shown inside another country's page (France's overseas departments on /countries/fr/). */
export const partAnchor = (iso2: string) => `overseas-${iso2.toLowerCase()}`;

/** Where a country's page lives: its own route, or the section of the page it belongs to (PART_OF). */
export function countryPageFor(iso2: string): string {
  const code = iso2.toUpperCase();
  const parent = PART_OF[code];
  return parent ? `${countryRoute(parent)}#${partAnchor(code)}` : countryRoute(code);
}

/** The GLOBOCAN entries shown as a section of a parent country's page, in name order. */
export function partsOf(parentIso2: string): string[] {
  return Object.entries(PART_OF).filter(([, p]) => p === parentIso2).map(([c]) => c).sort((a, b) => countryName(a).localeCompare(countryName(b), "en"));
}

/** The flag emoji for an alpha-2 code, built from the two regional-indicator letters. */
export const flagOf = (iso2: string) => String.fromCodePoint(...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

const ISO2_TO_ISO3: Record<string, string> = Object.fromEntries(Object.entries(ISO3_TO_ISO2).map(([a3, a2]) => [a2, a3]));

/** Reading name: the short form where IARC's is formal or inverted, otherwise IARC's own. */
export function countryName(iso2: string): string {
  const iso3 = ISO2_TO_ISO3[iso2];
  return DISPLAY_NAME[iso2] ?? (iso3 ? GLOBOCAN.countries[iso3]?.name : undefined) ?? countryExtras[iso2]?.name ?? iso2;
}

export type CountryRef = { iso2: string; iso3?: string; name: string; region: string; deepDive: boolean; route: string; cases: number | null; /** Entries shown on this page rather than their own (France's overseas departments). */ parts?: Array<{ iso2: string; name: string; route: string }> };

let indexCache: CountryRef[] | null = null;
/** Every country with a page: the GLOBOCAN countries (less the PART_OF entries, listed under their parent) and any deep dive outside GLOBOCAN (Taiwan), by name. */
export function countryIndex(): CountryRef[] {
  if (indexCache) return indexCache;
  const dives = new Set(deepDiveCodes());
  const out: CountryRef[] = [];
  for (const [iso3, c] of Object.entries(GLOBOCAN.countries)) {
    if (iso3 === "WORLD") continue;
    const iso2 = ISO3_TO_ISO2[iso3];
    if (!iso2 || PART_OF[iso2]) continue;
    out.push({ iso2, iso3, name: countryName(iso2), region: CONTINENT[c.region] ?? c.region, deepDive: dives.has(iso2), route: countryRoute(iso2), cases: c.data["39"]?.[0] ?? null });
  }
  const seen = new Set(out.map((r) => r.iso2));
  // A deep dive with no GLOBOCAN row (Taiwan) is listed under Asia, where IARC's regions would put it.
  for (const iso2 of dives) if (!seen.has(iso2)) out.push({ iso2, name: countryName(iso2), region: "Asia", deepDive: true, route: countryRoute(iso2), cases: null });
  for (const r of out) { const parts = partsOf(r.iso2); if (parts.length) r.parts = parts.map((x) => ({ iso2: x, name: countryName(x), route: countryPageFor(x) })); }
  indexCache = out.sort((a, b) => a.name.localeCompare(b.name, "en"));
  return indexCache;
}

/** Alpha-2 codes of the GLOBOCAN countries that have no deep dive: the automatic pages. */
export function autoCountryCodes(): string[] {
  return countryIndex().filter((c) => !c.deepDive && c.iso3).map((c) => c.iso2);
}

// ---------------------------------------------------------------- trials

let trialsByCountry: Map<string, Trial[]> | null = null;
/** Trial records whose ClinicalTrials.gov capture lists at least one site in the country, keyed by alpha-2. */
export function trialsIn(iso2: string): Trial[] {
  if (!trialsByCountry) {
    trialsByCountry = new Map();
    for (const t of graph().kind("trial")) {
      const codes = new Set<string>();
      for (const p of t.participation ?? []) for (const n of p.countries ?? []) { const c = CTGOV_COUNTRY[n]; if (c) codes.add(c); }
      for (const c of codes) { const list = trialsByCountry.get(c) ?? []; list.push(t); trialsByCountry.set(c, list); }
    }
    const recruiting = (t: Trial) => (t.participation ?? []).some((p) => p.overallStatus === "RECRUITING");
    const updated = (t: Trial) => (t.participation ?? []).map((p) => p.lastUpdatePosted ?? "").sort().at(-1) ?? "";
    for (const list of trialsByCountry.values()) list.sort((a, b) => Number(recruiting(b)) - Number(recruiting(a)) || updated(b).localeCompare(updated(a)) || a.name.localeCompare(b.name));
  }
  return trialsByCountry.get(iso2) ?? [];
}

// ---------------------------------------------------------------- programmes and laws

/** Phrases that contain a country name without being about that country. */
const NOT_THE_COUNTRY = ["Northern Ireland", "New Mexico", "Papua New Guinea", "Equatorial Guinea", "Guinea-Bissau"];

/** Every name a record could use for the country: the reading name, IARC's name and ClinicalTrials.gov's. */
export function countryAliases(iso2: string): string[] {
  const iso3 = ISO2_TO_ISO3[iso2];
  const names = [countryName(iso2), iso3 ? GLOBOCAN.countries[iso3]?.name : undefined, ...Object.entries(CTGOV_COUNTRY).filter(([, c]) => c === iso2).map(([n]) => n), countryExtras[iso2]?.name];
  // "Turkey (Türkiye)" is ClinicalTrials.gov's; records write either word.
  const extra = iso2 === "TR" ? ["Turkey", "Türkiye"] : [];
  return [...new Set([...names, ...extra].filter((n): n is string => !!n))];
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Does a record name mention the country as a whole word, outside the phrases that only contain its name? */
export function namesCountry(name: string, iso2: string): boolean {
  let text = name;
  for (const p of NOT_THE_COUNTRY) if (!countryAliases(iso2).includes(p)) text = text.split(p).join(" ");
  return countryAliases(iso2).some((a) => new RegExp(`(?<![\\p{L}])${escape(a)}(?![\\p{L}])`, "u").test(text));
}

const PROGRAMME_TAGS = ["screening-programme", "vaccination-programme"] as const;
/**
 * Screening and vaccination programme records and law records named for one country. The census fill rounds name
 * each national record for its country ("Cervical cancer screening programme in Myanmar"); the records that cover
 * many countries at once are named "by country" and are left out.
 */
export function countryRecords(iso2: string): { programmes: Entity[]; laws: Entity[] } {
  const g = graph();
  const pick = (tags: readonly string[]) => g.entities.filter((e) => e.kind === "term" && e.tags.some((t) => tags.includes(t)) && !/\bby country\b/i.test(e.name) && namesCountry(e.name, iso2));
  return { programmes: pick(PROGRAMME_TAGS), laws: pick(["law"]) };
}

// ---------------------------------------------------------------- the deep-dive queue

export const QUEUE_DOC = "docs/proposals/country-coverage-2026-11.md";
export const QUEUE_URL = `https://github.com/judegomila/OnCo/blob/main/${QUEUE_DOC}`;

let queueCache: { ranks: Map<string, number>; size: number } | null = null;
/** Ranks from the coverage proposal's table of countries without a page (its "Rank" and "ISO" columns). */
export function deepDiveQueue(): { ranks: Map<string, number>; size: number } {
  if (queueCache) return queueCache;
  const ranks = new Map<string, number>();
  const file = join(process.cwd(), QUEUE_DOC);
  if (existsSync(file)) {
    const text = readFileSync(file, "utf8");
    const start = text.indexOf("## The 60 highest-ranked countries without a page");
    const end = start < 0 ? -1 : text.indexOf("\n## ", start + 4);
    const section = start < 0 ? "" : text.slice(start, end < 0 ? undefined : end);
    for (const m of section.matchAll(/^\|\s*(\d+)\s*\|[^|]+\|\s*([A-Z]{2})\s*\|/gm)) ranks.set(m[2], Number(m[1]));
  }
  queueCache = { ranks, size: ranks.size };
  return queueCache;
}

// ---------------------------------------------------------------- the page

export type MethodNote = { code?: string; meaning: string | null; neighbours: boolean };

export type AutoCountry = {
  iso2: string; iso3: string; name: string; globocanName: string; flag: string;
  region: string; area: string; hdi?: string; income?: string; whoRegion?: string; pop?: number;
  /** All cancers (code 39): [new cases, incidence ASR, deaths, mortality ASR, cumulative risk to 74]. */
  all: Cell | null;
  methodInc: MethodNote; methodMort: MethodNote;
  byIncidence: CountrySite[]; byMortality: CountrySite[];
  trials: Trial[]; recruiting: number;
  institutions: Entity[]; companies: Entity[]; people: Entity[];
  /** Products with an EU centralised authorisation row (approved or conditional), for EU member states. */
  euApproved: number | null;
  extras: CountryExtra | null;
  programmes: Entity[]; laws: Entity[];
  queueRank: number | null; queueSize: number;
};

/** IARC method codes built from other countries' data: incidence 5 (neighbours' rates) and 3b (neighbours' registries). */
const NEIGHBOUR_CODES = new Set(["5", "3b"]);

const TOP = 10;

export function autoCountry(iso2: string): AutoCountry | null {
  const code = iso2.toUpperCase();
  const iso3 = ISO2_TO_ISO3[code];
  const c = iso3 ? GLOBOCAN.countries[iso3] : undefined;
  if (!iso3 || !c) return null;
  const g = graph();
  const profile = sitesForCountry(GLOBOCAN, iso3);
  const sites = (profile?.sites ?? []).filter((s) => s.label !== "Non-melanoma skin cancer");
  const byIncidence = sites.filter((s) => (s.cases ?? 0) > 0).slice(0, TOP);
  const byMortality = sites.filter((s) => (s.deaths ?? 0) > 0).sort((a, b) => (b.deaths ?? 0) - (a.deaths ?? 0)).slice(0, TOP);
  const trials = trialsIn(code);
  const institutions = g.kind("institution").filter((e) => e.country === code);
  const companies = g.kind("company").filter((e) => e.country === code);
  const people = g.kind("person").filter((p) => { const id = (p as { institutionId?: string }).institutionId; const a = id ? (g.get(id) as { country?: string } | undefined) : undefined; return a?.country === code; });
  const euApproved = EU_MEMBERS.has(code) ? g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.EU; return !!r && (r.status === "approved" || r.status === "conditional"); }).length : null;
  const { programmes, laws } = countryRecords(code);
  const queue = deepDiveQueue();
  const note = (metric: "inc" | "mort", m?: string): MethodNote => ({ code: m || undefined, meaning: methodMeaning(metric, m || undefined, GLOBOCAN.year), neighbours: !!m && NEIGHBOUR_CODES.has(m) });
  return {
    iso2: code, iso3, name: countryName(code), globocanName: c.name, flag: flagOf(code),
    region: CONTINENT[c.region] ?? c.region, area: c.area, hdi: c.hdi, income: c.income, whoRegion: c.whoRegion, pop: c.pop,
    all: c.data["39"] ?? null,
    methodInc: note("inc", c.methodInc), methodMort: note("mort", c.methodMort),
    byIncidence, byMortality,
    trials, recruiting: trials.filter((t) => (t.participation ?? []).some((p) => p.overallStatus === "RECRUITING")).length,
    institutions, companies, people,
    euApproved,
    extras: countryExtras[code] ?? null,
    programmes, laws,
    queueRank: queue.ranks.get(code) ?? null, queueSize: queue.size,
  };
}

/** The machine-readable twin of an automatic page, written to /api/v1/countries/<iso2>.json by scripts/build-api.ts. */
export function autoCountryJson(iso2: string) {
  const a = autoCountry(iso2);
  if (!a) return null;
  const site = (s: CountrySite) => ({ code: s.code, label: s.label, newCases: s.cases, incidenceAsr: s.incAsr, deaths: s.deaths, mortalityAsr: s.mortAsr, oncoCancers: s.oncoIds });
  const ref = (e: Entity) => ({ id: e.id, kind: e.kind, name: e.name });
  return {
    iso2: a.iso2, iso3: a.iso3, name: a.name, route: countryRoute(a.iso2), deepDive: false,
    globocan: {
      edition: GLOBOCAN.year, name: a.globocanName, citation: GLOBOCAN.citation, source: GLOBOCAN.sourceUrl, fetched: GLOBOCAN.fetched,
      population: a.pop ?? null, region: a.region, area: a.area, hdi: a.hdi ?? null, income: a.income ?? null,
      allCancers: a.all ? { newCases: a.all[0], incidenceAsr: a.all[1], deaths: a.all[2], mortalityAsr: a.all[3], cumulativeRisk74: a.all[4] } : null,
      method: { incidence: a.methodInc, mortality: a.methodMort },
      topByIncidence: a.byIncidence.map(site), topByMortality: a.byMortality.map(site),
    },
    trials: { count: a.trials.length, recruitingOverall: a.recruiting, ids: a.trials.map((t) => t.id) },
    institutions: a.institutions.map(ref), companies: a.companies.map(ref), people: a.people.map(ref),
    euCentralisedApprovals: a.euApproved,
    countryExtras: a.extras,
    programmes: a.programmes.map(ref), laws: a.laws.map(ref),
    deepDiveQueue: { rank: a.queueRank, of: a.queueSize, source: QUEUE_URL },
  };
}

/** /api/v1/countries.json: every country with a page, deep dive or automatic. */
export function countryIndexJson() {
  return { edition: GLOBOCAN.year, countries: countryIndex().map((c) => ({ iso2: c.iso2, iso3: c.iso3 ?? null, name: c.name, region: c.region, deepDive: c.deepDive, route: c.route, newCases: c.cases, json: c.deepDive ? null : `/api/v1/countries/${c.iso2.toLowerCase()}.json`, parts: c.parts ?? [] })) };
}
