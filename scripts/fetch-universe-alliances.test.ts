import { describe, expect, it } from "vitest";
import { latestOnsAllianceRelease, nhsAlliancesFromOns, parseNhsAlliances, parseOnsAlliances } from "./fetch-universe";
import snapshot from "../src/data/universe-lists/nhs-cancer-alliances.json";

/**
 * The NHS Cancer Alliance list (issue #336): NHS England's page answers scripts with an empty bot challenge, so the
 * list is read from the ONS Open Geography Portal, with NHS England's labels and websites carried over by name.
 * The fixtures are cut down from the real responses of 4 November 2026.
 */
describe("NHS Cancer Alliances from ONS", () => {
  const search = {
    features: [
      { id: "8df2", properties: { type: "Feature Service", title: "Cancer Alliances (July 2023) Boundaries EN BGC", url: "https://services1.arcgis.com/X/arcgis/rest/services/Cancer_Alliances_July_2023_Boundaries_EN_BGC/FeatureServer" } },
      { id: "9269", properties: { type: "Feature Service", title: "Cancer Alliances (April 2026) Boundaries EN BGC", url: "https://services1.arcgis.com/X/arcgis/rest/services/CAL_APR_2026_EN_BGC/FeatureServer" } },
      { id: "6e9a", properties: { type: "Feature Service", title: "Cancer Alliances (April 2024) Boundaries EN BGC", url: "https://services1.arcgis.com/X/arcgis/rest/services/CAL_APR_2024_EN_BGC/FeatureServer" } },
      // Not the generalised boundaries, not a feature service, or a different geography: all ignored.
      { id: "4b81", properties: { type: "Feature Service", title: "Cancer Alliances (April 2027) Boundaries EN BFE", url: "https://services1.arcgis.com/X/arcgis/rest/services/CAL_APR_2027_EN_BFE/FeatureServer" } },
      { id: "41c1", properties: { type: "PDF", title: "Cancer Alliances (April 2027) Boundaries EN BGC", url: "" } },
      { id: "1fc0", properties: { type: "Feature Service", title: "Cancer Alliances and National Cancer Vanguards (February 2017) Boundaries EN BGC", url: "https://services1.arcgis.com/X/arcgis/rest/services/CAL_and_NCV/FeatureServer" } },
    ],
  };

  it("picks the newest generalised-boundary release", () => {
    expect(latestOnsAllianceRelease(search)).toMatchObject({ id: "9269", year: 2026, month: 4, url: "https://services1.arcgis.com/X/arcgis/rest/services/CAL_APR_2026_EN_BGC/FeatureServer" });
    expect(latestOnsAllianceRelease({ features: [] })).toBeNull();
    expect(latestOnsAllianceRelease(null)).toBeNull();
  });

  it("reads codes and names whatever year the field names carry", () => {
    const rows = parseOnsAlliances({ features: [
      { attributes: { FID: 7, CAL26CD: "E56000021", CAL26NM: "West London" } },
      { attributes: { FID: 1, CAL26CD: "E56000005", CAL26NM: "Cheshire and Merseyside" } },
      { attributes: { FID: 1, CAL26CD: "E56000005", CAL26NM: "Cheshire and Merseyside" } },
      { attributes: { FID: 9, CAL26CD: "not a code", CAL26NM: "Nowhere" } },
    ] });
    expect(rows).toEqual([{ code: "E56000005", name: "Cheshire and Merseyside" }, { code: "E56000021", name: "West London" }]);
    expect(parseOnsAlliances({ features: [{ attributes: { CAL24CD: "E56000026", CAL24NM: "Humber and North Yorkshire" } }] })).toEqual([{ code: "E56000026", name: "Humber and North Yorkshire" }]);
    expect(parseOnsAlliances({ error: { code: 400 } })).toEqual([]);
  });

  it("keeps NHS England's label and website, including the one alliance named for its host rather than its area", () => {
    const prev = [
      { name: "Humber & North Yorkshire Cancer Alliance", website: "https://www.hnycanceralliance.org.uk" },
      { name: "Royal Marsden Partners", website: "https://rmpartners.nhs.uk/" },
    ];
    const items = nhsAlliancesFromOns([
      { code: "E56000021", name: "West London" },
      { code: "E56000026", name: "Humber and North Yorkshire" },
      { code: "E56000099", name: "Somewhere New" },
    ], prev);
    expect(items).toEqual([
      { name: "Royal Marsden Partners", website: "https://rmpartners.nhs.uk/", code: "E56000021", onsName: "West London" },
      { name: "Humber & North Yorkshire Cancer Alliance", website: "https://www.hnycanceralliance.org.uk", code: "E56000026", onsName: "Humber and North Yorkshire" },
      { name: "Somewhere New Cancer Alliance", website: "", code: "E56000099", onsName: "Somewhere New" },
    ]);
  });

  it("the NHS England fallback still reads the map list, and reads nothing from a bot challenge", () => {
    expect(parseNhsAlliances(`<h2>Map of Cancer Alliances in England</h2><ol><li><a href="https://a.nhs.uk">Northern Cancer Alliance</a></li><li><a href="https://rmpartners.nhs.uk/">Royal Marsden Partners</a></li></ol>`)).toHaveLength(2);
    expect(parseNhsAlliances("")).toEqual([]);
  });

  it("the snapshot carries an ONS code for every alliance and lost no website in the switch", () => {
    const items = snapshot.items as Array<{ name: string; website: string; code?: string }>;
    expect(snapshot.total).toBe(items.length);
    if (!snapshot.source.url.includes("arcgis.com")) return; // the fallback wrote it: no codes to check
    for (const i of items) {
      expect(i.code, i.name).toMatch(/^E56\d{6}$/);
      expect(i.website, `${i.name} has no website: a new alliance, or a name the join did not match`).toMatch(/^https:\/\//);
    }
    expect(new Set(items.map((i) => i.code)).size).toBe(items.length);
  });
});
