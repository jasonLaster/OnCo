import type { ProtocolInput } from "@/lib/schema";
import { acuteOncologyTelephoneTriage } from "./acute-oncology-telephone-triage";
import { alloHctGvhdProphylaxis } from "./allo-hct-gvhd-prophylaxis";
import { ambulatoryChemotherapyPumpsAtHome } from "./ambulatory-chemotherapy-pumps-at-home";
import { anticancerDrugInteractionReview } from "./anticancer-drug-interaction-review";
import { asepticCompoundingOfHazardousAnticancerDrugs } from "./aseptic-compounding-of-hazardous-anticancer-drugs";
import { bispecificStepUpDosing } from "./bispecific-step-up-dosing";
import { bloodSamplingFromACentralLine } from "./blood-sampling-from-a-central-line";
import { bodySizeBasedDoseCalculation } from "./body-size-based-dose-calculation";
import { cancerAssociatedVteTreatment } from "./cancer-associated-vte-treatment";
import { carTApheresis } from "./car-t-apheresis";
import { carTBridging } from "./car-t-bridging";
import { carTInfectionPrevention } from "./car-t-infection-prevention";
import { carTLymphodepletion } from "./car-t-lymphodepletion";
import { carTReferralAndEligibility } from "./car-t-referral-and-eligibility";
import { carboplatinDoseCalculation } from "./carboplatin-dose-calculation";
import { catheterRelatedThrombosisInCancer } from "./catheter-related-thrombosis-in-cancer";
import { centralLineOcclusionManagement } from "./central-line-occlusion-management";
import { centralLineRemoval } from "./central-line-removal";
import { centralVenousCatheterInsertionForAnticancerTherapy } from "./central-venous-catheter-insertion-for-anticancer-therapy";
import { checkpointInhibitorBaselineAndMonitoring } from "./checkpoint-inhibitor-baseline-and-monitoring";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { communityCareOfVascularAccessDevices } from "./community-care-of-vascular-access-devices";
import { consentAndEducationBeforeAnticancerTreatment } from "./consent-and-education-before-anticancer-treatment";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { doseBandingOfAnticancerDrugs } from "./dose-banding-of-anticancer-drugs";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { drugDesensitisationAfterAnticancerHypersensitivity } from "./drug-desensitisation-after-anticancer-hypersensitivity";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { hepaticDoseAdjustmentOfAnticancerDrugs } from "./hepatic-dose-adjustment-of-anticancer-drugs";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { hyperleukocytosisLeukostasis } from "./hyperleukocytosis-leukostasis";
import { hyponatraemiaSiadh } from "./hyponatraemia-siadh";
import { icahtProlongedCytopenia } from "./icaht-prolonged-cytopenia";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { iecHsManagement } from "./iec-hs-management";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { intrathecalChemotherapyAndVincaAlkaloidSafety } from "./intrathecal-chemotherapy-and-vinca-alkaloid-safety";
import { iraeColitis } from "./irae-colitis";
import { iraeDiabetes } from "./irae-diabetes";
import { iraeHaematological } from "./irae-haematological";
import { iraeHepatitis } from "./irae-hepatitis";
import { iraeHypophysitisAdrenal } from "./irae-hypophysitis-adrenal";
import { iraeMyocarditis } from "./irae-myocarditis";
import { iraeNephritis } from "./irae-nephritis";
import { iraeNeurological } from "./irae-neurological";
import { iraeOcular } from "./irae-ocular";
import { iraePneumonitis } from "./irae-pneumonitis";
import { iraeRechallenge } from "./irae-rechallenge";
import { iraeRheumatological } from "./irae-rheumatological";
import { iraeSkin } from "./irae-skin";
import { iraeSteroidTaperAndPjp } from "./irae-steroid-taper-and-pjp";
import { iraeThyroid } from "./irae-thyroid";
import { malignantBowelObstruction } from "./malignant-bowel-obstruction";
import { malignantPericardialEffusion } from "./malignant-pericardial-effusion";
import { medicinesReconciliationInCancerCare } from "./medicines-reconciliation-in-cancer-care";
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";
import { midlineCathetersForAnticancerTherapy } from "./midline-catheters-for-anticancer-therapy";
import { neutropenicEnterocolitis } from "./neutropenic-enterocolitis";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
import { peripheralCannulaForAnticancerTherapy } from "./peripheral-cannula-for-anticancer-therapy";
import { piccAndTunnelledLineCare } from "./picc-and-tunnelled-line-care";
import { premedicationBeforeReactionProneAnticancerDrugs } from "./premedication-before-reaction-prone-anticancer-drugs";
import { raisedIntracranialPressure } from "./raised-intracranial-pressure";
import { renalDoseAdjustmentOfAnticancerDrugs } from "./renal-dose-adjustment-of-anticancer-drugs";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";
import { superiorVenaCavaObstruction } from "./superior-vena-cava-obstruction";
import { suspectedCentralLineInfection } from "./suspected-central-line-infection";
import { tumourLysisSyndrome } from "./tumour-lysis-syndrome";
import { venousAccessDeviceSelectionForAnticancerTherapy } from "./venous-access-device-selection-for-anticancer-therapy";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  acuteOncologyTelephoneTriage,
  alloHctGvhdProphylaxis,
  ambulatoryChemotherapyPumpsAtHome,
  anticancerDrugInteractionReview,
  asepticCompoundingOfHazardousAnticancerDrugs,
  bispecificStepUpDosing,
  bloodSamplingFromACentralLine,
  bodySizeBasedDoseCalculation,
  cancerAssociatedVteTreatment,
  carTApheresis,
  carTBridging,
  carTInfectionPrevention,
  carTLymphodepletion,
  carTReferralAndEligibility,
  carboplatinDoseCalculation,
  catheterRelatedThrombosisInCancer,
  centralLineOcclusionManagement,
  centralLineRemoval,
  centralVenousCatheterInsertionForAnticancerTherapy,
  checkpointInhibitorBaselineAndMonitoring,
  chemotherapyExtravasationManagement,
  communityCareOfVascularAccessDevices,
  consentAndEducationBeforeAnticancerTreatment,
  crsGradingAndManagement,
  doseBandingOfAnticancerDrugs,
  dpydTestingBeforeFluoropyrimidines,
  drugDesensitisationAfterAnticancerHypersensitivity,
  febrileNeutropeniaFirstHour,
  hazardousDrugHandlingInClinicalAreas,
  hepaticDoseAdjustmentOfAnticancerDrugs,
  hypercalcaemiaOfMalignancy,
  hyperleukocytosisLeukostasis,
  hyponatraemiaSiadh,
  icahtProlongedCytopenia,
  icansGradingAndManagement,
  iecHsManagement,
  implantedPortAccessAndCare,
  infusionReactionManagement,
  intrathecalChemotherapyAndVincaAlkaloidSafety,
  iraeColitis,
  iraeDiabetes,
  iraeHaematological,
  iraeHepatitis,
  iraeHypophysitisAdrenal,
  iraeMyocarditis,
  iraeNephritis,
  iraeNeurological,
  iraeOcular,
  iraePneumonitis,
  iraeRechallenge,
  iraeRheumatological,
  iraeSkin,
  iraeSteroidTaperAndPjp,
  iraeThyroid,
  malignantBowelObstruction,
  malignantPericardialEffusion,
  medicinesReconciliationInCancerCare,
  metastaticSpinalCordCompression,
  midlineCathetersForAnticancerTherapy,
  neutropenicEnterocolitis,
  oralAnticancerMedicinesAtHome,
  peripheralCannulaForAnticancerTherapy,
  piccAndTunnelledLineCare,
  premedicationBeforeReactionProneAnticancerDrugs,
  raisedIntracranialPressure,
  renalDoseAdjustmentOfAnticancerDrugs,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  superiorVenaCavaObstruction,
  suspectedCentralLineInfection,
  tumourLysisSyndrome,
  venousAccessDeviceSelectionForAnticancerTherapy,
];
