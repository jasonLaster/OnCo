import { contentWords } from "./semantic";
import { safeMissQuery } from "./search-miss-filter";

/**
 * When a search finds nothing worth showing, and what is then sent (docs/SEARCH-MISSES.md). Loaded by the header
 * palette, the home-page search box and the search page with a dynamic import after their results paint, so none of
 * it ships with a page until a reader has searched.
 */

/**
 * Below this ranked score a hit is noise. The scores are MiniSearch's BM25 text scores after search-rank.ts rankHits,
 * so they are absolute rather than relative to the top hit. Measured on the full index on 4 November 2026: queries
 * that match nothing real reach only fuzzy expansions of other words, and their best hits scored 3.4 to 5.9
 * ("qwerty uiop", "taxes"); the weakest top hit of a query that did find its record was 32 ("dog", the pet-dogs idea),
 * and typed prefixes such as "pembro" and "tnbc" scored 66 to 68. Fifteen sits clear of the first group and well under
 * the second. src/lib/search-miss.test.ts holds both groups against the real index, so a corpus or ranking change that
 * moves them fails a test rather than quietly changing what counts as a miss.
 */
export const WEAK_SCORE = 15;
/** Only the rows a reader sees first count: a match at row forty is not an answer. */
export const MISS_TOP = 5;
/** The reader has stopped typing: the settled query is judged, never a keystroke. */
export const MISS_SETTLE_MS = 2000;

export type MissHit = { score: number; queryTerms?: readonly string[] };

/** MiniSearch's default tokenizer, lowercased as its default processTerm does. */
const terms = (s: string) => [...new Set(s.toLowerCase().split(/[\n\r\p{Z}\p{P}]+/u).filter(Boolean))];

/**
 * A miss: none of the first five ranked hits both scores at least WEAK_SCORE and matched more than half the query's
 * content words. The second half catches a company the corpus lacks whose first word happens to be a trial's name
 * (a made-up "zorvex therapeutics" against a trial called ZORVEX): the trial scores well on the one word and says
 * nothing about the company. A two-word query needs both words, three need two. Function
 * words ("what", "is", "of") are left out of the count first, since MiniSearch's prefix search matches them anywhere.
 */
export function isSearchMiss(searched: string, hits: readonly MissHit[]): boolean {
  const words = terms(contentWords(searched) || searched);
  if (words.length === 0) return false;
  const need = Math.floor(words.length / 2) + 1;
  return !hits.slice(0, MISS_TOP).some((h) => {
    if (h.score < WEAK_SCORE) return false;
    const matched = new Set((h.queryTerms ?? []).map((t) => t.toLowerCase()));
    return words.filter((w) => matched.has(w)).length >= need;
  });
}

type Timers = { set: (fn: () => void, ms: number) => unknown; clear: (handle: unknown) => void };

/**
 * One reporter per page load. `note` is called with every result the search UI paints; only a query that stays put
 * for MISS_SETTLE_MS, is a miss, and passes the privacy filter is sent, and each distinct query once.
 */
export function createMissReporter(send: (query: string) => void, timers: Timers = { set: (fn, ms) => setTimeout(fn, ms), clear: (h) => clearTimeout(h as ReturnType<typeof setTimeout>) }) {
  const sent = new Set<string>();
  let pending: unknown;
  return {
    note(query: string, hits: readonly MissHit[], searched: string = query): void {
      if (pending !== undefined) { timers.clear(pending); pending = undefined; }
      const safe = safeMissQuery(query);
      if (!safe || sent.has(safe) || !isSearchMiss(searched, hits)) return;
      pending = timers.set(() => {
        pending = undefined;
        if (sent.has(safe)) return;
        sent.add(safe);
        send(safe);
      }, MISS_SETTLE_MS);
    },
    /** For tests: the queries sent so far. */
    sent: () => [...sent],
  };
}

/** Do Not Track as the browser states it; GPC is already a refusal in analytics-consent.ts. */
function doNotTrack(): boolean {
  if (typeof navigator === "undefined") return true;
  const w = typeof window === "undefined" ? undefined : (window as unknown as { doNotTrack?: string });
  return navigator.doNotTrack === "1" || w?.doNotTrack === "1";
}

let reporter: ReturnType<typeof createMissReporter> | undefined;

/** The browser entry point: judge a painted result and, if it is a settled miss, send it through PostHog. */
export function noteSearch(query: string, hits: readonly MissHit[], searched: string = query): void {
  if (doNotTrack()) return;
  reporter ??= createMissReporter((q) => { void import("./posthog").then((m) => m.trackSearchMiss(q)); });
  reporter.note(query, hits, searched);
}
