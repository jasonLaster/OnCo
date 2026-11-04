import { describe, expect, it } from "vitest";
import { cleanDoi, corpusDois, doisInText, piiToDoi, readCache } from "./doi-exists";

/**
 * Every DOI in the corpus is a registered DOI. A DOI typed from memory is usually a real paper, the wrong one, and
 * paper-identity.test.ts catches that on paper records; but a DOI can also simply not exist, and when it is a link
 * on a trial or a card nothing else notices. The 3 November 2026 accuracy sweep found trial links typed rather than
 * resolved this way (10.1200/JCO.23.00810 for KEYNOTE-826, two Lancet article numbers that were never issued).
 *
 * src/data/doi-exists.json records whether each DOI resolves at Crossref or doi.org, written by
 * `npx tsx scripts/doi-exists.ts`. This test is offline: it fails on a corpus DOI recorded as not resolving, and
 * reports DOIs the file has not seen. When you add a DOI, run the script so it is checked.
 */
const cache = readCache().dois;
const corpus = corpusDois();

/**
 * Non-resolving DOIs the corpus still writes, each with the reason. This list only shrinks: the test fails when an
 * entry is fixed or no longer written, so that it is taken off. Do not add a DOI here to make the test pass; find the
 * paper. The first two are the right DOIs for their papers and are simply not registered; the rest are open.
 */
const KNOWN_UNRESOLVED: Record<string, string> = {
  "10.1200/go-25-00721": "METRO PLUS (JCO Global Oncology 2026): PubMed 42308452 holds this DOI, but ASCO had not registered it with Crossref on 3 November 2026",
  "10.1684/ejd.2008.0472": "Basset-Seguin 2008 (European Journal of Dermatology): the publisher's DOI was never registered; the record says so and links PubMed 18693158",
};

describe("DOI extraction", () => {
  it("reads links, fields, publisher URLs and Elsevier article numbers", () => {
    const text = [
      `{ url: "https://doi.org/10.1200/JCO.23.00914", label: "JCO 2023" },`,
      `doi: "10.1056/NEJMoa2115304",`,
      `source: "https://www.nejm.org/doi/full/10.1056/NEJMoa2201048?query=x",`,
      `url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)01774-4/fulltext"`,
      `url: "https://www.sciencedirect.com/science/article/pii/S016781402300018X"`,
      `"(see 10.1016/S1470-2045(19)30274-8)."`,
    ].join("\n");
    expect(doisInText(text).map((d) => d.doi)).toEqual([
      "10.1200/jco.23.00914", "10.1056/nejmoa2115304", "10.1056/nejmoa2201048",
      "10.1016/s0140-6736(24)01774-4", "10.1016/s1470-2045(19)30274-8",
    ]);
  });
  it("keeps SICI angle brackets, drops preprint versions and badge images", () => {
    expect(doisInText(`doi: "10.1002/1097-0142(19830201)51:3<430::AID-CNCR2820510313>3.0.CO;2-5"`).map((d) => d.doi)).toEqual(["10.1002/1097-0142(19830201)51:3<430::aid-cncr2820510313>3.0.co;2-5"]);
    expect(doisInText(`<a href="https://doi.org/10.1200/JCO.23.00914">x</a>`).map((d) => d.doi)).toEqual(["10.1200/jco.23.00914"]);
    expect(cleanDoi("10.1101/2023.07.21.23292757v2.full.pdf")).toBe("10.1101/2023.07.21.23292757");
    expect(cleanDoi("10.5281/zenodo.3564938.svg")).toBeUndefined();
  });
  it("drops template literals and trailing punctuation", () => {
    expect(cleanDoi("10.1056/${id}")).toBeUndefined();
    expect(cleanDoi("10.1093/annonc/mdx123).")).toBe("10.1093/annonc/mdx123");
    expect(piiToDoi("S0140-6736(24)01774-4")).toBe("10.1016/s0140-6736(24)01774-4");
    expect(piiToDoi("S0923753422000059")).toBeUndefined(); // unpunctuated: the DOI is 10.1016/j.annonc..., not guessable
  });
});

describe("every DOI in the corpus exists", () => {
  it("no DOI in src/data is recorded as unregistered", () => {
    const bad = [...corpus].filter(([d]) => cache[d] === 0 && !(d in KNOWN_UNRESOLVED)).map(([d, at]) => `${d} does not resolve at Crossref or doi.org (${at.join(", ")})`);
    expect(bad, `${bad.join("\n")}\nResolve the intended paper (Europe PMC by title or trial name), replace the DOI, then run npx tsx scripts/doi-exists.ts --recheck-missing`).toEqual([]);
  });
  it("the list of known non-resolving DOIs only shrinks", () => {
    const stale = Object.keys(KNOWN_UNRESOLVED).filter((d) => !corpus.has(d) || cache[d] !== 0)
      .map((d) => `${d} is ${corpus.has(d) ? "now recorded as resolving" : "no longer in src/data"}: take it off KNOWN_UNRESOLVED`);
    expect(stale, stale.join("\n")).toEqual([]);
  });
  it("reports DOIs not yet checked", () => {
    const unseen = [...corpus.keys()].filter((d) => cache[d] === undefined);
    if (unseen.length) console.warn(`${unseen.length} DOI(s) in src/data are not in src/data/doi-exists.json yet; run npx tsx scripts/doi-exists.ts:\n  ${unseen.slice(0, 30).join("\n  ")}`);
    expect(Object.keys(cache).length).toBeGreaterThan(0);
  });
});
