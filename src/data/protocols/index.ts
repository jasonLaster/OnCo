import type { ProtocolInput } from "@/lib/schema";
import { anticipatoryNauseaAndVomiting } from "./anticipatory-nausea-and-vomiting";
import { antiemeticProphylaxisByEmeticRisk } from "./antiemetic-prophylaxis-by-emetic-risk";
import { boneHealthOnHormoneTherapy } from "./bone-health-on-hormone-therapy";
import { breastCancerFollowUpAfterTreatment } from "./breast-cancer-follow-up-after-treatment";
import { breastScreeningAfterChestRadiotherapyAtAYoungAge } from "./breast-screening-after-chest-radiotherapy-at-a-young-age";
import { cancerRelatedFatigueScreeningAndManagement } from "./cancer-related-fatigue-screening-and-management";
import { cardioOncologyRiskAssessmentAndCardiacSurveillance } from "./cardio-oncology-risk-assessment-and-cardiac-surveillance";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { chemotherapyInducedAnaemiaEsaAndIron } from "./chemotherapy-induced-anaemia-esa-and-iron";
import { chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention } from "./chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention";
import { chronicPainInCancerSurvivors } from "./chronic-pain-in-cancer-survivors";
import { colorectalCancerFollowUpAfterCurativeTreatment } from "./colorectal-cancer-follow-up-after-curative-treatment";
import { dentalAssessmentBeforeBoneModifyingAgents } from "./dental-assessment-before-bone-modifying-agents";
import { distressScreeningAndReferral } from "./distress-screening-and-referral";
import { egfrInhibitorRashProphylaxis } from "./egfr-inhibitor-rash-prophylaxis";
import { exerciseDuringAndAfterCancerTreatment } from "./exercise-during-and-after-cancer-treatment";
import { eyeCareWithOcularToxicAntibodyDrugConjugates } from "./eye-care-with-ocular-toxic-antibody-drug-conjugates";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { fertilityPreservationBeforeCancerTreatment } from "./fertility-preservation-before-cancer-treatment";
import { gCsfProphylaxisByFebrileNeutropeniaRisk } from "./g-csf-prophylaxis-by-febrile-neutropenia-risk";
import { geriatricAssessmentBeforeSystemicCancerTherapy } from "./geriatric-assessment-before-systemic-cancer-therapy";
import { handFootSyndromePreventionAndDoseModification } from "./hand-foot-syndrome-prevention-and-dose-modification";
import { hotFlushesOnEndocrineTherapyNonHormonalOptions } from "./hot-flushes-on-endocrine-therapy-non-hormonal-options";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { insomniaInAdultsWithCancer } from "./insomnia-in-adults-with-cancer";
import { irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea } from "./irinotecan-early-cholinergic-syndrome-and-late-diarrhoea";
import { lymphoedemaRiskReductionSurveillanceAndTreatment } from "./lymphoedema-risk-reduction-surveillance-and-treatment";
import { nauseaAndVomitingInAdvancedCancer } from "./nausea-and-vomiting-in-advanced-cancer";
import { neratinibDiarrhoeaProphylaxisAndDoseEscalation } from "./neratinib-diarrhoea-prophylaxis-and-dose-escalation";
import { nutritionScreeningAndSupportDuringCancerTreatment } from "./nutrition-screening-and-support-during-cancer-treatment";
import { oralMucositisPreventionAndOralCare } from "./oral-mucositis-prevention-and-oral-care";
import { redCellAndPlateletTransfusionThresholds } from "./red-cell-and-platelet-transfusion-thresholds";
import { scalpCoolingDuringChemotherapy } from "./scalp-cooling-during-chemotherapy";
import { sexualHealthAssessmentAndInterventions } from "./sexual-health-assessment-and-interventions";
import { survivorshipCarePlanAndTreatmentSummary } from "./survivorship-care-plan-and-treatment-summary";
import { treatmentInducedDiarrhoeaGradingAndManagement } from "./treatment-induced-diarrhoea-grading-and-management";
import { vteRiskAssessmentAndThromboprophylaxisAmbulatory } from "./vte-risk-assessment-and-thromboprophylaxis-ambulatory";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  anticipatoryNauseaAndVomiting,
  antiemeticProphylaxisByEmeticRisk,
  boneHealthOnHormoneTherapy,
  breastCancerFollowUpAfterTreatment,
  breastScreeningAfterChestRadiotherapyAtAYoungAge,
  cancerRelatedFatigueScreeningAndManagement,
  cardioOncologyRiskAssessmentAndCardiacSurveillance,
  chemotherapyExtravasationManagement,
  chemotherapyInducedAnaemiaEsaAndIron,
  chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention,
  chronicPainInCancerSurvivors,
  colorectalCancerFollowUpAfterCurativeTreatment,
  dentalAssessmentBeforeBoneModifyingAgents,
  distressScreeningAndReferral,
  egfrInhibitorRashProphylaxis,
  exerciseDuringAndAfterCancerTreatment,
  eyeCareWithOcularToxicAntibodyDrugConjugates,
  febrileNeutropeniaFirstHour,
  fertilityPreservationBeforeCancerTreatment,
  gCsfProphylaxisByFebrileNeutropeniaRisk,
  geriatricAssessmentBeforeSystemicCancerTherapy,
  handFootSyndromePreventionAndDoseModification,
  hotFlushesOnEndocrineTherapyNonHormonalOptions,
  implantedPortAccessAndCare,
  insomniaInAdultsWithCancer,
  irinotecanEarlyCholinergicSyndromeAndLateDiarrhoea,
  lymphoedemaRiskReductionSurveillanceAndTreatment,
  nauseaAndVomitingInAdvancedCancer,
  neratinibDiarrhoeaProphylaxisAndDoseEscalation,
  nutritionScreeningAndSupportDuringCancerTreatment,
  oralMucositisPreventionAndOralCare,
  redCellAndPlateletTransfusionThresholds,
  scalpCoolingDuringChemotherapy,
  sexualHealthAssessmentAndInterventions,
  survivorshipCarePlanAndTreatmentSummary,
  treatmentInducedDiarrhoeaGradingAndManagement,
  vteRiskAssessmentAndThromboprophylaxisAmbulatory,
];
