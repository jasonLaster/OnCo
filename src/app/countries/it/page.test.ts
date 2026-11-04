import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import ItalyPage from "./page";
import { graph } from "@/lib/graph";
import { IT_COMPANIES, IT_DRUGS, IT_INSTITUTIONS, IT_PAPERS, IT_PEOPLE, IT_SITES, IT_TRIALS, IT_TRIAL_STARTS } from "@/data/country-it";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;

/**
 * /countries/it/ is written from Italian primary sources rather than from the corpus, so the things worth guarding are
 * that every id it names still resolves to the right kind (a renamed record would silently drop a section), that the
 * figures read from the national report reach the page, and that the page stays small enough to be worth loading.
 */
describe("the Italy country page", () => {
  it("names only ids that exist in the corpus, as the kind it expects", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(IT_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(IT_COMPANIES, "company")).toEqual([]);
    expect(check(IT_DRUGS, "drug")).toEqual([]);
    expect(check(IT_TRIALS, "trial")).toEqual([]);
    expect(check(IT_PAPERS, "paper")).toEqual([]);
    expect(check(IT_PEOPLE, "person")).toEqual([]);
    expect(check(IT_SITES.map((s) => s.cancerId), "cancer")).toEqual([]);
  });

  it("renders the Italian-source sections and stays within its markup budget", () => {
    const html = render(createElement(ItalyPage));
    expect(html).toContain("Cancer in Italy");
    // The national report's figures: the 2024 projection range, the registry's coverage and the survivor count.
    expect(html).toContain("360,000 and 390,000");
    expect(html).toContain("44,459,587");
    expect(html).toContain("2,041,996");
    // The payer and the regulator: the fund caps, the 36-month status and the access survey.
    expect(html).toContain("900 million euros");
    expect(html).toContain("36 months");
    expect(html).toContain("470 days");
    // Every row of the hand-built tables renders.
    for (const r of IT_SITES) expect(html, r.site).toContain(r.newCases.toLocaleString("en-GB"));
    for (const r of IT_TRIAL_STARTS) expect(html, String(r.year)).toContain(String(r.year));
    // Gaps are named on the page, not omitted.
    expect(html).toContain("What could not be sourced");
    expect(html).toContain("Records that should be in this corpus and are not");
    expect(Buffer.byteLength(html, "utf8"), "italy markup").toBeLessThan(250 * KB);
  });
});
