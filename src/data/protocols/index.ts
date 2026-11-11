import type { ProtocolInput } from "@/lib/schema";
import { antiVegfDrugsAroundSurgery } from "./anti-vegf-drugs-around-surgery";
import { antithromboticInterruptionAroundSurgery } from "./antithrombotic-interruption-around-surgery";
import { bleedingPrecautionsWhenPlateletsAreLow } from "./bleeding-precautions-when-platelets-are-low";
import { careInTheLastDaysOfLife } from "./care-in-the-last-days-of-life";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { dietAlcoholAndWeightDuringCancerTreatment } from "./diet-alcohol-and-weight-during-cancer-treatment";
import { drivingFlyingAndTravelDuringCancerTreatment } from "./driving-flying-and-travel-during-cancer-treatment";
import { enhancedRecoveryAfterBreastReconstruction } from "./enhanced-recovery-after-breast-reconstruction";
import { enhancedRecoveryAfterColorectalSurgery } from "./enhanced-recovery-after-colorectal-surgery";
import { enhancedRecoveryAfterCytoreductiveSurgeryAndHipec } from "./enhanced-recovery-after-cytoreductive-surgery-and-hipec";
import { enhancedRecoveryAfterGastrectomy } from "./enhanced-recovery-after-gastrectomy";
import { enhancedRecoveryAfterGynaecologicalCancerSurgery } from "./enhanced-recovery-after-gynaecological-cancer-surgery";
import { enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery } from "./enhanced-recovery-after-head-and-neck-free-flap-surgery";
import { enhancedRecoveryAfterLiverSurgery } from "./enhanced-recovery-after-liver-surgery";
import { enhancedRecoveryAfterLungSurgery } from "./enhanced-recovery-after-lung-surgery";
import { enhancedRecoveryAfterOesophagectomy } from "./enhanced-recovery-after-oesophagectomy";
import { enhancedRecoveryAfterPancreatoduodenectomy } from "./enhanced-recovery-after-pancreatoduodenectomy";
import { enhancedRecoveryAfterRadicalCystectomy } from "./enhanced-recovery-after-radical-cystectomy";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { indwellingPleuralCatheterDrainageAtHome } from "./indwelling-pleural-catheter-drainage-at-home";
import { lymphoedemaRiskReductionAfterNodeSurgery } from "./lymphoedema-risk-reduction-after-node-surgery";
import { malignantAscitesDrainage } from "./malignant-ascites-drainage";
import { mouthCareDuringCancerTreatment } from "./mouth-care-during-cancer-treatment";
import { opioidSwitchingAndConversion } from "./opioid-switching-and-conversion";
import { oralAnticancerMedicinesAtHome } from "./oral-anticancer-medicines-at-home";
import { palliativeSedation } from "./palliative-sedation-for-refractory-suffering";
import { routinePreoperativeTests } from "./routine-preoperative-tests";
import { sentinelNodeTracersAndBlueDyeSafety } from "./sentinel-node-tracers-and-blue-dye-safety";
import { sexAndContraceptionDuringChemotherapy } from "./sex-and-contraception-during-chemotherapy";
import { skinAndNailCareDuringCancerDrugTreatment } from "./skin-and-nail-care-during-cancer-drug-treatment";
import { strongOpioidsForCancerPain } from "./strong-opioids-for-cancer-pain";
import { sunProtectionDuringAndAfterCancerTreatment } from "./sun-protection-during-and-after-cancer-treatment";
import { surgicalSiteInfectionPrevention } from "./surgical-site-infection-prevention";
import { syringeDriverContinuousSubcutaneousInfusion } from "./syringe-driver-continuous-subcutaneous-infusion";
import { vteProphylaxisAfterCancerSurgery } from "./vte-prophylaxis-after-cancer-surgery";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  antiVegfDrugsAroundSurgery,
  antithromboticInterruptionAroundSurgery,
  bleedingPrecautionsWhenPlateletsAreLow,
  careInTheLastDaysOfLife,
  chemotherapyExtravasationManagement,
  dietAlcoholAndWeightDuringCancerTreatment,
  drivingFlyingAndTravelDuringCancerTreatment,
  enhancedRecoveryAfterBreastReconstruction,
  enhancedRecoveryAfterColorectalSurgery,
  enhancedRecoveryAfterCytoreductiveSurgeryAndHipec,
  enhancedRecoveryAfterGastrectomy,
  enhancedRecoveryAfterGynaecologicalCancerSurgery,
  enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery,
  enhancedRecoveryAfterLiverSurgery,
  enhancedRecoveryAfterLungSurgery,
  enhancedRecoveryAfterOesophagectomy,
  enhancedRecoveryAfterPancreatoduodenectomy,
  enhancedRecoveryAfterRadicalCystectomy,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
  indwellingPleuralCatheterDrainageAtHome,
  lymphoedemaRiskReductionAfterNodeSurgery,
  malignantAscitesDrainage,
  mouthCareDuringCancerTreatment,
  opioidSwitchingAndConversion,
  oralAnticancerMedicinesAtHome,
  palliativeSedation,
  routinePreoperativeTests,
  sentinelNodeTracersAndBlueDyeSafety,
  sexAndContraceptionDuringChemotherapy,
  skinAndNailCareDuringCancerDrugTreatment,
  strongOpioidsForCancerPain,
  sunProtectionDuringAndAfterCancerTreatment,
  surgicalSiteInfectionPrevention,
  syringeDriverContinuousSubcutaneousInfusion,
  vteProphylaxisAfterCancerSurgery,
];
