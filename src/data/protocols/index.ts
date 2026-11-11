import type { ProtocolInput } from "@/lib/schema";
import { acuteOncologyTelephoneTriage } from "./acute-oncology-telephone-triage";
import { alloHctGvhdProphylaxis } from "./allo-hct-gvhd-prophylaxis";
import { ambulatoryChemotherapyPumpsAtHome } from "./ambulatory-chemotherapy-pumps-at-home";
import { anticancerDrugInteractionReview } from "./anticancer-drug-interaction-review";
import { anticoagulantsAndAntiplateletsBeforeEndoscopy } from "./anticoagulants-and-antiplatelets-before-endoscopy";
import { asepticCompoundingOfHazardousAnticancerDrugs } from "./aseptic-compounding-of-hazardous-anticancer-drugs";
import { bispecificStepUpDosing } from "./bispecific-step-up-dosing";
import { bloodSamplingFromACentralLine } from "./blood-sampling-from-a-central-line";
import { bodySizeBasedDoseCalculation } from "./body-size-based-dose-calculation";
import { boneMarrowAspirateAndTrephineBiopsy } from "./bone-marrow-aspirate-and-trephine-biopsy";
import { bowelPreparationForColonoscopy } from "./bowel-preparation-for-colonoscopy";
import { breastRadiotherapyPositioningAndSetup } from "./breast-radiotherapy-positioning-and-setup";
import { breathHoldLeftBreastRadiotherapy } from "./breath-hold-left-breast-radiotherapy";
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
import { contrastReactionHistoryAndPremedication } from "./contrast-reaction-history-and-premedication";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { diagnosticBronchoscopyAndEbusPreparation } from "./diagnostic-bronchoscopy-and-ebus-preparation";
import { doseBandingOfAnticancerDrugs } from "./dose-banding-of-anticancer-drugs";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { drugDesensitisationAfterAnticancerHypersensitivity } from "./drug-desensitisation-after-anticancer-hypersensitivity";
import { fdgPetCtPreparation } from "./fdg-pet-ct-preparation";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { fertilityProtectionBeforePelvicRadiotherapy } from "./fertility-protection-before-pelvic-radiotherapy";
import { gadoliniumContrastKidneyImpairment } from "./gadolinium-contrast-kidney-impairment";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { hdrBrachytherapyRoomSafetyAndStuckSourceEmergency } from "./hdr-brachytherapy-room-safety-and-stuck-source-emergency";
import { headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis } from "./head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis";
import { headAndNeckRadiotherapyImmobilisationMask } from "./head-and-neck-radiotherapy-immobilisation-mask";
import { headAndNeckRadiotherapyOralMucositis } from "./head-and-neck-radiotherapy-oral-mucositis";
import { hepaticDoseAdjustmentOfAnticancerDrugs } from "./hepatic-dose-adjustment-of-anticancer-drugs";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { hyperleukocytosisLeukostasis } from "./hyperleukocytosis-leukostasis";
import { hyponatraemiaSiadh } from "./hyponatraemia-siadh";
import { icahtProlongedCytopenia } from "./icaht-prolonged-cytopenia";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { iecHsManagement } from "./iec-hs-management";
import { imageGuidedCoreBiopsyPreparationAndAftercare } from "./image-guided-core-biopsy-preparation-and-aftercare";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { intrathecalChemotherapyAndVincaAlkaloidSafety } from "./intrathecal-chemotherapy-and-vinca-alkaloid-safety";
import { iodinatedContrastKidneyAndMetformin } from "./iodinated-contrast-kidney-and-metformin";
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
import { linearAcceleratorQualityAssurance } from "./linear-accelerator-quality-assurance";
import { lutetium177TherapyHomeRadiationSafety } from "./lutetium-177-therapy-home-radiation-safety";
import { malignantBowelObstruction } from "./malignant-bowel-obstruction";
import { malignantPericardialEffusion } from "./malignant-pericardial-effusion";
import { medicinesReconciliationInCancerCare } from "./medicines-reconciliation-in-cancer-care";
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";
import { midlineCathetersForAnticancerTherapy } from "./midline-catheters-for-anticancer-therapy";
import { mriSafetyScreeningImplants } from "./mri-safety-screening-implants";
import { neutropenicEnterocolitis } from "./neutropenic-enterocolitis";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
import { pelvicRadiationDiseaseBowelSymptoms } from "./pelvic-radiation-disease-bowel-symptoms";
import { peripheralCannulaForAnticancerTherapy } from "./peripheral-cannula-for-anticancer-therapy";
import { permanentProstateSeedBrachytherapyHomeRadiationSafety } from "./permanent-prostate-seed-brachytherapy-home-radiation-safety";
import { piccAndTunnelledLineCare } from "./picc-and-tunnelled-line-care";
import { premedicationBeforeReactionProneAnticancerDrugs } from "./premedication-before-reaction-prone-anticancer-drugs";
import { prostateBiopsyRouteAndAntibioticProphylaxis } from "./prostate-biopsy-route-and-antibiotic-prophylaxis";
import { prostateRadiotherapyBladderAndRectalPreparation } from "./prostate-radiotherapy-bladder-and-rectal-preparation";
import { radiationDermatitisSkinCare } from "./radiation-dermatitis-skin-care";
import { radioiodineTherapyHomeRadiationSafety } from "./radioiodine-therapy-home-radiation-safety";
import { radionuclideTherapyPatientReleaseCriteria } from "./radionuclide-therapy-patient-release-criteria";
import { radiotherapyConsent } from "./radiotherapy-consent";
import { radiotherapyDoseFractionationReference } from "./radiotherapy-dose-fractionation-reference";
import { radiotherapyPatientIdentificationAndTimeOut } from "./radiotherapy-patient-identification-and-time-out";
import { radiotherapyPlanningCtSimulation } from "./radiotherapy-planning-ct-simulation";
import { radiotherapyPregnancyAndBreastfeedingEnquiry } from "./radiotherapy-pregnancy-and-breastfeeding-enquiry";
import { radiotherapyRiskAnalysisFmea } from "./radiotherapy-risk-analysis-fmea";
import { radiotherapyWithPacemakerOrDefibrillator } from "./radiotherapy-with-pacemaker-or-defibrillator";
import { raisedIntracranialPressure } from "./raised-intracranial-pressure";
import { renalDoseAdjustmentOfAnticancerDrugs } from "./renal-dose-adjustment-of-anticancer-drugs";
import { respiratoryMotionManagement4dCtAndGating } from "./respiratory-motion-management-4d-ct-and-gating";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";
import { stereotacticRadiosurgeryAndSbrtDeliverySafeguards } from "./stereotactic-radiosurgery-and-sbrt-delivery-safeguards";
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
  anticoagulantsAndAntiplateletsBeforeEndoscopy,
  asepticCompoundingOfHazardousAnticancerDrugs,
  bispecificStepUpDosing,
  bloodSamplingFromACentralLine,
  bodySizeBasedDoseCalculation,
  boneMarrowAspirateAndTrephineBiopsy,
  bowelPreparationForColonoscopy,
  breastRadiotherapyPositioningAndSetup,
  breathHoldLeftBreastRadiotherapy,
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
  contrastReactionHistoryAndPremedication,
  crsGradingAndManagement,
  diagnosticBronchoscopyAndEbusPreparation,
  doseBandingOfAnticancerDrugs,
  dpydTestingBeforeFluoropyrimidines,
  drugDesensitisationAfterAnticancerHypersensitivity,
  fdgPetCtPreparation,
  febrileNeutropeniaFirstHour,
  fertilityProtectionBeforePelvicRadiotherapy,
  gadoliniumContrastKidneyImpairment,
  hazardousDrugHandlingInClinicalAreas,
  hdrBrachytherapyRoomSafetyAndStuckSourceEmergency,
  headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis,
  headAndNeckRadiotherapyImmobilisationMask,
  headAndNeckRadiotherapyOralMucositis,
  hepaticDoseAdjustmentOfAnticancerDrugs,
  hypercalcaemiaOfMalignancy,
  hyperleukocytosisLeukostasis,
  hyponatraemiaSiadh,
  icahtProlongedCytopenia,
  icansGradingAndManagement,
  iecHsManagement,
  imageGuidedCoreBiopsyPreparationAndAftercare,
  implantedPortAccessAndCare,
  infusionReactionManagement,
  intrathecalChemotherapyAndVincaAlkaloidSafety,
  iodinatedContrastKidneyAndMetformin,
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
  linearAcceleratorQualityAssurance,
  lutetium177TherapyHomeRadiationSafety,
  malignantBowelObstruction,
  malignantPericardialEffusion,
  medicinesReconciliationInCancerCare,
  metastaticSpinalCordCompression,
  midlineCathetersForAnticancerTherapy,
  mriSafetyScreeningImplants,
  neutropenicEnterocolitis,
  oralAnticancerMedicinesAtHome,
  pelvicRadiationDiseaseBowelSymptoms,
  peripheralCannulaForAnticancerTherapy,
  permanentProstateSeedBrachytherapyHomeRadiationSafety,
  piccAndTunnelledLineCare,
  premedicationBeforeReactionProneAnticancerDrugs,
  prostateBiopsyRouteAndAntibioticProphylaxis,
  prostateRadiotherapyBladderAndRectalPreparation,
  radiationDermatitisSkinCare,
  radioiodineTherapyHomeRadiationSafety,
  radionuclideTherapyPatientReleaseCriteria,
  radiotherapyConsent,
  radiotherapyDoseFractionationReference,
  radiotherapyPatientIdentificationAndTimeOut,
  radiotherapyPlanningCtSimulation,
  radiotherapyPregnancyAndBreastfeedingEnquiry,
  radiotherapyRiskAnalysisFmea,
  radiotherapyWithPacemakerOrDefibrillator,
  raisedIntracranialPressure,
  renalDoseAdjustmentOfAnticancerDrugs,
  respiratoryMotionManagement4dCtAndGating,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  stereotacticRadiosurgeryAndSbrtDeliverySafeguards,
  superiorVenaCavaObstruction,
  suspectedCentralLineInfection,
  tumourLysisSyndrome,
  venousAccessDeviceSelectionForAnticancerTherapy,
];
