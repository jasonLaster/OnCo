# Links that imply the wrong thing: what we found, what was fixed, and how to stop it recurring

3 November 2026. The owner's request: "look across the site for mistakes like putting that drug in the ctdna page — it
implies the wrong thing — and find strategies to avoid this."

`npm run validate` already refuses a link to nothing. Nothing refused a link to the wrong thing. The ctDNA MRD readout
lists atezolizumab in the same `drugs` field as the five blood tests that measure the readout, so a reader sees a cancer
medicine filed as one of the tests. That is one member of a family whose earlier members were all real (Signatera
called a drug; selicrelumab credited to Flatiron Health; `imid` matching inside "pyrimidine"; LYSA linked to the ovarian
PRIMA trial; MILAN-I credited to an institute founded after it ended). This round built a detector for each member of
the family, measured how often each is right, fixed the clear errors, and put the measurable rules under guard.

- Detector: `scripts/link-sense-audit.ts` (read-only). Report: `docs/proposals/link-sense-audit.md` and `.json`.
- Guards: `scripts/link-sense-audit.test.ts` (fixtures and ratchet), `src/data/link-sense-floor.json` (the floor),
  `scripts/validate.ts` (three rules held at zero).

## Measured precision, per class

"Checked" is findings read by hand against the records and, where a fact was involved, a primary source (openFDA or
DailyMed label, ClinicalTrials.gov API record, Crossref, Europe PMC). Precision is the share that is a real error or a
real misleading link. Each class was tightened until its "high" tier was reliable or, where it could not be, capped at
medium; the numbers before and after are both given so the next person can see what the heuristics cost.

| Class / rule | Findings now (high / medium / low) | Checked | Precision of what was checked | What tightened it |
|---|---|---:|---|---|
| role/field-kind-namesake | 0 / 0 / 11 (was 31 high, all repointed) | 42 | 31/31 after tightening; 31/42 matching names only; 31/98 matching aliases too | Match on names, not aliases (a term's alias "radiosensitisers" equalled a technology's name); high only where a glossary stub or a pathway stands in for the cancer, target or technology of the same name |
| role/role-mixed | 41 / 21 / 0 | 5 | 5/5 (structural: true of every record flagged) | none needed; this is the ctDNA class and its fix is a product change (below) |
| role/developer-type | 3 / 0 / 2 | 5 | 3/3 high are investor or trials group credited as maker; 0/2 low (Thermo Fisher, WuXi typed as CRO) | contract-research type moved to low |
| role/product-class | 0 | 1 | 0/1 (zirconium-89 girentuximab is rightly an imaging agent) | imaging agents excluded from the name-stem rule |
| drug-cancer | 1 / 21 / 142 | 19 | high 4/5 (the four myeloma links); medium 1/14 | high only when the cancer names the product, the product names its own cancers and this one is not among them, and no trial, paper, approval, guideline row or text joins them |
| trial-drug | 0 / 30 / 2 (+ ClinicalTrials.gov) | 46 | 0/39 text-only before regimen expansion; 1/7 even with the registry entry silent | regimen acronyms (R-CHOP, ABVD, FOLFOX, PCV ...) expanded; capped at medium |
| trial-cancer | 0 / 25 / 1 (+ ClinicalTrials.gov) | 22 | about 2/22 | registry conditions and participation data read; capped at medium |
| company/unjoined-company | 1 / 0 / 74 | 80 | 3/77 before; 2/3 after (Serum Institute and Gardasil 9, Freenome and Shield) | high only when the company alone claims a product whose own record names other makers |
| company/namesake-company | 0 now (4 before, 2 errors seen from both sides) | 4 | 4/4 | parent and subsidiary pairs (Biocon, Biocon Biologics) and place-name first words (Shanghai) excluded |
| time/institution-after-trial | 0 | 8 | 0/8 before ("opened in 2018" was The Christie's proton centre, not The Christie) | founding year read only from "founded/established" in the record's first sentence |
| time/paper-before-trial | 0 / 4 / 49 | 37 | 0/37 as impossibilities (design papers, earlier namesakes, background) | capped at medium |
| target/drug-target | 5 / 29 / 0 | 27 | high 9/10 misleading, 5/10 strictly wrong binding | the drug's own modality names another target; multi-kinase drugs and family siblings excluded unless an isoform is named (PI3K delta against PI3K alpha) |
| target/trial-target | 0 / 7 / 5 | 7 | 1/7 wrong (CAVE and PD-1), 5/7 a selection biomarker filed as a target | medium at most |
| fragment | 0 / 69 / 233 | 20 sites | every site fires mid-word by construction; 4 of 20 change a label a reader sees | inputs are the corpus's own names, modalities, events and sponsors; a match counts only where the word-bounded twin of the pattern does not match |
| sponsor/alias-collision | 0 / 15 / 23 (was 73) | 73 | about 38/73 real before the fixes | division, site and acquisition cases moved to low |
| name/namesake | 0 (was 80, all fixed) | 80 | 80/80 after limiting context kinds; 80/104 before (KEYMAKER-U01 substudies are not namesakes) | context only from records whose cancers identify what they link (institution or company to trial, cancer to trial or drug, trial to drug, paper to trial) |
| name/generic-alias | 0 (was 1) | 3 | 1/3 ("Inc." on BeOne); the journal called Oncology rightly carries its own name | an alias equal to the record's own name is allowed |

In all, about 480 findings were read by hand; the high tier now holds 51 findings, of which the 41 role-mixed biomarker rows are
structural (they need the product change below) and 10 are listed for review.

## Fixes made (data only; each against the source named)

| What was wrong | Fix | Source |
|---|---|---|
| Multiple myeloma listed sipuleucel-T (a prostate vaccine), fluciclovine F-18 (a prostate PET tracer), 5-ALA for glioma surgery and pegulicianine (a breast lumpectomy dye) among its drugs. An orphan-linking round on 10 September meant to place them on prostate, glioblastoma and breast pages and put all four on myeloma | removed from `multiple-myeloma.drugs` (src/data/cancers.ts); each keeps its own cancer links | each product's own record and label; commit 91a4bba51 |
| 76 colorectal registry trials linked `bevacizumab-glioma`, the glioblastoma-indication record, and read "a phase 3 trial of bevacizumab (glioblastoma use) ... in colorectal cancer" | repointed to `bevacizumab` and the words corrected (src/data/spikes/colorectal-registry-trials.ts); header notes why | the ClinicalTrials.gov interventions name "Bevacizumab" in colorectal cancer |
| Duvelisib, idelalisib and umbralisib linked to PIK3CA (PI3K-alpha) | now `pik3cd` (PI3K delta), already listing them | Copiktra label (openFDA): "predominantly against PI3K-δ and PI3K-γ"; Zydelig label (DailyMed set efbdafa9): "an inhibitor of ... PI3Kδ"; umbralisib "a dual PI3Kδ/CK1ϵ inhibitor" (doi:10.3389/fonc.2026.1916572, Europe PMC) |
| Everolimus linked to PIK3CA and AKT | now `mtor` | everolimus label (openFDA): "an inhibitor of mammalian target of rapamycin (mTOR)" |
| Plitidepsin linked to EEF2 (elongation factor 2) | link removed; no eEF1A2 target record exists | Losada et al., Sci Rep 2016, "Translation Elongation Factor eEF1A2 is a Novel Anticancer Target for the Marine Natural Product Plitidepsin", doi:10.1038/srep35100 (resolved on Crossref) |
| Iparomlimab and tuvonralimab (QL1706) linked to PD-L1 | now `pd1` and `ctla4` | the record's own modality; "a fixed-ratio anti-PD-1/anti-CTLA-4 MabPair" (doi:10.3389/fonc.2026.1914733, Europe PMC) |
| Capmatinib and tepotinib credited to Merck & Co. (MSD) | now Merck KGaA, which already listed it | Tepmetko label (openFDA): manufacturer EMD Serono |
| Cetuximab credited to Merck & Co. (MSD) | now Merck KGaA beside Eli Lilly | Erbitux label (openFDA): ImClone LLC, Lilly; Merck KGaA's own record names cetuximab outside the US |
| Serum Institute of India credited with Gardasil 9 | removed; its product is CERVAVAC | DailyMed: GARDASIL 9 labeller Merck Sharp & Dohme |
| Freenome credited with Shield | removed; Shield is Guardant Health's, Freenome's test is SimpleScreen CRC (its own record) | the Shield and Freenome records |
| Celcuity credited with serabelisib (both sides) | removed; serabelisib is Faeth Therapeutics' (its own record) | ClinicalTrials.gov NCT07558733 and NCT06463028: lead sponsor Faeth Therapeutics |
| BeOne carried the aliases "GW Pharmaceuticals", "GW Pharmaceuticals Ltd" and "Inc." | removed (GW belongs to Jazz, as the sponsor table already says; "Inc." matches everything) | commit c2258e5da's own message ("GW under Jazz") |
| Trial NCT04115306 (Phoenix Molecular Designs' PMD-026) linked to Molecular Partners | link removed both sides; it came from the `/molecular/` sponsor pattern | ClinicalTrials.gov sponsor string on the record |
| 31 typed fields held a glossary stub or a pathway where a record of the right kind has the same name: 13 "brain metastases" terms in cancer fields, 2 "DCIS", 1 "LGSOC", 3 "LGR5" terms in target fields (including petosemtamab, an EGFR x LGR5 antibody), 6 "MYC" pathway ids in target fields, 4 "stereotactic radiosurgery" and 2 "ctDNA" terms in technology fields | repointed to `secondary-brain-tumours`, `ductal-carcinoma-in-situ`, `low-grade-serous-ovarian-cancer`, `lgr5-gene`, `myc-gene`, `radiosurgery-srs`, `liquid-biopsy` | names of the records themselves |
| `src/data/sponsor-aliases.ts`: fragments that matched inside other names. `/molecular/` sent nine organisations to Molecular Partners; `/charit/` sent three charities to Charité; `/bristol/` sent the University of Bristol and Bristol Haematology to BMS; `fusion pharma` matched "Diffusion Pharmaceuticals"; `immunogen` matched "immunoGENomics"; `agios` matched the Agios Savvas hospital; `national cancer institute$` matched Osaka *Inter*national and the French, Italian and Egyptian national institutes; `institute of cancer research` matched Jiangsu and Dhaka; `\bamc\b` matched Amsterdam UMC; `\bbig\b` matched Big Picture Bio; `heidelberg` matched Heidelberg Pharma; `sumitomo` matched Sumitomo Heavy Industries; Jefferson's Sidney Kimmel centre went to Johns Hopkins; TUM to LMU; Vall d'Hebron to Hospital Clínic; every Montréal hospital to CHUM; every Sun Yat-sen, Fudan and Peking University hospital to the one cancer centre; two Frankfurt hospitals to the University Cancer Center | 28 patterns word-bounded or anchored; old and new resolutions compared over 6,994 sponsor names from the corpus and the ClinicalTrials.gov universe list: 75 changed, all checked, three gains (Hospital Clínic, IDIBAPS, Beijing Cancer Hospital) | ClinicalTrials.gov sponsor names in `src/data/universe-lists/ctgov-oncology.json` |

## Guards added (tests and data only)

1. **Ratchet per class** (`scripts/link-sense-audit.test.ts`, floor `src/data/link-sense-floor.json`): every class/rule
   count, all confidences, computed without registry evidence so it is the same on every machine, may not grow. A rule
   absent from the floor is held at zero, so `name/namesake`, `name/generic-alias`, `company/namesake-company`,
   `role/product-class` and `time/institution-after-trial` are already zero-tolerance. Lower the floor with
   `npx tsx scripts/link-sense-audit.ts --write-floor`, which never raises a value.
2. **Fixtures for each past error**: `imid` in fluoropyrimidine; LYSA and the two PRIMA trials; sipuleucel-T on the
   myeloma page; MILAN-I and an institute founded after it; a medicine among a readout's tests and a fund credited as a
   maker; a company claiming another's test; idelalisib on the wrong PI3K isoform. A detector that stops catching its
   own example fails.
3. **Sponsor alias table**: 24 names that must not resolve to the record a fragment used to send them to, and 24 that
   must still resolve, so a pattern cannot be loosened back into a fragment or tightened out of its job.
4. **`npm run validate`** now refuses two rules outright, both at zero today and both 100% real when they fired: a typed
   field holding a glossary stub where a record of the right kind has the same name, and a link to the namesake outside
   the linking record's cancers.

## Proposals that need the owner (product changes, not made)

Each would change what a page shows or calls something, so each goes through `scripts/propose-product-change.sh`.

1. **Typed roles instead of one `drugs` field on readouts, targets, terms and technologies.** 62 records (41 biomarker
   readouts, 21 targets, terms and technologies) put the tests that measure a thing and the medicines a result selects
   in one `drugs` array; only the product class tells them apart, and the class says what a product *is*, not what it
   is *for here*. Proposal: `measuredBy` (tests, assays) and `selects` (medicines whose label names the readout) on
   biomarkers, with `drugs` kept for anything else; headings "Tests that measure it" and "Treatments a positive result
   can lead to". The data can be split mechanically by product class (the 62 records are listed in the audit JSON as
   `role/role-mixed`); the thresholds table already carries `drugId` for the second role. The other agent's rendering
   change separates them on screen; the typed fields make the meaning survive in the API, JSON-LD and any new page.
2. **A role on a product's companies**: originator, marketer, licensee, generic maker, investor. 75 product–company links
   are joined by nothing in either record (no text, no trial, no acquisition); 72 of the 77 checked were right, but the
   page cannot say *why* Iovance appears on aldesleukin (it bought Proleukin in 2023) or Hikma on ondansetron (a generic
   maker). The three wrong ones found by hand were all a company claiming a product it never made. Proposed shape:
   `companies: [{ id, role, source }]`, or a parallel `companyRoles` map, with investors barred from `drugs` by the
   schema (3 findings today: Omega Funds on taletrectinib and T-VEC, ECOG-ACRIN on CAPTEM).
3. **Word-bound the classifier patterns in `src/lib`** (each verified by running the function over the corpus):
   - `src/lib/checkpoints.ts` `classifyDrug`: `/agonist/` matches inside "antagonist", so 37 antagonists (enzalutamide,
     tamoxifen, ondansetron, brigimadlin, xevinapant, degarelix, relugolix ...) classify as **agonists** wherever the
     checkpoint pages fall back to this rule; `/fusion/` matches "infusion" and "perfusion" (emactuzumab, floxuridine,
     hepzato, tasonermin). Fix: `\bagonist`, `\bfusion\b`.
   - `src/lib/modality-group.ts`: `imid` (the AGENTS.md fragment, still present) makes fenbendazole, mebendazole
     (benzimidazoles), nimorazole (a nitroimidazole) and uridine triacetate ("pyrimidine analogue") **Degraders**;
     `fusion` makes floxuridine ("hepatic arterial infusion") and Hepzato ("perfusion") **Protein or peptide**. Fix:
     `\bimids?\b`, `\bfusion\b`.
   - `src/lib/side-effects.ts` `modalityClass`: `/car-t|til|tcr-t/` makes hexaminolevulinate ("ins**til**led") and the
     TOBY urine test ("vola**til**e") **Cell therapy** on the side-effect and toxicity grouping. Fix: `\btil\b`.
   - The full list of patterns that fire only mid-word is in the audit report under `fragment` (69 in files that attach
     content). A test in `src/lib` that runs each classifier over the corpus and fails on a mid-word-only decision would
     close the class; it is drafted as `midWordInputs` in the audit script and can be pointed at any rule list.
4. **Indirect targets need a different relation.** Degarelix, leuprolide and triptorelin are linked to the androgen
   receptor, goserelin and the progestins to the oestrogen receptor, omacetaxine to BCR::ABL1: none binds it, each
   lowers its ligand or acts downstream. The target page says "the molecules drugs aim at". Either a `acts via` field or
   a convention (link the receptor the drug binds; name the downstream axis in text). 9 findings today.
5. **A trial's targets should be what its interventions hit.** Seven trials list a selection biomarker as a target
   (cyclin D1 on four mantle cell lymphoma trials, NRAS on CHRONOS); CAVE lists PD-1 though avelumab is anti-PD-L1. A
   `selectedBy` field for biomarkers would keep the information without saying the trial aims at it.

## Review list (judgement needed; not changed)

The top of the queue, in order of how much a reader is misled. The audit JSON holds every medium and low finding.

1. Omega Funds lists taletrectinib and talimogene laherparepvec as products (from its impact page); both pages show an investor among their makers.
2. CAPTEM (capecitabine plus temozolomide) credited to ECOG-ACRIN, a trials group, as if it were the developer.
3. 41 biomarker readouts and 21 targets, terms and technologies mix tests and medicines in `drugs` (proposal 1); `ctdna-mrd-positive` is owned by another agent.
4. Degarelix, leuprolide, triptorelin and mevrometostat linked to the androgen receptor (mevrometostat is an EZH2 inhibitor given with enzalutamide).
5. Goserelin and the progestins linked to the oestrogen receptor; exemestane too (an aromatase inhibitor).
6. Omacetaxine linked to BCR::ABL1 (a protein-synthesis inhibitor).
7. CAVE linked to PD-1; its antibody, avelumab, is anti-PD-L1.
8. NCT02960022 (an enzalutamide extension study in prostate cancer) links "Goserelin / leuprolide (ovarian function suppression)", the breast-cancer record.
9. FDA018-ADC and its phase 3 trial NCT06519370 credit Fudan University Shanghai Cancer Center; the registry sponsor is Shanghai Fudan-Zhangjiang Bio-Pharmaceutical, a company.
10. Pancreatoblastoma lists vincristine, which no regimen in its own text uses (PLADO is cisplatin and doxorubicin).
11. Envafolimab linked to cancer of unknown primary.
12. Ateganosine (THIO) linked to TERT; its mechanism text names PD-1 (the combination partner), not telomerase.
13. ECOG-ACRIN E1910 (blinatumomab, adults 30 to 70) linked to adolescent and young adult cancers.
14. KEN SHE (single-dose HPV vaccine, cervical prevention) linked to head and neck squamous cell carcinoma.
15. NHS-Galleri linked one by one to myeloma, gastric, oesophageal, anal and ovarian cancer.
16. SABR-COMET linked to HR-positive breast, NSCLC and colorectal cancer individually.
17. Cyclin D1 as a target on SHINE, ENRICH, LyMa and NCT02972840 (mantle cell lymphoma trials of BTK and CD20 drugs).
18. CHRONOS linked to NRAS (a selection criterion, not a target).
19. Sponsor patterns: Coherus BioSciences resolves to Junshi.
20. Sponsor patterns: the NCT network sites in Würzburg, Tübingen, Essen and Dresden resolve to Heidelberg.
21. Sponsor patterns: CRUK centres (Oxford, Southampton, Birmingham, Bowelbabe Fund) resolve to the charity CRUK.
22. Sponsor patterns: the Uganda Cancer Institute (alias "UCI-Fred Hutch Cancer Centre") resolves to Fred Hutch.
23. Sponsor patterns: Seoul National University Bundang Hospital resolves to Seoul National University Hospital.
24. Sponsor patterns: Great Ormond Street resolves to UCLH.
25. Sponsor patterns: National Cancer Center Hospital East resolves to National Cancer Center Japan.
26. Hikma credited with ondansetron and dexamethasone (a generic maker; right, but the page cannot say so: proposal 2).
27. Catumaxomab linked to gastric, pancreatic and colorectal cancer; its approval was for malignant ascites.
28. Cladribine linked to Waldenström macroglobulinaemia without a trial or guideline row in the corpus.
29. Talc (intrapleural) linked to HR-positive breast and ovarian cancer (malignant effusions), as a supportive medicine.
30. Romiplostim linked to AML.
31. Samarium-153 lexidronam linked to NSCLC (bone pain).
32. Pilocarpine linked to nasopharyngeal carcinoma (radiation dry mouth).
33. Palifermin linked to DLBCL and Hodgkin lymphoma (transplant mucositis).
34. Sodium thiosulfate linked to osteosarcoma (cisplatin ototoxicity).
35. The term `fgfr3` ("FGFR3 alterations (bladder cancer)") sits in the targets of the urethral cancer pages while the FGFR3 target is `fgfr3-receptor`; the names differ, so the rule leaves it at low.
36. The plitidepsin record has no target now that the wrong EEF2 link is gone; an eEF1A2 target record would need adding (a gap, not a correction). EEF2 itself is now linked from moxetumomab pasudotox, whose own mechanism text says its toxin ADP-ribosylates EF-2.
37. The pathway `tumor-microenvironment` in the terms of CD163 and CD11b, where the glossary has a different "TME" (total mesorectal excision): the acronym collides.
38. Paper-before-trial: the GBM AGILE design paper (2018) precedes the trial's 2019 start; the TARGET study paper (2019) is linked to TARGET National (2021), a different study.
39. 356 typed-field links hold another kind with no same-named record of the right kind (for example terms in `technologies`); harmless on screen, which groups by kind, but read by name in a few places.
40. Pathways listing targets that are neither drawn nodes nor hit by a linked drug (39), such as PSMA on androgen receptor signalling.
