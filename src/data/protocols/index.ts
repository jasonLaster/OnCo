import type { ProtocolInput } from "@/lib/schema";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  chemotherapyExtravasationManagement,
  dpydTestingBeforeFluoropyrimidines,
  febrileNeutropeniaFirstHour,
  implantedPortAccessAndCare,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
];
