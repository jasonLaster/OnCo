import type { ProtocolInput } from "@/lib/schema";
import { ambulatoryChemotherapyPumpsAtHome } from "./ambulatory-chemotherapy-pumps-at-home";
import { anticancerDrugInteractionReview } from "./anticancer-drug-interaction-review";
import { asepticCompoundingOfHazardousAnticancerDrugs } from "./aseptic-compounding-of-hazardous-anticancer-drugs";
import { bloodSamplingFromACentralLine } from "./blood-sampling-from-a-central-line";
import { bodySizeBasedDoseCalculation } from "./body-size-based-dose-calculation";
import { cancerAssociatedVteTreatment } from "./cancer-associated-vte-treatment";
import { carboplatinDoseCalculation } from "./carboplatin-dose-calculation";
import { catheterRelatedThrombosisInCancer } from "./catheter-related-thrombosis-in-cancer";
import { centralLineOcclusionManagement } from "./central-line-occlusion-management";
import { centralLineRemoval } from "./central-line-removal";
import { centralVenousCatheterInsertionForAnticancerTherapy } from "./central-venous-catheter-insertion-for-anticancer-therapy";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { consentAndEducationBeforeAnticancerTreatment } from "./consent-and-education-before-anticancer-treatment";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { drugDesensitisationAfterAnticancerHypersensitivity } from "./drug-desensitisation-after-anticancer-hypersensitivity";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { hepaticDoseAdjustmentOfAnticancerDrugs } from "./hepatic-dose-adjustment-of-anticancer-drugs";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { intrathecalChemotherapyAndVincaAlkaloidSafety } from "./intrathecal-chemotherapy-and-vinca-alkaloid-safety";
import { medicinesReconciliationInCancerCare } from "./medicines-reconciliation-in-cancer-care";
import { midlineCathetersForAnticancerTherapy } from "./midline-catheters-for-anticancer-therapy";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
import { peripheralCannulaForAnticancerTherapy } from "./peripheral-cannula-for-anticancer-therapy";
import { piccAndTunnelledLineCare } from "./picc-and-tunnelled-line-care";
import { premedicationBeforeReactionProneAnticancerDrugs } from "./premedication-before-reaction-prone-anticancer-drugs";
import { renalDoseAdjustmentOfAnticancerDrugs } from "./renal-dose-adjustment-of-anticancer-drugs";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";
import { suspectedCentralLineInfection } from "./suspected-central-line-infection";
import { venousAccessDeviceSelectionForAnticancerTherapy } from "./venous-access-device-selection-for-anticancer-therapy";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  ambulatoryChemotherapyPumpsAtHome,
  anticancerDrugInteractionReview,
  asepticCompoundingOfHazardousAnticancerDrugs,
  bloodSamplingFromACentralLine,
  bodySizeBasedDoseCalculation,
  cancerAssociatedVteTreatment,
  carboplatinDoseCalculation,
  catheterRelatedThrombosisInCancer,
  centralLineOcclusionManagement,
  centralLineRemoval,
  centralVenousCatheterInsertionForAnticancerTherapy,
  chemotherapyExtravasationManagement,
  consentAndEducationBeforeAnticancerTreatment,
  dpydTestingBeforeFluoropyrimidines,
  drugDesensitisationAfterAnticancerHypersensitivity,
  febrileNeutropeniaFirstHour,
  hazardousDrugHandlingInClinicalAreas,
  hepaticDoseAdjustmentOfAnticancerDrugs,
  implantedPortAccessAndCare,
  infusionReactionManagement,
  intrathecalChemotherapyAndVincaAlkaloidSafety,
  medicinesReconciliationInCancerCare,
  midlineCathetersForAnticancerTherapy,
  oralAnticancerMedicinesAtHome,
  peripheralCannulaForAnticancerTherapy,
  piccAndTunnelledLineCare,
  premedicationBeforeReactionProneAnticancerDrugs,
  renalDoseAdjustmentOfAnticancerDrugs,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  suspectedCentralLineInfection,
  venousAccessDeviceSelectionForAnticancerTherapy,
];
