import type { CollectionInput, InstitutionInput } from "@/lib/schema";

/**
 * Biobanks the November 2026 gap census (docs/proposals/gap-census-2026-11.md, type `biobanks`) found missing, plus
 * NCI's TARGET childhood-cancer genomics programme. Read on 4 November 2026: the ten European entries from the
 * BBMRI-ERIC Directory's GraphQL endpoint (biobank name, description, website, juridical person and the collections
 * listed under it, with the sample and donor counts the directory gives), the rest from each programme's own home
 * page fetched as raw HTML. Counts are the holder's own figures on that date; where a page did not state something
 * (a founding year, a host), the record leaves it out.
 */

const asOf = "2026-11-04";
const DIRECTORY = "https://directory.bbmri-eric.eu/ERIC/directory/";

type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

type C = Omit<CollectionInput, "kind" | "asOf">;
const c = (x: C): CollectionInput => ({
  kind: "collection", asOf, ...x,
  links: [{ label: x.name, url: x.url }, ...(x.links ?? []).filter((l) => l.url !== x.url)],
  technologies: ["biobanking", ...(x.technologies ?? [])],
});

/** A BBMRI-ERIC Directory entry: the directory is the source for every fact in these records. */
const dirLink = (bbmriId: string) => ({ label: `BBMRI-ERIC Directory entry ${bbmriId}`, url: DIRECTORY });
const dirNote = (bbmriId: string) => `Directory id ${bbmriId}. Description, juridical person and collection counts read from the BBMRI-ERIC Directory GraphQL endpoint (https://directory.bbmri-eric.eu/ERIC/graphql) on 4 November 2026; counts are what the biobank reported to the directory, not an audit.`;

const BBMRI_MEMBERS = [
  "biobank-graz", "meduni-wien-biobank", "central-biobank-erlangen", "westdeutsche-biobank-essen", "amsterdam-umc-biobank",
  "nl-colorectal-cancer-research-platform", "crb-ospedale-san-raffaele", "biobanca-ire", "incliva-biobank", "biobank-nci-slovakia",
];

export const institutionsBiobankGaps2026: InstitutionInput[] = [
  i({ id: "bbmri-eric", name: "BBMRI-ERIC (Biobanking and BioMolecular resources Research Infrastructure)", aka: ["BBMRI-ERIC", "BBMRI", "Biobanking and BioMolecular resources Research Infrastructure - European Research Infrastructure Consortium"],
    institutionType: "consortium", city: "Graz", country: "AT", lat: 47.07, lng: 15.44, website: "https://www.bbmri-eric.eu/",
    tldr: "Europe's network of biobanks, the places that store blood, tissue and DNA donated by patients and volunteers for research. It runs a public directory where researchers can find which biobank holds samples from people with a given cancer, and how to ask for them.",
    summary: "BBMRI-ERIC describes itself as the European research infrastructure for biobanking and biomolecular resources, set up in 2013 and headquartered in Graz, Austria. Its about page, read on 4 November 2026, gives its size two ways: \"28 Member and Observer Countries plus IARC/WHO and around 500 biobanks\" in one paragraph and \"25 countries and one international organisation\" in another. Its services cover access to samples and data, quality management and an audit programme, ethical, legal and societal issues (ELSI), IT, training and a helpdesk.\n\nFor a researcher the working tool is the BBMRI-ERIC Directory, a searchable catalogue of member biobanks and their collections, each with the diagnoses (as ICD-10 codes), material types and approximate sizes the biobank reports. On 4 November 2026 the directory's data endpoint returned 852 biobanks and 5,951 collections; 186 of those biobanks list at least one collection with a cancer or neoplasm diagnosis (ICD-10 C or D00-D48), which is how the gap census counted them. A patient who has given tissue at a European hospital may find that hospital's biobank here.",
    programs: ["BBMRI-ERIC Directory of biobanks and collections", "Sample and data access services", "Quality management and audit programme", "ELSI (ethical, legal and societal issues) services", "BBMRI-ERIC Academy training"],
    links: [{ label: "About BBMRI-ERIC", url: "https://www.bbmri-eric.eu/about/" }, { label: "BBMRI-ERIC Directory", url: DIRECTORY }],
    institutions: ["iarc"], technologies: ["biobanking"],
    related: [...BBMRI_MEMBERS, "uk-biobank"],
    notes: ["The two membership figures on the about page disagree (28 member and observer countries plus IARC/WHO, against 25 countries and one international organisation); both are quoted rather than choosing one.", "The member-states page linked from the about page returned 'page doesn't exist' on 4 November 2026, so the member list is not reproduced here.", "Biobank and collection totals (852, 5,951, 186 with cancer diagnoses) are from the gap census's GraphQL read of the directory on the same day."] }),
];

export const collectionsBiobankGaps2026: CollectionInput[] = [
  // BBMRI-ERIC Directory members
  c({ id: "biobank-graz", name: "Biobank Graz", aka: ["Biobank Graz (Medical University of Graz)"], url: "http://www.medunigraz.at/biobank",
    holds: "Human tissue (FFPE blocks and slides, cryopreserved tissue) and fluids from patients of the Graz university hospital; the BBMRI-ERIC Directory lists 540 collections, most organised by organ and preservation type (for example an FFPE oesophagus collection of 124,449 samples).",
    maintainer: "Medical University of Graz",
    tldr: "The research biobank of the Medical University of Graz in Austria, which keeps tissue and fluid samples left over from patients' diagnosis and treatment so that researchers can study disease, including many cancers.",
    summary: "Biobank Graz states its mission as supporting research on the cause of diseases and the development of improvements in diagnosis and treatment. Its juridical person is the Medical University of Graz, the city that also hosts BBMRI-ERIC's headquarters. In the BBMRI-ERIC Directory it lists 540 collections, mostly by organ and preservation method: formalin-fixed paraffin-embedded (FFPE) blocks, FFPE slides and cryopreserved tissue. Examples read on 4 November 2026 include FFPE blocks from the oesophagus (124,449 samples), the cervix (25,513) and the vulva (9,781), and FFPE slides from benign breast tumours (72,100 samples from 7,310 donors).",
    links: [dirLink("bbmri-eric:ID:AT_MUG")], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:AT_MUG"), "OnCo has no record for the Medical University of Graz, so the host is named but not linked."] }),

  c({ id: "meduni-wien-biobank", name: "MedUni Wien Biobank", aka: ["Biobank of the Medical University of Vienna"], url: "http://www.biobank.at",
    holds: "Blood derivatives, DNA and tissue from studies at the Medical University of Vienna; the BBMRI-ERIC Directory lists 343 collections, among them pancreatic-tumour DNA and a gynaecological-oncology plasma bank.",
    maintainer: "Medical University of Vienna",
    tldr: "The central biobank of the Medical University of Vienna, which stores samples from many research studies there, including cancer studies, and makes them available to researchers.",
    summary: "The MedUni Wien Biobank describes itself as a link between basic and clinical research, aimed at enhancing research into emerging biomarkers and therapy strategies. Its juridical person is the Medical University of Vienna. The BBMRI-ERIC Directory lists 343 collections, most tied to a named study and a sample type. Cancer-related examples read on 4 November 2026 include a pancreatic-tumour DNA collection (141 samples from 132 donors) and a blood sample bank in gynaecological oncology (535 EDTA-plasma samples from 453 donors); many others are cardiology, transplant and metabolic studies.",
    links: [dirLink("bbmri-eric:ID:AT_MUW")], institutions: ["ccc-vienna"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:AT_MUW"), "Linked to ccc-vienna, OnCo's record for the Comprehensive Cancer Center of the Medical University of Vienna, as the nearest host record."] }),

  c({ id: "central-biobank-erlangen", name: "Central Biobank Erlangen (CeBE)", aka: ["CeBE", "Zentralbiobank Erlangen"], url: "https://www.med.fau.de/cebe/",
    holds: "An umbrella for 17 biobanks in Erlangen; the BBMRI-ERIC Directory lists four collections, the largest the CCC tissue bank (CCC-Gewebebank) at 2,000,000 samples, plus radiotherapy, urology and gynaecology collections.",
    maintainer: "University Hospital Erlangen",
    tldr: "An association of 17 biobanks at the university hospital in Erlangen, Germany, that helps them collect and store samples to a common standard. Its largest collection is the cancer centre's tissue bank.",
    summary: "CeBE describes itself as an association of currently 17 biobanks located in Erlangen, supporting the affiliated biobanks in collecting, characterising, registering, archiving and processing human biospecimens in high quality, and promoting research projects. The directory names University Hospital Erlangen as its juridical person. Of the four collections listed on 4 November 2026, the Comprehensive Cancer Center tissue bank (CCC-Gewebebank) reports 2,000,000 samples; the radiotherapy clinic (Strahlenklinik), urology and gynaecology (Frauenklinik) collections give an order of magnitude but no count.",
    links: [dirLink("bbmri-eric:ID:DE_CeBE")], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:DE_CeBE"), "OnCo has no record for University Hospital Erlangen or its comprehensive cancer centre, so the host is not linked."] }),

  c({ id: "westdeutsche-biobank-essen", name: "Westdeutsche Biobank Essen (WBE)", aka: ["WBE", "West German Biobank Essen"], url: "https://www.uni-due.de/med/biobank/",
    holds: "The central biobank of the Medical Faculty of the University of Duisburg-Essen at Essen University Hospital; its main collection in the BBMRI-ERIC Directory reports 564,674 samples.",
    maintainer: "Universitätsklinikum Essen",
    tldr: "The central biobank of the university hospital in Essen, Germany, home of the West German Cancer Center. It stores patients' samples so researchers can study the causes of disease and better diagnosis and treatment.",
    summary: "The directory describes the West German Biobank Essen as a central service facility of the Duisburg-Essen Medical Faculty at Essen University Hospital, supporting research into the causes of disease and improvement of diagnosis and therapy. Its juridical person is Universitätsklinikum Essen. Two collections are listed: the main collection (564,674 samples, as read on 4 November 2026) and a placeholder for COVID-19 cases with no samples.",
    links: [dirLink("bbmri-eric:ID:DE_WBE")], institutions: ["essen-wtz"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:DE_WBE"), "The directory does not split the main collection by diagnosis in the fields read, so no cancer-specific count is given."] }),

  c({ id: "amsterdam-umc-biobank", name: "Amsterdam UMC Biobank", url: DIRECTORY,
    holds: "Storage, logistics and data services for study biobanks across Amsterdam UMC (tissues, cells, serum, plasma, cerebrospinal fluid, urine, faeces, DNA and RNA); the BBMRI-ERIC Directory lists 214 collections, among them a haemato-oncology collection and a preoperative partial breast irradiation trial collection.",
    maintainer: "Amsterdam UMC",
    tldr: "A core facility at Amsterdam UMC in the Netherlands that stores samples for the hospital's research studies, from cancer trials to multiple sclerosis research, under common ethical and quality rules.",
    summary: "Amsterdam UMC Biobank was established in 2014 to support researchers in setting up biobanks that meet current ethical and quality standards. As one of Amsterdam UMC's core facilities it provides storage for biological materials (tissues, cells, sera, plasma, liquor, urine, faeces, DNA and RNA), logistics and data management, and runs the central ultra-low-temperature freezer sites. The directory lists 214 collections, most attached to individual studies; cancer-related examples read on 4 November 2026 include a haemato-oncology collection (480 samples from 30 donors) and one from a trial of single-dose preoperative partial breast irradiation in low-risk breast cancer (2,063 samples from 21 donors).",
    links: [dirLink("bbmri-eric:ID:NL_AUMCBB")], institutions: ["amsterdam-umc"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:NL_AUMCBB"), "The directory gives no website for this biobank, so the record's url is the directory itself."] }),

  c({ id: "nl-colorectal-cancer-research-platform", name: "Colorectal cancer research platform (Netherlands)", aka: ["Dutch colorectal cancer research platform"], url: DIRECTORY,
    holds: "An overview of human colorectal cancer studies with samples in the Netherlands; the BBMRI-ERIC Directory lists 50 study collections, among them PLCRC sub-studies, STAR-TREC II and LaNoReC.",
    maintainer: "Not stated (the directory lists the juridical person as 'no information')",
    tldr: "A Dutch directory of colorectal cancer research studies that hold patients' samples, built so that researchers can find samples for testing new ideas without starting a collection from scratch.",
    summary: "The directory describes the platform as a comprehensive overview of all human colorectal cancer studies in the Netherlands, started to connect fundamental and clinical research and to speed access to clinical samples for proof-of-concept and validation studies. It lists 50 collections, each a study: examples read on 4 November 2026 include PROCORE (479 samples), Protect (1,000 samples from 900 donors), an NTRK collection (400 samples), Lateral Nodal Recurrence in Rectal Cancer (LaNoReC), STAR-TREC II, and sub-studies of the Prospective Dutch Colorectal Cancer cohort (PLCRC-ORCA, PLCRC-QUALITAS).",
    links: [dirLink("bbmri-eric:ID:NL_CRC")], cancers: ["colorectal"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:NL_CRC"), "No website and no legal holder are given in the directory, so the record points to the directory."] }),

  c({ id: "crb-ospedale-san-raffaele", name: "Centro Risorse Biologiche, Ospedale San Raffaele (CRB-OSR)", aka: ["CRB-OSR", "San Raffaele Biobank"], url: DIRECTORY,
    holds: "The institutional liquid and tissue biobank of IRCCS Ospedale San Raffaele in Milan, run to ISO 20387; 18 collections in the BBMRI-ERIC Directory, among them haematological diseases (157,214 samples), chronic lymphocytic leukaemia, neuroendocrine tumours, lymphoid tissue and lung cancer.",
    maintainer: "IRCCS Ospedale San Raffaele",
    tldr: "The research biobank of San Raffaele hospital in Milan. It stores blood and tissue left over from diagnosis, including samples from leukaemia, lymphoma, lung cancer and neuroendocrine tumour patients, for approved research.",
    summary: "The directory describes CRB-OSR as the institutional biobank of IRCCS Ospedale San Raffaele, set up to organise and standardise the acceptance, registration, processing, conservation and distribution of human material and data for research, to ISO 20387, GCP and GCLP. It has a liquid biobank and a tissue biobank, the latter working with pathology to keep left-over diagnostic tissue, and serves clinical protocols from observational studies to phase I trials. Cancer-related collections read on 4 November 2026 include the haematological diseases biobank EmaBank (157,214 samples from 4,629 donors), the chronic leukaemia biobank CLL-BIO (42,096 from 1,039), the neuroendocrine tumours biobank NET_BANK (12,828 from 585), the lung cancer biobank SMAC-2 (6,380 from 1,108) and the lymphoid tissue biobank BB-LINF (230 from 208).",
    links: [dirLink("bbmri-eric:ID:IT_1383758011993577")], institutions: ["san-raffaele"], cancers: ["neuroendocrine"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:IT_1383758011993577")] }),

  c({ id: "biobanca-ire", name: "Biobanca IRE (Regina Elena National Cancer Institute Biobank)", aka: ["BBIRE", "Biobanca IRE"], url: "https://www.ifo.it",
    holds: "Frozen and FFPE tissue, blood derivatives, cells and cell lines, biological fluids and nucleic acids from cancer patients at the Regina Elena institute in Rome; 12 collections in the BBMRI-ERIC Directory, the largest a general tissue and fluid collection of 70,000 samples from 7,000 donors.",
    maintainer: "Istituto Nazionale Tumori Regina Elena",
    tldr: "The biobank of the Regina Elena National Cancer Institute in Rome, set up in 2014, which keeps tissue and blood from cancer patients for research, with collections for sarcoma, melanoma, gynaecological, breast and chest tumours.",
    summary: "The directory says BBIRE was born in 2014 as the biobank of the IRCCS Regina Elena National Cancer Institute, holding tissue and biological fluids of cancer patients and storing and distributing frozen tissue, FFPE tissue, blood derivatives, cells and cell lines, fluids, nucleic acids and related data. Collections read on 4 November 2026 include its general tissue and liquid collection (70,000 samples from 7,000 donors), sarcoma (2,662 from 525), thoracic tumours (1,207 from 581), female genital tumours (1,239 from 563), endometrial (680 from 327), ovarian (416 from 172), breast (529 from 250) and cutaneous melanoma (328 from 328), with a healthy-donor control set.",
    links: [dirLink("bbmri-eric:ID:IT_1504858990324590")], institutions: ["regina-elena-rome"], cancers: ["sarcoma", "ovarian", "melanoma"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:IT_1504858990324590"), "The directory's website for the biobank is the institute's home page."] }),

  c({ id: "incliva-biobank", name: "INCLIVA Biobank", url: "https://www.incliva.es/en/services/platforms/biobank/",
    holds: "Samples and clinical data from patients at Hospital Clínico Universitario de Valencia; 32 collections in the BBMRI-ERIC Directory, among them breast (105,004 samples), colon (100,426), lung (37,420), pancreatic (27,205), rectal (24,581) and gastric cancer.",
    maintainer: "INCLIVA Biomedical Research Institute (Fundación INCLIVA)",
    tldr: "The research biobank of the INCLIVA institute at the university hospital in Valencia, Spain, which holds large collections of samples from people with breast, bowel, lung, pancreatic and stomach cancers.",
    summary: "The directory describes INCLIVA Biobank as a research support platform that manages patients' samples and associated clinical data under strict conditions of quality and confidentiality; its juridical person is the INCLIVA Biomedical Research Institute. Cancer collections read on 4 November 2026: breast cancer (105,004 samples from 3,128 donors), colon cancer (100,426 from 840), lung cancer (37,420 from 1,838), pancreatic cancer (27,205 from 277), rectal cancer (24,581 from 199), gastric cancer (4,829 from 133) and brain tumours (753 from 153), alongside cardiology, neurology and COVID-19 collections.",
    links: [dirLink("bbmri-eric:ID:ES_INCLIVA")], institutions: ["incliva-valencia"], cancers: ["colorectal", "pancreatic", "gastric"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:ES_INCLIVA")] }),

  c({ id: "biobank-nci-slovakia", name: "Biobank of the National Cancer Institute (Slovakia)", aka: ["NCI Biobank Bratislava", "Biobanka Národného onkologického ústavu"], url: DIRECTORY,
    holds: "A project-oriented biobank of the National Cancer Institute in Bratislava; five collections in the BBMRI-ERIC Directory: testicular germ cell tumours (44,114 samples from 1,002 donors, including long-term follow-up), colorectal (13,135), breast (8,527), lymphoma (2,605) and pancreatic cancer (1,073).",
    maintainer: "Národný onkologický ústav (National Cancer Institute, Slovakia)",
    tldr: "The biobank of Slovakia's National Cancer Institute in Bratislava. Its largest collection follows men with testicular cancer over many years; it also keeps samples from breast, bowel, pancreatic, lymphoma and bladder cancer patients.",
    summary: "The directory describes it as a project-oriented biobank for the systematic collection, processing and long-term archiving of biological samples, primarily from patients with testicular germ cell tumours, breast, pancreatic and colorectal cancer, malignant lymphoma and urothelial cancer. Its juridical person is Národný onkologický ústav. Collections read on 4 November 2026: material from germ cell tumour patients including long-term follow-up (44,114 samples from 1,002 donors); plasma, blood and fresh-frozen tumour from colorectal cancer (13,135 from 1,745); plasma, blood and FFPE from breast cancer (8,527 from 885); plasma, blood, serum, urine and stool from malignant lymphoma (2,605 from 67); and plasma, blood and fresh-frozen tumour from pancreatic cancer (1,073 from 205).",
    links: [dirLink("bbmri-eric:ID:SK_NCI")], cancers: ["testicular", "colorectal", "pancreatic", "urothelial"], related: ["bbmri-eric"],
    notes: [dirNote("bbmri-eric:ID:SK_NCI"), "No website is given in the directory, and OnCo has no record for the Slovak National Cancer Institute (Národný onkologický ústav), so the host is named but not linked. The urothelial cancer collection is named in the description but not among the five collections listed."] }),

  // National biobanks and tissue banks outside BBMRI-ERIC
  c({ id: "chtn", name: "Cooperative Human Tissue Network (CHTN)", aka: ["CHTN", "NCI Cooperative Human Tissue Network"], url: "https://www.chtn.org/",
    holds: "Prospectively collected human tissues and fluids (malignant, benign, diseased and normal) from routine surgeries, autopsies and other procedures, fresh, frozen, fixed, in RNAlater or paraffin-embedded, plus biofluids, procured to each investigator's specification.",
    maintainer: "National Cancer Institute, Division of Cancer Treatment and Diagnosis",
    tldr: "A US government-funded network, running since 1987, that collects tissue left over from routine operations and autopsies at six university hospitals and supplies it to researchers, prepared the way each project needs.",
    summary: "The CHTN home page, read on 4 November 2026, describes it as a unique NCI-supported resource, supporting discoveries since 1987, that provides human tissues and fluids from routine procedures to investigators. Unlike a tissue bank that stores samples in advance, it works prospectively with each investigator to tailor acquisition and processing to the project: malignant, benign, diseased and normal tissue, biofluids (urine, serum, plasma, buffy coat), supplied fresh, frozen, floating in fixative, in RNAlater, or paraffin-embedded and as unstained slides. Its six divisions are the University of Pennsylvania, Vanderbilt University Medical Center, Ohio State University, the University of Virginia, Nationwide Children's Hospital and Duke University. The site sits under NCI's Division of Cancer Treatment and Diagnosis.",
    institutions: ["nci"],
    notes: ["The CHTN site carried a US government funding-lapse banner on 4 November 2026 saying information may not be up to date.", "The six divisions are named but not linked: OnCo's records for those universities are their cancer centres, which are not the same units as the CHTN divisions."] }),

  c({ id: "biobank-japan", name: "BioBank Japan (BBJ)", aka: ["BBJ", "Biobank Japan"], url: "https://biobankjp.org/en/",
    holds: "DNA from about 270,000 patients (800,000 tubes) and serum from about 200,000 (1,700,000 tubes), with clinical information on 51 diseases and 440,000 cases; whole-genome sequences for 16,000 patients, SNP data for 270,000, metabolome 43,830 and proteome 3,050 (figures to 1 April 2026).",
    license: "Controlled access: projects must pass BBJ's screening under Japanese law and guidelines; usage fees apply",
    maintainer: "Institute of Medical Science, The University of Tokyo",
    tldr: "A Japanese national biobank, started in 2003, that holds DNA, blood serum and medical information from about 270,000 patients with 51 diseases, used for research into genetic risk and personalised medicine.",
    summary: "BBJ describes itself as a disease-oriented biobank that receives biological samples and clinical information from patients diagnosed with target diseases through cooperating medical institutions nationwide. It was established in 2003 at the Institute of Medical Science, the University of Tokyo, as part of a national project to realise personalised medicine based on individual genetic information. Its home page, giving figures to 1 April 2026, lists 270,000 participating patients, 51 diseases and 440,000 cases; 800,000 DNA tubes from 270,000 patients; 1,700,000 serum tubes from 200,000; and genomic and omics data comprising whole-genome sequencing for 16,000 patients, SNP genotypes for 270,000, metabolome 43,830 and proteome 3,050. Samples are stored in ISO-certified facilities and released to academic and company projects that pass a screening process under Japanese law and guidelines. Its director named on the site is Koichi Matsuda.",
    related: ["uk-biobank", "all-of-us", "finngen"],
    notes: ["The home page does not list the 51 diseases; which cancers are included is left to BBJ's own pages and is not claimed here."] }),

  c({ id: "million-veteran-program", name: "Million Veteran Program (MVP)", aka: ["MVP", "VA Million Veteran Program"], url: "https://www.mvp.va.gov/",
    holds: "Genetic, survey and health-record data from over one million US military veterans, over 100,000 of them women and 25 per cent from minority racial and ethnic backgrounds.",
    license: "Coded research data; available only for research, not entered in medical records or shared with insurers or employers",
    maintainer: "US Department of Veterans Affairs",
    tldr: "A US Department of Veterans Affairs research programme that has enrolled over a million veterans, linking their genes, lifestyle and military exposures to their health records. Its cancer research includes breast and prostate cancer.",
    summary: "MVP describes itself as a health research programme studying how genes, lifestyles, military experiences and exposures affect health, with over one million veterans enrolled. Its pages read on 4 November 2026 say 25 per cent of participants come from minority racial and ethnic backgrounds, that MVP has the largest cohort of Black participants of any research programme in the world, and that over 100,000 women veterans take part. Among its research areas it lists cancer, with advances named in breast and prostate cancer. Participant data are coded, kept in a secure database for research only, and not entered in medical records or shared with insurers or employers.",
    related: ["uk-biobank", "all-of-us"],
    notes: ["The programme's start year and the size of its genotyped or sequenced subset are not stated on the pages read and are left out.", "OnCo has no record for the US Department of Veterans Affairs, so the maintainer is named but not linked."] }),

  c({ id: "finngen", name: "FinnGen", aka: ["FinnGen research project"], url: "https://www.finngen.fi/en",
    holds: "Genome data combined with longitudinal national health-registry data for more than 500,000 Finnish biobank donors, almost 10 per cent of the population; data freeze 13 covers more than 21.3 million variants and more than 2,750 health endpoints, with results and summary statistics public.",
    license: "Summary statistics and browsable results public; individual-level data stay with the Finnish biobanks under their access rules",
    maintainer: "University of Helsinki, with all Finnish public biobanks and industry partners",
    tldr: "A Finnish research project that has read the genomes of over 500,000 people, almost one in ten Finns, and linked them to their national health records to find how genes cause disease. Its results are free for anyone to browse.",
    summary: "FinnGen describes itself as a large public-private research project in genomics and personalised medicine that has collected and analysed genome and health data from 500,000 Finnish biobank donors, using samples gathered by the nationwide network of Finnish biobanks and combining them with digital health-care data from national registries. The University of Helsinki is the organisation responsible; the consortium includes all Finnish public biobanks and their background organisations. The genome data produced are owned by the Finnish biobanks and remain available for research. Data freeze 13, the latest release on the site when read on 4 November 2026, comprises more than 500,000 individuals, more than 21.3 million variants and more than 2,750 health endpoints, browsable online with downloadable summary statistics. Cancers are among the endpoints that come from the national registries.",
    institutions: ["fican"], related: ["uk-biobank", "biobank-japan"],
    notes: ["The statement that cancers are among the endpoints is an inference from the registry linkage; the home page does not single out cancer, and no cancer finding is claimed here.", "Linked to fican (Finnish Cancer Center) as the Finnish national cancer body; the University of Helsinki has no record in OnCo."] }),

  c({ id: "wales-cancer-biobank", name: "Wales Cancer Biobank (WCB)", aka: ["WCB", "Biobanc Canser Cymru"], url: "https://www.walescancerbank.com/",
    holds: "Biosamples and anonymised data donated by patients in Wales with known or suspected cancer, for future cancer research.",
    maintainer: "Wales Cancer Biobank",
    tldr: "A biobank that asks patients in Wales with known or suspected cancer whether they will donate samples and health data for research. It has been running for over 20 years.",
    summary: "The Wales Cancer Biobank approaches patients in Wales with known or suspected cancer to ask them to consent to donate biosamples and data for future cancer research. It calls itself one of the UK's largest and longest-established biobanks, and on 4 November 2026 its home page announced its 21st year of supporting cancer research in Wales and linked an end-of-award report for 2020-25 and a strategic plan for 2025-2030. It states that the information it holds is anonymised and that it does not release identifiable information to researchers or any other organisation.",
    related: ["uk-biobank"],
    notes: ["Sample totals, host organisation and funder are not stated on the home page read; the About page URL tried returned almost no text.", "Not linked to a Welsh hospital record because no page read names the host."] }),

  c({ id: "victorian-cancer-biobank", name: "Victorian Cancer Biobank (VCB)", aka: ["VCB"], url: "https://viccancerbiobank.org.au/",
    holds: "Over 460,000 cancer biospecimens with associated clinical data, donated by almost 40,000 people in Victoria, Australia, plus prospective collections and specimen services for clinical trials.",
    maintainer: "Cancer Council Victoria (lead agency), with Austin Health, Eastern Health, Melbourne Health, Monash Health and Peter MacCallum Cancer Centre",
    tldr: "A shared cancer biobank in Melbourne, Australia, run by Cancer Council Victoria with five hospitals. Almost 40,000 people have donated samples, used in over 300 research projects, including work on a blood test for bowel cancer.",
    summary: "The VCB home page, read on 4 November 2026, offers access to over 460,000 cancer biospecimens and associated clinical data, plus bespoke prospective collections and specimen services for clinical trials. Led by Cancer Council Victoria, the consortium comprises Austin Health, Eastern Health, Melbourne Health, Monash Health and Peter MacCallum Cancer Centre, and describes itself as one of the largest open-access cancer biobanks in Australia. Donations from almost 40,000 Victorians have supported over 300 academic and commercial projects and over 300 publications, in the VCB's own count. It is supported by the Victorian Government through the Victorian Cancer Agency, and marked 20 years of operation in a media release on the site.",
    institutions: ["peter-mac"],
    notes: ["Only Peter MacCallum Cancer Centre is linked; OnCo has no records for Cancer Council Victoria, Austin Health, Eastern Health, Melbourne Health or Monash Health."] }),

  c({ id: "komen-tissue-bank", name: "Susan G. Komen Tissue Bank at Indiana University", aka: ["Komen Tissue Bank", "KTB", "Susan G. Komen Tissue Bank"], url: "https://komentissuebank.iu.edu/",
    holds: "Normal breast tissue with matched serum, plasma and DNA, donated by healthy women (5,211 tissue donors on the home page), richly annotated and available to researchers worldwide.",
    maintainer: "Indiana University Melvin and Bren Simon Comprehensive Cancer Center",
    tldr: "A tissue bank at Indiana University that collects normal breast tissue from healthy women volunteers, so researchers can compare it with cancer and learn how breast cancer starts. More than 5,000 women have donated.",
    summary: "The Komen Tissue Bank describes itself as the world's only biorepository for normal breast tissue and matched serum, plasma and DNA, offering richly annotated samples to scientists worldwide to study breast oncogenesis. It is part of the Indiana University Melvin and Bren Simon Comprehensive Cancer Center and collects at donation events (the next listed for 14 November 2026 in Fort Wayne, Indiana, with the Vera Bradley Foundation). Its home page, read on 4 November 2026, counts 5,211 women who have donated breast tissue, 230 researcher projects and 96 manuscripts using its samples or data; its About page counts 17 years, 60 donation events and 91 published articles.",
    institutions: ["iu-simon", "komen"],
    notes: ["The home page (96 manuscripts) and About page (91 published research articles) give different publication counts; both are as read on 4 November 2026."] }),

  c({ id: "taiwan-biobank", name: "Taiwan Biobank", aka: ["臺灣人體生物資料庫", "TWB"], url: "https://www.twbiobank.org.tw/",
    holds: "Samples and health data from 203,147 participants in Taiwan (counted to 31 October 2026), with repeat follow-up visits (108,166 completed the first round, 30,285 the second, 1,823 the third) and linkage to the national health insurance database.",
    maintainer: "Taiwan Biobank",
    tldr: "Taiwan's national population biobank, which follows more than 200,000 volunteers over years and links their samples to national health insurance records to study disease, including cancer, in people of Chinese ancestry.",
    summary: "The Taiwan Biobank home page (Chinese), read on 4 November 2026, gives enrolment to 31 October 2026 as 203,147 participants, of whom 108,166 had completed a first round of follow-up, 30,285 a second and 1,823 a third. It describes itself as a biobank of long-term follow-up of people of Chinese ancestry with vertically integrated release of samples and data, linked to the national health insurance database, with consent and withdrawal procedures and ISO-certified personal-data and information-security management.",
    related: ["uk-biobank", "biobank-japan"],
    notes: ["The 'cancer' in the plain-language summary refers to its use as a general population cohort; the home page does not single out cancer and no cancer finding is claimed.", "The English site path tried (/en/) returned no content, so facts are from the Chinese home page."] }),

  // NCI childhood-cancer genomics programme
  c({ id: "nci-target", name: "TARGET (Therapeutically Applicable Research to Generate Effective Treatments)", aka: ["TARGET", "NCI TARGET", "TARGET initiative", "phs000218"], url: "https://www.cancer.gov/ccg/research/genome-sequencing/target",
    holds: "Genomic and transcriptomic data from childhood cancers: acute lymphoblastic leukaemia (1,802 cases), acute myeloid leukaemia (2,145), neuroblastoma (1,132), Wilms tumour (652), osteosarcoma (383), rhabdoid tumour (69) and clear cell sarcoma of the kidney (13), plus cell line and xenograft models.",
    license: "Controlled access through dbGaP (phs000218 and sub-studies phs000463-phs000471); data served by the NCI Genomic Data Commons",
    maintainer: "National Cancer Institute, Center for Cancer Genomics",
    tldr: "A US National Cancer Institute programme, begun in 2007, that read the genes of thousands of childhood cancers, mostly leukaemias, neuroblastoma, kidney and bone tumours, to find the changes that drive them. The data are shared with researchers everywhere.",
    summary: "NCI describes TARGET as a programme that applied a comprehensive genomic approach to the molecular changes driving childhood cancers, to guide more effective, less toxic therapies. It began forming in 2007 with two pilot projects on high-risk subtypes of acute lymphoblastic leukaemia (ALL) and neuroblastoma, then expanded to acute myeloid leukaemia (AML), osteosarcoma and selected kidney tumours, with many members of the Children's Oncology Group providing clinical expertise and tissue. NCI's table gives cases characterised: ALL 1,802 (including 115 acute leukaemias of ambiguous lineage), AML 2,145, neuroblastoma 1,132, Wilms tumour 652, osteosarcoma 383, rhabdoid tumour 69 and clear cell sarcoma of the kidney 13. A Pan-Cancer Model Systems arm produced leukaemia, kidney-tumour and neuroblastoma cell lines and xenografts, and whole-exome sequencing for 131 models of NCI's Pediatric Preclinical Testing Program.\n\nNCI credits TARGET researchers with major advances in understanding ALL that led to new therapies using kinase inhibitors for some patients, including work on the Philadelphia chromosome-like (Ph-like) subtype. The data are at the Genomic Data Commons under dbGaP study phs000218.",
    institutions: ["nci"], companies: ["childrens-oncology-group"],
    cancers: ["all-leukemia", "aml", "neuroblastoma", "wilms-tumor", "osteosarcoma", "atrt"],
    terms: ["ph-like-all", "controlled-access-data", "ngs"], related: ["tcga-gdc", "cancer-models"],
    notes: ["NCI's page attributes Ph-like ALL to 'an activated tyrosine kinase (BCR-ABL)'. Ph-like ALL is by definition BCR::ABL1-negative with a kinase-activating lesion that mimics it (see OnCo's ph-like-all record), so that sentence is not repeated; NCI's further statement that imatinib added to intensive chemotherapy improves outcome is not reproduced because the page cites no trial.", "Rhabdoid tumour is linked to atrt because NCI names intracranial rhabdoid tumours among those characterised; kidney rhabdoid tumours and clear cell sarcoma of the kidney have no cancer record in OnCo."] }),
];

/** Existing records that should link to the new ones (for the parent to wire into their owning files). */
export const biobankBacklinks: Record<string, string[]> = {
  biobanking: ["bbmri-eric", ...BBMRI_MEMBERS, "chtn", "biobank-japan", "million-veteran-program", "finngen", "wales-cancer-biobank", "victorian-cancer-biobank", "komen-tissue-bank", "taiwan-biobank"],
  "ccc-vienna": ["meduni-wien-biobank"],
  "essen-wtz": ["westdeutsche-biobank-essen"],
  "amsterdam-umc": ["amsterdam-umc-biobank"],
  "san-raffaele": ["crb-ospedale-san-raffaele"],
  "regina-elena-rome": ["biobanca-ire"],
  "incliva-valencia": ["incliva-biobank"],
  "peter-mac": ["victorian-cancer-biobank"],
  "iu-simon": ["komen-tissue-bank"],
  komen: ["komen-tissue-bank"],
  nci: ["chtn", "nci-target"],
  "tcga-gdc": ["nci-target"],
  "uk-biobank": ["bbmri-eric", "biobank-japan", "finngen", "million-veteran-program", "taiwan-biobank"],
};
