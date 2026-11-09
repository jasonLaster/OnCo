import type { TermInput } from "@/lib/schema";

/** Therapeutic mechanisms and measurement distinctions, with evidence scoped per record. */
export const educationTherapeuticEvidence: TermInput[] = [
  {
    "id": "adc-analytes-and-exposure",
    "name": "ADC analytes and exposure",
    "aka": [
      "conjugated antibody and total antibody",
      "unconjugated payload exposure",
      "ADC bioanalysis"
    ],
    "tldr": "An antibody-drug conjugate and its released drug do not follow one shared concentration curve. The measured chemical form matters.",
    "summary": "A conjugate assay measures antibody carrying payload, or antibody-bound drug, according to the validated method. Total antibody includes conjugated and unconjugated antibody; unconjugated payload measures released drug separately. Active metabolites or catabolites can add further relevant species. Concentration, time course and exposure therefore belong to a named analyte. A conjugate dose in milligrams per kilogram is not the same quantity as the mass of free payload reaching a tumor or the blood.",
    "notes": [
      "FDA’s 2024 guidance for cytotoxic small-molecule ADCs recommends validated measurements of the conjugate and relevant constituent parts, with later omissions justified by pharmacology, assay sensitivity and exposure data. It does not require every conceivable analyte in every study or automatically apply to every immune agonist or other cargo.",
      "For a construct carrying different payloads, keep each chemical identity, loading distribution, release behavior and exposure distinct. A manufactured loading ratio does not establish the ratio reaching tissue over time. The same total DAR does not establish equal loading of each component or equal biological activity."
    ],
    "links": [
      {
        "label": "FDA: clinical pharmacology considerations for cytotoxic ADCs (2024)",
        "url": "https://www.fda.gov/media/155997/download"
      },
      {
        "label": "Ravenstijn et al.: translational and bioanalytical questions for dual-payload conjugates (2026 perspective)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42089685/"
      },
      {
        "label": "Hamblett et al.: loading and exposure in one conjugate, cell and mouse experiments (2004)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15501986/"
      }
    ],
    "related": [
      "adc",
      "dar",
      "linker",
      "pharmacokinetics",
      "dual-payload-adc"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "ADC"
  },
  {
    "id": "chk1-inhibitor-payloads",
    "name": "CHK1 inhibitor payloads",
    "aka": [
      "CHK1i ADC payloads",
      "checkpoint kinase 1 inhibitor cargo"
    ],
    "tldr": "A CHK1-inhibitor conjugate carries a drug that interferes with a replication-stress checkpoint. A published conference abstract reports a HER2-directed preclinical example.",
    "summary": "CHK1 inhibition is the cargo mechanism only when the inhibitor is physically attached to the conjugate. The AACR 2026 abstract describes engineered-cysteine trastuzumab, a cleavable linker and a CHK1-inhibitor payload. The investigators tested cells and a HER2-positive breast-cancer xenograft model. This establishes a publicly described payload design and model experiment, separate from giving an oral checkpoint inhibitor alongside another ADC. It does not establish human safety, benefit after a TOP1 ADC or a treatment-selection rule.",
    "notes": [
      "The antibody delivery antigen and the payload’s checkpoint target answer different questions. The proposed advantage depends on sufficient intracellular release and checkpoint dependence, not a HER2 or replication-stress label alone. The conference abstract reports limited model safety observations; lack of mouse weight loss cannot establish human marrow safety or a clinical therapeutic window."
    ],
    "links": [
      {
        "label": "Halazonetis et al.: CHK1-inhibitor conjugate, AACR 2026 abstract 1714",
        "url": "https://doi.org/10.1158/1538-7445.am2026-1714"
      }
    ],
    "related": [
      "adc",
      "atr-chk1-inhibitors",
      "replication-stress",
      "synthetic-lethality",
      "adc-analytes-and-exposure"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "ADC"
  },
  {
    "id": "parp-inhibitor-payloads",
    "name": "PARP inhibitor payloads",
    "aka": [
      "PARP1 inhibitor cargo",
      "PARPi antibody-drug conjugates"
    ],
    "tldr": "A PARP-inhibitor payload attaches a repair-targeting drug to an antibody. A published preclinical abstract describes a TROP2 conjugate carrying a PARP1-selective inhibitor.",
    "summary": "The AACR 2025 abstract describes a TROP2 antibody joined through a cleavable linker to a PARP1-selective inhibitor. Cell comparisons included the conjugate, free payload and antibody alone; a breast-cancer xenograft experiment compared their activity and blood-cell effects. The reported activity varied between tested cell models, illustrating that more delivery antigen is not sufficient to establish payload sensitivity. This is a conference-abstract proof of concept, not clinical evidence that antibody delivery reverses PARP resistance or removes systemic toxicity.",
    "notes": [
      "An approved PARP-inhibitor pill, a free PARP drug combined with an ADC and a physically attached PARP payload are different products and evidence questions. Retain the actual conjugated chemical species, linker, release and exposure. A repair-gene variant alone does not prove the tumor’s current functional dependence or establish eligibility for an experimental conjugate."
    ],
    "links": [
      {
        "label": "Koo et al.: PARP1-selective payload in a TROP2 conjugate, AACR 2025 abstract 5467",
        "url": "https://doi.org/10.1158/1538-7445.am2025-5467"
      }
    ],
    "related": [
      "adc",
      "parp",
      "parp-inhibitor",
      "synthetic-lethality",
      "adc-analytes-and-exposure"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "ADC"
  },
  {
    "id": "histone-lactylation",
    "name": "Histone lactylation",
    "aka": [
      "histone lysine lactylation",
      "histone Kla"
    ],
    "tldr": "Lactate can contribute to a chemical modification of histone proteins. Experiments connect this mark to gene regulation in particular cell states and disease models.",
    "summary": "Lactylation adds a lactate-derived modification to histone lysine residues, rather than changing the DNA sequence. The original study identified this mark in human and mouse cells and investigated its timing and gene-regulatory effects in stimulated macrophages. A later mechanistic study in EGFR T790M-positive tumor models connected radiation, LDHA-dependent lactate production, histone lactylation and DNA-repair responses. Its cell, organoid and xenograft experiments provide a context-specific mechanism hypothesis, not a validated clinical radiation-selection test.",
    "notes": [
      "Bulk lactate concentration, a particular histone modification, its genomic location, RNA output and DNA-repair activity are different measurements. The radiation study combined biochemical and chromatin measurements with genetic or pharmacological perturbations. A high lactate value alone does not establish that this mechanism is present, dominant or targetable in another tumor."
    ],
    "links": [
      {
        "label": "Zhang et al.: original histone-lactylation and gene-regulation study (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31645732/"
      },
      {
        "label": "EGFR-mutant metabolic, chromatin and radiation-response models (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42399513/"
      }
    ],
    "related": [
      "epigenetic-marks",
      "gene-expression",
      "warburg-effect",
      "egfr"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  }
];
