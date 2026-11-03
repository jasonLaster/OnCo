/**
 * What the weekly universe refresh found that OnCo should act on, as Markdown for one standing GitHub issue.
 *
 * Two things, both of which went unnoticed in October 2026:
 *  - **Stale sources.** fetch-universe.ts keeps a source's previous snapshot when it cannot read it, and only logs the
 *    failure. Even One Ventures changed its page on about 21 October; the parser read nothing for two weekly runs and
 *    the 14 October snapshot sat there with nobody told. Any list whose `checked` date is more than STALE_DAYS old is
 *    listed here.
 *  - **Portfolio companies OnCo lacks.** /completeness/ already shows them, but nothing asks anyone to add them, so
 *    Selvana and Jiyu Bio stayed missing. They are listed here until a company record matches them.
 *
 * A third part since 3 November 2026: what the startup monitors (scripts/startup-monitors.ts) found that OnCo lacks,
 * read from .cache/startup-monitors/summary.json (or STARTUP_MONITORS_SUMMARY) when that file is under eight days old.
 *
 *   npx tsx scripts/universe-gaps.ts            # Markdown to stdout; empty output means nothing to do
 *
 * The workflow (.github/workflows/refresh-universe.yml) creates, updates or closes the issue from this output. It never
 * writes data.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { UNIVERSE_LISTS } from "../src/data/universe";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys } from "../src/lib/completeness";
import { SKIPPED, type Finding, type Summary } from "./startup-monitors";

const STALE_DAYS = 10;
/** Lists copied once from a fixed source (a paper), not fetched weekly, so their date is expected to be old. */
const FIXED = new Set(["hallmarks-2022"]);
const today = new Date();
const days = (iso: string) => Math.floor((today.getTime() - new Date(iso).getTime()) / 86_400_000);
const domainOf = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "").toLowerCase();

const stale = Object.entries(UNIVERSE_LISTS as Record<string, { checked?: string; source?: { label: string; url: string } }>)
  .filter(([id, l]) => !FIXED.has(id) && l.checked && days(l.checked) > STALE_DAYS)
  .map(([id, l]) => `- \`${id}\`: last read ${l.checked} (${days(l.checked!)} days ago)${l.source ? ` from [${l.source.label}](${l.source.url})` : ""}`);

const companies = graph().kind("company");
const keys = new Set<string>(); for (const c of companies) for (const k of companyKeys(c)) keys.add(k);
const domains = new Set(companies.map((c) => domainOf(c.website ?? "")).filter(Boolean));
const portfolio = UNIVERSE_LISTS["evenone-portfolio"].items as Array<{ name: string; website: string; tag: string }>;
const missing = portfolio
  .filter((c) => !keys.has(companyKey(c.name)) && !domains.has(domainOf(c.website)))
  .map((c) => `- **${c.name}** (${c.tag || "portfolio"}): ${c.website}`);

const parts: string[] = [];
if (stale.length) parts.push(`### Sources not read for more than ${STALE_DAYS} days\nThe refresh kept an old snapshot for these. The page may have changed shape: check the parser in \`scripts/fetch-universe.ts\`.\n\n${stale.join("\n")}`);
if (missing.length) parts.push(`### Even One Ventures portfolio companies OnCo does not have\nAdd a company record for each (own website and a primary source), linked from \`even-one-ventures\`.\n\n${missing.join("\n")}`);
parts.push(...monitorSections());

/**
 * The startup monitors (scripts/startup-monitors.ts, added 3 November 2026) write a review queue; when this week's
 * queue is present its "not yet in OnCo" findings join the issue, grouped by company so a firm seen by three sources is
 * one line. Each group is capped so the issue stays under GitHub's body limit; the full queue is the workflow artefact.
 */
function monitorSections(): string[] {
  const path = process.env.STARTUP_MONITORS_SUMMARY ?? join(process.cwd(), ".cache", "startup-monitors", "summary.json");
  if (!existsSync(path)) return [];
  const s = JSON.parse(readFileSync(path, "utf8")) as Summary;
  if (days(s.generated) > 8) return [];
  const GROUPS: Array<{ title: string; ids: string[]; hint: string }> = [
    { title: "Investor and accelerator portfolios", ids: ["yc", "arch", "third-rock", "a16z", "gv", "khosla", "orbimed", "ra-capital", "atlas", "flagship"], hint: "Oncology companies on the firm's own portfolio page. Confirm each on its own website, then add the investor's id to the record's `investors`. Exited and acquired companies are listed too: add them only where OnCo has a reason to hold them (a drug, a trial, a deal)." },
    { title: "Registrations for listing (SEC S-1 and F-1)", ids: ["edgar"], hint: "Drug, biotech, diagnostics and device filers whose registration mentions oncology or cancer. \"No ticker\" usually means an IPO. Read the filing's business section before writing a record; a mention of cancer is not an oncology company." },
    { title: "Orphan designations (FDA and EMA)", ids: ["fda-orphan", "ema-orphan"], hint: "Sponsors of oncology orphan designations in the window. Some sponsors are regulatory consultants acting for the developer (EMA's pages name them): find the developer before writing a record." },
    { title: "NCI SBIR and STTR awards", ids: ["nih-sbir"], hint: "Small businesses holding new National Cancer Institute SBIR or STTR awards. Many are tool and device makers; add those whose work is about cancer and who have their own website." },
  ];
  const CAP = 30;
  const out: string[] = [];
  const counts = s.sources.map((r) => `| ${r.label} | ${r.status}${r.status !== "ok" && r.reason ? `: ${r.reason.replace(/\|/g, "/")}` : ""} | ${r.read} | ${r.oncology} | ${r.missing.length}${r.unscreened ? ` (+${r.unscreened.length} unscreened)` : ""} |`);
  out.push(`### Startup monitors: what they found that OnCo lacks\nRead on ${s.generated} by \`scripts/startup-monitors.ts\`; dated sources cover the ${s.days} days since ${s.since}. A review queue only: nothing here has been written to the corpus. "Unscreened" rows come from sources that give names only (GV, HKEX 18A) and are in the queue file, not below.\n\n| Source | Status | Read | Oncology | Not in OnCo |\n|---|---|---|---|---|\n${counts.join("\n")}\n\nNot read on purpose: ${SKIPPED.map((x) => `${x.label} (${x.reason})`).join("; ")}`);
  const short = (x: string | undefined, n: number) => (x && x.length > n ? `${x.slice(0, n - 1)}…` : x ?? "");
  for (const grp of GROUPS) {
    const by = new Map<string, { name: string; sources: string[]; f: Finding }>();
    for (const r of s.sources.filter((x) => grp.ids.includes(x.id) && x.status === "ok")) {
      for (const f of r.missing) {
        const k = companyKey(f.name) || f.name.toLowerCase();
        const cur = by.get(k) ?? { name: f.name, sources: [], f };
        if (!cur.sources.includes(r.id)) cur.sources.push(r.id);
        if (!cur.f.website && f.website) cur.f = { ...cur.f, website: f.website };
        by.set(k, cur);
      }
    }
    if (!by.size) continue;
    const rows = [...by.values()].sort((a, b) => b.sources.length - a.sources.length || a.name.localeCompare(b.name));
    const lines = rows.slice(0, CAP).map(({ name, sources, f }) => `- **${name}** (${sources.join(", ")})${f.website ? ` ${f.website}` : ""}${f.url && !f.website ? ` [source](${f.url})` : ""}: ${short(f.description, 160)}${f.detail ? ` _${short(f.detail, 90)}_` : ""}`);
    out.push(`#### ${grp.title}: ${rows.length}\n${grp.hint}\n\n${lines.join("\n")}${rows.length > CAP ? `\n- and ${rows.length - CAP} more in the queue (\`startup-monitors\` artefact of the workflow run, or run the script locally)` : ""}`);
  }
  return out;
}
if (parts.length) console.log(`Written by the weekly universe refresh on ${today.toISOString().slice(0, 10)} (\`scripts/universe-gaps.ts\`). This issue closes itself when nothing is left.\n\n${parts.join("\n\n")}`);
