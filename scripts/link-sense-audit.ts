/**
 * Link-sense audit: links that are present and resolve, but imply something false.
 *
 * The owner, 3 November 2026: "look across the site for mistakes like putting that drug in the ctdna page — it implies
 * the wrong thing". The ctDNA MRD readout listed atezolizumab beside the blood tests that measure the readout, in one
 * field, so a reader saw a cancer medicine as if it were one of the tests. Earlier members of the same family were all
 * real: Signatera labelled a drug, selicrelumab credited to Flatiron Health, the fragment `imid` matching inside
 * `pyrimidine`, the lymphoma group LYSA linked to the ovarian PRIMA trial instead of the follicular one, MILAN-I credited
 * to an institute founded after the trial ended. `npm run validate` catches a link to nothing; nothing caught a link to
 * the wrong thing. This does, one class at a time:
 *
 *   role         a typed field holding another kind (worst where a record of the right kind has the same name); a
 *                product field mixing the tests that measure a readout with the medicines a result selects; an investor
 *                or trials group credited as a product's developer; a product whose class contradicts its name
 *   drug-cancer  a product linked to a cancer with no approval, trial, paper, standard-of-care row or text pairing them
 *   trial-drug   a trial linked to a product neither its record nor its registry entry names
 *   trial-cancer a trial linked to a cancer (or family) neither its record nor its registry entry names
 *   company      a product credited to a company neither record names, with no trial or acquisition joining them
 *   time         a company or institution founded after the trial it is credited with; a paper that names a trial
 *                published before the trial started
 *   target       a drug whose own modality and mechanism name a different target from the one it is linked to; a trial
 *                or pathway linked to a target no linked drug hits and no text names
 *   fragment     a regular expression in src/lib or src/data that fires on a corpus name, modality or event only from
 *                the middle of a word (the `imid` in "pyrimidine" class)
 *   sponsor      a sponsor alias pattern that resolves another corpus company's or institution's own name to a
 *                different record
 *   name         two records sharing a name or alias where a link points at the one outside the linking record's
 *                cancers; an alias that is a generic word ("Inc.")
 *
 * Every finding carries a confidence. "high" is the subset whose measured precision was high when hand-checked
 * (docs/proposals/link-sense-strategies.md); "medium" and "low" are for review. Read-only: it writes
 * docs/proposals/link-sense-audit.{md,json} and changes no record. Registry evidence for the trial classes is read from
 * /tmp/ctgov-cache/lsa when present (fill it with --fetch-ctgov); without it those classes stay at medium.
 *
 *   npx tsx scripts/link-sense-audit.ts                 write the report
 *   npx tsx scripts/link-sense-audit.ts --counts        print the counts per class and confidence only
 *   npx tsx scripts/link-sense-audit.ts --fetch-ctgov   cache ClinicalTrials.gov records for the flagged trials first
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph, type Graph } from "../src/lib/graph";
import { REL_FIELDS, type Entity, type Kind } from "../src/lib/schema";
import { productClass } from "../src/lib/product-class";
import { resolveSponsor } from "../src/data/sponsor-aliases";

export type Confidence = "high" | "medium" | "low";
export const CLASSES = ["role", "drug-cancer", "trial-drug", "trial-cancer", "company", "time", "target", "fragment", "sponsor", "name"] as const;
export type LinkClass = (typeof CLASSES)[number];
export type Finding = {
  cls: LinkClass;
  /** Narrower rule inside the class, e.g. "field-kind", "role-mixed", "developer-type". */
  rule: string;
  confidence: Confidence;
  from: string;
  field?: string;
  to?: string;
  reason: string;
};

type RelField = (typeof REL_FIELDS)[number];
type Drug = Extract<Entity, { kind: "drug" }>;
type Trial = Extract<Entity, { kind: "trial" }>;
type Cancer = Extract<Entity, { kind: "cancer" }>;
type Company = Extract<Entity, { kind: "company" }>;
type Paper = Extract<Entity, { kind: "paper" }>;
type Pathway = Extract<Entity, { kind: "pathway" }>;

/** The kind each typed relation field holds (src/lib/schema.ts: "Each holds ids of the named kind"). */
export const FIELD_KIND: Partial<Record<RelField, Kind>> = {
  cancers: "cancer", sections: "section", technologies: "technology", targets: "target", drugs: "drug", companies: "company",
  institutions: "institution", pathways: "pathway", terms: "term", trials: "trial", people: "person", bottlenecks: "bottleneck",
  keyPapers: "paper", journals: "journal", dependsOn: "technology",
};

// ---------------------------------------------------------------------------------------------------------------------
// Text: one normalised form, British and American spellings folded, Greek letters spelt out, matched on whole words.

const SPELLING: Array<[RegExp, string]> = [
  [/α/g, " alpha "], [/β/g, " beta "], [/γ/g, " gamma "], [/δ/g, " delta "], [/[εϵ]/g, " epsilon "], [/κ/g, " kappa "],
  [/oesophag/g, "esophag"], [/haemat/g, "hemat"], [/haemo/g, "hemo"], [/leukaem/g, "leukem"], [/anaem/g, "anem"], [/tumour/g, "tumor"],
  [/oestr/g, "estr"], [/paediatr/g, "pediatr"], [/caecum/g, "cecum"], [/centre/g, "center"], [/lymphomas/g, "lymphoma"], [/cancers/g, "cancer"],
  [/carcinomas/g, "carcinoma"], [/tumors/g, "tumor"], [/ise\b/g, "ize"], [/isation/g, "ization"],
];
export function norm(s: string): string {
  let t = s.toLowerCase();
  for (const [re, to] of SPELLING) t = t.replace(re, to);
  t = t.normalize("NFKD").replace(/[̀-ͯ]/g, "");
  return " " + t.replace(/[^a-z0-9]+/g, " ").trim() + " ";
}
/** Does normalised text `hay` contain normalised phrase `needle` as whole words? */
const has = (hay: string, needle: string) => needle.trim().length > 0 && hay.includes(needle);

const GENERIC = new Set(["cancer", "carcinoma", "tumor", "tumors", "neoplasm", "neoplasms", "disease", "the", "and", "of", "with", "in", "advanced", "metastatic", "primary", "malignant", "malignancy", "type", "other", "solid", "adult", "childhood", "pediatric", "stage", "cell", "cells", "high", "low", "grade", "risk", "inc", "ltd", "llc", "plc", "co", "corp", "group", "therapeutics", "pharmaceuticals", "pharmaceutical", "pharma", "biosciences", "bio", "biotech", "biotherapeutics", "oncology", "medical", "medicine", "medicines", "health", "sciences", "science", "international", "global", "national", "american", "china", "new", "general", "university", "institute", "hospital", "center", "trial", "study", "phase", "drug", "test", "a", "an", "for", "to", "by", "on", "at", "receptor", "protein", "kinase", "factor", "family"]);

/** A record's own names for matching it against another record's: its name with and without the bracket, the bracket, its symbol. No aliases, which collide. */
const nameKeyCache = new WeakMap<Entity, Set<string>>();
function nameKeys(e: Entity): Set<string> {
  const hit = nameKeyCache.get(e);
  if (hit) return hit;
  const out = new Set<string>();
  nameKeyCache.set(e, out);
  const add = (s: string) => { const n = norm(s).trim(); if (n.length >= 3 && !GENERIC.has(n)) out.add(n); };
  add(e.name); add(e.name.replace(/\s*\(.*?\)\s*/g, " "));
  for (const m of e.name.matchAll(/\(([^)]+)\)/g)) add(m[1]);
  for (const s of fieldsText(e, ["symbol"])) for (const piece of s.split(/,\s*/)) add(piece);
  return out;
}

function fieldsText(e: Entity, keys: string[]): string[] {
  const x = e as Record<string, unknown>;
  const out: string[] = [];
  for (const k of keys) { const v = x[k]; if (typeof v === "string") out.push(v); else if (Array.isArray(v)) out.push(...v.filter((s): s is string => typeof s === "string")); }
  return out;
}

function textOf(e: Entity): string {
  const parts: string[] = [e.name, ...e.aka, e.tldr, e.summary, ...e.notes, ...e.links.map((l) => `${l.label} ${l.url}`)];
  parts.push(...fieldsText(e, ["brand", "code", "modality", "mechanism", "setting", "result", "sponsor", "role", "biology", "analogy", "whatItMeans", "authors", "journal", "forPatient", "replication", "website", "hq", "symbol",
    "findings", "caveats", "mechanismSteps", "stateOfArt", "openProblems", "interventions", "specialisms", "programs", "subtypes", "biomarkers", "whereFound"]));
  if (e.kind === "drug") { for (const a of e.approvals) parts.push(a.indication, a.note ?? ""); for (const r of e.regulatoryEvents) parts.push(r.note, r.indication ?? ""); if (e.dosing) parts.push(e.dosing.schedule, e.dosing.source ?? ""); }
  if (e.kind === "trial") {
    for (const o of e.outcomes) parts.push(o.endpoint, ...o.arms.map((a) => `${a.name} ${a.note ?? ""}`));
    for (const p of e.participation ?? []) parts.push(JSON.stringify(p));
    if (e.nct) parts.push(e.nct);
  }
  if (e.kind === "paper") parts.push(e.doi ?? "", e.pmid ?? "");
  if (e.kind === "cancer") { for (const s of e.standardOfCare) parts.push(s.setting, s.approach); for (const h of e.history) parts.push(h.title, h.note ?? ""); }
  if (e.kind === "pathway") parts.push(...e.nodes.map((n) => n.label));
  if (e.kind === "biomarker") parts.push(e.scoringRule.text, e.scoringRule.quote, ...e.thresholds.map((t) => `${t.value} ${t.quote ?? ""} ${t.note ?? ""}`));
  return norm(parts.join(" \n "));
}

/** The names a record goes by, normalised, generic words dropped where that leaves a distinctive core. */
function variants(e: Entity): string[] {
  const out = new Set<string>();
  const add = (s: string | undefined) => {
    if (!s) return;
    const n = norm(s);
    if (n.trim().length >= 3) out.add(n);
    const core = n.trim().split(" ").filter((w) => !GENERIC.has(w)).join(" ");
    if (core.length >= 4 && !/^\d+$/.test(core)) out.add(` ${core} `);
  };
  for (const s of [e.name, ...e.aka]) {
    add(s);
    add(s.replace(/\s*\(.*?\)\s*/g, " "));
    for (const m of s.matchAll(/\(([^)]+)\)/g)) add(m[1]);
    for (const piece of s.split(/\s*[/;]\s*|\s+and\s+|\s*\+\s*|,\s*|\s+&\s+/)) if (piece !== s) add(piece);
  }
  for (const s of fieldsText(e, ["brand", "code", "symbol"])) for (const piece of s.split(/,\s*/)) add(piece);
  const x = e as Record<string, unknown>;
  if (e.kind === "company" && typeof x.website === "string") { const host = (x.website as string).replace(/^https?:\/\/(www\.)?/, "").split(/[./]/)[0]; if (host.length >= 4) add(host); }
  if (e.kind === "company") { const first = norm(e.name).trim().split(" ")[0]; if (first.length >= 4 && !GENERIC.has(first)) out.add(` ${first} `); }
  if (e.kind === "drug") { const first = norm(e.name).trim().split(" ")[0]; if (first.length >= 6 && !GENERIC.has(first)) out.add(` ${first} `); }
  if (e.kind === "trial" && typeof x.nct === "string") add(x.nct as string);
  return [...out];
}

// ---------------------------------------------------------------------------------------------------------------------
// ClinicalTrials.gov evidence, read from a local cache only (the audit never fetches unless asked).

export const CTGOV_CACHE = "/tmp/ctgov-cache/lsa";
type CtStudy = { protocolSection?: Record<string, Record<string, unknown>> };
function ctgovText(nct: string | undefined, dir: string): string | undefined {
  if (!nct || !existsSync(join(dir, `${nct}.json`))) return undefined;
  try {
    const s = JSON.parse(readFileSync(join(dir, `${nct}.json`), "utf8")) as CtStudy;
    const p = s.protocolSection ?? {};
    return norm(JSON.stringify([p.identificationModule, p.conditionsModule, p.armsInterventionsModule, p.descriptionModule?.briefSummary]));
  } catch { return undefined; }
}

/** Regimen acronyms a trial names instead of its component medicines. */
const REGIMENS: Array<[RegExp, string[]]> = [
  [/\b(r-?)?cho?e?p\b|\bchop\b/i, ["cyclophosphamide", "doxorubicin", "vincristine", "prednisone", "prednisolone", "etoposide"]],
  [/\b(r-?)?cvp\b/i, ["cyclophosphamide", "vincristine", "prednisone", "prednisolone"]],
  [/\b(a|b)?vd\b|\babvd\b/i, ["doxorubicin", "bleomycin", "vinblastine", "dacarbazine"]],
  [/\b(esc)?beacopp|\bbeacopdac|\bbrecadd/i, ["bleomycin", "etoposide", "doxorubicin", "cyclophosphamide", "vincristine", "procarbazine", "prednisone", "dacarbazine", "dexamethasone"]],
  [/\b(m)?folf(ox|iri|irinox|oxiri)|\bfluorouracil/i, ["fluorouracil", "leucovorin", "oxaliplatin", "irinotecan"]],
  [/\b(capox|xelox|capeox|xelox)\b/i, ["capecitabine", "oxaliplatin"]],
  [/\bflot\b/i, ["fluorouracil", "leucovorin", "oxaliplatin", "docetaxel"]],
  [/\be[co][fx]\b|\beox\b|\becx\b/i, ["epirubicin", "cisplatin", "oxaliplatin", "fluorouracil", "capecitabine"]],
  [/\b(dd)?[ae]c\b|\bac-t\b|\bec-t\b|anthracycline/i, ["doxorubicin", "epirubicin", "cyclophosphamide"]],
  [/\btc(hp?)?\b|\bthp\b|\btaxane/i, ["docetaxel", "paclitaxel", "carboplatin", "cyclophosphamide", "trastuzumab", "pertuzumab"]],
  [/\bcmf\b|\bfec\b/i, ["cyclophosphamide", "methotrexate", "fluorouracil", "epirubicin"]],
  [/\bbep\b|\bep\b|\bpe\b|\bvip\b|\btip\b/i, ["bleomycin", "etoposide", "cisplatin", "ifosfamide", "paclitaxel"]],
  [/\bpcv\b/i, ["procarbazine", "lomustine", "vincristine"]],
  [/\bmap\b|\bmapie\b/i, ["methotrexate", "doxorubicin", "cisplatin", "ifosfamide", "etoposide"]],
  [/\bva[cdi]\b|\bvd?c\b|\bvide\b|\bvai\b|\bie\b|\bvdc\/ie\b/i, ["vincristine", "dactinomycin", "doxorubicin", "cyclophosphamide", "ifosfamide", "etoposide"]],
  [/hyper-?cvad/i, ["cyclophosphamide", "vincristine", "doxorubicin", "dexamethasone", "methotrexate", "cytarabine"]],
  [/\b(da-?)?r?-?epoch/i, ["etoposide", "prednisone", "vincristine", "cyclophosphamide", "doxorubicin", "rituximab"]],
  [/\bb-?r\b|\bbr\b|\bbendamustine/i, ["bendamustine", "rituximab"]],
  [/\b(dara-?)?(vrd|rvd|vtd|krd|kd|vmp|rd|dvd|drd|dpd|ird)\b/i, ["bortezomib", "lenalidomide", "dexamethasone", "thalidomide", "carfilzomib", "melphalan", "daratumumab", "pomalidomide", "ixazomib"]],
  [/\bgem(cis|cap)\b|\bgc\b|\bgemcitabine/i, ["gemcitabine", "cisplatin", "capecitabine", "carboplatin"]],
  [/\b(dd)?m-?vac\b/i, ["methotrexate", "vinblastine", "doxorubicin", "cisplatin"]],
  [/\b7 ?\+ ?3\b|\bcpx-351\b/i, ["cytarabine", "daunorubicin", "idarubicin"]],
  [/\bflag(-ida)?\b/i, ["fludarabine", "cytarabine", "idarubicin"]],
  [/\bbeam\b|\bbuc?y\b|\bmel(phalan)?[ -]?200\b|conditioning|autologous (stem cell )?transplant|\basct\b/i, ["carmustine", "etoposide", "cytarabine", "melphalan", "busulfan", "cyclophosphamide"]],
  [/\b(r-?)?ice\b|\b(r-?)?dhap\b|\b(r-?)?gdp\b|\bdhax\b|\bgemox\b/i, ["ifosfamide", "carboplatin", "etoposide", "dexamethasone", "cytarabine", "cisplatin", "gemcitabine", "oxaliplatin"]],
  [/\bplado\b/i, ["cisplatin", "doxorubicin"]],
  [/\bplatinum|doublet|\bpemetrexed|\bpaclitaxel/i, ["cisplatin", "carboplatin", "pemetrexed", "paclitaxel", "nab-paclitaxel"]],
  [/\bs-1\b|\bsox\b/i, ["tegafur-gimeracil-oteracil", "oxaliplatin"]],
  [/\b(r-?)?(mini-?)?cvp|\bgmall|\bberlin-frankfurt|\bbfm\b|\bcog\b|\bnopho/i, ["vincristine", "methotrexate", "cytarabine", "asparaginase", "pegaspargase", "mercaptopurine", "daunorubicin", "dexamethasone", "prednisone", "cyclophosphamide", "doxorubicin"]],
  [/\b(lmb|fab|inter-b-nhl|cop(adm)?)\b/i, ["vincristine", "methotrexate", "cytarabine", "cyclophosphamide", "doxorubicin", "prednisone", "etoposide", "rituximab"]],
];
const UMBRELLA = /\b(physician'?s choice|investigator'?s choice|treatment of physician|standard (of care )?chemotherapy|chemotherapy|chemo|other (anti-?cancer|anti-?tumou?r|treatments|therapies|agents)|combination(s)? with|standard of care|backbone|regimens?|endocrine therapy|hormone therapy|immunotherapy|anti-?cancer (drugs|therapies)|multiple treatment|platform|umbrella|basket|arms?)\b/i;

// ---------------------------------------------------------------------------------------------------------------------

export type Ctx = {
  g: Graph;
  text: (e: Entity) => string;
  names: (e: Entity) => string[];
  mentions: (hay: Entity, about: Entity) => boolean;
  family: (cancerId: string) => Set<string>;
  /** Records of `kind` linked to `e` through a field, in either direction. */
  linked: (e: Entity, kind: Kind) => Set<string>;
  /** Normalised ClinicalTrials.gov text for a trial, when cached. */
  ctgov: (t: Trial) => string | undefined;
};

export function makeCtx(g: Graph, opts: { ctgovDir?: string | null } = {}): Ctx {
  const textCache = new Map<string, string>();
  const nameCache = new Map<string, string[]>();
  const text = (e: Entity) => { let t = textCache.get(e.id); if (t === undefined) { t = textOf(e); textCache.set(e.id, t); } return t; };
  const names = (e: Entity) => { let n = nameCache.get(e.id); if (!n) { n = variants(e); nameCache.set(e.id, n); } return n; };
  const mentions = (hay: Entity, about: Entity) => { const t = text(hay); return names(about).some((v) => has(t, v)); };
  const parentOf = new Map<string, string>();
  const childrenOf = new Map<string, string[]>();
  for (const c of g.kind("cancer")) if (c.parent) { parentOf.set(c.id, c.parent); childrenOf.set(c.parent, [...(childrenOf.get(c.parent) ?? []), c.id]); }
  const famCache = new Map<string, Set<string>>();
  const family = (id: string) => {
    let s = famCache.get(id);
    if (s) return s;
    s = new Set([id]);
    for (let p = parentOf.get(id), n = 0; p && n < 10; p = parentOf.get(p), n++) s.add(p);
    const stack = [id];
    while (stack.length) for (const ch of childrenOf.get(stack.pop()!) ?? []) if (!s.has(ch)) { s.add(ch); stack.push(ch); }
    famCache.set(id, s);
    return s;
  };
  const fieldFor: Partial<Record<Kind, RelField>> = {};
  for (const [f, k] of Object.entries(FIELD_KIND)) if (f !== "dependsOn") fieldFor[k as Kind] = f as RelField;
  const linkCache = new Map<string, Set<string>>();
  const linked = (e: Entity, kind: Kind) => {
    const key = `${e.id}|${kind}`;
    let s = linkCache.get(key);
    if (s) return s;
    s = new Set<string>();
    const f = fieldFor[kind];
    if (f) for (const id of e[f]) s.add(id);
    for (const id of e.related) if (g.get(id)?.kind === kind) s.add(id);
    for (const r of g.incoming(e.id).get(kind) ?? []) s.add(r.id);
    linkCache.set(key, s);
    return s;
  };
  const dir = opts.ctgovDir === undefined ? CTGOV_CACHE : opts.ctgovDir;
  const ctCache = new Map<string, string | undefined>();
  const ctgov = (t: Trial) => {
    if (!dir) return undefined;
    if (!ctCache.has(t.id)) ctCache.set(t.id, ctgovText(t.nct ?? (t.id.match(/^nct\d{8}$/) ? t.id.toUpperCase() : undefined), dir));
    return ctCache.get(t.id);
  };
  return { g, text, names, mentions, family, linked, ctgov };
}

const GENERIC_CANCER = /\b(solid tumou?rs?|pan-cancer|all cancers|advanced cancers?|cancer \(general\)|any cancer|multiple cancers|haematological malignanc|hematologic malignanc|basket|metastatic cancer|rare cancers)\b/i;

// ---------------------------------------------------------------------------------------------------------------------
// role

/** Records of `kind` whose normalised name, alias or symbol equals one of `e`'s. */
function namesakesOfKind(c: Ctx, e: Entity, kind: Kind): Entity[] {
  const mine = nameKeys(e);
  return c.g.kind(kind).filter((o) => [...nameKeys(o)].some((k) => mine.has(k)));
}

export function roleFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  for (const e of g.entities) {
    for (const [f, kind] of Object.entries(FIELD_KIND) as Array<[RelField, Kind]>) {
      for (const id of e[f]) {
        const t = g.get(id);
        if (!t || t.kind === kind) continue;
        const twins = namesakesOfKind(c, t, kind);
        // Measured: a glossary stub (or a pathway) standing in for the cancer, target or technology of the same name is
        // the real error; a richer record in a terms field is not, and acronyms collide (TME), so those stay low.
        const stub = t.kind === "term" || (kind === "target" && t.kind === "pathway");
        if (twins.length) out.push({ cls: "role", rule: "field-kind-namesake", confidence: stub ? "high" : "low", from: e.id, field: f, to: id, reason: `${e.kind} ${e.id}: the ${f} field holds ${t.kind} ${id} where the ${kind} ${twins.map((x) => x.id).join(", ")} has the same name; the link reaches the ${t.kind} page, not the ${kind}` });
        else out.push({ cls: "role", rule: "field-kind", confidence: "low", from: e.id, field: f, to: id, reason: `${e.kind} ${e.id}: the ${f} field holds ${t.kind} ${id}; Connected groups by kind so the page reads right, but any reader of the field by name treats it as a ${kind}` });
      }
    }
  }
  // A product field mixing measurement with selection: the ctDNA MRD case. On a biomarker, technology, term or target
  // the tests in `drugs` measure the thing and the medicines are what a result selects; one field cannot say which.
  for (const e of g.entities) {
    if (!["biomarker", "technology", "term", "target"].includes(e.kind)) continue;
    const prods = e.drugs.map((id) => g.get(id)).filter((d): d is Drug => d?.kind === "drug");
    const tests = prods.filter((d) => productClass(d) === "test");
    const meds = prods.filter((d) => productClass(d) === "medicine");
    if (tests.length && meds.length) out.push({ cls: "role", rule: "role-mixed", confidence: e.kind === "biomarker" ? "high" : "medium", from: e.id, field: "drugs", reason: `${e.kind} ${e.id} lists ${tests.length} test(s) (${tests.slice(0, 3).map((d) => d.id).join(", ")}) and ${meds.length} medicine(s) (${meds.slice(0, 3).map((d) => d.id).join(", ")}) in one drugs field: what measures it and what a result selects are not told apart` });
  }
  // Developer role: who a product's companies are.
  for (const d of g.kind("drug")) {
    const cos = new Set([...d.companies, ...(g.incoming(d.id).get("company") ?? []).filter((co) => co.kind === "company" && co.drugs.includes(d.id)).map((co) => co.id)]);
    for (const id of cos) {
      const co = g.get(id) as Company | undefined;
      if (!co || co.kind !== "company") continue;
      if (co.companyType === "investor" || co.companyType === "cooperative-group") out.push({ cls: "role", rule: "developer-type", confidence: "high", from: d.companies.includes(id) ? d.id : co.id, field: d.companies.includes(id) ? "companies" : "drugs", to: d.companies.includes(id) ? co.id : d.id, reason: `${d.name} is credited to ${co.name}, a ${co.companyType}; a ${co.companyType} has no products of its own (src/lib/schema.ts COMPANY_TYPES), so the product page lists a funder or trials group among its makers` });
      else if (co.companyType === "cro-services") out.push({ cls: "role", rule: "developer-type", confidence: "low", from: d.id, field: "companies", to: co.id, reason: `${d.name} is credited to ${co.name}, typed as a contract research or services company` });
    }
  }
  for (const t of g.kind("trial")) for (const id of t.companies) {
    const co = g.get(id) as Company | undefined;
    if (co?.companyType === "investor") out.push({ cls: "role", rule: "sponsor-type", confidence: "medium", from: t.id, field: "companies", to: co.id, reason: `trial ${t.id} lists ${co.name}, an investor, among its companies` });
  }
  const INSTITUTION_NAME = /\b(university|universite|universita|universidad|hospital|hopital|institute|instituto|institut|cancer cent(er|re)|medical cent(er|re)|school of medicine|college)\b/i;
  const COMPANY_NAME = /\b(inc|ltd|llc|gmbh|plc|therapeutics|pharmaceuticals?|biosciences|biotherapeutics|corp)\b\.?$/i;
  for (const co of g.kind("company")) if (INSTITUTION_NAME.test(co.name) && !["nonprofit", "cooperative-group", "investor", "cro-services"].includes(co.companyType)) out.push({ cls: "role", rule: "company-is-institution", confidence: "low", from: co.id, reason: `company ${co.name} (${co.companyType}) is named like an institution` });
  for (const ins of g.kind("institution")) if (COMPANY_NAME.test(ins.name)) out.push({ cls: "role", rule: "institution-is-company", confidence: "low", from: ins.id, reason: `institution ${ins.name} is named like a company` });
  for (const p of g.kind("person")) if (p.institutionId) {
    const t = g.get(p.institutionId);
    if (t && t.kind !== "institution" && !(t.kind === "company" && t.companyType === "cooperative-group")) out.push({ cls: "role", rule: "affiliation-kind", confidence: "low", from: p.id, field: "institutionId", to: t.id, reason: `person ${p.name}'s primary affiliation is ${t.kind} ${t.id}` });
  }
  // A product's class against its name: an antibody or kinase inhibitor read as a test or device, or a named test read
  // as a medicine. Labelled imaging antibodies (zirconium-89 girentuximab) are imaging agents by design.
  const DRUG_STEM = /(mab|nib|parib|ciclib|lisib|rafenib|tinib|zomib|platin|taxel|rubicin|leucel|deruxtecan|vedotin|tecan)\b/i;
  const TEST_NAME = /\b(test|assay|cdx|panel|dx|liquid biopsy)\b/i;
  for (const d of g.kind("drug")) {
    const cls = productClass(d);
    if ((cls === "test" || cls === "device") && DRUG_STEM.test(d.name) && !TEST_NAME.test(d.name)) out.push({ cls: "role", rule: "product-class", confidence: "high", from: d.id, reason: `${d.name} reads as a medicine by its name but is classed ${cls} from its modality "${d.modality}"` });
    if (cls === "medicine" && TEST_NAME.test(d.name)) out.push({ cls: "role", rule: "product-class", confidence: "medium", from: d.id, reason: `${d.name} reads as a test by its name but is classed medicine from its modality "${d.modality}"` });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// drug-cancer

export function drugCancerFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  const pairs = new Map<string, { d: Drug; can: Cancer; field: string; from: string }>();
  for (const d of g.kind("drug")) for (const cid of d.cancers) { const can = g.get(cid); if (can?.kind === "cancer") pairs.set(`${d.id}|${cid}`, { d, can, field: "cancers", from: d.id }); }
  for (const can of g.kind("cancer")) for (const did of can.drugs) { const d = g.get(did); if (d?.kind === "drug" && !pairs.has(`${did}|${can.id}`)) pairs.set(`${did}|${can.id}`, { d, can, field: "drugs", from: can.id }); }
  const socByCancer = new Map<string, Set<string>>();
  for (const can of g.kind("cancer")) socByCancer.set(can.id, new Set<string>([...can.pipeline, ...can.standardOfCare.flatMap((r) => r.refs), ...can.history.flatMap((h) => h.refs)]));
  const thresholds = new Set<string>();
  for (const b of g.kind("biomarker")) for (const t of b.thresholds) thresholds.add(`${t.drugId}|${t.cancerId}`);
  for (const { d, can, field, from } of pairs.values()) {
    if (GENERIC_CANCER.test(can.name) || GENERIC_CANCER.test(can.id.replace(/-/g, " "))) continue;
    const fam = c.family(can.id);
    const inFam = (ids: Iterable<string>) => { for (const id of ids) if (fam.has(id)) return true; return false; };
    const trials = [...c.linked(d, "trial")].map((id) => g.get(id) as Trial).filter((t) => t?.kind === "trial");
    if (trials.some((t) => inFam(t.cancers))) continue;
    const papers = [...c.linked(d, "paper")].map((id) => g.get(id) as Paper).filter((p) => p?.kind === "paper");
    if (papers.some((p) => inFam(p.cancers) || [...fam].some((f) => (g.get(f) as Cancer).keyPapers.includes(p.id)))) continue;
    if ([...fam].some((f) => socByCancer.get(f)?.has(d.id))) continue;
    if ([...fam].some((f) => thresholds.has(`${d.id}|${f}`))) continue;
    if ([...c.linked(d, "pairing")].some((pid) => { const p = g.get(pid)!; return p.kind === "pairing" && (fam.has(p.a) || fam.has(p.b) || inFam(p.cancers)); })) continue;
    const famEnts = [...fam].map((f) => g.get(f)!).filter(Boolean);
    const approvalText = norm(d.approvals.map((a) => a.indication).join(" ") + " " + d.regulatoryEvents.map((r) => `${r.indication ?? ""} ${r.note}`).join(" "));
    if (famEnts.some((f) => c.names(f).some((v) => has(approvalText, v)))) continue;
    const textBoth = famEnts.some((f) => c.mentions(d, f)) || famEnts.some((f) => c.mentions(f, d));
    const cls = productClass(d);
    // The strongest case: the cancer names the product, the product names its own cancers, and this one is not among them.
    const disowned = field === "drugs" && d.cancers.length > 0 && !inFam(d.cancers);
    const confidence: Confidence = textBoth || d.supportive ? "low" : disowned && cls !== "test" ? "high" : "medium";
    out.push({
      cls: "drug-cancer", rule: cls === "medicine" ? "medicine" : "non-medicine", confidence,
      from, field, to: from === d.id ? can.id : d.id,
      reason: `${d.name} (${cls}${d.supportive ? ", supportive" : ""}) is linked to ${can.name} with no trial, key paper, approval, standard-of-care, history, pipeline or threshold row pairing them${textBoth ? "; only free text names them together" : ", and neither record's text names the other"}${disowned ? `; the product's own cancers are ${d.cancers.slice(0, 4).join(", ")}` : ""}`,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// trial-drug and trial-cancer

export function trialFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  for (const t of g.kind("trial")) {
    const drugIds = new Set([...t.drugs, ...(g.incoming(t.id).get("drug") ?? []).filter((d) => d.kind === "drug" && d.trials.includes(t.id)).map((d) => d.id)]);
    const tDrugs = [...drugIds].map((id) => g.get(id)).filter((d): d is Drug => d?.kind === "drug");
    const tText = c.text(t);
    const ct = c.ctgov(t);
    const raw = `${t.name} ${t.aka.join(" ")} ${t.tldr} ${t.summary} ${"setting" in t ? t.setting : ""} ${t.result ?? ""}`;
    for (const d of tDrugs) {
      if (c.mentions(t, d) || c.mentions(d, t)) continue;
      if (tDrugs.some((o) => o.id !== d.id && c.mentions(t, o) && c.mentions(o, d))) continue;
      const dn = norm(d.name).trim();
      if (REGIMENS.some(([re, list]) => re.test(raw) && list.some((x) => dn === x || dn.startsWith(x + " ")))) continue;
      if (ct && c.names(d).some((v) => has(ct, v))) continue;
      const field = t.drugs.includes(d.id) ? "drugs" : "trials";
      const umbrella = UMBRELLA.test(raw);
      // Measured: even with the registry entry silent, most were real components the text never spells out (bone
      // agents made mandatory by a protocol amendment, a sponsor's own test), so the class tops out at medium.
      const confidence: Confidence = umbrella && !ct ? "low" : "medium";
      out.push({ cls: "trial-drug", rule: "unnamed-drug", confidence, from: field === "drugs" ? t.id : d.id, field, to: field === "drugs" ? d.id : t.id, reason: `trial ${t.name} is linked to ${d.name}, which the trial record${ct ? " and its ClinicalTrials.gov entry" : ""} never name${umbrella ? " (the trial speaks of unnamed regimens or other treatments)" : ""}, and the product record never names the trial` });
    }
    for (const cid of t.cancers) {
      const can = g.get(cid);
      if (can?.kind !== "cancer" || GENERIC_CANCER.test(can.name)) continue;
      const fam = [...c.family(cid)].map((f) => g.get(f)!).filter(Boolean);
      if (fam.some((f) => c.names(f).some((v) => has(tText, v)))) continue;
      if (c.mentions(can, t)) continue;
      if (ct && fam.some((f) => c.names(f).some((v) => has(ct, v)))) continue;
      const group = norm((can as Cancer).group);
      const groupHit = group.trim().length >= 4 && (has(tText, group) || (!!ct && has(ct, group)));
      out.push({ cls: "trial-cancer", rule: "unnamed-cancer", confidence: groupHit ? "low" : "medium", from: t.id, field: "cancers", to: cid, reason: `trial ${t.name} is linked to ${can.name}, which neither the trial's text${ct ? ", its ClinicalTrials.gov conditions" : ""} nor any cancer in its family names${groupHit ? " (only the organ group word)" : ""}` });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// company–product

export function companyFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  const acquired = new Map<string, string[]>();
  for (const co of g.kind("company")) if (co.acquiredBy) acquired.set(co.acquiredBy, [...(acquired.get(co.acquiredBy) ?? []), co.id]);
  const byFirstWord = new Map<string, Company[]>();
  // Place names lead many company names and say nothing about which company is meant.
  const PLACE = /^(shanghai|beijing|jiangsu|zhejiang|suzhou|hangzhou|guangzhou|shenzhen|sichuan|nanjing|chengdu|qilu|hunan|hubei|shandong|tianjin|chongqing|wuhan|hong|korea|korean|japan|japanese|india|indian|china|chinese|taiwan|united|first|north|south|east|west|swiss|german|french|british|american|european|asia|pacific)$/;
  for (const co of g.kind("company")) { const w = norm(co.name).trim().split(" ")[0]; if (w.length >= 4 && !GENERIC.has(w) && !PLACE.test(w)) byFirstWord.set(w, [...(byFirstWord.get(w) ?? []), co]); }
  // A parent and its own subsidiary (Biocon and Biocon Biologics) share a first word by design.
  const nested = (a: Company, b: Company) => { const x = norm(a.name.replace(/\s*\(.*?\)\s*/g, " ")), y = norm(b.name.replace(/\s*\(.*?\)\s*/g, " ")); return x.includes(y) || y.includes(x) || a.acquiredBy === b.id || b.acquiredBy === a.id || a.companies.includes(b.id) || b.companies.includes(a.id); };
  for (const d of g.kind("drug")) {
    const declared = new Map<string, string>();
    for (const id of d.companies) declared.set(id, "companies");
    for (const co of g.incoming(d.id).get("company") ?? []) if (co.kind === "company" && co.drugs.includes(d.id) && !declared.has(co.id)) declared.set(co.id, "drugs");
    const trials = [...c.linked(d, "trial")].map((id) => g.get(id) as Trial).filter((t) => t?.kind === "trial");
    for (const [id, field] of declared) {
      const co = g.get(id) as Company | undefined;
      if (co?.kind !== "company") continue;
      // A namesake company: Merck & Co. credited where the product text names Merck KGaA, or the other way round.
      const first = norm(co.name).trim().split(" ")[0];
      const twins = (byFirstWord.get(first) ?? []).filter((o) => o.id !== co.id && !nested(o, co));
      const twin = twins.find((o) => !declared.has(o.id) && norm(d.summary + " " + d.tldr + " " + d.modality).includes(norm(o.name.replace(/\s*\(.*?\)\s*/g, " ")).trim()));
      const twinCredited = twins.find((o) => declared.has(o.id));
      if (twin || twinCredited) out.push({ cls: "company", rule: "namesake-company", confidence: twinCredited ? "high" : "medium", from: field === "companies" ? d.id : co.id, field, to: field === "companies" ? co.id : d.id, reason: `${d.name} is credited to ${co.name}${twinCredited ? ` and also to its namesake ${twinCredited.name}` : `, while its text names the namesake ${twin!.name}`}` });
      if (c.mentions(d, co) || c.mentions(co, d)) continue;
      if (trials.some((t) => t.companies.includes(co.id) || (t.sponsor && resolveSponsor(t.sponsor).id === co.id) || c.mentions(t, co))) continue;
      const kin = [...(acquired.get(co.id) ?? []), ...(co.acquiredBy ? [co.acquiredBy] : [])].map((k) => g.get(k)!).filter(Boolean);
      if (kin.some((k) => c.mentions(d, k) || d.companies.includes(k.id))) continue;
      // Declared only on the company's side, while the product names other makers and not this one.
      const disowned = field === "drugs" && d.companies.length > 0;
      out.push({ cls: "company", rule: "unjoined-company", confidence: disowned ? "high" : "low", from: field === "companies" ? d.id : co.id, field, to: field === "companies" ? co.id : d.id, reason: `${d.name} is credited to ${co.name}, but neither record names the other, no trial of the product lists the company, and no acquisition in the corpus joins them${disowned ? `; only the company claims it, and the product names ${d.companies.slice(0, 3).join(", ")} as its makers` : ""}` });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// time

const yearOf = (s: string | undefined) => (s ? Number(s.slice(0, 4)) : undefined);
/** "founded in 1952" or "established in 1972", said of the record itself: the first sentence of its tldr or summary. */
const FOUNDED_RE = /\b(?:was |is |, )?(?:founded|established)\s+(?:in\s+)?(1[89]\d\d|20\d\d)\b/i;
const SUCCESSION_RE = /\b(spun (?:off|out)|spin-?off|spin-?out|demerg|formerly|successor|renamed|merger|merged|formed from|formed by|carved out|split from)\b/i;

export function institutionFounded(e: Entity): number | undefined {
  const first = (s: string) => s.split(/[.;]\s/)[0];
  const m = `${first(e.tldr)} ${first(e.summary)}`.match(FOUNDED_RE);
  return m ? Number(m[1]) : undefined;
}

export function timeFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  const hasPredecessor = new Set<string>();
  for (const co of g.kind("company")) if (co.acquiredBy) hasPredecessor.add(co.acquiredBy);
  for (const t of g.kind("trial")) {
    const y = yearOf(t.started);
    const yEnd = t.yearReported;
    const yRef = y ?? yEnd;
    if (!yRef) continue;
    const when = `${y ? `started (${t.started})` : `reported (${yEnd})`}${yEnd && y ? ` and reported (${yEnd})` : ""}`;
    const cos = new Set([...t.companies, ...(g.incoming(t.id).get("company") ?? []).filter((x) => x.kind === "company" && x.trials.includes(t.id)).map((x) => x.id)]);
    for (const id of cos) {
      const co = g.get(id) as Company | undefined;
      if (!co?.founded || co.founded <= (yEnd ?? yRef)) continue;
      const succ = hasPredecessor.has(co.id) || SUCCESSION_RE.test(`${co.tldr} ${co.summary}`);
      const here = t.companies.includes(id);
      out.push({ cls: "time", rule: "company-after-trial", confidence: succ ? "low" : "high", from: here ? t.id : id, field: here ? "companies" : "trials", to: here ? id : t.id, reason: `${co.name} was founded in ${co.founded}, after trial ${t.name} ${when}${succ ? "; the company has a predecessor or successor in the corpus, so this may be inherited" : ""}` });
    }
    const insts = new Set([...t.institutions, ...(g.incoming(t.id).get("institution") ?? []).filter((x) => x.kind === "institution" && x.trials.includes(t.id)).map((x) => x.id)]);
    for (const id of insts) {
      const ins = g.get(id)!;
      const f = institutionFounded(ins);
      if (!f || f <= (yEnd ?? yRef)) continue;
      const here = t.institutions.includes(id);
      out.push({ cls: "time", rule: "institution-after-trial", confidence: "high", from: here ? t.id : id, field: here ? "institutions" : "trials", to: here ? id : t.id, reason: `${ins.name} was founded in ${f} by its own record's first sentence, after trial ${t.name} ${when}` });
    }
    // A paper that names a trial cannot be published before the trial starts. A background paper linked to a later
    // trial is not an impossibility, only a weaker link, and stays low.
    if (y && (t.startedType ?? "actual") === "actual") {
      const papers = new Set([...t.keyPapers, ...(g.incoming(t.id).get("paper") ?? []).filter((p) => p.kind === "paper" && p.trials.includes(t.id)).map((p) => p.id)]);
      for (const pid of papers) {
        const p = g.get(pid) as Paper;
        if (p?.kind !== "paper" || p.year >= y) continue;
        const namesIt = c.names(t).some((v) => v.trim().length >= 4 && has(norm(`${p.name} ${p.aka.join(" ")}`), v));
        const here = t.keyPapers.includes(pid);
        // Measured: design papers, earlier trials of the same name and background papers all precede a start date, so
        // even a paper whose title names the trial is for review rather than a certain error.
        out.push({ cls: "time", rule: "paper-before-trial", confidence: namesIt ? "medium" : "low", from: here ? t.id : pid, field: here ? "keyPapers" : "trials", to: here ? pid : t.id, reason: `${p.paperType} paper ${p.name} (${p.year}) is linked to trial ${t.name}, which started in ${t.started}${namesIt ? "; the paper's title names the trial, so either the link points at a namesake or a date is wrong" : "; a background paper, not a report of the trial"}` });
      }
    }
  }
  for (const d of g.kind("drug")) {
    const first = Math.min(...d.approvals.map((a) => a.year).filter((yy) => yy > 1900));
    if (!Number.isFinite(first)) continue;
    for (const id of d.companies) {
      const co = g.get(id) as Company | undefined;
      if (!co?.founded || co.founded <= first) continue;
      out.push({ cls: "time", rule: "company-after-approval", confidence: "low", from: d.id, field: "companies", to: co.id, reason: `${co.name} was founded in ${co.founded}, after ${d.name}'s first approval (${first}); right for a later marketer or licensee, wrong for a credited developer` });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// target

export function targetFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  const targets = g.kind("target");
  for (const d of g.kind("drug")) {
    if (productClass(d) !== "medicine" || !d.targets.length) continue;
    const own = norm(`${d.name} ${d.modality} ${d.mechanism}`);
    const named = targets.filter((t) => [...nameKeys(t)].some((k) => has(own, ` ${k} `)));
    for (const tid of d.targets) {
      const tg = g.get(tid);
      if (tg?.kind !== "target") continue;
      if (c.mentions(d, tg) || c.mentions(tg, d)) continue;
      // The drug's own modality and mechanism name a target it is not linked to, and never this one.
      // Measured: a multi-kinase or pan-family drug names one family member and hits the rest (lenvatinib and FGFR2,
      // pasireotide and SSTR2), so a sibling of the linked target, or a mechanism that says it hits many, is no evidence.
      const sym = (x: Entity) => norm(fieldsText(x, ["symbol"])[0] ?? x.name).trim().slice(0, 4);
      const broad = /\b(multi|pan-|broad|several|multiple|including|such as|family)/i.test(`${d.modality} ${d.mechanism}`);
      // Except an isoform: a target named for one isoform (PI3K-alpha) and a drug whose text names another (PI3K delta).
      const iso = norm(tg.name).match(/ (alpha|beta|gamma|delta|epsilon) /)?.[0];
      const isoMismatch = !!iso && !has(own, iso);
      const instead = named.filter((t) => !d.targets.includes(t.id) && (isoMismatch || sym(t) !== sym(tg)));
      out.push({ cls: "target", rule: "drug-target", confidence: instead.length && !broad ? "high" : "medium", from: d.id, field: "targets", to: tid, reason: `${d.name} is linked to target ${tg.name}, which neither record's text names${instead.length ? `; its modality and mechanism name ${instead.slice(0, 3).map((t) => t.name).join(", ")} instead` : ""}` });
    }
  }
  for (const t of g.kind("trial")) {
    const drugs = [...c.linked(t, "drug")].map((id) => g.get(id) as Drug).filter((d) => d?.kind === "drug");
    const hit = new Set(drugs.flatMap((d) => d.targets));
    for (const tid of t.targets) {
      const tg = g.get(tid);
      if (tg?.kind !== "target" || hit.has(tid)) continue;
      if (c.mentions(t, tg) || drugs.some((d) => c.mentions(d, tg))) continue;
      out.push({ cls: "target", rule: "trial-target", confidence: hit.size ? "medium" : "low", from: t.id, field: "targets", to: tid, reason: `trial ${t.name} is linked to target ${tg.name}; none of its ${drugs.length} linked product(s) hits it${hit.size ? ` (they hit ${[...hit].slice(0, 4).join(", ")})` : ""} and neither the trial nor its products name it; often a selection biomarker filed as a target` });
    }
  }
  for (const p of g.kind("pathway") as Pathway[]) {
    const nodeTargets = new Set(p.nodes.map((n) => n.targetId).filter(Boolean) as string[]);
    const pDrugs = [...c.linked(p, "drug")].map((id) => g.get(id) as Drug).filter((d) => d?.kind === "drug");
    for (const tid of p.targets) {
      const tg = g.get(tid);
      if (tg?.kind !== "target" || nodeTargets.has(tid)) continue;
      if (pDrugs.some((d) => d.targets.includes(tid))) continue;
      if (c.mentions(p, tg) || c.mentions(tg, p)) continue;
      out.push({ cls: "target", rule: "pathway-target", confidence: "low", from: p.id, field: "targets", to: tid, reason: `pathway ${p.name} lists target ${tg.name}, which is not one of its drawn nodes, no product linked to the pathway hits it, and neither record names the other` });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// fragment: regular expressions that fire on a corpus input only from the middle of a word

export type RegexSite = { file: string; line: number; source: string; flags: string };

/** Regex literals in a TypeScript file, found by the token that precedes a slash. Crude, but every hit is compiled. */
export function regexLiterals(file: string, text: string): RegexSite[] {
  const out: RegexSite[] = [];
  const re = /(^|[=(,[:!&|?;{}]|\breturn|\btest|\bmatch)\s*\/((?:\\.|\[(?:\\.|[^\]\\\n])*\]|[^/\\\n[])+)\/([dgimsuy]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const source = m[2];
    if (!/[a-z]{3}/i.test(source) || source.startsWith("/") || source.startsWith("*")) continue;
    try { new RegExp(source, m[3].replace(/[gyd]/g, "")); } catch { continue; }
    out.push({ file, line: text.slice(0, m.index).split("\n").length, source, flags: m[3] });
  }
  return out;
}

/**
 * The strings the corpus's classifiers and matchers run over: modality and mechanism text, toxicity events, names and
 * aliases, tags, trial settings and sponsors. Short fields only.
 */
export function corpusInputs(g: Graph): string[] {
  const out = new Set<string>();
  const add = (s: unknown) => { if (typeof s === "string" && s.length > 2 && s.length < 400) out.add(s.toLowerCase().replace(/\n/g, " ")); };
  for (const e of g.entities) {
    add(e.name); e.aka.forEach(add); e.tags.forEach(add);
    for (const s of fieldsText(e, ["modality", "mechanism", "setting", "sponsor", "role", "brand"])) add(s);
    if (e.kind === "drug") for (const t of e.toxicity) add(t.event);
  }
  return [...out];
}

/** The inputs on which `site` fires only from the middle of a word: a match exists, a word-bounded match does not. */
export function midWordInputs(site: RegexSite, inputs: string[], joined?: string): string[] {
  const flags = [...new Set(("gi" + site.flags.replace(/[yd]/g, "")).split(""))].join("");
  let re: RegExp, bounded: RegExp;
  try {
    re = new RegExp(site.source, flags);
    // The word-bounded twin, built at run time with a lookbehind.
    bounded = new RegExp(`(?<![a-z0-9])(?:${site.source})`, flags.replace("g", ""));
  } catch { return []; }
  const hay = joined ?? inputs.join("\n");
  const hits = new Set<string>();
  let m: RegExpExecArray | null;
  let guard = 0;
  while ((m = re.exec(hay)) && guard++ < 200000) {
    if (m[0].length === 0) { re.lastIndex++; continue; }
    const s = m.index;
    const ls = hay.lastIndexOf("\n", s) + 1, le = hay.indexOf("\n", s);
    if (/[a-z0-9]/.test(hay[s - 1] ?? " ") && s > ls && /[a-z0-9]/.test(m[0][0])) {
      const line = hay.slice(ls, le < 0 ? undefined : le);
      if (!bounded.test(line)) hits.add(line);
    }
    re.lastIndex = le < 0 ? hay.length : le;
    if (hits.size >= 50) break;
  }
  return [...hits];
}

const FRAGMENT_SCOPE = ["src/lib", "src/data"];
/** Files whose regexes decide what content attaches to which record, or what a product is called. */
export const ATTACH_FILE = /(red-cards|red-flags|side-effects|interactions|supportive|product-class|sponsor|modalit|irae|resistance|regimen|checkpoint|entity-matcher|biomarker-match|complementary|term-hover|relevance|questions|decisions|for-me|first-60|survivorship|tags|guideline|ask-intent|ask-lexicon)/;
/** Patterns over identifiers, URLs, dates and file names, which never run over names and modality text. */
const NOT_PROSE = /https?|\\d\{4\}|\^\[a-z0-9\]|\.tsx?|\\\/|NCT|\[A-Z\]/;

export function regexSites(root = process.cwd()): RegexSite[] {
  const out: RegexSite[] = [];
  const walk = (d: string): string[] => readdirSync(join(root, d), { withFileTypes: true }).flatMap((f) => f.isDirectory() ? walk(`${d}/${f.name}`) : /\.tsx?$/.test(f.name) && !/\.test\.tsx?$/.test(f.name) ? [`${d}/${f.name}`] : []);
  for (const dir of FRAGMENT_SCOPE) for (const file of walk(dir)) {
    const text = readFileSync(join(root, file), "utf8");
    if (text.length > 3_000_000) continue;
    for (const site of regexLiterals(file, text)) if (!NOT_PROSE.test(site.source)) out.push(site);
  }
  return out;
}

export function fragmentFindings(g: Graph, root = process.cwd()): Finding[] {
  const inputs = corpusInputs(g);
  const joined = inputs.join("\n");
  const out: Finding[] = [];
  for (const site of regexSites(root)) {
    const hits = midWordInputs(site, inputs, joined);
    if (!hits.length) continue;
    const attach = ATTACH_FILE.test(site.file);
    out.push({ cls: "fragment", rule: attach ? "attach-file" : "other-file", confidence: attach ? "medium" : "low", from: `${site.file}:${site.line}`, reason: `/${site.source.length > 120 ? site.source.slice(0, 117) + "..." : site.source}/${site.flags} fires only mid-word on ${hits.length}${hits.length >= 50 ? "+" : ""} corpus input(s), e.g. ${hits.slice(0, 4).map((h) => `"${h.slice(0, 70)}"`).join(", ")}` });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// sponsor: an alias pattern that turns one corpus record's own name into another record

export function sponsorFindings(g: Graph): Finding[] {
  const out: Finding[] = [];
  const known = new Set([...g.kind("company"), ...g.kind("institution")].map((e) => e.id));
  for (const e of [...g.kind("company"), ...g.kind("institution")]) {
    for (const n of [e.name, ...e.aka]) {
      const r = resolveSponsor(n);
      if (!r.matched || !r.id || r.id === e.id || !known.has(r.id)) continue;
      if (e.kind === "company" && e.acquiredBy === r.id) continue;
      const target = g.get(r.id)!;
      if (e.kind === "company" && (e.companies.includes(r.id) || (target.kind === "company" && target.companies.includes(e.id)))) continue;
      // A site or division of the record it resolves to (Mayo Clinic Arizona, City of Hope Orange County) shares its
      // distinctive first word and is a lesser problem than an unrelated record.
      const w = (s: string) => norm(s).trim().split(" ").find((x) => !GENERIC.has(x) && x.length >= 3) ?? "";
      const kin = w(n) !== "" && (w(n) === w(target.name) || target.aka.some((a) => w(a) === w(n)) || /\b(acquired|part of|subsidiary)\b/i.test(e.summary) || /\(.+\)/.test(n) && norm(n).includes(norm(r.label).trim().split(" ")[0]));
      out.push({ cls: "sponsor", rule: "alias-collision", confidence: kin ? "low" : target.kind !== e.kind ? "high" : "medium", from: e.id, to: r.id, reason: `src/data/sponsor-aliases.ts resolves "${n}" (the name of ${e.kind} ${e.id}) to ${target.kind} ${r.id} (${r.label}); trials sponsored by ${e.name} are counted for ${target.name}` });
      break;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// name: same-name records where a link points at the one outside the linking record's cancers; generic aliases

const GENERIC_ALIAS = /^(inc\.?|ltd\.?|llc|plc|co\.?|corp\.?|s\.?a\.?|ag|gmbh|the|group|bio|pharma|therapeutics|oncology|cancer|trial|study|test|drug|n\/a|none|tbd|other)$/i;
/** Which linking kinds give a cancer context that identifies the linked record, and which kinds they may link. */
const NAME_CONTEXT: Partial<Record<Kind, Kind[]>> = { institution: ["trial"], company: ["trial"], cancer: ["trial", "drug"], trial: ["drug"], paper: ["trial"] };

export function nameFindings(c: Ctx): Finding[] {
  const { g } = c;
  const out: Finding[] = [];
  // A record genuinely called "Oncology" (the journal) may carry its own name as an alias.
  for (const e of g.entities) for (const a of e.aka) if ((GENERIC_ALIAS.test(a.trim()) || a.trim().length < 2) && norm(a) !== norm(e.name.replace(/\s*\(.*?\)\s*/g, " "))) out.push({ cls: "name", rule: "generic-alias", confidence: "high", from: e.id, reason: `${e.kind} ${e.id} carries the alias "${a}", a generic word that any matcher by alias will hit` });
  const byName = new Map<string, Entity[]>();
  for (const e of g.entities) {
    if (e.kind !== "trial" && e.kind !== "drug") continue;
    for (const n of new Set([e.name, e.name.replace(/\s*\(.*?\)\s*/g, " "), ...e.aka].map((s) => norm(s).trim()))) {
      if (n.length < 3) continue;
      const list: Entity[] = byName.get(`${e.kind}|${n}`) ?? [];
      if (!list.includes(e)) list.push(e);
      byName.set(`${e.kind}|${n}`, list);
    }
  }
  const cancersOf = (e: Entity): Set<string> => {
    const s = new Set<string>();
    for (const id of e.kind === "cancer" ? [e.id] : e.cancers) for (const f of c.family(id)) s.add(f);
    return s;
  };
  const seen = new Set<string>();
  for (const [key, list] of byName) {
    if (list.length < 2) continue;
    for (const x of list) {
      const xc = cancersOf(x);
      for (const [kind, froms] of g.incoming(x.id)) {
        if (!NAME_CONTEXT[kind]?.includes(x.kind)) continue;
        for (const from of froms) {
          const k = `${from.id}>${x.id}`;
          if (seen.has(k)) continue;
          const fc = cancersOf(from);
          if (!fc.size || !xc.size) continue;
          const fits = (e: Entity) => [...cancersOf(e)].some((id) => fc.has(id));
          if (fits(x)) continue;
          const better = list.filter((y) => y.id !== x.id && fits(y) && !REL_FIELDS.some((f) => from[f].includes(y.id)));
          if (!better.length) continue;
          seen.add(k);
          out.push({ cls: "name", rule: "namesake", confidence: "high", from: from.id, to: x.id, reason: `${from.kind} ${from.id} links ${x.kind} ${x.id} ("${key.split("|")[1]}"), whose cancers do not overlap its own; the namesake ${better.map((b) => b.id).join(", ")} does` });
        }
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------

export function audit(g: Graph = graph(), opts: { fragments?: boolean; ctgovDir?: string | null } = {}): Finding[] {
  const c = makeCtx(g, { ctgovDir: opts.ctgovDir });
  return [
    ...roleFindings(c), ...drugCancerFindings(c), ...trialFindings(c), ...companyFindings(c), ...timeFindings(c), ...targetFindings(c),
    ...(opts.fragments === false ? [] : fragmentFindings(g)), ...sponsorFindings(g), ...nameFindings(c),
  ];
}

export function counts(findings: Finding[]): Record<string, Record<Confidence, number>> {
  const out: Record<string, Record<Confidence, number>> = {};
  for (const f of findings) {
    const k = `${f.cls}/${f.rule}`;
    out[k] ??= { high: 0, medium: 0, low: 0 };
    out[k][f.confidence] += 1;
  }
  return out;
}

async function fetchCtgov(findings: Finding[]): Promise<void> {
  const g = graph();
  const ncts = new Set<string>();
  for (const f of findings) if (f.cls === "trial-drug" || f.cls === "trial-cancer") {
    const t = g.get(f.from)?.kind === "trial" ? g.get(f.from) : g.get(f.to ?? "");
    const nct = t?.kind === "trial" ? (t.nct ?? (/^nct\d{8}$/.test(t.id) ? t.id.toUpperCase() : undefined)) : undefined;
    if (nct && /^NCT\d{8}$/.test(nct) && !existsSync(join(CTGOV_CACHE, `${nct}.json`))) ncts.add(nct);
  }
  mkdirSync(CTGOV_CACHE, { recursive: true });
  const list = [...ncts];
  console.log(`${list.length} ClinicalTrials.gov records to cache`);
  for (let i = 0; i < list.length; i += 50) {
    const ids = list.slice(i, i + 50);
    const url = `https://clinicaltrials.gov/api/v2/studies?filter.ids=${ids.join(",")}&pageSize=50&fields=NCTId,BriefTitle,OfficialTitle,Acronym,Condition,Keyword,InterventionName,InterventionOtherName,InterventionDescription,ArmGroupLabel,ArmGroupDescription,BriefSummary,LeadSponsorName`;
    const res = await fetch(url);
    if (!res.ok) { console.error(`HTTP ${res.status} for batch ${i}`); continue; }
    const body = (await res.json()) as { studies?: Array<CtStudy & { protocolSection: { identificationModule: { nctId: string } } }> };
    for (const s of body.studies ?? []) writeFileSync(join(CTGOV_CACHE, `${s.protocolSection.identificationModule.nctId}.json`), JSON.stringify(s));
    await new Promise((r) => setTimeout(r, 800));
  }
}

export const FLOOR_FILE = "src/data/link-sense-floor.json";

/** Every finding per class/rule, all confidences, without registry evidence: the measure the ratchet keeps from growing. */
export function floorCounts(findings: Finding[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const f of findings) out[`${f.cls}/${f.rule}`] = (out[`${f.cls}/${f.rule}`] ?? 0) + 1;
  return Object.fromEntries(Object.entries(out).sort());
}

/** Lower the floor to today's counts. It never raises one: a count above its floor is fixed in the corpus, not here. */
function writeFloor(): void {
  const now = floorCounts(audit(graph(), { ctgovDir: null }));
  const old = existsSync(FLOOR_FILE) ? (JSON.parse(readFileSync(FLOOR_FILE, "utf8")).counts as Record<string, number>) : undefined;
  const next: Record<string, number> = {};
  for (const k of new Set([...Object.keys(now), ...Object.keys(old ?? {})])) next[k] = old && k in old ? Math.min(old[k], now[k] ?? 0) : now[k] ?? 0;
  const raised = Object.entries(now).filter(([k, v]) => old && v > (old[k] ?? 0));
  if (raised.length) console.error(`Above the floor, not raised: ${raised.map(([k, v]) => `${k} ${v} > ${old![k] ?? 0}`).join("; ")}`);
  writeFileSync(FLOOR_FILE, JSON.stringify({ note: "Link-sense ratchet (scripts/link-sense-audit.ts, checked by scripts/link-sense-audit.test.ts): findings per class/rule, all confidences, without ClinicalTrials.gov evidence. Lower with `npx tsx scripts/link-sense-audit.ts --write-floor`; never raise.", counts: Object.fromEntries(Object.entries(next).sort()) }, null, 1) + "\n");
  console.log(`floor written to ${FLOOR_FILE}`);
}

async function main() {
  if (process.argv.includes("--write-floor")) return writeFloor();
  if (process.argv.includes("--fetch-ctgov")) await fetchCtgov(audit(graph(), { fragments: false, ctgovDir: null }));
  const findings = audit();
  const tally = counts(findings);
  if (process.argv.includes("--counts")) {
    for (const [k, v] of Object.entries(tally).sort()) console.log(`${k.padEnd(36)} high ${String(v.high).padStart(5)}  medium ${String(v.medium).padStart(5)}  low ${String(v.low).padStart(5)}`);
    return;
  }
  const generated = new Date().toISOString().slice(0, 10);
  const cached = existsSync(CTGOV_CACHE) ? readdirSync(CTGOV_CACHE).length : 0;
  // One finding per line: diffable from one run to the next without the bulk of full indentation.
  writeFileSync("docs/proposals/link-sense-audit.json", `{"generated": ${JSON.stringify(generated)}, "ctgovCached": ${cached},\n"counts": ${JSON.stringify(tally)},\n"findings": [\n${findings.map((f) => JSON.stringify(f)).join(",\n")}\n]}\n`);
  const rank: Record<Confidence, number> = { high: 0, medium: 1, low: 2 };
  const lines = [
    "# Link-sense audit", "",
    `Generated ${generated} by \`npx tsx scripts/link-sense-audit.ts\` (${cached} ClinicalTrials.gov records cached). Read-only: links that`,
    "resolve but imply something false. The measured precision per class, the fixes made and the guards are in",
    "docs/proposals/link-sense-strategies.md. Every finding, including the low-confidence ones, is in the JSON beside this file.", "",
    "| Class / rule | High | Medium | Low |", "|---|---:|---:|---:|",
    ...Object.entries(tally).sort().map(([k, v]) => `| ${k} | ${v.high} | ${v.medium} | ${v.low} |`), "",
  ];
  for (const cls of CLASSES) {
    const list = findings.filter((f) => f.cls === cls && f.confidence !== "low").sort((a, b) => rank[a.confidence] - rank[b.confidence] || a.rule.localeCompare(b.rule) || a.from.localeCompare(b.from));
    if (!list.length) continue;
    lines.push(`## ${cls}`, "", `${list.length} high or medium${list.length > 150 ? " (first 150 shown)" : ""}.`, "");
    for (const f of list.slice(0, 150)) lines.push(`- **${f.confidence}** \`${f.rule}\` ${f.from}${f.field ? `.${f.field}` : ""}${f.to ? ` → ${f.to}` : ""}: ${f.reason}`);
    lines.push("");
  }
  writeFileSync("docs/proposals/link-sense-audit.md", lines.join("\n"));
  console.log(`${findings.length} findings written to docs/proposals/link-sense-audit.{md,json}`);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
