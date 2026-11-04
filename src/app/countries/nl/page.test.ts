import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import NetherlandsPage from "./page";
import { graph } from "@/lib/graph";
import { NL_COMPANIES, NL_DRUGS, NL_INSTITUTIONS, NL_PAPERS, NL_PEOPLE, NL_REFERENCE_VALUES, NL_SCREENING, NL_STAGE_SURVIVAL, NL_TRIALS } from "@/data/country-nl";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;

/**
 * /countries/nl/ is written from Dutch primary sources (IKNL, the Zorginstituut, the CBG, RIVM), so the things worth
 * guarding are that every id it names still resolves to the right kind (a renamed record would silently drop a
 * card), that the registry and reimbursement figures read from those sources are on the page, and that it stays small.
 */
describe("the Netherlands country page", () => {
  it("names only ids that exist in the corpus, each of the kind its list expects", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(NL_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(NL_COMPANIES, "company")).toEqual([]);
    expect(check(NL_DRUGS, "drug")).toEqual([]);
    expect(check(NL_TRIALS, "trial")).toEqual([]);
    expect(check(NL_PAPERS, "paper")).toEqual([]);
    expect(check(NL_PEOPLE, "person")).toEqual([]);
  });

  it("renders the Dutch-source figures and tables and stays within its markup budget", () => {
    const html = render(createElement(NetherlandsPage));
    expect(html).toContain("Cancer in the Netherlands");
    // Registry: the February 2026 release and the June 2026 survival release.
    expect(html).toContain("134,800");
    expect(html).toContain("71 per cent");
    // Reimbursement: the deductible, the lock's thresholds and a real price-cut advice.
    expect(html).toContain("€385");
    expect(html).toContain("€20 million");
    expect(html).toContain("at least 60 per cent");
    // Regulator: the CBG's rapporteur count.
    expect(html).toContain("23 combined");
    // Hand-built tables render every row.
    for (const r of NL_STAGE_SURVIVAL) expect(html, `stage ${r.id}`).toContain(`${r.now}%`);
    for (const r of NL_REFERENCE_VALUES) expect(html, `reference ${r.id}`).toContain(r.max);
    for (const r of NL_SCREENING) expect(html, `screening ${r.id}`).toContain(r.who);
    // The entity lists come from the graph.
    expect(html).toContain("/institutions/zorginstituut-nederland");
    expect(html).toContain("/trials/drup");
    // Gaps are named on the page, not omitted.
    expect(html).toContain("What could not be sourced");
    expect(html).toContain("Records that should be in this corpus and are not");
    expect(Buffer.byteLength(html, "utf8"), "netherlands markup").toBeLessThan(250 * KB);
  });
});
