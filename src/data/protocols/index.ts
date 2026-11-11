import type { ProtocolInput } from "@/lib/schema";
import { careInTheLastDaysOfLife } from "./care-in-the-last-days-of-life";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { enhancedRecoveryAfterLiverSurgery } from "./enhanced-recovery-after-liver-surgery";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { mouthCareDuringCancerTreatment } from "./mouth-care-during-cancer-treatment";
import { opioidSwitchingAndConversion } from "./opioid-switching-and-conversion";
import { palliativeSedation } from "./palliative-sedation-for-refractory-suffering";
import { strongOpioidsForCancerPain } from "./strong-opioids-for-cancer-pain";
import { surgicalSiteInfectionPrevention } from "./surgical-site-infection-prevention";
import { vteProphylaxisAfterCancerSurgery } from "./vte-prophylaxis-after-cancer-surgery";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  careInTheLastDaysOfLife,
  chemotherapyExtravasationManagement,
  enhancedRecoveryAfterLiverSurgery,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
  mouthCareDuringCancerTreatment,
  opioidSwitchingAndConversion,
  palliativeSedation,
  strongOpioidsForCancerPain,
  surgicalSiteInfectionPrevention,
  vteProphylaxisAfterCancerSurgery,
];
