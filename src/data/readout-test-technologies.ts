/**
 * Which technologies make a product a test of a biomarker readout, for the readouts where a technology says so
 * exactly. src/lib/members.ts reads this to gather a readout page's "Tests that measure it" from the corpus, so an MRD
 * test added next month appears on the MRD page without anyone editing that page's record (owner, 3 November 2026:
 * "gather things like all MRD tests to run the sections so we can be more comprehensive").
 *
 * A product matches a rule when its own `technologies` (a test record) or the row's `technologies` (a tumour-testing
 * row) contain every id of at least one group in `match`. Nothing here reads text.
 *
 * Kept per readout rather than per measurement on purpose. Measurement is too coarse to name a test: `ctdna-detection`
 * covers both MRD positivity and ctDNA tumour fraction, which different tests report, and `hrd-testing` holds a
 * germline BRCA test (BRACAnalysis CDx) alongside the HRD score test, so a measurement-wide rule would list a test on a
 * page for a result it does not report. A readout with no rule here keeps its hand-listed tests plus the structured
 * links that already name it (src/lib/members.ts).
 */
export type ReadoutTestRule = {
  /** Any group whose every technology the product carries. */
  match: readonly (readonly string[])[];
  /** Test records carrying any of these tags are left out (a screening test is not a test of residual disease). */
  excludeTags?: readonly string[];
  /** Tumour-testing rows of these scopes are left out, for the same reason. */
  excludeScopes?: readonly string[];
  /** Why the rule is right, in a sentence a reviewer can check against the technology page. */
  why: string;
};

export const READOUT_TEST_RULES: Readonly<Record<string, ReadoutTestRule>> = {
  "ctdna-mrd-positive": {
    match: [["mrd-testing"], ["ngs-mrd-clonoseq"], ["ctdna-lymphoma-monitoring"]],
    // A multi-cancer screening test whose maker also sells a residual disease test can carry the MRD technology on
    // its record; the screening test itself does not report MRD after curative treatment.
    excludeTags: ["mced"],
    excludeScopes: ["screening"],
    why: "An MRD test is by definition a test for tumour DNA left after curative treatment, which is what this readout is.",
  },
  "ig-tcr-clonality": {
    match: [["clonality-testing"], ["ngs-mrd-clonoseq"]],
    why: "Clonality testing reads the immunoglobulin or T-cell receptor rearrangement, and the sequencing MRD assay reads the same rearrangement again after treatment.",
  },
  "dmmr-ihc": {
    // Mismatch repair testing also covers MSI by PCR and by sequencing, which report MSI status rather than this
    // stain, so only the immunohistochemistry tests qualify.
    match: [["msi-mmr-testing", "histopathology-ihc"]],
    why: "Mismatch repair immunohistochemistry is the stain this readout is read from.",
  },
};
