import type { InstitutionInput } from "@/lib/schema";

const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

/**
 * National cancer societies and leagues that are UICC members (src/data/universe-lists/uicc-member-directory.json) and
 * that the corpus lacked when the list was first measured on 4 November 2026 (scripts/institution-coverage.ts). Facts are
 * from each organisation's own website and its UICC member profile, read as raw text; coordinates are city-centre
 * approximations. Charities use institutionType "consortium".
 */
export const institutionsUiccSocieties: InstitutionInput[] = [
];
