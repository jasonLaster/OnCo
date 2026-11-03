import type { PersonInput } from "@/lib/schema";

/**
 * People: Australia, added for /countries/au/. Public professional information only; every record carries at least one
 * paper with a DOI or PubMed id resolved through Crossref or Europe PMC.
 *
 * Roles come from the institution's own page (Cancer Australia's About us) or from the affiliation printed on the
 * person's most recent PubMed record, read on 2026-11-03.
 */
const asOf = "2026-11-03";
const p = (x: Omit<PersonInput, "kind" | "asOf">): PersonInput => ({ kind: "person", asOf, ...x });

export const peopleAU: PersonInput[] = [
  p({
    id: "dorothy-keefe", name: "Dorothy Keefe", aka: ["Dorothy M. Keefe", "Keefe DM"],
    role: "Chief Executive Officer, Cancer Australia", institutionId: "cancer-australia", institutions: ["cancer-australia"],
    specialisms: ["Medical oncology", "Supportive care in cancer", "Cancer control policy"],
    tldr: "The medical oncologist who leads Cancer Australia, the national cancer control agency responsible for the ten-year Australian Cancer Plan.",
    summary: "Cancer Australia's own page names Professor Dorothy Keefe PSM as its Chief Executive Officer. The agency advises the Australian Government on cancer policy and priorities and is delivering the Australian Cancer Plan. Recent papers list affiliations with Cancer Australia and with the School of Medicine at Adelaide University, and range from supportive care, the side effects of cancer treatment that determine whether a person can finish it, to cancer education for First Nations Australians.",
    sections: ["supportive-care"],
    papers: [
      { title: "Supportive Care in What? Myths and Misconceptions That Prevent the Provision of Excellent Cancer Care", journal: "JCO Global Oncology", year: 2026, doi: "10.1200/GO-26-00087", url: "https://doi.org/10.1200/GO-26-00087" },
      { title: "Strengthening cancer education evidence to achieve equity in outcomes for First Nations Australians", journal: "The Lancet Regional Health - Western Pacific", year: 2025, doi: "10.1016/j.lanwpc.2025.101565", url: "https://doi.org/10.1016/j.lanwpc.2025.101565" },
    ],
    profiles: [{ label: "Cancer Australia: about us", url: "https://www.canceraustralia.gov.au/about-us" }],
    links: [{ label: "Cancer Australia: about us (Internet Archive copy, 13 July 2026)", url: "https://web.archive.org/web/20260713220314/https://www.canceraustralia.gov.au/about-us" }, { label: "Wardill et al., with Keefe, Supportive care in what? (JCO Global Oncology 2026)", url: "https://doi.org/10.1200/GO-26-00087" }],
  }),
  p({
    id: "karen-canfell", name: "Karen Canfell", aka: ["Canfell K"],
    role: "Cancer Elimination Collaboration, Sydney School of Public Health, University of Sydney",
    specialisms: ["Cancer epidemiology", "Cervical screening", "Modelling of HPV vaccination and screening"],
    tldr: "An Australian cancer epidemiologist whose modelling put a date on cervical cancer elimination in Australia and who was first author of the pilot results of Compass, the trial behind the country's HPV-based screening.",
    summary: "Karen Canfell's 2026 papers give the Cancer Elimination Collaboration at the University of Sydney's School of Public Health as affiliation. Two pieces of work tie the name to Australian cancer policy. As first author of the Compass pilot, run with the VCS Foundation in Victoria, the randomised evidence showed primary HPV screening finding more high-grade precancer than cytology in a population already partly vaccinated. As senior author of the 2019 Lancet Public Health modelling study, with Ian Frazer among the co-authors, the projection was that Australia's cervical cancer incidence could fall below four cases per 100,000 women around 2028, the threshold the national elimination strategy adopted.",
    cancers: ["cervical"], technologies: ["hpv-vaccine"], trials: ["compass-cervical-hpv-screening"], related: ["acpcc"], people: ["ian-frazer"], sections: ["prevention"],
    keyPapers: ["paper-canfell-compass-pilot-plos-med-2017", "paper-hall-cervical-elimination-australia-lancet-public-health-2019"],
    papers: [
      { title: "Cervical screening with primary HPV testing or cytology in a population of women in which those aged 33 years or younger had previously been offered HPV vaccination: results of the Compass pilot randomised trial", journal: "PLoS Medicine", year: 2017, doi: "10.1371/journal.pmed.1002388", url: "https://doi.org/10.1371/journal.pmed.1002388" },
      { title: "The projected timeframe until cervical cancer elimination in Australia: a modelling study", journal: "The Lancet Public Health", year: 2019, doi: "10.1016/S2468-2667(18)30183-X", url: "https://doi.org/10.1016/S2468-2667(18)30183-X" },
    ],
    profiles: [{ label: "PubMed author search", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Canfell+K%5BAuthor%5D" }],
    links: [{ label: "Canfell et al., Compass pilot (PLoS Medicine 2017)", url: "https://doi.org/10.1371/journal.pmed.1002388" }, { label: "Hall et al., cervical cancer elimination in Australia (Lancet Public Health 2019)", url: "https://doi.org/10.1016/S2468-2667(18)30183-X" }],
  }),
  p({
    id: "andrew-roberts", name: "Andrew Roberts", aka: ["Andrew W. Roberts", "Roberts AW"],
    role: "Haematologist and researcher, Walter and Eliza Hall Institute of Medical Research", institutionId: "wehi", institutions: ["wehi"],
    specialisms: ["Clinical haematology", "Chronic lymphocytic leukaemia", "BCL-2 and apoptosis"],
    tldr: "A Melbourne haematologist who led the first human study of venetoclax, the leukaemia drug that grew from the Walter and Eliza Hall Institute's discovery that BCL-2 keeps cancer cells alive.",
    summary: "Andrew Roberts was first author of the 2016 New England Journal of Medicine report of the first-in-human study of venetoclax in relapsed chronic lymphocytic leukaemia, written from the Royal Melbourne Hospital's Department of Clinical Haematology and the Walter and Eliza Hall Institute with John Seymour of Peter MacCallum Cancer Centre and colleagues at AbbVie and Genentech; 79 percent of 116 patients responded, and the weekly dose ramp-up introduced in that study removed clinical tumour lysis syndrome in the expansion cohort. The Institute's own account traces the drug to its finding in the late 1980s that BCL-2 helps leukaemia cells live, and names Roberts, then its Cancer Theme Leader, at the 2019 announcement that venetoclax would be listed on the Pharmaceutical Benefits Scheme. Papers in 2026 continue to give the Institute as affiliation.",
    cancers: ["cll"], drugs: ["venetoclax"], related: ["peter-mac"], people: ["john-seymour"], sections: ["targeted-therapy"],
    keyPapers: ["paper-roberts-venetoclax-relapsed-cll-nejm-2016"],
    papers: [{ title: "Targeting BCL2 with Venetoclax in Relapsed Chronic Lymphocytic Leukemia", journal: "New England Journal of Medicine", year: 2016, doi: "10.1056/NEJMoa1513257", url: "https://doi.org/10.1056/NEJMoa1513257" }],
    profiles: [{ label: "WEHI: venetoclax listed on the PBS", url: "https://www.wehi.edu.au/news/anti-cancer-treatment-venetoclax-listed-australian-pbs/" }],
    links: [{ label: "Roberts et al., venetoclax in relapsed CLL (NEJM 2016)", url: "https://doi.org/10.1056/NEJMoa1513257" }, { label: "WEHI: venetoclax listed on the PBS", url: "https://www.wehi.edu.au/news/anti-cancer-treatment-venetoclax-listed-australian-pbs/" }],
  }),
];
