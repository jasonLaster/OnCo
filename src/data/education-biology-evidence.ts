import type { TermInput } from "@/lib/schema";

/** General biology and measurement boundaries; sources are scoped per record. */
export const educationBiologyEvidence: TermInput[] = [
  {
    "id": "cell-lineage-and-state",
    "name": "Cell lineage, identity and state",
    "aka": [
      "cell lineage",
      "cell state",
      "lineage tracing",
      "cell ancestry"
    ],
    "tldr": "A cell’s ancestry, its type and its current activity answer different questions. Similar activity does not prove that two cells share a recent ancestor.",
    "summary": "Lineage describes descent from earlier cells. A cell type or identity describes a differentiated family, while a state describes context-dependent features such as activation, stress or cycling. A genetic clone has shared ancestry and can be tracked through specified genomic features; an RNA cluster alone does not establish that ancestry. Stem cells can renew and generate descendants; progenitor potential is restricted by the biological context. Differentiation develops specialized properties without requiring every change of state to become a new lineage.",
    "notes": [
      "Reference atlases classify measured features. Barcodes or other validated tracing information add ancestry evidence, with their own labeling and sampling limits. Weinreb and colleagues combined expressed barcodes and transcriptomes over time in hematopoiesis; sister-cell analyses exposed fate biases that a single RNA snapshot missed. This does not identify an individual tumor’s origin from its expression profile."
    ],
    "links": [
      {
        "label": "Lineage tracing on transcriptional landscapes links state to fate during differentiation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31974159/"
      },
      {
        "label": "NIGMS: stem cells and differentiation",
        "url": "https://www.nigms.nih.gov/biobeat/2024/11/what-are-stem-cells"
      }
    ],
    "related": [
      "differentiation",
      "clonal-evolution",
      "cell-cycle"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "epithelium-and-stroma",
    "name": "Epithelium, stroma and tissue compartments",
    "aka": [
      "epithelial tissue",
      "tissue compartments",
      "stromal compartment",
      "basement membrane"
    ],
    "tldr": "Tissue contains different cell groups and supporting material. Knowing which compartment produced a signal helps explain what the result can mean.",
    "summary": "Epithelium forms linings, coverings and glands; an epithelial cell is not necessarily malignant. A basement membrane is extracellular supporting material beneath an epithelium, distinct from each cell’s lipid membrane. Stroma includes supporting cells, extracellular matrix and vascular structures, rather than only collagen or fibroblasts. Immune cells and other nonmalignant cells can contribute to a tumor specimen. The relevant compartments depend on the tissue and disease.",
    "notes": [
      "Bulk RNA or protein measurements combine contributions from sampled cells. A stronger signal can reflect more cells of one type, changed expression within cells, or both. Spatial review and suitable cell markers help test attribution; a mixed-tissue result should not automatically be assigned to cancer cells. Normal and cancer breast atlases provide defined examples of this cellular diversity."
    ],
    "links": [
      {
        "label": "NCI SEER: epithelial organization and basement membrane",
        "url": "https://training.seer.cancer.gov/anatomy/cells_tissues_membranes/tissues/epithelial.html"
      },
      {
        "label": "A spatially resolved single-cell genomic atlas of the adult human breast.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37380767/"
      },
      {
        "label": "A single-cell and spatially resolved atlas of human breast cancers.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34493872/"
      }
    ],
    "related": [
      "cell-membrane",
      "carcinoma",
      "cell-composition-confound",
      "tumor-microenvironment"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "cellular-compartments",
    "name": "Organelles and cellular compartments",
    "aka": [
      "organelle",
      "organelles",
      "cellular compartment",
      "intracellular compartments"
    ],
    "tldr": "A cell has compartments with different jobs. A molecule inside one compartment may still be separated from the place where it needs to act.",
    "summary": "The nucleus houses most cellular DNA; mitochondria have their own genome and participate in energy metabolism and other processes. Ribosomes make polypeptide chains. The endoplasmic reticulum and Golgi process and sort selected membrane or secreted cargo, while lysosomes degrade delivered material in an acidic compartment. That itinerary is not the route of every protein. Cytosol is the fluid outside membrane-bound organelle interiors; cytoplasm includes cytosol and structures outside the nucleus. A vesicle lumen is not cytosol.",
    "notes": [
      "Endoplasmic reticulum and estrogen receptor are different meanings of ER; use the full name when context is unclear.",
      "Localization, colocalization, amount, interaction and function need different evidence. More or brighter organelle staining does not by itself measure the rate of material passing through a pathway.",
      "Mitochondria have roles beyond ATP production. Liu and colleagues used cell-free extracts and cytochrome-c depletion/add-back experiments to examine an apoptotic mechanism; this is a defined experimental result, not a universal measurement of cell death."
    ],
    "links": [
      {
        "label": "OpenStax Biology 2e: 4-3-eukaryotic-cells",
        "url": "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells"
      },
      {
        "label": "OpenStax Biology 2e: 4-4-the-endomembrane-system-and-proteins",
        "url": "https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins"
      },
      {
        "label": "NHGRI: DNA in nuclei and mitochondria",
        "url": "https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet"
      },
      {
        "label": "Induction of apoptotic program in cell-free extracts: requirement for dATP and cytochrome c.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8689682/"
      }
    ],
    "related": [
      "cell-membrane",
      "nucleus",
      "protein",
      "apoptosis-bcl2"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "alleles-and-zygosity",
    "name": "Alleles, zygosity and copy state",
    "aka": [
      "allele",
      "zygosity",
      "heterozygous",
      "homozygous",
      "hemizygous",
      "allelic phase"
    ],
    "tldr": "An allele is a sequence version at a genomic location. Which versions are present and how many DNA copies exist are separate questions.",
    "summary": "At a diploid location, heterozygous means that the two copies differ in the feature being considered; homozygous means they match. Hemizygous describes a single copy in the specified context. Tumor gains, losses and genome doubling can make a two-copy model inadequate. Loss of heterozygosity means loss of previously different allelic information; it can accompany a deletion or occur while total copy count remains unchanged. Total copy number alone cannot identify which allele was retained.",
    "notes": [
      "Variant allele frequency counts supporting reads or molecules under the assay’s definition. Purity, local copy state, subclonal mixtures and method affect it; it is not directly a cancer-cell percentage or a zygosity call. Phase asks whether specified variants share a DNA copy, a further question that a gene-name match does not answer."
    ],
    "links": [
      {
        "label": "NHGRI: Allele",
        "url": "https://www.genome.gov/genetics-glossary/Allele"
      },
      {
        "label": "NHGRI: Heterozygous",
        "url": "https://www.genome.gov/genetics-glossary/Heterozygous"
      },
      {
        "label": "NHGRI: Homozygous",
        "url": "https://www.genome.gov/genetics-glossary/Homozygous"
      },
      {
        "label": "Allele-specific genomic data elucidate the role of somatic gain and copy-number neutral loss of heterozygosity in cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34731645/"
      },
      {
        "label": "Absolute quantification of somatic DNA alterations in human cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22544022/"
      }
    ],
    "related": [
      "vaf",
      "gene-amplification",
      "copy-number-variation-term",
      "genome-wide-loss-of-heterozygosity",
      "germline-vs-somatic"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "epigenetic-marks",
    "name": "Epigenetic marks and DNA methylation",
    "aka": [
      "epigenetics",
      "DNA methylation",
      "5-methylcytosine",
      "5-hydroxymethylcytosine",
      "5mC",
      "5hmC",
      "histone modification"
    ],
    "tldr": "Chemical features of DNA and its packaging can influence how genes are used. Their location and cellular context matter; a mark does not have one universal effect.",
    "summary": "DNA methylation changes a base’s chemical state without substituting the underlying sequence letter. Much human methylation analysis concerns 5-methylcytosine at CpG sites. Histone modifications affect DNA-associated proteins and are distinct from marks on DNA itself. Some regulatory states persist through division; epigenetic does not mean every mark is permanent or transmitted between generations. Promoter methylation can participate in reduced transcription, while patterns elsewhere need their own interpretation.",
    "notes": [
      "Standard bisulfite analysis changes unmodified cytosine but reads both 5-methylcytosine and 5-hydroxymethylcytosine as C. Oxidative bisulfite methods separate those features through additional chemistry. Ordinary amplified DNA sequence does not preserve this direct chemical measurement.",
      "A methylation signal in mixed tissue is not a percentage of cancer cells with a silenced gene. Cell mixture, genomic location, conversion controls and method resolution matter. Association with low RNA does not establish causation or treatment sensitivity."
    ],
    "links": [
      {
        "label": "NHGRI: epigenomics",
        "url": "https://www.genome.gov/about-genomics/fact-sheets/Epigenomics-Fact-Sheet"
      },
      {
        "label": "Human DNA methylomes at base resolution show widespread epigenomic differences.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19829295/"
      },
      {
        "label": "A genomic sequencing protocol that yields a positive display of 5-methylcytosine residues in individual DNA strands.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1542678/"
      },
      {
        "label": "Oxidative bisulfite sequencing of 5-methylcytosine and 5-hydroxymethylcytosine.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24008380/"
      }
    ],
    "related": [
      "epigenetic-reprogramming",
      "methylation-profiling",
      "methylation-arrays",
      "gene-expression",
      "histone-lactylation"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "nonsense-mediated-decay",
    "name": "Nonsense-mediated RNA decay",
    "aka": [
      "nonsense-mediated decay",
      "NMD"
    ],
    "tldr": "A cell can reduce some RNA messages when translation stops in an unexpected context. A predicted early stop does not guarantee that every message or protein disappears.",
    "summary": "Nonsense-mediated decay is RNA surveillance coupled to translation termination. Splicing can leave exon junction protein complexes near later joins in the message. Translation can remove junction-associated proteins; early termination while an appropriate complex remains downstream can help recruit decay machinery in one human route. Stop position, exon architecture, proximity to the start and other transcript features affect susceptibility. A common junction-distance shortcut is a hypothesis, not a universal clinical cutoff.",
    "notes": [
      "Human-cancer analyses found that a model containing several rules described RNA effects better than the junction rule alone; compensation could mask loss at gene level. Test the relevant transcript or allele with controls for RNA quality and cell mixture. Protein identity, persistence and function need separate measurements: RNA decay is distinct from protein degradation."
    ],
    "links": [
      {
        "label": "The exon-exon junction complex provides a binding platform for factors involved in mRNA export and nonsense-mediated mRNA decay.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11532962/"
      },
      {
        "label": "Translation is required to remove Y14 from mRNAs in the cytoplasm.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12121612/"
      },
      {
        "label": "Intron function in the nonsense-mediated decay of beta-globin mRNA: indications that pre-mRNA splicing in the nucleus can influence mRNA translation in the cytoplasm.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9671053/"
      },
      {
        "label": "The rules and impact of nonsense-mediated mRNA decay in human cancers.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27618451/"
      }
    ],
    "related": [
      "rna",
      "rna-splicing",
      "mutation",
      "gene-expression",
      "protein"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "vdj-recombination",
    "name": "V(D)J recombination and receptor assembly",
    "aka": [
      "V(D)J recombination",
      "VDJ recombination",
      "VJ recombination",
      "RAG-mediated recombination"
    ],
    "tldr": "Developing lymphocytes assemble receptor genes from selected DNA segments. Making a receptor is separate from showing what it recognizes or whether it produces a useful response.",
    "summary": "Variable, diversity and joining segments provide the V, D and J names. Antibody heavy and conventional T-cell-receptor beta chains use VDJ arrangements; antibody light and T-cell-receptor alpha chains use VJ. RAG1/RAG2 recognize recombination signals and initiate DNA cutting; classical non-homologous end-joining repair machinery processes and joins coding ends, adding sequence diversity. Purified-protein cutting experiments and RAG1-deficient mouse experiments established distinct mechanistic requirements. RAG proteins are not the general repair machinery for every DNA break.",
    "notes": [
      "Rearrangement occurs in developing lymphocyte lineages, rather than changing receptor genes in every body cell. Some joins are unproductive; expression and developmental selection are further steps. Later antibody mutation and class switching are different processes.",
      "Receptor sequence or clonality does not establish antigen specificity, tumor recognition or malignant diagnosis. RAG RNA/protein presence alone does not establish active recombination."
    ],
    "links": [
      {
        "label": "Cleavage at a V(D)J recombination signal requires only RAG1 and RAG2 proteins and occurs in two steps.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8521468/"
      },
      {
        "label": "RAG-1-deficient mice have no mature B and T lymphocytes.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1547488/"
      },
      {
        "label": "Immunoglobulin and T Cell Receptor Genes: IMGT(®) and the Birth and Rise of Immunoinformatics.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24600447/"
      },
      {
        "label": "EuroClonality/BIOMED-2 guidelines for interpretation and reporting of Ig/TCR clonality testing in suspected lymphoproliferations.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22918122/"
      },
      {
        "label": "Arnal and colleagues: RAG post-cleavage complexes and repair-pathway access",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20139091/"
      }
    ],
    "related": [
      "clonality-testing",
      "ig-tcr-clonality",
      "receptor",
      "gene",
      "germinal-centre-reaction"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "protein-structure-and-domains",
    "name": "Protein structure, domains and model confidence",
    "aka": [
      "protein structure",
      "protein domain",
      "protein motif",
      "protein interface",
      "intrinsically disordered region",
      "pLDDT",
      "predicted aligned error",
      "PAE"
    ],
    "tldr": "A protein’s sequence, folded regions and contacts describe different features. A confident prediction of one region does not establish the whole molecule’s arrangement or function.",
    "summary": "Primary structure describes sequence; secondary structure describes local arrangements; tertiary structure describes a chain’s organization; quaternary structure describes assembly between chains. These are levels of description, rather than four obligatory stages. A domain is a recognizable structural unit; a motif is a recurring sequence or structural pattern. An interface is a contact surface and can combine residues far apart in sequence. Intrinsically disordered regions can have normal functions without one stable isolated fold.",
    "notes": [
      "Experimental structures reflect particular preparations and conditions, and may omit flexible regions. In AlphaFold2, pLDDT concerns local structural confidence, while predicted aligned error helps assess uncertainty in relative region placement. A confident domain cannot certify a proposed inter-domain pocket or contact. Neither score measures binding affinity, protein abundance, a variant’s functional effect or clinical benefit."
    ],
    "links": [
      {
        "label": "EMBL-EBI: domains, motifs and disorder",
        "url": "https://www.ebi.ac.uk/training/online/courses/proteins-domains/domains-motifs-and-regions/"
      },
      {
        "label": "EMBL-EBI: AlphaFold2 confidence measures",
        "url": "https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/"
      },
      {
        "label": "OpenStax Biology 2e: 3-4-proteins",
        "url": "https://openstax.org/books/biology-2e/pages/3-4-proteins"
      },
      {
        "label": "EMBL-EBI: pLDDT local confidence",
        "url": "https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/plddt-understanding-local-confidence/"
      },
      {
        "label": "EMBL-EBI: PAE and relative-region uncertainty",
        "url": "https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/pae-a-measure-of-global-confidence-in-alphafold-predictions/"
      }
    ],
    "related": [
      "protein",
      "structural-biology-infrastructure",
      "binding-affinity-and-kinetics"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "binding-affinity-and-kinetics",
    "name": "Binding affinity, occupancy and enzyme kinetics",
    "aka": [
      "binding affinity",
      "dissociation constant",
      "Kd",
      "receptor occupancy",
      "Michaelis constant",
      "Km",
      "enzyme turnover"
    ],
    "tldr": "Binding strength, the fraction of sites occupied and the speed of a reaction describe different things. Each measurement needs its experimental conditions.",
    "summary": "For a simple reversible binding equilibrium, Kd is the product of free partner concentrations divided by complex concentration; lower Kd means tighter binding under those conditions. For identical independent sites with one ligand and no competition, fractional occupancy is L / (Kd + L), where L is free ligand concentration. Half occupancy occurs at L = Kd in that model. Total added ligand need not equal free ligand. Affinity for one partner does not establish specificity against other partners.",
    "notes": [
      "For a suitable Michaelis-Menten enzyme model, Km is the substrate concentration at half the maximum initial reaction rate. It depends on the catalytic mechanism and conditions and is not generally Kd. Turnover concerns reaction cycling, not binding strength.",
      "IC50 is half inhibition of a specified assay response; EC50 describes half of a defined functional response change. Substrate/ATP concentrations, enzyme or receptor amount, timing and assay design affect these measures. A biochemical inhibition value, a cell-growth value and a clinical outcome are separate evidence."
    ],
    "links": [
      {
        "label": "A guide to simple, direct, and quantitative in vitro binding assays.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31453222/"
      },
      {
        "label": "Operational models of pharmacological agonism.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6141562/"
      },
      {
        "label": "IUPAC: affinity and pharmacological efficacy",
        "url": "https://iupac.qmul.ac.uk/medchem/ah.html"
      },
      {
        "label": "OpenStax Biology 2e: 6-5-enzymes",
        "url": "https://openstax.org/books/biology-2e/pages/6-5-enzymes"
      },
      {
        "label": "Classroom model and derivation of Michaelis-Menten parameters; not an enzyme experiment",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17146042/"
      }
    ],
    "related": [
      "enzyme",
      "ligand",
      "receptor",
      "agonist-antagonist",
      "drug-response-sensitivity",
      "receptor-reserve"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "feedback-and-feedforward",
    "name": "Feedback, feedforward and signaling dynamics",
    "aka": [
      "negative feedback",
      "positive feedback",
      "feedforward loop",
      "signal adaptation",
      "signaling dynamics"
    ],
    "tldr": "A signal can change the circuit that produced it. Returning inhibition, returning reinforcement and a separate forward route can create different responses over time.",
    "summary": "Negative feedback returns a restraining effect to an upstream process; positive feedback reinforces it. These names describe direction, not clinical desirability. Feedforward sends an input through direct and indirect routes to an output without a returning connection. Connections, delays and cell state can produce transient, sustained or oscillating behavior. A positive loop does not always make an irreversible switch, and rebound need not require a new mutation.",
    "notes": [
      "Santos and colleagues altered feedback arrangements in a PC12 differentiation model, demonstrating that input context can change network dynamics and cell response. O’Reilly and colleagues examined released feedback after mTOR inhibition in cancer models with patient-tumor pharmacodynamic observations. Neither study establishes universal tumor wiring or combination-treatment benefit.",
      "Use time-resolved measurements and controlled perturbation of the proposed connection, with exposure and viability controls. Similar curves can arise from different circuits; a diagram or one late signal cannot identify the mechanism."
    ],
    "links": [
      {
        "label": "Growth factor-induced MAPK network topology shapes Erk response determining PC-12 cell fate.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17310240/"
      },
      {
        "label": "mTOR inhibition induces upstream receptor tyrosine kinase signaling and activates Akt.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16452206/"
      },
      {
        "label": "Structure and function of the feed-forward loop network motif.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/14530388/"
      }
    ],
    "related": [
      "signalling-pathway",
      "phosphorylation",
      "kinase",
      "gene-expression",
      "resistance"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "receptor-reserve",
    "name": "Receptor reserve and system-dependent response",
    "aka": [
      "spare receptors",
      "receptor reserve",
      "signal amplification and occupancy"
    ],
    "tldr": "A cell can sometimes reach its largest measured response without occupying every receptor. Receptor amount and downstream amplification help determine that response.",
    "summary": "Receptor reserve describes a system in which maximal functional response can be obtained before all available receptors are occupied. Occupancy and response can therefore have different concentration-response curves. Operational receptor models separate binding, receptor abundance or activation, and downstream transduction. An EC50 lower than a binding Kd is not on its own evidence of tighter binding. Changing receptor expression or amplification can alter apparent potency and the observed maximum of a partial agonist.",
    "notes": [
      "Black and Leff developed an operational model; the later two-state model explicitly separates binding, activation and amplification and examines receptor-reserve data. These are quantitative pharmacology frameworks, not clinical dose-selection rules. Testing reserve requires functional and binding evidence or controlled changes in receptor availability with appropriate model checks."
    ],
    "links": [
      {
        "label": "Operational models of pharmacological agonism.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6141562/"
      },
      {
        "label": "A Receptor Model With Binding Affinity, Activation Efficacy, and Signal Amplification Parameters for Complex Fractional Response Versus Occupancy Data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31244653/"
      }
    ],
    "related": [
      "binding-affinity-and-kinetics",
      "agonist-antagonist",
      "receptor",
      "biased-agonism"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "biased-agonism",
    "name": "Biased agonism and pathway-dependent receptor response",
    "aka": [
      "ligand bias",
      "agonist bias",
      "biased agonism",
      "functional selectivity at receptors"
    ],
    "tldr": "Two ligands at the same receptor can favor measured response pathways differently. That comparison depends on the reference ligand, assays and cellular system.",
    "summary": "Biased agonism compares the relative signaling behavior of ligands across specified outputs at the same receptor. Binding, intrinsic receptor activation, pathway amplification and baseline activity can contribute differently to observed curves. A potency difference between two assays does not by itself isolate ligand-specific bias. Preserve the reference ligand, endpoints, receptor expression, timing and model assumptions used to estimate it.",
    "notes": [
      "Ehlert and colleagues’ methods analyzed receptor-state affinities and pathway sensitivity using analytical proofs, simulations and previously published data. The constitutively active-mutant approach assumes that the mutation changes receptor-state equilibrium without changing ligand affinities and requires checking that assumption. These method studies do not establish clinical superiority of a biased ligand or validate every cellular assay."
    ],
    "links": [
      {
        "label": "Estimation of ligand affinity constants for receptor states in functional studies involving the allosteric modulation of G protein-coupled receptors: implications for ligand bias.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24434717/"
      },
      {
        "label": "Estimation of the receptor-state affinity constants of ligands in functional studies using wild type and constitutively active mutant receptors: Implications for estimation of agonist bias.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27725245/"
      },
      {
        "label": "A Receptor Model With Binding Affinity, Activation Efficacy, and Signal Amplification Parameters for Complex Fractional Response Versus Occupancy Data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31244653/"
      }
    ],
    "related": [
      "receptor-reserve",
      "binding-affinity-and-kinetics",
      "agonist-antagonist",
      "signalling-pathway"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "gene-regulatory-elements",
    "name": "Promoters, enhancers and transcription factors",
    "aka": [
      "gene regulatory elements",
      "promoter",
      "enhancer",
      "transcription factor"
    ],
    "tldr": "Genes are regulated through DNA regions, binding proteins and cellular context. A bound regulator or accessible DNA region does not prove that a gene’s output changed.",
    "summary": "A promoter is a DNA region where transcription machinery assembles. Enhancers influence transcription through regulatory interactions, sometimes across a long linear distance brought together in three-dimensional space. Transcription factors recognize sequence features and participate in regulatory networks. Chromatin state and cellular partners affect access and function. Regulation also occurs through RNA processing and removal, translation, and protein modification or turnover.",
    "notes": [
      "RNA measurements, chromatin accessibility, protein occupancy and reporter activity answer different questions. Binding or an open region alone does not establish regulation of a particular gene. Controlled perturbation can test a proposed causal connection, with controls for indirect effects and assay context."
    ],
    "links": [
      {
        "label": "NHGRI: promoter",
        "url": "https://www.genome.gov/genetics-glossary/Promoter"
      },
      {
        "label": "OpenStax: eukaryotic transcription regulation",
        "url": "https://openstax.org/books/biology-2e/pages/16-4-eukaryotic-transcription-gene-regulation"
      },
      {
        "label": "Lambert and colleagues: The Human Transcription Factors (review and catalog)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29425488/"
      }
    ],
    "related": [
      "gene",
      "gene-expression",
      "epigenetic-marks",
      "rna-splicing"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "central-dogma-information-flow",
    "name": "Central dogma and molecular information flow",
    "aka": [
      "central dogma",
      "DNA to RNA to protein"
    ],
    "tldr": "DNA copying, making RNA and making a protein are different processes. Following the route helps identify what each molecular test actually measured.",
    "summary": "Replication makes DNA from DNA. Transcription uses a DNA template to make RNA. Translation reads the coding sequence of a message in three-base codons to build a polypeptide; the transcript and reading frame matter. Functional noncoding RNAs do not need to become protein. Reverse transcription copies RNA into DNA in relevant viral and retrotransposon contexts. This information-flow map is not a guarantee that every DNA change produces a measured RNA or protein change.",
    "notes": [
      "RNA processing, translation, folding, modification, localization and turnover can alter the path from a coding sequence to a functional product. DNA presence, RNA abundance, intact protein, location and activity require their own evidence. Neither a gene-level RNA count nor a sequence prediction establishes a fixed protein amount or clinical effect."
    ],
    "links": [
      {
        "label": "NHGRI: RNA, coding/noncoding functions and reverse transcription",
        "url": "https://www.genome.gov/about-genomics/educational-resources/fact-sheets/ribonucleic-acid-fact-sheet"
      },
      {
        "label": "NHGRI: codon",
        "url": "https://www.genome.gov/genetics-glossary/Codon"
      },
      {
        "label": "NHGRI: transcription",
        "url": "https://www.genome.gov/genetics-glossary/Transcription"
      },
      {
        "label": "OpenStax: regulation across molecular steps",
        "url": "https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression"
      }
    ],
    "related": [
      "dna-term",
      "gene",
      "rna",
      "protein",
      "gene-expression",
      "nonsense-mediated-decay"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  }
];
