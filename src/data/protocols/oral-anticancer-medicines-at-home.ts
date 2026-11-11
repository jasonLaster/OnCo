import { protocol } from "./helpers";

/*
 * Storing, handling and disposing of oral anticancer medicines (tablets, capsules, liquids) at home, and keeping
 * household members safe from the drug in body fluids.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Macmillan Cancer Support, How chemotherapy is given (reviewed 1 March 2022): full text.
 * - American Cancer Society, Getting Oral Chemotherapy and Chemotherapy Safety (both last revised 15 May 2025, with
 *   ASCO medical review): full text.
 * - Oncology Nursing Society, Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology (PDF, May 2018): full
 *   text, pdftotext; the home caregiver section.
 * - NCI, Chemotherapy and You (December 2023): full text; the home safety section.
 * - FDA, Disposal of Unused Medicines: What You Should Know (content dated 31 October 2024): full text.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024): abstract only (the journal page returned a
 *   bot check). ISOPP Standards for the Safe Handling of Cytotoxics (2022) and the pan-Canadian community pharmacy
 *   consensus on oral anticancer drugs (2018): not reachable (bot check; the PMC full text did not return).
 * Every DOI was resolved through Crossref and Europe PMC.
 */
export const oralAnticancerMedicinesAtHome = protocol({
  id: "oral-anticancer-medicines-at-home",
  name: "Oral anticancer medicines at home: storage, handling and disposal",
  aka: ["oral chemotherapy safety at home", "storing chemotherapy tablets", "disposing of chemotherapy tablets", "safe handling of oral chemotherapy", "chemotherapy body fluid precautions at home", "oral SACT at home"],
  domain: "oral-anticancer-therapy",
  tldr: "Cancer tablets and capsules are as strong as drips, and many are hazardous to other people. Keep them in their own labelled container, stored as the pharmacist says and out of reach of children and pets; carers should not touch them with bare hands; take extra care with toilets, vomit and laundry for at least two days after a dose; and take any leftover medicine back to the pharmacy rather than binning or flushing it.",
  simple: "Keep cancer tablets in the box or bottle they came in, somewhere children and pets cannot reach. If someone helps you, they should tip the tablet into the cap or wear gloves. For two days after a dose, put the toilet lid down before flushing and wash your hands. Take any tablets you do not use back to the pharmacy.",
  summary: "No graded guideline covers the home part of oral anticancer therapy; the practice rests on nursing and patient guidance. ACS (2025, ASCO-reviewed) and Macmillan (2022) say to read the labels before leaving hospital, store tablets as instructed (some away from light or in a fridge), keep them in the original container and out of reach of children, ask whether tablets can be crushed or opened, and report missed doses. ACS and the ONS safe handling toolkit (2018) describe body-fluid precautions for at least 48 hours after a dose: sit to use the toilet, lid down and flush (twice for a low-volume flush), wipe the seat, wash hands, carers wear gloves (ACS says two pairs) for fluids, wash soiled laundry separately and twice in hot water, and double-bag disposable waste. For leftover medicine, ONS says never put cancer drugs in the bin, drain or toilet and to return them to the pharmacy or clinic; the FDA's general advice for medicines (take-back first, then the flush list, then the household bin) is not written for cancer drugs and conflicts with this. The ASCO-ONS 2024 safety standards add home administration to their scope, but only the abstract could be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "pharmacist", "nurse"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults taking oral anticancer medicines at home (oral chemotherapy such as capecitabine, cyclophosphamide or etoposide, and other oral drugs the team classes as hazardous), and the people they live with. Children's oral chemotherapy, and drugs with their own pregnancy prevention programmes, have additional rules from the prescriber.",
  trigger: "An oral anticancer medicine is dispensed for use at home.",
  steps: [
    {
      action: "Read the labels before leaving the hospital or pharmacy, and ask about anything unclear, including whether tablets may be crushed, split or opened",
      why: "Taking the right dose at the right time matters, and crushing or opening some tablets releases drug into the air or onto skin.",
      source: "macmillan-how-chemo-given",
      quote: "read the labels on the drug boxes before you leave the hospital and speak to your nurse, doctor or pharmacist if any instructions are unclear",
      grade: "Not graded (patient information)",
    },
    {
      action: "Store the medicine exactly as instructed (for example away from light or in a fridge), in the bottle or box it came in",
      why: "Some drugs spoil if stored wrongly, and the original container keeps the label and warnings with the medicine.",
      source: "macmillan-how-chemo-given",
      quote: "Some chemotherapy tablets, capsules or injections may need to be stored in a certain way, such as away from direct light or in a fridge. Always follow the instructions given by your nurse or pharmacist.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Keep every dose out of the reach of children and pets",
      why: "A dose meant for an adult with cancer can seriously harm a child who swallows it.",
      source: "macmillan-how-chemo-given",
      quote: "All drugs must be stored out of the reach of children, as they could cause serious harm if taken by accident.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Carers who help should not touch tablets with bare hands: tip the dose into the container cap, or wear gloves",
      why: "Many oral anticancer drugs are hazardous to the people who handle them, not only to the person taking them.",
      source: "ons-safe-handling-toolkit",
      quote: "When assisting patients with oral HDs, family members should use “no-touch” technique (e.g., pour tablets into the cap of the container) or wear gloves for handling.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "If a dose is missed or taken late, tell the team rather than making it up on your own",
      why: "Doses are timed to keep a steady level of drug; the team decides whether to change anything.",
      source: "acs-oral-chemo",
      quote: "If you miss a dose or are late taking one, tell your doctor or nurse about it.",
      grade: "Not graded (patient information)",
    },
    {
      action: "For at least 48 hours after a dose, sit to use the toilet, put the lid down before flushing, wipe the seat, and wash hands with soap and water",
      why: "Most of the drug leaves the body in urine and stools over about two days, and splashes can reach other people.",
      source: "acs-chemo-safety",
      quote: "It generally takes at least 48 hours for your body to break down and/or get rid of most chemo.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Anyone handling body fluids, vomit or soiled items should wear disposable gloves and wash their hands afterwards",
      why: "Drug in body fluids can irritate or harm skin with repeated exposure.",
      source: "acs-chemo-safety",
      quote: "If others need to touch any of your body fluids or something that has been in contact with your body fluids (like a bucket or basin), they should wear 2 pairs of throw-away gloves.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Wash clothes or sheets soiled with body fluids in a machine, separately, twice in hot water; seal them in a plastic bag if they cannot be washed straight away",
      why: "Washing separately and twice removes drug residue without spreading it to other laundry.",
      source: "acs-chemo-safety",
      quote: "Wash them twice in hot water with regular laundry detergent. Do not wash them with other clothes.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Double-bag used gloves, pads and other contaminated waste before putting it in the household bin, and do not reuse or recycle empty medicine bottles",
      why: "Bagging keeps others from touching drug residue; empty containers still carry traces of the drug.",
      source: "ons-safe-handling-toolkit",
      quote: "Before putting this waste in the trash, double bag it to help make sure others don’t inadvertently come into contact with it.",
      grade: "Not graded (nursing toolkit)",
    },
    {
      action: "Return any leftover or stopped medicine to the pharmacy, clinic or treatment centre; do not put it in the bin, down the drain or down the toilet",
      why: "Leftover anticancer drugs are a hazard to others and to the environment, and pharmacies can destroy them safely.",
      source: "ons-safe-handling-toolkit",
      quote: "Never throw cancer drugs in the trash or down the drain, and don’t flush them down the toilet.",
      grade: "Not graded (nursing toolkit)",
    },
  ],
  bestInClass: {
    statement: "There is no graded guideline for oral anticancer medicines at home; the best available version is the convergent nursing and patient guidance: ACS (2025, ASCO-reviewed), Macmillan (2022), NCI (2023) and the ONS safe handling toolkit (2018). They agree on original containers, storage as labelled, keeping drugs from children, a no-touch technique or gloves for carers, 48 hours of body-fluid precautions, and returning leftovers to the pharmacy. The ASCO-ONS 2024 antineoplastic safety standards extend to home administration, and the ISOPP 2022 standards cover handling; neither could be read in full, so their wording is not used here.",
    sources: ["acs-oral-chemo", "acs-chemo-safety", "macmillan-how-chemo-given", "nci-chemo-and-you", "ons-safe-handling-toolkit"],
  },
  variants: [
    {
      name: "General medicine disposal (FDA)",
      differs: "For most unused medicines, use a take-back option first; if there is none, flush medicines on the FDA flush list, and put others in the household bin.",
      evidence: "FDA consumer guidance (content current 31 October 2024), written for medicines in general and not for anticancer drugs. It conflicts with ONS, which says never to bin or flush cancer drugs; for anticancer drugs, the team's or pharmacy's return route comes first.",
      sources: ["fda-disposal"],
    },
    {
      name: "Separate toilet for 48 hours (ONS toolkit)",
      differs: "Asks household members to use a different toilet from the patient for 48 hours after a dose; ACS says to do this if possible and otherwise to wipe the seat after each use.",
      evidence: "Nursing toolkit, not graded; ONS gives the 48-hour period, citing a nursing text. No study compares the two approaches.",
      sources: ["ons-safe-handling-toolkit", "acs-chemo-safety"],
    },
    {
      name: "Length of body-fluid precautions set by the treating centre (NCI)",
      differs: "Lists the same precautions (lid closed and flush twice, sit to urinate, gloves for body fluids, separate laundry, condoms during sex) but leaves the duration to the centre and the drug.",
      evidence: "NCI booklet: the time 'might differ depending on the policy where you receive treatment and the drugs that you receive.'",
      sources: ["nci-chemo-and-you"],
    },
  ],
  grades: [
    { claim: "All home handling steps", grade: "Not graded: patient information and a nursing toolkit, without a grading scheme", source: "ons-safe-handling-toolkit" },
    { claim: "Body-fluid precautions for 48 hours after a dose", grade: "Not graded (ONS toolkit, citing a nursing text)", source: "ons-safe-handling-toolkit", quote: "Family members should use separate toilets from the patient for 48 hours after HD administration to eliminate the risk of contact with contaminated body waste." },
    { claim: "Home administration within the scope of the ASCO-ONS safety standards", grade: "Standards (expert panel and literature review); individual standards not read", source: "asco-ons-2024", quote: "The standards presented here include clarification and expansion of existing standards to include home administration and other changes in processes of ordering, preparing, and administering antineoplastic therapy; the advent of immune effector cellular therapy; the importance of social determinants of health; fertility preservation; and pregnancy avoidance." },
  ],
  sources: [
    {
      key: "macmillan-how-chemo-given",
      label: "How chemotherapy is given",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/how-chemotherapy-is-given",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acs-oral-chemo",
      label: "Getting Oral Chemotherapy",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/oral-chemotherapy.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acs-chemo-safety",
      label: "Chemotherapy Safety",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/chemotherapy-safety.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ons-safe-handling-toolkit",
      label: "Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology",
      publisher: "Oncology Nursing Society",
      year: 2018,
      url: "https://www.ons.org/sites/default/files/2018-06/ONS_Safe_Handling_Toolkit_0.pdf",
      gradingScheme: "Nursing toolkit; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2023,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "fda-disposal",
      label: "Disposal of Unused Medicines: What You Should Know",
      publisher: "US Food and Drug Administration",
      year: 2024,
      url: "https://www.fda.gov/drugs/safe-disposal-medicines/disposal-unused-medicines-what-you-should-know",
      gradingScheme: "Consumer guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Consensus standards from an expert panel with literature review; not graded individually in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "isopp-2022",
      label: "ISOPP Standards for the Safe Handling of Cytotoxics",
      publisher: "International Society of Oncology Pharmacy Practitioners (J Oncol Pharm Pract)",
      year: 2022,
      url: "https://doi.org/10.1177/10781552211070933",
      doi: "10.1177/10781552211070933",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["capecitabine", "cyclophosphamide", "etoposide"],
  related: ["idea-acc-pharmacist-interaction-review-oral-anticancer"],
  gaps: [
    "No graded guideline covers storage, handling and disposal of oral anticancer medicines at home; every step rests on patient information or a nursing toolkit.",
    "The ASCO-ONS 2024 standards were read only as an abstract (the journal page returned a bot check), and the ISOPP 2022 standards and the 2018 pan-Canadian community pharmacy consensus could not be read at all.",
    "The ONS toolkit read here is the 2018 edition; ACS cites a 2024 ONS book on safe handling that is not freely available.",
    "The 48-hour period is a general figure; how long a particular drug stays in body fluids varies, and the sources leave the exact period to the drug's label and the treating centre.",
    "Return routes for leftover medicine differ by country and pharmacy; the sources do not give a UK-specific route for anticancer drugs beyond returning them to the pharmacy or clinic.",
  ],
});
