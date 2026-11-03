import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import type { Drug } from "@/lib/schema";

/**
 * A side-effect rate is a number a patient weighs before a treatment, so it carries the page it was read from.
 *
 * The 3 November 2026 accuracy sample drew ten drug numbers and found five wrong or imprecise, every one a toxicity
 * row with no `source` of its own: an ibrutinib atrial-fibrillation rate from one trial's comparator arm presented as
 * pooled data, an azacitidine nausea rate from the venetoclax combination, a 2018 label figure the label had since
 * revised. Widening to every such row in eight cancer spike files found 122 of 188 needing correction or removal.
 * A row that names its label table or paper can be checked in a minute; a bare number cannot be checked at all.
 *
 * Every remaining row (143 on 46 drugs) was then read against its label or paper the same day: 50 confirmed, 83 corrected,
 * 10 figures removed. The count is zero, and stays there: a new row needs its source.
 */
describe("toxicity rows carry their source", () => {
  const FLOOR = 0;
  it("rows with a percentage and no source do not increase", () => {
    const bare = (graph().kind("drug") as Drug[]).flatMap((d) => d.toxicity
      .filter((t) => !t.source && (t.anyGradePct !== undefined || t.grade3PlusPct !== undefined))
      .map((t) => `${d.id}: ${t.event}`));
    expect(bare.length, `toxicity rows with a number and no source (add the label or paper URL):\n${bare.join("\n")}`).toBeLessThanOrEqual(FLOOR);
  });
});
