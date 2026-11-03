import type { PersonInput } from "@/lib/schema";

/**
 * People: Sweden, added for /countries/se/. Public professional information only; every record carries at least one
 * paper with a DOI or PubMed id resolved through Crossref or Europe PMC.
 *
 * Roles are taken from the affiliation line of the person's most recent indexed papers (PubMed, checked 3 November
 * 2026) or from an official publication, and change over time; treat `role` as indicative. DOIs were resolved through
 * Crossref and PubMed (Europe PMC returned 503 on the day).
 */
const asOf = "2026-11-03";
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleSE: PersonInput[] = [
  p({
    id: "henrik-gronberg", name: "Henrik Grönberg", aka: ["Henrik Gronberg"],
    role: "Department of Medical Epidemiology and Biostatistics, Karolinska Institutet; Department of Surgery, Capio S:t Göran's Hospital, Stockholm",
    institutionId: "karolinska", institutions: ["karolinska", "capio-st-goran"],
    specialisms: ["Prostate cancer screening", "Risk prediction", "Genetic epidemiology"],
    tldr: "A Stockholm prostate cancer researcher who led the STHLM3 study, which built a blood-and-genetics risk score for deciding which men need a prostate biopsy.",
    summary: "Henrik Grönberg was first author of the 2015 Lancet Oncology report of STHLM3, a population-based study in Stockholm men aged 50 to 69 that combined PSA, other plasma proteins, 232 genetic markers and clinical details into a single risk score; at the sensitivity of a PSA cutoff of 3 ng/mL it could have reduced biopsies by 32 percent. Grönberg was a co-author of the STHLM3-MRI screening trial in the New England Journal of Medicine in 2021 and of its two-year follow-up in 2026, and of ALASCCA, the 2025 trial of low-dose aspirin after surgery for colorectal cancer with PI3K pathway alterations. Grönberg's 2026 papers give the affiliations as the Department of Medical Epidemiology and Biostatistics at Karolinska Institutet and the Department of Surgery at Capio S:t Göran's Hospital, and include the protocol of ProBio-mHSPC, a ctDNA-guided platform trial in metastatic hormone-sensitive prostate cancer.",
    profiles: [pm("Grönberg H[Author] AND Karolinska[Affiliation] AND prostate")],
    papers: [
      { title: "Prostate cancer screening in men aged 50-69 years (STHLM3): a prospective population-based diagnostic study", journal: "Lancet Oncology", year: 2015, doi: "10.1016/S1470-2045(15)00361-7" },
      { title: "MRI-targeted or standard biopsy in prostate cancer screening", journal: "New England Journal of Medicine", year: 2021, doi: "10.1056/NEJMoa2100852" },
      { title: "Stockholm3-magnetic resonance imaging population-based prostate cancer screening study: two-year follow-up", journal: "Annals of Internal Medicine", year: 2026, doi: "10.7326/ANNALS-25-04753" },
    ],
    keyPapers: ["paper-gronberg-sthlm3-lancet-oncol-2015", "paper-eklund-sthlm3-mri-nejm-2021", "paper-alascca-n-engl-j-med-2025"],
    trials: ["sthlm3-mri", "alascca"], cancers: ["prostate"], terms: ["psa", "overdiagnosis"], sections: ["early-detection"],
  }),

  p({
    id: "martin-eklund", name: "Martin Eklund",
    role: "Department of Medical Epidemiology and Biostatistics, Karolinska Institutet",
    institutionId: "karolinska", institutions: ["karolinska"],
    specialisms: ["Biostatistics", "Prostate cancer screening", "Risk prediction"],
    tldr: "A Karolinska Institutet statistician and epidemiologist who led the STHLM3-MRI trial, which showed that an MRI scan before biopsy cuts the number of harmless prostate cancers found by screening.",
    summary: "Martin Eklund was first author of STHLM3-MRI in the New England Journal of Medicine in 2021: among 1,532 screened men with a PSA of 3 ng/mL or more, an MRI-guided biopsy pathway found clinically significant cancer in 21 percent against 18 percent with standard biopsy, meeting the non-inferiority margin, while insignificant cancers fell from 12 to 4 percent. Eklund was the last author of the 2015 STHLM3 study, and a co-author of ScreenTrustCAD, the Stockholm study of artificial intelligence as an independent reader of screening mammograms, and of the ALASCCA aspirin trial. Eklund's 2026 papers, from the Department of Medical Epidemiology and Biostatistics at Karolinska Institutet, include the two-year follow-up of the STHLM3-MRI baseline round and a trial of the Stockholm3 test for guiding biopsy in active surveillance.",
    profiles: [pm("Eklund M[Author] AND Karolinska[Affiliation] AND prostate")],
    papers: [
      { title: "MRI-targeted or standard biopsy in prostate cancer screening", journal: "New England Journal of Medicine", year: 2021, doi: "10.1056/NEJMoa2100852" },
      { title: "Prostate cancer screening in men aged 50-69 years (STHLM3): a prospective population-based diagnostic study", journal: "Lancet Oncology", year: 2015, doi: "10.1016/S1470-2045(15)00361-7" },
    ],
    keyPapers: ["paper-eklund-sthlm3-mri-nejm-2021", "paper-gronberg-sthlm3-lancet-oncol-2015", "paper-alascca-n-engl-j-med-2025", "paper-screentrustcad-dembrower-lancet-digit-health-2023"],
    trials: ["sthlm3-mri", "alascca", "screentrustcad"], cancers: ["prostate"], terms: ["psa", "overdiagnosis"], sections: ["early-detection"],
  }),

  p({
    id: "paul-lichtenstein", name: "Paul Lichtenstein",
    role: "Department of Medical Epidemiology and Biostatistics, Karolinska Institutet",
    institutionId: "karolinska", institutions: ["karolinska"],
    specialisms: ["Twin and family register studies", "Genetic epidemiology"],
    tldr: "A Karolinska Institutet epidemiologist who led the Nordic twin study, published in 2000, that estimated how much of common cancer is inherited and found it was a minor share for most cancers.",
    summary: "Paul Lichtenstein was first author of the New England Journal of Medicine paper of 2000 that combined 44,788 twin pairs from the Swedish, Danish and Finnish twin registers, linked to the national cancer registers. It found statistically significant heritability for prostate cancer (42 percent), colorectal cancer (35 percent) and breast cancer (27 percent), and concluded that for most cancers the environment plays the principal role. Lichtenstein's recent indexed papers, from the Department of Medical Epidemiology and Biostatistics at Karolinska Institutet, use the same twin and family registers mainly in psychiatry and behaviour.",
    profiles: [pm("Lichtenstein P[Author] AND Karolinska[Affiliation]")],
    papers: [
      { title: "Environmental and heritable factors in the causation of cancer: analyses of cohorts of twins from Sweden, Denmark, and Finland", journal: "New England Journal of Medicine", year: 2000, doi: "10.1056/NEJM200007133430201" },
      { title: "Recreational screen use and internalizing problems from preadolescence to young adulthood in a longitudinal twin cohort with co-twin comparison", journal: "Nature Human Behaviour", year: 2026, doi: "10.1038/s41562-026-02607-0" },
    ],
    keyPapers: ["paper-lichtenstein-twins-cancer-heritability-nejm-2000"],
    cancers: ["prostate", "colorectal"], sections: ["prevention"], bottlenecks: ["b-hereditary-risk"],
  }),

  p({
    id: "mats-lambe", name: "Mats Lambe",
    role: "Föredragande läkare (medical adviser) for the Swedish Cancer Register, Socialstyrelsen; Department of Medical Epidemiology and Biostatistics, Karolinska Institutet",
    institutionId: "swedish-cancer-register", institutions: ["swedish-cancer-register", "karolinska"],
    specialisms: ["Cancer registration", "Cancer epidemiology", "Nordic registry research"],
    tldr: "The physician named by Socialstyrelsen as the medical adviser to Sweden's national cancer register, and a Karolinska Institutet epidemiologist who studies cancer trends across the Nordic registers.",
    summary: "Socialstyrelsen's fact sheet on new cancer cases in 2024, published in November 2025, names Mats Lambe as the cancer register's föredragande läkare, the contact for questions of substance. Lambe's 2026 papers carry the affiliation of the Department of Medical Epidemiology and Biostatistics at Karolinska Institutet. Lambe was the senior author of a 2026 study in The Lancet Regional Health Europe that used the NORDCAN database to examine early-onset cancer, at ages 20 to 49, in the Nordic countries from 2003 to 2022: incidence rose significantly for 12 of 18 sites, most for colon, kidney and thyroid cancer, and early-onset cases rose from 47,491 in 2003 to 2007 to 56,665 in 2018 to 2022.",
    profiles: [pm("Lambe M[Author] AND Karolinska[Affiliation] AND cancer"), { label: "Statistik om nyupptäckta cancerfall 2024 (Socialstyrelsen, names the register's medical adviser)", url: "https://www.socialstyrelsen.se/contentassets/06ca5be116fc41f7a0326ef92a0715f1/2025-11-9874.pdf" }],
    papers: [
      { title: "Trends in early-onset cancer incidence rates in the Nordic countries (2003-2022): a population-based study", journal: "The Lancet Regional Health - Europe", year: 2026, doi: "10.1016/j.lanepe.2026.101858" },
    ],
    cancers: ["colorectal"], sections: ["prevention"], bottlenecks: ["b-data-silos"],
  }),
];
