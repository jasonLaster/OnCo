/**
 * Multi-cancer early detection (MCED): every body-fluid test for several cancers at once that OnCo could find sold,
 * in clinical validation or published, worldwide, with the companies, registered studies and papers behind them.
 * Census of 29 October 2026, asked for by the owner ("have we mapped all the MCED liquid biopsies on onco").
 *
 * Method. Tests were found from ClinicalTrials.gov (API v2, every study whose title or summary names multi-cancer,
 * pan-cancer, MCED or Galleri, read one by one), Europe PMC (title searches for multi-cancer and pan-cancer
 * detection, sorted by citations), the developers' own regulatory announcements and the NCI's Vanguard page. A test
 * earns a record only when a primary or company source shows it claims more than one cancer; single-cancer tests
 * (Shield for colorectal cancer, SimpleScreen, FirstLook Lung, HelioLiver, the EpiCheck tests) are context only.
 *
 * Rules kept here:
 * - Every paper was resolved through Europe PMC by DOI and its abstract read before a figure was used. Figures in a
 *   test's summary come from the linked paper; a developer's own figures are labelled as the developer's.
 * - Regulatory status is stated only from the regulator or the developer's own announcement. "Laboratory-developed
 *   test" means the developer says so.
 * - Trial records here take status, dates, sponsor and enrolment from the registry record read on 29 October 2026
 *   (cached under /tmp/mced); UNKNOWN and SUSPENDED registry states leave `status` empty, as
 *   src/lib/registry-status.ts does.
 * - Each test carries `evidence:<grade>` on the src/data/complementary.ts scale for the claim that matters to a
 *   reader: that taking the test reduces late-stage diagnosis or cancer deaths. The reason is the first note.
 *   The grades agree with the precision matrix row `mced-screening-precision`, which grades the class insufficient.
 *
 * Second pass, 3 November 2026 (owner: "make sure we max out coverage on the MCED"): China, Hong Kong, Taiwan and
 * India, ClinicalTrials.gov for the one Chinese study missed, and FDA Breakthrough and CE sweeps. PubMed was searched by
 * company affiliation (Haplox, AnchorDx, Berry Oncology, BGI, Genetron, Geneplus, Genecast, Singlera, Burning Rock,
 * Datar, PredOmix, Epigeneres and others) and by title for multi-cancer detection with Chinese, Hong Kong, Taiwanese
 * and Indian affiliations. Company figures were read from the company's own release. What could not be reached is
 * listed in the hub's notes (technologies.ts, `mced`): ChiCTR and the NMPA database refuse scripted access, and
 * EUDAMED was not searched.
 */
import type { PaperInput } from "@/lib/schema";

const asOf = "2026-10-29";
const DOI = (label: string, doi: string) => ({ label, url: `https://doi.org/${doi}` });
const PUBMED = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const p = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ kind: "paper", asOf, sections: ["early-detection"], ...x });
const pass2 = "2026-11-03";
const p2 = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ ...p(x), asOf: pass2 });

// =====================================================================================================
// PAPERS (each resolved on Europe PMC by DOI, abstract read 29 October 2026)
// =====================================================================================================
export const mcedPapers: PaperInput[] = [
  p({ id: "paper-nhs-galleri-primary-nejm-2026", name: "Effect of Screening with Multicancer Early-Detection Test on Late-Stage Cancer Diagnosis",
    tldr: "The main result of the NHS-Galleri trial: among 142,250 people in England, three yearly rounds of the Galleri blood test added to usual care did not reduce the number of cancers found at stage III or IV.",
    summary: "Sasieni and colleagues report the primary endpoint of NHS-Galleri, the randomised controlled trial in England in which people aged 50 to 77 gave blood at up to three annual visits and were randomised 1:1 to have it tested with GRAIL's methylation-based multi-cancer early detection test (intervention) or stored (control). The primary endpoint was stage III or IV cancer among 12 prespecified cancer types; a key secondary endpoint was stage IV cancer among the same 12.\n\n71,122 participants were randomised to the intervention group and 71,128 to control. The incidence rate of stage III or IV cancer did not differ significantly (incidence rate ratio 1.03; 95% CI 0.92 to 1.14; P = 0.63). The incidence rate ratio for stage IV cancer after three rounds was 0.86 (95% CI 0.74 to 1.00). Fewer than 1% of participants had trial-related adverse events and none were serious. The authors conclude that further follow-up is warranted to see how the stage III or IV and stage IV differences evolve.",
    journal: "New England Journal of Medicine", year: 2026, doi: "10.1056/NEJMoa2505723", pmid: "42776074", authors: "Sasieni P, Johnson P, Round T, et al.", paperType: "rct", participants: 142250, changedPractice: false,
    findings: ["71,122 randomised to blood testing and 71,128 to stored blood; three annual screening rounds plus at least 12 months of follow-up.", "Stage III or IV cancer among 12 prespecified types (primary endpoint): incidence rate ratio 1.03 (95% CI 0.92 to 1.14), P = 0.63.", "Stage IV cancer (key secondary endpoint): incidence rate ratio 0.86 (95% CI 0.74 to 1.00).", "Fewer than 1% had trial-related adverse events; none serious."],
    whatItMeans: "This is the first randomised answer to whether a multi-cancer blood test changes outcomes, and for its main question the answer was no: adding the test to NHS care for three years did not lower the number of cancers diagnosed at stage III or IV. The stage IV result is a secondary finding with a confidence interval that touches no effect, and deaths have not yet been reported, so the trial continues to follow participants.",
    caveats: ["Three screening rounds; the authors say further follow-up is needed to see how the stage differences evolve.", "Cancer deaths, the outcome that matters most, are not reported in this paper.", "One test (Galleri) in one health system; results do not transfer automatically to other multi-cancer tests.", "Funded by GRAIL."],
    links: [DOI("NEJM 2026: NHS-Galleri primary endpoint", "10.1056/NEJMoa2505723"), PUBMED("42776074"), ct("NCT05611632"), { label: "ISRCTN91431511", url: "https://www.isrctn.com/ISRCTN91431511" }],
    drugs: ["galleri"], trials: ["nhs-galleri"], companies: ["grail"], technologies: ["mced", "liquid-biopsy", "cfdna-methylation-testing"], terms: ["stage-shift", "screening"], people: ["peter-sasieni", "charles-swanton"], journals: ["nejm"],
    related: ["paper-nhs-galleri-performance-nat-med-2026", "paper-nhs-galleri-design-cancers-2022"], bottlenecks: ["b-early-detection", "b-overdiagnosis"] }),

  p({ id: "paper-pathfinder-2-nat-med-2026", name: "Performance and safety of a multi-cancer early detection test: the PATHFINDER 2 study",
    tldr: "In 35,878 US adults aged 50 and over, the Galleri blood test was positive in a little over one in two hundred tested people who turned out to have cancer, six in ten positives were cancer, and it found about four in ten of the cancers diagnosed within a year.",
    summary: "PATHFINDER 2 (NCT05155605) is GRAIL's prospective, interventional single-arm study of the Galleri test in people aged 50 or older without clinical suspicion of cancer, with co-primary endpoints of performance and safety after 12 months, analysed descriptively without hypothesis testing. Between December 2021 and July 2024, 35,878 participants were enrolled.\n\nAmong 32,007 performance-analysable participants the cancer detection rate was 0.54% (95% CI 0.47 to 0.63), positive predictive value 60.3% (54.5 to 65.8), negative predictive value 99.2% and specificity 99.64% (99.57 to 99.70). Episode sensitivity was 39.3% (34.9 to 44.0) for all cancers and 69.8% (62.8 to 76.0) for a prespecified 12-cancer subgroup; the number needed to screen to detect one cancer was 185, and cancer signal origin prediction accuracy was 91.3%. Among 35,335 safety-analysable participants, 213 (0.6%) had invasive procedures after a positive test, 90.5% of them non-surgical. The authors state that randomised trials and longer follow-up are needed to assess clinical utility.",
    journal: "Nature Medicine", year: 2026, doi: "10.1038/s41591-026-04618-w", pmid: "42773207", authors: "Nabavizadeh N, McDonnell C, Kurbegov D, et al.", paperType: "observational", participants: 35878, changedPractice: false,
    findings: ["Cancer detection rate 0.54%; positive predictive value 60.3%; specificity 99.64%.", "Episode sensitivity 39.3% for all cancers, 69.8% for the prespecified 12-cancer subgroup.", "Number needed to screen to find one cancer: 185; cancer signal origin correct in 91.3%.", "213 of 35,335 (0.6%) had invasive procedures after a positive result."],
    whatItMeans: "These are the numbers GRAIL's US application rests on. Six in ten positive results were cancer and the predicted organ was usually right, but six in ten cancers diagnosed in the year were not flagged, and the study had no control group, so it cannot say whether testing changes outcomes.",
    caveats: ["Single-arm and descriptive; no comparison group and no mortality or stage-shift endpoint.", "The abstract gives no stage I sensitivity.", "Sponsored by GRAIL."],
    links: [DOI("Nature Medicine 2026: PATHFINDER 2", "10.1038/s41591-026-04618-w"), PUBMED("42773207"), ct("NCT05155605")],
    drugs: ["galleri"], trials: ["pathfinder-2"], companies: ["grail"], technologies: ["mced", "liquid-biopsy", "cfdna-methylation-testing"], terms: ["ppv", "screening"], journals: ["nature-medicine"],
    related: ["paper-pathfinder-lancet-2023"], bottlenecks: ["b-early-detection"] }),

  p({ id: "paper-liu-ccga2-methylation-ann-oncol-2020", name: "Sensitive and specific multi-cancer detection and localization using methylation signatures in cell-free DNA",
    tldr: "The study that chose methylation as the basis of the Galleri test: in 6,689 people it found cancers of more than 50 types with few false positives, though only about one in five stage I cancers.",
    summary: "A prospective case-control substudy of the Circulating Cell-free Genome Atlas (NCT02889978) and STRIVE (NCT03085888): 6,689 participants (2,482 with cancer of more than 50 types, 4,207 without) were divided into training and validation sets, and plasma cell-free DNA underwent bisulfite sequencing of a panel of more than 100,000 methylation regions. In validation, specificity was 99.3% (95% CI 98.3 to 99.8). Stage I to III sensitivity was 67.3% in 12 prespecified cancer types and 43.9% in all cancer types. Across all cancer types sensitivity was 18% at stage I, 43% at stage II, 81% at stage III and 93% at stage IV. Tissue of origin was predicted in 96% of samples with a cancer-like signal and was accurate in 93% of those.",
    journal: "Annals of Oncology", year: 2020, doi: "10.1016/j.annonc.2020.02.011", pmid: "33506766", authors: "Liu MC, Oxnard GR, Klein EA, Swanton C, Seiden MV, CCGA Consortium", paperType: "observational", participants: 6689, changedPractice: false,
    findings: ["Specificity 99.3% in the validation set.", "All cancer types: stage I 18%, stage II 43%, stage III 81%, stage IV 93% sensitivity.", "Tissue of origin accurate in 93% of samples where it was predicted."],
    whatItMeans: "Methylation patterns can flag many cancers and point to the organ, but the cancers most worth catching early were the ones least often found.",
    caveats: ["Case-control design with cancers already diagnosed; screening performance is lower.", "Sponsored by GRAIL."],
    links: [DOI("Annals of Oncology 2020: CCGA second substudy", "10.1016/j.annonc.2020.02.011"), PUBMED("33506766"), ct("NCT02889978")],
    drugs: ["galleri"], trials: ["ccga", "strive-grail"], companies: ["grail"], technologies: ["mced", "cfdna-methylation-testing", "methylation-profiling"], people: ["eric-klein", "charles-swanton"], journals: ["annals-of-oncology"] }),

  p({ id: "paper-jamshidi-ccga1-cfdna-approaches-cancer-cell-2022", name: "Evaluation of cell-free DNA approaches for multi-cancer early detection",
    tldr: "GRAIL compared ten ways of reading free-floating DNA in the same blood samples and found that methylation worked best both for spotting cancer and for saying where it was.",
    summary: "In the first substudy of the Circulating Cell-free Genome Atlas (NCT02889978), ten machine-learning classifiers built on different cell-free DNA features were trained on the same samples and independently validated. At 98% specificity, whole-genome methylation, single-nucleotide variants with white-blood-cell background removal, and combined scores gave the highest cancer signal sensitivity. The circulating tumour allele fraction predicted classifier performance better than clinical stage or tumour type, and whole-genome methylation best predicted cancer signal origin, which informed the targeted methylation test.",
    journal: "Cancer Cell", year: 2022, doi: "10.1016/j.ccell.2022.10.022", pmid: "36400018", authors: "Jamshidi A, Liu MC, Klein EA, et al.", paperType: "observational", changedPractice: false,
    findings: ["Whole-genome methylation among the most sensitive approaches at 98% specificity.", "Tumour allele fraction in blood predicted detection better than stage.", "Methylation best predicted cancer signal origin."],
    whatItMeans: "Whether a cancer is found depends mostly on how much tumour DNA it sheds into the blood, which is why small early cancers are often missed by every approach.",
    caveats: ["Case-control samples; comparisons are within one company's platform.", "No absolute sensitivity figures in the abstract."],
    links: [DOI("Cancer Cell 2022: CCGA first substudy", "10.1016/j.ccell.2022.10.022"), PUBMED("36400018")],
    drugs: ["galleri"], trials: ["ccga"], companies: ["grail"], technologies: ["mced", "cfdna-methylation-testing", "fragmentomics"], terms: ["ctdna", "cfdna"], people: ["eric-klein"], journals: ["cancer-cell"] }),

  p({ id: "paper-pathfinder-design-cancers-2021", name: "The PATHFINDER Study: Assessment of the Implementation of an Investigational Multi-Cancer Early Detection Test into Clinical Practice",
    tldr: "The published plan for PATHFINDER, the first study to give Galleri results back to people without symptoms, set out what it would measure and what it expected to find.",
    summary: "Design paper for PATHFINDER (NCT04241796): about 6,200 participants aged 50 or older with or without additional cancer risk factors would have a targeted methylation cell-free DNA test, with signal-detected participants evaluated at their physician's discretion. The primary objective was the number and types of diagnostic tests needed for diagnostic resolution. From microsimulations the authors expected a median of 106 signal-detected results, 52 cancers and a positive predictive value of 49% (95% CI 39 to 58).",
    journal: "Cancers", year: 2021, doi: "10.3390/cancers13143501", pmid: "34298717", authors: "Nadauld LD, McDonnell CH, Beer TM, et al.", paperType: "methods", participants: 6200, changedPractice: false,
    findings: ["Expected 106 signal-detected results, 52 cancers and positive predictive value 49% by microsimulation.", "Primary objective: the diagnostic tests needed to resolve a positive result."],
    whatItMeans: "Set beside the result (35 cancers among 92 positives, positive predictive value 38%), it shows the test found fewer cancers than its makers had modelled.",
    caveats: ["Projections, not results.", "Sponsored by GRAIL."],
    links: [DOI("Cancers 2021: PATHFINDER design", "10.3390/cancers13143501"), PUBMED("34298717")],
    drugs: ["galleri"], trials: ["pathfinder"], companies: ["grail"], technologies: ["mced"], terms: ["ppv"], journals: ["cancers-mdpi"], related: ["paper-pathfinder-lancet-2023"] }),

  p({ id: "paper-symplify-lancet-oncol-2023", name: "Multi-cancer early detection test in symptomatic patients referred for cancer investigation in England and Wales (SYMPLIFY): a large-scale, observational cohort study",
    tldr: "In 5,461 people sent urgently to hospital with symptoms that might be cancer, the Galleri test was positive in three in four of those found to have cancer at higher stages but in about one in four with stage I cancer.",
    summary: "SYMPLIFY (ISRCTN10226380) was a prospective observational study at 44 NHS hospital sites in England and Wales of the GRAIL methylation test in people aged 18 or older referred from primary care with non-specific symptoms or symptoms of gynaecological, lung or gastrointestinal cancer, run blinded to clinical outcome. Of 5,461 analysable participants, 368 (6.7%) had cancer. The test detected a cancer signal in 323, of whom 244 had cancer: positive predictive value 75.5% (95% CI 70.5 to 80.1), negative predictive value 97.6%, sensitivity 66.3% (61.2 to 71.1) and specificity 98.4% (98.1 to 98.8). Sensitivity rose with stage, from 24.2% (16.0 to 34.1) at stage I to 95.3% at stage IV. The predicted site of origin was accurate in 85.2%.",
    journal: "The Lancet Oncology", year: 2023, doi: "10.1016/S1470-2045(23)00277-2", pmid: "37352875", authors: "Nicholson BD, Oke J, Virdee PS, et al.", paperType: "observational", participants: 6238, changedPractice: false,
    findings: ["Positive predictive value 75.5%; negative predictive value 97.6%.", "Sensitivity 66.3% overall; 24.2% at stage I and 95.3% at stage IV.", "Specificity 98.4%; site of origin accurate in 85.2%."],
    whatItMeans: "In people who already have symptoms the test is more often right when positive, because cancer is commoner, but it still misses most stage I cancers, so a negative result cannot cancel an urgent referral.",
    caveats: ["Results were not returned to patients or doctors; the study measured accuracy, not effect on care.", "Funded by GRAIL Bio UK."],
    links: [DOI("Lancet Oncology 2023: SYMPLIFY", "10.1016/S1470-2045(23)00277-2"), PUBMED("37352875"), { label: "ISRCTN10226380", url: "https://www.isrctn.com/ISRCTN10226380" }],
    drugs: ["galleri"], companies: ["grail"], technologies: ["mced", "cfdna-methylation-testing"], terms: ["ppv", "sensitivity-specificity"], journals: ["lancet-oncology"] }),

  p({ id: "paper-galleri-real-world-nat-commun-2025", name: "Real-world data and clinical experience from over 100,000 multi-cancer early detection tests",
    tldr: "Across 111,080 Galleri tests ordered in ordinary US practice, about one in a hundred was positive, and where doctors reported back, just over half of those people had cancer.",
    summary: "Matrana and colleagues analysed 111,080 people (median age 58) who had the Galleri test commercially. The cancer signal detection rate was 0.91% (1,011 of 111,080). Providers reported a clinical outcome for 459 of the 1,011; 258 of these had an invasive cancer diagnosis across 32 cancer types. Cancer signal origin was correct in 87% of cases with a reported cancer type, and the median time from result to diagnosis was 39.5 days.",
    journal: "Nature Communications", year: 2025, doi: "10.1038/s41467-025-64094-7", pmid: "41173830", authors: "Matrana M, Shukla V, Kingsbury D, et al.", paperType: "real-world", participants: 111080, changedPractice: false,
    findings: ["Signal detected in 0.91% (1,011 of 111,080).", "Outcome reported for 459 of 1,011 positives; 258 had invasive cancer.", "Cancer signal origin correct in 87%; median 39.5 days to diagnosis."],
    whatItMeans: "Outcomes are known for fewer than half of the positives, so the share of positives that were cancer in this group cannot be read as the test's positive predictive value, and cancers missed by the test are not counted at all.",
    caveats: ["Outcome data for only 459 of 1,011 positive results; none for negatives.", "Self-selected paying customers, not a screening population.", "Authors include GRAIL staff."],
    links: [DOI("Nature Communications 2025", "10.1038/s41467-025-64094-7"), PUBMED("41173830")],
    drugs: ["galleri"], companies: ["grail"], technologies: ["mced"], terms: ["ppv"], journals: ["nature-communications"] }),

  p({ id: "paper-cancerguard-mp-classifier-cebp-2026", name: "Performance of a multi-biomarker class, multi-cancer early detection (MCED) blood test in a prospectively collected cohort",
    tldr: "Exact Sciences' development study of the methylation and protein classifier behind Cancerguard: it found about half of cancers overall but about one in seven stage I cancers.",
    summary: "Gainullin and colleagues assessed a methylation and protein (MP) classifier in a prospectively collected multi-centre case-control set of 6,352 samples (1,438 cancer, 4,914 non-cancer) across 21 tumour organ types, split between training and test sets. At 98.5% specificity, overall sensitivity was 50.9%, with 15.4% at stage I, 26.1% at stages I and II combined, 38.0% at stage II, 67.8% at stage III and 85.5% at stage IV. Excluding breast and prostate cancers, overall sensitivity was 56.8% and stage I sensitivity 17.2%. A somatic mutation reflex for borderline samples was explored.",
    journal: "Cancer Epidemiology, Biomarkers & Prevention", year: 2026, doi: "10.1158/1055-9965.EPI-26-0541", pmid: "42826075", authors: "Gainullin VG, Manesse M, Zhuang F, et al.", paperType: "observational", participants: 6352, changedPractice: false,
    findings: ["Overall sensitivity 50.9% at 98.5% specificity.", "Stage I 15.4%, stage II 38.0%, stage III 67.8%, stage IV 85.5%.", "Without breast and prostate: overall 56.8%, stage I 17.2%."],
    whatItMeans: "It is the only peer-reviewed stage-by-stage figure for the Cancerguard approach, and it describes a development classifier at 98.5% specificity, not the launched test, which Exact Sciences says runs at 97.4% specificity.",
    caveats: ["Case-control; no positive predictive value in a screening population.", "Development classifier, not the commercial product's threshold.", "Authors employed by Exact Sciences."],
    links: [DOI("CEBP 2026: methylation and protein classifier", "10.1158/1055-9965.EPI-26-0541"), PUBMED("42826075")],
    drugs: ["cancerguard"], companies: ["exact-sciences"], technologies: ["mced", "cfdna-methylation-testing", "proteomics"], journals: ["cancer-epidemiology-biomarkers-prevention"] }),

  p({ id: "paper-cristiano-delfi-fragmentomes-nature-2019", name: "Genome-wide cell-free DNA fragmentation in patients with cancer",
    tldr: "The DELFI paper showed that the size and spacing of DNA fragments in blood differ in people with cancer, enough to detect seven cancer types in a laboratory comparison.",
    summary: "Cristiano and colleagues developed DELFI, which reads genome-wide fragmentation profiles of cell-free DNA from low-coverage whole-genome sequencing. In 236 patients with breast, colorectal, lung, ovarian, pancreatic, gastric or bile duct cancer and 245 healthy individuals, a machine-learning model detected cancer with sensitivities of 57% to more than 99% across the seven types at 98% specificity and localised tissue of origin to a limited number of sites in 75% of cases. Combined with mutation analysis, the approach detected 91% of patients with cancer.",
    journal: "Nature", year: 2019, doi: "10.1038/s41586-019-1272-6", pmid: "31142840", authors: "Cristiano S, Leal A, Phallen J, et al.", paperType: "translational", participants: 481, changedPractice: false,
    findings: ["Sensitivity 57% to more than 99% across seven cancer types at 98% specificity.", "Tissue of origin narrowed to a few sites in 75% of cases.", "With mutation analysis, 91% of patients with cancer detected."],
    whatItMeans: "Fragment patterns are a cheap signal that needs only shallow sequencing; Delfi Diagnostics now sells a lung-only test built on it, and several multi-cancer tests add fragmentomics to methylation.",
    caveats: ["Case-control with known cancers; not a screening result."],
    links: [DOI("Nature 2019: DELFI", "10.1038/s41586-019-1272-6"), PUBMED("31142840")],
    companies: ["delfi-diagnostics"], technologies: ["fragmentomics", "mced", "liquid-biopsy"], terms: ["cfdna"], institutions: ["johns-hopkins"], journals: ["nature"] }),

  p({ id: "paper-bratulic-gagome-pnas-2022", name: "Noninvasive detection of any-stage cancer using free glycosaminoglycans",
    tldr: "Elypta's founding study: patterns of sugar molecules called glycosaminoglycans in urine and blood told people with 14 cancer types from healthy people, including some stage I cancers.",
    summary: "Bratulic and colleagues profiled free glycosaminoglycans (GAGomes) in urine and plasma as metabolic biomarkers for multi-cancer early detection across 14 cancer types, using 2,064 samples from 1,260 people with cancer or healthy. Machine-learning models on urine (220 cancer, 360 healthy) and plasma (517 cancer, 425 healthy) detected any cancer with an area under the curve of 0.83 to 0.93, with up to 62% sensitivity for stage I disease at 95% specificity, and predicted the putative cancer location with 89% accuracy. In a validation on a screening-like population requiring at least 99% specificity, combined GAGomes predicted any cancer type with poor prognosis within 18 months with 43% sensitivity (21% at stage I; 121 and 49 cases).",
    journal: "Proceedings of the National Academy of Sciences", year: 2022, doi: "10.1073/pnas.2115328119", pmid: "36469776", authors: "Bratulic S, Limeta A, Dabestani S, et al.", paperType: "translational", participants: 1260, changedPractice: false,
    findings: ["Area under the curve 0.83 to 0.93 across urine and plasma models.", "Up to 62% stage I sensitivity at 95% specificity.", "Screening-like validation at 99% specificity: 43% sensitivity, 21% at stage I.", "Cancer location predicted with 89% accuracy."],
    whatItMeans: "A signal that is not DNA at all, read from urine as well as blood. At the 99% specificity a screening test needs, it found about one in five stage I cancers in the screening-like set, similar to the DNA tests.",
    caveats: ["Mostly case-control; the screening-like validation had 121 cases.", "Authors include Elypta's founders."],
    links: [DOI("PNAS 2022: GAGomes", "10.1073/pnas.2115328119"), PUBMED("36469776")],
    drugs: ["gagome-mced-test"], companies: ["elypta"], technologies: ["mced", "liquid-biopsy"], journals: ["pnas"] }),

  p({ id: "paper-budnik-novelna-proteomics-bmj-oncol-2024", name: "Novel proteomics-based plasma test for early detection of multiple cancers in the general population",
    tldr: "Novelna's discovery study: panels of ten blood proteins, one for men and one for women, separated 440 people with and without 18 early cancers with high accuracy in a small laboratory comparison.",
    summary: "Budnik and colleagues measured more than 3,000 plasma proteins by proximity extension assay in 440 people, healthy or diagnosed with 18 early-stage solid tumours, and selected sex-specific panels. The 10-protein detection panels reached an area under the curve of 0.98 in males and 0.983 in females; at stage I and 99% specificity they identified 93% (95% CI 79 to 100) of cancers among males and 84% (68 to 100) among females. 150-protein localisation panels identified the tissue of origin of most cancers in more than 80% of cases.",
    journal: "BMJ Oncology", year: 2024, doi: "10.1136/bmjonc-2023-000073", pmid: "39886137", authors: "Budnik B, Amirkhani H, Forouzanfar MH, Afshin A", paperType: "translational", participants: 440, changedPractice: false,
    findings: ["10-protein panels: area under the curve 0.98 (males) and 0.983 (females).", "Stage I sensitivity at 99% specificity: 93% in males, 84% in females, with wide confidence intervals.", "Tissue of origin identified in more than 80% for most cancers."],
    whatItMeans: "Very high figures from a small discovery set in which the same samples helped choose the proteins; figures like these usually fall when a test meets a larger, independent population.",
    caveats: ["440 people across 18 cancer types, so few cases per cancer; wide confidence intervals.", "No independent validation in the paper.", "Authors include Novelna's founder."],
    links: [DOI("BMJ Oncology 2024", "10.1136/bmjonc-2023-000073"), PUBMED("39886137")],
    drugs: ["novelna-protein-test"], companies: ["novelna"], technologies: ["mced", "proteomics"] }),

  p({ id: "paper-carcimun-front-oncol-2025", name: "Evaluation of an innovative multi-cancer early detection test: high sensitivity and specificity in differentiating cancer, inflammatory conditions, and healthy individuals",
    tldr: "A study of 172 people, co-written by the test's inventor, reported that the Carcimun blood test separated people with cancer from healthy people and from people with inflammation.",
    summary: "Walter and colleagues evaluated the Carcimun test, which measures conformational changes in plasma proteins by optical extinction, in a prospective single-blinded study of 172 participants: 80 healthy volunteers, 64 people with cancers of various types and 28 with inflammatory conditions or benign tumours. Mean extinction values were higher in cancer (315.1) than in healthy people (23.9) or those with inflammation (62.7); the test distinguished the groups with accuracy 95.4%, sensitivity 90.6% and specificity 98.2%.",
    journal: "Frontiers in Oncology", year: 2025, doi: "10.3389/fonc.2025.1520869", pmid: "40115017", authors: "Walter N, Groth J, Zu Zwerger BVU", paperType: "observational", participants: 172, changedPractice: false,
    findings: ["Sensitivity 90.6%, specificity 98.2% in 172 participants.", "Mean extinction 315.1 in cancer, 23.9 in healthy people, 62.7 with inflammation."],
    whatItMeans: "Small, with known cancers and no stage breakdown, and not independent of the inventor; it cannot say how the test would perform in people without symptoms.",
    caveats: ["64 cancer patients; no stage-by-stage figures.", "Co-authored by the test's inventor.", "Case-control design."],
    links: [DOI("Frontiers in Oncology 2025", "10.3389/fonc.2025.1520869"), PUBMED("40115017")],
    drugs: ["carcimun-test"], technologies: ["mced"] }),

  p({ id: "paper-epipangi-dx-clin-cancer-res-2021", name: "EpiPanGI Dx: A Cell-free DNA Methylation Fingerprint for the Early Detection of Gastrointestinal Cancers",
    tldr: "An academic blood test reading DNA methylation that aims to find six digestive-system cancers at once and say which organ the signal comes from.",
    summary: "Kandimalla and colleagues used methylation data from 1,781 tumour and adjacent normal tissues to design a targeted bisulphite sequencing panel of 67,832 regions, then validated it in 300 cell-free DNA specimens. Cancer-specific panels reached areas under the curve of 0.98 (colorectal), 0.98 (hepatocellular), 0.94 (oesophageal squamous), 0.90 (gastric), 0.90 (oesophageal adenocarcinoma) and 0.85 (pancreatic ductal); a pan-gastrointestinal panel detected all of them with an area under the curve of 0.88; and a tissue-of-origin panel, EpiPanGI Dx, predicted the organ with accuracy of 0.85 to 0.95 for most.",
    journal: "Clinical Cancer Research", year: 2021, doi: "10.1158/1078-0432.CCR-21-1982", pmid: "34465601", authors: "Kandimalla R, Xu J, Link A, et al.", paperType: "translational", participants: 300, changedPractice: false,
    findings: ["Pan-gastrointestinal panel area under the curve 0.88.", "Tissue-of-origin accuracy 0.85 to 0.95 for most gastrointestinal cancers."],
    whatItMeans: "A research assay, not a product; it shows that one methylation panel can cover the digestive cancers.",
    caveats: ["300 plasma specimens; no sensitivity at a stated specificity in the abstract.", "No prospective or screening data."],
    links: [DOI("Clinical Cancer Research 2021", "10.1158/1078-0432.CCR-21-1982"), PUBMED("34465601")],
    drugs: ["epipangi-dx"], technologies: ["mced", "cfdna-methylation-testing"], cancers: ["colorectal", "hcc", "gastric", "esophageal", "pancreatic"], institutions: ["city-of-hope"], journals: ["clinical-cancer-research"] }),

  p({ id: "paper-thromboseq-cancer-cell-2022", name: "Detection and localization of early- and late-stage cancers using platelet RNA",
    tldr: "Dutch researchers showed that the RNA inside blood platelets changes when cancer is present, enough to detect 18 cancer types in a laboratory comparison, though people with other illnesses often tested falsely positive.",
    summary: "In 't Veld and colleagues used tumour-educated platelet RNA sequencing (thromboSeq) to detect 18 cancer types. At 99% specificity in asymptomatic controls it detected cancer in two-thirds of 1,096 samples from patients with stage I to IV cancer and in half of 352 stage I to III tumours. Symptomatic controls, including inflammatory and cardiovascular disease and benign tumours, had more false positives, with an average specificity of 78%. The tumour site of origin was correct in over 80% for five tumour types.",
    journal: "Cancer Cell", year: 2022, doi: "10.1016/j.ccell.2022.08.006", pmid: "36055228", authors: "In 't Veld SGJG, Arkani M, Post E, et al.", paperType: "translational", participants: 1096, changedPractice: false,
    findings: ["Two-thirds of 1,096 stage I to IV samples detected at 99% specificity in asymptomatic controls.", "Half of 352 stage I to III tumours detected.", "Specificity fell to 78% in people with other illnesses."],
    whatItMeans: "A different source of signal, the platelets, with the warning every multi-cancer test faces: people who are ill with something else are more often flagged wrongly.",
    caveats: ["Case-control; no screening cohort.", "Specificity 78% in symptomatic controls."],
    links: [DOI("Cancer Cell 2022: thromboSeq", "10.1016/j.ccell.2022.08.006"), PUBMED("36055228")],
    drugs: ["thromboseq"], technologies: ["mced", "rna-seq"], institutions: ["amsterdam-umc"], journals: ["cancer-cell"] }),

  p({ id: "paper-dxcover-spectroscopy-bjc-2023", name: "A spectroscopic liquid biopsy for the earlier detection of multiple cancer types",
    tldr: "Dxcover shone infrared light through blood serum from 2,092 people and used machine learning to tell eight cancer types from no cancer.",
    summary: "Cameron and colleagues applied the Dxcover Cancer Liquid Biopsy, Fourier transform infrared spectroscopy with machine learning, to 2,092 patients across eight cancers. Areas under the curve against symptomatic non-cancer controls were brain 0.90, breast 0.76, colorectal 0.91, kidney 0.91, lung 0.91, ovarian 0.86, pancreatic 0.84 and prostate 0.86. Pooling all eight against asymptomatic non-cancer controls, the model detected 64% of stage I cancers at 99% specificity (overall sensitivity 57%); tuned for sensitivity it found 99% of stage I cancers at 59% specificity.",
    journal: "British Journal of Cancer", year: 2023, doi: "10.1038/s41416-023-02423-7", pmid: "37717120", authors: "Cameron JM, Sala A, Antoniou G, et al.", paperType: "translational", participants: 2092, changedPractice: false,
    findings: ["Eight cancer types, areas under the curve 0.76 to 0.91.", "64% of stage I cancers at 99% specificity; overall sensitivity 57%."],
    whatItMeans: "A cheap, fast signal with promising discovery-stage figures; it has not been tested in a screening population.",
    caveats: ["Discovery study with known cancers.", "Authors include Dxcover staff."],
    links: [DOI("British Journal of Cancer 2023", "10.1038/s41416-023-02423-7"), PUBMED("37717120")],
    drugs: ["dxcover-cancer-liquid-biopsy"], companies: ["dxcover"], technologies: ["mced"], journals: ["british-journal-of-cancer"] }),

  p({ id: "paper-hinestrosa-ev-protein-commun-med-2022", name: "Early-stage multi-cancer detection using an extracellular vesicle protein-based blood test",
    tldr: "A pilot study found that proteins on tiny vesicles shed into blood could pick out early pancreatic, ovarian and bladder cancers from people without cancer.",
    summary: "Hinestrosa and colleagues purified extracellular vesicles from plasma with an alternating current electrokinetics platform and built a machine-learning classifier on vesicle protein measurements. In a case-control pilot of 139 stage I and II pancreatic, ovarian or bladder cancers against 184 controls, the area under the curve was 0.95, with sensitivity 71.2% (63.2 to 78.1) at 99.5% specificity; stage I sensitivity was 70.5%, reaching 95.5% in pancreatic, 74.4% in ovarian and 43.8% in bladder cancer.",
    journal: "Communications Medicine", year: 2022, doi: "10.1038/s43856-022-00088-6", pmid: "35603292", authors: "Hinestrosa JP, Kurzrock R, Lewis JM, et al.", paperType: "translational", participants: 323, changedPractice: false,
    findings: ["Sensitivity 71.2% at 99.5% specificity for stage I and II cancers of three types.", "Stage I sensitivity 70.5%."],
    whatItMeans: "Proof of principle in three cancers from a small case-control set; it is not a screening result.",
    caveats: ["Pilot case-control study of 323 people.", "Three cancer types only."],
    links: [DOI("Communications Medicine 2022", "10.1038/s43856-022-00088-6"), PUBMED("35603292")],
    technologies: ["mced", "proteomics"], cancers: ["pancreatic", "ovarian", "urothelial"] }),

  // ---- Asia
  p({ id: "paper-gao-thunder-ann-oncol-2023", name: "Unintrusive multi-cancer detection by circulating cell-free DNA methylation sequencing (THUNDER): development and independent validation studies",
    tldr: "The Chinese validation study behind Burning Rock's OverC test: in an independent set of 1,010 people it found about seven in ten of six cancers with about one false positive in a hundred.",
    summary: "THUNDER (NCT04820868) evaluated enhanced linear-splinter amplification sequencing of cell-free DNA methylation over a panel of 161,984 CpG sites for six cancers (colorectum, oesophagus, liver, lung, ovary and pancreas). Two models were trained on 1,693 retrospective samples and validated in a prospective, independent, age-matched cohort of 1,010 people (505 with cancer). MCDBT-1 had 69.1% sensitivity (64.8 to 73.3), 98.9% specificity (97.6 to 99.7) and 83.2% tissue-origin accuracy; sensitivity for stages I to III was 59.8%. MCDBT-2, at 95.1% specificity, had 75.1% sensitivity. A simulation using Chinese incidence projected reductions in late-stage incidence; that is a model, not an observed outcome.",
    journal: "Annals of Oncology", year: 2023, doi: "10.1016/j.annonc.2023.02.010", pmid: "36849097", authors: "Gao Q, Lin YP, Li BS, et al.", paperType: "observational", participants: 2703, changedPractice: false,
    findings: ["MCDBT-1: sensitivity 69.1%, specificity 98.9%, tissue-origin accuracy 83.2% in independent validation.", "Stage I to III sensitivity 59.8%; no stage I figure in the abstract."],
    whatItMeans: "The strongest published evidence for OverC, still from people already diagnosed with cancer rather than a screening population.",
    caveats: ["Case-control validation, half the set had cancer.", "Late-stage reductions are simulated, not observed.", "Burning Rock collaborated."],
    links: [DOI("Annals of Oncology 2023: THUNDER", "10.1016/j.annonc.2023.02.010"), PUBMED("36849097"), ct("NCT04820868")],
    drugs: ["overc-mcdbt"], trials: ["thunder-overc"], companies: ["burning-rock"], technologies: ["mced", "cfdna-methylation-testing"], journals: ["annals-of-oncology"] }),

  p({ id: "paper-promise-innovation-2026", name: "Exploration of multi-omics liquid biopsy approaches for multi-cancer early detection: The PROMISE study",
    tldr: "A Chinese study comparing DNA methylation, DNA mutations and proteins in blood found methylation the strongest signal for nine cancers, with proteins adding some extra cancers.",
    summary: "PROMISE (NCT04972201) prospectively collected blood from 1,706 participants (866 with one of nine cancers, 840 without), split into training and validation sets. The methylation classifier outperformed mutation-based and protein-based classifiers; 95.0% of cancers detected by mutations were also detected by methylation. Combining methylation and protein features raised sensitivity to 75.1% (69.3 to 80.3) at the same 98.8% specificity, with 73.1% accuracy for the top predicted origin.",
    journal: "The Innovation", year: 2026, doi: "10.1016/j.xinn.2025.101076", pmid: "41737326", authors: "Duan J, Gao Q, Wang Z, et al.", paperType: "observational", participants: 1706, changedPractice: false,
    findings: ["Methylation outperformed mutations and proteins.", "Methylation plus protein: 75.1% sensitivity at 98.8% specificity; top predicted origin correct in 73.1%."],
    whatItMeans: "Supports the design choice of most current tests: methylation first, with proteins as an add-on rather than mutations.",
    caveats: ["Case-control; known cancers.", "Burning Rock affiliation among authors."],
    links: [DOI("The Innovation 2026: PROMISE", "10.1016/j.xinn.2025.101076"), PUBMED("41737326"), ct("NCT04972201")],
    drugs: ["overc-mcdbt"], trials: ["promise-cams"], companies: ["burning-rock"], technologies: ["mced", "cfdna-methylation-testing", "proteomics"] }),

  p({ id: "paper-panseer-nat-commun-2020", name: "Non-invasive early detection of cancer four years before conventional diagnosis using a blood test",
    tldr: "Singlera's PanSeer methylation test, run on stored blood from a Chinese cohort, flagged most people who went on to be diagnosed with one of five cancers within four years.",
    summary: "In the Taizhou Longitudinal Study, 123,115 healthy people gave plasma for storage and were followed for cancer. PanSeer, a circulating tumour DNA methylation test, was run on samples from 605 asymptomatic individuals, 191 of whom were later diagnosed with stomach, oesophageal, colorectal, lung or liver cancer within four years, plus 223 cancer patients and 200 tissues. It detected the five cancers in 88% (95% CI 80 to 93) of post-diagnosis patients at 96% specificity (93 to 98), and in 95% (89 to 98) of asymptomatic individuals later diagnosed; the authors state that future longitudinal studies are required to confirm this result.",
    journal: "Nature Communications", year: 2020, doi: "10.1038/s41467-020-17316-z", pmid: "32694610", authors: "Chen X, Gole J, Gore A, et al.", paperType: "observational", participants: 1028, changedPractice: false,
    findings: ["88% sensitivity in post-diagnosis patients at 96% specificity.", "95% of asymptomatic people later diagnosed were positive on stored samples."],
    whatItMeans: "An eye-catching result from a nested case-control analysis of stored samples; it has not been reproduced in a prospective screening study.",
    caveats: ["Nested case-control, 191 future cases; specificity of 96% would mean 4 in 100 false positives in screening.", "Authors' own call for confirmation."],
    links: [DOI("Nature Communications 2020: PanSeer", "10.1038/s41467-020-17316-z"), PUBMED("32694610")],
    drugs: ["panseer"], companies: ["singlera"], technologies: ["mced", "cfdna-methylation-testing"], journals: ["nature-communications"] }),

  p({ id: "paper-oncoseek-eclinicalmedicine-2023", name: "A panel of seven protein tumour markers for effective and affordable multi-cancer early detection by artificial intelligence: a large-scale and multicentre case-control study",
    tldr: "SeekIn's first OncoSeek study: an artificial intelligence model on seven routine protein tumour markers found about half of cancers while flagging about seven in a hundred people without cancer.",
    summary: "Luan and colleagues analysed 7,565 participants (954 with cancer) from SeekIn and Sun Yat-sen Memorial Hospital plus a Johns Hopkins validation cohort (1,005 with cancer, 812 without). Using one threshold per marker the seven markers had 56.9% specificity; the OncoSeek algorithm, combining the markers with age and sex, raised specificity to 92.9% (92.3 to 93.5) with overall sensitivity 51.7% (49.4 to 53.9). Sensitivities for nine common cancers ranged from 37.1% to 77.6% (pancreatic 77.6%), and tissue of origin was correct in 66.8% of true positives.",
    journal: "eClinicalMedicine", year: 2023, doi: "10.1016/j.eclinm.2023.102041", pmid: "37387788", authors: "Luan Y, Zhong G, Li S, et al.", paperType: "observational", participants: 9382, changedPractice: false,
    findings: ["Specificity 92.9%, sensitivity 51.7%.", "Tissue of origin correct in 66.8% of true positives."],
    whatItMeans: "Cheap and runs on hospital analysers, but at about 93% specificity a screening programme would generate many false alarms for each cancer found.",
    caveats: ["Retrospective case-control analysis of routine testing data.", "Authors include SeekIn staff."],
    links: [DOI("eClinicalMedicine 2023", "10.1016/j.eclinm.2023.102041"), PUBMED("37387788")],
    drugs: ["oncoseek"], companies: ["seekin"], technologies: ["mced", "proteomics"] }),

  p({ id: "paper-oncoseek-npj-precis-oncol-2025", name: "A large-scale, multi-centre validation study of an AI-empowered blood-based test for multi-cancer early detection",
    tldr: "Pooling seven centres in three countries and 15,122 people, the OncoSeek protein test found about six in ten cancers with about eight false positives per hundred people without cancer.",
    summary: "Shen and colleagues combined four new cohorts with the earlier training and validation sets: 15,122 participants (3,029 with cancer) from seven centres in three countries, on four platforms and two sample types. OncoSeek had an area under the curve of 0.829, 58.4% sensitivity, 92.0% specificity and 70.6% tissue-of-origin accuracy in true positives, across 14 cancer types with sensitivities of 38.9% to 83.3%. In a symptomatic cohort it had 73.1% sensitivity at 90.6% specificity.",
    journal: "npj Precision Oncology", year: 2025, doi: "10.1038/s41698-025-01105-2", pmid: "41062647", authors: "Shen Y, Xia Y, Chang Y, et al.", paperType: "observational", participants: 15122, changedPractice: false,
    findings: ["58.4% sensitivity, 92.0% specificity across 14 cancers.", "Symptomatic cohort: 73.1% sensitivity at 90.6% specificity."],
    whatItMeans: "Consistent across sites and platforms, with the same limit as before: specificity too low for population screening without a second test.",
    caveats: ["Mostly retrospective and case-control cohorts.", "Authors include SeekIn staff."],
    links: [DOI("npj Precision Oncology 2025", "10.1038/s41698-025-01105-2"), PUBMED("41062647")],
    drugs: ["oncoseek"], companies: ["seekin"], technologies: ["mced", "proteomics"] }),

  p({ id: "paper-seekincare-j-mol-diagn-2025", name: "Clinical Validation of a Noninvasive Multi-Omics Method for Multicancer Early Detection in Retrospective and Prospective Cohorts",
    tldr: "SeekIn's combined DNA and protein test found six in ten cancers in a laboratory set and seven in ten in people who had bought it, at specificities of 95 to 98 per cent.",
    summary: "Li and colleagues report SeekInCare, which combines copy number, fragment size, end motif and oncogenic virus signals from shallow whole-genome sequencing of cell-free DNA with seven protein tumour markers. In a retrospective set of 617 patients with 27 cancer types and 580 without cancer it reached 60.0% sensitivity at 98.3% specificity (area under the curve 0.899), with 37.7%, 50.4%, 66.7% and 78.1% at stages I to IV. In a prospective cohort of 1,203 people who received it as a laboratory-developed test (median follow-up 753 days) it had 70.0% sensitivity at 95.2% specificity.",
    journal: "The Journal of Molecular Diagnostics", year: 2025, doi: "10.1016/j.jmoldx.2025.04.001", pmid: "40311780", authors: "Li S, Geng S, Chen Y, et al.", paperType: "observational", participants: 2400, changedPractice: false,
    findings: ["Retrospective: 60.0% sensitivity at 98.3% specificity; stage I 37.7%.", "Prospective (1,203 people): 70.0% sensitivity at 95.2% specificity."],
    whatItMeans: "One of few multi-cancer tests with a stage I figure above one in three, from a case-control set; the prospective figures rest on few cancers.",
    caveats: ["The prospective cohort's number of cancers is not given in the abstract.", "Authors include SeekIn staff."],
    links: [DOI("Journal of Molecular Diagnostics 2025", "10.1016/j.jmoldx.2025.04.001"), PUBMED("40311780")],
    drugs: ["seekincare"], companies: ["seekin"], technologies: ["mced", "fragmentomics", "proteomics"] }),

  p({ id: "paper-spot-mas-k-detek-bmc-med-2025", name: "Prospective validation study: a non-invasive circulating tumor DNA-based assay for simultaneous early detection of multiple cancers in asymptomatic adults",
    tldr: "In 9,024 Vietnamese adults without symptoms, the SPOT-MAS blood test was positive in about one in two hundred, and four in ten of those had cancer.",
    summary: "K-DETEK (NCT05227261) enrolled 9,057 asymptomatic adults aged 40 or older at 75 hospitals and one research institute in Vietnam, followed for 12 months. Of 9,024 eligible, 43 (0.48%) tested positive; 17 were confirmed with cancer, 9 matching the predicted tissue of origin: positive predictive value 39.53% (95% CI 26.37 to 54.42), tissue-of-origin accuracy 52.94%. Of 8,981 negatives, 8,974 were cancer-free at 12 months (negative predictive value 99.92%). Sensitivity was 70.83% (50.83 to 85.09) and specificity 99.71% (99.58 to 99.80).",
    journal: "BMC Medicine", year: 2025, doi: "10.1186/s12916-025-03929-y", pmid: "39948555", authors: "Nguyen LHD, Nguyen THH, Le VH, et al.", paperType: "observational", participants: 9057, changedPractice: false,
    findings: ["43 of 9,024 positive (0.48%); 17 cancers; positive predictive value 39.5%.", "Sensitivity 70.8% (24 cancers in total), specificity 99.71%.", "Tissue of origin correct in 9 of 17."],
    whatItMeans: "A prospective screening result in a lower-middle-income country, with a positive predictive value similar to PATHFINDER's; the sensitivity rests on 24 cancers, and the test's tissue call was right about half the time.",
    caveats: ["Single-arm; 24 cancers in total, so wide confidence intervals.", "No stage I figure in the abstract.", "Sponsored by Gene Solutions."],
    links: [DOI("BMC Medicine 2025: K-DETEK", "10.1186/s12916-025-03929-y"), PUBMED("39948555"), ct("NCT05227261")],
    drugs: ["spot-mas"], trials: ["k-detek"], companies: ["gene-solutions"], technologies: ["mced", "fragmentomics"], terms: ["ppv"] }),

  p({ id: "paper-spot-mas-elife-2023", name: "Multimodal analysis of methylomics and fragmentomics in plasma cell-free DNA for multi-cancer early detection and localization",
    tldr: "The development study of SPOT-MAS: reading methylation and fragment patterns together, with shallow sequencing, found about seven in ten of five cancers in a laboratory comparison.",
    summary: "Nguyen and colleagues developed SPOT-MAS to profile methylomics, fragmentomics, copy number and end motifs from targeted and shallow genome-wide sequencing (about 0.55x) of cell-free DNA. In 738 non-metastatic patients with breast, colorectal, gastric, lung or liver cancer and 1,550 healthy controls it detected cancer with 72.4% sensitivity at 97.0% specificity; sensitivities were 73.9% at stage I, 62.3% at stage II and 88.3% at non-metastatic stage IIIA. Tumour-of-origin accuracy was 0.7.",
    journal: "eLife", year: 2023, doi: "10.7554/eLife.89083", pmid: "37819044", authors: "Nguyen VTC, Nguyen TH, Doan NNT, et al.", paperType: "translational", participants: 2288, changedPractice: false,
    findings: ["72.4% sensitivity at 97.0% specificity.", "Stage I 73.9%, stage II 62.3%.", "Tumour-of-origin accuracy 0.7."],
    whatItMeans: "High early-stage figures at a lower specificity than screening needs; in the prospective K-DETEK study the test was run at 99.7% specificity.",
    caveats: ["Case-control; 97% specificity would mean 3 in 100 false positives in screening.", "Authors include Gene Solutions staff."],
    links: [DOI("eLife 2023: SPOT-MAS", "10.7554/eLife.89083"), PUBMED("37819044")],
    drugs: ["spot-mas"], companies: ["gene-solutions"], technologies: ["mced", "fragmentomics", "cfdna-methylation-testing"], journals: ["elife"] }),

  p({ id: "paper-trucheck-c-etac-cancer-cytopathol-2021", name: "Evaluation of circulating tumor cell clusters for pan-cancer noninvasive diagnostic triaging",
    tldr: "Datar Cancer Genetics' study of 30,060 people reported clumps of tumour-associated cells in the blood of about nine in ten people with cancer and about four in a hundred people without symptoms.",
    summary: "Gaya and colleagues harvested circulating ensembles of tumour-associated cells (C-ETACs) from 30,060 people: 9,416 with known cancer, 6,725 symptomatic with suspected cancer and 13,919 asymptomatic. C-ETACs were found in 91.8% of people with known cancer and in 92.6% of the 6,025 symptomatic people diagnosed with cancer; in a subset of 3,509, immunocytochemistry profiles matched histopathology in 93.1%. C-ETACs were undetectable in 95% of 700 symptomatic people with benign conditions and in 96.3% of the 13,919 asymptomatic individuals.",
    journal: "Cancer Cytopathology", year: 2021, doi: "10.1002/cncy.22366", pmid: "32996712", authors: "Gaya A, Crook T, Plowman N, et al.", paperType: "observational", participants: 30060, changedPractice: false,
    findings: ["C-ETACs in 91.8% of 9,416 people with known cancer.", "Undetectable in 96.3% of 13,919 asymptomatic people (about 3.7% positive).", "Profile matched histology in 93.1% of 3,509."],
    whatItMeans: "If about 3.7% of people without symptoms test positive, most positives in a screening population would not be cancer; the paper does not report how many asymptomatic positives were later diagnosed.",
    caveats: ["Company-authored.", "No stage breakdown or screening positive predictive value in the abstract."],
    links: [DOI("Cancer Cytopathology 2021", "10.1002/cncy.22366"), PUBMED("32996712")],
    drugs: ["trucheck-intelli"], companies: ["datar-cancer-genetics"], technologies: ["mced", "ctc-capture"] }),

  p({ id: "paper-bao-fragmentomics-nat-med-2025", name: "Early detection of multiple cancer types using multidimensional cell-free DNA fragmentomics",
    tldr: "Geneseeq's whole-genome fragment test found most cancers in a laboratory set, and about half, mostly early, in a first prospective group of 3,724 people without symptoms.",
    summary: "Bao and colleagues (Nanjing Geneseeq Technology) evaluated a multi-cancer test using genetic and fragmentomic features from whole-genome sequencing of plasma cell-free DNA. In an internal validation cohort (3,021 with cancer, 3,370 without) and an independent cohort (677 with cancer, 687 without), the independent set gave 87.4% sensitivity, 97.8% specificity and 82.4% tissue-of-origin accuracy. Preliminary results from a prospective study of 3,724 asymptomatic participants showed 53.5% sensitivity, predominantly for early-stage cancers, and 98.1% specificity.",
    journal: "Nature Medicine", year: 2025, doi: "10.1038/s41591-025-03735-2", pmid: "40425843", authors: "Bao H, Yang S, Chen X, et al.", paperType: "observational", participants: 11479, changedPractice: false,
    findings: ["Independent validation: 87.4% sensitivity, 97.8% specificity, 82.4% tissue of origin.", "Prospective asymptomatic cohort (3,724): 53.5% sensitivity, 98.1% specificity."],
    whatItMeans: "The drop from 87% in known cancers to 54% in people without symptoms is the usual gap between case-control and screening performance, shown in one paper.",
    caveats: ["Prospective results are preliminary.", "The abstract does not name a commercial product."],
    links: [DOI("Nature Medicine 2025", "10.1038/s41591-025-03735-2"), PUBMED("40425843")],
    technologies: ["mced", "fragmentomics"], journals: ["nature-medicine"] }),

  // ---- Second pass, 3 November 2026: China, Taiwan and India. Europe PMC's search service returned 503 throughout,
  // so each paper below was found through PubMed (E-utilities), its abstract and affiliations read there, and its DOI
  // resolved through Crossref.
  p2({ id: "paper-inspector-geneplus-cancer-commun-2025", name: "The INSPECTOR study: enhanced feasibility for clinical translation of a multi-cancer early detection method based on enzyme-assisted high signal-to-noise ratio sequencing of methylated circulating tumor DNA",
    tldr: "A Chinese study with Geneplus-Beijing of a methylation blood test for eight cancers that found about eight in ten cancers, and about two in three stage I cancers, in people already diagnosed, at 99% specificity.",
    summary: "Luo and colleagues (Sun Yat-sen University Cancer Center with Geneplus-Beijing) built a targeted panel of 155,362 methylated CpG sites, read by enzyme-assisted (human TET) methylation sequencing rather than bisulphite conversion, for eight cancers: lung, breast, colorectum, liver, oesophagus, stomach, pancreas and ovary. In multicentre case-control cohorts (1,071 participants for training, 581 for validation and 824 for independent validation) the test had 99.0% specificity and 81.9% sensitivity in the independent validation set. Sensitivity was 65.5% at stage I and 79.7% at stage II. The top predicted cancer origin was right in 87.4% in independent validation (94.5% within the top two).",
    journal: "Cancer Communications", year: 2025, doi: "10.1002/cac2.70071", pmid: "41165038", authors: "Luo HY, Wei W, Li P, Zhang QH, et al.", paperType: "observational", changedPractice: false,
    findings: ["Independent validation: 99.0% specificity, 81.9% sensitivity.", "Stage I sensitivity 65.5%; stage II 79.7%.", "Top predicted origin correct in 87.4% (top two: 94.5%)."],
    whatItMeans: "A stage I figure this high comes from a case-control design with known cancers; the same tests usually find far fewer early cancers when they meet people without symptoms.",
    caveats: ["Case-control cohorts; no screening population, no positive predictive value.", "Six authors are Geneplus-Beijing employees."],
    links: [DOI("Cancer Communications 2025: INSPECTOR", "10.1002/cac2.70071"), PUBMED("41165038")],
    drugs: ["inspector-mced"], companies: ["geneplus"], institutions: ["sysucc"], technologies: ["mced", "cfdna-methylation-testing"], journals: ["cancer-communications"] }),

  p2({ id: "paper-totem-genecast-bmc-cancer-2024", name: "TOTEM: a multi-cancer detection and localization approach using circulating tumor DNA methylation markers",
    tldr: "Genecast's methylation blood test for seven cancers found about two in three cancers in a laboratory set at 98 to 100% specificity, and about half of early-stage cancers.",
    summary: "Xiong and colleagues (Kunming Medical University with Genecast Biotechnology, Wuxi) ran enzymatic-conversion targeted methylation sequencing of plasma from 500 healthy controls and 733 patients with breast, colorectal, oesophageal, gastric, liver, lung or pancreatic cancer, plus an independent cohort of 143 controls and 179 liver or stomach cancer patients. The model used 57 diagnostic markers and 873 origin markers. Specificity was 100% in testing and 98.6% in independent validation; overall sensitivity was 67.3% and 55.9%; early-stage (I and II) sensitivity was 45.7% in testing. Among correctly detected cancers the top predicted origin was right in 77.7% (testing) and 76.0% (independent validation). The authors state that real-world performance needs a much larger prospective cohort.",
    journal: "BMC Cancer", year: 2024, doi: "10.1186/s12885-024-12626-7", pmid: "39009999", authors: "Xiong D, Han T, Li Y, Hong Y, et al.", paperType: "observational", changedPractice: false,
    findings: ["Testing cohort: 67.3% sensitivity at 100% specificity; independent validation: 55.9% at 98.6%.", "Stage I and II sensitivity 45.7% in testing.", "Top predicted origin correct in 76 to 78% of detected cancers."],
    whatItMeans: "A company development study with known cancers; the authors themselves say it has to be tested prospectively.",
    caveats: ["Case-control; independent validation covered only liver and stomach cancer.", "Genecast affiliation among authors."],
    links: [DOI("BMC Cancer 2024: TOTEM", "10.1186/s12885-024-12626-7"), PUBMED("39009999")],
    drugs: ["totem-genecast"], companies: ["genecast"], technologies: ["mced", "cfdna-methylation-testing"], journals: ["bmc-cancer"] }),

  p2({ id: "paper-gutseer-guide-mol-cancer-2025", name: "GUIDE: a prospective cohort study for blood-based early detection of gastrointestinal cancers using targeted DNA methylation and fragmentomics sequencing",
    tldr: "Singlera and Fudan University's GutSeer blood test for five digestive cancers found about eight in ten of them in a blinded test of 846 hospital patients, with about one false positive in eighteen people without cancer.",
    summary: "Huang and colleagues (Zhongshan Hospital, Fudan University, with Singlera Genomics) designed GutSeer, a targeted bisulphite sequencing panel combining DNA methylation and fragment patterns for five gastrointestinal cancers (colorectal, oesophageal, gastric, liver and pancreatic). It was trained and validated on plasma from 1,057 cancer patients and 1,415 non-cancer controls; in validation the area under the curve was 0.950, with 82.8% sensitivity and 95.8% specificity (colorectal 92.2%, oesophageal 75.5%, gastric 65.3%, liver 92.9%, pancreatic 88.6%). The locked model was then tested blind in 846 inpatients and outpatients at five hospitals, including 198 stage I or II cancers and 63 advanced precancerous lesions: 81.5% sensitivity and 94.4% specificity for gastrointestinal cancers. Registered as NCT05431621.",
    journal: "Molecular Cancer", year: 2025, doi: "10.1186/s12943-025-02367-x", pmid: "40468355", authors: "Huang A, Guo DZ, Su ZX, Zhong YS, et al.", paperType: "observational", changedPractice: false,
    findings: ["Validation: 82.8% sensitivity, 95.8% specificity; gastric 65.3%, liver 92.9%.", "Blinded hospital test cohort of 846: 81.5% sensitivity, 94.4% specificity."],
    whatItMeans: "Strong figures in hospital patients, but at about 94 to 96% specificity roughly one in twenty people without cancer would test positive, too many for screening healthy people without a second test.",
    caveats: ["Hospital inpatients and outpatients, not a screening population.", "The abstract gives no stage I figure.", "Singlera Genomics staff among authors."],
    links: [DOI("Molecular Cancer 2025: GUIDE (GutSeer)", "10.1186/s12943-025-02367-x"), PUBMED("40468355"), ct("NCT05431621")],
    drugs: ["gutseer"], trials: ["guide-gutseer"], companies: ["singlera"], institutions: ["zhongshan-hospital-fudan", "city-of-hope"], technologies: ["mced", "cfdna-methylation-testing", "fragmentomics"], cancers: ["colorectal", "esophageal", "gastric", "hcc", "pancreatic"], journals: ["molecular-cancer"] }),

  p2({ id: "paper-predomix-metabolome-cancer-rep-2024", name: "Development of a Serum Metabolome-Based Test for Early-Stage Detection of Multiple Cancers",
    tldr: "PredOmix, an Indian company, reported that a blood test reading thousands of small molecules by mass spectrometry told 30 cancers from no cancer with about 98% accuracy in 6,445 people; the paper gives few further details.",
    summary: "Nagarkar and colleagues (HCG cancer centres with PredOmix Technologies, Gurugram) profiled serum metabolites by untargeted liquid chromatography and high-resolution mass spectrometry and applied the company's machine-learning algorithm in an investigator-initiated trial of 6,445 participants, cancer patients and non-cancer volunteers (CTRI/2023/03/050316). The abstract reports that the platform detected 30 cancers in women and men with an average accuracy of about 98%, and that accuracy did not vary across the four stages. It builds on the company's earlier test for 15 cancers in women (Gupta et al., Scientific Reports 2023).",
    journal: "Cancer Reports", year: 2024, doi: "10.1002/cnr2.70042", pmid: "39559978", authors: "Nagarkar R, Gopichand M, Pal SK, Gupta A, et al.", paperType: "observational", participants: 6445, changedPractice: false,
    findings: ["30 cancers; average accuracy about 98% in 6,445 participants.", "Accuracy reported as unchanged across stages I to IV."],
    whatItMeans: "The abstract gives an average accuracy but no sensitivity at a stated specificity, no numbers of cancers by type or stage and no screening result; accuracy this high in early cancers has not been reproduced by any other multi-cancer test and needs independent confirmation.",
    caveats: ["Case-control design with known cancers.", "No sensitivity, specificity or positive predictive value in the abstract.", "Five authors are PredOmix employees and a co-founder holds stock; the work is covered by a patent filing."],
    links: [DOI("Cancer Reports 2024", "10.1002/cnr2.70042"), PUBMED("39559978"), DOI("Gupta et al., Scientific Reports 2023 (15 cancers in women)", "10.1038/s41598-023-46553-7")],
    drugs: ["oncoveryx"], companies: ["predomix"], technologies: ["mced"], journals: ["cancer-reports"] }),

  p2({ id: "paper-hrc-test-oct4a-stem-cell-rev-2021", name: "Quest for Pan-Cancer Diagnosis/Prognosis Ends with HrC Test Measuring Oct4A in Peripheral Blood",
    tldr: "Epigeneres, a Mumbai company, describes a blood test that scores the activity of an embryonic gene, OCT-4A, and claims it detects and stages any cancer; the paper is a description with case studies, not a validation study with accuracy figures.",
    summary: "Tripathi and colleagues (Epigeneres Biotech, Mumbai) describe the HrC scale, which converts the fold change of OCT-4A expression in peripheral blood into a score from non-cancer (0 to 2) through inflammation, high risk and stages I to IV (above 40). The authors report an initial study in 120 known cancer patients, validation of the scale in 1,000 people (500 with and 500 without cancer) and ten case studies, and say the test can detect and classify solid tumours, blood cancers and sarcomas by stage. The abstract gives no sensitivity or specificity.",
    journal: "Stem Cell Reviews and Reports", year: 2021, doi: "10.1007/s12015-021-10167-1", pmid: "33954878", authors: "Tripathi V, Bhartiya D, Vaid A, Chhabria S, et al.", paperType: "observational", participants: 1000, changedPractice: false,
    findings: ["Scale from 0 to above 40 linked to non-cancer, inflammation, high risk and stages I to IV.", "Validation in 500 people with and 500 without cancer reported without accuracy figures in the abstract."],
    whatItMeans: "A company's own account of its test, with no accuracy figures in the abstract; the claim that one marker detects and stages every cancer has not been independently tested.",
    caveats: ["Company-authored; no sensitivity or specificity in the abstract.", "Case studies rather than a blinded diagnostic accuracy study."],
    links: [DOI("Stem Cell Reviews and Reports 2021", "10.1007/s12015-021-10167-1"), PUBMED("33954878")],
    drugs: ["hrc-test"], companies: ["epigeneres"], technologies: ["mced"] }),

  p2({ id: "paper-onetest-algorithm-taiwan-cancers-2020", name: "Improving Multi-Tumor Biomarker Health Check-Up Tests with Machine Learning Algorithms",
    tldr: "The Taiwanese study behind OneTest's algorithm: in 27,938 people having routine tumour-marker check-ups, a machine-learning score separated those later diagnosed with cancer only moderately well.",
    summary: "Wang and colleagues (Chang Gung Memorial Hospital, Linkou, Taiwan, with 20/20 GeneSystems) developed sex-specific cancer screening algorithms and an organ-of-origin algorithm from tumour-marker values, age and sex of 27,938 asymptomatic people screened at a Taiwanese medical centre between May 2001 and April 2015, 342 of whom were later confirmed to have cancer, with external validation at a second centre. The area under the curve was 0.8736 for men and 0.6938 for women in external cross validation. The organ-system algorithm had 81.2% sensitivity and 64.9% specificity for men and 81.7% and 67.5% for women. The authors' disclosure states that 20/20 GeneSystems is commercialising the algorithms under the OneTest brand.",
    journal: "Cancers", year: 2020, doi: "10.3390/cancers12061442", pmid: "32492934", authors: "Wang HY, Chen CH, Shi S, Chung CR, et al.", paperType: "observational", participants: 27938, changedPractice: false,
    findings: ["Area under the curve in external validation: 0.87 for men, 0.69 for women.", "Organ-system algorithm: about 81% sensitivity at 65 to 68% specificity."],
    whatItMeans: "An area under the curve of 0.69 for women is weak discrimination; the paper reports risk groups rather than a positive predictive value, so it does not show how many positive OneTest results are cancer.",
    caveats: ["Retrospective real-world data from health check-ups, with only 342 cancers.", "Authors are affiliated with or own stock in 20/20 GeneSystems."],
    links: [DOI("Cancers 2020", "10.3390/cancers12061442"), PUBMED("32492934"), DOI("Wu et al., Computers in Biology and Medicine 2022 (LSTM model on 163,174 people)", "10.1016/j.compbiomed.2022.105362")],
    drugs: ["onetest"], companies: ["2020-biolabs"], institutions: ["chang-gung-memorial-hospital"], technologies: ["mced", "proteomics"], journals: ["cancers-mdpi"] }),

  p2({ id: "paper-c-etac-one-year-risk-cancer-prev-res-2021", name: "Hallmark Circulating Tumor-Associated Cell Clusters Signify 230 Times Higher One-Year Cancer Risk",
    tldr: "Datar Cancer Genetics followed people without symptoms for a year after its tumour-cell-cluster blood test and reported that those with a positive result were far more likely to be diagnosed with cancer.",
    summary: "Ranade and colleagues (with Datar Cancer Genetics, Nashik) report one-year follow-up of the asymptomatic cohort from the company's earlier work (16,134 people, including 10,625 asymptomatic, among whom C-ETACs were found in 3.6%). People with detectable circulating ensembles of tumour-associated cells had a 230-fold higher one-year cancer risk than those without (P < 0.00001). In 4,419 symptomatic people later confirmed to have cancer, C-ETACs were detected in 4,101 (92.8%).",
    journal: "Cancer Prevention Research", year: 2021, doi: "10.1158/1940-6207.CAPR-20-0322", pmid: "32958586", authors: "Ranade A, Bhatt A, Page R, Limaye S, et al.", paperType: "observational", changedPractice: false,
    findings: ["C-ETAC-positive asymptomatic people: 230-fold higher one-year cancer risk.", "C-ETACs detected in 92.8% of 4,419 symptomatic people with confirmed cancer."],
    whatItMeans: "A relative risk does not say what share of positive results turned out to be cancer; with about 3.6% of people without symptoms testing positive, most positives would still not be cancer in a screening population.",
    caveats: ["The abstract gives no positive predictive value or count of cancers among positives.", "Datar Cancer Genetics staff among authors."],
    links: [DOI("Cancer Prevention Research 2021", "10.1158/1940-6207.CAPR-20-0322"), PUBMED("32958586")],
    drugs: ["trucheck-intelli"], companies: ["datar-cancer-genetics"], technologies: ["mced", "ctc-capture"], journals: ["cancer-prevention-research"] }),
];
