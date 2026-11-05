import type { CompanyInput, EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Bangladesh: the public bodies, the university, the company and the paper behind /countries/bd/ that the corpus did
 * not hold. The National Institute of Cancer Research and Hospital (nicrh-dhaka) already existed and is reused. Every
 * record was written from the raw text of its source, read on 4 November 2026: the Directorate General of Drug
 * Administration's 2024-25 annual report and its 2023 reliance guideline (PDF, the report in Bengali), the
 * Directorate General of Health Services home page, Bangladesh Medical University's home page, Bangladesh Public
 * Procurement Authority notices for the Health Economics Unit, Incepta's home page and its ClinicalTrials.gov record,
 * and the Nessa et al. paper, whose DOI was resolved through Crossref and whose text was read from Europe PMC.
 *
 * Inbound links: dghs-bangladesh names nicrh-dhaka, bangladesh-medical-university and heu-bangladesh, and each of
 * those names it back; dgda-bangladesh names incepta-pharmaceuticals and is named by it and by dghs-bangladesh; the
 * paper is named from bangladesh-medical-university and dghs-bangladesh.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DGDA_AR = "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dgda/2026/5/b888567a-34d8-441a-a61e-3021ef1912b4.pdf";
const DGDA_RELIANCE = "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dgda/2024/12/5b3ead1750704a4babc94a4e6565d6e5.pdf";
const NESSA_DOI = "10.1186/s44263-025-00145-x";

const institutions: InstitutionInput[] = [
  i({ id: "dgda-bangladesh", name: "Directorate General of Drug Administration (Bangladesh)", aka: ["DGDA", "ঔষধ প্রশাসন অধিদপ্তর", "Directorate General of Drug Administration"],
    city: "Dhaka", country: "BD", lat: 23.81, lng: 90.41, institutionType: "government", website: "https://dgda.gov.bd",
    tldr: "Bangladesh's medicines regulator. It registers medicines, licenses the factories that make them and certifies exports, and its own report says the country now makes about 98 per cent of the medicines it uses, cancer medicines among them.",
    summary: "The Directorate General of Drug Administration is the national regulatory authority for medicines, vaccines, medical devices and cosmetics in Bangladesh, under the Ministry of Health and Family Welfare. Its annual report says the Drugs and Cosmetics Act 2023 (Act 29 of 2023, published in the Bangladesh Gazette on 18 September 2023) consolidated and updated the country's drug laws.\n\nIts annual report for 2024-25, in Bengali and dated January 2026, states that about 98 per cent of domestic demand for medicines is now produced in the country and that medicines are exported to more than 150 countries including in Europe and America; that high-technology products including vaccines, insulin and anti-cancer medicines are made locally; and that approved exports in 2024-25 were worth 29,374,614,433 taka. In the same year it issued 1,412 Certificates of Pharmaceutical Product, 129 Free Sale Certificates, 3,040 export licences and 58 Good Manufacturing Practice certificates, and its National Drug Control Laboratory tested 2,882 samples, of which 84 were substandard. The report says the authority is working to be listed by the World Health Organization at maturity level 3.\n\nFor vaccines and biological products it relies on reference regulators: its Guidelines for Reliance on other NRAs, issued on 21 August 2023, list the regulators of the United States, the European Union, Australia, Japan, the United Kingdom, Germany, Switzerland and France, with WHO-prequalified products considered case by case, and cite the National Drug Policy 2016 as the legal basis. The report does not publish approval times. The coordinates on this record are a Dhaka city centroid, not the agency's address.",
    programs: ["Registration and marketing authorisation", "Reliance on reference regulatory authorities (2023 guideline)", "Export licences and Certificates of Pharmaceutical Product", "National Drug Control Laboratory", "Pharmacovigilance", "Clinical trial oversight under the Drugs and Cosmetics Act 2023"],
    institutions: ["dghs-bangladesh"], companies: ["incepta-pharmaceuticals"],
    links: [
      { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
      { label: "DGDA: Guidelines for Reliance on other NRAs in Bangladesh, 2023 (PDF)", url: DGDA_RELIANCE },
      { label: "DGDA: laws and policies", url: "https://dgda.gov.bd/pages/laws" },
    ] }),

  i({ id: "dghs-bangladesh", name: "Directorate General of Health Services (Bangladesh)", aka: ["DGHS", "স্বাস্থ্য অধিদপ্তর", "Directorate General of Health Services"],
    city: "Dhaka", country: "BD", lat: 23.778, lng: 90.405, institutionType: "government", website: "https://dghs.gov.bd",
    tldr: "The government department that runs Bangladesh's public health services and published the national cancer control strategy; its health information system hosts the national cervical and breast cancer surveillance system.",
    summary: "The Directorate General of Health Services, at Mohakhali in Dhaka, runs Bangladesh's public health services under the Ministry of Health and Family Welfare. The National Institute of Cancer Research and Hospital's 2014 cancer registry report was published on its website, and its line director for Non Communicable Diseases and Other Public Health Interventions published the National Cancer Control Strategy and Plan of Action 2009-2015, approved by the National Cancer Control Council on 7 December 2008; OnCo found no later national cancer strategy.\n\nIts home page links a National Cervical and Breast Cancer Surveillance System built on DHIS2, the software it uses for national health information. The screening programme behind it uses visual inspection of the cervix with acetic acid and clinical breast examination, with training and coordination from the national centre at Bangladesh Medical University; the national cervical cancer strategy for 2017 to 2022 set screening every five years for women aged 30 to 60, with a target of at least 40 per cent coverage. The coordinates are approximate for Mohakhali.",
    programs: ["Public hospitals and health complexes", "Non Communicable Diseases control", "National Cervical and Breast Cancer Surveillance System (DHIS2)", "National Cancer Control Strategy and Plan of Action 2009-2015"],
    institutions: ["nicrh-dhaka", "bangladesh-medical-university", "heu-bangladesh", "dgda-bangladesh"], keyPapers: ["paper-nessa-bangladesh-cervical-screening-registry-2025"],
    links: [
      { label: "Directorate General of Health Services", url: "https://dghs.gov.bd/" },
      { label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: "https://nicrh.gov.bd/public/images/report/1774752821reports.pdf" },
      { label: "National Cancer Control Strategy and Plan of Action 2009-2015 (PDF, ICCP portal copy)", url: "https://www.iccp-portal.org/system/files/plans/Publication_Cancer_Strategy.pdf.pdf" },
      { label: "National Strategy for Cervical Cancer Prevention and Control, 2017-2022 (PDF, ICCP portal copy)", url: "https://www.iccp-portal.org/system/files/plans/BGD_B5_s21_National%20Strategy%20cervical%20ca%20prevention%20and%20control%20Bd%202017-%202022.pdf" },
    ] }),

  i({ id: "bangladesh-medical-university", name: "Bangladesh Medical University", aka: ["BMU", "Bangabandhu Sheikh Mujib Medical University", "BSMMU", "বাংলাদেশ মেডিক্যাল বিশ্ববিদ্যালয়"],
    city: "Dhaka", country: "BD", lat: 23.739, lng: 90.395, institutionType: "university", website: "https://www.bmu.ac.bd",
    tldr: "Bangladesh's public postgraduate medical university in Dhaka, formerly called Bangabandhu Sheikh Mujib Medical University. It hosts the national centre that trains and coordinates cervical and breast cancer screening, and is the commonest sponsor of the country's registered cancer studies.",
    summary: "Bangladesh Medical University, at Shahbag in Dhaka, is the country's public postgraduate medical university. It was called Bangabandhu Sheikh Mujib Medical University until the interim government's advisory council renamed it on 13 March 2025, and many registry entries and papers still carry the old name.\n\nIt was the nodal training centre for the 2005 pilot of cervical screening by visual inspection with acetic acid in 16 districts, and the national strategy for 2017 to 2022 describes its National Centre for Cervical and Breast Cancer Screening and Training. The programme's case-based electronic registry, built on DHIS2, enrolled 1,562,963 women at 497 screening facilities and 6,398 community clinics from January 2018 to May 2023 (Nessa et al., 2025, whose first author is in its Department of Gynaecological Oncology). Its dashboard, in a copy archived on 18 March 2025, counted 5,272,966 women enrolled in the case-based system from 2019 to 2025.\n\nThe university, under one name or the other, is the commonest sponsor of cancer studies with a site in Bangladesh on ClinicalTrials.gov, among them trials of trastuzumab with capecitabine and oxaliplatin (NCT05997524), high-dose-rate brachytherapy schedules (NCT02765919) and coeliac plexus against splanchnic nerve neurolysis for cancer pain (NCT07653906). The coordinates are approximate for Shahbag.",
    programs: ["National Centre for Cervical and Breast Cancer Screening and Training", "Postgraduate training in oncology", "Investigator-sponsored cancer trials"],
    institutions: ["dghs-bangladesh"], keyPapers: ["paper-nessa-bangladesh-cervical-screening-registry-2025"], cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "Bangladesh Medical University", url: "https://www.bmu.ac.bd/" },
      { label: "The Financial Express: Names of three medical universities changed (14 March 2025)", url: "https://today.thefinancialexpress.com.bd/last-page/names-of-three-medical-universities-changed-1741889592" },
      { label: "National Cervical and Breast Cancer Statistics dashboard (Internet Archive copy, 18 March 2025)", url: "https://web.archive.org/web/20250318130213/https://nccbcst.bsmmu.ac.bd/viacbesync/dashboard" },
      { label: `Nessa et al., BMC Global and Public Health 2025`, url: `https://doi.org/${NESSA_DOI}` },
    ] }),

  i({ id: "heu-bangladesh", name: "Health Economics Unit, Ministry of Health and Family Welfare (Bangladesh)", aka: ["HEU", "Health Economics Unit"],
    city: "Dhaka", country: "BD", lat: 23.81, lng: 90.41, institutionType: "government", website: "https://heu.portal.gov.bd",
    tldr: "The health ministry unit that tracks what Bangladesh spends on health and runs the government's pilot health insurance card for households below the poverty line.",
    summary: "The Health Economics Unit is the Ministry of Health and Family Welfare's focal point for tracking health expenditure. By its own procurement notice of 6 April 2024 it had completed six rounds of the Bangladesh National Health Accounts, covering 1997 to 2020, and was commissioning a seventh for 1997 to 2023. The sixth round, presented in January 2023, put out-of-pocket payments at 68.5 per cent of total health expenditure in 2020, against a target of 32 per cent by 2032 in the Health Care Financing Strategy 2012-2032, as reported from the launch by The Business Standard; the report itself could not be downloaded.\n\nThe unit also runs Shasthyo Surokhsha Karmasuchi, a social health protection scheme for households below the poverty line. Piloting began in one upazila of Tangail district in March 2016 and was extended to two more in September 2017; by February 2023 it covered all of Tangail, six more districts and both Dhaka city corporations. At launch the health ministry said cardholders could receive free care for 50 diseases at upazila and district hospitals, with the government paying an annual premium of 1,000 taka per household for care worth up to 50,000 taka a year. The coordinates on this record are a Dhaka city centroid; the unit's website did not respond on 4 November 2026.",
    programs: ["Bangladesh National Health Accounts", "Shasthyo Surokhsha Karmasuchi (social health protection pilot)", "Health Care Financing Strategy 2012-2032"],
    institutions: ["dghs-bangladesh"],
    links: [
      { label: "BPPA: Health Economics Unit notice, Bangladesh National Health Accounts VII (6 April 2024)", url: "https://bppa.gov.bd/advertisement-services/details-8645.html" },
      { label: "BPPA: Health Economics Unit notice, scheme operator for Shasthyo Surokhsha Karmasuchi (16 February 2023)", url: "https://www.bppa.gov.bd/advertisement-services/details-7927.html" },
      { label: "The Business Standard: Out-of-pocket spending on treatment rises further (4 January 2023)", url: "https://www.tbsnews.net/bangladesh/health/out-pocket-expenditure-treatment-increases-further-562758" },
      { label: "The Daily Star: Free healthcare for the poor (24 March 2016)", url: "https://www.thedailystar.net/frontpage/free-healthcare-ultra-poor-1199365" },
    ] }),
];

const companies: CompanyInput[] = [
  { kind: "company", asOf, id: "incepta-pharmaceuticals", name: "Incepta Pharmaceuticals", aka: ["Incepta Pharmaceuticals Ltd"], hq: "Dhaka", country: "BD", companyType: "pharma", founded: 1999, website: "https://www.inceptapharma.com",
    tldr: "A Bangladeshi medicines maker founded in 1999 that says it exports to more than 102 countries, and that has tested its own version of the breast cancer antibody trastuzumab against the Roche original.",
    summary: "Incepta Pharmaceuticals describes itself as a pharmaceutical company in Bangladesh established in 1999, with manufacturing at Savar and Dhamrai outside Dhaka and a head office in Tejgaon, and states that it is currently exporting to more than 102 countries. Its divisions include vaccines and biotechnology.\n\nIt sponsored a randomised, double-blind phase 1 study (NCT06886659) comparing the pharmacokinetics, immunogenicity and safety of its proposed trastuzumab biosimilar with Roche's trastuzumab (Herclon, the reference product named in the registry) after a single 6 mg/kg infusion in 80 healthy adults at two Dhaka sites; the registry records it as completed, from 23 January 2024 to 28 December 2024, with no results posted. The study is an example of the domestic industry the Directorate General of Drug Administration describes as now making anti-cancer medicines locally.",
    drugs: ["trastuzumab"], institutions: ["dgda-bangladesh"],
    links: [
      { label: "Incepta Pharmaceuticals", url: "https://www.inceptapharma.com/" },
      { label: "ClinicalTrials.gov NCT06886659", url: "https://clinicaltrials.gov/study/NCT06886659" },
    ] },
];

const papers: PaperInput[] = [
  { kind: "paper", asOf, id: "paper-nessa-bangladesh-cervical-screening-registry-2025", name: "Cervical cancer screening data from the case-based national electronic registry in Bangladesh",
    journal: "BMC Global and Public Health", year: 2025, doi: NESSA_DOI, pmid: "40205589", authors: "Nessa A, Azad AK, Uddin SMN, et al.", paperType: "observational", participants: 1562963,
    tldr: "A review of Bangladesh's national electronic cervical screening register: over five years it enrolled about 1.56 million women, 3.3 per cent tested positive, and only two in five of them came back for the follow-up examination.",
    summary: "The authors reviewed anonymised data from the case-based electronic registry of Bangladesh's national cervical cancer screening programme, built on the tracker component of DHIS2, from January 2018 to May 2023. Women aged 30 to 60 were enrolled at health facilities of all tiers, including community clinics, and screened by visual inspection with acetic acid at upazila health complexes and higher levels; women who tested positive were referred for colposcopy.\n\nThe discussion puts the target population at 29.43 million women and reports that aggregated screening data for 2014 to 2024 showed coverage of 17.9 per cent (5.3 million), and that coverage in the case-based registry was 5.3 per cent.",
    findings: [
      "1,562,963 women were enrolled at 497 screening facilities and 6,398 community clinics; 1,557,002 (99.6%) had a VIA test.",
      "51,913 (3.3%) screened women were VIA positive, of whom 20,954 (40.4%) attended colposcopy.",
      "Among colposcopy-positive women, 6.3% (1,327) had CIN II/III and 6.2% (1,302) had cervical carcinoma.",
      "Of women treated for precancer, 81.6% (5,062) had thermal ablation and 17.6% (1,089) loop electrosurgical excision.",
    ],
    whatItMeans: "Bangladesh can follow each screened woman from enrolment to treatment electronically, which the authors say only a few countries report doing, but most eligible women have not been screened and most who test positive do not reach the next test.",
    caveats: ["Coverage figures depend on the denominator, estimated from the 2022 census.", "The authors note the case-based system was in a development and trial phase in 2018 and 2019, which may undercount those years."],
    institutions: ["bangladesh-medical-university", "dghs-bangladesh"], cancers: ["cervical"],
    links: [{ label: "DOI", url: `https://doi.org/${NESSA_DOI}` }, { label: "Europe PMC", url: "https://europepmc.org/article/MED/40205589" }] },
];

export const recordsBD: EntityInput[] = [...institutions, ...companies, ...papers];
