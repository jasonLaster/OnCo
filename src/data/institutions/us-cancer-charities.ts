import type { InstitutionInput } from "@/lib/schema";

const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

/**
 * US cancer charities from the IRS Exempt Organizations Business Master File (src/data/universe-lists/irs-cancer-charities.json), the ones the corpus lacked when the list was first measured on
 * 4 November 2026 (scripts/institution-coverage.ts). Every fact is from the organisation's own website or its charity
 * regulator record, read as raw text; coordinates are city-centre approximations. Charities use institutionType "consortium".
 */
export const institutionsUsCancerCharities: InstitutionInput[] = [
];
