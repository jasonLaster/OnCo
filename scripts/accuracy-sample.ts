/**
 * The corpus's measured error rate: draw a reproducible, stratified sample of load-bearing claims, record a verdict
 * for each against its cited primary source, and keep the per-stratum rates in a ledger so they can be tracked.
 *
 * Owner, 3 November 2026: "its highly important we have the most comprehensive oncology site in coverage and
 * accuracy for humanity". Coverage can be counted; accuracy has to be measured by reading sources. This is the
 * measurement: the registry checks (scripts/factcheck.ts, scripts/paper-ids.ts, scripts/check-link-dois.ts) catch
 * what a machine can, and this samples what only a reader can, so the rate is an estimate for the whole corpus.
 *
 *   draw     npx tsx scripts/accuracy-sample.ts draw [--seed 20261103] [--n 190]
 *            Writes docs/audits/accuracy/sample-<date>-<seed>.json. Same seed and same corpus, same sample.
 *   verdict  npx tsx scripts/accuracy-sample.ts verdict <sample.json> <claim-id> <verdict> "<what the source says>" [<source url>]
 *   report   npx tsx scripts/accuracy-sample.ts report <sample.json> [--ledger]
 *            Per-stratum rates with Wilson 95% intervals; --ledger appends (or replaces) the round in ledger.json.
 *
 * Strata and weights. Each stratum is a kind of claim a reader acts on (a survival figure, an approval, a trial's
 * phase, a paper's identifiers, a company's owner, a person's post). Within a stratum, claims are drawn without
 * replacement with probability proportional to how many readers meet them, estimated as 1 + log2(1 + the number of
 * records that link to the record), and tripled for records written in the last month, which have had the least
 * review (NEW_FILES). Strata are fixed quotas, so a rate is per stratum; the overall figure weights strata equally
 * and is labelled as such.
 *
 * Verdicts, from docs/audits/accuracy/README in the sample file's own `verdicts` key:
 *   correct       the cited source says this
 *   stale         the source said it, a newer primary source says otherwise
 *   imprecise     right direction, wrong detail: overstated, a figure from the wrong cohort, a rounded CI
 *   wrong         the source does not say this, or says the opposite; includes an identifier for another paper
 *   unsourced     no source on the record bears on the claim
 *   unreachable   the source could not be read (paywall, 403, PDF that refuses a script); not counted as an error
 * The error rate is (stale + imprecise + wrong + unsourced) / (all - unreachable); "wrong" alone is reported too.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor, type Entity } from "../src/lib/schema";
import { PRECISION_ROWS } from "../src/data/precision-matrix";

export const VERDICTS = ["correct", "stale", "imprecise", "wrong", "unsourced", "unreachable"] as const;
export type Verdict = (typeof VERDICTS)[number];
export type Claim = {
  id: string; stratum: Stratum; recordId: string; kind: string; route: string; field: string; claim: string;
  sources: string[]; weight: number; isNew: boolean;
  verdict?: Verdict; note?: string; checkedSource?: string; fixed?: string;
};
export type Sample = { drawn: string; seed: number; corpusSize: number; quotas: Record<string, number>; verdicts: Record<Verdict, string>; claims: Claim[] };

export const STRATA = {
  "paper-identifiers": 15, "paper-findings": 20, "trial-facts": 25, "drug-approvals": 20, "drug-numbers": 10,
  "cancer-numbers": 20, "tests": 15, "companies": 20, "people": 15, "precision-rows": 10, "country-cards": 12,
} as const;
export type Stratum = keyof typeof STRATA;

const DIR = join(process.cwd(), "docs", "audits", "accuracy");
const LEDGER = join(DIR, "ledger.json");

/** Data files written in the month before this sampler was built; their records have had the least review. */
export const NEW_FILES = /companies-new-2026-|companies-prometheus-gaps-|prometheus-gaps-|mced-census|papers-watch-2026-11|parp-selective-review|precision-matrix\/|spikes\/precision-|spikes\/protocol-upgrades-|spikes\/lymphoma-|spikes\/hodgkin-|targets-immune-markers|trop2-|ucsf-breast-trials|key-papers\/cancer-neuroscience|country-/;

/** mulberry32: small, seedable, the same sequence on every machine. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Weighted sampling without replacement (Efraimidis-Spirakis): key u^(1/w), keep the k largest. */
export function weightedSample<T extends { weight: number }>(items: T[], k: number, rand: () => number): T[] {
  return items.map((it) => ({ it, key: Math.pow(rand(), 1 / Math.max(it.weight, 1e-9)) })).sort((a, b) => b.key - a.key).slice(0, k).map((x) => x.it);
}

/** Wilson score interval for x of n at 95%. */
export function wilson(x: number, n: number): [number, number] {
  if (n === 0) return [0, 1];
  const z = 1.96, p = x / n, d = 1 + (z * z) / n;
  const c = (p + (z * z) / (2 * n)) / d, h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return [Math.max(0, c - h), Math.min(1, c + h)];
}

const sentences = (s: string | undefined) => (s ?? "").split(/(?<=[.;])\s+(?=[A-Z0-9])/).map((x) => x.trim()).filter(Boolean);
const numeric = (s: string) => /\d/.test(s.replace(/\b(19|20)\d\d\b/g, "")) || /\b(19|20)\d\d\b/.test(s);
const linkUrls = (e: Entity) => e.links.map((l) => l.url);

/** Which ids are written in which file, read once from the data files' `id: "..."` literals. */
function newIds(): Set<string> {
  const out = new Set<string>();
  const walk = (dir: string) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else if (f.name.endsWith(".ts") && !f.name.endsWith(".test.ts") && NEW_FILES.test(p)) {
        for (const m of readFileSync(p, "utf8").matchAll(/\bid:\s*"([a-z0-9-]+)"/g)) out.add(m[1]);
      }
    }
  };
  walk(join(process.cwd(), "src", "data"));
  return out;
}

const TEST_MODALITY = /test|assay|diagnostic|imaging agent|tracer|screen|panel|liquid biopsy|ctdna|mced/i;

/** Every candidate claim in the corpus, by stratum, before sampling. */
export function candidates(): Record<Stratum, Claim[]> {
  const g = graph();
  const fresh = newIds();
  const inDegree = (id: string) => g.incoming(id) ? [...g.incoming(id).values()].reduce((n, l) => n + l.length, 0) : 0;
  const out = Object.fromEntries(Object.keys(STRATA).map((k) => [k, [] as Claim[]])) as Record<Stratum, Claim[]>;
  const add = (stratum: Stratum, e: Entity | { id: string; kind: string; route: string }, field: string, claim: string, sources: string[]) => {
    const isNew = fresh.has(e.id);
    const route = "route" in e ? e.route : routeFor(e as Entity);
    const weight = (1 + Math.log2(1 + inDegree(e.id))) * (isNew ? 3 : 1);
    out[stratum].push({ id: `${stratum}:${e.id}:${field}`, stratum, recordId: e.id, kind: e.kind, route, field, claim, sources: [...new Set(sources)].slice(0, 6), weight, isNew });
  };

  for (const e of g.entities) {
    if (e.kind === "paper") {
      if (e.doi || e.pmid) add("paper-identifiers", e, "doi+pmid", `DOI ${e.doi ?? "none"} and PubMed ${e.pmid ?? "none"} identify "${e.name}" (${e.authors.split(",")[0]}, ${e.journal} ${e.year})`, [e.doi ? `https://doi.org/${e.doi}` : "", e.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${e.pmid}/` : ""].filter(Boolean));
      e.findings.forEach((f, i) => { if (numeric(f)) add("paper-findings", e, `findings[${i}]`, f, [e.doi ? `https://doi.org/${e.doi}` : "", e.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${e.pmid}/` : "", ...linkUrls(e)].filter(Boolean)); });
    }
    if (e.kind === "trial" && e.nct) {
      const reg = `https://clinicaltrials.gov/study/${e.nct}`;
      add("trial-facts", e, "phase+nct", `${e.name} (${e.nct}) is a phase ${e.phase} trial: ${e.setting}`, [reg]);
      if (e.enrolled) add("trial-facts", e, "enrolled", `${e.name} (${e.nct}) enrolled ${e.enrolled} (${e.enrolledBasis})`, [reg, ...linkUrls(e)]);
      if (e.result && numeric(e.result)) add("trial-facts", e, "result", `${e.name}: ${e.result}`, [...linkUrls(e), reg]);
      e.outcomes.forEach((o, i) => { if (o.hr !== undefined || o.arms.some((a) => a.value !== undefined)) add("trial-facts", e, `outcomes[${i}]`, `${e.name} ${o.endpoint}: ${o.arms.map((a) => `${a.name} ${a.value ?? "?"}${o.unit ? ` ${o.unit}` : ""}`).join(" vs ")}${o.hr !== undefined ? `; HR ${o.hr}${o.ci ? ` (${o.ci.join("-")})` : ""}` : ""}`, [o.source ?? "", ...linkUrls(e), reg].filter(Boolean)); });
    }
    if (e.kind === "drug") {
      const isTest = TEST_MODALITY.test(e.modality);
      e.approvals.forEach((a, i) => add(isTest ? "tests" : "drug-approvals", e, `approvals[${i}]`, `${e.name}: ${a.region} ${a.year}, ${a.indication}${a.note ? ` (${a.note})` : ""}`, linkUrls(e)));
      e.toxicity.forEach((t, i) => { if (t.anyGradePct !== undefined || t.grade3PlusPct !== undefined) add("drug-numbers", e, `toxicity[${i}]`, `${e.name}: ${t.event} any grade ${t.anyGradePct ?? "?"}%, grade 3+ ${t.grade3PlusPct ?? "?"}%`, [t.source ?? "", ...linkUrls(e)].filter(Boolean)); });
      e.access.forEach((a, i) => { if (a.listPrice) add("drug-numbers", e, `access[${i}]`, `${e.name} in ${a.country}: list price ${a.listPrice}${a.reimbursement ? `; ${a.reimbursement}` : ""}`, [a.source ?? "", ...linkUrls(e)].filter(Boolean)); });
      if (isTest) sentences(e.summary).forEach((s, i) => { if (numeric(s)) add("tests", e, `summary.s${i}`, s, linkUrls(e)); });
    }
    if (e.kind === "technology" && /mced|ctdna|mrd|screen|test|assay|biopsy/i.test(`${e.id} ${e.name}`)) sentences(e.summary).forEach((s, i) => { if (numeric(s)) add("tests", e, `summary.s${i}`, s, linkUrls(e)); });
    if (e.kind === "cancer") {
      const srcs = [...(e.prognosis?.sources ?? []).map((l) => l.url), ...linkUrls(e)];
      sentences(e.prognosis?.text).forEach((s, i) => { if (numeric(s)) add("cancer-numbers", e, `prognosis.s${i}`, s, srcs); });
      if (e.burden && numeric(e.burden)) add("cancer-numbers", e, "burden", e.burden, srcs);
      e.stateOfArt.forEach((p, j) => sentences(p).forEach((s, i) => { if (numeric(s)) add("cancer-numbers", e, `stateOfArt[${j}].s${i}`, s, linkUrls(e)); }));
    }
    if (e.kind === "company") {
      add("companies", e, "hq", `${e.name} is headquartered in ${e.hq} (${e.country})`, [e.website ?? "", ...linkUrls(e)].filter(Boolean));
      if (e.founded) add("companies", e, "founded", `${e.name} was founded in ${e.founded}`, [e.website ?? "", ...linkUrls(e)].filter(Boolean));
      if (e.stage === "acquired" || e.acquiredBy) add("companies", e, "acquired", `${e.name} was acquired${e.acquiredBy ? ` by ${g.get(e.acquiredBy)?.name ?? e.acquiredBy}` : ""}`, linkUrls(e));
      if (e.ticker) add("companies", e, "ticker", `${e.name} trades as ${e.ticker}`, linkUrls(e));
      e.funding.forEach((f, i) => { if (f.amountUsd) add("companies", e, `funding[${i}]`, `${e.name}: ${f.round} ${f.year}, US$${f.amountUsd.toLocaleString("en-US")}`, [f.source]); });
    }
    if (e.kind === "person") add("people", e, "role", `${e.name}: ${e.role}${e.institutionId ? ` (${g.get(e.institutionId)?.name ?? e.institutionId})` : ""}`, [...e.profiles.map((p) => p.url), ...linkUrls(e)]);
  }

  for (const r of PRECISION_ROWS) {
    const node = { id: r.id, kind: "precision-row", route: `/live/precision/#${r.id}` };
    if (r.today) add("precision-rows", node, "today", `${r.label}: ${r.today.value} (${r.today.context})${r.today.source.quote ? ` "${r.today.source.quote}"` : ""}`, [r.today.source.url]);
    if (r.buys?.source) add("precision-rows", node, "buys", `${r.label}: ${r.buys.text} [${r.buys.outcome}]`, [r.buys.source.url]);
  }

  for (const [code, cards] of countryCards()) {
    for (const c of cards) sentences(c.detail).forEach((s, i) => { if (numeric(s)) add("country-cards", { id: `${code}-${c.id}`, kind: "country-card", route: `/countries/${code}/` }, `detail.s${i}`, s, c.links.map((l) => l.url)); });
  }
  return out;
}

type Card = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };
/** Every exported card array in src/data/country-*.ts, by country code. */
function countryCards(): Array<[string, Card[]]> {
  const dir = join(process.cwd(), "src", "data");
  const out: Array<[string, Card[]]> = [];
  for (const f of readdirSync(dir).filter((f) => /^country-[a-z]{2}\.ts$/.test(f))) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(join(dir, f)) as Record<string, unknown>;
    const cards = Object.values(mod).filter(Array.isArray).flat().filter((c): c is Card => !!c && typeof c === "object" && typeof (c as Card).detail === "string" && Array.isArray((c as Card).links));
    out.push([f.slice(8, 10), cards]);
  }
  return out;
}

export function draw(seed: number, scale = 1): Sample {
  const rand = rng(seed);
  const pool = candidates();
  const quotas: Record<string, number> = {};
  const claims: Claim[] = [];
  for (const s of Object.keys(STRATA) as Stratum[]) {
    quotas[s] = Math.round(STRATA[s] * scale);
    // One claim per record per stratum, so a long record cannot fill a stratum on its own.
    const picked: Claim[] = [];
    const seen = new Set<string>();
    for (const c of weightedSample(pool[s], pool[s].length, rand)) {
      if (seen.has(c.recordId)) continue;
      seen.add(c.recordId); picked.push(c);
      if (picked.length >= quotas[s]) break;
    }
    claims.push(...picked);
  }
  return {
    drawn: new Date().toISOString().slice(0, 10), seed, corpusSize: graph().entities.length, quotas,
    verdicts: { correct: "the cited source says this", stale: "a newer primary source says otherwise", imprecise: "right direction, wrong detail (overstated, wrong cohort, altered interval)", wrong: "the source does not say this or says the opposite; an identifier for another paper", unsourced: "no source on the record bears on the claim", unreachable: "the source could not be read; not counted as an error" },
    claims,
  };
}

export type StratumRate = { n: number; checked: number; counts: Record<Verdict, number>; errorRate: number; errorCi: [number, number]; wrongRate: number; wrongCi: [number, number] };
export function rates(claims: Claim[]): StratumRate {
  const counts = Object.fromEntries(VERDICTS.map((v) => [v, 0])) as Record<Verdict, number>;
  for (const c of claims) if (c.verdict) counts[c.verdict]++;
  const checked = VERDICTS.reduce((n, v) => n + counts[v], 0) - counts.unreachable;
  const errors = counts.stale + counts.imprecise + counts.wrong + counts.unsourced;
  return { n: claims.length, checked, counts, errorRate: checked ? errors / checked : 0, errorCi: wilson(errors, checked), wrongRate: checked ? counts.wrong / checked : 0, wrongCi: wilson(counts.wrong, checked) };
}

export function report(sample: Sample): { overall: StratumRate; strata: Record<string, StratumRate>; byAge: { lastMonth: StratumRate; older: StratumRate } } {
  const strata: Record<string, StratumRate> = {};
  for (const s of Object.keys(sample.quotas)) strata[s] = rates(sample.claims.filter((c) => c.stratum === s));
  return { overall: rates(sample.claims), strata, byAge: { lastMonth: rates(sample.claims.filter((c) => c.isNew)), older: rates(sample.claims.filter((c) => !c.isNew)) } };
}

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const flag = (name: string) => { const i = rest.indexOf(name); return i >= 0 ? rest[i + 1] : undefined; };
  if (cmd === "draw") {
    const seed = Number(flag("--seed") ?? new Date().toISOString().slice(0, 10).replace(/-/g, ""));
    const n = Number(flag("--n") ?? Object.values(STRATA).reduce((a, b) => a + b, 0));
    const sample = draw(seed, n / Object.values(STRATA).reduce((a, b) => a + b, 0));
    mkdirSync(DIR, { recursive: true });
    const file = join(DIR, `sample-${sample.drawn}-${seed}.json`);
    if (existsSync(file)) throw new Error(`${file} exists; it may hold verdicts. Use another seed or remove it.`);
    writeFileSync(file, JSON.stringify(sample, null, 1) + "\n");
    console.log(`${sample.claims.length} claims (${sample.claims.filter((c) => c.isNew).length} from last month's files) -> ${file}`);
    return;
  }
  if (cmd === "verdict") {
    const [file, id, verdict, note, source] = rest;
    if (!VERDICTS.includes(verdict as Verdict)) throw new Error(`verdict must be one of ${VERDICTS.join(", ")}`);
    const sample = JSON.parse(readFileSync(file, "utf8")) as Sample;
    const c = sample.claims.find((x) => x.id === id);
    if (!c) throw new Error(`no claim ${id} in ${file}`);
    Object.assign(c, { verdict, note, ...(source ? { checkedSource: source } : {}) });
    writeFileSync(file, JSON.stringify(sample, null, 1) + "\n");
    return;
  }
  if (cmd === "report") {
    const file = rest[0];
    const sample = JSON.parse(readFileSync(file, "utf8")) as Sample;
    const r = report(sample);
    const line = (name: string, s: StratumRate) => `${name.padEnd(18)} n=${String(s.n).padStart(3)} checked=${String(s.checked).padStart(3)}  errors ${pct(s.errorRate).padStart(6)} [${pct(s.errorCi[0])}-${pct(s.errorCi[1])}]  wrong ${pct(s.wrongRate).padStart(6)} [${pct(s.wrongCi[0])}-${pct(s.wrongCi[1])}]  ${VERDICTS.map((v) => `${v} ${s.counts[v]}`).join(", ")}`;
    for (const [k, s] of Object.entries(r.strata)) console.log(line(k, s));
    console.log(line("ALL (pooled)", r.overall));
    console.log(line("  last month", r.byAge.lastMonth));
    console.log(line("  older", r.byAge.older));
    const pending = sample.claims.filter((c) => !c.verdict).length;
    if (pending) console.log(`${pending} claims have no verdict yet`);
    if (rest.includes("--ledger")) {
      const ledger = existsSync(LEDGER) ? (JSON.parse(readFileSync(LEDGER, "utf8")) as { rounds: unknown[] }) : { rounds: [] };
      const round = { sample: file.replace(/^.*\/docs\//, "docs/"), drawn: sample.drawn, seed: sample.seed, corpusSize: sample.corpusSize, pending, ...r };
      ledger.rounds = [...(ledger.rounds as Array<{ sample: string }>).filter((x) => x.sample !== round.sample), round];
      writeFileSync(LEDGER, JSON.stringify(ledger, null, 1) + "\n");
      console.log(`ledger -> ${LEDGER}`);
    }
    return;
  }
  console.log("usage: accuracy-sample.ts draw [--seed N] [--n N] | verdict <file> <id> <verdict> <note> [source] | report <file> [--ledger]");
}

if (process.argv[1]?.endsWith("accuracy-sample.ts")) main();
