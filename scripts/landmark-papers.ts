/**
 * Landmark-paper watch: new oncology papers in the top journals, proposed as paper records for a person to review.
 *
 * Why it exists: the weekly refresh-papers job (scripts/fetch-papers.ts) only refreshes per-topic "recent papers"
 * snapshots under public/papers/, and no job creates paper records. So "A preinvasive regulatory T cell axis for lung
 * cancer interception" (Nature, 7 October 2026) was missed until the owner noticed it on 1 November 2026.
 *
 *   npx tsx scripts/landmark-papers.ts                  the last 7 days, queue to .cache/landmark-papers/
 *   npx tsx scripts/landmark-papers.ts --days=14        a longer window
 *   npx tsx scripts/landmark-papers.ts --write          also write docs/proposals/landmark-papers.{md,json} (the
 *                                                       weekly workflow does this and opens a needs-review pull request)
 *   npx tsx scripts/landmark-papers.ts --max=25         how many proposals to keep (default 25)
 *
 * How:
 *  1. Crossref, per journal (by the ISSN on the corpus journal record): journal articles whose DOI was registered in the
 *     window. General journals (Nature, Science, Cell, NEJM, The Lancet, JAMA, BMJ and the like) are kept only when the
 *     title, abstract or subject is about cancer; oncology journals keep everything except corrections, replies and news.
 *  2. Europe PMC, for the same journals and window, oncology papers only; this adds PubMed ids and the abstracts that
 *     publishers do not deposit with Crossref (NEJM, Elsevier). Merged by DOI.
 *  3. Papers whose DOI or PubMed id is already anywhere in the corpus are dropped.
 *  4. Score: journal tier, a trial result (randomised or phase 3, an NCT number, a trial OnCo holds), links to records
 *     OnCo holds (cancers, drugs, targets, trials, technologies, biomarkers, pathways named in the title or abstract),
 *     early citations; no abstract yet costs points, a review costs points.
 *  5. The best are written as proposed paper records: the linking fields filled from the matches, the abstract quoted
 *     as published, and the prose fields (tldr, summary, findings, whatItMeans, caveats) left for the person who reads
 *     the paper. Nothing is written under src/data, and the workflow never merges its pull request.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { decodeEntities, matchableFromGraph, NameMatcher } from "./feed-utils";

const UA = "OnCo landmark-papers (https://onco.cc; mailto:onco@judegomila.com)";
const MAILTO = "onco@judegomila.com";
const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const DAYS = Number(arg("days") ?? 7);
const MAX = Number(arg("max") ?? 25);
const WRITE = process.argv.includes("--write");
const OUT = arg("out") ?? join(process.cwd(), ".cache", "landmark-papers");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Journal id (a corpus journal record), tier, and whether it is a general journal that needs the oncology filter. */
export const JOURNALS: Array<{ id: string; tier: 5 | 4 | 3; general: boolean }> = [
  { id: "nejm", tier: 5, general: true }, { id: "lancet", tier: 5, general: true }, { id: "nature", tier: 5, general: true },
  { id: "science", tier: 5, general: true }, { id: "cell", tier: 5, general: true }, { id: "jama", tier: 5, general: true }, { id: "bmj", tier: 5, general: true },
  { id: "lancet-oncology", tier: 4, general: false }, { id: "nature-medicine", tier: 4, general: true }, { id: "nature-cancer", tier: 4, general: false },
  { id: "cancer-cell", tier: 4, general: false }, { id: "cancer-discovery", tier: 4, general: false }, { id: "jco", tier: 4, general: false },
  { id: "jama-oncology", tier: 4, general: false }, { id: "annals-of-oncology", tier: 4, general: false }, { id: "blood", tier: 4, general: true },
  { id: "lancet-haematology", tier: 3, general: true }, { id: "blood-cancer-discovery", tier: 3, general: false }, { id: "science-translational-medicine", tier: 3, general: true },
  { id: "nature-genetics", tier: 3, general: true }, { id: "nature-biotechnology", tier: 3, general: true },
];

const ONCO = /\b(cancers?|oncolog\w*|tumou?rs?|tumou?rigen\w*|carcinomas?|leuka?emias?|lymphomas?|myelomas?|melanomas?|sarcomas?|gliomas?|\w*blastomas?|metasta\w+|neoplas\w+|mesotheliomas?|myelodysplastic|myeloproliferative|malignan\w+|chemotherap\w*|immunotherap\w*|carcinogen\w*|precancer\w*|preinvasive|premalignant)\b/i;
export const isOncology = (s: string) => ONCO.test(s);
/**
 * For a general journal: cancer in the title or subjects, or at least three cancer words in the abstract. One word is
 * not enough: "Heart Transplant for Advanced Heart Failure" passed on a single "malignancy" in its abstract.
 */
export function aboutCancer(title: string, abstract?: string, subjects: string[] = []): boolean {
  if (isOncology(title) || isOncology(subjects.join(" "))) return true;
  return (abstract?.match(new RegExp(ONCO.source, "gi")) ?? []).length >= 3;
}
const NOT_RESEARCH = /^(correction|corrigendum|erratum|retraction|retracted|author correction|publisher correction|expression of concern|reply|response to|in reply|comment on|correspondence|in this issue|news|highlights?|editorial|editor'?s note|this week|research highlights?|books? in brief|obituary)\b/i;

export type Candidate = {
  doi: string; title: string; journalId: string; journal: string; tier: number; published?: string;
  authors: Array<{ family?: string; given?: string; name?: string }>; abstract?: string; pmid?: string; citations: number; subjects: string[]; sources: string[];
};
export type Proposal = {
  score: number; reasons: string[]; doi: string; pmid?: string; title: string; journal: string; published?: string;
  abstract?: string;
  /** A draft of the record's fixed fields. The prose fields are left for the person who reads the paper. */
  draft: { id: string; name: string; journal: string; year: number; doi: string; pmid?: string; authors: string; paperType: string; journals: string[]; cancers: string[]; drugs: string[]; targets: string[]; trials: string[]; technologies: string[]; pathways: string[]; related: string[]; links: Array<{ label: string; url: string }> };
};

// ---------------------------------------------------------------------------------------------------------------

async function getJson<T>(url: string, tries = 4): Promise<T | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(2000 * 2 ** i); continue; }
      if (!r.ok) return null;
      return (await r.json()) as T;
    } catch { await sleep(2000 * 2 ** i); }
  }
  return null;
}

/** JATS abstract to plain text, words unchanged (subscripts and superscripts joined, citation markers dropped). */
export function jatsToText(s?: string): string | undefined {
  if (!s) return undefined;
  const t = decodeEntities(s
    .replace(/<jats:title>\s*Abstract\s*<\/jats:title>/i, "")
    .replace(/<jats:sup>\s*[\d,–-]+\s*<\/jats:sup>/g, "")
    .replace(/\s*<jats:(sub|sup)>\s*([^<]*?)\s*<\/jats:\1>/g, "$2")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ").replace(/\s+([,.;:)])/g, "$1").replace(/\(\s+/g, "(").trim();
  return t || undefined;
}

/** "Gamble S, Whiteman ZE, Peinador-Marín C, et al." */
export function authorString(authors: Candidate["authors"]): string {
  const people = authors.filter((a) => a.family);
  const fmt = (a: Candidate["authors"][number]) => `${a.family} ${(a.given ?? "").split(/[\s.-]+/).filter(Boolean).map((g) => g[0].toUpperCase()).join("")}`.trim();
  if (!people.length) return authors.find((a) => a.name)?.name ?? "Unknown";
  return people.length > 3 ? `${people.slice(0, 3).map(fmt).join(", ")}, et al.` : people.map(fmt).join(", ");
}

const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const STOPWORDS = new Set(["a", "an", "the", "of", "in", "for", "and", "with", "to", "on", "by", "from", "versus", "vs", "at", "as", "or", "is", "are", "its", "into", "after", "among", "patients", "study", "trial", "phase", "randomised", "randomized"]);
export function suggestId(c: Pick<Candidate, "authors" | "title" | "journalId" | "published">): string {
  const first = slug(c.authors.find((a) => a.family)?.family ?? "anon").split("-")[0];
  const words = slug(c.title).split("-").filter((w) => w.length > 2 && !STOPWORDS.has(w)).slice(0, 4);
  return ["paper", first, ...words, c.journalId, (c.published ?? "").slice(0, 4)].filter(Boolean).join("-").slice(0, 90).replace(/-$/, "");
}

export function guessPaperType(text: string): string {
  if (/\bmeta-analys[ie]s\b|\bsystematic review\b/i.test(text)) return "meta-analysis";
  if (/\brandomi[sz]ed\b/i.test(text) && /\b(phase (2|3|ii|iii)|trial)\b/i.test(text)) return "rct";
  if (/\breview\b/i.test(text.slice(0, 200))) return "review";
  if (/\bguideline\b/i.test(text.slice(0, 200))) return "guideline";
  if (/\b(cohort|registry|retrospective|population-based)\b/i.test(text)) return "observational";
  if (/\b(patients?|clinical|tissue samples|biopsies|participants)\b/i.test(text)) return "translational";
  return "basic";
}

type Ctx = { matcher: NameMatcher; trialsByNct: Map<string, string> };

export function score(c: Candidate, ctx: Ctx): Proposal {
  const text = `${c.title}. ${c.abstract ?? ""}`;
  const reasons: string[] = [];
  let s = c.tier * 2;
  reasons.push(`journal tier ${c.tier} (+${c.tier * 2})`);
  if (/\b(phase (3|iii)|randomi[sz]ed)\b/i.test(text)) { s += 4; reasons.push("randomised or phase 3 (+4)"); }
  else if (/\bphase (2|ii|1b?\/2)\b/i.test(text)) { s += 2; reasons.push("phase 2 (+2)"); }
  const ncts = [...new Set(text.match(/\bNCT\d{8}\b/g) ?? [])];
  const heldTrials = ncts.map((n) => ctx.trialsByNct.get(n)).filter((x): x is string => !!x);
  if (ncts.length) { s += 2; reasons.push(`registered trial ${ncts.join(", ")} (+2)`); }
  if (heldTrials.length) { s += 3; reasons.push(`a trial OnCo holds: ${heldTrials.join(", ")} (+3)`); }
  const kinds = ["cancer", "drug", "target", "trial", "technology", "biomarker", "pathway"];
  const g = graph();
  const matched = ctx.matcher.match(text, kinds);
  const byKind = (k: string) => matched.filter((id) => g.get(id)?.kind === k);
  const trials = [...new Set([...byKind("trial"), ...heldTrials])];
  const links = Math.min(6, matched.length);
  if (links) { s += links; reasons.push(`${matched.length} record${matched.length === 1 ? "" : "s"} named (+${links})`); }
  if (c.citations > 0) { const p = Math.min(3, Math.floor(Math.log2(1 + c.citations))); if (p) { s += p; reasons.push(`${c.citations} citations (+${p})`); } }
  if (!c.abstract) { s -= 3; reasons.push("no abstract indexed yet (-3)"); }
  else if (c.abstract.length < 500) { s -= 3; reasons.push("short abstract: news, commentary or a brief (-3)"); }
  const type = guessPaperType(text);
  if (type === "review") { s -= 2; reasons.push("reads as a review (-2)"); }
  const year = Number((c.published ?? "").slice(0, 4)) || new Date().getUTCFullYear();
  return {
    score: s, reasons, doi: c.doi, pmid: c.pmid, title: c.title, journal: c.journal, published: c.published, abstract: c.abstract,
    draft: {
      id: suggestId(c), name: c.title, journal: c.journal, year, doi: c.doi, pmid: c.pmid, authors: authorString(c.authors), paperType: type,
      journals: [c.journalId], cancers: byKind("cancer"), drugs: byKind("drug"), targets: byKind("target"), trials, technologies: byKind("technology"), pathways: byKind("pathway"), related: byKind("biomarker"),
      links: [{ label: `${c.journal} ${year}`, url: `https://doi.org/${c.doi}` }, ...(c.pmid ? [{ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/` }] : [])],
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------

type CrossrefItem = { DOI: string; title?: string[]; "container-title"?: string[]; author?: Array<{ family?: string; given?: string; name?: string }>; abstract?: string; published?: { "date-parts"?: number[][] }; created?: { "date-time"?: string }; "is-referenced-by-count"?: number; subject?: string[]; type?: string };
const isoParts = (p?: number[][]) => { const d = p?.[0]; return d?.length ? [d[0], String(d[1] ?? 1).padStart(2, "0"), String(d[2] ?? 1).padStart(2, "0")].join("-") : undefined; };

async function crossref(issn: string, since: string, until: string): Promise<CrossrefItem[]> {
  const out: CrossrefItem[] = [];
  let cursor = "*";
  for (let page = 0; page < 10; page++) {
    const u = `https://api.crossref.org/works?filter=issn:${issn},from-created-date:${since},until-created-date:${until},type:journal-article&rows=200&cursor=${encodeURIComponent(cursor)}&select=DOI,title,container-title,author,abstract,published,created,is-referenced-by-count,subject,type&mailto=${MAILTO}`;
    const j = await getJson<{ message: { items: CrossrefItem[]; "next-cursor"?: string; "total-results": number } }>(u);
    if (!j) break;
    out.push(...j.message.items);
    if (!j.message.items.length || out.length >= j.message["total-results"] || !j.message["next-cursor"]) break;
    cursor = j.message["next-cursor"];
    await sleep(1000);
  }
  return out;
}

let epmcDown = false;
type EpmcHit = { doi?: string; pmid?: string; title?: string; abstractText?: string; firstPublicationDate?: string; journalInfo?: { journal?: { issn?: string; essn?: string } }; authorList?: { author?: Array<{ lastName?: string; firstName?: string; collectiveName?: string }> }; citedByCount?: number };

async function europePmc(issns: string[], since: string, until: string): Promise<EpmcHit[]> {
  const q = `(${issns.map((i) => `ISSN:"${i}"`).join(" OR ")}) AND FIRST_PDATE:[${since} TO ${until}] AND (cancer OR oncology OR tumour OR tumor OR carcinoma OR leukaemia OR leukemia OR lymphoma OR myeloma OR melanoma OR sarcoma OR glioma OR neoplasm*)`;
  const out: EpmcHit[] = [];
  let cursor = "*";
  for (let page = 0; page < 10; page++) {
    const u = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?${new URLSearchParams({ query: q, resultType: "core", format: "json", pageSize: "200", cursorMark: cursor }).toString()}`;
    const j = await getJson<{ hitCount: number; nextCursorMark?: string; resultList?: { result: EpmcHit[] } }>(u);
    if (!j?.resultList) { if (page === 0) epmcDown = true; break; }
    out.push(...j.resultList.result);
    if (!j.resultList.result.length || out.length >= j.hitCount || !j.nextCursorMark || j.nextCursorMark === cursor) break;
    cursor = j.nextCursorMark;
    await sleep(1000);
  }
  return out;
}

/** Europe PMC by DOI, for candidates Crossref gave without an abstract or a PubMed id (batches of 20). */
async function europePmcByDoi(dois: string[]): Promise<EpmcHit[]> {
  const out: EpmcHit[] = [];
  for (let i = 0; i < dois.length; i += 20) {
    const q = dois.slice(i, i + 20).map((d) => `DOI:"${d}"`).join(" OR ");
    const j = await getJson<{ resultList?: { result: EpmcHit[] } }>(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?${new URLSearchParams({ query: q, resultType: "core", format: "json", pageSize: "100" }).toString()}`);
    out.push(...(j?.resultList?.result ?? []));
    await sleep(1000);
  }
  return out;
}

/**
 * PubMed (NCBI E-utilities) by DOI: the fallback when Europe PMC is unavailable, which it was on 3 November 2026.
 * Returns DOI (lower case) -> PubMed id and abstract. Only the article's own id list is read, not its reference list.
 */
export function parsePubmedXml(xml: string): Map<string, { pmid: string; abstract?: string }> {
  const out = new Map<string, { pmid: string; abstract?: string }>();
  for (const m of xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g)) {
    const art = m[1].replace(/<ReferenceList>[\s\S]*?<\/ReferenceList>/g, "");
    const pmid = art.match(/<PMID[^>]*>(\d+)<\/PMID>/)?.[1];
    const doi = art.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/)?.[1]?.toLowerCase();
    if (!pmid || !doi) continue;
    const parts = [...art.matchAll(/<AbstractText([^>]*)>([\s\S]*?)<\/AbstractText>/g)].map((a) => {
      const label = a[1].match(/Label="([^"]+)"/)?.[1];
      const text = decodeEntities(a[2].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
      return label ? `${label}: ${text}` : text;
    });
    out.set(doi, { pmid, abstract: parts.join(" ") || undefined });
  }
  return out;
}
async function pubmedByDoi(dois: string[]): Promise<Map<string, { pmid: string; abstract?: string }>> {
  const out = new Map<string, { pmid: string; abstract?: string }>();
  const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
  for (let i = 0; i < dois.length; i += 20) {
    const term = dois.slice(i, i + 20).map((d) => `"${d}"[doi]`).join(" OR ");
    const s = await getJson<{ esearchresult?: { idlist?: string[] } }>(`${base}/esearch.fcgi?${new URLSearchParams({ db: "pubmed", retmode: "json", retmax: "100", tool: "onco", email: MAILTO, term }).toString()}`);
    const ids = s?.esearchresult?.idlist ?? [];
    await sleep(500);
    if (!ids.length) continue;
    try {
      const r = await fetch(`${base}/efetch.fcgi?${new URLSearchParams({ db: "pubmed", retmode: "xml", tool: "onco", email: MAILTO, id: ids.join(",") }).toString()}`, { headers: { "User-Agent": UA } });
      if (r.ok) for (const [k, v] of parsePubmedXml(await r.text())) out.set(k, v);
    } catch { /* a PubMed failure leaves the candidate as it was */ }
    await sleep(500);
  }
  return out;
}

/** Every DOI and PubMed id anywhere in the corpus: paper records' fields and any doi.org or PubMed link on any record. */
export function corpusIds(entities: Array<Record<string, unknown>>): { dois: Set<string>; pmids: Set<string> } {
  const dois = new Set<string>(), pmids = new Set<string>();
  for (const e of entities) {
    if (typeof e.doi === "string") dois.add(e.doi.toLowerCase());
    if (typeof e.pmid === "string") pmids.add(e.pmid);
    for (const l of (e.links as Array<{ url?: string }> | undefined) ?? []) {
      const u = l.url ?? "";
      const d = u.match(/doi\.org\/(10\.[^\s?#]+)/i)?.[1];
      if (d) dois.add(decodeURIComponent(d).toLowerCase());
      const p = u.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1];
      if (p) pmids.add(p);
    }
  }
  return { dois, pmids };
}

function markdown(props: Proposal[], meta: { since: string; until: string; read: number; oncology: number; known: number }): string {
  const head = `# Landmark-paper watch: proposals for review\n\nWritten by \`scripts/landmark-papers.ts\` for papers registered ${meta.since} to ${meta.until}. ${meta.read} articles read from ${JOURNALS.length} journals (Crossref and Europe PMC), ${meta.oncology} about cancer, ${meta.known} already in OnCo by DOI or PubMed id. Below, highest score first: every research paper from the general journals of the first rank (NEJM, The Lancet, Nature, Science, Cell, JAMA, BMJ), whatever its score, and the best of the rest; ${props.length} in all.\n\nNothing here is in the corpus. To add one: resolve the DOI, read the abstract below (it is quoted as published), write the record in a \`src/data/papers-*.ts\` file with tldr, summary, findings, whatItMeans and caveats taken from the abstract only, and check every suggested link: they are name matches, not judgements. Close the pull request when done; it is never merged automatically.\n`;
  const body = props.map((p, i) => {
    const d = p.draft;
    const links = (["cancers", "drugs", "targets", "trials", "technologies", "pathways", "related"] as const).filter((k) => d[k].length).map((k) => `${k}: ${d[k].map((x) => `\`${x}\``).join(", ")}`).join("; ");
    return `## ${i + 1}. ${p.title}\n\n${p.journal}, ${p.published ?? "date unknown"}. ${d.authors}. [doi:${p.doi}](https://doi.org/${p.doi})${p.pmid ? ` · [PubMed ${p.pmid}](https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/)` : ""}\n\n**Score ${p.score}**: ${p.reasons.join("; ")}.\n\nSuggested id \`${d.id}\`, paperType \`${d.paperType}\` (a guess), journals \`${d.journals.join(", ")}\`.${links ? ` Would link to ${links}.` : " No record named in the title or abstract."}\n\n${p.abstract ? `> ${p.abstract}` : "_No abstract indexed yet: read the paper before writing anything._"}\n`;
  });
  return [head, ...body].join("\n");
}

async function main() {
  const g = graph();
  const until = new Date().toISOString().slice(0, 10);
  const sinceD = new Date(); sinceD.setUTCDate(sinceD.getUTCDate() - DAYS);
  const since = sinceD.toISOString().slice(0, 10);
  const { dois, pmids } = corpusIds(g.entities as unknown as Array<Record<string, unknown>>);
  // NameMatcher splits names on "/" ("T-cell/histiocyte-rich large B-cell lymphoma" would match every "T-cell"), so
  // slashes are flattened to spaces here and a name is matched whole.
  const flat = (s: string) => s.replace(/\//g, " ");
  const matcher = new NameMatcher(matchableFromGraph(g.entities as never).map((e) => ({ ...e, name: flat(e.name), aka: (e.aka ?? []).map(flat) })), ["cancer", "drug", "target", "trial", "technology", "biomarker", "pathway"]);
  const trialsByNct = new Map<string, string>();
  for (const t of g.kind("trial")) { const n = (t as unknown as { nct?: string }).nct; if (n) trialsByNct.set(n.toUpperCase(), t.id); if (/^nct\d{8}$/.test(t.id)) trialsByNct.set(t.id.toUpperCase(), t.id); }

  const journals = JOURNALS.map((j) => {
    const rec = g.get(j.id) as unknown as { name: string; issn?: string } | undefined;
    if (!rec?.issn) throw new Error(`journal record ${j.id} has no ISSN; fix the JOURNALS list`);
    return { ...j, name: rec.name, issn: rec.issn };
  });

  const byDoi = new Map<string, Candidate>();
  let read = 0;
  for (const j of journals) {
    const items = await crossref(j.issn, since, until);
    read += items.length;
    for (const it of items) {
      const title = decodeEntities((it.title?.[0] ?? "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
      if (!title || NOT_RESEARCH.test(title)) continue;
      const abstract = jatsToText(it.abstract);
      if (j.general && !aboutCancer(title, abstract, it.subject)) continue;
      byDoi.set(it.DOI.toLowerCase(), { doi: it.DOI, title, journalId: j.id, journal: j.name, tier: j.tier, published: isoParts(it.published?.["date-parts"]) ?? it.created?.["date-time"]?.slice(0, 10), authors: it.author ?? [], abstract, citations: it["is-referenced-by-count"] ?? 0, subjects: it.subject ?? [], sources: ["crossref"] });
    }
    console.error(`landmark: ${j.id}: ${items.length} articles registered since ${since}`);
    await sleep(1000);
  }

  // Europe PMC: the same journals, oncology only; adds PubMed ids, abstracts and anything Crossref missed.
  const issnToJournal = new Map(journals.map((j) => [j.issn, j]));
  const epmc = await europePmc(journals.map((j) => j.issn), since, until);
  read += epmc.length;
  const fold = (h: EpmcHit) => {
    const doi = h.doi?.toLowerCase();
    if (!doi) return;
    const cur = byDoi.get(doi);
    const abstract = h.abstractText ? decodeEntities(h.abstractText.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() : undefined;
    if (cur) { cur.pmid ??= h.pmid; cur.abstract ??= abstract; if (!cur.sources.includes("europepmc")) cur.sources.push("europepmc"); return; }
    const j = issnToJournal.get(h.journalInfo?.journal?.issn ?? "") ?? issnToJournal.get(h.journalInfo?.journal?.essn ?? "");
    const title = decodeEntities((h.title ?? "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").replace(/\.$/, "").trim();
    if (!j || !title || NOT_RESEARCH.test(title) || (j.general && !aboutCancer(title, abstract))) return;
    byDoi.set(doi, { doi: h.doi!, title, journalId: j.id, journal: j.name, tier: j.tier, published: h.firstPublicationDate, authors: (h.authorList?.author ?? []).map((a) => ({ family: a.lastName, given: a.firstName, name: a.collectiveName })), abstract, pmid: h.pmid, citations: h.citedByCount ?? 0, subjects: [], sources: ["europepmc"] });
  };
  epmc.forEach(fold);
  const lacking = [...byDoi.values()].filter((c) => !c.abstract || !c.pmid).map((c) => c.doi);
  if (epmcDown) console.error("landmark: Europe PMC did not answer; PubMed is used for PubMed ids and abstracts");
  else if (lacking.length) (await europePmcByDoi(lacking)).forEach(fold);
  const stillLacking = [...byDoi.values()].filter((c) => !c.abstract || !c.pmid);
  if (stillLacking.length) {
    const pm = await pubmedByDoi(stillLacking.map((c) => c.doi));
    for (const c of stillLacking) {
      const hit = pm.get(c.doi.toLowerCase());
      if (!hit) continue;
      c.pmid ??= hit.pmid; c.abstract ??= hit.abstract;
      if (!c.sources.includes("pubmed")) c.sources.push("pubmed");
    }
  }

  const all = [...byDoi.values()];
  const fresh = all.filter((c) => !dois.has(c.doi.toLowerCase()) && !(c.pmid && pmids.has(c.pmid)));
  const ctx: Ctx = { matcher, trialsByNct };
  // Every oncology research paper in a tier-5 journal is proposed, whatever its score: the score favours trial
  // results, and the paper that prompted this watch (a mechanism and mouse-interception study in Nature) would rank
  // below a dozen trial reports in the same month. The rest fill MAX places by score.
  const scored = fresh.map((c) => score(c, ctx)).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const tierOf = new Map(fresh.map((c) => [c.doi, c.tier]));
  const top = scored.filter((p) => tierOf.get(p.doi) === 5 && !p.reasons.some((r) => r.startsWith("short abstract")));
  const proposals = [...top.slice(0, MAX), ...scored.filter((p) => !top.includes(p)).slice(0, MAX)].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, "scored.json"), JSON.stringify(scored.map((p) => ({ score: p.score, doi: p.doi, journal: p.journal, title: p.title })), null, 1) + "\n");
  const meta = { since, until, read, oncology: all.length, known: all.length - fresh.length };

  mkdirSync(OUT, { recursive: true });
  const inCorpus = all.filter((c) => !fresh.includes(c)).map((c) => ({ doi: c.doi, title: c.title }));
  const json = JSON.stringify({ generated: until, ...meta, inCorpus, proposals }, null, 1) + "\n";
  writeFileSync(join(OUT, "queue.json"), json);
  const md = markdown(proposals, meta);
  writeFileSync(join(OUT, "queue.md"), md);
  if (WRITE) {
    const dir = join(process.cwd(), "docs", "proposals");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "landmark-papers.json"), json);
    writeFileSync(join(dir, "landmark-papers.md"), md);
  }
  console.log(`landmark: ${read} articles read, ${all.length} about cancer, ${meta.known} already in OnCo, ${proposals.length} proposed (top score ${proposals[0]?.score ?? 0})${WRITE ? "; docs/proposals/landmark-papers.md written" : ""}`);
}

if (process.argv[1]?.endsWith("landmark-papers.ts")) main().catch((e) => { console.error(e); process.exit(1); });
