import type { ProtocolInput } from "@/lib/schema";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { breathHoldLeftBreastRadiotherapy } from "./breath-hold-left-breast-radiotherapy";
import { breastRadiotherapyPositioningAndSetup } from "./breast-radiotherapy-positioning-and-setup";
import { radiationDermatitisSkinCare } from "./radiation-dermatitis-skin-care";
import { prostateRadiotherapyBladderAndRectalPreparation } from "./prostate-radiotherapy-bladder-and-rectal-preparation";
import { radiotherapyPatientIdentificationAndTimeOut } from "./radiotherapy-patient-identification-and-time-out";
import { iodinatedContrastKidneyAndMetformin } from "./iodinated-contrast-kidney-and-metformin";
import { contrastReactionHistoryAndPremedication } from "./contrast-reaction-history-and-premedication";
import { bowelPreparationForColonoscopy } from "./bowel-preparation-for-colonoscopy";
import { fdgPetCtPreparation } from "./fdg-pet-ct-preparation";
import { anticoagulantsAndAntiplateletsBeforeEndoscopy } from "./anticoagulants-and-antiplatelets-before-endoscopy";
import { mriSafetyScreeningImplants } from "./mri-safety-screening-implants";
import { headAndNeckRadiotherapyOralMucositis } from "./head-and-neck-radiotherapy-oral-mucositis";
import { pelvicRadiationDiseaseBowelSymptoms } from "./pelvic-radiation-disease-bowel-symptoms";
import { lutetium177TherapyHomeRadiationSafety } from "./lutetium-177-therapy-home-radiation-safety";
import { headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis } from "./head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis";
import { radiotherapyPregnancyAndBreastfeedingEnquiry } from "./radiotherapy-pregnancy-and-breastfeeding-enquiry";
import { linearAcceleratorQualityAssurance } from "./linear-accelerator-quality-assurance";
import { radiotherapyConsent } from "./radiotherapy-consent";
import { radiotherapyDoseFractionationReference } from "./radiotherapy-dose-fractionation-reference";
import { radiotherapyRiskAnalysisFmea } from "./radiotherapy-risk-analysis-fmea";
import { fertilityProtectionBeforePelvicRadiotherapy } from "./fertility-protection-before-pelvic-radiotherapy";
import { hdrBrachytherapyRoomSafetyAndStuckSourceEmergency } from "./hdr-brachytherapy-room-safety-and-stuck-source-emergency";
import { radioiodineTherapyHomeRadiationSafety } from "./radioiodine-therapy-home-radiation-safety";
import { radionuclideTherapyPatientReleaseCriteria } from "./radionuclide-therapy-patient-release-criteria";
import { permanentProstateSeedBrachytherapyHomeRadiationSafety } from "./permanent-prostate-seed-brachytherapy-home-radiation-safety";
import { prostateBiopsyRouteAndAntibioticProphylaxis } from "./prostate-biopsy-route-and-antibiotic-prophylaxis";
import { imageGuidedCoreBiopsyPreparationAndAftercare } from "./image-guided-core-biopsy-preparation-and-aftercare";
import { gadoliniumContrastKidneyImpairment } from "./gadolinium-contrast-kidney-impairment";
import { diagnosticBronchoscopyAndEbusPreparation } from "./diagnostic-bronchoscopy-and-ebus-preparation";
import { boneMarrowAspirateAndTrephineBiopsy } from "./bone-marrow-aspirate-and-trephine-biopsy";
import { radiotherapyWithPacemakerOrDefibrillator } from "./radiotherapy-with-pacemaker-or-defibrillator";
import { headAndNeckRadiotherapyImmobilisationMask } from "./head-and-neck-radiotherapy-immobilisation-mask";
import { stereotacticRadiosurgeryAndSbrtDeliverySafeguards } from "./stereotactic-radiosurgery-and-sbrt-delivery-safeguards";
import { respiratoryMotionManagement4dCtAndGating } from "./respiratory-motion-management-4d-ct-and-gating";
import { radiotherapyPlanningCtSimulation } from "./radiotherapy-planning-ct-simulation";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  chemotherapyExtravasationManagement,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
  breathHoldLeftBreastRadiotherapy,
  breastRadiotherapyPositioningAndSetup,
  radiationDermatitisSkinCare,
  prostateRadiotherapyBladderAndRectalPreparation,
  radiotherapyPatientIdentificationAndTimeOut,
  iodinatedContrastKidneyAndMetformin,
  contrastReactionHistoryAndPremedication,
  bowelPreparationForColonoscopy,
  fdgPetCtPreparation,
  anticoagulantsAndAntiplateletsBeforeEndoscopy,
  mriSafetyScreeningImplants,
  headAndNeckRadiotherapyOralMucositis,
  pelvicRadiationDiseaseBowelSymptoms,
  lutetium177TherapyHomeRadiationSafety,
  headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis,
  radiotherapyPregnancyAndBreastfeedingEnquiry,
  linearAcceleratorQualityAssurance,
  radiotherapyConsent,
  radiotherapyDoseFractionationReference,
  radiotherapyRiskAnalysisFmea,
  fertilityProtectionBeforePelvicRadiotherapy,
  hdrBrachytherapyRoomSafetyAndStuckSourceEmergency,
  radioiodineTherapyHomeRadiationSafety,
  radionuclideTherapyPatientReleaseCriteria,
  permanentProstateSeedBrachytherapyHomeRadiationSafety,
  prostateBiopsyRouteAndAntibioticProphylaxis,
  imageGuidedCoreBiopsyPreparationAndAftercare,
  gadoliniumContrastKidneyImpairment,
  diagnosticBronchoscopyAndEbusPreparation,
  boneMarrowAspirateAndTrephineBiopsy,
  radiotherapyWithPacemakerOrDefibrillator,
  headAndNeckRadiotherapyImmobilisationMask,
  stereotacticRadiosurgeryAndSbrtDeliverySafeguards,
  respiratoryMotionManagement4dCtAndGating,
  radiotherapyPlanningCtSimulation,
];
