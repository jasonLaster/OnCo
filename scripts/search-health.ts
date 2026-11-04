/**
 * Daily search health check: can a reader find every record on the live site by typing its name?
 *
 * Asked for on 4 November 2026, after the owner searched onco.cc for "Jaime Leandro Foundation" and saw nothing. The
 * record had been in the corpus since 16 September and was first in the ranking; the index (9.5 MB, 2.1 MB over the
 * wire) had simply not finished loading. This script measures each of the ways a record can fail to be found:
 *
 *   1. Staleness. Only scripts/ship.sh deploys, so main can be ahead of the site. The live build id
 *      (https://onco.cc/build-id.txt) against origin/main gives the commits and days behind, and the live index's ids
 *      against the documents the checked-out tree would ship (siteSearchDocs) give the records missing from the site.
 *   2. Ranking. Each record's exact name is searched in the live index with the site's own ranking (searchRanked) and
 *      must come in the first three, or five when another record answers to the same name: every record of up to six
 *      words, a stratified sample of the longer names, and every record added in the last fortnight.
 *   3. Cost. The compressed size and download time of search.json, which is what a reader waits for before the first
 *      result appears.
 *
 * It makes two requests to the live site, build-id.txt and search.json, and no others: the Vercel edge has blocked the
 * office address for automated fetching before (16 September 2026). It reads the repository and never writes to it.
 *
 *   npx tsx scripts/search-health.ts                  summary to stderr
 *   npx tsx scripts/search-health.ts --issue=out.md   also the issue body, written only when something needs a person
 *   npx tsx scripts/search-health.ts --full           every record, long names included (about 50 minutes)
 *   npx tsx scripts/search-health.ts --offline        skip the live site and audit the tree's own documents
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { request } from "node:https";
import { brotliDecompressSync, gunzipSync } from "node:zlib";
import { siteSearchDocs, type SearchDoc } from "../src/lib/search-index";
import { ALLOWED_AMBIGUOUS, auditNames, buildAuditIndex, describeFailure, nameOwners, stratifiedSample, TYPED_NAME_WORDS, wordCount, type RankReport } from "./search-health-lib";

const SITE = "https://onco.cc";
const UA = "OnCo search health (https://onco.cc; hello@onco.cc)";
/** Long names sampled per kind (trials and papers are most of them). */
const LONG_PER_KIND = 150;
const RECENT_DAYS = 14;

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const opt = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

type Fetched = { status: number; encoding: string; wire: number; body: Buffer; ms: number };

/** One GET with the encodings a browser offers, keeping the bytes as they came over the wire so their size can be measured. */
function get(url: string): Promise<Fetched> {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const req = request(url, { headers: { "user-agent": UA, "accept-encoding": "br, gzip" }, timeout: 60_000 }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => {
        const raw = Buffer.concat(chunks);
        const encoding = String(res.headers["content-encoding"] ?? "identity");
        const body = encoding === "br" ? brotliDecompressSync(raw) : encoding === "gzip" ? gunzipSync(raw) : raw;
        resolve({ status: res.statusCode ?? 0, encoding, wire: raw.length, body, ms: Date.now() - t0 });
      });
      res.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new Error(`timed out: ${url}`)));
    req.on("error", reject);
    req.end();
  });
}

const git = (...a: string[]): string => execFileSync("git", a, { encoding: "utf8", maxBuffer: 1 << 30 }).trim();
const tryGit = (...a: string[]): string | undefined => { try { return git(...a); } catch { return undefined; } };
const mb = (n: number) => `${(n / 1e6).toFixed(2)} MB`;

/** Ids that appear on an added line under src/data in the last `days` days of history. */
function recentIds(days: number, known: ReadonlySet<string>): Set<string> {
  const out = new Set<string>();
  const log = tryGit("log", `--since=${days} days ago`, "-p", "-U0", "--no-color", "--format=", "--", "src/data");
  if (!log) return out;
  for (const line of log.split("\n")) {
    if (!line.startsWith("+") || line.startsWith("+++")) continue;
    for (const m of line.matchAll(/\bid:\s*["']([a-z0-9][a-z0-9-]*)["']/g)) if (known.has(m[1])) out.add(m[1]);
  }
  return out;
}

/** Failures that are not on the documented allowance list (ALLOWED_AMBIGUOUS in search-health-lib.ts). */
const realFailures = (r: RankReport) => r.failures.filter((f) => !(f.id in ALLOWED_AMBIGUOUS));

function rankSection(title: string, r: RankReport): string[] {
  const real = realFailures(r);
  const allowed = r.failures.length - real.length;
  const lines = [`#### ${title}`, "", `${real.length} of ${r.checked} records are not where a reader typing the exact name would look${allowed ? ` (and ${allowed} on the documented list of ambiguous names)` : ""}.`, ""];
  if (!real.length) return lines;
  const byKind = new Map<string, number>();
  for (const f of real) byKind.set(f.kind, (byKind.get(f.kind) ?? 0) + 1);
  lines.push("| Kind | Checked | Not found in place |", "|---|---:|---:|");
  for (const [k, n] of [...byKind].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) lines.push(`| ${k} | ${r.byKind[k]?.checked ?? 0} | ${n} |`);
  lines.push("", ...real.slice(0, 150).map((f) => `- ${describeFailure(f)}`));
  if (real.length > 150) lines.push(`- ... and ${real.length - 150} more`);
  lines.push("");
  return lines;
}

async function main(): Promise<void> {
  const t0 = Date.now();
  const expected = siteSearchDocs();
  const expectedIds = new Set(expected.map((d) => d.id));
  const lines: string[] = [];
  let needsPerson = false;

  let live: SearchDoc[] = expected;
  if (!flag("offline")) {
    const idRes = await get(`${SITE}/build-id.txt`);
    const liveSha = idRes.status === 200 ? idRes.body.toString("utf8").trim() : "";
    const idx = await get(`${SITE}/api/v1/search.json`);
    if (idx.status !== 200) throw new Error(`search.json answered ${idx.status}`);
    live = JSON.parse(idx.body.toString("utf8")) as SearchDoc[];
    const liveIds = new Set(live.map((d) => d.id));

    tryGit("fetch", "--quiet", "origin", "main");
    const mainRef = tryGit("rev-parse", "--verify", "--quiet", "origin/main") ? "origin/main" : "HEAD";
    const mainSha = git("rev-parse", mainRef);
    const known = /^[0-9a-f]{7,40}$/.test(liveSha) && tryGit("cat-file", "-e", `${liveSha}^{commit}`) !== undefined;
    const behind = known ? Number(git("rev-list", "--count", `${liveSha}..${mainSha}`)) : NaN;
    const liveDate = known ? new Date(git("show", "-s", "--format=%cI", liveSha)) : undefined;
    const mainDate = new Date(git("show", "-s", "--format=%cI", mainSha));
    const days = liveDate ? Math.max(0, (mainDate.getTime() - liveDate.getTime()) / 864e5) : NaN;

    const missing = expected.filter((d) => !liveIds.has(d.id));
    const gone = live.filter((d) => !expectedIds.has(d.id));
    const tree = git("rev-parse", "HEAD");

    lines.push("### The live site against main", "");
    lines.push(`- Live build: \`${liveSha.slice(0, 12) || "unknown"}\`${liveDate ? ` (${liveDate.toISOString().slice(0, 10)})` : ""}; ${mainRef}: \`${mainSha.slice(0, 12)}\` (${mainDate.toISOString().slice(0, 10)}).`);
    lines.push(known ? `- The live site is ${behind} commit${behind === 1 ? "" : "s"} and ${days.toFixed(1)} days behind ${mainRef}. Only \`scripts/ship.sh\` deploys; merges and bot pull requests do not.` : `- The live build id is not a commit in this clone, so how far behind it is cannot be counted.`);
    lines.push(`- Records the checked-out tree (\`${tree.slice(0, 12)}\`) would ship that the live index lacks: ${missing.length}. Records the live index has that the tree no longer does: ${gone.length}.`);
    lines.push(`- search.json: ${mb(idx.body.length)} raw, ${mb(idx.wire)} over the wire (${idx.encoding}), ${(idx.ms / 1000).toFixed(1)} s to download from the runner. Results stay empty until it has loaded.`, "");
    if (missing.length) {
      needsPerson = true;
      lines.push("Missing from the live index (they appear when the site is next shipped):", "");
      for (const d of missing.slice(0, 100)) lines.push(`- ${d.kind} \`${d.id}\` "${d.name}"`);
      if (missing.length > 100) lines.push(`- ... and ${missing.length - 100} more`);
      lines.push("");
    }
  }

  const index = buildAuditIndex(live);
  const owners = nameOwners(live);
  const recent = recentIds(RECENT_DAYS, new Set(live.map((d) => d.id)));
  const short = live.filter((d) => wordCount(d.name) <= TYPED_NAME_WORDS);
  const long = live.filter((d) => wordCount(d.name) > TYPED_NAME_WORDS);
  const longSample = flag("full") ? long : stratifiedSample(long, LONG_PER_KIND, recent);
  const shortReport = auditNames(index, owners, short);
  const longReport = auditNames(index, owners, longSample);
  if (realFailures(shortReport).length || realFailures(longReport).length) needsPerson = true;

  lines.push(`### Exact names in the ${flag("offline") ? "tree's" : "live"} index`, "");
  lines.push(`Each record's name was searched with the site's own ranking (\`searchRanked\`) and must come in the first three, or the first five when another record answers to the same name. ${recent.size} records added in the last ${RECENT_DAYS} days were included whatever their length.`, "");
  lines.push(...rankSection(`Names of up to ${TYPED_NAME_WORDS} words (every record)`, shortReport));
  lines.push(...rankSection(`Longer names (${flag("full") ? "every record" : `a sample of up to ${LONG_PER_KIND} per kind plus recent records`})`, longReport));
  lines.push(`_Checked ${new Date().toISOString().slice(0, 16)}Z in ${((Date.now() - t0) / 1000).toFixed(0)} s by \`scripts/search-health.ts\`. This issue is opened, updated and closed by .github/workflows/search-health.yml; it never edits data or deploys._`);

  const text = lines.join("\n");
  process.stderr.write(text + "\n");
  const out = opt("issue");
  if (out) writeFileSync(out, needsPerson ? text + "\n" : "");
}

main().catch((e: unknown) => { process.stderr.write(`search health failed: ${e instanceof Error ? e.message : String(e)}\n`); process.exit(1); });
