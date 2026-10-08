import { graph } from "@/lib/graph";
import type { Trial, TrialParticipation } from "@/lib/schema";
import { phaseLabel, routeFor } from "@/lib/kinds";
import { statusClass } from "@/lib/text";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";

/** The /trials/open/ table: trials a reader could still join, by what the registry says about them. */
export const OPEN_TRIALS_TABLE = "open-trials";

/** The registry statuses that mean a trial is still taking part, with the words a reader uses for them. */
export const OPEN_STATUS: Record<string, string> = {
  RECRUITING: "Recruiting",
  NOT_YET_RECRUITING: "Not yet recruiting",
  ENROLLING_BY_INVITATION: "Enrolling by invitation",
};

/** Registry ages are "18 Years", "6 Months", "30 Days". Months, so the bands can be compared. */
export function ageMonths(age?: string): number | undefined {
  const m = /^(\d+(?:\.\d+)?)\s*(year|month|week|day|hour|minute)/i.exec(age ?? "");
  if (!m) return undefined;
  const n = Number(m[1]);
  switch (m[2].toLowerCase()) {
    case "year": return n * 12;
    case "month": return n;
    case "week": return (n * 7) / 30.44;
    default: return n / 30.44;
  }
}

const ADULT = 18 * 12;

/**
 * Who a trial is open to, in the words a reader would use. Only what the registry states: an unstated age or sex
 * produces no chip rather than a guess, and "18 and over" means the upper limit does not exclude adults, not
 * that any particular adult qualifies. The criteria themselves are on the registry record.
 */
export function openTo(p: TrialParticipation): string[] {
  const out: string[] = [];
  const min = ageMonths(p.minimumAge);
  const max = ageMonths(p.maximumAge);
  if (min !== undefined && min < ADULT) out.push("Under 18");
  if (max === undefined || max >= ADULT) out.push("18 and over");
  if (min !== undefined && min >= 65 * 12) out.push("65 and over");
  if (p.sex === "FEMALE") out.push("Women only");
  if (p.sex === "MALE") out.push("Men only");
  return out;
}

/** The registry reading a row is built from: the first one that is still open, else the first of any. */
export function openReading(t: Trial): TrialParticipation | undefined {
  const list = t.participation ?? [];
  return list.find((p) => p.overallStatus && p.overallStatus in OPEN_STATUS) ?? undefined;
}

/** Trials whose registry record says they are still taking part, most recruiting sites first. */
export function openTrials(): Array<{ trial: Trial; reading: TrialParticipation }> {
  return graph().kind("trial")
    .flatMap((t) => { const reading = openReading(t); return reading ? [{ trial: t, reading }] : []; })
    .sort((a, b) => b.reading.recruitingSiteCount - a.reading.recruitingSiteCount
      || b.reading.siteCount - a.reading.siteCount
      || a.trial.name.localeCompare(b.trial.name));
}

export const OPEN_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "status", label: "Status", filterable: true, className: "whitespace-nowrap" },
  { key: "cancers", label: "Cancer", filterable: true, className: "max-w-xs" },
  { key: "phase", label: "Phase", filterable: true, className: "text-muted whitespace-nowrap" },
  { key: "openTo", label: "Open to", filterable: true, className: "whitespace-nowrap" },
  { key: "countries", label: "Countries", filterable: true, hide: "hidden lg:table-cell", className: "text-muted max-w-sm" },
  { key: "sites", label: "Sites recruiting", filterable: false, sortable: true, numeric: true, className: "text-muted" },
];

export function openTrialRows(rows = openTrials()): StaticRow[] {
  const g = graph();
  return rows.map(({ trial: t, reading: p }) => ({
    id: t.id,
    trial: { text: t.name, href: routeFor(t), strong: true, sub: p.nct },
    // "Recruiting" is the registry's status for the whole trial, read on the date the page states. A site near a
    // reader can still be closed, which is why the page says so above the table and the record repeats it.
    status: { text: OPEN_STATUS[p.overallStatus!] ?? p.overallStatus!, chip: statusClass(p.overallStatus === "RECRUITING" ? "established" : "emerging") },
    cancers: t.cancers.flatMap((id) => { const c = g.get(id); return c ? [{ text: c.name, href: routeFor(c) }] : []; }) as CellObj[],
    phase: phaseLabel(t.phase),
    openTo: openTo(p).map((text) => ({ text })) as CellObj[],
    countries: (p.countries ?? []).map((text) => ({ text })) as CellObj[],
    sites: { text: p.recruitingSiteCount ? String(p.recruitingSiteCount) : "-", v: p.recruitingSiteCount },
  }));
}
