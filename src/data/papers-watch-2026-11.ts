import type { PaperInput } from "@/lib/schema";

const asOf = "2026-11-03";
type P = Omit<PaperInput, "kind" | "asOf"> & { asOf?: string };
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * Papers added from the landmark-paper watch (scripts/landmark-papers.ts, weekly from 3 November 2026), and the paper
 * whose absence prompted it. Each DOI was resolved through Crossref and its PubMed id through PubMed's own DOI index
 * on the day (Europe PMC's search was unavailable on 3 November); figures and claims are taken from the abstract only.
 *
 * The regulatory T cell paper (owner ask of 1 November 2026, "map new cancer research as it is published"): the abstract
 * states no patient numbers and does not name the PI3K-delta inhibitor used in mice, so the record carries neither.
 */
export const papersWatch202611: PaperInput[] = [
  p({ id: "paper-gamble-preinvasive-treg-axis-lung-cancer-interception-nature-2026", name: "A preinvasive regulatory T cell axis for lung cancer interception",
    tldr: "Before lung cancer becomes invasive, a family of immune-dampening cells (effector regulatory T cells) builds up in the precancerous airway lining and in the blood, and rising levels marked people whose early cancers grew fast. In mice, blocking the PI3K-delta signal these cells depend on reduced lung tumours.",
    summary: "A study led from the UCL Cancer Institute, University College London, of how the T cell network changes as non-small-cell lung cancer develops, in patients with preinvasive lung lesions followed by autofluorescence bronchoscopy and CT imaging. The team profiled immune cells across tissues and blood with several molecular methods.\n\nEffector regulatory CD4 T cells expressing the transcription factor BATF accumulated in high-grade premalignant airway lesions and were clonally related to effector regulatory T cells circulating in the blood. Circulating levels rose as preinvasive lesions progressed, so the process could be followed with a blood sample, and the emergence of this clonally coordinated circuit defined rapid progression in patients whose early-stage cancer was found by CT screening.\n\nIn mice, carcinogen-driven lung tumour formation set up a matching preinvasive regulatory T cell axis across blood, airways and draining lymph nodes, ending in an expansion of BATF-positive regulatory T cells in the lung and in immature tertiary lymphoid structures around the airways rich in them. Inhibiting PI3K-delta prevented those structures forming, lowered regulatory T cells in blood and lung, raised local conventional type 1 dendritic cells (cDC1s) and reduced lung tumour incidence and size. The authors propose the network as a way both to track and to target preinvasive immune regulation for lung cancer interception.",
    journal: "Nature", year: 2026, doi: "10.1038/s41586-026-11066-6", pmid: "42844481",
    authors: "Gamble S, Whiteman ZE, Peinador-Marín C, et al.", paperType: "translational", changedPractice: false,
    findings: [
      "Effector regulatory T cells expressing BATF accumulated in high-grade premalignant airway lesions and were clonally related to effector regulatory T cells in the blood.",
      "Circulating effector regulatory T cells rose progressively during preinvasive progression, allowing lung tumour development to be tracked in peripheral blood.",
      "Emergence of the clonally coordinated effector regulatory T cell circuit defined rapid progression in patients with early-stage non-small-cell lung cancer detected during CT screening.",
      "In carcinogen-exposed mice, PI3K-delta inhibition abrogated regulatory T cell-rich immature tertiary lymphoid structures, reduced circulating and lung regulatory T cells, increased local cDC1 dendritic cells and reduced lung tumour incidence and size.",
    ],
    whatItMeans: "Late-stage lung cancer is rarely curable, so the authors look for ways to act before a cancer becomes invasive. This paper points to two things that could move the fight earlier. First, a blood signal: immune cells that suppress the response to the tumour rise as precancerous airway lesions progress, which could one day help decide which screen-detected nodules or lesions need treatment now. Second, a target: in mice, blocking the PI3K-delta signal these cells use prevented the immune changes and reduced tumours. Neither is a test or a treatment yet; both need trials in people at high risk.",
    caveats: [
      "The interception result (fewer and smaller lung tumours) is in mice only; no prevention trial in people is reported.",
      "The abstract gives no patient numbers, no accuracy figures for the blood signal and does not name the PI3K-delta inhibitor or its dose, so OnCo carries none.",
      "PI3K-delta inhibitors licensed for blood cancers cause immune-related side effects such as colitis and liver inflammation (see the PIK3CD record), which would weigh heavily in healthy people at risk.",
    ],
    links: [{ label: "Nature 2026", url: "https://doi.org/10.1038/s41586-026-11066-6" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/42844481/" }],
    cancers: ["lung-cancer", "nsclc"], targets: ["pik3cd"], technologies: ["low-dose-ct-screening"], pathways: ["tumor-microenvironment"],
    terms: ["t-cell", "tertiary-lymphoid-structures", "dysplasia", "bronchoscopy"], institutions: ["uclh"], journals: ["nature"],
    bottlenecks: ["b-tme-immunosuppression"], related: ["idea-field-interception", "cure-paths"], tags: ["landmark-watch", "interception", "regulatory-t-cells"] }),
];
