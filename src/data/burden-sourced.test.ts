import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";

/**
 * Accuracy round 2 (3 November 2026) read every figure on the 60 most-linked cancer pages against its source. The
 * `burden` line was the weakest field on the page: 58 of 89 checked burden figures were wrong, stale, imprecise or
 * unsourced, against 2 of 60 prognosis figures. Most came from records whose only links were Wikipedia and an NCCN
 * landing page: the figure was in neither, and NCCN cannot be read without a login, so the reader had no route to it.
 *
 * A burden line with a number needs at least one source a reader can check it against: a registry, GLOBOCAN, a
 * statistics office, a paper. This is a ratchet. It counts the cancer records whose burden carries a figure while every
 * link on the record (and on its prognosis) is Wikipedia, an NCCN guideline page, the ESMO guideline index or an NCI
 * topic landing page. The count may fall and may not rise: a new record must cite where its numbers come from, and an
 * old one leaves the list when someone adds the source or removes the figure. Lower BUDGET when it falls.
 */
const BUDGET = 44;
const WEAK = /wikipedia\.org|nccn\.org|esmo\.org\/guidelines\/?$|cancer\.gov\/types\/[^/]+\/?$/;

describe("cancer burden figures", () => {
  it(`have a checkable source on the record (ratchet: at most ${BUDGET} without one)`, () => {
    const weak: string[] = [];
    for (const e of graph().entities) {
      if (e.kind !== "cancer" || !e.burden || !/\d/.test(e.burden)) continue;
      const urls = [...e.links.map((l) => l.url), ...(e.prognosis?.sources ?? []).map((l) => l.url)];
      if (urls.every((u) => WEAK.test(u))) weak.push(e.id);
    }
    expect(weak.length, `cancer records whose burden figure has no checkable source:\n${weak.join("\n")}`).toBeLessThanOrEqual(BUDGET);
  });
});
