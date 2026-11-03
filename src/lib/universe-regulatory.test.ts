import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { FDA_OCE_EVENTS } from "@/data/fda-oce-events";
import { CDX_FDA_ROWS } from "@/data/cdx-fda-rows";
import { graph } from "./graph";
import { CANCER_TEXT, firstSentence, oceDrugs, parseCdx, parseEeml, parseNovel, titleDrugs } from "../../scripts/fetch-universe-regulatory";

/**
 * The regulator and knowledge-base universe lists (scripts/fetch-universe-regulatory.ts) and what was written from them:
 * the FDA notification events (src/data/fda-oce-events.ts) and the companion diagnostic rows (src/data/cdx-fda-rows.ts).
 */
describe("FDA notification parsing", () => {
  it("reads every bracketed product in the first sentence, generic first or brand first", () => {
    expect(oceDrugs("On December 15, 2023, the Food and Drug Administration (FDA) approved enfortumab vedotin-ejfv (Padcev, Astellas Pharma) in combination with pembrolizumab (Keytruda, Merck) for patients with la/mUC.").map((d) => d.generic)).toEqual(["enfortumab vedotin-ejfv", "pembrolizumab"]);
    expect(oceDrugs("On November 13, 2025, the Food and Drug Administration approved Poherdy (pertuzumab-dpzb, Shanghai Henlius Biologics Co. Ltd.) as an interchangeable biosimilar")[0]).toMatchObject({ generic: "pertuzumab-dpzb", brand: "Poherdy" });
  });

  it("does not read a disease or biomarker abbreviation as a product", () => {
    const drugs = oceDrugs("approved tepotinib (Tepmetko, EMD Serono, Inc.) for adult patients with metastatic non-small cell lung cancer (NSCLC) harboring mesenchymal-epithelial transition (MET) exon 14 skipping alterations.");
    expect(drugs.map((d) => d.generic)).toEqual(["tepotinib"]);
  });

  it("keeps a sponsor's 'U.S.' and 'Inc.' inside the first sentence", () => {
    expect(firstSentence("On July 9, 2026, the FDA approved isatuximab-irfc (Sarclisa Escena, Sanofi-Aventis U.S. LLC) for adults. Efficacy was evaluated.")).toBe("On July 9, 2026, the FDA approved isatuximab-irfc (Sarclisa Escena, Sanofi-Aventis U.S. LLC) for adults.");
  });

  it("falls back to the title when the sentence has no bracket", () => {
    expect(titleDrugs("FDA grants accelerated approval to sacituzumab govitecan for advanced urothelial cancer").map((d) => d.generic)).toEqual(["sacituzumab govitecan"]);
  });
});

describe("other list parsers", () => {
  it("CDER novel approvals: one row per product with its date and approved use", () => {
    const html = `<table><tr><th>No.</th></tr><tr><td>46.</td><td><a href="x">Crenessity</a></td><td>crinecerfont</td><td>12/13/2024</td><td>To treat classic congenital adrenal hyperplasia&nbsp;<br><a href="y">Press Release</a></td></tr></table>`;
    expect(parseNovel(html, 2024, "src")).toEqual([{ brand: "Crenessity", generic: "crinecerfont", date: "2024-12-13", use: "To treat classic congenital adrenal hyperplasia", year: 2024, source: "src" }]);
  });

  it("the cancer filter takes compound words and leaves other uses out", () => {
    for (const s of ["To treat cholangiocarcinoma", "To treat hepatoblastoma", "To treat von Hippel-Lindau disease under certain conditions", "detection of cancerous tissue"]) expect(CANCER_TEXT.test(s), s).toBe(true);
    for (const s of ["To treat classic congenital adrenal hyperplasia", "To treat plaque psoriasis"]) expect(CANCER_TEXT.test(s), s).toBe(false);
  });

  it("FDA companion diagnostics: an unbalanced maker bracket does not swallow the device name", () => {
    const html = `<table><tr><td>VENTANA MET (SP44) RxDx Assay (Ventana Medical Systems, Inc. (Roche Tissue Diagnostics)</td><td>Non-Small Cell Lung Cancer (NSCLC) - Tissue</td><td>Emrelis (telisotuzumab vedotin-tllv) BLA 761384</td><td>MET</td><td>c-Met protein overexpression</td><td>P240037 (05/14/2025)</td></tr></table>`;
    const [row] = parseCdx(html);
    expect(row.device).toBe("VENTANA MET (SP44) RxDx Assay");
    expect(row.drugs).toEqual(["telisotuzumab vedotin-tllv"]);
    expect(row.date).toBe("2025-05-14");
  });

  it("WHO eEML: only the antineoplastic and supportive sections", () => {
    const li = (name: string, id: number, section: string) => `<li> <div> <input class="expand-toggle" id="toggle-${id}" type="checkbox"> <h5 class="medicine-name" title="${name}"> <a href="https://list.essentialmeds.org/medicines/${id}"> General information </a> </h5> <div class="section-name">${section}</div> <span class="indication-text">X</span> </div> </li>`;
    const items = parseEeml(`<ul>${li("Tioguanine", 105, "Cytotoxic medicines")}${li("Tinidazole", 639, "Antiamoebic and antigiardiasis medicines")}</ul>`);
    expect(items.map((i) => i.name)).toEqual(["Tioguanine"]);
  });
});

describe("snapshots and what was written from them", () => {
  it("each new list holds as many items as its total", () => {
    for (const name of ["fda-oncology-approvals", "fda-novel-oncology", "fda-cdx-oncology", "ema-oncology", "who-eml-cancer", "civic-genes", "civic-assertions"] as const) {
      const snap = JSON.parse(readFileSync(`src/data/universe-lists/${name}.json`, "utf8")) as { total: number; items: unknown[] };
      expect(snap.items.length, name).toBe(snap.total);
      expect(snap.total, name).toBeGreaterThan(50);
    }
  });

  it("every FDA notification event names an existing product, an fda.gov source and an ISO date", () => {
    const g = graph();
    for (const [id, events] of Object.entries(FDA_OCE_EVENTS)) {
      expect(g.get(id)?.kind, id).toBe("drug");
      for (const e of events) {
        expect(e.date, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(e.source, id).toMatch(/^https:\/\/www\.fda\.gov\//);
        expect(e.note, id).toMatch(/^FDA /);
      }
    }
  });

  it("companion diagnostic rows sit on readouts that exist and name products that exist", () => {
    const g = graph();
    for (const [id, rows] of Object.entries(CDX_FDA_ROWS)) {
      expect(g.get(id)?.kind, id).toBe("biomarker");
      for (const r of rows) for (const d of r.drugs) expect(g.get(d)?.kind, `${id}: ${d}`).toBe("drug");
    }
  });
});
