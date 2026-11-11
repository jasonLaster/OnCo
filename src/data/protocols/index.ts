import type { ProtocolInput } from "@/lib/schema";
import { bispecificStepUpDosing } from "./bispecific-step-up-dosing";
import { carTInfectionPrevention } from "./car-t-infection-prevention";
import { checkpointInhibitorBaselineAndMonitoring } from "./checkpoint-inhibitor-baseline-and-monitoring";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
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
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";
import { tumourLysisSyndrome } from "./tumour-lysis-syndrome";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  bispecificStepUpDosing,
  carTInfectionPrevention,
  checkpointInhibitorBaselineAndMonitoring,
  chemotherapyExtravasationManagement,
  crsGradingAndManagement,
  febrileNeutropeniaFirstHour,
  hypercalcaemiaOfMalignancy,
  icansGradingAndManagement,
  implantedPortAccessAndCare,
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
  metastaticSpinalCordCompression,
  tumourLysisSyndrome,
];
