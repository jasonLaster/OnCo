# Searches OnCo couldn't answer

A reader who searches for something OnCo does not hold finds nothing and leaves. This pipeline counts those
searches, privately, so the gaps can be researched. **Readers' searches are never published**: not in the
repository, an issue, a commit message, a changelog, a log, a fixture or a workflow artifact. They stay in PostHog
and in one private file on the owner's machine.

**A miss can only start research, never a page.** When a queued search leads to a new record, the record is written
from primary sources like any other, and nothing in it, its commit or the changelog says that anyone searched for it.

## In the browser

`src/lib/search-miss.ts`, loaded with a dynamic import by the header palette, the home-page search box and the search
page only after their results paint.

- **Only with consent.** The event goes through the same PostHog client as page counts (`src/lib/posthog.ts`), which
  does nothing unless the reader pressed Allow. A Global Privacy Control signal counts as a refusal
  (`src/lib/analytics-consent.ts`), and a browser sending Do Not Track sends no `search_miss` at all.
- **What a miss is.** A query of at least three characters whose first five ranked hits contain none that both scores
  at least `WEAK_SCORE` (15) and matched more than half the query's content words. The scores are MiniSearch's BM25
  after `rankHits`; on the full index, queries that matched nothing real topped out at 3.4 to 5.9 and the weakest real
  top hit was 32. The word rule catches a two-word query where only one word matched something unrelated.
  `src/lib/search-miss.test.ts` holds both groups against the real index. The judgement uses word matches only.
- **When it is sent.** Once the query has stayed unchanged for two seconds, never per keystroke, and each distinct
  query once per page load.
- **What is sent.** One event, `search_miss`, whose only property is the query folded to lowercase without accents or
  punctuation. `before_send` re-checks the query and strips everything else PostHog would attach: page address,
  referrer, device, browser, screen, session and window. It keeps the project token, the library name and version,
  and the distinct id, which `persistence: "memory"` holds for one visit only and which is needed for the count below.
- **What is never sent** (`src/lib/search-miss-filter.ts`): more than six words or 60 characters; anything with `@`,
  a link, a run of five or more digits or seven digits in all (phone numbers, ZIP codes, record and trial numbers), a
  numeric or written date, a UK or Canadian postcode shape, an age or birth date, or a first-person word such as "my",
  "I", "I have", "we" or "our". A doubtful query is dropped, not cleaned.

## The private queue

`scripts/search-misses.ts`, run by the owner or a local scheduled session, never by a GitHub workflow (a public
repository's Actions logs and artifacts are public):

    POSTHOG_PERSONAL_API_KEY=... POSTHOG_PROJECT_ID=... npx tsx scripts/search-misses.ts

- Reads the last seven days of `search_miss` from PostHog's query API at run time. Without the two variables it says
  so and does nothing. The personal API key needs read access to query the project; keep it in the shell or a
  password manager, never in a file under the checkout.
- **Three visitors at least.** A query is kept only if three or more distinct ids searched it. The privacy filter is
  applied again.
- Drops a query that a record's name or alias now matches, or that the site's own search, re-run locally, no longer
  misses.
- Drops anything on the private blocklist, `blocklist.txt` in the same directory: one folded query, or one whole word,
  per line.
- Adds at most **20 new queries a run** and carries forward the ones already queued that still qualify.
- Writes `queue.md` and `seen.json` to `SEARCH_MISSES_DIR` (default `$TMPDIR/onco-search-misses/`, mode 0700; macOS
  clears `$TMPDIR` on restart, so set a private directory to keep the queue). A directory inside the checkout is
  refused unless git ignores it.
- Prints counts only, never a query.

## Retention: one setting for the owner

PostHog has no per-event expiry. The window is per project: **Settings > Project > Product analytics > Events
retention**, set by an organization admin, with older events deleted at PostHog's next monthly cleanup
([PostHog: events data retention](https://posthog.com/docs/data/events-retention)). Without it a free-plan project
keeps events for a year. Set the shortest window the setting offers; it applies to the page counts in the same
project too, which need no longer. The private queue keeps no distinct ids, and `seen.json` can be deleted at any time.
