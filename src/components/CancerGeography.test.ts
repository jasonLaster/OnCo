import { describe, expect, it } from "vitest";
import { GLOBOCAN } from "@/lib/globocan";
import { GLOBOCAN_METHOD, methodMeaning } from "./CancerGeography";

/**
 * The map's tooltip explains each country's GLOBOCAN data-method code. When IARC changes its codes between editions
 * (2024 added 4 and 5 and dropped 9), a code the legend cannot explain would fall through to "see GLOBOCAN"; this
 * fails instead, so the legend is re-read from IARC's fact sheets whenever the data file moves.
 */
describe("GLOBOCAN data-method legend", () => {
  const countries = Object.entries(GLOBOCAN.countries).filter(([key]) => key !== "WORLD");

  it("explains every incidence and mortality method code in public/globocan/countries.json", () => {
    const missing: string[] = [];
    for (const [iso3, c] of countries) {
      if (!c.methodInc || !GLOBOCAN_METHOD.inc[c.methodInc]) missing.push(`${iso3} incidence ${JSON.stringify(c.methodInc)}`);
      if (!c.methodMort || !GLOBOCAN_METHOD.mort[c.methodMort]) missing.push(`${iso3} mortality ${JSON.stringify(c.methodMort)}`);
    }
    expect(missing).toEqual([]);
  });

  it("has no legend entry for a code the current edition does not use", () => {
    const used = { inc: new Set(countries.map(([, c]) => c.methodInc)), mort: new Set(countries.map(([, c]) => c.methodMort)) };
    for (const metric of ["inc", "mort"] as const) {
      for (const code of Object.keys(GLOBOCAN_METHOD[metric])) expect(used[metric].has(code), `${metric} ${code}`).toBe(true);
    }
  });

  it("names the edition year rather than a fixed one", () => {
    expect(methodMeaning("inc", "1", GLOBOCAN.year)).toBe(`trends in national rates projected to ${GLOBOCAN.year}`);
    expect(methodMeaning("mort", "5", GLOBOCAN.year)).toBeNull();
    expect(methodMeaning("inc", undefined, GLOBOCAN.year)).toBeNull();
  });
});
