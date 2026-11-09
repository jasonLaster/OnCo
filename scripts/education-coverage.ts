/**
 * Pinned public-curriculum coverage audit. Candidate matches never count as coverage.
 * See research/education-coverage-2026-11-08/README.md for the review and closure rules.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";

export type Evidence = { recordId: string; version: string; field: string; fieldSha256: string; explanation: string };
export type LearningPoint = {
  id: string;
  requirement: string;
  status: "unreviewed" | "covered-main" | "covered-draft" | "gap" | "partial" | "source-blocked";
  evidence: Evidence[];
  remaining: string[];
};
export type Review = {
  status: "unreviewed" | "reviewed" | "navigation";
  auditor?: string;
  checkedAt?: string;
  rationale?: string;
  points: LearningPoint[];
};
export type CurriculumItem = {
  path: string;
  title: string | null;
  aliases: string[];
  sourceType: string;
  domain: string;
  sourceSha256: string;
  gitBlob: string;
  sourceURL: string;
  priorOwnerIds: string[];
  review: Review;
};
type RecordData = { id: string; kind: string; name: string; aka?: string[]; [key: string]: unknown };
type CatalogRow = { version: string; record: RecordData };
export type Candidate = { id: string; version: string; name: string; score: number; exactName: boolean; matchedNameTerms: string[] };

export const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
export const fieldHash = (value: unknown) => sha256(JSON.stringify(value) ?? "undefined");
export function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/\btumour/g, "tumor").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
const STOP = new Set("a an the of and or to in for from with versus vs how what why is are it its this that as by on at into about use using reading basics understanding concept cancer oncology tumor".split(" "));
const tokens = (s: string) => [...new Set(normalize(s).split(" ").filter(t => t && !STOP.has(t)))];
const TEXT_FIELDS = ["tldr", "summary", "principle", "notes", "strengths", "limitations"];
const INDEX_KINDS = new Set(["term", "technology", "pathway", "biomarker", "target", "drug", "collection"]);

/** Name and text retrieval only. No score, including an exact name, changes review status. */
export function candidateFinder(catalog: CatalogRow[]) {
  const rows = catalog.filter(r => INDEX_KINDS.has(r.record.kind)).map(r => {
    const names = [r.record.name, ...(r.record.aka ?? []), r.record.id.replaceAll("-", " ")];
    return { ...r, names: names.map(normalize), nt: new Set(tokens(names.join(" "))), bt: new Set(tokens(TEXT_FIELDS.map(k => JSON.stringify(r.record[k] ?? "")).join(" "))) };
  });
  const df = new Map<string, number>();
  for (const r of rows) for (const t of r.nt) df.set(t, (df.get(t) ?? 0) + 1);
  return (item: Pick<CurriculumItem, "title" | "aliases" | "path" | "priorOwnerIds">): Candidate[] => {
    const queryNames = [item.title ?? "", ...item.aliases, item.path.split("/").at(-1)!.replace(/\.md$/, "").replaceAll("-", " ")].map(normalize).filter(Boolean);
    const qt = tokens(queryNames.join(" "));
    const out: Candidate[] = [];
    for (const r of rows) {
      const exactName = r.names.some(n => queryNames.includes(n));
      const matchedNameTerms = qt.filter(t => r.nt.has(t));
      const nameScore = matchedNameTerms.reduce((n, t) => n + 3 * Math.log(2 + rows.length / (1 + (df.get(t) ?? 0))), 0);
      const bodyScore = qt.filter(t => r.bt.has(t)).reduce((n, t) => n + Math.log(2 + rows.length / (1 + (df.get(t) ?? 0))), 0);
      const prior = item.priorOwnerIds.includes(r.record.id);
      const score = Math.round((nameScore + bodyScore + (exactName ? 150 : 0) + (prior ? 180 : 0)) * 100) / 100;
      if (score) out.push({ id: r.record.id, version: r.version, name: r.record.name, score, exactName, matchedNameTerms });
    }
    return out.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id) || a.version.localeCompare(b.version)).slice(0, 8);
  };
}

/** Closure requires a semantic review and unchanged field evidence, not a lexical match. */
export function reviewProblems(item: Pick<CurriculumItem, "sourceType" | "review">, catalog: Map<string, RecordData>): string[] {
  const r = item.review, errors: string[] = [];
  if (item.sourceType === "navigation" && r.status !== "reviewed") {
    if (r.status !== "navigation") errors.push("Navigation item lacks a navigation disposition");
    if (!r.auditor || !r.checkedAt || !r.rationale) errors.push("Navigation disposition needs a dated review of whether it adds unique teaching content");
    if (r.points.length) errors.push("Navigation with unique teaching content must be assessed as content");
    return errors;
  }
  if (r.status !== "reviewed") return ["Content remains unreviewed"];
  if (!r.auditor || !r.checkedAt || !r.rationale) errors.push("Semantic review lacks auditor, date or rationale");
  if (!r.points.length) errors.push("Semantic review has no learning points");
  for (const p of r.points) {
    if (!p.requirement.trim()) errors.push(p.id + ": missing learning requirement");
    if (!["covered-main", "covered-draft"].includes(p.status)) errors.push(p.id + ": " + p.status);
    if (p.remaining.length) errors.push(p.id + ": residual gaps remain");
    if (!p.evidence.length) errors.push(p.id + ": no field evidence");
    for (const e of p.evidence) {
      const record = catalog.get(e.version + ":" + e.recordId);
      if (!record) { errors.push(p.id + ": missing owner/version " + e.version + ":" + e.recordId); continue; }
      if (!(e.field in record)) errors.push(p.id + ": missing field " + e.field);
      else if (fieldHash(record[e.field]) !== e.fieldSha256) errors.push(p.id + ": evidence field changed");
      if (!e.explanation.trim()) errors.push(p.id + ": no explanation of what the field covers");
      if (p.status === "covered-main" && e.version !== "main") errors.push(p.id + ": draft evidence cannot establish main coverage");
    }
  }
  return errors;
}

/** Content representation alone is insufficient to finish the full audit. */
export function dependencyProblems(schemas: { id: string; status: string }[], literature: { queryId: string; rank: number; reviewStatus: string }[]): string[] {
  return [
    ...schemas.filter(r => r.status !== "resolved").map(r => "Schema gap remains open: " + r.id),
    ...literature.filter(r => r.reviewStatus === "unreviewed").map(r => "Literature screening remains open: " + r.queryId + ":" + r.rank),
  ];
}

function readJSON<T>(path: string): T { return JSON.parse(readFileSync(path, "utf8")) as T; }
function writeJSON(path: string, value: unknown) { writeFileSync(path, JSON.stringify(value, null, 2) + "\n"); }
function main() {
  const args = process.argv.slice(2);
  const arg = (name: string) => { const i = args.indexOf(name); if (i < 0 || !args[i + 1]) throw new Error("Missing " + name); return args[i + 1]; };
  const guide = resolve(arg("--guide")), ref = arg("--guide-ref"), baseline = resolve(arg("--baseline")), out = resolve(arg("--out"));
  const yaml = createRequire(join(process.cwd(), "package.json"))("js-yaml") as { load(s: string): Record<string, unknown> };
  mkdirSync(out, { recursive: true });
  const base = readJSON<RecordData[]>(baseline);
  const catalog: CatalogRow[] = base.map(record => ({ version: "main", record }));
  const pending = [369, 371, 373].map(pr => readJSON<{ pr: number; head: string; records: RecordData[] }>(join(out, "pending", "pr-" + pr + ".json")));
  for (const p of pending) for (const record of p.records) catalog.push({ version: "draft-" + p.pr, record });
  const proposals = args.flatMap((value, index) => {
    if (value !== "--proposal") return [];
    if (!args[index + 1] || args[index + 1].startsWith("--")) throw new Error("Missing --proposal path");
    return [readJSON<{ version: string; state: string; records: RecordData[] }>(resolve(args[index + 1]))];
  });
  for (const proposal of proposals) {
    if (!proposal.version || !proposal.state || proposal.version === "main" || catalog.some(r => r.version === proposal.version)) throw new Error("Proposal needs a distinct version and an explicit contribution state");
    for (const record of proposal.records) catalog.push({ version: proposal.version, record });
  }
  const catalogMap = new Map(catalog.map(r => [r.version + ":" + r.record.id, r.record]));
  const prior: Record<string, string[]> = existsSync(join(out, "prior-crosswalk.json")) ? readJSON(join(out, "prior-crosswalk.json")) : {};
  const old = existsSync(join(out, "ledger.json")) ? readJSON<{ items: CurriculumItem[] }>(join(out, "ledger.json")) : { items: [] };
  const oldMap = new Map(old.items.map(r => [r.path, r]));
  const files = execFileSync("git", ["ls-tree", "-r", "-z", ref, "--", "wiki/education/"], { cwd: guide, maxBuffer: 10_000_000 }).toString().split("\0").filter(Boolean);
  const items: CurriculumItem[] = [];
  const reviewPack: Record<string, unknown[]> = {};
  for (const line of files) {
    const m = /^(\d+) blob ([0-9a-f]+)\t(.+\.md)$/.exec(line); if (!m) continue;
    const path = m[3], raw = readFileSync(join(guide, path));
    const blob = createHash("sha1").update("blob " + raw.length + "\0").update(raw).digest("hex");
    if (blob !== m[2]) throw new Error("Source differs from pinned public blob: " + path);
    const body = raw.toString("utf8"), fm = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(body);
    if (!fm) throw new Error("Missing frontmatter: " + path);
    const meta = yaml.load(fm[1]);
    const sourceType = String(meta.type ?? "unknown");
    if (!["concept", "comparison", "guide", "guide-lesson", "navigation"].includes(sourceType)) throw new Error("Unclassified source type: " + path);
    const title = String(meta.title ?? "");
    const aliases = Array.isArray(meta.aliases) ? meta.aliases.map(String) : [];
    if (/\bdiana\b/i.test(title + " " + aliases.join(" "))) throw new Error("Patient-context title requires metadata-only manual handling: " + path);
    const domain = path.startsWith("wiki/education/concepts/") ? String(meta.domain ?? path.split("/").slice(3, -1).join("/")) : path.split("/")[2];
    const previous = oldMap.get(path), sourceSha256 = sha256(raw);
    if (previous && previous.sourceSha256 !== sourceSha256) throw new Error("Source changed; re-review explicitly before replacing: " + path);
    const review: Review = previous?.review ?? { status: "unreviewed", points: [] };
    const item: CurriculumItem = { path, title, aliases, sourceType, domain, sourceSha256, gitBlob: blob, sourceURL: "https://github.com/jasonLaster/oncoguide/blob/" + ref + "/" + path, priorOwnerIds: prior[path] ?? [], review };
    items.push(item);
    (reviewPack[domain.split("/")[0]] ??= []).push({ path, title, meta, body: body.slice(fm[0].length) });
  }
  if (old.items.some(r => !items.some(n => n.path === r.path))) throw new Error("Previously inventoried source disappeared");
  const find = candidateFinder(catalog);
  const candidates = items.filter(r => r.sourceType !== "navigation" || r.review.status === "reviewed").map(r => ({ path: r.path, candidates: find(r) }));
  const failures = items.flatMap(item => reviewProblems(item, catalogMap).map(problem => ({ path: item.path, problem })));
  const adjacent = existsSync(join(out, "adjacent-concepts.json")) ? readJSON<{ id: string; title: string; domain: string; sourceURLs: string[]; discoveryOccurrences: string[]; review: Review }[]>(join(out, "adjacent-concepts.json")) : [];
  const adjacentFailures = adjacent.flatMap(item => reviewProblems({ sourceType: "adjacent-concept", review: item.review }, catalogMap).map(problem => ({ path: "adjacent/" + item.id, problem })));
  const schemas = readJSON<{ id: string; status: string }[]>(join(out, "schema-gaps.json"));
  const literature = readJSON<{ queryId: string; rank: number; reviewStatus: string }[]>(join(out, "literature-dispositions.json"));
  const dependencies = dependencyProblems(schemas, literature);
  const count = (pred: (r: CurriculumItem) => boolean) => items.filter(pred).length;
  const content = items.filter(r => r.sourceType !== "navigation" || r.review.status === "reviewed");
  const closed = content.filter(r => !reviewProblems(r, catalogMap).length);
  const stats = { totalSources: items.length, conceptOrComparison: count(r => ["concept", "comparison"].includes(r.sourceType)), guideOrLesson: count(r => ["guide", "guide-lesson"].includes(r.sourceType)), navigation: count(r => r.sourceType === "navigation"), navigationReviewed: count(r => r.sourceType === "navigation" && r.review.status === "navigation" && !reviewProblems(r, catalogMap).length), navigationWithTeachingContent: count(r => r.sourceType === "navigation" && r.review.status === "reviewed"), semanticallyReviewed: count(r => r.review.status === "reviewed"), implementedCoverage: closed.length, mainCoverage: closed.filter(r => r.review.points.every(p => p.status === "covered-main")).length, unresolvedContentItems: content.length - closed.length, unresolvedSources: new Set(failures.map(f => f.path)).size, adjacentConcepts: adjacent.length, unresolvedAdjacentConcepts: new Set(adjacentFailures.map(f => f.path)).size, openSchemaGaps: schemas.filter(r => r.status !== "resolved").length, unreviewedLiteratureOccurrences: literature.filter(r => r.reviewStatus === "unreviewed").length, readyForFinalReaudit: !failures.length && !adjacentFailures.length && !dependencies.length };
  writeJSON(join(out, "ledger.json"), { schemaVersion: 2, attribution: "Data from OnCo (onco.cc), CC BY-NC 4.0. Public curriculum metadata only; no lesson bodies copied.", oncoBaseline: "0f8ebc2569e2dcb023364d8cb6971186f11f59ab", oncoSnapshotSha256: sha256(readFileSync(baseline)), guideRef: ref, pending: pending.map(p => ({ pr: p.pr, head: p.head, state: "open draft; not merged" })), proposals: proposals.map(p => ({ version: p.version, state: p.state, recordSnapshotSha256: sha256(JSON.stringify(p.records)) })), stats, items, adjacent });
  writeJSON(join(out, "candidates.json"), { warning: "Lexical retrieval for manual review only; no match score establishes coverage.", items: candidates });
  writeJSON(join(out, "open-items.json"), [...failures, ...adjacentFailures]);
  writeJSON(join(out, "open-dependencies.json"), dependencies);
  const packDir = "/tmp/onco-systematic-review-pack"; mkdirSync(packDir, { recursive: true });
  for (const [domain, rows] of Object.entries(reviewPack)) writeJSON(join(packDir, domain + ".json"), rows);
  console.log(JSON.stringify(stats));
  if (args.includes("--check-closed") && (failures.length || adjacentFailures.length || dependencies.length)) process.exitCode = 2;
}

if (process.argv[1]?.endsWith("education-coverage.ts")) main();
