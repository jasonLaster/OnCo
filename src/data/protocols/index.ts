import type { ProtocolInput } from "@/lib/schema";
import { careInTheLastDaysOfLife } from "./care-in-the-last-days-of-life";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { opioidSwitchingAndConversion } from "./opioid-switching-and-conversion";
import { strongOpioidsForCancerPain } from "./strong-opioids-for-cancer-pain";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  careInTheLastDaysOfLife,
  chemotherapyExtravasationManagement,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
  opioidSwitchingAndConversion,
  strongOpioidsForCancerPain,
];
