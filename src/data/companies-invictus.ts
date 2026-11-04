import type { CompanyInput, DrugInput } from "@/lib/schema";

/**
 * The two cancer companies named Invictus, each read from its own releases and a registry on 2026-11-04.
 *
 * - **Invictus Therapeutics Ltd** (Sydney) is the only company found trading under that name with cancer work. It is
 *   the renamed VGI Health Technology Limited, listed on the NSX. A Rhode Island company of the same name works on
 *   insulin, not cancer, and is not recorded. SEC EDGAR full-text search, ClinicalTrials.gov sponsors and UK Companies
 *   House returned no other "Invictus Therapeutics".
 * - **Invictus Oncology Private Limited** (Delhi) never used the name Invictus Therapeutics in any source read, so that
 *   name is not one of its aliases.
 *
 * INVICTUS, the ripretinib trial in GIST, is a trial acronym with no tie to either company. Registered in
 * src/data/index.ts.
 */

const asOf = "2026-11-04";
type S = Omit<CompanyInput, "kind" | "asOf">;
const s = (x: S): CompanyInput => ({ kind: "company", asOf, ...x });

export const companiesInvictus: CompanyInput[] = [
  s({ id: "invictus-therapeutics", name: "Invictus Therapeutics", aka: ["Invictus Therapeutics Ltd", "VGI Health Technology Limited", "VGI Health Technology", "Invictus Ops Pty Ltd"],
    hq: "Sydney, NSW", country: "AU", companyType: "biotech", stage: "public", ticker: "NSX:VTL", sections: ["drug-discovery"], cancers: ["pancreatic"], drugs: ["ivb003"],
    tldr: "An Australian company developing medicines and supplements from tocotrienols, a form of vitamin E. Its cancer programme is a tocotrienol dissolved under the tongue, to be tested alongside standard treatment in advanced pancreatic cancer.",
    summary: "Invictus Therapeutics Ltd, formerly VGI Health Technology Limited, is an Australian public company listed on the NSX. Its own announcements describe it as developing prescription medicines and dietary supplements based on tocotrienols, with patents on delivering them through the lining of the mouth, and list pancreatic adenocarcinoma among its targets, alongside muscle soreness, fatty liver disease, high cholesterol, high blood pressure and diabetes.\n\nIn January 2024 the company announced that its subsidiary, Invictus Ops Pty Ltd, had received ethics approval from the Human Research Ethics Committee of the Peter MacCallum Cancer Centre for a phase II study of IVB003, its sublingual tocotrienol, against placebo, each added to standard treatment in locally advanced or metastatic pancreatic cancer. The study was to enrol eighty patients at no fewer than eight Australian sites, with progression-free survival as the primary endpoint and Northern Health in Melbourne as the first site. No result has been published.",
    notes: [
      "Whether the IVB003 study has opened or enrolled could not be found. No ClinicalTrials.gov record names the company or the drug, and the Australian New Zealand Clinical Trials Registry refused a script (a Cloudflare challenge), so it was not searched.",
      "Founding year not stated. The Australian Business Register shows the entity active since 24 September 2004 under earlier names; that is the company's registration, not the start of its cancer work.",
      "Tocotrienols are also sold as supplements. A planned trial is not evidence that they help in pancreatic cancer.",
    ],
    links: [
      { label: "NSX announcement: change of registered office, with company description (12 Dec 2025)", url: "https://www.nsx.com.au/ftp/news/021745076.PDF" },
      { label: "Company release: ethics approval for the phase II pancreatic cancer study (11 Jan 2024)", url: "https://abnnewswire.net/press/en/122891/VGI-Health-Technology-Limited-(NSX-VTL)-HREC-Approval-for-Phase-II-Clinical-Study.html" },
      { label: "Australian Business Register: ABN 35 111 082 485", url: "https://abr.business.gov.au/ABN/View?abn=35111082485" },
    ] }),

  s({ id: "invictus-oncology", name: "Invictus Oncology", aka: ["Invictus Oncology Private Limited", "Invictus Oncology Pvt. Ltd."],
    hq: "New Delhi", country: "IN", companyType: "biotech", stage: "startup", founded: 2011, website: "https://www.invictusoncology.com/",
    sections: ["drug-discovery", "adcs"], technologies: ["adc"], companies: ["alyssum-therapeutics"], people: ["shiladitya-sengupta", "ratan-tata"],
    tldr: "A Delhi drug-discovery company, founded in 2011, that designed platinum-based cancer drugs and antibody-drug conjugates using nanoscale chemistry. None of its drugs is known to have reached a trial in people, and its US patents passed in 2018 to a US company now called Alyssum Therapeutics.",
    summary: "Invictus Oncology Private Limited was co-founded in 2011 by Raghunath Mashelkar, former Director General of India's Council of Scientific and Industrial Research, and Shiladitya Sengupta of Brigham and Women's Hospital and Harvard Medical School, and is based in Delhi. Its releases describe a supramolecular platform for designing anticancer drugs: VOLVOX, a computational method for designing supramolecular therapeutics (published in ACS Nano in 2016), and CORDLink, for building antibody-drug conjugates, presented as posters at the American Association for Cancer Research meeting in 2015. In 2017 its scientists published a platinum-linked antibody-drug conjugate platform in Chemical Science.\n\nIn February 2016 the company announced that Ratan Tata, chairman emeritus of Tata Sons, had invested as part of the first close of its Series A round, joining Navam Capital and Aarin Capital; the amount was not disclosed. The same release named its lead molecule, IO 125, as validated in multiple cancer models and about to enter the studies needed before an FDA application to begin trials in people.\n\nUS patent records show patents filed by Invictus Oncology assigned to Akamara Therapeutics, Inc. with effect from January 2018, and Akamara renamed Alyssum Therapeutics in March 2022. Alyssum, co-founded by Sengupta, now runs a phase 1/2 trial of AT-1965. A March 2026 SEC filing lists Invictus Oncology among the companies Sengupta consults for.",
    notes: [
      "No trial of IO 125 or any other Invictus Oncology drug was found on ClinicalTrials.gov. India's trial registry (CTRI) requires a captcha and was not searched. What IO 125 is, and which cancer it was meant for, is not stated in any primary source read; secondary press calls it platinum-based and aimed at triple-negative breast cancer, which is not recorded here.",
      "The company website now shows only its Delhi address and its secure page fails; the descriptions of its team and platforms come from archived copies and its own press releases.",
      "Company status: a registry aggregator (Tofler, which republishes Ministry of Corporate Affairs data) shows CIN U24232DL2011PTC217394 as active, incorporated on 11 April 2011, with its last annual general meeting on 30 September 2024. The Ministry's own portal requires a captcha and was not read. Two of the company's US patents are recorded as expired for unpaid fees.",
      "No source states that Alyssum's AT-1965 comes from an Invictus Oncology molecule; the link recorded is the patent assignment only.",
      "Navam Capital, Aarin Capital and Romulus Capital (whose own page says it invested in 2017) are not OnCo investor records, so the investors field is empty.",
    ],
    links: [
      { label: "Company release: Ratan Tata invests in Invictus Oncology (8 Feb 2016, PR Newswire text)", url: "https://www.bioprocessonline.com/doc/ratan-tata-invests-in-invictus-oncology-0001" },
      { label: "Company release: VOLVOX and CORDLink posters at AACR 2015 (20 Apr 2015)", url: "https://www.prnewswire.com/news-releases/invictus-oncology-announces-two-posters-to-be-presented-describing-its-platform-technology-on-supramolecular-therapeutics-at-the-american-association-for-cancer-research-annual-meeting-2015-500639171.html" },
      { label: "Company release: antibody-drug conjugate platform in Chemical Science (13 Mar 2017)", url: "https://www.prnewswire.com/news-releases/scientists-at-invictus-oncology-design-targeted-therapy-for-cancer-treatment-616022564.html" },
      { label: "Company website, team page (archived 7 Mar 2014)", url: "http://web.archive.org/web/20140307044555/http://www.invictusoncology.com:80/team.html" },
      { label: "Chemical Science 2017: a facile antibody-drug conjugate platform", url: "https://doi.org/10.1039/c6sc05149a" },
      { label: "ACS Nano 2016: algorithm for designing nanoscale supramolecular therapeutics", url: "https://doi.org/10.1021/acsnano.6b00241" },
      { label: "US11701429B2: assignment to Akamara Therapeutics and change of name to Alyssum Therapeutics (Google Patents)", url: "https://patents.google.com/patent/US11701429B2/en" },
      { label: "Vyome Holdings 10-K, March 2026 (Sengupta's roles)", url: "https://www.sec.gov/Archives/edgar/data/1427570/000121390026029500/ea0280821-10k_vyomehold.htm" },
      { label: "Tofler: company registry record (CIN U24232DL2011PTC217394)", url: "https://www.tofler.in/invictus-oncology-private-limited/company/U24232DL2011PTC217394" },
    ] }),
];

/** The one product a primary source names for either company: Invictus Therapeutics' own January 2024 release. */
export const drugsInvictus: DrugInput[] = [
  { id: "ivb003", kind: "drug", name: "IVB003", code: "IVB003", aka: ["IVB-003", "transmucosal tocotrienols"], asOf, status: "planned",
    modality: "Tocotrienols (a form of vitamin E) dissolved under the tongue; molecular form not stated", mechanism: "Not stated by the company beyond delivering tocotrienols through the lining of the mouth.",
    companies: ["invictus-therapeutics"], cancers: ["pancreatic"], sections: ["drug-discovery"],
    dosing: { route: "Sublingual", schedule: "120 mg three times a day (360 mg a day) in the planned phase II study", source: "https://abnnewswire.net/press/en/122891/VGI-Health-Technology-Limited-(NSX-VTL)-HREC-Approval-for-Phase-II-Clinical-Study.html" },
    tldr: "IVB003 is an experimental vitamin E compound, taken under the tongue, that Invictus Therapeutics plans to test alongside standard treatment in advanced pancreatic cancer. Whether it helps is not known.",
    summary: "IVB003 is Invictus Therapeutics' sublingual (under the tongue) formulation of tocotrienols. In January 2024 the company announced ethics approval, from the Human Research Ethics Committee of the Peter MacCallum Cancer Centre, for a multi-centre, randomised, double-blind phase II study of IVB003 against placebo, each added to standard treatment, in locally advanced or metastatic pancreatic cancer: eighty patients at no fewer than eight Australian sites, 120 mg three times a day, with progression-free survival as the primary endpoint and objective response rate among the secondary ones. No registry record or result was found. Whether it works in people has not been established.",
    notes: ["No ClinicalTrials.gov record names IVB003; the Australian New Zealand Clinical Trials Registry refused a script and was not searched, so whether the study opened is not known."],
    links: [{ label: "Company release: ethics approval for the phase II pancreatic cancer study (11 Jan 2024)", url: "https://abnnewswire.net/press/en/122891/VGI-Health-Technology-Limited-(NSX-VTL)-HREC-Approval-for-Phase-II-Clinical-Study.html" }] },
];
