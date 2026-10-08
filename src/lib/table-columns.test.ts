import { describe, expect, it } from "vitest";
import { columnSize, fitColumns, clampColumnWidth } from "./table-columns";

describe("content-aware column sizing", () => {
  const compact = columnSize(["12", "36", "7"], [42, 42, 34], [42, 42, 34], 64);
  const text = columnSize(["A long treatment description", "Another detailed description"], [320, 330], [100, 110], 90);
  it("gives description columns more room than numeric columns", () => {
    const widths = fitColumns([text, compact], 800);
    expect(widths[0]).toBeGreaterThan(widths[1]);
    expect(widths.reduce((a, b) => a + b)).toBe(800);
  });
  it("scrolls rather than squeezing columns below their readable minimum", () => {
    expect(fitColumns([text, compact], 100)).toEqual([text.min, compact.min]);
  });
  it("preserves manual widths while other columns adapt to the container", () => {
    const manual = new Map([[0, 360]]);
    expect(fitColumns([text, compact], 800, manual)[0]).toBe(360);
    expect(fitColumns([text, compact], 450, manual)).toEqual([360, 90]);
    expect(fitColumns([text, compact], 100, manual)).toEqual([360, compact.min]);
  });
  it("does not expand manually sized columns to fill unused space", () => {
    expect(fitColumns([text, compact], 800, new Map([[0, 200], [1, 100]]))).toEqual([200, 100]);
  });
  it("bounds outliers but keeps the full header width", () => {
    const model = columnSize(Array(20).fill("short"), [...Array(19).fill(80), 4000], Array(20).fill(70), 110);
    expect(model.preferred).toBe(110);
    expect(columnSize(["1"], [20], [20], 250).min).toBe(250);
    expect(clampColumnWidth(-100)).toBe(56);
    expect(clampColumnWidth(9000)).toBe(2000);
  });
  it("keeps fixed row controls and non-wrapping badges inside their columns on mobile", () => {
    // The name row needs 220px plus 28px of cell padding; its save button
    // must not overlap the adjacent status badge when the card is narrower.
    const name = columnSize(["A treatment name"], [260], [100], 60, 248);
    const status = columnSize(["Approved 2007"], [172], [90], 150, 196);
    expect(fitColumns([name, status], 356)).toEqual([248, 196]);
    expect(columnSize(["short"], [80], [60], 70, 320).min).toBe(320);
  });
});
