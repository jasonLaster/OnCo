import type { ProtocolInput } from "@/lib/schema";
import { acuteOncologyTelephoneTriage } from "./acute-oncology-telephone-triage";
import { alloHctGvhdProphylaxis } from "./allo-hct-gvhd-prophylaxis";
import { bispecificStepUpDosing } from "./bispecific-step-up-dosing";
import { carTApheresis } from "./car-t-apheresis";
import { carTBridging } from "./car-t-bridging";
import { carTInfectionPrevention } from "./car-t-infection-prevention";
import { carTLymphodepletion } from "./car-t-lymphodepletion";
import { carTReferralAndEligibility } from "./car-t-referral-and-eligibility";
import { checkpointInhibitorBaselineAndMonitoring } from "./checkpoint-inhibitor-baseline-and-monitoring";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { hyperleukocytosisLeukostasis } from "./hyperleukocytosis-leukostasis";
import { hyponatraemiaSiadh } from "./hyponatraemia-siadh";
import { icahtProlongedCytopenia } from "./icaht-prolonged-cytopenia";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { iecHsManagement } from "./iec-hs-management";
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
import { malignantBowelObstruction } from "./malignant-bowel-obstruction";
import { malignantPericardialEffusion } from "./malignant-pericardial-effusion";
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";
import { neutropenicEnterocolitis } from "./neutropenic-enterocolitis";
import { raisedIntracranialPressure } from "./raised-intracranial-pressure";
import { superiorVenaCavaObstruction } from "./superior-vena-cava-obstruction";
import { tumourLysisSyndrome } from "./tumour-lysis-syndrome";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  acuteOncologyTelephoneTriage,
  alloHctGvhdProphylaxis,
  bispecificStepUpDosing,
  carTApheresis,
  carTBridging,
  carTInfectionPrevention,
  carTLymphodepletion,
  carTReferralAndEligibility,
  checkpointInhibitorBaselineAndMonitoring,
  chemotherapyExtravasationManagement,
  crsGradingAndManagement,
  febrileNeutropeniaFirstHour,
  hypercalcaemiaOfMalignancy,
  hyperleukocytosisLeukostasis,
  hyponatraemiaSiadh,
  icahtProlongedCytopenia,
  icansGradingAndManagement,
  iecHsManagement,
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
  malignantBowelObstruction,
  malignantPericardialEffusion,
  metastaticSpinalCordCompression,
  neutropenicEnterocolitis,
  raisedIntracranialPressure,
  superiorVenaCavaObstruction,
  tumourLysisSyndrome,
];
