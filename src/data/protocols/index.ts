import type { ProtocolInput } from "@/lib/schema";
import { careInTheLastDaysOfLife } from "./care-in-the-last-days-of-life";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
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
import { malignantAscitesDrainage } from "./malignant-ascites-drainage";
import { mouthCareDuringCancerTreatment } from "./mouth-care-during-cancer-treatment";
import { opioidSwitchingAndConversion } from "./opioid-switching-and-conversion";
import { palliativeSedation } from "./palliative-sedation-for-refractory-suffering";
import { routinePreoperativeTests } from "./routine-preoperative-tests";
import { strongOpioidsForCancerPain } from "./strong-opioids-for-cancer-pain";
import { surgicalSiteInfectionPrevention } from "./surgical-site-infection-prevention";
import { syringeDriverContinuousSubcutaneousInfusion } from "./syringe-driver-continuous-subcutaneous-infusion";
import { vteProphylaxisAfterCancerSurgery } from "./vte-prophylaxis-after-cancer-surgery";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  careInTheLastDaysOfLife,
  chemotherapyExtravasationManagement,
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
  malignantAscitesDrainage,
  mouthCareDuringCancerTreatment,
  opioidSwitchingAndConversion,
  palliativeSedation,
  routinePreoperativeTests,
  strongOpioidsForCancerPain,
  surgicalSiteInfectionPrevention,
  syringeDriverContinuousSubcutaneousInfusion,
  vteProphylaxisAfterCancerSurgery,
];
