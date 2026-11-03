import type { CompanyInput } from "@/lib/schema";

/**
 * Companies that appear as parties in src/data/deals.ts and had no record, so the deal map could only print their
 * names. Most were bought outright and now live inside the acquirer; each keeps a record of its own, with
 * `acquiredBy`, because the acquisition is how its medicines reached patients (the precedent is capstan-therapeutics
 * beside abbvie). Ono Pharmaceutical is the one independent company here.
 *
 * Every deal figure and date was read on 3 November 2026 from the primary document linked in the record: the
 * acquirer's announcement as filed with the SEC (8-K exhibit 99.1 or 6-K), the completion 8-K, a 10-K or 10-Q note,
 * or the company's own site. Where a document did not state something (a head-office city, a founding year, a
 * website), the field is left out and the record's notes say so.
 */

const asOf = "2026-11-03";
type S = Omit<CompanyInput, "kind" | "asOf"> & Partial<Pick<CompanyInput, "asOf">>;
const s = (x: S): CompanyInput => ({ kind: "company", asOf, ...x });

const edgar = (cik: number, acc: string, file: string) => `https://www.sec.gov/Archives/edgar/data/${cik}/${acc.replace(/-/g, "")}/${file}`;

export const companiesDealParties: CompanyInput[] = [
  s({ id: "array-biopharma", name: "Array BioPharma", aka: ["Array BioPharma Inc.", "NASDAQ:ARRY"], hq: "Boulder, CO", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "pfizer",
    sections: ["targeted-therapy"], technologies: ["kinase-inhibitors"], targets: ["braf", "mek"], cancers: ["melanoma", "colorectal"], drugs: ["encorafenib", "binimetinib"],
    tldr: "Array BioPharma, of Boulder, Colorado, developed encorafenib and binimetinib, two pills taken together for melanoma with a BRAF mutation. Pfizer bought the company in 2019.",
    summary: "Array BioPharma Inc. (formerly Nasdaq: ARRY) was a commercial-stage company in Boulder, Colorado, that discovered and developed targeted small-molecule medicines. At the time of its sale its main products were BRAFTOVI (encorafenib) and MEKTOVI (binimetinib), approved together for unresectable or metastatic melanoma with a BRAF V600E or V600K mutation and being tested in more than 30 trials, including the phase 3 BEACON trial in BRAF-mutant metastatic colorectal cancer. Pfizer agreed on 17 June 2019 to buy Array for USD 48 per share in cash, a total enterprise value of about USD 11.4 billion, through a tender offer, and the merger was completed on 30 July 2019.",
    funding: [
      { round: "Acquisition", year: 2019, amountUsd: 11400000000, source: edgar(1100412, "0001104659-19-035823", "a19-11481_1ex99d1.htm"), note: "Pfizer's announcement of 17 June 2019, filed as exhibit 99.1 to Array's 8-K: USD 48 per share in cash, total enterprise value of approximately USD 11.4 billion" },
    ],
    notes: ["No website is recorded: Array no longer operates under its own name and the redirect of its old domain was not checked. Completion on 30 July 2019 is from Array's 8-K of that date. Founding year not read in a primary source and omitted."],
    links: [
      { label: "Pfizer to acquire Array BioPharma (8-K exhibit 99.1, 17 June 2019)", url: edgar(1100412, "0001104659-19-035823", "a19-11481_1ex99d1.htm") },
      { label: "Form 8-K: completion of the merger (30 July 2019)", url: edgar(1100412, "0001193125-19-206255", "d733992d8k.htm") },
    ] }),

  s({ id: "loxo-oncology", name: "Loxo Oncology", aka: ["Loxo Oncology, Inc.", "NASDAQ:LOXO"], hq: "Stamford, CT", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "eli-lilly",
    sections: ["targeted-therapy"], technologies: ["kinase-inhibitors"], targets: ["ret", "btk", "ntrk"], cancers: ["nsclc", "thyroid", "cll", "mantle-cell-lymphoma"], drugs: ["selpercatinib", "pirtobrutinib", "larotrectinib"],
    tldr: "Loxo Oncology developed pills aimed at single gene changes that drive some cancers, including selpercatinib for RET-altered cancers and pirtobrutinib for some blood cancers. Eli Lilly bought the company in 2019.",
    summary: "Loxo Oncology, Inc. (formerly Nasdaq: LOXO), based in Stamford, Connecticut, developed highly selective medicines for cancers driven by a single genetic change that can be found by genomic testing. When Eli Lilly agreed to buy it on 7 January 2019, its portfolio included LOXO-292 (later selpercatinib), an oral RET inhibitor with FDA Breakthrough Therapy designation; LOXO-305 (later pirtobrutinib), an oral BTK inhibitor in phase 1/2 designed to work after resistance to existing BTK inhibitors; Vitrakvi (larotrectinib), a TRK inhibitor developed and sold with Bayer; and LOXO-195, a follow-on TRK inhibitor. Lilly paid USD 235 per share in cash, about USD 8.0 billion, through a tender offer, and the merger was completed on 15 February 2019.",
    funding: [
      { round: "Acquisition", year: 2019, amountUsd: 8000000000, source: edgar(1581720, "0001193125-19-003083", "d674169dex991.htm"), note: "Lilly's announcement of 7 January 2019, filed as exhibit 99.1 to Loxo's 8-K: USD 235.00 per share in cash, approximately USD 8.0 billion" },
    ],
    notes: ["Lilly's own record is named 'Eli Lilly (incl. Loxo)'; this record holds the company before and at the acquisition. Larotrectinib is linked as a Loxo product because the announcement describes it as developed and commercialised by Loxo with Bayer. Completion on 15 February 2019 is from Loxo's 8-K of that date. No website or founding year is recorded."],
    links: [
      { label: "Lilly announces agreement to acquire Loxo Oncology (8-K exhibit 99.1, 7 January 2019)", url: edgar(1581720, "0001193125-19-003083", "d674169dex991.htm") },
      { label: "Form 8-K: completion of the merger (15 February 2019)", url: edgar(1581720, "0001193125-19-042505", "d664418d8k.htm") },
    ] }),

  s({ id: "immunogen", name: "ImmunoGen", aka: ["ImmunoGen, Inc.", "NASDAQ:IMGN"], hq: "Waltham, MA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "abbvie", related: ["immunome"],
    sections: ["adcs"], technologies: ["adc"], targets: ["folr1", "cd123"], cancers: ["ovarian"], drugs: ["mirvetuximab-soravtansine", "pivekimab-sunirine"],
    tldr: "ImmunoGen made antibody-drug conjugates, antibodies that carry a strong drug to cancer cells. Its medicine Elahere treats ovarian cancer that has stopped responding to platinum chemotherapy. AbbVie bought the company in 2024.",
    summary: "ImmunoGen, Inc. (formerly Nasdaq: IMGN), of Waltham, Massachusetts, developed antibody-drug conjugates. Its lead product, ELAHERE (mirvetuximab soravtansine-gynx), is a folate receptor alpha-directed ADC approved for platinum-resistant ovarian cancer. Its pipeline at the time of sale included IMGN-151, a phase 1 next-generation folate receptor alpha ADC, and pivekimab sunirine, a phase 2 CD123-directed ADC for blastic plasmacytoid dendritic cell neoplasm, a rare blood cancer, with FDA Breakthrough Therapy designation in the relapsed or refractory setting. AbbVie agreed on 30 November 2023 to acquire ImmunoGen for USD 31.26 per share in cash, a total equity value of about USD 10.1 billion, and the merger was completed on 12 February 2024.",
    funding: [
      { round: "Acquisition", year: 2023, amountUsd: 10100000000, source: edgar(855654, "0001104659-23-122415", "tm2331816d2_ex99-1.htm"), note: "AbbVie's announcement of 30 November 2023, filed as exhibit 99.1 to ImmunoGen's 8-K: USD 31.26 per share in cash, total equity value of approximately USD 10.1 billion; completed 12 February 2024" },
    ],
    notes: ["AbbVie's own record is named 'AbbVie (incl. ImmunoGen, Capstan)'; this record holds the company itself, as capstan-therapeutics does. It is not Immunome (immunome), a different company with a similar name, which is why the two are cross-linked. Completion on 12 February 2024 is from ImmunoGen's 8-K of that date. No website or founding year is recorded."],
    links: [
      { label: "AbbVie to acquire ImmunoGen (8-K exhibit 99.1, 30 November 2023)", url: edgar(855654, "0001104659-23-122415", "tm2331816d2_ex99-1.htm") },
      { label: "Form 8-K: completion of the merger (12 February 2024)", url: edgar(855654, "0001104659-24-013712", "tm245856d1_8k.htm") },
    ] }),

  s({ id: "five-prime-therapeutics", name: "Five Prime Therapeutics", aka: ["Five Prime Therapeutics, Inc.", "Five Prime", "NASDAQ:FPRX"], hq: "South San Francisco, CA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "amgen",
    sections: ["targeted-therapy", "immunotherapy"], technologies: ["monoclonal-antibody"], targets: ["fgfr2"], cancers: ["gastric"], drugs: ["bemarituzumab"],
    tldr: "Five Prime Therapeutics developed bemarituzumab, an antibody aimed at a protein called FGFR2b that some stomach cancers carry in large amounts. Amgen bought the company in 2021.",
    summary: "Five Prime Therapeutics, Inc. (formerly Nasdaq: FPRX), of South San Francisco, was a clinical-stage company developing immuno-oncology and targeted cancer therapies. Its lead asset, bemarituzumab, is an antibody against FGFR2b, which the announcement says is overexpressed in about 30% of people with HER2-negative gastric cancer; the randomised, placebo-controlled phase 2 FIGHT trial in first-line advanced gastric or gastro-oesophageal junction cancer reported improvements in progression-free survival, overall survival and response rate. Amgen agreed on 4 March 2021 to buy Five Prime for USD 38 per share in cash, an equity value of about USD 1.9 billion, and the merger was completed on 16 April 2021.",
    funding: [
      { round: "Acquisition", year: 2021, amountUsd: 1900000000, source: edgar(1175505, "0001193125-21-068593", "d77427dex991.htm"), note: "Amgen's announcement of 4 March 2021, filed as exhibit 99.1 to Five Prime's 8-K: USD 38.00 per share in cash, equity value of approximately USD 1.9 billion" },
    ],
    notes: ["Completion on 16 April 2021 is from Five Prime's 8-K of that date. No website or founding year is recorded."],
    links: [
      { label: "Amgen to acquire Five Prime Therapeutics (8-K exhibit 99.1, 4 March 2021)", url: edgar(1175505, "0001193125-21-068593", "d77427dex991.htm") },
      { label: "Form 8-K: completion of the merger (16 April 2021)", url: edgar(1175505, "0001193125-21-118566", "d153048d8k.htm") },
    ] }),

  s({ id: "forty-seven", name: "Forty Seven", aka: ["Forty Seven, Inc.", "NASDAQ:FTSV"], hq: "Menlo Park, CA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "gilead",
    sections: ["immunotherapy"], technologies: ["monoclonal-antibody"], targets: ["cd47"], cancers: ["mds", "aml", "dlbcl"], drugs: ["magrolimab"],
    tldr: "Forty Seven developed magrolimab, an antibody that blocks CD47, a signal cancer cells use to stop immune cells from swallowing them. Gilead bought the company in 2020.",
    summary: "Forty Seven, Inc. (formerly Nasdaq: FTSV), of Menlo Park, California, was a clinical-stage immuno-oncology company working on technology licensed from Stanford University. Its lead programme, magrolimab, is a monoclonal antibody against CD47, a 'don't eat me' signal that cancer cells use to avoid being engulfed by macrophages; at the time of sale it was in clinical studies in myelodysplastic syndrome, acute myeloid leukaemia and diffuse large B-cell lymphoma. Gilead agreed on 2 March 2020 to buy Forty Seven for USD 95.50 per share in cash, valuing it at about USD 4.9 billion, and the merger was completed on 7 April 2020.",
    funding: [
      { round: "Acquisition", year: 2020, amountUsd: 4900000000, source: edgar(1667633, "0001193125-20-057799", "d890968dex991.htm"), note: "Gilead's announcement of 2 March 2020, filed as exhibit 99.1 to Forty Seven's 8-K: USD 95.50 per share in cash, approximately USD 4.9 billion" },
    ],
    notes: ["Completion on 7 April 2020 is from Forty Seven's 8-K of that date. What later happened to magrolimab is on its own page; this record does not restate it. No website or founding year is recorded."],
    links: [
      { label: "Gilead to acquire Forty Seven (8-K exhibit 99.1, 2 March 2020)", url: edgar(1667633, "0001193125-20-057799", "d890968dex991.htm") },
      { label: "Form 8-K: completion of the merger (7 April 2020)", url: edgar(1667633, "0001104659-20-043980", "a20-14980_68k.htm") },
    ] }),

  s({ id: "immunomedics", name: "Immunomedics", aka: ["Immunomedics, Inc.", "NASDAQ:IMMU"], hq: "Morris Plains, NJ", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "gilead",
    sections: ["adcs"], technologies: ["adc"], targets: ["trop2"], cancers: ["tnbc"], drugs: ["sacituzumab-govitecan"],
    tldr: "Immunomedics developed Trodelvy (sacituzumab govitecan), an antibody that carries chemotherapy to cancer cells carrying a protein called Trop-2, first approved for triple-negative breast cancer. Gilead bought the company in 2020.",
    summary: "Immunomedics, Inc. (formerly Nasdaq: IMMU), of Morris Plains, New Jersey, developed antibody-drug conjugates using a linker that releases its payload without needing an enzyme, so the drug also reaches neighbouring tumour cells. Its lead product, Trodelvy (sacituzumab govitecan-hziy), a Trop-2-directed ADC, received FDA accelerated approval in April 2020 for adults with metastatic triple-negative breast cancer after at least two prior therapies for metastatic disease, and the phase 3 ASCENT study had been stopped early for efficacy. Gilead agreed on 13 September 2020 to buy Immunomedics for USD 88 per share in cash, valuing it at about USD 21 billion, and the merger was completed on 23 October 2020.",
    funding: [
      { round: "Acquisition", year: 2020, amountUsd: 21000000000, source: edgar(722830, "0001104659-20-104608", "tm2030753d1_ex99-1.htm"), note: "Gilead's announcement of 13 September 2020, filed as exhibit 99.1 to Immunomedics' 8-K: USD 88.00 per share in cash, approximately USD 21 billion" },
    ],
    notes: ["Completion on 23 October 2020 is from Immunomedics' 8-K of that date. No website or founding year is recorded."],
    links: [
      { label: "Gilead Sciences to acquire Immunomedics (8-K exhibit 99.1, 13 September 2020)", url: edgar(722830, "0001104659-20-104608", "tm2030753d1_ex99-1.htm") },
      { label: "Form 8-K: completion of the merger (23 October 2020)", url: edgar(722830, "0001104659-20-117764", "tm2034060-1_8k.htm") },
    ] }),

  s({ id: "stemcentrx", name: "Stemcentrx", aka: ["Stemcentrx, Inc."], hq: "United States (city not confirmed)", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "abbvie",
    sections: ["adcs"], technologies: ["adc"], targets: ["dll3"], cancers: ["sclc"], drugs: ["rovalpituzumab-tesirine"],
    tldr: "Stemcentrx was a privately held company that developed rovalpituzumab tesirine (Rova-T), an antibody-drug conjugate aimed at DLL3 on small cell lung cancer cells. AbbVie bought it in 2016.",
    summary: "Stemcentrx, Inc. was a privately held biotechnology company working on therapies derived from cancer stem cells. Its lead asset, rovalpituzumab tesirine (Rova-T), is an antibody-drug conjugate aimed at DLL3, which AbbVie's announcement says is expressed in more than 80% of small cell lung cancer tumours; at the time of sale it was in registrational trials in small cell lung cancer, alongside four earlier clinical compounds in solid tumours. AbbVie announced the acquisition on 28 April 2016 at about USD 5.8 billion in cash and stock, about USD 2.0 billion of it in cash, with up to USD 4 billion more in cash milestones for clinical and regulatory achievements, and completed it on 1 June 2016.",
    funding: [
      { round: "Acquisition", year: 2016, amountUsd: 5800000000, source: edgar(1551152, "0001104659-16-116276", "a16-9837_1ex99d1.htm"), note: "AbbVie's announcement of 28 April 2016, filed as exhibit 99.1 to an AbbVie 8-K: approximately USD 5.8 billion in cash and stock, plus up to USD 4 billion in success-based milestones; AbbVie's 10-Q for the quarter to 30 June 2016 gives completion on 1 June 2016" },
    ],
    notes: ["Head-office city is not stated in AbbVie's announcement or 10-Q and was not confirmed elsewhere, so it is left general. What later happened to Rova-T is on its own page; this record does not restate it. No website or founding year is recorded."],
    links: [
      { label: "AbbVie to expand oncology presence through acquisition of Stemcentrx (8-K exhibit 99.1, 28 April 2016)", url: edgar(1551152, "0001104659-16-116276", "a16-9837_1ex99d1.htm") },
      { label: "AbbVie Form 10-Q, quarter to 30 June 2016: acquisition completed 1 June 2016 (Note 4)", url: edgar(1551152, "0001104659-16-137453", "a16-11616_110q.htm") },
    ] }),

  s({ id: "turning-point-therapeutics", name: "Turning Point Therapeutics", aka: ["Turning Point Therapeutics, Inc.", "NASDAQ:TPTX"], hq: "San Diego, CA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "bms",
    sections: ["targeted-therapy"], technologies: ["kinase-inhibitors"], targets: ["ros1", "ntrk"], cancers: ["nsclc"], drugs: ["repotrectinib"],
    tldr: "Turning Point Therapeutics developed repotrectinib, a pill aimed at lung cancers and other tumours driven by ROS1 or NTRK gene changes. Bristol Myers Squibb bought the company in 2022.",
    summary: "Turning Point Therapeutics, Inc. (formerly Nasdaq: TPTX), of San Diego, was a clinical-stage precision oncology company. Its lead asset, repotrectinib, is a tyrosine kinase inhibitor aimed at the ROS1 and NTRK cancer drivers in non-small cell lung cancer and other advanced solid tumours. Bristol Myers Squibb agreed on 3 June 2022 to buy Turning Point for USD 76 per share in cash, an equity value of USD 4.1 billion, and the merger was completed on 17 August 2022.",
    funding: [
      { round: "Acquisition", year: 2022, amountUsd: 4100000000, source: edgar(1595893, "0001193125-22-166796", "d344596dex991.htm"), note: "Bristol Myers Squibb's announcement of 3 June 2022, filed as exhibit 99.1 to Turning Point's 8-K: USD 76.00 per share in cash; Turning Point's investor messages filed the same day give an equity value of USD 4.1 billion" },
    ],
    notes: ["Completion on 17 August 2022 is from Turning Point's 8-K of that date. No website or founding year is recorded."],
    links: [
      { label: "Bristol Myers Squibb to acquire Turning Point Therapeutics (8-K exhibit 99.1, 3 June 2022)", url: edgar(1595893, "0001193125-22-166796", "d344596dex991.htm") },
      { label: "Turning Point investor messages: USD 4.1 billion equity value (Schedule 14D-9C exhibit 99.2)", url: edgar(1595893, "0001193125-22-166807", "d337235dex992.htm") },
      { label: "Form 8-K: completion of the merger (17 August 2022)", url: edgar(1595893, "0001140361-22-029961", "brhc10040812_8k.htm") },
    ] }),

  s({ id: "velosbio", name: "VelosBio", aka: ["VelosBio Inc."], hq: "San Diego, CA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "merck",
    sections: ["adcs"], technologies: ["adc"], targets: ["ror1"], cancers: [], drugs: ["zilovertamab-vedotin"],
    tldr: "VelosBio was a privately held company that developed VLS-101, now zilovertamab vedotin, an antibody that carries a drug to cancer cells carrying a protein called ROR1. Merck bought it in 2020.",
    summary: "VelosBio Inc. was a privately held clinical-stage company in San Diego developing cancer therapies aimed at ROR1 (receptor tyrosine kinase-like orphan receptor 1). Its lead candidate, VLS-101, an antibody-drug conjugate against ROR1, was in a phase 1 trial in blood cancers and a phase 2 trial in solid tumours when Merck agreed on 5 November 2020 to buy the company for USD 2.75 billion in cash, subject to customary adjustments. Merck's annual report for 2020 records the acquisition as completed in December 2020, for USD 2.8 billion, and gives VLS-101 its Merck code, MK-2140; it is now called zilovertamab vedotin.",
    funding: [
      { round: "Acquisition", year: 2020, amountUsd: 2750000000, source: "https://www.merck.com/news/merck-to-acquire-velosbio/", note: "Merck's announcement of 5 November 2020: USD 2.75 billion in cash, subject to customary adjustments; Merck's 2020 Form 10-K records completion in December 2020 at USD 2.8 billion" },
    ],
    notes: ["San Diego is from the announcement's dateline and VelosBio's Form D filings with the SEC. The exact completion day in December 2020 was not stated in the 10-K and is not given. No cancer is linked because the announcement names only blood cancers and solid tumours in general. No website or founding year is recorded."],
    links: [
      { label: "Merck to acquire VelosBio (5 November 2020)", url: "https://www.merck.com/news/merck-to-acquire-velosbio/" },
      { label: "Merck Form 10-K for 2020: VelosBio acquired in December 2020", url: edgar(310158, "0000310158-21-000004", "mrk-20201231.htm") },
    ] }),

  s({ id: "biotheus", name: "Biotheus", hq: "China (city not confirmed)", country: "CN", companyType: "biotech", stage: "acquired", acquiredBy: "biontech",
    sections: ["immunotherapy"], technologies: ["bispecific-antibody"], targets: ["pdl1", "vegf"], cancers: [], drugs: ["pm8002"],
    tldr: "Biotheus was a Chinese antibody company that developed PM8002 (BNT327, pumitamig), an antibody that blocks both PD-L1 and VEGF-A. BioNTech, already its partner on the drug, bought the company in early 2025.",
    summary: "Biotheus was a clinical-stage biotechnology company discovering and developing antibodies for cancer and inflammatory diseases; its announcement with BioNTech described several antibody discovery platforms and ten programmes in clinical development. Its leading asset, PM8002 (BNT327, later named pumitamig), is a bispecific antibody aimed at PD-L1 and VEGF-A, on which BioNTech and Biotheus were already collaborating. BioNTech agreed on 13 November 2024 to pay USD 800 million for all of Biotheus's issued share capital, plus up to USD 150 million in milestone payments, and completed the acquisition on 3 February 2025, when Biotheus became an indirect Chinese subsidiary of BioNTech with a research hub and a biologics manufacturing facility.",
    funding: [
      { round: "Acquisition", year: 2024, amountUsd: 800000000, source: edgar(1776985, "0001776985-24-000094", "a99_1biontechtoacquirebiot.htm"), note: "BioNTech's announcement of 13 November 2024, filed as exhibit 99.1 to a BioNTech 6-K: USD 800 million for 100 percent of the issued share capital and up to USD 150 million in potential milestone payments; completed 3 February 2025" },
    ],
    notes: ["Head-office city is not stated in either BioNTech release, and biotheus.com did not respond when checked on 3 November 2026; BioNTech's list of subsidiaries for 2025 records the Biotheus holding entity in the Cayman Islands. No website or founding year is recorded."],
    links: [
      { label: "BioNTech to acquire Biotheus (6-K exhibit 99.1, 13 November 2024)", url: edgar(1776985, "0001776985-24-000094", "a99_1biontechtoacquirebiot.htm") },
      { label: "BioNTech completes acquisition of Biotheus (6-K exhibit 99.1, 3 February 2025)", url: edgar(1776985, "0001776985-25-000004", "a99_1250131xbntxpressstate.htm") },
    ] }),

  s({ id: "idrx", name: "IDRx", aka: ["IDRx, Inc."], hq: "Boston, MA", country: "US", companyType: "biotech", stage: "acquired", acquiredBy: "gsk",
    sections: ["targeted-therapy"], technologies: ["kinase-inhibitors"], targets: ["kit"], cancers: ["gist"], drugs: ["idrx-42"],
    tldr: "IDRx, a Boston company, developed IDRX-42, a pill aimed at the KIT gene changes that drive most gastrointestinal stromal tumours (GIST). GSK bought the company in 2025.",
    summary: "IDRx, Inc. was a Boston-based, clinical-stage company developing precision treatments for gastrointestinal stromal tumours. Its lead molecule, IDRX-42, is a highly selective KIT tyrosine kinase inhibitor being developed for first- and second-line treatment; GSK's announcement says about 80% of GIST cases are driven by KIT mutations and that IDRX-42 has shown activity against all key primary and secondary KIT mutations. GSK agreed on 13 January 2025 to buy IDRx for USD 1 billion upfront plus a possible USD 150 million regulatory milestone, and completed the acquisition on 24 February 2025.",
    funding: [
      { round: "Acquisition", year: 2025, amountUsd: 1000000000, source: edgar(1131399, "0001654954-25-000242", "a0538t.htm"), note: "GSK's announcement of 13 January 2025, filed on a 6-K: USD 1 billion upfront with a potential additional USD 150 million success-based regulatory approval milestone; completion announced 24 February 2025" },
    ],
    notes: ["No website or founding year is recorded."],
    links: [
      { label: "GSK enters agreement to acquire IDRx (6-K, 13 January 2025)", url: edgar(1131399, "0001654954-25-000242", "a0538t.htm") },
      { label: "GSK completes acquisition of IDRx (6-K, 24 February 2025)", url: edgar(1131399, "0001654954-25-001815", "a1769y.htm") },
    ] }),

  s({ id: "ono-pharmaceutical", name: "Ono Pharmaceutical", aka: ["ONO PHARMACEUTICAL CO., LTD.", "Ono Pharma"], hq: "Osaka", country: "JP", companyType: "pharma", stage: "public", founded: 1947, website: "https://www.ono-pharma.com/en",
    sections: ["immunotherapy", "targeted-therapy"], technologies: ["checkpoint-inhibitor"], targets: ["pd1"], cancers: [], drugs: ["nivolumab"],
    tldr: "Ono Pharmaceutical is an Osaka drug company that launched the immunotherapy nivolumab (Opdivo) in Japan in 2014. It bought the US company Deciphera Pharmaceuticals in 2024.",
    summary: "Ono Pharmaceutical Co., Ltd. traces its origins to an apothecary opened in Doshomachi, Osaka, in 1717; the present company was established in 1947 and listed on the Osaka Securities Exchange in 1962 and the Tokyo Stock Exchange in 1963. Its headquarters are in Chuo, Osaka. In 2014 it launched OPDIVO, which its history describes as the world's first anti-PD-1 antibody, in Japan. In 2024 it acquired Deciphera Pharmaceuticals, a US company whose medicines include ripretinib.",
    notes: ["Facts are from Ono's own history and office pages, read on 3 November 2026. The stock code was not shown on the pages that loaded and is omitted. Nivolumab is linked because Ono's history records launching Opdivo; its partnership terms with Bristol Myers Squibb were not read for this record. Ripretinib is named as a Deciphera medicine per the deal map and the Deciphera record, not Ono's pages."],
    links: [
      { label: "Official website", url: "https://www.ono-pharma.com/en" },
      { label: "Ono Pharmaceutical: history", url: "https://www.ono-pharma.com/en/company/history" },
      { label: "Ono Pharmaceutical: head offices", url: "https://www.ono-pharma.com/en/company/about/office" },
    ] }),
];
