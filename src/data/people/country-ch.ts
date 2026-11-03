import type { PersonInput } from "@/lib/schema";

/**
 * People: Switzerland, added for /countries/ch/. Public professional information only; every record carries at least one
 * paper with a DOI and PubMed id, each resolved before use.
 *
 * Roles come from the organisation's own page (NKRS contact page; Swiss Cancer Institute board list), read 2026-11-03,
 * and affiliations from the PubMed affiliation line of the papers listed; DOIs and PubMed ids were resolved through
 * PubMed E-utilities because Crossref and Europe PMC were rate-limited that day.
 */
const asOf = "2026-11-03";
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleCH: PersonInput[] = [
  p({ id: "katharina-staehelin", name: "Katharina Staehelin", role: "Director, National Agency for Cancer Registration (NKRS), Zurich", institutionId: "nkrs-nicer", institutions: ["nkrs-nicer"],
    specialisms: ["Cancer registration", "Cancer epidemiology", "Public health"],
    tldr: "She directs the Swiss office that turns the cantonal cancer registries' data into national figures, and is senior author of its national studies of prostate cancer and of cancer during the COVID-19 pandemic.",
    summary: "Katharina Staehelin is the director (Direktorin) of the National Agency for Cancer Registration, the national office run by the NICER foundation in Zurich under the 2020 Cancer Registration Act. She is senior author of the agency's nationwide register studies, including the 2026 JAMA Network Open analysis of prostate cancer incidence, mortality and survival in Switzerland from 1980 to 2021, and the 2025 Swiss Medical Weekly study of 218,736 cancers diagnosed in 2017-2021, which found a 19.9 per cent fall in diagnoses in April 2020 but no clear shift in stage and no fall in one-year survival. She is a co-author of the 2026 European Journal of Cancer study of rising early-onset colorectal cancer.",
    profiles: [{ label: "NKRS: contact and organisation", url: "https://www.nkrs.ch/de/kontakt" }, pm("Staehelin K[Author] Switzerland cancer")],
    papers: [
      { title: "Prostate Cancer Incidence, Mortality, and Survival in Switzerland", journal: "JAMA Network Open", year: 2026, doi: "10.1001/jamanetworkopen.2026.8289", note: "Menges D, Wildisen L, Scherer T, et al.; Staehelin K senior author. PMID 42012828." },
      { title: "The impact of the COVID-19 pandemic on cancer incidence, stage distribution and survival in Switzerland: a register-based cohort study", journal: "Swiss Medical Weekly", year: 2025, doi: "10.57187/s.4354", note: "Mader L, Wildisen L, Menges D, et al.; Staehelin K senior author. PMID 40811106." },
      { title: "Rising early-onset colorectal cancer in Switzerland despite declining incidence in older adults: a nationwide population-based study, 1980-2021", journal: "European Journal of Cancer", year: 2026, doi: "10.1016/j.ejca.2026.116707", note: "Fournier E, Schaffar R, Staehelin K, et al. PMID 41946179." },
    ],
    keyPapers: ["paper-menges-prostate-cancer-switzerland-jama-netw-open-2026", "paper-fournier-early-onset-colorectal-switzerland-ejc-2026"],
    cancers: ["prostate", "colorectal"], sections: ["early-detection", "prevention"], bottlenecks: ["b-data-silos"],
    tags: ["epidemiology", "registry"] }),

  p({ id: "viviane-hess", name: "Viviane Hess", role: "President of the Board, Swiss Cancer Institute (formerly SAKK); medical oncologist, University Hospital Basel", institutionId: "usb-basel", institutions: ["usb-basel"], companies: ["swiss-cancer-institute"],
    specialisms: ["Medical oncology", "Gastrointestinal cancers", "Academic clinical trials", "Psycho-oncology"],
    tldr: "A Basel medical oncologist who chairs the board of Switzerland's national academic cancer trials group.",
    summary: "Viviane Hess is listed as President (Präsidentin) of the board of the Swiss Cancer Institute, the national academic cancer trials organisation known until July 2025 as SAKK. Her paper affiliations are the Department of Medical Oncology, University Hospital Basel, and the Faculty of Medicine, University of Basel. She is a co-author of the long-term follow-up of the SAKK 75/08 phase 3 trial in oesophageal cancer, which analysed recurrence in 103 of the trial's 300 patients and found that time to recurrence, the number of recurrence sites and the use of systemic or second curative local therapy correlated with survival, and of psycho-oncology studies for cancer survivors at Basel.",
    profiles: [{ label: "Swiss Cancer Institute: board and management", url: "https://www.swisscancerinstitute.ch/de/ueber-uns/ueber-swiss-cancer-institute/" }, pm("Hess V[Author] Basel oncology")],
    papers: [
      { title: "Patterns of care for relapsed oesophageal cancer after initial curative trimodality therapy: Long-term follow-up of the SAKK 75/08 trial", journal: "European Journal of Cancer", year: 2022, doi: "10.1016/j.ejca.2022.09.035", note: "Panje C, Hayoz S, Eisterer W, Hess V, et al. PMID 36368252." },
      { title: "Group-based body psychotherapy improves appreciation of body awareness in post-treatment cancer patients: A non-randomized clinical trial", journal: "Frontiers in Psychology", year: 2023, doi: "10.3389/fpsyg.2023.956493", note: "Grossert A, Meffert C, Hess V, et al. PMID 37089722." },
    ],
    cancers: ["esophageal"], sections: ["chemotherapy", "supportive-care"],
    tags: ["clinician", "trials-leadership"] }),
];
