import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { GLOBOCAN } from "./globocan";
import { routeExists } from "./sitemap-urls";
import { autoCountry, autoCountryCodes, countryIndex, countryPageFor, deepDiveCodes, deepDiveQueue, namesCountry, partAnchor } from "./country-pages";
import { CTGOV_COUNTRY, ISO3_TO_ISO2, PART_OF } from "@/data/country-codes";
import { generateStaticParams } from "@/app/countries/[iso]/page";

/**
 * Every GLOBOCAN country has a page: its deep dive where one exists, an automatic page otherwise, or a section of
 * its parent's page (France's overseas departments). A deep dive always wins, so the dynamic route must never
 * generate a code that has its own folder.
 */
describe("country pages", () => {
  const gloIso2 = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD").map((k) => ISO3_TO_ISO2[k]);
  const params = generateStaticParams().map((p) => p.iso.toUpperCase());

  it("knows the alpha-2 code of every GLOBOCAN country", () => {
    const missing = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD" && !ISO3_TO_ISO2[k]);
    expect(missing).toEqual([]);
    expect(new Set(gloIso2).size).toBe(gloIso2.length);
  });

  it("gives every GLOBOCAN country a page: a deep dive, an automatic page or a section of its parent's", () => {
    const dives = new Set(deepDiveCodes());
    const auto = new Set(params);
    const homeless = gloIso2.filter((c) => !dives.has(c) && !auto.has(c) && !PART_OF[c]);
    expect(homeless).toEqual([]);
    for (const c of gloIso2) {
      const route = countryPageFor(c).split("#")[0];
      expect(dives.has(route.slice(11, 13).toUpperCase()) || auto.has(route.slice(11, 13).toUpperCase()), c).toBe(true);
    }
    // The deep dives found on disk are the folders the sitemap helper sees as literal routes.
    for (const d of dives) expect(routeExists(`/countries/${d.toLowerCase()}/`), d).toBe(true);
  });

  it("lets a deep dive win: no automatic page is generated for a code with its own folder", () => {
    const clash = params.filter((c) => deepDiveCodes().includes(c));
    expect(clash).toEqual([]);
    expect(params).toContain("PE");
    expect(params).not.toContain("FR");
    expect(params).not.toContain("AR");
    expect(autoCountryCodes()).toEqual(params);
  });

  it("puts France's overseas departments on the France page, not on pages of their own", () => {
    for (const c of ["RE", "MQ", "GP", "GF"]) {
      expect(PART_OF[c]).toBe("FR");
      expect(params).not.toContain(c);
      expect(countryPageFor(c)).toBe(`/countries/fr/#${partAnchor(c)}`);
      expect(countryIndex().some((r) => r.iso2 === c)).toBe(false);
    }
    const fr = countryIndex().find((r) => r.iso2 === "FR")!;
    expect(fr.deepDive).toBe(true);
    expect(fr.parts?.map((p) => p.iso2).sort()).toEqual(["GF", "GP", "MQ", "RE"]);
    const page = readFileSync("src/app/countries/fr/page.tsx", "utf8");
    expect(page).toContain('<CountryParts parent="FR" />');
  });

  it("maps every country name in the trial captures to a code", () => {
    const text = readFileSync("src/data/trial-participation.ts", "utf8");
    const names = new Set<string>();
    for (const m of text.matchAll(/"countries": \[([^\]]*)\]/g)) for (const n of JSON.parse(`[${m[1]}]`) as string[]) names.add(n);
    expect([...names].filter((n) => !CTGOV_COUNTRY[n])).toEqual([]);
  });

  it("matches programme and law records to a country by whole name only", () => {
    expect(namesCountry("Cervical cancer screening programme in Myanmar", "MM")).toBe(true);
    expect(namesCountry("Breast cancer screening programme in Turkey", "TR")).toBe(true);
    expect(namesCountry("Screening in Papua New Guinea", "GN")).toBe(false);
    expect(namesCountry("A law in Northern Ireland", "IE")).toBe(false);
    expect(namesCountry("Programme in Nigeria", "NE")).toBe(false);
    expect(autoCountry("PT")!.laws.map((e) => e.id)).toContain("portugal-law-75-2021-right-to-be-forgotten");
    expect(autoCountry("MM")!.programmes.map((e) => e.id)).toContain("screening-mmr-cervix");
  });

  it("reads the deep-dive queue from the coverage proposal", () => {
    const q = deepDiveQueue();
    expect(q.size).toBe(60);
    expect(q.ranks.get("PE")).toBe(24);
  });

  it("flags estimates IARC built from neighbouring countries", () => {
    const ws = autoCountry("WS")!;
    expect(ws.methodInc.code).toBe("5");
    expect(ws.methodInc.neighbours).toBe(true);
    expect(autoCountry("PE")!.methodInc.neighbours).toBe(false);
  });
});
