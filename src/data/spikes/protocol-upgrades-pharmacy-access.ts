import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/*
 * Protocol upgrades found while writing the pharmacy dosing and vascular access protocols (protocol fill round, second
 * agent, 11 November 2026). Same shape and tiers as protocol-upgrades-administration.ts:
 *   upgrade:promising  some clinical evidence, not yet settled;
 *   upgrade:untested   plausible or already in use, with the study that would settle it named in `test`.
 * Every statement below was read in the source beside it (full text unless marked abstract), and every DOI was resolved
 * through Europe PMC. Adoption is not stated where no survey measured it.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });

const ADDIKD_PART1 = doi("Sandhu et al., Aligning kidney function assessment in patients with cancer to global practices in internal medicine (ADDIKD Part 1, eClinicalMedicine 2025)", "10.1016/j.eclinm.2025.103102");
const ADDIKD_INTEGRATION = doi("Sandhu et al., Integrating International Consensus Guidelines for Anticancer Drug Dosing in Kidney Dysfunction (ADDIKD) into everyday practice (eClinicalMedicine 2025)", "10.1016/j.eclinm.2025.103161");
const JANOWITZ_2017 = doi("Janowitz et al., New Model for Estimating Glomerular Filtration Rate in Patients With Cancer (J Clin Oncol 2017; abstract read)", "10.1200/JCO.2017.72.7578");
const SAKAKIDA_2025 = doi("Sakakida et al., Midline catheter use for cancer patients receiving 5-FU chemotherapy (Oncologist 2025; abstract read)", "10.1093/oncolo/oyaf108");
const JSCN_2024 = doi("JSCN/JSMO/JASPO multidisciplinary clinical practice guidelines for the management of extravasation of anticancer drugs (ESMO Open 2024)", "10.1016/j.esmoop.2024.103932");
const PUSHPARAJ_2026 = doi("Pushparaj et al., Minimizing discard volume to 2 ml before blood sampling from a central venous catheter (Acute Crit Care 2026; abstract read)", "10.4266/acc.000792");

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-carboplatin-gfr-estimate-outcome-study", name: "Compare carboplatin dosed by BSA-adjusted CKD-EPI eGFR with Cockcroft-Gault on toxicity and response", maturity: "early-clinical", actor: "research", cost: "medium", horizonYears: 3,
    sections: ["chemotherapy"], tags: T("promising", "moderate"),
    tldr: "Carboplatin doses depend on an estimate of kidney function. The 2025 international guideline (ADDIKD) recommends a newer estimate (BSA-adjusted CKD-EPI) over the old Cockcroft-Gault formula when kidney function cannot be measured directly, because it is more accurate. No study has yet shown that switching changes side effects or how well treatment works.",
    summary: "The recommendation. ADDIKD (2025) recommends BSA-adjusted eGFR CKD-EPI as an alternative to measured GFR in the Calvert formula, on clinical consensus with a strong recommendation, and calls the switch away from creatinine clearance 'a significant practice change, based on historical reliance on CrCl calculated by the Cockcroft–Gault equation'. It notes that many prescribing software packages use creatinine clearance by default.\n\nThe evidence. In 2,471 patients at Cambridge, BSA-adjusted CKD-EPI was the most accurate published estimate against measured GFR, and Cockcroft-Gault gave a dose more than 20% off in 25.5% of patients against 18.6% (Janowitz 2017, abstract). These are dose-accuracy outcomes; ADDIKD's own outstanding questions add that cystatin C-based equations may be more accurate where eGFR is unreliable.",
    hypothesis: "Carboplatin dosed with BSA-adjusted CKD-EPI eGFR produces fewer grade 3 or 4 thrombocytopenias and dose delays than dosing with Cockcroft-Gault, with no loss of response.",
    rationale: "A guideline-driven change to the dose of one of the most used cytotoxics should be followed by a measure of what it does to patients, not only to the arithmetic.",
    test: "A before-and-after or stepped-wedge study across centres adopting ADDIKD, or a randomised comparison within a trial network, recording platelet nadirs, dose delays and reductions, and response, with measured GFR in a subset to calibrate.",
    drugs: ["carboplatin"], technologies: ["carboplatin-calvert-dosing"], bottlenecks: ["b-dose-optimisation"],
    links: [ADDIKD_PART1, ADDIKD_INTEGRATION, JANOWITZ_2017] }),

  idea({ id: "idea-upgrade-midline-vesicant-safety-study", name: "Find out whether vesicant and irritant chemotherapy can safely run through a midline catheter", maturity: "early-clinical", actor: "research", cost: "small", horizonYears: 3,
    sections: ["chemotherapy"], tags: T("untested", "insufficient"),
    tldr: "Midline catheters, longer drips in the upper arm, carry fewer bloodstream infections than PICCs and are being used for chemotherapy. No guideline read says whether drugs that damage tissue if they leak can safely go through one.",
    summary: "The gap. None of the guidelines read for the midline protocol (CDC 2011, ESMO 2015, the Japanese extravasation guideline 2024) says whether vesicant or irritant chemotherapy may be given through a midline; the INS Standards, which address infusate limits, could not be read. The Japanese extravasation guideline cites a case report of oxaliplatin extravasation from a midline.\n\nThe evidence so far. A prospective Japanese study of 59 patients given continuous fluorouracil through a midline reported no phlebitis and complications in 6.8% (abstract). Whether this extends to vesicants and to irritants such as oxaliplatin has not been studied in any source read.",
    hypothesis: "For continuous or repeated irritant chemotherapy, a midline with its tip in the axillary vein has an extravasation and phlebitis rate no higher than a PICC.",
    rationale: "Midlines avoid a central line's infection and placement burden; if they are safe for more drugs, many people could avoid a PICC, and if they are not, a clear limit would prevent injuries.",
    test: "A prospective registry of midlines used for anticancer drugs, recording drug class, dwell time, extravasation, phlebitis and infection, followed by a randomised comparison with PICCs for irritant infusions if the registry is reassuring.",
    drugs: ["oxaliplatin", "fluorouracil"], technologies: ["infusion-devices-vascular-access", "picc-lines"], terms: ["extravasation-infusion-reaction"], bottlenecks: ["b-toxicity-qol"],
    links: [SAKAKIDA_2025, JSCN_2024] }),

  idea({ id: "idea-upgrade-central-line-discard-volume-in-cancer-outpatients", name: "Test the smallest safe discard volume for blood taken from ports and PICCs in cancer outpatients", maturity: "early-clinical", actor: "clinic", cost: "small", horizonYears: 2,
    sections: ["chemotherapy", "supportive-care"], tags: T("untested", "insufficient"),
    tldr: "When blood is taken from a line, a small amount is usually drawn off and thrown away first. How much is needed has never been set by a guideline that could be read, and the only recent study was in intensive care, not in people with ports having chemotherapy.",
    summary: "The gap. No guideline read for the blood sampling protocol sets a discard volume; the INS Standards, which do, could not be read. An intensive-care study in 105 patients found a 2 ml discard gave results agreeing with venepuncture for electrolytes and blood counts except white cells (abstract), and noted that no consensus exists on the volume. People with cancer have bloods taken from their lines before nearly every cycle.",
    hypothesis: "In outpatients sampled from implanted ports and PICCs after a saline lock, a discard of a set small volume gives blood counts and biochemistry that agree with venepuncture within clinically acceptable limits.",
    rationale: "A volume that is too small gives diluted results that can wrongly delay chemotherapy; one that is too large wastes blood in people who are often anaemic.",
    test: "A paired-sample method-comparison study in chemotherapy day units: venepuncture against line samples after discards of increasing volume, stratified by device, with Bland-Altman agreement for haemoglobin, neutrophils, platelets, creatinine and potassium.",
    technologies: ["implanted-ports", "picc-lines"], terms: ["central-venous-access"], bottlenecks: ["b-toxicity-qol"],
    links: [PUSHPARAJ_2026] }),
];

export const protocolUpgradesPharmacyAccess: EntityInput[] = [...ideas];
