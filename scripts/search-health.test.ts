import { beforeAll, describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { siteSearchDocs, type SearchDoc } from "../src/lib/search-index";
import { SEARCH_INDEX_OPTIONS } from "../src/lib/search-rank";
import { ALLOWED_AMBIGUOUS, allowedRank, auditNames, MAX_ALLOWED_AMBIGUOUS, buildAuditIndex, describeFailure, nameOwners, positionBySearchRanked, positionOf, stratifiedSample, TOP, TYPED_NAME_WORDS, wordCount, type AuditIndex, type RankReport } from "./search-health-lib";

/**
 * The gate half of the daily search health check (scripts/search-health.ts): on the checked-out tree, every record
 * whose name is something a reader would type (up to TYPED_NAME_WORDS words, 11,483 of 21,601 documents on
 * 4 November 2026) must come in the first three results for its exact name, or the first five when another record
 * answers to the same name. A ranking change or a new record that shadows an old one fails here, before shipping.
 *
 * Added after the owner searched for "Jaime Leandro Foundation" and found nothing. That record ranked first; the
 * index had not loaded. This test is what keeps "it ranks first" true.
 */

const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 240_000);

let docs: SearchDoc[];
let index: AuditIndex;
let report: RankReport;

beforeAll(() => {
  docs = siteSearchDocs();
  index = buildAuditIndex(docs);
  report = auditNames(index, nameOwners(docs), docs.filter((d) => wordCount(d.name) <= TYPED_NAME_WORDS));
}, SLOW_MS);

describe("search health: a record is found by its exact name", () => {
  it("covers the typed names of every kind", () => {
    expect(report.checked).toBeGreaterThan(10_000);
    for (const kind of ["cancer", "drug", "company", "institution", "person", "trial", "target", "term", "journal", "page"]) expect(report.byKind[kind]?.checked ?? 0, kind).toBeGreaterThan(0);
  });

  it("every typed name puts its record in the first three (five when shared), apart from the allowance list", () => {
    const unexpected = report.failures.filter((f) => !(f.id in ALLOWED_AMBIGUOUS));
    expect(unexpected.map(describeFailure), "Fix the record (a name shadowed by another record's alias, say) or the ranking; do not add to ALLOWED_AMBIGUOUS (search-health-lib.ts) to pass this").toEqual([]);
  });

  it("the allowance list only shrinks: every entry still fails, and it has not grown", () => {
    const failing = new Set(report.failures.map((f) => f.id));
    const healed = Object.keys(ALLOWED_AMBIGUOUS).filter((id) => !failing.has(id));
    expect(healed, "These now rank where they should: remove them from ALLOWED_AMBIGUOUS and lower MAX_ALLOWED_AMBIGUOUS").toEqual([]);
    expect(Object.keys(ALLOWED_AMBIGUOUS).length).toBeLessThanOrEqual(MAX_ALLOWED_AMBIGUOUS);
  });

  it("finds the record the owner searched for", () => {
    expect(positionOf(index, "Jaime Leandro Foundation", "jaime-leandro-foundation").rank).toBe(1);
    expect(allowedRank("Jaime Leandro Foundation", nameOwners(docs))).toBe(TOP);
  });
});

describe("search health: the fast path agrees with searchRanked", () => {
  // positionOf reads MiniSearch internals to avoid building every hit; this is what notices if an upgrade changes them.
  it("gives the same position, and the same first three when the record is not among them, on a sample of names", () => {
    const plain = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
    plain.addAll(docs);
    const sample = stratifiedSample(docs.filter((d) => wordCount(d.name) <= 8), 4);
    const failing = report.failures.slice(0, 4).map((f) => docs.find((d) => d.id === f.id)!);
    const cases: Array<[string, string]> = [...sample, ...failing].map((d) => [d.name, d.id]);
    // A query for one record's name asking where another comes: mostly not found at all, which exercises that branch.
    for (let i = 0; i + 1 < sample.length && i < 20; i++) cases.push([sample[i].name, sample[i + 1].id]);
    cases.push(["breast", "breast-cancer"], ["pembro", "pembrolizumab"], ["laura esserman", "laura-esserman"]);
    const mismatches: string[] = [];
    for (const [q, id] of cases) {
      const a = positionBySearchRanked(plain, q, id);
      const b = positionOf(index, q, id);
      const full = a.rank === 0 || a.rank > TOP;
      if (a.rank !== b.rank || (full && a.first.map((h) => h.id).join() !== b.first.map((h) => h.id).join())) mismatches.push(`${q} / ${id}: searchRanked ${a.rank}, fast ${b.rank}`);
    }
    expect(cases.length).toBeGreaterThan(80);
    expect(mismatches).toEqual([]);
  }, SLOW_MS);
});
