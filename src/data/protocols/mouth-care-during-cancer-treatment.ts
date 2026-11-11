import { protocol } from "./helpers";

/*
 * Mouth care at home during chemotherapy and other cancer treatment, to prevent and soothe a sore mouth (oral
 * mucositis), with the preventive treatments a team may add for particular regimens.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Elad et al.,
 *   Cancer 2020): full text, Europe PMC XML (PMC7540329). Guideline statements and levels of evidence quoted from Table
 *   1. A 2021 erratum exists (Cancer 2021, PMC8565669) and was not read. No newer MASCC/ISOO mucositis guideline was
 *   found in Europe PMC (searched 2021 to 2026).
 * - NCI, Chemotherapy and You (NIH Publication No. 24-7157, January 2024): full text, PDF from cancer.gov with
 *   pdftotext.
 * - Paediatric guideline for preventing oral mucositis (Eur J Cancer 2021): title seen in Europe PMC, not read.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const mouthCareDuringCancerTreatment = protocol({
  id: "mouth-care-during-cancer-treatment",
  name: "Mouth care at home during chemotherapy and head and neck radiotherapy",
  aka: ["oral care during chemotherapy", "mouth sores from chemo", "oral mucositis prevention", "mouthwash during chemotherapy", "salt and baking soda mouth rinse", "oral cryotherapy", "ice chips during chemotherapy", "basic oral care"],
  domain: "symptom-management",
  tldr: "Chemotherapy and radiotherapy to the head and neck can make the mouth sore. See a dentist before treatment if you can, check your mouth every day, brush gently with a very soft brush after meals and at bedtime, rinse with a bland salt and baking soda rinse rather than an alcohol mouthwash, keep your mouth moist, and tell your team early if it hurts or you see sores or white patches.",
  simple: "Look in your mouth every day. Brush gently with a soft toothbrush. Rinse with salty water a few times a day and avoid mouthwash with alcohol. Sip water to keep your mouth moist. Call your team if your mouth is very sore or you cannot eat or drink.",
  summary: "MASCC/ISOO (2020) suggests multiagent combination oral care protocols (brushing, flossing and bland rinses, delivered with education) to prevent mucositis during chemotherapy, head and neck radiotherapy and stem cell transplant (suggestion, level III). It found too little evidence for a guideline on saline or bicarbonate rinses, professional oral care or patient education alone, but its expert opinion supports bland rinses for hygiene and comfort, dental evaluation before treatment, and patient education. It suggests against chlorhexidine to prevent mucositis in head and neck radiotherapy. For specific regimens it recommends 30 minutes of oral cryotherapy (ice chips) during bolus 5-FU (level II) and before high-dose melphalan for autologous transplant (level II); benzydamine mouthwash for head and neck radiotherapy up to 50 Gy (level I) and suggests it with chemoradiotherapy (level II); intraoral photobiomodulation for transplant and head and neck radiotherapy (levels I and II); and topical 0.2% morphine mouthwash for mucositis pain in head and neck chemoradiotherapy (suggestion, III). The NCI patient guide (2024) gives the home routine: dentist at least two weeks before, check the mouth daily, extra-soft brush after meals and at bedtime, fluoride toothpaste, no alcohol mouthwash, a baking soda and salt rinse three to four times a day, gentle flossing (ask if platelets are low), keep the mouth moist, soft cool foods, and call if it hurts a lot.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["home", "chemotherapy-day-unit", "radiotherapy-department", "ward"],
  },
  population: "Adults having chemotherapy, radiotherapy to the head and neck, or a stem cell transplant. Children have their own guideline (not read here). The preventive treatments in the later steps apply only to the regimens named.",
  trigger: "Starting chemotherapy, head and neck radiotherapy or a stem cell transplant.",
  steps: [
    {
      action: "See a dentist before treatment starts, ideally at least two weeks before, and have any needed dental work done",
      why: "Bad teeth or gums can become a source of infection when blood counts are low, and dental work is harder once treatment has started.",
      source: "nci-2024",
      quote: "Visit a dentist at least two weeks before starting chemotherapy.",
      grade: "Not graded (patient guide); MASCC/ISOO expert opinion supports dental evaluation before treatment",
    },
    {
      action: "Follow a combined daily oral care routine: brushing, flossing and bland rinses, taught by the team",
      why: "Keeping the mouth clean lowers the germ load and may make sores fewer and milder.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during CT.",
      grade: "Suggestion, LoE III",
    },
    {
      action: "Check your mouth and tongue every day and tell the team at once about sores, white spots or signs of infection",
      why: "Sores and thrush are easier to treat when caught early.",
      source: "nci-2024",
      quote: "Check your mouth and tongue every day.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Brush teeth, gums and tongue after each meal and at bedtime with an extra-soft toothbrush and fluoride toothpaste; use a sponge swab if brushing hurts",
      why: "Gentle, frequent cleaning removes food and germs without damaging the lining of the mouth.",
      source: "nci-2024",
      quote: "Brush your teeth, gums, and tongue after each meal and at bedtime.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Do not use mouthwash containing alcohol; rinse three to four times a day with a bland rinse of baking soda and salt in warm water, then plain water",
      why: "Alcohol stings and dries a sore mouth; a bland rinse washes the mouth and is soothing.",
      source: "nci-2024",
      quote: "Do not use mouthwash that has alcohol. Instead, rinse your mouth three to four times a day with a solution of baking soda, salt, and warm water followed by a plain water rinse.",
      grade: "Not graded (patient guide); MASCC/ISOO: no guideline possible, expert opinion supports bland rinses",
    },
    {
      action: "Floss gently every day, avoiding gums that bleed or hurt, and ask the team about flossing when platelets are low",
      why: "Flossing keeps gums healthy, but low platelets make bleeding more likely.",
      source: "nci-2024",
      quote: "Ask your doctor or nurse about flossing if your platelet count is low.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Keep the mouth moist by sipping water, ice chips or sugar-free sweets, and ask about saliva substitutes for a persistently dry mouth",
      why: "A dry mouth is sore and more prone to infection and tooth decay.",
      source: "nci-2024",
      quote: "Ask your doctor or nurse about saliva substitutes if your mouth is always dry.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "When the mouth is sore, choose soft, moist, cool foods and avoid sharp, spicy, acidic or sugary foods, alcohol and tobacco",
      why: "Rough, hot or acidic food hurts and damages the sore lining further.",
      source: "nci-2024",
      quote: "Choose foods that are moist, soft, and easy to chew or swallow.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "With bolus 5-FU, hold ice chips in the mouth for 30 minutes during the infusion; with high-dose melphalan before an autologous transplant, use oral cryotherapy as the team directs",
      why: "Cold narrows the blood vessels in the mouth so less drug reaches the lining while levels are high.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends using 30 min of oral cryotherapy to prevent OM in patients receiving bolus 5‐FU CT during the infusion of the CT.",
      grade: "Recommendation, LoE II",
    },
    {
      action: "For head and neck radiotherapy, use benzydamine mouthwash if prescribed, and do not use chlorhexidine to prevent mucositis",
      why: "Benzydamine reduces inflammation and has trial evidence in this setting; chlorhexidine does not prevent mucositis in head and neck radiotherapy.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy).",
      grade: "Recommendation, LoE I",
    },
    {
      action: "Call the team if the mouth hurts a lot or you cannot eat or drink",
      why: "Severe mucositis may need prescribed pain relief, treatment for infection, feeding support or a change to treatment.",
      source: "nci-2024",
      quote: "Call your doctor, nurse, or dentist if your mouth hurts a lot.",
      grade: "Not graded (patient guide)",
    },
  ],
  bestInClass: {
    statement: "A taught, combined oral care routine (brushing, flossing, bland rinses) for everyone on chemotherapy, head and neck radiotherapy or transplant (MASCC/ISOO 2020, suggestion, level III), with dental assessment beforehand, daily self-checks and early reporting (NCI 2024; MASCC/ISOO expert opinion). Regimen-specific prevention is better supported than the general routine: 30 minutes of oral cryotherapy with bolus 5-FU and with high-dose melphalan (recommendation, level II), benzydamine in head and neck radiotherapy up to 50 Gy (recommendation, level I), and photobiomodulation in transplant and head and neck radiotherapy (recommendations, levels I and II). Saline and bicarbonate rinses have too little evidence for a guideline but are supported as bland and comforting; chlorhexidine is suggested against in head and neck radiotherapy.",
    sources: ["mascc-isoo-2020", "nci-2024"],
  },
  variants: [
    {
      name: "Chlorhexidine mouthwash",
      differs: "Uses an antiseptic chlorhexidine rinse as routine mouth care.",
      evidence: "MASCC/ISOO 2020 suggests that chlorhexidine not be used to prevent mucositis in head and neck radiotherapy (level III). It remains in use for other purposes, such as dental plaque control, in some local protocols.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Honey",
      differs: "Uses honey, topically or swallowed, to prevent mucositis.",
      evidence: "Suggested by MASCC/ISOO 2020 for head and neck radiotherapy or chemoradiotherapy only (level II); trials were small and used different honeys.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Photobiomodulation (low-level laser)",
      differs: "Shines low-level laser light inside the mouth on a set protocol to prevent mucositis.",
      evidence: "Recommended by MASCC/ISOO 2020 for adults having transplant conditioned with high-dose chemotherapy (level I), head and neck radiotherapy alone (level II) and head and neck chemoradiotherapy (level I), using one of its listed protocols; availability is limited.",
      sources: ["mascc-isoo-2020"],
    },
  ],
  grades: [
    { claim: "Combined oral care protocols to prevent mucositis during chemotherapy, head and neck radiotherapy and transplant", grade: "Suggestion, LoE III", source: "mascc-isoo-2020" },
    { claim: "Saline or bicarbonate rinses", grade: "No guideline possible, LoE III (expert opinion supports them as bland rinses)", source: "mascc-isoo-2020", quote: "No guideline was possible regarding the use of saline or sodium bicarbonate rinses in the prevention or treatment of OM in patients undergoing cancer therapy because of limited data." },
    { claim: "Chlorhexidine not used to prevent mucositis in head and neck radiotherapy", grade: "Suggestion against, LoE III", source: "mascc-isoo-2020", quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT." },
    { claim: "Oral cryotherapy with high-dose melphalan before autologous transplant", grade: "Recommendation, LoE II", source: "mascc-isoo-2020", quote: "The panel recommends using oral cryotherapy to prevent OM in patients undergoing autologous HSCT when the conditioning includes high‐dose melphalan." },
    { claim: "Benzydamine with head and neck chemoradiotherapy", grade: "Suggestion, LoE II", source: "mascc-isoo-2020", quote: "The panel suggests the use of benzydamine mouthwash for the prevention of OM in patients with H&N cancer who receive RT‐CT." },
    { claim: "Topical 0.2% morphine mouthwash for mucositis pain in head and neck chemoradiotherapy", grade: "Suggestion, LoE III", source: "mascc-isoo-2020", quote: "Topical morphine 0.2% mouthwash is suggested for the treatment of OM‐associated pain in patients with H&N cancer who receive RT‐CT." },
  ],
  sources: [
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy",
      publisher: "MASCC and ISOO (Cancer)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Level of evidence I to V (Somerfield and McCrae criteria); guideline determination: recommendation, suggestion, or no guideline possible; expert opinion added where no guideline was possible.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-2024",
      label: "Chemotherapy and You: Support for People Who Have Cancer (NIH Publication No. 24-7157)",
      publisher: "National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient guide; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  terms: ["mucositis"],
  technologies: [],
  related: [],
  upgrades: ["idea-upgrade-oral-cryotherapy-with-bolus-chemotherapy"],
  gaps: [
    "The evidence for the general oral care routine is weak (level III), and the exact recipe and frequency of bland rinses rest on practice rather than trials; the NCI recipe is one example among many.",
    "The 2021 erratum to the MASCC/ISOO guideline was not read; it may correct a statement used here.",
    "Children's mouth care follows a separate paediatric guideline (Eur J Cancer 2021), which was not read.",
    "Mouth sores from targeted drugs and immunotherapy are not separately addressed in what was read and are outside this record.",
  ],
});
