/**
 * Counts the members of every gathered section before and after src/lib/members.ts (3 November 2026): what the hub
 * listed by hand against the hand list unioned with the corpus rule, one item per product.
 *
 *   npx tsx --tsconfig tsconfig.json scripts/section-members.ts [--all]
 *
 * "Before" re-implements the code the pages ran until that day; "after" calls the library the pages run now. Prints
 * the totals per section kind and the fifteen pages that gained most (every changed page with --all).
 */
import { graph } from "../src/lib/graph";
import { productClass } from "../src/lib/product-class";
import { biomarkerMembers, companyProducts, technologyProducts } from "../src/lib/members";
import { readoutsForDrug, readoutsForTest } from "../src/lib/biomarkers";
import { TUMOUR_TESTS } from "../src/data/tumour-tests";
import { assays } from "../src/data/assays";
import type { Drug } from "../src/lib/schema";

const g = graph();
type Row = { page: string; section: string; before: number; after: number; shownBefore?: number };
const rows: Row[] = [];
const med = (d: Drug) => productClass(d) === "medicine";

for (const bm of g.kind("biomarker")) {
  // Before: the "Tests that measure it" box (tumour-testing rows plus assays) and Connected's Tests group (non-medicine products linked either way).
  const box = TUMOUR_TESTS.filter((t) => bm.tests.includes(t.id)).length + assays.filter((a) => bm.assays.includes(a.id)).length;
  const connectedTests = (g.neighbours(bm.id).get("drug") ?? []).filter((d) => d.kind === "drug" && !med(d)).length;
  const m = biomarkerMembers(bm);
  // Distinct products before: the box and the Connected group, merged by the same resolution the library uses, so the
  // count is products a reader could find, and `shownBefore` is the chips they saw (with repeats).
  const before = new Set<string>();
  for (const it of m.tests) {
    const inBox = it.rows.some((r) => bm.tests.includes(r.id)) || it.assays.some((a) => bm.assays.includes(a.id));
    const inConnected = !!it.record && (g.neighbours(bm.id).get("drug") ?? []).some((d) => d.id === it.record!.id);
    if (inBox || inConnected) before.add(it.key);
  }
  rows.push({ page: `/biomarkers/${bm.id}/`, section: "Tests that measure it", before: before.size, after: m.tests.length, shownBefore: box + connectedTests });
  const named = new Set(bm.thresholds.map((t) => t.drugId));
  rows.push({ page: `/biomarkers/${bm.id}/`, section: "Treatments this result selects", before: named.size, after: m.treatments.length });
}

for (const t of g.kind("technology")) {
  const before = (g.incoming(t.id).get("drug") ?? []).length;
  rows.push({ page: `/technologies/${t.id}/`, section: "Products", before, after: technologyProducts(t).length });
}

for (const c of g.kind("company")) {
  const before = new Set([...c.drugs, ...(g.incoming(c.id).get("drug") ?? []).map((d) => d.id)]).size;
  rows.push({ page: `/companies/${c.id}/`, section: "Products", before, after: companyProducts(c).length });
}

for (const d of g.kind("drug")) {
  const before = g.kind("biomarker").filter((b) => b.thresholds.some((t) => t.drugId === d.id && t.status === "current") || b.drugs.includes(d.id) || b.companionDiagnostics.some((c) => c.drugs.includes(d.id))).length;
  const after = readoutsForDrug(d.id).length;
  if (before || after) rows.push({ page: `/drugs/${d.id}/`, section: "Biomarker readouts", before, after });
}

for (const t of TUMOUR_TESTS) {
  const before = g.kind("biomarker").filter((b) => b.tests.includes(t.id)).length;
  rows.push({ page: `/tumour-testing/#${t.id}`, section: "Readouts", before, after: readoutsForTest(t.id).length });
}

const bySection = new Map<string, { pages: number; changed: number; before: number; after: number }>();
for (const r of rows) {
  const k = `${r.page.split("/")[1].replace(/#.*/, "")} · ${r.section}`;
  const s = bySection.get(k) ?? { pages: 0, changed: 0, before: 0, after: 0 };
  s.pages++; s.before += r.before; s.after += r.after; if (r.after !== r.before) s.changed++;
  bySection.set(k, s);
}
console.log("Section | pages | pages changed | members before | members after");
for (const [k, s] of bySection) console.log(`${k} | ${s.pages} | ${s.changed} | ${s.before} | ${s.after}`);

const testRows = rows.filter((r) => r.shownBefore !== undefined);
const repeated = testRows.filter((r) => r.shownBefore! > r.before);
console.log(`\nReadout test chips: ${testRows.reduce((n, r) => n + r.shownBefore!, 0)} before (box plus Connected, with repeats), ${testRows.reduce((n, r) => n + r.after, 0)} after; ${repeated.length} readout pages showed a product more than once before, none after.`);
for (const r of repeated.sort((a, b) => (b.shownBefore! - b.before) - (a.shownBefore! - a.before)).slice(0, 15)) console.log(`  ${r.page}: ${r.shownBefore} chips for ${r.before} products, now ${r.after}`);

const lost = rows.filter((r) => r.after < r.before);
console.log(`\nPages that lost members: ${lost.length}`);
for (const r of lost) console.log(`  ${r.page} ${r.section}: ${r.before} -> ${r.after}`);

const changed = rows.filter((r) => r.after !== r.before).sort((a, b) => (b.after - b.before) - (a.after - a.before) || a.page.localeCompare(b.page));
console.log(`\nPages that gained most (${changed.length} changed):`);
for (const r of process.argv.includes("--all") ? changed : changed.slice(0, 15)) console.log(`  +${r.after - r.before}  ${r.page}  ${r.section}: ${r.before} -> ${r.after}${r.shownBefore !== undefined ? ` (chips before, with repeats: ${r.shownBefore})` : ""}`);

const mrd = g.get("ctdna-mrd-positive");
if (mrd && mrd.kind === "biomarker") {
  const m = biomarkerMembers(mrd);
  console.log(`\nctdna-mrd-positive tests: ${m.tests.map((i) => i.key).join(", ")}`);
  console.log(`ctdna-mrd-positive treatments: ${m.treatments.map((d) => d.id).join(", ")}`);
}
