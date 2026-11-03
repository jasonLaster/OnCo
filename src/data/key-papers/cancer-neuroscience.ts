import type { PaperInput } from "@/lib/schema";

const asOf = "2026-11-03";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * Hand-checked papers on signalling between the brain, peripheral nerves and tumours.
 * Keep mouse causality, human association and clinical outcomes separate.
 */
export const papersCancerNeuroscience: PaperInput[] = [
  p({
    id: "paper-xiong-brain-tumor-circuit-jci-2023",
    name: "A brain-tumor neural circuit controls breast cancer progression in mice",
    journal: "Journal of Clinical Investigation",
    year: 2023,
    doi: "10.1172/JCI167725",
    pmid: "37847562",
    authors: "Xiong SY, Wen HZ, Dai LM, et al.",
    paperType: "basic",
    changedPractice: false,
    tldr: "In two mouse models of breast cancer, researchers traced a nerve circuit from the brain to nerves inside mammary tumours. Turning the circuit up sped tumour growth and turning it down slowed growth, but this has not been shown in people and does not mean anxiety caused anyone's cancer.",
    summary: "Xiong and colleagues studied an implanted 4T1 mouse mammary tumour model and the spontaneous MMTV-PyMT mouse model. Viral tracing connected sympathetic fibres in the tumour through the lateral paragigantocellular nucleus in the brainstem to corticotropin-releasing hormone neurons in the central medial amygdala.\n\nChemogenetic and optogenetic activation of this amygdala-to-brainstem circuit raised norepinephrine inside 4T1 tumours, changed immune-cell profiles and accelerated tumour growth. Inhibiting or ablating the same neurons produced changes in the opposite direction. The investigators also found that alprazolam reduced circuit activity and slowed mammary tumour growth in the mice.\n\nEvery causal experiment was in mice. The study did not test a human brain-to-cancer circuit, cancer recurrence or survival, and the authors state that clinical benefit remains unshown. Alprazolam is not an established cancer treatment. A separate seven-day preoperative propranolol trial in 60 people found tumour biomarker changes but did not test recurrence or survival, while a 2024 meta-analysis found no significant association between beta-blocker use and breast cancer recurrence or death.",
    findings: [
      "Retrograde viral tracing linked sympathetic fibres in mouse mammary tumours polysynaptically to central medial amygdala corticotropin-releasing hormone neurons through catecholaminergic neurons in the lateral paragigantocellular nucleus.",
      "Activating the circuit increased intratumour norepinephrine, altered immune-cell profiles and accelerated 4T1 tumour growth; suppressing the circuit produced changes in the opposite direction.",
      "The direction of the growth effect was reproduced across several neural interventions, and selected findings were also tested in spontaneous MMTV-PyMT mammary tumours.",
      "Alprazolam slowed tumour growth in both mouse models, but it was not tested as a human cancer treatment.",
    ],
    whatItMeans: "This study provides causal evidence in mice that activity in a defined brain circuit can change a peripheral mammary tumour through autonomic and immune routes. It is a mechanism study, not evidence that anxiety controls human breast cancer and not a treatment recommendation.",
    caveats: [
      "All causal experiments were in mice; there were no human participants or human cancer outcomes.",
      "The viral, chemogenetic and optogenetic interventions do not have a clinical equivalent, and manipulating these brain regions may affect other physiological systems.",
      "The alprazolam result was preclinical. It does not justify using alprazolam, beta-blockers or neurostimulation to treat cancer outside their usual indications or a clinical trial.",
      "The findings do not show that stress, anxiety, thoughts or coping caused a person's cancer, and they should not be used to assign blame.",
      "A separate 2019 autonomic-innervation paper cited by this study was retracted in 2024 and is not used here as supporting evidence.",
    ],
    cancers: ["breast-cancer"],
    pathways: ["cancer-neuroscience", "tumor-microenvironment"],
    technologies: ["nerve-tumour-denervation"],
    related: ["paper-venkatesh-nature", "paper-monje-cell"],
    journals: ["jci"],
    links: [
      { label: "JCI full text", url: "https://www.jci.org/articles/view/167725" },
      { label: "PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10721160/" },
      { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/37847562/" },
      { label: "Hiller et al., seven-day preoperative propranolol biomarker trial", url: "https://doi.org/10.1158/1078-0432.CCR-19-2641" },
      { label: "Scott et al., 2024 beta-blocker outcomes meta-analysis", url: "https://doi.org/10.1007/s10549-024-07263-4" },
      { label: "Retraction notice for the separate 2019 autonomic-innervation paper", url: "https://doi.org/10.1038/s41593-024-01628-0" },
    ],
    tags: ["cancer-neuroscience", "preclinical"],
  }),
];
