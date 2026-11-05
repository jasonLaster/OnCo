# OnCo gap census, November 2026

This census lists what OnCo is missing, measured on 4 November 2026 in answer to the owner's request for absolute coverage of machines and of every oncology-related object. It finds gaps and fills none. A gap is something an outside authority lists (a regulator, payer, registry, society, directory, standard classification or curated public list) that OnCo holds no record of. Each was checked against the corpus by name, alias, brand, code and identifier, and each is backed by a source fetched on the day.

OnCo's own completeness page measures the corpus against narrow lists and finds it nearly complete: 398 of 399 drugs on the NCI A to Z list, all 128 NCI cancer types, all 36 GLOBOCAN sites, all 74 NCI-designated centres. The broader lists used here tell a different story. Of 174 object types, 8 have no record at all, 61 are below 25% coverage and 117 are below 50%. Only 4 are at 90% or better: EMA-authorised oncology originators (251 of 252), Japan-approved oncology active ingredients (106 of 113), the WHO Essential Medicines cancer section (77 of 77) and FDA scalp-cooling authorisations (7 of 7).

How to read it. The summary table ranks every type by gap severity times reader impact. Each gap says whether the item is named nowhere in src/data (MISSING) or only in passing, with no record about it (MENTION). Coverage counts an item as held when any record names it, even a trial or paper titled after it, so the figures flatter OnCo; agents that applied a stricter rule say so in the type notes. Where a denominator was a curated or sampled list rather than an official register, the type says so. The full worklist of 3,313 gaps, one row per gap with its source and identifier, is `gap-census-2026-11.json`; this page shows the top few per type.

Corpus: main at 0114cef1b and public/api/v1/all.ndjson built on 4 November 2026 at 13:35 (21,337 records), plus every side table in src/data. Twenty-five measuring agents worked the families in parallel from one brief; the coordinator merged, ranked and re-checked the results. Nothing in src/data was changed.

## Headline

- **174 object types** in 12 families, each measured against outside lists; **170** with a measured coverage figure.
- **3,313 verified gaps** in the worklist (2,218 named nowhere in the corpus, 1,095 named only in passing); 771 rated high impact.
- **8 types with no OnCo record at all**: Hospices and cancer support centres, Navigation services, Fertility preservation services, Psycho-oncology services, Decision aids, Embolisation devices, Veterinary and comparative oncology, Prizes and awards.
- **Precision**: 30 of 30 randomly drawn gaps are real on a coordinator re-check of the corpus, and 30 of 30 sources confirm the item exists (seed 20261104); the automatic re-grep alone scores 27 of 30. Details at the end.
- **Patient-facing types are the thinnest**: patient education 46 of 861 resources (5%), germline cancer tests 1 of 17 products (6%), decision aids 0 of 36, psycho-oncology services 0 of 28 societies, hospices and support centres 0 of 41, helplines 15 of 67 (22%), financial assistance 11 of 32 (34%).
- **Machines**: 33 machine and device types were measured. OnCo describes machines as families rather than products; the median family-level coverage is about 40% and the median product-level coverage about 30%. Embolisation devices have no record of any kind, and 48 treatment-device families alone have neither a record nor a mention.
- **The narrow lists are done; breadth is the gap.** Every medicine on the WHO cancer list and all but one EMA-authorised originator are present, yet 66 of 91 licensed oncology biosimilars, 34 of 43 contrast agents and dyes and 15 of 19 cancer-preventing vaccines are not.
- **Corrections found on the way** (not gaps, listed below): a wrong count of US wig-cover laws, ten wrong or retired NCCN guideline links, a dead UKONS triage link, a lapsed domain, five sets of aliases on the wrong record, a stale approval status and outdated CTCAE and TNM editions.

## The ten worst gaps

1. **[Hospices and cancer support centres](#hospices-support-centres)**: 0 of 41 measured places have a record (Maggie's centres and Marie Curie hospices). The networks have records; the places a patient would go to do not. Examples: Maggie's Royal Marsden, Maggie's Edinburgh, Marie Curie Hospice Glasgow, Gilda's Club.
2. **[Patient advocacy coalitions](#patient-advocacy)**: 0 of 33 European and international cancer patient coalitions, among them Cancer Patients Europe, Europa Uomo, Myeloma Patients Europe, Lymphoma Coalition Europe, Childhood Cancer International, The Max Foundation and Lung Cancer Europe. OnCo's 28 patient-organisation records are national charities.
3. **[Patient education resources](#education-resources)**: 46 of 861 named or linked: NCI PDQ summaries 43 of 235, ESMO Patient Guides 3 of 27, NCCN Guidelines for Patients 0 of 77, and the ONS/NCODA/HOPA oral anticancer drug sheets 0 of 522, although 443 of those sheets match an OnCo drug record by name.
4. **[Germline hereditary cancer tests](#germline-hereditary-tests)**: 1 of 17 named products, against the NIH Genetic Testing Registry and FDA authorisations: the Invitae Common Hereditary Cancers Panel (FDA De Novo), the 23andMe BRCA report, Ambry CancerNext and Myriad myRisk are absent. 22 of 31 NHS inherited-cancer test indications are covered.
5. **[Complementary and alternative products](#complementary-alternative)**: 40 of 308 entries in MSK's About Herbs database. Milk thistle, black cohosh, low-dose naltrexone, PC-SPES, echinacea, ginkgo and aloe vera have no graded record, so a reader who searches for them finds the seller's page instead.
6. **[Reporting and data systems](#reporting-systems)**: 5 of 34. BI-RADS, O-RADS, TI-RADS and C-RADS are absent or only mentioned, as are Bosniak, the Fleischner guidelines and the ICCR datasets; these are the categories patients read in their own scan and pathology reports.
7. **[Hereditary cancer syndromes](#hereditary-syndromes)**: 22 of 144 Orphanet inherited cancer-predisposition syndromes. Neurofibromatosis type 1, MUTYH-associated polyposis, Peutz-Jeghers syndrome, hereditary diffuse gastric cancer and constitutional mismatch repair deficiency have no page.
8. **[Palliative and end-of-life care](#palliative-end-of-life)**: 6 of 37. Nothing on advance-care-planning documents (ReSPECT, POLST, advance decisions to refuse treatment), hospice service types, palliative sedation or care in the last days of life, and none of the 9 assisted-dying statutes or bills the agent verified.
9. **[Decision aids](#decision-aids)**: 0 of 36 cancer decision aids in the Ottawa A to Z inventory, for example "Lung cancer screening: is it right for me?", PSA screening aids, risk-reducing medicines, localised prostate cancer and breast surgery choices. Idea records propose decision aids; no actual aid has a record.
10. **[Psycho-oncology services](#psycho-oncology-services)**: 0 of 28 national societies in the IPOS federation, and no service. The discipline has a technology record and a journal record; IPOS itself, APOS, BPOS, Germany's dapo and its psychosocial counselling centres do not.

## Summary table

Ranked by gap severity × reader impact. Severity is 5 × the uncovered share (for machine types, 60% family-level and 40% product-level coverage); reader impact runs from 5 (patients and carers meet it routinely) to 1 (niche research object). Coverage is what OnCo holds over what the denominator lists, by identity (name, alias, brand, code, identifier), not by string. Full gap lists are in the per-family sections and in `gap-census-2026-11.json`.

| # | Type | Family | OnCo count | Denominator | Coverage | Score | Top gaps |
|---|---|---|---|---|---|---|---|
| 1 | [Hospices and cancer support centres](#hospices-support-centres) | Organisations and people | 0 | [Maggie's: Our centres](https://www.maggies.org/our-centres/) (+4) | 0/41 (0.0%) | 25.0 | Maggie's Royal Marsden; Maggie's Edinburgh; Maggie's Barts |
| 2 | [Patient advocacy groups](#patient-advocacy) | Organisations and people | 28 | [EMA eligible patients' and consumers' organisations (oncolo…](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) (+2) | 0/33 (0.0%) | 25.0 | Cancer Patients Europe (CPE); Europa Uomo; Myeloma Patients Europe (MPE) |
| 3 | [Patient education resources](#education-resources) | Patient resources | 46 | [NCI PDQ Cancer Information Summaries (7 category pages: adu…](https://www.cancer.gov/publications/pdq/information-summaries) (+3) | 46/861 (5.3%) | 23.65 | Patient Education Sheets library (ONS/NCODA/…; NCCN Guidelines for Patients: Distress Durin…; NCCN Guidelines for Patients: Breast Cancer… |
| 4 | [Germline hereditary cancer tests](#germline-hereditary-tests) | Tests and diagnostics | 1 | [NIH Genetic Testing Registry (GTR) test_version.gz, current…](https://ftp.ncbi.nlm.nih.gov/pub/GTR/data/test_version.gz) (+3) | 1/17 (5.9%) sampled | 23.55 | Invitae Common Hereditary Cancers Panel (FDA…; 23andMe PGS Genetic Health Risk Report for B…; CancerNext-Expanded and CancerNext (Ambry Ge… |
| 5 | [Complementary and alternative products](#complementary-alternative) | Medicines | 56 | [Memorial Sloan Kettering 'About Herbs, Botanicals and Other…](https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs/search?letter=A&page=0) (+2) | 40/308 (13.0%) | 21.75 | Milk thistle (silymarin); Black cohosh; Low-dose naltrexone |
| 6 | [Reporting and data systems (BI-RADS, PI-RADS, Bethesda...)](#reporting-systems) | Disease | 5 | [ACR Reporting and Data Systems (RADS) hub](https://www.acr.org/clinical-resources/clinical-tools-and-reference/reporting-and-data-systems) (+3) | 5/34 (14.7%) | 21.3 | O-RADS; Bosniak classification of cystic renal masse…; Fleischner Society guidelines for incidental… |
| 7 | [Hereditary cancer syndromes](#hereditary-syndromes) | Disease | 20 | [Orphanet classification of rare neoplastic diseases, branch…](https://www.orphadata.com/data/xml/en_product3_202.xml) (+2) | 22/144 (15.3%) | 21.15 | Neurofibromatosis type 1; MUTYH-related polyposis; Peutz-Jeghers syndrome |
| 8 | [Palliative and end-of-life services](#palliative-end-of-life) | Procedures, services and measures | 6 | [ESMO supportive and palliative CPGs (palliative subset, via…](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22ESMO%20Clinical%20Practice%20Guideline%22) (+5) | 6/37 (16.2%) | 20.95 | ReSPECT (Recommended Summary Plan for Emerge…; POLST (Portable Medical Orders / Physician O…; Advance decision to refuse treatment (Mental… |
| 9 | [Navigation services](#navigation-services) | Patient resources | 0 programmes (1 related record) | [US navigation bodies and payment (AONN+, ACS National Navig…](https://www.ruralhealthinfo.org/care-management/principal-illness-navigation-services) (+1) | no outside list; no programme record | 20.0 | Patient navigation (the service model: navig…; Medicare Principal Illness Navigation (PIN)…; Academy of Oncology Nurse & Patient Navigato… |
| 10 | [Fertility preservation services](#fertility-preservation-services) | Patient resources | 0 | [Alliance for Fertility Preservation: state fertility preser…](https://www.allianceforfertilitypreservation.org/expenses/laws-legislation/) (+3) | 0/6 (0.0%) | 20.0 | LIVESTRONG Fertility; US state fertility preservation coverage law…; Alliance for Fertility Preservation |
| 11 | [Psycho-oncology services](#psycho-oncology-services) | Patient resources | 0 services (26 psychosocial technology records) | [IPOS Federation of national psycho-oncology societies](https://ipos-society.org/IPOS-Federation) (+1) | 0/28 (0.0%) | 20.0 | Psychosocial cancer counselling centres in G…; International Psycho-Oncology Society (IPOS); IPOS Standard of Quality Cancer Care |
| 12 | [Decision aids](#decision-aids) | Patient resources | 0 aids (9 records about decision aids: ideas and a trial) | [Ottawa Hospital Research Institute, A to Z Inventory of Pat…](https://decisionaid.ohri.ca/AZlist.html) (+1) | 0/36 (0.0%) | 20.0 | Lung Cancer Screening: Is it right for me? (…; Prostate cancer screening: Should you get a…; Taking a medicine to reduce the chance of de… |
| 13 | [Contrast agents and surgical dyes](#imaging-contrast-dyes) | Medicines | 12 | [Drugs@FDA data files: contrast agents and diagnostic dyes b…](https://www.fda.gov/media/89850/download) (+3) | 9/43 (20.9%) | 19.8 | Isosulfan blue (Lymphazurin); Patent blue V; Gadoxetate disodium (Eovist / Primovist, liv… |
| 14 | [Cancer-preventing vaccines](#preventive-vaccines) | Medicines | 4 | [WHO list of prequalified vaccines, CSV export](https://extranet.who.int/prequal/vaccines/prequalified/export?page&_format=csv) (+2) | 4/19 (21.1%) | 19.7 | Engerix-B (hepatitis B vaccine, recombinant); Recombivax HB / HBVaxPro (hepatitis B vaccin…; Heplisav-B (hepatitis B vaccine, recombinant… |
| 15 | [Particle therapy and radiotherapy facilities](#radiotherapy-facilities) | Organisations and people | 65 | [PTCOG: Facilities in clinical operation](https://ptcog.online/facilities-in-clinical-operation/) (+2) | 1/52 (1.9%) | 19.64 | St. Jude Proton Therapy Center; Cincinnati Children's Proton Therapy Center; MD Anderson Cancer Center - Proton Therapy |
| 16 | [Helplines](#helplines) | Patient resources | 15 | [International Cancer Information Service Group (ICISG): Lis…](https://icisg.org/membership/membership-list/) (+2) | 15/67 (22.4%) | 19.4 | Cancer Society of New Zealand Cancer Informa…; Japan: Cancer Information Service Support Ce…; AECC Infocáncer (Spain) |
| 17 | [Stem cell donor registries and cord blood banks](#donor-registries) | Organisations and people | 1 | [WMDA 'Find your registry' map (member registries, cord bloo…](https://wmda.info/find-your-registry/) | 4/116 (3.4%) | 19.32 | World Marrow Donor Association (WMDA); NMDP; DKMS (DKMS Registry gGmbH and DKMS donor cen… |
| 18 | [Vascular access devices](#vascular-access-devices) | Machines and devices | 3 | [openFDA classification (access codes)](https://api.fda.gov/device/classification.json?search=device_name:"port"&limit=100) (+3) | families 5/14 (35.7%); products 2/37 (5.4%) | 19.1 | Non-coring (Huber) needles for port access; Catheter lock solutions (taurolidine-heparin); Sherlock 3CG Tip Confirmation System |
| 19 | [Vaccination programmes](#vaccination-programmes) | Prevention and risk | 3 | [WHO immunization data portal (WIISE): Introduction of HPV (…](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus)-vaccine) (+2) | 10/162 (6.2%) | 18.76 | National HPV vaccination programme: Brazil; National HPV vaccination programme: Nigeria; National HPV vaccination programme: Indonesia |
| 20 | [Laws and policies](#laws-policies) | Places and health systems | 51 | [ESMO Open 2025 review, Table 1: countries implementing a ri…](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) (+3) | 4/49 (8.2%) | 18.36 | Belgium: right-to-be-forgotten law for cance…; Luxembourg: right-to-be-forgotten law for ca…; The Netherlands: right-to-be-forgotten law f… |
| 21 | [Countries](#countries) | Places and health systems | 18 | [GLOBOCAN 2024 (IARC Global Cancer Observatory, Cancer Today…](https://gco.iarc.who.int/today) | 18/186 (9.7%) | 18.08 | Indonesia (country page); Türkiye (country page); Poland (country page) |
| 22 | [Response criteria](#response-criteria) | Disease | 8 | [CDISC SDTM Oncology Response Assessment codelist (NCIt C124…](https://api-evsrest.nci.nih.gov/api/v1/subset/ncit/C124298/members?fromRecord=0&pageSize=1000&include=minimal,synonyms,definitions) (+1) | 9/88 (10.2%) | 17.96 | IMWG response criteria (2016, including MRD); IWG 2023 response criteria for higher-risk M…; iwCLL 2018 response criteria |
| 23 | [Ostomy products](#ostomy-products) | Machines and devices | 2 | [openFDA device classification: ostomy, colostomy, ileostomy…](https://api.fda.gov/device/classification.json?search=device_name:ostomy&limit=1000) (+3) | 4/14 (28.6%) | 17.85 | Coloplast (ostomy, continence and urology de…; ConvaTec (Esteem, Natura, Sur-Fit, Stomahesi…; Hollister and Dansac (New Image, CeraPlus, M… |
| 24 | [Staging systems](#staging-systems) | Disease | 18 | [AJCC Current Staging System 2026 (8th edition chapters and…](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf) (+2) | 22/75 (29.3%) | 17.7 | FIGO 2023 staging of endometrial cancer; Children's Oncology Group staging of Wilms t…; Staging for Esophagus & Esophagogastric Junc… |
| 25 | [Payers and reimbursement lists](#payers-reimbursement) | Organisations and people | 22 | [CMS Medicare Coverage Database: National Coverage Determina…](https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/) (+1) | 3/24 (12.5%) | 17.52 | Medicare NCD 210.14: Lung Cancer Screening w…; Medicare NCD 220.6.17: Positron Emission Tom…; Medicare NCD 220.4: Mammograms |
| 26 | [Genetic counselling services](#genetic-counselling-services) | Prevention and risk | 3 | [NHS England Genomic Medicine Service structure: seven Genom…](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) (+2) | 1/8 (12.5%) | 17.52 | NSGC Find a Genetic Counselor directory (US…; South East Genomic Laboratory Hub and Genomi…; North West Genomic Laboratory Hub and Genomi… |
| 27 | [Screening tests](#screening-tests) | Tests and diagnostics | 15 | [openFDA PMA records for screening and early-detection produ…](https://api.fda.gov/device/pma.json?search=product_code:MAQ&limit=1000 (same query per code)) (+3) | 15/50 (30.0%) | 17.5 | cobas HPV test (Roche; cobas 4800 and cobas…; BD Onclarity HPV Assay (extended genotyping); Teal Wand at-home self-collection device for… |
| 28 | [Breast prostheses and reconstruction implants](#breast-prostheses-reconstruction) | Machines and devices | 5 | [openFDA device classification, device_name:breast and expan…](https://api.fda.gov/device/classification.json?search=device_name:breast&limit=1000) (+6) | 4/13 (30.8%) | 17.3 | Natrelle silicone-filled breast implants (Al…; Mentor MemoryGel silicone gel-filled breast…; Mastectomy bras and post-mastectomy camisoles |
| 29 | [Screening programmes](#screening-programmes) | Places and health systems | 63 | [IARC CanScreen5 (Cancer Screening in Five Continents) count…](https://canscreen5.iarc.fr/) (+3) | 33/203 (16.3%) | 16.72 | China: national breast cancer screening prog…; China: national cervical cancer screening pr…; Turkey: national breast cancer screening pro… |
| 30 | [Palliative and home devices (pleural catheters, stents)](#palliative-home-devices) | Machines and devices | 11 | [openFDA 510(k): DWM (pleural catheters), PNG (peritoneal dr…](https://api.fda.gov/device/510k.json?search=product_code:PNG&limit=100&skip=0) (+3) | families 8/15 (53.3%); products 2/32 (6.3%) | 16.4 | PeritX peritoneal catheter drainage system; Ureteric stents for malignant ureteric obstr…; Rocket indwelling pleural and peritoneal cat… |
| 31 | [Financial assistance](#financial-assistance) | Patient resources | 78 | [CancerCare, A Helping Hand: The 2026 Resource Guide for Peo…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (+1) | 11/32 (34.4%) | 16.4 | Family Reach; CancerCare A Helping Hand resource database…; Italy: ticket exemption code 048 for cancer |
| 32 | [Margin assessment and intraoperative devices](#margin-intraop-devices) | Machines and devices | 9 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+9) | families 4/17 (23.5%); products 4/23 (17.4%) | 15.8 | Non-wire breast localisation: SAVI SCOUT rad…; Magnetic sentinel node detection: Magtrace a…; Tumour-bed markers: BioZorb |
| 33 | [Haematopathology tests](#haematopathology-tests) | Tests and diagnostics | 9 | [openFDA 510(k)/De Novo/PMA for haematology test product cod…](https://api.fda.gov/device/510k.json?search=product_code:OYX&limit=100) (+4) | 9/42 (21.4%) | 15.72 | Freelite serum free light chain assays (The…; EXENT Analyser: immunoglobulin isotypes (GAM…; ipsogen JAK2 RGQ PCR Kit (QIAGEN) |
| 34 | [HTA bodies](#hta-bodies) | Organisations and people | 12 | [INAHTA members list](https://www.inahta.org/members/members_list/) (+1) | 14/65 (21.5%) | 15.72 | PHARMAC (Pharmaceutical Management Agency, N…; National Centre for Pharmacoeconomics (NCPE)…; Danish Medicines Council (Medicinrådet) |
| 35 | [Repurposed drugs](#repurposed-drugs) | Medicines | 83 | [ReDO_DB (Repurposing Drugs in Oncology database, Anticancer…](https://data.tp53.org.uk/redo_db.txt) | 83/375 (22.1%) | 15.6 | Cimetidine; Disulfiram; Atorvastatin |
| 36 | [Radiotherapy accessories (spacers, fiducials, immobilisation)](#rt-accessories) | Machines and devices | 11 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+4) | families 4/16 (25.0%); products 6/33 (18.2%) | 15.56 | Rectal spacers: Barrigel hyaluronic acid gel; SpaceOAR Vue radiopaque hydrogel spacer; Endorectal immobilisation balloons |
| 37 | [Family, legal, work and bereavement services](#family-legal-work-bereavement) | Patient resources | 2 | [CancerCare A Helping Hand 2026: national organisations tagg…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (+1) | 4/18 (22.2%) | 15.56 | Cancer and Careers; Cancer Legal Resource Center (Disability Rig…; Child Bereavement UK (now including Winston'… |
| 38 | [Lifestyle risk factors](#lifestyle-risk-factors) | Prevention and risk | 36 | [WCRF/AICR Continuous Update Project: Summary of strong evid…](https://www.wcrf.org/wp-content/uploads/2024/10/CUP-Strong-Evidence-Matrix.pdf) (+2) | 13/34 (38.2%) | 15.45 | European Code Against Cancer, 5th edition (E…; Breastfeeding (lactation) and lower breast c…; E-cigarettes and vaping products |
| 39 | [Regulators](#regulators) | Organisations and people | 18 | [ICH Members and Observers (regulatory members and legislati…](https://admin.ich.org/page/members-observers) (+3) | 18/78 (23.1%) | 15.4 | Health Sciences Authority (HSA), Singapore; Israel Ministry of Health Pharmaceutical Adm…; Swedish Medical Products Agency (Läkemedelsv… |
| 40 | [Oncological emergencies and cancer-associated conditions](#oncologic-emergencies-conditions) | Disease | 33 | [Checklist assembled from MeSH C04.730 (Paraneoplastic Syndr…](https://id.nlm.nih.gov/mesh/sparql) (+4) | 35/90 (38.9%) | 15.25 | Disseminated intravascular coagulation; Cardiac tamponade; Hypercalcaemia of malignancy |
| 41 | [Guidelines](#guidelines) | Evidence | 112 | [NCCN Guidelines list (all four categories, menu on category…](https://www.nccn.org/guidelines/category_1) (+15) | 152/614 (24.8%) | 15.04 | NCCN Guidelines: Lung Cancer Screening; NCCN Guidelines: Breast Cancer Screening and…; NCCN Guidelines: Prostate Cancer Early Detec… |
| 42 | [Nutrition and feeding devices](#nutrition-feeding-devices) | Machines and devices | 5 | [openFDA 510(k), product codes LZH (enteral pumps), KNT/PIF/…](https://api.fda.gov/device/510k.json?search=product_code:LZH&limit=100&skip=0) (+3) | families 5/12 (41.7%); products 0/18 (0.0%) | 15.0 | Enteral feeding pumps (family); Fortisip Compact Protein (oral nutritional s…; Kabiven three-chamber parenteral nutrition |
| 43 | [Systematic reviews](#systematic-reviews) | Evidence | 16 | [PubMed: "Cochrane Database Syst Rev"[ta] AND neoplasms[mh],…](https://pubmed.ncbi.nlm.nih.gov/?term=%22Cochrane+Database+Syst+Rev%22%5Bta%5D+AND+neoplasms%5Bmh%5D) (+1) | 4/210 (1.9%) | 14.73 | Impact of low-dose computed tomography (LDCT…; Prehabilitation versus no prehabilitation to…; Impact of residual disease as a prognostic f… |
| 44 | [Brachytherapy, seeds and radioembolisation microspheres](#brachytherapy-sources-microspheres) | Machines and devices | 12 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+11) | families 3/17 (17.6%); products 12/30 (40.0%) | 14.68 | Holmium-166 microspheres (QuiremSpheres); Ruthenium-106 eye plaques (BEBIG plaques); TheraSeed palladium-103 seeds (Theragenics) |
| 45 | [Patient-reported outcome and quality-of-life instruments](#proms-qol-instruments) | Procedures, services and measures | 14 | [EORTC Quality of Life Group, list of questionnaires](https://qol.eortc.org/questionnaires/) (+4) | 1/46 (2.2%) | 14.67 | EORTC QLQ-H&N43 (Head & Neck Cancer (update…; EORTC QLQ-C15-PAL (Quality of Life in pallia…; Edmonton Symptom Assessment System - revised… |
| 46 | [Peer support and communities](#peer-support-communities) | Patient resources | 7 | [CancerCare A Helping Hand 2026: national organisations serv…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (+1) | 11/41 (26.8%) | 14.64 | Cancer Hope Network (one-to-one peer mentori…; Stupid Cancer (young adult community); Smart Patients (online community) |
| 47 | [Wigs and cranial prostheses](#wigs-cranial-prostheses) | Machines and devices | 9 | [openFDA device classification, device_name: hair, wig, cran…](https://api.fda.gov/device/classification.json?search=device_name:hair&limit=1000) (+6) | 5/12 (41.7%) | 14.6 | Massachusetts scalp hair prosthesis mandate…; UK VAT exemption on wigs and hairpieces for…; Locks of Love |
| 48 | [Infusion pumps and syringe drivers](#infusion-pumps) | Machines and devices | 1 | [openFDA device classification (product codes for infusion p…](https://api.fda.gov/device/classification.json?search=device_name:"pump, infusion"&limit=100) (+2) | families 3/9 (33.3%); products 4/22 (18.2%) | 14.56 | CADD-Solis Ambulatory Infusion Pump; Intera 3000 Hepatic Artery Infusion Pump (fo…; Patient-controlled analgesia (PCA) pumps |
| 49 | [Biosimilars](#biosimilars) | Medicines | 25 | [FDA Purple Book monthly data download, October 2026 (full p…](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) (+2) | 25/91 (27.5%) | 14.48 | Jobevne (bevacizumab biosimilar); Zimrixby (rituximab biosimilar); Alymsys (bevacizumab biosimilar) |
| 50 | [Accreditation programmes and certified centres](#accreditation-programmes) | Organisations and people | 5 | [Programme list assembled for this census (18 programmes) fr…](https://www.facs.org/quality-programs/cancer-programs/commission-on-cancer/) (+4) | 5/18 (27.8%) | 14.44 | National Accreditation Program for Breast Ce…; Commission on Cancer (CoC) accreditation; EURACAN (European Reference Network for rare… |
| 51 | [Embolisation devices](#embolisation-devices) | Machines and devices | 5 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+9) | families 0/11 (0.0%); products 2/17 (11.8%) | 14.28 | Drug-eluting beads: DC Bead / LC Bead (Bosto…; Oncozene drug-loadable microspheres (Varian); QuadraSphere / HepaSphere microspheres (Meri… |
| 52 | [Charities and foundations](#charities-foundations) | Organisations and people | 46 | [Association of European Cancer Leagues (ECL) members](https://www.cancer.eu/members/) (+2) | 10/35 (28.6%) | 14.28 | Italian League Against Cancer; Danish Cancer Society; Foundation Against Cancer Belgium |
| 53 | [ESMO-MCBS scorecards](#esmo-mcbs-scorecards) | Evidence | 91 | [ESMO-MCBS Scorecards for solid tumours: JSON data file behi…](https://dam.esmo.org/raw/upload/v1792653376/untitled_content_item_66b19ca.json) (+1) | 31/547 (5.7%) | 14.13 | ESMO-MCBS v2.0 scorecard 570: Trastuzumab de…; ESMO-MCBS v2.0 scorecard 539: Durvalumab (MA…; ESMO-MCBS v2.0 scorecard 465: Durvalumab (AE… |
| 54 | [Carcinogens (IARC)](#carcinogens) | Prevention and risk | 52 | [IARC Monographs: List of Classifications (agents classified…](https://monographs.iarc.who.int/list-of-classifications/) | 40/135 (29.6%) | 14.08 | Hydrochlorothiazide; Estrogen-progestogen menopausal therapy (com…; Hepatitis D virus (HDV) |
| 55 | [Actionable biomarkers](#biomarkers-actionable) | Biology and models | 102 | [FDA Table of Pharmacogenomic Biomarkers in Drug Labeling (c…](https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling) (+4) | 146/333 (43.8%) | 14.05 | G6PD deficiency; FGFR1 rearrangement; FIP1L1::PDGFRA fusion |
| 56 | [Drug shortages](#drug-shortages) | Medicines | 11 | [openFDA drug shortages endpoint (FDA Drug Shortages Databas…](https://api.fda.gov/drug/shortages.json?search=therapeutic_category:%22Oncology%22&limit=1000) (+2) | 6/20 (30.0%) | 14.0 | Pentostatin (Nipent) shortage, recovery not…; Ifosfamide shortage (US from June 2026; EU f…; Cyclophosphamide injection shortage in the E… |
| 57 | [Biopsy systems](#biopsy-systems) | Machines and devices | 4 | [openFDA 510(k), product code KNW 'Instrument, Biopsy' (21 C…](https://api.fda.gov/device/510k.json?search=product_code:KNW+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+5) | families 7/17 (41.2%); products 4/30 (13.3%) | 14.0 | Stereotactic and tomosynthesis-guided breast…; Teal Wand at-home vaginal self-collection de…; MRI-ultrasound fusion prostate biopsy systems |
| 58 | [Lymphoedema devices](#lymphoedema-devices) | Machines and devices | 4 | [openFDA 510(k), product code JOW (Sleeve, Limb, Compressibl…](https://api.fda.gov/device/510k.json?search=product_code:JOW&limit=100&skip=0) (+1) | families 4/8 (50.0%); products 0/11 (0.0%) | 14.0 | Advanced pneumatic compression devices for l…; Tactile Medical Flexitouch Plus; ImpediMed SOZO bioimpedance spectroscopy |
| 59 | [Named regimens](#regimens) | Medicines | 141 | [BC Cancer chemotherapy protocol index (all tumour-group pag…](https://www.bccancer.bc.ca/health-professionals/clinical-resources/chemotherapy-protocols) (+3) | 72/233 (30.9%) | 13.84 | Nivolumab + cabozantinib (renal cell carcino…; AC followed by paclitaxel and trastuzumab (A…; Tucatinib + trastuzumab + capecitabine |
| 60 | [Digital therapeutics and remote monitoring](#digital-therapeutics-remote-monitoring) | Machines and devices | 4 | [BfArM DiGA directory](https://diga.bfarm.de/de/verzeichnis) (+5) | families 2/6 (33.3%); products 2/7 (28.6%) | 13.72 | Cureety TechCare (telemonitoring of adults o…; Resilience PRO (remote symptom monitoring, l…; PINK! Coach (breast cancer DiGA) |
| 61 | [National cancer control plans](#national-cancer-plans) | Places and health systems | 14 | [ICCP portal (International Cancer Control Partnership, UICC…](https://www.iccp-portal.org/api/map-data) (+1) | 13/140 (9.3%) | 13.62 | Fifth Comprehensive Cancer Control Plan (202…; The Dutch Cancer Agenda / De Nederlandse Kan…; Rencana Kanker Nasional 2024 - 2034 (Indones… |
| 62 | [Neuro-oncology devices](#neuro-oncology-devices) | Machines and devices | 7 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+3) | families 1/13 (7.7%); products 1/8 (12.5%) | 13.56 | Convection-enhanced delivery cannula: SmartF…; Minimally invasive brain access ports: NICO…; 5-ALA microscope filters: Leica FL400 (De No… |
| 63 | [Treatment side effects (CTCAE)](#adverse-events) | Disease | 90 | [NCI CTCAE v6.0 (2025), Clean Copy sheet](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v6.0.xlsx) (+2) | 36/78 (46.2%) | 13.45 | Suicidal ideation; Hyponatraemia (low sodium); Hypomagnesaemia (low magnesium) |
| 64 | [Travel and lodging](#travel-lodging) | Patient resources | 6 | [CancerCare, A Helping Hand 2026: national organisations tag…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (+2) | 5/15 (33.3%) | 13.32 | Healthcare Hospitality Network; Joe's House; Air Charity Network |
| 65 | [Diagnostic radiopharmaceuticals and PET tracers](#diagnostic-radiopharmaceuticals) | Medicines | 20 | [WHO ATC index V09 (diagnostic radiopharmaceuticals), level 5](https://atcddd.fhi.no/atc_ddd_index/?code=V09&showdescription=no) (+3) | 17/50 (34.0%) | 13.2 | Sodium fluoride F-18 (NaF PET bone imaging); Technetium Tc-99m medronate (MDP bone scan a…; Technetium Tc-99m oxidronate (HDP) |
| 66 | [Liquid biopsy ctDNA genotyping](#liquid-biopsy-ctdna) | Tests and diagnostics | 6 | [openFDA PMA product code PQP (plasma devices) and 510(k)/De…](https://api.fda.gov/device/510k.json?search=product_code:SBY&limit=100) (+3) | 8/23 (34.8%) | 13.04 | Tempus xF (liquid biopsy panel); Caris Detect (multi-cancer early detection b…; Caris Assure |
| 67 | [Prosthetics after cancer surgery](#prosthetics-orthotics) | Machines and devices | 9 | [openFDA device classification for laryngeal, larynx, heat a…](https://api.fda.gov/device/classification.json?search=device_name:penile&limit=1000) (+4) | 8/23 (34.8%) | 13.04 | Heat and moisture exchangers, laryngectomy t…; Provox voice prosthesis system (Atos Medical…; Penile prostheses (inflatable and malleable)… |
| 68 | [Occupational exposures](#occupational-exposures) | Prevention and risk | 2 | [Loomis D, Guha N, Hall AL, Straif K. Identifying occupation…](https://doi.org/10.1136/oemed-2017-104944) (+1) | 10/74 (13.5%) | 12.99 | Firefighter (occupational exposure as a); Engine exhaust, diesel; Painter (occupational exposure as a) |
| 69 | [Pharmacogenomic tests](#pharmacogenomic-tests) | Tests and diagnostics | 4 | [CPIC API: guidelines and gene-drug pair view](https://api.cpicpgx.org/v1/pair_view?select=*) (+3) | 12/34 (35.3%) | 12.96 | CYP2D6 and opioids for cancer pain (codeine,…; CYP2D6 and 5-HT3 antiemetics (ondansetron, t…; HLA-B*58:01 and allopurinol (tumour lysis pr… |
| 70 | [MRI and CT scanners](#mri-ct-scanners) | Machines and devices | 15 | [openFDA 510(k), product code LNH 'System, Nuclear Magnetic…](https://api.fda.gov/device/510k.json?search=product_code:LNH+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+5) | families 13/23 (56.5%); products 5/146 (3.4%) | 12.96 | CT-guided needle-insertion robots and percut…; MR simulation and MR-only radiotherapy plann…; Photonova Spectra CT (GE HealthCare) |
| 71 | [Cancer types and subtypes](#cancer-types-subtypes) | Disease | 474 | [OncoTree (MSKCC), latest stable release 2025-10-03](https://oncotree.mskcc.org/api/tumorTypes) (+3) | 403/837 (48.1%) | 12.95 | Well-Differentiated Neuroendocrine Tumor of…; Solitary Plasmacytoma of Bone; Uterine Dedifferentiated Carcinoma |
| 72 | [Surgical robots and navigation](#surgical-robots-navigation) | Machines and devices | 8 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+7) | families 7/17 (41.2%); products 11/38 (28.9%) | 12.76 | ClearPoint MRI-guided stereotactic system; da Vinci SP single-port system; superDimension electromagnetic navigation br… |
| 73 | [HTA appraisals](#hta-reports) | Evidence | 649 | [NICE technology appraisals on the 27 cancer topic product l…](https://www.nice.org.uk/guidance/conditions-and-diseases/cancer) (+5) | 331/851 (38.9%) | 12.2 | NICE TA1202: Trastuzumab deruxtecan for trea…; NICE TA1195: Daratumumab with bortezomib, le…; NICE TA1145: Pembrolizumab for neoadjuvant a… |
| 74 | [Supportive-care medicines](#supportive-care-drugs) | Medicines | 62 | [WHO ATC/DDD Index 2026, union of A04AA, A04AD, L03AA, B03XA…](https://atcddd.fhi.no/atc_ddd_index/?code=V03AF&showdescription=no) (+3) | 33/64 (51.6%) | 12.1 | Dalteparin; Enoxaparin; Benzydamine mouthwash |
| 75 | [Papers](#papers) | Evidence | 2728 | [OpenAlex: 100 most-cited works, primary topic subfield Onco…](https://api.openalex.org/works?filter=primary_topic.subfield.id:subfields/2730&sort=cited_by_count:desc&per-page=100) (+1) | 89/454 (19.6%) | 12.06 | Vepdegestrant, a PROTAC Estrogen Receptor De…; Adjuvant Pembrolizumab versus Observation in…; Asciminib in Newly Diagnosed Chronic Myeloid… |
| 76 | [Research funders](#research-funders) | Organisations and people | 47 | [International Cancer Research Partnership (ICRP): partners…](https://www.icrpartnership.org/partners) (+1) | 37/184 (20.1%) | 11.97 | World Cancer Research Fund International (WC…; Congressionally Directed Medical Research Pr…; American Institute for Cancer Research (AICR) |
| 77 | [Cancer statistics sources](#cancer-statistics-sources) | Places and health systems | 12 | [Curated list of 58 cancer statistics resources: IARC and in…](https://gco.iarc.who.int/today) | 12/58 (20.7%) | 11.91 | Cancer Incidence in Five Continents (CI5, IA…; ECIS: European Cancer Information System (JR…; International Incidence of Childhood Cancer… |
| 78 | [Ablation systems](#ablation-systems) | Machines and devices | 21 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+8) | families 9/25 (36.0%); products 19/40 (47.5%) | 11.88 | Bone tumour radiofrequency ablation: OsteoCo…; Endoscopic radiofrequency ablation for Barre…; Sonablate prostate HIFU |
| 79 | [Cooperative groups and trial networks](#cooperative-groups-networks) | Evidence | 63 | [NCI NCTN network groups](https://www.cancer.gov/research/infrastructure/clinical-trials/nctn) (+9) | 23/110 (20.9%) | 11.88 | European Network of Gynaecological Oncologic…; NCI National Clinical Trials Network (NCTN); NCI Community Oncology Research Program (NCO… |
| 80 | [Drug-access schemes](#drug-access-schemes) | Places and health systems | 6 | [Curated list: the assignment's named schemes plus national…](https://www.ebi.ac.uk/europepmc/webservices/rest/search) | 13/32 (40.6%) | 11.88 | Special Access Program (SAP) for drugs, Heal…; Special Access Scheme (SAS), Therapeutic Goo…; Arzneimittel-Härtefallprogramme (compassiona… |
| 81 | [Screening recommendations](#screening-recommendations) | Prevention and risk | 29 | [USPSTF recommendation topics, category Cancer (published)](https://www.uspreventiveservicestaskforce.org/uspstf/topic_search_results?topic_status=P&category%5B%5D=15) (+3) | 18/34 (52.9%) | 11.75 | EU-level screening parameters for bowel (FIT…; USPSTF: BRCA-Related Cancer: Risk Assessment…; EU Council Recommendation on strengthening p… |
| 82 | [Professional societies](#professional-societies) | Organisations and people | 33 | [European Cancer Organisation: Our Member Societies](https://www.europeancancer.org/members.html) (+1) | 9/40 (22.5%) | 11.64 | European Association for Palliative Care (EA…; European Oncology Nursing Society (EONS); Oncology Nursing Society (ONS) |
| 83 | [Breast imaging and lesion localisation devices](#breast-imaging-localisation) | Machines and devices | 6 | [openFDA 510(k) + PMA, product code MUE 'Full Field Digital,…](https://api.fda.gov/device/510k.json?search=product_code:MUE&limit=1000) (+5) | families 10/20 (50.0%); products 14/45 (31.1%) | 11.52 | Automated breast ultrasound (ABUS); Breast lesion localisation devices (wire, ra…; Breast ultrasound tomography (SoftVue) |
| 84 | [Grading and histological scores](#grading-histologic-scores) | Disease | 24 | [Checklist: the 18 grading and regression systems named in t…](https://api.crossref.org/works) | 25/58 (43.1%) | 11.36 | IASLC grading of invasive non-mucinous lung…; Two-tier (low-grade versus high-grade) gradi…; Chemotherapy response score (CRS) for tubo-o… |
| 85 | [Serum tumour markers](#serum-tumour-markers) | Tests and diagnostics | 21 | [openFDA device classification, regulations 866.6010 to 866.…](https://api.fda.gov/device/classification.json?search=regulation_number:866.60*&limit=100) (+1) | 21/38 (55.3%) | 11.2 | Des-gamma-carboxy prothrombin (DCP, PIVKA-II); Free PSA (percent free PSA) assays; AFP-L3% (lens culinaris agglutinin-reactive… |
| 86 | [Tumour profiling (NGS) panels](#tumour-profiling-panels) | Tests and diagnostics | 20 | [openFDA device 510(k)/De Novo, product code PZM (Next Gener…](https://api.fda.gov/device/510k.json?search=product_code:PZM&limit=100) (+4) | 15/34 (44.1%) | 11.16 | MSK-IMPACT (Integrated Mutation Profiling of…; ThyroSeq v3 Genomic Classifier; Guardant360 TissueNext (Guardant360 Tissue) |
| 87 | [Trial finders and second-opinion services](#trial-finders-second-opinion) | Patient resources | 39 | [WHO ICTRP: Primary registries in the WHO Registry Network](https://www.who.int/tools/clinical-trials-registry-platform/network/primary-registries) (+2) | 8/18 (44.4%) | 11.12 | NCI clinical trials search (Find Cancer Clin…; Australian Cancer Trials; German Clinical Trials Register (DRKS) |
| 88 | [Therapeutic radiopharmaceuticals](#radiopharmaceuticals-therapeutic) | Medicines | 27 | [WHO ATC index V10 (therapeutic radiopharmaceuticals), level…](https://atcddd.fhi.no/atc_ddd_index/?code=V10&showdescription=no) (+3) | 13/29 (44.8%) | 11.04 | Bravnetsa (lutetium Lu 177 dotatate, Lantheu…; Bexlutry (lutetium Lu 177 dotatate, Curium); Lutetium (177Lu) rosopatamab tetraxetan (177… |
| 89 | [Rare cancers](#rare-cancers) | Disease | 105 | [Orphanet classification of rare neoplastic diseases (Orphad…](https://www.orphadata.com/data/xml/en_product3_202.xml) (+3) | 36/80 (45.0%) sampled | 11.0 | SMARCA4-deficient sarcoma of thorax; Primary bone lymphoma; Pure squamous carcinoma of the urothelial tr… |
| 90 | [Clinical oncology software](#clinical-software) | Software and data | 79 | [ONC Certified Health IT Product List (CHPL), criterion 170.…](https://chpl.healthit.gov/rest/download/active?format=csv) (+4) | 19/62 (30.6%) | 10.41 | eviQ (Cancer Institute NSW cancer treatment…; NCCN Chemotherapy Order Templates; OncoLens |
| 91 | [Clinical trials](#trials) | Evidence | 6495 | [ClinicalTrials.gov API v2: phase 3 interventional studies,…](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA[Phase]PHASE3 AND AREA[StudyType]INTERVENTIONAL) (+3) | 166/283 (58.7%) | 10.3 | BR31: Double Blind Placebo Controlled Contro…; NSABP-B-49: Docetaxel and Cyclophosphamide C…; RTOG-0924: Androgen-Deprivation Therapy and… |
| 92 | [Veterinary and comparative oncology](#veterinary-comparative) | Biology and models | 2 | [FDA Consumer Update 'My Dog Has Cancer: What Do I Need to K…](https://www.fda.gov/consumers/consumer-updates/my-dog-has-cancer-what-do-i-need-know) (+4) | 0/4 (0.0%) | 10.0 | Palladia (toceranib phosphate); Stelfonta (tigilanol tiglate injection); Tanovea (rabacfosadine for injection) |
| 93 | [Chemoprevention and risk-reducing surgery](#chemoprevention-risk-reducing) | Prevention and risk | 9 | [USPSTF: Breast Cancer: Medication Use to Reduce Risk (grade…](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-medications-for-risk-reduction) (+7) | 7/14 (50.0%) | 10.0 | Exemestane for breast cancer risk reduction…; Oral contraceptive pill and ovarian cancer r…; 5-alpha-reductase inhibitors (finasteride, d… |
| 94 | [Prevention programmes (smoking, sun, alcohol)](#prevention-programmes) | Prevention and risk | 6 | [European Code Against Cancer, 5th edition: 14 policy recomm…](https://cancer-code-europe.iarc.who.int/) (+1) | 7/14 (50.0%) | 10.0 | Smoke-free legislation (indoor workplaces, p…; Egypt's national hepatitis C elimination pro…; Telephone quitlines (US national portal 1-80… |
| 95 | [Biobanks](#biobanks) | Software and data | 4 | [BBMRI-ERIC Directory (MOLGENIS EMX2 GraphQL): Biobanks and…](https://directory.bbmri-eric.eu/ERIC/graphql) (+1) | 1/186 (0.5%) | 9.94 | BBMRI-ERIC (European biobanking research inf…; NCI Cooperative Human Tissue Network (CHTN); Biobank Graz |
| 96 | [Imaging datasets](#imaging-datasets) | Software and data | 6 | [TCIA NBIA public collection list (getCollectionValues)](https://services.cancerimagingarchive.net/nbia-api/services/v1/getCollectionValues) (+3) | 2/99 (2.0%) | 9.8 | CBIS-DDSM; Breast-Cancer-Screening-DBT; Duke-Breast-Cancer-MRI |
| 97 | [Ultrasound, optical and photoacoustic imaging](#ultrasound-optical-photoacoustic) | Machines and devices | 9 | [openFDA 510(k), product code OWN 'Confocal Optical Imaging'…](https://api.fda.gov/device/510k.json?search=product_code:OWN+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+7) | families 11/22 (50.0%); products 18/34 (52.9%) | 9.76 | Breast thermography (unproven as a screening…; Photoacoustic (optoacoustic) imaging; Prostate micro-ultrasound |
| 98 | [Machine inventories by country](#machine-density-registries) | Machines and devices | 1 | [OECD Data Explorer, dataflow OECD.ELS.HD DSD_HEALTH_REAC_HO…](https://sdmx.oecd.org/public/rest/data/OECD.ELS.HD,DSD_HEALTH_REAC_HOSP@DF_MED_TECH,1.1/all?startPeriod=2022&format=csvfilewithlabels) (+3) | families 0/3 (0.0%); products 1/14 (7.1%) | 9.72 | IAEA IMAGINE medical imaging and nuclear med…; OECD medical technology availability (CT, MR…; IAEA DIRAC (DIrectory of RAdiotherapy Centre… |
| 99 | [Clinical scores, risk models and nomograms](#clinical-scores-calculators) | Procedures, services and measures | 45 | Named scores in the census brief (35 risk models, prognosti… (+3) | 18/35 (51.4%) | 9.72 | Fleischner Society 2017 guidelines for incid…; CARG chemotherapy toxicity tool for older ad…; Palliative Prognostic Index (PPI) |
| 100 | [Investors](#investors) | Organisations and people | 70 | Internal consistency: investor names in company tldr, summa… (+2) | 6/197 (3.0%) sampled | 9.7 | Lilly Asia Ventures; New Enterprise Associates (NEA); The Column Group |
| 101 | [Grants and funding programmes](#grants-programmes) | Organisations and people | 11 | [ARPA-H Programs (current portfolio page)](https://arpa-h.gov/explore-funding/programs) (+7) | 3/105 (2.9%) | 9.7 | Childhood Cancer Data Initiative (CCDI); NCI Cancer Screening Research Network (CSRN); Vanguard Study (NCI Cancer Screening Researc… |
| 102 | [Cancer registries](#cancer-registries) | Software and data | 11 | [IARC Cancer Incidence in Five Continents Volume XII, Regist…](https://gco.iarc.who.int/media/ci5/data/vol12/Download/CI5-XII.zip) (+1) | 32/460 (7.0%) | 9.3 | Danish Cancer Registry; North American Association of Central Cancer…; European Network of Cancer Registries (ENCR) |
| 103 | [Preprint servers](#preprint-servers) | Evidence | 2 | [Europe PMC: preprint servers carrying cancer-titled preprin…](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=SRC:PPR%20AND%20(TITLE:cancer%20OR%20...)%20AND%20FIRST_PDATE:[2024-01-01%20TO%202026-12-31]) (+1) | 2/23 (8.7%) | 9.14 | Research Square; Preprint (glossary term: what a preprint is…; Preprints.org |
| 104 | [Mutational signatures](#mutational-signatures) | Biology and models | 2 | [COSMIC Mutational Signatures, Version 3.6 (SBS, DBS, ID, CN…](https://cancer.sanger.ac.uk/signatures/) | 15/163 (9.2%) | 9.08 | SBS36; SBS22a; SBS24 |
| 105 | [Patents and exclusivity](#patents-exclusivity) | Medicines | 26 | [FDA Orange Book data files (products.txt, patent.txt, exclu…](https://www.fda.gov/media/76860/download?attachment) (+1) | 6/56 (10.7%) | 8.92 | Olaparib (Lynparza): US patent and exclusivi…; Dasatinib (Sprycel): US patent and exclusivi…; Carfilzomib (Kyprolis): US patent and exclus… |
| 106 | [FDA AI-enabled oncology devices](#ai-devices-fda) | Software and data | 137 | [FDA Artificial Intelligence-Enabled Medical Devices list (C…](https://www.fda.gov/media/178541/download?attachment) (+1) | 83/205 (40.5%) | 8.91 | Koios DS; SKOUT; CADDIE |
| 107 | [PET, SPECT and nuclear medicine scanners](#pet-spect-nuclear-scanners) | Machines and devices | 8 | [openFDA 510(k), product code KPS 'System, Tomography, Compu…](https://api.fda.gov/device/510k.json?search=product_code:KPS+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+5) | families 14/19 (73.7%); products 11/38 (28.9%) | 8.84 | Organ-dedicated PET scanners (brain PET and…; Specimen PET/CT cabinet imagers; uPMR 790 PET/MR |
| 108 | [Endoscopy, capsule and sampling devices](#endoscopy-capsule-sampling) | Machines and devices | 7 | [openFDA 510(k), product code QNP 'Gastrointestinal Lesion S…](https://api.fda.gov/device/510k.json?search=product_code:QNP+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+5) | families 13/22 (59.1%); products 18/35 (51.4%) | 8.8 | Cholangioscopy (single-operator digital chol…; Galaxy robotic bronchoscopy system (Noah Med…; superDimension and ILLUMISITE electromagneti… |
| 109 | [PDX, organoid and animal models](#pdx-organoids-gemms) | Biology and models | 17 | [CancerModels.org models deposited in EMBL-EBI BioStudies (c…](https://www.ebi.ac.uk/biostudies/api/v1/CancerModelsOrg/search) (+2) | 7/57 (12.3%) | 8.76 | Princess Margaret Living Biobank; Center for Patient Derived Models, Dana-Farb…; PIVOT paediatric PDX project (CancerModels.o… |
| 110 | [Conferences and congresses](#conferences) | Evidence | 9 | [Assignment list of major oncology meetings plus 7 additions…](https://www.esmo.org/meeting-calendar) | 9/49 (18.4%) | 8.16 | ESMO Asia Congress; European Lung Cancer Congress; EHA Congress (European Hematology Associatio… |
| 111 | [People](#people) | Organisations and people | 1623 | [Nobel Prize API v2.1, nobelPrizes in Physiology or Medicine…](https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeCategory=med&limit=200&format=json) (+5) | 121/542 (22.3%) | 7.78 | Axel Ullrich; H. Michael Shepard; Nicholas B. Lydon |
| 112 | [Fields, hyperthermia and perfusion devices](#fields-hyperthermia-perfusion) | Machines and devices | 15 | [openFDA device classification (all product codes, used to b…](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (+7) | families 10/19 (52.6%); products 9/12 (75.0%) | 7.68 | Hepatic arterial infusion pumps (Intera 3000…; Electromotive drug administration (EMDA) for…; SynchroMed implanted programmable pump (Medt… |
| 113 | [Precancers and in-situ conditions](#precancers) | Disease | 24 | [NCI Thesaurus 'Precancerous Condition' (C3341) and descenda…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3341/descendants?fromRecord=0&pageSize=5000&maxLevel=10) (+1) | 21/30 (70.0%) | 7.5 | Breast Atypical Ductal Hyperplasia; Endometrial Atypical Hyperplasia/Endometrioi…; Intestinal Metaplasia of Gastric Mucosa |
| 114 | [Anatomical sites and lymph node maps](#anatomy-node-maps) | Disease | 17 | [Node and segment maps named in the census brief, each confi…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=Couinaud&type=contains&include=minimal&pageSize=5) | 2/8 (25.0%) | 7.5 | Neck lymph node levels (I to VII); Axillary lymph node levels I to III; Couinaud liver segments |
| 115 | [Performance status and geriatric assessment](#performance-geriatric) | Procedures, services and measures | 4 | Brief's list (ECOG/WHO, Karnofsky, Lansky, G8, VES-13, CGA,… | 7/14 (50.0%) | 7.5 | Palliative Performance Scale (PPS); Clinical Frailty Scale (Rockwood); Lansky play-performance scale (children) |
| 116 | [Genomic and clinical datasets](#genomic-datasets) | Software and data | 20 | [NCI Genomic Data Commons projects API](https://api.gdc.cancer.gov/projects?size=500&fields=project_id,name,program.name,primary_site,disease_type,summary.case_count&format=json) (+3) | 7/27 (25.9%) | 7.42 | NCI TARGET programme (Therapeutically Applic…; Childhood Cancer Data Initiative Molecular C…; MSK-CHORD (clinicogenomic real-world dataset) |
| 117 | [Supportive procedures](#supportive-procedures) | Procedures, services and measures | 22 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15747 'Su…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15747/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+2) | 19/30 (63.3%) | 7.32 | Ureteric stent; Palliative sedation; Percutaneous nephrostomy |
| 118 | [Residual disease (MRD) tests](#mrd-tests) | Tests and diagnostics | 20 | [CMS MolDX billing article A58376: Minimal Residual Disease…](https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=58376) (+7) | 14/22 (63.6%) | 7.28 | Latitude (Natera tissue-free MRD test); Signatera Genome (whole-genome version of Si…; AVENIO ctDNA Surveillance Kit (Roche) |
| 119 | [Radiotherapy delivery platforms](#rt-delivery-platforms) | Machines and devices | 24 | [openFDA 510(k) IYE, LHN, IWL, JAD since 2018 (systems and a…](https://api.fda.gov/device/510k.json?search=product_code:(IYE+OR+LHN+OR+IWL+OR+JAD)+AND+decision_date:[2018-01-01+TO+2026-12-31]+AND+device_name:(system+OR+accelerator+OR+therapy+OR+radiotherapy+OR+proton+OR+linac+OR+x-ray)&limit=1000) | not measured; rough estimate 16/25 platforms (in scope of af02bea435e62c464) | 7.2 | Elekta Harmony linac; Xstrahl RADiant Aura (superficial / orthovol…; Sensus IORT System |
| 120 | [Cancer centres and hospitals](#cancer-centres-hospitals) | Organisations and people | 485 | [Newsweek World's Best Specialized Hospitals 2026: Oncology](https://rankings.newsweek.com/worlds-best-specialized-hospitals-2026/oncology) (+3) | 209/293 (71.3%) | 7.2 | National Hospital Organization Kyushu Cancer…; Korea Cancer Center Hospital; Istituto Giannina Gaslini |
| 121 | [Protein and multianalyte algorithmic tests (MAAA): lung nodule classifiers, serum proteomic signatures, IHC-algorithm and image-based risk tests (added: not in the assigned list)](#protein-multianalyte-tests) | Tests and diagnostics | 3 | [CMS Advanced Diagnostic Laboratory Tests under the Medicare…](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | 9/17 (52.9%) | 7.05 | Nodify CDT (Biodesix, 7-autoantibody lung no…; Nodify XL2 / BDX-XL2 (Biodesix, plasma prote…; DCISionRT (PreludeDx, DCIS radiotherapy-bene… |
| 122 | [Drug interactions](#drug-interactions) | Medicines | 108 | [Liverpool / Radboud UMC Cancer Drug Interactions checker, '…](https://www.cancer-druginteractions.org/view_all_interactions/new) (+2) | 66/102 (64.7%) | 7.04 | Ponatinib interaction profile; Daraxonrasib interaction profile; Cabazitaxel interaction profile |
| 123 | [Journals](#journals) | Evidence | 261 | [Scimago Journal Rank, Oncology category (2730)](https://www.scimagojr.com/journalrank.php?category=2730&out=xls) (+2) | 62/208 (29.8%) | 7.02 | Frontiers in Oncology; HemaSphere; Cancer Cell International |
| 124 | [Diagnostic and biopsy procedures](#diagnostic-biopsy-procedures) | Procedures, services and measures | 13 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15189 'Bi…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15189/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+2) | 47/71 (66.2%) | 6.76 | Stereotactic breast biopsy; Punch biopsy; Endometrial biopsy (pipelle) |
| 125 | [Knowledge bases and portals](#knowledge-bases) | Software and data | 18 | [Defined list: the 18 resources named in the census brief pl…](https://kmplot.com/analysis/) | 18/55 (32.7%) | 6.74 | Kaplan-Meier Plotter; JAX Clinical Knowledgebase (JAX-CKB, now CKB…; COSMIC Cancer Gene Census |
| 126 | [Oncogenic viruses and microbes](#oncogenic-infections) | Biology and models | 12 | [IARC Monographs List of Classifications (agents classified…](https://monographs.iarc.who.int/list-of-classifications/) (+1) | 12/18 (66.7%) | 6.64 | Hepatitis D virus (HDV); Schistosoma haematobium (infection with); Opisthorchis viverrini (infection with) |
| 127 | [Trial registries](#trial-registries) | Evidence | 2 | [WHO ICTRP: Primary registries in the WHO registry network](https://www.who.int/clinical-trials-registry-platform/network/primary-registries) (+2) | 9/25 (36.0%) | 6.4 | German Clinical Trials Register (DRKS); Brazilian Clinical Trials Registry (ReBec); Pan African Clinical Trial Registry (PACTR) |
| 128 | [Pathology scanners, stainers and AI devices](#pathology-scanners-ai) | Machines and devices | 9 | [openFDA 510(k), product code PSY 'Whole Slide Imaging Syste…](https://api.fda.gov/device/510k.json?search=product_code:PSY+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (+4) | families 9/15 (60.0%); products 24/45 (53.3%) | 6.39 | Digital blood-film and bone-marrow aspirate…; Automated cervical cytology imagers (incl. A…; Liquid-based cytology processors (ThinPrep,… |
| 129 | [AI foundation models](#foundation-models) | Software and data | 78 | [Hugging Face Hub API, model search by name sorted by downlo…](https://huggingface.co/api/models?search=pathology&sort=downloads&direction=-1&limit=100&full=true) (+2) | 26/70 (37.1%) | 6.3 | RAD-DINO (Microsoft); DNABERT-2; PRISM (Paige slide-level foundation model) |
| 130 | [REMS and risk-minimisation programmes](#rems-safety-programmes) | Medicines | 9 | [REMS@FDA approved REMS table](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm) (+2) | 7/12 (58.3%) | 6.24 | Tecvayli and Talvey REMS (teclistamab, talqu…; Elrexfio REMS (elranatamab); UK patient cards for bispecific antibodies (… |
| 131 | [Ontologies and data standards](#ontologies-standards) | Software and data | 19 | [Defined list: the 17 standards named in the census brief pl…](https://icd.who.int/en) (+1) | 19/49 (38.8%) | 6.12 | ICD-11 (Chapter 2, Neoplasms); ClinGen/CGC/VICC oncogenicity standard (Hora…; ESMO Magnitude of Clinical Benefit Scale (ES… |
| 132 | [Medicines approved first or only by other regulators](#other-regulators) | Medicines | 13 | [Health Canada Drug Product Database API](https://health-products.canada.ca/api/drug/activeingredient/?lang=en&type=json&id=2049) (+3) | not measured; rough estimate 39% of 23 hand-picked local-only products | 6.1 | CIMAvax-EGF (Cuba); Racotumomab (Vaxira; Cuba and Argentina); Gendicine (recombinant adenoviral p53; China… |
| 133 | [Cytology and pathology techniques](#cytology-pathology-techniques) | Tests and diagnostics | 15 | [College of American Pathologists, Current Cancer Protocols](https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates) (+2) | 15/25 (60.0%) | 6.0 | Synoptic pathology reporting: CAP cancer pro…; Histochemical special stains (PAS, mucicarmi…; Rapid on-site evaluation (ROSE) of fine-need… |
| 134 | [Cancer cell lines](#cell-lines) | Biology and models | 212 | [Cellosaurus: cell lines with a DepMap cross-reference (API…](https://api.cellosaurus.org/search/cell-line?q=dr%3ADepMap&fields=ac%2Cid%2Cdi%2Ccc%2Cox&rows=3000&format=json) (+2) | 25/61 (41.0%) sampled | 5.9 | MOLT-4; CCRF-CEM; Rh30 |
| 135 | [Imaging examinations](#imaging-examinations) | Tests and diagnostics | 52 | [RadiologyInfo.org (ACR and RSNA) English sitemap, all /en/i…](https://www.radiologyinfo.org/sitemap-en.xml) (+2) | 52/68 (76.5%) | 5.85 | BI-RADS assessment categories on the breast…; Lymphoscintigraphy (sentinel lymph node mapp…; Radiation dose from X-ray and CT examinations |
| 136 | [Open-source projects](#open-source-projects) | Software and data | 379 | [GitHub REST API search/repositories: 83 topic queries (topi…](https://api.github.com/search/repositories) (+6) | 108/253 (42.7%) | 5.72 | NCRF; DeepPATH; TransMIL |
| 137 | [Trial endpoints and designs](#trial-endpoints-designs) | Evidence | 100 | [FDA: Clinical Trial Endpoints for the Approval of Cancer Dr…](https://www.fda.gov/media/71195/download) (+2) | 27/43 (62.8%) | 5.58 | Trial eligibility for people with HIV, hepat…; Core patient-reported outcomes in cancer tri…; Trial eligibility for people with brain meta… |
| 138 | [Government cancer agencies and national institutes](#government-cancer-agencies) | Organisations and people | 30 | [Constructed list of 30 national cancer institutes and agenc…](https://www.ncikenya.go.ke/) (+2) | 22/35 (62.9%) | 5.55 | WHO Global Breast Cancer Initiative (GBCI); WHO Cervical Cancer Elimination Initiative; WHO Global Initiative for Childhood Cancer (… |
| 139 | [Laboratory instruments (sequencers, PCR, flow, spatial)](#lab-instruments) | Machines and devices | 11 | [openFDA device registration and listing, product code PFF '…](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:PFF&limit=100) (+4) | families 14/23 (60.9%); products 32/48 (66.7%) | 5.52 | MALDI-TOF mass spectrometry for M-protein (E…; Serum free light chain assay (Freelite) and…; Capillary electrophoresis and immunotyping a… |
| 140 | [Rehabilitation, prehabilitation and exercise programmes](#rehabilitation-exercise) | Procedures, services and measures | 30 | [Named programmes and services from the brief, checked again…](https://www.prehab4cancer.co.uk/) (+2) | 20/27 (74.1%) | 5.16 | ASCO guideline: Exercise, Diet, and Weight M…; Prehab4Cancer (Greater Manchester prehabilit…; PINC & STEEL cancer rehabilitation programmes |
| 141 | [Surgical procedures](#surgical-procedures) | Procedures, services and measures | 77 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15329 'Su…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15329/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+4) | 143/192 (74.5%) | 5.08 | Nephroureterectomy; Total laryngectomy; Glossectomy |
| 142 | [CDMOs and CROs](#cdmo-cro) | Organisations and people | 62 | [ACRO (Association of Clinical Research Organizations): Curr…](https://www.acrohealth.org/current-members/) (+1) | 15/30 (50.0%) | 5.0 | Novotech; PPD (Thermo Fisher Scientific clinical resea…; Syneos Health |
| 143 | [Deals](#deals) | Organisations and people | 64 | [Life Science Daily: Biotech M&A 2026, every $1B+ deal so fa…](https://lifesciencedaily.news/biotech-ma-2026-every-1b-deal-so-far-and-what-is-driving-them/) (+1) | 6/12 (50.0%) | 5.0 | Merck KGaA acquisition of Silence Therapeuti…; Merck & Co acquisition of Terns Pharmaceutic…; Novartis acquisition of Pikavation Therapeut… |
| 144 | [Prizes and awards](#prizes-awards) | Organisations and people | 0 | [Major cancer-relevant prizes (the brief's 14 plus 16 more),…](https://www.aacr.org/wp-json/wp/v2/award?per_page=100) (+2) | 0/62 (0.0%) | 5.0 | Pezcoller Foundation-American Association fo…; Sjöberg Prize; Szent-Györgyi Prize for Progress in Cancer R… |
| 145 | [Tumour microenvironment and immune cell states](#tme-immune-cells) | Biology and models | 18 | [Census list of 39 TME components and immune cell states, ea…](https://www.ebi.ac.uk/ols4/api/search?ontology=cl) | 20/39 (51.3%) | 4.88 | Tumour-associated neutrophils; Progenitor exhausted CD8 T cells; Lipid-associated macrophage |
| 146 | [Cancer genes and targets](#genes-targets) | Biology and models | 1708 | [OncoKB Cancer Gene List](https://www.oncokb.org/api/v1/utils/cancerGeneList.txt) (+6) | 848/1247 (68.0%) | 4.8 | BCL2L1; ZNF384; CARM1 |
| 147 | [Cell, gene and oncolytic virus therapies](#cell-gene-oncolytic) | Medicines | 107 | [FDA Approved Cellular and Gene Therapy Products (OTP list,…](https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products) (+3) | 26/34 (76.5%) | 4.68 | Teserpaturev (Delytact, oncolytic HSV-1 G47…; Anbalcabtagene autoleucel (Rimqarto, Curocel…; Gendicine (recombinant human p53 adenovirus) |
| 148 | [Investigational agents (pipeline)](#investigational-agents) | Medicines | 1430 | [ClinicalTrials.gov API v2: query.cond=cancer, interventiona…](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA%5BStudyType%5DINTERVENTIONAL%20AND%20AREA%5BPhase%5DPHASE3%20AND%20AREA%5BStartDate%5DRANGE%5B2022-01-01%2C2026-12-31%5D&pageSize=1000) | 731/1055 (69.3%) sampled | 4.62 | BL-M07D1 (HER2 ADC); Famitinib (VEGFR/c-Kit TKI, with camrelizuma…; Rulonilimab (anti-PD-1) |
| 149 | [Hazardous drug handling (CSTDs, compounding robots)](#hazardous-drug-handling) | Machines and devices | 2 | [openFDA 510(k), product code ONB (Closed Antineoplastic And…](https://api.fda.gov/device/510k.json?search=product_code:ONB&limit=100&skip=0) (+3) | families 4/7 (57.1%); products 5/10 (50.0%) | 4.58 | Chemotherapy-tested medical gloves (ASTM D69…; Grifols KIRO compounding robot; Class II biological safety cabinets for cyto… |
| 150 | [Radiotherapy techniques](#rt-techniques) | Procedures, services and measures | 80 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15313 'Ra…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15313/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+4) | 88/113 (77.9%) | 4.4 | Craniospinal irradiation; Vaginal vault (cuff) brachytherapy; Plaque brachytherapy (episcleral, eye) |
| 151 | [Drug classes by mechanism](#mechanism-classes) | Medicines | 155 | [ChEMBL mechanism of action (all records) joined to drug ind…](https://www.ebi.ac.uk/chembl/api/data/mechanism.json) (+2) | 357/504 (70.8%) | 4.38 | Integrin beta-6 (avb6) targeted antibody-dru…; MAGE-A3 cancer vaccines; Kinesin spindle protein (KIF11, Eg5) inhibit… |
| 152 | [Endoscopic procedures](#endoscopic-procedures) | Procedures, services and measures | 21 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C16546 'En…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C16546/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+3) | 51/71 (71.8%) | 4.23 | Argon plasma coagulation; Cholangioscopy (single-operator, SpyGlass); EUS-guided fine-needle biopsy (EUS-FNB) |
| 153 | [Supportive care services](#supportive-care-services) | Procedures, services and measures | 288 | [NCCN Guidelines, Supportive Care category (plus Specific Po…](https://www.nccn.org/guidelines/category_3) (+6) | 46/55 (83.6%) | 4.1 | Delirium in adult cancer patients (ESMO guid…; Hypercalcaemia of malignancy; Paediatric supportive care |
| 154 | [Companion diagnostics](#companion-diagnostics) | Tests and diagnostics | 52 | [FDA List of Cleared or Approved Companion Diagnostic Device…](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) | 52/64 (81.3%) | 3.76 | Signatera CDx; Guardant360 Liquid CDx; KMT2A Breakapart FISH Probe Kit PDx (CDA-LPH… |
| 155 | [IHC and protein assays](#ihc-protein-assays) | Tests and diagnostics | 27 | [FDA List of Cleared or Approved Companion Diagnostic Device…](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) (+2) | 22/27 (81.5%) | 3.72 | VENTANA CONFIRM anti-Estrogen Receptor (SP1)…; Agilent (Dako) ER/PR IHC: ER alpha clone EP1…; ROS1 immunohistochemistry screen (clones D4D… |
| 156 | [Interventional oncology procedures](#interventional-procedures) | Procedures, services and measures | 25 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15230 'Em…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15230/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+6) | 28/37 (75.7%) | 3.63 | Vertebroplasty and kyphoplasty (vertebral au…; Percutaneous ethanol injection (ethanol abla…; Portal vein embolisation |
| 157 | [Apheresis and cell-therapy manufacturing systems](#apheresis-cell-manufacturing) | Machines and devices | 10 | [openFDA device classification: separator, apheresis, freeze…](https://api.fda.gov/device/classification.json?search=device_name:separator&limit=1000) (+3) | 10/13 (76.9%) | 3.45 | Cell washing, concentration and density-sepa…; Cell expansion bioreactors: G-Rex gas-permea…; CliniMACS Plus and the CliniMACS CD34 select… |
| 158 | [Hormonal therapies](#hormonal-therapies) | Medicines | 43 | [WHOCC ATC/DDD Index 2026, L02 Endocrine therapy](https://atcddd.fhi.no/atc_ddd_index/?code=L02&showdescription=no) (+2) | 41/47 (87.2%) | 3.2 | levothyroxine sodium (TSH suppression in dif…; polyestradiol phosphate; methyltestosterone (androgen, secondary ther… |
| 159 | [Paediatric cancers](#paediatric-cancers) | Disease | 44 | [ICCC-3 based on ICD-O-3/IARC 2017 (SEER)](https://seer.cancer.gov/iccc/iccc-iarc-2017.html) (+3) | 82/96 (85.4%) | 2.92 | T-Lymphoblastic Leukemia/Lymphoma; Ganglioglioma; Undifferentiated Embryonal Sarcoma of the Li… |
| 160 | [Transplant and cellular procedures](#transplant-cellular-procedures) | Procedures, services and measures | 51 | [NCI Thesaurus (EVS REST, version 26.10d) subtree C15431 'He…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15431/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (+4) | 29/36 (80.6%) | 2.91 | Bone marrow harvest (donor collection); T-cell-depleted haematopoietic stem cell tra…; Engraftment |
| 161 | [Multi-cancer early detection tests](#mced-tests) | Tests and diagnostics | 36 | [ClinicalTrials.gov API v2, query.term for 'multi-cancer ear…](https://clinicaltrials.gov/api/v2/studies?query.term=%22multi-cancer%20early%20detection%22&pageSize=500&fields=NCTId,BriefTitle,InterventionName,LeadSponsorName,OverallStatus,StartDate) (+1) | 12/14 (85.7%) | 2.88 | miSignal Scan urine microRNA cancer risk tes…; miONCO multi-cancer early detection test (Xg…; DiNanoQ platelet and immune-cell RNA MCED bl… |
| 162 | [Neuropathy, mucositis and skin-toxicity devices](#cipn-mucositis-skin-devices) | Machines and devices | 8 | [openFDA 510(k) name searches (Scrambler, Calmare, Mepitel,…](https://api.fda.gov/device/510k.json?search=device_name:"scrambler"&limit=100&skip=0) (+1) | families 6/7 (85.7%); products 6/7 (85.7%) | 2.88 | Paxman Limb Cryocompression System (PLCS); Mepitel silicone dressing family (Mölnlycke) |
| 163 | [Pathways and gene sets](#pathways-gene-sets) | Biology and models | 109 | [MSigDB Hallmark collection (H)](https://www.gsea-msigdb.org/gsea/msigdb/human/genesets.jsp?collection=H) (+3) | 36/50 (72.0%) | 2.8 | Signaling by Retinoic Acid; Metabolism of folate and pterines; Toll-like Receptor Cascades |
| 164 | [NHS genomic test directory (cancer)](#nhs-genomic-test-directory) | Tests and diagnostics | 45 | [National genomic test directory for cancer non-central nerv…](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-non-central-nervous-system-national-genomic-test-directory-version-16.xlsx) (+3) | 320/371 (86.3%) | 2.76 | Infantile fibrosarcoma; Giant cell tumour of bone; Spitz tumours (Spitzoid melanocytic tumours) |
| 165 | [Companies](#companies) | Organisations and people | 1636 | [ClinicalTrials.gov API v2: industry lead sponsors of active…](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.overallStatus=RECRUITING%2CNOT_YET_RECRUITING%2CACTIVE_NOT_RECRUITING%2CENROLLING_BY_INVITATION&aggFilters=studyType%3Aint%2CfunderType%3Aindustry&fields=NCTId%2CLeadSponsorName%2CLeadSponsorClass%2CPhase%2COverallStatus&pageSize=1000&countTotal=true) (+4) | 349/427 (81.7%) | 2.73 | Coloplast; Hollister; ConvaTec |
| 166 | [China-approved oncology medicines](#nmpa-china) | Medicines | 208 | ['Regulatory approval, reimbursement and postmarketing evide…](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13599998/supplementaryFiles) (+3) | 60/73 (82.2%) | 2.67 | Lisaftoclax (Bcl-2 inhibitor, Ascentage); Zuberitamab (anti-CD20, BioRay); Envonalkib citrate (Chia Tai Tianqing) |
| 167 | [Survivorship and late-effects services](#survivorship-services) | Procedures, services and measures | 88 | [IGHG (International Late Effects of Childhood Cancer Guidel…](https://www.ighg.org/guidelines/topics/) (+3) | 37/42 (88.1%) | 2.4 | Patient-initiated follow-up (PIFU) after can…; Pregnancy and obstetric care after childhood…; American Cancer Society Prostate Cancer Surv… |
| 168 | [Isotope production and radiopharmacy equipment](#isotope-production-radiopharmacy) | Machines and devices | 13 | [openFDA device classification: calibrator, radionuclide, nu…](https://api.fda.gov/device/classification.json?search=device_name:calibrator&limit=1000) (+4) | 13/17 (76.5%) | 2.34 | Ultra-TechneKow V4 technetium Tc-99m generat…; TechneLite technetium Tc-99m generator (now…; Thorium-227 targeted thorium conjugates (Bay… |
| 169 | [Antineoplastic medicines (ATC L01/L02)](#atc-antineoplastics) | Medicines | 336 | [WHOCC ATC/DDD Index 2026, L01 Antineoplastic agents and L02…](https://atcddd.fhi.no/atc_ddd_index/?code=L01&showdescription=no) (+4) | 337/380 (88.7%) | 2.24 | tirabrutinib; aclarubicin; nimustine |
| 170 | [Japan-approved oncology medicines](#pmda-japan) | Medicines | 189 | [PMDA List of Approved Drugs, April 2004 to February 2026 (E…](https://www.pmda.go.jp/files/000281190.pdf) (+3) | 106/113 (93.8%) | 0.93 | Tasurgratinib succinate (Tasfygo); Suratadenoturev (Telomelysin); Valemetostat tosilate (Ezharmia) |
| 171 | [EMA-authorised oncology medicines](#ema-authorised) | Medicines | 502 | [EMA 'Medicines output: medicines report' spreadsheet](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) | 251/252 (99.6%) | 0.08 | peginterferon alfa-2a (Pegasys); narsoplimab (Yartemlea); Zalmoxis (allogeneic T cells genetically mod… |
| 172 | [WHO Essential Medicines (cancer)](#who-eml) | Medicines | 77 | [WHO eEML (list.essentialmeds.org), section 8.2 Antineoplast…](https://list.essentialmeds.org/?section=376) (+3) | 77/77 (100.0%) | 0.0 | Senna; Oxycodone; Methadone |
| 173 | [RNA tests](#rna-tests) | Tests and diagnostics | 12 | [CMS Advanced Diagnostic Laboratory Tests list (2025.3.10 ve…](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) (+2) | not measured (in scope of af543f4cf9a77d918); 12 records | n/a | DecisionDx-Melanoma (Castle Biosciences, 31-…; myPath Melanoma (Myriad, 23-gene diagnostic…; Pathwork Tissue of Origin Test (FDA-cleared… |
| 174 | [Scalp cooling and infusion chairs](#scalp-cooling-infusion-chairs) | Machines and devices | 1 | [openFDA 510(k)/De Novo, product code PMC (scalp cooling)](https://api.fda.gov/device/510k.json?search=product_code:PMC&limit=100&skip=0) (+1) | 7/7 (100.0%) | 0.0 | Infusion and treatment chairs (family); Stryker Symmetry Plus Treatment Recliner; Steelcase Empath recliner |

## Types with no OnCo representation

Eight object types have no OnCo record at all. In several the subject is explained on a concept page, but no instance of the type exists, so a reader looking for one finds nothing to open.

Inside otherwise covered types, these branches are also empty, named nowhere or only in passing: gadolinium MRI agents, iodinated CT contrast other than Lipiodol, ultrasound microbubbles, isosulfan blue and patent blue V; hepatitis B vaccines; cervical screening products (0 of 13 HPV assays, cytology systems, home self-collection and dual stain); ER and PR immunohistochemistry assays (0 of 8); tumour-marker and haematology analysers; lymphoedema compression pumps, PCA pumps and enteral feeding pumps; Huber needles, catheter lock solutions and PICC tip-location devices; nationally listed cancer apps (German DiGA, French telemonitoring); breast implants (none of 9 FDA-approved) and external breast prostheses; ostomy appliances (none of 181 NHS Drug Tariff stoma lines); voice and penile prostheses, artificial urinary sphincters, ocular prostheses and obturators; brachytherapy seed brands; spine robots; fusion prostate biopsy systems (NICE evaluates 9, OnCo names none); assisted-dying statutes; national right-to-be-forgotten laws named by statute (0 of 10); the nine cancer drugs picked for Medicare price negotiation; DoD CDMRP cancer programmes (0 of 9); AACR awards (0 of 21); cord blood banks; BBMRI-ERIC; the NCI TARGET programme; smoke-free laws and the WHO tobacco convention.

- **Hospices and cancer support centres** (`hospices-support-centres`): Support networks (Maggie's, Marie Curie as a charity) have records; no individual hospice or cancer support centre does (0 of 41 Maggie's centres and Marie Curie hospices).
- **Navigation services** (`navigation-services`): No patient-navigation programme, navigator society or payment code has a record; navigation appears in idea, trial and paper records only. Examples missing: Medicare Principal Illness Navigation services, the Academy of Oncology Nurse and Patient Navigators, the American Cancer Society National Navigation Roundtable, McGrath Foundation cancer care nurses.
- **Fertility preservation services** (`fertility-preservation-services`): The technique has a technology record (fertility-preservation), but no oncofertility network, funding scheme or service has one (0 of 6 measured).
- **Psycho-oncology services** (`psycho-oncology-services`): Psycho-oncology is a technology record and Psycho-Oncology a journal record; none of the 28 national psycho-oncology societies in the IPOS federation, and no psycho-oncology service, has a record.
- **Decision aids** (`decision-aids`): None of the 36 cancer decision aids in the Ottawa A to Z inventory is named; idea records propose decision aids but no actual aid has a record.
- **Embolisation devices** (`embolisation-devices`): TACE and TARE have procedure records; no embolic bead, microsphere, balloon-occlusion or portal-vein embolisation device has a record (2 of 17 product lines named in passing).
- **Veterinary and comparative oncology** (`veterinary-comparative`): No veterinary cancer medicine or comparative-oncology programme has a record. None of the four FDA-approved dog cancer drugs (Palladia, Stelfonta, Tanovea, Laverdia) is named as a veterinary product; tigilanol tiglate appears only in the titles of two human trials, and the Comparative Oncology Trials Consortium is named once in an idea record.
- **Prizes and awards** (`prizes-awards`): No prize or award has a record; 9 of 62 prizes are named in passing, none of 21 AACR awards.

## Machines and devices: what the filling branches cover, and what lies outside them

Three branches are filling gaps now. `worktree-agent-af02bea435e62c464` covers radiotherapy delivery platforms (linacs, proton and carbon systems, MR-linacs, Gamma Knife and the like), infusion chairs and scalp cooling. `worktree-agent-af543f4cf9a77d918` covers RNA tests. `worktree-agent-a2b1ed541c1d2d610` covers charities, foundations and other nonprofits from the IRS and Charity Commission registers. The census measured their areas too and tagged those gaps `inScopeOf` rather than leaving them out: about 16 of 25 delivery platforms are named (4 gaps); all 7 FDA scalp-cooling authorisations are already in hair-loss.ts; infusion chairs have no record; RNA tests have 12 records (19 gaps tagged); 66 organisation gaps are tagged for the institutions branch.

Outside those scopes, 31 machine and device types were measured from openFDA classification, 510(k), PMA and De Novo records, NICE guidance, the EU EMDN nomenclature and vendor pages. The device families below have no technology record. Families marked with an asterisk are named somewhere in passing; the rest are named nowhere.

**Imaging.** Organ-dedicated PET (brain, breast) and specimen PET/CT; CT-guided needle robots; low-field and portable MRI; MR and CT simulators* (tagged for the radiotherapy branch); contrast power injectors; bone densitometry (DXA); breast lesion localisation devices* (wire, I-125 seed, magnetic, radar, RFID); biopsy-site markers; automated breast ultrasound; ultrasound tomography; dedicated breast CT and breast PET; molecular breast imaging; micro-ultrasound; photoacoustic imaging; confocal and volumetric laser endomicroscopy; Raman and hyperspectral imaging; oral autofluorescence screening; breast thermography, an unproven test the FDA warns about, which OnCo neither records nor grades.

**Endoscopy and biopsy.** Video endoscopy platforms; capsule-reading AI; cholangioscopy; device-assisted enteroscopy; medical thoracoscopy; hysteroscopy; nasendoscopy; single-use endoscopes; vacuum-assisted, stereotactic and MRI-guided breast biopsy; MRI-ultrasound fusion and robotic transperineal prostate biopsy; powered bone-marrow drivers; transbronchial cryobiopsy; endometrial sampling devices.

**Pathology and laboratory.** Liquid-based cytology processors and automated cervical cytology imagers; digital blood and bone-marrow morphology analysers; slide-QC AI; laser capture microdissection; digital PCR; MALDI-TOF M-protein mass spectrometry; capillary electrophoresis; tumour-marker immunoassay and haematology analysers; optical genome mapping; nucleic-acid extraction automation.

**Treatment.** Holmium-166 microspheres; gynaecological and skin brachytherapy applicators; I-125 seed-loaded stents; balloon brain brachytherapy; electronic brachytherapy*, eye plaques*, P-32 microparticles* and rhenium skin brachytherapy*; endorectal balloons, bolus, implanted dosimeters and intraoral stents; rectal spacers* and immobilisation*; spine, microsurgical and flexible endoluminal robots; robotic MRI-guided biopsy; augmented-reality navigation; magnetic surgical systems; neurosurgical robots* and cranial navigation*; extracorporeal HIFU for solid tumours; percutaneous laser ablation; endoscopic RFA for Barrett's oesophagus and the bile duct; bone tumour RF ablation; argon plasma coagulation; cold atmospheric plasma; bronchoscopic ablation; endoscopic cryotherapy; ablation planning software; breast cryoablation*, body MR-guided focused ultrasound* and TULSA*; isolated hepatic and lung perfusion; electromotive drug administration; intraperitoneal ports; every embolisation device family (drug-eluting, bland, radiopaque and degradable starch microspheres, B-TACE microcatheters, hydrogel and liquid* embolics); Raman margin probes; contrast-ultrasound sentinel node detection; parathyroid autofluorescence; intraoperative nerve monitoring; specimen PET-CT; tumour-bed markers; non-wire breast localisation*; brain access ports; ultrasonic aspirators; brain mapping and neuromonitoring; convection-enhanced delivery*.

**Supportive care and body image.** Lymphoedema pneumatic compression pumps; PCA pumps; implanted hepatic arterial and intrathecal pumps; Huber needles, catheter lock solutions, PICC tip-location and securement devices; enteral feeding pumps; nationally listed cancer apps; ureteric stents* and nephrostomy*; external breast prostheses, mastectomy bras, nipple-areola tattooing and acellular dermal matrices; ostomy appliances; laryngectomy airway devices, voice prostheses and electrolarynxes; vaginal dilators; penile prostheses and artificial urinary sphincters; artificial eyes; maxillofacial obturators; cell washing, expansion and electroporation devices; the two US-marketed Tc-99m generators; thorium-227 supply.

**Machine inventories.** OECD medical-technology availability, IAEA IMAGINE and IAEA DIRAC (machines and radiotherapy centres by country) have no record; only one OnCo country page states an OECD machine figure.

Product-level coverage is low in every machine type because OnCo describes machines as families and names products in their text. Whether individual machines should become records of their own is a product decision for the owner.

## Open-source projects

OnCo's catalogue (src/data/open-source.ts) holds 379 projects, 350 of them on GitHub, plus 35 named skips. Measured against: GitHub topic and keyword searches, 108 of 253 oncology-relevant projects with 100 or more stars (42.7%, from 160 queries, hand-curated); 20 awesome-lists, 61 of 377 (16.2%); Bioconductor 3.23, 9 of 175 cancer packages (5.1%); CRAN, 3 of 88 (3.4%); PyPI, 10 of 220 (4.5%). Pathology is the weakest category (about 34%); imaging, analysis pipelines, radiotherapy and single-cell and spatial tools are at roughly 60 to 68%.

The 98 listed gaps, sorted by stars and downloads, include NCRF, DeepPATH, TransMIL, HEST, IOBR, BayesPrism, EcoTyper, SomaticSeq, nf-core/rnafusion, the cBioPortal datahub, QATrack+, OnkoDICOM, ClairS-TO, DNAcopy, QDNAseq and OncoBayes2. Three skip reasons in `OPEN_SOURCE_SKIPPED` are out of date: Sybil now has an official MIT-licensed repository (reginabarzilaygroup/Sybil) and already has a record; GISTIC2 is MIT-licensed on GitHub (broadinstitute/gistic2); Rcan was skipped only because an offline run had no cached copy and its CRAN page now answers. Not enumerated: projects off GitHub, Hugging Face, open hardware, and repositories with 50 to 99 stars (233 left uncurated).

## Facts in the corpus found wrong or stale while measuring

These are corrections rather than gaps. Items marked (checked) were re-verified by the coordinator against the file and the outside source; the rest are as the measuring agent reported them, with the source in the JSON notes, and should be read at source before editing.

- src/data/hair-loss.ts line 250 says two US states mandate wig cover (New Hampshire and Rhode Island). Massachusetts General Laws chapter 175 section 47T, "Scalp hair prostheses necessary due to cancer or leukemia treatment", is a third (checked on malegislature.gov); a Wigs for Kids summary, as the agent read it, lists seven.

- src/data/rare-subtypes.ts line 22 links NCCN "Vaginal Cancer" to guideline id 1481, which is Hairy Cell Leukemia (checked on nccn.org; Vaginal Cancer is 1521). The agent found seven more links to the wrong guideline in rare-subtypes.ts, spikes/nci-rare-other.ts and spikes/gap-cancers.ts (Small Bowel Adenocarcinoma twice, Systemic Mastocytosis twice, Ampullary Adenocarcinoma, Histiocytic Neoplasms, Kaposi Sarcoma) and two retired ids (1486 in irae.ts, 1503 in gap-fill.ts).

- src/data/side-effect-guidance.ts cites the UKONS 24-hour triage tool PDF, which now returns 404 (checked).

- src/data/ideas-waves/wave-people-moonshots.ts line 26 links the Harold P. Freeman Patient Navigation Institute to hpfreemanpni.org, which now serves a generic health-content site (checked).

- Aliases on the wrong record, which count as covered but send a reader to the wrong page (all checked): `mrc-ctu` carries "Medical Research Council" and "MRC", so the UK funder resolves to a trials unit (it also carries "UCL Innovative Clinical Trials Unit", which UKCRC lists separately); `obstructive-jaundice` carries malignant bowel obstruction, airway obstruction, SVC syndrome and hydronephrosis; `recist` carries RANO, mRECIST and PCWG3; `progressive-disease` carries iRECIST; `barretts-esophagus` carries the bare alias "intestinal metaplasia", which sends a search for the gastric condition to the oesophageal page.

- `pnt2003` says Lantheus's generic lutetium Lu 177 dotatate has tentative FDA approval only (checked in the corpus); the Drugs@FDA data files show ANDA 217060, Bravnetsa, approved on 21 September 2026.

- side-effect-guidance.ts cites CTCAE v5.0; CTEP has published CTCAE v6 (2025) (both checked). staging.ts uses the 8th edition for lung (checked in the corpus), which AJCC has moved to Version 9.

- GDSC (cancerrxgene.org) now returns HTTP 410 Gone (checked); check before any record cites it. RadioGenix is listed as discontinued by FDA. The Breast International Group record reads as if BIG continues; the agent read that BIG will close at the end of 2026, which needs BIG's own notice before an edit.

- floretyrosine-f18 (Pixclara) is FET according to its FDA label, but "FET" appears nowhere in the corpus. 21 drug records lack a Japan approval row and 9 lack a China row although the drug is approved there (listed under `extras.regionRowGaps` for `pmda-japan` and `nmpa-china` in the JSON).

- OnCo's own universe lists: ema-oncology.json misses 7 authorised brands because its filter does not read the blood-cancer headings or ATC V10; uicc-members.json holds only a count, so missing UICC members cannot be named; the G-BA fetcher reads only the first eight register pages, so G-BA coverage is 2025 to 2026 only.

## Cheapest large fills

- **ESMO-MCBS grades**: ESMO publishes all 547 scorecards, with trial registry ids, as one public JSON file; 326 of the ungraded scorecards are for trials OnCo already holds, so grades can be attached by NCT id.

- **Oral anticancer drug sheets**: 443 of the 522 ONS/NCODA/HOPA patient education sheets match an OnCo drug record by name, and none is linked.

- **Tests**: the New York State (Wadsworth Center) register of approved laboratory-developed tests holds 1,498 oncology records and is machine-readable.

- **Health systems**: the ICCP map has a JSON endpoint (/api/map-data), CanScreen5 publishes per-country files, and the EU HTA joint clinical assessment list is a spreadsheet, so national plans, screening programmes and JCAs can be filled from data rather than prose.

- **Machines**: every device family above has FDA product codes; openFDA returns each family's cleared and approved products with identifiers in one query.

## Denominators that could not be read

Of 663 denominators recorded, 543 were read in full, 50 in part, and 70 were blocked, behind a login, rendered only in a browser, or not attempted. Behind a login or licence: WHO Classification of Tumours online, COSMIC Cancer Gene Census, OncoKB variant-level levels, PTCOG facility list, IAEA DIRAC centre names, MolDX test registry, ONC CHPL, the German DiGA API, UKONS acute oncology guidelines; the AJCC site and the Commission on Cancer standards restrict use of their text in AI tools, so only titles were read. Blocked (403, bot checks or timeouts): ICD-O-3.2 at IACR, HemOnc.org, ASHP shortages, Scimago, GCIG members, the ECPC member list, Ontario Health guidelines, cda-amc.ca, asco.org, the NHS England genomic test directory page (taken from an Internet Archive copy of 16 July 2026), DepMap downloads, CDSCO India and CECMED Cuba. Browser-only: India's National Cancer Grid, JACIE and ESMO designated-centre lists, Animal Drugs @ FDA, the Integrated Canine Data Commons. Down: the BIG website, Network of Cancer Genes, the WHO Global Health Observatory API. Not attempted: RARECARE, GeneReviews, the ACR Appropriateness Criteria list, NMPA and PMDA device databases, and most non-English national directories. Each type's notes say which branch these leave unmeasured.

## Using the worklist

Each gap in the JSON carries a suggested record id, the source that proves it exists, an identifier from that source, OnCo's status and an impact rating. Before writing a record: run `npm run dedupe`, prefer supplementing a record that exists, read every identifier from its source rather than from memory, and grade unproven products rather than leaving them out (src/data/complementary.ts is the model).

Adding records to existing kinds is data. Several zero-coverage types have no natural home in today's schema (hospices and support centres, decision aids, prizes, donor registries, assisted-dying and right-to-be-forgotten law), and giving them a page type or section is a product change that waits for the owner (docs/PRODUCT-APPROVAL.md). A sensible order: the corrections above first; then the patient-facing types at the top of the table; then machine families with no record; then the long tail.

## Detail by family

Each gap row: the item as its source names it, an identifier from that source, OnCo's status (MISSING: named nowhere in src/data; MENTION: named in passing, no record), the source that proves it exists, and the agent's impact rating. Gaps tagged *in scope of* another branch are being filled now.

### Disease

#### <a id="cancer-types-subtypes"></a>Cancer types and subtypes (`cancer-types-subtypes`, rank 71)

**OnCo:** 474 (kind cancer in /tmp/gapcensus/all.ndjson (474 records; 421 with parent; groups: haematologic 90, gastrointestinal 77, genitourinary 46, pae…) · **Denominator:** [OncoTree (MSKCC), latest stable release 2025-10-03](https://oncotree.mskcc.org/api/tumorTypes) (897), read · **Denominator:** [WHO Classification of Tumours online (IARC)](https://tumourclassification.iarc.who.int/welcome/), login required · 2 more denominators in the JSON · **Coverage:** 403/837 (48.1%). Every OncoTree tumour type matched to OnCo by (1) exact normalised name/aka match (British and American spellings, ', NOS' and parentheses stripped) against cancer records; (2) order-free token-set m… · **Not enumerated:** WHO Classification of Tumours 5th edition: subscription site (Subscribe/Login), not enumerable.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Well-Differentiated Neuroendocrine Tumor of the Rectum | OncoTree RWDNET; NCIt C96159; UMLS C3272610 | MISSING | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | high |
| Solitary Plasmacytoma of Bone | OncoTree SPB; NCIt C7812; UMLS C0272256 | MISSING | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | high |
| Uterine Dedifferentiated Carcinoma | OncoTree UDDC | MISSING | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | high |

26 more in `gap-census-2026-11.json` (type `cancer-types-subtypes`).

#### <a id="paediatric-cancers"></a>Paediatric cancers (`paediatric-cancers`, rank 159)

**OnCo:** 44 (cancer records with group 'paediatric' (38) or tag 'paediatric' (40); union 44. src/data/paediatric-subtypes.ts and paediatric-fronts.ts ho…) · **Denominator:** [ICCC-3 based on ICD-O-3/IARC 2017 (SEER)](https://seer.cancer.gov/iccc/iccc-iarc-2017.html) (140), read · **Denominator:** [Children's Oncology Group, disease areas ('COG's Research in Childhood Cancers')](https://childrensoncologygroup.org/about/childhood-cancers/) (12), read · 2 more denominators in the JSON · **Coverage:** 82/96 (85.4%). Each diagnostic ICCC-3 leaf category mapped by hand to OnCo cancer records (a leaf is covered when OnCo has a record for the entity or for the category's main entity, e.g. III(c.4) -> atrt, VI(a.1) -… · **Not enumerated:** SIOP Europe disease list: none located.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| T-Lymphoblastic Leukemia/Lymphoma | OncoTree TLL; NCIt C8694 | MENTION | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | high |
| Ganglioglioma | OncoTree GNG; NCIt C3788 | MENTION | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | high |
| Undifferentiated Embryonal Sarcoma of the Liver | OncoTree UESL | MISSING | [oncotree.mskcc.org](https://oncotree.mskcc.org/api/tumorTypes) | medium |

12 more in `gap-census-2026-11.json` (type `paediatric-cancers`).

#### <a id="rare-cancers"></a>Rare cancers (`rare-cancers`, rank 89)

**OnCo:** 105 (cancer records tagged 'rare' (105 of 474). Rare entities also live in untagged records and in the subtypes lists of umbrella records (rare-…) · **Denominator:** [Orphanet classification of rare neoplastic diseases (Orphadata product3 id 202, CC-BY-4.0, file dat…](https://www.orphadata.com/data/xml/en_product3_202.xml) (1125), read · **Denominator:** [NCI MyPART rare tumour types (7 category pages)](https://www.cancer.gov/pediatric-adult-rare-tumor/rare-tumors/) (40), read · 2 more denominators in the JSON · **Coverage:** 36/80 (45.0%) sampled. Seeded random sample (seed 20261104) of 80 of the 626 Orphanet 'Rare tumor' diseases, each adjudicated by hand after an incorpus.py lookup (name, British spelling, parenthesis-free name). Covered = O… · **Not enumerated:** RARECARE/RARECAREnet: not attempted.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| SMARCA4-deficient sarcoma of thorax | ORPHA 466962 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |
| Primary bone lymphoma | ORPHA 314684 | MISSING | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | medium |
| Pure squamous carcinoma of the urothelial tract | ORPHA 695023 | MISSING | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | medium |

15 more in `gap-census-2026-11.json` (type `rare-cancers`).

#### <a id="precancers"></a>Precancers and in-situ conditions (`precancers`, rank 113)

**OnCo:** 24 (Hand count of pages whose subject (name or aka) is a premalignant or in-situ condition, found by checking each entity below with incorpus.p…) · **Denominator:** [NCI Thesaurus 'Precancerous Condition' (C3341) and descendants, EVS REST](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3341/descendants?fromRecord=0&pageSize=5000&maxLevel=10) (479), read · **Denominator:** [Key precancer entities named in the census brief, each confirmed in NCIt or OncoTree](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3341/descendants?fromRecord=0&pageSize=5000&maxLevel=10) (30), read · **Coverage:** 21/30 (70.0%). Each of the 30 key precancers from the brief checked with incorpus.py using hand-written aliases and adjudicated (covered = a page about it, or its name in a record's name/aka). Extended list (42 ent… · **Not enumerated:** WHO/IARC precancer monographs: not fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Breast Atypical Ductal Hyperplasia | NCIt C8436 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3341/descendants?fromRecord=0&pageSize=5000&maxLevel=10) | high |
| Endometrial Atypical Hyperplasia/Endometrioid Intraepithelial Neoplasia | NCIt C27789 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3341/descendants?fromRecord=0&pageSize=5000&maxLevel=10) | high |
| Intestinal Metaplasia of Gastric Mucosa | NCIt C3956 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=intestinal%20metaplasia&type=contains&include=minimal&pageSize=6) | high |

15 more in `gap-census-2026-11.json` (type `precancers`).

#### <a id="hereditary-syndromes"></a>Hereditary cancer syndromes (`hereditary-syndromes`, rank 7)

**OnCo:** 20 (Pages whose subject is a syndrome or germline carrier state: cancer records men1-syndrome, men2-syndrome, multiple-endocrine-neoplasia, her…) · **Denominator:** [Orphanet classification of rare neoplastic diseases, branch 'Inherited cancer-predisposing syndrome…](https://www.orphadata.com/data/xml/en_product3_202.xml) (181), read · **Denominator:** [NHS England National Genomic Test Directory (rare and inherited disease, inherited cancer R-codes)](https://www.england.nhs.uk/publication/national-genomic-test-directories/), blocked: js-only · 1 more denominators in the JSON · **Coverage:** 22/144 (15.3%). Every Disease/Malformation-syndrome entry in the Orphanet branch looked up with incorpus.py; the clinically important ones re-checked with hand-written aliases (hyphenation, 'associated' vs 'related'… · **Not enumerated:** NHS National Genomic Test Directory: JavaScript robot check.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Neurofibromatosis type 1 | ORPHA 636 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |
| MUTYH-related polyposis | ORPHA 247798 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |
| Peutz-Jeghers syndrome | ORPHA 2869 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |
| Hereditary diffuse gastric cancer | ORPHA 26106 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |
| Constitutional mismatch repair deficiency syndrome | ORPHA 252202 | MENTION | [orphadata.com](https://www.orphadata.com/data/xml/en_product3_202.xml) | high |

20 more in `gap-census-2026-11.json` (type `hereditary-syndromes`).

#### <a id="anatomy-node-maps"></a>Anatomical sites and lymph node maps (`anatomy-node-maps`, rank 114)

**OnCo:** 17 (terms with category Anatomy (17: rokitansky-aschoff-sinus, anomalous-pancreaticobiliary-junction, mediastinal-lymph-node-stations, terminal…) · **Denominator:** [Node and segment maps named in the census brief, each confirmed as an NCI Thesaurus concept (EVS RE…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=Couinaud&type=contains&include=minimal&pageSize=5) (8), read · **Coverage:** 2/8 (25.0%). Each map checked with incorpus.py; covered = a term page about it (ICD-O-3 topography, IASLC stations). JGCA gastric station map counted as not covered (only D1/D2 dissection is a term). · **Not enumerated:** JGCA gastric lymph node stations: no machine-readable station list was fetched (EVS search for perigastric stations returned only generic n…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Neck lymph node levels (I to VII) | NCIt C202889 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=Level%20II%20Lymph%20Node&type=contains&include=minimal&pageSize=5) | medium |
| Axillary lymph node levels I to III | NCIt C123461; C123462; C123463 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=Axillary%20Lymph%20Node%20Level&type=contains&include=minimal&pageSize=5) | medium |
| Couinaud liver segments | NCIt C79730 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?term=Couinaud&type=contains&include=minimal&pageSize=5) | medium |

2 more in `gap-census-2026-11.json` (type `anatomy-node-maps`).

#### <a id="oncologic-emergencies-conditions"></a>Oncological emergencies and cancer-associated conditions (`oncologic-emergencies-conditions`, rank 40)

**OnCo:** 33 (Records whose subject is an emergency or cancer-associated condition: term records tumor-lysis-syndrome, lymphoma-tx-tumour-lysis, febrile-…) · **Denominator:** [Checklist assembled from MeSH C04.730 (Paraneoplastic Syndromes subtree, 11 descriptors), NCIt C331…](https://id.nlm.nih.gov/mesh/sparql) (90), read · **Denominator:** [NCI PDQ Cancer Information Summaries: Supportive and Palliative Care](https://www.cancer.gov/publications/pdq/information-summaries/supportive-care) (23), read · 3 more denominators in the JSON · **Coverage:** 35/90 (38.9%). Each checklist item run through incorpus.lookup with its name and aliases; covered = RECORD or IN-RECORD-NAME (a record is about it or names it). Two alias false hits re-checked by full name (PML = g… · **Not enumerated:** UKONS acute oncology guideline topic list: members-only (login required); OnCo's cited triage-tool URL is a 404.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Disseminated intravascular coagulation | MeSH D004211 | MISSING | [id.nlm.nih.gov](https://id.nlm.nih.gov/mesh/D004211.json) | high |
| Cardiac tamponade | MeSH D002305 | MISSING | [id.nlm.nih.gov](https://id.nlm.nih.gov/mesh/D002305.json) | high |
| Hypercalcaemia of malignancy | NCIt C3496 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3496?include=minimal) | high |
| Syndrome of inappropriate antidiuretic hormone (SIADH) | MeSH D007177 | MENTION | [id.nlm.nih.gov](https://id.nlm.nih.gov/mesh/D007177.json) | high |
| Malignant pericardial effusion | NCIt C7717 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C7717?include=minimal) | high |

25 more in `gap-census-2026-11.json` (type `oncologic-emergencies-conditions`).

#### <a id="adverse-events"></a>Treatment side effects (CTCAE) (`adverse-events`, rank 63)

**OnCo:** 90 (Term records with category 'Side effects' (90) in all.ndjson; these are the AE records. Side tables add: side-effect-guidance.ts 64 patient…) · **Denominator:** [NCI CTCAE v6.0 (2025), Clean Copy sheet](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v6.0.xlsx) (850), read · **Denominator:** [NCI CTCAE v5.0 (2017), Clean Copy sheet](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v5.0.xlsx) (837), read · 1 more denominators in the JSON · **Coverage:** 36/78 (46.2%). Defined subset = the 78 distinct CTCAE terms behind the adult PRO-CTCAE item library (the symptomatic side effects patients themselves report). Each run through incorpus with CTCAE wording, PRO-CTCAE… · **Not enumerated:** Drug-label adverse-reaction sections (FDA/EMA) were not enumerated: per-label tables are not machine-readable in one list; the CTCAE and PR…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Suicidal ideation | CTCAE v6.0 term Suicidal ideation; MedDRA 28.0 LLT 10042458 | MISSING | [dctd.cancer.gov](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v6.0.xlsx) | high |
| Hyponatraemia (low sodium) | CTCAE v6.0 term Hyponatremia; MedDRA 28.0 LLT 10021038 | MENTION | [dctd.cancer.gov](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v6.0.xlsx) | high |
| Hypomagnesaemia (low magnesium) | CTCAE v6.0 term Hypomagnesemia; MedDRA 28.0 LLT 10021028 | MENTION | [dctd.cancer.gov](https://dctd.cancer.gov/research/ctep-trials/trial-development/ctcae-v6.0.xlsx) | high |

27 more in `gap-census-2026-11.json` (type `adverse-events`).

#### <a id="staging-systems"></a>Staging systems (`staging-systems`, rank 24)

**OnCo:** 18 (src/data/staging.ts stagingSystems = 18 (nsclc-tnm8, sclc-valg, colorectal-tnm8, breast-tnm8, melanoma-ajcc8, skin-carcinoma-tnm9, cscc-bwh…) · **Denominator:** [AJCC Current Staging System 2026 (8th edition chapters and Version 9 protocols)](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf) (83), read · **Denominator:** [Named staging and prognostic systems checklist (assignment list plus systems in the same families),…](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search) (75), read · 1 more denominators in the JSON · **Coverage:** 22/75 (29.3%). AJCC disease-site chapters: covered when OnCo presents any staging or stage-like risk system for the site (staging.ts entry, a cancer basics.staging list, or a term whose subject is that site's stagi… · **Not enumerated:** UICC TNM 9 contents and FIGO's own staging list were not fetched; AJCC chapters plus the FIGO papers stand in.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| FIGO 2023 staging of endometrial cancer | DOI 10.1002/ijgo.14923; NCIt C206217 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1002/ijgo.14923) | high |
| Children's Oncology Group staging of Wilms tumour | NCIt C7842 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C7842?include=minimal) | high |
| Staging for Esophagus & Esophagogastric Junction (AJCC chapter 16) | AJCC chapter 16; AJCC edition/version 8 | MISSING | [facs.org](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf) | high |
| Staging for Stomach (AJCC chapter 17) | AJCC chapter 17; AJCC edition/version 8 | MISSING | [facs.org](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf) | high |
| Staging for Oral Cavity (AJCC chapter 7) | AJCC chapter 7; AJCC edition/version 8 | MISSING | [facs.org](https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf) | high |

21 more in `gap-census-2026-11.json` (type `staging-systems`).

#### <a id="grading-histologic-scores"></a>Grading and histological scores (`grading-histologic-scores`, rank 84)

**OnCo:** 24 (Records whose subject is a grade or pathology score: terms nottingham-grade, gleason-grade-group, tumour-grade, fnclcc-grade, net-grade-ki6…) · **Denominator:** [Checklist: the 18 grading and regression systems named in the census assignment, extended to 57 wit…](https://api.crossref.org/works) (58), read · **Coverage:** 25/58 (43.1%). incorpus with each system's names and abbreviations; covered = RECORD or IN-RECORD-NAME, plus WHO CNS grade via staging.ts who-cns5-glioma. · **Not enumerated:** A complete registry of grading systems does not exist; the CAP cancer protocols list (type reporting-systems) was readable only as a protoc…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| IASLC grading of invasive non-mucinous lung adenocarcinoma | DOI 10.1016/j.jtho.2020.06.001 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1016/j.jtho.2020.06.001) | high |
| Two-tier (low-grade versus high-grade) grading of ovarian serous carcinoma | DOI 10.1097/00000478-200404000-00009 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1097/00000478-200404000-00009) | high |
| Chemotherapy response score (CRS) for tubo-ovarian high-grade serous carcinoma | DOI 10.1200/jco.2014.60.5212 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1200/jco.2014.60.5212) | high |

23 more in `gap-census-2026-11.json` (type `grading-histologic-scores`).

#### <a id="response-criteria"></a>Response criteria (`response-criteria`, rank 22)

**OnCo:** 8 (Records whose subject is a response criterion: terms recist, deauville-score, deauville, lugano-classification, curie-siopen-score, molecul…) · **Denominator:** [CDISC SDTM Oncology Response Assessment codelist (NCIt C124298) via NCI EVS REST API](https://api-evsrest.nci.nih.gov/api/v1/subset/ncit/C124298/members?fromRecord=0&pageSize=1000&include=minimal,synonyms,definitions) (98), read · **Denominator:** [Assignment list of current response criteria (28, incl. RANO 2.0, LYRIC, IWG 2023, RECIP, PSMA PET…](https://api.crossref.org/works) (28), read · **Coverage:** 9/88 (10.2%). CDISC criteria run through incorpus with the concept name, CDISC synonyms and the family short names readers use (e.g. 'iwCLL 2018', 'PCWG3', 'IMWG 2016'); covered = RECORD or IN-RECORD-NAME. · **Not enumerated:** Disease-specific PET criteria in the CDISC list (Burcombe, Chollet, Petit, Hamaoka, Keam breast; Jacinto, Schwarz cervix; Hartman pancreas;…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| IMWG response criteria (2016, including MRD) | DOI 10.1016/s1470-2045(16)30206-6; NCIt C147478 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1016/s1470-2045(16) | high |
| IWG 2023 response criteria for higher-risk MDS | DOI 10.1182/blood.2022018604 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1182/blood.2022018604) | high |
| iwCLL 2018 response criteria | DOI 10.1182/blood-2017-09-806398; NCIt C178055 | MENTION | [api.crossref.org](https://api.crossref.org/works/10.1182/blood-2017-09-806398) | high |
| RANO-BM (brain metastases response criteria) | DOI 10.1016/s1470-2045(15)70057-4; NCIt C199983 | MENTION | [api.crossref.org](https://api.crossref.org/works/10.1016/s1470-2045(15) | high |
| GCIG CA-125 response and progression definitions | DOI 10.1097/igc.0b013e3182070f17; NCIt C126008 | MENTION | [api.crossref.org](https://api.crossref.org/works/10.1097/igc.0b013e3182070f17) | high |

22 more in `gap-census-2026-11.json` (type `response-criteria`).

#### <a id="reporting-systems"></a>Reporting and data systems (BI-RADS, PI-RADS, Bethesda...) (`reporting-systems`, rank 6)

**OnCo:** 5 (Term records whose subject is a reporting or categorisation system: pi-rads, li-rads, lung-rads, bethesda-category (thyroid), cin-hsil (cer…) · **Denominator:** [ACR Reporting and Data Systems (RADS) hub](https://www.acr.org/clinical-resources/clinical-tools-and-reference/reporting-and-data-systems) (10), read · **Denominator:** [ICCR Index of published datasets](https://www.iccr-cancer.org/datasets/dataset-index/) (70), read · 2 more denominators in the JSON · **Coverage:** 5/34 (14.7%). Each named system run through incorpus with its abbreviation and full name; covered = RECORD or IN-RECORD-NAME. · **Not enumerated:** ACR works in progress (Bone-RADS, Soft Tissue-RADS) and in development (Brain Tumor RADS, KI-RADS) were not counted: ACR states there is in…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| O-RADS | ACR RADS O-RADS | MISSING | [acr.org](https://www.acr.org/clinical-resources/clinical-tools-and-reference/reporting-and-data-systems) | high |
| Bosniak classification of cystic renal masses (version 2019) | DOI 10.1148/radiol.2019182646 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1148/radiol.2019182646) | high |
| Fleischner Society guidelines for incidental pulmonary nodules (2017) | DOI 10.1148/radiol.2017161659 | MISSING | [api.crossref.org](https://api.crossref.org/works/10.1148/radiol.2017161659) | high |
| ICCR cancer reporting datasets | ICCR dataset index | MISSING | [iccr-cancer.org](https://www.iccr-cancer.org/datasets/dataset-index/) | high |
| BI-RADS | ACR RADS BI-RADS | MENTION | [acr.org](https://www.acr.org/clinical-resources/clinical-tools-and-reference/reporting-and-data-systems) | high |

24 more in `gap-census-2026-11.json` (type `reporting-systems`).

### Biology and models

#### <a id="genes-targets"></a>Cancer genes and targets (`genes-targets`, rank 146)

**OnCo:** 1708 (kind target in all.ndjson (1708 records; 1673 with HGNC and Entrez ids; 35 without, of which 14 are composite family records such as brca =…) · **Denominator:** [OncoKB Cancer Gene List](https://www.oncokb.org/api/v1/utils/cancerGeneList.txt) (1247), read · **Denominator:** [OncoKB all curated genes with highest level of evidence](https://www.oncokb.org/api/v1/utils/allCuratedGenes.txt) (1151), read · 5 more denominators in the JSON · **Coverage:** 848/1247 (68.0%). OncoKB Cancer Gene List matched by Entrez id, then symbol, then composite-record member. Sub-measures: COSMIC CGC (v99) flagged genes 556/581 (95.7%); Vogelstein 125/125 (100%); FoundationOne genes 2… · **Not enumerated:** COSMIC Cancer Gene Census full list with tiers and hallmarks: login required (proxied by the OncoKB CGC v99 column).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| BCL2L1 | HGNC HGNC:992; Entrez 598 | MENTION | [oncokb.org](https://www.oncokb.org/api/v1/utils/cancerGeneList.txt) | high |
| ZNF384 | HGNC HGNC:11955; Entrez 171017 | MENTION | [oncokb.org](https://www.oncokb.org/api/v1/utils/cancerGeneList.txt) | high |
| CARM1 | HGNC HGNC:23393; Entrez 10498 | MISSING | [oncokb.org](https://www.oncokb.org/api/v1/utils/cancerGeneList.txt) | medium |

24 more in `gap-census-2026-11.json` (type `genes-targets`).

#### <a id="pathways-gene-sets"></a>Pathways and gene sets (`pathways-gene-sets`, rank 163)

**OnCo:** 109 (kind pathway in all.ndjson (109 records: process pathways from mechanics-pathways.ts and mechanisms.ts, 21 KEGG cancer maps from pathways-k…) · **Denominator:** [MSigDB Hallmark collection (H)](https://www.gsea-msigdb.org/gsea/msigdb/human/genesets.jsp?collection=H) (50), read · **Denominator:** [Reactome human pathways and hierarchy](https://reactome.org/download/current/ReactomePathways.txt) (2889), read · 2 more denominators in the JSON · **Coverage:** 36/50 (72.0%). Headline = MSigDB Hallmark 50 mapped by process to an OnCo pathway record (hand mapping, e.g. HALLMARK_HYPOXIA -> hif-vhl, HALLMARK_E2F_TARGETS -> p53-cell-cycle, HALLMARK_XENOBIOTIC_METABOLISM -> ch… · **Not enumerated:** Reactome full hierarchy (2889 human pathways) was not mapped item by item: no Reactome stable ids appear anywhere in src/data, so matching…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Signaling by Retinoic Acid | Reactome R-HSA-5362517 | MENTION | [reactome.org](https://reactome.org/download/current/ReactomePathways.txt) | high |
| Metabolism of folate and pterines | Reactome R-HSA-196757 | MENTION | [reactome.org](https://reactome.org/download/current/ReactomePathways.txt) | high |
| Toll-like Receptor Cascades | Reactome R-HSA-168898 | MISSING | [reactome.org](https://reactome.org/download/current/ReactomePathways.txt) | medium |

27 more in `gap-census-2026-11.json` (type `pathways-gene-sets`).

#### <a id="biomarkers-actionable"></a>Actionable biomarkers (`biomarkers-actionable`, rank 55)

**OnCo:** 102 (kind biomarker (102 readout records, from biomarker-readouts*.ts; 95 carry a target, 90 list drugs, 53 list FDA companion diagnostics). Rel…) · **Denominator:** [FDA Table of Pharmacogenomic Biomarkers in Drug Labeling (content current as of 08/12/2026)](https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling) (333), read · **Denominator:** [CIViC accepted assertions (GraphQL API)](https://civicdb.org/api/graphql) (164), read · 3 more denominators in the JSON · **Coverage:** 146/333 (43.8%). Headline = FDA PGx oncology label rows (drug x biomarker) where OnCo links the drug record and a record for that biomarker (target or readout) in either direction through relation fields. Supporting… · **Not enumerated:** OncoKB variant-level levels of evidence: API token required (HTTP 401).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| G6PD deficiency | FDA table row(s) Dabrafenib (2) (NDA/BLA 202806), Flutamide… | MENTION | [fda.gov](https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling) | high |
| FGFR1 rearrangement | FDA table row(s) Pemigatinib (1) (NDA/BLA 213736) | MENTION | [fda.gov](https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling) | high |
| FIP1L1::PDGFRA fusion | FDA table row(s) Imatinib (4) (NDA/BLA 021588), Mepolizumab… | MENTION | [fda.gov](https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling) | high |

25 more in `gap-census-2026-11.json` (type `biomarkers-actionable`).

#### <a id="mutational-signatures"></a>Mutational signatures (`mutational-signatures`, rank 104)

**OnCo:** 2 (Records about a specific signature: term colibactin (names SBS88 and ID18). Plus one general term (mutational signature, terms.ts) and one…) · **Denominator:** [COSMIC Mutational Signatures, Version 3.6 (SBS, DBS, ID, CN, SV index pages)](https://cancer.sanger.ac.uk/signatures/) (186), read · **Coverage:** 15/163 (9.2%). Non-artefact COSMIC v3.6 signatures named by id anywhere in src/data (read from snippets, including shorthand like 'sbs6/15/26'). With a record of their own: 2/163 (SBS88, ID18 via the colibactin ter… · **Not enumerated:** Per-signature pages (prevalence by cancer type, reference papers) were not fetched; only the five index pages were read.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| SBS36 | COSMIC signature SBS36; COSMIC page https://cancer.sanger.a… | MISSING | [cancer.sanger.ac.uk](https://cancer.sanger.ac.uk/signatures/sbs/) | high |
| SBS22a | COSMIC signature SBS22a; COSMIC page https://cancer.sanger.… | MISSING | [cancer.sanger.ac.uk](https://cancer.sanger.ac.uk/signatures/sbs/) | high |
| SBS24 | COSMIC signature SBS24; COSMIC page https://cancer.sanger.a… | MISSING | [cancer.sanger.ac.uk](https://cancer.sanger.ac.uk/signatures/sbs/) | high |

24 more in `gap-census-2026-11.json` (type `mutational-signatures`).

#### <a id="oncogenic-infections"></a>Oncogenic viruses and microbes (`oncogenic-infections`, rank 126)

**OnCo:** 12 (Records about a specific agent (terms, pathways): hbv-hcv, ebv-term, hpv-status, hpv-p16, hhv8-kshv, mcpyv-status, lymphoma-htlv-1 (and lym…) · **Denominator:** [IARC Monographs List of Classifications (agents classified by the IARC Monographs)](https://monographs.iarc.who.int/list-of-classifications/) (1060), read · **Denominator:** [Europe PMC searches for research microbes (cited reviews and studies)](https://www.ebi.ac.uk/europepmc/webservices/rest/search) (4), read · **Coverage:** 12/18 (66.7%). IARC Group 1 and 2A biological agents (18 rows: 16 Group 1, 2 Group 2A; aflatoxins excluded as a chemical) with a record about the agent, or the agent named inside a record name (incorpus RECORD or I… · **Not enumerated:** A full list of research microbes (intratumoural bacteria, fungi such as Malassezia, the oral and gut microbiome) has no authoritative regis…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Hepatitis D virus (HDV) | IARC group 1; IARC volumes 59, 139 | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Schistosoma haematobium (infection with) | IARC group 1; IARC volumes 61, 100B | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Opisthorchis viverrini (infection with) | IARC group 1; IARC volumes 61, 100B | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | medium |

14 more in `gap-census-2026-11.json` (type `oncogenic-infections`).

#### <a id="tme-immune-cells"></a>Tumour microenvironment and immune cell states (`tme-immune-cells`, rank 145)

**OnCo:** 18 (Term records: cancer-associated-fibroblasts, caf-subtypes-pancreatic (myCAF, iCAF, apCAF), tumor-associated-macrophages, macrophage, myeloi…) · **Denominator:** [Census list of 39 TME components and immune cell states, each resolved where possible in the Cell O…](https://www.ebi.ac.uk/ols4/api/search?ontology=cl) (39), read · **Coverage:** 20/39 (51.3%). Each of the 39 components checked with incorpus using several aliases, snippets read to drop false hits (cDC2 hit a gene alias, ILC hit invasive lobular carcinoma, TLS hit tumour lysis). Covered by a… · **Not enumerated:** A full single-cell atlas taxonomy (for example pan-cancer T-cell and myeloid atlases) was not read; its state names would extend this list.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Tumour-associated neutrophils | DOI 10.1158/0008-5472.can-10-2583; PMID 21427354 | MISSING | [europepmc.org](https://europepmc.org/article/MED/21427354) | medium |
| Progenitor exhausted CD8 T cells | DOI 10.1016/j.ccell.2024.08.007; PMID 39214097 | MISSING | [europepmc.org](https://europepmc.org/article/MED/39214097) | medium |
| Lipid-associated macrophage | CL CL:4033086 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/ols4/api/search?q=lipid-associated+macrophage&ontology=cl&rows=5&fieldList=obo_id%2Clabel%2Cdescription%2Csynonym) | medium |

13 more in `gap-census-2026-11.json` (type `tme-immune-cells`).

#### <a id="cell-lines"></a>Cancer cell lines (`cell-lines`, rank 134)

**OnCo:** 212 (Side table cell-line-ids.ts (212 lines keyed by Cellosaurus accession; 19 of them mouse). No entity kind for cell lines; they never become…) · **Denominator:** [Cellosaurus: cell lines with a DepMap cross-reference (API query dr:DepMap)](https://api.cellosaurus.org/search/cell-line?q=dr%3ADepMap&fields=ac%2Cid%2Cdi%2Ccc%2Cox&rows=3000&format=json) (1894), read · **Denominator:** [Cellosaurus: NCI-60 cancer cell line panel ('Part of' comment)](https://api.cellosaurus.org/search/cell-line?q=cc%3A%22NCI-60%22&fields=ac%2Cid%2Cdi%2Ccc&rows=200&format=json) (61), read · 1 more denominators in the JSON · **Coverage:** 25/61 (41.0%) sampled. Headline = NCI-60 panel lines held in cell-line-ids.ts by Cellosaurus accession. Other measures: DepMap-linked lines 174/1894 (9.2%); seeded random sample (seed 20261104) of 100 DepMap-linked lines:… · **Not enumerated:** ATCC catalogue: not attempted (commercial catalogue, no open machine-readable list).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| MOLT-4 | Cellosaurus CVCL_0013 | MISSING | [api.cellosaurus.org](https://api.cellosaurus.org/search/cell-line?q=dr%3ADepMap&fields=ac%2Cid%2Cdi%2Ccc%2Cox&rows=3000&format=json) | high |
| CCRF-CEM | Cellosaurus CVCL_0207 | MISSING | [api.cellosaurus.org](https://api.cellosaurus.org/search/cell-line?q=dr%3ADepMap&fields=ac%2Cid%2Cdi%2Ccc%2Cox&rows=3000&format=json) | high |
| Rh30 | Cellosaurus CVCL_0041 | MISSING | [api.cellosaurus.org](https://api.cellosaurus.org/search/cell-line?q=dr%3ADepMap&fields=ac%2Cid%2Cdi%2Ccc%2Cox&rows=3000&format=json) | high |

19 more in `gap-census-2026-11.json` (type `cell-lines`).

#### <a id="pdx-organoids-gemms"></a>PDX, organoid and animal models (`pdx-organoids-gemms`, rank 109)

**OnCo:** 17 (preclinical-models.ts: 17 distinct repositories (PRoXe, St Jude Childhood Solid Tumour Network, NCI PDMR, PDXNet, EurOPDX, Champions Oncolo…) · **Denominator:** [CancerModels.org models deposited in EMBL-EBI BioStudies (collection CancerModelsOrg)](https://www.ebi.ac.uk/biostudies/api/v1/CancerModelsOrg/search) (57), read · **Denominator:** [Mouse Models of Human Cancer Database (JAX)](https://tumor.informatics.jax.org/), partly read · 1 more denominators in the JSON · **Coverage:** 7/57 (12.3%). CancerModels.org providers whose model collection OnCo names (as a repository row or record): CMP (Cell Model Passports), PDMR, JAX, SJCRH (via Childhood Solid Tumour Network), UMCU (via HUB Organoid… · **Not enumerated:** MMHCdb GEMM catalogue (thousands of strains): not enumerated; OnCo's ~50 GEMMs were not diffed against it.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Princess Margaret Living Biobank | CancerModels.org provider PMLB; BioStudies example S-CMO7915 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/biostudies/api/v1/studies/S-CMO7915) | medium |
| Center for Patient Derived Models, Dana-Farber Cancer Institute | CancerModels.org provider DFCI-CPDM; BioStudies example S-C… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/biostudies/api/v1/studies/S-CMO8684) | medium |
| PIVOT paediatric PDX project (CancerModels.org) | CancerModels.org project PIVOT | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/biostudies/api/v1/CancerModelsOrg/search?facet.cancermodelsorg.project=PIVOT&pageSize=5) | medium |

13 more in `gap-census-2026-11.json` (type `pdx-organoids-gemms`).

#### <a id="veterinary-comparative"></a>Veterinary and comparative oncology (`veterinary-comparative`, rank 92)

**OnCo:** 2 (Records whose name or aka mentions canine, veterinary or comparative oncology: idea idea-bio1-comparative-oncology-dogs and journal veterin…) · **Denominator:** [FDA Consumer Update 'My Dog Has Cancer: What Do I Need to Know?' (content current as of 01/16/2026)](https://www.fda.gov/consumers/consumer-updates/my-dog-has-cancer-what-do-i-need-know) (4), read · **Denominator:** [Animal Drugs @ FDA (Green Book)](https://animaldrugsatfda.fda.gov/adafda/views/#/search), js-only · 3 more denominators in the JSON · **Coverage:** 0/4 (0.0%). FDA-approved drugs for cancer in dogs (FDA Consumer Update list) with a record or any mention in src/data: 0/4. Comparative oncology infrastructure (COTC, Golden Retriever Lifetime Study, VCOG standa… · **Not enumerated:** USDA Center for Veterinary Biologics licensed products (canine cancer vaccines): list not fetched this session.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Palladia (toceranib phosphate) | FDA status Palladia (toceranib phosphate); DOI 10.1158/1078… | MISSING | [fda.gov](https://www.fda.gov/consumers/consumer-updates/my-dog-has-cancer-what-do-i-need-know) | high |
| Stelfonta (tigilanol tiglate injection) | FDA status Stelfonta (tigilanol tiglate injection) | MISSING | [fda.gov](https://www.fda.gov/consumers/consumer-updates/my-dog-has-cancer-what-do-i-need-know) | high |
| Tanovea (rabacfosadine for injection) | FDA status Tanovea (rabacfosadine for injection); DOI 10.11… | MISSING | [fda.gov](https://www.fda.gov/consumers/consumer-updates/my-dog-has-cancer-what-do-i-need-know) | high |

6 more in `gap-census-2026-11.json` (type `veterinary-comparative`).

### Medicines

#### <a id="atc-antineoplastics"></a>Antineoplastic medicines (ATC L01/L02) (`atc-antineoplastics`, rank 169)

**OnCo:** 336 (Kind drug, medicines only (classify.py pclass=='medicine': 1430 records, 502 with approval rows). 336 distinct OnCo drug records match at l…) · **Denominator:** [WHOCC ATC/DDD Index 2026, L01 Antineoplastic agents and L02 Endocrine therapy, crawled to level 5](https://atcddd.fhi.no/atc_ddd_index/?code=L01&showdescription=no) (393), read · **Denominator:** [Drugs@FDA data files (approval check for unmatched substances)](https://www.fda.gov/media/89850/download) (51965), read · 3 more denominators in the JSON · **Coverage:** 337/380 (88.7%). Identity match per level-5 single substance: incorpus.py RECORD or IN-RECORD-NAME on the ATC INN, its salt-stripped form, and every ChEMBL synonym of five or more characters; every unmatched item rev… · **Not enumerated:** National approvals outside FDA, EMA and Japan (China NMPA, Korea MFDS, France, Germany) for the unmatched substances: no machine-readable r…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| tirabrutinib | ATC L01EL06; ChEMBL CHEMBL4071161; KEGG D12594 | MENTION | [atcddd.fhi.no](https://atcddd.fhi.no/atc_ddd_index/?code=L01EL&showdescription=no) | high |
| aclarubicin | ATC L01DB04; ChEMBL CHEMBL502620; KEGG D02756 | MISSING | [atcddd.fhi.no](https://atcddd.fhi.no/atc_ddd_index/?code=L01DB&showdescription=no) | medium |
| nimustine | ATC L01AD06; ChEMBL CHEMBL136737; KEGG D08276 | MISSING | [atcddd.fhi.no](https://atcddd.fhi.no/atc_ddd_index/?code=L01AD&showdescription=no) | medium |

27 more in `gap-census-2026-11.json` (type `atc-antineoplastics`).

#### <a id="hormonal-therapies"></a>Hormonal therapies (`hormonal-therapies`, rank 158)

**OnCo:** 43 (Medicines whose modality matches classify.py's Hormonal group (SERD, SERM, aromatase, antiandrogen, androgen receptor, hormon-, progestin,…) · **Denominator:** [WHOCC ATC/DDD Index 2026, L02 Endocrine therapy](https://atcddd.fhi.no/atc_ddd_index/?code=L02&showdescription=no) (35), read · **Denominator:** [WHOCC ATC groups H01CB, H02AB, G03XC, G03CA, G03BA, H03AA, H01AB, G04CB, H02CA (candidates outside…](https://atcddd.fhi.no/atc_ddd_index/?code=H01CB&showdescription=no) (54), read · 1 more denominators in the JSON · **Coverage:** 41/47 (87.2%). L02 single substances 29/33 (87.9%) by the ATC method; the 14 non-L02 substances 12/14 by incorpus.py (census rule). With a dedicated drug record: L02 29/33, non-L02 9/14 (estradiol and conjugated es… · **Not enumerated:** Investigational endocrine agents (oral SERDs, PROTAC ER degraders, CYP11A1 inhibitors, AR degraders): handled under mechanism-classes.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| levothyroxine sodium (TSH suppression in differentiated thyroid cancer) | ATC H03AA01; openFDA set_id 008de8fd-150f-4022-8ccb-c8bfa94… | MENTION | [api.fda.gov](https://api.fda.gov/drug/label.json?search=openfda.generic_name%3A%22levothyroxine%22+AND+indications_and_usage%3A%28cancer+OR+carcinoma+OR+carcinoid+OR+tumors+OR+tumor+OR+neoplasms+OR+leukemia+OR+lymphoma+OR+myeloma+OR+malignancies+OR+metastatic+OR+neuroendocrine%29&limit=3) | high |
| polyestradiol phosphate | ATC L02AA02; ChEMBL CHEMBL1201477; KEGG D07434; FDA NDA 010… | MISSING | [atcddd.fhi.no](https://atcddd.fhi.no/atc_ddd_index/?code=L02AA&showdescription=no) | medium |
| methyltestosterone (androgen, secondary therapy in metastatic breast cancer) | ATC G03BA02; openFDA set_id 77bb4ef4-c10e-4acc-8225-651d003… | MISSING | [api.fda.gov](https://api.fda.gov/drug/label.json?search=openfda.generic_name%3A%22methyltestosterone%22+AND+indications_and_usage%3A%28cancer+OR+carcinoma+OR+carcinoid+OR+tumors+OR+tumor+OR+neoplasms+OR+leukemia+OR+lymphoma+OR+myeloma+OR+malignancies+OR+metastatic+OR+neuroendocrine%29&limit=3) | low |

3 more in `gap-census-2026-11.json` (type `hormonal-therapies`).

#### <a id="ema-authorised"></a>EMA-authorised oncology medicines (`ema-authorised`, rank 171)

**OnCo:** 502 (OnCo medicine records with approval rows (classify.py) = 502; OnCo's own universe list src/data/universe-lists/ema-oncology.json holds 267…) · **Denominator:** [EMA 'Medicines output: medicines report' spreadsheet](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) (2754), read · **Coverage:** 251/252 (99.6%). Each authorised originator substance (INN with salts stripped) checked with incorpus.py on INN, active substance and every brand; all non-RECORD results reviewed by hand; a random 15 of the covered c… · **Not enumerated:** Nationally authorised oncology medicines in EU member states (not in the EMA central list).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| peginterferon alfa-2a (Pegasys) | EMA product number EMEA/H/C/000395; ATC L03AB11 | MENTION | [ema.europa.eu](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) | high |
| narsoplimab (Yartemlea) | EMA product number EMEA/H/C/005247; ATC L01FX | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) | medium |
| Zalmoxis (allogeneic T cells genetically modified with HSV-TK Mut2 and truncate… | EMA product number EMEA/H/C/002801; ATC L01 | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) | medium |

10 more in `gap-census-2026-11.json` (type `ema-authorised`).

#### <a id="who-eml"></a>WHO Essential Medicines (cancer) (`who-eml`, rank 172)

**OnCo:** 77 (src/data/universe-lists/who-eml-cancer.json holds 77 medicines (eEML section 8.2.1-8.2.5, checked 2026-11-04); every one maps to an OnCo dr…) · **Denominator:** [WHO eEML (list.essentialmeds.org), section 8.2 Antineoplastics and supportive medicines](https://list.essentialmeds.org/?section=376) (77), read · **Denominator:** [WHO Model List of Essential Medicines, 24th list (2025), PDF](https://iris.who.int/server/api/core/bitstreams/17642505-ecd3-4940-a691-4f1dfa0d835a/content) (77), read · 2 more denominators in the JSON · **Coverage:** 77/77 (100.0%). incorpus.py on each eEML 8.2 name plus INN/USAN aliases; all 77 map to a drug record. · **Not enumerated:** National essential-medicine lists (for example India NLEM, China NEML): not read this session.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Senna | eEML medicine id 31 | MISSING | [list.essentialmeds.org](https://list.essentialmeds.org/) | high |
| Oxycodone | eEML medicine id 559 | MENTION | [list.essentialmeds.org](https://list.essentialmeds.org/) | high |
| Methadone | eEML medicine id 18 | MENTION | [list.essentialmeds.org](https://list.essentialmeds.org/) | high |

14 more in `gap-census-2026-11.json` (type `who-eml`).

#### <a id="mechanism-classes"></a>Drug classes by mechanism (`mechanism-classes`, rank 151)

**OnCo:** 155 (Technology and term records whose name or aka reads as a drug class (regex on inhibitor, antibody, degrader, conjugate, agonist, antagonist…) · **Denominator:** [ChEMBL mechanism of action (all records) joined to drug indications](https://www.ebi.ac.uk/chembl/api/data/mechanism.json) (7561), read · **Denominator:** [WHOCC ATC level-4 groups under L01 and L02](https://atcddd.fhi.no/atc_ddd_index/?code=L01&showdescription=no) (59), read · 1 more denominators in the JSON · **Coverage:** 357/504 (70.8%). Class page = an OnCo target record matching a component UniProt accession or HGNC symbol of the ChEMBL target, or a technology/term record naming the symbol; drugs only = an OnCo drug record matches… · **Not enumerated:** Classes newer than ChEMBL_37 mechanism curation (2026): enumerated only through the named list; a pipeline-database denominator (for exampl…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Integrin beta-6 (avb6) targeted antibody-drug conjugates | ChEMBL target CHEMBL4876; ChEMBL action_type BINDING AGENT;… | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/chembl/api/data/mechanism.json) | high |
| MAGE-A3 cancer vaccines | ChEMBL target CHEMBL4662941; ChEMBL action_type VACCINE ANT… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/chembl/api/data/mechanism.json) | medium |
| Kinesin spindle protein (KIF11, Eg5) inhibitors | ChEMBL target CHEMBL4581; ChEMBL action_type INHIBITOR; tar… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/chembl/api/data/mechanism.json) | medium |

20 more in `gap-census-2026-11.json` (type `mechanism-classes`).

#### <a id="pmda-japan"></a>Japan-approved oncology medicines (`pmda-japan`, rank 170)

**OnCo:** 189 (Medicines (kind drug, pclass medicine) with a Japan approval: union of src/data/regional-approvals.ts rows with JP approved or conditional…) · **Denominator:** [PMDA List of Approved Drugs, April 2004 to February 2026 (English PDF), FY2015-FY2025 sections, rev…](https://www.pmda.go.jp/files/000281190.pdf) (113), read · **Denominator:** [KEGG DRUG 'New Drug Approvals in Japan' (br08318), new active ingredients with Japanese therapeutic…](https://rest.kegg.jp/get/br:br08318) (125), read · 2 more denominators in the JSON · **Coverage:** 106/113 (93.8%). PMDA FY2015-FY2025 oncology-category new active ingredients matched by ingredient INN (salts, hydrates and '(genetical recombination)' stripped) and brand against drug names, aka, brand, code and id.… · **Not enumerated:** PMDA partial changes (new indications in Japan for drugs already approved there): 284 oncology rows FY2015-FY2025 were parsed but not diffe…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Tasurgratinib succinate (Tasfygo) | KEGG D12405; PMDA approval Sep. 24, 2024 | MISSING | [pmda.go.jp](https://www.pmda.go.jp/files/000281190.pdf) | high |
| Suratadenoturev (Telomelysin) | PMDA regenerative product approval Jun. 8, 2026 | MISSING | [pmda.go.jp](https://www.pmda.go.jp/files/000283257.pdf) | high |
| Valemetostat tosilate (Ezharmia) | KEGG D11662; PMDA approval Sep. 26, 2022 | MENTION | [pmda.go.jp](https://www.pmda.go.jp/files/000281190.pdf) | high |

20 more in `gap-census-2026-11.json` (type `pmda-japan`).

#### <a id="nmpa-china"></a>China-approved oncology medicines (`nmpa-china`, rank 166)

**OnCo:** 208 (Medicines with CN approved or conditional in src/data/regional-approvals.ts (209 rows, 208 medicines; rough regex parse). Entity approvals[…) · **Denominator:** ['Regulatory approval, reimbursement and postmarketing evidence of class 1 novel drugs in China, 201…](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13599998/supplementaryFiles) (52), read · **Denominator:** ['Innovative Drugs Approved in China After Registration Classification Reform: Current Status, Dispa…](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12816426/supplementaryFiles) (73), read · 2 more denominators in the JSON · **Coverage:** 60/73 (82.2%). Union of the two review-paper lists (oncology only), 2018-2024: 75 names, 73 distinct products after merging two that are almost certainly the same product under two names (Icaritin soft capsule = Yi… · **Not enumerated:** 2025-2026 China approvals: no complete official list was readable (NMPA English posts stop in June 2025; the CDE annual report and the NMPA…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Lisaftoclax (Bcl-2 inhibitor, Ascentage) | China approval 2025 (per DIA/PharmCube) | MENTION | [globalforum.diaglobal.org](https://globalforum.diaglobal.org/issue/march-2026/2025-nmpa-approvals-china-clears-record-number-of-new-drugs/) | high |
| Zuberitamab (anti-CD20, BioRay) | NMPA application CXSS2200001; NMPA approval 2023/5/12 | MISSING | [english.nmpa.gov.cn](https://english.nmpa.gov.cn/2023-05/17/c_923505.htm) | medium |
| Envonalkib citrate (Chia Tai Tianqing) | NMPA application CXHS2200024; NMPA approval 2024/6/11 | MISSING | [english.nmpa.gov.cn](https://english.nmpa.gov.cn/2025-02/19/c_1073519.htm) | medium |

17 more in `gap-census-2026-11.json` (type `nmpa-china`).

#### <a id="other-regulators"></a>Medicines approved first or only by other regulators (`other-regulators`, rank 132)

**OnCo:** 13 (Entity approvals[] rows outside US/EU/UK/CN/JP: India 3 drugs (IN), Korea 1 (lazertinib, KR); regional-approvals.ts holds AU for 183 rows a…) · **Denominator:** [Health Canada Drug Product Database API](https://health-products.canada.ca/api/drug/activeingredient/?lang=en&type=json&id=2049), partly read · **Denominator:** [CDSCO India, Approved New Drugs lists](https://cdsco.gov.in/opencms/opencms/en/Approval_new/Approved-New-Drugs/), blocked: connection timed out · 2 more denominators in the JSON · **Coverage:** not measured; rough estimate 39% of 23 hand-picked local-only products. No regulator list outside FDA/EMA/PMDA/NMPA could be enumerated: CDSCO and CECMED timed out, the Health Canada bulk file was unreachable, and MFDS (Korea), Roszdravnadzor register (Russia), ANVISA (B… · **Not enumerated:** Canada (Health Canada DPD): bulk extract unreachable; API per drug code only.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| CIMAvax-EGF (Cuba) | PMID 38304035; DOI 10.3389/fonc.2023.1287902 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=CIMAvax) | medium |
| Racotumomab (Vaxira; Cuba and Argentina) | PMID 34516533; DOI 10.37757/mr2021.v23.n3.5 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=racotumomab) | medium |
| Gendicine (recombinant adenoviral p53; China 2003) | PMID 40227707; DOI 10.3390/cancers17071125 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Gendicine%20approved) | medium |

6 more in `gap-census-2026-11.json` (type `other-regulators`).

#### <a id="investigational-agents"></a>Investigational agents (pipeline) (`investigational-agents`, rank 148)

**OnCo:** 1430 (All kind=drug medicines (pclass medicine), of which 928 have no approval row (1430 minus the 502 with approvals, per the census brief), plu…) · **Denominator:** [ClinicalTrials.gov API v2: query.cond=cancer, interventional, Phase 3 (includes phase 2/3), start d…](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA%5BStudyType%5DINTERVENTIONAL%20AND%20AREA%5BPhase%5DPHASE3%20AND%20AREA%5BStartDate%5DRANGE%5B2022-01-01%2C2026-12-31%5D&pageSize=1000) (1055), read · **Coverage:** 731/1055 (69.3%) sampled. Distinct specific-agent keys matched to a drug or technology record. Trial-weighted: 3785/4209 agent-trial pairs (89.9%). By frequency: agents in >=2 trials 311/372 (83.6%); >=3 trials 200/216 (92.6%… · **Not enumerated:** Phase 2 trials (much larger pipeline) were not enumerated; this denominator is phase 3 and phase 2/3 only.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| BL-M07D1 (HER2 ADC) | NCT NCT06316531, NCT06830889, NCT06891833; trials in denomi… | MENTION | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA%5BStudyType%5DINTERVENTIONAL%20AND%20AREA%5BPhase%5DPHASE3%20AND%20AREA%5BStartDate%5DRANGE%5B2022-01-01%2C2026-12-31%5D&pageSize=1000) | high |
| Famitinib (VEGFR/c-Kit TKI, with camrelizumab) | NCT NCT05042375, NCT05106335, NCT05760378; trials in denomi… | MENTION | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA%5BStudyType%5DINTERVENTIONAL%20AND%20AREA%5BPhase%5DPHASE3%20AND%20AREA%5BStartDate%5DRANGE%5B2022-01-01%2C2026-12-31%5D&pageSize=1000) | high |
| Rulonilimab (anti-PD-1) | NCT NCT05408221, NCT06755515; trials in denominator 2; lead… | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA%5BStudyType%5DINTERVENTIONAL%20AND%20AREA%5BPhase%5DPHASE3%20AND%20AREA%5BStartDate%5DRANGE%5B2022-01-01%2C2026-12-31%5D&pageSize=1000) | medium |

20 more in `gap-census-2026-11.json` (type `investigational-agents`).

#### <a id="patents-exclusivity"></a>Patents and exclusivity (`patents-exclusivity`, rank 105)

**OnCo:** 26 (Rows in src/data/exclusivity.ts (DrugExclusivity entries): abiraterone, atezolizumab, axicabtagene-ciloleucel, bevacizumab, bortezomib, cab…) · **Denominator:** [FDA Orange Book data files (products.txt, patent.txt, exclusivity.txt), files dated Oct 9 2026](https://www.fda.gov/media/76860/download?attachment) (56), read · **Denominator:** [FDA Purple Book (biologics reference-product exclusivity)](https://purplebooksearch.fda.gov/), not attempted · **Coverage:** 6/56 (10.7%). OnCo small-molecule medicines whose latest Orange Book drug-substance patent expires 2025-2032, checked for a drugId in exclusivity.ts. Wider view: 12 of the 249 Orange-Book-matched medicines have a… · **Not enumerated:** Biologics (Purple Book 12-year reference exclusivity): not enumerated. Major biologics without a row include daratumumab, pertuzumab, cetux…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Olaparib (Lynparza): US patent and exclusivity expiry row | NDA 206162; Orange Book patent.txt line N~206162~001~824741… | MISSING | [fda.gov](https://www.fda.gov/media/76860/download?attachment) | high |
| Dasatinib (Sprycel): US patent and exclusivity expiry row | NDA 021986; Orange Book patent.txt line N~021986~005~749172… | MISSING | [fda.gov](https://www.fda.gov/media/76860/download?attachment) | high |
| Carfilzomib (Kyprolis): US patent and exclusivity expiry row | NDA 202714; Orange Book patent.txt line N~202714~001~741704… | MISSING | [fda.gov](https://www.fda.gov/media/76860/download?attachment) | high |

7 more in `gap-census-2026-11.json` (type `patents-exclusivity`).

#### <a id="biosimilars"></a>Biosimilars (`biosimilars`, rank 49)

**OnCo:** 25 (Licensed biosimilar products (FDA 351(k) BLAs plus EMA EPARs flagged Biosimilar=Yes, not withdrawn, eculizumab and tocilizumab excluded) wh…) · **Denominator:** [FDA Purple Book monthly data download, October 2026 (full product list section)](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) (43), read · **Denominator:** [EMA medicines output report (EPAR list) XLSX, generated 04/11/2026 18:00](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) (79), read · 1 more denominators in the JSON · **Coverage:** 25/91 (27.5%). Union of FDA (43) and EMA (79) current products, merged when they share a brand name: 91 distinct products. Covered = brand or suffixed proper name attached to a drug record (RECORD or IN-RECORD-NAME… · **Not enumerated:** China NMPA biosimilars (e.g. trastuzumab, bevacizumab, rituximab biosimilars marketed in China): no machine-readable NMPA list was fetched…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Jobevne (bevacizumab biosimilar) | FDA BLA 761175 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |
| Zimrixby (rituximab biosimilar) | FDA BLA 761376 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |
| Alymsys (bevacizumab biosimilar) | FDA BLA 761231; EMA product number EMEA/H/C/005286 | MENTION | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |

27 more in `gap-census-2026-11.json` (type `biosimilars`).

#### <a id="radiopharmaceuticals-therapeutic"></a>Therapeutic radiopharmaceuticals (`radiopharmaceuticals-therapeutic`, rank 88)

**OnCo:** 27 (Drug records with pclass 'medicine' whose name, aka or modality names a therapeutic radionuclide or radioligand (lutetium, actinium, radium…) · **Denominator:** [WHO ATC index V10 (therapeutic radiopharmaceuticals), level 5](https://atcddd.fhi.no/atc_ddd_index/?code=V10&showdescription=no) (22), read · **Denominator:** [Drugs@FDA data files (Products, Applications, Submissions)](https://www.fda.gov/media/89850/download) (15), read · 2 more denominators in the JSON · **Coverage:** 13/29 (44.8%). Phase 3 agent list (29 distinct agents) diffed by incorpus.py: covered 13 (drug or technology record); 11 MENTION, of which 6 are named only in clinical-trial record titles (rosopatamab/TLX591, 177Lu… · **Not enumerated:** China NMPA, Japan PMDA, India and Russia approvals of therapeutic radiopharmaceuticals: no machine-readable list was fetched; only Licartin…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Bravnetsa (lutetium Lu 177 dotatate, Lantheus) | FDA ANDA 217060 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Bexlutry (lutetium Lu 177 dotatate, Curium) | FDA NDA 218525 | MENTION | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Lutetium (177Lu) rosopatamab tetraxetan (177Lu-TLX591) | NCT NCT06520345 | MENTION | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies) | high |

21 more in `gap-census-2026-11.json` (type `radiopharmaceuticals-therapeutic`).

#### <a id="diagnostic-radiopharmaceuticals"></a>Diagnostic radiopharmaceuticals and PET tracers (`diagnostic-radiopharmaceuticals`, rank 65)

**OnCo:** 20 (Drug records classified imaging-agent by classify.py whose modality is PET/SPECT/radiotracer/radiopharmaceutical (20 of the 30 imaging agen…) · **Denominator:** [WHO ATC index V09 (diagnostic radiopharmaceuticals), level 5](https://atcddd.fhi.no/atc_ddd_index/?code=V09&showdescription=no) (112), read · **Denominator:** [Drugs@FDA data files: radioactive diagnostic products](https://www.fda.gov/media/89850/download) (353), read · 2 more denominators in the JSON · **Coverage:** 17/50 (34.0%). ATC oncology subset (50 codes) diffed by incorpus.py with INN, brand and common abbreviations: V09I tumour detection 14/33 covered (FET counted as covered through the floretyrosine-f18 record; Octreo… · **Not enumerated:** FDA "PET drugs" approved list page: not fetched; Drugs@FDA data files were used instead (they hold every NDA/ANDA, including PET ANDAs).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Sodium fluoride F-18 (NaF PET bone imaging) | ATC V09IX06; FDA ANDA 203592; NCT NCT01930812 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Technetium Tc-99m medronate (MDP bone scan agent) | ATC V09BA02; FDA NDA 018035 | MENTION | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Technetium Tc-99m oxidronate (HDP) | ATC V09BA01; FDA NDA 018321 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | medium |

27 more in `gap-census-2026-11.json` (type `diagnostic-radiopharmaceuticals`).

#### <a id="imaging-contrast-dyes"></a>Contrast agents and surgical dyes (`imaging-contrast-dyes`, rank 13)

**OnCo:** 12 (Drug records for non-radioactive imaging/visualisation agents (classify.py imaging-agent minus radiotracers, plus photosensitiser medicines…) · **Denominator:** [Drugs@FDA data files: contrast agents and diagnostic dyes by active ingredient](https://www.fda.gov/media/89850/download) (48), read · **Denominator:** [WHO ATC index V08 (contrast media) and V04CX (other diagnostic agents)](https://atcddd.fhi.no/atc_ddd_index/?code=V08&showdescription=no) (74), read · 2 more denominators in the JSON · **Coverage:** 9/43 (20.9%). Defined list of 43 agents built from the denominators (38 current FDA/EMA or ATC-listed agents plus 5 withdrawn ones that shaped practice): gadolinium 11, other MRI 4 (Ferabright, mangafodipir, ferum… · **Not enumerated:** DailyMed SPL API full class listing (e.g. every contrast SPL by pharmacologic class): not enumerated; Drugs@FDA ingredient matching used in…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Isosulfan blue (Lymphazurin) | FDA NDA 018310; FDA ANDA 090874 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Patent blue V | ATC V04CX09 | MISSING | [atcddd.fhi.no](https://atcddd.fhi.no/atc_ddd_index/?code=V04CX&showdescription=no) | high |
| Gadoxetate disodium (Eovist / Primovist, liver-specific MRI contrast) | FDA NDA 022090; ATC V08CA10 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Gadobutrol (Gadavist / Gadovist) | FDA NDA 201277; ATC V08CA09 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |
| Gadoterate meglumine (Dotarem / Clariscan) | FDA NDA 204781; FDA ANDA 210016; ATC V08CA02 | MISSING | [fda.gov](https://www.fda.gov/media/89850/download) | high |

25 more in `gap-census-2026-11.json` (type `imaging-contrast-dyes`).

#### <a id="preventive-vaccines"></a>Cancer-preventing vaccines (`preventive-vaccines`, rank 14)

**OnCo:** 4 (Drug records whose modality is a prophylactic vaccine: gardasil-9, hpv-quadrivalent-vaccine (aka Silgard), hpv-bivalent-vaccine (Cervarix),…) · **Denominator:** [WHO list of prequalified vaccines, CSV export](https://extranet.who.int/prequal/vaccines/prequalified/export?page&_format=csv) (11), read · **Denominator:** [FDA Purple Book (CBER vaccine rows), October 2026](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) (10), read · 1 more denominators in the JSON · **Coverage:** 4/19 (21.1%). Union of distinct HPV, monovalent hepatitis B and hepatitis A+B products across the three lists (merged by brand; Recombivax HB and HBVaxPro counted as one Merck product, Twinrix and Ambirix as one l… · **Not enumerated:** China NMPA HPV vaccine licences beyond Cecolin, Cecolin 9 and Walrinvax (e.g. other domestic 9-valent and 11-valent candidates): no NMPA li…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Engerix-B (hepatitis B vaccine, recombinant) | FDA BLA 103239; WHO PQ Hepatitis B, Engerix, GlaxoSmithKlin… | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |
| Recombivax HB / HBVaxPro (hepatitis B vaccine, recombinant, Merck) | FDA BLA 101066; EMA product number EMEA/H/C/000373 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |
| Heplisav-B (hepatitis B vaccine, recombinant, adjuvanted) | FDA BLA 125428; EMA product number EMEA/H/C/005063 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/drugsatfda_docs/PurpleBook/2026/purplebook-search-October-data-download.csv) | high |
| Cecolin (E. coli-produced bivalent HPV vaccine, Innovax) | WHO PQ Human Papillomavirus (Bivalent), Cecolin, Xiamen Inn… | MENTION | [extranet.who.int](https://extranet.who.int/prequal/vaccines/prequalified/export?page&_format=csv) | high |
| Walrinvax (bivalent HPV vaccine, Yuxi Zerun / Walvax) | WHO PQ Human Papillomavirus (Bivalent), Walrinvax, Yuxi Zer… | MENTION | [extranet.who.int](https://extranet.who.int/prequal/vaccines/prequalified/export?page&_format=csv) | high |

8 more in `gap-census-2026-11.json` (type `preventive-vaccines`).

#### <a id="cell-gene-oncolytic"></a>Cell, gene and oncolytic virus therapies (`cell-gene-oncolytic`, rank 147)

**OnCo:** 107 (classify.py mgroup 'Cell therapy' (107 drug records: CAR-T, TCR-T, TIL, NK and others, approved and pipeline) plus the oncolytic and gene-t…) · **Denominator:** [FDA Approved Cellular and Gene Therapy Products (OTP list, content current as of 10/30/2026)](https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products) (55), read · **Denominator:** [EMA medicines output report XLSX, Advanced therapy = Yes](https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx) (36), read · 2 more denominators in the JSON · **Coverage:** 26/34 (76.5%). Combined distinct-product list from the four denominators. Oncology products: 26, covered 22 (84.6%): all 13 FDA oncology products, Ebvallo, 5 China CAR-Ts, Oncorine (H101), tali-cel, var-cel; gaps D… · **Not enumerated:** China NMPA cell and gene therapy approvals: no official machine-readable list fetched; coverage relies on abstracts.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Teserpaturev (Delytact, oncolytic HSV-1 G47 delta) | PMDA Delytact, Teserpaturev, approved June 2021 (conditiona… | MENTION | [pmda.go.jp](https://www.pmda.go.jp/english/review-services/reviews/approved-information/0004.html) | high |
| Anbalcabtagene autoleucel (Rimqarto, Curocell) | DOI 10.1007/s40291-026-00872-3; PMID 42704424 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1007/s40291-026-00872-3) | medium |
| Gendicine (recombinant human p53 adenovirus) | DOI 10.3390/cancers17071125; 10.1016/bs.acr.2026.02.003 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Gendicine) | medium |

5 more in `gap-census-2026-11.json` (type `cell-gene-oncolytic`).

#### <a id="supportive-care-drugs"></a>Supportive-care medicines (`supportive-care-drugs`, rank 74)

**OnCo:** 62 (Drug records with supportive: true in /tmp/gapcensus/all.ndjson (62), which is exactly the SUPPORTIVE_DRUGS map in src/data/supportive-drug…) · **Denominator:** [WHO ATC/DDD Index 2026, union of A04AA, A04AD, L03AA, B03XA, M05BA, M05BX, V03AF (substance level,…](https://atcddd.fhi.no/atc_ddd_index/?code=V03AF&showdescription=no) (64), read · **Denominator:** [NCI: Drugs Approved for Conditions Related to Cancer](https://www.cancer.gov/about-cancer/treatment/drugs/related-conditions) (48), read · 2 more denominators in the JSON · **Coverage:** 33/64 (51.6%). ATC union (headline). Each substance checked with incorpus.py using INN, salt and brand aliases; RECORD or IN-RECORD-NAME = covered. Second measures: NCI related-conditions list 47/48 (97.9%, only ca… · **Not enumerated:** NCCN antiemesis, myeloid growth factor, CAT and infection guidelines: login required, not read; NCCN classes taken only from guidelines abo…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Dalteparin | ATC B01AB04; guidelinePMID 35772465; PMCID PMC9236567 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9236567/fullTextXML) | high |
| Enoxaparin | ATC B01AB05; guidelinePMID 35772465 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9236567/fullTextXML) | high |
| Benzydamine mouthwash | ATC A01AD02; guidelinePMID 32786044; PMCID PMC7540329 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7540329/fullTextXML) | high |

27 more in `gap-census-2026-11.json` (type `supportive-care-drugs`).

#### <a id="regimens"></a>Named regimens (`regimens`, rank 59)

**OnCo:** 141 (src/data/regimens.ts regimen library (130 entries with components, doses, cycle, emetogenicity, G-CSF) plus drug records whose modality con…) · **Denominator:** [BC Cancer chemotherapy protocol index (all tumour-group pages)](https://www.bccancer.bc.ca/health-professionals/clinical-resources/chemotherapy-protocols) (726), read · **Denominator:** [NCI: A to Z List of Cancer Drugs (drug-combination pages)](https://www.cancer.gov/about-cancer/treatment/drugs/cancer-drugs), read (OnCo's own universe list; COPP-AB… · 2 more denominators in the JSON · **Coverage:** 72/233 (30.9%). Each distinct BC Cancer multi-agent component set (supportive agents such as leucovorin, mesna, dexamethasone, prednisone ignored) was matched by identity to OnCo regimen component sets parsed from r… · **Not enumerated:** HemOnc.org: Cloudflare challenge (403) on pages and API; its regimen-by-disease pages are the most complete public list and were not read.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Nivolumab + cabozantinib (renal cell carcinoma) | BCCancerProtocol GUAVNIVC | MENTION | [bccancer.bc.ca](https://www.bccancer.bc.ca/health-professionals/clinical-resources/chemotherapy-protocols/genitourinary) | high |
| AC followed by paclitaxel and trastuzumab (AC-TH) | BCCancerProtocol BRAJACTT | MENTION | [bccancer.bc.ca](https://www.bccancer.bc.ca/health-professionals/clinical-resources/chemotherapy-protocols/breast) | high |
| Tucatinib + trastuzumab + capecitabine | BCCancerProtocol UBRAVTTCAP | MENTION | [bccancer.bc.ca](https://www.bccancer.bc.ca/health-professionals/clinical-resources/chemotherapy-protocols/breast) | high |

19 more in `gap-census-2026-11.json` (type `regimens`).

#### <a id="complementary-alternative"></a>Complementary and alternative products (`complementary-alternative`, rank 5)

**OnCo:** 56 (Technology records defined in src/data/complementary.ts (56 tech() records graded with evidence:<grade> tags; the side-table count of 58 in…) · **Denominator:** [Memorial Sloan Kettering 'About Herbs, Botanicals and Other Products' database (all letter pages)](https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs/search?letter=A&page=0) (308), read · **Denominator:** [NCI PDQ Integrative, Alternative and Complementary Therapies summaries (health professional version…](https://www.cancer.gov/about-cancer/treatment/cam/hp) (24), read · 1 more denominators in the JSON · **Coverage:** 40/308 (13.0%). Each MSK entry checked with incorpus.py using the entry name, slug and (for 120 entries) Latin, trade and common aliases (e.g. Coriolus versicolor\|turkey tail, Hoxsey, Gerson, silymarin). RECORD or… · **Not enumerated:** MSK entry pages (evidence summaries per herb) were not read; only listing pages, so no grades were taken from MSK.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Milk thistle (silymarin) | NCIPDQ milk-thistle-pdq; MSK milk-thistle; NCCIH Milk Thist… | MISSING | [cancer.gov](https://www.cancer.gov/about-cancer/treatment/cam/hp) | high |
| Black cohosh | NCIPDQ black-cohosh-pdq; MSK black-cohosh; NCCIH Black Coho… | MENTION | [cancer.gov](https://www.cancer.gov/about-cancer/treatment/cam/hp) | high |
| Low-dose naltrexone | MSK low-dose-naltrexone | MENTION | [mskcc.org](https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs/search?letter=L&page=1) | high |
| PC-SPES | NCIPDQ pc-spes-pdq; MSK pc-spes | MISSING | [cancer.gov](https://www.cancer.gov/about-cancer/treatment/cam/hp) | medium |
| Echinacea | MSK echinacea; NCCIH Echinacea | MISSING | [nccih.nih.gov](https://www.nccih.nih.gov/health/herbsataglance) | medium |

22 more in `gap-census-2026-11.json` (type `complementary-alternative`).

#### <a id="repurposed-drugs"></a>Repurposed drugs (`repurposed-drugs`, rank 35)

**OnCo:** 83 (OnCo has no repurposing tag or list (no drug record carries a 'repurposed' tag; ReDO is cited only as a figure, 'More than 300'). Counted a…) · **Denominator:** [ReDO_DB (Repurposing Drugs in Oncology database, Anticancer Fund / ReDO project), tab-separated exp…](https://data.tp53.org.uk/redo_db.txt) (375), read · **Coverage:** 83/375 (22.1%). Every ReDO drug checked with incorpus.py using the drug name plus ReDO synonyms of 4+ characters; RECORD or IN-RECORD-NAME = covered (184 MISSING, 108 MENTION). Stronger-evidence subsets: drugs with… · **Not enumerated:** ReDO_Trials_DB (active repurposing trials, said to be downloadable as ReDO_Trials_DB.txt) was not fetched; trial-level coverage of repurpos…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cimetidine | DrugBank DB00501 | MISSING | [data.tp53.org.uk](https://data.tp53.org.uk/redo_db.txt) | high |
| Disulfiram | DrugBank DB00822 | MISSING | [data.tp53.org.uk](https://data.tp53.org.uk/redo_db.txt) | high |
| Atorvastatin | DrugBank DB01076 | MENTION | [data.tp53.org.uk](https://data.tp53.org.uk/redo_db.txt) | high |
| Lovastatin | DrugBank DB00227 | MISSING | [data.tp53.org.uk](https://data.tp53.org.uk/redo_db.txt) | medium |
| Dipyridamole | DrugBank DB00975 | MISSING | [data.tp53.org.uk](https://data.tp53.org.uk/redo_db.txt) | medium |

20 more in `gap-census-2026-11.json` (type `repurposed-drugs`).

#### <a id="drug-interactions"></a>Drug interactions (`drug-interactions`, rank 122)

**OnCo:** 108 (src/data/interactions.ts: 153 agents, of which 108 are OnCo anticancer products (non-external entries, some combined, e.g. 'Fluorouracil /…) · **Denominator:** [Liverpool / Radboud UMC Cancer Drug Interactions checker, 'View All Checker' list of cancer drugs](https://www.cancer-druginteractions.org/view_all_interactions/new) (102), read · **Denominator:** [FDA CDER Novel Drug Approvals 2023, 2024, 2025 and 2026 tables, oncology rows](https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2025) (55), read · 1 more denominators in the JSON · **Coverage:** 66/102 (64.7%). Liverpool list (headline): each drug name normalised and matched against interactions.ts agent ids, display names split on '/', and the aliases of the matching OnCo drug record. Second measure: FDA n… · **Not enumerated:** Herb-drug and food-drug interaction denominators (e.g. MSK About Herbs interaction sections, NCI PDQ 'Cancer Therapy Interactions With Food…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Ponatinib interaction profile | LiverpoolDrugId 694; OnCoRecord ponatinib | MISSING | [cancer-druginteractions.org](https://www.cancer-druginteractions.org/view_all_interactions/new) | high |
| Daraxonrasib interaction profile | FDANovelApproval Rasonque, 8/26/2026; OnCoRecord daraxonras… | MISSING | [fda.gov](https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2026) | high |
| Cabazitaxel interaction profile | LiverpoolDrugId 740; OnCoRecord cabazitaxel | MISSING | [cancer-druginteractions.org](https://www.cancer-druginteractions.org/view_all_interactions/new) | medium |

22 more in `gap-census-2026-11.json` (type `drug-interactions`).

#### <a id="drug-shortages"></a>Drug shortages (`drug-shortages`, rank 56)

**OnCo:** 11 (No structured shortage field or table exists. Counted drug-level shortage episodes named in text within 300 characters of 'shortage' and ch…) · **Denominator:** [openFDA drug shortages endpoint (FDA Drug Shortages Database)](https://api.fda.gov/drug/shortages.json?search=therapeutic_category:%22Oncology%22&limit=1000) (24), read · **Denominator:** [EMA shortages catalogue (medicines-output-shortages-report_en.xlsx)](https://www.ema.europa.eu/en/documents/report/medicines-output-shortages-report_en.xlsx) (85), read · 1 more denominators in the JSON · **Coverage:** 6/20 (30.0%). Denominator: distinct cancer or cancer-supportive medicines in a current FDA shortage (7, flurazepam excluded) or in an EMA shortage entry ongoing or updated since 2023 (13 more). Covered = OnCo name… · **Not enumerated:** ASHP (the most complete US list, with resolved history): blocked by a Cloudflare challenge.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Pentostatin (Nipent) shortage, recovery not expected until December 2028 | NDC 0409-0801-01; FDAShortagePosted 08/27/2026 | MISSING | [api.fda.gov](https://api.fda.gov/drug/shortages.json?search=therapeutic_category:%22Oncology%22&limit=1000) | high |
| Ifosfamide shortage (US from June 2026; EU from 12 February 2026, expected unti… | FDAShortagePosted 06/12/2026; EMAShortage https://www.ema.e… | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/documents/report/medicines-output-shortages-report_en.xlsx) | high |
| Cyclophosphamide injection shortage in the EU (from 24 February 2026, expected… | EMAShortage https://www.ema.europa.eu/en/medicines/human/sh… | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/documents/report/medicines-output-shortages-report_en.xlsx) | high |

13 more in `gap-census-2026-11.json` (type `drug-shortages`).

#### <a id="rems-safety-programmes"></a>REMS and risk-minimisation programmes (`rems-safety-programmes`, rank 130)

**OnCo:** 9 (No REMS or risk-minimisation record, field or term exists ('REMS' is MENTION only: 41 occurrences in 16 files). Counted programmes OnCo nam…) · **Denominator:** [REMS@FDA approved REMS table](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm) (68), read · **Denominator:** [eMC (UK) Risk Minimisation Materials directory, letters A-Z](https://www.medicines.org.uk/emc/rmm-directory) (1527), read · 1 more denominators in the JSON · **Coverage:** 7/12 (58.3%). FDA oncology REMS (headline): covered when OnCo text names a REMS (or REMS-type restricted distribution) within 300 characters of the product name, read by hand (thalidomide, lenalidomide, pomalidomi… · **Not enumerated:** EU additional risk minimisation measures: no consolidated EMA list; EPAR Annex II documents were not read product by product.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Tecvayli and Talvey REMS (teclistamab, talquetamab) | REMSId 415; REMSApproved 10/25/2022 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm) | high |
| Elrexfio REMS (elranatamab) | REMSId 421; REMSApproved 08/14/2023 | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm) | high |
| UK patient cards for bispecific antibodies (epcoritamab, glofitamab, mosunetuzu… | eMCRMM 2841 (Tepkinly card); 2821 (Columvi card); 2577 (Lun… | MISSING | [medicines.org.uk](https://www.medicines.org.uk/emc/rmm-directory) | high |

11 more in `gap-census-2026-11.json` (type `rems-safety-programmes`).

### Tests and diagnostics

#### <a id="companion-diagnostics"></a>Companion diagnostics (`companion-diagnostics`, rank 154)

**OnCo:** 52 (Device-level: each oncology device on the FDA CDx list (64 after merging name variants) run through incorpus.py with its names and short fo…) · **Denominator:** [FDA List of Cleared or Approved Companion Diagnostic Devices (In Vitro and Imaging Tools)](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) (72), read · **Coverage:** 52/64 (81.3%). Device-level identity check with incorpus.py (names, short forms, maker-prefixed forms); RECORD or IN-RECORD-NAME counts as covered, plus 6 devices named in a family record's name (listed in onco.met… · **Not enumerated:** Non-US companion diagnostic lists (Japan PMDA approved CDx list, EU IVDR companion diagnostics with EMA consultation, China NMPA): not enum…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Signatera CDx | fdaPMA P260004 | MENTION | [fda.gov](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) | high |
| Guardant360 Liquid CDx | fdaPMA P250027 | MENTION | [fda.gov](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) | high |
| KMT2A Breakapart FISH Probe Kit PDx (CDA-LPH013) | fdaDeNovo DEN240067 | MENTION | [fda.gov](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) | high |

9 more in `gap-census-2026-11.json` (type `companion-diagnostics`).

#### <a id="tumour-profiling-panels"></a>Tumour profiling (NGS) panels (`tumour-profiling-panels`, rank 86)

**OnCo:** 20 (Drug-kind records with product class 'test' (classify.py) whose modality is tissue NGS profiling or a tissue NGS companion diagnostic panel…) · **Denominator:** [openFDA device 510(k)/De Novo, product code PZM (Next Generation Sequencing Based Tumor Profiling T…](https://api.fda.gov/device/510k.json?search=product_code:PZM&limit=100) (8), read · **Denominator:** [openFDA device PMA, product code PQP (NGS oncology panel, somatic or germline variant detection sys…](https://api.fda.gov/device/pma.json?search=product_code:PQP&limit=100) (17), read · 3 more denominators in the JSON · **Coverage:** 15/34 (44.1%). Union of (a) 18 FDA-authorised tissue NGS tumour-profiling devices (PZM 510(k)/De Novo, PQP PMA tissue devices, Praxis Extended RAS Panel) and (b) 16 further named tissue CGP/NGS LDTs approved by New… · **Not enumerated:** MolDX DEX registry of covered tests: login required.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| MSK-IMPACT (Integrated Mutation Profiling of Actionable Cancer Targets) | fdaDeNovo DEN170058; nysProjectId 41249 | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:PZM&limit=100) | high |
| ThyroSeq v3 Genomic Classifier | nysProjectId 94099; 105294 | MENTION | [wadsworth.org](https://www.wadsworth.org/regulatory/clep/approved-ldt?ltd_permit_category_value=Oncology&items_per_page=All) | high |
| Guardant360 TissueNext (Guardant360 Tissue) | nysProjectId 85939 | MISSING | [wadsworth.org](https://www.wadsworth.org/regulatory/clep/approved-ldt?ltd_permit_category_value=Oncology&items_per_page=All) | medium |

16 more in `gap-census-2026-11.json` (type `tumour-profiling-panels`).

#### <a id="liquid-biopsy-ctdna"></a>Liquid biopsy ctDNA genotyping (`liquid-biopsy-ctdna`, rank 66)

**OnCo:** 6 (Test records whose modality or sample is plasma ctDNA genotyping: guardant360-cdx, foundationone-cdx (one record for FoundationOne CDx and…) · **Denominator:** [openFDA PMA product code PQP (plasma devices) and 510(k)/De Novo product code SBY (High Throughput…](https://api.fda.gov/device/510k.json?search=product_code:SBY&limit=100) (8), read · **Denominator:** [openFDA product codes QMA (cell-free DNA blood collection device), NQI (CTC enumeration), QSA (CTC…](https://api.fda.gov/device/510k.json?search=product_code:QMA&limit=100) (16), read · 2 more denominators in the JSON · **Coverage:** 8/23 (34.8%). Union of 8 FDA plasma genotyping devices (6 covered), 13 further NYS-approved named plasma genotyping LDTs (2 covered: Guardant360 LDT via the guardant360-cdx record name, NavDx), and 2 vendor-listed… · **Not enumerated:** Tempus test menu: https://www.tempus.com/oncology/genomic-profiling/ returned HTTP 429.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Tempus xF (liquid biopsy panel) | nysProjectId 87099; 95759 | MISSING | [wadsworth.org](https://www.wadsworth.org/regulatory/clep/approved-ldt?ltd_permit_category_value=Oncology&items_per_page=All) | high |
| Caris Detect (multi-cancer early detection blood test) | vendorPage carislifesciences.com/carisdetect/ | MISSING | [carislifesciences.com](https://www.carislifesciences.com/carisdetect/) | high |
| Caris Assure | vendorPage carislifesciences.com/physicians/physician-tests… | MENTION | [carislifesciences.com](https://www.carislifesciences.com/physicians/physician-tests/caris-assure/) | high |

12 more in `gap-census-2026-11.json` (type `liquid-biopsy-ctdna`).

#### <a id="mrd-tests"></a>Residual disease (MRD) tests (`mrd-tests`, rank 118)

**OnCo:** 20 (Test records whose modality names residual disease (classify.py class 'test' plus modality regex 'residual disease\|MRD'): accuscan-mrd, br…) · **Denominator:** [CMS MolDX billing article A58376: Minimal Residual Disease Testing for Solid Tumor Cancers (covered…](https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=58376) (9), read · **Denominator:** [CMS MolDX billing article A58998: Minimal Residual Disease Testing for Hematologic Cancers](https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=58998) (1), read · 6 more denominators in the JSON · **Coverage:** 14/22 (63.6%). Union of named MRD products from the denominators above (22 distinct after merging versions; Signatera CDx and Signatera Genome are counted inside Signatera). incorpus.py: RECORD or IN-RECORD-NAME =… · **Not enumerated:** Urine tumour DNA (utDNA) MRD in bladder cancer: a ClinicalTrials.gov intervention (NCT07187635) shows the branch exists; products not enume…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Latitude (Natera tissue-free MRD test) | vendorPage natera.com/oncology | MISSING | [natera.com](https://www.natera.com/oncology/) | high |
| Signatera Genome (whole-genome version of Signatera) | nct NCT07282912; NCT07504796; NCT07565857 | MENTION | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies?query.term=(minimal%20residual%20disease%20OR%20molecular%20residual%20disease%20OR%20measurable%20residual%20disease) | medium |
| AVENIO ctDNA Surveillance Kit (Roche) | nct NCT04585477; NCT04585490; doi 10.3390/genes16010071 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11765229/fullTextXML) | medium |

4 more in `gap-census-2026-11.json` (type `mrd-tests`).

#### <a id="germline-hereditary-tests"></a>Germline hereditary cancer tests (`germline-hereditary-tests`, rank 4)

**OnCo:** 1 (Test records (classify.py class 'test') for a germline product: bracanalysis-cdx only. The topic is carried by the technology record germli…) · **Denominator:** [NIH Genetic Testing Registry (GTR) test_version.gz, current public tests filtered to hereditary can…](https://ftp.ncbi.nlm.nih.gov/pub/GTR/data/test_version.gz) (1562), read · **Denominator:** [openFDA 510(k)/De Novo product codes QAZ (cancer predisposition risk assessment system, 866.6090) a…](https://api.fda.gov/device/510k.json?search=product_code:QAZ&limit=100) (5), read · 2 more denominators in the JSON · **Coverage:** 1/17 (5.9%) sampled. Named germline products: 5 FDA-authorised products (1 covered: BRACAnalysis CDx) plus 12 named multigene panels from major US labs, taken from GTR and two vendor menus (0 covered). Random sample: 0 o… · **Not enumerated:** Full GTR test-level coverage: 1,562 lab tests; measured on a seeded sample of 60 only.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Invitae Common Hereditary Cancers Panel (FDA De Novo) | fdaDeNovo DEN210011; gtr GTR000528518.4 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:QVU&limit=100) | high |
| 23andMe PGS Genetic Health Risk Report for BRCA1/BRCA2 (Selected Variants) | fdaDeNovo DEN170046; fda510k K223597 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:QAZ&limit=100) | high |
| CancerNext-Expanded and CancerNext (Ambry Genetics) | gtr GTR000560508.11 | MISSING | [ftp.ncbi.nlm.nih.gov](https://ftp.ncbi.nlm.nih.gov/pub/GTR/data/test_version.gz) | high |
| myRisk Hereditary Cancer (Myriad Genetics) | gtr GTR000603556.3 | MENTION | [ftp.ncbi.nlm.nih.gov](https://ftp.ncbi.nlm.nih.gov/pub/GTR/data/test_version.gz) | high |
| Hereditary diffuse gastric cancer (CDH1, CTNNA1) | nhsRCode R215 | MENTION | [england.nhs.uk](https://www.england.nhs.uk/wp-content/uploads/2018/08/rare-and-inherited-disease-national-genomics-test-directory-v9.xlsx) | high |

17 more in `gap-census-2026-11.json` (type `germline-hereditary-tests`).

#### <a id="pharmacogenomic-tests"></a>Pharmacogenomic tests (`pharmacogenomic-tests`, rank 69)

**OnCo:** 4 (Technology records dpyd-genotyping, tpmt-nudt15-genotyping, ugt1a1-genotyping and oncology-pharmacogenomics; target records dpyd, nudt15, u…) · **Denominator:** [CPIC API: guidelines and gene-drug pair view](https://api.cpicpgx.org/v1/pair_view?select=*) (574), read · **Denominator:** [FDA Table of Pharmacogenetic Associations (sections 1-3)](https://www.fda.gov/medical-devices/precision-medicine/table-pharmacogenetic-associations) (147), read · 2 more denominators in the JSON · **Coverage:** 12/34 (35.3%). Defined list: every gene-drug pair for an anticancer drug in the FDA table or the CPIC pair view (levels A to C), plus supportive-care pairs at CPIC level A or in the FDA table (antiemetics, opioids,… · **Not enumerated:** DPWG guidelines: not fetched this session (PharmGKB/ClinPGx API not queried).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| CYP2D6 and opioids for cancer pain (codeine, tramadol) | cpicGuideline CYP2D6, OPRM1, COMT, and Opioids (CPIC level… | MISSING | [fda.gov](https://www.fda.gov/medical-devices/precision-medicine/table-pharmacogenetic-associations) | high |
| CYP2D6 and 5-HT3 antiemetics (ondansetron, tropisetron) | cpicGuideline CYP2D6 and Ondansetron and Tropisetron (CPIC… | MISSING | [api.cpicpgx.org](https://api.cpicpgx.org/v1/pair_view?select=*) | high |
| HLA-B*58:01 and allopurinol (tumour lysis prophylaxis) | cpicGuideline HLA-B and Allopurinol (CPIC level A) | MISSING | [fda.gov](https://www.fda.gov/medical-devices/precision-medicine/table-pharmacogenetic-associations) | high |

19 more in `gap-census-2026-11.json` (type `pharmacogenomic-tests`).

#### <a id="haematopathology-tests"></a>Haematopathology tests (`haematopathology-tests`, rank 33)

**OnCo:** 9 (Test records for haematological products: mrdx-bcr-abl, clonoseq, leukostrat-cdx-flt3, abbott-realtime-idh1, abbott-realtime-idh2, vysis-cl…) · **Denominator:** [openFDA 510(k)/De Novo/PMA for haematology test product codes: OYX (BCR/ABL1 monitoring, 866.6060),…](https://api.fda.gov/device/510k.json?search=product_code:OYX&limit=100) (24), read · **Denominator:** [FDA Nucleic Acid Based Tests list (haematology rows)](https://www.fda.gov/medical-devices/in-vitro-diagnostics/nucleic-acid-based-tests) (17), read · 3 more denominators in the JSON · **Coverage:** 9/42 (21.4%). Defined list: 24 FDA-authorised haematology test products (7 covered: MRDx BCR-ABL, Vysis CLL FISH, clonoSEQ, LeukoStrat CDx FLT3, Abbott RealTime IDH1 and IDH2, ARUP KIT D816V), 17 NYS-approved name… · **Not enumerated:** Flow cytometry reagent catalogues (antibody panels, EuroFlow tubes): no product register beyond FDA codes OYE/PWD; not enumerated.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Freelite serum free light chain assays (The Binding Site) | fda510k K040009; K231290; K250549 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22freelite%22&limit=100) | medium |
| EXENT Analyser: immunoglobulin isotypes (GAM) by mass spectrometry (The Binding… | fda510k K250159 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22EXENT%22&limit=100) | medium |
| ipsogen JAK2 RGQ PCR Kit (QIAGEN) | fdaDeNovo DEN160028; fda510k K172287 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:PSU&limit=100) | medium |
| Quantidex qPCR BCR-ABL IS Kit (Asuragen) | fdaDeNovo DEN160003 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:OYX&limit=100) | medium |
| Xpert BCR-ABL Ultra (Cepheid GeneXpert) | fda510k K190076 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:OYX&limit=100) | medium |

15 more in `gap-census-2026-11.json` (type `haematopathology-tests`).

#### <a id="nhs-genomic-test-directory"></a>NHS genomic test directory (cancer) (`nhs-genomic-test-directory`, rank 164)

**OnCo:** 45 (Distinct NHS directory test codes of the form M<n>.<n> found anywhere in src/data (grep, 6 files, all UK deep-dive pages such as spikes/breast-…) · **Denominator:** [National genomic test directory for cancer non-central nervous system, version 16.0 (Solid tumours,…](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-non-central-nervous-system-national-genomic-test-directory-version-16.xlsx) (114), read · **Denominator:** [National genomic test directory for cancer central nervous system, version 2.0](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-central-nervous-system-cns-national-genomic-test-directory-v2.xlsx) (7), read · 2 more denominators in the JSON · **Coverage:** 320/371 (86.3%). Essential gene targets: gene-symbol tokens parsed from 'Target gene(s) [essential]' (non-CNS) and the SNV, CNV, structural-variant and other essential target columns (CNS, HaemOnc). 384 tokens, minus… · **Not enumerated:** Test-level mapping (915 NHS tests to OnCo test records): not attempted, because the directory lists generic methods rather than products.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Infantile fibrosarcoma | nhsCI M62; nhsTest M62.1 | MENTION | [england.nhs.uk](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-non-central-nervous-system-national-genomic-test-directory-version-16.xlsx) | high |
| Giant cell tumour of bone | nhsCI M60; nhsTest M60.1 | MENTION | [england.nhs.uk](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-non-central-nervous-system-national-genomic-test-directory-version-16.xlsx) | high |
| Spitz tumours (Spitzoid melanocytic tumours) | nhsCI M221; nhsTest M221.1 | MISSING | [england.nhs.uk](https://www.england.nhs.uk/wp-content/uploads/2018/08/cancer-non-central-nervous-system-national-genomic-test-directory-version-16.xlsx) | medium |

23 more in `gap-census-2026-11.json` (type `nhs-genomic-test-directory`).

#### <a id="rna-tests"></a>RNA tests (`rna-tests`, rank 173)

**OnCo:** 12 (Test records whose modality is an RNA or gene-expression test (classify.py class 'test' plus modality regex 'expression\|RNA\|mRNA\|microRN…) · **Denominator:** [CMS Advanced Diagnostic Laboratory Tests list (2025.3.10 version, PDF)](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) (18), read · **Denominator:** [FDA Nucleic Acid Based Tests list](https://www.fda.gov/medical-devices/in-vitro-diagnostics/nucleic-acid-based-tests) (144), read · 1 more denominators in the JSON · **Coverage:** not measured (in scope of af543f4cf9a77d918); 12 records. Count-only type by assignment; the RNA agent owns the measurement. · **Not enumerated:** Measured by the RNA agent; this type is count-only.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| DecisionDx-Melanoma (Castle Biosciences, 31-gene expression profile) (in scope of worktree-agent-af543f4cf9a77d918) | cmsAdltCode 81529; nysProjectId 58035 | MISSING | [cms.gov](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | high |
| myPath Melanoma (Myriad, 23-gene diagnostic expression profile) (in scope of worktree-agent-af543f4cf9a77d918) | cmsAdltCode 0090U | MISSING | [cms.gov](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | medium |
| Pathwork Tissue of Origin Test (FDA-cleared cancer-of-unknown-primary expressio… (in scope of worktree-agent-af543f4cf9a77d918) | fda510k K080896; K092967; K120489 | MISSING | [fda.gov](https://www.fda.gov/medical-devices/in-vitro-diagnostics/nucleic-acid-based-tests) | medium |

6 more in `gap-census-2026-11.json` (type `rna-tests`).

#### <a id="mced-tests"></a>Multi-cancer early detection tests (`mced-tests`, rank 161)

**OnCo:** 36 (Drug-kind records tagged 'mced' in all.ndjson: the 34 tests of mced-census-tests.ts (29 October and 3 November 2026 passes) plus galleri an…) · **Denominator:** [ClinicalTrials.gov API v2, query.term for 'multi-cancer early detection', 'multi-cancer detection',…](https://clinicaltrials.gov/api/v2/studies?query.term=%22multi-cancer%20early%20detection%22&pageSize=500&fields=NCTId,BriefTitle,InterventionName,LeadSponsorName,OverallStatus,StartDate) (60), read · **Denominator:** [Developer pages for tests not on ClinicalTrials.gov (Craif, Xgenera), searched from candidates the…](https://craif.com/en/) (2), read · **Coverage:** 12/14 (85.7%). Distinct tests named as interventions or sponsors' assays in the 60 ClinicalTrials.gov MCED studies (Galleri, OverC, GAGome, Harbinger, Shield MCD and Avantect via Vanguard, Exact Sciences MCED/Cance… · **Not enumerated:** MCED trials NCT05495685 (Changhai Hospital cfDNA methylation and protein model), NCT06436248 (Penn, polygenic risk and MCED for ovarian can…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| miSignal Scan urine microRNA cancer risk test (Craif, Japan) (in scope of worktree-agent-af543f4cf9a77d918) |  | MISSING | [craif.com](https://craif.com/en/) | medium |
| miONCO multi-cancer early detection test (Xgenera, UK) (in scope of worktree-agent-af543f4cf9a77d918) |  | MISSING | [xgenera.com](https://www.xgenera.com/) | medium |
| DiNanoQ platelet and immune-cell RNA MCED blood test (CCANED-CIPHER study) (in scope of worktree-agent-af543f4cf9a77d918) | nct NCT06717295 | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies/NCT06717295?fields=NCTId) | low |

1 more in `gap-census-2026-11.json` (type `mced-tests`).

#### <a id="screening-tests"></a>Screening tests (`screening-tests`, rank 27)

**OnCo:** 15 (Product-level check with incorpus.py on a defined 50-item list (below). OnCo holds the colorectal products as drug-kind test records (colog…) · **Denominator:** [openFDA PMA records for screening and early-detection product codes (PHP, SBB colorectal; MAQ, OYB…](https://api.fda.gov/device/pma.json?search=product_code:MAQ&limit=1000 (same query per code)) (38), read · **Denominator:** [openFDA 510(k) and De Novo records for KHE and OOX (faecal occult blood reagents and analysers), QY…](https://api.fda.gov/device/510k.json?search=product_code:KHE&limit=1000) (103), read · 2 more denominators in the JSON · **Coverage:** 15/50 (30.0%). Defined list of 50 brand-level products, by branch (held/listed): colorectal 5/6 (Cologuard, Cologuard Plus, Shield, SimpleScreen CRC, ColoSense held; Epi proColon not); cervical 0/13 (HPV assays hc2… · **Not enumerated:** WHO-prequalified HPV tests (careHPV, Xpert HPV and others): WHO PQ list unreachable (HTTP 000).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| cobas HPV test (Roche; cobas 4800 and cobas 5800/6800/8800) | pma P100020; P190028; fdaProductCode MAQ | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:MAQ&limit=1000) | high |
| BD Onclarity HPV Assay (extended genotyping) | pma P160037; fdaProductCode MAQ | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:MAQ&limit=1000) | high |
| Teal Wand at-home self-collection device for HPV screening (Teal Health) | deNovo DEN240045; fdaProductCode SEP | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22Teal%22&limit=1000) | high |
| CINtec PLUS Cytology (p16/Ki-67 dual stain for triage of HPV-positive screens) | pma P190024; fdaProductCode QKF | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:QKF&limit=1000) | high |
| Prostate Health Index (Beckman Coulter Access Hybritech p2PSA) | pma P090026; fdaProductCode OYA | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:OYA&limit=1000) | high |

26 more in `gap-census-2026-11.json` (type `screening-tests`).

#### <a id="serum-tumour-markers"></a>Serum tumour markers (`serum-tumour-markers`, rank 85)

**OnCo:** 21 (Analyte-level: a marker counts as held when incorpus.py returns RECORD or IN-RECORD-NAME for it (term records afp, ca-125, ca19-9, psa, chr…) · **Denominator:** [openFDA device classification, regulations 866.6010 to 866.6095 (tumour-associated antigen and rela…](https://api.fda.gov/device/classification.json?search=regulation_number:866.60*&limit=100) (33), read · **Denominator:** [openFDA 510(k) and PMA records for 28 tumour-marker product codes (866.6010, 866.6030, 866.6040 PSA…](https://api.fda.gov/device/510k.json?search=product_code:DHX&limit=1000 (and the same query per code on /510k.json and /pma.json)) (229), read · **Coverage:** 21/38 (55.3%). Analyte list = 27 analytes or algorithms with at least one FDA clearance or approval under the codes above (CEA, AFP, total PSA, free PSA, complexed PSA, p2PSA/PHI, CA-125, HE4, ROMA, OVA1/Overa, CA… · **Not enumerated:** Markers without a US product code (ProGRP, GP73, CA 242, TPA/TPS, osteopontin): no single authoritative register; ProGRP is named once (Fuj…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Des-gamma-carboxy prothrombin (DCP, PIVKA-II) | fdaProductCode OAU; k510 K062368 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:OAU&limit=1000) | high |
| Free PSA (percent free PSA) assays | fdaProductCode MTG; pma P980007; P000027; P970038; P250026 | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:MTG&limit=1000) | high |
| AFP-L3% (lens culinaris agglutinin-reactive alpha-fetoprotein) | fdaProductCode NSF; deNovo DEN050002; k510 K100464 | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:NSF&limit=1000) | high |

11 more in `gap-census-2026-11.json` (type `serum-tumour-markers`).

#### <a id="ihc-protein-assays"></a>IHC and protein assays (`ihc-protein-assays`, rank 155)

**OnCo:** 27 (Drug-kind test records whose modality names immunohistochemistry, ISH or FISH (tests.ts, tests-cdx-devices.ts: 22C3, 28-8, SP142, SP263, he…) · **Denominator:** [FDA List of Cleared or Approved Companion Diagnostic Devices (content current as of 11/03/2026), ti…](https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools) (27), read · **Denominator:** [openFDA classification and 510(k)/PMA records under 21 CFR 864.1860 (immunohistochemistry reagents…](https://api.fda.gov/device/classification.json?search=regulation_number:864.18*&limit=100) (11), read · 1 more denominators in the JSON · **Coverage:** 22/27 (81.5%). FDA CDx tissue IHC/ISH/FISH products, each checked with incorpus.py by name, brand and clone. Missing or mention-only: HER2 CISH pharmDx, SPOT-Light HER2 CISH, InSite Her-2/neu (CB11), PDGFRB FISH, K… · **Not enumerated:** CE-IVD and LDT IHC menus (Roche/Ventana, Agilent, Leica catalogues: several hundred clones) were not enumerated; only FDA devices and two l…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| VENTANA CONFIRM anti-Estrogen Receptor (SP1) and anti-Progesterone Receptor (1E… | k510 K110215; K103818; fdaProductCode MYA; MXZ | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:MYA&limit=1000) | high |
| Agilent (Dako) ER/PR IHC: ER alpha clone EP1, PR clones PgR 636 and PgR 1294, E… | k510 K042884; K120663; K130861; K170005; K170028 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:MXZ&limit=1000) | medium |
| ROS1 immunohistochemistry screen (clones D4D6, SP384) | pmid 23887156; 31349061; doi 10.1097/pas.0b013e3182960fa7;… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&sort=CITED%20desc&pageSize=3&query=TITLE%3A%22ROS1%22%20AND%20TITLE%3A%22immunohistochemistry%22%20AND%20ABSTRACT%3A%22D4D6%22) | medium |

10 more in `gap-census-2026-11.json` (type `ihc-protein-assays`).

#### <a id="imaging-examinations"></a>Imaging examinations (`imaging-examinations`, rank 135)

**OnCo:** 52 (Technology records in the imaging and diagnostics sections (ct, mri, ultrasound, x-ray-radiography-fluoroscopy, mammography, contrast-enhan…) · **Denominator:** [RadiologyInfo.org (ACR and RSNA) English sitemap, all /en/info/ article pages](https://www.radiologyinfo.org/sitemap-en.xml) (289), read · **Denominator:** [openFDA PMA product code PAA (automated breast ultrasound)](https://api.fda.gov/device/pma.json?search=product_code:PAA&limit=1000) (2), read · 1 more denominators in the JSON · **Coverage:** 52/68 (76.5%). 54 cancer-relevant RadiologyInfo exams and image-guided procedures (42 held) plus 14 examinations named in the assignment and not on RadiologyInfo as separate pages (MUGA, whole-body MRI, PSMA, FES,… · **Not enumerated:** ACR Appropriateness Criteria topic list (acsearch.acr.org) not fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| BI-RADS assessment categories on the breast imaging report |  | MENTION | [radiologyinfo.org](https://www.radiologyinfo.org/en/info/article-breast-imaging) | high |
| Lymphoscintigraphy (sentinel lymph node mapping scan) |  | MISSING | [radiologyinfo.org](https://www.radiologyinfo.org/en/info/lympho) | medium |
| Radiation dose from X-ray and CT examinations |  | MISSING | [radiologyinfo.org](https://www.radiologyinfo.org/en/info/safety-xray) | medium |

12 more in `gap-census-2026-11.json` (type `imaging-examinations`).

#### <a id="cytology-pathology-techniques"></a>Cytology and pathology techniques (`cytology-pathology-techniques`, rank 133)

**OnCo:** 15 (incorpus.py on a defined 25-technique list; held: frozen section (intraoperative-margin-assessment-breast), fine-needle aspiration and core…) · **Denominator:** [College of American Pathologists, Current Cancer Protocols](https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates) (97), read · **Denominator:** [openFDA device classification, pathology regulations 864.1850 (dye and chemical solution stains, 80…](https://api.fda.gov/device/classification.json?search=regulation_number:864.18*&limit=100) (141), read · 1 more denominators in the JSON · **Coverage:** 15/25 (60.0%). Defined list of 25 techniques assembled from the CAP protocol structure (specimen, special studies, biomarker templates) and the FDA pathology device regulations; each checked with incorpus.py. Not h… · **Not enumerated:** CAP protocols were counted but not diffed one by one against OnCo cancer pages (they are reporting templates for cancers OnCo largely holds…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Synoptic pathology reporting: CAP cancer protocols and ICCR datasets |  | MENTION | [cap.org](https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates) | high |
| Histochemical special stains (PAS, mucicarmine, Alcian blue, Congo red, reticul… | fdaProductCode HZC; ICH; IDA; KKS; HZT; HZX (21 CFR 864.185… | MISSING | [api.fda.gov](https://api.fda.gov/device/classification.json?search=regulation_number:864.18*&limit=100) | medium |
| Rapid on-site evaluation (ROSE) of fine-needle aspirates | pmid 34116031; 21030491; doi 10.1053/j.gastro.2021.06.005;… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&sort=CITED%20desc&pageSize=2&query=TITLE%3A%22rapid%20on-site%20evaluation%22) | medium |

3 more in `gap-census-2026-11.json` (type `cytology-pathology-techniques`).

#### <a id="protein-multianalyte-tests"></a>Protein and multianalyte algorithmic tests (MAAA): lung nodule classifiers, serum proteomic signatures, IHC-algorithm and image-based risk tests (added: not in the assigned list) (`protein-multianalyte-tests`, rank 121)

**OnCo:** 3 (Test records that are protein or multianalyte algorithms rather than sequencing: proclarix, oncoseek, onetest (plus MCED protein tests in m…) · **Denominator:** [CMS Advanced Diagnostic Laboratory Tests under the Medicare CLFS (PDF; list version 2025.3.10)](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) (17), read · **Coverage:** 9/17 (52.9%). All 17 oncology ADLTs checked with incorpus.py. Covered: Shield, xT CDx, NavDx, Signatera, Guardant360 CDx, FoundationOne Liquid CDx, myChoice CDx, FoundationOne CDx, and DecisionDx-UM (via the term… · **Not enumerated:** FDA-cleared serum multivariate index tests (OVA1, ROMA, Prostate Health Index) and immunoassay tumour markers by product code (LTJ, LTK, NI…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Nodify CDT (Biodesix, 7-autoantibody lung nodule test) | cmsAdltCode 0360U | MISSING | [cms.gov](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | medium |
| Nodify XL2 / BDX-XL2 (Biodesix, plasma proteomic lung nodule classifier) | cmsAdltCode 0080U | MISSING | [cms.gov](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | medium |
| DCISionRT (PreludeDx, DCIS radiotherapy-benefit test) | cmsAdltCode 0295U | MENTION | [cms.gov](https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf) | medium |

2 more in `gap-census-2026-11.json` (type `protein-multianalyte-tests`).

### Machines and devices

#### <a id="pet-spect-nuclear-scanners"></a>PET, SPECT and nuclear medicine scanners (`pet-spect-nuclear-scanners`, rank 107)

**OnCo:** 8 (Technology records that are nuclear-imaging MACHINE families (not tracers): pet, pet-ct, pet-mri, total-body-pet-screening, nuclear-medicin…) · **Denominator:** [openFDA 510(k), product code KPS 'System, Tomography, Computed, Emission' (21 CFR 892.1200), decisi…](https://api.fda.gov/device/510k.json?search=product_code:KPS+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (89), read · **Denominator:** [openFDA 510(k), product code OUO 'Tomographic Imager Combining Emission Computed Tomography With Nu…](https://api.fda.gov/device/510k.json?search=product_code:OUO+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (8), read · 4 more denominators in the JSON · **Coverage:** families 14/19 (73.7%); products 11/38 (28.9%). Products: 38 distinct hardware product lines cleared by FDA under KPS, OUO and QXL between 2018-01-01 and 2026-11-04 (software excluded), each checked with incorpus.py by brand and maker. 'Covered' =… · **Not enumerated:** China NMPA-registered PET/CT and SPECT/CT models (Minfound, Sinounion, Neusoft and others): NMPA database not read this session

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Organ-dedicated PET scanners (brain PET and breast/organ-targeted PET) | FDA 510(k) K241751 (NeuroLF), K232569 (CAREMIBRAIN), K25017… | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250170.pdf) | medium |
| Specimen PET/CT cabinet imagers | FDA 510(k) K231420; FDA product code QXL 'Cabinet, Emission… | MISSING | [accessdata.fda.gov](https://www.accessdata.fda.gov/cdrh_docs/pdf23/K231420.pdf) | medium |
| uPMR 790 PET/MR | FDA 510(k) K183014; K192672; K222540; K234154; FDA product… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:OUO+AND+decision_date:[2018-01-01+TO+2026-12-31) | medium |

18 more in `gap-census-2026-11.json` (type `pet-spect-nuclear-scanners`).

#### <a id="mri-ct-scanners"></a>MRI and CT scanners (`mri-ct-scanners`, rank 70)

**OnCo:** 15 (Technology records that are CT/MRI/X-ray machine families: ct, low-dose-ct-screening, dual-energy-spectral-ct, photon-counting-ct, x-ray-ra…) · **Denominator:** [openFDA 510(k), product code LNH 'System, Nuclear Magnetic Resonance Imaging' (21 CFR 892.1000), de…](https://api.fda.gov/device/510k.json?search=product_code:LNH+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (250), read · **Denominator:** [openFDA 510(k), product code JAK 'System, X-Ray, Tomography, Computed' (21 CFR 892.1750), 2018-2026](https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (233), read · 4 more denominators in the JSON · **Coverage:** families 13/23 (56.5%); products 5/146 (3.4%). Products: 76 MRI + 70 CT scanner product lines cleared by FDA 2018-2026 (LNH, JAK), regex-extracted and deduplicated, each checked with incorpus.py and snippets read. Named: MAGNETOM Terra (MRI); Bod… · **Not enumerated:** NMPA (China) and PMDA (Japan) scanner registrations: not read this session

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| CT-guided needle-insertion robots and percutaneous navigation systems | FDA 510(k) K221116 (XACT ACE), K211645 (Epione), K203720 (M… | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+decision_date:[2018-01-01+TO+2026-12-31) | high |
| MR simulation and MR-only radiotherapy planning (in scope of worktree-agent-af02bea435e62c464) | FDA 510(k) K182888 (MRCAT Pelvis), K193109 (MRCAT brain), K… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:MRCAT&limit=20) | medium |
| Photonova Spectra CT (GE HealthCare) | FDA 510(k) K253520; FDA product code JAK | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+decision_date:[2018-01-01+TO+2026-12-31) | medium |

18 more in `gap-census-2026-11.json` (type `mri-ct-scanners`).

#### <a id="breast-imaging-localisation"></a>Breast imaging and lesion localisation devices (`breast-imaging-localisation`, rank 83)

**OnCo:** 6 (Technology records for breast imaging machines: mammography ('Mammography & tomosynthesis'), contrast-enhanced-mammography, ai-mammography-…) · **Denominator:** [openFDA 510(k) + PMA, product code MUE 'Full Field Digital, System, X-Ray, Mammographic' (all-time:…](https://api.fda.gov/device/510k.json?search=product_code:MUE&limit=1000) (62), read · **Denominator:** [openFDA PMA, product codes OTE (Digital Breast Tomosynthesis, 4 originals), PAA (Automated Breast U…](https://api.fda.gov/device/pma.json?search=product_code:PAA&limit=1000) (11), read · 4 more denominators in the JSON · **Coverage:** families 10/20 (50.0%); products 14/45 (31.1%). Products: a defined list of 45 breast imaging, localisation, specimen, biopsy-guidance and breast-AI product lines from the FDA sources above, each checked with incorpus.py and snippets read. Named a… · **Not enumerated:** Wire localisation needles (class I, FDA code MIJ 'Needle, Tumor Localization', no 510(k) required): no machine-readable product list

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Automated breast ultrasound (ABUS) | FDA PMA P110006 (SOMO.V ABUS, 2012-09-18; Invenia ABUS supp… | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:PAA&limit=1000) | high |
| Breast lesion localisation devices (wire, radioactive seed, magnetic seed, rada… | FDA 510(k) K173587 (Magseed, 2018-02-16), K181007 (SAVI Sco… | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:NEU+AND+decision_date:[2018-01-01+TO+2026-12-31) | high |
| Breast ultrasound tomography (SoftVue) | FDA PMA P200040 (2021-10-06); FDA product code PAA | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:PAA&limit=1000) | medium |

15 more in `gap-census-2026-11.json` (type `breast-imaging-localisation`).

#### <a id="ultrasound-optical-photoacoustic"></a>Ultrasound, optical and photoacoustic imaging (`ultrasound-optical-photoacoustic`, rank 97)

**OnCo:** 9 (Technology records: ultrasound, ultrasound-elastography-ceus, hand-held-ultrasound, optical-imaging, confocal-oct-skin-imaging, dermoscopy-…) · **Denominator:** [openFDA 510(k), product code OWN 'Confocal Optical Imaging' (21 CFR 876.1500), 2018-2026](https://api.fda.gov/device/510k.json?search=product_code:OWN+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (40), read · **Denominator:** [openFDA 510(k), product code NQQ 'System, Imaging, Optical Coherence Tomography', 2018-2026](https://api.fda.gov/device/510k.json?search=product_code:NQQ+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (23), read · 6 more denominators in the JSON · **Coverage:** families 11/22 (50.0%); products 18/34 (52.9%). Products: a defined list of 34 oncology-relevant ultrasound, optical and skin-imaging products from the FDA and NICE sources above, each checked with incorpus.py and snippets read; 'Histolog' removed… · **Not enumerated:** General ultrasound scanners (FDA IYN, IYO, ITX: thousands of clearances): not diffed product by product

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Breast thermography (unproven as a screening test) | FDA product codes LHQ (System, Telethermographic, Adjunctiv… | MISSING | [fda.gov](https://www.fda.gov/consumers/consumer-updates/breast-cancer-screening-thermogram-no-substitute-mammogram) | high |
| Photoacoustic (optoacoustic) imaging | FDA PMA P200003 (Imagio Breast Imaging System, 2021-01-11);… | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:QNK&limit=1000) | medium |
| Prostate micro-ultrasound | FDA 510(k) K180636; K190995; K192303 (ExactVu High Resoluti… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:ExactVu&limit=6) | medium |

12 more in `gap-census-2026-11.json` (type `ultrasound-optical-photoacoustic`).

#### <a id="endoscopy-capsule-sampling"></a>Endoscopy, capsule and sampling devices (`endoscopy-capsule-sampling`, rank 108)

**OnCo:** 7 (Technology records on /machines/ 'Endoscopes and clinic imaging' that are endoscopy machines: endoscopic-ultrasound-systems ('Endoscopic ul…) · **Denominator:** [openFDA 510(k), product code QNP 'Gastrointestinal Lesion Software Detection System' (21 CFR 876.15…](https://api.fda.gov/device/510k.json?search=product_code:QNP+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (23), read · **Denominator:** [openFDA 510(k)/De Novo, capsule codes NEZ (wireless GI capsule), NSI (oesophageal capsule), PGD (co…](https://api.fda.gov/device/510k.json?search=product_code:QKZ+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (26), read · 4 more denominators in the JSON · **Coverage:** families 13/22 (59.1%); products 18/35 (51.4%). Products: 35 endoscopy, capsule, AI-detection, bronchoscopy and cell-collection product lines from the FDA codes above, checked with incorpus.py plus a direct grep of short brand names (Ion and Monar… · **Not enumerated:** Medical thoracoscopy/pleuroscopy, hysteroscopy and nasendoscopy/laryngoscopy: only passing mentions; equipment lists not pulled (scopes fil…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cholangioscopy (single-operator digital cholangioscopy) | FDA 510(k) K181439 (SpyGlass DS and DS II Direct Visualizat… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22SpyGlass%20DS%22&limit=4) | high |
| Galaxy robotic bronchoscopy system (Noah Medical) | FDA 510(k) K223144; FDA product code EOQ | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:EOQ+AND+decision_date:[2018-01-01+TO+2026-12-31) | medium |
| superDimension and ILLUMISITE electromagnetic navigation bronchoscopy (Medtroni… | FDA 510(k) K173244 (superDimension Navigation System V7.2),… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:JAK+AND+decision_date:[2018-01-01+TO+2026-12-31) | medium |

14 more in `gap-census-2026-11.json` (type `endoscopy-capsule-sampling`).

#### <a id="biopsy-systems"></a>Biopsy systems (`biopsy-systems`, rank 57)

**OnCo:** 4 (No technology record is a biopsy SYSTEM. Biopsy is held as glossary terms (biopsy, core-needle-biopsy with aka bone marrow biopsy/CT-guided…) · **Denominator:** [openFDA 510(k), product code KNW 'Instrument, Biopsy' (21 CFR 876.1075), 2018-2026](https://api.fda.gov/device/510k.json?search=product_code:KNW+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (68), read · **Denominator:** [openFDA 510(k), product codes FCG 'Biopsy Needle' (EUS needles, 17) and IZH 'System, X-Ray, Mammogr…](https://api.fda.gov/device/510k.json?search=product_code:IZH+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (20), read · 4 more denominators in the JSON · **Coverage:** families 7/17 (41.2%); products 4/30 (13.3%). Products: 30 biopsy product lines from the FDA and NICE sources above, checked with incorpus.py and snippets read. Named (4): PrecisionPoint, Streck Cell-Free DNA BCT, PAXgene ccfDNA, Roche cfDNA tub… · **Not enumerated:** Endometrial sampling devices (e.g. Pipelle) and skin punch biopsy tools: class I or generic codes, no product list pulled

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Stereotactic and tomosynthesis-guided breast biopsy systems | FDA 510(k) K153486 (Affirm Prone Biopsy System), K202294 (A… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:IZH+AND+decision_date:[2018-01-01+TO+2026-12-31) | high |
| Teal Wand at-home vaginal self-collection device for HPV cervical screening | FDA De Novo DEN240045 (2025-05-09); FDA product code SEP (D… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22Teal%20Wand%22&limit=4) | high |
| MRI-ultrasound fusion prostate biopsy systems | NICE HTG678 (formerly DG53, 2023-05-24) evaluates 9 systems… | MENTION | [nice.org.uk](https://www.nice.org.uk/guidance/htg678/chapter/2-The-diagnostic-tests) | high |

8 more in `gap-census-2026-11.json` (type `biopsy-systems`).

#### <a id="pathology-scanners-ai"></a>Pathology scanners, stainers and AI devices (`pathology-scanners-ai`, rank 128)

**OnCo:** 9 (Technology records: whole-slide-scanners ('Whole-slide scanners and image management'), digital-pathology-ai, ai-pathology-scoring, ai-mito…) · **Denominator:** [openFDA 510(k), product code PSY 'Whole Slide Imaging System' (21 CFR 864.3700), 2018-2026](https://api.fda.gov/device/510k.json?search=product_code:PSY+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (21), read · **Denominator:** [openFDA 510(k)/De Novo, product codes QKQ (DP image viewing, 14), QPN (pathology AI, 2), SHW (breas…](https://api.fda.gov/device/510k.json?search=product_code:QKQ+AND+decision_date:[2018-01-01+TO+2026-12-31]&limit=1000) (28), read · 3 more denominators in the JSON · **Coverage:** families 9/15 (60.0%); products 24/45 (53.3%). Products: 45 pathology product lines (21 FDA PSY systems collapsed to product lines, QKQ viewers, QPN/SHW/SFH/SIX/QYV AI devices, MNM/MKQ cytology systems, SAL/JOY morphology analysers, major stainer… · **Not enumerated:** Class I histology instruments (tissue processors, embedding centres, microtomes, cryostats, coverslippers): no FDA list; EMDN lists the fam…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Digital blood-film and bone-marrow aspirate morphology analysers | FDA De Novo DEN230034 (Scopio X100 with Full Field Bone Mar… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:SAL+AND+decision_date:[2018-01-01+TO+2026-12-31) | medium |
| Automated cervical cytology imagers (incl. AI) | FDA PMA P020002 (ThinPrep Imaging System, 2003), P950009 (A… | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:MNM&limit=1000) | medium |
| Liquid-based cytology processors (ThinPrep, SurePath/PrepStain) | FDA PMA P950039 (ThinPrep Processor TP 2000; ThinPrep 5000… | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:MKQ&limit=1000) | medium |

7 more in `gap-census-2026-11.json` (type `pathology-scanners-ai`).

#### <a id="lab-instruments"></a>Laboratory instruments (sequencers, PCR, flow, spatial) (`lab-instruments`, rank 139)

**OnCo:** 11 (Technology records that are laboratory instrument families: next-gen-short-read-platforms, long-read-sequencing, flow-cytometers, spatial-b…) · **Denominator:** [openFDA device registration and listing, product code PFF 'High Throughput DNA Sequence Analyzer' (…](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:PFF&limit=100) (15), read · **Denominator:** [openFDA 510(k)/De Novo/PMA device-name searches for oncology lab instruments: QXDx AutoDG ddPCR (OY…](https://api.fda.gov/device/510k.json?search=device_name:EXENT&limit=3) (20), read · 3 more denominators in the JSON · **Coverage:** families 14/23 (60.9%); products 32/48 (66.7%). Products: 48 laboratory platforms (FDA-listed Dx sequencers, research sequencers, digital and real-time PCR, cartridges, clinical and spectral flow cytometers, mass cytometry, M-protein mass spectrom… · **Not enumerated:** Research single-cell and spatial instruments beyond the majors (e.g. STOmics Stereo-seq, Seer Proteograph): no regulator list; vendor pages…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| MALDI-TOF mass spectrometry for M-protein (EXENT, MASS-FIX) | FDA 510(k) K250159 (Immunoglobulin Isotypes (GAM) for the E… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:EXENT&limit=3) | high |
| Serum free light chain assay (Freelite) and heavy/light chain assay (Hevylite) | FDA 510(k) K231290 (Optilite Freelite Kappa/Lambda Free Kit… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:Freelite&limit=3) | medium |
| Capillary electrophoresis and immunotyping analysers (Sebia Capillarys) | FDA 510(k) K192095 (CAPI 3 Immunotyping, Capillarys 3 Tera,… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:Capillarys&limit=3) | medium |

9 more in `gap-census-2026-11.json` (type `lab-instruments`).

#### <a id="machine-density-registries"></a>Machine inventories by country (`machine-density-registries`, rank 98)

**OnCo:** 1 (Records that hold machine-density data or registries: technology radiotherapy-access-gap (cites IAEA DIRAC in text). No collection or data-…) · **Denominator:** [OECD Data Explorer, dataflow OECD.ELS.HD DSD_HEALTH_REAC_HOSP@DF_MED_TECH 'Medical technology avail…](https://sdmx.oecd.org/public/rest/data/OECD.ELS.HD,DSD_HEALTH_REAC_HOSP@DF_MED_TECH,1.1/all?startPeriod=2022&format=csvfilewithlabels) (3608), read · **Denominator:** [IAEA DIRAC (DIrectory of RAdiotherapy Centres)](https://dirac.iaea.org/), read · 2 more denominators in the JSON · **Coverage:** families 0/3 (0.0%); products 1/14 (7.1%). OnCo country pages that state any OECD machine-density figure, out of the 14 OnCo country pages whose country is in the OECD medical-technology dataset (grep for 'per million', 'scanners per', 'units… · **Not enumerated:** WHO GHO device-density indicators and the WHO Global Atlas of Medical Devices: API returned 503 twice; not read

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| IAEA IMAGINE medical imaging and nuclear medicine resources database | URL https://humanhealth.iaea.org/HHW/DBStatistics/IMAGINE.h… | MISSING | [humanhealth.iaea.org](https://humanhealth.iaea.org/HHW/DBStatistics/IMAGINE.html) | medium |
| OECD medical technology availability (CT, MRI, PET, gamma cameras, mammographs,… | OECD dataflow OECD.ELS.HD:DSD_HEALTH_REAC_HOSP@DF_MED_TECH(… | MENTION | [sdmx.oecd.org](https://sdmx.oecd.org/public/rest/data/OECD.ELS.HD) | medium |
| IAEA DIRAC (DIrectory of RAdiotherapy Centres) as a data source (in scope of worktree-agent-af02bea435e62c464) | URL https://dirac.iaea.org/ | MENTION | [dirac.iaea.org](https://dirac.iaea.org/) | medium |

#### <a id="brachytherapy-sources-microspheres"></a>Brachytherapy, seeds and radioembolisation microspheres (`brachytherapy-sources-microspheres`, rank 44)

**OnCo:** 12 (Technology records whose subject is a brachytherapy delivery method or source, plus device-class drug records and the companies that make n…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t1-510k](https://api.fda.gov/device/510k.json?search=product_code:(KXK+OR+ONL+OR+JAQ+OR+IWJ+OR+OIN+OR+IWG+OR+IWI+OR+IWA+OR+IWF+OR+HRL+OR+QXR+OR+NMP)&limit=1000) (414), read · 10 more denominators in the JSON · **Coverage:** families 3/17 (17.6%); products 12/30 (40.0%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** CE-marked sources outside the US (e.g. Chinese I-125 seed makers, Indian and Russian afterloaders): no machine-readable EU or NMPA device r…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Holmium-166 microspheres (QuiremSpheres) | pmid 28786008 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE_ABS%3A%22QuiremSpheres%22+OR+TITLE_ABS%3A%22holmium-166+microspheres%22&format=json) | high |
| Ruthenium-106 eye plaques (BEBIG plaques) | fda510k K931393; fdaProductCode KXK | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K931393&limit=1) | high |
| TheraSeed palladium-103 seeds (Theragenics) | fda510k K010283; fdaProductCode KXK | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K010283&limit=1) | high |

18 more in `gap-census-2026-11.json` (type `brachytherapy-sources-microspheres`).

#### <a id="rt-accessories"></a>Radiotherapy accessories (spacers, fiducials, immobilisation) (`rt-accessories`, rank 36)

**OnCo:** 11 (Technology records on radiotherapy guidance and quality that are not delivery platforms, plus glossary terms that stand in for missing fami…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t2-510k](https://api.fda.gov/device/510k.json?search=product_code:(OVB+OR+PCT+OR+QUV+OR+QRN+OR+NZT+OR+MWW+OR+IWE+OR+JAI+OR+IXI)&limit=1000) (134), read · 3 more denominators in the JSON · **Coverage:** families 4/16 (25.0%); products 6/33 (18.2%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** Class I exempt accessories (masks, vacuum bags, wedges) are not individually cleared, so FDA lists understate them; vendor catalogues (CIVC…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Rectal spacers: Barrigel hyaluronic acid gel | fda510k K220641; fdaProductCode OVB | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K220641&limit=1) | high |
| SpaceOAR Vue radiopaque hydrogel spacer | fda510k K182971; fdaProductCode OVB | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K182971&limit=1) | high |
| Endorectal immobilisation balloons | fdaDeNovo DEN130036; fdaProductCode PCT | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:DEN130036&limit=1) | medium |
| Implanted and real-time dosimeters: OARtrac | fda510k K182395; fdaProductCode NZT | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K182395&limit=1) | medium |
| Radiotherapy bolus (3D-printed and tissue-equivalent): VSP Bolus | fda510k K214093; fdaProductCode IXI | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K214093&limit=1) | medium |

15 more in `gap-census-2026-11.json` (type `rt-accessories`).

#### <a id="surgical-robots-navigation"></a>Surgical robots and navigation (`surgical-robots-navigation`, rank 72)

**OnCo:** 8 (Technology records for surgical robots, robotic bronchoscopy, intraoperative MRI/CT and TORS; company records for needle-guidance robots. T…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t3-510k](https://api.fda.gov/device/510k.json?search=product_code:(NAY+OR+QSM+OR+SAB+OR+SCV+OR+SIR+OR+QNM+OR+PNL+OR+PJB+OR+QXG+OR+SAQ)+AND+decision_date:[2015-01-01+TO+2026-12-31]&limit=1000) (155), read · 6 more denominators in the JSON · **Coverage:** families 7/17 (41.2%); products 11/38 (28.9%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** Chinese NMPA and Japanese PMDA robot approvals (KangDuo, Edge MP1000, Revo-i): no machine-readable register read; Toumai and hinotori verif…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ClearPoint MRI-guided stereotactic system | fda510k K243657; fdaProductCode HAW | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K243657&limit=1) | high |
| da Vinci SP single-port system | fda510k K253556; fdaProductCode NAY | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K253556&limit=1) | high |
| superDimension electromagnetic navigation bronchoscopy | fda510k K173244; fdaProductCode JAK | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K173244&limit=1) | high |

21 more in `gap-census-2026-11.json` (type `surgical-robots-navigation`).

#### <a id="ablation-systems"></a>Ablation systems (`ablation-systems`, rank 78)

**OnCo:** 21 (Technology records for thermal, non-thermal, ultrasound, laser and light-based ablation; device-class drug records. Technology records pres…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t4-510k](https://api.fda.gov/device/510k.json?search=product_code:(NEY+OR+OAB+OR+QGM+OR+PLP+OR+OHV+OR+NTB+OR+ONO+OR+QXW+OR+QTZ+OR+QZL+OR+MUL)+AND+decision_date:[2012-01-01+TO+2026-12-31]&limit=1000) (124), read · 7 more denominators in the JSON · **Coverage:** families 9/25 (36.0%); products 19/40 (47.5%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** Chinese microwave ablation makers beyond those with 510(k)s (NMPA register not read)

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Bone tumour radiofrequency ablation: OsteoCool | fda510k K253656; fdaProductCode GEI | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K253656&limit=1) | high |
| Endoscopic radiofrequency ablation for Barrett's oesophagus (Barrx HALO) | fda510k K120431; fdaProductCode GEI | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K120431&limit=1) | high |
| Sonablate prostate HIFU | fda510k K160942; fdaProductCode PLP | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K160942&limit=1) | high |

16 more in `gap-census-2026-11.json` (type `ablation-systems`).

#### <a id="fields-hyperthermia-perfusion"></a>Fields, hyperthermia and perfusion devices (`fields-hyperthermia-perfusion`, rank 112)

**OnCo:** 15 (Technology records for fields, hyperthermia and regional perfusion; device drug records; glossary terms standing in for pumps. Technology r…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device pma records: t5-pma](https://api.fda.gov/device/pma.json?search=product_code:(NZK+OR+QGZ+OR+SDA+OR+SHC+OR+LOC+OR+PAS+OR+LSY+OR+LNB+OR+LNC+OR+LMZ+OR+OKN+OR+LKK+OR+LNR)&limit=1000) (931), read · 6 more denominators in the JSON · **Coverage:** families 10/19 (52.6%); products 9/12 (75.0%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** BSD-2000 HDE and other HDE approvals: openFDA PMA returned no PAS records

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Hepatic arterial infusion pumps (Intera 3000 / Infusaid) | fdaPMA P800036; fdaProductCode LKK | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=pma_number:P800036&limit=100) | high |
| Electromotive drug administration (EMDA) for bladder cancer | pmid 21831711 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE_ABS%3A%22electromotive+drug+administration%22+AND+TITLE_ABS%3A%22bladder+cancer%22&format=json) | medium |
| SynchroMed implanted programmable pump (Medtronic) | fdaPMA P860004; fdaProductCode LKK | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=pma_number:P860004&limit=100) | medium |

10 more in `gap-census-2026-11.json` (type `fields-hyperthermia-perfusion`).

#### <a id="embolisation-devices"></a>Embolisation devices (`embolisation-devices`, rank 51)

**OnCo:** 5 (Only procedure records exist (TACE, TARE); no technology record has an embolic device as its subject. Technology records present: tace, rad…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t6-510k](https://api.fda.gov/device/510k.json?search=product_code:(KRD+OR+NAJ+OR+NOY+OR+QZU)+AND+decision_date:[2012-01-01+TO+2026-12-31]&limit=1000) (103), read · 8 more denominators in the JSON · **Coverage:** families 0/11 (0.0%); products 2/17 (11.8%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** CE-only beads beyond those checked (e.g. Chinese bead makers without 510(k)): no EU or NMPA register read

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Drug-eluting beads: DC Bead / LC Bead (Boston Scientific) |  | MISSING | [bostonscientific.com](https://www.bostonscientific.com/en-EU/products/embolics/dc-bead.html) | high |
| Oncozene drug-loadable microspheres (Varian) | fda510k K242794; fdaProductCode KRD | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K242794&limit=1) | high |
| QuadraSphere / HepaSphere microspheres (Merit) | fda510k K172372; fdaProductCode KRD | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K172372&limit=1) | high |

11 more in `gap-census-2026-11.json` (type `embolisation-devices`).

#### <a id="margin-intraop-devices"></a>Margin assessment and intraoperative devices (`margin-intraop-devices`, rank 32)

**OnCo:** 9 (Technology records for margin assessment, sentinel node and intraoperative fluorescence; company and drug records for paired products. Tech…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t7-510k](https://api.fda.gov/device/510k.json?search=product_code:(SHH+OR+IZD+OR+MWP+OR+MIJ+OR+PUV+OR+QDF+OR+QDG)+AND+decision_date:[2010-01-01+TO+2026-12-31]&limit=1000) (29), read · 8 more denominators in the JSON · **Coverage:** families 4/17 (23.5%); products 4/23 (17.4%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** Gamma probes are mostly class I exempt, so FDA lists hold almost none (IZD returned SurgicEye only)

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Non-wire breast localisation: SAVI SCOUT radar reflector | fda510k K252892; fdaProductCode NEU | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K252892&limit=1) | high |
| Magnetic sentinel node detection: Magtrace and Sentimag (PMA) | fdaPMA P160053; fdaProductCode PUV | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=pma_number:P160053&limit=100) | high |
| Tumour-bed markers: BioZorb | fda510k K192371; fdaProductCode NEU | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K192371&limit=1) | medium |
| Parathyroid autofluorescence detection: PTeye (De Novo) | fdaDeNovo DEN170056; fdaProductCode QDF | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:DEN170056&limit=1) | medium |
| Sirius Pintuition magnetic seed localisation | fda510k K223682; fdaProductCode PBY | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K223682&limit=1) | medium |

11 more in `gap-census-2026-11.json` (type `margin-intraop-devices`).

#### <a id="neuro-oncology-devices"></a>Neuro-oncology devices (`neuro-oncology-devices`, rank 62)

**OnCo:** 7 (Shared technology records used in brain-tumour care plus drug and term records; no technology record is dedicated to a neuro-oncology deliv…) · **Denominator:** [openFDA device classification (all product codes, used to build the family taxonomy)](https://api.fda.gov/device/classification.json?limit=1000&skip=0 (8 pages)) (7097), read · **Denominator:** [openFDA device 510k records: t8-510k](https://api.fda.gov/device/510k.json?search=product_code:(QFX+OR+MGI+OR+LBK+OR+GZT)+AND+decision_date:[2012-01-01+TO+2026-12-31]&limit=1000) (18), read · 2 more denominators in the JSON · **Coverage:** families 1/13 (7.7%); products 1/8 (12.5%). Product level: curated list of FDA-cleared or approved product lines in this type's core product codes (each identifier fetched from openFDA), checked with incorpus.py plus narrower aliases where a h… · **Not enumerated:** Ultrasonic aspirators: classification code found but no clearances returned since 2012 under MGI/LBK

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Convection-enhanced delivery cannula: SmartFlow (De Novo) | fdaDeNovo DEN240023; fdaProductCode SDG | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:DEN240023&limit=1) | high |
| Minimally invasive brain access ports: NICO BrainPath | fda510k K172433; fdaProductCode GZT | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K172433&limit=1) | medium |
| 5-ALA microscope filters: Leica FL400 (De Novo, QFX) | fdaDeNovo DEN180024; fdaProductCode QFX | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:DEN180024&limit=1) | medium |

7 more in `gap-census-2026-11.json` (type `neuro-oncology-devices`).

#### <a id="rt-delivery-platforms"></a>Radiotherapy delivery platforms (`rt-delivery-platforms`, rank 119)

**OnCo:** 24 (The 18 Radiotherapy machines and 6 Particle therapy ids on /machines/ (src/app/machines/page.tsx), checked present as technology records. T…) · **Denominator:** [openFDA 510(k) IYE, LHN, IWL, JAD since 2018 (systems and accelerators)](https://api.fda.gov/device/510k.json?search=product_code:(IYE+OR+LHN+OR+IWL+OR+JAD)+AND+decision_date:[2018-01-01+TO+2026-12-31]+AND+device_name:(system+OR+accelerator+OR+therapy+OR+radiotherapy+OR+proton+OR+linac+OR+x-ray)&limit=1000) (49), read · **Coverage:** not measured; rough estimate 16/25 platforms (in scope of af02bea435e62c464). In scope of worktree-agent-af02bea435e62c464; measured briefly only. · **Not enumerated:** Full delivery census left to worktree-agent-af02bea435e62c464

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Elekta Harmony linac (in scope of worktree-agent-af02bea435e62c464) | fda510k K210500; fdaProductCode IYE | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K210500&limit=1) | medium |
| Xstrahl RADiant Aura (superficial / orthovoltage) (in scope of worktree-agent-af02bea435e62c464) | fda510k K230611; fdaProductCode JAD | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K230611&limit=1) | medium |
| Sensus IORT System (in scope of worktree-agent-af02bea435e62c464) | fda510k K182641; fdaProductCode JAD | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=k_number:K182641&limit=1) | medium |

1 more in `gap-census-2026-11.json` (type `rt-delivery-platforms`).

#### <a id="infusion-pumps"></a>Infusion pumps and syringe drivers (`infusion-pumps`, rank 48)

**OnCo:** 1 (Technology records whose name/aka/tldr cover infusion pumps (kwscan of all.ndjson): only infusion-devices-vascular-access ('Infusion pumps,…) · **Denominator:** [openFDA device classification (product codes for infusion pumps)](https://api.fda.gov/device/classification.json?search=device_name:"pump, infusion"&limit=100) (13), read · **Denominator:** [openFDA 510(k) by product code FRN, MEA, MEB, QJY](https://api.fda.gov/device/510k.json?search=product_code:FRN&limit=100&skip=0) (972), read · 1 more denominators in the JSON · **Coverage:** families 3/9 (33.3%); products 4/22 (18.2%). Products: defined list of 22 current product lines relevant to chemotherapy, PCA or palliative delivery with FDA clearance (FRN since 2014; MEA, MEB since 2008) or implanted-pump PMA: BD Alaris; Baxt… · **Not enumerated:** UK/EU-only pumps and palliative syringe drivers: no machine-readable EU or NHS Supply Chain list was fetched (NHS Supply Chain catalogue no…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| CADD-Solis Ambulatory Infusion Pump | fda510k K170982; productCode MEA | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:MEA&limit=100&skip=0) | high |
| Intera 3000 Hepatic Artery Infusion Pump (formerly Codman 3000) | fdaPMA P890055; latestSupplement S090 (2025-05-07); product… | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=trade_name:"Intera"&limit=100&skip=0) | high |
| Patient-controlled analgesia (PCA) pumps | productCode MEA; fda510k K143612; K162165 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:MEA&limit=100&skip=0) | medium |

13 more in `gap-census-2026-11.json` (type `infusion-pumps`).

#### <a id="vascular-access-devices"></a>Vascular access devices (`vascular-access-devices`, rank 18)

**OnCo:** 3 (Records about the family: technology infusion-devices-vascular-access; term central-venous-access (aka Port-A-Cath, implanted port, PICC, c…) · **Denominator:** [openFDA classification (access codes)](https://api.fda.gov/device/classification.json?search=device_name:"port"&limit=100) (11), read · **Denominator:** [openFDA 510(k) for LJT, LJS, PTI, OKC, OMF, LLD, LKG, PTD](https://api.fda.gov/device/510k.json?search=product_code:LJT&limit=100&skip=0) (627), read · 2 more denominators in the JSON · **Coverage:** families 5/14 (35.7%); products 2/37 (5.4%). Products: 37 current product lines from FDA (LJT since 2015: PowerPort family, NMI port, Flexi port, Vital-Port, SmartPort, Dignity, InvisiPort; LJS since 2016: PowerPICC Provena, Groshong NXT, Hickm… · **Not enumerated:** Midline catheters: no product code fetched; family named nowhere in OnCo (incorpus MISSING).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Non-coring (Huber) needles for port access | productCode PTI; fda510k K241353 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:PTI&limit=100&skip=0) | high |
| Catheter lock solutions (taurolidine-heparin) | fdaNDA NDA214520 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"DEFENCATH"&limit=5) | medium |
| Sherlock 3CG Tip Confirmation System | niceMTG MTG24; fda510k K222232 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/mtg24) | medium |
| SecurAcath subcutaneous catheter securement | niceMTG MTG34; fda510k K210629 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/mtg34) | medium |
| Curos disinfecting caps for needleless connectors | niceMTG MTG44 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/mtg44) | medium |

10 more in `gap-census-2026-11.json` (type `vascular-access-devices`).

#### <a id="hazardous-drug-handling"></a>Hazardous drug handling (CSTDs, compounding robots) (`hazardous-drug-handling`, rank 149)

**OnCo:** 2 (Technology records closed-system-transfer-devices (names PhaSeal, ChemoLock, ChemoClave, Equashield, Tevadaptor/OnGuard, Baxter and Corvida…) · **Denominator:** [openFDA 510(k), product code ONB (Closed Antineoplastic And Hazardous Drug Reconstitution And Trans…](https://api.fda.gov/device/510k.json?search=product_code:ONB&limit=100&skip=0) (41), read · **Denominator:** [openFDA 510(k) device names containing 'chemotherapy' (chemo-tested gloves)](https://api.fda.gov/device/510k.json?search=device_name:"chemotherapy"&limit=100&skip=0) (392), read · 2 more denominators in the JSON · **Coverage:** families 4/7 (57.1%); products 5/10 (50.0%). CSTD product lines from ONB (PhaSeal incl. Optima; Texium; ChemoLock/ChemoClave/Diana; Equashield; Simplivia Tevadaptor/Chemfort/OnGuard; Corvida Halo; Epic Medical ProSeal/ToxiSeal/ZeroClear; Yukon… · **Not enumerated:** Chemotherapy spill kits and hazardous-drug waste containers: no outside list fetched (OnCo names neither).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Chemotherapy-tested medical gloves (ASTM D6978-type claims) | productCode LZA; LZC; KGO; fda510k K243604 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:"chemotherapy"&limit=100&skip=0) | medium |
| Grifols KIRO compounding robot | vendorUrl https://www.grifols.com/en/view-news/-/news/lurie… | MISSING | [grifols.com](https://www.grifols.com/en/view-news/-/news/lurie-children-s-hospital-selects-grifols-kiro-robot-to-increase-precision-safety-and-compliance-of-pediatric-iv-chemotherapy-handling-and-compounding) | medium |
| Class II biological safety cabinets for cytotoxic compounding | standard NSF/ANSI 49 | MISSING | [info.nsf.org](https://info.nsf.org/Certified/Biosafety/Listings.asp) | low |

8 more in `gap-census-2026-11.json` (type `hazardous-drug-handling`).

#### <a id="cipn-mucositis-skin-devices"></a>Neuropathy, mucositis and skin-toxicity devices (`cipn-mucositis-skin-devices`, rank 162)

**OnCo:** 8 (Technology records: frozen-gloves-compression-taxane, oral-cryotherapy-mucositis, photobiomodulation-mucositis, hair-photobiomodulation, sc…) · **Denominator:** [openFDA 510(k) name searches (Scrambler, Calmare, Mepitel, cryo, Hilotherm, StrataXRT, photobiomodu…](https://api.fda.gov/device/510k.json?search=device_name:"scrambler"&limit=100&skip=0) (3), read · **Denominator:** [ClinicalTrials.gov API v2 (Paxman limb cryocompression)](https://clinicaltrials.gov/api/v2/studies/NCT05606068) (2), read · **Coverage:** families 6/7 (85.7%); products 6/7 (85.7%). Families (7, scalp cooling excluded as type 9): frozen gloves/socks, compression (surgical gloves), oral cryotherapy, photobiomodulation for mucositis, scrambler therapy, radiation dermatitis films a… · **Not enumerated:** Photobiomodulation devices for oral mucositis: FDA clears lasers for pain, not mucositis; no indication-specific product list was found.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Paxman Limb Cryocompression System (PLCS) | nct NCT05606068; NCT05095051 | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies/NCT05606068) | medium |
| Mepitel silicone dressing family (Mölnlycke) | fda510k K984371; K130040 | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:"Mepitel"&limit=100&skip=0) | low |

#### <a id="lymphoedema-devices"></a>Lymphoedema devices (`lymphoedema-devices`, rank 58)

**OnCo:** 4 (Technology records lymphoedema-decongestive-therapy (compression garments, bandaging), lymphoedema-surgery-and-early-detection, rejuv-measu…) · **Denominator:** [openFDA 510(k), product code JOW (Sleeve, Limb, Compressible: pneumatic compression devices)](https://api.fda.gov/device/510k.json?search=product_code:JOW&limit=100&skip=0) (354), read · **Denominator:** [openFDA 510(k), product code OBH (bioimpedance / tissue fluid analysers for lymphoedema)](https://api.fda.gov/device/510k.json?search=product_code:OBH&limit=100&skip=0) (10), read · **Coverage:** families 4/8 (50.0%); products 0/11 (0.0%). Products: 11 lymphoedema device lines from JOW and OBH (Flexitouch incl. Plus, Entré, Actitouch, Lympha Press, Sequential Circulator, Airos, Hydroven, Wright pumps, L-Dex U400, SOZO incl. Pro, Moistu… · **Not enumerated:** Compression garment brands (Juzo, medi, Sigvaris, Jobst) and adjustable wraps: class I/exempt in the US, no 510(k) list; NHS Drug Tariff Pa…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Advanced pneumatic compression devices for lymphoedema (family) | productCode JOW | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:JOW&limit=100&skip=0) | high |
| Tactile Medical Flexitouch Plus | fda510k K253555; K203178; productCode JOW | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:JOW&limit=100&skip=0) | high |
| ImpediMed SOZO bioimpedance spectroscopy | fda510k K180126; K230530; productCode OBH | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:OBH&limit=100&skip=0) | high |

8 more in `gap-census-2026-11.json` (type `lymphoedema-devices`).

#### <a id="nutrition-feeding-devices"></a>Nutrition and feeding devices (`nutrition-feeding-devices`, rank 42)

**OnCo:** 5 (Technology records enteral-parenteral-nutrition, oncology-nutrition, nutrition-screening-mnt, immunonutrition-perioperative; term feeding-t…) · **Denominator:** [openFDA 510(k), product codes LZH (enteral pumps), KNT/PIF/FPD (feeding tubes)](https://api.fda.gov/device/510k.json?search=product_code:LZH&limit=100&skip=0) (686), read · **Denominator:** [Drugs@FDA via openFDA (parenteral nutrition brands)](https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"KABIVEN"&limit=5) (5), read · 2 more denominators in the JSON · **Coverage:** families 5/12 (41.7%); products 0/18 (0.0%). Products: 18 lines (5 PN products from Drugs@FDA; 6 enteral pump lines LZH since 2016; 6 notable feeding-tube lines since 2016: AMT G-Tube, CORTRAK 2, EndoVive, Entarik, ENvue, Degania PEG; 1 ONS: Fo… · **Not enumerated:** Radiologically inserted gastrostomy: OnCo names it nowhere (MISSING), but no source naming RIG as such was fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Enteral feeding pumps (family) | productCode LZH; fda510k K221603 | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:LZH&limit=100&skip=0) | high |
| Fortisip Compact Protein (oral nutritional supplement) | vendorUrl https://www.nutricia.co.uk/hcp/resource-centre/fo… | MISSING | [nutricia.co.uk](https://www.nutricia.co.uk/hcp/resource-centre/fortisip-compact-protein.html) | high |
| Kabiven three-chamber parenteral nutrition | fdaNDA NDA200656 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"KABIVEN"&limit=5) | medium |
| SMOFlipid lipid emulsion | fdaNDA NDA207648 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"SMOFLIPID"&limit=5) | medium |
| Clinimix E amino acids with electrolytes in dextrose | fdaNDA NDA020678 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"CLINIMIX) | medium |

5 more in `gap-census-2026-11.json` (type `nutrition-feeding-devices`).

#### <a id="palliative-home-devices"></a>Palliative and home devices (pleural catheters, stents) (`palliative-home-devices`, rank 30)

**OnCo:** 11 (Records: technology biliary-stenting-drainage; terms pleurodesis (aka indwelling pleural catheter, PleurX), malignant-pleural-effusion, ple…) · **Denominator:** [openFDA 510(k): DWM (pleural catheters), PNG (peritoneal drainage catheter for refractory ascites),…](https://api.fda.gov/device/510k.json?search=product_code:PNG&limit=100&skip=0) (53), read · **Denominator:** [openFDA 510(k): ESW (oesophageal), MQR (colonic), MUM (duodenal), FGE (biliary), FAD (ureteral), LJ…](https://api.fda.gov/device/510k.json?search=product_code:ESW&limit=100&skip=0) (1027), read · 2 more denominators in the JSON · **Coverage:** families 8/15 (53.3%); products 2/32 (6.3%). Products: 32 lines (IPCs: PleurX pleural, PleurX peritoneal, Rocket pleural, Rocket peritoneal, Aspira pleural, Aspira peritoneal, PeritX, Asept pleural, Asept peritoneal, Passio; shunts: Denver, BD… · **Not enumerated:** Airway stent products (JCT/NYT 510(k)s) were not fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| PeritX peritoneal catheter drainage system | niceMTG MTG9 (now HTG282); fda510k K241946; productCode PNG | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/mtg9) | high |
| Ureteric stents for malignant ureteric obstruction (family), incl. Memokath-051 | productCode FAD; niceMTG MTG35; MTG75 | MENTION | [nice.org.uk](https://www.nice.org.uk/guidance/mtg75) | high |
| Rocket indwelling pleural and peritoneal catheters | fda510k K163321; K162457; productCode DWM; PNG | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:DWM&limit=100&skip=0) | medium |
| WallFlex oesophageal, colonic, duodenal and biliary stents (Boston Scientific) | fda510k K261978; K234046; K240464; productCode ESW; MQR; FGE | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:ESW&limit=100&skip=0) | medium |
| Percutaneous nephrostomy catheters | productCode LJE; fda510k K191498 | MENTION | [api.fda.gov](https://api.fda.gov/device/510k.json?search=product_code:LJE&limit=100&skip=0) | medium |

10 more in `gap-census-2026-11.json` (type `palliative-home-devices`).

#### <a id="digital-therapeutics-remote-monitoring"></a>Digital therapeutics and remote monitoring (`digital-therapeutics-remote-monitoring`, rank 60)

**OnCo:** 4 (Technology records remote-patient-monitoring, epro-symptom-monitoring, telehealth-oncology, decentralised-clinical-trials; term qol-pro (eP…) · **Denominator:** [BfArM DiGA directory](https://diga.bfarm.de/de/verzeichnis) (0), blocked: js-only; FHIR API https://diga… · **Denominator:** [Apotheken Umschau: breast cancer DiGA overview](https://www.apotheken-umschau.de/e-health/diese-apps-sollten-brustkrebs-betroffene-kennen-908415.html) (3), read · 4 more denominators in the JSON · **Coverage:** families 2/6 (33.3%); products 2/7 (28.6%). Products: 7 nationally assessed cancer apps (3 German DiGA: PINK! Coach, optimune, PRO-React Onco; 4 French HAS-assessed telemonitoring devices: Cureety TechCare, Resilience PRO, Onco'nect, Continuum… · **Not enumerated:** German DiGA directory: JavaScript app with a token-gated FHIR API (401); other oncology DiGAs (if any) not enumerated.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cureety TechCare (telemonitoring of adults on systemic anticancer treatment or… | hasPage p_3455755 | MENTION | [has-sante.fr](https://has-sante.fr/jcms/p_3455755/fr/cureety-techcare) | high |
| Resilience PRO (remote symptom monitoring, listed on France's LATM) | hasPage p_3540422 (Onco'nect opinion naming it); nct NCT068… | MENTION | [has-sante.fr](https://has-sante.fr/jcms/p_3540422/fr/onco-nect) | high |
| PINK! Coach (breast cancer DiGA) | diga BfArM DiGA directory (entry not readable this session) | MISSING | [pink-brustkrebs.de](https://pink-brustkrebs.de/wp-content/uploads/2024/06/PINK-Informationen-fuer-Presse_12-Juni-2024.pdf) | medium |

6 more in `gap-census-2026-11.json` (type `digital-therapeutics-remote-monitoring`).

#### <a id="scalp-cooling-infusion-chairs"></a>Scalp cooling and infusion chairs (`scalp-cooling-infusion-chairs`, rank 174)

**OnCo:** 1 (Technology scalp-cooling (DigniCap, Paxman); term hair-loss-and-scalp-cooling-breast; side table hair-loss.ts with 7 FDA authorisations; co…) · **Denominator:** [openFDA 510(k)/De Novo, product code PMC (scalp cooling)](https://api.fda.gov/device/510k.json?search=product_code:PMC&limit=100&skip=0) (7), read · **Denominator:** [openFDA registration and listing, product code FRK (Chair, Examination And Treatment; class 1, no 5…](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:FRK&limit=100&skip=0) (68), read · **Coverage:** 7/7 (100.0%). Scalp cooling: all 7 FDA PMC authorisations are in hair-loss.ts. Infusion chairs: 0 of the FRK treatment-chair listings named. · **Not enumerated:** Manual cold caps sold without FDA clearance (the family is covered by the term 'cold cap'): no list fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Infusion and treatment chairs (family) (in scope of worktree-agent-af02bea435e62c464) | productCode FRK | MENTION | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:FRK&limit=100&skip=0) | medium |
| Stryker Symmetry Plus Treatment Recliner (in scope of worktree-agent-af02bea435e62c464) | productCode FRK | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:FRK&limit=100&skip=0) | low |
| Steelcase Empath recliner (in scope of worktree-agent-af02bea435e62c464) | productCode FRK | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:FRK&limit=100&skip=0) | low |

2 more in `gap-census-2026-11.json` (type `scalp-cooling-infusion-chairs`).

#### <a id="breast-prostheses-reconstruction"></a>Breast prostheses and reconstruction implants (`breast-prostheses-reconstruction`, rank 28)

**OnCo:** 5 (Technology records rejuv-recon-breast (implant and autologous reconstruction outcomes), rejuv-frontier-fat-grafting, rejuv-rehab-assistive-…) · **Denominator:** [openFDA device classification, device_name:breast and expander (product codes FTR, FWM, KCZ, NOJ, L…](https://api.fda.gov/device/classification.json?search=device_name:breast&limit=1000) (8), read · **Denominator:** [openFDA PMA originals for FTR (silicone gel) and FWM (saline) breast implants](https://api.fda.gov/device/pma.json?search=product_code:FTR&limit=1000) (9), read · 5 more denominators in the JSON · **Coverage:** 4/13 (30.8%). FAMILY level: 13 families from FDA product codes, HCPCS codes and FDA safety communications (implants; tissue expanders; acellular dermal matrices and meshes; external breast prostheses; mastectomy b… · **Not enumerated:** Human-tissue acellular dermal matrices (AlloDerm, FlexHD, DermACELL): regulated as tissue (HCT/P), not in openFDA device files; no public l…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Natrelle silicone-filled breast implants (Allergan) | FDA PMA P020056; FDA product code FTR; decision date 2006-1… | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:FTR&limit=1000) | high |
| Mentor MemoryGel silicone gel-filled breast implants | FDA PMA P030053; FDA product code FTR; decision date 2006-1… | MISSING | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:FTR&limit=1000) | high |
| Mastectomy bras and post-mastectomy camisoles | HCPCS L8000; L8001; L8002; L8015 | MISSING | [osuhealthplan.com](https://osuhealthplan.com/sites/default/files/2022-12/external_breast_prosthesis.pdf) | high |
| Acellular dermal matrices and meshes in implant-based breast reconstruction | 510(k) K083898 (SurgiMend, FTM, 2009-02-04); K140533 (GalaF… | MENTION | [fda.gov](https://www.fda.gov/medical-devices/implants-and-prosthetics/breast-implants) | high |
| External breast prostheses (silicone, lightweight, adhesive, custom) | FDA product codes KCZ (Prosthesis, Breast, External, Used W… | MENTION | [api.fda.gov](https://api.fda.gov/device/classification.json?search=device_name:breast&limit=1000) | high |

14 more in `gap-census-2026-11.json` (type `breast-prostheses-reconstruction`).

#### <a id="ostomy-products"></a>Ostomy products (`ostomy-products`, rank 23)

**OnCo:** 2 (Term records stoma (aka colostomy, ileostomy, urostomy, ileal conduit, neobladder, ostomy) and living-with-a-stoma-bowel-cancer (aka stoma…) · **Denominator:** [openFDA device classification: ostomy, colostomy, ileostomy, stomal (21 CFR 876.5900 ostomy pouch a…](https://api.fda.gov/device/classification.json?search=device_name:ostomy&limit=1000) (13), read · **Denominator:** [openFDA registration and listing for the 13 ostomy product codes](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=1000) (249), read · 2 more denominators in the JSON · **Coverage:** 4/14 (28.6%). FAMILY level: the 29 NHS Part IXC product groups consolidated into 14 reader-facing families (colostomy bags; ileostomy bags; urostomy bags; two-piece systems and flanges; convex appliances; belts an… · **Not enumerated:** US Medicare ostomy supply coverage (LCD and HCPCS A4361-A5093): cms.gov returns Access Denied to curl; state Medicaid fee schedules exist b…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Coloplast (ostomy, continence and urology devices) | NHS Part IXC 936 products, the largest supplier; lines SenS… | MISSING | [nhsbsa.nhs.uk](https://www.nhsbsa.nhs.uk/sites/default/files/2026-10/Drug%20Tariff%20Part%20IX%20November%202026.csv) | high |
| ConvaTec (Esteem, Natura, Sur-Fit, Stomahesive, Esenta, Visi-Flow) | NHS Part IXC 487 products; FDA listing CONVATEC, INC.; CONV… | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=1000) | high |
| Hollister and Dansac (New Image, CeraPlus, Moderma Flex, NovaLife, Adapt) | NHS Part IXC Hollister Ltd 477 products; Dansac Ltd 530 pro… | MISSING | [nhsbsa.nhs.uk](https://www.nhsbsa.nhs.uk/sites/default/files/2026-10/Drug%20Tariff%20Part%20IX%20November%202026.csv) | high |
| Ostomy appliances as a device family (pouches, baseplates, flanges; one-piece,… | FDA product codes EXB (Collector, Ostomy); EZQ (Pouch, Colo… | MENTION | [api.fda.gov](https://api.fda.gov/device/classification.json?search=device_name:ostomy&limit=1000) | high |
| Convex ostomy appliances (for flush or retracted stomas) | NHS Part IXC e.g. Softima 3S two piece ostomy system convex… | MISSING | [nhsbsa.nhs.uk](https://www.nhsbsa.nhs.uk/sites/default/files/2026-10/Drug%20Tariff%20Part%20IX%20November%202026.csv) | medium |

12 more in `gap-census-2026-11.json` (type `ostomy-products`).

#### <a id="wigs-cranial-prostheses"></a>Wigs and cranial prostheses (`wigs-cranial-prostheses`, rank 47)

**OnCo:** 9 (Technology records wigs-cranial-prosthesis, hair-camouflage-and-restoration, bimatoprost-eyelash-regrowth (plus minoxidil, PRP, photobiomod…) · **Denominator:** [openFDA device classification, device_name: hair, wig, cranial, scalp, eyelash, eyebrow](https://api.fda.gov/device/classification.json?search=device_name:hair&limit=1000) (0), read · **Denominator:** [Macmillan: Wigs for cancer treatment](https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/hair-loss/wigs-for-cancer-treatment) (9), read · 5 more denominators in the JSON · **Coverage:** 5/12 (41.7%). FAMILY level, 12 families from the Macmillan pages, Locks of Love and the US/UK/French provision sources: synthetic and human-hair wigs (covered); blended wigs (no); custom silicone-base cranial pros… · **Not enumerated:** Wig makers and brands (Raquel Welch, Jon Renau, Ellen Wille, Trendco and others are all MISSING): no regulator or payer list names them, so…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Massachusetts scalp hair prosthesis mandate (and the other states with wig cove… | statute Massachusetts General Laws Part I, Title XXII, Chap… | MENTION | [malegislature.gov](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter175/Section47T) | high |
| UK VAT exemption on wigs and hairpieces for hair loss from cancer treatment |  | MISSING | [macmillan.org.uk](https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/hair-loss/wigs-for-cancer-treatment) | medium |
| Locks of Love (in scope of worktree-agent-a2b1ed541c1d2d610) |  | MISSING | [locksoflove.org](https://locksoflove.org/) | medium |

9 more in `gap-census-2026-11.json` (type `wigs-cranial-prostheses`).

#### <a id="prosthetics-orthotics"></a>Prosthetics after cancer surgery (`prosthetics-orthotics`, rank 67)

**OnCo:** 9 (Technology records limb-salvage-surgery (endoprostheses, expandable prostheses, rotationplasty named in text), rejuv-recon-limb, rejuv-reco…) · **Denominator:** [openFDA device classification for laryngeal, larynx, heat and moisture, penile/penis, sphincter, va…](https://api.fda.gov/device/classification.json?search=device_name:penile&limit=1000) (30), read · **Denominator:** [openFDA PMA, 510(k) and registration listing records for the codes above, plus name searches (Provo…](https://api.fda.gov/device/510k.json?search=product_code:EWL&limit=1000) (6), read · 3 more denominators in the JSON · **Coverage:** 8/23 (34.8%). FAMILY level, 23 families from FDA product codes and NHS Part IX groups: limb prostheses (partial: rejuv-recon-limb is about function, no device record); myoelectric hands; microprocessor knees; osse… · **Not enumerated:** Lymphoedema compression garment makers (Juzo, Sigvaris, medi, Haddenham, Jobst all MISSING): about 50,000 NHS Part IXA garment rows; the fa…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Heat and moisture exchangers, laryngectomy tubes, buttons and stoma protectors | FDA product code BYD (Condenser, Heat And Moisture (Artific… | MISSING | [nhsbsa.nhs.uk](https://www.nhsbsa.nhs.uk/sites/default/files/2026-10/Drug%20Tariff%20Part%20IX%20November%202026.csv) | high |
| Provox voice prosthesis system (Atos Medical): Vega, ActiValve, FreeHands Flexi… | FDA 510(k) K090455 Provox Vega (EWL, 2009-06-05); K092593 P… | MISSING | [api.fda.gov](https://api.fda.gov/device/510k.json?search=device_name:%22Provox%22&limit=100) | high |
| Penile prostheses (inflatable and malleable) after radical prostatectomy | FDA PMA N970012 AMS 700 series and Dynaflex (JCW, 1998-11-0… | MENTION | [api.fda.gov](https://api.fda.gov/device/pma.json?search=product_code:JCW&limit=1000) | high |

16 more in `gap-census-2026-11.json` (type `prosthetics-orthotics`).

#### <a id="apheresis-cell-manufacturing"></a>Apheresis and cell-therapy manufacturing systems (`apheresis-cell-manufacturing`, rank 157)

**OnCo:** 10 (Technology records apheresis-starting-material, closed-automated-cell-manufacturing, point-of-care-cell-manufacturing, car-t-manufacturing-…) · **Denominator:** [openFDA device classification: separator, apheresis, freezer, cryopreservation](https://api.fda.gov/device/classification.json?search=device_name:separator&limit=1000) (6), read · **Denominator:** [openFDA 510(k), PMA and listing records for LKN, OVG, MQG, PTD and name searches (Spectra Optia, Am…](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:LKN&limit=1000) (39), read · 2 more denominators in the JSON · **Coverage:** 10/13 (76.9%). FAMILY level, 13 families (collection by apheresis; cell washing, concentration and selection; activation and non-viral gene transfer; expansion bioreactors; closed automated platforms; point-of-care… · **Not enumerated:** CBER-cleared (BK) cell collection and processing devices: openFDA holds only CDRH records; the CBER list is archived (2008-2009) and was no…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cell washing, concentration and density-separation devices for starting materia… | FDA listing COBE 2991 Cell Processor (LKN); DOI 10.1016/j.o… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11088187/fullTextXML) | medium |
| Cell expansion bioreactors: G-Rex gas-permeable flasks, WAVE and Xuri rocking-b… | DOI 10.1016/j.omtm.2024.101250 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11088187/fullTextXML) | medium |
| CliniMACS Plus and the CliniMACS CD34 selection system (Miltenyi) | FDA product code OVG (Magnetic Cell Selection System For CD… | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:OVG&limit=1000) | medium |

7 more in `gap-census-2026-11.json` (type `apheresis-cell-manufacturing`).

#### <a id="isotope-production-radiopharmacy"></a>Isotope production and radiopharmacy equipment (`isotope-production-radiopharmacy`, rank 168)

**OnCo:** 13 (Technology records medical-cyclotrons-synthesis-modules, cyclotron-isotope-production, research-reactor-isotope-production, radionuclide-ge…) · **Denominator:** [openFDA device classification: calibrator, radionuclide, nuclear, cyclotron](https://api.fda.gov/device/classification.json?search=device_name:calibrator&limit=1000) (4), read · **Denominator:** [openFDA 510(k) and listing records for KPT and IZD](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:IZD&limit=1000) (47), read · 3 more denominators in the JSON · **Coverage:** 13/17 (76.5%). FAMILY level, 17 families: medical cyclotrons; cyclotron isotope production; research reactors; accelerator and non-HEU Mo-99; generators and cold kits; synthesis modules and hot cells; dose calibrat… · **Not enumerated:** Research reactors producing Mo-99, Lu-177 and I-131: the IAEA RRDB URL returned 404 and the NEA supply reports were not fetched; candidates…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Ultra-TechneKow V4 technetium Tc-99m generator (Curium) | FDA NDA NDA017243 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:PERTECHNETATE&limit=50) | medium |
| TechneLite technetium Tc-99m generator (now SHINE) | FDA NDA NDA017771 | MISSING | [api.fda.gov](https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:PERTECHNETATE&limit=50) | medium |
| Thorium-227 targeted thorium conjugates (Bayer: BAY2287411, BAY1862864, BAY2701… | NCT NCT03507452 (BAY2287411, thorium-227 labelled antibody-… | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/api/v2/studies?query.intr=thorium-227&pageSize=20&fields=NCTId) | medium |

4 more in `gap-census-2026-11.json` (type `isotope-production-radiopharmacy`).

### Procedures, services and measures

#### <a id="surgical-procedures"></a>Surgical procedures (`surgical-procedures`, rank 141)

**OnCo:** 77 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15329 'Surgical Procedure'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15329/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (1100), read · **Denominator:** [NCI Dictionary of Cancer Terms (patient, English), procedure definitions](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en) (9416), read · 3 more denominators in the JSON · **Coverage:** 143/192 (74.5%). NCIt 'Surgical Procedure' subtree, oncology-contributed concepts (Contributing_Source CTRP, NCCN, GDC, CPTAC, PCDC, mCode or DIPG/DMG) assigned to surgery by keyword after biopsies, endoscopy, ablati… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Nephroureterectomy | NCIt C51646 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C51646?include=definitions) | high |
| Total laryngectomy | NCI Dictionary termId 257529 | MENTION | [webapis.cancer.gov](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en/257529) | high |
| Glossectomy | NCIt C51604 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C51604?include=definitions) | high |

27 more in `gap-census-2026-11.json` (type `surgical-procedures`).

#### <a id="rt-techniques"></a>Radiotherapy techniques (`rt-techniques`, rank 150)

**OnCo:** 80 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15313 'Radiation Therapy'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15313/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (258), read · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15195 'Brachytherapy'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15195/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (44), read · 3 more denominators in the JSON · **Coverage:** 88/113 (77.9%). NCIt 'Radiation Therapy' subtree minus anatomical-site-only, administrative (adjuvant, consolidation, AP/PA) and radiopharmaceutical concepts; radioembolisation moved to interventional. 127 concepts… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Craniospinal irradiation | NCIt C116437; PMID 9586884; DOI 10.1200/jco.1998.16.5.1723 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C116437?include=definitions) | high |
| Vaginal vault (cuff) brachytherapy | NCIt C158398; PMID 20206777; DOI 10.1016/s0140-6736(09)6216… | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C158398?include=definitions) | high |
| Plaque brachytherapy (episcleral, eye) | NCIt C93339; PMID 24373763; DOI 10.1016/j.brachy.2013.11.008 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C93339?include=definitions) | medium |

12 more in `gap-census-2026-11.json` (type `rt-techniques`).

#### <a id="interventional-procedures"></a>Interventional oncology procedures (`interventional-procedures`, rank 156)

**OnCo:** 25 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15230 'Embolization Therapy'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15230/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (13), read · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C20985 'Ablation Therapy'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C20985/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (82), read · 5 more denominators in the JSON · **Coverage:** 28/37 (75.7%). NCIt embolisation, ablation, interventional radiology and image-guided therapy subtrees plus keyword pulls (perfusion, vertebroplasty, neurolysis) from the surgical subtree; cardiac, endocrine-ablati… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Vertebroplasty and kyphoplasty (vertebral augmentation) | NCIt C62752; C62742 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C62752?include=definitions) | high |
| Percutaneous ethanol injection (ethanol ablation) | NCIt C67444; NCI Dictionary termId 44567 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C67444?include=definitions) | medium |
| Portal vein embolisation | PMID 18156923; DOI 10.1097/sla.0b013e31815f6e5b | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A18156923+AND+SRC%3AMED&format=json&resultType=lite) | medium |

5 more in `gap-census-2026-11.json` (type `interventional-procedures`).

#### <a id="endoscopic-procedures"></a>Endoscopic procedures (`endoscopic-procedures`, rank 152)

**OnCo:** 21 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C16546 'Endoscopic Procedure'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C16546/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (124), read · **Denominator:** [NCI Dictionary of Cancer Terms (patient, English), procedure definitions](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en) (9416), read · 2 more denominators in the JSON · **Coverage:** 51/71 (71.8%). NCIt 'Endoscopic Procedure' subtree plus keyword pulls (transanal, transoral, endoscopic) from the surgical subtree; arthroscopy, fetoscopy and benign GI procedures excluded. 90 concepts listed, 19 j… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Argon plasma coagulation | NCIt C66714 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C66714?include=definitions) | medium |
| Cholangioscopy (single-operator, SpyGlass) | PMID 26071061; DOI 10.1016/j.gie.2015.04.030 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A26071061+AND+SRC%3AMED&format=json&resultType=lite) | medium |
| EUS-guided fine-needle biopsy (EUS-FNB) | PMID 29325707; DOI 10.1016/j.gie.2017.12.032 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A29325707+AND+SRC%3AMED&format=json&resultType=lite) | medium |

14 more in `gap-census-2026-11.json` (type `endoscopic-procedures`).

#### <a id="diagnostic-biopsy-procedures"></a>Diagnostic and biopsy procedures (`diagnostic-biopsy-procedures`, rank 124)

**OnCo:** 13 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15189 'Biopsy Procedure'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15189/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (176), read · **Denominator:** [NCI Dictionary of Cancer Terms (patient, English), procedure definitions](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en) (9416), read · 1 more denominators in the JSON · **Coverage:** 47/71 (66.2%). NCIt 'Biopsy Procedure' subtree plus keyword pulls (aspiration, cytology, sentinel, mediastinoscopy, lumbar puncture); cardiac, renal-medical and grouping concepts excluded. 79 concepts listed, 8 jud… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Stereotactic breast biopsy | NCIt C51654; PMID 11161168; DOI 10.1148/radiology.218.2.r01… | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C51654?include=definitions) | high |
| Punch biopsy | NCIt C28743 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C28743?include=definitions) | high |
| Endometrial biopsy (pipelle) | NCI Dictionary termId 322856 | MENTION | [webapis.cancer.gov](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en/322856) | high |

16 more in `gap-census-2026-11.json` (type `diagnostic-biopsy-procedures`).

#### <a id="transplant-cellular-procedures"></a>Transplant and cellular procedures (`transplant-cellular-procedures`, rank 160)

**OnCo:** 51 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15431 'Hematopoietic Cell Transplantation'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15431/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (24), read · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C70601 'Cellular Therapy'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C70601/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (20), read · 3 more denominators in the JSON · **Coverage:** 29/36 (80.6%). NCIt haematopoietic cell transplantation, cellular therapy and transplantation subtrees; solid-organ, tissue and microbiota transplants excluded. 46 concepts listed, 10 judged out of scope by hand, 3… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Bone marrow harvest (donor collection) | NCIt C112933 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C112933?include=definitions) | medium |
| T-cell-depleted haematopoietic stem cell transplantation (ex vivo alpha-beta de… | NCIt C116468 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C116468?include=definitions) | medium |
| Engraftment | NCIt C37947 | MENTION | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C37947?include=definitions) | medium |

4 more in `gap-census-2026-11.json` (type `transplant-cellular-procedures`).

#### <a id="supportive-procedures"></a>Supportive procedures (`supportive-procedures`, rank 117)

**OnCo:** 22 (technology records in sections surgery, radiation, devices, supportive-care, diagnostics, imaging, cell-therapy or early-detection (machine…) · **Denominator:** [NCI Thesaurus (EVS REST, version 26.10d) subtree C15747 'Supportive Care'](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C15747/descendants?fromRecord=0&pageSize=10000&maxLevel=30) (118), read · **Denominator:** [NCI Dictionary of Cancer Terms (patient, English), procedure definitions](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en) (9416), read · 1 more denominators in the JSON · **Coverage:** 19/30 (63.3%). NCIt 'Supportive Care' subtree (procedural concepts only) plus keyword pulls (gastrostomy, stent, catheter, nephrostomy, shunt, sedation, transfusion, fertility) from the surgical subtree; rehabilita… · **Not enumerated:** SNOMED CT and OPCS-4 procedure hierarchies: licence or NHS TRUD login required; not attempted

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Ureteric stent | PMID 12576846; DOI 10.1097/01.ju.0000049198.53424.1d | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A12576846+AND+SRC%3AMED&format=json&resultType=lite) | high |
| Palliative sedation | NCIt C21115; PMID 17298256; DOI 10.1089/jpm.2006.0139 | MISSING | [api-evsrest.nci.nih.gov](https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C21115?include=definitions) | high |
| Percutaneous nephrostomy | NCI Dictionary termId 430865; PMID 413422; DOI 10.2214/ajr.… | MENTION | [webapis.cancer.gov](https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/en/430865) | high |

15 more in `gap-census-2026-11.json` (type `supportive-procedures`).

#### <a id="supportive-care-services"></a>Supportive care services (`supportive-care-services`, rank 153)

**OnCo:** 288 (technology records with sections containing 'supportive-care' in all.ndjson (288); plus side tables side-effect-guidance.ts (64 symptom gro…) · **Denominator:** [NCCN Guidelines, Supportive Care category (plus Specific Populations)](https://www.nccn.org/guidelines/category_3) (16), read · **Denominator:** [MASCC study groups](https://mascc.org/) (19), read · 5 more denominators in the JSON · **Coverage:** 46/55 (83.6%). Union of 55 distinct topics from NCCN (16), MASCC (18), ESMO (25), PDQ (23) and CSG4 (12), deduplicated by hand; a topic is covered when a technology, term or side-table entry is about it (incorpus R… · **Not enumerated:** NCCN guideline sub-sections (e.g. infection prophylaxis tables, pain algorithms): guideline bodies need an NCCN login.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Delirium in adult cancer patients (ESMO guideline topic) | doi 10.1093/annonc/mdy147; pmid 29992308 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22ESMO%20Clinical%20Practice%20Guideline%22) | high |
| Hypercalcaemia of malignancy | doi 10.1210/clinem/dgac621; pmid 36545746 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22hypercalcemia%20of%20malignancy%22%20AND%20TITLE:guideline) | high |
| Paediatric supportive care | mascc-study-group pediatrics | MISSING | [mascc.org](https://mascc.org/study-groups/pediatrics/) | medium |

4 more in `gap-census-2026-11.json` (type `supportive-care-services`).

#### <a id="survivorship-services"></a>Survivorship and late-effects services (`survivorship-services`, rank 167)

**OnCo:** 88 (Technology records counted by id prefix: rejuv-tx 18 (transplant and CAR-T late effects), rejuv-paed 17 (childhood late effects), rejuv-min…) · **Denominator:** [IGHG (International Late Effects of Childhood Cancer Guideline Harmonization Group) guideline topics](https://www.ighg.org/guidelines/topics/) (31), read · **Denominator:** Brief's service list (late-effects clinics, cardio-oncology, onco-fertility, sexual health, bone he… (11), read · 2 more denominators in the JSON · **Coverage:** 37/42 (88.1%). IGHG topics (31) plus the brief's service list (11), each mapped by hand to a record after incorpus checks. IGHG: Anthracycline cardiac dysfunction equivalence ratios OK; Bone mineral density OK; Bre… · **Not enumerated:** NCCN Survivorship guideline sub-topics: login required.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Patient-initiated follow-up (PIFU) after cancer treatment | doi 10.1136/ijgc-2019-001176; pmid 32312719 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22patient-initiated%20follow-up%22%20AND%20TITLE:cancer) | high |
| Pregnancy and obstetric care after childhood cancer (IGHG topic) | ighg-topic obstetric-care | MISSING | [ighg.org](https://www.ighg.org/guidelines/topics/) | medium |
| American Cancer Society Prostate Cancer Survivorship Care Guidelines | doi 10.3322/caac.21234; pmid 24916760 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22prostate%20cancer%20survivorship%20care%20guidelines%22) | medium |

6 more in `gap-census-2026-11.json` (type `survivorship-services`).

#### <a id="rehabilitation-exercise"></a>Rehabilitation, prehabilitation and exercise programmes (`rehabilitation-exercise`, rank 140)

**OnCo:** 30 (Technology records: rejuv-rehab-* (13: discipline, prospective surveillance, rehabilitation gap, prehab trials, voice, swallowing, pelvic f…) · **Denominator:** [Named programmes and services from the brief, checked against their own sites](https://www.prehab4cancer.co.uk/) (5), partly read · **Denominator:** [NICE CSG4 chapter 10 Rehabilitation services (workforce list)](https://www.nice.org.uk/guidance/retired/csg4/CSG4-20251218.pdf) (5), read · 1 more denominators in the JSON · **Coverage:** 20/27 (74.1%). Checklist of rehabilitation models, components, programmes, guidelines and professions, each corpus-checked: LIVESTRONG at the YMCA OK; Prehab4Cancer GAP; PINC & STEEL GAP; CanRehab GAP; WesFit trial… · **Not enumerated:** ACSM Moving Through Cancer exercise programme registry: Cloudflare challenge.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ASCO guideline: Exercise, Diet, and Weight Management During Cancer Treatment (… | doi 10.1200/jco.22.00687; pmid 35576506 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Exercise) | high |
| Prehab4Cancer (Greater Manchester prehabilitation and recovery programme) | url https://www.prehab4cancer.co.uk/ | MISSING | [prehab4cancer.co.uk](https://www.prehab4cancer.co.uk/) | medium |
| PINC & STEEL cancer rehabilitation programmes | url https://www.cancerrehab.org.nz/ | MISSING | [cancerrehab.org.nz](https://www.cancerrehab.org.nz/) | medium |

4 more in `gap-census-2026-11.json` (type `rehabilitation-exercise`).

#### <a id="palliative-end-of-life"></a>Palliative and end-of-life services (`palliative-end-of-life`, rank 8)

**OnCo:** 6 (Technology records palliative-care (early integrated palliative care), hospice-and-end-of-life care, palliative-radiotherapy, pain-manageme…) · **Denominator:** [ESMO supportive and palliative CPGs (palliative subset, via Europe PMC)](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22ESMO%20Clinical%20Practice%20Guideline%22) (4), read · **Denominator:** [NCI PDQ supportive and palliative care summaries (end-of-life subset)](https://www.cancer.gov/publications/pdq/information-summaries/supportive-care) (6), read · 4 more denominators in the JSON · **Coverage:** 6/37 (16.2%). Checklist of 37 components, each confirmed to exist from a source fetched this session, corpus-checked with incorpus (full names, not short aliases that hit unrelated text). Covered: Early integrated… · **Not enumerated:** Complete list of jurisdictions with lawful assisted dying: no official multi-country list read; only nine statutes or bills verified one by…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ReSPECT (Recommended Summary Plan for Emergency Care and Treatment) | url https://www.resus.org.uk/respect | MISSING | [resus.org.uk](https://www.resus.org.uk/respect) | high |
| POLST (Portable Medical Orders / Physician Orders for Life-Sustaining Treatment) | url https://polst.org/ | MISSING | [polst.org](https://polst.org/) | high |
| Advance decision to refuse treatment (Mental Capacity Act 2005, sections 24-26,… | statute Mental Capacity Act 2005 c. 9, s. 24 | MISSING | [legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2005/9/section/24) | high |
| Hospice inpatient care and respite care | url https://www.medicare.gov/coverage/hospice-care | MISSING | [medicare.gov](https://www.medicare.gov/coverage/hospice-care) | high |
| End-of-life care at home (hospice at home) | url https://www.nhs.uk/tests-and-treatments/end-of-life-car… | MISSING | [nhs.uk](https://www.nhs.uk/tests-and-treatments/end-of-life-care/) | high |

23 more in `gap-census-2026-11.json` (type `palliative-end-of-life`).

#### <a id="proms-qol-instruments"></a>Patient-reported outcome and quality-of-life instruments (`proms-qol-instruments`, rank 45)

**OnCo:** 14 (Records about a named instrument: 10 'rejuv-measure-*' technology records (QLQ-C30, FACT/FACIT, PROMIS, PRO-CTCAE, EQ-5D, BREAST-Q, FCRI, c…) · **Denominator:** [EORTC Quality of Life Group, list of questionnaires](https://qol.eortc.org/questionnaires/) (88), read · **Denominator:** [FACIT.org measures and language availability](https://www.facit.org/measures-language-availability) (146), read · 3 more denominators in the JSON · **Coverage:** 1/46 (2.2%). EORTC validated instruments (46): checked by code (e.g. 'QLQ-BR23', 'EORTC QLQ-BR23', 'BR23') with incorpus. Record: 1 (QLQ-C30). Named in passing: 8 (WISP, QLQ-BR23, QLQ-CLL17, QLQ-CR29, QLQ-H&N35,… · **Not enumerated:** PROMIS cancer item banks (HealthMeasures): not enumerated; OnCo covers PROMIS as a family record.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| EORTC QLQ-H&N43 (Head & Neck Cancer (update of QLQ-H&N35)) | eortc-code QLQ-H&N43 | MISSING | [qol.eortc.org](https://qol.eortc.org/questionnaires/) | high |
| EORTC QLQ-C15-PAL (Quality of Life in palliative cancer care patients) | eortc-code QLQ-C15-PAL | MISSING | [qol.eortc.org](https://qol.eortc.org/questionnaires/) | high |
| Edmonton Symptom Assessment System - revised (ESAS-r) | doi 10.1016/j.jpainsymman.2012.01.014; pmid 22926088 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Edmonton%20Symptom%20Assessment%20System%22%20AND%20TITLE:revised) | high |

17 more in `gap-census-2026-11.json` (type `proms-qol-instruments`).

#### <a id="clinical-scores-calculators"></a>Clinical scores, risk models and nomograms (`clinical-scores-calculators`, rank 99)

**OnCo:** 45 (staging.ts riskScores (8 scored: R-IPI, FLIPI, IMDC, R-ISS, CLL-IPI, simplified MIPI, Child-Pugh, Khorana) + stagingSystems (18); terms nam…) · **Denominator:** Named scores in the census brief (35 risk models, prognostic indices and nomograms) (35), read · **Denominator:** [MSK prediction tools (nomograms)](https://www.mskcc.org/nomograms) (28), partly read · 2 more denominators in the JSON · **Coverage:** 18/35 (51.4%). Brief's named list (35) checked with incorpus by name, abbreviation and aliases; RECORD means a record or term carries the score in its name or aka (or a side-table record names it). Item statuses: G… · **Not enumerated:** MSK breast nomograms: blocked (403/404).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Fleischner Society 2017 guidelines for incidental pulmonary nodules | doi 10.1148/radiol.2017161659; pmid 28240562 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Fleischner%20Society%202017%22) | high |
| CARG chemotherapy toxicity tool for older adults | doi 10.1200/jco.2011.34.7625; pmid 21810685 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Predicting%20chemotherapy%20toxicity%20in%20older%20adults%20with%20cancer%22) | high |
| Palliative Prognostic Index (PPI) | doi 10.1007/s005200050242; pmid 10335930 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Palliative%20Prognostic%20Index%22) | high |

26 more in `gap-census-2026-11.json` (type `clinical-scores-calculators`).

#### <a id="performance-geriatric"></a>Performance status and geriatric assessment (`performance-geriatric`, rank 115)

**OnCo:** 4 (term performance-status (ECOG, Karnofsky, aka incl. HCT-CI), technology geriatric-assessment, technology g8-geriatric-screening (aka VES-13…) · **Denominator:** Brief's list (ECOG/WHO, Karnofsky, Lansky, G8, VES-13, CGA, frailty indices) plus standard CGA doma… (14), read · **Coverage:** 7/14 (50.0%). Checklist corpus-checked with full names: ECOG / WHO performance status OK; Karnofsky performance status OK; G8 OK; VES-13 OK; Comprehensive geriatric assessment OK; Lansky play-performance scale GAP… · **Not enumerated:** SIOG and ASCO geriatric oncology guideline tool tables were not read (OnCo already holds the ASCO 2018 Mohile paper record).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Palliative Performance Scale (PPS) | doi 10.1177/082585979601200102; pmid 8857241 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Palliative%20performance%20scale%22%20AND%20TITLE:%22new%20tool%22) | high |
| Clinical Frailty Scale (Rockwood) | doi 10.1503/cmaj.050051; pmid 16129869 | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22global%20clinical%20measure%20of%20fitness%20and%20frailty%20in%20elderly%20people%22) | high |
| Lansky play-performance scale (children) | doi 10.1002/1097-0142(19871001)60:7<1651::aid-cncr282060073… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22measurement%20of%20performance%20in%20childhood%20cancer%20patients%22) | medium |

4 more in `gap-census-2026-11.json` (type `performance-geriatric`).

### Software and data

#### <a id="open-source-projects"></a>Open-source projects (`open-source-projects`, rank 136)

**OnCo:** 379 (src/data/open-source.ts openSourceProjects: 379 records (350 GitHub repositories, 29 project pages on GitLab, CRAN, Bioconductor, Hugging F…) · **Denominator:** [GitHub REST API search/repositories: 83 topic queries (topic:cancer, oncology, cancer-research, tum…](https://api.github.com/search/repositories) (4950), read · **Denominator:** [GitHub organisation repository listings (46 oncology organisations and labs, e.g. nf-core, cancerit…](https://api.github.com/orgs/{org}/repos) (631), read (2 of 48 owners are users, not org… · 5 more denominators in the JSON · **Coverage:** 108/253 (42.7%). Headline: GitHub topic and keyword search, oncology-relevant repositories with >=100 stars after hand curation; identity = normalised owner/repo against the 350 repositories in src/data/open-source.t… · **Not enumerated:** Repositories off GitHub (GitLab, Bitbucket, SourceForge, institutional sites, e.g. Plastimatch on GitLab, OpenREGGUI, matRad mirrors, TOPAS…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NCRF | github baidu-research/NCRF | MISSING | [github.com](https://github.com/baidu-research/NCRF) | high |
| DeepPATH | github ncoudray/DeepPATH | MISSING | [github.com](https://github.com/ncoudray/DeepPATH) | high |
| TransMIL | github szc19990412/TransMIL | MISSING | [github.com](https://github.com/szc19990412/TransMIL) | high |

95 more in `gap-census-2026-11.json` (type `open-source-projects`).

#### <a id="ai-devices-fda"></a>FDA AI-enabled oncology devices (`ai-devices-fda`, rank 106)

**OnCo:** 137 (software.ts softwareProducts (137 products; 27 in category regulated-device) carrying 188 clearance rows / 186 distinct FDA numbers (169 51…) · **Denominator:** [FDA Artificial Intelligence-Enabled Medical Devices list (CSV download, page 'content current as of…](https://www.fda.gov/media/178541/download?attachment) (1614), read · **Denominator:** [openFDA device classification (product-code names for the 181 codes on the list)](https://api.fda.gov/device/classification.json) (181), read · **Coverage:** 83/205 (40.5%). Entry level: an entry is covered if its submission number appears anywhere in src/data (55/205 = 26.8%), or its product is a software.ts product or an entity record (another 28: earlier versions of c… · **Not enumerated:** AI devices cleared after 2026-06-29: the FDA list stops there.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Koios DS | fdaSubmission K242130; productCode POK; otherSubmissions K2… | MISSING | [fda.gov](https://www.fda.gov/media/178541/download?attachment) | high |
| SKOUT | fdaSubmission K253664; productCode QNP; otherSubmissions K2… | MISSING | [fda.gov](https://www.fda.gov/media/178541/download?attachment) | high |
| CADDIE | fdaSubmission K252586; productCode QNP; otherSubmissions K2… | MISSING | [fda.gov](https://www.fda.gov/media/178541/download?attachment) | high |

27 more in `gap-census-2026-11.json` (type `ai-devices-fda`).

#### <a id="clinical-software"></a>Clinical oncology software (`clinical-software`, rank 90)

**OnCo:** 79 (software.ts products in categories clinical-systems (49: oncology records, chemotherapy prescribing, RT planning and QA, platforms), trials…) · **Denominator:** [ONC Certified Health IT Product List (CHPL), criterion 170.315(f)(4) transmission to cancer registr…](https://chpl.healthit.gov/rest/download/active?format=csv), login required (API key; HTTP 400 witho… · **Denominator:** [CDC NPCR Registry Plus software suite page](https://www.cdc.gov/national-program-cancer-registries/registry-plus/index.html), blocked: 403 · 3 more denominators in the JSON · **Coverage:** 19/62 (30.6%). Census list of 62 verified items: 19 covered (company record or software.ts row: Triomics, COTA, TriNetX, Carevive, Careology, Outcomes4Me, Canopy, Thyme Care, Kaiku Health, Deep 6 AI, Science 37, Me… · **Not enumerated:** Certified oncology EHR modules (ONC CHPL): API key required.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| eviQ (Cancer Institute NSW cancer treatment protocols) | url https://www.eviq.org.au/ | MISSING | [eviq.org.au](https://www.eviq.org.au/) | high |
| NCCN Chemotherapy Order Templates | url https://www.nccn.org/compendia-templates/nccn-templates… | MISSING | [nccn.org](https://www.nccn.org/compendia-templates/nccn-templates-main) | high |
| OncoLens | url https://www.oncolens.com/ | MISSING | [oncolens.com](https://oncolens.com/) | high |

23 more in `gap-census-2026-11.json` (type `clinical-software`).

#### <a id="foundation-models"></a>AI foundation models (`foundation-models`, rank 129)

**OnCo:** 78 (foundation-models.ts (78 entries: model technologies plus 18 companies, 4 institutions, 9 dataset collections) and model-registry.ts (44 mo…) · **Denominator:** [Hugging Face Hub API, model search by name sorted by downloads (pathology, histopathology, radiolog…](https://huggingface.co/api/models?search=pathology&sort=downloads&direction=-1&limit=100&full=true) (900), read · **Denominator:** [Hugging Face Hub API, model tag filters sorted by downloads (pathology, histology, histopathology,…](https://huggingface.co/api/models?filter=pathology&sort=downloads&direction=-1&limit=100) (1300), read · 1 more denominators in the JSON · **Coverage:** 26/70 (37.1%). Denominator: 70 original foundation-model families chosen from the Hub lists by downloads within five domains (excluding quantised re-uploads, fine-tuned single-task classifiers and general-purpose L… · **Not enumerated:** Foundation models published only in papers or behind APIs (no Hub repository): not enumerated; a review-table denominator (pathology FM ben…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| RAD-DINO (Microsoft) | huggingface microsoft/rad-dino | MISSING | [huggingface.co](https://huggingface.co/api/models/microsoft/rad-dino) | high |
| DNABERT-2 | huggingface zhihan1996/DNABERT-2-117M | MISSING | [huggingface.co](https://huggingface.co/api/models?filter=biology&sort=downloads&direction=-1&limit=100) | high |
| PRISM (Paige slide-level foundation model) | huggingface paige-ai/Prism | MISSING | [huggingface.co](https://huggingface.co/api/models/paige-ai/Prism) | high |

27 more in `gap-census-2026-11.json` (type `foundation-models`).

#### <a id="imaging-datasets"></a>Imaging datasets (`imaging-datasets`, rank 96)

**OnCo:** 6 (Records or side-table rows about an individual imaging dataset: tcia and imaging-data-commons (archive-level collection records), cdas-nlst…) · **Denominator:** [TCIA NBIA public collection list (getCollectionValues)](https://services.cancerimagingarchive.net/nbia-api/services/v1/getCollectionValues) (156), read · **Denominator:** [NCI Imaging Data Commons collections (IDC API v3; v2 returned 410 deprecated)](https://api.imaging.datacommons.cancer.gov/v3/collections) (179), read · 2 more denominators in the JSON · **Coverage:** 2/99 (2.0%). Oncology research collections in TCIA+IDC (99): 2 covered by a record about the dataset (NLST via cdas-nlst-plco; PDXNet row), 6 are trials with a record but no dataset record (ISPY1, ISPY2, EAY131/N… · **Not enumerated:** Restricted-access TCIA collections and TCIA analysis results (derived segmentations): not on the public NBIA endpoint.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| CBIS-DDSM | idcCollectionId cbis_ddsm; tciaCollection CBIS-DDSM | MISSING | [api.imaging.datacommons.cancer.gov](https://api.imaging.datacommons.cancer.gov/v3/collections) | high |
| Breast-Cancer-Screening-DBT | idcCollectionId breast_cancer_screening_dbt; tciaCollection… | MISSING | [api.imaging.datacommons.cancer.gov](https://api.imaging.datacommons.cancer.gov/v3/collections) | high |
| Duke-Breast-Cancer-MRI | idcCollectionId duke_breast_cancer_mri; tciaCollection Duke… | MISSING | [api.imaging.datacommons.cancer.gov](https://api.imaging.datacommons.cancer.gov/v3/collections) | high |

27 more in `gap-census-2026-11.json` (type `imaging-datasets`).

#### <a id="genomic-datasets"></a>Genomic and clinical datasets (`genomic-datasets`, rank 116)

**OnCo:** 20 (Records about genomic programmes or commons found by incorpus: tcga-gdc (TCGA, GDC, PanCanAtlas), cptac, htan, genie, cbioportal, depmap, u…) · **Denominator:** [NCI Genomic Data Commons projects API](https://api.gdc.cancer.gov/projects?size=500&fields=project_id,name,program.name,primary_site,disease_type,summary.case_count&format=json) (93), read · **Denominator:** [cBioPortal public studies (DETAILED projection, with PMIDs)](https://www.cbioportal.org/api/studies?projection=DETAILED&pageSize=10000) (551), read · 2 more denominators in the JSON · **Coverage:** 7/27 (25.9%). GDC programmes: 7/27 covered (TCGA, CPTAC, HCMI, and NCI-MATCH, ALCHEMIST, Beat AML, Exceptional Responders through trial or term records); 2 named in passing (CoMMpass, Count Me In); 18 missing, inc… · **Not enumerated:** ICGC ARGO programme list and dataset releases (portal requires login for most views).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NCI TARGET programme (Therapeutically Applicable Research to Generate Effective… | gdcProgram TARGET; gdcProjects TARGET-AML, TARGET-ALL-P1/P2… | MISSING | [api.gdc.cancer.gov](https://api.gdc.cancer.gov/projects?size=500&fields=project_id) | high |
| Childhood Cancer Data Initiative Molecular Characterization Initiative (CCDI MC… | gdcProject CCDI-MCI | MISSING | [api.gdc.cancer.gov](https://api.gdc.cancer.gov/projects?size=500&fields=project_id) | high |
| MSK-CHORD (clinicogenomic real-world dataset) | cbioportalStudy msk_chord_2024; pmid 39506116; doi 10.1038/… | MISSING | [cbioportal.org](https://www.cbioportal.org/api/studies?projection=DETAILED&pageSize=10000) | high |

25 more in `gap-census-2026-11.json` (type `genomic-datasets`).

#### <a id="biobanks"></a>Biobanks (`biobanks`, rank 95)

**OnCo:** 4 (Records about a biobank as such: uk-biobank and all-of-us (collections), hartwig-medical-foundation (company), cancer-models (HCMI living b…) · **Denominator:** [BBMRI-ERIC Directory (MOLGENIS EMX2 GraphQL): Biobanks and Collections with diagnosis_available](https://directory.bbmri-eric.eu/ERIC/graphql) (852), read · **Denominator:** [National biobanks and cancer tissue banks outside BBMRI (home pages)](https://www.chtn.org/) (10), partly read · **Coverage:** 1/186 (0.5%). BBMRI-ERIC cancer biobanks matched by name and acronym (5+ characters): 1 has a record about it (Hartwig Medical Foundation); 4 match only their host hospital's institution record (CHUV, LUMC, Oslo U… · **Not enumerated:** Biobanks outside BBMRI-ERIC: no global machine-readable directory read (ISBER and national registries not attempted; China Kadoorie 403).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| BBMRI-ERIC (European biobanking research infrastructure) | url https://www.bbmri-eric.eu/ | MISSING | [bbmri-eric.eu](https://www.bbmri-eric.eu/) | high |
| NCI Cooperative Human Tissue Network (CHTN) | url https://www.chtn.org/ | MISSING | [chtn.org](https://www.chtn.org/) | high |
| Biobank Graz | bbmriId bbmri-eric:ID:AT_MUG | MISSING | [directory.bbmri-eric.eu](https://directory.bbmri-eric.eu/ERIC/graphql) | medium |

16 more in `gap-census-2026-11.json` (type `biobanks`).

#### <a id="cancer-registries"></a>Cancer registries (`cancer-registries`, rank 102)

**OnCo:** 11 (Records about a registry or its operator: institutions canadian-cancer-registry, icmr-ncrp, zfkd-rki, israel-national-cancer-registry, rede…) · **Denominator:** [IARC Cancer Incidence in Five Continents Volume XII, Registry.txt (inside CI5-XII.zip)](https://gco.iarc.who.int/media/ci5/data/vol12/Download/CI5-XII.zip) (460), read · **Denominator:** [Registry network home pages (NAACCR, ENCR, GICR, AFCRN, NORDCAN)](https://www.encr.eu/) (5), read · **Coverage:** 32/460 (7.0%). Text proximity: a CI5-XII registry counts as named when its place name occurs within 50 characters of 'cancer/tumour/population-based registry' anywhere in src/data (i18n and universe lists excluded)… · **Not enumerated:** ENCR member registries (about 150) and NAACCR member registries: lists exist on the network sites but were not parsed this session.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Danish Cancer Registry | ci5RegistryId 520800099 | MISSING | [gco.iarc.who.int](https://gco.iarc.who.int/media/ci5/data/vol12/Download/CI5-XII.zip) | high |
| North American Association of Central Cancer Registries (NAACCR) | url https://www.naaccr.org/ | MENTION | [naaccr.org](https://www.naaccr.org/) | high |
| European Network of Cancer Registries (ENCR) | url https://www.encr.eu/ | MENTION | [encr.eu](https://www.encr.eu/) | high |

20 more in `gap-census-2026-11.json` (type `cancer-registries`).

#### <a id="ontologies-standards"></a>Ontologies and data standards (`ontologies-standards`, rank 131)

**OnCo:** 19 (Term/institution records found by incorpus for the defined list: icd-o-3, ncit, oncotree-term, hgvs, mcode, omop-ohdsi, cdisc (institution)…) · **Denominator:** [Defined list: the 17 standards named in the census brief plus 32 further terminologies, ontologies,…](https://icd.who.int/en) (49), read · **Denominator:** [OBO Foundry ontology registry (ontologies.jsonld)](https://obofoundry.org/registry/ontologies.jsonld) (149), read · **Coverage:** 19/49 (38.8%). Defined list of 49: 19 covered (record or side-table row), 15 named in passing (SNOMED CT, ICD-10, ESCAT, OncoKB levels, ESMO-MCBS, ASCO Value Framework, ACMG/AMP, GA4GH, VRS, Phenopackets, DICOM-RT,… · **Not enumerated:** NCBO BioPortal ontology list (API key required).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ICD-11 (Chapter 2, Neoplasms) | url https://icd.who.int/en | MISSING | [icd.who.int](https://icd.who.int/en) | high |
| ClinGen/CGC/VICC oncogenicity standard (Horak et al., Genet Med 2022) | doi 10.1016/j.gim.2022.01.001; pmid 35101336 | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22classification%20of%20pathogenicity%20of%20somatic%20variants%20in%20cancer%22) | high |
| ESMO Magnitude of Clinical Benefit Scale (ESMO-MCBS) | url https://www.esmo.org/guidelines/esmo-mcbs | MENTION | [esmo.org](https://www.esmo.org/guidelines/esmo-mcbs) | high |

21 more in `gap-census-2026-11.json` (type `ontologies-standards`).

#### <a id="knowledge-bases"></a>Knowledge bases and portals (`knowledge-bases`, rank 125)

**OnCo:** 18 (Collection records found by incorpus: oncokb, civic, cosmic, clinvar, intogen, open-targets, cbioportal, hpa, drugbank-chembl, depmap, canc…) · **Denominator:** [Defined list: the 18 resources named in the census brief plus 37 further cancer knowledge bases, ca…](https://kmplot.com/analysis/) (55), partly read · **Coverage:** 18/55 (32.7%). Brief's 18: 9 covered (OncoKB, CIViC, COSMIC, ClinVar, IntOGen, Open Targets, cBioPortal, Cancer Genome Interpreter, TIMER2), 5 named in passing (JAX-CKB, My Cancer Genome, Cancer Hotspots, DGIdb, UC… · **Not enumerated:** Nucleic Acids Research Molecular Biology Database Collection, cancer categories: not read this session.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Kaplan-Meier Plotter | url https://kmplot.com/analysis/ | MISSING | [kmplot.com](https://kmplot.com/analysis/) | high |
| JAX Clinical Knowledgebase (JAX-CKB, now CKB at Genomenon) | url https://ckb.genomenon.com/ | MENTION | [ckb.genomenon.com](https://ckb.genomenon.com/) | high |
| COSMIC Cancer Gene Census | url https://cancer.sanger.ac.uk/census | MENTION | [cancer.sanger.ac.uk](https://cancer.sanger.ac.uk/census) | high |

20 more in `gap-census-2026-11.json` (type `knowledge-bases`).

### Evidence

#### <a id="trials"></a>Clinical trials (`trials`, rank 91)

**OnCo:** 6495 (kind trial in all.ndjson (6,495 records; 6,400 distinct NCT ids in the nct field; 6,910 distinct NCT ids appear anywhere in src/data). A CT…) · **Denominator:** [ClinicalTrials.gov API v2: phase 3 interventional studies, query.cond=cancer](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.advanced=AREA[Phase]PHASE3 AND AREA[StudyType]INTERVENTIONAL) (11085), read · **Denominator:** [Same, broad condition query (cancer OR neoplasm OR tumor OR carcinoma OR lymphoma OR leukemia OR my…](https://clinicaltrials.gov/api/v2/studies) (11469), read · 2 more denominators in the JSON · **Coverage:** 166/283 (58.7%). NCT identity against trial records (nct, name, aka, links). Headline = subset A (completed or primary-completed 2020-2026, results posted, >= 500 enrolled). · **Not enumerated:** Trials registered only on non-CT.gov registries (ChiCTR, CTRI, jRCT, EU CTIS, ISRCTN, ANZCTR): not measured this session; WHO ICTRP has no…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| BR31: Double Blind Placebo Controlled Controlled Study of Adjuvant MEDI4736 In… | nct NCT02273375; orgStudyId BR31 | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/study/NCT02273375) | high |
| NSABP-B-49: Docetaxel and Cyclophosphamide Compared to Anthracycline-Based Chem… | nct NCT01547741; orgStudyId NSABP-B-49 | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/study/NCT01547741) | high |
| RTOG-0924: Androgen-Deprivation Therapy and Radiation Therapy in Treating Patie… | nct NCT01368588; orgStudyId RTOG-0924 | MISSING | [clinicaltrials.gov](https://clinicaltrials.gov/study/NCT01368588) | high |

27 more in `gap-census-2026-11.json` (type `trials`).

#### <a id="trial-registries"></a>Trial registries (`trial-registries`, rank 127)

**OnCo:** 2 (Registries with their own record: collection clinicaltrials-gov and collection eudract-ctis. Registries NAMED as aka on term trial-registra…) · **Denominator:** [WHO ICTRP: Primary registries in the WHO registry network](https://www.who.int/clinical-trials-registry-platform/network/primary-registries) (18), read · **Denominator:** [WHO ICTRP: Data providers of the ICTRP Search Portal](https://www.who.int/clinical-trials-registry-platform/network/data-providers) (20), read · 1 more denominators in the JSON · **Coverage:** 9/25 (36.0%). Union of WHO primary registries (18), the two extra data providers (ClinicalTrials.gov, OMON) and partner registries (5) = 25. Covered = a record or a record's aka names it (incorpus RECORD/IN-RECORD… · **Not enumerated:** Swiss SNCTP (kofam.ch): the page title read 'Human Research Switzerland' but the raw HTML did not name the portal, so it is not listed as a…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| German Clinical Trials Register (DRKS) | whoNetworkRole WHO primary registry | MISSING | [who.int](https://www.who.int/clinical-trials-registry-platform/network/primary-registries) | medium |
| Brazilian Clinical Trials Registry (ReBec) | whoNetworkRole WHO primary registry | MISSING | [who.int](https://www.who.int/clinical-trials-registry-platform/network/primary-registries) | medium |
| Pan African Clinical Trial Registry (PACTR) | whoNetworkRole WHO primary registry | MISSING | [who.int](https://www.who.int/clinical-trials-registry-platform/network/primary-registries) | medium |

16 more in `gap-census-2026-11.json` (type `trial-registries`).

#### <a id="cooperative-groups-networks"></a>Cooperative groups and trial networks (`cooperative-groups-networks`, rank 79)

**OnCo:** 63 (kind company with companyType cooperative-group (63 records: NCTN groups, EORTC, JCOG, WJOG, KCSG, CTONG, LYSA, HOVON, GIMEMA, GBG, AGO, AN…) · **Denominator:** [NCI NCTN network groups](https://www.cancer.gov/research/infrastructure/clinical-trials/nctn) (6), read · **Denominator:** [NCI clinical trials programmes and support components](https://www.cancer.gov/research/infrastructure/clinical-trials) (11), read · 8 more denominators in the JSON · **Coverage:** 23/110 (20.9%). Covered = own record or named in a record's name/aka, read by hand. NCTN groups 6/6; NCI programmes 0/11; NCORP research bases 5/7 (the five NCTN groups; URCC and Wake Forest absent); ENGOT members 4… · **Not enumerated:** GCIG member groups: gcigtrials.org returned 403; gciggroup.com is now an unrelated site.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| European Network of Gynaecological Oncological Trial groups (ENGOT) |  | MENTION | [engot.esgo.org](https://engot.esgo.org/discover/engot-groups/) | high |
| NCI National Clinical Trials Network (NCTN) |  | MENTION | [cancer.gov](https://www.cancer.gov/research/infrastructure/clinical-trials/nctn) | high |
| NCI Community Oncology Research Program (NCORP) |  | MENTION | [cancer.gov](https://www.cancer.gov/research/infrastructure/clinical-trials) | high |

27 more in `gap-census-2026-11.json` (type `cooperative-groups-networks`).

#### <a id="papers"></a>Papers (`papers`, rank 75)

**OnCo:** 2728 (kind paper (2,728 records; 2,716 with a DOI, 2,580 with a PubMed id). Identity by DOI (lower case) or PubMed id. MENTION = the DOI or PubMe…) · **Denominator:** [OpenAlex: 100 most-cited works, primary topic subfield Oncology (OnCo universe list)](https://api.openalex.org/works?filter=primary_topic.subfield.id:subfields/2730&sort=cited_by_count:desc&per-page=100) (100), read (OnCo's own fetch of the same day,… · **Denominator:** [OpenAlex: articles 2024-2026 whose title or abstract says 'phase 3' or 'phase III' in NEJM, Lancet,…](https://api.openalex.org/works?filter=primary_location.source.id:S62468778|S49861241|S116900674|S15137598|S2756165422|S41454044|S203256638|S172573765,publication_year:2024-2026,type:article,title_and_abstract.search:%22phase%203%22) (1875), read (2,164 works fetched by page; 1,87… · **Coverage:** 89/454 (19.6%). Headline: phase 3 oncology papers 2024-2026 in NEJM, Lancet, Lancet Oncology, JAMA, JAMA Oncology and Nature Medicine, matched by DOI or PubMed id. Other cuts in bySubset. · **Not enumerated:** Haematology journals (Blood, Lancet Haematology, Journal of Clinical Oncology is included) and Cancer Cell, Nature Cancer, Cancer Discovery…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Vepdegestrant, a PROTAC Estrogen Receptor Degrader, in Advanced Breast Cancer | doi 10.1056/nejmoa2505725; pmid 40454645; openalex https://… | MISSING | [api.openalex.org](https://api.openalex.org/works/W4410919567) | high |
| Adjuvant Pembrolizumab versus Observation in Muscle-Invasive Urothelial Carcino… | doi 10.1056/nejmoa2401726; pmid 39282902; openalex https://… | MISSING | [api.openalex.org](https://api.openalex.org/works/W4402548582) | high |
| Asciminib in Newly Diagnosed Chronic Myeloid Leukemia | doi 10.1056/nejmoa2400858; pmid 38820078; openalex https://… | MISSING | [api.openalex.org](https://api.openalex.org/works/W4399203787) | high |

27 more in `gap-census-2026-11.json` (type `papers`).

#### <a id="journals"></a>Journals (`journals`, rank 123)

**OnCo:** 261 (kind journal (261 records; 259 with ISSN; matchNames used for matching). Identity by ISSN (record ISSN plus all ISSNs of the NLM Neoplasms…) · **Denominator:** [Scimago Journal Rank, Oncology category (2730)](https://www.scimagojr.com/journalrank.php?category=2730&out=xls), blocked: 403 (Cloudflare challenge) · **Denominator:** [DOAJ journals with LCC subject 'Neoplasms. Tumors. Oncology. Including cancer and carcinogens'](https://doaj.org/api/search/journals/bibjson.subject.term:%22Neoplasms.%20Tumors.%20Oncology.%20Including%20cancer%20and%20carcinogens%22) (208), read · 1 more denominators in the JSON · **Coverage:** 62/208 (29.8%). Headline: DOAJ oncology journals matched by ISSN or title. See bySubset for the OpenAlex cuts. · **Not enumerated:** Scimago Oncology ranking: blocked by Cloudflare (403); Clarivate JCR needs a licence.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Frontiers in Oncology | issn 2234-943X; doaj 371d3b440526402bba2e78933f04bae6; open… | MENTION | [api.openalex.org](https://api.openalex.org/sources/S2596394214) | high |
| HemaSphere | issn 2572-9241; openalex S4210211592 | MENTION | [api.openalex.org](https://api.openalex.org/sources/S4210211592) | high |
| Cancer Cell International | issn 1475-2867; doaj bbd6ba734e354520906fa9c6c6c83da9; open… | MISSING | [api.openalex.org](https://api.openalex.org/sources/S130214813) | medium |

22 more in `gap-census-2026-11.json` (type `journals`).

#### <a id="preprint-servers"></a>Preprint servers (`preprint-servers`, rank 103)

**OnCo:** 2 (Journal records biorxiv and medrxiv (kind journal). Zenodo exists only as term zenodo-doi. No term record for 'preprint'.) · **Denominator:** [Europe PMC: preprint servers carrying cancer-titled preprints first published 2024-2026](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=SRC:PPR%20AND%20(TITLE:cancer%20OR%20...)%20AND%20FIRST_PDATE:[2024-01-01%20TO%202026-12-31]) (20), read · **Denominator:** [Server home pages for servers Europe PMC does not index here (arXiv q-bio, OSF Preprints, ChinaXiv)](https://arxiv.org/archive/q-bio) (3), read · **Coverage:** 2/23 (8.7%). Servers with at least one cancer preprint in Europe PMC 2024-2026, plus three servers read directly; covered = a record names the server. · **Not enumerated:** SSRN (including 'Preprints with The Lancet'): ssrn.com returned a Cloudflare 403 and SSRN did not appear among Europe PMC's cancer preprint…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Research Square | europePmcPublisher Research Square | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search) | high |
| Preprint (glossary term: what a preprint is and how to read one) |  | MENTION | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search) | high |
| Preprints.org | europePmcPublisher Preprints.org | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search) | medium |

14 more in `gap-census-2026-11.json` (type `preprint-servers`).

#### <a id="trial-endpoints-designs"></a>Trial endpoints and designs (`trial-endpoints-designs`, rank 137)

**OnCo:** 100 (term records with category Endpoints (26) and Trials (74), plus side files trial-design-wave.ts and platform-trials-wave.ts; aliases on tho…) · **Denominator:** [FDA: Clinical Trial Endpoints for the Approval of Cancer Drugs and Biologics (2018), contents](https://www.fda.gov/media/71195/download) (10), read (pdftotext) · **Denominator:** [FDA Oncology Center of Excellence guidance documents (titles naming an endpoint, design, eligibilit…](https://www.fda.gov/about-fda/oncology-center-excellence/oncology-center-excellence-guidance-documents) (28), read · 1 more denominators in the JSON · **Coverage:** 27/43 (62.8%). 43 concepts named by the FDA endpoints guidance contents and OCE guidance titles (core PRO components from the PDF). Covered = a term record or a term's aka names it (incorpus, read by hand). MENTION… · **Not enumerated:** EMA oncology endpoint guideline (EMA/CHMP/205/95 Rev.6) and ICH E9(R1) estimand examples: not read this session; OnCo's estimand term alrea…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Trial eligibility for people with HIV, hepatitis B or hepatitis C | fdaGuidance Cancer Clinical Trial Eligibility Criteria | MISSING | [fda.gov](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cancer-clinical-trial-eligibility-criteria-patients-hiv-hepatitis-b-virus-or-hepatitis-c-virus) | high |
| Core patient-reported outcomes in cancer trials (FDA core PRO set) |  | MENTION | [fda.gov](https://www.fda.gov/media/149994/download) | high |
| Trial eligibility for people with brain metastases | fdaGuidance Cancer Clinical Trial Eligibility Criteria | MENTION | [fda.gov](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cancer-clinical-trial-eligibility-criteria-brain-metastases) | high |

12 more in `gap-census-2026-11.json` (type `trial-endpoints-designs`).

#### <a id="guidelines"></a>Guidelines (`guidelines`, rank 41)

**OnCo:** 112 (Kind paper with paperType 'guideline' (112). Also counted, as documents named or linked anywhere in src/data: NCCN guideline ids in nccn.or…) · **Denominator:** [NCCN Guidelines list (all four categories, menu on category pages)](https://www.nccn.org/guidelines/category_1) (92), read · **Denominator:** [PubMed: ESMO Clinical Practice Guidelines in Annals of Oncology / ESMO Open, 2019-01-01 to 2026-11-…](https://pubmed.ncbi.nlm.nih.gov/?term=%28%22Ann+Oncol%22%5Bta%5D+OR+%22ESMO+Open%22%5Bta%5D%29+AND+ESMO%5Bti%5D+AND+%28%22clinical+practice+guideline%22%5Bti%5D+OR+%22clinical+practice+guidelines%22%5Bti%5D+OR+%22living+guideline%22%5Bti%5D%29) (114), read · 14 more denominators in the JSON · **Coverage:** 152/614 (24.8%). Per body, a document counts as covered if OnCo names it or links it anywhere in src/data (identifier match: NCCN guideline id, DOI/PMID, NICE id; or the document's name). Per body: NCCN 63/92 (68.5%)… · **Not enumerated:** Ontario Health (CCO) guidelines: 403 to scripts

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NCCN Guidelines: Lung Cancer Screening | nccnGuidelineId 1441; nccnCategory 2 | MISSING | [nccn.org](https://www.nccn.org/guidelines/category_1) | high |
| NCCN Guidelines: Breast Cancer Screening and Diagnosis | nccnGuidelineId 1421; nccnCategory 2 | MISSING | [nccn.org](https://www.nccn.org/guidelines/category_1) | high |
| NCCN Guidelines: Prostate Cancer Early Detection | nccnGuidelineId 1460; nccnCategory 2 | MISSING | [nccn.org](https://www.nccn.org/guidelines/category_1) | high |
| NCCN Guidelines: Breast Cancer Risk Reduction | nccnGuidelineId 1420; nccnCategory 2 | MISSING | [nccn.org](https://www.nccn.org/guidelines/category_1) | high |
| NCCN Guidelines: Adult Cancer Pain | nccnGuidelineId 1413; nccnCategory 3 | MISSING | [nccn.org](https://www.nccn.org/guidelines/category_1) | high |

24 more in `gap-census-2026-11.json` (type `guidelines`).

#### <a id="hta-reports"></a>HTA appraisals (`hta-reports`, rank 73)

**OnCo:** 649 (NICE TA numbers written anywhere in src/data, including positional TA numbers in coverage-uk.ts helper calls (rec/cdf/opt/notRec/term), mat…) · **Denominator:** [NICE technology appraisals on the 27 cancer topic product listings](https://www.nice.org.uk/guidance/conditions-and-diseases/cancer) (478), read · **Denominator:** [SMC medicines advice, BNF chapter 'Malignant disease and immunosuppression', 01/01/2023 to 04/11/20…](https://www.scottishmedicines.org.uk/medicines-advice/?active-tab=0&keywords=&filter-3561=&filter-3567=3579&filter-3803=&from=01%2F01%2F2023&to=04%2F11%2F2026) (142), read · 4 more denominators in the JSON · **Coverage:** 331/851 (38.9%). 2023-01-01 to 2026-11-04 window, by identifier (TA number, SMC number, G-BA procedure number, NBK id, CT dossier code). NICE 152/175 (86.9%); SMC 67/142 (47.2%); G-BA 112/234 (47.9%, all from 2025-20… · **Not enumerated:** PBAC: only the 'A' page of the PSD list was read; PBAC outcome PDFs not parsed

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NICE TA1202: Trastuzumab deruxtecan for treating HER2-positive unresectable or… | niceTA TA1202 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/ta1202) | high |
| NICE TA1195: Daratumumab with bortezomib, lenalidomide and dexamethasone for un… | niceTA TA1195 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/ta1195) | high |
| NICE TA1145: Pembrolizumab for neoadjuvant and adjuvant treatment of resectable… | niceTA TA1145 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/ta1145) | high |

26 more in `gap-census-2026-11.json` (type `hta-reports`).

#### <a id="systematic-reviews"></a>Systematic reviews (`systematic-reviews`, rank 43)

**OnCo:** 16 (Paper records whose DOI starts 10.1002/14651858 (Cochrane Database Syst Rev): 16; distinct Cochrane CD numbers cited anywhere in src/data:…) · **Denominator:** [PubMed: "Cochrane Database Syst Rev"[ta] AND neoplasms[mh], 2021-11-04 to 2026-11-04](https://pubmed.ncbi.nlm.nih.gov/?term=%22Cochrane+Database+Syst+Rev%22%5Bta%5D+AND+neoplasms%5Bmh%5D) (210), read · **Denominator:** [PubMed broader: same journal and window, neoplasms[mh] OR cancer terms in title/abstract](https://pubmed.ncbi.nlm.nih.gov/) (281), read · **Coverage:** 4/210 (1.9%). Match by Cochrane review number (CDnnnnnn, any version) against every DOI in src/data and the entity index; 3 match the exact version. None of the 4 is a paper record of the current version (hyperbar… · **Not enumerated:** Non-Cochrane systematic reviews and meta-analyses (e.g. EBCTCG, MAC-NPC, ACCENT individual-patient-data meta-analyses) not enumerated

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Impact of low-dose computed tomography (LDCT) screening on lung cancer-related… | doi 10.1002/14651858.CD013829.pub2; pmid 35921047; cochrane… | MISSING | [pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/35921047/) | high |
| Prehabilitation versus no prehabilitation to improve functional capacity, reduc… | doi 10.1002/14651858.CD013259.pub3; pmid 37162250; cochrane… | MISSING | [pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/37162250/) | high |
| Impact of residual disease as a prognostic factor for survival in women with ad… | doi 10.1002/14651858.CD015048.pub2; pmid 36161421; cochrane… | MISSING | [pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/36161421/) | high |

17 more in `gap-census-2026-11.json` (type `systematic-reviews`).

#### <a id="esmo-mcbs-scorecards"></a>ESMO-MCBS scorecards (`esmo-mcbs-scorecards`, rank 53)

**OnCo:** 91 (Grade strings in src/data: every esmoMcbs field on standardOfCare guideline objects (cancers.ts and spikes) plus every line carrying 'MCBS'…) · **Denominator:** [ESMO-MCBS Scorecards for solid tumours: JSON data file behind the scorecards page](https://dam.esmo.org/raw/upload/v1792653376/untitled_content_item_66b19ca.json) (547), read · **Denominator:** [ESMO-MCBS evaluation forms page](https://www.esmo.org/guidelines/esmo-mcbs/esmo-mcbs-evaluation-forms), read · **Coverage:** 31/547 (5.7%). A scorecard is covered if its trial name (or any part of a multi-name trial, or its NCT id) appears inside an OnCo MCBS grade string. By tumour type: Gastrointestinal cancers 11/119; Thoracic maligna… · **Not enumerated:** ESMO-MCBS for haematological malignancies (ESMO-MCBS:H) scorecards: not located in this session

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ESMO-MCBS v2.0 scorecard 570: Trastuzumab deruxtecan (DESTINY-Breast05), Breast… | esmoMcbsScorecardId 570; nct NCT04622319; trial DESTINY-Bre… | MISSING | [dam.esmo.org](https://dam.esmo.org/raw/upload/v1792653376/untitled_content_item_66b19ca.json) | high |
| ESMO-MCBS v2.0 scorecard 539: Durvalumab (MATTERHORN), Gastric or gastroesophag… | esmoMcbsScorecardId 539; nct NCT04592913; trial MATTERHORN | MISSING | [dam.esmo.org](https://dam.esmo.org/raw/upload/v1792653376/untitled_content_item_66b19ca.json) | high |
| ESMO-MCBS v2.0 scorecard 465: Durvalumab (AEGEAN), Non-small-cell lung cancer,… | esmoMcbsScorecardId 465; nct NCT03800134; trial AEGEAN | MISSING | [dam.esmo.org](https://dam.esmo.org/raw/upload/v1792653376/untitled_content_item_66b19ca.json) | high |

16 more in `gap-census-2026-11.json` (type `esmo-mcbs-scorecards`).

#### <a id="conferences"></a>Conferences and congresses (`conferences`, rank 110)

**OnCo:** 9 (Meeting series with a structured entry: 7 collections tagged 'congress' (ASCO Meeting Library, ESMO Congress, AACR Annual Meeting, ASH Annu…) · **Denominator:** [Assignment list of major oncology meetings plus 7 additions (ASCO Quality Care Symposium, ESMO Gyna…](https://www.esmo.org/meeting-calendar) (49), partly read · **Coverage:** 9/49 (18.4%). Covered = a collection record, digest or calendar entry for the series; 22 more are MENTION (named in passing) and 18 MISSING (incorpus with series name, abbreviation and year-tagged aliases). MISSIN… · **Not enumerated:** No registry of oncology meetings exists; national society meetings (e.g. DGHO, SFRO, BSH, ANZGOG) and AACR special conferences not enumerat…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| ESMO Asia Congress | officialUrl https://www.esmo.org/meeting-calendar/esmo-asia… | MISSING | [esmo.org](https://www.esmo.org/meeting-calendar/esmo-asia-congress-2026) | high |
| European Lung Cancer Congress | officialUrl https://www.esmo.org/meeting-calendar/european-… | MISSING | [esmo.org](https://www.esmo.org/meeting-calendar/european-lung-cancer-congress-2026) | high |
| EHA Congress (European Hematology Association) | officialUrl https://ehaweb.org/connect-network/eha2026-cong… | MENTION | [ehaweb.org](https://ehaweb.org/connect-network/eha2026-congress/) | high |

17 more in `gap-census-2026-11.json` (type `conferences`).

### Organisations and people

#### <a id="companies"></a>Companies (`companies`, rank 165)

**OnCo:** 1636 (all.ndjson kind=company (1706) minus companyType=investor (70); by companyType: biotech 745, diagnostics 157, pharma 132, ai-software 130,…) · **Denominator:** [ClinicalTrials.gov API v2: industry lead sponsors of active interventional cancer studies (recruiti…](https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.overallStatus=RECRUITING%2CNOT_YET_RECRUITING%2CACTIVE_NOT_RECRUITING%2CENROLLING_BY_INVITATION&aggFilters=studyType%3Aint%2CfunderType%3Aindustry&fields=NCTId%2CLeadSponsorName%2CLeadSponsorClass%2CPhase%2COverallStatus&pageSize=1000&countTotal=true) (1726), read · **Denominator:** [OnCo's own completeness check: CT.gov industry lead sponsors of phase 3 cancer studies](https://clinicaltrials.gov/search?cond=cancer&aggFilters=studyType:int) (945), read · 3 more denominators in the JSON · **Coverage:** 349/427 (81.7%). Each sponsor string run through incorpus.py with the raw name, a suffix-stripped name and a core name; then OnCo's own SPONSOR_PATTERNS from src/data/sponsor-aliases.ts; then explicit parent clauses… · **Not enumerated:** Graduated HKEX Chapter 18A issuers (no -B marker any more): HKEX's own biotech page counts 73 Chapter 18A listings since 2018 but no machin…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Coloplast | fdaProductCode EXB, EXD | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=1000) | high |
| Hollister | fdaProductCode EXB | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=1000) | high |
| ConvaTec | fdaProductCode EXB | MISSING | [api.fda.gov](https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=1000) | high |

26 more in `gap-census-2026-11.json` (type `companies`).

#### <a id="cdmo-cro"></a>CDMOs and CROs (`cdmo-cro`, rank 142)

**OnCo:** 62 (kind=company with companyType cro-services: 62 (CROs, CDMOs, isotope and radiopharmacy services). Side table src/data/manufacturing.ts hold…) · **Denominator:** [ACRO (Association of Clinical Research Organizations): Current Members](https://www.acrohealth.org/current-members/) (18), read · **Denominator:** [IntuitionLabs: ADC CDMO comparison (table of 12 ADC CDMOs with sites, scale, containment and 2023-2…](https://intuitionlabs.ai/articles/adc-cdmo-comparison) (12), read · **Coverage:** 15/30 (50.0%). Names run through incorpus.py. ACRO members 8/18 covered (ICON, IQVIA, Medidata, Parexel, Veeva, Fortrea, Labcorp, Medable); ADC CDMOs 7/12 (Lonza, WuXi XDC, Catalent, Piramal, Abzena, Sterling, Sams… · **Not enumerated:** Cell and gene therapy CDMOs (viral vector, autologous and allogeneic manufacturing): no outside list fetched.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Novotech |  | MISSING | [acrohealth.org](https://www.acrohealth.org/current-members/) | medium |
| PPD (Thermo Fisher Scientific clinical research) |  | MENTION | [acrohealth.org](https://www.acrohealth.org/current-members/) | medium |
| Syneos Health |  | MENTION | [acrohealth.org](https://www.acrohealth.org/current-members/) | medium |

10 more in `gap-census-2026-11.json` (type `cdmo-cro`).

#### <a id="investors"></a>Investors (`investors`, rank 100)

**OnCo:** 70 (kind=company with companyType investor (src/data/investors.ts plus others): 70, tagged vc 47, corporate-venture 15, foundation 6, public-fu…) · **Denominator:** Internal consistency: investor names in company tldr, summary, notes and funding-row notes (pattern… (197), read · **Denominator:** [BioSpace: The Top 5 Most Active Corporate VCs in Pharma (PitchBook data)](https://www.biospace.com/business/the-top-5-most-active-corporate-vcs-in-pharma) (6), read · 1 more denominators in the JSON · **Coverage:** 6/197 (3.0%) sampled. Internal consistency: of 197 investor-like names that OnCo's own company prose names as a lead or participant, 6 match a record by name (IN-RECORD-NAME) and 191 are mentions only. A seeded sample of… · **Not enumerated:** A full life-science VC league table by deal count (PitchBook, DealForma, Crunchbase): not freely readable; the Société Générale report was…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Lilly Asia Ventures |  | MENTION | [biospace.com](https://www.biospace.com/business/the-top-5-most-active-corporate-vcs-in-pharma) | medium |
| New Enterprise Associates (NEA) |  | MENTION | [nea.com](https://www.nea.com/) | medium |
| The Column Group |  | MENTION | [thecolumngroup.com](https://www.thecolumngroup.com/) | low |

8 more in `gap-census-2026-11.json` (type `investors`).

#### <a id="deals"></a>Deals (`deals`, rank 143)

**OnCo:** 64 (src/data/deals.ts: 64 deals (34 acquisition, 24 licence, 6 co-development; by year 2024: 11, 2025: 13, 2026: 2). Deals are also recorded as…) · **Denominator:** [Life Science Daily: Biotech M&A 2026, every $1B+ deal so far (44 acquisitions announced 1 January t…](https://lifesciencedaily.news/biotech-ma-2026-every-1b-deal-so-far-and-what-is-driving-them/) (44), read · **Denominator:** [J.P. Morgan Q4 2025 Biopharma Licensing and Venture Report](https://www.jpmorgan.com/content/dam/jpmorgan/documents/cb/insights/outlook/jpm-biopharma-deck-q4-2025.pdf), read · **Coverage:** 6/12 (50.0%). For each oncology deal in the 2026 $1B+ list: covered when recorded as data (a deals.ts row, the target's acquiredBy field, or an 'Acquisition' funding row on the target record). Recorded as data: Gi… · **Not enumerated:** Oncology licensing deals 2024-2026 (the J.P. Morgan report's 'over $252 billion' licensing in 2025 is an aggregate; no deal list was readab…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Merck KGaA acquisition of Silence Therapeutics | announced 19 Oct 2026; headlineValue $1.3bn | MENTION | [lifesciencedaily.news](https://lifesciencedaily.news/biotech-ma-2026-every-1b-deal-so-far-and-what-is-driving-them/) | medium |
| Merck & Co acquisition of Terns Pharmaceuticals | announced 25 Mar 2026; headlineValue $6.7bn | MENTION | [lifesciencedaily.news](https://lifesciencedaily.news/biotech-ma-2026-every-1b-deal-so-far-and-what-is-driving-them/) | medium |
| Novartis acquisition of Pikavation Therapeutics | announced 20 Mar 2026; headlineValue Up to $3bn | MENTION | [lifesciencedaily.news](https://lifesciencedaily.news/biotech-ma-2026-every-1b-deal-so-far-and-what-is-driving-them/) | medium |

4 more in `gap-census-2026-11.json` (type `deals`).

#### <a id="cancer-centres-hospitals"></a>Cancer centres and hospitals (`cancer-centres-hospitals`, rank 120)

**OnCo:** 485 (kind=institution with institutionType hospital (260) or cancer-center (225). 41 carry a newsweekOncology2026 field. Country spread is thin…) · **Denominator:** [Newsweek World's Best Specialized Hospitals 2026: Oncology](https://rankings.newsweek.com/worlds-best-specialized-hospitals-2026/oncology) (293), read · **Denominator:** [Netzwerk der Onkologischen Spitzenzentren (Deutsche Krebshilfe comprehensive cancer centres): Mitgl…](https://www.ccc-netzwerk.de/das-netzwerk/mitglieder.html) (14), read · 2 more denominators in the JSON · **Coverage:** 209/293 (71.3%). Newsweek 2026 oncology list. Pass 1: hospital name through incorpus.py, or its website domain equal to (or a subdomain of) an OnCo institution website: 167/293 (57.0%), the strict figure for the name… · **Not enumerated:** Japan: MHLW designated cancer care hospitals: ministry page 404 and the current national list file was not found; the national cancer centr…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| National Hospital Organization Kyushu Cancer Center | newsweekOncology2026Rank 148 | MISSING | [rankings.newsweek.com](https://rankings.newsweek.com/worlds-best-specialized-hospitals-2026/oncology) | high |
| Korea Cancer Center Hospital | newsweekOncology2026Rank 194 | MISSING | [rankings.newsweek.com](https://rankings.newsweek.com/worlds-best-specialized-hospitals-2026/oncology) | high |
| Istituto Giannina Gaslini | newsweekOncology2026Rank 117 | MISSING | [rankings.newsweek.com](https://rankings.newsweek.com/worlds-best-specialized-hospitals-2026/oncology) | high |

17 more in `gap-census-2026-11.json` (type `cancer-centres-hospitals`).

#### <a id="radiotherapy-facilities"></a>Particle therapy and radiotherapy facilities (`radiotherapy-facilities`, rank 15)

**OnCo:** 65 (kind=institution whose name, aka, tags, tldr or summary match /proton\|carbon[- ]ion\|particle therapy\|heavy[- ]ion\|hadron/: 65. Of these…) · **Denominator:** [PTCOG: Facilities in clinical operation](https://ptcog.online/facilities-in-clinical-operation/), login required · **Denominator:** [IAEA DIRAC (Directory of Radiotherapy Centres)](https://dirac.iaea.org/) (8500), partly read · 1 more denominators in the JSON · **Coverage:** 1/52 (1.9%). Each NAPT centre name, and a distinctive facility name where the listing gives one (Roberts, S. Lee Kling, Schulze, Laurie, Williams...), run through incorpus.py. Covered = a record for the facility… · **Not enumerated:** Particle therapy facilities outside the US: PTCOG facility tables need a login (ptcog.online); no other complete public list was found (Wik…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| St. Jude Proton Therapy Center | naptStatus Non-Member Center | MISSING | [proton-therapy.org](https://www.proton-therapy.org/map/) | high |
| Cincinnati Children's Proton Therapy Center | naptStatus Member Center | MISSING | [proton-therapy.org](https://www.proton-therapy.org/map/) | high |
| MD Anderson Cancer Center - Proton Therapy | naptStatus Member Center | MISSING | [proton-therapy.org](https://www.proton-therapy.org/map/) | medium |
| Roberts Proton Therapy Center - Penn Medicine | naptStatus Member Center | MISSING | [proton-therapy.org](https://www.proton-therapy.org/map/) | medium |
| Siteman Cancer Center - S. Lee Kling Proton Therapy Center | naptStatus Member Center | MISSING | [proton-therapy.org](https://www.proton-therapy.org/map/) | medium |

15 more in `gap-census-2026-11.json` (type `radiotherapy-facilities`).

#### <a id="hospices-support-centres"></a>Hospices and cancer support centres (`hospices-support-centres`, rank 1)

**OnCo:** 0 (Individual centres and hospices: none found. incorpus.py on the 32 Maggie's centres and 9 Marie Curie hospices returned MISSING for every o…) · **Denominator:** [Maggie's: Our centres](https://www.maggies.org/our-centres/) (32), read · **Denominator:** [Marie Curie: hospices](https://www.mariecurie.org.uk/help/hospice-care/hospices) (9), read · 3 more denominators in the JSON · **Coverage:** 0/41 (0.0%). Individual centres from two enumerated lists (Maggie's 32 + Marie Curie hospices 9) run through incorpus.py with and without the apostrophe: 0 matched. Network level, separately: of 10 support and ho… · **Not enumerated:** US hospices and the NHPCO membership: no machine-readable list fetched (CMS Hospice Compare provider data would be the denominator; not att…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Maggie's Royal Marsden | maggiesCentreSlug maggies-royal-marsden | MISSING | [maggies.org](https://www.maggies.org/our-centres/) | medium |
| Maggie's Edinburgh | maggiesCentreSlug maggies-edinburgh | MISSING | [maggies.org](https://www.maggies.org/our-centres/) | medium |
| Maggie's Barts | maggiesCentreSlug maggies-barts | MISSING | [maggies.org](https://www.maggies.org/our-centres/) | medium |
| Marie Curie Hospice, Hampstead | marieCurieHospiceSlug hampstead | MISSING | [mariecurie.org.uk](https://www.mariecurie.org.uk/help/hospice-care/hospices) | medium |
| Marie Curie Hospice, Glasgow | marieCurieHospiceSlug glasgow | MISSING | [mariecurie.org.uk](https://www.mariecurie.org.uk/help/hospice-care/hospices) | medium |

5 more in `gap-census-2026-11.json` (type `hospices-support-centres`).

#### <a id="accreditation-programmes"></a>Accreditation programmes and certified centres (`accreditation-programmes`, rank 50)

**OnCo:** 5 (Programmes represented by a record, an alias on a record, or a field/tag on institutions: NCI designation (institution field nci on 79), OE…) · **Denominator:** [Programme list assembled for this census (18 programmes) from the assignment and programme pages re…](https://www.facs.org/quality-programs/cancer-programs/commission-on-cancer/) (18), partly read · **Denominator:** [MASCC-Designated Centers of Excellence in Supportive Care in Cancer](https://mascc.org/centers-of-excellence/) (43), read · 3 more denominators in the JSON · **Coverage:** 5/18 (27.8%). Each programme name and abbreviation run through incorpus.py and every hit read. Covered (5): NCI designation, OECI A&D, DKG/OnkoZert, FACT-JACIE, COG membership. Named only in passing (10): Commissi… · **Not enumerated:** CoC (nearly 1,400 programmes), NAPBC and NAPRC certified-centre lists: ACS locator not enumerated.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| National Accreditation Program for Breast Centers (NAPBC) |  | MISSING | [facs.org](https://www.facs.org/quality-programs/cancer-programs/national-accreditation-program-for-breast-centers/) | high |
| Commission on Cancer (CoC) accreditation |  | MENTION | [facs.org](https://www.facs.org/quality-programs/cancer-programs/commission-on-cancer/) | high |
| EURACAN (European Reference Network for rare adult solid cancers) |  | MENTION | [euracan.eu](https://www.euracan.eu/) | high |

10 more in `gap-census-2026-11.json` (type `accreditation-programmes`).

#### <a id="charities-foundations"></a>Charities and foundations (`charities-foundations`, rank 52)

**OnCo:** 46 (National or general cancer charities with a record: institution tag charity (13, all UK) plus consortium-type national societies and founda…) · **Denominator:** [Association of European Cancer Leagues (ECL) members](https://www.cancer.eu/members/) (35), read · **Denominator:** [UICC map of members](https://www.uicc.org/membership) (1100), partly read · 1 more denominators in the JSON · **Coverage:** 10/35 (28.6%). incorpus.py on each ECL member's English and native name. RECORD: Cancer Research UK, Dutch Cancer Society (kwf), French League Against Cancer, German Cancer Society, Hellenic Cancer Federation, Iris… · **Not enumerated:** UICC member directory beyond its first page: HTTP 406 on export, pagination, name filter and sitemap

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Italian League Against Cancer | eclMember Italian League Against Cancer | MISSING | [cancer.eu](https://www.cancer.eu/members/) | high |
| Danish Cancer Society | eclMember Danish Cancer Society | MENTION | [cancer.eu](https://www.cancer.eu/members/) | high |
| Foundation Against Cancer Belgium | eclMember Foundation Against Cancer Belgium | MENTION | [cancer.eu](https://www.cancer.eu/members/) | high |

23 more in `gap-census-2026-11.json` (type `charities-foundations`).

#### <a id="patient-advocacy"></a>Patient advocacy groups (`patient-advocacy`, rank 2)

**OnCo:** 28 (Collections tagged patient-org (28): mostly US disease foundations (ACS, LLS, PanCAN, MMRF, LRF, NBTS, ALSF, St Baldrick's, Colorectal Canc…) · **Denominator:** [EMA eligible patients' and consumers' organisations (oncology subset)](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) (7), read · **Denominator:** [International and European cancer patient coalitions named in the assignment plus the common diseas…](https://lymphomacoalition.org/) (26), partly read · 1 more denominators in the JSON · **Coverage:** 0/33 (0.0%). incorpus.py on each organisation's name and acronym. None of the 7 EMA-eligible oncology bodies and none of the 26 verified coalitions has a record; 8 are MENTION (CPE, LuCE, MPE, ALK Positive, ROS1d… · **Not enumerated:** ECPC's roughly 400 members: site unreachable (timeout)

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cancer Patients Europe (CPE) | emaEligible yes | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) | high |
| Europa Uomo | emaEligible yes | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) | high |
| Myeloma Patients Europe (MPE) | emaEligible yes | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) | high |
| Lymphoma Coalition Europe (LCE) | emaEligible yes | MISSING | [ema.europa.eu](https://www.ema.europa.eu/en/partners-networks/patients-consumers/eligible-patients-consumers-organisations) | high |
| Childhood Cancer International (CCI) | website https://www.childhoodcancerinternational.org/ | MISSING | [childhoodcancerinternational.org](https://www.childhoodcancerinternational.org/) | high |

26 more in `gap-census-2026-11.json` (type `patient-advocacy`).

#### <a id="research-funders"></a>Research funders (`research-funders`, rank 76)

**OnCo:** 47 (Records that are cancer research funders, found by name: about 40 consortium-type institutions (cruk, wellcome, hhmi, damon-runyon, v-found…) · **Denominator:** [International Cancer Research Partnership (ICRP): partners and funding organisations](https://www.icrpartnership.org/partners) (175), read · **Denominator:** [DoD Congressionally Directed Medical Research Programs, FY26 funded research programmes](https://cdmrp.health.mil/researchprograms) (9), read · **Coverage:** 37/184 (20.1%). incorpus.py on each ICRP name, bracketed acronym and long abbreviation, then corrected by hand: 33 raw hits minus 1 false (Chief Scientist Office hit on 'Scotland') plus 5 records under variant names… · **Not enumerated:** Major national research councils outside ICRP (European Research Council, DFG, ANR, NSFC, JSPS, Swiss National Science Foundation): no sing…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| World Cancer Research Fund International (WCRF) (in scope of worktree-agent-a2b1ed541c1d2d610) | icrpSponsorCode WCRFInt | MENTION | [icrpartnership.org](https://www.icrpartnership.org/partners) | high |
| Congressionally Directed Medical Research Programs (CDMRP), US Department of De… | icrpSponsorCode CDMRP | MENTION | [icrpartnership.org](https://www.icrpartnership.org/partners) | high |
| American Institute for Cancer Research (AICR) (in scope of worktree-agent-a2b1ed541c1d2d610) | icrpSponsorCode AICR (USA) | MISSING | [icrpartnership.org](https://www.icrpartnership.org/partners) | medium |

30 more in `gap-census-2026-11.json` (type `research-funders`).

#### <a id="regulators"></a>Regulators (`regulators`, rank 39)

**OnCo:** 18 (Government institutions that are medicines regulators, found by name: fda-oce (the FDA is represented by its Oncology Center of Excellence)…) · **Denominator:** [ICH Members and Observers (regulatory members and legislative or administrative authority observers)](https://admin.ich.org/page/members-observers) (47), read · **Denominator:** [WHO-Listed Authorities (WLA), list as of December 2025](https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list_of_wla.pdf?sfvrsn=1f6c2140_50&download=true) (40), read · 2 more denominators in the JSON · **Coverage:** 18/78 (23.1%). Union of the four lists, deduplicated by authority (78 national or regional authorities). incorpus.py on English name, native name and distinctive acronym. Covered = RECORD or IN-RECORD-NAME: EMA, FD… · **Not enumerated:** Medical-device notified bodies and device regulators (EU notified bodies under MDR/IVDR, Korea's device division): not enumerated

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Health Sciences Authority (HSA), Singapore | ich HSA, Singapore; wla Singapore | MISSING | [fda.gov](https://www.fda.gov/about-fda/oncology-center-excellence/project-orbis) | high |
| Israel Ministry of Health Pharmaceutical Administration | orbis IMoH; ich CPED, Israel | MISSING | [fda.gov](https://www.fda.gov/about-fda/oncology-center-excellence/project-orbis) | high |
| Swedish Medical Products Agency (Läkemedelsverket) | wla Sweden (SMPA) | MENTION | [cdn.who.int](https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list_of_wla.pdf?sfvrsn=1f6c2140_50&download=true) | high |
| Roszdravnadzor (Russia) | ich Roszdravnadzor, Russia | MISSING | [admin.ich.org](https://admin.ich.org/page/members-observers) | medium |
| South African Health Products Regulatory Authority (SAHPRA) | ich SAHPRA, South Africa | MISSING | [admin.ich.org](https://admin.ich.org/page/members-observers) | medium |

17 more in `gap-census-2026-11.json` (type `regulators`).

#### <a id="hta-bodies"></a>HTA bodies (`hta-bodies`, rank 34)

**OnCo:** 12 (Institutions whose record is an HTA or reimbursement-appraisal body: tags hta-body (cda-amc, inesss) plus government records nice, smc, has…) · **Denominator:** [INAHTA members list](https://www.inahta.org/members/members_list/) (53), read · **Denominator:** [EU Member State Coordination Group on HTA (HTACG), members, medicinal products configuration](https://health.ec.europa.eu/document/download/63a56ee2-bdaa-47ac-87a6-397eeb8c8e80_en?filename=hta_htacg_mp_members_en.pdf) (12), read · **Coverage:** 14/65 (21.5%). incorpus.py on acronym, English and native names for each body. INAHTA: 13/53 covered (RECORD: ANS, CDA-AMC, CONITEC, G-BA, HAS, INESSS, IQWiG, NICE, ZIN; IN-RECORD-NAME: AP-HP via its hospital recor… · **Not enumerated:** HTAi and ISPOR regional networks, EUnetHTA (the predecessor joint-assessment network, now succeeded by the HTACG): not enumerated this sess…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| PHARMAC (Pharmaceutical Management Agency, New Zealand) | inahta PHARMAC | MISSING | [inahta.org](https://www.inahta.org/members/members_list/) | high |
| National Centre for Pharmacoeconomics (NCPE), Ireland | htacg Ireland | MISSING | [health.ec.europa.eu](https://health.ec.europa.eu/document/download/63a56ee2-bdaa-47ac-87a6-397eeb8c8e80_en?filename=hta_htacg_mp_members_en.pdf) | high |
| Danish Medicines Council (Medicinrådet) | htacg Denmark | MISSING | [health.ec.europa.eu](https://health.ec.europa.eu/document/download/63a56ee2-bdaa-47ac-87a6-397eeb8c8e80_en?filename=hta_htacg_mp_members_en.pdf) | high |
| Agency for Health Technology Assessment and Tariff System (AOTMiT), Poland | inahta AOTMiT | MISSING | [inahta.org](https://www.inahta.org/members/members_list/) | high |
| National Institute for Health and Disability Insurance (RIZIV / INAMI / NIHDI),… | htacg Belgium | MISSING | [health.ec.europa.eu](https://health.ec.europa.eu/document/download/63a56ee2-bdaa-47ac-87a6-397eeb8c8e80_en?filename=hta_htacg_mp_members_en.pdf) | high |

18 more in `gap-census-2026-11.json` (type `hta-bodies`).

#### <a id="payers-reimbursement"></a>Payers and reimbursement lists (`payers-reimbursement`, rank 25)

**OnCo:** 22 (Payer and reimbursement-decision records: institutions nhsa, hira, nhis-korea, nha-pmjay, ans-brazil, conitec, pbac, tlv-sweden, zorginstit…) · **Denominator:** [CMS Medicare Coverage Database: National Coverage Determinations report (API)](https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/) (345), read · **Denominator:** [Reimbursement systems named in the assignment (10)](https://www.mhlw.go.jp/stf/shingi/shingi-chuo_128154.html) (10), partly read · **Coverage:** 3/24 (12.5%). For each oncology NCD, src/data was searched for 'NCD <number>' and for the NCD title. Cited: 110.24 CAR T-cell therapy, 210.3 colorectal cancer screening tests, 90.2 next generation sequencing. Titl… · **Not enumerated:** Medicare LCDs and MolDX billing articles (api.coverage.cms.gov local-coverage reports): not fetched for lack of budget; MolDX is MENTION (6…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Medicare NCD 210.14: Lung Cancer Screening with Low Dose Computed Tomography (L… | cmsNcd 210.14; cmsDocumentId 364 | MISSING | [api.coverage.cms.gov](https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/) | high |
| Medicare NCD 220.6.17: Positron Emission Tomography (FDG) for Oncologic Conditi… | cmsNcd 220.6.17; cmsDocumentId 331 | MISSING | [api.coverage.cms.gov](https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/) | high |
| Medicare NCD 220.4: Mammograms | cmsNcd 220.4; cmsDocumentId 186 | MISSING | [api.coverage.cms.gov](https://api.coverage.cms.gov/v1/reports/national-coverage-ncd/) | high |
| Centers for Medicare & Medicaid Services (CMS) | website https://www.cms.gov/ | MENTION | [cms.gov](https://www.cms.gov/) | high |
| Central Social Insurance Medical Council (Chuikyo), Japan | website https://www.mhlw.go.jp/stf/shingi/shingi-chuo_12815… | MENTION | [mhlw.go.jp](https://www.mhlw.go.jp/stf/shingi/shingi-chuo_128154.html) | high |

14 more in `gap-census-2026-11.json` (type `payers-reimbursement`).

#### <a id="professional-societies"></a>Professional societies (`professional-societies`, rank 82)

**OnCo:** 33 (Consortium-type institutions that are professional societies, found by name: asco, esmo, aacr, nccn-org, siop-europe, ash, astro, estro, sn…) · **Denominator:** [European Cancer Organisation: Our Member Societies](https://www.europeancancer.org/members.html) (40), read · **Denominator:** [Major international and national societies by discipline (nursing, pharmacy, psycho-oncology, neuro…](https://www.ons.org/) (12), read · **Coverage:** 9/40 (22.5%). ECO member societies, incorpus.py on full name and acronym (acronyms under 4 characters dropped). RECORD: EANM, EHA, EORTC, ESPEN, ESTRO, ESGO, ESSO, MASCC, OECI. Four societies (EAU, EHNS, EONS, Eur… · **Not enumerated:** National oncology societies country by country (the ESMO and ASCO international affiliate lists were not fetched)

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| European Association for Palliative Care (EAPC) | ecoMemberSociety EAPC | MISSING | [europeancancer.org](https://www.europeancancer.org/members.html) | high |
| European Oncology Nursing Society (EONS) | ecoMemberSociety EONS | MENTION | [europeancancer.org](https://www.europeancancer.org/members.html) | high |
| Oncology Nursing Society (ONS) | website https://www.ons.org/ | MENTION | [ons.org](https://www.ons.org/) | high |

29 more in `gap-census-2026-11.json` (type `professional-societies`).

#### <a id="government-cancer-agencies"></a>Government cancer agencies and national institutes (`government-cancer-agencies`, rank 138)

**OnCo:** 30 (Government institutions that are cancer bodies (nci, nci-ccr, frederick-national-lab, iarc, who, iaea, inca-brazil, inca, inc-luxembourg, i…) · **Denominator:** [Constructed list of 30 national cancer institutes and agencies, weighted to low- and middle-income…](https://www.ncikenya.go.ke/) (30), read · **Denominator:** [WHO and IARC cancer initiatives](https://www.who.int/initiatives/global-breast-cancer-initiative) (5), read · 1 more denominators in the JSON · **Coverage:** 22/35 (62.9%). incorpus.py. Constructed national-institute list: 21/30 covered (RECORD or IN-RECORD-NAME), 3 MENTION, 6 MISSING. WHO/IARC initiatives: 1/5 (Rays of Hope, inside the iaea record); the other four are… · **Not enumerated:** IARC Participating States: list page not found

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| WHO Global Breast Cancer Initiative (GBCI) | website https://www.who.int/initiatives/global-breast-cance… | MENTION | [who.int](https://www.who.int/initiatives/global-breast-cancer-initiative) | high |
| WHO Cervical Cancer Elimination Initiative | website https://www.who.int/initiatives/cervical-cancer-eli… | MENTION | [who.int](https://www.who.int/initiatives/cervical-cancer-elimination-initiative) | high |
| WHO Global Initiative for Childhood Cancer (GICC) | website https://www.who.int/initiatives/the-global-initiati… | MENTION | [who.int](https://www.who.int/initiatives/the-global-initiative-for-childhood-cancer) | high |

7 more in `gap-census-2026-11.json` (type `government-cancer-agencies`).

#### <a id="donor-registries"></a>Stem cell donor registries and cord blood banks (`donor-registries`, rank 17)

**OnCo:** 1 (Records whose subject is a donor registry or cord blood bank: anthony-nolan (institution, tags charity, transplant, stem-cell). REDOME is n…) · **Denominator:** [WMDA 'Find your registry' map (member registries, cord blood banks and related organisations)](https://wmda.info/find-your-registry/) (116), read · **Coverage:** 4/116 (3.4%). incorpus.py on every map entry's name, its name without the bracketed part, and the bracketed acronym when 4+ characters. RECORD: Anthony Nolan, IPO Porto, Sheba Medical Center, Fred Hutchinson Cance… · **Not enumerated:** Private (family) cord blood banks: not in the WMDA list and not enumerated

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| World Marrow Donor Association (WMDA) | website https://wmda.info/ | MISSING | [wmda.info](https://wmda.info/) | high |
| NMDP (in scope of worktree-agent-a2b1ed541c1d2d610) | wmdaIon ION-3553; website https://www.nmdp.org/ | MISSING | [wmda.info](https://wmda.info/find-your-registry/) | high |
| DKMS (DKMS Registry gGmbH and DKMS donor centres) | wmdaIon ION-4596; website https://dkmsregistry.org | MISSING | [wmda.info](https://wmda.info/find-your-registry/) | high |
| NHS Stem Cell Donor Registry | wmdaIon ION-2731; website http://www.nhsbt.nhs.uk/ | MISSING | [wmda.info](https://wmda.info/find-your-registry/) | high |
| JMDP - Japan Marrow Donor Program | wmdaIon ION-4364; website http://www.jmdp.or.jp/english.html | MISSING | [wmda.info](https://wmda.info/find-your-registry/) | high |

26 more in `gap-census-2026-11.json` (type `donor-registries`).

#### <a id="people"></a>People (`people`, rank 111)

**OnCo:** 1623 (Records of kind person in all.ndjson (1623; tags leadership 475, clinician-scientist 291, trialist 162, oeci-representative 129, hero 78, p…) · **Denominator:** [Nobel Prize API v2.1, nobelPrizes in Physiology or Medicine, Chemistry, Physics](https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeCategory=med&limit=200&format=json) (60), read · **Denominator:** [Lasker Foundation winners (WordPress REST endpoint behind laskerfoundation.org/winners/)](https://laskerfoundation.org/wp-json/wp/v2/winners?per_page=100) (268), read · 4 more denominators in the JSON · **Coverage:** 121/542 (22.3%). Union of the six lists, de-duplicated by first and last name (542 people); covered = a person record exists. Per list (person record / listed; named anywhere incl. MENTION): aacr 106/399 (26.6%; name… · **Not enumerated:** ASCO presidents 1983-84, 1986-89 and 2021-2025: not in the ASCO Post list fetched; asco.org returns 403 to scripts.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Axel Ullrich | laskerCitationUrl https://laskerfoundation.org/winners/herc… | MISSING | [laskerfoundation.org](https://laskerfoundation.org/wp-json/wp/v2/winners?per_page=100) | high |
| H. Michael Shepard | laskerCitationUrl https://laskerfoundation.org/winners/herc… | MISSING | [laskerfoundation.org](https://laskerfoundation.org/wp-json/wp/v2/winners?per_page=100) | high |
| Nicholas B. Lydon | laskerCitationUrl https://laskerfoundation.org/winners/mole… | MISSING | [laskerfoundation.org](https://laskerfoundation.org/wp-json/wp/v2/winners?per_page=100) | high |

27 more in `gap-census-2026-11.json` (type `people`).

#### <a id="prizes-awards"></a>Prizes and awards (`prizes-awards`, rank 144)

**OnCo:** 0 (No entity kind or side table holds prizes; there is no prize record. Prize names occur only inside person, institution and history text. A…) · **Denominator:** [Major cancer-relevant prizes (the brief's 14 plus 16 more), each verified on a fetched page](https://www.aacr.org/wp-json/wp/v2/award?per_page=100) (30), partly read · **Denominator:** [AACR awards and lectureships (REST post type 'award')](https://www.aacr.org/wp-json/wp/v2/award?per_page=100) (21), read · 1 more denominators in the JSON · **Coverage:** 0/62 (0.0%). Covered = a record about the prize. None exists (0/62). Named anywhere in src/data: major prizes 8/30 (26.7%), AACR awards 0/21, ASCO Special Awards 1/11; overall 9/62 (14.5%). · **Not enumerated:** Prize laureate lists (Pezcoller-AACR, Szent-Györgyi, Brupbacher, Sjöberg, Kettering/Sloan/Mott, Warren Alpert, Breakthrough) were not enume…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Pezcoller Foundation-American Association for Cancer Research International Awa… | aacrAwardUrl https://www.aacr.org/awards/pezcoller-aacr-int… | MISSING | [aacr.org](https://www.aacr.org/wp-json/wp/v2/award?per_page=100) | high |
| Sjöberg Prize | wikipediaPageId 54459943 | MENTION | [en.wikipedia.org](https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=Sj%C3%B6berg%20Prize) | high |
| Szent-Györgyi Prize for Progress in Cancer Research | wikipediaPageId 38366084 | MISSING | [en.wikipedia.org](https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=Szent-Gy%C3%B6rgyi%20Prize%20for%20Progress%20in%20Cancer%20Research) | medium |

17 more in `gap-census-2026-11.json` (type `prizes-awards`).

#### <a id="grants-programmes"></a>Grants and funding programmes (`grants-programmes`, rank 101)

**OnCo:** 11 (funding.ts holds 11 funder rows (NCI budget, NIH, Cancer Moonshot, ARPA-H, CRUK, EU Mission on Cancer, DKFZ, BCRF, Stand Up To Cancer, Ludw…) · **Denominator:** [ARPA-H Programs (current portfolio page)](https://arpa-h.gov/explore-funding/programs) (42), read · **Denominator:** [Cancer Grand Challenges: active challenges, previous challenges, new teams announcement](https://www.cancergrandchallenges.org/challenges/active-challenges) (21), read · 6 more denominators in the JSON · **Coverage:** 3/105 (2.9%). Covered = a record about the programme or team (or, for an EU project that is a trial, the trial's record). Named anywhere: 21/105 (20.0%). Per list: Cancer Grand Challenges teams 0/21 record, 7/21 n… · **Not enumerated:** Stand Up To Cancer Dream Teams: blocked (403), see denominators.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Childhood Cancer Data Initiative (CCDI) |  | MISSING | [cancer.gov](https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative) | high |
| NCI Cancer Screening Research Network (CSRN) |  | MENTION | [cancer.gov](https://www.cancer.gov/research/progress/moonshot-cancer-initiative) | high |
| Vanguard Study (NCI Cancer Screening Research Network) |  | MENTION | [cancer.gov](https://www.cancer.gov/research/progress/moonshot-cancer-initiative) | high |

24 more in `gap-census-2026-11.json` (type `grants-programmes`).

### Places and health systems

#### <a id="countries"></a>Countries (`countries`, rank 21)

**OnCo:** 18 (country pages: src/data/country-{au,br,ca,ch,de,es,fr,gb,il,in,it,jp,kr,nl,ru,se,us}.ts plus src/data/china.ts (route src/app/countries/<is…) · **Denominator:** [GLOBOCAN 2024 (IARC Global Cancer Observatory, Cancer Today), populations with estimates](https://gco.iarc.who.int/today) (186), read · **Coverage:** 18/186 (9.7%). country pages / GLOBOCAN 2024 populations · **Not enumerated:** Sub-national places (US states, Canadian provinces, Indian states, Chinese provinces, NHS cancer alliances beyond the 19 tagged): not measu…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Indonesia (country page) | ISO3 IDN; ISO2 ID; GCO population code (ISO numeric) 360; G… | MENTION | [gco.iarc.who.int](https://gco.iarc.who.int/media/globocan/factsheets/populations/360-indonesia-fact-sheet.pdf) | high |
| Türkiye (country page) | ISO3 TUR; ISO2 TR; GCO population code (ISO numeric) 792; G… | MENTION | [gco.iarc.who.int](https://gco.iarc.who.int/media/globocan/factsheets/populations/792-turkiye-fact-sheet.pdf) | high |
| Poland (country page) | ISO3 POL; ISO2 PL; GCO population code (ISO numeric) 616; G… | MENTION | [gco.iarc.who.int](https://gco.iarc.who.int/media/globocan/factsheets/populations/616-poland-fact-sheet.pdf) | high |
| Mexico (country page) | ISO3 MEX; ISO2 MX; GCO population code (ISO numeric) 484; G… | MENTION | [gco.iarc.who.int](https://gco.iarc.who.int/media/globocan/factsheets/populations/484-mexico-fact-sheet.pdf) | high |
| Pakistan (country page) | ISO3 PAK; ISO2 PK; GCO population code (ISO numeric) 586; G… | MENTION | [gco.iarc.who.int](https://gco.iarc.who.int/media/globocan/factsheets/populations/586-pakistan-fact-sheet.pdf) | high |

22 more in `gap-census-2026-11.json` (type `countries`).

#### <a id="national-cancer-plans"></a>National cancer control plans (`national-cancer-plans`, rank 61)

**OnCo:** 14 (No record kind holds plans; counted countries whose specific national cancer plan or strategy is named in src/data (country pages, spikes,…) · **Denominator:** [ICCP portal (International Cancer Control Partnership, UICC) national plans map: data endpoint](https://www.iccp-portal.org/api/map-data) (140), read · **Denominator:** [WHO Global Health Observatory OData API (NCD Country Capacity Survey indicators, operational cancer…](https://ghoapi.azureedge.net/api/Indicator), blocked: 503 (maintenance, two attempts) · **Coverage:** 13/140 (9.3%). Countries in the ICCP list with at least one national cancer plan document whose specific plan OnCo names (13: GB DE FR ES IT JP AU CA SE US BR RU CN; PL counted as a passing mention, the US national… · **Not enumerated:** Sub-national plans (US state comprehensive cancer control plans, Canadian provincial plans, Australian state plans; ICCP lists 92 US docume…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Fifth Comprehensive Cancer Control Plan (2026-2030) (Korea, South) | ICCP country code KR; plan years 2026 - 2030; ICCP plan typ… | MISSING | [iccp-portal.org](https://www.iccp-portal.org/sites/default/files/2026-03/%EB%B3%B4%EA%B1%B4%EB%B3%B5%EC%A7%80%EB%B6%80_%EC%A0%9C5%EC%B0%A8%2B%EC%95%94%EA%B4%80%EB%A6%AC%EC%A2%85%ED%95%A9%EA%B3%84%ED%9A%8D%282026~2030%29.pdf) | high |
| The Dutch Cancer Agenda / De Nederlandse Kanker Agenda (Netherlands) | ICCP country code NL; plan years 2023 - 2033 | MISSING | [iccp-portal.org](https://www.iccp-portal.org/sites/default/files/plans/De-Nederlandse-Kanker-Agenda-1.0.pdf) | high |
| Rencana Kanker Nasional 2024 - 2034 (Indonesia) | ICCP country code ID; plan years 2024 - 2034; ICCP plan typ… | MISSING | [iccp-portal.org](https://www.iccp-portal.org/sites/default/files/plans/Rencana_Kanker_Nasional_2024-2034.pdf) | high |

24 more in `gap-census-2026-11.json` (type `national-cancer-plans`).

#### <a id="screening-programmes"></a>Screening programmes (`screening-programmes`, rank 29)

**OnCo:** 63 (Country x site screening topics named on the 18 country pages (regex per site for breast, cervix, colorectal, lung, prostate, gastric, live…) · **Denominator:** [IARC CanScreen5 (Cancer Screening in Five Continents) country fact sheets, qualitative programme da…](https://canscreen5.iarc.fr/) (203), read · **Denominator:** [Europe PMC searches for programmes outside CanScreen5's three sites (lung, prostate, oral, multi-si…](https://www.ebi.ac.uk/europepmc/webservices/rest/search), read · 2 more denominators in the JSON · **Coverage:** 33/203 (16.3%). CanScreen5 national programmes with a documented policy (country x site), matched to OnCo country pages by site regex; for countries without a page, by co-occurrence of the country name and site scre… · **Not enumerated:** Lung, prostate, gastric, liver, oral and nasopharyngeal programmes worldwide: no machine-readable registry found; sampled through Europe PMC

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| China: national breast cancer screening programme (CanScreen5 fact sheet) | ISO3 CHN; site breast; year programme initiated 2009; polic… | MISSING | [canscreen5.iarc.fr](https://canscreen5.iarc.fr/assets/breast-B7N-lkex.js) | high |
| China: national cervical cancer screening programme (CanScreen5 fact sheet) | ISO3 CHN; site cervix; year programme initiated 2009; polic… | MISSING | [canscreen5.iarc.fr](https://canscreen5.iarc.fr/assets/cervix-DLzl_wc7.js) | high |
| Turkey: national breast cancer screening programme (CanScreen5 fact sheet) | ISO3 TUR; site breast; year programme initiated 2004; polic… | MISSING | [canscreen5.iarc.fr](https://canscreen5.iarc.fr/assets/breast-7l7IfCoo.js) | high |
| Turkey: national cervical cancer screening programme (CanScreen5 fact sheet) | ISO3 TUR; site cervix; year programme initiated 2004; polic… | MISSING | [canscreen5.iarc.fr](https://canscreen5.iarc.fr/assets/cervix-DM2G8MQL.js) | high |
| Turkey: national colorectal cancer screening programme (CanScreen5 fact sheet) | ISO3 TUR; site colorectal; year programme initiated 2011; p… | MISSING | [canscreen5.iarc.fr](https://canscreen5.iarc.fr/assets/colorectal-BXOR1CZU.js) | high |

27 more in `gap-census-2026-11.json` (type `screening-programmes`).

#### <a id="drug-access-schemes"></a>Drug-access schemes (`drug-access-schemes`, rank 80)

**OnCo:** 6 (Term records about an access route: expanded-access (aka includes EU Article 83 compassionate use, named-patient supply, Project Facilitate…) · **Denominator:** [Curated list: the assignment's named schemes plus national regulator routes for the 18 page countri…](https://www.ebi.ac.uk/europepmc/webservices/rest/search) (32), read · **Coverage:** 13/32 (40.6%). RECORD or IN-RECORD-NAME by incorpus.py over aliases: EAMS, ILAP, CDF, IMF, France AAP, France AAC, US expanded access, Right to Try, Project Facilitate, EU compassionate use (Art. 83), NICE managed… · **Not enumerated:** Korea MFDS therapeutic-use approval, Israel Form 29C, Japan expanded-access trials (拡大治験), India compassionate use: no source found this se…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Special Access Program (SAP) for drugs, Health Canada (Food and Drug Regulation… | regulation Food and Drug Regulations, C.R.C., c. 870, s. C.… | MISSING | [laws-lois.justice.gc.ca](https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.) | high |
| Special Access Scheme (SAS), Therapeutic Goods Administration, Australia | PMID 22372936; DOI 10.1111/j.1445-5994.2012.02751.x | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:22372936&resultType=core&format=json) | high |
| Arzneimittel-Härtefallprogramme (compassionate use programmes), BfArM, Germany… | statute § 21 Abs. 2 Nr. 6 AMG; Article 83 Regulation (EC) N… | MISSING | [bfarm.de](https://www.bfarm.de/DE/Arzneimittel/Klinische-Pruefung/Compassionate-Use/_node.html) | high |

12 more in `gap-census-2026-11.json` (type `drug-access-schemes`).

#### <a id="laws-policies"></a>Laws and policies (`laws-policies`, rank 20)

**OnCo:** 51 (src/data/law-wave.ts: 51 term records tagged law (LAW_INDEX 65 rows over 9 jurisdictions: us eu uk de fr jp cn in intl; themes approval, pa…) · **Denominator:** [ESMO Open 2025 review, Table 1: countries implementing a right-to-be-forgotten law in Europe](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) (10), read · **Denominator:** [CMS Medicare Drug Price Negotiation Program: Selected Drug List and Maximum Fair Price data file (2…](https://www.cms.gov/files/zip/cms-negotiation-program-selected-drug-list-maximum-fair-price-data-file-20261102.zip) (40), read · 2 more denominators in the JSON · **Coverage:** 4/49 (8.2%). Curated list of 49 instruments: RECORD or IN-RECORD-NAME (NBCCEDP collection, the HPV vaccine technology record, idea records for oral-chemotherapy parity and single-dose HPV) = 4; MENTION 23; MISSIN… · **Not enumerated:** US state law (oral-chemotherapy parity, biomarker coverage beyond the existing term, indoor tanning bans, firefighter presumptive-cancer la…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Belgium: right-to-be-forgotten law for cancer survivors (Royal Decree 2025) | PMID 41320341; DOI 10.1016/j.esmoop.2025.105767; PMCID PMC1… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) | high |
| Luxembourg: right-to-be-forgotten law for cancer survivors (Government-industry… | PMID 41320341; DOI 10.1016/j.esmoop.2025.105767; PMCID PMC1… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) | high |
| The Netherlands: right-to-be-forgotten law for cancer survivors (Insurance Exam… | PMID 41320341; DOI 10.1016/j.esmoop.2025.105767; PMCID PMC1… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) | high |
| Portugal: right-to-be-forgotten law for cancer survivors (Law 1 Jan 2022) | PMID 41320341; DOI 10.1016/j.esmoop.2025.105767; PMCID PMC1… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) | high |
| Spain: right-to-be-forgotten law for cancer survivors (Royal Decree-Law 5/2023) | PMID 41320341; DOI 10.1016/j.esmoop.2025.105767; PMCID PMC1… | MISSING | [ebi.ac.uk](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12684760/fullTextXML) | high |

20 more in `gap-census-2026-11.json` (type `laws-policies`).

#### <a id="cancer-statistics-sources"></a>Cancer statistics sources (`cancer-statistics-sources`, rank 77)

**OnCo:** 12 (Records about a statistics source: collections globocan and seer; institutions aihw, icmr-ncrp, zfkd-rki, swedish-cancer-register, israel-n…) · **Denominator:** [Curated list of 58 cancer statistics resources: IARC and international programmes (GLOBOCAN, CI5, I…](https://gco.iarc.who.int/today) (58), read · **Coverage:** 12/58 (20.7%). RECORD or IN-RECORD-NAME by incorpus.py, minus two false IN-RECORD-NAME hits (USCS, The Cancer Atlas) · **Not enumerated:** Population-based cancer registries worldwide (IACR and ENCR membership lists): iacr.com.fr gave no response; ENCR member list not parsed

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cancer Incidence in Five Continents (CI5, IARC and IACR; volumes I-XII and CI5… | url https://ci5.iarc.who.int/ | MENTION | [ci5.iarc.who.int](https://ci5.iarc.who.int/) | high |
| ECIS: European Cancer Information System (JRC) | url https://ecis.jrc.ec.europa.eu/ | MENTION | [ecis.jrc.ec.europa.eu](https://ecis.jrc.ec.europa.eu/) | high |
| International Incidence of Childhood Cancer (IICC, IARC and IACR) | url https://iicc.iarc.fr/ | MENTION | [iicc.iarc.fr](https://iicc.iarc.fr/) | high |

19 more in `gap-census-2026-11.json` (type `cancer-statistics-sources`).

### Patient resources

#### <a id="helplines"></a>Helplines (`helplines`, rank 16)

**OnCo:** 15 (free-wave.ts services table group 'helplines' (12 services: NCI CIS, Macmillan Support Line, CRUK nurse helpline, ACS helpline, CancerCare…) · **Denominator:** [International Cancer Information Service Group (ICISG): List of Member Organizations](https://icisg.org/membership/membership-list/) (67), read · **Denominator:** [Association of European Cancer Leagues (ECL, now cancer.eu): Members](https://www.cancer.eu/members/) (33), read · 1 more denominators in the JSON · **Coverage:** 15/67 (22.4%). For each ICISG full member, is its helpline or information service (not just the organisation) named in src/data? Covered: the six state Cancer Councils (13 11 20), NCI, ACS, Macmillan, CRUK, Prostat… · **Not enumerated:** Greece, Hungary, Portugal, Hong Kong national lines: league sites returned 403 to a script (cancerhellas.org, rakliga.hu, ligacontracancro.…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cancer Society of New Zealand Cancer Information Helpline | phone 0800 226 237 | MISSING | [cancer.org.nz](https://www.cancer.org.nz/) | high |
| Japan: Cancer Information Service Support Center and the cancer consultation su… | phone 0570-02-3410 (Navi Dial) / 03-6706-7797 | MISSING | [ganjoho.jp](https://ganjoho.jp/public/institution/consultation/index.html) | high |
| AECC Infocáncer (Spain) | phone 900 100 036 | MISSING | [contraelcancer.es](https://www.contraelcancer.es/es) | high |
| Ligue contre le cancer numéro vert (France) | phone 0 800 940 939 | MISSING | [ligue-cancer.net](https://www.ligue-cancer.net/) | high |
| Korea National Cancer Information Center telephone counselling | phone 1577-8899 | MENTION | [cancer.go.kr](https://www.cancer.go.kr/) | high |

15 more in `gap-census-2026-11.json` (type `helplines`).

#### <a id="navigation-services"></a>Navigation services (`navigation-services`, rank 9)

**OnCo:** 0 programmes (1 related record) (Records: financial-navigation (technology). Patient navigation as a service model has no record: it appears in five idea records (funded na…) · **Denominator:** [US navigation bodies and payment (AONN+, ACS National Navigation Roundtable, Medicare Principal Ill…](https://www.ruralhealthinfo.org/care-management/principal-illness-navigation-services) (3), read · **Denominator:** [National nurse-navigator programmes outside the US (McGrath Foundation, Australia)](https://www.mcgrathfoundation.com.au/) (1), read · **Coverage:** no outside list; no programme record. No authoritative list of navigation programmes exists; the denominator here is a hand-picked set of four national bodies and payment schemes from fetched pages. · **Not enumerated:** UK clinical nurse specialists and key workers (a named CNS for every patient is NHS policy, measured in the National Cancer Patient Experie…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Patient navigation (the service model: navigators, nurse navigators, lay and pe… | url https://www.aonnonline.org/ | MENTION | [aonnonline.org](https://www.aonnonline.org/) | high |
| Medicare Principal Illness Navigation (PIN) services, HCPCS G0023 and G0024 | hcpcs G0023; G0024 | MENTION | [ruralhealthinfo.org](https://www.ruralhealthinfo.org/care-management/principal-illness-navigation-services) | high |
| Academy of Oncology Nurse & Patient Navigators (AONN+) | url https://www.aonnonline.org/ | MISSING | [aonnonline.org](https://www.aonnonline.org/) | medium |
| American Cancer Society National Navigation Roundtable (NNRT) | url https://navigationroundtable.org/ | MISSING | [navigationroundtable.org](https://navigationroundtable.org/) | medium |
| McGrath Foundation cancer care nurses (Australia) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url https://www.mcgrathfoundation.com.au/ | MISSING | [mcgrathfoundation.com.au](https://www.mcgrathfoundation.com.au/) | medium |

#### <a id="financial-assistance"></a>Financial assistance (`financial-assistance`, rank 31)

**OnCo:** 78 (assistance-schemes.ts 26 schemes (US 10, GB 6, AU 3, CA 2, IN 2, JP 1, CN 1, EU 1); coverage-us.ts patient-assistance map 50 distinct progr…) · **Denominator:** [CancerCare, A Helping Hand: The 2026 Resource Guide for People With Cancer (successor to the Cancer…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (77), read · **Denominator:** [National benefit pages read one by one](https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/) (9), partly read · **Coverage:** 11/32 (34.4%). Helping Hand national organisations that offer direct financial help, corpus-checked with incorpus.py (name, former name and website domain). Covered = RECORD or IN-RECORD-NAME, or a structured side-… · **Not enumerated:** Manufacturer patient assistance programmes: no complete outside list was read (PhRMA Medicine Assistance Tool and NeedyMeds were not enumer…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Family Reach (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web familyreach.org | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| CancerCare A Helping Hand resource database (the former Cancer Financial Assist… | web https://www.cancercare.org/helpinghand | MISSING | [cancerfac.org](https://www.cancerfac.org/) | high |
| Italy: ticket exemption code 048 for cancer | exemptionCode 048 | MISSING | [aslcn2.it](https://www.aslcn2.it/media/2025/09/Esenzione-Ticket-MMG.pdf) | high |
| Japan: injury and sickness allowance (傷病手当金) | url https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickn… | MISSING | [kyoukaikenpo.or.jp](https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/) | high |
| Good Days (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web www.mygooddays.org | MENTION | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |

14 more in `gap-census-2026-11.json` (type `financial-assistance`).

#### <a id="travel-lodging"></a>Travel and lodging (`travel-lodging`, rank 64)

**OnCo:** 6 (free-wave.ts services group 'travel' (ACS Road To Recovery, ACS Hope Lodge, Corporate Angel Network, Ronald McDonald House Charities, Young…) · **Denominator:** [CancerCare, A Helping Hand 2026: national organisations tagged Transportation or Lodging](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (15), read · **Denominator:** [Healthcare Hospitality Network (national association of healthcare hospitality houses)](https://hhnetwork.org/), partly read · 1 more denominators in the JSON · **Coverage:** 5/15 (33.3%). Helping Hand national organisations tagged Transportation or Lodging, corpus-checked with incorpus.py on name and website domain. Covered: American Cancer Society, CancerCare, HealthWell Foundation,… · **Not enumerated:** Healthcare Hospitality Network member houses: the locator is a JavaScript map.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Healthcare Hospitality Network (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web hhnetwork.org | MISSING | [hhnetwork.org](https://hhnetwork.org/) | high |
| Joe's House (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web www.joeshouse.org; phone 877-563-7468 | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| Air Charity Network (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web www.aircharitynetwork.org; phone 877-621-7177 | MISSING | [aircharitynetwork.org](https://aircharitynetwork.org/) | high |

8 more in `gap-census-2026-11.json` (type `travel-lodging`).

#### <a id="fertility-preservation-services"></a>Fertility preservation services (`fertility-preservation-services`, rank 10)

**OnCo:** 0 (Services, networks and funding schemes for fertility preservation: none has a record or a side-table entry. The method itself is covered: t…) · **Denominator:** [Alliance for Fertility Preservation: state fertility preservation coverage legislation (State List)](https://www.allianceforfertilitypreservation.org/expenses/laws-legislation/) (44), partly read · **Denominator:** [FertiPROTEKT Netzwerk e.V. (Germany, Austria, parts of Switzerland)](https://fertiprotekt.com/aerzte-fachpersonen/netzwerk/) (150), read · 2 more denominators in the JSON · **Coverage:** 0/6 (0.0%). Six services, networks or funding schemes named by the fetched sources (Oncofertility Consortium, LIVESTRONG Fertility, Alliance for Fertility Preservation, FertiPROTEKT, Japan's national subsidy, US… · **Not enumerated:** Which of the 44 AFP-listed US jurisdictions have enacted coverage: map status is JavaScript-only.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| LIVESTRONG Fertility (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url livestrong.org/how-we-help/livestrong-fertility | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| US state fertility preservation coverage laws (iatrogenic infertility mandates) | firstLaws Connecticut and Rhode Island, 2017 (per AFP); jur… | MENTION | [allianceforfertilitypreservation.org](https://www.allianceforfertilitypreservation.org/expenses/laws-legislation/) | high |
| Alliance for Fertility Preservation (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url https://www.allianceforfertilitypreservation.org/ | MISSING | [allianceforfertilitypreservation.org](https://www.allianceforfertilitypreservation.org/expenses/laws-legislation/) | medium |
| FertiPROTEKT Netzwerk e.V. | url https://fertiprotekt.com/ | MISSING | [fertiprotekt.com](https://fertiprotekt.com/aerzte-fachpersonen/netzwerk/) | medium |
| Japan: national oncofertility subsidy for children, adolescents and young adult… | start 令和3年4月 (April 2021) | MISSING | [pref.fukushima.lg.jp](https://www.pref.fukushima.lg.jp/sec/21045c/ninnyousei-onnzonn.html) | medium |

1 more in `gap-census-2026-11.json` (type `fertility-preservation-services`).

#### <a id="psycho-oncology-services"></a>Psycho-oncology services (`psycho-oncology-services`, rank 11)

**OnCo:** 0 services (26 psychosocial technology records) (Technology records tagged psychosocial (24, the rejuvenation 'mind' and 'life' fronts: fear of recurrence, distress screening, depression,…) · **Denominator:** [IPOS Federation of national psycho-oncology societies](https://ipos-society.org/IPOS-Federation) (36), read · **Denominator:** [Deutsche Krebshilfe: Psychosoziale Krebsberatungsstellen](https://www.krebshilfe.de/helfen/rat-hilfe/psychosoziale-krebsberatungsstellen/), read · **Coverage:** 0/28 (0.0%). The 28 named federation societies, corpus-checked with incorpus.py by full name, local-language name and acronym. RECORD 0, MENTION 2 (CAPO, APOS), MISSING 26. IPOS itself is a MENTION. · **Not enumerated:** Psycho-oncology services at hospital level (for example cancer-centre psycho-oncology clinics, NHS psychological support commissioned throu…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Psychosocial cancer counselling centres in Germany (Psychosoziale Krebsberatung… | url https://www.krebshilfe.de/helfen/rat-hilfe/psychosozial… | MISSING | [krebshilfe.de](https://www.krebshilfe.de/helfen/rat-hilfe/psychosoziale-krebsberatungsstellen/) | high |
| International Psycho-Oncology Society (IPOS) | url https://ipos-society.org/ | MENTION | [ipos-society.org](https://ipos-society.org/IPOS-Federation) | high |
| IPOS Standard of Quality Cancer Care | url https://ipos-society.org/IPOS-Federation | MISSING | [ipos-society.org](https://ipos-society.org/IPOS-Federation) | medium |
| British Psychosocial Oncology Society (BPOS) | url http://www.bpos.org/ | MISSING | [ipos-society.org](https://ipos-society.org/federation/uk) | medium |
| German Association of Psychosocial Oncology (dapo) | url http://www.dapo-ev.de/ | MISSING | [ipos-society.org](https://ipos-society.org/federation/germany) | medium |

10 more in `gap-census-2026-11.json` (type `psycho-oncology-services`).

#### <a id="peer-support-communities"></a>Peer support and communities (`peer-support-communities`, rank 46)

**OnCo:** 7 (Records for peer and community services: Imerman Angels, First Descents, Kesem (collections), Cancer Support Community (collection, helplin…) · **Denominator:** [CancerCare A Helping Hand 2026: national organisations serving special populations (children and ad…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (41), read · **Denominator:** [Peer and community services read one by one (Cancer Hope Network, Smart Patients, Shine Cancer Supp…](https://cancerhopenetwork.org/) (4), partly read · **Coverage:** 11/41 (26.8%). Helping Hand special-population organisations corpus-checked with incorpus.py on name and website domain (same join as financial-assistance). By group: young adults 7/26, children and adolescents 8/2… · **Not enumerated:** Macmillan Online Community (community.macmillan.org.uk: Incapsula bot page), Canteen Australia (403), Young Survival Coalition (403, a MENT…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cancer Hope Network (one-to-one peer mentoring) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url https://cancerhopenetwork.org/ | MISSING | [cancerhopenetwork.org](https://cancerhopenetwork.org/) | high |
| Stupid Cancer (young adult community) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web www.stupidcancer.org | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| Smart Patients (online community) | url https://www.smartpatients.com/ | MISSING | [smartpatients.com](https://www.smartpatients.com/) | medium |

8 more in `gap-census-2026-11.json` (type `peer-support-communities`).

#### <a id="family-legal-work-bereavement"></a>Family, legal, work and bereavement services (`family-legal-work-bereavement`, rank 37)

**OnCo:** 2 (Service records: Kesem (collection, camps for children of a parent with cancer) and Marie Curie (institution). Evidence records without ser…) · **Denominator:** [CancerCare A Helping Hand 2026: national organisations tagged Legal, Bereaved, Siblings or Caregive…](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) (18), read · **Denominator:** [UK and Canadian family, bereavement and work services read one by one (Child Bereavement UK, Winsto…](https://www.cruse.org.uk/) (7), partly read · **Coverage:** 4/18 (22.2%). Helping Hand organisations with Legal, Bereaved, Siblings or Caregivers tags, corpus-checked by name and domain. Covered: Alex's Lemonade Stand Foundation, American Cancer Society, Imerman Angels, Tr… · **Not enumerated:** Riprap (UK, teenagers with a parent who has cancer): riprap.org.uk timed out; MISSING in the corpus.

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Cancer and Careers (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web www.cancerandcareers.org | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| Cancer Legal Resource Center (Disability Rights Legal Center) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | phone 213-736-1031 | MISSING | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |
| Child Bereavement UK (now including Winston's Wish) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url https://www.childbereavementuk.org/; phone 0800 02 888… | MISSING | [childbereavementuk.org](https://www.childbereavementuk.org/) | high |
| Cruse Bereavement Support (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | url https://www.cruse.org.uk/; phone 0808 808 1677 | MISSING | [cruse.org.uk](https://www.cruse.org.uk/) | high |
| Triage Cancer (legal and financial navigation) (in scope of worktree-agent-a2b1ed541c1d2d610 (the organisation, as a charity or nonprofit); the service itself belongs to this census) | web triagecancer.org; phone 424-258-4628 | MENTION | [cancercare.org](https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US) | high |

7 more in `gap-census-2026-11.json` (type `family-legal-work-bereavement`).

#### <a id="education-resources"></a>Patient education resources (`education-resources`, rank 3)

**OnCo:** 46 (Individual items from the four outside libraries linked by URL anywhere in src/data (URL index of 39,094 URLs built from every .ts and .jso…) · **Denominator:** [NCI PDQ Cancer Information Summaries (7 category pages: adult treatment, pediatric treatment, suppo…](https://www.cancer.gov/publications/pdq/information-summaries) (235), read · **Denominator:** [ESMO Patient Guides](https://www.esmo.org/for-patients/patient-guides) (27), read · 2 more denominators in the JSON · **Coverage:** 46/861 (5.3%). URL match against the corpus URL index (cancer.gov paths normalised without query or anchor; ESMO, NCCN and PES links by domain and path). By library: PDQ 43/235 (18.3%; patient version 22/235, 9.4%)… · **Not enumerated:** Macmillan and CRUK cancer information libraries: OnCo links them heavily (86 Macmillan cancer-information URLs) but no outside list of thei…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Patient Education Sheets library (ONS/NCODA/HOPA/ACCC drug sheets for oral, inj… | url https://patienteducationsheets.com/; example https://nc… | MISSING | [ons.org](https://www.ons.org/clinical-tools/resources/patient-education-sheets) | high |
| NCCN Guidelines for Patients: Distress During Cancer Care | nccnPatientGuidelineId 10; version 2026 | MISSING | [nccn.org](https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients) | high |
| NCCN Guidelines for Patients: Breast Cancer - Invasive Breast Cancer | nccnPatientGuidelineId 16; version 2026 | MISSING | [nccn.org](https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients) | high |
| NCCN Guidelines for Patients: Prostate Cancer: Early Stage | nccnPatientGuidelineId 49; version 2026 | MISSING | [nccn.org](https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients) | high |
| NCCN Guidelines for Patients: Colon Cancer | nccnPatientGuidelineId 8; version 2026 | MISSING | [nccn.org](https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients) | high |

21 more in `gap-census-2026-11.json` (type `education-resources`).

#### <a id="decision-aids"></a>Decision aids (`decision-aids`, rank 12)

**OnCo:** 0 aids (9 records about decision aids: ideas and a trial) (OnCo's own decision tools in src/data/decision-tools/ (9 files: bcc-low-risk-treatment, breast-surgery-choice, colorectal-adjuvant-chemothe…) · **Denominator:** [Ottawa Hospital Research Institute, A to Z Inventory of Patient Decision Aids (browse list)](https://decisionaid.ohri.ca/AZlist.html) (36), read · **Denominator:** [NHS England decision support tools](https://www.england.nhs.uk/personalisedcare/shared-decision-making/decision-support-tools/), blocked: 202 with an empty body on two… · **Coverage:** 0/36 (0.0%). Each of the 36 cancer aids checked by URL (developer link from the summary page) and by title with incorpus.py; the only hit is ePrognosis, named in passing as a life-expectancy tool, not the mammogr… · **Not enumerated:** NHS England decision support tools: page blocked to a script (HTTP 202, empty body).

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Lung Cancer Screening: Is it right for me? (MD Anderson, Robert Volk) | ohriId 1994; url https://lungscreen.health; year 2022 | MISSING | [decisionaid.ohri.ca](https://decisionaid.ohri.ca/Azsumm.php?ID=1994) | high |
| Prostate cancer screening: Should you get a PSA test? (Mayo Clinic) | ohriId 1222; url https://www.mayoclinic.org/tests-procedure… | MISSING | [decisionaid.ohri.ca](https://decisionaid.ohri.ca/Azsumm.php?ID=1222) | high |
| Taking a medicine to reduce the chance of developing breast cancer (NICE patien… | ohriId 1889; niceGuideline CG164; year 2021 | MISSING | [decisionaid.ohri.ca](https://decisionaid.ohri.ca/Azsumm.php?ID=1889) | high |
| Ottawa A to Z Inventory of Patient Decision Aids (the inventory itself) | url https://decisionaid.ohri.ca/AZlist.html | MISSING | [decisionaid.ohri.ca](https://decisionaid.ohri.ca/azinvent.php) | high |
| Localized prostate cancer (Norwegian Centre for Shared Decision Making, helseno… | ohriId 2081; url https://tjenester.helsenorge.no/samvalg/pr… | MISSING | [decisionaid.ohri.ca](https://decisionaid.ohri.ca/Azsumm.php?ID=2081) | medium |

10 more in `gap-census-2026-11.json` (type `decision-aids`).

#### <a id="trial-finders-second-opinion"></a>Trial finders and second-opinion services (`trial-finders-second-opinion`, rank 87)

**OnCo:** 39 (Trial registries named with a URL or record: 8 of the WHO primary registries (ANZCTR, ChiCTR, CRiS, CTIS, CTRI, EU-CTR, ISRCTN, jRCT) plus…) · **Denominator:** [WHO ICTRP: Primary registries in the WHO Registry Network](https://www.who.int/tools/clinical-trials-registry-platform/network/primary-registries) (18), read · **Denominator:** [National patient trial-search sites read one by one (NCI, Australian Cancer Trials, DRKS, ReBEC, PA…](https://australiancancertrials.gov.au/) (5), partly read · 1 more denominators in the JSON · **Coverage:** 8/18 (44.4%). WHO primary registries corpus-checked by full name and acronym with incorpus.py and by URL; CRiS counted as covered (MENTION with its URL in country-kr.ts). · **Not enumerated:** Canadian Cancer Trials (canadiancancertrials.ca): timed out; incorpus reports IN-RECORD-NAME only because of the Canadian Cancer Trials Gro…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NCI clinical trials search (Find Cancer Clinical Trials) | url https://www.cancer.gov/research/participate/clinical-tr… | MISSING | [cancer.gov](https://www.cancer.gov/research/participate/clinical-trials-search) | high |
| Australian Cancer Trials | url https://australiancancertrials.gov.au/ | MISSING | [australiancancertrials.gov.au](https://australiancancertrials.gov.au/) | high |
| German Clinical Trials Register (DRKS) | whoPrimaryRegistry DRKS; url https://drks.de/search/en | MISSING | [who.int](https://www.who.int/tools/clinical-trials-registry-platform/network/primary-registries) | medium |

6 more in `gap-census-2026-11.json` (type `trial-finders-second-opinion`).

### Prevention and risk

#### <a id="carcinogens"></a>Carcinogens (IARC) (`carcinogens`, rank 54)

**OnCo:** 52 (Every IARC Group 1 (135) and Group 2A (98) agent was checked with incorpus.py using the agent name plus synonyms (e.g. 'Ciclosporin\|cyclos…) · **Denominator:** [IARC Monographs: List of Classifications (agents classified by the IARC Monographs, volumes 1 to 14…](https://monographs.iarc.who.int/list-of-classifications/) (1128), read · **Coverage:** 40/135 (29.6%). Group 1, full enumeration (135 agents): 40 covered, 36 MENTION, 59 MISSING after hand adjudication of incorpus hits (see onco.method). Group 2A, full enumeration rather than a sample (98 agents): 12… · **Not enumerated:** Group 2B (329) and Group 3 (498): not measured; Group 2B holds many agents patients ask about (e.g. radiofrequency electromagnetic fields,…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Hydrochlorothiazide | IARC group 1; IARC volumes 50, 108, 137; CAS 58-93-5 | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Estrogen-progestogen menopausal therapy (combined) | IARC group 1; IARC volumes 72, 91, 100A | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Hepatitis D virus (HDV) | IARC group 1; IARC volumes 59, 139 | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |

26 more in `gap-census-2026-11.json` (type `carcinogens`).

#### <a id="occupational-exposures"></a>Occupational exposures (`occupational-exposures`, rank 68)

**OnCo:** 2 (Records whose subject is an occupational exposure: none found by name search (regex 'occupation\|carcinogen\|exposure' over names and aka o…) · **Denominator:** [Loomis D, Guha N, Hall AL, Straif K. Identifying occupational carcinogens: an update from the IARC…](https://doi.org/10.1136/oemed-2017-104944) (47), read · **Denominator:** [IARC Monographs List of Classifications: exposure circumstances (occupations, industries and proces…](https://monographs.iarc.who.int/list-of-classifications/) (27), read · **Coverage:** 10/74 (13.5%). Loomis 2018 Table 2 agents: 9 of 47 have a record about the agent (asbestos, radon, outdoor air pollution, particulate matter, solar radiation, ultraviolet radiation, radioiodines, ionising radiation… · **Not enumerated:** National occupational-disease compensation lists (e.g. the ILO List of Occupational Diseases, EU Directive 2004/37/EC Annex I processes, US…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Firefighter (occupational exposure as a) | IARC group 1; IARC volumes 98, 132 | MENTION | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Engine exhaust, diesel | IARC group 1; IARC volumes 46, 105 | MENTION | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | high |
| Painter (occupational exposure as a) | IARC group 1; IARC volumes 47, 98, 100F | MISSING | [monographs.iarc.who.int](https://monographs.iarc.who.int/list-of-classifications/) | medium |

17 more in `gap-census-2026-11.json` (type `occupational-exposures`).

#### <a id="lifestyle-risk-factors"></a>Lifestyle risk factors (`lifestyle-risk-factors`, rank 38)

**OnCo:** 36 (Technologies in sections prevention or nutrition-lifestyle, terms in categories 'Epidemiology & prevention' or 'Nutrition & lifestyle', and…) · **Denominator:** [WCRF/AICR Continuous Update Project: Summary of strong evidence on diet, nutrition, physical activi…](https://www.wcrf.org/wp-content/uploads/2024/10/CUP-Strong-Evidence-Matrix.pdf) (34), read · **Denominator:** [European Code Against Cancer, 5th edition (ECAC5): 14 recommendations for individuals (plus 14 poli…](https://cancer-code-europe.iarc.who.int/wp-content/uploads/2025/10/European-Code-Against-Cancer-5th-edition.pdf) (14), read · 1 more denominators in the JSON · **Coverage:** 13/34 (38.2%). WCRF matrix exposures checked with incorpus.py plus hand adjudication: covered = a record is about the exposure or its immediate parent (red meat and processed meat by red-processed-meat-reduction; c… · **Not enumerated:** The WCRF matrix's per-cancer judgements (which exposure is convincing or probable for which cancer) could not be read from the graphical PD…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| European Code Against Cancer, 5th edition (ECAC5): the Code itself, its 14 reco… | URL https://cancer-code-europe.iarc.who.int/ | MENTION | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/) | high |
| Breastfeeding (lactation) and lower breast cancer risk in the mother | ECAC5 recommendation 7 (Breastfeeding); WCRF matrix column… | MENTION | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/wp-content/uploads/2025/10/European-Code-Against-Cancer-5th-edition.pdf) | high |
| E-cigarettes and vaping products | ECAC5 recommendation 1 (Smoking) | MENTION | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/wp-content/uploads/2025/10/European-Code-Against-Cancer-5th-edition.pdf) | high |
| Sunscreen use and sun protection for the general population | IARC Handbooks volume 5 (Sunscreens, 2001); ECAC5 recommend… | MENTION | [publications.iarc.who.int](https://publications.iarc.who.int/Book-And-Report-Series/Iarc-Handbooks-Of-Cancer-Prevention/Sunscreens-2001) | high |
| Sedentary behaviour and screen time | ECAC5 recommendation 4 (Physical activity); WCRF matrix col… | MENTION | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/wp-content/uploads/2025/10/European-Code-Against-Cancer-5th-edition.pdf) | medium |

13 more in `gap-census-2026-11.json` (type `lifestyle-risk-factors`).

#### <a id="vaccination-programmes"></a>Vaccination programmes (`vaccination-programmes`, rank 19)

**OnCo:** 3 (Records whose subject is a vaccination programme or the preventive vaccines as such: technology hpv-vaccine ('HPV & HBV vaccination'), coll…) · **Denominator:** [WHO immunization data portal (WIISE): Introduction of HPV (Human Papillomavirus) vaccine, by countr…](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus)-vaccine) (194), read · **Denominator:** [WHO immunization data portal (WIISE): Vaccination schedule for HPV](https://immunizationdata.who.int/global/wiise-detail-page/vaccination-schedule-for-human-papilloma-virus) (175), read · 1 more denominators in the JSON · **Coverage:** 10/162 (6.2%). A national HPV programme counts as covered if OnCo describes it: proximity search (the country's name within 250 characters of HPV-vaccination wording or a vaccine brand) over src/data, every hit rea… · **Not enumerated:** Programme coverage rates (WUENIC HPV first-dose and last-dose coverage by country) were not fetched; the WHO page 'human-papillomavirus-(hp…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| National HPV vaccination programme: Brazil | ISO3 BRA; WHO WIISE first introduction year 2013; WHO routi… | MISSING | [immunizationdata.who.int](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus) | high |
| National HPV vaccination programme: Nigeria | ISO3 NGA; WHO WIISE first introduction year 2023; WHO routi… | MISSING | [immunizationdata.who.int](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus) | high |
| National HPV vaccination programme: Indonesia | ISO3 IDN; WHO WIISE first introduction year 2016; WHO routi… | MISSING | [immunizationdata.who.int](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus) | high |
| National HPV vaccination programme: France | ISO3 FRA; WHO WIISE first introduction year 2006; WHO routi… | MISSING | [immunizationdata.who.int](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus) | high |
| National HPV vaccination programme: China | ISO3 CHN; WHO WIISE first introduction year 2025 | MENTION | [immunizationdata.who.int](https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus) | high |

13 more in `gap-census-2026-11.json` (type `vaccination-programmes`).

#### <a id="chemoprevention-risk-reducing"></a>Chemoprevention and risk-reducing surgery (`chemoprevention-risk-reducing`, rank 93)

**OnCo:** 9 (Records whose subject is a preventive medicine use or a risk-reducing operation, found by name search and by reading the prevention-section…) · **Denominator:** [USPSTF: Breast Cancer: Medication Use to Reduce Risk (grade B for women at increased risk aged 35 o…](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-medications-for-risk-reduction) (3), read · **Denominator:** [NICE CG164 Familial breast cancer, section 1.7 Risk reduction and treatment strategies](https://www.nice.org.uk/guidance/cg164/chapter/Recommendations) (7), read · 6 more denominators in the JSON · **Coverage:** 7/14 (50.0%). Union of items named by the fetched guidelines: tamoxifen, raloxifene, anastrozole, exemestane, aspirin in Lynch syndrome, 5-ARIs, nicotinamide, oral contraceptive counselling for BRCA1 carriers, ris… · **Not enumerated:** NCCN Genetic/Familial High-Risk Assessment guidelines (breast, ovarian, pancreatic, prostate; colorectal, endometrial, gastric): login requ…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Exemestane for breast cancer risk reduction (postmenopausal women at increased… | DOI 10.1200/jco.19.01472; PMID 31479306 | MISSING | [doi.org](https://doi.org/10.1200/jco.19.01472) | medium |
| Oral contraceptive pill and ovarian cancer risk in BRCA1 carriers | NICE CG164 recommendations 1.7.4 to 1.7.8 | MISSING | [nice.org.uk](https://www.nice.org.uk/guidance/cg164/chapter/Recommendations) | medium |
| 5-alpha-reductase inhibitors (finasteride, dutasteride) for prostate cancer che… | DOI 10.1200/jco.2008.16.9599; PMID 19252137; PMCID PMC26685… | MENTION | [doi.org](https://doi.org/10.1200/jco.2008.16.9599) | medium |

4 more in `gap-census-2026-11.json` (type `chemoprevention-risk-reducing`).

#### <a id="genetic-counselling-services"></a>Genetic counselling services (`genetic-counselling-services`, rank 26)

**OnCo:** 3 (Records whose subject is a genetics service or testing programme (name search 'genetic counsel\|genomic medicine\|genetics service\|cascade…) · **Denominator:** [NHS England Genomic Medicine Service structure: seven Genomic Laboratory Hubs and seven Genomic Med…](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) (7), read · **Denominator:** [NSGC Find a Genetic Counselor directory](https://findageneticcounselor.nsgc.org/) (3300), partly read · 1 more denominators in the JSON · **Coverage:** 1/8 (12.5%). England's Genomic Medicine Service as 1 service plus 7 regional GLH/GMSA pairs: only the service itself has a record (collection nhs-genomic-medicine-service); no region has one (North Thames is name… · **Not enumerated:** NHS clinical genetics centres in Scotland, Wales and Northern Ireland and the regional clinical genetics departments within each GMSA: NHS…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| NSGC Find a Genetic Counselor directory (US and Canada) | URL https://findageneticcounselor.nsgc.org/ | MISSING | [findageneticcounselor.nsgc.org](https://findageneticcounselor.nsgc.org/) | high |
| South East Genomic Laboratory Hub and Genomic Medicine Service Alliance | Lead trust Guy’s and St Thomas’ NHS Foundation Trust | MISSING | [genomicseducation.hee.nhs.uk](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) | medium |
| North West Genomic Laboratory Hub and Genomic Medicine Service Alliance | Lead trust Manchester University NHS Foundation Trust | MISSING | [genomicseducation.hee.nhs.uk](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) | medium |
| East Genomic Laboratory Hub and Genomic Medicine Service Alliance | Lead trust Cambridge University Hospitals NHS Foundation Tr… | MISSING | [genomicseducation.hee.nhs.uk](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) | medium |
| Central and South Genomic Laboratory Hub and Genomic Medicine Service Alliance | Lead trust Birmingham Women’s and Children’s NHS Foundation… | MISSING | [genomicseducation.hee.nhs.uk](https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/genomic-laboratory-hubs/) | medium |

4 more in `gap-census-2026-11.json` (type `genetic-counselling-services`).

#### <a id="prevention-programmes"></a>Prevention programmes (smoking, sun, alcohol) (`prevention-programmes`, rank 94)

**OnCo:** 6 (Non-idea records whose subject is a population prevention programme or policy (name search plus reading the prevention section): technology…) · **Denominator:** [European Code Against Cancer, 5th edition: 14 policy recommendations for policy-makers](https://cancer-code-europe.iarc.who.int/) (14), read · **Denominator:** [Named programmes from the census brief, each checked against an official page](https://smokefree.gov/tools-tips/get-extra-help/speak-to-an-expert) (9), partly read · **Coverage:** 7/14 (50.0%). ECAC5 policy areas with at least one OnCo record about the policy: tobacco (US tobacco-law terms, smoke-free-generation idea), alcohol (alcohol-reduction-labelling), sun (sunbed-ban idea), radon (rad… · **Not enumerated:** WHO MPOWER country-level implementation (WHO Report on the Global Tobacco Epidemic) was not fetched; it would give smoke-free, tax, warning…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| Smoke-free legislation (indoor workplaces, public places and transport; outdoor… | ECAC5 policy recommendation 2 (Second-hand smoke) | MISSING | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/) | high |
| Egypt's national hepatitis C elimination programme ('100 million seha' campaign) | WHO gold tier status on the path to elimination of hepatiti… | MISSING | [who.int](https://www.who.int/news/item/09-10-2023-who-commends-egypt-for-its-progress-on-the-path-to-eliminate-hepatitis-c) | high |
| Telephone quitlines (US national portal 1-800-QUIT-NOW) | Phone 1-800-QUIT-NOW (1-800-784-8669) | MENTION | [smokefree.gov](https://smokefree.gov/tools-tips/get-extra-help/speak-to-an-expert) | high |

12 more in `gap-census-2026-11.json` (type `prevention-programmes`).

#### <a id="screening-recommendations"></a>Screening recommendations (`screening-recommendations`, rank 81)

**OnCo:** 29 (Places where OnCo states a body's screening recommendation, found by proximity search (body name within 300-400 characters of the topic) an…) · **Denominator:** [USPSTF recommendation topics, category Cancer (published)](https://www.uspreventiveservicestaskforce.org/uspstf/topic_search_results?topic_status=P&category%5B%5D=15) (18), read · **Denominator:** [EU Council Recommendation on cancer screening (2022), as restated in ECAC5 policy recommendation 14](https://cancer-code-europe.iarc.who.int/) (6), partly read · 2 more denominators in the JSON · **Coverage:** 18/34 (52.9%). USPSTF screening topics 12 of 12 stated (5 of them only as cited sources); EU Council recommendation parameters 1 of 6 (prostate only); UK NSC cancer decisions 5 of 10 (all 'recommended' decisions; n… · **Not enumerated:** Japan and Korea national recommendations were not independently fetched (OnCo already cites MHLW and the National Cancer Information Center…

| Item | Identifier | Status | Source | Impact |
|---|---|---|---|---|
| EU-level screening parameters for bowel (FIT 50-74), breast (mammography 50-69,… | ECAC5 policy recommendation 14 (Organized cancer screening… | MISSING | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/) | high |
| USPSTF: BRCA-Related Cancer: Risk Assessment, Genetic Counseling, and Genetic T… | USPSTF year 2019; Grade B, D | MISSING | [uspreventiveservicestaskforce.org](https://www.uspreventiveservicestaskforce.org/uspstf/topic_search_results?topic_status=P&category%5B%5D=15) | high |
| EU Council Recommendation on strengthening prevention through early detection (… | Replaces Council Recommendation 2003/878/EC | MENTION | [cancer-code-europe.iarc.who.int](https://cancer-code-europe.iarc.who.int/) | high |

10 more in `gap-census-2026-11.json` (type `screening-recommendations`).

## Method

**Taxonomy first.** The object types were written down as a tree before any searching, from what a patient, carer, clinician, researcher, funder or builder could look for, and extended by the agents where they found a branch the tree lacked (protein and multianalyte algorithm tests). 174 types in 12 families.

**Denominators.** For each type the agents looked for authoritative outside lists, machine-readable first: regulator registers (openFDA device and drug endpoints, Drugs@FDA data files, the Purple and Orange Books, EMA's medicines report, PMDA's approval lists, WHO prequalification), classification and nomenclature (WHO ATC, OncoTree, NCI Thesaurus via EVS, MeSH, Orphanet, CTCAE, COSMIC signatures, IARC Monographs), payer and assessment bodies (CMS coverage API, NICE, SMC, G-BA, CDA-AMC), registries (ClinicalTrials.gov API, NIH GTR, New York State LDT register, CI5, BBMRI-ERIC, TCIA, GDC, cBioPortal), society and directory lists (ICRP, INAHTA, ICH, WMDA, IPOS, ECL, European Cancer Organisation, UKCRC, Newsweek's 2026 oncology ranking), GitHub, Bioconductor, CRAN, PyPI and Hugging Face. Sources were read as raw text; no summarising fetch tool was used for any recorded fact. Some denominators were built by the agent from several official pages (for example laws, statistics sources, government agencies, accreditation programmes, clinical software, knowledge bases and ontologies); those types say so.

**Identity diff.** Every candidate was looked up in all of src/data (including side tables that never become pages) and in the 21,337-record entity index. RECORD: an entity's name, alias, brand, code, symbol or id equals the item. IN-RECORD-NAME: an entity's name or alias contains it, such as a family record "Irreversible electroporation (NanoKnife)". MENTION: named somewhere in src/data text, with no record about it. MISSING: named nowhere. RECORD and IN-RECORD-NAME count as covered; MISSING and MENTION are gaps. MENTION also catches items that appear only in OnCo's fetched universe lists or identifier caches, which no reader sees, so it slightly overstates presence. Short aliases collide with unrelated words; agents read the snippets and dropped false hits.

**Ranking.** Severity is 5 times the uncovered share; for machine types it uses 60% family-level and 40% product-level coverage. Reader impact runs from 5 (patients and carers meet it routinely) to 1 (niche research object), set by the agents and normalised by the coordinator. Four types without a usable figure had severity set by hand from the agent's estimate: radiotherapy delivery platforms, other regulators, navigation services and RNA tests (the last left unranked, being in another branch's scope). Score is severity times impact.

**Verification.** Each agent re-checked a random 20 of its own gaps against the corpus before writing (about 500 checks; four errors were found and corrected). The coordinator then re-checked a fresh random 30 against both the corpus and the sources (below).

## Precision check

Thirty gaps were drawn at random from the 3,313 (seed 20261104) and checked by the coordinator in two ways.

**Corpus.** Each was re-run through the lookup with its aliases, then searched again by hand under other names (brands, abbreviations, spellings). All 30 are real gaps. The automatic re-run alone flagged three, all explained: Ivenix matched the three-letter alias IIS inside "IIS La Fe", a hospital research institute; tivozanib has a drug record, and the gap is its absence from the interactions table, which names it nowhere; pimitespib, approved in Japan, is named only in a trial title (NCT07689201) and has no drug record, a real gap that the census's generous coverage rule would nonetheless count as covered.

**Sources.** Each source was fetched again. 24 showed the item in the raw text; the other 6 were confirmed through their APIs or embedded data: FDA 510(k) K183311 (Ivenix) and K200595 (CellaVision), CIViC assertion AID136 (MNX1::ETV6), the IARC classification table (1,2-dichloropropane, Group 1; malaria from Plasmodium falciparum, Group 2A) and the Newsweek 2026 oncology ranking data (Kantonsspital St.Gallen, rank 230).

**Precision: 30 of 30 (100%)** on the corpus check and 30 of 30 on the source check; the automatic re-grep alone scores 27 of 30 (90%). Precision says nothing about recall: every denominator listed above as blocked or not attempted is a place where more gaps exist than this census names.

| # | Type | Item | Claimed | Re-check | Verdict |
|---|---|---|---|---|---|
| 1 | ontologies-standards | SNOMED CT | MENTION | MENTION | real gap |
| 2 | genetic-counselling-services | North East and Yorkshire Genomic Laboratory Hub and Genomic Medicine… | MISSING | MISSING | real gap |
| 3 | pathology-scanners-ai | Digital blood-film and bone-marrow aspirate morphology analysers | MISSING | MISSING | real gap |
| 4 | preventive-vaccines | Heberbiovac HB (hepatitis B vaccine, CIGB Cuba) | MISSING | MISSING | real gap |
| 5 | repurposed-drugs | Dapagliflozin | MISSING | MISSING | real gap |
| 6 | payers-reimbursement | Medicare NCD 230.9: Cryosurgery of Prostate | MISSING | MISSING | real gap |
| 7 | screening-programmes | Taiwan: national oral cancer screening programme (oral mucosal screen… | MISSING | MISSING | real gap |
| 8 | biomarkers-actionable | MNX1::ETV6 fusion | MENTION | MENTION | real gap |
| 9 | prosthetics-orthotics | Blom-Singer voice prostheses (InHealth Technologies / Helix Medical) | MISSING | MISSING | real gap |
| 10 | pmda-japan | Pimitespib (Jeselhy) | MENTION | IN-RECORD-NAME | real gap: no drug record; named only in a trial title |
| 11 | genes-targets | BCL2L2 | MISSING | MISSING | real gap |
| 12 | rt-techniques | Hemibody irradiation | MISSING | MISSING | real gap |
| 13 | education-resources | NCCN Guidelines for Patients: Prostate Cancer: Early Stage | MISSING | MISSING | real gap |
| 14 | screening-programmes | Turkey: national colorectal cancer screening programme (CanScreen5 fa… | MISSING | MISSING | real gap |
| 15 | occupational-exposures | 1,2-Dichloropropane | MISSING | MISSING | real gap |
| 16 | performance-geriatric | Charlson Comorbidity Index | MENTION | MENTION | real gap |
| 17 | anatomy-node-maps | Colon segments and flexures (caecum to sigmoid; right versus left col… | MENTION | MENTION | real gap |
| 18 | hospices-support-centres | Marie Curie Hospice, Belfast | MISSING | MISSING | real gap |
| 19 | drug-interactions | Tivozanib interaction profile | MISSING | RECORD | real gap: drug record exists, interactions table lacks it |
| 20 | oncogenic-infections | Malaria (caused by infection with Plasmodium falciparum in holoendemi… | MENTION | MENTION | real gap |
| 21 | cancer-centres-hospitals | Kantonsspital St.Gallen / Comprehensive Cancer Centre | MISSING | MISSING | real gap |
| 22 | proms-qol-instruments | Brief Pain Inventory (BPI) | MENTION | MENTION | real gap |
| 23 | cooperative-groups-networks | Leeds Clinical Trials Research Unit (CTRU) | MENTION | MENTION | real gap |
| 24 | decision-aids | Lung Cancer Screening: Is it right for me? (MD Anderson, Robert Volk) | MISSING | MISSING | real gap |
| 25 | patient-advocacy | World Pancreatic Cancer Coalition | MISSING | MISSING | real gap |
| 26 | clinical-software | N-Power Medicine | MISSING | MISSING | real gap |
| 27 | infusion-pumps | Ivenix Infusion System | MISSING | IN-RECORD-NAME | real gap: re-check hit was the alias IIS in an unrelated name |
| 28 | guidelines | NCCN Guidelines: Prostate Cancer Early Detection | MISSING | MISSING | real gap |
| 29 | haematopathology-tests | Caris ChromoSeq (whole-genome sequencing for myeloid malignancies) | MISSING | MISSING | real gap |
| 30 | margin-intraop-devices | Non-wire breast localisation: SAVI SCOUT radar reflector | MISSING | MISSING | real gap |

