import type { InstitutionInput } from "@/lib/schema";

/**
 * Stem cell donor registries and cord blood banks: the census type `donor-registries` (docs/proposals/gap-census-2026-11.md),
 * which found only Anthony Nolan in the corpus. The denominator is the World Marrow Donor Association's own map of its
 * members, https://wmda.info/find-your-registry/, read raw on 4 November 2026: each entry there gives the
 * organisation's name, postal address, website and, for most, its WMDA Share identifier (ION). Every other fact below
 * was read the same day from the organisation's own page, linked in the record. Where an organisation's own site
 * would not load or served only a script shell, the record rests on the WMDA listing alone and says so in its notes.
 * Coordinates are the map positions WMDA gives, rounded; they are city-level, not a building.
 */

const asOf = "2026-11-04";
const WMDA_MAP = { label: "WMDA: Find your registry (member map)", url: "https://wmda.info/find-your-registry/" };
const share = (ion: string) => ({ label: `WMDA Share profile ${ion}`, url: `https://share.wmda.info/display/WMDAREG/${ion}` });

type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({
  kind: "institution", asOf,
  ...x,
  tags: ["transplant", "stem-cell", ...(x.tags ?? [])],
  terms: ["allogeneic-transplant", ...(x.terms ?? [])],
  institutions: x.id === "wmda" ? (x.institutions ?? []) : ["wmda", ...(x.institutions ?? [])],
});

/** Every registry and bank below; the WMDA record lists them all. */
const MEMBER_IDS = [
  "nmdp", "dkms-registry", "dkms-uk", "zkrd", "nhs-stem-cell-donor-registry", "jmdp", "china-marrow-donor-program",
  "korea-marrow-donor-program", "redome", "canadian-blood-services-stem-cell-registry", "hema-quebec-stem-cell-registry",
  "stem-cell-donors-australia", "ibmdr", "france-greffe-de-moelle", "redmo", "matchis", "welsh-bone-marrow-donor-registry",
  "gift-of-life-marrow-registry", "hong-kong-bone-marrow-donor-registry", "tzu-chi-stem-cells-center", "datri",
  "ezer-mizion-bone-marrow-registry", "sabmr", "incucai-hsc-donor-registry", "thai-national-stem-cell-donor-registry",
  "saudi-stem-cells-donor-registry", "nybc-national-cord-blood-program", "carolinas-cord-blood-bank",
  "jose-carreras-cord-blood-bank-duesseldorf", "bst-barcelona-cord-blood-bank",
];

export const institutionsDonorRegistryGaps2026: InstitutionInput[] = [
  i({ id: "wmda", name: "World Marrow Donor Association (WMDA)", aka: ["WMDA", "World Marrow Donor Association", "WMDA Search & Match Service", "Bone Marrow Donors Worldwide", "BMDW", "NetCord"],
    institutionType: "consortium", city: "Leiden", country: "NL", lat: 52.164, lng: 4.478, website: "https://wmda.info/",
    tldr: "The international association of stem cell donor registries and cord blood banks. When a patient needs a stem cell transplant and nobody in the family matches, transplant doctors search the donors of every member registry at once through WMDA's database.",
    summary: "WMDA describes its purpose as connecting patients who need stem cell transplants with volunteer donors worldwide. It was started informally in 1988 by three transplant pioneers, John Goldman (United Kingdom), E. Donnall Thomas (United States) and Jon J. van Rood (the Netherlands), to help donor registries work together and make cross-border transplants safer, faster and more reliable. Its office is in Leiden, the Netherlands. In the same year the Immunobiology Working Party of the European Society for Blood and Marrow Transplantation launched Bone Marrow Donors Worldwide (BMDW), a shared collection of volunteer donors' tissue types managed by the Europdonor Foundation, known today as the Matchis Foundation.\n\nIn 2017 WMDA, BMDW and the NetCord Foundation merged, WMDA began operating the Search & Match Service that brings donor and cord blood data together on one platform, and it became the coordinating body for the international cord blood community. WMDA states that the service is the world's largest haematopoietic cell donor database, listing 44 million stem cell donors and more than 750,000 cord blood units, and that its members are registries and cord blood banks from more than 57 countries. It writes shared ethical, medical, technical and financial standards, runs accreditation and certification of registries, and runs a service for reporting and managing serious adverse events and reactions. It is a nonprofit funded mainly by membership fees and by fees transplant centres pay to use the search service.",
    programs: ["Search & Match Service (global donor and cord blood unit search)", "Match Connect", "Registry accreditation and certification", "Serious adverse events and reactions reporting", "World Marrow Donor Day"],
    links: [{ label: "About WMDA", url: "https://wmda.info/about-wmda/" }, WMDA_MAP],
    institutions: MEMBER_IDS, related: ["anthony-nolan"],
    notes: ["The 44 million donors and 750,000 cord blood units are WMDA's own figures on its About page, read 4 November 2026, without a date of count.", "The member map lists 117 markers including the WMDA office, some transplant hospitals and service companies; this round adds the registries and banks the census named, not all 116 members.", "John Goldman, E. Donnall Thomas and Jon J. van Rood have no person records in OnCo, so they are named but not linked."] }),

  i({ id: "nmdp", name: "NMDP", aka: ["National Marrow Donor Program", "Be The Match", "NMDP Registry"],
    institutionType: "consortium", city: "Minneapolis", country: "US", lat: 45.000, lng: -93.220, website: "https://www.nmdp.org/",
    tldr: "The United States registry of volunteer stem cell and marrow donors, formerly called the National Marrow Donor Program and Be The Match. It finds unrelated donors and cord blood for patients with blood cancers and other blood disorders, in the US and abroad.",
    summary: "NMDP describes itself as a global nonprofit in cell therapy, founded in 1987 and known over the years as the National Marrow Donor Program and Be The Match before adopting the single name NMDP in early 2024. Its account of its origin: in 1979 Laura Graves, aged 10, received the first bone marrow transplant from an unrelated donor for leukaemia; her parents, with other families, doctors, congressional support and funding from the US Navy, pushed for a national registry, about 10,000 people joined in the first year, and the first transplant as the National Marrow Donor Program followed in 1987.\n\nNMDP lists among its milestones the NMDP Research Sample Repository (2001), the creation with the Medical College of Wisconsin of CIBMTR, the Center for International Blood and Marrow Transplant Research (2004), recruitment aimed at donors of diverse ancestry (2015), a cryopreservation service for donor products, and the Donor for All initiative using partially matched donors (2023). It reports more than 150,000 lives affected through cell therapy since 1987 and 8,879 in 2025, the most in one year.",
    programs: ["NMDP Registry of unrelated donors and cord blood units", "CIBMTR (with the Medical College of Wisconsin)", "NMDP Research Sample Repository", "Donor for All (partially matched donors)", "Cryopreservation Service"],
    links: [{ label: "NMDP: About us", url: "https://www.nmdp.org/what-we-do/about-us" }, WMDA_MAP, share("ION-3553")],
    notes: ["\"Lives impacted\" is NMDP's own measure on its About page; it is not defined there as a count of transplants."] }),

  i({ id: "dkms-registry", name: "DKMS Registry", aka: ["DKMS Registry gGmbH", "DKMS", "Deutsche Knochenmarkspenderdatei"],
    institutionType: "consortium", city: "Tübingen", country: "DE", lat: 48.481, lng: 9.055, website: "https://dkmsregistry.org",
    tldr: "The international registry of DKMS, the blood stem cell donor charity that began in Germany. It lists DKMS donors from Germany, the UK, Poland, Chile, India and South Africa so transplant centres anywhere can search and request them.",
    summary: "The DKMS Registry was founded in 2020 as a non-profit subsidiary of DKMS, having worked as an official international registry since 2015, when it began listing donors from DKMS Foundation India for patients worldwide. It now lists donors recruited by DKMS in Chile, the United Kingdom, Poland, Germany, South Africa and India: six donor centres on four continents. DKMS states that through the registry international registries, search units and transplant centres can find and request 25 per cent of the registered unrelated potential stem cell donors worldwide in one place, and that all new DKMS donors are typed at high resolution by next-generation sequencing.\n\nThe registry also supports transplant centres in countries without a national registry or with limited infrastructure, searching both the DKMS pool and the pool of all WMDA registries on their behalf; it names India, Chile, South Africa and Colombia. It offers transplant centres a free search tool (Donor Navigator) and a request service (Hap-E Search), and plans to list cryopreserved products from the DKMS Stem Cell Bank.",
    programs: ["Donor Navigator", "Hap-E Search", "Search support for transplant centres in India, Chile, South Africa and Colombia"],
    links: [{ label: "DKMS Registry: about", url: "https://professional.dkms.org/about/registry" }, WMDA_MAP, share("ION-4596")],
    institutions: ["dkms-uk"],
    notes: ["WMDA lists separate entries for the DKMS donor centres in Germany (ION-5525), the UK, Poland, the US, Chile, India and Africa and for the DKMS Stem Cell Bank; only the registry and DKMS UK are records here."] }),

  i({ id: "dkms-uk", name: "DKMS United Kingdom", aka: ["DKMS UK"],
    institutionType: "consortium", city: "London", country: "GB", lat: 51.492, lng: -0.262, website: "https://www.dkms.org.uk/",
    tldr: "The UK branch of DKMS, a charity that recruits people aged 16 to 55 onto the blood stem cell donor register so that patients with blood cancer who have no family match can find a donor.",
    summary: "DKMS UK says it is fighting blood cancer and wants as many people as possible to join the blood stem cell donor register; people aged 16 to 55 in general good health may be able to register. Its donors are listed internationally through the DKMS Registry. With Leukaemia UK and Anthony Nolan it has called on NHS England to review its policy on second stem cell transplants after relapse.",
    links: [{ label: "DKMS UK", url: "https://www.dkms.org.uk/" }, WMDA_MAP, share("ION-9968")],
    institutions: ["dkms-registry", "anthony-nolan"],
    notes: ["The founding year of DKMS UK was not stated on the pages read (the About page returned 404 on 4 November 2026)."] }),

  i({ id: "zkrd", name: "ZKRD: German National Bone Marrow Donor Registry", aka: ["ZKRD", "Zentrales Knochenmarkspender-Register Deutschland", "Central German Bone Marrow Donor Registry"],
    institutionType: "consortium", city: "Ulm", country: "DE", lat: 48.425, lng: 9.962, website: "https://www.zkrd.de/en/",
    tldr: "Germany's central office for finding unrelated stem cell donors. It holds the data of donors from 26 German donor centres and searches registries worldwide; the ZKRD says almost 40 per cent of unrelated stem cell transplants worldwide use donors from Germany.",
    summary: "The ZKRD is the central coordination office for bone marrow donor searches under Article 65e of the Fifth Book of the German Social Code, the hub between transplant centres, search centres, donor centres and registries abroad, from the donor search to transport of the cells. It grew from work begun in Ulm in 1989 by Shraga Goldmann and Carlheinz Müller, who collected pseudonymised donor data from German blood banks with support from the Stefan Morsch Foundation; German Cancer Aid's investment took the database to almost 50,000 entries by 1991, and the ZKRD was founded in May 1992 after the federal health ministry commissioned the German Red Cross Blood Donor Service of Baden-Württemberg to set up a national registry.\n\nThe ZKRD matches with its own OptiMatch program and has access to donors registered with 26 German donor centres and to most internationally registered donors. It states that for 9 out of 10 patients in Germany a suitable donor is usually found within a few weeks, and that almost 40 per cent of unrelated blood stem cell transplants worldwide involve voluntary donors from Germany.",
    programs: ["OptiMatch donor matching", "International donor search and transport coordination"],
    links: [{ label: "ZKRD (English)", url: "https://zkrd.de/?lang=en" }, { label: "ZKRD history", url: "https://zkrd.de/history/?lang=en" }, WMDA_MAP, share("ION-6939")] }),

  i({ id: "nhs-stem-cell-donor-registry", name: "NHS Stem Cell Donor Registry", aka: ["NHS Blood and Transplant stem cell registry"],
    institutionType: "government", city: "Bristol", country: "GB", lat: 51.455, lng: -2.588, website: "https://www.blood.co.uk/stem-cell-donor-registry/",
    tldr: "The stem cell donor register run by NHS Blood and Transplant, which blood donors in England can join at a donation appointment. With Anthony Nolan it gives UK transplant centres a single place to search for donors.",
    summary: "NHS Blood and Transplant runs the NHS Stem Cell Donor Registry and, with Anthony Nolan and the other UK registries, a single point of access for UK transplant centres; it says it provides expert support for half the stem cell transplants performed in the UK each year. The registry has over 400,000 people signed up, and NHSBT notes that 70 per cent of patients rely on being matched with a volunteer donor unknown to them. People join by giving an extra blood sample at a blood, plasma or platelet donation appointment.\n\nInternationally the registry supplies donations from its donors and from the NHS Cord Blood Bank to other countries through Bone Marrow Donors Worldwide and WMDA.",
    programs: ["NHS Stem Cell Donor Registry", "NHS Cord Blood Bank"],
    links: [{ label: "NHSBT: stem cells", url: "https://www.nhsbt.nhs.uk/what-we-do/transplantation-services/stem-cells/" }, { label: "Give Blood: Stem Cell Donor Registry", url: "https://www.blood.co.uk/stem-cell-donor-registry/" }, WMDA_MAP, share("ION-2731")],
    institutions: ["anthony-nolan", "welsh-bone-marrow-donor-registry"],
    notes: ["Coordinates are NHSBT's Filton headquarters as WMDA maps it."] }),

  i({ id: "jmdp", name: "Japan Marrow Donor Program (JMDP)", aka: ["JMDP"],
    institutionType: "consortium", city: "Tokyo", country: "JP", lat: 35.691, lng: 139.762, website: "https://www.jmdp.or.jp/en/",
    tldr: "Japan's national bank of unrelated marrow and blood stem cell donors, set up in 1991 under a government initiative with the Japanese Red Cross Society.",
    summary: "JMDP's guide for international registries states that it was established in 1991 with the cooperation of the Japanese Red Cross Society under a Japanese government initiative and is accredited by WMDA. Donors aged 20 to 54 can be searched for patients. The guide sets out the rules for registries abroad: preliminary search results within one business day, limits on how many JMDP donors a transplant centre may hold at once, and marrow volume caps tied to the donor's haemoglobin to protect the donor. It also states that JMDP has suspended cord blood searches for overseas patients because Japan's revised personal information law no longer allows HLA and similar data to be sent abroad without the donor's consent. Its English home page notes nearly 2,000 patients waiting for transplants.",
    links: [{ label: "JMDP (English)", url: "https://www.jmdp.or.jp/en/" }, { label: "About JMDP for international registries (PDF, August 2023)", url: "https://www.jmdp.or.jp/pdf/en/AboutJMDP_202308.pdf" }, WMDA_MAP, share("ION-4364")] }),

  i({ id: "china-marrow-donor-program", name: "China Marrow Donor Program (CMDP)", aka: ["CMDP", "中华骨髓库", "中国造血干细胞捐献者资料库", "China Hematopoietic Stem Cell Donor Registry"],
    institutionType: "consortium", city: "Beijing", country: "CN", lat: 39.917, lng: 116.424, website: "https://www.cmdp.org.cn/",
    tldr: "China's national registry of volunteer blood stem cell donors, known in Chinese as 中华骨髓库.",
    summary: "The registry's site is that of the China Hematopoietic Stem Cell Donor Registry management centre (中国造血干细胞捐献者资料库管理中心), whose home page carries the news of the Red Cross Society of China and links to the provincial branch registries, the collection and transplant hospitals on record, and the procedure for sending stem cells across the border. It publishes running totals of registered volunteer donors, stem cell donations and patient search requests, and has published a notice standardising the registry's English name (May 2010).",
    links: [{ label: "中华骨髓库 China Marrow Donor Program", url: "https://www.cmdp.org.cn/" }, WMDA_MAP, share("ION-2197")],
    notes: ["The home page's donor and donation counters are filled by a script and did not render when read as text on 4 November 2026, so no figure is given.", "The English name used here is WMDA's listing; the 2010 notice standardising it was not opened."] }),

  i({ id: "korea-marrow-donor-program", name: "Korea Marrow Donor Program (KMDP)", aka: ["KMDP", "한국조혈모세포은행협회", "Korea Hematopoietic Stem Cell Bank Association", "Korea Marrow Bank Association"],
    institutionType: "consortium", city: "Seoul", country: "KR", lat: 37.480, lng: 126.885, website: "https://www.kmdp.or.kr/",
    tldr: "A Korean nonprofit that recruits and matches unrelated blood stem cell donors. It was founded in 1994 and records more than 7,000 transplants arranged.",
    summary: "KMDP's history page records its founding general meeting on 11 March 1994, with the president of the Korean Red Cross as first chair, and its incorporation as the Korea Marrow Bank Association (사단법인 한국골수은행협회) under a Ministry of Health and Welfare permit in July 1994; it now uses the name Korea Hematopoietic Stem Cell Bank Association (한국조혈모세포은행협회). The timeline lists its 7,000th stem cell transplant, a 30th-anniversary history (1994-2024), an annual donor thank-you day held jointly with the Catholic Hematopoietic Stem Cell Bank, and support for overseas Koreans seeking a match.",
    links: [{ label: "KMDP history (Korean)", url: "https://www.kmdp.or.kr/KMDP/history.php" }, WMDA_MAP],
    notes: ["WMDA's map lists KMDP without a WMDA Share identifier."] }),

  i({ id: "redome", name: "REDOME (Brazilian Registry of Voluntary Bone Marrow Donors)", aka: ["REDOME", "Registro Brasileiro de Doadores Voluntários de Medula Óssea", "Registro Nacional de Doadores Voluntários de Medula Óssea"],
    institutionType: "government", city: "Rio de Janeiro", country: "BR", lat: -22.914, lng: -43.186, website: "https://redome.inca.gov.br/",
    tldr: "Brazil's national register of volunteer bone marrow donors, run by the National Cancer Institute (INCA) in Rio de Janeiro. It describes itself as the third-largest bone marrow donor bank in the world.",
    summary: "REDOME is the Brazilian registry of voluntary bone marrow donors, housed at the Instituto Nacional de Câncer José Alencar Gomes da Silva (INCA) in Rio de Janeiro. Its site describes it as the third-largest bone marrow donor bank in the world and asks registered donors to keep their contact details up to date so they can be found when they match a patient.",
    links: [{ label: "REDOME", url: "https://redome.inca.gov.br/" }, WMDA_MAP, share("ION-8766")],
    institutions: ["inca-brazil"],
    notes: ["\"Third-largest\" is REDOME's own claim on its home page; no donor count was stated on the page read."] }),

  i({ id: "canadian-blood-services-stem-cell-registry", name: "Canadian Blood Services' Stem Cell Registry", aka: ["Canadian Blood Services Stem Cell Registry", "Canadian Blood Services' Cord Blood Bank", "Canadian Blood Services"],
    institutionType: "consortium", city: "Ottawa", country: "CA", lat: 45.401, lng: -75.663, website: "https://www.blood.ca/en/stemcells",
    tldr: "Canada's national registry of adult stem cell donors and national public cord blood bank, run by Canadian Blood Services for every province and territory except Quebec.",
    summary: "Canadian Blood Services, established in 1998, is an independent registered charity funded mostly by the governments of all provinces and territories except Quebec and regulated by Health Canada as a biologics manufacturer. It operates the national public cord blood bank, collecting, testing and manufacturing cord blood stem cells, and runs a national registry of adult stem cell donors on behalf of those governments, taking part in the international network of registries to find matches for patients needing a transplant.",
    links: [{ label: "Canadian Blood Services: stem cells", url: "https://www.blood.ca/en/stemcells" }, { label: "Canadian Blood Services: about us", url: "https://www.blood.ca/en/about-us" }, WMDA_MAP, share("ION-5103")],
    institutions: ["hema-quebec-stem-cell-registry"] }),

  i({ id: "hema-quebec-stem-cell-registry", name: "Héma-Québec Stem Cell Donor Registry", aka: ["Héma-Québec", "Hema-Quebec Stem Cell Donor Registry", "Registre des donneurs de cellules souches"],
    institutionType: "government", city: "Montreal", country: "CA", lat: 45.499, lng: -73.719, website: "https://www.hemaquebec.ca/en/stem-cells-donation",
    tldr: "Quebec's own register of volunteer stem cell donors, run by Héma-Québec, the province's blood service. People aged 18 to 35 in good health can join.",
    summary: "Héma-Québec, created in 1998 to collect and distribute blood products in Quebec, runs the province's Stem Cell Donor Registry. People between 18 and 35 years old, in good health and willing to donate to whoever needs them can join. Its pages explain that a patient's siblings are checked first and the registry is searched for a matched unrelated donor when no family member matches, and that a registry reflecting the population's diversity raises everyone's chance of a match.",
    links: [{ label: "Héma-Québec: stem cell donation", url: "https://www.hemaquebec.ca/en/stem-cells-donation" }, { label: "Héma-Québec: about", url: "https://www.hemaquebec.ca/en/about" }, WMDA_MAP, share("ION-6912")],
    institutions: ["canadian-blood-services-stem-cell-registry"] }),

  i({ id: "stem-cell-donors-australia", name: "Stem Cell Donors Australia", aka: ["Strength to Give", "ABMDR"],
    institutionType: "consortium", city: "Sydney", country: "AU", lat: -33.880, lng: 151.205, website: "https://stemcelldonors.org.au/",
    tldr: "Australia's national blood stem cell donor registry, formerly called Strength to Give and the ABMDR. It recruits donors and links Australian patients with donors overseas, and overseas patients with Australian donors.",
    summary: "Stem Cell Donors Australia, formerly known as Strength to Give and ABMDR, manages Australia's blood stem cell donor registry. It recruits volunteer donors across Australia, aiming for a registry that reflects the population's diversity, manages donors' data, partners with registries abroad in both directions, and supports a matched donor through further testing to delivery of the cells. As a WMDA member it follows international standards for donor care and product quality, and it says that many communities are under-represented on the registry, which makes a match harder for some patients.",
    links: [{ label: "Stem Cell Donors Australia: about", url: "https://stemcelldonors.org.au/about/" }, WMDA_MAP, share("ION-7748")] }),

  i({ id: "ibmdr", name: "Italian Bone Marrow Donor Registry (IBMDR)", aka: ["IBMDR", "Registro Italiano Donatori di Midollo Osseo", "Registro nazionale Italiano Donatori di Midollo Osseo"],
    institutionType: "government", city: "Genoa", country: "IT", lat: 44.400, lng: 8.942, website: "https://ibmdr.galliera.it/",
    tldr: "Italy's national registry of unrelated bone marrow donors, founded in 1989 at the Galliera hospitals in Genoa. It searches for donors and cord blood units in Italy and abroad for patients with no family match.",
    summary: "The IBMDR was set up in 1989 by E.O. Ospedali Galliera in Genoa when Italy began its national bone marrow donation programme. It was recognised as Italy's national registry by Law no. 52 of 6 March 2001 and, by a State-Regions agreement of 5 October 2006, as the single access point for searches for unrelated haematopoietic stem cells for transplant. Its stated aim is to find, for patients waiting for an allogeneic transplant who have no suitable family donor, an unrelated volunteer adult donor or a donated cord blood unit compatible enough for transplant; it states that 70 per cent of patients who need such a transplant have no compatible family donor. It is in contact with all 139 donor registries worldwide, coordinates selection, donation and collection wherever the donor is, and certifies and pays the costs of searches. It is accredited by WMDA.",
    links: [{ label: "IBMDR: chi siamo", url: "https://ibmdr.galliera.it/chi-siamo" }, WMDA_MAP, share("ION-7450")],
    institutions: ["ospedali-galliera"] }),

  i({ id: "france-greffe-de-moelle", name: "France Greffe de Moelle (French stem cell donor registry)", aka: ["France Greffe de Moelle", "FGM", "Registre France Greffe de Moelle", "French Stem Cell Donor Registry"],
    institutionType: "government", city: "Saint-Denis", country: "FR", lat: 48.916, lng: 2.362, website: "https://www.dondemoelleosseuse.fr",
    tldr: "France's national register of volunteer bone marrow donors, run by the Agence de la biomédecine, the public agency under the health ministry.",
    summary: "The French registry of volunteer stem cell donors, known internationally as France Greffe de Moelle, is run by the Agence de la biomédecine, an agency of the French health ministry, from its offices at Saint-Denis La Plaine. Its recruitment site invites people to register as bone marrow donors and carries the accounts of donors and patients, including a patient cured of leukaemia by the marrow of a young Polish donor.",
    links: [{ label: "Don de moelle osseuse (Agence de la biomédecine)", url: "https://www.dondemoelleosseuse.fr" }, WMDA_MAP, share("ION-1804")],
    notes: ["The agency's own page on haematopoietic stem cell transplantation returned 404 on 4 November 2026; founding year and donor numbers were not on the pages read."] }),

  i({ id: "redmo", name: "REDMO (Spanish Bone Marrow Donors Registry)", aka: ["REDMO", "Registro de Donantes de Médula Ósea", "Spanish Bone Marrow Donors Registry"],
    institutionType: "consortium", city: "Barcelona", country: "ES", lat: 41.384, lng: 2.163, website: "https://fcarreras.org/en/spanish-bone-marrow-donors-registry-redmo/",
    tldr: "Spain's register of bone marrow donors, run by the Josep Carreras Leukaemia Foundation in Barcelona.",
    summary: "REDMO, the Spanish Bone Marrow Donors Registry, is run by the Josep Carreras Leukaemia Foundation in Barcelona, which publishes the registry's news and scientific communications alongside the stories of patients who received unrelated-donor transplants.",
    links: [{ label: "Josep Carreras Foundation: REDMO", url: "https://fcarreras.org/en/spanish-bone-marrow-donors-registry-redmo/" }, WMDA_MAP, share("ION-7813")],
    notes: ["The foundation's pages read on 4 November 2026 did not state REDMO's founding year or donor count."] }),

  i({ id: "matchis", name: "Matchis Foundation", aka: ["Matchis", "Stichting Matchis"],
    institutionType: "consortium", city: "Leiden", country: "NL", lat: 52.164, lng: 4.478, website: "https://www.matchis.nl",
    tldr: "The Dutch stem cell donor registry. People aged 18 to 35 in the Netherlands can sign up online and send three cheek swabs to be tissue-typed.",
    summary: "Matchis is the Dutch stem cell donor registry. People aged 18 to 35 register online and send three cheek swabs; their tissue type is then entered in the donor database. Under its former name, the Europdonor Foundation, it managed Bone Marrow Donors Worldwide, the shared international collection of donor tissue types that began in 1988 and merged into WMDA in 2017 (WMDA's account). On 30 September 2026 Matchis welcomed advice from the Dutch Health Council to allow non-anonymous contact between stem cell donors and recipients, on condition of a two-year wait and both parties' consent, and it reported 2,400 new donor sign-ups during a national awareness week from 21 to 27 September.",
    links: [{ label: "Matchis", url: "https://www.matchis.nl/" }, { label: "WMDA: the story of WMDA (Europdonor and BMDW)", url: "https://wmda.info/about-wmda/" }, WMDA_MAP, share("ION-8139")] }),

  i({ id: "welsh-bone-marrow-donor-registry", name: "Welsh Bone Marrow Donor Registry (WBMDR)", aka: ["WBMDR", "Welsh Bone Marrow Donor Registry"],
    institutionType: "government", city: "Pontyclun", country: "GB", lat: 51.541, lng: -3.384, website: "https://www.welsh-blood.org.uk/donating-stem-cells/",
    tldr: "The stem cell donor register run by the Welsh Blood Service. People can join from 16 until their 31st birthday, or until their 46th if they are of Black, Asian, mixed heritage or minority ethnic background.",
    summary: "The Welsh Blood Service, the primary supplier of blood products to NHS Wales, manages the Welsh Bone Marrow Donor Registry, which supplies stem cell products nationally and internationally. The registry is a panel of volunteers willing to donate bone marrow or peripheral blood stem cells, searched daily for matches. People can join from age 16 until their 31st birthday, or until their 46th birthday if they are of Black, Asian, mixed heritage or minority ethnic background, by asking at a blood donation appointment, and remain on the panel until their 61st birthday. The service notes that 75 per cent of UK patients will not find a matching donor in their family.",
    links: [{ label: "Welsh Blood Service: donating stem cells", url: "https://www.welsh-blood.org.uk/donating-stem-cells/" }, { label: "Welsh Blood Service: about us", url: "https://www.welsh-blood.org.uk/about-us/" }, WMDA_MAP, share("ION-1726")],
    institutions: ["nhs-stem-cell-donor-registry", "anthony-nolan"] }),

  i({ id: "gift-of-life-marrow-registry", name: "Gift of Life Marrow Registry", aka: ["Gift of Life", "Gift of Life Marrow Registry"],
    institutionType: "consortium", city: "Boca Raton", country: "US", lat: 26.394, lng: -80.103, website: "https://www.giftoflife.org",
    tldr: "A US nonprofit blood stem cell and marrow registry that recruits donors by mail-in cheek swab and arranges transplants for patients with leukaemia, lymphoma, sickle cell disease and inherited immune disorders.",
    summary: "Gift of Life describes itself as a nonprofit blood stem cell and marrow registry ranked in the top 10 per cent of registries worldwide by transplant volume; it recruits volunteer donors, who register with a swab kit returned by post, and facilitates transplants for patients with leukaemia, lymphoma, sickle cell disease and inherited immune disorders. It is accredited by WMDA, qualified by AABB for cellular starting material, licensed by the New York State Department of Health, and contracted with NMDP as an associate donor registry; it is a 501(c)(3) charity.",
    links: [{ label: "Gift of Life", url: "https://www.giftoflife.org" }, { label: "Gift of Life: credentials", url: "https://www.giftoflife.org/about/credentials" }, WMDA_MAP, share("ION-1033")],
    institutions: ["nmdp"],
    notes: ["The \"top 10 per cent\" ranking is the registry's own statement; its basis is not given on the page read. Founding year not stated on the pages read."] }),

  i({ id: "hong-kong-bone-marrow-donor-registry", name: "Hong Kong Bone Marrow Donor Registry", aka: ["Hong Kong Red Cross Blood Transfusion Service bone marrow registry"],
    institutionType: "government", city: "Hong Kong", country: "HK", lat: 22.311, lng: 114.175, website: "https://www5.ha.org.hk/RCBTS/stem-cell-donation",
    tldr: "Hong Kong's register of volunteer marrow and blood stem cell donors, run by the Hong Kong Red Cross Blood Transfusion Service.",
    summary: "The registry is run by the Hong Kong Red Cross Blood Transfusion Service (香港紅十字會輸血服務中心), at its King's Park headquarters in Yau Ma Tei according to WMDA's listing. The service's site has pages on haematopoietic stem cell donation, registering as a bone marrow donor, matching and donation, and peripheral blood stem cell donation.",
    links: [{ label: "Hong Kong Red Cross Blood Transfusion Service: stem cell donation (Chinese)", url: "https://www5.ha.org.hk/RCBTS/stem-cell-donation" }, WMDA_MAP, share("ION-4070")],
    notes: ["The service's pages were read in Chinese only; no founding year or donor count was stated on them."] }),

  i({ id: "tzu-chi-stem-cells-center", name: "Buddhist Tzu Chi Stem Cells Center (BTCSCC)", aka: ["BTCSCC", "Tzu Chi Stem Cells Center"],
    institutionType: "consortium", city: "Hualien", country: "TW", lat: 23.995, lng: 121.592, website: "https://btcscc.tzuchi.com.tw/",
    tldr: "A volunteer stem cell donor registry in Taiwan, based at Tzu Chi Hospital in Hualien and listed by the World Marrow Donor Association as one of its member registries.",
    summary: "WMDA's member map lists the Buddhist Tzu Chi Stem Cells Center at Tzu Chi Hospital, Chung Yang Road Section 3, Hualien, Taiwan, with WMDA Share identifier ION-3458. The centre's own site serves its content through a script and could not be read as text.",
    links: [{ label: "Buddhist Tzu Chi Stem Cells Center", url: "https://btcscc.tzuchi.com.tw/" }, WMDA_MAP, share("ION-3458")],
    notes: ["Rests on the WMDA listing alone: the centre's own pages (Chinese and English) returned only a script shell on 4 November 2026, so no founding year, donor count or size claim is made. The coordinates are Hualien city; WMDA's map pin for this entry sits in Taipei and was not used."] }),

  i({ id: "datri", name: "DATRI Blood Stem Cell Donors Registry", aka: ["DATRI"],
    institutionType: "consortium", city: "Chennai", country: "IN", lat: 12.999, lng: 80.259, website: "https://datri.org/",
    tldr: "An Indian not-for-profit registry of unrelated blood stem cell donors, founded in 2009 because Indian patients rarely found a matched donor on registries abroad.",
    summary: "DATRI was founded in 2009 as a not-for-profit organisation to give patients with blood cancers, thalassaemia, aplastic anaemia, sickle cell anaemia and other blood disorders access to unrelated donors. Its account: its founders knew of the shortage of HLA-matched unrelated Indian donors, there being no registry in India at the time, and with an entrepreneur whose friend's fiancée of Indian origin had found no match on the US or other registries they set up an unrelated donor registry in India. Histogenetics supported its installation, gave it office space in Chennai in its early years, helped design its software, and provided a long-term interest-free loan for high-resolution HLA typing of donors. DATRI notes that over 80 registries worldwide hold more than 30 million donors, with very few Indians among them.",
    links: [{ label: "DATRI: know more", url: "https://datri.org/know-more-about-datri/" }, WMDA_MAP, share("ION-8486")] }),

  i({ id: "ezer-mizion-bone-marrow-registry", name: "Ezer Mizion Bone Marrow Donor Registry", aka: ["Ezer Mizion", "Ezer Mizion Bone Marrow Registry"],
    institutionType: "consortium", city: "Petah Tikva", country: "IL", lat: 32.084, lng: 34.868, website: "https://ezermizion.org",
    tldr: "An Israeli bone marrow donor registry run by the health-support charity Ezer Mizion since 1998. Since 2005 every new soldier in the Israel Defense Forces can join it at induction.",
    summary: "Ezer Mizion, an Israeli health-support organisation, has run its bone marrow donor registry since 1998 and makes its donors available through the international WMDA network. In 2005 the Israel Defense Forces and Ezer Mizion signed an agreement allowing every recruit to join the registry during army induction, which Ezer Mizion says brings in young donors of varied ethnic groups and speeds matches for patients around the world.",
    links: [{ label: "Ezer Mizion: about us", url: "https://ezermizion.org/about-us/" }, WMDA_MAP, share("ION-4987")] }),

  i({ id: "sabmr", name: "South African Bone Marrow Registry (SABMR)", aka: ["SABMR"],
    institutionType: "consortium", city: "Cape Town", country: "ZA", lat: -33.941, lng: 18.462, website: "https://sabmr.co.za/",
    tldr: "South Africa's national bone marrow donor registry, started in Cape Town in 1991. It finds unrelated donors locally and through registries abroad for the roughly 70 per cent of patients with no family match.",
    summary: "The SABMR was founded in 1991 in Cape Town, where its office is at Groote Schuur Hospital according to WMDA's listing. It states that about 30 per cent of South African patients needing a bone marrow stem cell transplant find a match within their family and the other 70 per cent depend on an unrelated donor, and that through international partners it has access to about 43 million donors. It is a non-profit and Public Benefit Organisation and a WMDA member.",
    links: [{ label: "SABMR: about us", url: "https://sabmr.co.za/about-us/" }, WMDA_MAP, share("ION-8118")],
    institutions: ["groote-schuur-uct"] }),

  i({ id: "incucai-hsc-donor-registry", name: "Argentine Registry of Haematopoietic Stem Cell Donors (INCUCAI)", aka: ["INCUCAI", "Registro Nacional de Donantes de CPH", "Argentine HSC Donors Registry", "Instituto Nacional Central Único Coordinador de Ablación e Implante"],
    institutionType: "government", city: "Buenos Aires", country: "AR", lat: -34.638, lng: -58.381, website: "https://www.argentina.gob.ar/salud/incucai",
    tldr: "Argentina's national register of blood stem cell donors, run by INCUCAI, the national agency that coordinates organ, tissue and cell donation and transplantation.",
    summary: "INCUCAI (Instituto Nacional Central Único Coordinador de Ablación e Implante) promotes, regulates, coordinates and oversees donation and transplantation of organs, tissues and cells in Argentina, and runs the national registry of haematopoietic stem cell (CPH) donors, which people can now join with a cheek swab.",
    links: [{ label: "INCUCAI", url: "https://www.argentina.gob.ar/salud/incucai" }, WMDA_MAP, share("ION-5117")],
    notes: ["Founding year and donor numbers for the stem cell registry were not on the page read."] }),

  i({ id: "thai-national-stem-cell-donor-registry", name: "Thai National Stem Cell Donor Registry", aka: ["Thai Stem Cell Donor Registry", "Thai Red Cross stem cell donor registry"],
    institutionType: "government", city: "Bangkok", country: "TH", lat: 13.734, lng: 100.533, website: "https://stemcellthai.redcross.or.th",
    tldr: "Thailand's national register of volunteer blood stem cell donors, run by the National Blood Centre of the Thai Red Cross Society in Bangkok.",
    summary: "WMDA's member map lists the Thai National Stem Cell Donor Registry at the National Blood Centre of the Thai Red Cross Society, Henri Dunant Road, Bangkok, with WMDA Share identifier ION-8362. The registry's own site carries its name but its content pages could not be read as text.",
    links: [{ label: "Thai National Stem Cell Donor Registry", url: "https://stemcellthai.redcross.or.th" }, WMDA_MAP, share("ION-8362")],
    notes: ["Rests on the WMDA listing: the registry's home page returned only its title and its English and about pages returned 404 on 4 November 2026."] }),

  i({ id: "saudi-stem-cells-donor-registry", name: "Saudi Stem Cells Donor Registry (SSCDR)", aka: ["SSCDR"],
    institutionType: "research-institute", city: "Riyadh", country: "SA", lat: 24.633, lng: 46.717, website: "http://sscdr.org.sa/",
    tldr: "Saudi Arabia's volunteer stem cell donor registry, based at the King Abdullah International Medical Research Center in Riyadh.",
    summary: "WMDA's member map lists the Saudi Stem Cells Donor Registry (SSCDR) at the King Abdullah International Medical Research Center (KAIMRC), King Abdulaziz Medical City, Riyadh, with WMDA Share identifier ION-2107. A second Saudi registry, at King Faisal Specialist Hospital and Research Centre, is listed separately by WMDA.",
    links: [{ label: "SSCDR", url: "http://sscdr.org.sa/" }, WMDA_MAP, share("ION-2107")],
    notes: ["Rests on the WMDA listing alone: sscdr.org.sa did not answer (connection timed out) on 4 November 2026."] }),

  i({ id: "nybc-national-cord-blood-program", name: "National Cord Blood Program, New York Blood Center", aka: ["NCBP", "National Cord Blood Program", "HEMACORD", "Comprehensive Cell Solutions"],
    institutionType: "research-institute", city: "Rye", country: "US", lat: 40.97, lng: -73.68, website: "https://www.comprehensivecellsolutions.com/services/cord-blood/",
    tldr: "The world's first public cord blood bank, run by New York Blood Center, which marked its 30th anniversary in February 2023. It stopped collecting in 2020 but keeps more than 27,000 frozen cord blood units for transplants and research.",
    summary: "New York Blood Center describes its National Cord Blood Program as the world's first public cord blood bank; it marked its 30th anniversary in February 2023. The first clinical transplants of unrelated-donor cord blood were performed with NCBP units, and in 2011 it became the first to obtain an FDA biologics licence, for HEMACORD. NCBP stopped active collections in 2020 and maintains a cryopreserved inventory of more than 27,000 clinical-grade units, offered through NYBC's Comprehensive Cell Solutions as unrelated-donor transplant sources and for cell therapy research.",
    links: [{ label: "Comprehensive Cell Solutions: cord blood (National Cord Blood Program)", url: "https://www.comprehensivecellsolutions.com/services/cord-blood/" }, WMDA_MAP, share("ION-8691")],
    notes: ["The 1993 opening is inferred from the 30th anniversary in February 2023 stated on the page; the page does not give the year directly.", "The WMDA listing gives 601 Midland Avenue, Rye, New York; coordinates are Rye. NYBC's former programme URL now redirects to its home page."] }),

  i({ id: "carolinas-cord-blood-bank", name: "Carolinas Cord Blood Bank (Duke)", aka: ["CCBB", "Carolinas Cord Blood Bank", "DUCORD"],
    institutionType: "university", university: "Duke University", city: "Durham", country: "US", lat: 36.011, lng: -78.937, website: "https://marcuscenter.duke.edu/carolinas-cord-blood-bank",
    tldr: "One of the largest public cord blood banks in the world, part of Duke University School of Medicine. Mothers donate their babies' cord blood, and the units are listed on the NMDP registry for unrelated patients.",
    summary: "The Carolinas Cord Blood Bank was established in 1998 with support from the National Heart, Lung, and Blood Institute of the NIH and is part of the Duke University School of Medicine. It holds a racially diverse inventory of donated units, listed on the NMDP registry, and received FDA approval for DUCORD, its licensed unrelated-donor cord blood product. It has distributed units for transplantation to several thousand children and adults since 1999, many with leukaemia, lymphoma or severe aplastic anaemia, and also supplies units for research.",
    links: [{ label: "Carolinas Cord Blood Bank: about", url: "https://marcuscenter.duke.edu/carolinas-cord-blood-bank/about-ccbb" }, WMDA_MAP],
    institutions: ["nmdp"],
    notes: ["The page names the funder as the \"National Heart and Blood Institute of the NIH\"; the institute's name is the National Heart, Lung, and Blood Institute. The year of DUCORD's FDA approval was not on the page read."] }),

  i({ id: "jose-carreras-cord-blood-bank-duesseldorf", name: "José Carreras Cord Blood Bank Düsseldorf", aka: ["José Carreras Stammzellbank", "Düsseldorf Cord Blood Bank", "José Carreras Cord Blood Bank Düsseldorf-Universitätsklinikum Düsseldorf"],
    institutionType: "hospital", city: "Düsseldorf", country: "DE", lat: 51.198, lng: 6.788, website: "https://www.uniklinik-duesseldorf.de/patienten-besucher/klinikeninstitutezentren/jose-carreras-stammzellbank",
    tldr: "A public cord blood bank at Düsseldorf University Hospital, founded in 1992 with the German José Carreras Leukaemia Foundation. Its unrelated-donor cord blood is licensed as a medicine in Germany.",
    summary: "The José Carreras Stammzellbank was founded in 1992, with support from the Deutsche José Carreras Leukämie-Stiftung, at the Institute for Transplantation Diagnostics and Cell Therapeutics on the Düsseldorf University Hospital campus, under the direction of Gesine Kögler. In 2001 the Paul-Ehrlich-Institut licensed its unrelated-donor cord blood transplants as a medicinal product, a licence extended without time limit on 26 May 2010, and it was accredited by FACT-NetCord from 2003. It holds a manufacturing authorisation from the Düsseldorf regional government; the bank states that more than 1,230 patients had been treated with Düsseldorf stem cell transplants by 2016.",
    links: [{ label: "José Carreras Stammzellbank: über uns", url: "https://www.uniklinik-duesseldorf.de/patienten-besucher/klinikeninstitutezentren/jose-carreras-stammzellbank/ueber-uns" }, { label: "José Carreras Stammzellbank: Fakten", url: "https://www.uniklinik-duesseldorf.de/patienten-besucher/klinikeninstitutezentren/jose-carreras-stammzellbank/ueber-uns/fakten" }, WMDA_MAP, share("ION-4908")],
    institutions: ["uk-duesseldorf"],
    notes: ["The 1,230 patients figure is the bank's own, dated 2016 on its facts page. Gesine Kögler has no person record in OnCo."] }),

  i({ id: "bst-barcelona-cord-blood-bank", name: "Banc de Sang i Teixits cord blood bank, Barcelona", aka: ["Banc de Sang i Teixits", "BST", "Barcelona Cord Blood Bank", "Concordia Programme"],
    institutionType: "government", city: "Barcelona", country: "ES", lat: 41.401, lng: 2.208, website: "https://www.bancsang.net/en/products-services/cord-blood/",
    tldr: "The public cord blood bank of Catalonia's Blood and Tissue Bank. It stores more than 20,000 donated cord blood units, and 2,000 have been transplanted in about thirty countries.",
    summary: "The Banc de Sang i Teixits (Blood and Tissue Bank) is a public entity of the Catalan health system. It runs the cord blood bank of the Concordia Programme, an interregional cooperative programme for umbilical cord blood donation between the Catalan health department and those of the Balearic Islands, Aragon, Navarre, Extremadura, Cantabria and Andorra; the BST cryopreserves, tests, stores and distributes the units. The programme holds over 20,000 units listed on national and international registries, and 2,000 units from the bank have been transplanted in around thirty countries. It is accredited nationally and by FACT-NetCord.",
    links: [{ label: "BST: cord blood (products and services)", url: "https://www.bancsang.net/en/products-services/cord-blood/" }, { label: "BST: donate cord blood", url: "https://www.bancsang.net/en/donations/cord-blood/" }, WMDA_MAP] }),
];

/** Existing records that should name the new ones (for the parent to wire; this file edits no other record). */
export const donorRegistryBacklinks: Record<string, string[]> = {
  "anthony-nolan": ["wmda", "nhs-stem-cell-donor-registry", "dkms-uk", "welsh-bone-marrow-donor-registry"],
  "allogeneic-transplant": ["wmda", "nmdp"],
  "inca-brazil": ["redome"],
  "ospedali-galliera": ["ibmdr"],
  "uk-duesseldorf": ["jose-carreras-cord-blood-bank-duesseldorf"],
  "groote-schuur-uct": ["sabmr"],
};
