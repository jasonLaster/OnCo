/**
 * Targets for the company pipeline products of 3 November 2026 (src/data/company-pipeline-gap.ts): the proteins that
 * those small molecules' own sources name but that had no target record, so the open drug engine listed the
 * medicines under "Not placed" (src/lib/modular.ts reads a medicine's targets field first).
 *
 * Sources, and nothing else: identifiers, approved names and aliases from the HGNC REST API
 * (rest.genenames.org/fetch/symbol/<SYMBOL>, read 3 November 2026); the protein's function paraphrased from the UniProt
 * REST API function comment for the accession HGNC lists (rest.uniprot.org/uniprotkb/<ACC>.json); the cancer rationale
 * from one paper per target, resolved through Europe PMC and read in its abstract before use, linked on the record;
 * the medicines from the OnCo drug records that name the protein in their mechanism. No prevalence rows: none of these
 * sources gives a positivity rate. Cancers are those the paper or the linked drug records name.
 *
 * CDK11 is encoded by two near-identical genes, CDK11A and CDK11B, and the drug's source says only "CDK11", so the
 * record is composite: no single gene id on it, both genes in src/data/target-xrefs.ts. Left without a target: CID-078
 * (blocks a cyclin A and B binding interaction, not one protein), CP-383 and DFP-11207 (the sources name a pathway, not
 * a protein), GIM-531 (a cell population), WD-930 and ATX-898 (target not disclosed), and the live biotherapeutics.
 * Registered in src/data/index.ts as `targetsPipelineGap`.
 */
import type { TargetInput } from "@/lib/schema";

const asOf = "2026-11-03";
const HGNC = (id: string) => `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${id}`;
const UNIPROT = (acc: string) => `https://www.uniprot.org/uniprotkb/${acc}/entry`;
const GENE = (id: string) => `https://www.ncbi.nlm.nih.gov/gene/${id}`;
const DOI = (doi: string) => `https://doi.org/${doi}`;
const provenance = { editedBy: "OnCo gap audit, class 5 targets (HGNC REST, UniProt REST, Europe PMC, corpus drug records)", editedOn: asOf };
const tags = ["pipeline-gap-target"];
const NO_PREVALENCE = "Prevalence not recorded: HGNC, UniProt and the paper cited give no positivity rate.";

type T = Omit<TargetInput, "kind" | "asOf" | "provenance" | "tags" | "role">;
const t = (x: T): TargetInput => ({
  kind: "target", asOf, provenance, tags, role: ["drug-target"],
  ...x,
  links: [
    ...(x.hgnc ? [{ label: `HGNC ${x.hgnc}`, url: HGNC(x.hgnc) }] : []),
    ...(x.uniprot ? [{ label: `UniProt ${x.uniprot}`, url: UNIPROT(x.uniprot) }] : []),
    ...(x.entrez ? [{ label: `NCBI Gene ${x.entrez}`, url: GENE(x.entrez) }] : []),
    ...(x.links ?? []),
  ],
  notes: [NO_PREVALENCE, ...(x.notes ?? [])],
});

export const targetsPipelineGap: TargetInput[] = [
  t({ id: "plk4", name: "PLK4", symbol: "PLK4", aka: ["polo like kinase 4", "polo-like kinase 4", "STK18"], hgnc: "HGNC:11397", ensembl: "ENSG00000142731", uniprot: "O00444", entrez: "10733", targetClass: "kinase",
    tldr: "PLK4 is the enzyme that starts the copying of the centrosome, the structure that organises a dividing cell's spindle. Cancers with extra copies of the TRIM37 gene cannot divide properly once PLK4 is blocked, and two PLK4 inhibitors are in early trials.",
    summary: "PLK4 (chromosome 4q28.1) is a serine/threonine kinase with a central role in centriole duplication: it triggers the formation of a new centriole on the parent one, and when overexpressed it can drive centrosome amplification (UniProt O00444). A 2020 Nature study found that after PLK4 inhibition cells divide without centrosomes, and that high levels of the ubiquitin ligase TRIM37 stop this centrosome-free spindle assembly, causing mitotic failure; the TRIM37 region on chromosome 17q is frequently amplified in neuroblastoma and breast cancer, which made those cancers highly sensitive to PLK4 inhibition in that work (Meitinger et al.,doi:10.1038/s41586-020-2710-1). In OnCo, CFI-400945 is tested in myeloid cancers and breast cancer, and RP-1664 is described by its developer as a synthetic-lethal PLK4 inhibitor linked to TRIM37 overexpression.",
    biology: "Kinase that initiates procentriole formation on the parental centriole and recruits centriole-building proteins such as SASS6 and CPAP; overexpression produces multiple procentrioles per parent centriole (UniProt O00444).",
    whereFound: ["Cancers with TRIM37 (chromosome 17q) gain, including neuroblastoma and breast cancer, in preclinical work (doi:10.1038/s41586-020-2710-1)", "Myeloid cancers and breast cancer (CFI-400945 trials)"],
    cancers: ["neuroblastoma", "breast-cancer", "aml", "mds"], drugs: ["cfi-400945", "rp-1664"],
    links: [{ label: "TRIM37 controls cancer-specific vulnerability to PLK4 inhibition (Nature 2020)", url: DOI("10.1038/s41586-020-2710-1") }] }),

  t({ id: "hpk1", name: "HPK1 (MAP4K1)", symbol: "MAP4K1", aka: ["HPK1", "hematopoietic progenitor kinase 1", "mitogen-activated protein kinase kinase kinase kinase 1"], hgnc: "HGNC:6863", ensembl: "ENSG00000104814", uniprot: "Q92918", entrez: "11184", targetClass: "kinase",
    tldr: "HPK1 is a brake inside immune cells: it dampens a T cell's response once the cell has recognised its target. Blocking it is meant to let T cells attack a tumour harder, and an HPK1 inhibitor is in an early trial, alone and with a checkpoint antibody.",
    summary: "MAP4K1, better known as HPK1 (hematopoietic progenitor kinase 1, chromosome 19q13.2), is a serine/threonine kinase of the MAP4K family that acts upstream of the JUN N-terminal kinase pathway and may help regulate blood-cell lineage decisions (UniProt Q92918). Its expression is restricted to blood-forming cells. In mice, T cells lacking HPK1 made more Th1 cytokines after T-cell receptor engagement, proliferated faster, resisted suppression by prostaglandin E2, and protected recipients against lung tumour growth after adoptive transfer; dendritic cells lacking it presented antigen better (Immunologic Research 2012, doi:10.1007/s12026-012-8319-1). In OnCo, CFI-402411 is an oral HPK1 inhibitor tested alone and with pembrolizumab in advanced solid tumours.",
    biology: "Hematopoietic cell-restricted MAP4K family serine/threonine kinase; a negative regulator of T-cell receptor signalling in the cited mouse studies, so inhibition is an immune-activating rather than a tumour-cell-killing strategy.",
    whereFound: ["T cells, B cells and dendritic cells (blood-forming lineage only)", "Advanced solid tumours (CFI-402411 trial, with pembrolizumab)"],
    cancers: ["metastatic-cancer"], drugs: ["cfi-402411"],
    links: [{ label: "HPK1 as a novel target for cancer immunotherapy (Immunol Res 2012)", url: DOI("10.1007/s12026-012-8319-1") }] }),

  t({ id: "parg", name: "PARG", symbol: "PARG", aka: ["poly(ADP-ribose) glycohydrolase"], hgnc: "HGNC:8605", ensembl: "ENSG00000227345", uniprot: "Q86W56", entrez: "8505", targetClass: "enzyme",
    tldr: "PARG clears away the poly(ADP-ribose) chains that PARP enzymes lay down at damaged DNA. Blocking it is meant to deepen the replication stress some cancers already live with, as a partner or alternative to PARP inhibitors; two PARG inhibitors are in trials.",
    summary: "PARG (chromosome 10q11.23) is the enzyme that degrades poly(ADP-ribose) by cutting the bonds between its ribose units; the poly(ADP-ribose) made after DNA damage lasts only briefly because PARG removes it rapidly (UniProt Q86W56). A 2020 review in Genes & Development describes PARG inhibitors as exploiting and exacerbating the replication deficiencies of cancer cells and as possible complements to PARP inhibitors, which act through synthetic lethality with mutations in DNA repair genes (Slade, doi:10.1101/gad.334516.119). In OnCo, DAT-2645 is an oral PARG inhibitor for tumours with BRCA1/2 loss of function or other DNA repair defects, and ETX-19477 an oral PARG inhibitor aimed at replication stress and fork-protection defects.",
    biology: "Mainly an exo-glycohydrolase that releases ADP-ribose from poly(ADP-ribose) chains; it cannot remove the last ADP-ribose attached to a protein (UniProt Q86W56). It reverses what PARP1 and PARP2 build at DNA lesions.",
    whereFound: ["Tumours with BRCA1/2 loss of function or other DNA repair defects (DAT-2645)", "Tumours with replication stress or fork-protection defects (ETX-19477)"],
    cancers: ["metastatic-cancer"], drugs: ["dat-2645", "etx-19477"], related: ["parp"],
    links: [{ label: "PARP and PARG inhibitors in cancer treatment (Genes Dev 2020)", url: DOI("10.1101/gad.334516.119") }] }),

  t({ id: "lsd1", name: "LSD1 (KDM1A)", symbol: "KDM1A", aka: ["LSD1", "lysine-specific demethylase 1", "lysine demethylase 1A", "AOF2"], hgnc: "HGNC:29079", ensembl: "ENSG00000004487", uniprot: "O60341", entrez: "23028", targetClass: "enzyme",
    tldr: "LSD1 is an enzyme that removes small chemical tags from the proteins DNA is wound around, switching genes off or on. Many cancers carry a lot of it and it helps keep leukaemia cells immature; several LSD1 inhibitors have been tested in blood cancers and solid tumours.",
    summary: "KDM1A, usually called LSD1 (chromosome 1p36.12), is a FAD-dependent histone demethylase that removes methyl groups from lysine 4 and lysine 9 of histone H3, acting as a corepressor or coactivator depending on its partners; on nucleosomes it needs the CoREST complex (UniProt O60341). A 2023 review in Frontiers in Pharmacology states that LSD1 is overexpressed in many cancers, including breast, gastric, prostate, hepatocellular and oesophageal cancer and acute myeloid leukaemia, where it blocks differentiation and increases proliferation, migration and invasiveness, and that nine LSD1 inhibitors had entered clinical trials, among them iadademstat and bomedemstat (doi:10.3389/fphar.2023.1120911). In OnCo, REC-4539 is described by its developer as a reversible, brain-penetrant LSD1 inhibitor; the technology record lsd1-inhibitors covers the class.",
    biology: "Flavin-dependent amine oxidase that demethylates mono- and dimethylated H3K4 (a mark of active genes) and, with partners, H3K9; it also acts on non-histone proteins (UniProt O60341).",
    whereFound: ["Acute myeloid leukaemia and several solid tumours (overexpression, doi:10.3389/fphar.2023.1120911)", "Small cell lung cancer and AML (REC-4539 trial)"],
    cancers: ["aml", "sclc"], technologies: ["lsd1-inhibitors"], drugs: ["rec-4539"],
    links: [{ label: "LSD1 inhibitors for cancer treatment (Front Pharmacol 2023)", url: DOI("10.3389/fphar.2023.1120911") }] }),

  t({ id: "cdc7", name: "CDC7", symbol: "CDC7", aka: ["cell division cycle 7", "CDC7 kinase", "DDK"], hgnc: "HGNC:1745", ensembl: "ENSG00000097046", uniprot: "O00311", entrez: "8317", targetClass: "kinase",
    tldr: "CDC7 is the kinase that switches on the starting points of DNA copying in each cell cycle. Cancer cells starved of it attempt to copy their DNA anyway and die, while normal cells pause; a CDC7 inhibitor is in trials for acute myeloid leukaemia and myelodysplastic syndromes.",
    summary: "CDC7 (chromosome 1p22.1) is a kinase involved in the initiation of DNA replication: it phosphorylates substrates such as the MCM proteins and claspin that control the G1/S transition (UniProt O00311). In a 2004 Cancer Research study, lowering CDC7 in a range of tumour cell lines caused an abortive S phase and cell death, whereas normal fibroblasts were protected by a p53-dependent checkpoint that stopped them entering a lethal S phase; the authors proposed this checkpoint is defective in cancer cells (Montagnoli et al., doi:10.1158/0008-5472.CAN-04-1547). In OnCo, SGR-2921 is a CDC7 inhibitor in a phase 1 trial in acute myeloid leukaemia and myelodysplastic syndromes.",
    biology: "Kinase that phosphorylates MCM proteins and claspin, substrates that regulate the G1/S transition and the start of DNA replication (UniProt O00311).",
    whereFound: ["Acute myeloid leukaemia and myelodysplastic syndromes (SGR-2921 trial)", "Tumour cell lines in preclinical work (doi:10.1158/0008-5472.CAN-04-1547)"],
    cancers: ["aml", "mds"], drugs: ["sgr-2921"],
    links: [{ label: "Cdc7 inhibition reveals a p53-dependent replication checkpoint that is defective in cancer cells (Cancer Res 2004)", url: DOI("10.1158/0008-5472.CAN-04-1547") }] }),

  t({ id: "kif18a", name: "KIF18A", symbol: "KIF18A", aka: ["kinesin family member 18A", "kinesin-8"], hgnc: "HGNC:29441", ensembl: "ENSG00000121621", uniprot: "Q8NI77", entrez: "81930", targetClass: "other",
    tldr: "KIF18A is a motor protein that keeps chromosomes lined up during cell division. Tumour cells with unstable chromosome numbers depend on it while normal cells largely do not, which is the case for the KIF18A inhibitors now in early trials.",
    summary: "KIF18A (chromosome 11p14.1) is a microtubule-depolymerising kinesin that damps chromosome movements during division so they line up at the spindle equator (UniProt Q8NI77). A 2021 Nature Communications study found KIF18A is required for proliferation of chromosomally unstable cells derived from triple-negative breast and colorectal tumours but not of near-diploid cells; inhibiting it caused mitotic delays, multipolar spindles and cell death in the unstable cells (Marquis et al., doi:10.1038/s41467-021-21447-2). In OnCo, ATX-295 is a KIF18A inhibitor in a phase 1 trial including ovarian and non-small cell lung cancer.",
    biology: "Plus-end-directed kinesin-8 motor that shortens kinetochore microtubules, reducing chromosome oscillations before anaphase (UniProt Q8NI77).",
    whereFound: ["Chromosomally unstable tumours, including cell lines from triple-negative breast and colorectal cancer (doi:10.1038/s41467-021-21447-2)", "Ovarian and non-small cell lung cancer (ATX-295 trial)"],
    cancers: ["ovarian", "nsclc", "tnbc", "colorectal"], drugs: ["atx-295"],
    links: [{ label: "Chromosomally unstable tumor cells specifically require KIF18A for proliferation (Nat Commun 2021)", url: DOI("10.1038/s41467-021-21447-2") }] }),

  t({ id: "cdk11", name: "CDK11", aka: ["cyclin dependent kinase 11", "CDK11A", "CDK11B", "PITSLRE"], targetClass: "kinase",
    tldr: "CDK11 is an enzyme that helps the cell's splicing machinery cut and join its gene messages correctly. Blocking it leaves messages unfinished; one CDK11 inhibitor is in preclinical development.",
    summary: "CDK11 is encoded by two near-identical genes on chromosome 1p36.33, CDK11A and CDK11B (HGNC). CDK11B is a cyclin-dependent kinase that regulates transcription and pre-mRNA splicing: it phosphorylates the splicing factor SF3B1 so the spliceosome can become active, and phosphorylates RNA polymerase II (UniProt P21127). A 2022 Nature study showed that inhibiting CDK11 with the selective inhibitor OTS964 stops the spliceosome moving from its precatalytic to its activated form and leads to widespread intron retention (Hluchý et al., doi:10.1038/s41586-022-05204-z). In OnCo, ACR-6840 is a preclinical CDK11 inhibitor from Acrivon's cell-cycle programme.",
    biology: "Cyclin-dependent kinase with several isoforms, one of them expressed specifically in the G2 and M phases of the cell cycle (UniProt P21127). Because the two genes are near-identical, the record carries both in its cross-references and no single gene id.",
    whereFound: ["Solid tumours (ACR-6840, preclinical)"],
    cancers: ["metastatic-cancer"], drugs: ["acr-6840"],
    links: [{ label: "HGNC HGNC:1730 (CDK11A)", url: HGNC("HGNC:1730") }, { label: "HGNC HGNC:1729 (CDK11B)", url: HGNC("HGNC:1729") }, { label: "UniProt P21127 (CDK11B)", url: UNIPROT("P21127") }, { label: "CDK11 regulates pre-mRNA splicing by phosphorylation of SF3B1 (Nature 2022)", url: DOI("10.1038/s41586-022-05204-z") }] }),

  t({ id: "alc1", name: "ALC1 (CHD1L)", symbol: "CHD1L", aka: ["ALC1", "amplified in liver cancer 1", "chromodomain helicase DNA binding protein 1 like"], hgnc: "HGNC:1916", ensembl: "ENSG00000131778", uniprot: "Q86WJ1", entrez: "9557", targetClass: "enzyme",
    tldr: "ALC1 loosens packed DNA at sites of damage so it can be repaired. Cancers that already lack the BRCA repair route, such as some breast and ovarian cancers, lean on it, and losing it made such cells far more sensitive to PARP inhibitors in the laboratory; an ALC1 inhibitor is in early trials.",
    summary: "CHD1L, known as ALC1 (chromosome 1q21.1), is an ATP-dependent chromatin remodeller recruited to DNA damage through poly(ADP-ribose); it slides nucleosomes away from DNA breaks and helps remove PARP2 from chromatin (UniProt Q86WJ1). A CRISPR screen published in Nature Cell Biology in 2021 identified ALC1 as a key determinant of PARP inhibitor toxicity in homologous recombination-deficient cells: its loss reduced the viability of BRCA-mutant cells and raised their sensitivity to PARP inhibitors by up to 250-fold while overcoming several resistance mechanisms (Verma et al.,doi:10.1038/s41556-020-00624-3). In OnCo, EIS-12656 is an oral, brain-penetrant allosteric ALC1 inhibitor in a phase 1 trial including breast and ovarian cancer.",
    biology: "ATP-dependent chromatin remodeller whose activity is switched on by binding histones that carry poly(ADP-ribose) at DNA lesions (UniProt Q86WJ1).",
    whereFound: ["Homologous recombination-deficient cancers, including BRCA-mutant breast and ovarian cancer (doi:10.1038/s41556-020-00624-3)", "Breast and ovarian cancer (EIS-12656 trial)"],
    cancers: ["breast-cancer", "ovarian"], drugs: ["eis-12656"], related: ["parp"],
    links: [{ label: "ALC1 links chromatin accessibility to PARP inhibitor response in homologous recombination-deficient cells (Nat Cell Biol 2021)", url: DOI("10.1038/s41556-020-00624-3") }] }),

  t({ id: "ep4", name: "EP4 (PTGER4)", symbol: "PTGER4", aka: ["EP4", "prostaglandin E receptor 4", "EP4 receptor"], hgnc: "HGNC:9596", ensembl: "ENSG00000171522", uniprot: "P35408", entrez: "5734", targetClass: "other",
    tldr: "EP4 is one of the receptors for prostaglandin E2, a signal many tumours release that quietens the immune cells around them. EP4 blockers are meant to lift that suppression, and two are in early trials, one with pembrolizumab.",
    summary: "PTGER4, the EP4 receptor (chromosome 5p13.1), is a receptor for prostaglandin E2 that signals through G(s) proteins to stimulate adenylate cyclase (UniProt P35408). A 2017 Oncoimmunology study described prostaglandin E2 as a powerful immunosuppressor in the tumour microenvironment acting through its four receptors, EP1 to EP4; the oral EP4-specific antagonist E7046 inhibited prostaglandin E2-driven pro-tumour myeloid cells and reduced or rejected established mouse tumours in a manner dependent on myeloid and CD8 T cells (Albu et al., doi:10.1080/2162402X.2017.1338239). In OnCo, INV-1120 is an EP4 antagonist tested alone and with pembrolizumab, and DT-9081 an oral EP4 antagonist aimed at prostaglandin E2 made by COX-2-positive tumours.",
    biology: "G protein-coupled receptor for prostaglandin E2 coupled to G(s) and cyclic AMP (UniProt P35408).",
    whereFound: ["Myeloid cells in the tumour microenvironment (doi:10.1080/2162402X.2017.1338239)", "Advanced solid tumours (INV-1120 and DT-9081 trials)"],
    cancers: ["metastatic-cancer"], drugs: ["inv-1120", "dt-9081"],
    links: [{ label: "EP4 antagonism by E7046 diminishes myeloid immunosuppression (Oncoimmunology 2017)", url: DOI("10.1080/2162402X.2017.1338239") }] }),

  t({ id: "maoa", name: "MAO-A (MAOA)", symbol: "MAOA", aka: ["MAO-A", "monoamine oxidase A"], hgnc: "HGNC:6833", ensembl: "ENSG00000189221", uniprot: "P21397", entrez: "4128", targetClass: "enzyme",
    tldr: "MAO-A is an enzyme best known for breaking down serotonin and other signalling chemicals in the brain; medicines called MAO inhibitors, used for some neurological disorders, block it. Aggressive prostate cancers carry more of it, and a MAO-A inhibitor designed to stay out of the brain is in an early prostate cancer trial.",
    summary: "MAOA (chromosome Xp11.3) is a mitochondrial enzyme that breaks down amine neurotransmitters such as serotonin, producing hydrogen peroxide (UniProt P21397). A 2014 Journal of Clinical Investigation study reported that high-grade, aggressive prostate tumours express more MAOA, that MAOA drove epithelial-to-mesenchymal transition and stabilised HIF1-alpha through reactive oxygen species, and that knocking it down reduced or eliminated prostate tumour growth and metastasis in mouse models (Wu et al., doi:10.1172/JCI70982). In OnCo, ITR-251 is a reversible MAO-A inhibitor with limited ability to cross the blood-brain barrier, in a phase 1 trial in metastatic castration-resistant prostate cancer.",
    biology: "Amine oxidase that breaks down neuroactive and vasoactive amines and prefers serotonin as substrate (UniProt P21397).",
    whereFound: ["High-grade prostate cancer (raised expression, doi:10.1172/JCI70982)", "Metastatic castration-resistant prostate cancer (ITR-251 trial)"],
    cancers: ["prostate", "prostate-mcrpc"], drugs: ["itr-251"],
    links: [{ label: "Monoamine oxidase A mediates prostate tumorigenesis and cancer metastasis (J Clin Invest 2014)", url: DOI("10.1172/JCI70982") }] }),

  t({ id: "dhodh", name: "DHODH", symbol: "DHODH", aka: ["dihydroorotate dehydrogenase"], hgnc: "HGNC:2867", ensembl: "ENSG00000102967", uniprot: "Q02127", entrez: "1723", targetClass: "enzyme",
    tldr: "DHODH is an enzyme cells need to make pyrimidines, the building blocks of DNA and RNA. Blocking it pushed immature leukaemia cells to mature in mouse studies, and a DHODH inhibitor is in an early trial in solid tumours and lymphoma.",
    summary: "DHODH (chromosome 16q22.2) converts dihydroorotate to orotate, a step required for the cell's own (de novo) synthesis of UMP and so of pyrimidine nucleotides (UniProt Q02127). A 2016 Cell study screening for compounds that overcome the differentiation block of acute myeloid leukaemia found that inhibiting DHODH let leukaemia cells mature in human and mouse models, and that DHODH inhibitors reduced leukaemic burden and leukaemia-initiating cells and improved survival in mice (Sykes et al., doi:10.1016/j.cell.2016.08.057). In OnCo, JBZ-001 is an oral DHODH inhibitor in a phase 1 trial in advanced solid tumours and non-Hodgkin lymphoma.",
    biology: "Enzyme that uses a quinone as electron acceptor to make orotate, required for UMP biosynthesis by the de novo pathway (UniProt Q02127).",
    whereFound: ["Acute myeloid leukaemia in preclinical models (doi:10.1016/j.cell.2016.08.057)", "Advanced solid tumours and non-Hodgkin lymphoma (JBZ-001 trial)"],
    cancers: ["aml", "non-hodgkin-lymphoma"], drugs: ["jbz-001"],
    links: [{ label: "Inhibition of dihydroorotate dehydrogenase overcomes differentiation blockade in AML (Cell 2016)", url: DOI("10.1016/j.cell.2016.08.057") }] }),

  t({ id: "ripk2", name: "RIPK2", symbol: "RIPK2", aka: ["receptor interacting serine/threonine kinase 2", "RIP2", "RICK"], hgnc: "HGNC:10020", ensembl: "ENSG00000104312", uniprot: "O43353", entrez: "8767", targetClass: "kinase",
    tldr: "RIPK2 relays alarm signals from the NOD1 and NOD2 sensors that detect bacteria, switching on inflammation. It has been proposed as a cancer target both for its effects on immune cells and, in prostate cancer, for helping tumours spread; a RIPK2 inhibitor is in an early melanoma trial.",
    summary: "RIPK2 (chromosome 8q21.3) is a kinase that is the key effector of the NOD1 and NOD2 bacterial sensors: once recruited it is polyubiquitinated and becomes a scaffold for downstream signalling, modulating innate and adaptive immune responses (UniProt O43353). A 2022 Nature Communications study reported RIPK2 amplified or gained in about 65% of lethal metastatic castration-resistant prostate cancers, found that it stabilises c-Myc through MKK7, and showed that its knockout or inhibition reduced prostate cancer metastasis in models (Yan et al., doi:10.1038/s41467-022-28340-6). In OnCo, OPM-101 is an oral RIPK2 inhibitor that blocks the NOD2/RIPK2 pathway, which its developer says is designed to reprogram immune responses in cancer, in a phase 1 trial in melanoma.",
    biology: "Serine/threonine/tyrosine kinase recruited to NOD1 and NOD2 through CARD-CARD interaction; it forms filaments and is polyubiquitinated by XIAP, BIRC2, BIRC3 and LUBAC, becoming a scaffold for downstream signalling (UniProt O43353).",
    whereFound: ["Metastatic castration-resistant prostate cancer (amplified or gained in about 65%, doi:10.1038/s41467-022-28340-6)", "Melanoma (OPM-101 trial)"],
    cancers: ["prostate-mcrpc", "melanoma"], drugs: ["opm-101"],
    links: [{ label: "RIPK2 stabilizes c-Myc and is a therapeutic target in prostate cancer metastasis (Nat Commun 2022)", url: DOI("10.1038/s41467-022-28340-6") }] }),

  t({ id: "gpr65", name: "GPR65", symbol: "GPR65", aka: ["G protein-coupled receptor 65", "TDAG8"], hgnc: "HGNC:4517", ensembl: "ENSG00000140030", uniprot: "Q8IYL9", entrez: "8477", targetClass: "other",
    tldr: "GPR65 is a sensor on immune cells that detects acidity. Tumours are often acidic, and the idea behind blocking GPR65 is to stop that acidity from turning nearby immune cells into ones that help the tumour; a GPR65 inhibitor is in an early trial.",
    summary: "GPR65 (chromosome 14q31.3) is a proton-sensing G protein-coupled receptor activated by extracellular pH, mainly coupled to G(s) and adenylate cyclase (UniProt Q8IYL9); it is expressed predominantly in immune cells (doi:10.1016/j.bbadis.2021.166288). A 2013 review in Frontiers in Physiology describes the tumour microenvironment as acidic because of glycolytic metabolism, hypoxia and poor perfusion, and the pH-sensing receptors GPR4, GPR65, GPR68 and GPR132 as regulators of cancer cell spread, immune cell function, inflammation and blood vessel formation (Justus et al., doi:10.3389/fphys.2013.00354). In OnCo, PTT-4256 is an oral GPR65 inhibitor; its developer's case is that tumour acidity acts through GPR65 to switch immune cells into a suppressed, pro-tumour state.",
    biology: "Proton-sensing receptor (also called TDAG8) that signals through G(s) and cyclic AMP; it may also bind the glycosphingolipid psychosine (UniProt Q8IYL9).",
    whereFound: ["Immune cells in acidic tumour regions (doi:10.3389/fphys.2013.00354)", "Advanced solid tumours (PTT-4256 trial)"],
    cancers: ["metastatic-cancer"], drugs: ["ptt-4256"],
    links: [{ label: "Acidic tumor microenvironment and pH-sensing G protein-coupled receptors (Front Physiol 2013)", url: DOI("10.3389/fphys.2013.00354") }, { label: "GPR65 (TDAG8) in intestinal inflammation and colitis-associated colorectal cancer (BBA Mol Basis Dis 2022)", url: DOI("10.1016/j.bbadis.2021.166288") }] }),

  t({ id: "akr1c3", name: "AKR1C3", symbol: "AKR1C3", aka: ["aldo-keto reductase family 1 member C3", "HSD17B5"], hgnc: "HGNC:386", ensembl: "ENSG00000196139", uniprot: "P42330", entrez: "8644", targetClass: "enzyme",
    tldr: "AKR1C3 is an enzyme that makes potent male hormones and that some cancers carry in large amounts. Rather than blocking it, prodrugs use it as a key: they stay inactive until AKR1C3 inside a tumour cell converts them into a DNA-damaging drug.",
    summary: "AKR1C3 (chromosome 10p15.1) is a cytosolic aldo-keto reductase that reduces ketosteroids, producing potent androgens such as testosterone (UniProt P42330). A 2019 Clinical Cancer Research study described OBI-3424 as a highly selective prodrug that AKR1C3 converts to a potent DNA-alkylating agent, found AKR1C3 expression much higher in T-lineage than B-lineage acute lymphoblastic leukaemia, and reported prolonged event-free survival in all nine leukaemia xenografts tested (Evans et al., doi:10.1158/1078-0432.CCR-19-0551). In OnCo, AST-3424 (OBI-3424) and AST-001 come from Ascentawits' AKR1C3-activated prodrug platform, designed to kill tumour cells that overexpress the enzyme.",
    biology: "NADPH-dependent reductase with broad ketosteroid substrate specificity (UniProt P42330); in these medicines it is the activating enzyme, not the thing inhibited.",
    whereFound: ["T-lineage acute lymphoblastic leukaemia (higher expression, doi:10.1158/1078-0432.CCR-19-0551)", "Hepatocellular carcinoma and pancreatic cancer (AST-3424 and AST-001 trials)"],
    cancers: ["all-leukemia", "hcc", "pancreatic"], drugs: ["ast-001", "ast-3424"],
    links: [{ label: "OBI-3424, a novel AKR1C3-activated prodrug, in preclinical models of T-ALL (Clin Cancer Res 2019)", url: DOI("10.1158/1078-0432.CCR-19-0551") }] }),
];
