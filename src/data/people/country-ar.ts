import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/ar/ (wave 4). Each role was read on the Ministry of Health's own pages on 4 November 2026:
 * the Dirección Nacional del Cáncer's team page and the ROHA page.
 */
const asOf = "2026-11-04";
const TEAM = "https://www.argentina.gob.ar/salud/inc/institucional/equipo-de-trabajo";

export const peopleAR: PersonInput[] = [
  { kind: "person", asOf, id: "florencia-moreno", name: "Florencia Moreno",
    role: "Coordinator, Registro Oncopediátrico Hospitalario Argentino and national childhood cancer programme, Ministry of Health of Argentina",
    institutionId: "roha-argentina", institutions: ["roha-argentina", "inc-argentina"], specialisms: ["Childhood cancer epidemiology", "Paediatric oncology"],
    tldr: "Florencia Moreno coordinates Argentina's national childhood cancer registry and the Ministry of Health's programme for children and adolescents with cancer.",
    summary: "Dra. Florencia Moreno is named as coordinator of the Registro Oncopediátrico Hospitalario Argentino (ROHA) on its Ministry of Health page, and as coordinator of the Programa Nacional de Cuidado Integral del Niño, Niña y Adolescente con Cáncer (PROCUINCA) on the Dirección Nacional del Cáncer's team page. The programme coordinates the childhood cancer law (Law 27.674, regulated by Decree 68/2023) and issues the Certificado Único Oncopediátrico to children registered in ROHA.",
    profiles: [
      { label: "Ministerio de Salud: ROHA", url: "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/roha" },
      { label: "Ministerio de Salud: Dirección Nacional del Cáncer, equipo de trabajo", url: TEAM },
    ],
    links: [
      { label: "Ministerio de Salud: ROHA", url: "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/roha" },
      { label: "Ministerio de Salud: Dirección Nacional del Cáncer, equipo de trabajo", url: TEAM },
    ],
    tags: ["government", "paediatric-oncology"], cancers: [] },
];
