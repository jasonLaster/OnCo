/**
 * Validates the corpus: schema, duplicate ids, dangling references, and the link-sense rules that have no tolerance.
 * Run: npm run validate
 *
 * A link can resolve and still point at the wrong thing. Three rules from scripts/link-sense-audit.ts are held at zero
 * here because every finding they have produced was a real error: a typed field holding a glossary stub where a record
 * of the right kind has the same name (a trial's cancers naming the term "brain metastases" rather than the cancer), a
 * link to the namesake outside the linking record's cancers (76 colorectal trials linked to the glioblastoma-indication
 * bevacizumab record), and an alias that is a generic word ("Inc."). The other classes are ratcheted, not zeroed, in
 * scripts/link-sense-audit.test.ts.
 */
import { graph } from "../src/lib/graph";
import { makeCtx, nameFindings, roleFindings } from "./link-sense-audit";

try {
  const g = graph();
  const counts = [...g.byKind.entries()].map(([k, v]) => `${k}: ${v.length}`).join(", ");
  const c = makeCtx(g, { ctgovDir: null });
  const zero = [...roleFindings(c).filter((f) => f.rule === "field-kind-namesake" && f.confidence === "high"), ...nameFindings(c).filter((f) => f.confidence === "high")];
  if (zero.length) {
    console.error(`Links that resolve to the wrong record (scripts/link-sense-audit.ts):\n${zero.map((f) => `  ${f.cls}/${f.rule}: ${f.reason}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`OK — ${g.entities.length} entities (${counts})`);
} catch (e) {
  console.error(String(e instanceof Error ? e.message : e));
  process.exit(1);
}
