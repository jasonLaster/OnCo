/**
 * What PubMed says each paper's PubMed id is. Network (NCBI E-utilities only), polite, cached.
 *
 * AGENTS.md calls a remembered identifier the commonest real error in this corpus: a DOI or PubMed id recalled
 * from training is usually a real paper, just the wrong one. A paper record carries both, so the cheapest check
 * there is asks PubMed what the PubMed id is (title, journal, year and the DOI PubMed holds for it) and compares
 * that with the record. Two ids that name two different papers cannot both be right.
 *
 * Writes src/data/paper-ids.json: for every PubMed id on a paper record, the registry's own title, year, journal
 * and DOI, keyed by PubMed id, with the date it was fetched. src/data/paper-ids.test.ts reads that snapshot
 * offline and fails when a record's DOI disagrees with the DOI PubMed holds for its PubMed id, when the year is
 * more than a year out, or when the record's name shares no distinctive word with the indexed title, and it
 * ratchets the number of PubMed ids the snapshot has not yet seen.
 *
 * Run: npx tsx scripts/paper-ids.ts [--report] [--refresh]   (--report prints disagreements and writes nothing;
 * Crossref answers are reused from the last snapshot unless --refresh, since a DOI's title does not change)
 * Re-run after adding papers; the snapshot keeps entries for ids that are no longer in the corpus out.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Paper } from "../src/lib/schema";
import { normaliseDoi } from "./lib/duplicate-records";

export type PaperIdEntry = { title: string; year?: number; journal?: string; doi?: string };
/** `ids` is PubMed's record by PubMed id; `dois` is Crossref's record for DOIs PubMed cannot vouch for (no PubMed id, or PubMed holds no DOI). */
export type PaperIdSnapshot = { fetched: string; source: string; ids: Record<string, PaperIdEntry>; dois: Record<string, PaperIdEntry> };

export const SNAPSHOT = join(process.cwd(), "src", "data", "paper-ids.json");
const ESUMMARY = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";
const UA = "OnCo paper identifier check (+https://github.com/judegomila/OnCo)";
const BATCH = 200;

type Esummary = { result?: Record<string, { uid?: string; title?: string; booktitle?: string; sorttitle?: string; pubdate?: string; fulljournalname?: string; source?: string; articleids?: Array<{ idtype: string; value: string }>; error?: string }> & { uids?: string[] } };

/** PubMed's own record for a batch of ids. Titles keep PubMed's wording, minus a trailing full stop. */
export function parseEsummary(body: Esummary): Record<string, PaperIdEntry> {
  const out: Record<string, PaperIdEntry> = {};
  const res = body.result ?? {};
  for (const uid of (res.uids as string[] | undefined) ?? []) {
    const r = res[uid] as Exclude<Esummary["result"], undefined>[string] | undefined;
    // Bookshelf entries (a NICE appraisal, a PDQ summary) carry an empty title and the words in booktitle or sorttitle.
    const title = r?.title || r?.booktitle || r?.sorttitle;
    if (!r || r.error || !title) continue;
    const year = Number(/\b(1[89]\d\d|20\d\d)\b/.exec(r.pubdate ?? "")?.[1]);
    const doi = r.articleids?.find((a) => a.idtype === "doi")?.value;
    out[uid] = { title: title.replace(/\.$/, ""), ...(Number.isFinite(year) ? { year } : {}), ...(r.source || r.fulljournalname ? { journal: r.source || r.fulljournalname } : {}), ...(doi ? { doi: normaliseDoi(doi) } : {}) };
  }
  return out;
}

async function fetchBatch(ids: string[]): Promise<Record<string, PaperIdEntry>> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(ESUMMARY, { method: "POST", headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" }, body: `db=pubmed&retmode=json&id=${ids.join(",")}` });
    if (res.ok) return parseEsummary((await res.json()) as Esummary);
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
  throw new Error(`E-utilities failed for a batch starting ${ids[0]}`);
}

type CrossrefWork = { message?: { title?: string[]; "container-title"?: string[]; issued?: { "date-parts"?: number[][] } } };

/** Crossref's record for one DOI, or null when Crossref does not know it (DataCite DOIs, some guidelines). */
async function crossref(doi: string): Promise<PaperIdEntry | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { headers: { "User-Agent": `${UA} mailto:onco@onco.health` } });
    if (res.status === 404) return null;
    if (res.ok) {
      const m = ((await res.json()) as CrossrefWork).message ?? {};
      const title = m.title?.[0]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (!title) return null;
      const year = m.issued?.["date-parts"]?.[0]?.[0];
      return { title, ...(year ? { year } : {}), ...(m["container-title"]?.[0] ? { journal: m["container-title"][0] } : {}) };
    }
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  throw new Error(`Crossref failed for ${doi}`);
}

export function readSnapshot(): PaperIdSnapshot {
  return existsSync(SNAPSHOT) ? (JSON.parse(readFileSync(SNAPSHOT, "utf8")) as PaperIdSnapshot) : { fetched: "", source: ESUMMARY, ids: {}, dois: {} };
}

async function main() {
  const papers = graph().kind("paper") as Paper[];
  const pmids = [...new Set(papers.map((p) => p.pmid?.trim()).filter((x): x is string => !!x && /^\d+$/.test(x)))].sort();
  const ids: Record<string, PaperIdEntry> = {};
  for (let i = 0; i < pmids.length; i += BATCH) {
    Object.assign(ids, await fetchBatch(pmids.slice(i, i + BATCH)));
    await new Promise((r) => setTimeout(r, 400));
  }
  const missing = pmids.filter((p) => !ids[p]);
  console.log(`${pmids.length} PubMed ids on ${papers.length} papers; PubMed returned ${Object.keys(ids).length}; ${missing.length} not found${missing.length ? `: ${missing.slice(0, 20).join(", ")}` : ""}`);
  if (process.argv.includes("--report")) {
    for (const p of papers) {
      const e = p.pmid ? ids[p.pmid] : undefined;
      if (e?.doi && p.doi && e.doi !== normaliseDoi(p.doi)) console.log(`DOI≠  ${p.id}  pmid ${p.pmid} -> ${e.doi}  record ${p.doi}\n       pubmed: ${e.title}\n       record: ${p.name}`);
    }
    return;
  }
  // DOIs PubMed cannot vouch for: no PubMed id on the record, or PubMed's entry holds no DOI.
  const previous = readSnapshot().dois ?? {};
  const unvouched = [...new Set(papers.filter((p) => p.doi && (!p.pmid || !ids[p.pmid]?.doi)).map((p) => normaliseDoi(p.doi!)))].sort();
  const dois: Record<string, PaperIdEntry> = {};
  let asked = 0;
  for (const d of unvouched) {
    if (previous[d] && !process.argv.includes("--refresh")) { dois[d] = previous[d]; continue; }
    const e = await crossref(d); asked++;
    if (e) dois[d] = e;
    await new Promise((r) => setTimeout(r, 120));
  }
  console.log(`${unvouched.length} DOIs PubMed cannot vouch for; Crossref asked for ${asked}, knows ${Object.keys(dois).length}`);
  const sorted = Object.fromEntries(Object.entries(ids).sort(([a], [b]) => Number(a) - Number(b)));
  const block = (o: Record<string, PaperIdEntry>) => `{\n${Object.entries(o).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",\n")}\n}`;
  writeFileSync(SNAPSHOT, `{"fetched":${JSON.stringify(new Date().toISOString().slice(0, 10))},"source":${JSON.stringify(`${ESUMMARY}; https://api.crossref.org/works`)},\n"ids":${block(sorted)},\n"dois":${block(dois)}}\n`);
  console.log(`wrote ${SNAPSHOT}`);
}

if (process.argv[1]?.endsWith("paper-ids.ts")) main().catch((e) => { console.error(e); process.exit(1); });
