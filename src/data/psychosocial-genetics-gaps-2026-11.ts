import type { CollectionInput, CompanyInput, EntityInput, InstitutionInput, TermInput } from "@/lib/schema";

/**
 * November 2026 gap fill, census types psycho-oncology-services and genetic-counselling-services
 * (docs/proposals/gap-census-2026-11.md). Every fact was read on 4 November 2026 as raw text from the page linked on the
 * record:
 *  - the International Psycho-Oncology Society (IPOS) About, For Patients and Standard pages, and its Federation page with
 *    one country page per national society (ipos-society.org/federation/<country>); founding years are the ones those
 *    country pages print. Member counts on those pages are undated (Japan's is stamped 2013), so none is repeated here.
 *  - Deutsche Krebshilfe's page on psychosocial cancer counselling centres.
 *  - Health Education England's GeNotes page on the seven NHS Genomic Laboratory Hubs and their lead trusts, and the
 *    regional sites that answered a script (North East and Yorkshire served a bot challenge; North Bristol's page did
 *    not load).
 *  - the National Society of Genetic Counselors' Find a Genetic Counselor landing page.
 *  - the German Consortium for Hereditary Breast and Ovarian Cancer's pages on its tasks and its centres.
 * Coordinates are approximations: the stated seat where a page gives one (IPOS in Toronto, PoCoG at the University of
 * Sydney, the German consortium's office at Uniklinik Köln, a hub's lead trust), otherwise the country's capital or main
 * city, which is a map position and not a claim about where the society works. Professional societies use
 * institutionType "consortium".
 */

const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type C = Omit<CollectionInput, "kind" | "asOf">;
const c = (x: C): CollectionInput => ({ kind: "collection", asOf, ...x });
type T = Omit<TermInput, "kind" | "asOf">;
const t = (x: T): TermInput => ({ kind: "term", asOf, ...x });

const FED = (country: string) => ({ label: "IPOS Federation country page", url: `https://ipos-society.org/federation/${country}` });

/** A national member of the IPOS Federation: a society of professionals, not a service that sees patients. */
type S = Omit<I, "institutionType" | "institutions" | "technologies"> & { fed: string };
const society = ({ fed, links, ...x }: S): InstitutionInput =>
  i({ ...x, institutionType: "consortium", institutions: ["ipos"], technologies: ["psycho-oncology"], links: [FED(fed), ...(links ?? [])], tags: ["professional-society"] });

const SOCIETIES: InstitutionInput[] = [
  society({ fed: "armenia", id: "armenian-psycho-oncology-association", name: "Armenian Psycho-Oncology Association", aka: ["APOA"], city: "Yerevan", country: "AM", lat: 40.179, lng: 44.499, website: "https://apoa.am/",
    tldr: "Armenia's society for professionals who give emotional and psychological support to people with cancer; it trains and connects them rather than seeing patients itself.",
    summary: "The Armenian Psycho-Oncology Association is Armenia's member of the IPOS Federation. Its IPOS country page gives 2016 as its founding year and 2020 as the year it joined IPOS, and describes a membership made up mostly of psychologists (73.4 per cent), with physicians, social workers, nurses, palliative medicine specialists, psychiatrists and human rights defenders. It runs a newsletter and an email list and holds no conference or journal of its own." }),
  society({ fed: "belgium", id: "belgian-society-of-psychosocial-oncology", name: "Belgian Society of Psychosocial Oncology", aka: ["BSPO"], city: "Brussels", country: "BE", lat: 50.847, lng: 4.357, website: "http://bspo.be/agora/",
    tldr: "Belgium's scientific society for psychologists who work with people with cancer, their relatives and carers, in hospitals or in private practice.",
    summary: "The Belgian Society of Psychosocial Oncology is, by its IPOS country page, a national scientific society of Belgian psychologists working with patients with cancer, their relatives and caregivers, in hospital or private settings. Its stated goals are the study of the psychological, medical, social and ethical aspects of cancer and its treatment, interdisciplinary promotion of psychosocial oncology research, and a forum for communicating research through meetings and publications. It runs a website that serves as a platform for exchange among Belgian psycho-oncologists." }),
  society({ fed: "brazil", id: "sociedade-brasileira-de-psico-oncologia", name: "Sociedade Brasileira de Psico-Oncologia", aka: ["SBPO"], city: "Brasília", country: "BR", lat: -15.794, lng: -47.882, website: "https://sbpo.org.br/",
    tldr: "Brazil's society for psychologists and other professionals who care for the emotional needs of people with cancer.",
    summary: "The Sociedade Brasileira de Psico-Oncologia is Brazil's member of the IPOS Federation. Its IPOS country page gives 1994 as its founding year, describes a membership that is 90 per cent psychologists with physicians, social workers and nurses making up the rest, and records a congress every two years and an email list." }),
  society({ fed: "canada", id: "canadian-association-of-psychosocial-oncology", name: "Canadian Association of Psychosocial Oncology", aka: ["CAPO"], city: "Ottawa", country: "CA", lat: 45.421, lng: -75.697, website: "https://www.capo.ca/",
    tldr: "Canada's society for professionals who look after the emotional, social and spiritual side of cancer; its website has a section of resources for patients.",
    summary: "The Canadian Association of Psychosocial Oncology describes itself on its IPOS country page as an organisation of professionals, clinicians, researchers, educators and others dedicated to the social, psychological, emotional, spiritual and quality-of-life aspects of cancer, fostering interdisciplinary excellence in psychosocial research, education and clinical practice. The same page gives 1987 as its founding year and a membership of psychologists (32 per cent), social workers (27), nurses (13) and others. It holds an annual conference and has a journal. Its own site carries clinical practice guidance, a staffing framework for psychosocial oncology programmes, and a patients section.",
    links: [{ label: "CAPO patients section", url: "https://www.capo.ca/patients" }] }),
  society({ fed: "china", id: "chinese-psycho-oncology-society", name: "Chinese Psycho-Oncology Society", aka: ["CPOS", "Chinese Psychosocial Oncology Society"], city: "Beijing", country: "CN", lat: 39.904, lng: 116.407,
    tldr: "China's national society for psychological care in cancer, part of the China Anti-Cancer Association; it brings together doctors, nurses and psychologists.",
    summary: "By its IPOS country page, the Chinese Psychosocial Oncology Society is a national academic organisation founded in 2006 as part of the Chinese Anti-Cancer Association, with the aim of improving the clinical application of psychosocial oncology and nationwide research. Its membership is physicians (35 per cent), nurses (25), psychiatrists (15), psychologists (13), social workers and others. It holds an annual conference and has no website of its own listed.",
    related: ["caca"] }),
  society({ fed: "czech", id: "institute-of-applied-psychology-czech", name: "Institute of Applied Psychology (Czech Republic)", aka: ["IAP"], city: "Prague", country: "CZ", lat: 50.076, lng: 14.438, website: "http://www.aplikovanapsychologie.cz/en/",
    tldr: "The Czech member of the international psycho-oncology federation: an institute for research, teaching and counselling for patients in psycho-oncology.",
    summary: "The IPOS country page for the Czech Republic names the Institute of Applied Psychology as the national member and states that it was established for scientific and research activities, consulting services for patients, and educational activities in psychoneuroimmunology and psycho-oncology." }),
  society({ fed: "france", id: "societe-francaise-psycho-oncologie", name: "French and Francophone Society of Psycho-Oncology", aka: ["SFFPO", "SFPO"], city: "Paris", country: "FR", lat: 48.857, lng: 2.352, website: "https://sffpo.fr/",
    tldr: "The society for French-speaking professionals who care for the emotional needs of people with cancer, with an annual congress and its own journal.",
    summary: "The French and Francophone Society of Psycho-Oncology is France's member of the IPOS Federation. Its IPOS country page gives 1982 as its founding year, a membership that is 65 per cent psychologists with physicians (18) and psychiatrists (13), an annual congress, and the journal Psycho-Oncologie." }),
  society({ fed: "germany", id: "dapo", name: "German Association of Psychosocial Oncology", aka: ["dapo"], city: "Berlin", country: "DE", lat: 52.520, lng: 13.405, website: "https://www.dapo-ev.de/",
    tldr: "Germany's association for professionals in psychosocial cancer care, including psychologists, doctors, social workers and chaplains.",
    summary: "The German Association of Psychosocial Oncology is one of Germany's members of the IPOS Federation. Its IPOS country page gives 1983 as its founding year and a membership of psychologists (45 per cent), physicians (30), social workers (15), educators, chaplains and nurses. It holds an annual conference." }),
  society({ fed: "ghana", id: "psycho-oncology-society-of-ghana", name: "Psycho-oncology Society of Ghana", aka: ["PoSoGH"], city: "Accra", country: "GH", lat: 5.604, lng: -0.187,
    tldr: "Ghana's society for professionals who care for the emotional needs of people with cancer and their carers, and for raising public awareness of cancer.",
    summary: "The Psycho-oncology Society of Ghana states on its IPOS country page that it is committed to improving the quality of life of patients and caregivers and serves to share information about psycho-oncology with professionals and the public, promote meetings, workshops and research, and raise awareness of cancer. The page gives 2019 as the year it was founded and joined IPOS; half its members are psychologists, with students, oncologists, nurses, psychiatrists and others." }),
  society({ fed: "israel", id: "israel-psycho-oncology-society", name: "Israel Psycho-oncology Society", aka: ["IPAS"], city: "Givatayim", country: "IL", lat: 32.072, lng: 34.810, website: "https://www.cancer.org.il/template/default.aspx?PageId=6466",
    tldr: "Israel's society for social workers, psychologists and others who give emotional support to people with cancer; its web page is hosted by the Israel Cancer Association.",
    summary: "The Israel Psycho-oncology Society is Israel's member of the IPOS Federation. Its IPOS country page gives 1992 as its founding year and a membership of social workers (54 per cent), psychologists (29), nurses, physicians, psychiatrists and students, with conferences twice a year. The page's website link points to a page on the Israel Cancer Association's site.",
    related: ["israel-cancer-association"] }),
  society({ fed: "italy", id: "societa-italiana-psico-oncologia", name: "Italian Society of Psycho-Oncology", aka: ["SIPO"], city: "Rome", country: "IT", lat: 41.903, lng: 12.496, website: "http://www.siponazionale.it/",
    tldr: "Italy's society for psychologists, doctors and nurses who care for the emotional needs of people with cancer, with national and regional meetings.",
    summary: "The Italian Society of Psycho-Oncology is Italy's member of the IPOS Federation. Its IPOS country page gives 1985 as its founding year, a membership that is half psychologists with physicians, psychiatrists, nurses, social workers and patients and families, national conferences with annual regional meetings, and a journal." }),
  society({ fed: "japan", id: "japan-psycho-oncology-society", name: "Japan Psycho-Oncology Society", aka: ["JPOS"], city: "Tokyo", country: "JP", lat: 35.690, lng: 139.692, website: "http://jpos-society.org/",
    tldr: "Japan's society for doctors, nurses and psychologists who look after the mental health of people with cancer.",
    summary: "The Japan Psycho-Oncology Society is Japan's member of the IPOS Federation. Its IPOS country page gives 1986 as its founding year and a membership in which doctors are the largest group, followed by nurses and psychologists. It holds an annual meeting." }),
  society({ fed: "korea", id: "korean-psycho-oncology-society", name: "Korean Psycho-Oncology Society", aka: ["KPOS"], city: "Seoul", country: "KR", lat: 37.567, lng: 126.978, website: "http://www.kpos-society.org/",
    tldr: "South Korea's society for psychiatrists, nurses and psychologists who look after the mental health of people with cancer, with its own journal.",
    summary: "The Korean Psycho-Oncology Society is Korea's member of the IPOS Federation. Its IPOS country page gives 2005 as its founding year, a membership in which psychiatrists are the largest group (47 per cent) followed by nurses, psychologists and social workers, an annual conference, and the Korean Journal of Psycho-Oncology." }),
  society({ fed: "lithuania", id: "psychosocial-oncology-association-lithuania", name: "Psychosocial Oncology Association (Lithuania)", aka: ["POA"], city: "Vilnius", country: "LT", lat: 54.687, lng: 25.280, website: "http://www.poa.lt/",
    tldr: "Lithuania's association for psychologists, social workers and doctors who give psychological support to people with cancer.",
    summary: "The Psychosocial Oncology Association is Lithuania's member of the IPOS Federation. Its IPOS country page gives 2007 as its founding year, a membership that is 56 per cent psychologists with social workers, physicians, psychiatrists and nurses, and an annual conference." }),
  society({ fed: "netherlands", id: "nvpo", name: "Dutch Society of Psychosocial Oncology", aka: ["NVPO"], city: "Amsterdam", country: "NL", lat: 52.370, lng: 4.895, website: "https://www.nvpo.nl/",
    tldr: "The Netherlands' society for psychologists, social workers, nurses and researchers in psychosocial cancer care.",
    summary: "The Dutch Society of Psychosocial Oncology is the Netherlands' member of the IPOS Federation. Its IPOS country page gives 1993 as its founding year, a membership of psychologists (42 per cent), social workers, researchers in psycho-oncology, nurses and others, and an annual conference." }),
  society({ fed: "newzealand", id: "psychosocial-oncology-new-zealand", name: "Psychosocial Oncology New Zealand", aka: ["PONZ"], city: "Wellington", country: "NZ", lat: -41.286, lng: 174.776, website: "http://www.ponz.org.nz/",
    tldr: "New Zealand's network for health professionals who support people with cancer emotionally, with free membership for anyone working with people affected by cancer.",
    summary: "Psychosocial Oncology New Zealand describes itself on its IPOS country page as having grown out of a group of professionals in psycho-oncology into a national multidisciplinary focus for psychosocial developments among those working in or supporting oncology and palliative care services in New Zealand. Full free membership is open on its website to registered health professionals and those working with people affected by cancer. The page gives 2001 as its founding year and records an annual conference." }),
  society({ fed: "nigeria", id: "psycho-oncology-society-of-nigeria", name: "Psycho-Oncology Society of Nigeria", aka: ["POSON"], city: "Abuja", country: "NG", lat: 9.076, lng: 7.399, website: "http://www.posononline.com/",
    tldr: "Nigeria's society for psychologists, nurses, doctors and students working on the emotional side of cancer care.",
    summary: "The Psycho-Oncology Society of Nigeria is Nigeria's member of the IPOS Federation. Its IPOS country page gives 2009 as its founding year, a membership of psychologists (24 per cent), students, nurses, physicians, psychiatrists, social workers and dieticians, an annual conference and a newsletter, with highlights from 2025 posted on the page." }),
  society({ fed: "poland", id: "polish-psychooncology-society", name: "Polish Psychooncology Society", aka: ["PTPO"], city: "Warsaw", country: "PL", lat: 52.230, lng: 21.012, website: "http://www.ptpo.org.pl/",
    tldr: "Poland's society for psychologists and other professionals who give psychological support to people with cancer.",
    summary: "The Polish Psychooncology Society is Poland's member of the IPOS Federation. Its IPOS country page gives 1993 as its founding year, a membership that is 80 per cent psychologists, a conference every three years and a journal." }),
  society({ fed: "romania", id: "apsco-romania", name: "Romanian Association for Services and Communication in Oncology", aka: ["APSCO"], city: "Bucharest", country: "RO", lat: 44.427, lng: 26.103, website: "http://www.psychooncology.ro/apscoen/",
    tldr: "Romania's psycho-oncology association, whose members include doctors, psychologists, and patients and families; it has written national clinical standards for psychological care in cancer.",
    summary: "The Romanian Association for Services and Communication in Oncology is Romania's member of the IPOS Federation. Its IPOS country page gives 2014 as its founding year, a membership of physicians (30 per cent), psychologists (30), patients and family (20) and others, and links the clinical practice standards and guidelines for psycho-oncology that the society prepared." }),
  society({ fed: "slovenia", id: "slovenian-association-psychosocial-oncology-palliative-care", name: "Slovenian Association of Psychosocial Oncology and Palliative Care", city: "Ljubljana", country: "SI", lat: 46.057, lng: 14.506,
    tldr: "Slovenia's small association of psychologists working in psychosocial cancer care and palliative care.",
    summary: "The Slovenian Association of Psychosocial Oncology and Palliative Care is Slovenia's member of the IPOS Federation. Its IPOS country page gives 2011 as its founding year, a membership made up entirely of psychologists, and an annual conference; no website is listed.",
    notes: ["The heading of the IPOS Slovenia page, read on 4 November 2026, repeats the Australian PoCoG name; the body names the Slovenian association, which is what this record follows."] }),
  society({ fed: "spain", id: "sociedad-espanola-psicooncologia", name: "Sociedad Española de Psicooncología", aka: ["SEPO", "Sociedad Espanola de Psiconcologia"], city: "Madrid", country: "ES", lat: 40.417, lng: -3.704, website: "http://www.sepo.es/",
    tldr: "Spain's society of psychologists who specialise in the emotional care of people with cancer.",
    summary: "The Sociedad Española de Psicooncología is Spain's member of the IPOS Federation. Its IPOS country page gives 1997 as its founding year, states that more than 90 per cent of its members are psychologists, and records a congress every two years." }),
  society({ fed: "sweden", id: "swedpos", name: "Svensk förening för psykosocial onkologi och rehabilitering", aka: ["SWEDPOS"], city: "Stockholm", country: "SE", lat: 59.329, lng: 18.069, website: "http://www.swedpos.se/",
    tldr: "Sweden's society for everyone working in cancer rehabilitation, from psychologists to physiotherapists, with the aim of rehabilitation for every person affected by cancer.",
    summary: "SWEDPOS states on its IPOS country page that its vision is cancer rehabilitation for everyone concerned, and that it offers a forum for multi-professional expertise in cancer rehabilitation. The page gives 2007 as its founding year and a broad membership of nurses, psychologists, social workers, physiotherapists, researchers, psychotherapists and others, including patients and families, with an annual conference." }),
  society({ fed: "switzerland", id: "swiss-society-psycho-oncology", name: "Swiss Society of Psycho-Oncology", aka: ["SGPO"], city: "Bern", country: "CH", lat: 46.948, lng: 7.447, website: "http://www.psychoonkologie.ch/",
    tldr: "Switzerland's society for nurses, psychologists, doctors and social workers who give psychological support to people with cancer.",
    summary: "The Swiss Society of Psycho-Oncology is Switzerland's member of the IPOS Federation. Its IPOS country page gives 2003 as its founding year, a membership of nurses and psychologists (25 per cent each), physicians, social workers, psychiatrists and others, and an annual conference." }),
  society({ fed: "taiwan", id: "taiwan-psycho-oncology-society", name: "Taiwan Psycho-Oncology Society", aka: ["TPOS"], city: "Taipei", country: "TW", lat: 25.033, lng: 121.565, website: "http://www.tpos-society.org/",
    tldr: "Taiwan's society for psychologists, psychiatrists, doctors and nurses who care for the mental health of people with cancer.",
    summary: "The Taiwan Psycho-Oncology Society is Taiwan's member of the IPOS Federation. Its IPOS country page gives 2009 as its founding year, a membership of psychologists (28 per cent), psychiatrists and other physicians (23 each), nurses and social workers, and an annual conference." }),
  society({ fed: "turkiye", id: "turkish-psycho-oncological-association", name: "Turkish Psycho-Oncological Association", aka: ["TPOD", "Psiko-Onkologlar Derneği"], city: "Ankara", country: "TR", lat: 39.934, lng: 32.860, website: "http://www.psikoonkolog.org.tr/",
    tldr: "Türkiye's association that supports the psychological, psychiatric and social care of people with cancer and their carers, and the staff who provide it.",
    summary: "The Turkish Psycho-Oncological Association states on its IPOS country page that its purpose is to support treatment and the scientific, academic and educational work on the psychological, psychiatric and social problems of cancer patients and their caregivers, to support the health workers in multidisciplinary psycho-oncology, and to carry out research and projects for society's needs in Türkiye. The page links its constitution and a Turkish guide on the role of health workers in psychosocial cancer management." }),
  society({ fed: "uk", id: "british-psychosocial-oncology-society", name: "British Psychosocial Oncology Society", aka: ["BPOS"], city: "London", country: "GB", lat: 51.507, lng: -0.128, website: "https://www.bpos.org/",
    tldr: "The UK's society for professionals in psychological and social cancer care; for support yourself, ask your cancer team or clinical nurse specialist about a referral.",
    summary: "The British Psychosocial Oncology Society states on its own site that it was founded in 1983 to advance and promote knowledge in psychosocial oncology through education, clinical practice and research, and that it is a member of the IPOS Federation. Its IPOS country page records an annual conference, a journal, a newsletter and an email bulletin.",
    links: [{ label: "BPOS", url: "https://www.bpos.org/" }] }),
  society({ fed: "usa", id: "american-psychosocial-oncology-society", name: "American Psychosocial Oncology Society", aka: ["APOS"], city: "Washington", country: "US", lat: 38.907, lng: -77.037, website: "https://apos-society.org/",
    tldr: "The US society for psychologists, psychiatrists, social workers and nurses who care for the emotional needs of people with cancer; its website lists resources for patients and carers.",
    summary: "The American Psychosocial Oncology Society states on its IPOS country page that its mission is advancing the development and delivery of equitable, evidence-based psychosocial oncology care through research, practice, education and advocacy, and that its vision is a nation in which all people affected by cancer have access to quality psychosocial care. Its interdisciplinary membership includes psychologists, psychiatrists, social workers and nurses, and it holds an annual conference each March. Its own site carries a Psychosocial Pocket Guide for professionals and a page of resources for people affected by cancer that points to the American Cancer Society's information line and other services.",
    links: [{ label: "APOS resources for people affected by cancer", url: "https://apos-society.org/people-affected-by-cancer/resources-for-people-affected-by-cancer/" }] }),
];

const SOCIETY_IDS = SOCIETIES.map((s) => s.id);

/**
 * PoCoG is the IPOS Federation member for Australia, but it is a research group that runs multi-centre trials, so by
 * src/lib/cooperative-groups-home.test.ts it is not an institution. It leads no corpus trial, which a cooperative-group
 * company must (src/lib/cooperative-groups.test.ts), so it is held as a nonprofit company, as the British Thoracic
 * Oncology Group is.
 */
const POCOG: CompanyInput = {
  kind: "company", asOf, companyType: "nonprofit", id: "pocog", name: "Psycho-oncology Co-operative Research Group", aka: ["PoCoG"], hq: "Sydney", country: "AU", founded: 2005, website: "https://www.pocog.org.au/",
  tldr: "Australia's research group for the emotional side of cancer: it runs multi-centre trials of psychological care so that the support offered to patients is tested.",
  summary: "PoCoG describes itself on its IPOS country page as a multidisciplinary organisation of researchers and clinicians whose mission is to develop and facilitate large-scale, multi-centre psycho-oncology and supportive care research across Australia. It was established in 2005 in response to the need for capacity to run such trials. Full membership is open to researchers and health professionals in Australia and New Zealand, with associate membership for international researchers. Its own site states that it is situated at the University of Sydney and funded by Cancer Australia through the Supporting Cancer Clinical Trials Program.",
  links: [FED("australia"), { label: "PoCoG", url: "https://www.pocog.org.au/" }],
  institutions: ["ipos", "cancer-australia"], technologies: ["psycho-oncology"], tags: ["professional-society"],
};


const IPOS: InstitutionInput = i({
  id: "ipos", name: "International Psycho-Oncology Society", aka: ["IPOS"], institutionType: "consortium", city: "Toronto", country: "CA", lat: 43.654, lng: -79.371, website: "https://ipos-society.org/",
  tldr: "The international society for professionals who care for the emotional and social side of cancer; it sets the standard that every person with cancer should have psychological care, and its federation links national societies in 28 countries.",
  summary: "The International Psycho-Oncology Society states on its About page that it was founded in 1984 to foster international multidisciplinary communication on two dimensions of cancer: how patients, families and staff respond to cancer and its treatment at every stage, and the psychological, social and behavioural factors that influence tumour progression and survival. Its members include psychologists, nurses, social workers, psychiatrists, dieticians, spiritual care specialists, physicians, patient advocates and others. It publishes the IPOS Standard of Quality Cancer Care, runs a multilingual core curriculum in psycho-oncology, a World Congress and World Psycho-Oncology Day, and with ESMO and the European Cancer Patient Coalition produced a patient guide on survivorship. The IPOS Federation of national psycho-oncology societies has its stated objective as speaking in a unified voice for optimal psychosocial care for all cancer patients and their families at all stages of disease and survivorship; on 4 November 2026 its Federation page listed 36 countries, 28 of them with a country page naming the national society. The postal address on its site is in Toronto, with a second address in New York.",
  programs: ["IPOS Standard of Quality Cancer Care", "IPOS Federation of national psycho-oncology societies", "World Congress of Psycho-Oncology", "World Psycho-Oncology Day", "Multilingual Core Curriculum in Psycho-oncology", "Resources for patients and families, including the ESMO and ECPC survivorship guide made with IPOS"],
  links: [{ label: "About IPOS", url: "https://ipos-society.org/About" }, { label: "IPOS for patients", url: "https://ipos-society.org/For-Patients" }, { label: "Resources for patients and families", url: "https://ipos-society.org/patients/resources" }, { label: "IPOS Federation", url: "https://ipos-society.org/IPOS-Federation" }],
  technologies: ["psycho-oncology", "survivorship-care-plan"], institutions: SOCIETY_IDS, companies: ["pocog"], terms: ["ipos-standard-quality-cancer-care"], tags: ["professional-society"],
  notes: ["Federation countries without a country page on 4 November 2026: Bulgaria, Costa Rica, Denmark, Georgia, India, Ireland, Peru and Ukraine."],
});

const IPOS_STANDARD: TermInput = t({
  id: "ipos-standard-quality-cancer-care", name: "IPOS Standard of Quality Cancer Care", aka: ["IPOS International Standard of Quality Cancer Care", "Distress as the sixth vital sign"], category: "Clinical",
  tldr: "An international standard that says emotional and social support is part of good cancer care, and that your distress should be checked as routinely as your blood pressure.",
  summary: "The International Psycho-Oncology Society's standard, dated July 2010 and revised October 2014, makes three statements: psychosocial cancer care should be recognised as a universal human right; quality cancer care must integrate the psychosocial domain into routine care; and distress should be measured as the sixth vital sign after temperature, blood pressure, pulse, respiratory rate and pain. IPOS asks individuals and cancer organisations to endorse it, describing it as guidelines put forward with the Union for International Cancer Control, and publishes lists of those who have endorsed it. For a patient it is a reason to expect to be asked about distress and to ask for support if nobody does.",
  links: [{ label: "IPOS Standard of Quality Cancer Care", url: "https://ipos-society.org/about/quality" }],
  technologies: ["psycho-oncology"], institutions: ["ipos", "uicc"],
});

const KREBSBERATUNG: CollectionInput = c({
  id: "psychosoziale-krebsberatungsstellen", name: "Psychosocial cancer counselling centres in Germany", aka: ["Psychosoziale Krebsberatungsstellen", "ambulante psychosoziale Krebsberatung"], url: "https://www.krebshilfe.de/helfen/rat-hilfe/psychosoziale-krebsberatungsstellen/", maintainer: "Deutsche Krebshilfe, with the Bundesarbeitsgemeinschaft für ambulante psychosoziale Krebsberatung",
  holds: "Germany's network of outpatient counselling centres where people with cancer and their relatives get emotional and social advice free of charge.",
  tldr: "In Germany, people with cancer and their families can get free emotional and practical counselling at a local cancer counselling centre; the free INFONETZ KREBS line (0800 80708877) tells you where the nearest one is.",
  summary: "Deutsche Krebshilfe states that in psychosocial cancer counselling centres, patients and their relatives receive advice and help free of charge. It set up a strategic programme to fund such centres in 2007, which it says substantially improved outpatient psycho-oncological and psychosocial care, and campaigned for years for them to be funded as a regular part of care; since 2021, health insurers cover 80 per cent of the costs of outpatient psychosocial cancer counselling. News about the centres is published by the Bundesarbeitsgemeinschaft für ambulante psychosoziale Krebsberatung. Deutsche Krebshilfe's INFONETZ KREBS line, free on 0800 80708877 from Monday to Friday between 8 and 17 o'clock, gives the addresses of centres near the caller.",
  links: [{ label: "Deutsche Krebshilfe: psychosoziale Krebsberatungsstellen", url: "https://www.krebshilfe.de/helfen/rat-hilfe/psychosoziale-krebsberatungsstellen/" }, { label: "Bundesarbeitsgemeinschaft für ambulante psychosoziale Krebsberatung", url: "http://www.bak-ev.org/" }],
  institutions: ["deutsche-krebshilfe", "dapo"], technologies: ["psycho-oncology"], tags: ["patient-programme", "public"],
});

// ---- Genetic counselling ----

const GENOTES = { label: "GeNotes: Genomic Laboratory Hubs", url: "https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/" };
const SHARED = "It is one of seven Genomic Laboratory Hubs that together co-ordinate all NHS genomic testing in England, each paired with a regional Genomic Medicine Service Alliance that delivers the clinical care of patients having genomic testing (Health Education England's GeNotes).";
type G = Omit<I, "institutionType" | "technologies" | "tags" | "country"> & { lead: string };
const glh = ({ lead, links, summary, ...x }: G): InstitutionInput => i({
  ...x, institutionType: "government", country: "GB",
  summary: `${summary} ${SHARED} The lead trust is ${lead}.`,
  technologies: ["germline-testing"], terms: ["hereditary-cancer-syndromes"],
  links: [GENOTES, ...(links ?? [])],
});
const GLH_TLDR = (region: string) => `The NHS genetics service for ${region}: if your cancer or family history meets the national criteria, your hospital team or GP refers you here for genetic counselling and inherited cancer gene tests, free on the NHS.`;

const GLHS: InstitutionInput[] = [
  glh({ id: "north-thames-glh-gmsa", name: "North Thames Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["North Thames GLH", "North Thames GMSA", "North Thames Genomic Medicine Service"], city: "London", lat: 51.522, lng: -0.120, website: "https://www.norththamesglh.nhs.uk/",
    lead: "Great Ormond Street Hospital for Children NHS Foundation Trust",
    tldr: GLH_TLDR("North London, Hertfordshire and Mid and South Essex"),
    summary: "The North Thames Genomic Medicine Service states that it works to provide equitable access to genomic testing for people across North London, Hertfordshire and Mid and South Essex, and has a section for patients and the public; in 2026 it announced new genomic testing pathways for patients with a cancer of unknown primary.",
    related: ["nhs-genomic-medicine-service"], institutions: ["great-ormond-street"] }),
  glh({ id: "south-east-glh-gmsa", name: "South East Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["South East Genomics", "South East GLH", "South East GMSA"], city: "London", lat: 51.498, lng: -0.118, website: "https://southeastgenomics.nhs.uk/",
    lead: "Guy's and St Thomas' NHS Foundation Trust",
    tldr: GLH_TLDR("South London, Kent, Medway, Sussex and much of Surrey"),
    summary: "South East Genomics states that it provides all genomic testing for anyone living in South London, Kent, Medway, Sussex and much of Surrey.",
    related: ["nhs-genomic-medicine-service", "south-west-glh-gmsa"], institutions: ["guys-st-thomas"] }),
  glh({ id: "north-west-glh-gmsa", name: "North West Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["North West GLH", "North West Genomics Medicine Service Alliance", "NW GLH", "NW GMSA"], city: "Manchester", lat: 53.462, lng: -2.226, website: "https://mft.nhs.uk/nwglh/",
    lead: "Manchester University NHS Foundation Trust",
    tldr: GLH_TLDR("the North West of England"),
    summary: "The North West Genomic Laboratory Hub runs laboratory sites in Liverpool and Manchester; its alliance site describes work on bringing genomic testing into everyday cancer care in the region.",
    links: [{ label: "North West Genomic Medicine Service Alliance", url: "https://www.nw-gmsa.nhs.uk/" }],
    related: ["nhs-genomic-medicine-service"], institutions: ["manchester-royal-infirmary"] }),
  glh({ id: "east-glh-gmsa", name: "East Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["East Genomics", "East GLH", "East GMSA"], city: "Cambridge", lat: 52.175, lng: 0.140, website: "https://www.eastgenomics.nhs.uk/",
    lead: "Cambridge University Hospitals NHS Foundation Trust",
    tldr: GLH_TLDR("the East of England and the East Midlands"),
    summary: "East Genomics states that it supports NHS genetic testing for patients across the East of England and East Midlands, and that clinical genetics teams help clinicians order and interpret tests; its news includes Lynch syndrome testing in cancer.",
    related: ["nhs-genomic-medicine-service"], institutions: ["addenbrookes-cambridge"] }),
  glh({ id: "central-south-glh-gmsa", name: "Central and South Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["Central and South Genomics", "CAS Genomic Medicine Service", "Central and South GLH"], city: "Birmingham", lat: 52.455, lng: -1.938, website: "https://centralsouthgenomics.nhs.uk/",
    lead: "Birmingham Women's and Children's NHS Foundation Trust",
    tldr: GLH_TLDR("the Central and South region of England"),
    summary: "The Central and South Genomic Medicine Service combines its Genomic Medicine Service Alliance and laboratory hub; it states that clinicians ordering a genomic test should make sure the patient, carer or family member knows the purpose of the test.",
    related: ["nhs-genomic-medicine-service"] }),
  glh({ id: "north-east-yorkshire-glh-gmsa", name: "North East and Yorkshire Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["North East and Yorkshire Genomics", "NEY GLH", "NEY GMSA"], city: "Newcastle upon Tyne", lat: 54.979, lng: -1.596, website: "https://ney-genomics.org.uk/",
    lead: "The Newcastle upon Tyne Hospitals NHS Foundation Trust",
    tldr: GLH_TLDR("the North East and Yorkshire"),
    summary: "The North East and Yorkshire hub covers the region its name gives; its own site served a bot challenge to a script on 4 November 2026, so nothing further is quoted from it.",
    related: ["nhs-genomic-medicine-service"], institutions: ["newcastle-cancer-centre"] }),
  glh({ id: "south-west-glh-gmsa", name: "South West Genomic Laboratory Hub and Genomic Medicine Service Alliance", aka: ["South West GLH", "South West GMSA"], city: "Bristol", lat: 51.496, lng: -2.594, website: "https://www.nbt.nhs.uk/south-west-genomic-laboratory-hub",
    lead: "North Bristol NHS Trust",
    tldr: GLH_TLDR("the South West of England"),
    summary: "The South West hub covers the region its name gives; its page on the North Bristol site did not load to a script on 4 November 2026, so nothing further is quoted from it.",
    related: ["nhs-genomic-medicine-service"] }),
];

const NSGC_DIRECTORY: CollectionInput = c({
  id: "nsgc-find-a-genetic-counselor", name: "NSGC Find a Genetic Counselor directory", aka: ["Find a Genetic Counselor", "National Society of Genetic Counselors directory"], url: "https://findageneticcounselor.nsgc.org/", maintainer: "National Society of Genetic Counselors",
  holds: "A searchable list of more than 3,300 genetic counsellors in the United States and Canada who are members of the National Society of Genetic Counselors, searchable for in-person or telehealth appointments.",
  tldr: "If you live in the United States or Canada and want to talk to someone about inherited cancer risk, this free directory finds genetic counsellors near you or by video and phone.",
  summary: "The National Society of Genetic Counselors' directory states that it offers access to over 3,300 genetic counsellors in the US and Canada. Searches can be made for counsellors who see patients in person at a location or for those who meet patients by telehealth (phone or video). The society states that the directory is a list of its members, not a referral service, makes no representation about the professional skills of those listed, and advises checking with your insurer whether genetic counselling and testing are covered.",
  links: [{ label: "Find a Genetic Counselor", url: "https://findageneticcounselor.nsgc.org/" }, { label: "About genetic counselors: insurance and privacy", url: "https://aboutgeneticcounselors.com/Prepare-for-an-Appointment/Insurance-Billing-and-Protecting-Your-Privacy" }],
  technologies: ["germline-testing"], terms: ["hereditary-cancer-syndromes", "lynch-syndrome"], tags: ["patient-programme"],
});

const GERMAN_CONSORTIUM: InstitutionInput = i({
  id: "german-consortium-hereditary-breast-ovarian-cancer", name: "German Consortium for Hereditary Breast and Ovarian Cancer", aka: ["Deutsches Konsortium Familiärer Brust- und Eierstockkrebs", "Konsortium FBEK"], institutionType: "consortium", city: "Cologne", country: "DE", lat: 50.925, lng: 6.918, website: "https://www.konsortium-familiaerer-brustkrebs.de/",
  tldr: "A network of 24 German university centres where families with a history of breast or ovarian cancer get risk counselling, gene testing and a plan for prevention; each centre has a phone line for appointments.",
  summary: "The consortium describes itself as a union of university centres that aims to establish care for hereditary breast and ovarian cancer across Germany and bring new research into practice. Its centres offer people from at-risk families interdisciplinary counselling that estimates their individual risk, refined by genetic testing; gynaecological counselling on preventive and therapeutic options; and psychosomatic counselling where decisions are hard. They also run research projects and clinical studies of preventive and therapeutic options. Its centre list, read on 4 November 2026, gives appointment numbers for 24 centres in Berlin, Düsseldorf, Dresden, Erlangen, Frankfurt, Freiburg, Göttingen, Greifswald, Halle, Hamburg, Hannover, Heidelberg, Kiel, Cologne, Leipzig, Magdeburg, Mainz, Munich (two, at TUM and LMU), Münster, Regensburg, Tübingen, Ulm and Würzburg. The office and website are at Uniklinik Köln.",
  programs: ["Interdisciplinary risk counselling and genetic testing for at-risk families", "Intensified surveillance and preventive options", "Psychosomatic counselling", "Research and clinical studies on prevention and treatment"],
  links: [{ label: "Tasks and services of the consortium (German)", url: "https://www.konsortium-familiaerer-brustkrebs.de/das-konsortium/" }, { label: "Centres of the consortium (German)", url: "https://www.konsortium-familiaerer-brustkrebs.de/das-konsortium/zentren-des-konsortiums/" }],
  cancers: ["breast-cancer", "ovarian"], targets: ["brca"], technologies: ["germline-testing"], terms: ["hereditary-cancer-syndromes"], institutions: ["uniklinik-koeln", "charite", "uk-duesseldorf"],
});

export const psychosocialGeneticsGaps: EntityInput[] = [IPOS, IPOS_STANDARD, ...SOCIETIES, POCOG, KREBSBERATUNG, ...GLHS, NSGC_DIRECTORY, GERMAN_CONSORTIUM];
