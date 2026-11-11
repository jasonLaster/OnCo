import { protocol } from "./helpers";

/*
 * Lymphoedema after breast cancer: prospective surveillance with a baseline measurement, early compression for
 * subclinical swelling, exercise, decongestive therapy for established lymphoedema, and what the evidence now says
 * about the traditional arm precautions (no blood pressure cuff, no blood tests, no injections in the at-risk arm).
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - APTA Academy of Oncologic Physical Therapy guideline on interventions for breast cancer-related lymphoedema
 *   (Davies et al., Phys Ther 2020): full text from Europe PMC (PMC7412854), including Table 1 of graded
 *   recommendations.
 * - APTA Oncology Section guideline on diagnosis of upper quadrant lymphoedema (Levenhagen et al., Phys Ther 2017):
 *   full text from Europe PMC (PMC5803775). The authors published an update on bioimpedance in 2018 (Phys Ther,
 *   10.1093/ptj/pzy096); Europe PMC holds only its title, so it was not read.
 * - PREVENT randomised trial, bioimpedance spectroscopy against tape measure (Ridner et al., Lymphat Res Biol 2022):
 *   abstract from Europe PMC; and its secondary analysis on timing (Ann Surg Oncol 2024): abstract.
 * - Evidence map on patient precautions (Med Oncol 2024, prepared for the 2023 ACS/LANA Lymphedema Summit): full text
 *   from Europe PMC (PMC11486782).
 * - ACS/LANA Summit expert consensus on risk reduction practices (Med Oncol 2024): abstract only; no full text open.
 * - ASBrS expert panel recommendations, parts 1 and 2 (Ann Surg Oncol 2017): Europe PMC holds no abstract; not read.
 * - International Society of Lymphology 2023 consensus document (Lymphology 2023): abstract read; it gives no
 *   recommendation that a step here rests on.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const lymphoedemaRiskReductionSurveillanceAndTreatment = protocol({
  id: "lymphoedema-risk-reduction-surveillance-and-treatment",
  name: "Lymphoedema after breast cancer: surveillance, early compression and treatment",
  aka: ["breast cancer-related lymphoedema", "BCRL", "prospective surveillance for lymphoedema", "bioimpedance spectroscopy", "L-Dex", "arm precautions after lymph node surgery", "complete decongestive therapy"],
  domain: "survivorship",
  tldr: "After surgery or radiotherapy to the lymph nodes in the armpit, fluid can build up and make the arm swell. Measuring the arm before surgery and at regular check-ups afterwards can find swelling before you can see it, when a compression sleeve for a few weeks may stop it becoming permanent. Exercise, including weights built up gradually, is safe. The old advice never to have blood pressure taken or blood tests on that arm is not well supported by research. Tell your team about heaviness, tightness or swelling in the arm, hand or chest.",
  simple: "Your arm can swell after breast cancer treatment. Regular measuring finds it early, and a sleeve can help. Exercise is safe.",
  summary: "The APTA interventions guideline (2020) recommends prospective surveillance in high-risk groups (Grade C): a preoperative measurement with bioimpedance spectroscopy or volume, then every 3 months for the first year and twice a year for up to 5 years. Subclinical (ISL stage 0) lymphoedema may be treated with education, self-massage and compression garments (Grade C), escalating to complete decongestive therapy (CDT) if it persists. For early (stage I) lymphoedema, an individually fitted compression garment, an exercise programme and education are first-line (Grade A); CDT is used for moderate and late lymphoedema (stages II and III, Grade B), followed by home care with self-massage, a fitted garment and exercise (Grade B). Supervised progressive resistance training from at least one month after surgery is safe (Grade A).\n\nIn the PREVENT trial (963 randomised, 879 analysed), surveillance by bioimpedance spectroscopy triggered a four-week compression sleeve less often than tape measurement (20.1 against 27.5 per cent), and fewer of those treated progressed to chronic lymphoedema needing CDT (7.9 against 19.2 per cent, relative risk 0.41). New cases kept appearing in years two and three, so the authors advise monitoring for at least three years. The APTA diagnosis guideline (2017) set bioimpedance cut-offs of an L-Dex above 7.1 without a baseline or more than 10 above baseline (Grade B); its authors updated the bioimpedance advice in 2018, which was not read. On the traditional precautions, a 2024 evidence map prepared for the American Cancer Society and Lymphology Association of North America summit found the evidence sufficient to refute many of the previously claimed risk factors, and called a 'just in case' approach to education possibly inappropriate.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "People treated for breast cancer with surgery, axillary node surgery or radiotherapy, or taxane chemotherapy, as in PREVENT and the APTA guidelines. The guidelines read are limited to upper-limb breast cancer-related lymphoedema; lymphoedema after gynaecological, melanoma, head and neck and other cancers has less evidence and is not covered here.",
  trigger: "Before breast or axillary surgery (baseline), then at follow-up for at least three years; and whenever arm, hand or chest swelling, heaviness or tightness is reported.",
  steps: [
    {
      action: "Measure both arms before surgery, with bioimpedance spectroscopy or limb volume, as a baseline",
      why: "Small changes are only meaningful against the person's own starting point.",
      source: "apta-2020",
      quote: "Monitoring with bioelectric impedance spectroscopy or volume measures may begin with a preoperative assessment, repeated every 3 months for the first year postoperatively, and then biannually for up to 5 years. (Grade C)",
      grade: "Grade C",
    },
    {
      action: "Repeat the measurement every 3 months for the first year after surgery, then every 6 months, for at least 3 and up to 5 years, using the same method each time",
      why: "Most early swelling appears within the first nine months, but new cases keep appearing in years two and three; changing methods makes readings incomparable.",
      source: "prevent-timing-2024",
      quote: "Patients should continue to be monitored for a minimum of 3 years following completion of cancer treatment. Specifically, careful targeted monitoring over the initial 9-month period is important.",
    },
    {
      action: "Ask at each visit about swelling, heaviness and numbness in the arm, and investigate them",
      why: "What the person feels often comes before a measurable change.",
      source: "apta-dx-2017",
      quote: "Self-reported symptoms of swelling, heaviness, and numbness should be investigated for early diagnosis (Grade B)",
      grade: "Grade B",
    },
    {
      action: "For subclinical swelling found on surveillance, start a compression sleeve and gauntlet (in PREVENT, 12 hours a day for 4 weeks), with education and self-massage; escalate to decongestive therapy if it persists or progresses",
      why: "Treating swelling before it is visible lowered the chance of it becoming long-lasting in a randomised trial.",
      source: "prevent-2022",
      quote: "S-BCRL detection triggered a 4-week, 12-hour per day, compression sleeve, and gauntlet intervention.",
    },
    {
      action: "For early visible lymphoedema, fit a compression garment individually, teach an exercise programme and give education as first-line treatment",
      why: "A well-fitted garment with exercise controls early swelling for most people.",
      source: "apta-2020",
      quote: "If early signs and/or symptoms of lymphedema are noted, the patient should be individually fitted with a compression garment, instructed in an exercise program, and provided education as first-line treatment. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For moderate or late lymphoedema, give complete decongestive therapy with compression bandaging and exercise, then a home programme of self-massage, a fitted garment, night compression if needed, and exercise",
      why: "Bandaging reduces the swelling; the home programme keeps it down.",
      source: "apta-2020",
      quote: "CDT should be used to reduce limb volume in those diagnosed with moderate and late BCRL. (Grade B) • Compression bandaging and exercise are key components of CDT and should be used. (Grade A)",
      grade: "Grade B (CDT); Grade A (bandaging and exercise within CDT)",
    },
    {
      action: "Encourage aerobic exercise and supervised, progressive resistance training from at least one month after surgery, with weekly checks at first",
      why: "Lifting weights, built up gradually, does not cause or worsen lymphoedema and improves strength.",
      source: "apta-2020",
      quote: "Progressive resistance training is safe when an individualized program is supervised beginning at least 1 month postsurgery. (Grade A) Individualized aerobic exercise programs should be provided. (Grade A) Monitoring for exercise tolerance and adverse effects should initially occur at least weekly and then taper according to clinical presentation. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "Give risk-reduction advice that matches the evidence: protect the skin and treat infection promptly, rather than forbidding all blood pressure readings, blood tests or flights by rule",
      why: "Skin infection (cellulitis) is a proven risk; many of the traditional prohibitions are not supported by research and can make people anxious.",
      source: "precautions-2024",
      quote: "Patient education about precautionary risks needs to be concordant with what is currently evidenced in the literature.",
    },
  ],
  bestInClass: {
    statement: "Prospective surveillance from a preoperative baseline, with a compression sleeve when subclinical change appears, is the best-supported approach: APTA 2020 recommends it (Grade C, because the evidence then was mostly observational) and the PREVENT randomised trial (2022) showed bioimpedance-triggered compression reduced progression to chronic lymphoedema against tape-measure-triggered compression. Treatment of established lymphoedema follows APTA 2020 by stage (Grade A for garment, exercise and education in early disease; Grade B for CDT later). On the arm precautions, the 2024 summit evidence map and consensus move away from blanket prohibitions; the 2017 ASBrS panel, which also addressed them, could not be read, so the two cannot be set side by side here.",
    sources: ["apta-2020", "prevent-2022", "prevent-timing-2024", "apta-dx-2017", "precautions-2024", "summit-consensus-2024", "asbrs-2017"],
  },
  variants: [
    {
      name: "Traditional arm precautions (no blood pressure, blood draws, injections or cannulas in the at-risk arm; compression for flights)",
      differs: "Teaches every person at risk to avoid any procedure or exposure on the treated side, for life.",
      evidence: "Common practice. The 2024 evidence map (37 studies, 2008 to 2023) found evidence sufficient to refute many previously claimed risk factors for developing lymphoedema, and little evidence either way on progression once it exists. The 2024 ACS/LANA consensus updated recommendations on blood pressure, skin puncture, blood draws, air travel and heat; its specific wording could not be read (abstract only).",
      sources: ["precautions-2024", "summit-consensus-2024"],
    },
    {
      name: "Tape-measure surveillance instead of bioimpedance",
      differs: "Circumference measured with a tape at set points, converted to volume, instead of a bioimpedance device.",
      evidence: "In PREVENT, tape measurement triggered intervention more often (27.5 against 20.1 per cent) and more of those treated progressed (19.2 against 7.9 per cent). Tape measurement needs no device and is widely available.",
      sources: ["prevent-2022"],
    },
    {
      name: "Prospective surveillance plus a supervised exercise programme",
      differs: "Adds a 12-week supervised multimodal exercise programme to surveillance in high-risk women having adjuvant chemotherapy.",
      evidence: "Single-centre randomised trial of 116 women: the combination reduced arm volume and improved grip strength, walking distance and quality of life over surveillance alone. Read as an abstract.",
      sources: ["apmr-2025"],
    },
  ],
  grades: [
    { claim: "Prospective surveillance in high-risk groups", grade: "Grade C", source: "apta-2020", quote: "Early identification of subclinical lymphedema in high-risk groups through prospective surveillance may improve outcomes. (Grade C)" },
    { claim: "Bioimpedance cut-offs for diagnosis", grade: "Grade B", source: "apta-dx-2017", quote: "Cutpoint of >7.1 L-Dex score should be used for diagnosis of breast cancer–related lymphedema when preoperative baseline measures are not available (Grade B) – Cutpoint of >10 L-Dex score above preoperative baseline should be used for diagnosis of breast cancer–related lymphedema (Grade B)" },
    { claim: "Bioimpedance-triggered compression reduced progression against tape measure", grade: "randomised trial, P = 0.016", source: "prevent-2022", quote: "Overall, 14.4% ( n = 30) progressed post-intervention, with reduced likelihood for BIS patients than TM patients (7.9%, n  = 7 vs. 19.2%, n  = 23; relative risk = 0.41; 95% CI, 0.13-0.81; absolute reduction 11.3%; 95% CI, 2.3-20.3; p  = 0.016)." },
    { claim: "Manual lymphatic drainage after axillary dissection does not clearly prevent lymphoedema", grade: "Grade C", source: "apta-2020", quote: "The addition of therapist-provided manual lymphatic drainage (MLD) to the postoperative care plan may not reduce the risk of developing BCRL. (Grade C)" },
  ],
  sources: [
    { key: "apta-2020", label: "Interventions for Breast Cancer-Related Lymphedema: Clinical Practice Guideline From the Academy of Oncologic Physical Therapy of APTA", publisher: "APTA Academy of Oncologic Physical Therapy, Physical Therapy", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7412854/", doi: "10.1093/ptj/pzaa087", gradingScheme: "Grade A (strong) to D (theoretical), plus Best Practice and Expert Opinion statements.", read: "full-text", accessed: "2026-11-11" },
    { key: "apta-dx-2017", label: "Diagnosis of Upper Quadrant Lymphedema Secondary to Cancer: Clinical Practice Guideline From the Oncology Section of the American Physical Therapy Association", publisher: "APTA Oncology Section, Physical Therapy", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5803775/", doi: "10.1093/ptj/pzx050", gradingScheme: "Grade A (strong: Level I studies) to D (theoretical), plus Expert Opinion.", read: "full-text", accessed: "2026-11-11" },
    { key: "prevent-2022", label: "A Comparison of Bioimpedance Spectroscopy or Tape Measure Triggered Compression Intervention in Chronic Breast Cancer Lymphedema Prevention (PREVENT)", publisher: "Lymphatic Research and Biology", year: 2022, url: "https://europepmc.org/abstract/MED/35099283", doi: "10.1089/lrb.2021.0084", read: "abstract", accessed: "2026-11-11" },
    { key: "prevent-timing-2024", label: "Timing of Breast Cancer Related Lymphedema Development Over 3 Years: Observations from a Large, Prospective Randomized Screening Trial Comparing Bioimpedance Spectroscopy Versus Tape Measure", publisher: "Annals of Surgical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38965099", doi: "10.1245/s10434-024-15706-x", read: "abstract", accessed: "2026-11-11" },
    { key: "precautions-2024", label: "Current evidence on patient precautions for reducing breast cancer-related lymphedema manifestation and progression risks", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11486782/", doi: "10.1007/s12032-024-02408-3", gradingScheme: "Evidence map of 37 studies; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "summit-consensus-2024", label: "Evidence-based recommendations regarding risk reduction practices for people at risk of or with breast cancer-related lymphedema: consensus from an expert panel", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://europepmc.org/abstract/MED/39438352", doi: "10.1007/s12032-024-02510-6", read: "abstract", accessed: "2026-11-11" },
    { key: "apmr-2025", label: "Randomized Trial Assessing Prospective Surveillance and Exercise for Preventing Breast Cancer-Related Lymphedema in High-Risk Patients", publisher: "Archives of Physical Medicine and Rehabilitation", year: 2025, url: "https://europepmc.org/abstract/MED/40081785", doi: "10.1016/j.apmr.2025.03.002", read: "abstract", accessed: "2026-11-11" },
    { key: "asbrs-2017", label: "Considerations for Clinicians in the Diagnosis, Prevention, and Treatment of Breast Cancer-Related Lymphedema: Recommendations from a Multidisciplinary Expert ASBrS Panel, Parts 1 and 2", publisher: "American Society of Breast Surgeons, Annals of Surgical Oncology", year: 2017, url: "https://doi.org/10.1245/s10434-017-5982-4", doi: "10.1245/s10434-017-5982-4", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-lymphoedema-prospective-surveillance", "idea-upgrade-evidence-based-arm-precautions-after-breast-cancer"],
  gaps: [
    "The 2018 update to the APTA bioimpedance recommendations was not read (Europe PMC holds only the title), so the L-Dex cut-offs given here are the 2017 ones and may have been revised.",
    "The ACS/LANA 2024 consensus was read only as an abstract; its specific wording on blood pressure, blood draws, injections, air travel and heat is not given here.",
    "The ASBrS 2017 expert panel recommendations could not be read: Europe PMC holds no abstract.",
    "PREVENT was read only as abstracts; its exact measurement thresholds for triggering compression are not given here.",
    "No UK guideline (British Lymphology Society, NICE) was read; NICE breast cancer guidance was not checked for lymphoedema surveillance in this round.",
    "Lymphoedema after gynaecological, melanoma, and head and neck cancers is not covered by the guidelines read.",
  ],
  technologies: ["lymphoedema-decongestive-therapy", "lymphoedema-surgery-and-early-detection", "rejuv-measure-lymphoedema", "pneumatic-compression-lymphoedema"],
  cancers: ["breast-cancer"],
  terms: ["breast-cancer-related-lymphoedema", "lymphoedema-after-breast-cancer"],
  related: ["exercise-during-and-after-cancer-treatment", "breast-cancer-follow-up-after-treatment"],
  sections: ["supportive-care"],
  tags: ["protocol", "lymphoedema", "survivorship", "breast-cancer"],
});
