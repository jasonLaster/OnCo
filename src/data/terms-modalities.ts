import type { TermInput } from "@/lib/schema";

/** Drug-class pages for the modality headers of the pivot table and elsewhere. */
const asOf = "2026-09-17";
type T = Omit<TermInput, "kind" | "asOf" | "links"> & { wikipedia?: string; asOf?: string; links?: TermInput["links"] };
const t = (x: T): TermInput => ({ kind: "term", asOf, links: x.wikipedia ? [{ label: "Wikipedia", url: x.wikipedia }] : undefined, ...x });

export const termsModalities: TermInput[] = [
  t({
    id: "small-molecule", name: "Small molecule drug", category: "Treatment jargon",
    aka: ["small molecule", "small molecules", "small-molecule inhibitor", "small-molecule drug", "oral targeted drug", "chemical drug"],
    wikipedia: "https://en.wikipedia.org/wiki/Small_molecule",
    tldr: "Small-molecule medicines can act on intracellular targets, but size alone does not establish cell entry, oral absorption, selectivity or safety.",
    summary: "Many small-molecule medicines can reach targets inside cells, such as kinases and DNA-repair enzymes. Their actual entry, distribution, unbound concentration, metabolism and export depend on the compound and the system. Some are taken by mouth and others are administered by injection; formulation and clinical pharmacology must be checked for the named product.\n\nThe National Cancer Institute distinguishes small-molecule and antibody-based targeted therapies and describes several different mechanisms. A treatment can act on more than one protein, and a target alteration can affect activity or resistance. A chemically defined molecule is not automatically selective, orally available or a useful research probe. Probe fitness, target engagement, functional consequences and clinical benefit require different evidence.",
    technologies: ["kinase-inhibitors", "protac-degrader", "peptide-drug-conjugate", "cytotoxic-chemotherapy"],
    drugs: ["imatinib", "osimertinib", "olaparib", "venetoclax"],
    terms: ["antibody", "monoclonal", "targeted-therapy-term"],
    keyPapers: ["paper-veber-oral-bioavailability-jmedchem-2002"],

"notes": [
  "Small molecules are also the usual research tools for asking what a protein does, and a compound that is good for that question is a chemical probe, not necessarily a medicine; a probe is judged by potency, selectivity and controls, and a medicine also needs evidence in people about product quality, exposure, tolerability and benefit."
],
"asOf": "2026-11-11",
"related": [
  "chemical-probe"
]
,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Small_molecule"
  },
  {
    "label": "NCI: targeted cancer therapies, small-molecule and antibody mechanisms",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies"
  }
]
}),
  t({
    id: "vaccines-and-oncolytic-viruses", name: "Cancer vaccines and oncolytic viruses", category: "Immunology",
    aka: ["therapeutic cancer vaccine", "cancer vaccine", "cancer vaccines", "oncolytic virus therapy", "vaccine or oncolytic", "tumour vaccine"],
    wikipedia: "https://en.wikipedia.org/wiki/Cancer_vaccine",
    tldr: "Cancer vaccines teach the immune system to recognise proteins on tumour cells; oncolytic viruses infect and burst cancer cells while raising the alarm to immunity.",
    summary: "Two kinds of vaccine matter in oncology. Preventive vaccines stop the infections that cause cancer: HPV vaccination prevents most cervical cancers and hepatitis B vaccination prevents many liver cancers. Therapeutic vaccines are given to people who already have cancer and aim to train T cells against tumour proteins. They come in several forms: off-the-shelf vaccines against antigens shared by many tumours, personalised vaccines built from the mutations in one patient's tumour (usually as mRNA), dendritic cell vaccines made from the patient's own immune cells, and bacterial vectors engineered to carry tumour antigens.\n\nOncolytic viruses are a related idea from the other direction. A weakened or engineered virus infects tumour cells preferentially, multiplies inside them and bursts them, releasing tumour antigens and inflammatory signals that draw immune cells in. Talimogene laherparepvec, a modified herpes virus injected into melanoma deposits, was the first to be approved.\n\nFor decades therapeutic vaccines disappointed in late-stage trials, largely because tumours suppress the T cells they raise. The current wave pairs vaccines with checkpoint inhibitors so those T cells can act, and personalised mRNA vaccines are now in phase 3 trials in melanoma and other cancers. Sipuleucel-T, a dendritic cell product for prostate cancer, remains the one approved therapeutic vaccine in the older sense.",
    technologies: ["neoantigen-mrna-vaccine", "shared-antigen-vaccine", "dendritic-cell-vaccines", "bacterial-vector-vaccines", "oncolytic-virus", "hpv-vaccine", "checkpoint-inhibitor"],
    drugs: ["talimogene-laherparepvec", "sipuleucel-t", "intismeran-autogene"],
    cancers: ["melanoma", "prostate", "cervical"],
    terms: ["immunotherapy-term"],
  }),
];
