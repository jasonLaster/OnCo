import type { CollectionInput, InstitutionInput } from "@/lib/schema";

const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type C = Omit<CollectionInput, "kind" | "asOf">;
const col = (x: C): CollectionInput => ({ kind: "collection", asOf, ...x });

/**
 * European and international cancer patient coalitions, and the national disease groups the November 2026 gap census
 * listed under patient advocacy (docs/proposals/gap-census-2026-11.md, type `patient-advocacy`). The denominator was the
 * European Medicines Agency's list of eligible patients' and consumers' organisations (the seven cancer bodies on it,
 * with EURORDIS for rare cancers) and the coalitions named in the census, each checked on its own website.
 *
 * Every fact is from the organisation's own pages or the EMA list, read as raw text on 4 November 2026; numbers of
 * members are the organisation's own count on that day. US groups carry their IRS record (via ProPublica), which gives
 * the city. Coordinates are city-centre approximations. Coalitions use institutionType "consortium", as the charities do.
 * Two coalitions publish no seat (Melanoma Patient Network Europe says it has no office; the World Pancreatic Cancer
 * Coalition says it is not a legal entity), so they are collections, which need no address.
 */
const EMA = { label: "EMA: eligible patients' and consumers' organisations", url: "https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations" };
const irs = (ein: string) => ({ label: "IRS record (via ProPublica Nonprofit Explorer)", url: `https://projects.propublica.org/nonprofits/organizations/${ein}` });

export const institutionsPatientCoalitions: InstitutionInput[] = [
  i({ id: "cancer-patients-europe", name: "Cancer Patients Europe", aka: ["CPE"], institutionType: "consortium", city: "Brussels", country: "BE", lat: 50.846, lng: 4.352, website: "https://cancerpatientseurope.org",
    tldr: "A Brussels-based association, founded in 2022, that speaks for people with any type of cancer, their carers and survivors to European Union policymakers.",
    summary: "Cancer Patients Europe was founded in 2022 to represent and empower the voices of cancer patients, their caregivers and cancer survivors towards policymakers and other stakeholders, according to its about page. The European Medicines Agency lists it among the patients' organisations eligible to take part in its work and describes it as a pan-European, all-cancer association. Its stated priorities are patient-centred European policy and legislation, contributing to Europe's Beating Cancer Plan, building the capacity of its member organisations and collaboration between European and national levels. Its office is at Rue de l'Industrie 24, Brussels.",
    programs: ["Advocacy to EU institutions on prevention, care, treatment and survivorship", "Capacity building for member organisations", "Representation in European Medicines Agency work"],
    links: [{ label: "About Cancer Patients Europe", url: "https://cancerpatientseurope.org/about-us/" }, EMA],
    related: ["european-cancer-leagues", "eurordis"] }),

  i({ id: "european-cancer-leagues", name: "Association of European Cancer Leagues", aka: ["ECL"], institutionType: "consortium", city: "Brussels", country: "BE", lat: 50.846, lng: 4.352, website: "https://www.cancer.eu",
    tldr: "The Brussels umbrella body, active since 1980, of national and regional cancer charities across Europe, working on prevention, early detection, access to medicines and patient support.",
    summary: "The Association of European Cancer Leagues is a non-profit, pan-European umbrella organisation that brings together 35 national and regional cancer societies, according to its about page, and has worked on cancer control in Europe since 1980. Based in Brussels, it gives cancer leagues a platform to work together on cancer prevention, early detection, access to medicines and patient support, and to advocate on these at EU level. It states that it is independent of the pharmaceutical industry and accepts no support from the tobacco industry or from companies whose products are deemed harmful to health. Its pages list the European Week Against Cancer and the European Code Against Cancer among its work. The European Medicines Agency lists it among eligible patients' and consumers' organisations.",
    programs: ["European Week Against Cancer", "European Code Against Cancer", "EU advocacy on prevention, early detection and access to medicines"],
    links: [{ label: "About ECL", url: "https://www.cancer.eu/about-us/" }, EMA],
    related: ["cancer-patients-europe", "eurordis", "iarc"], sections: ["prevention"] }),

  i({ id: "eurordis", name: "EURORDIS-Rare Diseases Europe", aka: ["EURORDIS", "Rare Diseases Europe"], institutionType: "consortium", city: "Paris", country: "FR", lat: 48.832, lng: 2.317, website: "https://www.eurordis.org",
    tldr: "A Paris-based alliance of rare disease patient organisations, founded in 1997, that speaks for people with rare diseases in Europe, including rare cancers.",
    summary: "EURORDIS is a non-governmental, patient-driven alliance of patient organisations and individuals in the field of rare diseases, founded in 1997, according to the European Medicines Agency's list of eligible organisations. The same entry says it represents more than 1,000 rare disease organisations in 74 countries and covers more than 4,000 distinct rare diseases. It is not a cancer organisation, but many cancers are rare diseases, and it works on the rules for medicines for rare diseases, European Reference Networks and Rare Disease Day. Its history page records Virginie Bros-Facer stepping down as chief executive, with Virginie Hivert as acting chief executive. Its office is at the former Hôpital Broussais site in Paris.",
    programs: ["Rare Disease Day", "EURORDIS Open Academy", "Rare Barometer patient surveys", "Advocacy on EU rare disease and pharmaceutical legislation"],
    links: [{ label: "EURORDIS: our history", url: "https://www.eurordis.org/who-we-are/our-history/" }, EMA],
    related: ["cancer-patients-europe"] }),

  i({ id: "europa-uomo", name: "Europa Uomo", aka: ["Europa Uomo, the European Prostate Cancer Coalition"], institutionType: "consortium", city: "Antwerp", country: "BE", lat: 51.219, lng: 4.402, website: "https://www.europa-uomo.org",
    tldr: "The European coalition of prostate cancer patient groups, founded in 2002 and based in Antwerp, which runs research on men's quality of life and campaigns for PSA-based screening programmes.",
    summary: "Europa Uomo (Italian for Europe man) describes itself as a European advocacy movement representing 31 prostate cancer patient groups. Its about page says it was founded in Rome in 2002 at a meeting on unmet needs in men with prostate cancer, instigated by Alberto Costa and Umberto Veronesi; a constitution followed in Antwerp in 2003, and it was legally established in Milan in June 2004 as a counterpart to Europa Donna. It is located in Antwerp and registered under Belgian law. Its members are patient-led organisations only, with one vote per country, according to the European Medicines Agency, which lists it as an eligible organisation. Its work includes research into the quality of life of men with prostate cancer, a campaign for PSA-based screening programmes across Europe, and support for national groups. A scientific committee chaired by Hein Van Poppel advises its board.",
    programs: ["Research into the quality of life of men with prostate cancer in Europe", "Campaign for PSA-based screening programmes in Europe", "Support for national prostate cancer patient groups"],
    links: [{ label: "Europa Uomo: who we are", url: "https://www.europa-uomo.org/who-we-are/" }, EMA],
    related: ["europa-donna", "myeloma-patients-europe"], cancers: ["prostate"], technologies: ["prostate-screening-psa-mri"] }),

  i({ id: "europa-donna", name: "Europa Donna, the European Breast Cancer Coalition", aka: ["Europa Donna", "European Breast Cancer Coalition"], institutionType: "consortium", city: "Milan", country: "IT", lat: 45.464, lng: 9.190, website: "https://www.europadonna.org",
    tldr: "The European breast cancer coalition, established in 1994 and based in Milan, whose members are breast cancer groups in 47 countries.",
    summary: "Europa Donna describes itself as the European Breast Cancer Coalition, an independent non-profit organisation whose members are affiliated groups from 47 EU and non-EU countries; its address is in Milan. Europa Uomo's history page dates its founding to 1994 and says Europa Uomo was modelled on it. Its website covers breast cancer prevention, early detection, treatment, metastatic breast cancer, research and advocacy to the European Parliament and Commission.",
    programs: ["Advocacy to the European Parliament and European Commission", "Information on breast cancer prevention, screening and treatment", "Metastatic breast cancer advocacy"],
    links: [{ label: "Europa Donna", url: "https://www.europadonna.org/" }, { label: "Europa Uomo history (founding year of Europa Donna)", url: "https://www.europa-uomo.org/who-we-are/" }],
    related: ["europa-uomo"], cancers: ["breast-cancer"] }),

  i({ id: "lung-cancer-europe", name: "Lung Cancer Europe", aka: ["LuCE"], institutionType: "consortium", city: "Bern", country: "CH", lat: 46.948, lng: 7.447, website: "https://www.lungcancereurope.eu",
    tldr: "The European network of lung cancer patient organisations, registered in Bern, which works to reduce stigma and to improve access to early diagnosis and treatment.",
    summary: "Lung Cancer Europe calls itself the voice of people living with lung cancer and their families at European level: a platform for lung cancer advocacy organisations across Europe that also helps national organisations form where none exist. Its stated priorities are earlier and more accurate diagnosis, equal access to optimal treatment and care, a stronger voice for the lung cancer community and changing the narrative that stigmatises the disease. The European Medicines Agency lists it as an eligible organisation. Its privacy policy names it as based in Switzerland, care of an address in Bern.",
    programs: ["European lung cancer advocacy", "Support for new national lung cancer organisations", "Knowledge Hub for member organisations"],
    links: [{ label: "Lung Cancer Europe: overview", url: "https://lungcancereurope.eu/overview" }, { label: "Lung Cancer Europe privacy policy (address)", url: "https://lungcancereurope.eu/privacy-policy" }, EMA],
    related: ["global-lung-cancer-coalition", "europa-uomo"], cancers: ["lung-cancer"] }),

  i({ id: "global-lung-cancer-coalition", name: "Global Lung Cancer Coalition", aka: ["GLCC"], institutionType: "consortium", city: "Liverpool", country: "GB", lat: 53.411, lng: -2.994, website: "https://www.lungcancercoalition.org",
    tldr: "An international coalition of lung cancer patient organisations, established in 2001, which runs patient-experience surveys and campaigns on lung cancer awareness and screening.",
    summary: "The Global Lung Cancer Coalition was established in 2001 and describes itself as the international voice of lung cancer patients; its about page lists 41 non-government patient organisations from 29 nations. It publishes yearly patient-experience surveys, surveys of public attitudes to lung cancer, reports on the state of lung cancer research and factsheets for patients, and runs awards for journalism. Its contact page directs membership and general enquiries to an address at the Roy Castle Lung Cancer Foundation in Liverpool, which is why it is placed there.",
    programs: ["Patient experience surveys", "Global surveys of attitudes to lung cancer", "Lung cancer research reports", "Patient factsheets"],
    links: [{ label: "About the GLCC", url: "https://www.lungcancercoalition.org/about-glcc/" }, { label: "GLCC contact page", url: "https://www.lungcancercoalition.org/about-glcc/contact-us/" }],
    related: ["lung-cancer-europe", "roy-castle-lung-cancer-foundation"], cancers: ["lung-cancer"] }),

  i({ id: "myeloma-patients-europe", name: "Myeloma Patients Europe", aka: ["MPE", "Myeloma Patients Europe AISBL"], institutionType: "consortium", city: "Brussels", country: "BE", lat: 50.833, lng: 4.364, website: "https://www.mpeurope.org",
    tldr: "The European network of myeloma patient organisations, based in Brussels, which since 2011 has campaigned for better treatment, access and care in myeloma.",
    summary: "Myeloma Patients Europe states that it has advocated for better treatment, access and care across Europe since 2011, and has set strategic goals for 2025 to 2030. The European Medicines Agency describes it as a European non-profit organisation of myeloma patient organisations that raises awareness, provides information, works to improve quality of life and to speed access to new treatments, and encourages new patient groups where none exist. It is a Belgian international non-profit association (AISBL) with its office on Avenue Louise in Brussels.",
    programs: ["Advocacy for timely access to myeloma treatments in Europe", "Patient information and education", "Support for new national myeloma patient groups"],
    links: [{ label: "MPE: our strategic goals", url: "https://www.mpeurope.org/about-mpe/our-goals/" }, { label: "MPE contact page", url: "https://www.mpeurope.org/contact-us/" }, EMA],
    related: ["myeloma-uk", "digestive-cancers-europe"], cancers: ["multiple-myeloma"] }),

  i({ id: "myeloma-uk", name: "Myeloma UK", institutionType: "consortium", city: "Edinburgh", country: "GB", lat: 55.953, lng: -3.188, website: "https://www.myeloma.org.uk",
    tldr: "The UK charity for myeloma, based in Edinburgh, which gives patients information and support, campaigns on access to treatments and funds research.",
    summary: "Myeloma UK describes itself as the only UK charity dedicated to providing support and influencing access to treatments while researching a cure for myeloma, and says its supporters have helped the myeloma community since 1997. It is a Scottish registered charity (SC026116) based in Edinburgh, according to the footer of its website.",
    programs: ["Patient information and support services", "Influencing access to myeloma treatments", "Myeloma research funding"],
    links: [{ label: "About Myeloma UK", url: "https://www.myeloma.org.uk/about-us/" }],
    related: ["myeloma-patients-europe"], cancers: ["multiple-myeloma"] }),

  i({ id: "lymphoma-coalition", name: "Lymphoma Coalition", aka: ["Lymphoma Coalition Europe", "LC", "LCE"], institutionType: "consortium", city: "Toronto", country: "CA", lat: 43.62, lng: -79.51, website: "https://lymphomacoalition.org",
    tldr: "A worldwide network of lymphoma patient organisations, formed in 2002, with a European branch, Lymphoma Coalition Europe, that takes part in European Medicines Agency work.",
    summary: "Lymphoma Coalition is a worldwide network of patient groups that focus fully or partly on lymphoma; it was formed in 2002 by four lymphoma organisations and incorporated as a not-for-profit in 2010, and it states that it now has more than 90 member organisations from more than 55 countries. It aims to be a source of consistent information on lymphoma and to help member organisations share resources and practice, and publishes an International Lymphoma Patient Charter. Lymphoma Coalition Europe, its regional branch for Europe, Turkey and Israel, is on the European Medicines Agency's list of eligible organisations. Its address is in Etobicoke, Toronto.",
    programs: ["Lymphoma facts and statistics for member organisations", "International Lymphoma Patient Charter", "Capacity building for new and existing lymphoma groups"],
    links: [{ label: "Lymphoma Coalition: vision and mission", url: "https://lymphomacoalition.org/vision-mission/" }, { label: "Lymphoma Coalition contact page", url: "https://lymphomacoalition.org/contact-us/" }, EMA],
    related: ["cll-advocates-network"], cancers: ["non-hodgkin-lymphoma", "hodgkin-lymphoma"] }),

  i({ id: "cml-advocates-network", name: "CML Advocates Network", aka: ["CMLAN", "CML AN"], institutionType: "consortium", city: "Bern", country: "CH", lat: 46.948, lng: 7.447, website: "https://www.cmladvocates.net",
    tldr: "A patient-run network that connects chronic myeloid leukaemia (CML) patient organisations in 96 countries and trains patient advocates.",
    summary: "The CML Advocates Network connects 131 patient organisations in 96 countries, according to its own page. It was first discussed in 2005 at the fourth New Horizons conference for CML and GIST patient groups in Dublin, started by patient leaders from Germany, Israel, the Czech Republic and the UK, and its website began in 2007. It is run independently by patients, led by a steering committee of nine advocates from all six world regions with Sarunas Narbutas as chairman, and hosted by the Leukemia Patient Advocates Foundation in Bern. It runs a stopping-treatment resource centre, a global leukaemia patient experience survey and a blood cancer patient advocates academy.",
    programs: ["Stopping Treatment Resource Centre", "Global Leukemia Experience Survey", "Blood Cancer Patient Advocates Academy"],
    links: [{ label: "CML Advocates Network: our story", url: "https://www.cmladvocates.net/our-story/" }],
    related: ["acute-leukemia-advocates-network", "the-max-foundation"], cancers: ["cml"] }),

  i({ id: "acute-leukemia-advocates-network", name: "Acute Leukemia Advocates Network", aka: ["ALAN"], institutionType: "consortium", city: "Bern", country: "CH", lat: 46.948, lng: 7.447, website: "https://acuteleuk.org",
    tldr: "An independent global network of patient organisations for acute leukaemias, hosted in Bern, which develops patient information and strengthens national groups.",
    summary: "The Acute Leukemia Advocates Network describes itself as an independent global network of patient organisations working to change outcomes for patients with acute leukaemias by strengthening patient advocacy. It is hosted by the Leukemia Patient Advocates Foundation, a patient-led non-profit foundation in Bern. Its aims are patient information and support for acute leukaemias in all countries, stronger patient organisations, awareness, and advocacy for treatment, care and access. It publishes a code of conduct and a code of practice on working with the pharmaceutical industry (both September 2023).",
    programs: ["Patient information on acute leukaemias", "Toolkits and shared practice for patient organisations", "Code of Practice on working with industry"],
    links: [{ label: "About ALAN", url: "https://acuteleuk.org/about/" }],
    related: ["cll-advocates-network"], cancers: ["aml", "all-leukemia"] }),

  i({ id: "cll-advocates-network", name: "CLL Advocates Network", aka: ["CLLAN"], institutionType: "consortium", city: "Bern", country: "CH", lat: 46.948, lng: 7.447, website: "https://www.clladvocates.net",
    tldr: "A global network of chronic lymphocytic leukaemia (CLL) patient advocates, founded in 2014, which builds tools for national groups and advocates for better care.",
    summary: "The CLL Advocates Network was founded in 2014 by representatives from Canada, the Czech Republic, France, Italy, Portugal, the UK and the United States, and is hosted by the Leukaemia Patient Advocates Foundation in Bern, according to its about page. A steering committee of nine, seven of them patients, governs it. Its stated objective is to improve CLL care and outcomes by acting as an international collective of CLL patient advocates, developing tools for local communities and advocating for care and access; individual support stays with national groups. It runs a CLL clinical trials hub and patient and carer experience surveys.",
    programs: ["CLL Clinical Trials Hub", "Leukemia patient and carer experience surveys", "Patient guide to BTK inhibitors"],
    links: [{ label: "About the CLL Advocates Network", url: "https://www.clladvocates.net/about/" }],
    related: ["cml-advocates-network", "lymphoma-coalition"], cancers: ["cll"] }),

  i({ id: "the-max-foundation", name: "The Max Foundation", institutionType: "consortium", city: "Seattle, WA", country: "US", lat: 47.606, lng: -122.332, website: "https://themaxfoundation.org",
    tldr: "A global health charity, founded in 1997, that delivers donated cancer medicines, diagnostics and services to patients in low- and middle-income countries, beginning with leukaemia.",
    summary: "The Max Foundation began in 1997 as a volunteer group helping Latin American families of children with leukaemia, and is named after Maximiliano Rivarola, who died of chronic myeloid leukaemia in 1991 aged 17, according to its about page. With Novartis it developed and administered the Glivec International Patient Assistance Program, a direct-to-patient donation programme of imatinib for patients in more than 70 low- and middle-income countries. It later formed the Humanitarian Partnership for Access to Critical Treatment with five pharmaceutical companies and launched Max Access Solutions, a portfolio of cancer medicines, diagnostics and patient services. It states that it has reached more than 100,000 people in over 80 countries and has delivered more than 20 million daily doses through Max Access Solutions. Its office is in Seattle.",
    programs: ["Max Access Solutions (donated cancer medicines, diagnostics and services)", "Glivec International Patient Assistance Program (with Novartis)", "Humanitarian Partnership for Access to Critical Treatment"],
    links: [{ label: "About The Max Foundation", url: "https://themaxfoundation.org/about/" }, irs("911893957")],
    related: ["cml-advocates-network", "imatinib"], companies: ["novartis"], cancers: ["cml"] }),

  i({ id: "world-ovarian-cancer-coalition", name: "World Ovarian Cancer Coalition", institutionType: "consortium", city: "Toronto", country: "CA", lat: 43.676, lng: -79.398, website: "https://worldovariancancercoalition.org",
    tldr: "A global not-for-profit coalition, started in 2016, that unites ovarian cancer patient organisations and gathers evidence from women's experience to improve diagnosis and care.",
    summary: "The World Ovarian Cancer Coalition describes itself as the only global not-for-profit organisation dedicated exclusively to ovarian cancer and says that since 2016 it has united more than 200 patient advocacy organisations. It gathers evidence from women's experience, including the Every Woman Study and research on the socioeconomic burden of ovarian cancer, and runs Project PROTECT, a framework to reduce ovarian cancer deaths. It is a Canadian not-for-profit corporation (incorporated 16 March 2016) with its registered office in Toronto.",
    programs: ["Every Woman Study", "Socioeconomic burden of ovarian cancer study", "Project PROTECT", "World Ovarian Cancer Day"],
    links: [{ label: "About the World Ovarian Cancer Coalition", url: "https://worldovariancancercoalition.org/about-us/" }],
    related: ["world-bladder-cancer-patient-coalition"], cancers: ["ovarian"] }),

  i({ id: "world-bladder-cancer-patient-coalition", name: "World Bladder Cancer Patient Coalition", aka: ["WBCPC"], institutionType: "consortium", city: "Brussels", country: "BE", lat: 50.839, lng: 4.373, website: "https://worldbladdercancer.org",
    tldr: "A global coalition of bladder cancer patient organisations, based in Brussels, which helps set up national groups and campaigns for awareness and better care.",
    summary: "The World Bladder Cancer Patient Coalition is a global patient organisation that supports existing bladder cancer patient groups, helps new ones form, raises awareness with a focus on under-represented countries, and advocates for the best possible treatment, care and information. It states that it represents 16 member patient organisations from 13 countries. It is a Belgian international non-profit association (aisbl, registration number 0720.618.047) at Square de Meeûs in Brussels.",
    programs: ["Building national bladder cancer patient groups", "Global awareness campaigns", "Evidence-based advocacy"],
    links: [{ label: "WBCPC: our work", url: "https://worldbladdercancer.org/our-work/" }],
    related: ["international-brain-tumour-alliance", "bcan"], cancers: ["urothelial"] }),

  i({ id: "international-brain-tumour-alliance", name: "International Brain Tumour Alliance", aka: ["IBTA"], institutionType: "consortium", city: "Tadworth", country: "GB", lat: 51.290, lng: -0.235, website: "https://theibta.org",
    tldr: "A global network, founded in 2005, for brain tumour patient organisations and others in neuro-oncology, which encourages new patient groups where none exist.",
    summary: "The International Brain Tumour Alliance is a global network founded in 2005 as a worldwide community for brain tumour patient organisations and others in neuro-oncology, according to its about page. It says it works across more than 100 countries with patients, researchers, clinicians, industry, regulators and the media, encourages brain tumour patient groups in countries where none exist, and supports rather than replaces established ones. It is a not-for-profit limited company incorporated in England and Wales (company number 6031485), with an address in Tadworth, Surrey.",
    programs: ["Support for new brain tumour patient groups", "IBTA e-News", "International advocacy in neuro-oncology"],
    links: [{ label: "IBTA: who we are", url: "https://theibta.org/who-we-are/" }],
    related: ["world-ovarian-cancer-coalition"], cancers: ["brain-tumours"] }),

  i({ id: "international-neuroendocrine-cancer-alliance", name: "International Neuroendocrine Cancer Alliance", aka: ["INCA"], institutionType: "consortium", city: "Newton, MA", country: "US", lat: 42.337, lng: -71.209, website: "https://incalliance.org",
    tldr: "A global alliance, incorporated in 2013, that speaks for people with neuroendocrine cancers and inherited neuroendocrine tumours and campaigns for faster diagnosis.",
    summary: "The International Neuroendocrine Cancer Alliance describes itself as the global voice for patients with neuroendocrine cancer and genetic neuroendocrine tumours and their carers. Its stated mission is to raise awareness of all types of neuroendocrine tumours, push for research on unmet needs, and provide a platform for global collaboration on timely diagnosis and access to treatment and care. It is a US 501(c)(3) non-profit incorporated in 2013, with an address in Newton, Massachusetts.",
    programs: ["Awareness campaigns on neuroendocrine neoplasms", "Think NENs global educational programme", "Global collaboration among NET patient groups"],
    links: [{ label: "INCA: mission and vision", url: "https://incalliance.org/mission-vision/" }, irs("462961023")],
    related: ["european-men-alliance"], cancers: ["neuroendocrine"] }),

  i({ id: "european-men-alliance", name: "European MEN Alliance", aka: ["EMENA"], institutionType: "consortium", city: "Munich", country: "DE", lat: 48.137, lng: 11.575,
    tldr: "A European umbrella organisation, founded in Munich in 2013, that brings together patient groups and specialists for multiple endocrine neoplasia (MEN) syndromes.",
    summary: "The European MEN Alliance was founded in 2013 in Munich as an umbrella organisation with equal representation from European patient groups and expert medical professionals, according to the European Medicines Agency, which lists it as an eligible organisation. It provides information and support to people with multiple endocrine neoplasia types 1 to 4, publishes medical, social and legal information, organises scientific events and promotes MEN patient groups. Its own website did not answer when checked on 4 November 2026, so the EMA entry is the source.",
    programs: ["Information for people with MEN syndromes", "Scientific events on MEN", "Promotion of MEN patient groups"],
    links: [EMA],
    related: ["international-neuroendocrine-cancer-alliance"], cancers: ["multiple-endocrine-neoplasia", "men1-syndrome", "men2-syndrome"] }),

  i({ id: "childhood-cancer-international", name: "Childhood Cancer International", aka: ["CCI"], institutionType: "consortium", city: "Amsterdam", country: "NL", lat: 52.370, lng: 4.904, website: "https://www.childhoodcancerinternational.org",
    tldr: "The global parent-led network of childhood cancer organisations, founded in 1994, with more than 214 member organisations in 100 countries.",
    summary: "Childhood Cancer International was founded in 1994 as an umbrella organisation of grassroots and national childhood cancer parent organisations, according to its about page. It describes itself as a global, parent-driven non-profit representing more than 214 member organisations in 100 countries, including parents' and survivors' associations, support groups and cancer societies. Its page notes that survival is 80 per cent in most high-income countries but can be as low as 20 per cent in low- and middle-income countries, and cites WHO's estimate that more than 400,000 children and adolescents under 20 are diagnosed with cancer each year. Its head office is in Amsterdam.",
    programs: ["Advocacy for access to childhood cancer care worldwide", "Support for parent and survivor organisations", "Knowledge portal for members"],
    links: [{ label: "About CCI", url: "https://www.childhoodcancerinternational.org/about-cci" }, { label: "CCI contact page", url: "https://www.childhoodcancerinternational.org/contact-us" }],
    related: ["youth-cancer-europe", "siop-europe"], cancers: ["childhood-cancers"] }),

  i({ id: "youth-cancer-europe", name: "Youth Cancer Europe", aka: ["YCE", "Youth Cancer Europe Foundation"], institutionType: "consortium", city: "Cluj-Napoca", country: "RO", lat: 46.771, lng: 23.624, website: "https://youthcancereurope.org",
    tldr: "A patient-led network of young people affected by cancer in more than 40 countries, registered in Romania, which campaigns for their voice in European cancer policy.",
    summary: "Youth Cancer Europe was created by Shajjad and Katie Rizvi, founders of the Little People cancer charity in Romania, with Šarūnas Narbutas, a cancer survivor and president of the Lithuanian Cancer Society, according to its about page. The foundation was legally founded by Asociația Little People Romania and has its seat in Cluj-Napoca. It describes itself as a patient-led movement connecting young people affected by cancer across more than 40 countries, and leads YARN, an EU-funded project with a Youth Cancer Council of 100 young people with lived experience of cancer.",
    programs: ["YARN project and the Youth Cancer Council", "Youth-led advocacy on European cancer policy"],
    links: [{ label: "About Youth Cancer Europe", url: "https://youthcancereurope.org/about-yce/" }, { label: "Youth Cancer Europe", url: "https://youthcancereurope.org/" }],
    related: ["childhood-cancer-international", "cml-advocates-network"], cancers: ["aya-cancers"] }),

  i({ id: "digestive-cancers-europe", name: "Digestive Cancers Europe", aka: ["DiCE", "EuropaColon"], institutionType: "consortium", city: "Brussels", country: "BE", lat: 50.843, lng: 4.384, website: "https://digestivecancers.eu",
    tldr: "The European patient organisation for all digestive cancers, which grew in 2018 out of EuropaColon, a colorectal cancer group started in 2004.",
    summary: "Digestive Cancers Europe began in 2004 as EuropaColon, founded by Jola Gore-Booth, then chief executive of Colon Cancer Concern (now Bowel Cancer UK), with Eric Van Cutsem, according to its history page. EuropaColon launched European Colon Cancer Awareness Month in March 2008 and in 2015 extended its work to pancreatic and stomach cancers. In 2018 it became Digestive Cancers Europe, covering colorectal, gastric, oesophageal, liver, pancreatic and rare digestive cancers. It runs a Colorectal Cancer Navigator for patients and awareness months for each cancer, and is registered as a Belgian non-profit (vzw/asbl) in Brussels.",
    programs: ["European Colorectal Cancer Awareness Month", "Colorectal Cancer Navigator", "Awareness months for gastric, oesophageal, liver and pancreatic cancer", "Support for national member organisations"],
    links: [{ label: "DiCE history", url: "https://digestivecancers.eu/dice-history/" }, { label: "DiCE contact page", url: "https://digestivecancers.eu/contact-us/" }],
    related: ["global-colon-cancer-association", "world-pancreatic-cancer-coalition", "melanoma-patient-network-europe", "bowel-cancer-uk"], cancers: ["colorectal", "gastric", "esophageal", "hcc", "pancreatic"] }),

  i({ id: "global-colon-cancer-association", name: "Global Colon Cancer Association", aka: ["GCCA"], institutionType: "consortium", city: "Washington, DC", country: "US", lat: 38.960, lng: -77.086, website: "https://www.globalcca.org",
    tldr: "An international umbrella body for colorectal cancer patient groups, formed in 2011, which campaigns for fair access to screening, testing and treatment.",
    summary: "The Global Colon Cancer Association was formed in 2011 by Jola Gore-Booth, co-founder of EuropaColon, and Andrew Spiegel, co-founder of the Colorectal Cancer Alliance, according to its about page. It is both an umbrella organisation, for patient groups, health and research institutions, professional societies and industry partners, and a patient advocacy organisation working for equitable access to colorectal cancer screening, testing, treatment and care. Its programmes include Know Your Biomarker and a global ostomy programme. The IRS record lists it in Washington, DC.",
    programs: ["Know Your Biomarker", "Global CRC Congress", "Patient Advocacy Mentorship", "Global Ostomy Program"],
    links: [{ label: "About GCCA", url: "https://www.globalcca.org/about" }, irs("460657002")],
    related: ["digestive-cancers-europe", "colorectal-cancer-alliance"], cancers: ["colorectal"] }),

  i({ id: "sarcoma-patient-advocacy-global-network", name: "Sarcoma Patient Advocacy Global Network", aka: ["SPAGN", "Sarcoma Patients EuroNet"], institutionType: "consortium", city: "Wölfersheim", country: "DE", lat: 50.400, lng: 8.811, website: "https://www.sarcoma-patients.org",
    tldr: "The global network of national sarcoma patient groups, registered in Germany, with more than 80 member groups on five continents.",
    summary: "The Sarcoma Patient Advocacy Global Network describes itself as the global network of national sarcoma patient advocacy organisations, with more than 80 member groups from five continents, working to improve treatment and care through information and support and by raising the visibility of sarcoma with policymakers and the public. It is a registered association under German law (e.V., register number VR 2609 at Friedberg) with an address in Wölfersheim. The address of its earlier name, Sarcoma Patients EuroNet (sarcoma-patients.eu), now serves its site.",
    programs: ["Annual conference", "Sarcoma awareness campaigns", "Research projects and patient surveys", "Lifetime Achievement Awards"],
    links: [{ label: "SPAGN: who we are", url: "https://www.sarcoma-patients.org/who-we-are/" }, { label: "SPAGN imprint (registration)", url: "https://www.sarcoma-patients.org/imprint/" }, { label: "SPAGN", url: "https://www.sarcoma-patients.org/" }],
    related: ["life-raft-group"], cancers: ["sarcoma"] }),

  i({ id: "life-raft-group", name: "The Life Raft Group", aka: ["Life Raft Group", "LRG"], institutionType: "consortium", city: "Wayne, NJ", country: "US", lat: 40.925, lng: -74.276, website: "https://liferaftgroup.org",
    tldr: "A US patient organisation for gastrointestinal stromal tumour (GIST), started online in 2000 by patients in the early imatinib trials, which supports patients and funds research.",
    summary: "The Life Raft Group started in 2000, when a handful of patients in the early Gleevec (imatinib) trials began sharing their experiences online; many had been misdiagnosed with leiomyosarcoma before learning they had gastrointestinal stromal tumour, according to its mission page. It incorporated in June 2002 and became a 501(c)(3) non-profit in New Jersey on 10 June 2002. It provides research, education, advocacy and support for GIST patients regardless of their means, including help for patients in other countries to obtain GIST treatment. Its office is in Wayne, New Jersey.",
    programs: ["GIST patient education and mentors", "GIST research", "Advocacy for access to GIST treatment worldwide", "Financial aid for GIST patients"],
    links: [{ label: "The LRG mission and vision", url: "https://liferaftgroup.org/the-lrg-mission-vision/" }, irs("820547746")],
    related: ["sarcoma-patient-advocacy-global-network", "imatinib"], cancers: ["gist"] }),

  i({ id: "kidney-cancer-association", name: "Kidney Cancer Association", aka: ["KCA"], institutionType: "consortium", city: "Dallas, TX", country: "US", lat: 32.777, lng: -96.797, website: "https://www.kidneycancer.org",
    tldr: "A kidney cancer charity founded in Chicago in 1990 by a patient and doctors, which funds research, runs medical symposiums and educates patients and carers.",
    summary: "The Kidney Cancer Association was founded in 1990 by Eugene P. Schonfeld and a small group of patients and doctors in Chicago and has grown into an international non-profit, according to its about page. It holds two research symposiums a year, runs a grant programme, takes part in legislative advocacy and provides education and patient navigation for patients and carers. It is a 501(c)(3) organisation; the IRS record lists it in Dallas, Texas.",
    programs: ["Research symposiums and grants", "Patient navigator programmes", "Patient and caregiver education", "Legislative advocacy"],
    links: [{ label: "About the KCA", url: "https://www.kidneycancer.org/about/" }, irs("363719712")],
    related: ["international-kidney-cancer-coalition"], cancers: ["rcc"] }),

  i({ id: "international-kidney-cancer-coalition", name: "International Kidney Cancer Coalition", aka: ["IKCC", "Stichting International Kidney Cancer Coalition"], institutionType: "consortium", city: "Utrecht", country: "NL", lat: 52.090, lng: 5.122, website: "https://ikcc.org",
    tldr: "An international network of kidney cancer patient organisations, started in 2009 and registered in the Netherlands, with partner organisations in 34 countries.",
    summary: "The International Kidney Cancer Coalition was initiated in September 2009 and registered in December 2014 as a Dutch foundation (Stichting, chamber of commerce number 62070665) at an address in Utrecht, according to its website, which lists 62 partner organisations in 34 countries. It brings together patient organisations working to improve the lives of people affected by kidney cancer.",
    programs: ["International network of kidney cancer patient organisations"],
    links: [{ label: "International Kidney Cancer Coalition", url: "https://ikcc.org/" }],
    related: ["kidney-cancer-association"], cancers: ["rcc"] }),

  i({ id: "alk-positive-patient-group", name: "ALK Positive", aka: ["ALK Positive Inc", "ALK Positive Incorporated"], institutionType: "consortium", city: "Atlanta, GA", country: "US", lat: 33.749, lng: -84.388, website: "https://alkpositive.org",
    tldr: "A patient-founded group for people with ALK-positive cancer, begun in 2015, with more than 3,000 patients and carers in over 55 countries; it offers second opinions from specialists.",
    summary: "ALK Positive began in 2015 as a support community started by Merita Carroll, an oncology nurse with stage IV ALK-positive lung cancer, who died in 2018, according to its about page. ALK Positive Inc. was founded in 2017 as the 501(c)(3) advocacy arm of the support group and states that it now connects more than 3,000 patients and care partners in more than 55 countries. It runs a second opinion programme with specialists in ALK-positive lung cancer, and educates patients and care partners. The IRS record lists it in Atlanta.",
    programs: ["Second Opinion Program", "Patient and care partner education"],
    links: [{ label: "About ALK Positive", url: "https://alkpositive.org/about-us/" }, irs("852221062")],
    related: ["the-ros1ders", "lungevity"], cancers: ["alk-positive-nsclc"], targets: ["alk"] }),

  i({ id: "the-ros1ders", name: "The ROS1ders", aka: ["ROS1ders", "The ROS1ders, Inc."], institutionType: "consortium", city: "Sacramento, CA", country: "US", lat: 38.582, lng: -121.494, website: "https://www.theros1ders.org",
    tldr: "A volunteer group of patients and carers living with ROS1-positive cancer, founded in 2015, whose members donate tumour samples to build research models.",
    summary: "The ROS1ders was founded in 2015 by a small group of patients with ROS1-positive lung cancer and incorporated in 2019 as a 501(c)(3) non-profit run by volunteers, most of them patients or caregivers, according to its about page. It describes itself as the largest collection of ROS1-positive patients and caregivers in the world, with hundreds of members in dozens of countries. Members donate fresh tumour specimens to create cancer models, and it has partnered with other non-profits to drive research into ROS1-positive cancers. The IRS record lists it in Sacramento.",
    programs: ["Tumour specimen donation for cancer models", "Patient and caregiver community", "PRIME Summit"],
    links: [{ label: "About The ROS1ders", url: "https://www.theros1ders.org/about-the-ros1ders" }, irs("834490547")],
    related: ["egfr-resisters"], cancers: ["ros1-positive-nsclc"], targets: ["ros1"] }),

  i({ id: "egfr-resisters", name: "EGFR Resisters", aka: ["EGFR Lung Cancer Resisters", "EGFR Positive Lung Cancer Resisters"], institutionType: "consortium", city: "Deerfield, IL", country: "US", lat: 42.171, lng: -87.844, website: "https://egfrcancer.org",
    tldr: "A grassroots community of patients and carers affected by EGFR-positive lung cancer, which shares treatment experience and trial information and supports research.",
    summary: "The EGFR Resisters describes itself as a global, non-profit, patient-driven community of patients and caregivers affected by EGFR-positive lung cancer, dedicated to changing it into a manageable, chronic disease. Members share treatment experiences, information on clinical trials and research news, and it holds an annual patient and caregiver summit. The IRS record lists it in Deerfield, Illinois.",
    programs: ["Patient and Caregiver Summit", "Patient community and clinical trial information", "Collaboration on research and care"],
    links: [{ label: "EGFR Resisters: our mission", url: "https://egfrcancer.org/our-mission/" }, irs("332104656")],
    related: ["kras-kickers"], cancers: ["egfr-mutant-nsclc"], targets: ["egfr"] }),

  i({ id: "kras-kickers", name: "KRAS Kickers", aka: ["KRAS Cancer Connect"], institutionType: "consortium", city: "Charlotte, NC", country: "US", lat: 35.227, lng: -80.843, website: "https://www.kraskickers.org",
    tldr: "A non-profit for people with cancers driven by a KRAS mutation, founded by a lung cancer patient, which helps patients understand KRAS research.",
    summary: "KRAS Kickers is a non-profit for patients with KRAS-mutant cancers, survivors and their families, founded by Terri Conneran, a patient with KRAS G12D lung cancer who found no group dedicated to KRAS, according to its about page. It explains KRAS research and biomarker testing to patients. Its site is published by KRAS Cancer Connect, a 501(c)(3) non-profit; the IRS record for KRAS Cancer Connect lists it in Charlotte, North Carolina.",
    programs: ["Patient guides to KRAS research and biomarkers", "Patient community"],
    links: [{ label: "About KRAS Kickers", url: "https://www.kraskickers.org/about" }, irs("854372947")],
    related: ["alk-positive-patient-group"], cancers: ["kras-g12c-nsclc", "nsclc"], targets: ["kras"] }),
];

export const collectionsPatientCoalitions: CollectionInput[] = [
  col({ id: "melanoma-patient-network-europe", name: "Melanoma Patient Network Europe", aka: ["MPNE", "MPNEsupport"], url: "https://www.mpneurope.org/", maintainer: "Melanoma Patient Network Europe (MPNEsupport, a non-profit registered in Sweden)",
    holds: "A volunteer network of melanoma patients, carers and advocates across Europe working on access to prevention, early detection and treatment, with publications, annual meetings and a list of national members.",
    tldr: "A volunteer network of melanoma patients and advocates in Europe, founded in 2013, that works on access to prevention, early detection and effective treatment.",
    summary: "Melanoma Patient Network Europe continues the work of m-icab, the Melanoma Independent Community Advisory Board, founded in 2010 by Patricia Garcia-Prieto and Quentin van Daele, both patients with metastatic melanoma, according to its history page. Bettina Ryll took over its leadership after Garcia-Prieto's death in 2013 and founded MPNE that year to cover broader advocacy. It says it has no office and splits its work among volunteers. Its legal body, MPNEsupport, is a non-profit registered in Sweden (organisational number 168024921069).",
    links: [{ label: "MPNE history", url: "https://www.mpneurope.org/history" }, { label: "About MPNE", url: "https://www.mpneurope.org/about" }],
    related: ["lung-cancer-europe"], cancers: ["melanoma"], tags: ["patient-org"] }),

  col({ id: "world-pancreatic-cancer-coalition", name: "World Pancreatic Cancer Coalition", aka: ["WPCC"], url: "https://www.worldpancreaticcancercoalition.org/", maintainer: "World Pancreatic Cancer Coalition member organisations",
    holds: "Campaign materials for World Pancreatic Cancer Day and a directory of member patient organisations by country.",
    tldr: "A global coalition of pancreatic cancer patient organisations, formed after a 2013 meeting, that runs the annual World Pancreatic Cancer Day campaign.",
    summary: "The World Pancreatic Cancer Coalition grew out of a 2013 meeting at which pancreatic cancer patient organisations from around the world agreed to work together on awareness, according to its about page. Its members are patient advocacy organisations; individuals cannot join. It runs the annual World Pancreatic Cancer Day campaign on symptoms and risk factors. It states that it is not a legal entity and does not raise money for research or programmes; its member organisations do.",
    links: [{ label: "About the WPCC", url: "https://www.worldpancreaticcancercoalition.org/about-us/" }],
    related: ["digestive-cancers-europe", "pancan"], cancers: ["pancreatic"], tags: ["patient-org"] }),
];
