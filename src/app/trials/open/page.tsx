import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { StaticTable } from "@/components/filters/StaticTable";
import { pageRows } from "@/lib/static-tables";
import { OPEN_TRIAL_COLUMNS, OPEN_TRIALS_TABLE, openTrialRows, openTrials } from "@/lib/tables/open-trials";

export const metadata: Metadata = pageMeta({
  title: "Trials still taking part",
  description: "Every trial in OnCo whose registry record says it is recruiting, not yet recruiting or enrolling by invitation, filterable by cancer, country, phase and who it is open to, with the number of sites recruiting and the date the registry was read.",
  path: "/trials/open/",
});

/**
 * Finding a trial you could join.
 *
 * /trials/ is the reference table: every trial, filtered by cancer, phase, product, sponsor and the year it
 * reported. Four of those need the answer first and the fifth is about trials that have finished, so it cannot
 * answer the two questions someone looking for a trial actually has: is it open, and is it anywhere near me.
 * This page answers those from the registry fields in src/data/trial-participation.ts, with no network call.
 *
 * What it will not do: decide whether a reader is eligible. Recruiting is the registry's status for the whole
 * trial on the day it was read; a site near someone can be closed, and the criteria are long, conditional and
 * frequently unstated. The page says so above the table and links each row to the registry record.
 */
export default function OpenTrialsPage() {
  const open = openTrials();
  const rows = openTrialRows(open);
  const table = pageRows(OPEN_TRIALS_TABLE, rows);
  const recruiting = open.filter((r) => r.reading.overallStatus === "RECRUITING").length;
  const sites = open.reduce((n, r) => n + r.reading.recruitingSiteCount, 0);
  const countries = new Set(open.flatMap((r) => r.reading.countries ?? [])).size;
  // Every reading comes from one capture, so the newest date is the date of the table.
  const read = open.map((r) => r.reading.fetchedAt.slice(0, 10)).sort().at(-1);

  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Trials still taking part"
        lede={`${open.length.toLocaleString("en-GB")} trials in OnCo have a registry record saying they are still taking part, ${recruiting.toLocaleString("en-GB")} of them recruiting now, across ${sites.toLocaleString("en-GB")} recruiting sites in ${countries} countries. Filter by cancer, by country, by phase and by who the registry says the trial is open to.`} />
      <Container className="pb-16 space-y-4">
        <p className="text-sm text-muted max-w-3xl">
          Read from ClinicalTrials.gov on {read}. A status describes the whole trial on that date, not a
          particular hospital: a site near you can be closed while the trial recruits elsewhere, and a trial can
          close between that date and today. The age and sex rules are the only eligibility the registry states
          in a field; everything else, including prior treatment, biomarkers and organ function, is in the
          criteria text on the registry record each row links to. Nothing here decides whether you can join.
          Take it to your team, or ask the study contact named on the registry record.
        </p>
        <StaticTable rows={table.rows} more={table.more} columns={OPEN_TRIAL_COLUMNS} noun="trial" url
          defaultSort={{ key: "sites", dir: -1 }} />
        <p className="text-xs text-muted">
          ClinicalTrials.gov data courtesy of the US National Library of Medicine. Trials with no registry
          identifier, and those the registry records as completed or closed, are in the{" "}
          <Link className="underline" href="/trials/">full trials table</Link>.
        </p>
      </Container>
    </>
  );
}
