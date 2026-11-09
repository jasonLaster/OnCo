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
    targets:["chek1"],
    "id": "chk1-inhibitor-payloads",
    "name": "CHK1 inhibitor payloads",
    "aka": [
      "CHK1i ADC payloads",
      "checkpoint kinase 1 inhibitor cargo"
    ],
    "tldr": "A CHK1-inhibitor conjugate carries a drug that interferes with a replication-stress checkpoint. A published conference abstract reports a HER2-directed preclinical example.",
    "summary": "CHK1 inhibition is the cargo mechanism only when the inhibitor is physically attached to the conjugate. The AACR 2026 abstract describes engineered-cysteine trastuzumab, a cleavable linker and a CHK1-inhibitor payload. The investigators tested cells and a HER2-positive breast-cancer xenograft model. This establishes a publicly described payload design and model experiment, separate from giving an oral checkpoint inhibitor alongside another ADC. It does not establish human safety, benefit after a TOP1 ADC or a treatment-selection rule.",
    "notes": ["The antibody delivery antigen and the payload’s checkpoint target answer different questions. The proposed advantage depends on sufficient intracellular release and checkpoint dependence, not a HER2 or replication-stress label alone. The conference abstract reports limited model safety observations; lack of mouse weight loss cannot establish human marrow safety or a clinical therapeutic window.","An earlier 2020 study attached the checkpoint inhibitor AZD7762 to an antibody. The conjugate recognized the tested cell-surface target but lacked efficacy in that delivery experiment; the investigators pursued protease-activated cell-penetrating peptides instead. Physical attachment and target binding therefore did not establish a useful intracellular effect. This negative result does not establish that every CHK1-directed conjugate must fail.","The 2026 A067 conference abstract screened exatecan with prexasertib in cancer-cell and blood-progenitor assays. It proposes a candidate pair for dual-payload development; the abstract does not itself document both chemicals attached to a tested antibody. Pairwise synergy, a constructed dual-cargo product and a patient therapeutic window are separate claims.","NCT02124148 lists prexasertib and cetuximab as separately administered drugs with different schedules. It is not evidence of a cetuximab conjugate carrying a CHK1 inhibitor. Registry design, observed pharmacodynamic changes and patient outcomes also require separate interpretation."],
    "links": [{"label":"Halazonetis et al.: CHK1-inhibitor conjugate, AACR 2026 abstract 1714","url":"https://doi.org/10.1158/1538-7445.am2026-1714"},{"label":"2020 antibody versus peptide radiosensitizer delivery experiment","url":"https://pubmed.ncbi.nlm.nih.gov/32304937/"},{"label":"Meng et al.: exatecan/prexasertib pair screening, AACR D3 abstract A067 (2026)","url":"https://doi.org/10.1158/1557-3265.d32026-a067"},{"label":"ClinicalTrials.gov: separate prexasertib/cetuximab administration in NCT02124148","url":"https://clinicaltrials.gov/study/NCT02124148"}],
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
  },
  {
    "id": "cellular-kinetics-and-persistence",
    "name": "Cellular kinetics and persistence",
    "aka": [
      "living-drug kinetics",
      "cell-therapy abundance and function",
      "cell dose and persistence"
    ],
    "tldr": "A living cell therapy can change its number, location and state after administration. The starting dose, a sampled cell count and useful function are different measurements.",
    "summary": "After a cell infusion, measured abundance depends on division, survival and redistribution. In vivo engineering may also continue to generate newly engineered cells. A blood sample describes one compartment and time; it cannot count all cells in the body or establish entry into a tumor. Detectable receptor-encoding sequences, viable receptor-positive cells, persistent markers and functional activity should be reported separately.",
    "notes": [
      "FDA CAR T-cell guidance treats exposure/kinetics, pharmacodynamic response, immunogenicity, identity, viability and potency as distinct assessments. Blood concentration-time measurements and optional disease-tissue sampling answer different distribution questions. A sequence assay is not automatically a count of viable cells expressing a functional surface receptor.",
      "Keep the measurement method, time, compartment, units and denominator attached. A receptor-positive percentage can fall while absolute receptor-positive cells per microliter remain unchanged if the sampled denominator increases. Neither measure alone establishes an unchanged total-body cell population, tumor entry or antitumor benefit.",
      "An administered cell dose is an input. The dose of a vector or particle used for in vivo engineering does not directly specify the later number of engineered cells. Autologous means the recipient’s own cells; allogeneic means cells from another person. Engineering outside versus inside the body is a separate axis; a prepared delivery product can engineer the recipient's own cells.",
      "Expansion and persistence can prolong useful activity or harmful recognition. Stopping further administration does not instantly remove living cells or reverse an injury already triggered. A safety switch addresses a specified control mechanism; cell elimination, receptor shutoff and treatment of downstream inflammation are different interventions.",
      "In the Liu cord-blood CAR-NK study, low-level detection at least 12 months after treatment belonged to a construct with IL-15 and an inducible caspase-9 switch. It does not establish the behavior of every NK-cell source or equate marker detection with continuing useful function."
    ],
    "related": [
      "car-t",
      "car-nk-macrophage",
      "nk-cell-therapy",
      "in-vivo-car-t",
      "t-cell-exhaustion-term"
    ],
    "sections": [
      "cell-therapy"
    ],
    "links": [
      {
        "label": "FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)",
        "url": "https://www.fda.gov/media/156896/download"
      },
      {
        "label": "NCI: T-cell transfer therapy and harms",
        "url": "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/t-cell-transfer-therapy"
      },
      {
        "label": "Liu et al.: one cord-blood CAR-NK construct in lymphoid tumors (2020)",
        "url": "https://doi.org/10.1056/NEJMoa1910607"
      }
    ],
    "category": "Treatment jargon",
    "kind": "term",
    "asOf": "2026-11-08"
  },
  {
    "id": "endogenous-promoter-payload-control",
    "name": "Control of cell payloads by endogenous promoters",
    "aka": [
      "NR4A2 cytokine payload control",
      "RGS16 cytokine payload control",
      "activation-responsive cytokine expression"
    ],
    "tldr": "An engineered cell can place a payload under the control of a naturally regulated gene. The resulting expression pattern still needs measurement in the actual cells and tissues.",
    "summary": "A CRISPR knock-in can connect an engineered cytokine payload to regulatory control at an endogenous gene locus. In preclinical work, NR4A2 and RGS16 control supported cytokine expression in specified CAR T-cell settings, with tumor and safety measurements in mouse models. This is distinct from adding synthetic response elements to a separate promoter. Neither the locus name nor an activation-responsive design proves tumor-only secretion, clinical safety or patient benefit.",
    "notes": [
      "Chen and colleagues screened endogenous genes and investigated NR4A2/RGS16 regulation for payloads including IL-12 and IL-2 in cell and mouse models. Patient-derived cells were also studied experimentally; that is not a clinical treatment result in those patients. The edited locus, retained native gene function, off-state expression, inducibility and persistence need characterization.",
      "Guo and colleagues instead tested a synthetic NR4A-responsive promoter against a conventional NFAT-responsive promoter in human-cell experiments with weak stimulation. Reporter expression and improved proliferation in that system do not establish a clinical potency or safety ranking, and the synthetic promoter is distinct from an endogenous NR4A2-locus knock-in.",
      "Keep trigger recognition, payload transcription, secretion, tissue distribution and downstream activity separate. The IL-12 TIL clinical experience shows why inducible production alone cannot establish confinement or freedom from systemic toxicity. Viable producer-cell abundance, time and cell state matter alongside cytokine concentration."
    ],
    "related": [
      "armored-car",
      "gene-regulatory-elements",
      "cellular-kinetics-and-persistence"
    ],
    "sections": [
      "cell-therapy"
    ],
    "links": [
      {
        "label": "Chen et al.: endogenous-locus control of cytokine payloads in preclinical models (2025)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40604285/"
      },
      {
        "label": "Guo et al.: synthetic NR4A-responsive payload promoter in human-cell experiments (2022)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35316028/"
      },
      {
        "label": "Zhang et al.: inducible IL-12 TIL study and systemic toxicity (2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25695689/"
      }
    ],
    "category": "Treatment jargon",
    "kind": "term",
    "asOf": "2026-11-08"
  }
,
{
  "id": "completion-surgery",
  "kind": "term",
  "category": "Clinic basics",
  "name": "Completion surgery",
  "aka": [
    "completion mastectomy",
    "completion axillary dissection"
  ],
  "tldr": "Completion surgery is a further operation after an earlier procedure and its findings. The tissue, reason and clinical setting determine the question; a pathology finding does not select one operation automatically.",
  "summary": "In breast care, further surgery can mean re-excision of a cavity, completion mastectomy or completion axillary dissection. These remove different tissues and address different findings. The final margin or node assessment, earlier treatment and full clinical context matter. A further operation after initial pathology is not itself a recurrence or a treatment for disease throughout the body.\n\nZ0011 studied a specified surgery-first population receiving lumpectomy and planned whole-breast radiation. AMAROS compared axillary dissection with radiation, rather than with no axillary treatment. Those studies do not directly answer residual positive sentinel nodes after neoadjuvant chemotherapy; A011202 studies that different setting. Finding more involved nodes by removing them is different from preventing recurrence, and harms such as lymphoedema need separate assessment.",
  "cancers": [
    "breast-cancer",
    "tnbc"
  ],
  "trials": [
    "acosog-z0011",
    "amaros",
    "alliance-a011202"
  ],
  "related": [
    "resection-margins",
    "breast-margins-and-re-excision",
    "lumpectomy",
    "mastectomy",
    "sentinel-node",
    "regional-nodal-irradiation"
  ],
  "links": [
    {
      "label": "NCI: lumpectomy and surrounding treatment",
      "url": "https://www.cancer.gov/types/breast/treatment/surgery/lumpectomy"
    },
    {
      "label": "Z0011 ten-year report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28898379/"
    },
    {
      "label": "AMAROS original report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25439688/"
    },
    {
      "label": "A011202 registry: post-neoadjuvant residual positive nodes",
      "url": "https://clinicaltrials.gov/study/NCT01901094"
    }
  ],
  "asOf": "2026-11-09",
  "tags": [
    "education-audit",
    "local-treatment"
  ]
},
{
  "id": "regional-nodal-irradiation",
  "kind": "term",
  "category": "Clinic basics",
  "name": "Regional nodal irradiation in breast cancer",
  "aka": [
    "regional nodal irradiation",
    "RNI"
  ],
  "tldr": "Regional nodal irradiation treats selected lymph-node regions. The exact fields, pretreatment findings and response after earlier therapy determine the clinical question.",
  "summary": "Fields can include axillary, supraclavicular and internal mammary node regions, depending on the plan. This is distinct from breast or chest-wall irradiation, though they can be combined. After neoadjuvant treatment, ypN0 is a pathological nodal classification. Retain the sampled nodes and modifiers, including isolated-cell categories, rather than interpreting it as proof of absolute cellular absence or complete response in the breast.\n\nB-51 studied biopsy-proven cT1 to T3 N1 M0 disease that became ypN0. Its primary recurrence-interval comparison was not statistically significant at median follow-up 59.5 months; this is not proof of zero effect in all settings. After lumpectomy both groups received whole-breast radiation. After mastectomy the contrast included chest-wall plus nodal radiation versus none.\n\nA011202 instead studies residual positive sentinel nodes after neoadjuvant chemotherapy. Its registry describes dissection plus nodal radiation versus axillary and nodal radiation without dissection; both strategies include radiation. Do not transfer an omission conclusion between these different populations and contrasts. Organ exposure, lymphoedema and other harms remain part of the assessment.",
  "cancers": [
    "breast-cancer",
    "tnbc"
  ],
  "trials": [
    "nsabp-b51",
    "alliance-a011202"
  ],
  "related": [
    "lymph-node-status",
    "sentinel-node",
    "radiotherapy",
    "completion-surgery",
    "mastectomy",
    "lumpectomy"
  ],
  "links": [
    {
      "label": "B-51 primary report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/40466065/"
    },
    {
      "label": "B-51 surgery-specific registry arms",
      "url": "https://clinicaltrials.gov/study/NCT01872975"
    },
    {
      "label": "A011202 residual-node-positive registry arms",
      "url": "https://clinicaltrials.gov/study/NCT01901094"
    },
    {
      "label": "NCI: radiation for breast cancer",
      "url": "https://www.cancer.gov/types/breast/treatment/radiation"
    }
  ],
  "asOf": "2026-11-09",
  "tags": [
    "education-audit",
    "local-treatment"
  ]
},
];
