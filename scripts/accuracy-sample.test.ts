import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rng, VERDICTS, weightedSample, wilson, type Sample } from "./accuracy-sample";

describe("accuracy sample", () => {
  it("draws the same sequence from the same seed", () => {
    const a = rng(20261103), b = rng(20261103);
    expect(Array.from({ length: 5 }, a)).toEqual(Array.from({ length: 5 }, b));
    const items = Array.from({ length: 50 }, (_, i) => ({ i, weight: 1 + (i % 3) }));
    expect(weightedSample(items, 10, rng(7)).map((x) => x.i)).toEqual(weightedSample(items, 10, rng(7)).map((x) => x.i));
  });

  it("gives Wilson intervals that contain the point estimate and stay in [0, 1]", () => {
    expect(wilson(0, 25)[0]).toBe(0);
    const [lo, hi] = wilson(31, 178);
    expect(lo).toBeLessThan(31 / 178);
    expect(hi).toBeGreaterThan(31 / 178);
    expect(wilson(10, 10)[1]).toBeLessThanOrEqual(1);
  });

  it("every recorded verdict in every sample file is one of the six, with a note", () => {
    const dir = join(process.cwd(), "docs", "audits", "accuracy");
    for (const f of readdirSync(dir).filter((f) => /^sample-.*\.json$/.test(f))) {
      const s = JSON.parse(readFileSync(join(dir, f), "utf8")) as Sample;
      for (const c of s.claims) if (c.verdict) {
        expect(VERDICTS as readonly string[], `${f} ${c.id}`).toContain(c.verdict);
        expect(c.note, `${f} ${c.id} needs a note saying what the source says`).toBeTruthy();
      }
    }
  });
});
