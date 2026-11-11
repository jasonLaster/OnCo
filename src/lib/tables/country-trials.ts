import type { Trial } from "@/lib/schema";
import { phaseLabel, routeFor } from "@/lib/kinds";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import { autoCountryCodes, trialsIn } from "@/lib/country-pages";

/**
 * The trials table of an automatic country page (/countries/<iso2>/): every trial record whose ClinicalTrials.gov
 * capture lists a site in the country. Belgium has more than 900, so pages with more than one page of rows carry
 * the first and fetch the rest from /api/v1/tables/country-trials-<iso2>.json.
 */
export const countryTrialsTableId = (iso2: string) => `country-trials-${iso2.toLowerCase()}`;

export const COUNTRY_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "registry", label: "Registry status", filterable: true, tip: "The study's overall status on ClinicalTrials.gov when it was captured; it does not say whether a site in this country is open." },
  { key: "sponsor", label: "Lead sponsor", hide: "hidden md:table-cell", className: "text-muted max-w-xs" },
  { key: "sites", label: "Sites", sortable: true, numeric: true, hide: "hidden sm:table-cell", className: "text-right tabular-nums" },
  { key: "updated", label: "Registry update", sortable: true, hide: "hidden lg:table-cell", className: "text-muted whitespace-nowrap" },
];

const humanStatus = (s?: string) => (s ? s.charAt(0) + s.slice(1).toLowerCase().replace(/_/g, " ") : undefined);

/** Rows in the page's order: recruiting first, then the most recently updated registry entry. */
export function countryTrialRows(trials: Trial[]): StaticRow[] {
  return trials.map((t): StaticRow => {
    const p = t.participation ?? [];
    const sites = p.reduce((a, x) => a + x.siteCount, 0);
    const updated = p.map((x) => x.lastUpdatePosted ?? "").sort().at(-1) || undefined;
    return {
      id: t.id,
      trial: { text: t.name, href: routeFor(t), strong: true, sub: p.map((x) => x.nct).join(", ") || t.nct },
      phase: phaseLabel(t.phase),
      registry: humanStatus(p.find((x) => x.overallStatus === "RECRUITING")?.overallStatus ?? p[0]?.overallStatus),
      sponsor: p[0]?.leadSponsor ?? t.sponsor,
      sites: sites ? { text: sites.toLocaleString("en-GB"), v: sites } : undefined,
      updated,
    };
  });
}

/** Every automatic country's trial rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function countryTrialTables(): Array<{ id: string; rows: StaticRow[] }> {
  return autoCountryCodes().map((c) => ({ id: countryTrialsTableId(c), rows: countryTrialRows(trialsIn(c)) }));
}
