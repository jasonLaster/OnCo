import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import FrancePage from "./page";
import { graph } from "@/lib/graph";
import { FR_COMPANIES, FR_DRUGS, FR_INSTITUTIONS, FR_PAPERS, FR_PEOPLE, FR_SCREENING_PROGRAMMES, FR_TRIALS } from "@/data/country-fr";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;

/**
 * /countries/fr/ is written from French-language primary sources, so the things worth guarding are that every id it
 * names still resolves to the kind it is listed as (a renamed record would silently drop out of a section), that the
 * national figures read from INCa's Panorama and the HAS early-access report reach the page, and that the page stays
 * small enough to be worth loading.
 */
describe("the France country page", () => {
  it("names only ids that exist in the corpus, as the kind they are listed as", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(FR_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(FR_COMPANIES, "company")).toEqual([]);
    expect(check(FR_DRUGS, "drug")).toEqual([]);
    expect(check(FR_TRIALS, "trial")).toEqual([]);
    expect(check(FR_PAPERS, "paper")).toEqual([]);
    expect(check(FR_PEOPLE, "person")).toEqual([]);
  });

  it("renders the French-source figures, the screening table and the gaps, inside its markup budget", () => {
    const html = render(createElement(FrancePage));
    expect(html).toContain("Cancer in France");
    // INCa Panorama 2026: incidence 2023, deaths 2023, the 2025 registry law.
    expect(html).toContain("433,136");
    expect(html).toContain("164,314");
    expect(html).toContain("2025-596");
    // HAS four-year early-access report.
    expect(html).toContain("152 favourable");
    // Every screening programme row renders.
    for (const r of FR_SCREENING_PROGRAMMES) expect(html, `screening row ${r.id}`).toContain(r.participation);
    // Gaps are named on the page, not omitted.
    expect(html).toContain("What could not be read");
    expect(html).toContain("Records that should be in this corpus and are not");
    expect(Buffer.byteLength(html, "utf8"), "france markup").toBeLessThan(250 * KB);
  });
});
