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
 *   npx tsx scripts/universe-gaps.ts            # Markdown to stdout; empty output means nothing to do
 *
 * The workflow (.github/workflows/refresh-universe.yml) creates, updates or closes the issue from this output. It never
 * writes data.
 */
import { UNIVERSE_LISTS } from "../src/data/universe";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys } from "../src/lib/completeness";

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
if (parts.length) console.log(`Written by the weekly universe refresh on ${today.toISOString().slice(0, 10)} (\`scripts/universe-gaps.ts\`). This issue closes itself when nothing is left.\n\n${parts.join("\n\n")}`);
