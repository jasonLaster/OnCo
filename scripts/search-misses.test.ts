import { describe, expect, it } from "vitest";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { aggregate, applyBlocklist, DAILY_CAP, dropAnswered, HOGQL, K_MIN, parseBlocklist, privateDir, renderQueue, selectQueue, type Ranked } from "./search-misses";

// Every query below is invented for the test. Real readers' searches never enter the repository.
const rows = (query: string, ids: number) => Array.from({ length: ids }, (_, i) => ({ query, distinctId: `synthetic-${i}` }));

describe("aggregating search_miss events", () => {
  it("keeps a query only when at least three distinct ids searched it", () => {
    expect(K_MIN).toBe(3);
    const out = aggregate([...rows("zorvex therapeutics", 3), ...rows("plimbix", 2), ...rows("plimbix", 2)]);
    expect(out).toEqual([{ query: "zorvex therapeutics", people: 3 }]);
  });
  it("counts an id once however often it searched, and merges spellings that fold together", () => {
    const out = aggregate([
      { query: "quorbel trial", distinctId: "a" }, { query: "quorbel trial", distinctId: "a" }, { query: "quorbel trial", distinctId: "b" },
      { query: "Quorbel-Trial", distinctId: "c" },
    ]);
    expect(out).toEqual([{ query: "quorbel trial", people: 3 }]);
  });
  it("re-applies the privacy filter and ignores malformed rows", () => {
    const out = aggregate([...rows("my glorpin scan", 5), ...rows("glorp 12/03", 5), { query: 7, distinctId: "x" }, { query: "fine name", distinctId: null }]);
    expect(out).toEqual([]);
  });
});

describe("dropping what the corpus answers", () => {
  const search = (q: string): Ranked[] => ({
    "zorvex therapeutics": [{ name: "ZORVEX", score: 80, queryTerms: ["zorvex"] }],
    "plimbix": [{ name: "Plimbix", score: 200, queryTerms: ["plimbix"] }],
    "brindle drug": [{ name: "Something else", aka: "Brindle drug", score: 9, queryTerms: [] }],
    "quorbel trial": [{ name: "The Quorbel trial of things", score: 150, queryTerms: ["quorbel", "trial"] }],
  } as Record<string, Ranked[]>)[q] ?? [];
  it("keeps a real miss, drops an exact name or alias match and anything the search now finds", () => {
    const misses = ["zorvex therapeutics", "plimbix", "brindle drug", "quorbel trial", "nothing here"].map((query) => ({ query, people: 3 }));
    expect(dropAnswered(misses, search).map((m) => m.query)).toEqual(["zorvex therapeutics", "nothing here"]);
  });
});

describe("blocklist, cap and queue", () => {
  it("drops exact blocked queries and whole blocked words", () => {
    const block = parseBlocklist("# synthetic\nflarn gobbet\nwozzle  # a word\n\n");
    expect(block).toEqual(["flarn gobbet", "wozzle"]);
    const out = applyBlocklist([{ query: "flarn gobbet", people: 3 }, { query: "wozzle pills", people: 3 }, { query: "wozzlers", people: 3 }], block);
    expect(out.map((m) => m.query)).toEqual(["wozzlers"]);
  });
  it("adds at most twenty new queries a run and carries what is already queued", () => {
    expect(DAILY_CAP).toBe(20);
    const misses = Array.from({ length: 30 }, (_, i) => ({ query: `synthetic${String.fromCharCode(97 + (i % 26))}${i >= 26 ? "x" : ""}`, people: 40 - i }));
    const first = selectQueue(misses, {}, "2026-11-04");
    expect(first.fresh).toHaveLength(20);
    expect(first.carried).toHaveLength(0);
    const second = selectQueue(misses, first.seen, "2026-11-05");
    expect(second.fresh).toHaveLength(10);
    expect(second.carried).toHaveLength(20);
    expect(second.seen[second.fresh[0].query]).toBe("2026-11-05");
    const md = renderQueue(second.carried, second.fresh, second.seen, "2026-11-05");
    expect(md).toContain("Private.");
    expect(md).toContain("queued 2026-11-04");
  });
  it("renders each query as code so it cannot become a link or a mention", () => {
    expect(renderQueue([], [{ query: "a`b", people: 3 }], {}, "2026-11-04")).toContain("- [ ] `ab` (3 visitors");
  });
});

describe("where the queue may go", () => {
  const repo = "/repo/onco";
  it("defaults to a private temporary directory", () => {
    expect(privateDir({}, repo, () => false)).toBe(join(tmpdir(), "onco-search-misses"));
  });
  it("refuses a directory inside the checkout unless git ignores it", () => {
    expect(() => privateDir({ SEARCH_MISSES_DIR: "/repo/onco/docs" }, repo, () => false)).toThrow(/inside the repository/);
    expect(privateDir({ SEARCH_MISSES_DIR: "/repo/onco/.cache/misses" }, repo, () => true)).toBe("/repo/onco/.cache/misses");
    expect(privateDir({ SEARCH_MISSES_DIR: "/elsewhere/misses" }, repo, () => false)).toBe("/elsewhere/misses");
  });
  it("queries PostHog with a constant, the last seven days of search_miss only", () => {
    expect(HOGQL).toContain("event = 'search_miss'");
    expect(HOGQL).toContain("INTERVAL 7 DAY");
  });
});
