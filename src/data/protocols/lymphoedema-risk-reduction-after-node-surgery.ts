import { protocol } from "./helpers";

/*
 * Reducing the risk of arm lymphoedema after lymph node surgery or radiotherapy for breast cancer, and watching for it
 * early (prospective surveillance), including which everyday "precautions" the evidence supports.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - MASCC clinical practice guidance for the prevention of breast cancer-related arm lymphoedema (Wong et al.,
 *   eClinicalMedicine 2024): full text, Europe PMC XML (PMC10850412). Delphi consensus statements with the percentage
 *   agreement printed after each.
 * - Academy of Oncologic Physical Therapy of APTA clinical practice guideline, Interventions for Breast Cancer-Related
 *   Lymphedema (Davies et al., Phys Ther 2020): full text, Europe PMC XML (PMC7412854). Grades A to C and Best
 *   Practice printed after each recommendation.
 * - American Cancer Society / Lymphology Association of North America summit consensus on risk reduction practices
 *   (Med Oncol 2024, the census source): abstract only; no open full text.
 * - Ferguson et al., blood draws, injections, blood pressure and air travel and arm volume (J Clin Oncol 2016) and the
 *   PAL weight lifting trial (Schmitz et al., JAMA 2010): abstracts (the PMC full text of the first could not be
 *   downloaded).
 * - Martinez-Jaimez et al., international Delphi consensus on BCRL prevention (Eur J Cancer Care 2022): abstract only.
 * - Not read: the ISL consensus document, NCCN survivorship guideline and British Lymphology Society guidance (no
 *   open text fetched); named in gaps.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const lymphoedemaRiskReductionAfterNodeSurgery = protocol({
  id: "lymphoedema-risk-reduction-after-node-surgery",
  name: "Arm lymphoedema after breast cancer node surgery: risk reduction and early surveillance",
  aka: ["lymphedema risk reduction", "lymphoedema precautions", "prospective surveillance for lymphoedema", "arm care after axillary surgery", "breast cancer-related lymphoedema prevention", "BCRL prevention"],
  domain: "survivorship",
  tldr: "After lymph nodes are removed from the armpit, or the armpit is treated with radiotherapy, the arm can swell (lymphoedema). The best protection is to have the arm measured before surgery and every few months afterwards, so swelling is caught and treated early with a compression sleeve. Exercise, including weight training built up gradually, is safe. Infection in the arm raises the risk, but blood tests, injections, blood pressure cuffs and flying have not been shown to.",
  simple: "Ask to have both arms measured before surgery and at check-ups for at least two years. Tell your team at once about swelling, heaviness or tightness in the arm, or redness and heat that could be infection. Keep exercising.",
  summary: "MASCC 2024 (Delphi, 55 experts, statements based on randomised trials and systematic reviews): prioritise people with axillary node dissection, axillary radiotherapy, early relative arm volume increase, many nodes removed and BMI of 30 or more; run prospective surveillance where resources allow (93.8% agreement), with a pre-surgical baseline, starting within 3 months of surgery, every 3 to 4 months in year 1 then every 6 to 12 months for at least 24 months; bioimpedance spectroscopy (L-Dex rise of 6.5 or more) or a 5 to under 10% volume increase or any arm symptom triggers a compression sleeve for at least 4 to 6 weeks; 10% or more triggers more intensive treatment; prophylactic compression sleeves, axillary reverse mapping and prophylactic lymphatic reconstruction are options where expertise and resources allow. APTA 2020: supervised progressive resistance training from at least 1 month after surgery is safe (Grade A), aerobic exercise should be provided (Grade A), prospective surveillance may improve outcomes (Grade C), therapist manual lymphatic drainage may not reduce risk (Grade C), and a fitted compression garment for high-risk patients with exercise may reduce it (Grade B). In a 3,041-measurement cohort, blood draws, injections, blood pressure readings and flights were not associated with arm volume increase, while cellulitis was a risk. PAL (n=154): slowly progressive weight lifting did not increase lymphoedema.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "community"],
  },
  population: "Adults after axillary lymph node surgery (sentinel node biopsy or axillary dissection) or axillary radiotherapy for breast cancer. The sources read are about the arm after breast cancer; leg lymphoedema after groin node surgery for vulval, cervical, endometrial, penile cancer or melanoma has too little evidence for its own recommendations (ACS/LANA 2024), and the breast steps should not be assumed to transfer without the team's advice.",
  trigger: "A plan for axillary surgery or radiotherapy, and the two years or more after it.",
  steps: [
    {
      action: "Identify who is at highest risk: axillary node dissection, axillary radiotherapy, an early increase in arm volume, many nodes removed, and a high body mass index",
      why: "Prevention and surveillance can be concentrated on the people most likely to develop swelling.",
      source: "mascc-2024",
      quote: "Axillary lymph node dissection, use of post-operative radiotherapy, relative within-arm volume increase one month after surgery, greater number of lymph nodes dissected, and high body mass index were recommended as the most important risk factors to guide selection of patients for interventions to prevent BCRAL.",
      grade: "Delphi consensus (MASCC)",
    },
    {
      action: "Measure both arms before surgery to give a baseline",
      why: "Small changes can only be seen against the arm's own size before treatment.",
      source: "mascc-2024",
      quote: "2.11 Pre-surgical assessment of lymphoedema is required in a prospective surveillance program for better comparison of measurements after surgery Consensus achieved in round 1 89.1% (57/64)",
      grade: "Consensus 89.1%",
    },
    {
      action: "Run prospective surveillance: start within 3 months of surgery, every 3 to 4 months in the first year, then every 6 to 12 months, for at least 24 months",
      why: "Lymphoedema caught early, before it is visible, can often be reversed; once chronic it cannot be cured.",
      source: "mascc-2024",
      quote: "2.12 The surveillance interval for a prospective surveillance program is recommended to be every 3–4 months in the first year then every 6–12 months thereafter where feasible and resources allow Consensus achieved in round 1 85.9% (55/64)",
      grade: "Consensus 85.9% (interval); 82.8% (start within 3 months); 89.1% (at least 24 months)",
    },
    {
      action: "Measure with bioimpedance spectroscopy where available, or arm circumference or volume where it is not",
      why: "Bioimpedance detects fluid build-up before the arm looks swollen; a tape measure still works when a machine is not available.",
      source: "mascc-2024",
      quote: "2.3 In a prospective surveillance program, arm circumference (or volumetric) or lymphangiography/lymphoscintigraphy measurement is an alternative method to identify patients with subclinical/early stage lymphoedema for early treatment when bioimpedance spectroscopy is not available or there are resource limitations Consensus achieved in round 1 82.8% (53/64)",
      grade: "Consensus 82.8% (alternatives); 89.8% (bioimpedance as an option)",
    },
    {
      action: "Start treatment when L-Dex rises by 6.5 or more, arm volume rises by 5 to under 10%, or the person reports swelling, heaviness, tightness or numbness: a fitted compression sleeve for at least 4 to 6 weeks",
      why: "A sleeve worn early reduced progression to lasting lymphoedema in a randomised trial.",
      source: "mascc-2024",
      quote: "2.17 When subclinical/early stage lymphoedema is detected in a prospective surveillance program, compression sleeves are suggested to be prescribed for at least 4–6 weeks. A longer duration can be considered depending on clinical response and the individual judgement of the treating therapist. Consensus achieved in round 2 96.2% (50/52)",
      grade: "Consensus 96.2%",
    },
    {
      action: "Refer for more intensive treatment such as complete decongestive therapy when arm volume has risen by 10% or more",
      why: "Larger swelling needs specialist lymphoedema treatment rather than a sleeve alone.",
      source: "mascc-2024",
      quote: "2.8 In a prospective surveillance program, more intensive treatment (e.g., congestive decompressive therapy) is indicated when a difference in volume measurements is ≥ 10% compared to pre-surgery values Consensus achieved in round 2 91.7% (44/48)",
      grade: "Consensus 91.7%",
    },
    {
      action: "Encourage exercise: supervised, gradually progressed resistance training from at least a month after surgery, and aerobic exercise",
      why: "Weight training built up slowly does not cause lymphoedema and brings the usual benefits of exercise.",
      source: "apta-2020",
      quote: "Progressive resistance training is safe when an individualized program is supervised beginning at least 1 month postsurgery. ( Grade A )",
      grade: "Grade A",
    },
    {
      action: "Teach the person to look after the skin of the arm and to seek treatment quickly for redness, heat or other signs of infection",
      why: "Cellulitis in the at-risk arm was linked to arm swelling in a large cohort.",
      source: "ferguson-2016",
      quote: "This study suggests that although cellulitis increases risk of lymphedema, ipsilateral blood draws, injections, blood pressure readings, and air travel may not be associated with arm volume increases.",
      grade: "Prospective cohort (not a guideline grade)",
    },
  ],
  bestInClass: {
    statement: "Prospective surveillance with a pre-surgical baseline and early compression for subclinical swelling is the best-supported approach (MASCC 2024 consensus on trial evidence; APTA 2020 Grade C for surveillance, Grade A for the safety of exercise). The ACS/LANA 2024 summit consensus updated the old blanket precautions on the same evidence: blood draws, injections, blood pressure readings and air travel were not associated with arm volume increase in the largest cohort, whereas infection was. MASCC and APTA differ on prophylactic sleeves: MASCC offers them as an option to anyone at risk, while APTA grades a fitted garment for high-risk patients, paired with exercise, at B.",
    sources: ["mascc-2024", "apta-2020", "acs-lana-2024", "ferguson-2016"],
  },
  variants: [
    {
      name: "Avoiding blood pressure cuffs, needles and blood tests in the treated arm",
      differs: "Tells everyone treated to keep the at-risk arm free of blood pressure cuffs, injections and blood draws for life.",
      evidence: "A long-standing precaution; in the Ferguson cohort none of these, nor flying, was associated with arm volume increase. The ACS/LANA 2024 consensus addresses each of them and its full recommendations could not be read here.",
      sources: ["ferguson-2016", "acs-lana-2024"],
    },
    {
      name: "Prophylactic compression sleeve for everyone at high risk",
      differs: "Fits a sleeve from the first day after surgery until 3 months after the end of chemotherapy or radiotherapy (not hormone therapy), at least 8 hours a day.",
      evidence: "Offered as an option by MASCC 2024 (80% agreement, on a single randomised trial; experts who disagreed said one trial should not set routine practice); APTA 2020 Grade B for a fitted garment with exercise in high-risk patients.",
      sources: ["mascc-2024", "apta-2020"],
    },
    {
      name: "Preventive manual lymphatic drainage",
      differs: "Adds therapist-delivered lymphatic drainage massage after surgery to prevent lymphoedema.",
      evidence: "APTA 2020: may not reduce the risk (Grade C).",
      sources: ["apta-2020"],
    },
    {
      name: "Surgical prevention: axillary reverse mapping and prophylactic lymphatic reconstruction",
      differs: "Spares the arm's lymphatics during dissection, or joins divided lymphatics to a vein at the time of dissection.",
      evidence: "MASCC 2024: an option where expertise is available and resources allow; reverse mapping not for people at high risk of axillary recurrence.",
      sources: ["mascc-2024"],
    },
    {
      name: "APTA surveillance schedule",
      differs: "Measures every 3 months in the first year and then twice a year for up to 5 years.",
      evidence: "APTA 2020, Grade C; MASCC 2024 sets at least 24 months.",
      sources: ["apta-2020"],
    },
  ],
  grades: [
    { claim: "Prospective surveillance is recommended where feasible", grade: "Consensus 93.8% (MASCC)", source: "mascc-2024", quote: "2.1 A prospective surveillance program is recommended to reduce risks of chronic lymphoedema after breast cancer surgery where feasible and resources allow Consensus achieved in round 1 93.8% (60/64)" },
    { claim: "Prospective surveillance may improve outcomes", grade: "Grade C (APTA)", source: "apta-2020", quote: "Early identification of subclinical lymphedema in high-risk groups through prospective surveillance may improve outcomes. (Grade C)" },
    { claim: "Prophylactic sleeves offered as an option", grade: "Consensus 80% (MASCC)", source: "mascc-2024", quote: "3.1 Prophylactic compression sleeves should be offered as an option to prevent breast cancer- related arm lymphoedema Consensus achieved in round 2 80% (40/50)" },
    { claim: "Fitted compression garment with exercise for high-risk patients", grade: "Grade B (APTA)", source: "apta-2020", quote: "Provision of a fitted compression garment to patients at high risk of developing lymphedema, when paired with upper extremity exercise and diaphragmatic breathing, may reduce development of lymphedema. (Grade B)" },
    { claim: "Manual lymphatic drainage may not prevent lymphoedema", grade: "Grade C (APTA)", source: "apta-2020", quote: "The addition of therapist-provided manual lymphatic drainage (MLD) to the postoperative care plan may not reduce the risk of developing BCRL. (Grade C)" },
    { claim: "Weight lifting does not increase lymphoedema", grade: "Randomised equivalence trial, n=154 (PAL)", source: "pal-2010", quote: "In breast cancer survivors at risk for lymphedema, a program of slowly progressive weight lifting compared with no exercise did not result in increased incidence of lymphedema." },
    { claim: "Evidence too thin for other cancers", grade: "Consensus statement (ACS/LANA)", source: "acs-lana-2024", quote: "More high-quality evidence is required to allow the development of risk reduction recommendations for other cancer types such as gynecological, melanoma, and head and neck." },
  ],
  sources: [
    { key: "mascc-2024", label: "Wong et al., MASCC clinical practice guidance for the prevention of breast cancer-related arm lymphoedema: international Delphi consensus-based recommendations (eClinicalMedicine 2024)", publisher: "Multinational Association of Supportive Care in Cancer", year: 2024, url: "https://doi.org/10.1016/j.eclinm.2024.102441", doi: "10.1016/j.eclinm.2024.102441", gradingScheme: "Modified Delphi; each statement printed with the round and percentage agreement (consensus at 75% or more).", read: "full-text", accessed: "2026-11-11" },
    { key: "apta-2020", label: "Davies et al., Interventions for Breast Cancer-Related Lymphedema: Clinical Practice Guideline From the Academy of Oncologic Physical Therapy of APTA (Phys Ther 2020)", publisher: "Academy of Oncologic Physical Therapy, American Physical Therapy Association", year: 2020, url: "https://doi.org/10.1093/ptj/pzaa087", doi: "10.1093/ptj/pzaa087", gradingScheme: "Grade A (strong evidence) to D, plus Best Practice for expert consensus, printed after each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "acs-lana-2024", label: "Evidence-based recommendations regarding risk reduction practices for people at risk of or with breast cancer-related lymphedema: consensus from an expert panel (Med Oncol 2024)", publisher: "American Cancer Society / Lymphology Association of North America Lymphedema Summit", year: 2024, url: "https://doi.org/10.1007/s12032-024-02510-6", doi: "10.1007/s12032-024-02510-6", gradingScheme: "Expert consensus on the evidence; grades not visible in the abstract.", read: "abstract", accessed: "2026-11-11" },
    { key: "ferguson-2016", label: "Ferguson et al., Impact of Ipsilateral Blood Draws, Injections, Blood Pressure Measurements, and Air Travel on the Risk of Lymphedema for Patients Treated for Breast Cancer (J Clin Oncol 2016)", publisher: "Journal of Clinical Oncology", year: 2016, url: "https://doi.org/10.1200/JCO.2015.61.5948", doi: "10.1200/JCO.2015.61.5948", gradingScheme: "Prospective cohort; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
    { key: "pal-2010", label: "Schmitz et al., Weight Lifting for Women at Risk for Breast Cancer-Related Lymphedema: a randomized trial (JAMA 2010)", publisher: "JAMA", year: 2010, url: "https://doi.org/10.1001/jama.2010.1837", doi: "10.1001/jama.2010.1837", gradingScheme: "Randomised controlled equivalence trial; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
  ],
  cancers: ["breast-cancer"],
  technologies: ["sentinel-node"],
  terms: ["lymphoedema-after-breast-cancer"],
  related: ["idea-acc-lymphoedema-prospective-surveillance", "sentinel-node-tracers-and-blue-dye-safety", "lymphoedema-decongestive-therapy", "rejuv-measure-lymphoedema", "lymphoedema-surgery-and-early-detection"],
  upgrades: [],
  gaps: [
    "The ACS/LANA 2024 risk-reduction consensus could be read only as its abstract, so its specific recommendations on blood pressure, needles, air travel, heat and saunas are not reproduced here.",
    "The International Society of Lymphology consensus, the NCCN survivorship guideline and British Lymphology Society guidance were not read.",
    "There is too little evidence for leg lymphoedema after groin node surgery (vulval, cervical, endometrial, penile cancer, melanoma) to set out its own steps (ACS/LANA 2024).",
    "Which surveillance method is best (bioimpedance or measurement) and the right threshold are not settled; MASCC accepts both.",
    "Whether prophylactic sleeves help everyone at risk rests on one randomised trial with one year of follow-up (MASCC 2024).",
  ],
});
