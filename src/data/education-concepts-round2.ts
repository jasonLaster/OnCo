import type { TermInput } from "@/lib/schema";

type Concept = Omit<TermInput, "kind" | "asOf"> & { asOf?: string };
const t = (x: Concept): TermInput => ({ kind: "term", asOf: "2026-11-08", ...x });

/** Evidence boundaries checked against primary methods, experimental studies and official guidance. */
export const educationRound2: TermInput[] = [
  t({
    id: "immune-product-evidence",
    name: "Immune measurements and product evidence",
    category: "Methods and models",
    tldr: "Each immune test or product-quality check answers a particular question. Connecting those questions helps explain how a proposed treatment moves from molecular measurements to evidence in people.",
    summary: "This reading map links immune-assay readouts, antigen evidence, specimen preparation, RNA design, recognition modules and product quality. It is a set of evidence questions, not a required experimental sequence. Receptor binding, cytokine release, cell killing, lot potency and clinical benefit are different observations. A useful explanation names the sample, assay, model and comparison that support the claim, including the steps that remain untested.",
    links: [
      {
        label: "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
        url: "https://doi.org/10.1186/1471-2172-9-9"
      },
      {
        label: "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
        url: "https://doi.org/10.1038/ncomms13404"
      },
      {
        label: "FDA: Potency Assurance for Cellular and Gene Therapy Products, final guidance (November 2026)",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-potency-assurance-cellular-and-gene-therapy-products"
      }
    ],
    related: [
      "elispot",
      "intracellular-cytokine-staining",
      "peptide-hla-multimer-staining",
      "immune-cytotoxicity-assays",
      "tcr-repertoire-sequencing",
      "tcr-repertoire-clonality",
      "pbmc-specimens",
      "binding-presentation-recognition",
      "immunopeptidome",
      "immunopeptidomics",
      "peptide-hla-binding-prediction",
      "immunodominance",
      "epitope-spreading",
      "self-similarity-immune-recognition",
      "immunogenicity-versus-efficacy",
      "tissue-preparation-assay-fit",
      "finite-tissue-budget",
      "rna-integrity",
      "specimen-provenance",
      "mrna-construct-anatomy",
      "codon-optimization",
      "modified-rna-nucleosides",
      "in-vitro-transcription",
      "dsrna-impurities",
      "multi-epitope-constructs",
      "binder-targeting-module",
      "binder-affinity-epitope-developability",
      "binder-format-constraints",
      "scfv-vhh-formats",
      "delivery-target-versus-therapeutic-target",
      "chemistry-manufacturing-controls",
      "certificate-of-analysis",
      "manufacturing-process-comparability",
      "cell-segmentation",
      "targeted-proteomics-quantification"
    ]
  }),
  t({
    id: "elispot",
    name: "ELISpot secretion assays",
    category: "Immunology",
    tldr: "This test records spots where sampled cells release a chosen substance. A spot count describes secretion under the test conditions; other assays address recognition or killing.",
    summary: "The original enzyme-linked immunospot method counted antibody-secreting cells; cytokine versions are used to examine stimulated immune-cell responses. Cancer Vaccine Consortium proficiency panels showed that sample handling, protocol choices and plate reading affected results. A result needs the measured molecule, stimulation, cell input, background and reporting rule. A positive secretion response alone does not show that the sampled cells recognize or kill an unmodified tumor.",
    links: [
      {
        label: "A solid-phase enzyme-linked immunospot (ELISPOT) assay for enumeration of specific antibody-secreting cells.",
        url: "https://doi.org/10.1016/0022-1759(83)90308-3"
      },
      {
        label: "Results and harmonization guidelines from two large-scale international Elispot proficiency panels conducted by the Cancer Vaccine Consortium (CVC/SVI).",
        url: "https://doi.org/10.1007/s00262-007-0380-6"
      },
      {
        label: "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
        url: "https://doi.org/10.1186/1471-2172-9-9"
      }
    ],
    related: [
      "intracellular-cytokine-staining",
      "immune-cytotoxicity-assays",
      "pbmc-specimens"
    ],
    aka: [
      "ELISpot",
      "enzyme-linked immunospot",
      "IFN-gamma ELISpot"
    ]
  }),
  t({
    id: "intracellular-cytokine-staining",
    name: "Intracellular cytokine staining",
    category: "Immunology",
    tldr: "This test measures signaling proteins retained inside stimulated cells and identifies which stained cell groups produced them. The result describes a response in the assay.",
    summary: "An original multiparameter flow-cytometry study detected intracellular cytokine accumulation after antigen stimulation and measured several cytokines in individual cells. That study concerned viral responses, not cancer-treatment prediction. The stimulated material, measured cytokines, cell groups and analysis gates define the result. Cytokine production is distinct from direct measurement of target-cell death, and assay validation does not by itself establish clinical benefit.",
    links: [
      {
        label: "Determination of antigen-specific memory/effector CD4+ T cell frequencies by flow cytometry: evidence for a novel, antigen-specific homeostatic mechanism in HIV-associated immunodeficiency.",
        url: "https://doi.org/10.1172/jci119338"
      },
      {
        label: "Precision and linearity targets for validation of an IFNgamma ELISPOT, cytokine flow cytometry, and tetramer assay using CMV peptides.",
        url: "https://doi.org/10.1186/1471-2172-9-9"
      },
      {
        label: "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
        url: "https://doi.org/10.1016/s0022-1759(03)00265-5"
      }
    ],
    related: [
      "flow-cytometry",
      "elispot",
      "immune-cytotoxicity-assays",
      "pbmc-specimens"
    ]
  }),
  t({
    id: "peptide-hla-multimer-staining",
    name: "Peptide-HLA multimer staining",
    category: "Immunology",
    tldr: "This test labels cells whose receptors bind a particular displayed peptide under the assay conditions. It helps identify a binding population that can then be studied for function.",
    summary: "The original peptide-MHC tetramer study made soluble multimeric peptide-display complexes to identify antigen-specific T cells. Binding correlated with cytotoxicity in the tested systems, but those observations are different measurements. The chosen peptide and HLA molecule define which interaction is tested. Detecting multimer-binding cells does not by itself establish natural display of that peptide by a tumor, successful target-cell killing or a clinical treatment effect.",
    links: [
      {
        label: "Phenotypic analysis of antigen-specific T lymphocytes.",
        url: "https://doi.org/10.1126/science.274.5284.94"
      },
      {
        label: "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
        url: "https://doi.org/10.1016/s0022-1759(03)00265-5"
      }
    ],
    related: [
      "binding-presentation-recognition",
      "intracellular-cytokine-staining",
      "immune-cytotoxicity-assays"
    ],
    aka: [
      "peptide-MHC multimer staining",
      "peptide-HLA tetramer staining",
      "pMHC multimer staining"
    ]
  }),
  t({
    id: "immune-cytotoxicity-assays",
    name: "Immune-cell cytotoxicity assays",
    category: "Immunology",
    tldr: "These experiments measure whether immune cells cause death of specified target cells. The target cells, comparison conditions and timing are part of the result.",
    summary: "A primary flow-cytometry method distinguished labeled target cells from immune effector cells and measured target death while characterizing the effector population. The study examined how timing and the effector-to-target ratio affected the assay. Degranulation markers provide a related functional readout, but they measure a step preceding cytolysis. Killing of a laboratory target does not establish recognition of every tumor cell or benefit in the person receiving a treatment.",
    links: [
      {
        label: "A novel multiparametric flow cytometry-based cytotoxicity assay simultaneously immunophenotypes effector cells: comparisons to a 4 h 51Cr-release assay.",
        url: "https://doi.org/10.1016/j.jim.2007.05.013"
      },
      {
        label: "Sensitive and viable identification of antigen-specific CD8+ T cells by a flow cytometric assay for degranulation.",
        url: "https://doi.org/10.1016/s0022-1759(03)00265-5"
      }
    ],
    related: [
      "elispot",
      "peptide-hla-multimer-staining",
      "cell-therapy-release-testing"
    ],
    aka: [
      "immune cytotoxicity assay",
      "target-cell killing assay"
    ]
  }),
  t({
    id: "tcr-repertoire-sequencing",
    name: "T-cell receptor repertoire sequencing",
    category: "Immunology",
    tldr: "Receptor sequencing records the immune-receptor sequences sampled from a population of cells. It can track which sequences are present and how their measured abundance changes.",
    summary: "An original sequencing study quantified rearranged T-cell receptor beta-chain sequences to examine repertoire diversity. A beta-chain repertoire is a sampled molecular measurement, not a complete map of paired receptors or the antigens they recognize. The specimen, sequencing method and definition of a clonotype belong with the result. Following a sequence over time is distinct from demonstrating its antigen specificity or the function of the cells that carry it.",
    links: [
      {
        label: "Comprehensive assessment of T-cell receptor beta-chain diversity in alphabeta T cells.",
        url: "https://doi.org/10.1182/blood-2009-04-217604"
      },
      {
        label: "Phenotypic analysis of antigen-specific T lymphocytes.",
        url: "https://doi.org/10.1126/science.274.5284.94"
      }
    ],
    related: [
      "tcr-repertoire-clonality",
      "clonality-testing",
      "peptide-hla-multimer-staining",
      "pbmc-specimens"
    ],
    aka: [
      "TCR repertoire sequencing",
      "TCR sequencing for immune monitoring"
    ]
  }),
  t({
    id: "tcr-repertoire-clonality",
    name: "T-cell receptor repertoire diversity and clonality",
    category: "Immunology",
    tldr: "Repertoire measures describe how many receptor identities are sampled and how unevenly they are represented. A dominant sequence does not tell us what its cells recognize.",
    summary: "Repertoire sequencing can describe richness and the distribution of sampled receptor sequences. Those summaries depend on the sampled population and the way receptor identities and counts are defined; the original sequencing study found diversity estimates that differed from earlier methods. A repertoire dominated by a clone is a distributional observation. It is distinct from proving tumor specificity, a malignant clone or successful tumor killing, each of which needs additional evidence.",
    links: [
  {
    "label": "Comprehensive assessment of T-cell receptor beta-chain diversity in alphabeta T cells.",
    "url": "https://doi.org/10.1182/blood-2009-04-217604"
  },
  {
    "label": "Phenotypic analysis of antigen-specific T lymphocytes.",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  },
  {
    "label": "PubMed 26324409",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26324409/"
  },
  {
    "label": "PubMed 24952902",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24952902/"
  },
  {
    "label": "PubMed 31359002",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31359002/"
  },
  {
    "label": "PubMed 22365666",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22365666/"
  }
],
    related: [
      "tcr-repertoire-sequencing",
      "clonality-testing",
      "immune-cytotoxicity-assays"
    ],
    aka: [
      "TCR repertoire clonality",
      "TCR repertoire diversity"
    ]
  ,
    notes: [
  "The repertoire is a distribution of receptor identities and abundances in a stated population and time. A clone is a cellular lineage; a clonotype is an operational sequence grouping. Single-chain labels and paired identities have different resolution. V(D)J assembly and thymic selection contribute diversity, while expansion changes abundance; diversity and total T-cell count are different quantities.",
  "Blood, tumour and lymph nodes sample overlapping but different populations. Infection, therapy, age and movement can change a sample; absence from one tube may reflect sampling or detection rather than whole-body absence. A pretreatment blood sample is not a complete stored repertoire. Lower measured diversity after infection may reflect a vigorous response and does not establish cancer specificity, vaccine causation or uniformly worse immunity.",
  "Fictional matched receptor samples contain 10 clonotype A cells among 1,000 T cells (1%) and 10 among 100 (10%). The sampled count remains 10; the changed denominator drives the larger fraction. Absolute expansion requires comparable sampling and calibrated counts, and neither frequency identifies antigen. State sampling depth, chain definition, compartment, method and timing."
],
    asOf: "2026-11-09",
  }),
  t({
    id: "pbmc-specimens",
    name: "Peripheral blood mononuclear cell specimens",
    category: "Immunology",
    tldr: "This blood-cell preparation contains lymphocytes and monocytes used in many immune tests. Collection and handling affect which cells and responses can be measured.",
    summary: "The National Library of Medicine distinguishes mononuclear leukocytes from granulocytes and from monocytes alone. A primary study of immune monitoring in HIV vaccine research found that processing and cryopreservation conditions affected cell recovery, viability and measured antigen responses. Those were assay findings, not a validated cancer-treatment predictor. A blood preparation also samples a different compartment from a tumor biopsy; the specimen and handling conditions belong with its interpretation.",
    links: [
      {
        label: "NLM MeSH: mononuclear leukocytes, definition",
        url: "https://id.nlm.nih.gov/mesh/M0012412.json"
      },
      {
        label: "Defining blood processing parameters for optimal detection of cryopreserved antigen-specific responses for HIV vaccine trials.",
        url: "https://doi.org/10.1016/j.jim.2007.02.003"
      }
    ],
    related: [
      "elispot",
      "intracellular-cytokine-staining",
      "tcr-repertoire-sequencing",
      "tissue-preparation-assay-fit"
    ],
    aka: [
      "PBMC",
      "PBMCs",
      "peripheral blood mononuclear cells"
    ]
  }),
  t({
    id: "binding-presentation-recognition",
    name: "Peptide binding, presentation and immune recognition",
    category: "Immunology",
    tldr: "A peptide can bind a display molecule, be displayed by a cell, or be recognized by an immune receptor. These are different questions that require different evidence.",
    summary: "Binding prediction estimates one part of antigen selection. Immunopeptidomics examines peptides recovered with HLA molecules, while immune assays investigate receptor binding and functional responses. A primary melanoma study directly identified naturally presented mutated peptides and separately tested their immunogenicity. A consortium study likewise evaluated prediction against measured immune interactions. A candidate supported at one stage should retain that evidence level rather than being described as a demonstrated therapeutic target.",
    links: [
  {
    "label": "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
    "url": "https://doi.org/10.1038/ncomms13404"
  },
  {
    "label": "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
    "url": "https://doi.org/10.1016/j.cell.2020.09.015"
  },
  {
    "label": "NetMHCpan-4.0: Improved Peptide-MHC Class I Interaction Predictions Integrating Eluted Ligand and Peptide Binding Affinity Data.",
    "url": "https://doi.org/10.4049/jimmunol.1700893"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1093/nar/gkaa379"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41596-019-0133-y"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1126/science.274.5284.94"
  }
],
    related: [
      "neoantigen",
      "immunopeptidome",
      "peptide-hla-binding-prediction",
      "peptide-hla-multimer-staining",
      "immune-cytotoxicity-assays"
    ]
  ,
"notes": [
  "Peptide-to-HLA binding and TCR-to-peptide-HLA binding are different contacts. Evidence maps to claims: a binding prediction supports a model estimate for one exact peptide and allele (Reynisson et al., 2020, PMID 32406916); measured binding supports binding under that assay; immunopeptidomics supports association with the recovered preparation (Purcell et al., 2019, PMID 31092913), not guaranteed cancer-cell origin, surface location or complete recovery; peptide-HLA multimer staining shows cells binding a defined reagent (Altman et al., 1996, PMID 8810254), not affinity or killing; only a controlled response to naturally presenting target cells supports recognition or the measured function. Supplied-peptide stimulation can bypass processing, and secretion and target-cell death are different outputs."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunopeptidome",
    name: "Immunopeptidome",
    category: "Immunology",
    tldr: "The immunopeptidome is the collection of peptides associated with immune display molecules in a particular biological setting. A measurement recovers a view of that collection through a defined assay.",
    summary: "An immunopeptidome concerns displayed peptide ligands, rather than every protein or RNA message in a sample. Direct analysis of native melanoma tissue identified HLA-associated peptides, including some containing tumor mutations. What is recovered depends on the tissue and analytical workflow. The observed collection should retain its sample and method, and identifying a displayed peptide remains distinct from showing an immune response to it.",
    links: [
  {
    "label": "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
    "url": "https://doi.org/10.1038/ncomms13404"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1074/mcp.tir117.000383"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.3389/fimmu.2019.00141"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41467-021-23713-9"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41587-019-0322-9"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41596-019-0133-y"
  }
],
    related: [
      "immunopeptidomics",
      "binding-presentation-recognition",
      "proteomics"
    ],
    aka: [
  "HLA ligandome",
  "HLA peptidome"
]
  ,
"notes": [
  "The immunopeptidome is a biological repertoire in a defined cell population and context; an immunopeptidomics list is a method-dependent subset recovered and identified from a sample. Class I and class II repertoires are separate, and a protein can be abundant while a derived peptide is poorly generated, loaded or retained. Inflammatory signals changed peptide patterns in cancer cell lines (Chong et al., 2018, ovarian cancer cells and interferon gamma, PMID 29242379; Javitt et al., 2019, lung cancer cells and TNF-alpha and interferon gamma acting through HLA-B, PMID 30833945), which shows context-dependent remodelling and not that inflammation adds useful targets. Whole-lysate capture can recover intracellular as well as surface complexes, mixed tissue adds cancer, immune and stromal sources, relative instrument intensity is not surface copies per cell, and a reported sequence can be misassigned (Wilhelm et al., 2021, PMID 34099720). Method B identifying 1,200 peptides against method A's 800 (fictional) shows no biological difference. Sarkizova et al. (2020) gives allele-dependent repertoires from mono-allelic lines."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunopeptidomics",
    name: "Immunopeptidomics",
    category: "Methods and models",
    tldr: "This laboratory approach identifies peptides recovered with immune display molecules. It supplies evidence about peptide presentation in the material that was analyzed.",
    summary: "A primary melanoma study used mass spectrometry to identify HLA-associated peptides from native tumor tissue and then evaluated selected mutated peptides with immune assays. This is stronger evidence of natural presentation in the sampled material than a binding prediction alone. The analytical observation still has a defined specimen and workflow. It does not automatically establish the abundance of a ligand on every cancer cell, receptor recognition or a treatment effect.",
    links: [
      {
        label: "Direct identification of clinically relevant neoepitopes presented on native human melanoma tissue by mass spectrometry.",
        url: "https://doi.org/10.1038/ncomms13404"
      },
      {
        label: "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
        url: "https://doi.org/10.1016/j.cell.2020.09.015"
      }
    ],
    related: [
      "immunopeptidome",
      "peptide-hla-binding-prediction",
      "binding-presentation-recognition",
      "finite-tissue-budget"
    ]
  }),
  t({
    id: "peptide-hla-binding-prediction",
    name: "Peptide-HLA binding and ligand prediction",
    category: "Methods and models",
    tldr: "A computer model can prioritize peptides expected to bind an immune display molecule or appear among its ligands. The prediction helps select candidates for testing.",
    summary: "NetMHCpan-4.0 combined peptide-binding affinity data with eluted-ligand data, which also contain information about processing and natural presentation. Those training signals and prediction tasks should be distinguished. A consortium comparison assessed candidate tumor epitopes using measured immune interactions and developed improved prioritization features. A model score is a prediction with a validation setting; it is not an observation of peptide display, tumor recognition or patient benefit.",
    links: [
      {
        label: "NetMHCpan-4.0: Improved Peptide-MHC Class I Interaction Predictions Integrating Eluted Ligand and Peptide Binding Affinity Data.",
        url: "https://doi.org/10.4049/jimmunol.1700893"
      },
      {
        label: "Key Parameters of Tumor Epitope Immunogenicity Revealed Through a Consortium Approach Improve Neoantigen Prediction.",
        url: "https://doi.org/10.1016/j.cell.2020.09.015"
      }
    ],
    related: [
      "binding-presentation-recognition",
      "immunopeptidomics",
      "neoantigen"
    ],
    aka: [
      "peptide-MHC binding prediction",
      "HLA ligand prediction"
    ]
  }),
  t({
    id: "immunodominance",
    name: "Immunodominance",
    category: "Immunology",
    tldr: "Immune responses to a set of possible targets are often uneven. Some epitopes attract a stronger measured response than others in the same setting.",
    summary: "A primary mouse experiment showed that T-cell populations could compete for access to antigen-bearing presenting cells, changing responses to dominant and subdominant epitopes. That identifies one mechanism of immunodominance in the studied system. It does not supply a universal ranking of human tumor epitopes. The antigen design, presentation context and responding repertoire all need to remain attached to an observation of a dominant response.",
    links: [
  {
    "label": "T cells compete for access to antigen-bearing antigen-presenting cells.",
    "url": "https://doi.org/10.1084/jem.192.8.1105"
  },
  {
    "label": "PubMed 18641351",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18641351/"
  },
  {
    "label": "PubMed 21367907",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21367907/"
  },
  {
    "label": "PubMed 33038342",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33038342/"
  }
],
    related: [
      "epitope",
      "multi-epitope-constructs",
      "tcr-repertoire-clonality"
    ]
  ,
    notes: [
  "Immunodominance is a contextual hierarchy of measured responses, distinct from encoded target count and from epitope spreading. Presentation, precursor frequency, repertoire, priming, HLA, delivery, immune history, tissue and time can change the hierarchy. A favourable binding prediction does not establish immunogenicity, and more encoded targets do not guarantee balanced immunity or independent tumour coverage.",
  "Naive precursor frequency is the starting abundance of cells with a relevant specificity. Mouse LCMV and human HLA-A2-restricted HCV experiments linked precursor frequencies to response hierarchies. Binding alone did not strictly predict the hierarchy. These studies provide no universal cancer-vaccine weights, human marker requirement or instruction to remove dominant clones.",
  "Fictional matched IFN-gamma ELISpot means of 45, 11 and 5 spots for A, B and C, minus matched background 5, give 40, 6 and 0 spots per 200,000 plated PBMCs. A dominates that measured response. Protocol replicate and positivity rules classify C as undetectable. Zero adjusted spots do not prove absent tumour display or universal uselessness, nor do three encoded sequences imply three equally effective responses.",
  "A measured hierarchy needs offered targets, compartment, cell denominator, baseline, timing, matched per-target stimulation, background and positive controls. Detection thresholds and in vitro expansion can alter apparent ranking. Peptide response is not evidence of natural tumour display or tumour-cell killing."
],
    asOf: "2026-11-09",
  }),
  t({
    id: "epitope-spreading",
    name: "Epitope spreading",
    category: "Immunology",
    tldr: "An immune response can broaden to recognize additional epitopes over time. Showing that broadening requires measurements of the added specificities.",
    summary: "A follow-up study of a small melanoma neoantigen-vaccine cohort found persistent immune responses, evolving receptor clonotypes and evidence of responses beyond the original vaccine targets. The report provides clinical immune-monitoring evidence of spreading in that cohort. The response measurements are distinct from a randomized estimate of treatment benefit. Spreading should not be inferred solely from an increased total lymphocyte count or expansion of an unidentified receptor sequence.",
    links: [
  {
    "label": "Personal neoantigen vaccines induce persistent memory T cell responses and epitope spreading in patients with melanoma.",
    "url": "https://doi.org/10.1038/s41591-020-01206-4"
  },
  {
    "label": "PubMed 33479501",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33479501/"
  },
  {
    "label": "PubMed 28678778",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
  }
],
    related: [
      "immunogenicity-versus-efficacy",
      "tcr-repertoire-sequencing",
      "immunodominance"
    ]
  ,
    notes: [
  "Epitope spreading is additional detected recognition beyond the initially targeted epitope set, potentially within one source protein or across proteins. More response to the same target is expansion. Responses to both directly encoded A and B do not themselves demonstrate spreading. Newly detected is not newly created: baseline sensitivity can miss pre-existing responsive cells.",
  "Tumour injury can release additional antigen for uptake and presentation, but one follow-up response does not establish that entire causal chain. Define peptide-HLA targets and compare matched baseline and follow-up assays with background, presentation and cross-reactivity controls; assess intervening treatment. Vaccine recruitment or expansion does not normally rewrite mature TCRs. An immune response, including one to healthy self, does not establish recurrence prevention, safety or clinical benefit.",
  "In a fictional A/B vaccine experiment, baseline C is undetectable and matched follow-up detects unencoded C, consistent with an additional detected specificity. The A-cell icons are qualitative, not counts. Ten additional receptor sequences without target testing demonstrate repertoire change, not recognition of C; causation and patient benefit remain separate questions."
],
    asOf: "2026-11-09",
  }),
  t({
    id: "self-similarity-immune-recognition",
    name: "Self-similarity and immune-recognition specificity",
    category: "Immunology",
    tldr: "A receptor may recognize more than one related peptide. Target-selection evidence needs to address recognition of healthy tissue as well as the intended target.",
    summary: "A primary investigation of an affinity-enhanced MAGE-A3-directed receptor identified cross-recognition of a peptide from titin after unexpected cardiac toxicity. This was a particular engineered-receptor program, not a toxicity rate for all T-cell therapies or neoantigen vaccines. It illustrates why target-gene expression and a sequence match alone are insufficient descriptions of receptor specificity. Proposed-target recognition and off-target recognition need evidence in relevant systems.",
    links: [
  {
    "label": "Identification of a Titin-derived HLA-A1-presented peptide as a cross-reactive target for engineered MAGE A3-directed T cells.",
    "url": "https://doi.org/10.1126/scitranslmed.3006034"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1182/blood-2013-03-490565"
  },
  {
    "label": "Primary evidence for the antigen-presentation teaching distinctions",
    "url": "https://doi.org/10.1038/s41586-022-04735-9"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 3260350)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3260350/"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 3029267)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3029267/"
  },
  {
    "label": "Primary tolerance mechanism experiment (PubMed 7636184)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7636184/"
  }
],
    related: [
      "binding-presentation-recognition",
      "binder-affinity-epitope-developability",
      "tcr-t"
    ],
    aka: [
      "peptide self-similarity and immune specificity",
      "TCR cross-recognition"
    ]
  ,
"notes": [
  "Central and peripheral tolerance include distinct mechanisms. Kisielow and colleagues demonstrated deletion of self-reactive developing cells in an H-Y-receptor transgenic mouse model. Jenkins and Schwartz demonstrated antigen-related unresponsiveness after altered antigen presentation in mouse experiments, and Sakaguchi and colleagues linked a CD4/CD25 regulatory population to prevention of autoimmunity in mice. These are mechanistic examples, rather than universal human response or safety thresholds. A tumour-specific mutation can make a peptide distinguishable from its normal counterpart, but display and a responsive receptor are still needed, and there is no universal percentage of identity that makes a target safe. Higher receptor affinity is not automatically more selective. Receptors can cross-react with peptides from unrelated proteins, as in the titin peptide recognised by the MAGE-A3-directed receptor (Cameron et al., 2013, PMID 23926201; Linette et al., 2013, PMID 23770775). Luksza et al. (Nature 2022, PMID 35589842) modelled neoantigen quality, using non-selfness and selfness, in pancreatic cancer survivors; the model is not a clinical safety rule. In a loaded-peptide concentration series, compare mutant and normal peptides at the same concentration with the same HLA and responder; artificial loading leaves natural processing open and a response threshold is not a patient safety threshold."
],
"asOf": "2026-11-09"
}),
  t({
    id: "immunogenicity-versus-efficacy",
    name: "Immunogenicity and clinical efficacy",
    category: "Endpoints",
    tldr: "An intervention can produce a measurable immune response. Whether it improves a clinical outcome is a separate question about people receiving the intervention.",
    summary: "A phase 1 personal neoantigen-vaccine report and its follow-up examined immune responses in small melanoma cohorts. Such work can demonstrate biological activity, persistence and broadening of responses. It does not by itself isolate the treatment effect on recurrence or survival from other explanations. An immune-assay endpoint, a clinical outcome and a comparative efficacy estimate should retain their distinct definitions and study designs.",
    links: [
      {
        label: "An immunogenic personal neoantigen vaccine for patients with melanoma.",
        url: "https://doi.org/10.1038/nature22991"
      },
      {
        label: "Personal neoantigen vaccines induce persistent memory T cell responses and epitope spreading in patients with melanoma.",
        url: "https://doi.org/10.1038/s41591-020-01206-4"
      }
    ],
    related: [
      "elispot",
      "immune-cytotoxicity-assays",
      "surrogate-validation",
      "binding-presentation-recognition"
    ]
  }),
  t({
    id: "tissue-preparation-assay-fit",
    name: "Tissue preparation and assay suitability",
    category: "Diagnostics & imaging",
    tldr: "Fixed, frozen and living tissue preserve different properties. A preparation that works for one test may not support another.",
    summary: "Paired-specimen studies found that fixation and extraction changed nucleic-acid measurements relative to fresh-frozen material. Viable organoid studies examine a different property: whether living cells can establish the studied culture. Preserved morphology, recoverable DNA or RNA, and viable cell behavior are therefore different specimen requirements. No preparation is universally best; the intended measurement and evidence for that particular workflow determine suitability.",
    links: [
      {
        label: "Next-generation sequencing of RNA and DNA isolated from paired fresh-frozen and formalin-fixed paraffin-embedded samples of human cancer and normal tissue.",
        url: "https://doi.org/10.1371/journal.pone.0098187"
      },
      {
        label: "The Biospecimen Preanalytical Variables Program: A Multiassay Comparison of Effects of Delay to Fixation and Fixation Duration on Nucleic Acid Quality.",
        url: "https://doi.org/10.5858/arpa.2018-0172-oa"
      },
      {
        label: "A Living Biobank of Breast Cancer Organoids Captures Disease Heterogeneity.",
        url: "https://doi.org/10.1016/j.cell.2017.11.010"
      }
    ],
    related: [
      "preanalytics-sample-stabilisation",
      "rna-integrity",
      "finite-tissue-budget",
      "organoids"
    ],
    aka: [
      "FFPE versus fresh-frozen versus viable tissue",
      "specimen fitness for purpose"
    ]
  }),
  t({
    id: "finite-tissue-budget",
    name: "Finite tissue and specimen allocation",
    category: "Diagnostics & imaging",
    tldr: "Sections, extractions and destructive tests consume stored tissue. Planning several tests requires knowing what material remains and which uses it must support.",
    summary: "NCI biospecimen guidance places pathology oversight of tissue release alongside the need to protect complete medical evaluation. It also treats divided and extracted material as traceable derivative samples. A thoracic small-specimen guideline addresses triage and handling for multiple ancillary studies in its own clinical scope. The general resource issue is finite material, not a universal order of tests: remaining tissue and assay requirements need to be established for the actual specimen.",
    links: [
      {
        label: "NCI Best Practices for Biospecimen Resources, fourth edition (2026)",
        url: "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/resources/best-practices/biospecimen-resources/intro"
      },
      {
        label: "Collection and Handling of Thoracic Small Biopsy and Cytology Specimens for Ancillary Studies: Guideline From the College of American Pathologists in Collaboration With the American College of Chest Physicians, Association for Molecular Pathology, American Society of Cytopathology, American Thoracic Society, Pulmonary Pathology Society, Papanicolaou Society of Cytopathology, Society of Interventional Radiology, and Society of Thoracic Radiology.",
        url: "https://doi.org/10.5858/arpa.2020-0119-cp"
      }
    ],
    related: [
      "specimen-provenance",
      "tissue-preparation-assay-fit",
      "preanalytics-sample-stabilisation",
      "biopsy"
    ],
    aka: [
      "finite tissue budget",
      "tissue allocation for testing"
    ]
  }),
  t({
    id: "rna-integrity",
    name: "RNA integrity and assay suitability",
    category: "Genomics & genetics",
    tldr: "RNA quality measurements describe the condition of extracted RNA. Their usefulness depends on the measurement workflow the material will enter.",
    summary: "The original RNA Integrity Number method summarized electrophoretic features to standardize quality assessment. DV200 describes the proportion of RNA fragments longer than 200 nucleotides. Comparisons of fixed and frozen tissue found that fragment-distribution measures and functional amplification assays could be more informative for particular workflows. The NCI preanalytical-variables study likewise found method-dependent sensitivity to handling effects. An integrity score is therefore not a universal pass or fail rule for every RNA assay; input, preparation and intended measurement still matter.",
    links: [
      {
        label: "The RIN: an RNA integrity number for assigning integrity values to RNA measurements.",
        url: "https://doi.org/10.1186/1471-2199-7-3"
      },
      {
        label: "Systematic evaluation of RNA quality, microarray data reliability and pathway analysis in fresh, fresh frozen and formalin-fixed paraffin-embedded tissue samples.",
        url: "https://doi.org/10.1038/s41598-018-24781-6"
      },
      {
        label: "The Biospecimen Preanalytical Variables Program: A Multiassay Comparison of Effects of Delay to Fixation and Fixation Duration on Nucleic Acid Quality.",
        url: "https://doi.org/10.5858/arpa.2018-0172-oa"
      }
    ],
    related: [
      "tissue-preparation-assay-fit",
      "rna-seq",
      "preanalytics-sample-stabilisation"
    ],
    aka: [
      "RNA integrity number",
      "RIN score",
      "DV200 RNA quality"
    ]
  }),
  t({
    id: "specimen-provenance",
    name: "Specimen provenance and derivative tracking",
    category: "Diagnostics & imaging",
    tldr: "A result needs to remain linked to the tissue or blood sample it came from. Dividing or extracting a specimen creates new material with its own history.",
    summary: "NCI guidance describes unique identification of specimens and their derivative samples, with recorded origins and links between parent material, aliquots and extractions. That history helps establish which specimen, preparation and handling conditions produced a measurement. Results from different pieces or time points should not silently be treated as measurements of the same input. Tracking supports interpretation and quality management; it does not make a small sample representative of an entire tumor.",
    links: [
      {
        label: "NCI Best Practices for Biospecimen Resources, fourth edition (2026)",
        url: "https://dctd.cancer.gov/data-tools-biospecimens/biospecimens-biobanks/resources/best-practices/biospecimen-resources/intro"
      }
    ],
    related: [
      "finite-tissue-budget",
      "tissue-preparation-assay-fit",
      "tumour-purity",
      "biopsy"
    ],
    aka: [
      "biospecimen provenance",
      "derivative sample tracking"
    ]
  }),
  t({
    id: "mrna-construct-anatomy",
    name: "Messenger RNA construct anatomy",
    category: "Genomics & genetics",
    tldr: "An engineered messenger RNA includes a protein-coding message and surrounding features that affect how it is used. Those features are part of the construct being tested.",
    summary: "The cap, untranslated regions, coding sequence and poly(A) tail are distinct parts of a messenger RNA construct. A primary dendritic-cell study changed untranslated-region and poly(A)-tail features and measured RNA stability, protein production, peptide display and T-cell stimulation separately. Another experimental study separated effects of codon usage and RNA structure on protein expression. Construct design therefore includes more than the intended amino-acid sequence. A design that improves one measured step in one system does not establish optimal immune effects or clinical efficacy in another.\n\nStart-codon context was tested by single-base substitutions around the AUG initiator in a cloned preproinsulin gene, where the best sequence identified changed proinsulin yield over a 20-fold range (Kozak). The interaction of the cap and the poly(A) tail was tested with luciferase mRNAs delivered by electroporation into tobacco protoplasts, Chinese hamster ovary cells and yeast, where the tail's effect depended on the cap (Gallie). A textbook describes the 5' cap, 5' and 3' untranslated regions that regulate translation initiation and mRNA stability, a poly-A tail of about 200 A residues added by poly-A polymerase to cellular mRNA, and a ribosome that moves from the cap to the AUG, with Kozak's rules describing the sequence around it (OpenStax Biology 2e). The cellular tail length is not a rule for engineered constructs: one dendritic-cell study found that a 120-nucleotide tail, an unmasked tail end and two 3' untranslated regions each improved stability and translation, and it measured transcript amount by RT-PCR, protein by eGFP, peptide-MHC density and T-cell stimulation separately (Holtkamp and colleagues), so a doubled reporter signal after a 3' change is one measurement, not a different antigen or a clinical benefit. These are tested constructs and cell systems, not one best sequence for a clinical product.",
    links: [
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "mRNA structure regulates protein expression through changes in functional half-life.",
    "url": "https://doi.org/10.1073/pnas.1908052116"
  },
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "Point mutations define a sequence flanking the AUG initiator codon that modulates translation by eukaryotic ribosomes.",
    "url": "https://doi.org/10.1016/0092-8674(86)90762-2"
  },
  {
    "label": "The cap and poly(A) tail function synergistically to regulate mRNA translational efficiency.",
    "url": "https://doi.org/10.1101/gad.5.11.2108"
  },
  {
    "label": "Biology 2e, 15.4 RNA Processing in Eukaryotes (OpenStax)",
    "url": "https://openstax.org/books/biology-2e/pages/15-4-rna-processing-in-eukaryotes"
  },
  {
    "label": "Biology 2e, 15.5 Ribosomes and Protein Synthesis (OpenStax)",
    "url": "https://openstax.org/books/biology-2e/pages/15-5-ribosomes-and-protein-synthesis"
  }
],
    related: [
  "codon-optimization",
  "modified-rna-nucleosides",
  "in-vitro-transcription",
  "mrna-lnp-manufacturing",
  "multi-epitope-constructs"
],
    aka: [
      "mRNA construct anatomy",
      "mRNA untranslated regions and poly(A) tail"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Read a construct from its 5-prime end to its 3-prime end: cap, untranslated region, initiation context, protein-coding region, untranslated region and poly(A) tail have different jobs. A target list does not specify the finished RNA. Changing a UTR changes a regulatory sequence; changing an amino-acid spacer changes the combined protein. Sequence identity, size and integrity, end characterisation and expression need their own assays, with RNA chemistry and formulation stated."
]
}),
  t({
    id: "codon-optimization",
    name: "Codon optimization",
    category: "Genomics & genetics",
    tldr: "Synonymous codon changes can preserve the intended protein sequence while changing the RNA message. Their effects need to be measured in the intended expression system.",
    summary: "Primary experiments showed that synonymous codon choices can affect RNA stability and translation. Work on engineered messenger RNAs also separated codon usage from RNA secondary structure, showing that expression depends on more than a simple codon preference. Optimization is a design objective with a particular assay and system, not a guarantee of improved therapy. Changing codons is distinct from choosing which antigen or epitope the construct encodes.\n\nIn four human cell lines, three independent methods showed that mRNA stability tracked codon identity rather than nucleotide content, stabilising codons tended to coincide with higher tRNA levels, and the effect depended on translation (Wu and colleagues, 2019). Another study separated codon usage from coding-region structure in eGFP constructs and defined functional half-life as the time an mRNA is actively translated, which differs from RNA that is merely present or protein that persists, so a doubled reporter signal at one time point does not show twice the RNA lifetime, a better neoantigen or any clinical effect (Mauger and colleagues).",
    links: [
  {
    "label": "Codon optimality is a major determinant of mRNA stability.",
    "url": "https://doi.org/10.1016/j.cell.2015.02.029"
  },
  {
    "label": "mRNA structure regulates protein expression through changes in functional half-life.",
    "url": "https://doi.org/10.1073/pnas.1908052116"
  },
  {
    "label": "Translation affects mRNA stability in a codon-dependent manner in human cells.",
    "url": "https://doi.org/10.7554/elife.45396"
  },
  {
    "label": "NCBI: standard genetic code, table 1; DNA alphabet uses T for U",
    "url": "https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi"
  }
],
    related: [
  "mrna-construct-anatomy",
  "multi-epitope-constructs",
  "in-vitro-transcription"
]
  ,
"asOf": "2026-11-09",
"notes": [
  "A codon is a three-base unit. In the standard genetic code, GCU and GCC both encode alanine; synonymous redesign can preserve the intended amino-acid sequence while altering the RNA. RNA structure, available decoding machinery and experimental conditions still matter. Compare matched RNA amount, chemistry, cap, UTRs, purity and delivery, using RNA and protein time courses and protein identity or activity. A codon score or single reporter measurement cannot establish translation fidelity, peptide display, recognition or benefit, and a changed amino-acid spacer is a different design change.",
  "In Mauger's engineered eGFP constructs, highly expressed messages could have highly structured coding regions, and coding-region structure affected the duration of active translation. This concerns the tested coding regions and does not show that removing every fold or maximising one codon score improves every message."
]
}),
  t({
    id: "modified-rna-nucleosides",
    name: "Modified nucleosides in messenger RNA",
    category: "Genomics & genetics",
    tldr: "Chemical changes to RNA building blocks can alter how a message is sensed and translated. The effect depends on the RNA and the system in which it is tested.",
    summary: "Primary experiments found that selected nucleoside modifications changed RNA-triggered innate immune activation. Later work showed that purification of modified transcripts also affected inflammatory responses and protein expression. Modification and removal of contaminants are therefore distinct design and manufacturing questions. Results from those experimental systems do not establish that one modification is best for every cancer vaccine, delivery platform or intended immune response.\n\nIn cell lines and mice, N1-methylpseudouridine, alone or with 5-methylcytidine, gave higher reporter expression than pseudouridine-based mRNA, up to about 44-fold for double-modified mRNA and about 13-fold for single-modified mRNA as the abstract reports (cell lines and mice respectively), with less innate immunogenicity and better cell viability in vitro (Andries and colleagues). Separately, N1-methylpseudouridine caused +1 ribosomal frameshifting in vitro at slippery sequences, cellular immunity to +1 products was found in mice and humans after vaccination with BNT162b2 vaccine mRNA, and synonymous changes at those sequences reduced frameshifted products; the authors note that no adverse outcomes from mistranslation of the SARS-CoV-2 vaccines have been reported (Mulroney and colleagues). More reporter signal with less cytokine in one matched comparison does not show a stronger antigen-specific T-cell response: unmodified mRNAs were translated better after purification yet still induced high cytokine secretion, and purified modified mRNA was translated 10 to 1000-fold more in primary cells (Karikó and colleagues, 2011), so sensing, expression and T-cell readouts each need their own evidence.",
    links: [
  {
    "label": "Suppression of RNA recognition by Toll-like receptors: the impact of nucleoside modification and the evolutionary origin of RNA.",
    "url": "https://doi.org/10.1016/j.immuni.2005.06.008"
  },
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "N(1)-methylpseudouridine-incorporated mRNA outperforms pseudouridine-incorporated mRNA by providing enhanced protein expression and reduced immunogenicity in mammalian cell lines and mice.",
    "url": "https://doi.org/10.1016/j.jconrel.2015.08.051"
  },
  {
    "label": "N<sup>1</sup>-methylpseudouridylation of mRNA causes +1 ribosomal frameshifting.",
    "url": "https://doi.org/10.1038/s41586-023-06800-3"
  },
  {
    "label": "OpenStax Organic Chemistry 28.1: nucleosides and nucleotides",
    "url": "https://openstax.org/books/organic-chemistry/pages/28-1-nucleotides-and-nucleic-acids"
  }
],
    related: [
  "dsrna-impurities",
  "mrna-construct-anatomy",
  "mrna-lnp-manufacturing"
],
    aka: [
      "modified mRNA nucleosides",
      "nucleoside-modified mRNA"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "A nucleoside combines a base with a sugar; a nucleotide also carries phosphate. Modified RNA building blocks change chemistry separately from the intended sequence and from contaminating byproducts. Characterise chemistry and identity, impurities, protein identity and quantity, and innate-sensing readouts under matched sequence, amount, cap, UTR, purity and formulation conditions. A translation or cytokine result cannot establish every later immune or clinical outcome.",
  "Karikó's 2005 experiments compared human TLR systems and dendritic-cell readouts under selected nucleoside modifications. In the 2011 study, modified transcripts still contained activating contaminants including double-stranded RNA, and purification changed innate activation and translation. A change in building-block chemistry is therefore separate from removal of byproducts."
]
}),
  t({
    id: "in-vitro-transcription",
    name: "In vitro transcription for RNA products",
    category: "Methods and models",
    tldr: "Enzymes can copy a DNA template into RNA outside a living cell. Producing the transcript is followed by questions about its identity, composition and suitability for use.",
    summary: "Experimental RNA-manufacturing studies distinguish the intended in vitro-transcribed RNA from contaminating products and test how purification affects its performance. A primary RNA-construct study then measured expression and immune stimulation after delivering transcripts to cells. RNA production, product quality and biological performance are separate observations. An RNA yield or a band of the expected size alone does not establish a released product or a clinical treatment effect.\n\nA protocol from authors affiliated with TriLink Biotechnologies describes co-transcriptional capping with the company's CleanCap AG reagent, reported to give 94 per cent cap 1 structure at 5 mg/ml of transcription, against cap 0 products at lower efficiency from first-generation cap analogues (Henderson and colleagues). It describes one reagent and is not a release specification. Separately, T7 polymerase initiated transcription from a promoter-less DNA end and made an antisense strand that paired with the intended RNA as long double-stranded RNA, which stimulated the innate sensor MDA5; the activity was suppressed by modified nucleotides or a lower magnesium concentration (Mu and colleagues). Release analytics are layered: reviews list sequence and modification identity, poly(A) tail, RNA content by UV spectrophotometry, integrity and transcript length by gel or capillary electrophoresis or chromatography, double-stranded RNA by immunoblot or ELISA, and residual DNA as separate attributes; purification has to remove template DNA, unincorporated nucleotides and enzymes; residual nucleotides are controlled below predefined thresholds that need much lower detection limits than the main product, with the intact mRNA itself complicating their detection (Losada and colleagues; Nowak and colleagues). Because RNA content and integrity are separate assays, total mass alone does not show full-length product.",
    links: [
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "A Facile Method for the Removal of dsRNA Contaminant from In Vitro-Transcribed mRNA.",
    "url": "https://doi.org/10.1016/j.omtn.2019.02.018"
  },
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "Cap 1 Messenger RNA Synthesis with Co-transcriptional CleanCap® Analog by In Vitro Transcription.",
    "url": "https://doi.org/10.1002/cpz1.39"
  },
  {
    "label": "An origin of the immunogenicity of in vitro transcribed RNA.",
    "url": "https://doi.org/10.1093/nar/gky177"
  },
  {
    "label": "From nucleotides to intact transcripts through oligonucleotides: Integrated chromatographic strategies for therapeutic mRNA characterization.",
    "url": "https://doi.org/10.1007/s00216-026-06615-x"
  },
  {
    "label": "Process and analytical strategies for the safe production of mRNA vaccines and therapeutics.",
    "url": "https://doi.org/10.1007/s11033-026-11455-0"
  },
  {
    "label": "NEB: Evaluation of IVT Reaction Products, analytical protocol",
    "url": "https://www.neb.com/en-us/protocols/evaluation-of-ivt-reaction-products?pdf=true"
  }
],
    related: [
  "mrna-construct-anatomy",
  "dsrna-impurities",
  "chemistry-manufacturing-controls",
  "plasmid-dna-manufacturing"
],
    aka: [
      "IVT RNA production",
      "in-vitro-transcribed RNA"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "In vitro transcription copies a DNA template into RNA outside living cells. A T7 promoter recruits the transcription machinery; a Kozak context acts at translation initiation. Cap addition during transcription or afterwards, and template-encoded or enzyme-added poly(A), are distinct process choices. The DNA is a manufacturing input; residual DNA in the product is a separate quality attribute. Preserve the connection from the intended antigen sequence through the finished construct and its expression and potency tests.",
  "NEB's IVT evaluation protocol says unincorporated nucleotides and template DNA affect the 260-nanometre absorbance reading and calls for their removal before RNA quantification. This is vendor analytical guidance, not a clinical specification. Record purification and the quantification method separately from transcript length and integrity; total mass alone does not identify full-length RNA."
]
}),
  t({
    id: "dsrna-impurities",
    name: "Double-stranded RNA impurities",
    category: "Methods and models",
    tldr: "RNA manufacture can also produce unwanted paired RNA material. Measuring and removing it is a product-quality question separate from the intended message.",
    summary: "Primary experiments identified double-stranded RNA among contaminants that affected innate immune activation and translation of in vitro-transcribed messenger RNA. Subsequent work developed and tested a cellulose-based removal method. Those studies support characterizing contaminants and their functional consequences in the tested workflows. They do not establish one universal acceptable impurity level or release method for all RNA products.\n\nOne documented origin is T7 polymerase initiating transcription from a promoter-less DNA end, producing an antisense strand and long double-stranded RNA that activated the sensor MDA5 (Mu and colleagues). In purification studies, unmodified mRNAs were translated better after HPLC purification but still induced high levels of cytokine secretion (Karikó and colleagues). A cellulose method removed at least 90 per cent of double-stranded RNA with over 65 per cent recovery regardless of mRNA length, coding sequence or nucleoside composition and increased translation in mice, and agarose gels showed that the purified mRNA stayed intact, but it removed duplexes of 30 base pairs or longer efficiently while most of a 21 base-pair duplex remained (Baiersdörfer and colleagues). Detection has its own scope: that paper notes an earlier report that about 40 base pairs of duplex are needed for detection by the J2 antibody, and a review of mRNA analytics lists immunoblot or ELISA for double-stranded RNA alongside separate integrity assays (Losada and colleagues). A lower dsRNA signal with worse fragmentation or recovery therefore does not show a better product. Method performance in those systems is not a clinical impurity limit.",
    links: [
  {
    "label": "Generating the optimal mRNA for therapy: HPLC purification eliminates immune activation and improves translation of nucleoside-modified, protein-encoding mRNA.",
    "url": "https://doi.org/10.1093/nar/gkr695"
  },
  {
    "label": "A Facile Method for the Removal of dsRNA Contaminant from In Vitro-Transcribed mRNA.",
    "url": "https://doi.org/10.1016/j.omtn.2019.02.018"
  },
  {
    "label": "An origin of the immunogenicity of in vitro transcribed RNA.",
    "url": "https://doi.org/10.1093/nar/gky177"
  },
  {
    "label": "From nucleotides to intact transcripts through oligonucleotides: Integrated chromatographic strategies for therapeutic mRNA characterization.",
    "url": "https://doi.org/10.1007/s00216-026-06615-x"
  }
],
    related: [
  "in-vitro-transcription",
  "modified-rna-nucleosides",
  "chemistry-manufacturing-controls"
],
    aka: [
      "dsRNA impurities",
      "double-stranded RNA contaminants"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Distinguish a shorter transcript, a fold within the intended message and an unwanted complementary RNA duplex; transcript length alone cannot identify these categories. State the antibody or other detection chemistry, calibrator, sample matrix, units, detection and quantitation limits, and recovery behind a dsRNA result. Test recognised structures and relevant RNA chemistries rather than assuming every duplex is equally visible. Assess RNA size, integrity and expression separately: lower antibody signal alone cannot establish a better product or antigen-specific immunity."
]
}),
  t({
    id: "multi-epitope-constructs",
    name: "Multi-epitope constructs and antigen processing",
    category: "Immunology",
    tldr: "A construct can encode several intended immune targets. Each target still needs to be processed, displayed and recognized in the tested biological setting.",
    summary: "A primary multiepitope DNA-vaccine study found that flanking sequence changes altered processing efficiency and measured immunogenicity of encoded epitopes. That was evidence from the tested constructs, not a validated rule for every RNA cancer vaccine. The number of encoded epitopes is distinct from the number naturally displayed or recognized. Processing evidence, immune-response breadth and clinical outcome remain separate parts of a construct claim.\n\nA computational study of spacer design for class-I-restricted string-of-beads polypeptides reported a fivefold increase in predicted epitope recovery and a 44 per cent reduction in predicted neo-epitope immunogenicity compared with designs without spacers (Schubert and Kohlbacher); these are predictions, not measured protection. Combining an N-terminal leader peptide with an MHC class I trafficking signal at the C terminus improved presentation of class I and class II epitopes in human and mouse dendritic cells and expanded antigen-specific CD8 and CD4 T cells in vitro and in mice (Kreiter and colleagues). In a first-in-human RNA poly-neo-epitope melanoma study all patients developed T-cell responses against multiple vaccine neo-epitopes (Sahin and colleagues; abstract only), and each patient's vaccine in the Rojas pancreatic cancer trial used two uridine mRNA strands, each encoding up to 10 neoepitopes. Mass spectrometry can identify recovered HLA-bound peptides. Caron and colleagues' 2015 review describes class I peptides predominantly 9 to 12 amino acids long and reports that about 10 per cent of acquired spectra could be confidently assigned at a 1 per cent false discovery rate in the workflows discussed. It also describes evidence that mass spectrometry underestimates the self-HLA peptide repertoire, so non-detection does not prove absence. Prediction is not presentation: of more than 1,300 amino acid changes in two mouse tumour models about 13 per cent were predicted to bind MHC class I and a small fraction of those were confirmed by mass spectrometry (Yadav and colleagues). Because a single amino acid after an epitope changed its immunogenicity in a multiepitope DNA vaccine (Livingston and colleagues, already linked), a changed spacer is a changed construct that needs renewed processing and display evidence, while earlier evidence is retained for the parts that did not change.",
    links: [
  {
    "label": "Optimization of epitope processing enhances immunogenicity of multiepitope DNA vaccines.",
    "url": "https://doi.org/10.1016/s0264-410x(01)00233-x"
  },
  {
    "label": "T cells compete for access to antigen-bearing antigen-presenting cells.",
    "url": "https://doi.org/10.1084/jem.192.8.1105"
  },
  {
    "label": "Modification of antigen-encoding RNA increases stability, translational efficacy, and T-cell stimulatory capacity of dendritic cells.",
    "url": "https://doi.org/10.1182/blood-2006-04-015024"
  },
  {
    "label": "Designing string-of-beads vaccines with optimal spacers.",
    "url": "https://doi.org/10.1186/s13073-016-0263-6"
  },
  {
    "label": "Increased antigen presentation efficiency by coupling antigens to MHC class I trafficking signals.",
    "url": "https://doi.org/10.4049/jimmunol.180.1.309"
  },
  {
    "label": "Personalized RNA mutanome vaccines mobilize poly-specific therapeutic immunity against cancer.",
    "url": "https://doi.org/10.1038/nature23003"
  },
  {
    "label": "Personalized RNA neoantigen vaccines stimulate T cells in pancreatic cancer.",
    "url": "https://doi.org/10.1038/s41586-023-06063-y"
  },
  {
    "label": "Analysis of Major Histocompatibility Complex (MHC) Immunopeptidomes Using Mass Spectrometry.",
    "url": "https://doi.org/10.1074/mcp.o115.052431"
  },
  {
    "label": "Predicting immunogenic tumour mutations by combining mass spectrometry and exome sequencing.",
    "url": "https://doi.org/10.1038/nature14001"
  }
],
    related: [
  "immunodominance",
  "binding-presentation-recognition",
  "codon-optimization",
  "mrna-construct-anatomy"
],
    aka: [
      "polyepitope constructs",
      "multi-epitope vaccine design"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "An encoded antigen window is not necessarily the peptide eventually displayed. Joined windows and spacers can create new junction sequences. A protein-routing signal concerns the encoded protein rather than the particle delivery address. Identify any intended helper segment and test its HLA class II presentation and CD4 response in the relevant setting. Verify sequence and expression, recovered HLA-bound peptides and functional recognition separately; prediction scores do not supply a presentation threshold. Changing a spacer changes the construct even if two selected windows are unchanged. More encoded targets create opportunities only where relevant antigen expression, processing, compatible HLA presentation and functional recognition can occur. Target count alone is not measured response breadth."
]
}),
  t({
    id: "binder-targeting-module",
    name: "Binders as targeting modules",
    category: "Biology basics",
    tldr: "A recognition molecule can be used as one component of a larger therapeutic design. Its ability to bind is one property of that component.",
    summary: "Primary antibody-fragment studies showed how recognition domains can be used outside a complete antibody. Experiments with bispecific T-cell engagers then showed that constructs with similar binding affinity could differ in target-cell lysis because of epitope position and antigen geometry. A binder is therefore a module whose performance must be evaluated in its assembled format. Binding alone does not establish delivery, effector activity or clinical benefit.",
    links: [
      {
        label: "Protein engineering of antibody binding sites: recovery of specific activity in an anti-digoxin single-chain Fv analogue produced in Escherichia coli.",
        url: "https://doi.org/10.1073/pnas.85.16.5879"
      },
      {
        label: "Naturally occurring antibodies devoid of light chains.",
        url: "https://doi.org/10.1038/363446a0"
      },
      {
        label: "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
        url: "https://doi.org/10.1007/s00262-010-0844-y"
      }
    ],
    related: [
      "antibody",
      "epitope",
      "scfv-vhh-formats",
      "binder-format-constraints"
    ]
  }),
  t({
    id: "binder-affinity-epitope-developability",
    name: "Binder affinity, epitope and developability",
    category: "Methods and models",
    tldr: "Binding strength, the site recognized and practical molecule properties answer different questions. A useful binder needs evaluation beyond a single affinity value.",
    summary: "A primary comparison of bispecific constructs found different lytic activity despite similar antigen-binding affinity, with epitope geometry contributing to the result. A separate clinical-stage antibody survey measured multiple biophysical properties relevant to developability. Those studies support evaluating recognition, function and molecule behavior separately. Their tested distributions and constructs do not establish a universal selection cutoff or guarantee that a candidate will become an effective drug.",
    links: [
      {
        label: "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
        url: "https://doi.org/10.1007/s00262-010-0844-y"
      },
      {
        label: "Biophysical properties of the clinical-stage antibody landscape.",
        url: "https://doi.org/10.1073/pnas.1616408114"
      }
    ],
    related: [
      "epitope",
      "binder-targeting-module",
      "binder-format-constraints",
      "self-similarity-immune-recognition"
    ],
    aka: [
      "antibody binder developability",
      "affinity versus binder function"
    ]
  }),
  t({
    id: "binder-format-constraints",
    name: "Format-dependent binder function",
    category: "Methods and models",
    tldr: "A recognition domain can behave differently when built into a different therapeutic structure. Its final format is part of the experiment.",
    summary: "Epitope-distance experiments in bispecific T-cell engagers linked target geometry to cell lysis in the tested models. A later comparison of CD123-directed single-chain and single-domain antibody fragments examined their behavior in engineered T cells and a mouse leukemia model. These are construct-specific findings. A successful binding measurement or one format comparison should not be generalized to all antibody fragments, targets, payloads or clinical settings.",
    links: [
      {
        label: "Epitope distance to the target cell membrane and antigen size determine the potency of T cell-mediated lysis by BiTE antibodies specific for a large melanoma surface antigen.",
        url: "https://doi.org/10.1007/s00262-010-0844-y"
      },
      {
        label: "Antibody format matters: A comparative analysis of VHH and scFv domains reveals superior in vivo CAR T cell function with VHH domains.",
        url: "https://doi.org/10.1016/j.ymthe.2026.06.017"
      }
    ],
    related: [
      "binder-targeting-module",
      "scfv-vhh-formats",
      "binder-affinity-epitope-developability",
      "car-t"
    ]
  }),
  t({
    id: "scfv-vhh-formats",
    name: "Single-chain and single-domain antibody fragments",
    category: "Biology basics",
    tldr: "An antibody recognition unit can be engineered from linked heavy- and light-chain variable regions or from a single suitable variable domain. These formats have different structures to evaluate.",
    summary: "The original single-chain Fv work linked antibody heavy- and light-chain variable regions and tested binding after expression and refolding. Camelid heavy-chain antibody studies established a different architecture without light chains, underlying VHH-derived formats. More recent engineered-cell comparisons test the behavior of particular fragments in particular constructs. Format names describe architecture; they do not by themselves establish stability, specificity or therapeutic superiority.",
    links: [
      {
        label: "Protein engineering of antibody binding sites: recovery of specific activity in an anti-digoxin single-chain Fv analogue produced in Escherichia coli.",
        url: "https://doi.org/10.1073/pnas.85.16.5879"
      },
      {
        label: "Naturally occurring antibodies devoid of light chains.",
        url: "https://doi.org/10.1038/363446a0"
      },
      {
        label: "Antibody format matters: A comparative analysis of VHH and scFv domains reveals superior in vivo CAR T cell function with VHH domains.",
        url: "https://doi.org/10.1016/j.ymthe.2026.06.017"
      }
    ],
    related: [
      "antibody",
      "binder-format-constraints",
      "binder-targeting-module"
    ],
    aka: [
      "scFv and VHH",
      "single-chain variable fragment",
      "VHH antibody domain",
      "single-domain antibody fragment"
    ]
  }),
  t({
    id: "delivery-target-versus-therapeutic-target",
    name: "Delivery targets and therapeutic targets",
    category: "Treatment jargon",
    tldr: "The molecule used to deliver an intervention to a cell can differ from the target of the treatment that cell produces. Both targeting steps need to be named.",
    summary: "A primary mouse cardiac-fibrosis study used CD5-targeted lipid nanoparticles to deliver RNA encoding a receptor directed against fibroblast activation protein. CD5 specified a delivery interaction; the encoded receptor had a different recognition target. This is a non-oncology preclinical illustration of the distinction, not cancer-treatment evidence. Delivery, expression, effector recognition and clinical benefit should retain their separate experiments and biological settings.\n\nTargeted-LNP studies show three separate questions. Which cells receive usable cargo: in the CD5 study mRNA reached most cultured mouse T cells (83 per cent expressed the receptor, against 7 per cent with isotype-control particles) and receptor expression appeared across the main T-cell subsets in injured mice, while liver expression occurred with both CD5 and control particles; recombination in a Cre reporter reached 81.1 per cent of CD4-positive and 75.6 per cent of CD8-positive splenocytes but also 15.0 per cent of CD3-negative cells, and the statement that 87 per cent of receptor-positive cells were CD4-positive is a share of expressing cells, not the share of CD4 T cells that expressed the receptor, so each percentage needs its denominator. What the receptor recognises: FDA's January 2024 CAR T guidance says cytokine release and killing should be antigen-dependent, testable with cells that vary in target antigen expression, and asks sponsors to assess targeting of healthy tissue that expresses the intended antigen (on-target, off-tumour) and of other antigens (off-target); activity against antigen-positive healthy cells would therefore show target-dependent activity and a safety concern, not selective cancer killing. Where engineered cells act is a further question: a later study with targeted lipid nanoparticles reports reprogrammed CD8-positive T cells from healthy donors and autoimmune patients, tumour control in humanised mice and B-cell depletion in cynomolgus monkeys, each a different experiment and setting (Hunter and colleagues; abstract only). For a vaccine the address can instead be an antigen-presenting cell: intravenous RNA-lipoplexes were aimed at dendritic cells and macrophages in lymphoid compartments by adjusting net charge, without a molecular ligand (Kranz and colleagues).",
    links: [
  {
    "label": "CAR T cells produced in vivo to treat cardiac injury.",
    "url": "https://doi.org/10.1126/science.abm0594"
  },
  {
    "label": "In vivo CAR T cell generation to treat cancer and autoimmune disease.",
    "url": "https://doi.org/10.1126/science.ads8473"
  },
  {
    "label": "Systemic RNA delivery to dendritic cells exploits antiviral defence for cancer immunotherapy.",
    "url": "https://doi.org/10.1038/nature18300"
  },
  {
    "label": "Considerations for the Development of Chimeric Antigen Receptor (CAR) T Cell Products: guidance for industry, January 2024",
    "url": "https://www.fda.gov/media/156896/download"
  }
],
    related: [
  "in-vivo-car-t",
  "binder-targeting-module",
  "mrna-construct-anatomy"
],
    aka: [
      "delivery targeting versus cancer targeting",
      "delivery receptor versus effector target"
    ]
  ,
"asOf": "2026-11-09",
"notes": [
  "Separate delivery-marker binding, uptake, expression, receptor engagement, signalling and target-cell effects. A comparison needs identified live-cell populations and matched antigen-positive and antigen-negative controls. A small amount of unintended-cell expression in a sample cannot establish absence across all cells or tissues, and selectively engineering one cell population does not remove risk to healthy antigen-positive targets."
]
}),
  t({
    id: "chemistry-manufacturing-controls",
    name: "Chemistry, manufacturing and controls",
    category: "Regulation & policy",
    tldr: "This is the evidence describing a product, how it is made and how its quality is controlled. It addresses product questions alongside the separate evidence about clinical outcomes.",
    summary: "FDA guidance for human gene-therapy investigational applications describes information intended to assure product safety, identity, quality, purity and strength, including potency. The potency-assurance guidance further connects manufacturing design, controls and testing. These sources have defined product and regulatory scopes. A manufacturing dossier, a laboratory release result and evidence that an intervention improves clinical outcomes are related but distinct parts of product development.",
    links: [
      {
        label: "FDA: chemistry, manufacturing and control information for human gene therapy INDs",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/chemistry-manufacturing-and-control-cmc-information-human-gene-therapy-investigational-new-drug"
      },
      {
        label: "FDA: Potency Assurance for Cellular and Gene Therapy Products, final guidance (November 2026)",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-potency-assurance-cellular-and-gene-therapy-products"
      }
    ],
    related: [
      "certificate-of-analysis",
      "manufacturing-process-comparability",
      "cell-therapy-release-testing",
      "mrna-lnp-manufacturing"
    ],
    aka: [
      "chemistry manufacturing and controls",
      "CMC quality information"
    ]
  }),
  t({
    id: "certificate-of-analysis",
    name: "Certificate of analysis",
    category: "Regulation & policy",
    tldr: "A certificate of analysis reports specified test results for an identified material lot. It needs to be read with the tests, acceptance criteria and intended use.",
    summary: "ICH Q7 describes certificates for active-ingredient or intermediate batches, including identity, batch details, tests, acceptance limits and results. FDA CAR T-cell guidance also discusses assessment of incoming material certificates. Requirements depend on the material and governing framework. A certificate is a lot-specific report, not independent proof of every possible property, general regulatory approval or clinical benefit.",
    links: [
      {
        label: "FDA/ICH Q7: certificates of analysis, section 11.4",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q7-good-manufacturing-practice-guidance-active-pharmaceutical-ingredients-guidance-industry"
      },
      {
        label: "FDA: considerations for development of CAR T-cell products",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-development-chimeric-antigen-receptor-car-t-cell-products"
      }
    ],
    related: [
      "chemistry-manufacturing-controls",
      "cell-therapy-release-testing",
      "manufacturing-process-comparability"
    ],
    aka: [
      "lot certificate of analysis"
    ]
  }),
  t({
    id: "manufacturing-process-comparability",
    name: "Comparability after manufacturing changes",
    category: "Regulation & policy",
    tldr: "A changed manufacturing process needs evidence about the product before and after the change. Comparability asks whether observed differences could matter to product quality, safety or effectiveness.",
    summary: "ICH Q5E provides a framework for comparing a biological product before and after manufacturing changes. It emphasizes quality attributes and assessing whether additional nonclinical or clinical evidence is needed. It does not prescribe one universal testing strategy. The question concerns a specified process change and product; it should not be collapsed into a general claim that all batches, sites or related products are interchangeable.",
    links: [
      {
        label: "EMA/ICH Q5E: comparability after a manufacturing-process change",
        url: "https://www.ema.europa.eu/en/documents/scientific-guideline/ich-q-5-e-comparability-biotechnologicalbiological-products-step-5_en.pdf"
      }
    ],
    related: [
      "chemistry-manufacturing-controls",
      "certificate-of-analysis",
      "biosimilar-manufacturing",
      "cell-therapy-release-testing"
    ],
    aka: [
      "manufacturing process comparability",
      "process-change comparability"
    ]
  }),
  t({
    id: "cell-segmentation",
    name: "Cell segmentation in tissue measurements",
    category: "Methods and models",
    tldr: "Image analysis estimates which pixels or detected molecules belong to each cell. Those assignments affect the measurements reported for that cell.",
    summary: "The Mesmer study developed and tested whole-cell segmentation across tissue images and used the estimated boundaries to extract cellular features. A separate spatial-transcriptomics reanalysis found that misassigned molecules could change downstream cell-state and interaction analyses. These findings concern defined datasets and methods, not one universal error rate. Segmentation quality and signal assignment need evaluation before a spatial measurement is treated as a biological conclusion.",
    links: [
      {
        label: "Whole-cell segmentation of tissue images with human-level performance using large-scale data annotation and deep learning.",
        url: "https://doi.org/10.1038/s41587-021-01094-0"
      },
      {
        label: "Impact and correction of segmentation errors in spatial transcriptomics.",
        url: "https://doi.org/10.1038/s41588-025-02497-4"
      }
    ],
    related: [
      "imaging-mass-cytometry",
      "spatial-transcriptomics",
      "tumour-purity"
    ],
    aka: [
      "single-cell tissue segmentation"
    ]
  }),
  t({
    id: "targeted-proteomics-quantification",
    name: "Targeted proteomics and quantification limits",
    category: "Methods and models",
    tldr: "A targeted protein assay measures selected peptide signals through a defined workflow. Reliable amounts require evidence about the quantitative range and precision of the assay.",
    summary: "A primary multilaboratory study evaluated isotope-dilution multiple-reaction-monitoring assays for selected plasma proteins, examining recovery, reproducibility, linear range, detection and quantification limits. The performance belonged to the tested materials, analytes and protocols. It was not a universal certificate for all proteins or specimens. A reported protein amount should retain its measured peptide, calibration approach, sample preparation and supported range.",
    links: [
      {
        label: "Multi-site assessment of the precision and reproducibility of multiple reaction monitoring-based measurements of proteins in plasma.",
        url: "https://doi.org/10.1038/nbt.1546"
      }
    ],
    related: [
      "proteomics",
      "rppa",
      "analytical-vs-clinical-validation",
      "tissue-preparation-assay-fit"
    ],
    aka: [
      "targeted protein quantification",
      "multiple-reaction-monitoring protein assays"
    ]
  }),
];
