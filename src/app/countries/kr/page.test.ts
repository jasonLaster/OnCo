import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import SouthKoreaPage from "./page";
import { graph } from "@/lib/graph";
import { KR_COMPANIES, KR_DRUGS, KR_INCIDENCE, KR_INSTITUTIONS, KR_PAPERS, KR_PEOPLE, KR_SCREENING, KR_SURVIVAL, KR_TRIALS, KR_TRIAL_APPROVALS } from "@/data/country-kr";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;

/**
 * /countries/kr/ is written from Korean primary sources rather than from the corpus. The things worth guarding are
 * that every id it names still resolves to the right kind (a renamed record would silently drop a section), that the
 * registry figures read from cancer.go.kr reach the page, and that the page stays small enough to be worth loading.
 */
describe("the South Korea country page", () => {
  it("names only ids that exist in the corpus, as the right kind", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(KR_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(KR_COMPANIES, "company")).toEqual([]);
    expect(check(KR_DRUGS, "drug")).toEqual([]);
    expect(check(KR_TRIALS, "trial")).toEqual([]);
    expect(check(KR_PAPERS, "paper")).toEqual([]);
    expect(check(KR_PEOPLE, "person")).toEqual([]);
    expect(check(KR_INCIDENCE.flatMap((r) => r.cancerIds), "cancer")).toEqual([]);
  });

  it("renders the registry figures, the tables and the named gaps, inside its markup budget", () => {
    const html = render(createElement(SouthKoreaPage));
    expect(html).toContain("Cancer in South Korea");
    // Registry headline figures as read from cancer.go.kr and the registry's 2023 paper.
    expect(html).toContain("288,613");
    expect(html).toContain("522.9");
    expect(html).toContain("73.7 per cent");
    expect(html).toContain("2,732,906");
    expect(html).toContain("90,203");
    // The co-payment and the screening rules: the two things a Korean patient meets first.
    expect(html).toContain("5 per cent");
    for (const r of KR_SCREENING) expect(html, `screening row ${r.id}`).toContain(r.interval);
    for (const r of KR_INCIDENCE) expect(html, `incidence row ${r.id}`).toContain(r.cases.toLocaleString("en-GB"));
    for (const r of KR_SURVIVAL) expect(html, `survival row ${r.id}`).toContain(r.site);
    for (const r of KR_TRIAL_APPROVALS) expect(html, `trial year ${r.year}`).toContain(String(r.oncology));
    // Gaps are named on the page, not omitted.
    expect(html).toContain("What could not be sourced");
    expect(html).toContain("Records that should be in this corpus and are not");
    expect(Buffer.byteLength(html, "utf8"), "south korea markup").toBeLessThan(250 * KB);
  });
});
