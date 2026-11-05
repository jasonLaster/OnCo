import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Taiwan: the institutions and paper behind /countries/tw/ (wave 4) that the corpus did not hold. Sources were read in
 * Chinese from their raw text: the Health Promotion Administration's Cancer Registry Annual Report 2023 (pdftotext of
 * the 729-page PDF, published December 2025), the Ministry of Health and Welfare's 2025 cause-of-death analysis, the
 * Cancer Control Act and National Health Insurance Act on the Ministry of Justice's law database, the Center for Drug
 * Evaluation's 2025 annual report and HTA pages, the TFDA's statutory processing-time table of 3 March 2026 (as
 * republished by the Rootlaw database), and Ministry press releases. nhi.gov.tw answered every page request with a
 * Cloudflare challenge on 4 November 2026, so the National Health Insurance Administration is described from its own
 * statements republished on mohw.gov.tw and from the law. The DOI was resolved through Europe PMC and the abstract read.
 *
 * Inbound links: the five institutions link to each other through `institutions`, and the paper is linked from the
 * Health Promotion Administration's `keyPapers`, so none depends on the country page for a link.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const TCR_2023 = "https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=269&pid=19733";
const TCR_LIST = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=269";
const SCREENING = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=211";
const EXPAND_2025 = "https://www.mohw.gov.tw/cp-16-80948-1.html";
const LDCT_2025 = "https://www.mohw.gov.tw/cp-16-82095-1.html";
const CCA = "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070008";
const NHI_ACT = "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0060001";
const CATASTROPHIC_2013 = "https://www.mohw.gov.tw/cp-16-22701-1.html";
const CANCER_FUND_2025 = "https://www.mohw.gov.tw/cp-16-82614-1.html";
const NGS_2026 = "https://www.mohw.gov.tw/cp-16-86349-1.html";
const LISTING_2023 = "https://www.mohw.gov.tw/cp-16-76843-1.html";
const IO_2025 = "https://www.mohw.gov.tw/cp-16-82268-1.html";
const CDE_HTA = "https://www.cde.org.tw/hta/";
const CDE_AR_2025 = "https://www.cde.org.tw/aboutcde/1416/2127/2138/76727/normalPost";
const CDE_BACKGROUND = "https://www.cde.org.tw/1127/1595/1596/1598/simpleList";
const TFDA_DEADLINES = "https://www.rootlaw.com.tw/Attach/S-Doc/01611503030015-001.pdf";
const TFDA_2021 = "https://www.mohw.gov.tw/cp-16-70394-1.html";
const TFDA_2013 = "https://www.mohw.gov.tw/cp-16-23158-1.html";
const NICR = "https://nicr.nhri.edu.tw/";
const TCOG = "https://www.nhri.edu.tw/Research/more?id=03d3e6d70ff044768388af407c30fad7";
const NICR_BETEL = "https://nicr.nhri.edu.tw/10912press/";
const LIVER_PLAN = "https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=616&pid=19687";

const institutions: InstitutionInput[] = [
  i({ id: "hpa-taiwan", name: "Health Promotion Administration, Ministry of Health and Welfare (Taiwan)", aka: ["衛生福利部國民健康署", "國健署", "HPA Taiwan"],
    city: "Taipei", country: "TW", lat: 25.05, lng: 121.51, institutionType: "government", website: "https://www.hpa.gov.tw",
    tldr: "Taiwan's public health agency for chronic disease and cancer. It runs the Taiwan Cancer Registry, which counted 138,051 new invasive cancers in 2023, and pays for the national screening programmes for breast, cervical, bowel, oral and lung cancer.",
    summary: "The Health Promotion Administration's predecessor, the Bureau of Health Promotion, was formed on 12 July 2001, and it became an administration of the new Ministry of Health and Welfare on 23 July 2013, according to its own history page. Under the Cancer Control Act of 2003 the ministry is the competent authority for cancer control, and the HPA carries out much of that work.\n\nIt publishes the Taiwan Cancer Registry Annual Report. The 2023 edition, published in December 2025, analyses cases reported by 199 hospitals with 50 or more beds up to 1 April 2025: 138,051 new invasive cancers (71,244 in men, 66,807 in women) and 15,609 in situ cancers, an age-standardised incidence of 331.29 per 100,000 on the 2000 world standard. The registry started in 1979 with hospitals of 50 or more beds; from 2002 hospitals have also filed a detailed long form with stage and treatment, now for 17 cancers, and from 2011 the records include smoking, betel quid chewing, alcohol and body mass index. Completeness, checked against death records, the national insurance catastrophic illness file and screening files, was estimated at 98% from 2012; 0.67% of 2023 cases were known from a death certificate only and 95.32% were confirmed under the microscope.\n\nIt funds screening from its Tobacco Hazards Prevention and Health Protection Fund: mammography every two years for women aged 40 to 74, cervical smears, a faecal immunochemical test every two years from 45 to 74 (40 to 44 with a family history), oral examination every two years for people who chew betel quid or smoke, and since 1 July 2022 low-dose CT every two years for people with a family history of lung cancer or a heavy smoking history. The 2025 expansion of these ages served the government's aim of cutting age-standardised cancer mortality by a third by 2030. Betel quid control and oral cancer screening moved to the Ministry's Department of Oral Health in 2023.\n\nThe coordinates on this record are a Taipei centroid, not the street address.",
    programs: ["Taiwan Cancer Registry (since 1979; long form since 2002)", "National cancer screening: breast, cervix, colorectum, oral cavity, lung", "Low-dose CT lung screening (since 1 July 2022)", "National Hepatitis and Liver Cancer Control Plan (2026 to 2030)", "Cancer care quality certification"],
    cancers: ["breast-cancer", "cervical", "colorectal", "oral-cavity-cancer", "lung-cancer", "hcc"],
    technologies: ["mammography", "hpv-testing", "low-dose-ct-screening", "oral-visual-screening"], terms: ["fit-test"], related: ["screening-tw-oral"],
    institutions: ["nhri-taiwan", "nhia-taiwan"], keyPapers: ["paper-chang-talent-ldct-never-smokers-taiwan-2024"],
    links: [
      { label: "HPA: Cancer Registry Annual Report 2023 (PDF, Chinese, December 2025)", url: TCR_2023 },
      { label: "HPA: cancer registry reports, all years (Chinese)", url: TCR_LIST },
      { label: "HPA: the five funded cancer screenings (Chinese)", url: SCREENING },
      { label: "Ministry of Health and Welfare: screening expanded from 2025, 24 December 2024 (Chinese)", url: EXPAND_2025 },
      { label: "Ministry of Health and Welfare: low-dose CT lung screening results, 8 April 2025 (Chinese)", url: LDCT_2025 },
      { label: "HPA: National Hepatitis and Liver Cancer Control Plan 2026 to 2030 (Chinese)", url: LIVER_PLAN },
      { label: "HPA: history of the administration (Chinese)", url: "https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=10&pid=18" },
    ] }),

  i({ id: "nhia-taiwan", name: "National Health Insurance Administration (Taiwan)", aka: ["衛生福利部中央健康保險署", "健保署", "NHIA Taiwan", "Bureau of National Health Insurance"],
    city: "Taipei", country: "TW", lat: 25.04, lng: 121.53, institutionType: "government", website: "https://www.nhi.gov.tw",
    tldr: "The single payer of Taiwan's compulsory National Health Insurance, in force since 1 March 1995. Patients with a catastrophic illness certificate for cancer pay no co-payment for that cancer, and since 2025 a separate fund pays temporarily for cancer medicines the main budget cannot yet afford.",
    summary: "The National Health Insurance Act, in force from 1 March 1995, makes health insurance compulsory and social. Patients normally pay 20% of outpatient costs (30% to 50% at hospitals visited without a referral) and 5% to 30% of inpatient costs, depending on the ward and the length of stay, but Article 48 exempts people with a catastrophic illness (重大傷病) from these co-payments. Cancer needing active or long-term treatment is one such illness. Certificates for cancer were permanent when the scheme began; since 2002 they last five years and are renewed if the cancer still needs active or long-term treatment, as the administration explained in December 2013. At the end of 2013, 923,396 people held a catastrophic illness certificate, and cancer accounted for 482,949 of the 986,287 certificates in force (49.0%).\n\nMedicines are listed through a joint committee of the insurer, experts, the insured, employers and providers under Article 41, with patient groups able to give their view, and the insurer may commission a health technology assessment under Article 42; the Center for Drug Evaluation writes those assessments. In 2023 the administration started temporary payment for medicines given accelerated approval and, from January 2024, parallel submission, letting a company apply for reimbursement while the TFDA is still reviewing its licence. From 1 January 2025 NT$5 billion of public budget was put into the insurance fund for a temporary payment fund for new cancer medicines, under rules published on 25 February 2025. Next-generation sequencing for cancer has been reimbursed since May 2024: by February 2026, 62 hospitals had claimed for it and the administration counted 5,700 people who had benefited.\n\nnhi.gov.tw answered OnCo's requests with a Cloudflare challenge on 4 November 2026; this record is written from the law and from the administration's statements published on mohw.gov.tw. The coordinates are a Taipei centroid.",
    programs: ["National Health Insurance (compulsory, since 1 March 1995)", "Catastrophic illness certificates (co-payment exemption)", "Temporary payment fund for new cancer medicines (from 2025)", "Next-generation sequencing reimbursement (from May 2024)", "Parallel submission for reimbursement (from 2024)"],
    cancers: ["nsclc", "colorectal", "breast-cancer", "multiple-myeloma"], drugs: ["pembrolizumab", "atezolizumab", "selumetinib", "elranatamab", "teclistamab"],
    terms: ["hta", "genomic-profiling"], institutions: ["cde-taiwan", "hpa-taiwan", "tfda-taiwan"],
    links: [
      { label: "National Health Insurance Act, Articles 41 to 48 (Ministry of Justice law database, Chinese)", url: NHI_ACT },
      { label: "NHIA on renewing cancer catastrophic illness certificates, 25 December 2013 (Chinese)", url: CATASTROPHIC_2013 },
      { label: "NHIA: catastrophic illness statistics for 2013, 8 July 2014 (Chinese)", url: "https://www.mohw.gov.tw/cp-16-21777-1.html" },
      { label: "NHIA: cancer medicine temporary payment fund and the NICE workshop, 28 May 2025 (Chinese)", url: CANCER_FUND_2025 },
      { label: "NHIA: immunotherapy reimbursement widened, 24 April 2025 (Chinese)", url: IO_2025 },
      { label: "NHIA: faster listing of new medicines, 4 December 2023 (Chinese)", url: LISTING_2023 },
      { label: "NHIA: NGS reimbursement results, 14 May 2026 (Chinese)", url: NGS_2026 },
      { label: "National Health Insurance Administration (Cloudflare challenge to automated requests)", url: "https://www.nhi.gov.tw" },
    ] }),

  i({ id: "tfda-taiwan", name: "Taiwan Food and Drug Administration", aka: ["衛生福利部食品藥物管理署", "食藥署", "TFDA"],
    city: "Taipei", country: "TW", lat: 25.055, lng: 121.607, institutionType: "government", website: "https://www.fda.gov.tw",
    tldr: "Taiwan's medicines regulator. Its statutory processing time for a new chemical entity or biological product is 360 calendar days, and it has priority review, accelerated approval and breakthrough routes that it says bring many reviews under 240 days.",
    summary: "The Food and Drug Administration was formed on 1 January 2010 under the former Department of Health and became an administration of the Ministry of Health and Welfare on 23 July 2013. Its offices are in Nangang District, Taipei.\n\nIts table of processing times for applications, as amended on 3 March 2026 (notice FDA藥字第1151400412號), gives 360 calendar days for a new chemical entity, including botanical new drugs, or a biological product: 30 days for classification and assignment, 300 for filing and review meetings, advisory committee discussion and labelling review, and 30 to close. Orphan drugs also have 360 days, and new indications, routes or combinations with clinical data 300. In July 2022 the Ministry reported that the TFDA approved 134 new drugs and new formulations in 2021, and that its accelerated mechanisms (abridged review, priority review, accelerated approval, breakthrough therapy and the scheme for paediatric or rare serious diseases) cut review times from the general 360 days to under 240 for many of them. In 2015 its 15 priority reviews took a median of 171 days.\n\nThe Center for Drug Evaluation carries out the technical reviews: in 2025 it completed 141 new drug applications, 38 of them antineoplastic or immunomodulating medicines, and 29 qualified for at least one expedited route.\n\nThe coordinates are a Nangang district centroid, not the street address.",
    programs: ["New drug registration (360 calendar days for a new chemical entity or biologic)", "Priority review, accelerated approval and breakthrough therapy designation", "Clinical trial authorisation"],
    terms: ["regulatory-agencies"], institutions: ["cde-taiwan", "nhia-taiwan"],
    links: [
      { label: "TFDA: statutory processing-time table, 3 March 2026 (as republished by Rootlaw, PDF, Chinese)", url: TFDA_DEADLINES },
      { label: "Ministry of Health and Welfare: TFDA accelerated review and 2021 approvals, 6 July 2022 (Chinese)", url: TFDA_2021 },
      { label: "TFDA: review of 2015 new drug approvals, 27 January 2016 (Chinese)", url: "https://www.fda.gov.tw/Tc/newsContent.aspx?cid=4&id=19542" },
      { label: "Ministry of Health and Welfare: the TFDA becomes an administration, 23 July 2013 (Chinese)", url: TFDA_2013 },
      { label: "Taiwan Food and Drug Administration", url: "https://www.fda.gov.tw" },
    ] }),

  i({ id: "cde-taiwan", name: "Center for Drug Evaluation, Taiwan", aka: ["財團法人醫藥品查驗中心", "查驗中心", "CDE Taiwan"],
    city: "Taipei", country: "TW", lat: 25.04, lng: 121.53, institutionType: "government", website: "https://www.cde.org.tw",
    tldr: "A foundation endowed by Taiwan's health ministry in 1998 that reviews medicines for the TFDA and, since 2008, writes the health technology assessments the national insurer uses to decide which medicines to pay for. In 2025 it completed 58 assessments of breakthrough new medicines and 145 of other new medicines.",
    summary: "The Center for Drug Evaluation was endowed by the Department of Health, the Ministry of Health and Welfare's predecessor, on 13 July 1998 to give the government a dedicated professional team to review new medicines. It reviews new drug applications and clinical trial protocols for the TFDA: in 2025 it completed 141 new drug applications, 38 of them antineoplastic or immunomodulating medicines, and 147 new clinical trial protocols outside the abridged route for multinational multicentre trials, 83 (56%) of them for cancer.\n\nIts health technology assessment work began with a working group in August 2007, and its Division of Health Technology Assessment was formally set up on 1 April 2008. When the National Health Insurance Administration receives an application to list a medicine, the CDE accepts it within two days and completes its report within 42 days. An assessment is required for a new medicine that treats a catastrophic illness or has a new mechanism and is forecast to cost more than NT$100 million in any of its first five years, and for a widened indication forecast to cost more than NT$50 million a year. In 2025 it completed 58 assessments of breakthrough new medicines, 145 of other new medicines and 12 of special materials, and 89 reports were published on the insurer's site. It also reviews the reassessment plans required under the cancer medicine temporary payment rules of 25 February 2025. The division has grown to more than 60 people, and in May 2023 the insurer and the CDE signed a cooperation agreement with England's NICE.\n\nThe coordinates are a Taipei centroid, not the street address.",
    programs: ["New drug and clinical trial review for the TFDA", "Health technology assessment for National Health Insurance (since 2008)", "Policy health technology assessment", "Reassessment plans for temporarily reimbursed cancer medicines"],
    terms: ["hta"], institutions: ["tfda-taiwan", "nhia-taiwan"],
    links: [
      { label: "CDE: health technology assessment, history and work (Chinese)", url: CDE_HTA },
      { label: "CDE: Annual Report 2025 (PDF, Chinese)", url: CDE_AR_2025 },
      { label: "CDE: background to its founding (Chinese)", url: CDE_BACKGROUND },
    ] }),

  i({ id: "nhri-taiwan", name: "National Health Research Institutes (Taiwan)", aka: ["財團法人國家衛生研究院", "國衛院", "NHRI", "National Institute of Cancer Research", "國衛院癌症研究所"],
    city: "Zhunan, Miaoli", country: "TW", lat: 24.686, lng: 120.878, institutionType: "research-institute", website: "https://www.nhri.edu.tw",
    tldr: "Taiwan's national health research foundation. The Cancer Control Act requires it to run a cancer research centre, now its National Institute of Cancer Research, which hosts the Taiwan Cooperative Oncology Group that has run multicentre cancer trials since 1989.",
    summary: "Article 10 of the Cancer Control Act of 2003 requires the National Health Research Institutes to set up a cancer research centre to carry out and integrate research on treatments, diagnostic techniques and medicines and their clinical trials. That work sits in its National Institute of Cancer Research, with sites at 35 Keyan Road, Zhunan, Miaoli County, and in Tainan.\n\nThe institute hosts the Taiwan Cooperative Oncology Group (TCOG), founded in 1989 on the model of the US Eastern Cooperative Oncology Group and moved into the institutes after they were founded in 1996. TCOG describes itself as Taiwan's first multi-hospital cooperative cancer trials group; it represents Taiwan in the Breast International Group, writes consensus guidelines for Taiwan's main cancers, and helped build the national cancer care quality certification and the core quality measures for 13 cancers. ClinicalTrials.gov lists the institutes as sponsor of a phase 2 trial of lenvatinib with paclitaxel in advanced biliary tract cancer run only in Taiwan.\n\nIn 2020 the institute and the Health Promotion Administration reported in Oral Oncology that betel quid chewing among Taiwanese men fell from 17.2% in 2007 to under 7% by 2018, and that oral cancer incidence began to fall from 2014.\n\nThe coordinates are a Zhunan centroid, not the street address.",
    programs: ["National Institute of Cancer Research", "Taiwan Cooperative Oncology Group (since 1989)", "Cancer care quality certification and core measures", "Taiwanese breast cancer genomic variant map"],
    cancers: ["oral-cavity-cancer", "cholangiocarcinoma", "breast-cancer", "pancreatic"], institutions: ["hpa-taiwan"],
    links: [
      { label: "NHRI: National Institute of Cancer Research", url: NICR },
      { label: "NHRI: Taiwan Cooperative Oncology Group (Chinese)", url: TCOG },
      { label: "NICR: betel quid chewing falls in Taiwan, 2020 (Chinese)", url: NICR_BETEL },
      { label: "Cancer Control Act, Article 10 (Ministry of Justice law database, Chinese)", url: CCA },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-chang-talent-ldct-never-smokers-taiwan-2024", name: "Low-dose CT screening among never-smokers with or without a family history of lung cancer in Taiwan: a prospective cohort study",
    journal: "The Lancet Respiratory Medicine", year: 2024, doi: "10.1016/s2213-2600(23)00338-7", pmid: "38042167", authors: "Chang GC, Chiu CH, Yu CJ, et al.; TALENT Investigators", paperType: "observational",
    tldr: "TALENT screened 12,011 Taiwanese never-smokers aged 55 to 75 with other risk factors by low-dose CT and found lung cancer in 2.6%, most of it stage I; a family history of lung cancer raised the risk. Taiwan's national screening for people with a family history rests on it.",
    summary: "The Taiwan Lung Cancer Screening in Never-Smoker Trial was a nationwide prospective cohort study at 17 tertiary medical centres. Between 1 December 2015 and 31 July 2019 it enrolled 12,011 people aged 55 to 75 (8,868 women) who had never smoked, or had smoked fewer than 10 pack-years and stopped more than 15 years earlier, and had a risk factor: a family history of lung cancer (6,009 people), passive smoking, previous tuberculosis or chronic obstructive lung disease, or heavy or unventilated cooking. This report covers one year after the baseline scan; the study is registered as NCT02611570 and was funded by Taiwan's Ministry of Health and Welfare.\n\nThe authors note that in Taiwan lung cancers occur predominantly in never-smokers, nearly 60% of whom have stage IV disease at diagnosis. The Ministry of Health and Welfare cites TALENT as the evidence for including a family history of lung cancer in the national low-dose CT programme that began on 1 July 2022.",
    findings: [
      "2,094 of 12,011 baseline scans (17.4%) were positive.",
      "Lung cancer was diagnosed in 318 people (2.6%): 257 invasive cancers and 61 adenocarcinomas in situ; 317 were adenocarcinomas and 246 (77.4%) were stage I.",
      "Invasive lung cancer was found in 2.7% of those with a family history and 1.6% of those without.",
      "Female sex, a family history and age over 60 were associated with higher risk; passive smoking, cooking exposure and previous lung disease were not.",
      "A positive scan had 92.1% sensitivity, 84.6% specificity and a positive predictive value of 14.0%.",
    ],
    whatItMeans: "Among people who have never smoked, a parent, sibling or child with lung cancer is a strong enough risk factor that Taiwan now screens them, whether or not they smoke.",
    caveats: ["A cohort without a control group: it measures cancers found, not lives saved.", "The authors state that overdiagnosis could have occurred, especially in the adenocarcinomas in situ.", "One-year results; follow-up is planned to eight years."],
    cancers: ["lung-cancer", "nsclc"], technologies: ["low-dose-ct-screening"], institutions: ["hpa-taiwan"],
    links: [{ label: "The Lancet Respiratory Medicine 2024 (DOI)", url: "https://doi.org/10.1016/s2213-2600(23)00338-7" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/38042167/" }] }),
];

/** Records behind /countries/tw/ (wave 4). */
export const recordsTW: EntityInput[] = [...institutions, ...papers];
