import type { ProtocolInput } from "@/lib/schema";
import { centralLineInsertionBundle } from "./central-line-insertion-bundle";
import { centralLineMaintenanceBundle } from "./central-line-maintenance-bundle";
import { paediatricFeverAndNeutropenia } from "./paediatric-fever-and-neutropenia";
import { chemotherapyExtravasationManagement } from "./chemotherapy-extravasation-management";
import { foodSafetyAndNeutropenicDiet } from "./food-safety-and-neutropenic-diet";
import { neutropenicPrecautionsAndDailyLife } from "./neutropenic-precautions-and-daily-life";
import { antibacterialProphylaxisInNeutropenia } from "./antibacterial-prophylaxis-in-neutropenia";
import { vaccinationAroundCancerTreatment } from "./vaccination-around-cancer-treatment";
import { hepatitisBScreeningAndReactivationProphylaxis } from "./hepatitis-b-screening-and-reactivation-prophylaxis";
import { herpesSimplexAndZosterAntiviralProphylaxis } from "./herpes-simplex-and-zoster-antiviral-prophylaxis";
import { pneumocystisPneumoniaProphylaxis } from "./pneumocystis-pneumonia-prophylaxis";
import { antifungalProphylaxisInHaematology } from "./antifungal-prophylaxis-in-haematology";
import { paediatricCisplatinHearingProtection } from "./paediatric-cisplatin-hearing-protection";
import { paediatricClostridioidesDifficile } from "./paediatric-clostridioides-difficile";
import { paediatricOralMucositisPrevention } from "./paediatric-oral-mucositis-prevention";
import { paediatricPlateletTransfusionThresholds } from "./paediatric-platelet-transfusion-thresholds";
import { paediatricChemotherapyNauseaVomitingPrevention } from "./paediatric-chemotherapy-nausea-vomiting-prevention";
import { paediatricFertilityPreservation } from "./paediatric-fertility-preservation";
import { handHygieneInCancerCare } from "./hand-hygiene-in-cancer-care";
import { paediatricProceduralPainAndSedation } from "./paediatric-procedural-pain-and-sedation";
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
  centralLineInsertionBundle,
  centralLineMaintenanceBundle,
  paediatricFeverAndNeutropenia,
  foodSafetyAndNeutropenicDiet,
  neutropenicPrecautionsAndDailyLife,
  antibacterialProphylaxisInNeutropenia,
  vaccinationAroundCancerTreatment,
  hepatitisBScreeningAndReactivationProphylaxis,
  herpesSimplexAndZosterAntiviralProphylaxis,
  pneumocystisPneumoniaProphylaxis,
  antifungalProphylaxisInHaematology,
  paediatricCisplatinHearingProtection,
  paediatricClostridioidesDifficile,
  paediatricOralMucositisPrevention,
  paediatricPlateletTransfusionThresholds,
  paediatricChemotherapyNauseaVomitingPrevention,
  paediatricFertilityPreservation,
  handHygieneInCancerCare,
  paediatricProceduralPainAndSedation,
];
