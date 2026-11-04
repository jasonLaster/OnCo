/**
 * Searches OnCo could not answer, as a private research queue (docs/SEARCH-MISSES.md).
 *
 * Reads the `search_miss` events of the last seven days from PostHog at run time, keeps a query only if at least
 * three different visitors searched it (K_MIN), drops what the corpus now answers (the browser's own search re-run
 * here) and what the private blocklist names, and adds at most DAILY_CAP new queries a run to a queue file.
 *
 * Readers' searches are never published. The queue is written only to a private directory outside the repository
 * (SEARCH_MISSES_DIR, default $TMPDIR/onco-search-misses/; a directory inside the checkout is refused unless git
 * ignores it), and this script prints counts only, never a query, so its output is safe in any log. It is not run by
 * a GitHub workflow, because a public repository's Actions logs and artifacts are public. A queued query can start
 * research and nothing else: any record that follows is written from primary sources alone and says nothing, in the
 * record, the commit or the changelog, about anyone having searched for it.
 *
 *   POSTHOG_PERSONAL_API_KEY=... POSTHOG_PROJECT_ID=... npx tsx scripts/search-misses.ts
 *
 * Optional: POSTHOG_API_HOST (default https://us.posthog.com), SEARCH_MISSES_DIR. In the directory: queue.md (the
 * queue), seen.json (what was queued and when, so the cap counts only new queries) and blocklist.txt (one folded
 * query or whole word per line, # for comments; written by hand).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";
import { safeMissQuery } from "../src/lib/search-miss-filter";
import { isSearchMiss } from "../src/lib/search-miss";
import { NAME_BOOST, nameBoost } from "../src/lib/search-rank";

/** Fewer than this many distinct PostHog ids and a query is never read, however often it was typed. */
export const K_MIN = 3;
/** New queries added to the queue per run (the script is meant to run once a day). */
export const DAILY_CAP = 20;
export const WINDOW_DAYS = 7;

export type Row = { query: unknown; distinctId: unknown };
export type Miss = { query: string; people: number };
export type Ranked = { name: string; aka?: string; score: number; queryTerms?: string[] };

/** Rows of (query, distinct id) to queries with their count of distinct ids, re-filtered and k-anonymous. */
export function aggregate(rows: readonly Row[], k = K_MIN): Miss[] {
  const by = new Map<string, Set<string>>();
  for (const r of rows) {
    if (typeof r.query !== "string" || typeof r.distinctId !== "string" || !r.distinctId) continue;
    const q = safeMissQuery(r.query);
    if (!q) continue;
    let ids = by.get(q);
    if (!ids) by.set(q, (ids = new Set()));
    ids.add(r.distinctId);
  }
  return [...by].filter(([, ids]) => ids.size >= k).map(([query, ids]) => ({ query, people: ids.size }))
    .sort((a, b) => b.people - a.people || a.query.localeCompare(b.query));
}

/** Drops a query the corpus answers today: a record is named or aliased by it, or the search no longer misses. */
export function dropAnswered(misses: readonly Miss[], search: (q: string) => Ranked[]): Miss[] {
  return misses.filter((m) => {
    const hits = search(m.query);
    if (hits.some((h) => nameBoost(m.query, h.name, h.aka) >= NAME_BOOST.aliasExact)) return false;
    return isSearchMiss(m.query, hits);
  });
}

/** Blocklist lines: a folded query dropped exactly, or a single word dropped wherever it appears as a whole word. */
export function parseBlocklist(text: string): string[] {
  return text.split("\n").map((l) => l.replace(/#.*/, "").trim()).filter(Boolean).map((l) => safeMissQuery(l) ?? l.toLowerCase());
}

export function applyBlocklist(misses: readonly Miss[], block: readonly string[]): Miss[] {
  const exact = new Set(block);
  const words = new Set(block.filter((b) => !b.includes(" ")));
  return misses.filter((m) => !exact.has(m.query) && !m.query.split(" ").some((w) => words.has(w)));
}

/**
 * The queue for today: every query already queued that still qualifies, plus at most `cap` new ones, most-searched
 * first. Returns the updated seen map too.
 */
export function selectQueue(misses: readonly Miss[], seen: Record<string, string>, today: string, cap = DAILY_CAP) {
  const carried = misses.filter((m) => seen[m.query]);
  const fresh = misses.filter((m) => !seen[m.query]).slice(0, cap);
  const nextSeen = { ...seen };
  for (const m of fresh) nextSeen[m.query] = today;
  return { carried, fresh, seen: nextSeen };
}

/** The private queue file. Each query is shown as code so nothing in it can render as a link or a mention. */
export function renderQueue(carried: readonly Miss[], fresh: readonly Miss[], seen: Record<string, string>, today: string): string {
  const line = (m: Miss) => `- [ ] \`${m.query.replace(/`/g, "")}\` (${m.people} visitors in ${WINDOW_DAYS} days, queued ${seen[m.query] ?? today})`;
  return [
    `# Searches OnCo couldn't answer (private, ${today})`,
    "",
    "Private. Never paste these into the repository, an issue, a commit or a chat. Each one can start research and",
    "nothing more: a record that follows is written from primary sources alone and never mentions a search.",
    "",
    `## New today (${fresh.length}, at most ${DAILY_CAP})`,
    "",
    ...(fresh.length ? fresh.map(line) : ["None."]),
    "",
    `## Still unanswered (${carried.length})`,
    "",
    ...(carried.length ? carried.map(line) : ["None."]),
    "",
  ].join("\n");
}

/** Where the queue may be written: outside the checkout, or inside it only where git ignores the path. */
export function privateDir(env: { SEARCH_MISSES_DIR?: string }, repoRoot: string, ignored: (p: string) => boolean): string {
  const dir = resolve(env.SEARCH_MISSES_DIR || join(tmpdir(), "onco-search-misses"));
  const rel = relative(repoRoot, dir);
  const inside = rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
  if (inside && !ignored(dir)) throw new Error("SEARCH_MISSES_DIR is inside the repository and not ignored by git; choose a private directory");
  return dir;
}

/** The HogQL is a constant: nothing from a reader is interpolated into it. */
export const HOGQL = `SELECT properties.query, distinct_id FROM events WHERE event = 'search_miss' AND timestamp > now() - INTERVAL ${WINDOW_DAYS} DAY GROUP BY properties.query, distinct_id LIMIT 100000`;

async function fetchRows(key: string, project: string, host: string): Promise<Row[]> {
  const res = await fetch(`${host.replace(/\/$/, "")}/api/projects/${encodeURIComponent(project)}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query: HOGQL } }),
  });
  // The status only: a PostHog error body could echo event data.
  if (!res.ok) throw new Error(`PostHog query failed with HTTP ${res.status}`);
  const body = (await res.json()) as { results?: unknown[][] };
  return (body.results ?? []).map((r) => ({ query: r[0], distinctId: r[1] }));
}

async function main(): Promise<void> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  const project = process.env.POSTHOG_PROJECT_ID;
  if (!key || !project) {
    console.log("search-misses: POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID are not set; nothing read, nothing written.");
    return;
  }
  const repoRoot = resolve(new URL("..", import.meta.url).pathname);
  const dir = privateDir({ SEARCH_MISSES_DIR: process.env.SEARCH_MISSES_DIR }, repoRoot, (p) => {
    try { execFileSync("git", ["-C", repoRoot, "check-ignore", "-q", p]); return true; } catch { return false; }
  });
  const rows = await fetchRows(key, project, process.env.POSTHOG_API_HOST || "https://us.posthog.com");
  const misses = aggregate(rows);

  // The browser's index and ranking, so "answered" means what a reader would see today.
  const [{ default: MiniSearch }, { siteSearchDocs }, { SEARCH_INDEX_OPTIONS }, { searchRanked }] = await Promise.all([
    import("minisearch"), import("../src/lib/search-index"), import("../src/lib/search-rank"), import("../src/lib/search-client"),
  ]);
  const ms = new MiniSearch(SEARCH_INDEX_OPTIONS);
  ms.addAll(siteSearchDocs());
  const unanswered = dropAnswered(misses, (q) => searchRanked(ms, q, 5) as unknown as Ranked[]);

  mkdirSync(dir, { recursive: true, mode: 0o700 });
  const blockPath = join(dir, "blocklist.txt");
  const seenPath = join(dir, "seen.json");
  const kept = applyBlocklist(unanswered, existsSync(blockPath) ? parseBlocklist(readFileSync(blockPath, "utf8")) : []);
  const today = new Date().toISOString().slice(0, 10);
  const seen = existsSync(seenPath) ? (JSON.parse(readFileSync(seenPath, "utf8")) as Record<string, string>) : {};
  const q = selectQueue(kept, seen, today);
  writeFileSync(join(dir, "queue.md"), renderQueue(q.carried, q.fresh, q.seen, today), { mode: 0o600 });
  writeFileSync(seenPath, JSON.stringify(q.seen, null, 2) + "\n", { mode: 0o600 });
  // Counts only. Never print a query: this output may end up in a log.
  console.log(`search-misses: ${rows.length} rows, ${misses.length} queries from at least ${K_MIN} visitors, ${unanswered.length} still unanswered, ${kept.length} after the blocklist; ${q.fresh.length} new and ${q.carried.length} carried in the private queue.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((e: unknown) => { console.error(`search-misses: ${e instanceof Error ? e.message : "failed"}`); process.exit(1); });
}
