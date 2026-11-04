/**
 * Hand-curated country context for the research ranking. Every row carries its sources.
 *
 *  population        millions, World Bank 2024 estimates (rounded)
 *  incidence         GLOBOCAN 2022 age-standardised incidence rate, all cancers (C00-97, code 39), per 100,000 (both sexes).
 *                    Not "excluding non-melanoma skin", which this file said until 25 September 2026: GLOBOCAN's code 40
 *                    for that is null for every country here, so every value has always been the all-cancers one. It matters
 *                    most where a registry counts keratinocyte cancers heavily, which is why the Russia page names the code.
 *  mortality         GLOBOCAN 2022 age-standardised mortality rate, per 100,000 (both sexes)
 *                    On 3 November 2026 every incidence, mortality and population value was re-read against
 *                    public/globocan/countries.json (code 39) and the World Bank 2024 series; 28 rows had at least one value
 *                    that matched neither (Saudi Arabia incidence 122 against 87, Korea 300 against 235, China mortality 129
 *                    against 96) and were corrected.
 *  funder / budget   main public cancer-research funder and an approximate annual figure with year and source
 *
 * Figures are approximate and for orientation; follow the source links for exact values.
 * Sources: World Bank population (https://data.worldbank.org/indicator/SP.POP.TOTL); IARC Global Cancer
 * Observatory country fact sheets (https://gco.iarc.who.int/today/en/fact-sheets-populations); funder sites.
 */
export type CountryExtra = {
  name: string;
  population: number;
  incidence?: number;
  mortality?: number;
  funder?: string;
  budget?: string;
  budgetSource?: string;
  programmes?: string[];
  gcoUrl?: string;
};

const gco = (code: number) => `https://gco.iarc.who.int/media/globocan/factsheets/populations/${code}-${String(code).padStart(3, "0")}-fact-sheet.pdf`;

export const countryExtras: Record<string, CountryExtra> = {
  US: { name: "United States", population: 340, incidence: 367, mortality: 82, funder: "National Cancer Institute (NIH)", budget: "$7.35 billion (FY2026 appropriation)", budgetSource: "https://www.cancer.gov/about-nci/budget", programmes: ["Cancer Moonshot", "NCI-designated Cancer Centers (74)", "ARPA-H", "SEER"], gcoUrl: gco(840) },
  CN: { name: "China", population: 1410, incidence: 202, mortality: 96, funder: "National Natural Science Foundation of China; NHC / NMPA programmes", budget: "NSFC total ≈ CN¥ 35 billion (2023 outturn), all fields", budgetSource: "https://www.nsfc.gov.cn/Portals/0/fj/fj20240326_01.pdf", programmes: ["Healthy China 2030 cancer targets", "National Cancer Center", "Domestic ADC and PD-1 pipelines"], gcoUrl: gco(156) },
  GB: { name: "United Kingdom", population: 69, incidence: 308, mortality: 98, funder: "Cancer Research UK; NIHR; MRC", budget: "CRUK ≈ £416 million research spend (2025/26)", budgetSource: "https://www.cancerresearchuk.org/our-accounts", programmes: ["NHS-Galleri", "Genomics England", "CRUK Cancer Grand Challenges", "NHS Cancer Plan"], gcoUrl: gco(826) },
  IN: { name: "India", population: 1451, incidence: 99, mortality: 64, funder: "ICMR; DBT; Department of Atomic Energy (Tata Memorial)", budget: "ICMR ≈ ₹ 2,732 crore (2024-25 budget estimate), all fields", budgetSource: "https://indiabudget.gov.in/budget2024-25/doc/eb/sbe47.pdf", programmes: ["National Cancer Grid", "Tata Memorial Centre", "Ayushman Bharat"], gcoUrl: gco(356) },
  IT: { name: "Italy", population: 59, incidence: 284, mortality: 94, funder: "AIRC; Ministero della Salute", budget: "AIRC ≈ €141 million for research (2024)", budgetSource: "https://bilanciosociale.airc.it/wp-content/uploads/2025/06/AIRC-abstract_WEB.pdf", programmes: ["Alliance Against Cancer (ACC)", "IRCCS network"], gcoUrl: gco(380) },
  DE: { name: "Germany", population: 84, incidence: 274, mortality: 100, funder: "DKFZ (Helmholtz) / BMBF; Deutsche Krebshilfe; DFG", budget: "DKFZ ≈ €515 million total budget (2026), all sources", budgetSource: "https://dkfz.de/en/about-us/who-we-are/facts-and-figures", programmes: ["National Decade Against Cancer", "NCT network", "German Cancer Consortium (DKTK)"], gcoUrl: gco(276) },
  JP: { name: "Japan", population: 124, incidence: 267, mortality: 79, funder: "AMED; JSPS; National Cancer Center", budget: "AMED ≈ ¥ 124.5 billion (FY2024 initial budget), all fields", budgetSource: "https://www8.cao.go.jp/iryou/council/20250114/pdf/sankou4.pdf", programmes: ["Basic Plan to Promote Cancer Control", "SCRUM-Japan", "Cancer Genomic Medicine Core Hospitals"], gcoUrl: gco(392) },
  FR: { name: "France", population: 69, incidence: 339, mortality: 107, funder: "Institut National du Cancer (INCa); Inserm; ARC Foundation", budget: "INCa ≈ €80 million research spend (2024)", budgetSource: "https://www.cancer.fr/content/download/125103/file/RAPERF24-INCa25_Rapport_performance_2024_planches.pdf?version=2", programmes: ["Ten-Year Cancer Control Strategy 2021-2030", "Unicancer", "France Génomique"], gcoUrl: gco(250) },
  KR: { name: "South Korea", population: 52, incidence: 235, mortality: 77, funder: "KHIDI / Ministry of Health and Welfare; NRF", programmes: ["National Cancer Screening Program", "K-MASTER precision oncology"], gcoUrl: gco(410) },
  CA: { name: "Canada", population: 41, incidence: 346, mortality: 96, funder: "CIHR; Canadian Cancer Society; Terry Fox Research Institute", budget: "CIHR ≈ C$ 1.4 billion actual spending (2024-25), all fields", budgetSource: "https://cihr-irsc.gc.ca/e/54360.html", programmes: ["Marathon of Hope Cancer Centres Network", "Canadian Cancer Trials Group"], gcoUrl: gco(124) },
  ES: { name: "Spain", population: 49, incidence: 275, mortality: 89, funder: "Instituto de Salud Carlos III; AECC", budget: "AECC ≈ €40 million in new research grants (2025); €157 million in active projects", budgetSource: "https://www.contraelcancer.es", programmes: ["CIBERONC", "Vall d'Hebron Institute of Oncology"], gcoUrl: gco(724) },
  AU: { name: "Australia", population: 27, incidence: 463, mortality: 85, funder: "NHMRC; Medical Research Future Fund; Cancer Australia", budget: "MRFF ≈ A$ 650 million disbursed (2025-26), all fields", budgetSource: "https://budget.gov.au/content/bp2/download/bp2_2026-27.pdf", programmes: ["Australian Cancer Plan", "Zero Childhood Cancer", "Peter MacCallum theranostics"], gcoUrl: gco(36) },
  NL: { name: "Netherlands", population: 18, incidence: 341, mortality: 103, funder: "KWF Dutch Cancer Society; ZonMw", budget: "KWF ≈ €190 million spent on its mission (2025), mostly research", budgetSource: "https://www.kwf.nl/sites/default/files/2026-04/kwf-jaarverslag-2025.pdf", programmes: ["Netherlands Cancer Institute", "Oncode Institute", "DRUP trial"], gcoUrl: gco(528) },
  BR: { name: "Brazil", population: 212, incidence: 214, mortality: 91, funder: "INCA; CNPq; FAPESP", budget: "FAPESP ≈ R$ 1.8 billion in grants and fellowships (2024), all fields", budgetSource: "https://fapesp.br/publicacoes/relat2024.pdf", programmes: ["INCA national cancer institute", "Hospital A.C. Camargo", "LACOG cooperative group"], gcoUrl: gco(76) },
  CH: { name: "Switzerland", population: 9, incidence: 293, mortality: 79, funder: "Swiss Cancer Research; SNSF", budget: "Swiss Cancer Research ≈ CHF 16 million in research grants (2024)", budgetSource: "https://www.cancerresearch.ch/ueber-uns/publikationen/research-report/-dl-/fileadmin/downloads/forschungsbericht/krebsforschung-in-der-schweiz-ausgabe-2025.pdf", programmes: ["SAKK cooperative group", "Swiss Personalized Health Network"], gcoUrl: gco(756) },
  SE: { name: "Sweden", population: 11, incidence: 310, mortality: 85, funder: "Swedish Cancer Society (Cancerfonden); Swedish Research Council", budget: "Cancerfonden ≈ SEK 1 billion in research grants (2024)", budgetSource: "https://static-files.cancerfonden.se/Arsrapporter-2024.pdf", programmes: ["National quality registries", "Karolinska Comprehensive Cancer Centre"], gcoUrl: gco(752) },
  TR: { name: "Türkiye", population: 86, incidence: 226, mortality: 116, funder: "TÜBİTAK; Ministry of Health", programmes: ["National Cancer Control Programme"], gcoUrl: gco(792) },
  IR: { name: "Iran", population: 92, incidence: 149, mortality: 97, funder: "Ministry of Health and Medical Education; NIMAD", programmes: ["National Cancer Control Programme"], gcoUrl: gco(364) },
  PL: { name: "Poland", population: 37, incidence: 263, mortality: 133, funder: "National Science Centre; Medical Research Agency", programmes: ["National Oncology Strategy 2020-2030"], gcoUrl: gco(616) },
  BE: { name: "Belgium", population: 12, incidence: 325, mortality: 92, funder: "Fondation contre le Cancer / Kom op tegen Kanker; FWO / FNRS", programmes: ["EORTC headquarters (Brussels)"], gcoUrl: gco(56) },
  // Incidence and mortality removed 2026-11-03: GLOBOCAN publishes no separate estimate for Taiwan, so the 292 and 105 shown
  // here had no source, and the Taiwan Cancer Registry's own rates use a different standard population.
  TW: { name: "Taiwan", population: 23, funder: "National Science and Technology Council; Ministry of Health and Welfare", programmes: ["National Cancer Prevention Program", "Taiwan Cancer Registry"] },
  EG: { name: "Egypt", population: 117, incidence: 166, mortality: 108, funder: "Academy of Scientific Research and Technology", programmes: ["National Cancer Institute Cairo", "Children's Cancer Hospital 57357"], gcoUrl: gco(818) },
  SA: { name: "Saudi Arabia", population: 35, incidence: 87, mortality: 46, funder: "King Abdulaziz City for Science and Technology; Ministry of Health", programmes: ["King Faisal Specialist Hospital", "Saudi Cancer Registry"], gcoUrl: gco(682) },
  DK: { name: "Denmark", population: 6, incidence: 375, mortality: 106, funder: "Danish Cancer Society; Novo Nordisk Foundation", budget: "Danish Cancer Society ≈ DKK 400 million/year", budgetSource: "https://www.cancer.dk", programmes: ["Danish Comprehensive Cancer Center", "National patient registries"], gcoUrl: gco(208) },
  AT: { name: "Austria", population: 9, incidence: 258, mortality: 91, funder: "FWF; Austrian Cancer Aid", programmes: ["MedAustron ion therapy"], gcoUrl: gco(40) },
  // Incidence and mortality corrected 2026-09-25 to the GLOBOCAN file this site renders (public/globocan/countries.json,
  // ISR code 39: 245.78 and 83.2); the previous 262 and 76 matched no source we could find. Note that the Israel National
  // Cancer Registry states in its own 2021 report that Global Cancer Observatory figures for Israel cannot be compared with
  // the rates it measures, because they merge populations it reports separately: see /countries/il/#registry-limits.
  IL: { name: "Israel", population: 10, incidence: 246, mortality: 83, funder: "Israel Cancer Association (a charity, on donations); Israel Science Foundation; Israel Innovation Authority", programmes: ["Annual public health basket committee", "Population BRCA founder-variant testing", "National Cancer Registry (mandatory notification since 1982)", "Academic point-of-care CAR-T at Hadassah and Sheba"], gcoUrl: gco(376) },
  SG: { name: "Singapore", population: 6, incidence: 231, mortality: 111, funder: "National Medical Research Council (NMRC)", programmes: ["National Cancer Centre Singapore", "Singapore Translational Cancer Consortium"], gcoUrl: gco(702) },
  RU: { name: "Russia", population: 144, incidence: 248, mortality: 110, funder: "Russian Science Foundation; Ministry of Health", programmes: ["N.N. Blokhin National Medical Research Center of Oncology", "Federal project on cancer within the national project Long and Active Life 2025-2030", "Herzen institute national cancer statistics"], gcoUrl: gco(643) },
  MX: { name: "Mexico", population: 131, incidence: 141, mortality: 64, funder: "CONAHCYT; Instituto Nacional de Cancerología", programmes: ["INCan Mexico City"], gcoUrl: gco(484) },
  GR: { name: "Greece", population: 10, incidence: 259, mortality: 101, funder: "Hellenic Foundation for Research and Innovation", programmes: ["Hellenic Cooperative Oncology Group"], gcoUrl: gco(300) },
  PT: { name: "Portugal", population: 11, incidence: 295, mortality: 109, funder: "FCT; Liga Portuguesa Contra o Cancro", programmes: ["IPO Porto and Lisbon"], gcoUrl: gco(620) },
  NO: { name: "Norway", population: 6, incidence: 358, mortality: 92, funder: "Norwegian Cancer Society; Research Council of Norway", programmes: ["Cancer Registry of Norway", "Oslo University Hospital"], gcoUrl: gco(578) },
};
