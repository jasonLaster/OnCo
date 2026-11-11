import type { ProtocolInput } from "@/lib/schema";
import { antiemeticProphylaxisByEmeticRisk } from "./antiemetic-prophylaxis-by-emetic-risk";
import { boneHealthOnHormoneTherapy } from "./bone-health-on-hormone-therapy";
import { breastCancerFollowUpAfterTreatment } from "./breast-cancer-follow-up-after-treatment";
import { cardioOncologyRiskAssessmentAndCardiacSurveillance } from "./cardio-oncology-risk-assessment-and-cardiac-surveillance";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { chemotherapyInducedAnaemiaEsaAndIron } from "./chemotherapy-induced-anaemia-esa-and-iron";
import { chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention } from "./chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention";
import { colorectalCancerFollowUpAfterCurativeTreatment } from "./colorectal-cancer-follow-up-after-curative-treatment";
import { dentalAssessmentBeforeBoneModifyingAgents } from "./dental-assessment-before-bone-modifying-agents";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { fertilityPreservationBeforeCancerTreatment } from "./fertility-preservation-before-cancer-treatment";
import { gCsfProphylaxisByFebrileNeutropeniaRisk } from "./g-csf-prophylaxis-by-febrile-neutropenia-risk";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { nutritionScreeningAndSupportDuringCancerTreatment } from "./nutrition-screening-and-support-during-cancer-treatment";
import { oralMucositisPreventionAndOralCare } from "./oral-mucositis-prevention-and-oral-care";
import { redCellAndPlateletTransfusionThresholds } from "./red-cell-and-platelet-transfusion-thresholds";
import { vteRiskAssessmentAndThromboprophylaxisAmbulatory } from "./vte-risk-assessment-and-thromboprophylaxis-ambulatory";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  antiemeticProphylaxisByEmeticRisk,
  boneHealthOnHormoneTherapy,
  breastCancerFollowUpAfterTreatment,
  cardioOncologyRiskAssessmentAndCardiacSurveillance,
  chemotherapyExtravasationManagement,
  chemotherapyInducedAnaemiaEsaAndIron,
  chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention,
  colorectalCancerFollowUpAfterCurativeTreatment,
  dentalAssessmentBeforeBoneModifyingAgents,
  febrileNeutropeniaFirstHour,
  fertilityPreservationBeforeCancerTreatment,
  gCsfProphylaxisByFebrileNeutropeniaRisk,
  implantedPortAccessAndCare,
  nutritionScreeningAndSupportDuringCancerTreatment,
  oralMucositisPreventionAndOralCare,
  redCellAndPlateletTransfusionThresholds,
  vteRiskAssessmentAndThromboprophylaxisAmbulatory,
];
