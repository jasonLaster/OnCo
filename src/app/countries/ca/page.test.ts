import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import CanadaPage from "./page";
import { graph } from "@/lib/graph";
import {
  CA_COMPANIES, CA_DOING, CA_GAPS, CA_INSTITUTIONS, CA_PAPERS, CA_PAYING, CA_PEOPLE, CA_PROFILE, CA_REGISTRY, CA_REGULATOR, CA_SNAPSHOT, CA_TRIALS,
} from "@/data/country-ca";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
const ALL_CARDS = [CA_PROFILE, CA_REGISTRY, CA_PAYING, CA_REGULATOR, CA_DOING, CA_GAPS];

/**
 * /countries/ca/ is written from Canadian sources rather than from the corpus. The id lists are the part that rots (a
 * renamed record silently drops a card), the 2026 table is copied by hand from a PDF, and the page must stay small
 * enough to be worth loading.
 */
describe("the Canada country page", () => {
  it("names only ids that exist in the corpus, with the right kind", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(CA_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(CA_COMPANIES, "company")).toEqual([]);
    expect(check(CA_TRIALS, "trial")).toEqual([]);
    expect(check(CA_PAPERS, "paper")).toEqual([]);
    expect(check(CA_PEOPLE, "person")).toEqual([]);
  });

  it("every card has a plain paragraph, a detail paragraph and a source, in house style", () => {
    const ids = ALL_CARDS.flat().map((c) => c.id);
    expect(ids.length).toBe(new Set(ids).size);
    for (const card of ALL_CARDS.flat()) {
      expect(card.plain.length, card.id).toBeGreaterThan(80);
      expect(card.detail.length, card.id).toBeGreaterThan(200);
      expect(card.links.length, card.id).toBeGreaterThan(0);
      const prose = `${card.title} ${card.plain} ${card.detail}`;
      expect(prose, card.id).not.toMatch(/[—–]/);
      expect(prose, card.id).not.toMatch(/\bas of\b/i);
    }
  });

  it("the 2026 snapshot adds up the way the source does", () => {
    // The 23 named cancers plus "all other cancers" sum to the published all-cancers projection, to rounding.
    const parts = CA_SNAPSHOT.filter((r) => r.id !== "all");
    const total = CA_SNAPSHOT.find((r) => r.id === "all")!;
    expect(parts.length).toBe(24);
    expect(Math.abs(parts.reduce((s, r) => s + r.cases, 0) - total.cases)).toBeLessThan(1500);
    expect(Math.abs(parts.reduce((s, r) => s + r.deaths, 0) - total.deaths)).toBeLessThan(1500);
  });

  it("renders the Canadian-source sections and stays within its markup budget", () => {
    const html = render(createElement(CanadaPage));
    expect(html).toContain("Cancer in Canada");
    // Registry figures read from the national statistics, and the registry's own caveat about Quebec.
    expect(html).toContain("254,100");
    expect(html).toContain("87,900");
    expect(html).toContain("591.4");
    expect(html).toContain("based on data up to 2017");
    // The payment route and the regulator's clocks.
    expect(html).toContain("522 to 393 days");
    expect(html).toContain("19 January 2011");
    expect(html).toContain("215 calendar days");
    for (const row of CA_SNAPSHOT) expect(html, row.site).toContain(row.site);
    for (const anchor of ["profile", "registry", "paying", "regulator", "doing", "institutions", "corpus", "gaps"]) expect(html, anchor).toContain(`id="${anchor}"`);
    // Gaps are named on the page, not omitted.
    expect(html).toContain("Gaps, named");
    expect(html).toContain("Canada&#x27;s Drug Agency could not be read directly");
    expect(Buffer.byteLength(html, "utf8"), "canada markup").toBeLessThan(250 * KB);
  });
});
