import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/za/ (wave 4). Public professional information only. The role comes from the National
 * Cancer Registry's own page and the foreword of its Ekurhuleni 2024 report (signed 31 March 2026), read on
 * 4 November 2026; the papers were resolved through Europe PMC and their author lists read.
 */
const asOf = "2026-11-04";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleZA: PersonInput[] = [
  p({ id: "mazvita-muchengeti", name: "Mazvita Muchengeti", role: "Head of Department, National Cancer Registry, National Health Laboratory Service, Johannesburg",
    institutionId: "national-cancer-registry-south-africa", institutions: ["national-cancer-registry-south-africa", "nhls-south-africa"],
    specialisms: ["Cancer epidemiology", "Cancer registration", "HIV-associated cancers"],
    tldr: "She heads South Africa's National Cancer Registry and leads its research on cancers linked to HIV, including the national study that links laboratory HIV records to cancer records.",
    summary: "Mazvita Muchengeti is a cancer epidemiologist who oversees cancer surveillance and research at the National Cancer Registry, according to the registry's page, and signs its 2024 Ekurhuleni population-based report as Head of the Department. The registry's page states that she holds a medical degree from the University of Zimbabwe, a Diploma in HIV Management from the College of Medicine of South Africa, a master's degree in epidemiology and biostatistics from the University of the Witwatersrand and a PhD from the University of Bern (2016), whose work explored the spectrum and incidence of HIV-associated cancers in South Africa. She collaborates with IeDEA Southern Africa, the University of Bern and the Swiss Tropical and Public Health Institute on the South African HIV Cancer Match Study, and is senior author of the registry's 2025 analysis of HPV-related cancers.",
    profiles: [
      { label: "National Cancer Registry (NICD): staff profile", url: "https://www.nicd.ac.za/centres/national-cancer-registry/" },
      { label: "PubMed author search", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Muchengeti%20M%5BAuthor%5D" },
    ],
    papers: [
      { title: "Changes in incidence of HPV-related cancers in South Africa (2011-21): a cross-sectional analysis of the South African National Cancer Registry", journal: "Lancet Global Health", year: 2025, doi: "10.1016/S2214-109X(25)00065-8", note: "Senior author" },
      { title: "Integration of HIV Status in Cancer Surveillance in South Africa: A Call for Action", journal: "Cancer Medicine", year: 2026, doi: "10.1002/cam4.71661", note: "Senior author" },
      { title: "Age and Cancer Incidence in 5.2 Million People With Human Immunodeficiency Virus (HIV): The South African HIV Cancer Match Study", journal: "Clinical Infectious Diseases", year: 2023, doi: "10.1093/cid/ciac925" },
      { title: "HPV vaccination impact in South Africa: evidence and next steps", journal: "Lancet Global Health", year: 2026, doi: "10.1016/S2214-109X(26)00026-4", note: "Comment, with van Schalkwyk C" },
    ],
    keyPapers: ["paper-shing-hpv-related-cancers-south-africa-lancet-glob-health-2025", "paper-metekoua-hiv-status-cancer-registry-south-africa-cancer-med-2026", "paper-ruffieux-age-cancer-hiv-south-africa-cid-2023"] }),
];
