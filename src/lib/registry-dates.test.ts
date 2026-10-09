import { describe, expect, it } from "vitest";
import { registryDateLabel, registryDateRange } from "./registry-dates";

describe("registry snapshot date labels", () => {
  it("keeps a single date when all products were refreshed together", () => {
    const range = registryDateRange([{ fetched: "2026-10-06" }, { fetched: "2026-10-06" }]);
    expect(registryDateLabel(range.oldest, range.newest)).toBe("2026-10-06");
  });

  // The range leads with the current date and names the oldest as a qualifier: on the day this merged, two
  // product snapshots in 1,090 were behind, and "dates differ by product" read as though none could be trusted.
  it("leads with the newest date and names the oldest, regardless of index order", () => {
    for (const dates of [["2026-10-06", "2026-09-01", "2026-09-15"], ["2026-09-15", "2026-09-01", "2026-10-06"]]) {
      const range = registryDateRange(dates.map((fetched) => ({ fetched })));
      expect(registryDateLabel(range.oldest, range.newest)).toBe("2026-10-06, with the oldest from 2026-09-01");
    }
  });

  it("states that the date is unknown when there are no snapshots", () => {
    const range = registryDateRange([]);
    expect(registryDateLabel(range.oldest, range.newest)).toBe("on an unknown date");
  });
});
