import { beforeAll, describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { siteSearchDocs, type SearchDoc } from "./search-index";
import { SEARCH_INDEX_OPTIONS } from "./search-rank";
import { searchRanked } from "./search-client";
import { safeMissQuery } from "./search-miss-filter";
import { createMissReporter, isSearchMiss, MISS_SETTLE_MS, WEAK_SCORE } from "./search-miss";

describe("the search_miss privacy filter", () => {
  it("passes short names of things, folded", () => {
    expect(safeMissQuery("Zorvex Therapeutics")).toBe("zorvex therapeutics");
    expect(safeMissQuery("  KRAS G12C  ")).toBe("kras g12c");
    expect(safeMissQuery("Mistletoe")).toBe("mistletoe");
    expect(safeMissQuery("HER2+ breast")).toBe("her2+ breast");
    expect(safeMissQuery("CDK4/6 inhibitors")).toBe("cdk4 6 inhibitors");
    expect(safeMissQuery("egfr l858r")).toBe("egfr l858r");
    expect(safeMissQuery("Hôpital Necker")).toBe("hopital necker");
  });
  it("drops what is too short, too long or too many words", () => {
    expect(safeMissQuery("ab")).toBeNull();
    expect(safeMissQuery("  a  ")).toBeNull();
    expect(safeMissQuery("x".repeat(61))).toBeNull();
    expect(safeMissQuery("one two three four five six")).toBe("one two three four five six");
    expect(safeMissQuery("one two three four five six seven")).toBeNull();
  });
  it("drops contact details, long numbers, postcodes and dates", () => {
    for (const q of [
      "jane.doe@example.com", "call 020 7946 0018", "+44 7700 900123", "nct03353753", "zip 90210",
      "SW1A 1AA clinic", "oncologist M1 1AE", "K1A 0B1", "scan 12/03", "2026-11-04 results", "4 November", "Nov 2026 scan",
      "www.example.org", "https://x.io",
    ]) expect(safeMissQuery(q), q).toBeNull();
  });
  it("drops first-person sentences and ages", () => {
    for (const q of ["my tumour markers", "I have a lump", "i'm scared", "we were told", "lump in me", "born 1962", "aged 54 lump", "45 years old"]) {
      expect(safeMissQuery(q), q).toBeNull();
    }
  });
  it("does not mistake a mutation, a stage or a trial name for a postcode or date", () => {
    for (const q of ["kras g12c", "egfr t790m", "stage 4 lung", "keynote-189", "1p/19q codeletion", "cd19 car-t"]) expect(safeMissQuery(q), q).not.toBeNull();
  });
});

/** The real index, built as the browser builds it, so the weak-score line is held against the live corpus. */
let ms: MiniSearch<SearchDoc>;
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);
beforeAll(() => {
  ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
  ms.addAll(siteSearchDocs());
}, SLOW_MS);

describe("what counts as a miss", () => {
  it("is a miss when nothing real matched, or only one word of two", () => {
    for (const q of ["zzqx", "qwerty uiop", "taxes", "parking hospital", "blorft"]) expect(isSearchMiss(q, searchRanked(ms, q, 5)), q).toBe(true);
  });
  it("is not a miss when the record is there, typed in full, in part or with function words", () => {
    for (const q of ["pembro", "tnbc", "keytruda", "laura esserman", "glioblastoma diet", "what is her2", "side effects of chemo", "proton therapy children", "kras g12c", "mistletoe", "dog"]) {
      expect(isSearchMiss(q, searchRanked(ms, q, 5)), q).toBe(false);
    }
  });
  it("puts the weak-score line between fuzzy noise and the weakest real top hit", () => {
    expect(searchRanked(ms, "qwerty uiop", 1)[0]?.score ?? 0).toBeLessThan(WEAK_SCORE);
    expect(searchRanked(ms, "dog", 1)[0].score).toBeGreaterThan(WEAK_SCORE * 1.5);
  });
});

describe("the miss reporter", () => {
  const fakeTimers = () => {
    let next = 0;
    const live = new Map<number, () => void>();
    return {
      timers: { set: (fn: () => void) => { live.set(++next, fn); return next; }, clear: (h: unknown) => { live.delete(h as number); } },
      flush: () => { for (const [id, fn] of [...live]) { live.delete(id); fn(); } },
      pending: () => live.size,
    };
  };
  const miss = [{ score: 2, queryTerms: ["x"] }];
  const hit = [{ score: 300, queryTerms: ["zorvex", "oncology"] }];

  it("sends only the settled query, never each keystroke", () => {
    const t = fakeTimers();
    const sent: string[] = [];
    const r = createMissReporter((q) => sent.push(q), t.timers);
    for (const k of ["zor", "zorv", "zorve", "zorvex", "zorvex t", "zorvex therapeutics"]) r.note(k, miss);
    expect(t.pending()).toBe(1);
    t.flush();
    expect(sent).toEqual(["zorvex therapeutics"]);
    expect(MISS_SETTLE_MS).toBeGreaterThanOrEqual(1000);
  });
  it("sends each distinct query once per page load", () => {
    const t = fakeTimers();
    const sent: string[] = [];
    const r = createMissReporter((q) => sent.push(q), t.timers);
    r.note("Blorft", miss); t.flush();
    r.note("blorft", miss); t.flush();
    r.note("BLORFT!", miss); t.flush();
    expect(sent).toEqual(["blorft"]);
  });
  it("sends nothing for a hit, an unsafe query, or a miss the reader typed past", () => {
    const t = fakeTimers();
    const sent: string[] = [];
    const r = createMissReporter((q) => sent.push(q), t.timers);
    r.note("zorvex oncology", hit); t.flush();
    r.note("my lump", miss); t.flush();
    r.note("blorf", miss); r.note("blorfing pembrolizumab", [{ score: 300, queryTerms: ["blorfing", "pembrolizumab"] }]); t.flush();
    expect(sent).toEqual([]);
  });
});
