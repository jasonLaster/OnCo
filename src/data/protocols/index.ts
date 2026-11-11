import type { ProtocolInput } from "@/lib/schema";
import { checkpointInhibitorBaselineAndMonitoring } from "./checkpoint-inhibitor-baseline-and-monitoring";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { crsGradingAndManagement } from "./crs-grading-and-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hypercalcaemiaOfMalignancy } from "./hypercalcaemia-of-malignancy";
import { icansGradingAndManagement } from "./icans-grading-and-management";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { iraeColitis } from "./irae-colitis";
import { iraeHepatitis } from "./irae-hepatitis";
import { iraeHypophysitisAdrenal } from "./irae-hypophysitis-adrenal";
import { iraePneumonitis } from "./irae-pneumonitis";
import { metastaticSpinalCordCompression } from "./metastatic-spinal-cord-compression";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  checkpointInhibitorBaselineAndMonitoring,
  chemotherapyExtravasationManagement,
  crsGradingAndManagement,
  febrileNeutropeniaFirstHour,
  hypercalcaemiaOfMalignancy,
  icansGradingAndManagement,
  implantedPortAccessAndCare,
  iraeColitis,
  iraeHepatitis,
  iraeHypophysitisAdrenal,
  iraePneumonitis,
  metastaticSpinalCordCompression,
];
