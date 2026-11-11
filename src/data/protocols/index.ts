import type { ProtocolInput } from "@/lib/schema";
import { cancerAssociatedVteTreatment } from "./cancer-associated-vte-treatment";
import { catheterRelatedThrombosisInCancer } from "./catheter-related-thrombosis-in-cancer";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { dpydTestingBeforeFluoropyrimidines } from "./dpyd-testing-before-fluoropyrimidines";
import { febrileNeutropeniaFirstHour } from "./febrile-neutropenia-first-hour";
import { hazardousDrugHandlingInClinicalAreas } from "./hazardous-drug-handling-in-clinical-areas";
import { implantedPortAccessAndCare } from "./implanted-port-access-and-care";
import { infusionReactionManagement } from "./infusion-reaction-management";
import { piccAndTunnelledLineCare } from "./picc-and-tunnelled-line-care";
import { premedicationBeforeReactionProneAnticancerDrugs } from "./premedication-before-reaction-prone-anticancer-drugs";
import { sactAdministrationChecksAtTheChair } from "./sact-administration-checks-at-the-chair";
import { sactPrescribingAndPharmacyVerification } from "./sact-prescribing-and-pharmacy-verification";
import { suspectedCentralLineInfection } from "./suspected-central-line-infection";

/**
 * Every care protocol, one import per file. Fill agents add their file here; the list is a plain union, so a parallel
 * round resolves by keeping both sides. Rules in docs/PROTOCOLS.md.
 */
export const protocols: ProtocolInput[] = [
  cancerAssociatedVteTreatment,
  catheterRelatedThrombosisInCancer,
  chemotherapyExtravasationManagement,
  dpydTestingBeforeFluoropyrimidines,
  febrileNeutropeniaFirstHour,
  hazardousDrugHandlingInClinicalAreas,
  implantedPortAccessAndCare,
  infusionReactionManagement,
  piccAndTunnelledLineCare,
  premedicationBeforeReactionProneAnticancerDrugs,
  sactAdministrationChecksAtTheChair,
  sactPrescribingAndPharmacyVerification,
  suspectedCentralLineInfection,
];
