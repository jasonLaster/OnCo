import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The ceilings in src/data/page-weight.json are what a reader actually downloads, measured against the live
 * site. This test cannot fetch, so it holds the shape and the ratchet; the weekly workflow runs
 * `npx tsx scripts/page-weight.ts --check` against https://onco.cc, which is the only place the real number
 * exists.
 *
 * Why the file is here at all. Every page budget in the repo measures static markup, because that is what
 * react-dom/server can produce inside vitest, and `src/app/chrome-size.test.ts` says the assumption out loud.
 * On 25 September 2026 the assumption broke: /timeline/ rendered 528 KB of markup, inside its 640 KB budget,
 * and shipped 2,150 KB, because the hydration payload is three quarters of the page. Every markup budget was
 * green the whole time. A measure that cannot see three quarters of the thing is not a measure.
 */
type Ceilings = { note: string; pages: Record<string, { total: number; payload: number; measured: string; basis: string; basisCount: number }> };

describe("what a reader downloads", () => {
  const c = JSON.parse(readFileSync("src/data/page-weight.json", "utf8")) as Ceilings;
  const entries = Object.entries(c.pages);

  it("records the heaviest page of each shape, not a sample", () => {
    expect(entries.length).toBeGreaterThanOrEqual(13);
    for (const p of ["/", "/timeline/", "/explore/", "/trials/", "/cancers/breast-cancer/"]) {
      expect(Object.keys(c.pages), `${p} is watched`).toContain(p);
    }
  });

  it("every ceiling is a real measurement with the date it was taken", () => {
    for (const [path, v] of entries) {
      expect(v.total, path).toBeGreaterThan(0);
      expect(v.payload, path).toBeGreaterThanOrEqual(0);
      expect(v.payload, `${path}: payload cannot exceed the total`).toBeLessThanOrEqual(v.total);
      expect(v.measured, `${path}: measured date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("no ceiling is so loose it would never fire", () => {
    // 4 MB is past any page the site has ever served; a number above it is a budget that has been raised to
    // pass rather than a page that has been fixed, which is the one thing AGENTS.md forbids outright.
    for (const [path, v] of entries) expect(v.total, `${path} ceiling`).toBeLessThan(4 * 1024 * 1024);
  });

  it("the file says why it exists, because the next person will want to raise a number", () => {
    expect(c.note).toMatch(/ratchet/i);
    expect(c.note).toMatch(/hydration payload/i);
  });

  it("every page says what its size is allowed to scale with", () => {
    // A flat ceiling failed eight of thirteen pages within a week of being set, because the corpus grew by a
    // thousand records and nothing had got heavier per unit of content. Each page now names a basis: a kind
    // for an index of that kind, "total" for anything that aggregates, "fixed" for a page whose size should
    // not move at all. A scaling page must carry the count it was measured against, or it cannot scale.
    for (const [path, v] of entries) {
      expect(v.basis, `${path} basis`).toBeTruthy();
      if (v.basis === "fixed") expect(v.basisCount, `${path} is fixed and needs no count`).toBe(0);
      else expect(v.basisCount, `${path} scales with ${v.basis} and needs the count it was measured against`).toBeGreaterThan(0);
    }
  });
});
