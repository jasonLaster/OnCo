import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "@/lib/graph";
import { BiomarkerDetail } from "./BiomarkerDetail";

/**
 * The companion diagnostic table links a device to its own record when `deviceId` names one (gap audit class 1),
 * unless the "Tests that measure it" box on the same page already links that record: one link per product a page.
 */
describe("companion diagnostic devices link to their records", () => {
  const bm = (id: string) => { const b = graph().get(id); if (!b || b.kind !== "biomarker") throw new Error(id); return b; };
  const table = (id: string) => {
    const html = renderToStaticMarkup(createElement(BiomarkerDetail, { bm: bm(id) }));
    const at = html.indexOf('id="companion-diagnostics"');
    return html.slice(at, html.indexOf("</table>", at));
  };

  it("links ONCO/Reveal Dx on the EGFR exon 19 deletion page, where the Tests box does not", () => {
    expect(table("egfr-exon-19-deletion")).toMatch(/<a class="underline" href="\/drugs\/onco-reveal-dx-lung-colon\/?">ONCO\/Reveal Dx Lung &amp; Colon Cancer Assay/);
  });

  it("does not link PD-L1 IHC 22C3 pharmDx twice on the PD-L1 CPS page", () => {
    expect(table("pd-l1-cps")).toContain('<td class="font-medium">PD-L1 IHC 22C3 pharmDx</td>');
  });

  it("leaves a device with no record as plain text", () => {
    expect(table("her2-ish-amplified")).toContain('<td class="font-medium">SPOT-LIGHT HER2 CISH Kit</td>');
  });
});
