import type { ProtocolInput } from "@/lib/schema";
import { antiemeticProphylaxisByEmeticRisk } from "./antiemetic-prophylaxis-by-emetic-risk";
import { boneHealthOnHormoneTherapy } from "./bone-health-on-hormone-therapy";
import { breastCancerFollowUpAfterTreatment } from "./breast-cancer-follow-up-after-treatment";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { colorectalCancerFollowUpAfterCurativeTreatment } from "./colorectal-cancer-follow-up-after-curative-treatment";
import { dentalAssessmentBeforeBoneModifyingAgents } from "./dental-assessment-before-bone-modifying-agents";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { fertilityPreservationBeforeCancerTreatment } from "./fertility-preservation-before-cancer-treatment";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { oralMucositisPreventionAndOralCare } from "./oral-mucositis-prevention-and-oral-care";
import { vteRiskAssessmentAndThromboprophylaxisAmbulatory } from "./vte-risk-assessment-and-thromboprophylaxis-ambulatory";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  antiemeticProphylaxisByEmeticRisk,
  boneHealthOnHormoneTherapy,
  breastCancerFollowUpAfterTreatment,
  chemotherapyExtravasationManagement,
  colorectalCancerFollowUpAfterCurativeTreatment,
  dentalAssessmentBeforeBoneModifyingAgents,
  febrileNeutropeniaFirstHour,
  fertilityPreservationBeforeCancerTreatment,
  implantedPortAccessAndCare,
  oralMucositisPreventionAndOralCare,
  vteRiskAssessmentAndThromboprophylaxisAmbulatory,
];
