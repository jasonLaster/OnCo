/** Schematic aliases for the technologies in src/data/spikes/breast-residual-subclones.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/**
 * None needs a drawing of its own. Subclone tracking, whole-genome integration and duplex strand sequencing are ways of
 * reading tumour DNA in a blood draw after treatment, so they borrow the residual disease tube; nucleosome and promoter
 * fragmentation methods borrow the fragment drawing; methylome subtyping borrows the methyl-tag helix; plasma
 * epigenomic profiling borrows the plain ctDNA tube. Every value is an id with its own scene, one hop only
 * (src/data/animated-wave8.test.ts is what catches a miss).
 */
export const breastResidualSubclonesSchematicAliases: Record<string, string> = {
  "eclipse-subclone-ctdna": "mrd-testing",
  "genome-wide-ctdna-mutation-integration": "mrd-testing",
  saferseqs: "mrd-testing",
  "griffin-nucleosome-profiling": "fragmentomics",
  "epic-seq": "fragmentomics",
  "meter-methylome-subtyping": "methylation-profiling",
  "plasma-epigenomic-profiling": "liquid-biopsy",
  // Added with src/data/spikes/rna-tests.ts: reading RNA from a blood or urine sample borrows the plain liquid biopsy tube.
  "liquid-rna-biopsy": "liquid-biopsy",
};
