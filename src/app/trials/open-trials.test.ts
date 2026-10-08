import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { vi } from "vitest";
import { graph } from "@/lib/graph";
import { ageMonths, openTo, OPEN_STATUS, openTrialRows, openTrials } from "@/lib/tables/open-trials";
import { allTables } from "@/lib/tables";
import { OPEN_TRIALS_TABLE } from "@/lib/tables/open-trials";
import Page from "./open/page";

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = () => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(Page)));

/**
 * /trials/open/ (src/app/trials/open/page.tsx, src/lib/tables/open-trials.ts).
 *
 * The page exists because /trials/ cannot answer "is it open, and is it near me": its facets are cancer,
 * phase, product, sponsor and the year a trial reported. This holds the two things that make the new page
 * honest rather than merely useful: every row is a trial the registry says is still taking part, and the page
 * never implies that a reader qualifies or that a site near them is open.
 */
describe("trials still taking part", () => {
  const open = openTrials();

  it("takes only trials the registry says are still taking part", () => {
    expect(open.length).toBeGreaterThan(2000);
    for (const { reading } of open) expect(reading.overallStatus, reading.nct).toBeDefined();
    for (const { reading } of open) expect(Object.keys(OPEN_STATUS)).toContain(reading.overallStatus);
    // A completed or terminated trial belongs in the reference table, not this one.
    const ids = new Set(open.map((r) => r.trial.id));
    const closed = graph().kind("trial").filter((t) => t.participation?.length && !ids.has(t.id));
    expect(closed.length, "the page is a subset of the corpus").toBeGreaterThan(0);
    for (const t of closed) for (const p of t.participation ?? []) expect(Object.keys(OPEN_STATUS)).not.toContain(p.overallStatus);
  });

  it("reads registry ages in the units the registry writes them", () => {
    expect(ageMonths("18 Years")).toBe(216);
    expect(ageMonths("6 Months")).toBe(6);
    expect(ageMonths("30 Days")).toBeCloseTo(0.99, 1);
    expect(ageMonths(undefined), "an unstated age is unknown, not zero").toBeUndefined();
    expect(ageMonths("N/A")).toBeUndefined();
  });

  it("states only the eligibility the registry puts in a field", () => {
    expect(openTo({ minimumAge: "18 Years", hasEligibility: true } as never)).toEqual(["18 and over"]);
    expect(openTo({ minimumAge: "6 Months", maximumAge: "17 Years", hasEligibility: true } as never)).toEqual(["Under 18"]);
    expect(openTo({ minimumAge: "18 Years", sex: "FEMALE", hasEligibility: true } as never)).toEqual(["18 and over", "Women only"]);
    // No age stated is no claim about age.
    expect(openTo({ sex: "ALL", hasEligibility: true } as never)).toEqual(["18 and over"]);
  });

  it("every row links to the trial record and carries its registry id", () => {
    const rows = openTrialRows(open.slice(0, 50));
    for (const r of rows) {
      const trial = r.trial as { href?: string; sub?: string };
      expect(trial.href).toMatch(/^\/trials\/[a-z0-9-]+\/$/);
      expect(trial.sub).toMatch(/^NCT\d{8}$/);
    }
  });

  it("is a registered paged table, so the page carries one page and the file the rest", () => {
    const table = allTables().find((t) => t.id === OPEN_TRIALS_TABLE);
    expect(table, "registered in src/lib/tables/index.ts").toBeDefined();
    expect(table!.rows.length).toBe(open.length);
  });

  it("says what recruiting does not mean, and when the registry was read", () => {
    const html = render();
    expect(html).toContain("a site near you can be closed");
    expect(html).toContain("Nothing here decides whether you can join");
    expect(html).toMatch(/Read from ClinicalTrials\.gov on \d{4}-\d{2}-\d{2}/);
    expect(html).toContain("courtesy of the US National Library of Medicine");
    // The reference table is still the place for everything else.
    expect(html).toMatch(/href="\/trials\/?"/);
  });
});
