/**
 * Startup monitors: the places new oncology companies show up first, read by small fetchers that each write a review
 * queue and never data. Owner ask of 1 November 2026 ("startup monitors must cover all the best places oncology
 * startups appear"); the rule and the list of skipped sources are in docs/LAUNCH.md, "Keeping the company list fresh".
 *
 *   npx tsx scripts/startup-monitors.ts                     every source, filings and awards from the last 90 days
 *   npx tsx scripts/startup-monitors.ts --days=35           a narrower window for the dated sources
 *   npx tsx scripts/startup-monitors.ts --only=yc,edgar     some sources (ids below)
 *   npx tsx scripts/startup-monitors.ts --out=<dir>         where the queues go (default .cache/startup-monitors)
 *
 * Sources (id: what it reads):
 *   yc            Y Combinator companies tagged oncology, and healthcare companies whose own description is oncology,
 *                 from the open yc-oss dataset (YC's robots.txt disallows the filtered directory, /companies?*).
 *   arch, third-rock, a16z, gv, khosla, orbimed, ra-capital, atlas, flagship
 *                 the firm's own portfolio page, for investors that have a record in src/data/investors.ts; only
 *                 companies whose own description on the page is oncology (Third Rock: its "Cancer" focus tag).
 *                 GV and HKEX give names only, so their rows are marked "oncology not stated" and kept out of the issue.
 *   edgar         SEC EDGAR full-text search: S-1 and F-1 registrations that mention oncology or cancer, from drug,
 *                 biotech, diagnostics and device filers.
 *   hkex-18a      HKEX list of securities: Chapter 18A biotech issuers (stock short name ending "-B").
 *   fda-orphan    FDA Orphan Drug Designations database: oncology designations in the window, by sponsor, with the
 *                 sponsor's earliest designation so first-time sponsors stand out.
 *   ema-orphan    EMA orphan designations (EMA's JSON data file), oncology, with the sponsor from each designation page.
 *   nih-sbir      NIH RePORTER: NCI SBIR and STTR awards to small businesses in the window.
 *
 * Output: <out>/<id>.json per source and <out>/summary.json, which scripts/universe-gaps.ts turns into a section of the
 * standing freshness issue ("Freshness: stale sources and companies to add"). Nothing under src/data is written: a
 * portfolio tile, a filing or a grant is a pointer, and every company is confirmed on its own website before a record
 * is written (CONTRIBUTING.md).
 *
 * Politeness: one request at a time, at least 1.5 s between requests to the same host (OrbiMed asks 10 s), a
 * User-Agent naming OnCo with a contact address (SEC requires one), retries with backoff on 429 and 5xx, and a
 * robots.txt check before every web page (documented APIs are marked as such and listed in the docs).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { decodeEntities, stripTags } from "./feed-utils";
import { CompanyIndex, isOncologyText, oncologyEvidence, type CompanyLike } from "./lib/company-match";
import { checkRobots } from "./lib/robots";
import { readFirstSheet } from "./lib/xlsx";

export const UA = "OnCo startup-monitors (https://onco.cc; hello@onco.cc)";
const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const ONLY = arg("only")?.split(",").filter(Boolean);
const DAYS = Number(arg("days") ?? 90);
const OUT = arg("out") ?? join(process.cwd(), ".cache", "startup-monitors");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const todayIso = () => new Date().toISOString().slice(0, 10);
const sinceIso = () => { const d = new Date(); d.setUTCDate(d.getUTCDate() - DAYS); return d.toISOString().slice(0, 10); };
export const clean = (s?: string) => decodeEntities(stripTags(s ?? "")).replace(/ /g, " ").replace(/\s+/g, " ").trim();

// ---------------------------------------------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------------------------------------------

/** One portfolio tile, filing, designation or award, as the source gives it. */
export type Row = { name: string; website?: string; ticker?: string; description?: string; url?: string; date?: string; detail?: string; oncology?: "stated" | "unknown" };
export type Finding = Row & { oncology: "stated" | "unknown"; evidence?: string };
export type SourceResult = {
  id: string; label: string; url: string; method: string; checked: string;
  status: "ok" | "failed" | "skipped"; reason?: string;
  /** Rows read from the source; rows that are oncology; oncology rows that match no company record. */
  read: number; oncology: number; missing: Finding[];
  /** Rows the source cannot say are oncology (names only), unmatched: kept in the queue file, not in the issue. */
  unscreened?: Finding[];
};
export type Summary = { generated: string; days: number; since: string; sources: SourceResult[] };

// ---------------------------------------------------------------------------------------------------------------
// HTTP: polite, sequential, per-host spacing, robots-aware for web pages
// ---------------------------------------------------------------------------------------------------------------

const lastHit = new Map<string, number>();
const HOST_GAP: Record<string, number> = { "www.orbimed.com": 10_000 };

async function http(url: string, init: { method?: string; body?: string; headers?: Record<string, string>; api?: boolean; binary?: boolean } = {}): Promise<{ status: number; text: string; buf?: Buffer }> {
  const host = new URL(url).host;
  if (!init.api) {
    const v = await checkRobots(url, UA);
    if (!v.allowed) throw new Error(`robots: ${v.reason}`);
  }
  for (let attempt = 0; attempt < 4; attempt++) {
    const gap = HOST_GAP[host] ?? 1500;
    const wait = (lastHit.get(host) ?? 0) + gap - Date.now();
    if (wait > 0) await sleep(wait);
    lastHit.set(host, Date.now());
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 90_000);
      const r = await fetch(url, { method: init.method ?? "GET", body: init.body, headers: { "User-Agent": UA, Accept: "*/*", ...init.headers }, redirect: "follow", signal: ctl.signal });
      clearTimeout(t);
      if (r.status === 429 || r.status >= 500) { await sleep(2000 * 2 ** attempt); continue; }
      if (init.binary) { const buf = Buffer.from(await r.arrayBuffer()); return { status: r.status, text: "", buf }; }
      return { status: r.status, text: await r.text() };
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(2000 * 2 ** attempt);
    }
  }
  throw new Error(`gave up after retries: ${url}`);
}
async function page(url: string): Promise<string> {
  const r = await http(url, { headers: { Accept: "text/html" } });
  if (r.status !== 200) throw new Error(`HTTP ${r.status} for ${url}`);
  if (/<title>\s*Just a moment/i.test(r.text)) throw new Error(`bot challenge at ${url}`);
  return r.text;
}
async function api<T>(url: string, body?: unknown): Promise<T> {
  const r = await http(url, body === undefined ? { api: true, headers: { Accept: "application/json" } } : { api: true, method: "POST", body: JSON.stringify(body), headers: { Accept: "application/json", "Content-Type": "application/json" } });
  if (r.status !== 200) throw new Error(`HTTP ${r.status} for ${url}: ${r.text.slice(0, 200)}`);
  return JSON.parse(r.text) as T;
}

// ---------------------------------------------------------------------------------------------------------------
// Parsers (pure, tested in scripts/startup-monitors.test.ts)
// ---------------------------------------------------------------------------------------------------------------

const between = (s: string, re: RegExp) => s.match(re)?.[1];
const jsonStr = (s?: string) => { if (s === undefined) return undefined; try { return JSON.parse(`"${s}"`) as string; } catch { return s; } };
const titleFromSlug = (slug: string) => slug.split("-").map((w) => (w.length <= 2 && w !== "bio" ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(" ");

/** ARCH Venture Partners: `<div class="company">` with co-title, the logo link to the company site, and co-desc. */
export function parseArch(html: string): Row[] {
  const out: Row[] = [];
  for (const m of html.matchAll(/<div class="company">([\s\S]*?)(?=<div class="company">|<\/main>|$)/g)) {
    const b = m[1];
    const name = clean(between(b, /class="co-title">([\s\S]*?)<\/div>/));
    if (!name) continue;
    out.push({ name, website: between(b, /class="co-logo">\s*<a[^>]*href="([^"]+)"/), description: clean(between(b, /class="co-desc">([\s\S]*?)<\/div>/)), detail: clean(between(b, /class="co-location">([\s\S]*?)<\/div>/)) });
  }
  return out;
}

/** Third Rock Ventures: tiles carry data-slug and data-focus ids; the focus select names the ids ("Cancer"). */
export function parseThirdRock(html: string): Row[] {
  const select = between(html, /data-filter-property="focus"[^>]*>([\s\S]*?)<\/select>/) ?? "";
  const cancer = between(select, /<option value="(\d+)">\s*Cancer\s*<\/option>/);
  const statuses = new Map([...(between(html, /data-filter-property="status"[^>]*>([\s\S]*?)<\/select>/) ?? "").matchAll(/<option value="(\d+)">\s*([^<]+?)\s*<\/option>/g)].map((m) => [m[1], m[2]]));
  const out: Row[] = [];
  for (const m of html.matchAll(/data-slug="([^"]+)"[^>]*?data-status="([^"]*)"[^>]*?data-focus="([^"]*)"/g)) {
    const focus = m[3].split(",");
    out.push({ name: titleFromSlug(m[1]), url: `https://www.thirdrockventures.com/portfolio/${m[1]}`, detail: statuses.get(m[2]), oncology: cancer && focus.includes(cancer) ? "stated" : undefined, description: cancer && focus.includes(cancer) ? "Focus: Cancer (Third Rock's tag)" : undefined });
  }
  return out;
}

/** a16z: the portfolio page embeds every company as JSON ({"id":...,"title":...,"web":...,"overview":...}). */
export function parseA16z(html: string): Row[] {
  const out = new Map<string, Row>();
  const chunks = html.split(/\{"id":"\d+","logo_width":/).slice(1);
  for (const c of chunks) {
    const name = jsonStr(between(c, /"title":"((?:[^"\\]|\\.)*)"/));
    if (!name || out.has(name)) continue;
    out.set(name, { name: decodeEntities(name), website: jsonStr(between(c, /"web":"((?:[^"\\]|\\.)*)"/)) || undefined, description: decodeEntities(jsonStr(between(c, /"overview":"((?:[^"\\]|\\.)*)"/)) ?? ""), detail: jsonStr(between(c, /"stages":\["((?:[^"\\]|\\.)*)"/)) });
  }
  return [...out.values()];
}

/** Khosla Ventures: cards linking to the company site, with a title, a one-line tag and an investment thesis. */
export function parseKhosla(html: string): Row[] {
  const out: Row[] = [];
  for (const c of html.split(/class="card-container"/).slice(1)) {
    const name = clean(between(c, /class="back-company-title">([\s\S]*?)<\/div>/));
    if (!name) continue;
    const tag = clean(between(c, /class="company-card-title">([\s\S]*?)<\/div>/));
    const thesis = clean(between(c, /class="back-text">([\s\S]*?)<\/div>/));
    out.push({ name, website: between(c, /href="([^"]+)"[^>]*class="company-card-wrapper/), description: [tag, thesis].filter(Boolean).join(". "), detail: clean(between(c, /class="fund-round-text">([\s\S]*?)<\/div>/)) });
  }
  return out;
}

/** OrbiMed: one modal per company with its name, a description, the sector and a link to the company site. */
export function parseOrbimed(html: string): Row[] {
  const out: Row[] = [];
  for (const c of html.split(/<div class="portfolio-modal" id="/).slice(1)) {
    const name = clean(between(c, /<h2>([\s\S]*?)<\/h2>/));
    if (!name) continue;
    out.push({ name, website: between(c, /<a href="([^"]+)" target="_blank"><img [^>]*icon-world/), description: clean(between(c, /class="p-area">([\s\S]*?)<\/div>/)), detail: clean(between(c, /<h5>Sector<\/h5>\s*<p>([\s\S]*?)<\/p>/)) });
  }
  return out;
}

/** RA Capital: one article per company, the name in a screen-reader heading and a one-line description on hover. */
export function parseRaCapital(html: string): Row[] {
  const out: Row[] = [];
  for (const c of html.split(/<article\b/).slice(1)) {
    const name = clean(between(c, /<h3 class="sr-only">([\s\S]*?)<\/h3>/));
    if (!name) continue;
    const descs = [...c.matchAll(/<div class="relative">([\s\S]*?)<\/div>/g)].map((m) => clean(m[1])).filter(Boolean);
    out.push({ name, url: between(c, /href="(https:\/\/www\.racap\.com\/portfolio\/[^"]+)"/), description: descs[descs.length - 1] });
  }
  return out;
}

/** Atlas Venture: one tile per company with a hidden title and a short copy line. */
export function parseAtlas(html: string): Row[] {
  const out: Row[] = [];
  for (const c of html.split(/<article\b/).slice(1)) {
    const name = clean(between(c, /<div class="title"[^>]*>([\s\S]*?)<\/div>/));
    if (!name) continue;
    out.push({ name, description: clean(between(c, /<div class="copy">([\s\S]*?)<\/div>/)) });
  }
  return out;
}

/** Flagship Pioneering: the companies grid gives names and links only; the description is on each company page. */
export function parseFlagshipGrid(html: string): Row[] {
  const out = new Map<string, Row>();
  for (const m of html.matchAll(/<a href="(https:\/\/www\.flagshippioneering\.com\/companies\/[^"]+)" class="companies__grid-link" title="([^"]+)"([\s\S]*?)<\/a>/g)) {
    const name = clean(m[2]);
    if (!out.has(name)) out.set(name, { name, url: m[1], date: clean(between(m[3], /class="company__grid-year">([\s\S]*?)<\/div>/)) || undefined });
  }
  return [...out.values()];
}
export function parseFlagshipCompany(html: string): string {
  return clean([between(html, /class="company__promt">([\s\S]*?)<div class="company__body/), between(html, /class="company__body[^"]*">([\s\S]*?)<\/div>/)].filter(Boolean).join(" "));
}

/** GV: a Nuxt page; the company list sits in the __NUXT_DATA__ payload with a sector reference per company. */
export function parseGv(html: string): Row[] {
  const raw = between(html, /<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!raw) return [];
  const a = JSON.parse(raw) as unknown[];
  const memo = new Map<number, unknown>();
  const WRAP = new Set(["ShallowReactive", "Reactive", "Ref", "ShallowRef", "EmptyRef", "EmptyShallowRef"]);
  const r = (i: unknown): unknown => {
    if (typeof i !== "number") return i;
    if (memo.has(i)) return memo.get(i);
    const v = a[i];
    if (Array.isArray(v)) {
      if (typeof v[0] === "string" && WRAP.has(v[0])) { const out = r(v[1]); memo.set(i, out); return out; }
      const out: unknown[] = []; memo.set(i, out); for (const x of v) out.push(r(x)); return out;
    }
    if (v && typeof v === "object") { const out: Record<string, unknown> = {}; memo.set(i, out); for (const [k, x] of Object.entries(v)) out[k] = r(x); return out; }
    memo.set(i, v); return v;
  };
  r(0);
  type Doc = { _type?: string; _id?: string; title?: string; name?: string; sector?: { _ref?: string }; secondarySector?: { _ref?: string } };
  const docs = [...memo.values()].filter((o): o is Doc => !!o && typeof o === "object" && !Array.isArray(o));
  const sectors = new Map(docs.filter((d) => d._type === "sector" && d._id).map((d) => [d._id!, d.title ?? ""]));
  const out = new Map<string, Row>();
  for (const d of docs) {
    if (d._type !== "company" || !d.name) continue;
    const secs = [d.sector?._ref, d.secondarySector?._ref].map((x) => (x ? sectors.get(x) : undefined)).filter(Boolean) as string[];
    // "*" after a name marks a past investment (an exit) on GV's page.
    const name = d.name.replace(/\s*\*\s*$/, "").trim();
    if (!out.has(name)) out.set(name, { name, detail: `${secs.join(", ")}${/\*\s*$/.test(d.name) ? "; past investment" : ""}` });
  }
  return [...out.values()];
}

/** HKEX list of securities (xlsx rows keyed by column): Chapter 18A biotech issuers carry "-B" after the short name. */
export function parseHkexRows(rows: Array<Record<string, string>>): Row[] {
  const head = rows.findIndex((r) => r.A === "Stock Code" && /Name of Securities/.test(r.B ?? ""));
  if (head < 0) return [];
  return rows.slice(head + 1).filter((r) => r.C === "Equity" && /-B$/.test(r.B ?? "")).map((r) => ({
    name: r.B.replace(/-B$/, "").trim(), ticker: `${String(Number(r.A))}.HK`, detail: `${r.D ?? "Equity"}; stock code ${r.A}`,
    url: `https://www.hkex.com.hk/Market-Data/Securities-Prices/Equities/Equities-Quote?sym=${Number(r.A)}&sc_lang=en`, oncology: "unknown" as const,
  }));
}

/** FDA OOPD "Excel" export, which is an HTML table. Header names are matched, not positions. */
export function parseOopd(html: string): Array<Record<string, string>> {
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => clean(c[1]).replace(/^'\s*|\s*'$/g, "")));
  if (!rows.length) return [];
  const head = rows[0];
  return rows.slice(1).filter((r) => r.length >= head.length - 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}
const usDate = (s?: string) => { const m = s?.match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? `${m[3]}-${m[1]}-${m[2]}` : undefined; };
const euDate = (s?: string) => { const m = s?.match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? `${m[3]}-${m[2]}-${m[1]}` : undefined; };
const toUs = (iso: string) => `${iso.slice(5, 7)}/${iso.slice(8, 10)}/${iso.slice(0, 4)}`;

/** EMA orphan designation page: the sponsor sits under a "Sponsor" label. */
export function parseEmaSponsor(html: string): string | undefined {
  const i = html.search(/>\s*Sponsor\s*</);
  if (i < 0) return undefined;
  const after = clean(html.slice(i + 1, i + 1500)).replace(/^Sponsor\s*/, "");
  const name = after.split(/\s+(?:EMA list of opinions|Patients'|Related|Key facts|Documents|Contact|Opinion|Sponsor contact)\b/)[0].trim();
  return name && name.length < 160 ? name : undefined;
}

// ---------------------------------------------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------------------------------------------

type Ctx = { index: CompanyIndex; since: string };
type Source = { id: string; label: string; url: string; method: string; run: (ctx: Ctx) => Promise<{ rows: Row[]; note?: string }> };

/** A portfolio source: read one page, parse, optionally read a detail page for rows that are unmatched and undescribed. */
function portfolio(id: string, label: string, url: string, parse: (html: string) => Row[], method: string): Source {
  return { id, label, url, method, run: async () => ({ rows: parse(await page(url)) }) };
}

const SOURCES: Source[] = [
  {
    id: "yc", label: "Y Combinator companies (yc-oss open dataset)", url: "https://yc-oss.github.io/api/",
    method: "The open yc-oss dataset, rebuilt daily from YC's public directory: companies tagged oncology, plus healthcare-industry companies whose own one-liner or description reads as oncology. Inactive companies are left out.",
    run: async () => {
      type Yc = { name: string; website?: string; one_liner?: string; long_description?: string; batch?: string; status?: string; url?: string; tags?: string[]; industries?: string[] };
      const tagged = await api<Yc[]>("https://yc-oss.github.io/api/tags/oncology.json");
      const health = await api<Yc[]>("https://yc-oss.github.io/api/industries/healthcare.json");
      const byName = new Map<string, Row>();
      for (const c of [...tagged, ...health]) {
        if (byName.has(c.name) || /inactive/i.test(c.status ?? "")) continue;
        const text = `${c.one_liner ?? ""} ${c.long_description ?? ""} ${(c.tags ?? []).join(" ")}`;
        const isTagged = (c.tags ?? []).some((t) => /oncology/i.test(t));
        if (!isTagged && !isOncologyText(text)) continue;
        byName.set(c.name, { name: c.name, website: c.website, description: clean(c.one_liner) || clean(c.long_description).slice(0, 240), url: c.url, detail: [isTagged ? "YC tag: oncology" : "", c.batch, c.status].filter(Boolean).join("; "), oncology: "stated" });
      }
      return { rows: [...byName.values()], note: `${tagged.length} tagged oncology, ${health.length} in healthcare` };
    },
  },
  portfolio("arch", "ARCH Venture Partners: portfolio", "https://www.archventure.com/portfolio/", parseArch, "Every company tile on ARCH's portfolio page (name, website, one-line description); oncology when the description says so."),
  portfolio("third-rock", "Third Rock Ventures: portfolio", "https://www.thirdrockventures.com/portfolio", parseThirdRock, "Third Rock's portfolio tiles with the firm's own Cancer focus tag. Names come from the page's slugs."),
  portfolio("a16z", "Andreessen Horowitz: portfolio", "https://a16z.com/portfolio/", parseA16z, "The company list embedded in a16z's portfolio page (name, website, overview); oncology when the overview says so."),
  portfolio("gv", "GV: portfolio", "https://www.gv.com/portfolio", parseGv, "Names and sectors from GV's portfolio page. GV gives no description, so Life Sciences companies that match no record are kept in the queue as unscreened and left out of the issue."),
  portfolio("khosla", "Khosla Ventures: portfolio", "https://www.khoslaventures.com/portfolio", parseKhosla, "Khosla's portfolio cards (name, website, tag line and investment thesis); oncology when they say so."),
  portfolio("orbimed", "OrbiMed: portfolio", "https://www.orbimed.com/portfolio/", parseOrbimed, "OrbiMed's portfolio entries (name, description, sector, website); oncology when the description says so. OrbiMed's robots.txt asks for 10 seconds between requests; this reads one page."),
  portfolio("ra-capital", "RA Capital Management: portfolio", "https://www.racap.com/portfolio", parseRaCapital, "RA Capital's portfolio tiles (name and one-line description); oncology when the description says so."),
  portfolio("atlas", "Atlas Venture: portfolio", "https://atlasventure.com/portfolio/", parseAtlas, "Atlas's portfolio tiles (name and short description); oncology when the description says so."),
  {
    id: "flagship", label: "Flagship Pioneering: companies", url: "https://www.flagshippioneering.com/companies",
    method: "Names from Flagship's companies grid; for each name that matches no company record, the company's page on Flagship's site is read and kept when its text is oncology.",
    run: async (ctx) => {
      const grid = parseFlagshipGrid(await page("https://www.flagshippioneering.com/companies"));
      let reads = 0;
      for (const r of grid) {
        if (ctx.index.has(r.name) || !r.url || reads >= 80) continue;
        reads++;
        try { r.description = parseFlagshipCompany(await page(r.url)).slice(0, 600); } catch (e) { r.detail = `page not read: ${(e as Error).message}`; }
      }
      return { rows: grid, note: `${reads} company pages read` };
    },
  },
  {
    id: "edgar", label: "SEC EDGAR full-text search: S-1 and F-1", url: "https://efts.sec.gov/LATEST/search-index",
    method: "EDGAR full-text search (the documented JSON endpoint behind efts.sec.gov) for S-1 and F-1 registration statements filed in the window that contain \"oncology\" or \"cancer\", kept when the filer's SIC code is drugs, biologics, diagnostics, medical devices or life-science research. A filer with a ticker is already listed (a follow-on or resale); one without is usually an IPO.",
    run: async (ctx) => {
      type Hit = { _source: { ciks: string[]; display_names: string[]; root_forms: string[]; form: string; file_date: string; adsh: string; sics?: string[]; biz_locations?: string[] } };
      const BIO_SIC = new Set(["2833", "2834", "2835", "2836", "3826", "3841", "3842", "3844", "3845", "5047", "5122", "8071", "8731", "8733", "8734"]);
      const byCik = new Map<string, Row>();
      for (const q of ['"oncology"', '"cancer"']) {
        for (let from = 0; from < 1000; from += 100) {
          const u = `https://efts.sec.gov/LATEST/search-index?q=${encodeURIComponent(q)}&forms=S-1,F-1&dateRange=custom&startdt=${ctx.since}&enddt=${todayIso()}&from=${from}`;
          const j = await api<{ hits: { total: { value: number }; hits: Hit[] } }>(u);
          for (const h of j.hits.hits) {
            const s = h._source;
            const cik = s.ciks?.[0];
            if (!cik || byCik.has(cik)) continue;
            const sics = s.sics ?? [];
            if (sics.length && !sics.some((x) => BIO_SIC.has(x))) continue;
            const dn = s.display_names?.[0] ?? "";
            const ticker = dn.match(/\(([A-Z][A-Z0-9.-]{0,9}(?:,\s*[A-Z][A-Z0-9.-]{0,9})*)\)\s*\(CIK/)?.[1];
            const name = dn.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
            byCik.set(cik, { name, ticker: ticker ? ticker.split(",")[0].trim() : undefined, date: s.file_date, oncology: "stated", description: `${s.root_forms?.[0] ?? s.form} filed ${s.file_date}; SIC ${sics.join("/") || "none"}; ${s.biz_locations?.[0] ?? ""}`.trim(), detail: ticker ? `already listed (${ticker}); follow-on or resale` : "no ticker: likely an initial public offering", url: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=${s.root_forms?.[0] ?? "S-1"}` });
          }
          if (from + 100 >= j.hits.total.value) break;
        }
      }
      return { rows: [...byCik.values()] };
    },
  },
  {
    id: "hkex-18a", label: "HKEX: Chapter 18A biotech issuers", url: "https://www.hkex.com.hk/eng/services/trading/securities/securitieslists/ListOfSecurities.xlsx",
    method: "HKEX's daily list of securities (xlsx); equities whose short name ends \"-B\", the marker HKEX gives biotech companies listed under Chapter 18A without revenue. Matched by stock code against company tickers, then by name. The list gives no description, so oncology is not stated.",
    run: async () => {
      const r = await http("https://www.hkex.com.hk/eng/services/trading/securities/securitieslists/ListOfSecurities.xlsx", { binary: true });
      if (r.status !== 200 || !r.buf) throw new Error(`HTTP ${r.status}`);
      return { rows: parseHkexRows(readFirstSheet(r.buf)) };
    },
  },
  {
    id: "fda-orphan", label: "FDA Orphan Drug Designations database", url: "https://www.accessdata.fda.gov/scripts/opdlisting/oopd/index.cfm",
    method: "The database's own export of designations granted in the window, kept when the designated use is oncology, grouped by sponsor. For each sponsor that matches no company record, a second query for that sponsor across all dates gives its earliest designation, so first-time sponsors are marked.",
    run: async (ctx) => {
      const post = async (fields: Record<string, string>) => {
        const body = new URLSearchParams({ Product_name: "", sponsor_name: "", Designation: "", Designation_Start_Date: "01/01/1983", Designation_End_Date: toUs(todayIso()), Search_param: "DESDATE", Output_Format: "Excel", Sort_order: "Date_Order", RecordsPerPage: "25", newSearch: "Run Search", ...fields }).toString();
        const r = await http("https://www.accessdata.fda.gov/scripts/opdlisting/oopd/OOPD_Results.cfm", { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
        return parseOopd(r.text);
      };
      const rows = await post({ Designation_Start_Date: toUs(ctx.since) });
      const bySponsor = new Map<string, Row & { uses: string[] }>();
      for (const x of rows) {
        const use = x["Orphan Designation"] ?? "", sponsor = (x["Sponsor Company"] ?? "").trim();
        if (!sponsor || !isOncologyText(use)) continue;
        const cur = bySponsor.get(sponsor) ?? { name: sponsor, uses: [], date: usDate(x["Date Designated"]), oncology: "stated" as const, detail: [x["Sponsor City"], x["Sponsor Country"]].filter(Boolean).join(", ") };
        cur.uses.push(`${x["Generic Name"]}: ${use} (${usDate(x["Date Designated"])})`);
        bySponsor.set(sponsor, cur);
      }
      let lookups = 0;
      for (const s of bySponsor.values()) {
        s.description = s.uses.slice(0, 4).join("; ");
        if (ctx.index.has(s.name) || lookups >= 40) continue;
        lookups++;
        const all = await post({ sponsor_name: s.name });
        const dates = all.map((r) => usDate(r["Date Designated"])).filter(Boolean).sort() as string[];
        if (dates.length) s.detail = `${s.detail ? s.detail + "; " : ""}${dates[0] >= ctx.since ? "first-time sponsor" : `designations since ${dates[0]}`} (${dates.length} in all)`;
      }
      return { rows: [...bySponsor.values()].map((r) => { const { uses, ...rest } = r; void uses; return rest; }), note: `${rows.length} designations in the window, ${lookups} sponsor histories read` };
    },
  },
  {
    id: "ema-orphan", label: "EMA orphan designations", url: "https://www.ema.europa.eu/en/documents/report/medicines-output-orphan_designations-json-report_en.json",
    method: "EMA's published JSON data file of orphan designations: positive designations dated or first published in the window whose intended use is oncology; the sponsor is read from each designation's page on EMA's site (the data file does not carry it).",
    run: async (ctx) => {
      type D = { active_substance?: string; date_of_designation_or_refusal?: string; first_published_date?: string; intended_use?: string; status?: string; orphan_designation_url?: string; eu_designation_number?: string };
      const j = await api<{ data: D[] }>("https://www.ema.europa.eu/en/documents/report/medicines-output-orphan_designations-json-report_en.json");
      const recent = j.data.filter((d) => /positive/i.test(d.status ?? "") && isOncologyText(d.intended_use) && ((euDate(d.date_of_designation_or_refusal) ?? "") >= ctx.since || (euDate(d.first_published_date) ?? "") >= ctx.since));
      const bySponsor = new Map<string, Row & { uses: string[] }>();
      let reads = 0;
      for (const d of recent.slice(0, 60)) {
        let sponsor: string | undefined;
        if (d.orphan_designation_url) { reads++; try { sponsor = parseEmaSponsor(await page(d.orphan_designation_url)); } catch { /* counted below as unknown */ } }
        const key = sponsor ?? "(sponsor not read)";
        const cur = bySponsor.get(key) ?? { name: key, uses: [], date: euDate(d.date_of_designation_or_refusal), url: d.orphan_designation_url, oncology: "stated" as const };
        cur.uses.push(`${d.active_substance}: ${d.intended_use} (${d.eu_designation_number})`);
        bySponsor.set(key, cur);
      }
      return { rows: [...bySponsor.values()].map(({ uses, ...r }) => ({ ...r, description: uses.slice(0, 4).join("; ") })), note: `${recent.length} oncology designations in the window, ${reads} pages read` };
    },
  },
  {
    id: "nih-sbir", label: "NIH RePORTER: NCI SBIR and STTR awards", url: "https://api.reporter.nih.gov/",
    method: "The RePORTER v2 API: awards funded by the National Cancer Institute under the SBIR and STTR activity codes (R41, R42, R43, R44, U43, U44, SB1) with a notice date in the window, grouped by the small business that holds them.",
    run: async (ctx) => {
      type P = { appl_id: number; project_num: string; project_title: string; award_amount?: number; award_notice_date?: string; activity_code: string; organization?: { org_name?: string; org_city?: string; org_state?: string; org_country?: string } };
      const results: P[] = [];
      for (let offset = 0; offset < 2000; offset += 500) {
        const j = await api<{ meta: { total: number }; results: P[] }>("https://api.reporter.nih.gov/v2/projects/search", {
          criteria: { activity_codes: ["R41", "R42", "R43", "R44", "U43", "U44", "SB1"], agencies: ["NCI"], award_notice_date: { from_date: ctx.since, to_date: todayIso() } },
          include_fields: ["ApplId", "ProjectNum", "ProjectTitle", "Organization", "AwardNoticeDate", "AwardAmount", "ActivityCode"], offset, limit: 500, sort_field: "award_notice_date", sort_order: "desc",
        });
        results.push(...j.results);
        if (offset + 500 >= j.meta.total) break;
      }
      const byOrg = new Map<string, Row & { awards: P[] }>();
      for (const p of results) {
        const org = p.organization?.org_name?.trim();
        if (!org) continue;
        const cur = byOrg.get(org) ?? { name: org, awards: [], oncology: "stated" as const, detail: [p.organization?.org_city, p.organization?.org_state].filter(Boolean).join(", "), url: `https://reporter.nih.gov/project-details/${p.appl_id}` };
        cur.awards.push(p);
        byOrg.set(org, cur);
      }
      return {
        rows: [...byOrg.values()].map(({ awards, ...r }) => ({ ...r, date: awards.map((a) => a.award_notice_date?.slice(0, 10) ?? "").sort().pop(), description: awards.slice(0, 3).map((a) => `${a.activity_code} ${a.project_num}: ${a.project_title}${a.award_amount ? ` ($${a.award_amount.toLocaleString("en-US")})` : ""}`).join("; ") })),
        note: `${results.length} awards`,
      };
    },
  },
];

/** Sources considered and not read, with the reason. Shown in the issue so nobody adds them without reading why. */
export const SKIPPED: Array<{ id: string; label: string; reason: string }> = [
  { id: "yc-directory", label: "Y Combinator company directory, filtered", reason: "YC's robots.txt disallows /companies?* (the filtered directory). The yc-oss open dataset of the same directory is read instead." },
  { id: "fda-breakthrough", label: "FDA Breakthrough Therapy designations", reason: "FDA does not publish designations with sponsor names; CDER publishes only counts and the list of approvals that had the designation, which names no new sponsors." },
  { id: "ema-prime", label: "EMA PRIME eligibility list", reason: "No machine-readable list was found at a stable address on EMA's site (EMA's JSON data files cover medicines and orphan designations, not PRIME); read the PRIME page by hand." },
  { id: "crunchbase-pitchbook", label: "Crunchbase and PitchBook", reason: "Their terms forbid scraping." },
  { id: "trade-press", label: "Fierce Biotech, Endpoints, STAT, BioSpace", reason: "Most refuse automated reads (the 29 October round); read by hand as pointers." },
];

// ---------------------------------------------------------------------------------------------------------------

function corpusCompanies(): CompanyLike[] {
  const g = graph();
  return [...g.kind("company"), ...g.kind("institution")].map((e) => {
    const x = e as unknown as { id: string; name: string; aka: string[]; website?: string; ticker?: string };
    return { id: x.id, name: x.name, aka: x.aka ?? [], website: x.website, ticker: x.ticker };
  });
}

export function screen(rows: Row[], index: CompanyIndex): { oncology: Finding[]; missing: Finding[]; unscreened: Finding[] } {
  const oncology: Finding[] = [], missing: Finding[] = [], unscreened: Finding[] = [];
  for (const r of rows) {
    const text = `${r.description ?? ""}`;
    const stated = r.oncology === "stated" || isOncologyText(text);
    const known = index.has(r.name, { website: r.website, ticker: r.ticker });
    if (stated) {
      const f: Finding = { ...r, oncology: "stated", evidence: oncologyEvidence(text) };
      oncology.push(f);
      if (!known) missing.push(f);
    } else if (r.oncology === "unknown" && !known) unscreened.push({ ...r, oncology: "unknown" });
  }
  return { oncology, missing, unscreened };
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const index = new CompanyIndex(corpusCompanies());
  const since = sinceIso();
  const ctx: Ctx = { index, since };
  const results: SourceResult[] = [];
  for (const s of SOURCES) {
    if (ONLY && !ONLY.includes(s.id)) continue;
    const base = { id: s.id, label: s.label, url: s.url, method: s.method, checked: todayIso() };
    let res: SourceResult;
    try {
      const { rows, note } = await s.run(ctx);
      if (!rows.length) throw new Error("parsed zero rows: the page may have changed shape");
      // GV's names are unscreened only when they are life-science companies.
      const tagged = s.id === "gv" ? rows.map((r) => (/Life Sciences/.test(r.detail ?? "") ? { ...r, oncology: "unknown" as const } : r)) : rows;
      const { oncology, missing, unscreened } = screen(tagged, index);
      res = { ...base, status: "ok", reason: note, read: rows.length, oncology: oncology.length, missing, unscreened: unscreened.length ? unscreened : undefined };
    } catch (e) {
      const msg = (e as Error).message;
      res = { ...base, status: msg.startsWith("robots:") ? "skipped" : "failed", reason: msg, read: 0, oncology: 0, missing: [] };
    }
    results.push(res);
    writeFileSync(join(OUT, `${s.id}.json`), JSON.stringify(res, null, 1) + "\n");
    console.log(`monitors: ${s.id}: ${res.status}; read ${res.read}, oncology ${res.oncology}, not in OnCo ${res.missing.length}${res.unscreened ? `, unscreened ${res.unscreened.length}` : ""}${res.reason ? ` (${res.reason})` : ""}`);
  }
  const summary: Summary = { generated: todayIso(), days: DAYS, since, sources: results };
  writeFileSync(join(OUT, "summary.json"), JSON.stringify(summary, null, 1) + "\n");
  console.log(`monitors: summary written to ${join(OUT, "summary.json")}`);
}

if (process.argv[1]?.endsWith("startup-monitors.ts")) main().catch((e) => { console.error(e); process.exit(1); });
