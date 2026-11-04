import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";

/**
 * A worldwide case or death count is an estimate from one edition of one source, and the editions differ: GLOBOCAN
 * 2018, 2020, 2022 and 2024 give different numbers for the same cancer. The accuracy sweep of 3 November 2026 read the
 * figures on the 60 most-linked cancer pages and found the same fault on more than twenty of them: "about 190,000 new
 * cases a year worldwide", with no year and no body, so a 2018 or 2022 estimate read as this year's count (head and
 * neck carried the 2018 figure; hypopharynx the 2020 one). Every such sentence in a `burden` now says whose estimate
 * it is or which year it is for; this keeps it that way. When the site moves to GLOBOCAN 2024, the years say which
 * sentences to update.
 */
const sentences = (s: string) => s.split(/(?<=[.;])\s+(?=[A-Z0-9~])/);
const COUNT = /\d{1,3}(,\d{3})+|\d[\d.]*\s*(million|thousand)/i;
const YEARLY = /\b(a|per|each|every)\s+year\b|\bannual(ly)?\b/i;
const WORLD = /\b(worldwide|globally|global|in the world)\b/i;
const NAMED = /\b(19|20)\d\d\b|GLOBOCAN|IARC|\bWHO\b/;

describe("worldwide burden figures", () => {
  it("name the year or the body whose estimate they are", () => {
    const undated: string[] = [];
    for (const e of graph().entities) {
      if (e.kind !== "cancer" || !e.burden) continue;
      for (const s of sentences(e.burden)) if (COUNT.test(s) && YEARLY.test(s) && WORLD.test(s) && !NAMED.test(s)) undated.push(`${e.id}: ${s}`);
    }
    expect(undated).toEqual([]);
  });
});
