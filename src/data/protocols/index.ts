import type { ProtocolInput } from "@/lib/schema";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  chemotherapyExtravasationManagement,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
];
