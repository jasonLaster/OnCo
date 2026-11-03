/**
 * Print OnCo's coverage against the universe lists, as /completeness/ computes it (src/lib/completeness.ts).
 *
 *   npx tsx scripts/universe-coverage.ts                       every list-backed denominator
 *   npx tsx scripts/universe-coverage.ts approvals-fda-oce     one denominator, with every missing item
 *   npx tsx scripts/universe-coverage.ts cdx-fda --json        the missing items as JSON
 */
import { completeness } from "../src/lib/completeness";

const ids = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const json = process.argv.includes("--json");
const rows = completeness().filter((r) => r.listed && (!ids.length || ids.includes(r.den.id)));
if (json) console.log(JSON.stringify(rows.map((r) => ({ id: r.den.id, ours: r.ours, total: r.den.total, pct: r.pct, missing: r.missing })), null, 1));
else for (const r of rows) {
  console.log(`${r.den.id.padEnd(32)} ${String(r.ours).padStart(5)} / ${String(r.den.total).padEnd(6)} ${r.pct ?? "-"}%`);
  if (ids.length) for (const m of r.missing) console.log(`   - ${m.name}${m.detail ? `  [${m.detail}]` : ""}${m.url ? `  ${m.url}` : ""}`);
}
