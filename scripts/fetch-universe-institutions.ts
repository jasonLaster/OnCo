/**
 * Institution and charity universe lists: the outside registers that say which cancer organisations exist, so OnCo
 * can measure how many of them it holds and name the ones it lacks.
 *
 *   irs-cancer-charities    US 501(c)(3) organisations in the IRS Exempt Organizations Business Master File whose
 *                           NTEE code is a cancer code (G30 cancer, G32 breast cancer, H30 cancer research, H32 breast
 *                           cancer research) or whose registered name carries a cancer word; the 300 with the largest
 *                           reported revenue
 *   ccew-cancer-charities   charities on the register of the Charity Commission for England and Wales whose registered
 *                           name carries a cancer word; the 100 with the largest latest income
 *   aaci-members            the Association of American Cancer Institutes member directory (every state and province)
 *   cog-members             Children's Oncology Group member institutions (COG's own location directory)
 *   ncg-members             National Cancer Grid (India) member list, with the member type NCG assigns
 *   uicc-member-directory   every member profile under uicc.org/membership/ (name, category, country)
 *   mhlw-cancer-hospitals   Japan: the 51 prefectural designated cancer care hospitals (都道府県がん診療連携拠点病院) and
 *                           the cancer genomic medicine core hospitals (がんゲノム医療中核拠点病院), from the two PDF lists
 *                           of the Ministry of Health, Labour and Welfare; English names come from the hand-checked table
 *                           in src/data/universe-lists/mhlw-english.ts. Needs `pdftotext` (poppler) on the PATH.
 *
 * Same envelope as scripts/fetch-universe.ts: { checked, source, method, total, items, ...extras }, written to
 * src/data/universe-lists/<name>.json; a source that fails keeps its previous snapshot. Every request sends the OnCo
 * User-Agent, one at a time with a pause. robots.txt was read on every host on 2026-11-04: irs.gov,
 * the Charity Commission register and its blob store, aaci-cancer.org (/members), childrensoncologygroup.org,
 * ncgindia.org and uicc.org allow these paths. ncorp.cancer.gov (the NCORP site list) disallows every path to every
 * robot, so NCORP is not fetched; aaci-cancer.org disallows /files/, so its printable PDF is not read.
 *
 * The IRS files are large (about 340 MB for the four regions); they are cached in .cache/irs-eo-bmf/ (gitignored) and
 * re-downloaded with --refresh. The Charity Commission extract is cached in .cache/ccew/ the same way.
 *
 * Coverage against the corpus: npx tsx scripts/institution-coverage.ts [list] (institutions and nonprofit-type
 * company records both count, because charities are held as either).
 *
 * Run: npx tsx scripts/fetch-universe-institutions.ts            Only some: -- --only=aaci-members,cog-members
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { decodeEntities, sleep, stripTags, today } from "./feed-utils";
import { zipEntries } from "./fetch-universe-regulatory";

export const UA = "OnCo (https://onco.cc; hello@onco.cc)";
const OUT_DIR = join(process.cwd(), "src", "data", "universe-lists");
const CACHE = join(process.cwd(), ".cache");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);
const REFRESH = process.argv.includes("--refresh");
const PAUSE_MS = 1500;
const errors: string[] = [];
const clean = (s: string) => decodeEntities(stripTags(s)).replace(/ /g, " ").replace(/\s+/g, " ").trim();

type Envelope = { checked: string; source: { label: string; url: string }; method: string; total: number; items?: unknown[] } & Record<string, unknown>;

async function fetchRaw(url: string, tries = 4): Promise<Response | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      await sleep(PAUSE_MS);
      if (r.status === 429 || r.status >= 500) { await sleep(3000 * (i + 1)); continue; }
      return r.ok ? r : null;
    } catch (e) {
      if (i === tries - 1) { console.warn(`  giving up ${url}: ${(e as Error).message}`); return null; }
      await sleep(2000 * (i + 1));
    }
  }
  return null;
}
async function text(url: string): Promise<string | null> { const r = await fetchRaw(url); return r ? r.text() : null; }

/** A cached download: read from .cache unless missing or --refresh. */
async function cached(dir: string, file: string, url: string): Promise<Buffer | null> {
  const d = join(CACHE, dir);
  const p = join(d, file);
  if (!REFRESH && existsSync(p)) return readFileSync(p);
  const r = await fetchRaw(url);
  if (!r) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  mkdirSync(d, { recursive: true });
  writeFileSync(p, buf);
  return buf;
}

function save(name: string, data: Envelope): void {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(data, null, 1) + "\n");
  console.log(`universe: ${name}: total ${data.total}${data.items ? ` (${data.items.length} items)` : ""}`);
}

async function source(name: string, run: () => Promise<Envelope | null>): Promise<void> {
  if (ONLY && !ONLY.includes(name)) return;
  try {
    const data = await run();
    if (!data) throw new Error("no data");
    if (data.total <= 0) throw new Error("parsed zero");
    save(name, data);
  } catch (e) {
    errors.push(`${name}: ${(e as Error).message}`);
    console.warn(`universe: FAILED ${name}: ${(e as Error).message}; keeping previous snapshot`);
  }
}

/** One CSV line into fields; handles double-quoted fields with doubled quotes. */
export function csvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

// ---------------------------------------------------------------------------------------------------
// IRS Exempt Organizations Business Master File: US cancer charities.
// ---------------------------------------------------------------------------------------------------
const IRS_PAGE = "https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf";
const IRS_REGIONS = [1, 2, 3, 4].map((n) => `https://www.irs.gov/pub/irs-soi/eo${n}.csv`);
/** NTEE codes for cancer in the IRS information sheet (irs.gov/pub/foia/ig/tege/eo-info.pdf). */
export const IRS_CANCER_NTEE = ["G30", "G32", "H30", "H32"];
/** Words in a registered name that make an organisation a cancer organisation whatever its NTEE code. */
export const CANCER_NAME = /\b(CANCERS?|LEUKA?EMIAS?|LYMPHOMAS?|MYELOMAS?|ONCOLOGY|ONCOLOGIC|TUMOU?RS?|SARCOMAS?|MELANOMAS?|MESOTHELIOMA|NEUROBLASTOMA|GLIOBLASTOMA|CARCINOID|NEUROENDOCRINE|CHOLANGIOCARCINOMA|MYELODYSPLASTIC|CHORDOMA|RETINOBLASTOMA)\b/i;
/** Organisations a cancer NTEE code or name word brings in that are not cancer organisations, with the reason. */
export const IRS_EXCLUDE: Array<[RegExp, string]> = [
  [/\bRONALD MCDONALD HOUSE/, "Ronald McDonald House chapters house the families of any seriously ill child; the IRS codes several of them G30 but they are not cancer organisations"],
];
const IRS_TOP = 300;
export type IrsCharity = { ein: string; name: string; aka?: string; city: string; state: string; ntee: string; revenue: number; assets: number; taxPeriod: string; url: string };

export function irsRows(csv: string): IrsCharity[] {
  const lines = csv.split(/\r?\n/);
  const head = csvLine(lines[0]);
  const ix = (k: string) => head.indexOf(k);
  const [iEin, iName, iSort, iCity, iState, iSub, iNtee, iRev, iAss, iTax] = ["EIN", "NAME", "SORT_NAME", "CITY", "STATE", "SUBSECTION", "NTEE_CD", "REVENUE_AMT", "ASSET_AMT", "TAX_PERIOD"].map(ix);
  const out: IrsCharity[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const f = csvLine(line);
    if (f[iSub] !== "03") continue;
    const ntee = f[iNtee] ?? "";
    const name = f[iName] ?? "", sort = f[iSort] ?? "";
    if (!IRS_CANCER_NTEE.includes(ntee.slice(0, 3)) && !CANCER_NAME.test(name) && !CANCER_NAME.test(sort)) continue;
    if (IRS_EXCLUDE.some(([re]) => re.test(name))) continue;
    out.push({
      ein: f[iEin], name, ...(sort && CANCER_NAME.test(sort) ? { aka: sort } : {}), city: f[iCity], state: f[iState], ntee,
      revenue: Number(f[iRev] || 0), assets: Number(f[iAss] || 0), taxPeriod: f[iTax] ?? "",
      url: `https://projects.propublica.org/nonprofits/organizations/${f[iEin]}`,
    });
  }
  return out;
}

async function irsCancerCharities(): Promise<Envelope | null> {
  const page = await text(IRS_PAGE);
  const posted = page?.match(/Updated data posting date:(?:&nbsp;|\s)*<strong>([^<]+)<\/strong>/)?.[1]?.trim();
  const all: IrsCharity[] = [];
  for (const [i, url] of IRS_REGIONS.entries()) {
    const buf = await cached("irs-eo-bmf", `eo${i + 1}.csv`, url);
    if (!buf) throw new Error(`could not read ${url}`);
    all.push(...irsRows(buf.toString("latin1")));
  }
  all.sort((a, b) => b.revenue - a.revenue || a.name.localeCompare(b.name));
  const items = all.slice(0, IRS_TOP);
  return {
    checked: today(), source: { label: "IRS: Exempt Organizations Business Master File Extract", url: IRS_PAGE },
    method: `Every 501(c)(3) organisation in the four regional files of the IRS Exempt Organizations Business Master File Extract (posted ${posted ?? "date not read"}) whose NTEE code begins G30 (cancer), G32 (breast cancer), H30 (cancer research) or H32 (breast cancer research), or whose registered or sort name contains a cancer word (cancer, leukemia, lymphoma, myeloma, oncology, tumor, sarcoma, melanoma and the like). Ronald McDonald House chapters are left out (${IRS_EXCLUDE[0][1]}). Ranked by the revenue on the organisation's latest filing as the IRS records it; the ${IRS_TOP} largest are the list. Each EIN is a separate legal entity, so a centre with a hospital, a research institute and a foundation appears more than once. Detail links go to ProPublica's Nonprofit Explorer, which presents the same IRS filings.`,
    total: items.length, licence: "Public domain (US government work)", posted, matched: all.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// Charity Commission for England and Wales: UK cancer charities.
// ---------------------------------------------------------------------------------------------------
const CCEW_PAGE = "https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download";
const CCEW_ZIP = "https://ccewuksprdoneregsadata1.blob.core.windows.net/data/txt/publicextract.charity.zip";
const CCEW_TOP = 100;
export const CCEW_EXCLUDE: Array<[RegExp, string]> = [
  [/\bHOSPICE\b/i, "hospices care for people dying of any illness; a hospice named after a person called Macmillan or similar is not a cancer charity"],
];
export type CcewCharity = { number: string; name: string; income: number; yearEnd: string; website?: string; url: string };

export function ccewRows(tsv: string): CcewCharity[] {
  const lines = tsv.replace(/^﻿/, "").split(/\r?\n/);
  const head = lines[0].split("\t");
  const ix = (k: string) => head.indexOf(k);
  const [iNum, iLinked, iName, iStatus, iInc, iEnd, iWeb] = ["registered_charity_number", "linked_charity_number", "charity_name", "charity_registration_status", "latest_income", "latest_acc_fin_period_end_date", "charity_contact_web"].map(ix);
  const out: CcewCharity[] = [];
  for (let i = 1; i < lines.length; i++) {
    const f = lines[i].split("\t");
    if (f.length < head.length - 2) continue;
    if (f[iStatus] !== "Registered" || (f[iLinked] && f[iLinked] !== "0")) continue;
    const name = f[iName].trim();
    if (!CANCER_NAME.test(name) || CCEW_EXCLUDE.some(([re]) => re.test(name))) continue;
    const web = f[iWeb]?.trim();
    out.push({ number: f[iNum], name, income: Number(f[iInc] || 0), yearEnd: (f[iEnd] ?? "").slice(0, 10), ...(web ? { website: web } : {}), url: `https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/${f[iNum]}` });
  }
  return out;
}

async function ccewCancerCharities(): Promise<Envelope | null> {
  const zip = await cached("ccew", "publicextract.charity.zip", CCEW_ZIP);
  if (!zip) throw new Error("could not read the Charity Commission extract");
  const entries = zipEntries(zip);
  const txt = [...entries.entries()].find(([n]) => n.endsWith(".txt"))?.[1];
  if (!txt) throw new Error("no text file in the extract");
  const s = txt.toString("utf8");
  const extract = s.split(/\r?\n/)[1]?.slice(0, 10);
  const all = ccewRows(s).sort((a, b) => b.income - a.income || a.name.localeCompare(b.name));
  const items = all.slice(0, CCEW_TOP);
  return {
    checked: today(), source: { label: "Charity Commission for England and Wales: register of charities data extract", url: CCEW_PAGE },
    method: `Every main registered charity (not a linked subsidiary) in the Charity Commission's daily public extract (extract of ${extract ?? "date not read"}) whose registered name contains a cancer word (cancer, leukaemia, lymphoma, myeloma, oncology, tumour, sarcoma, melanoma and the like), hospices excepted. Ranked by latest reported income; the ${CCEW_TOP} largest are the list. Name matching misses cancer charities whose names carry no such word (Anthony Nolan, Marie Curie, Maggie's, which is registered in Scotland), and Scottish and Northern Irish registers are not read.`,
    total: items.length, licence: "Open Government Licence v3.0", extract, matched: all.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// AACI member directory.
// ---------------------------------------------------------------------------------------------------
const AACI_URL = "https://www.aaci-cancer.org/members";
export type AaciMember = { name: string; director?: string; city: string; region: string; website?: string };

export function parseAaci(html: string, region: string): AaciMember[] {
  const out: AaciMember[] = [];
  for (const block of html.split(/<div class="col-sm-6">/).slice(1)) {
    const name = block.match(/<h5[^>]*>([\s\S]*?)<\/h5>/)?.[1];
    if (!name) continue;
    const director = block.match(/<div class="direction">([\s\S]*?)<\/div>/)?.[1];
    const addr = block.match(/<address[^>]*>([\s\S]*?)<\/address>/)?.[1];
    const web = block.match(/<a[^>]*href="(https?:[^"]+)"/)?.[1];
    out.push({ name: clean(name), ...(director ? { director: clean(director) } : {}), city: addr ? clean(addr) : "", region, ...(web ? { website: web } : {}) });
  }
  return out;
}

async function aaciMembers(): Promise<Envelope | null> {
  const html = await text(AACI_URL);
  if (!html) return null;
  const regions = [...new Set([...html.matchAll(/value="([A-Z]{2})"/g)].map((m) => m[1]))];
  if (regions.length < 30) throw new Error(`only ${regions.length} regions`);
  const seen = new Map<string, AaciMember>();
  for (const r of regions) {
    const page = await text(`${AACI_URL}?search=1&search_state=${r}`);
    if (!page) throw new Error(`could not read ${r}`);
    for (const m of parseAaci(page.slice(page.indexOf("member-center-listing")), r)) if (!seen.has(m.name)) seen.set(m.name, m);
  }
  const items = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  return {
    checked: today(), source: { label: "Association of American Cancer Institutes: member directory", url: AACI_URL },
    method: "Every centre the AACI member directory lists when searched by each state and province it offers, one entry per centre name (a centre listed under two states counts once), with the director, city and website the directory gives.",
    total: items.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// Children's Oncology Group member institutions.
// ---------------------------------------------------------------------------------------------------
const COG_PAGE = "https://childrensoncologygroup.org/patients-families/member-institutions/";
const COG_API = "https://childrensoncologygroup.org/wp-json/wp/v2/bh_sl_locations";
export type CogMember = { name: string; city: string; region: string; country: string; website?: string; lat?: number; lng?: number; url: string };

async function cogMembers(): Promise<Envelope | null> {
  const items: CogMember[] = [];
  for (let page = 1; page < 10; page++) {
    const r = await fetchRaw(`${COG_API}?per_page=100&page=${page}&_fields=title,link,meta`);
    if (!r) break;
    const rows = (await r.json()) as Array<{ title: { rendered: string }; link: string; meta: Record<string, string> }>;
    if (!rows.length) break;
    for (const x of rows) {
      const m = x.meta;
      const lat = Number(m.bh_storelocator_location_lat), lng = Number(m.bh_storelocator_location_lng);
      items.push({ name: clean(x.title.rendered), city: m._bh_sl_city ?? "", region: m._bh_sl_state ?? "", country: m._bh_sl_country ?? "", ...(m._bh_sl_web ? { website: m._bh_sl_web } : {}), ...(Number.isFinite(lat) && lat ? { lat, lng } : {}), url: x.link });
    }
    if (rows.length < 100) break;
  }
  items.sort((a, b) => a.name.localeCompare(b.name));
  return {
    checked: today(), source: { label: "Children's Oncology Group: member institutions", url: COG_PAGE },
    method: "Every location in the Children's Oncology Group member-institution directory, read through the site's public WordPress REST endpoint for its store-locator entries, with the city, state or province, country and website the entry gives.",
    total: items.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// National Cancer Grid (India) members.
// ---------------------------------------------------------------------------------------------------
const NCG_PAGE = "https://www.ncgindia.org/hospitals-and-institutions/members";
const NCG_LIST = "https://www.ncgindia.org/hospitalsandinstitutions/_index";
const NCG_TYPES: Record<string, string> = {
  "D83F0EAA-2B81-4E98-92B7-67AE3DA693FD": "Cancer centre or unit",
  "C5B8761F-35DE-47B1-9C44-B8552F3F6039": "Research institution",
  "9C6E09D4-F8C2-41EB-8B79-6AFBEFB46456": "NGO or charity",
  "D7BC404E-F674-4C4B-B040-D7372721CD83": "Professional society",
};
export type NcgMember = { name: string; type: string; region: string; address: string; website?: string };

export function parseNcg(html: string, type: string): NcgMember[] {
  const out: NcgMember[] = [];
  let region = "";
  for (const row of html.split(/<tr>/).slice(1)) {
    const th = row.match(/<th[^>]*>([\s\S]*?)<\/th>/);
    if (th) { region = clean(th[1]); continue; }
    const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    if (tds.length < 2) continue;
    const name = clean(tds[0]);
    if (!name) continue;
    const web = row.match(/<a href="(https?:[^"]+)"/)?.[1];
    out.push({ name, type, region, address: clean(tds[1]), ...(web ? { website: web } : {}) });
  }
  return out;
}

async function ncgMembers(): Promise<Envelope | null> {
  const items: NcgMember[] = [];
  for (const [id, type] of Object.entries(NCG_TYPES)) {
    const html = await text(`${NCG_LIST}?type_id=${id}&country_id=&state_id=`);
    if (!html) throw new Error(`could not read ${type}`);
    items.push(...parseNcg(html, type));
  }
  return {
    checked: today(), source: { label: "National Cancer Grid: member list", url: NCG_PAGE },
    method: "Every member the National Cancer Grid member list shows under each of its four member types (cancer centres and units, research institutions, NGOs and charities, professional societies), read from the list fragment the page itself loads, with the state or country heading, address and website given.",
    total: items.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// UICC member directory.
// ---------------------------------------------------------------------------------------------------
const UICC_SITEMAP = "https://www.uicc.org/sitemap.xml";
const UICC_PAGE = "https://www.uicc.org/who-we-work/members";
export type UiccMember = { name: string; category: string; country: string; url: string };

export function parseUiccProfile(html: string, url: string): UiccMember | null {
  const category = html.match(/Membership category\s*-\s*(?:<[^>]+>\s*)*([^<]+)</)?.[1];
  if (!category) return null;
  const name = clean(html.match(/<title>([\s\S]*?)\s*\|\s*UICC<\/title>/)?.[1] ?? "");
  const loc = html.match(/>\s*Location\s*<[\s\S]*?(?=Social Media Profiles|<\/address>|<footer)/)?.[0] ?? "";
  const parts = clean(loc.replace(/<[^>]+>/g, "\n")).split(/\s{0,}\n\s{0,}|\s{2,}/).filter(Boolean);
  const lines = loc.replace(/<[^>]+>/g, "\n").split("\n").map((s) => clean(s)).filter((s) => s && s !== "," && s !== "Location");
  return { name, category: clean(category), country: lines[lines.length - 1] ?? parts[parts.length - 1] ?? "", url };
}

async function uiccMembers(): Promise<Envelope | null> {
  const sm = await text(UICC_SITEMAP);
  if (!sm) return null;
  const urls = [...new Set([...sm.matchAll(/<loc>(https:\/\/www\.uicc\.org\/membership\/[^<]+)<\/loc>/g)].map((m) => m[1]))];
  if (urls.length < 500) throw new Error(`only ${urls.length} profile URLs`);
  const items: UiccMember[] = [];
  for (const [i, u] of urls.entries()) {
    const html = await text(u);
    const m = html ? parseUiccProfile(html, u) : null;
    if (m) items.push(m);
    if (i % 100 === 0) console.log(`  uicc ${i}/${urls.length}`);
  }
  items.sort((a, b) => a.name.localeCompare(b.name));
  return {
    checked: today(), source: { label: "UICC: member profiles (uicc.org/membership)", url: UICC_PAGE },
    method: `Every page under uicc.org/membership/ in the UICC sitemap (${urls.length} URLs) that carries a 'Membership category', read one at a time: the organisation name, membership category and the country of its listed address.`,
    total: items.length, profileUrls: urls.length, items,
  };
}

// ---------------------------------------------------------------------------------------------------
// Japan: MHLW designated cancer hospitals (prefectural tier) and cancer genomic medicine core hospitals.
// ---------------------------------------------------------------------------------------------------
const MHLW_PAGE = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/gan/gan_byoin.html";
export type MhlwHospital = { ja: string; prefecture: string; category: "prefectural" | "genome-core"; name?: string; website?: string };
const PREF = "(?:北海道|東京都|京都府|大阪府|\\S{2,3}県)";

/** Rows of the prefectural section of the designated-hospital list (pdftotext -layout output). */
export function parseMhlwPrefectural(txt: string): MhlwHospital[] {
  const out: MhlwHospital[] = [];
  let inSection = false;
  const row = new RegExp(`^\\s*\\d+\\s+(${PREF})\\s+(.+?)\\s*$`);
  for (const line of txt.replace(/\f/g, "").split("\n")) {
    if (line.includes("【")) { inSection = line.includes("【都道府県がん診療連携拠点病院】"); continue; }
    const m = inSection ? line.match(row) : null;
    if (m) out.push({ ja: m[2].replace(/\s+/g, " "), prefecture: m[1], category: "prefectural" });
  }
  return out;
}

/** Core hospitals in the genomic-medicine list: rows whose category column reads がんゲノム医療中核拠点病院. */
export function parseMhlwGenomeCore(txt: string): MhlwHospital[] {
  const out: MhlwHospital[] = [];
  const row = new RegExp(`^(${PREF})\\s+(.+?)\\s+がんゲノム医療中核拠点病院`);
  for (const line of txt.replace(/\f/g, "").split("\n")) {
    const m = line.match(row);
    const ja = m?.[2].trim().replace(/\s+/g, " ");
    if (m && ja && !out.some((o) => o.ja === ja)) out.push({ ja, prefecture: m[1], category: "genome-core" });
  }
  return out;
}

async function pdfText(url: string): Promise<string> {
  const r = await fetchRaw(url);
  if (!r) throw new Error(`could not read ${url}`);
  const d = join(CACHE, "mhlw");
  mkdirSync(d, { recursive: true });
  const pdf = join(d, url.split("/").pop() as string);
  writeFileSync(pdf, Buffer.from(await r.arrayBuffer()));
  execFileSync("pdftotext", ["-layout", pdf, pdf + ".txt"]);
  return readFileSync(pdf + ".txt", "utf8");
}

async function mhlwCancerHospitals(): Promise<Envelope | null> {
  const page = await text(MHLW_PAGE);
  if (!page) return null;
  const kyoten = page.match(/href="(\/content\/\d+\.pdf)"[^>]*>がん診療連携拠点病院等の一覧表（([^）]+)）/);
  const genome = page.match(/href="(\/content\/\d+\.pdf)"[^>]*>がんゲノム医療中核拠点病院等一覧（([^）]+)）/);
  if (!kyoten || !genome) throw new Error("list links not found on the MHLW page");
  const pref = parseMhlwPrefectural(await pdfText(`https://www.mhlw.go.jp${kyoten[1]}`));
  const core = parseMhlwGenomeCore(await pdfText(`https://www.mhlw.go.jp${genome[1]}`));
  if (pref.length < 45 || core.length < 10) throw new Error(`parsed ${pref.length} prefectural and ${core.length} core hospitals`);
  const { MHLW_ENGLISH } = await import("../src/data/universe-lists/mhlw-english");
  const items = [...pref, ...core].map((h) => { const en = MHLW_ENGLISH[h.ja]; return en ? { ...h, name: en.name, ...(en.website ? { website: en.website } : {}) } : h; });
  return {
    checked: today(), source: { label: "Ministry of Health, Labour and Welfare: designated cancer care hospitals", url: MHLW_PAGE },
    method: `The prefectural tier of the MHLW list of designated cancer care hospitals (都道府県がん診療連携拠点病院, list as of ${kyoten[2]}) and the core hospitals of the MHLW list of cancer genomic medicine hospitals (がんゲノム医療中核拠点病院, ${genome[2]}), read from the two PDFs linked on the ministry's page. A hospital in both tiers appears twice. Names are the ministry's Japanese names; the English name and website of each come from the hospital's own English pages, checked by hand (src/data/universe-lists/mhlw-english.ts).`,
    total: items.length, prefectural: pref.length, genomeCore: core.length, listDates: { prefectural: kyoten[2], genomeCore: genome[2] }, items,
  };
}

async function main() {
  await source("irs-cancer-charities", irsCancerCharities);
  await source("ccew-cancer-charities", ccewCancerCharities);
  await source("aaci-members", aaciMembers);
  await source("cog-members", cogMembers);
  await source("ncg-members", ncgMembers);
  await source("uicc-member-directory", uiccMembers);
  await source("mhlw-cancer-hospitals", mhlwCancerHospitals);
  if (errors.length) { console.warn(`universe: ${errors.length} source(s) failed:\n  ${errors.join("\n  ")}`); if (errors.length >= 6) process.exit(1); }
}

if (process.argv[1]?.endsWith("fetch-universe-institutions.ts")) main();
