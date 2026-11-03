import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { graph } from "./graph";
import { productClass } from "./product-class";
import { assayRecord, biomarkerMembers, companyProducts, connectedGroups, membersFor, readoutsMeasuredBy, rowRecord, ruleTechnologies, technologyProducts } from "./members";
import { readoutsForDrug } from "./biomarkers";
import { TUMOUR_TESTS } from "@/data/tumour-tests";
import { assays } from "@/data/assays";
import { READOUT_TEST_RULES } from "@/data/readout-test-technologies";
import { ASSAY_RECORD } from "@/data/assay-records";
import { EntityDetail } from "@/components/EntityDetail";
import type { Biomarker, Company, Technology } from "./schema";

/**
 * Sections gathered from the corpus by a stated rule, unioned with the hub's hand list (src/lib/members.ts; owner,
 * 3 November 2026). The rules: one item per product, a hand-listed member is never dropped, a medicine is never a
 * test, and every gathered member comes from a structured field.
 */
const g = graph();
const bm = (id: string) => { const e = g.get(id); if (!e || e.kind !== "biomarker") throw new Error(id); return e as Biomarker; };
const co = (id: string) => { const e = g.get(id); if (!e || e.kind !== "company") throw new Error(id); return e as Company; };
const tech = (id: string) => { const e = g.get(id); if (!e || e.kind !== "technology") throw new Error(id); return e as Technology; };
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);

/** The MRD tests in the corpus on 3 November 2026: a floor, so a later test adds to it and none falls off. */
const MRD_TESTS = ["signatera", "guardant-reveal", "radar-mrd", "next-personal", "oncodetect", "clonoseq"];
/** A product is present as its record or, where it has none yet, as its tumour-testing row. */
const hasProduct = (keys: string[], id: string) => keys.includes(id) || keys.includes(`row:${id}`);

describe("biomarker readout tests and treatments", () => {
  it("ctdna-mrd-positive lists each MRD test once and atezolizumab as a treatment, not a test", () => {
    const m = biomarkerMembers(bm("ctdna-mrd-positive"));
    const keys = m.tests.map((t) => t.key);
    expect(new Set(keys).size, "one item per product").toBe(keys.length);
    for (const k of MRD_TESTS) expect(hasProduct(keys, k), k).toBe(true);
    expect(keys).not.toContain("atezolizumab");
    expect(m.treatments.map((d) => d.id)).toContain("atezolizumab");
  });

  it("merges the Signatera row, record and assay into one item", () => {
    const it = biomarkerMembers(bm("ctdna-mrd-positive")).tests.find((t) => t.key === "signatera")!;
    expect(it.record?.id).toBe("signatera");
    expect(it.rows.map((r) => r.id)).toContain("signatera");
    expect(it.assays.map((a) => a.id)).toContain("signatera-mrd");
    expect(it.href).toBe("/drugs/signatera/");
  });

  it("leaves a screening test out of the MRD list even when its record carries the MRD technology", () => {
    const keys = biomarkerMembers(bm("ctdna-mrd-positive")).tests.map((t) => t.key);
    for (const d of g.kind("drug").filter((x) => x.tags.includes("mced"))) expect(keys, d.id).not.toContain(d.id);
  });

  it("never drops a hand-listed test, assay or non-medicine product, and never lists a medicine as a test", () => {
    for (const b of g.kind("biomarker")) {
      const m = biomarkerMembers(b);
      const keys = m.tests.map((t) => t.key);
      expect(new Set(keys).size, `${b.id}: duplicate items`).toBe(keys.length);
      for (const id of b.tests) if (TUMOUR_TESTS.some((r) => r.id === id)) expect(m.tests.some((t) => t.rows.some((r) => r.id === id)), `${b.id}: row ${id}`).toBe(true);
      for (const id of b.assays) if (assays.some((a) => a.id === id)) expect(m.tests.some((t) => t.assays.some((a) => a.id === id)), `${b.id}: assay ${id}`).toBe(true);
      for (const id of b.drugs) { const d = g.get(id); if (d?.kind === "drug" && productClass(d) !== "medicine") expect(keys, `${b.id}: product ${id}`).toContain(id); }
      for (const t of m.tests) if (t.record) expect(productClass(t.record), `${b.id}: ${t.key}`).not.toBe("medicine");
      for (const d of m.treatments) expect(productClass(d), `${b.id}: ${d.id}`).toBe("medicine");
      // Every current threshold drug that is a medicine is among the treatments.
      for (const th of b.thresholds) { const d = g.get(th.drugId); if (th.status === "current" && d?.kind === "drug" && productClass(d) === "medicine") expect(m.treatments.map((x) => x.id), `${b.id}: ${th.drugId}`).toContain(th.drugId); }
    }
  });

  it("names only readouts and technologies that exist in its rules", () => {
    for (const [id, rule] of Object.entries(READOUT_TEST_RULES)) {
      expect(g.get(id)?.kind, id).toBe("biomarker");
      for (const t of rule.match.flat()) expect(g.get(t)?.kind, `${id} -> ${t}`).toBe("technology");
    }
    expect(ruleTechnologies("ctdna-mrd-positive")).toContain("mrd-testing");
  });

  it("removes from Connected what the readout page's own sections list", () => {
    const drugs = (connectedGroups(bm("ctdna-mrd-positive")).get("drug") ?? []).map((d) => d.id);
    expect(drugs).not.toContain("signatera");
    expect(drugs).not.toContain("atezolizumab");
    // Other kinds are untouched.
    expect(connectedGroups(bm("ctdna-mrd-positive")).get("paper")?.length).toBe(g.neighbours("ctdna-mrd-positive").get("paper")?.length);
  });

  it("reaches back from a test to the readouts it measures", () => {
    expect(readoutsMeasuredBy("signatera")).toContain("ctdna-mrd-positive");
    expect(readoutsMeasuredBy("next-personal")).toContain("ctdna-mrd-positive");
    expect(readoutsForDrug("oncodetect").map((r) => r.biomarker.id)).toContain("ctdna-mrd-positive");
  });
});

describe("row and assay resolution", () => {
  it("a row resolves to its record when it is that record or the only row pointing at it", () => {
    const row = (id: string) => TUMOUR_TESTS.find((r) => r.id === id)!;
    expect(rowRecord(row("signatera"))?.id).toBe("signatera");
    expect(rowRecord(row("foundationone-cdx"))?.id).toBe("foundationone-cdx");
    // FoundationOne Liquid CDx points at the record named "FoundationOne CDx / Liquid CDx": one product page, one item.
    expect(rowRecord(row("foundationone-liquid-cdx"))?.id).toBe("foundationone-cdx");
    expect(rowRecord(row("bostongene-tumor-portrait"))).toBeUndefined();
  });

  it("an assay resolves to its reviewed pair, else to its one non-medicine product", () => {
    expect(assayRecord(assays.find((a) => a.id === "signatera-mrd")!)?.id).toBe("signatera");
    expect(assayRecord(assays.find((a) => a.id === "mmr-ventana")!)?.id).toBe("ventana-mmr-rxdx");
    // Three PSMA tracers: the assay row stays its own item.
    expect(assayRecord(assays.find((a) => a.id === "psma-pet-selection")!)).toBeUndefined();
    for (const [a, r] of Object.entries(ASSAY_RECORD)) {
      expect(assays.some((x) => x.id === a), a).toBe(true);
      const d = g.get(r);
      expect(d?.kind === "drug" && productClass(d) !== "medicine", `${a} -> ${r}`).toBe(true);
    }
  });

  it("lists the dMMR stain once, though its assay row and its test record both reach the page", () => {
    const items = biomarkerMembers(bm("dmmr-ihc")).tests.filter((t) => /MMR RxDx/i.test(t.name));
    expect(items.map((t) => t.key)).toEqual(["ventana-mmr-rxdx"]);
  });
});

describe("company and technology products", () => {
  it("a company page lists its own products, every product naming it and every tumour-testing row it runs", () => {
    for (const c of g.kind("company")) {
      const keys = companyProducts(c).map((i) => i.key);
      expect(new Set(keys).size, c.id).toBe(keys.length);
      for (const id of c.drugs) expect(keys, `${c.id}: ${id}`).toContain(id);
      for (const d of g.incoming(c.id).get("drug") ?? []) expect(keys, `${c.id}: ${d.id}`).toContain(d.id);
      for (const r of TUMOUR_TESTS.filter((x) => x.companyId === c.id)) expect(keys.includes(`row:${r.id}`) || keys.includes(r.drugId ?? ""), `${c.id}: row ${r.id}`).toBe(true);
    }
    expect(hasProduct(companyProducts(co("personalis")).map((i) => i.key), "next-personal")).toBe(true);
    expect(companyProducts(co("foundation-medicine")).map((i) => i.key)).toEqual(expect.arrayContaining(["foundationone-cdx", "row:foundationone-heme"]));
  });

  it("a technology page lists every product filed under it and every tumour-testing row filed under it", () => {
    for (const t of g.kind("technology")) {
      const keys = technologyProducts(t).map((i) => i.key);
      expect(new Set(keys).size, t.id).toBe(keys.length);
      for (const d of g.incoming(t.id).get("drug") ?? []) expect(keys, `${t.id}: ${d.id}`).toContain(d.id);
    }
    expect(hasProduct(technologyProducts(tech("mrd-testing")).map((i) => i.key), "next-personal")).toBe(true);
    expect(membersFor(tech("mrd-testing"), "products").length).toBe(technologyProducts(tech("mrd-testing")).length);
  });
});

describe("the rendered ctdna-mrd-positive page", () => {
  const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
  it("shows each MRD test exactly once and atezolizumab under treatments, not tests", () => {
    const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(EntityDetail, { e: bm("ctdna-mrd-positive") })));
    const section = (id: string) => { const at = html.indexOf(`<section id="${id}"`); expect(at, id).toBeGreaterThan(-1); return html.slice(at, html.indexOf("</section>", at)); };
    const tests = section("tests");
    const treatments = section("treatments");
    // Next renders a Link's href with or without the trailing slash depending on the environment.
    const count = (s: string, path: string) => (s.match(new RegExp(`href="${path}/?"`, "g")) ?? []).length;
    // Similar pages explains a match by the links two pages share ("Shares RaDaR, Guardant Reveal"); that names a test
    // without listing it, so the page-wide count leaves the strip out.
    const simAt = html.indexOf(`aria-label="Similar pages"`);
    const listed = simAt === -1 ? html : html.slice(0, simAt) + html.slice(html.indexOf("</section>", simAt));
    for (const id of ["signatera", "guardant-reveal", "radar-mrd", "oncodetect", "clonoseq"]) {
      expect(count(tests, `/drugs/${id}`), `${id} in Tests`).toBe(1);
      expect(count(listed, `/drugs/${id}`), `${id} on the page`).toBe(1);
    }
    expect(tests).toContain("NeXT Personal");
    expect(count(tests, "/drugs/atezolizumab")).toBe(0);
    expect(count(treatments, "/drugs/atezolizumab")).toBe(1);
  }, SLOW_MS);
});
