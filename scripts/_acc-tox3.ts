import { graph } from "../src/lib/graph";
import { readFileSync } from "fs";
const ids = readFileSync("/tmp/acc-batches/tox-remaining.txt","utf8").trim().split(/\s+/);
const g = graph();
let n=0;
for (const id of ids) { const d = g.get(id) as any; const rows = d.toxicity.filter((t:any)=>!t.source && (t.anyGradePct!==undefined||t.grade3PlusPct!==undefined));
  console.log(`## ${id} (${d.name}) total tox ${d.toxicity.length}, target ${rows.length}`);
  for (const t of rows) { n++; console.log(`  - ${JSON.stringify(t)}`); } }
console.log("TOTAL", n);
