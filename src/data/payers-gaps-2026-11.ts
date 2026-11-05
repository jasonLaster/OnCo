import type { InstitutionInput, TermInput } from "@/lib/schema";

/**
 * Payers and reimbursement lists (gap census, November 2026, type `payers-reimbursement`).
 *
 * Sixteen Medicare National Coverage Determinations (NCDs) that bear on cancer, and the three national payer bodies
 * the census found without a record: the US Centers for Medicare & Medicaid Services, Japan's Central Social
 * Insurance Medical Council (Chuikyo) and Germany's GKV-Spitzenverband.
 *
 * Every NCD was read on 4 November 2026 as raw JSON from the CMS Coverage API
 * (https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/ for the list, then
 * https://api.coverage.cms.gov/v1/data/ncd?ncdid=<document id>&ncdver=<version> for each text). Ages, intervals,
 * thresholds and dates below are the NCD's own words, quoted where the wording matters. The payer bodies were read
 * from their own sites the same day: cms.gov (About CMS), gkv-spitzenverband.de (English pages) and, for Chuikyo,
 * the MHLW meeting page plus the Act on Social Insurance Medical Councils (Act No. 47 of 1950) as served by the
 * e-Gov law API (law id 325AC0000000047). Coordinates are approximate positions of the stated addresses.
 */

const asOf = "2026-11-04";

type T = Omit<TermInput, "kind" | "asOf" | "category">;
const ncd = (docId: number, ver: number, x: T): TermInput => ({
  kind: "term", asOf, category: "Regulation & policy",
  ...x,
  institutions: ["cms", ...(x.institutions ?? [])],
  links: [
    { label: "CMS Medicare Coverage Database: the NCD", url: `https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=${docId}&ncdver=${ver}` },
    { label: "CMS Coverage API: the NCD text as data", url: `https://api.coverage.cms.gov/v1/data/ncd?ncdid=${docId}&ncdver=${ver}` },
    ...(x.links ?? []),
  ],
  tags: ["us", ...(x.tags ?? [])],
});

type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

export const termsPayerGaps2026: TermInput[] = [
  ncd(364, 2, {
    id: "medicare-ncd-210-14", name: "Medicare NCD 210.14: lung cancer screening with low-dose CT",
    aka: ["NCD 210.14", "Medicare lung cancer screening coverage", "Lung Cancer Screening with Low Dose Computed Tomography (LDCT)"],
    tldr: "Medicare in the United States pays for a yearly low-dose CT scan of the chest for people aged 50 to 77 with no symptoms who have smoked at least 20 pack-years and still smoke or quit within the last 15 years. A conversation about the benefits and harms comes first, and the patient pays no coinsurance or deductible.",
    summary: "United States, Medicare National Coverage Determination 210.14 (NCD Manual, publication 100-3), version 2, effective for claims with dates of service on or after 10 February 2022, implemented 3 October 2022. CMS covers it as an \"additional preventive service\" under section 1861(ddd) of the Social Security Act, which requires a United States Preventive Services Task Force grade of A or B.\n\nEligibility, in the NCD's words: \"Age 50 - 77 years\"; \"Asymptomatic (no signs or symptoms of lung cancer)\"; \"Tobacco smoking history of at least 20 pack-years (one pack-year = smoking one pack per day for one year; 1 pack =20 cigarettes)\"; \"Current smoker or one who has quit smoking within the last 15 years\"; and an order for screening. Before the first scan the beneficiary must have a counselling and shared decision-making visit that uses one or more decision aids, covers the importance of yearly adherence, comorbidities and willingness to be treated, and covers smoking cessation or continued abstinence. The reading radiologist must be board certified or board eligible with the American Board of Radiology or an equivalent body, and the facility must use \"a standardized lung nodule identification, classification, and reporting system\". Part B coinsurance and deductible are waived. The NCD says it was last reviewed in February 2022.",
    technologies: ["low-dose-ct-screening"], cancers: ["lung-cancer"], terms: ["lung-rads"],
    related: ["medicare-ced"],
    notes: ["The NCD names no specific reporting system; Lung-RADS is linked as the system most US programmes use, not as a requirement stated in the text."],
  }),
  ncd(331, 4, {
    id: "medicare-ncd-220-6-17", name: "Medicare NCD 220.6.17: FDG PET for cancer",
    aka: ["NCD 220.6.17", "Positron Emission Tomography (FDG) for Oncologic Conditions", "Medicare FDG PET coverage"],
    tldr: "Medicare pays for one FDG PET scan to plan the first treatment of most cancers, and for three more scans after the first treatment is finished; a local contractor decides on any further scans. A few uses are excluded, such as planning first treatment for prostate cancer.",
    summary: "United States, Medicare National Coverage Determination 220.6.17, version 4, effective for claims with dates of service on and after 11 June 2013, implemented 7 March 2014. At the request of the National Oncologic PET Registry, CMS ended the prospective data collection that coverage with evidence development (CED) had required for every oncologic use of FDG PET. The decision does not change coverage of PET with NaF-18, ammonia N-13 or rubidium-82.\n\nInitial anti-tumour treatment strategy: CMS covers \"one FDG PET study for beneficiaries who have cancers that are biopsy proven or strongly suspected\" when the treating physician needs it to decide whether an invasive procedure is appropriate, where to do it, or the anatomic extent of the tumour. Subsequent strategy: \"Three FDG PET scans are nationally covered when used to guide subsequent management of anti-tumor treatment strategy after completion of initial anti-cancer therapy\"; coverage of more than three is left to the local Medicare Administrative Contractors.\n\nThe NCD's synopsis table covers both stages for colorectal, oesophageal, head and neck (not thyroid or CNS), lymphoma, non-small cell and small cell lung, ovary, brain, soft tissue sarcoma, pancreas, testes, thyroid, myeloma, all other solid tumours and all other cancers. The exceptions for initial strategy: prostate adenocarcinoma is non-covered; breast is non-covered for diagnosis and initial staging of axillary nodes but covered for staging distant metastasis; melanoma is non-covered for evaluating regional lymph nodes; cervix is non-covered for initial diagnosis but covered for staging newly diagnosed cancer after conventional imaging. Every cancer in the table, including prostate, is covered for subsequent strategy.",
    technologies: ["fdg-pet", "pet-ct"],
    cancers: ["breast-cancer", "melanoma", "cervical", "prostate", "colorectal", "nsclc", "sclc", "ovarian", "pancreatic", "multiple-myeloma"],
    terms: ["medicare-ced"],
    notes: ["Earlier FDG PET coverage required enrolment in the National Oncologic PET Registry under CED; this NCD is the 2013 decision that ended that requirement for cancer."],
  }),
  ncd(186, 1, {
    id: "medicare-ncd-220-4", name: "Medicare NCD 220.4: mammograms",
    aka: ["NCD 220.4", "Medicare mammography coverage", "Medicare screening mammography"],
    tldr: "Medicare pays for a diagnostic mammogram when a doctor orders one, and for screening mammograms on a set schedule: none under 35, one between 35 and 39, and then one every year (at least 11 months apart) from age 40.",
    summary: "United States, Medicare National Coverage Determination 220.4, version 1; the NCD lists 15 May 1978 as its effective date and its benefit categories as diagnostic tests and screening mammography. It defines a diagnostic mammogram as one for a man or woman with signs or symptoms of breast disease, a personal history of breast cancer or of biopsy-proven benign breast disease, and a screening mammogram as one for a woman without signs or symptoms, \"at a minimum a two-view exposure (cranio-caudal and a medial lateral oblique view) of each breast\".\n\nScreening frequency, in the NCD's words: \"Payment may not be made for a screening mammography performed on a woman under age 35. Payment may be made for only one screening mammography performed on a woman over age 34, but under age 40. For an asymptomatic woman over age 39, payment may be made for a screening mammography performed after at least 11 months have passed following the month in which the last screening mammography was performed.\" A diagnostic mammogram is covered when ordered by a doctor of medicine or osteopathy, for signs and symptoms, a history of breast cancer, or an asymptomatic patient whose physician judges it appropriate.",
    technologies: ["mammography"], cancers: ["breast-cancer"],
    notes: ["The NCD text ends with an older paragraph saying routine screening of asymptomatic women aged 50 and over, or 40 and over with an affected mother or sister, \"would not be covered for Medicare purposes\". It sits in the same text as the screening frequency rules quoted above and is reproduced here as written, without a reading of which governs; the screening rules are the ones the NCD's benefit category describes."],
  }),
  ncd(322, 1, {
    id: "medicare-ncd-110-21", name: "Medicare NCD 110.21: erythropoiesis-stimulating agents in cancer",
    aka: ["NCD 110.21", "Medicare ESA coverage in cancer", "Erythropoiesis Stimulating Agents (ESAs) in Cancer and Related Neoplastic Conditions"],
    tldr: "Medicare pays for epoetin or darbepoetin to treat anaemia caused by chemotherapy only when haemoglobin is below 10 g/dL, at the label starting dose, and stops paying if the blood count does not respond within 8 weeks. It does not pay for these drugs to prevent anaemia, for anaemia from radiotherapy alone, or in leukaemias such as AML and CML.",
    summary: "United States, Medicare National Coverage Determination 110.21, version 1, effective 30 July 2007, implemented 7 April 2008. Covered: ESA treatment of \"the anemia secondary to myelosuppressive anticancer chemotherapy in solid tumors, multiple myeloma, lymphoma, and lymphocytic leukemia\", only when the haemoglobin immediately before starting or continuing is below 10 g/dL (or haematocrit below 30%); at the FDA label starting dose, \"no more than 150 U/kg/3 times weekly for epoetin and 2.25 mcg/kg/1 time weekly for darbepoetin alpha\". The dose may be increased once by 25% if haemoglobin rises by less than 1 g/dL over 4 weeks and stays below 10 g/dL; continued use is not covered if the rise is still under 1 g/dL by 8 weeks. A rise of more than 1 g/dL in 2 weeks requires a 25% dose reduction. Each course covers the 8 weeks after the final dose of myelosuppressive chemotherapy.\n\nNot covered: anaemia from folate, B12 or iron deficiency, haemolysis, bleeding or marrow fibrosis; anaemia with treatment of CML, AML or erythroid cancers; anaemia of cancer not related to treatment; anaemia from radiotherapy alone; prophylaxis against chemotherapy-induced anaemia or tumour hypoxia; neutralising-antibody resistance; and patients with uncontrolled hypertension. The NCD's general section notes FDA alerts and warnings and \"a higher risk of serious and life-threatening events associated with oncologic uses of ESAs\". Local contractors decide on uses the NCD does not address.",
    drugs: ["epoetin-alfa", "darbepoetin-alfa"], terms: ["anaemia"],
    cancers: ["multiple-myeloma", "cll"],
  }),
  ncd(268, 2, {
    id: "medicare-ncd-210-1", name: "Medicare NCD 210.1: prostate cancer screening tests",
    aka: ["NCD 210.1", "Medicare PSA screening coverage", "Prostate Cancer Screening Tests"],
    tldr: "Medicare pays for one screening PSA blood test and one screening digital rectal examination a year for men aged 50 and over.",
    summary: "United States, Medicare National Coverage Determination 210.1, version 2, effective 19 June 2006, under section 4103 of the Balanced Budget Act of 1997. It covers two screening procedures for men who have attained age 50, each \"at a frequency of once every 12 months\" with at least 11 months passed since the last Medicare-covered test: a screening digital rectal examination, performed by a doctor of medicine or osteopathy or by a physician assistant, nurse practitioner, clinical nurse specialist or certified nurse midwife authorised under state law; and a screening prostate-specific antigen (PSA) blood test, ordered by one of those practitioners who is responsible for using the result in the beneficiary's care.",
    terms: ["psa"], technologies: ["prostate-screening-psa-mri"], cancers: ["prostate"],
  }),
  ncd(365, 1, {
    id: "medicare-ncd-210-2-1", name: "Medicare NCD 210.2.1: cervical cancer screening with HPV testing",
    aka: ["NCD 210.2.1", "Medicare HPV test coverage", "Screening for Cervical Cancer with Human Papillomavirus (HPV)"],
    tldr: "Medicare pays for an HPV test once every five years for women aged 30 to 65 with no symptoms, given together with a Pap test.",
    summary: "United States, Medicare National Coverage Determination 210.2.1, version 1, effective for services on or after 9 July 2015, implemented 7 March 2016, as an additional preventive service under section 1861(ddd) of the Social Security Act. In the NCD's words, CMS added \"Human Papillomavirus (HPV) testing once every five years as an additional preventive service benefit under the Medicare program for asymptomatic beneficiaries aged 30 to 65 years in conjunction with the Pap smear test\", using FDA approved or cleared tests used according to their labelling and in CLIA-compliant laboratories. Preventive services not covered by this or another NCD, statute or regulation are non-covered. The NCD says it was last reviewed in July 2015.",
    technologies: ["hpv-testing"], cancers: ["cervical"],
    related: ["medicare-ncd-210-2"],
  }),
  ncd(185, 3, {
    id: "medicare-ncd-210-2", name: "Medicare NCD 210.2: screening Pap smears and pelvic examinations",
    aka: ["NCD 210.2", "Medicare Pap smear coverage", "Screening Pap Smears and Pelvic Examinations for Early Detection of Cervical or Vaginal Cancer"],
    tldr: "Medicare pays for a Pap smear and pelvic examination every two years, or every year for women at high risk of cervical or vaginal cancer or of childbearing age with a recent abnormal result.",
    summary: "United States, Medicare National Coverage Determination 210.2, version 3, effective 19 June 2006. A screening Pap smear, with the related services and a pelvic examination including a clinical breast examination, is covered under Part B when ordered by a physician or authorised practitioner if the woman has not had the test in the preceding two years, or is a woman of childbearing age as defined in section 1861(nn) of the Social Security Act, or her practitioner recommends more frequent testing because she is at high risk. The NCD lists the high-risk factors as early onset of sexual activity (under 16), five or more lifetime partners, a history of sexually transmitted disease including HIV, fewer than three negative or any Pap smears in the previous seven years, and exposure to diethylstilbestrol (DES) in the womb. The screening pelvic examination, covered under section 4102 of the Balanced Budget Act of 1997, should include at least seven of eleven listed elements.",
    cancers: ["cervical", "vaginal"],
    related: ["medicare-ncd-210-2-1"],
  }),
  ncd(147, 1, {
    id: "medicare-ncd-110-6", name: "Medicare NCD 110.6: scalp hypothermia during chemotherapy",
    aka: ["NCD 110.6"],
    tldr: "Medicare's national payment rule for scalp hypothermia given with chemotherapy: the ice packs or devices may count as supplies, but Medicare recognises no separate charge for them.",
    summary: "United States, Medicare National Coverage Determination 110.6, version 1, which CMS describes as \"a longstanding national coverage determination\" whose effective date has not been posted. It notes that keeping the scalp cool during chemotherapy has been reported to reduce hair loss, by ice-filled bags or bandages or by devices filled with cold-producing chemicals. Its whole coverage statement: \"While ice-filled bags or bandages or other devices used for scalp hypothermia during chemotherapy may be covered as supplies of the kind commonly furnished without a separate charge, no separate charge for them would be recognized.\"",
    technologies: ["scalp-cooling"], terms: ["hair-loss-and-scalp-cooling-breast"],
    notes: ["The NCD predates the FDA clearances of the current cooling-cap systems and does not name any device."],
  }),
  ncd(309, 2, {
    id: "medicare-ncd-110-18", name: "Medicare NCD 110.18: aprepitant for chemotherapy-induced vomiting",
    aka: ["NCD 110.18", "Aprepitant for Chemotherapy-Induced Emesis", "Medicare oral antiemetic coverage"],
    tldr: "Medicare Part B pays for an all-oral three-drug anti-sickness regimen, aprepitant with a 5-HT3 blocker and dexamethasone, for people receiving one of 20 listed chemotherapy drugs. It does not pay for aprepitant on its own.",
    summary: "United States, Medicare National Coverage Determination 110.18, version 2, effective for services on or after 29 May 2013, implemented 7 July 2014. CMS defines highly and moderately emetogenic chemotherapy as agents so designated in at least two of three guidelines (NCCN, ASCO, ESMO/MASCC). The oral three-drug regimen of aprepitant, an oral 5-HT3 antagonist and oral dexamethasone is covered for beneficiaries receiving, alone or in combination, alemtuzumab, azacitidine, bendamustine, carboplatin, carmustine, cisplatin, clofarabine, cyclophosphamide, cytarabine, dacarbazine, daunorubicin, doxorubicin, epirubicin, idarubicin, ifosfamide, irinotecan, lomustine, mechlorethamine, oxaliplatin or streptozocin, and \"must be administered immediately before and within 48 hours after\" the chemotherapy. From April 2005 to May 2013 the list had nine agents.\n\nNot covered under Part B: aprepitant alone, and regimens given partly by mouth and partly intravenously. Contractors may decide on other all-oral three-drug regimens using aprepitant or another FDA-approved oral NK-1 antagonist, with the listed agents or any other highly or moderately emetogenic chemotherapy.",
    drugs: ["aprepitant", "dexamethasone", "ondansetron"], technologies: ["antiemetic-therapy"],
    institutions: ["nccn-org", "asco", "esmo", "mascc"],
    notes: ["Ondansetron is linked as an example of an oral 5-HT3 antagonist; the NCD names the class, not a drug."],
  }),
  ncd(130, 2, {
    id: "medicare-ncd-190-28", name: "Medicare NCD 190.28: CA 125 tumour marker test",
    aka: ["NCD 190.28", "Tumor Antigen by Immunoassay - CA 125", "Medicare CA-125 coverage"],
    tldr: "Medicare pays for the CA 125 blood test to follow ovarian and related cancers after diagnosis, to check for recurrence and response to treatment, but not to diagnose a pelvic mass or to investigate symptoms.",
    summary: "United States, Medicare laboratory National Coverage Determination 190.28, version 2, effective 1 January 2006. The NCD describes CA 125 as \"elevated in 80% of patients who present with epithelial ovarian carcinoma\" and also in carcinomas of the fallopian tube, endometrium and endocervix, malignant mesothelioma and primary peritoneal carcinoma. Covered uses include a baseline before surgery for a suspicious pelvic mass, three levels in the first month after treatment to estimate the CA 125 half-life, a level at the end of chemotherapy, surveillance (the NCD states measurements \"are generally obtained every 3 months for 2 years, every 6 months for the next 3 years, and yearly thereafter\") and levels before each cycle in advanced or recurrent disease.\n\nLimitations: not covered \"for the evaluation of patients with signs or symptoms suggestive of malignancy\", and \"specifically not covered for aiding in the differential diagnosis of patients with a pelvic mass as the sensitivity and specificity of the test is not sufficient\". CMS publishes quarterly lists of covered diagnosis codes for it; the latest listed is October 2026.",
    terms: ["ca-125"], cancers: ["ovarian", "endometrial", "mesothelioma"],
  }),
  ncd(142, 1, {
    id: "medicare-ncd-190-30", name: "Medicare NCD 190.30: CA 19-9 tumour marker test",
    aka: ["NCD 190.30", "Tumor Antigen by Immunoassay - CA 19-9", "Medicare CA 19-9 coverage"],
    tldr: "Medicare pays for the CA 19-9 blood test to follow people already diagnosed with pancreatic or bile duct cancer, not to diagnose them.",
    summary: "United States, Medicare laboratory National Coverage Determination 190.30, version 1, effective 25 November 2002. The NCD says CA 19-9 levels \"are useful in following the course of patients with established diagnosis of pancreatic and biliary ductal carcinoma. The test is not indicated for diagnosing these two diseases.\" It is not covered for evaluating patients with signs or symptoms suggestive of malignancy, and may be ordered as needed to assess recurrence or response to subsequent treatment cycles. CMS publishes quarterly lists of covered diagnosis codes; the latest listed is October 2026.",
    terms: ["ca19-9"], cancers: ["pancreatic", "cholangiocarcinoma"],
  }),
  ncd(66, 1, {
    id: "medicare-ncd-110-1", name: "Medicare NCD 110.1: hyperthermia for cancer",
    aka: ["NCD 110.1", "Hyperthermia for Treatment of Cancer", "Medicare hyperthermia coverage"],
    tldr: "Medicare pays for local heat treatment of a tumour only when it is given with radiotherapy for cancers in or just under the skin, not on its own or with chemotherapy.",
    summary: "United States, Medicare National Coverage Determination 110.1, version 1, effective 31 December 1984. The whole coverage statement: \"Local hyperthermia is covered under Medicare when used in connection with radiation therapy for the treatment of primary or metastatic cutaneous or subcutaneous superficial malignancies. It is not covered when used alone or in connection with chemotherapy.\" The NCD defines local hyperthermia as the use of heat to make tumours more susceptible to cancer therapy.",
    technologies: ["hyperthermia", "hyperthermia-systems"],
  }),
  ncd(336, 2, {
    id: "medicare-ncd-220-6-19", name: "Medicare NCD 220.6.19: NaF-18 PET for bone metastases",
    aka: ["NCD 220.6.19", "Positron Emission Tomography (NaF-18) to Identify Bone Metastasis of Cancer", "Medicare sodium fluoride PET coverage"],
    tldr: "Medicare no longer pays nationally for sodium fluoride (NaF-18) PET scans to look for cancer in the bones; local contractors may cover other PET tracers used as their FDA labels allow.",
    summary: "United States, Medicare National Coverage Determination 220.6.19, version 2 (listed effective date 15 December 2021, implemented 17 January 2022). The text explains that \"the confirmatory analyses were not published during the 24-month time period\", so \"effective December 15, 2017, CMS determines that there are no nationally covered indications for PET NaF-18\" and that NaF-18 PET is nationally non-covered. Other PET radiopharmaceuticals for cancer can be covered at local contractors' discretion when used according to their FDA-approved indications. The NCD says it was last reviewed in December 2017.",
    terms: ["bone-metastases", "medicare-ced"], technologies: ["pet-ct"],
    related: ["medicare-ncd-220-6-17"],
    notes: ["The NCD's effective-date field reads 15 December 2021 while its text dates the non-coverage decision to 15 December 2017; both are stated as the API returned them.", "The 24-month period refers to the earlier coverage with evidence development arrangement under which NaF-18 PET was paid for; the text read does not restate its terms."],
  }),
  ncd(319, 1, {
    id: "medicare-ncd-110-20", name: "Medicare NCD 110.20: blood-brain barrier osmotic disruption for brain tumours",
    aka: ["NCD 110.20", "Blood Brain Barrier Osmotic Disruption for Treatment of Brain Tumors", "BBBD"],
    tldr: "Medicare does not pay for opening the blood-brain barrier with an osmotic infusion as part of chemotherapy for brain tumours. Chemotherapy itself remains covered.",
    summary: "United States, Medicare National Coverage Determination 110.20, version 1, effective for services on and after 20 March 2007. The NCD explains that the blood-brain barrier can keep anti-cancer drugs out of brain tissue and that disrupting it, most commonly by osmotic infusion, could in theory raise drug concentration in the tumour. It has no nationally covered indications and states that \"the use of osmotic BBBD is not reasonable and necessary when it is used as part of a treatment regimen for brain tumors\". The NCD \"does not alter in any manner the coverage of anti-cancer chemotherapy\". Last reviewed March 2007.",
    terms: ["blood-brain-barrier"], cancers: ["brain-tumours"],
    related: ["bbb-focused-ultrasound"],
    notes: ["The NCD covers osmotic disruption only; it says nothing about focused-ultrasound opening, which is linked as the newer approach to the same barrier."],
  }),
  ncd(253, 1, {
    id: "medicare-ncd-190-7", name: "Medicare NCD 190.7: human tumour stem cell drug sensitivity assays",
    aka: ["NCD 190.7", "Human Tumor Stem Cell Drug Sensitivity Assays", "chemosensitivity assay coverage"],
    tldr: "Medicare treats laboratory tests that grow a patient's tumour cells and expose them to cancer drugs to pick a treatment as experimental, and does not pay for them.",
    summary: "United States, Medicare laboratory National Coverage Determination 190.7, version 1, effective 1 July 1996. It describes assays that grow human tumour stem cell colonies in culture and expose them to anticancer drugs to predict which drug will work for the individual patient, and the Fluorescent Cytoprint Assay, a miniaturised organ culture system. Its coverage statement: \"Human tumor drug sensitivity assays are considered experimental, and therefore, not covered under Medicare at this time\", and the same for assays based on tumour micro-organs rather than single-cell clones.",
    terms: ["drug-response-sensitivity"],
    related: ["functional-precision-medicine-haematology"],
    notes: ["The NCD dates from 1996 and names no current functional precision medicine test; the ex vivo drug screening record is linked as the present-day form of the idea, not as a test the NCD addresses."],
  }),
  ncd(123, 1, {
    id: "medicare-ncd-230-9", name: "Medicare NCD 230.9: cryosurgery of the prostate",
    aka: ["NCD 230.9", "Cryosurgery of Prostate", "cryosurgical ablation of the prostate", "CSAP"],
    tldr: "Medicare pays for freezing treatment of the prostate as a first treatment for prostate cancer confined to the gland area (stages T1 to T3), and as a second treatment only after radiotherapy has failed and the cancer still meets set limits.",
    summary: "United States, Medicare National Coverage Determination 230.9, version 1, effective 1 July 2001. It states that cryosurgical ablation of the prostate is \"safe and effective, as well as medically necessary and appropriate, as primary treatment for patients with clinically localized prostate cancer, Stages T1-T3\". Salvage cryosurgery for recurrent cancer is covered only for localised disease in patients who \"have failed a trial of radiation therapy as their primary treatment\" and meet one of: \"Stage T2B or below, Gleason score <9, PSA <8 ng/mL\". It is not covered as salvage after failure of other primary treatments, nor for any salvage services before 30 June 2001.",
    terms: ["cryoablation", "psa"], technologies: ["cryoablation-systems"], cancers: ["prostate"],
  }),
];

export const institutionsPayerGaps2026: InstitutionInput[] = [
  i({
    id: "cms", name: "Centers for Medicare & Medicaid Services (CMS)", aka: ["CMS", "Centers for Medicare and Medicaid Services", "US Centers for Medicare & Medicaid Services"],
    institutionType: "government", city: "Baltimore", country: "US", lat: 39.312, lng: -76.732, website: "https://www.cms.gov/",
    tldr: "The US federal agency that runs Medicare, Medicaid and the Children's Health Insurance Program. Its national coverage decisions set what Medicare pays for in cancer care, from screening scans to tumour marker tests and cell therapies.",
    summary: "In its own words, CMS \"is the federal agency that provides health coverage to more than 160 million through Medicare, Medicaid, the Children's Health Insurance Program, and the Health Insurance Marketplace\"; its website gives its address as 7500 Security Boulevard, Baltimore, MD 21244. It publishes the Medicare Coverage Database, which holds National Coverage Determinations (NCDs) that apply across the country and Local Coverage Determinations written by the Medicare Administrative Contractors, and it runs coverage with evidence development and the Medicare Drug Price Negotiation Program created by the Inflation Reduction Act.\n\nFor cancer, NCDs decide among other things Medicare's lung cancer screening with low-dose CT (210.14), screening mammography (220.4), PSA screening (210.1), cervical screening with Pap and HPV tests (210.2, 210.2.1), FDG PET (220.6.17), CA 125 and CA 19-9 testing (190.28, 190.30), ESAs for chemotherapy anaemia (110.21), oral antiemetics (110.18), next-generation sequencing (90.2) and CAR T-cell therapy (110.24).",
    programs: ["Medicare", "Medicaid", "Children's Health Insurance Program (CHIP)", "Health Insurance Marketplace", "Medicare Coverage Database (NCDs and LCDs)", "Coverage with evidence development", "Medicare Drug Price Negotiation Program"],
    links: [{ label: "About CMS", url: "https://www.cms.gov/about-cms" }, { label: "Medicare Coverage Database", url: "https://www.cms.gov/medicare-coverage-database/" }, { label: "CMS Coverage API", url: "https://api.coverage.cms.gov/" }, { label: "CMS: Medicare Drug Price Negotiation Program selected drug list and maximum fair price data file (2 November 2026)", url: "https://www.cms.gov/files/zip/cms-negotiation-program-selected-drug-list-maximum-fair-price-data-file-20261102.zip" }],
    terms: ["medicare-ced", "inflation-reduction-act"],
    related: ["chuikyo", "gkv-spitzenverband"],
    tags: ["us"],
  }),
  i({
    id: "chuikyo", name: "Central Social Insurance Medical Council (Chuikyo), Japan", aka: ["Chuikyo", "Chūikyō", "中央社会保険医療協議会", "中医協", "Central Social Insurance Medical Council"],
    institutionType: "government", city: "Tokyo", country: "JP", lat: 35.673, lng: 139.751, website: "https://www.mhlw.go.jp/stf/shingi/shingi-chuo_128154.html",
    tldr: "The council inside Japan's health ministry that advises on what public health insurance pays doctors and hospitals and on listing new medicines at their insured prices. Payers, doctors and independent members sit on it, and it meets in public.",
    summary: "Chuikyo is set up in the Ministry of Health, Labour and Welfare by article 1 of the Act on Social Insurance Medical Councils (Act No. 47 of 1950, in force 1 April 1950). Article 2 has it deliberate and report in writing, at the minister's request, on the fee schedule and related standards made under the Health Insurance Act, and lets it make recommendations to the minister on its own initiative. Article 3 sets its membership at twenty: seven representing insurers, the insured and employers, seven representing physicians, dentists and pharmacists, and six representing the public interest, whose appointment needs the consent of both houses of the Diet. Members serve two years, and the council must meet at least once every six months.\n\nThe ministry's meeting page shows how much of cancer drug access passes through it: the general assembly's 659th meeting on 7 October 2026 considered new National Health Insurance drug price listings, and its 660th on 28 October 2026 considered insurance coverage of medical devices and laboratory tests and a report from the cost-effectiveness evaluation expert organisation.",
    programs: ["National Health Insurance drug price listing (薬価収載)", "Medical fee schedule revisions (診療報酬改定)", "Insurance coverage of devices and laboratory tests", "Cost-effectiveness evaluation (費用対効果評価)"],
    links: [{ label: "MHLW: Chuikyo general assembly meetings", url: "https://www.mhlw.go.jp/stf/shingi/shingi-chuo_128154.html" }, { label: "e-Gov: Act on Social Insurance Medical Councils (Act No. 47 of 1950)", url: "https://laws.e-gov.go.jp/law/325AC0000000047" }],
    institutions: ["pmda"],
    related: ["cms", "gkv-spitzenverband", "japan-conditional-early-approval"],
    notes: ["The membership and duties are from the Act as served by e-Gov on 4 November 2026 (current revision, amended by Act No. 31 of 2026); the meeting agenda items are from the ministry's meeting list the same day."],
  }),
  i({
    id: "gkv-spitzenverband", name: "GKV-Spitzenverband (National Association of Statutory Health Insurance Funds, Germany)", aka: ["GKV-Spitzenverband", "National Association of Statutory Health Insurance Funds", "Spitzenverband Bund der Krankenkassen"],
    institutionType: "government", city: "Berlin", country: "DE", lat: 52.523, lng: 13.380, website: "https://www.gkv-spitzenverband.de/",
    tldr: "The federal body of Germany's statutory health insurance funds, which cover roughly 90 per cent of the population. It negotiates the reimbursement price of new medicines after their benefit assessment and sits on the Federal Joint Committee that decides what statutory insurance covers.",
    summary: "The association describes itself as \"the central association of the health insurance funds at federal level in accordance with section 217 a of Book V of the German Social Code (SGB V)\", in that role since 1 July 2008, and as a public-law corporation headed by a full-time three-member board elected by an administrative council of 52 representatives of insured persons and employers from the AOK, substitute, company, guild, miners' and agricultural funds. Its listed tasks include concluding framework and remuneration agreements for inpatient, outpatient and dental care, representing statutory health insurance in joint self-government with providers (for example in the Federal Joint Committee), and setting reference prices for medicines and maximum amounts for medicines. It states that roughly 90 per cent of people in Germany are members of statutory health insurance, and that together with the national associations of statutory health insurance physicians and dentists and the German Hospital Federation it forms the Federal Joint Committee, \"which decides on the specific benefits to be included in the statutory health insurance catalogue\".\n\nFor cancer medicines its central role is under AMNOG: its site publishes an overview of the negotiations of reimbursement amounts (Erstattungsbeträge) under section 130b SGB V that follow the Federal Joint Committee's benefit assessment. Its office is at Reinhardtstraße 28, 10117 Berlin.",
    programs: ["Reimbursement amount negotiations under section 130b SGB V (AMNOG)", "Reference prices (Festbeträge)", "Framework and remuneration agreements", "Federal Joint Committee membership", "National Association of Long-Term Care Funds"],
    links: [{ label: "GKV-Spitzenverband: About us (English)", url: "https://www.gkv-spitzenverband.de/english/about_us/about_us.jsp" }, { label: "GKV-Spitzenverband: Tasks and goals", url: "https://www.gkv-spitzenverband.de/english/about_us/tasks_and_goals/tasks_and_goals.jsp" }, { label: "GKV-Spitzenverband: Statutory health insurance", url: "https://www.gkv-spitzenverband.de/english/statutory_health_insurance/statutory_health_insurance.jsp" }],
    institutions: ["g-ba-iqwig"], terms: ["amnog"],
    related: ["cms", "chuikyo"],
  }),
];

/** Existing records that should link to the new ones (for the parent to wire into the owning files). */
export const payerBacklinks: Record<string, string[]> = {
  "medicare-ced": ["cms", "medicare-ncd-220-6-17", "medicare-ncd-220-6-19"],
  "blood-brain-barrier": ["medicare-ncd-110-20"],
  "functional-precision-medicine-haematology": ["medicare-ncd-190-7"],
  "inflation-reduction-act": ["cms"],
  "amnog": ["gkv-spitzenverband"],
  "g-ba-iqwig": ["gkv-spitzenverband"],
  "pmda": ["chuikyo"],
  "low-dose-ct-screening": ["medicare-ncd-210-14"],
  "fdg-pet": ["medicare-ncd-220-6-17"],
  "mammography": ["medicare-ncd-220-4"],
  "epoetin-alfa": ["medicare-ncd-110-21"],
  "darbepoetin-alfa": ["medicare-ncd-110-21"],
  "prostate-screening-psa-mri": ["medicare-ncd-210-1"],
  "hpv-testing": ["medicare-ncd-210-2-1"],
  "scalp-cooling": ["medicare-ncd-110-6"],
  "aprepitant": ["medicare-ncd-110-18"],
  "ca-125": ["medicare-ncd-190-28"],
  "ca19-9": ["medicare-ncd-190-30"],
  "hyperthermia": ["medicare-ncd-110-1"],
  "cryoablation-systems": ["medicare-ncd-230-9"],
};
