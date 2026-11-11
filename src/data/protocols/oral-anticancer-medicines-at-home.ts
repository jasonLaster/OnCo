import { protocol } from "./helpers";

/*
 * Oral anticancer medicines taken at home: how they are ordered and labelled, what patients and carers are taught, and
 * how adherence is supported and followed.
 *
 * What was read, and how (all on 11 November 2026, raw text in a scratch directory):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024): full text, from the Internet Archive's
 *   capture of ascopubs.org (the publisher refuses a script). Standards 2.3, 2.4, 3.10, 3.11.4 and 4.4.
 * - ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications (Belcher et al., Oncology Nursing Forum
 *   2022, PMC9303042): full text from the PMC XML. GRADE-based.
 * - Xeloda (capecitabine) EU summary of product characteristics: full text; cited for the handling instruction.
 * - The MASCC Oral Agent Teaching Tool review (2025, PMC11868222) was fetched but not used for any step.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const oralAnticancerMedicinesAtHome = protocol({
  id: "oral-anticancer-medicines-at-home",
  name: "Oral anticancer medicines at home: prescribing, teaching, adherence support and safe handling",
  aka: ["oral chemotherapy at home", "cancer tablets", "oral anticancer medication adherence", "OAM", "capecitabine at home", "missed dose of chemotherapy tablets", "oral SACT"],
  domain: "oral-anticancer-therapy",
  tldr: "Many cancer treatments are now tablets or capsules taken at home. Before you start, your team should give you a written plan: what to take, when, for how many days, what to do if you miss a dose, which foods and medicines to avoid, which side effects mean stopping and calling, and how to store, handle and dispose of the tablets. Many people find it hard to take every dose; support calls and check-ins help, so say if you are struggling.",
  simple: "Ask for a written plan for your cancer tablets: when to take them, what to do if you miss one, and when to stop and call. Do not crush or split them unless you are told you can.",
  summary: "ASCO-ONS (2024) sets the safety standards. Oral anticancer medicines are ordered on electronic or preprinted forms, with the quantity to dispense, the number of refills (zero as the preferred default) and the schedule. Labels give the dosage form, quantity, pills per dose, the schedule with days on and off, food instructions and handling warnings. Before the first dose, patients receive verbal and written education in their preferred language covering the schedule, missed doses, interactions with drugs, herbal products and foods, side effects that require stopping self-administered treatment and calling, safe handling at home including disposal, body secretions and spills, and whom to contact; carers are included where needed. Adherence is assessed at the start and during treatment (standard 4.4).\n\nThe ONS adherence guideline (2022, GRADE) makes conditional recommendations, mostly on very low-certainty evidence, for an adherence risk assessment at the start, education addressing adherence, ongoing assessment, proactive follow-up for those at risk, coaching and motivational interviewing (low certainty), and a structured oral anticancer medication programme; it makes no recommendation on reminder technology (knowledge gap). Product information adds handling rules, such as not crushing or cutting capecitabine tablets.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "Adults taking oral anticancer medicines (chemotherapy tablets such as capecitabine, kinase inhibitors, CDK4/6 inhibitors and others) at home. Hormonal therapies are covered by ASCO-ONS only where listed as antineoplastic. Children and people unable to manage their own medicines need carer-centred arrangements beyond these sources.",
  trigger: "An oral anticancer medicine is prescribed for the first time, its dose changes, or a patient reports difficulty taking it.",
  steps: [
    {
      action: "Order oral anticancer medicines on an electronic or preprinted form with the quantity, schedule and number of refills, with no refills as the default",
      why: "Automatic repeat prescriptions let people keep taking a drug after it should have been stopped or the dose changed.",
      source: "asco-ons-2024",
      quote: "Number of refills, with zero being the preferred default value for oral antineoplastics",
    },
    {
      action: "Label each container with how many to take, how often, the days on and off, and when follow-up is due",
      why: "Cycles with days off are a common cause of taking too much or too little.",
      source: "asco-ons-2024",
      quote: "Administration schedule, including number of times per day to take medication and days on or off medication (cycle length) when applicable, and when follow-up is scheduled",
    },
    {
      action: "Before the first dose, teach the schedule, what to do about a missed dose, and interactions with other medicines, herbal products and foods",
      why: "Patients at home make these decisions without a nurse present.",
      source: "asco-ons-2024",
      quote: "Planned duration of treatment, schedule of treatment administration, plan for missed doses, drug names and supportive medications, and drug interactions with prescribed drugs, integrative therapies, over the counter drugs, and foods",
    },
    {
      action: "Tell the patient which symptoms mean stopping the tablets and calling the team straight away",
      why: "Severe diarrhoea, mouth sores, fever or hand-foot skin damage can become dangerous if tablets are continued.",
      source: "asco-ons-2024",
      quote: "Symptoms or events that require immediate discontinuation of oral or other self-administered treatments",
    },
    {
      action: "Teach safe handling at home: storage, handling, disposal of unused tablets, body fluids and cleaning up spills",
      why: "The drugs that harm cancer cells can harm others in the household who touch them.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Do not crush, split or open tablets or capsules unless the product information or pharmacist says this is safe",
      why: "Crushing releases drug dust that the patient or carer can inhale or absorb.",
      source: "xeloda-smpc",
      quote: "Xeloda tablets should not be crushed or cut.",
    },
    {
      action: "Include family or carers in the teaching where the patient needs help to manage treatment",
      why: "Carers often handle the tablets and notice side effects first.",
      source: "asco-ons-2024",
      quote: "Education includes family, caregivers, or others on the basis of the patient's ability to assume responsibility for managing therapy.",
    },
    {
      action: "At the start, assess the risk that the person will struggle to take the medicine as prescribed",
      why: "Cost, complex schedules, low mood and side effects all make missed doses more likely and can be planned for.",
      source: "ons-oam-2022",
      quote: "In patients starting a new OAM, the ONS Guidelines panel suggests an adherence risk assessment in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Ask about missed or extra doses at every contact, and follow up proactively between visits for people at higher risk",
      why: "Problems with tablets often show up between clinic visits.",
      source: "ons-oam-2022",
      quote: "In patients with additional risk factors for nonadherence taking OAMs, the ONS Guidelines panel suggests proactive follow-up addressing adherence in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence).",
      grade: "conditional recommendation, very low certainty of evidence",
    },
    {
      action: "Offer coaching or motivational interviewing to support adherence",
      why: "Talking through goals and barriers helped some patients keep taking their treatment in small trials.",
      source: "ons-oam-2022",
      quote: "In patients taking OAMs, the ONS Guidelines panel suggests motivational interviewing in addition to usual care rather than usual care alone (conditional recommendation, low certainty of evidence).",
      grade: "conditional recommendation, low certainty of evidence",
    },
  ],
  bestInClass: {
    statement: "A structured oral anticancer medicine programme (ONS 2022, conditional, very low certainty): order and label to the ASCO-ONS standards (2024), with zero refills as the default and the schedule, days off and food instructions on the label; teach patient and carer before the first dose, in writing, including missed doses, interactions, stop-and-call symptoms and safe handling and disposal at home; assess adherence risk at the start and adherence at every contact; follow up proactively those at risk; offer coaching and motivational interviewing. The evidence for each adherence intervention is low or very low in certainty, and ONS makes no recommendation on reminder technology.",
    sources: ["asco-ons-2024", "ons-oam-2022"],
  },
  variants: [
    {
      name: "Reminder apps and text messages",
      differs: "Uses automated reminders or interactive apps to support taking oral anticancer medicines.",
      evidence: "ONS (2022) makes no recommendation, citing a knowledge gap; it notes adherence improved in studies only where technology came with follow-up from a healthcare worker.",
      sources: ["ons-oam-2022"],
    },
  ],
  grades: [
    { claim: "Education addressing adherence in addition to standard education", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests education addressing adherence in addition to standard education rather than standard education alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Ongoing assessment of adherence", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests ongoing assessment of adherence in addition to usual care rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "Coaching", grade: "conditional recommendation, very low certainty of evidence", source: "ons-oam-2022", quote: "In patients taking OAMs, the ONS Guidelines panel suggests coaching in addition to usual care, rather than usual care alone (conditional recommendation, very low certainty of evidence)." },
    { claim: "A structured oral anticancer medication programme", grade: "Conditional; very low certainty", source: "ons-oam-2022", quote: "The ONS Guidelines panel suggests implementation of a structured OAM program rather than no structured OAM program." },
    { claim: "Reminder technology", grade: "No recommendation; knowledge gap", source: "ons-oam-2022", quote: "The ONS Guidelines panel makes no recommendation for the use of technology, either interactive or noninteractive, based on a knowledge gap." },
    { claim: "Organisation policy for monitoring adherence", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "The health care organization policy outlines the procedure to monitor initial and subsequent assessment and documentation of patients' adherence to antineoplastic therapy" },
  ],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ons-oam-2022",
      label: "ONS Guidelines to Support Patient Adherence to Oral Anticancer Medications",
      publisher: "Oncology Nursing Society (Oncology Nursing Forum, Belcher et al.)",
      year: 2022,
      url: "https://doi.org/10.1188/22.ONF.279-295",
      doi: "10.1188/22.ONF.279-295",
      gradingScheme: "GRADE: recommendations strong, conditional, no recommendation or knowledge gap; certainty of evidence high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "xeloda-smpc",
      label: "Xeloda (capecitabine): summary of product characteristics, section 4.4",
      publisher: "European Medicines Agency (EPAR product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf",
      gradingScheme: "Product information; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["capecitabine"],
  technologies: ["kinase-inhibitors", "cdk46-inhibitor"],
  related: ["hazardous-drug-handling-in-clinical-areas", "dpyd-testing-before-fluoropyrimidines"],
  upgrades: ["idea-upgrade-oral-anticancer-medicine-adherence-programme"],
  gaps: [
    "Every ONS adherence recommendation is conditional and rests on low or very low certainty evidence; no single intervention is proven to improve outcomes such as survival or toxicity.",
    "Household safe-handling detail (how long body fluids carry drug, gloves for carers, pregnancy in the household, disposal routes) is required to be taught by ASCO-ONS but not specified by any source read; ISOPP's 2022 standards, which address it, could not be read.",
    "Missed-dose rules are drug-specific and come from each product's label; none is reproduced here.",
    "No UK national standard for oral anticancer medicines (for example, from NHS England or BOPA) was read.",
  ],
});
