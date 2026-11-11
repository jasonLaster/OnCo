import type { ProtocolInput } from "@/lib/schema";
import { cancerAssociatedVteTreatment } from "./cancer-associated-vte-treatment";
import { carboplatinDoseCalculation } from "./carboplatin-dose-calculation";
import { catheterRelatedThrombosisInCancer } from "./catheter-related-thrombosis-in-cancer";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { intrathecalChemotherapyAndVincaAlkaloidSafety } from "./intrathecal-chemotherapy-and-vinca-alkaloid-safety";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
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
  cancerAssociatedVteTreatment,
  carboplatinDoseCalculation,
  catheterRelatedThrombosisInCancer,
  chemotherapyExtravasationManagement,
  dpydTestingBeforeFluoropyrimidines,
  febrileNeutropeniaFirstHour,
  hazardousDrugHandlingInClinicalAreas,
  implantedPortAccessAndCare,
  infusionReactionManagement,
  intrathecalChemotherapyAndVincaAlkaloidSafety,
  oralAnticancerMedicinesAtHome,
  piccAndTunnelledLineCare,
  premedicationBeforeReactionProneAnticancerDrugs,
  renalDoseAdjustmentOfAnticancerDrugs,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  suspectedCentralLineInfection,
  venousAccessDeviceSelectionForAnticancerTherapy,
];
