/**
 * Hand-curated country context for the research ranking. Every row carries its sources.
 *
 *  population        millions, World Bank 2024 estimates (rounded)
 *  incidence         GLOBOCAN 2022 age-standardised incidence rate, all cancers (C00-97, code 39), per 100,000 (both sexes).
 *                    Not "excluding non-melanoma skin", which this file said until 25 September 2026: GLOBOCAN's code 40
 *                    for that is null for every country here, so every value has always been the all-cancers one. It matters
 *                    most where a registry counts keratinocyte cancers heavily, which is why the Russia page names the code.
 *  mortality         GLOBOCAN 2022 age-standardised mortality rate, per 100,000 (both sexes)
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
  CN: { name: "China", population: 1410, incidence: 202, mortality: 129, funder: "National Natural Science Foundation of China; NHC / NMPA programmes", budget: "NSFC total ≈ CN¥ 33 billion (2023), all fields", budgetSource: "https://www.nsfc.gov.cn", programmes: ["Healthy China 2030 cancer targets", "National Cancer Center", "Domestic ADC and PD-1 pipelines"], gcoUrl: gco(156) },
  GB: { name: "United Kingdom", population: 69, incidence: 307, mortality: 100, funder: "Cancer Research UK; NIHR; MRC", budget: "CRUK ≈ £400+ million research spend (2023/24)", budgetSource: "https://www.cancerresearchuk.org/about-us/our-research", programmes: ["NHS-Galleri", "Genomics England", "CRUK Cancer Grand Challenges", "NHS Cancer Plan"], gcoUrl: gco(826) },
  IN: { name: "India", population: 1440, incidence: 100, mortality: 65, funder: "ICMR; DBT; Department of Atomic Energy (Tata Memorial)", budget: "ICMR ≈ ₹ 2,700 crore (2024-25), all fields", budgetSource: "https://www.icmr.gov.in", programmes: ["National Cancer Grid", "Tata Memorial Centre", "Ayushman Bharat"], gcoUrl: gco(356) },
  // FR, CA, IT, NL and KR incidence and mortality corrected 2026-11-03 to the GLOBOCAN file this site renders (code 39),
  // which none of the five had matched; South Korea's row read 300 against the file's 234.7.
  IT: { name: "Italy", population: 59, incidence: 284, mortality: 94, funder: "AIRC; Ministero della Salute", budget: "AIRC: over €141 million to research (2024)", budgetSource: "https://www.airc.it/fondazione/chi-siamo/bilancio/bilancio-2024", programmes: ["Alliance Against Cancer (ACC)", "IRCCS network"], gcoUrl: gco(380) },
  DE: { name: "Germany", population: 84, incidence: 313, mortality: 95, funder: "DKFZ (Helmholtz) / BMBF; Deutsche Krebshilfe; DFG", budget: "DKFZ ≈ €400 million/year", budgetSource: "https://www.dkfz.de", programmes: ["National Decade Against Cancer", "NCT network", "German Cancer Consortium (DKTK)"], gcoUrl: gco(276) },
  JP: { name: "Japan", population: 124, incidence: 267, mortality: 82, funder: "AMED; JSPS; National Cancer Center", budget: "AMED ≈ ¥ 140 billion (FY2024), all fields", budgetSource: "https://www.amed.go.jp", programmes: ["Basic Plan to Promote Cancer Control", "SCRUM-Japan", "Cancer Genomic Medicine Core Hospitals"], gcoUrl: gco(392) },
  FR: { name: "France", population: 68, incidence: 339, mortality: 107, funder: "Institut National du Cancer (INCa); Inserm; ARC Foundation", budget: "INCa ≈ €100 million/year in total, a little over half of it for research", budgetSource: "https://www.cancer.fr/l-institut-national-du-cancer/nos-missions", programmes: ["Ten-Year Cancer Control Strategy 2021-2030", "Unicancer", "France Génomique"], gcoUrl: gco(250) },
  // KR budget removed 2026-11-03: the NRF figure was not on the cited KHIDI home page and no primary source for it was found.
  KR: { name: "South Korea", population: 52, incidence: 235, mortality: 77, funder: "KHIDI / Ministry of Health and Welfare; NRF", programmes: ["National Cancer Screening Program", "K-MASTER precision oncology"], gcoUrl: gco(410) },
  CA: { name: "Canada", population: 41, incidence: 346, mortality: 96, funder: "CIHR; Canadian Cancer Society; Terry Fox Research Institute", budget: "CIHR C$ 1.42 billion actual spending (2024-25), all fields", budgetSource: "https://cihr-irsc.gc.ca/e/54360.html", programmes: ["Marathon of Hope Cancer Centres Network", "Canadian Cancer Trials Group"], gcoUrl: gco(124) },
  // ES, AU and BR incidence and mortality corrected 2026-11-03 to the GLOBOCAN file this site renders
  // (public/globocan/countries.json, code 39): ESP 274.58 and 88.78, AUS 462.51 and 84.62, BRA 214.43 and 91.25.
  ES: { name: "Spain", population: 48, incidence: 275, mortality: 89, funder: "Instituto de Salud Carlos III; AECC", budget: "AECC €40 million in 282 new research grants (2025); €157 million in active projects", budgetSource: "https://transparenciafundacioncientificaaecc.contraelcancer.es/wp-content/uploads/sites/2/2022/03/Informe-anual-Fundacion-cientifica-202527-03def.pdf.pdf", programmes: ["CIBERONC", "Vall d'Hebron Institute of Oncology"], gcoUrl: gco(724) },
  AU: { name: "Australia", population: 27, incidence: 463, mortality: 85, funder: "NHMRC; Medical Research Future Fund; Cancer Australia", budget: "MRFF: A$ 25.4 billion long-term fund, all fields (annual spending not stated on the cited page)", budgetSource: "https://www.health.gov.au/our-work/medical-research-future-fund", programmes: ["Australian Cancer Plan", "Zero Childhood Cancer", "Peter MacCallum theranostics"], gcoUrl: gco(36) },
  NL: { name: "Netherlands", population: 18, incidence: 341, mortality: 103, funder: "KWF Dutch Cancer Society; ZonMw", budget: "KWF €189.6 million spent on its objectives (2025)", budgetSource: "https://www.kwf.nl/jaarverslag", programmes: ["Netherlands Cancer Institute", "Oncode Institute", "DRUP trial"], gcoUrl: gco(528) },
  BR: { name: "Brazil", population: 216, incidence: 214, mortality: 91, funder: "INCA; CNPq; FAPESP", budget: "FAPESP disbursed ≈ R$ 1.77 billion (2024), all fields", budgetSource: "https://centrodememoria.fapesp.br/wp-content/uploads/2025/09/Tabelas-Anexas-Relatorio-de-Atividades-2024.pdf", programmes: ["INCA national cancer institute", "A.C.Camargo Cancer Center", "LACOG cooperative group"], gcoUrl: gco(76) },
  // Incidence and mortality corrected 2026-11-03 to the GLOBOCAN file this site renders (public/globocan/countries.json,
  // CHE code 39: 292.72 and 78.79); the previous 323 and 84 matched neither. SAKK renamed itself the Swiss Cancer
  // Institute on 1 July 2025 (its own press release). The Federal Statistical Office's figures are on /countries/ch/.
  CH: { name: "Switzerland", population: 9, incidence: 293, mortality: 79, funder: "Swiss Cancer Research; Swiss Cancer League; SNSF", budget: "Swiss Cancer League and Swiss Cancer Research: 60-80 projects in two rounds a year, about CHF 20 million", budgetSource: "https://www.krebsliga.ch/forschung/forschungsfoerderung", programmes: ["Swiss Cancer Institute (formerly SAKK)", "Swiss Personalized Health Network"], gcoUrl: gco(756) },
  // Incidence and mortality corrected 2026-11-03 to the GLOBOCAN file this site renders (public/globocan/countries.json,
  // SWE code 39: 310.03 and 85.21); the previous 312 and 88 matched neither. Sweden's own registry figures, which use a
  // different standard population, are on /countries/se/.
  SE: { name: "Sweden", population: 11, incidence: 310, mortality: 85, funder: "Swedish Cancer Society (Cancerfonden); Swedish Research Council", budget: "Cancerfonden: nearly SEK 18 billion to research, 1951 to 2025 (its own figure; no yearly figure found)", budgetSource: "https://www.cancerfonden.se/om-cancerfonden", programmes: ["National quality registries", "Karolinska Comprehensive Cancer Centre"], gcoUrl: gco(752) },
  TR: { name: "Türkiye", population: 86, incidence: 231, mortality: 106, funder: "TÜBİTAK; Ministry of Health", programmes: ["National Cancer Control Programme"], gcoUrl: gco(792) },
  IR: { name: "Iran", population: 90, incidence: 159, mortality: 87, funder: "Ministry of Health and Medical Education; NIMAD", programmes: ["National Cancer Control Programme"], gcoUrl: gco(364) },
  PL: { name: "Poland", population: 37, incidence: 262, mortality: 128, funder: "National Science Centre; Medical Research Agency", programmes: ["National Oncology Strategy 2020-2030"], gcoUrl: gco(616) },
  BE: { name: "Belgium", population: 12, incidence: 360, mortality: 97, funder: "Fondation contre le Cancer / Kom op tegen Kanker; FWO / FNRS", programmes: ["EORTC headquarters (Brussels)"], gcoUrl: gco(56) },
  TW: { name: "Taiwan", population: 23, incidence: 292, mortality: 105, funder: "National Science and Technology Council; Ministry of Health and Welfare", programmes: ["National Cancer Prevention Program", "Taiwan Cancer Registry"] },
  EG: { name: "Egypt", population: 114, incidence: 159, mortality: 99, funder: "Academy of Scientific Research and Technology", programmes: ["National Cancer Institute Cairo", "Children's Cancer Hospital 57357"], gcoUrl: gco(818) },
  SA: { name: "Saudi Arabia", population: 37, incidence: 122, mortality: 56, funder: "King Abdulaziz City for Science and Technology; Ministry of Health", programmes: ["King Faisal Specialist Hospital", "Saudi Cancer Registry"], gcoUrl: gco(682) },
  DK: { name: "Denmark", population: 6, incidence: 375, mortality: 110, funder: "Danish Cancer Society; Novo Nordisk Foundation", budget: "Danish Cancer Society ≈ DKK 400 million/year", budgetSource: "https://www.cancer.dk", programmes: ["Danish Comprehensive Cancer Center", "National patient registries"], gcoUrl: gco(208) },
  AT: { name: "Austria", population: 9, incidence: 298, mortality: 92, funder: "FWF; Austrian Cancer Aid", programmes: ["MedAustron ion therapy"], gcoUrl: gco(40) },
  // Incidence and mortality corrected 2026-09-25 to the GLOBOCAN file this site renders (public/globocan/countries.json,
  // ISR code 39: 245.78 and 83.2); the previous 262 and 76 matched no source we could find. Note that the Israel National
  // Cancer Registry states in its own 2021 report that Global Cancer Observatory figures for Israel cannot be compared with
  // the rates it measures, because they merge populations it reports separately: see /countries/il/#registry-limits.
  IL: { name: "Israel", population: 10, incidence: 246, mortality: 83, funder: "Israel Cancer Association (a charity, on donations); Israel Science Foundation; Israel Innovation Authority", programmes: ["Annual public health basket committee", "Population BRCA founder-variant testing", "National Cancer Registry (mandatory notification since 1982)", "Academic point-of-care CAR-T at Hadassah and Sheba"], gcoUrl: gco(376) },
  SG: { name: "Singapore", population: 6, incidence: 240, mortality: 78, funder: "National Medical Research Council (NMRC)", programmes: ["National Cancer Centre Singapore", "Singapore Translational Cancer Consortium"], gcoUrl: gco(702) },
  RU: { name: "Russia", population: 144, incidence: 248, mortality: 110, funder: "Russian Science Foundation; Ministry of Health", programmes: ["N.N. Blokhin National Medical Research Center of Oncology", "Federal project on cancer within the national project Long and Active Life 2025-2030", "Herzen institute national cancer statistics"], gcoUrl: gco(643) },
  MX: { name: "Mexico", population: 130, incidence: 141, mortality: 65, funder: "CONAHCYT; Instituto Nacional de Cancerología", programmes: ["INCan Mexico City"], gcoUrl: gco(484) },
  GR: { name: "Greece", population: 10, incidence: 273, mortality: 108, funder: "Hellenic Foundation for Research and Innovation", programmes: ["Hellenic Cooperative Oncology Group"], gcoUrl: gco(300) },
  PT: { name: "Portugal", population: 10, incidence: 300, mortality: 100, funder: "FCT; Liga Portuguesa Contra o Cancro", programmes: ["IPO Porto and Lisbon"], gcoUrl: gco(620) },
  NO: { name: "Norway", population: 6, incidence: 358, mortality: 95, funder: "Norwegian Cancer Society; Research Council of Norway", programmes: ["Cancer Registry of Norway", "Oslo University Hospital"], gcoUrl: gco(578) },
};
