/**
 * "Does OnCo already hold this company?" for the startup monitors and the freshness issue. One rule, so every monitor
 * answers the question the same way as scripts/ctgov-new-sponsors.ts:
 *
 *  - the candidate's stripped key (companyKey) or plain normalised name equals a key of a company record (companyKeys),
 *  - or the candidate's key contains a distinctive (5+ character) company key as whole words ("Akeso Biopharma Inc"
 *    against "akeso"),
 *  - or a sponsor alias in src/data/sponsor-aliases.ts recognises it (subsidiaries and acquired names),
 *  - or its website's host is a company record's host, or a subdomain of one,
 *  - or, for a listed company, its ticker or stock code is on a company record.
 *
 * Takes the entities as an argument so the module stays free of the graph and testable with fixtures.
 */
import { companyKey, companyKeys, norm } from "../../src/lib/completeness";
import { resolveSponsor } from "../../src/data/sponsor-aliases";

export type CompanyLike = { id: string; name: string; aka: string[]; website?: string; ticker?: string };

export const hostOf = (u?: string): string => {
  if (!u) return "";
  try { return new URL(/^https?:\/\//i.test(u) ? u : `https://${u}`).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
};

/** Exchange codes written in many ways ("6990.HK", "HKEX: 6990", "SEHK 06990") reduced to the bare number or symbol. */
export function tickerKeys(t?: string): string[] {
  if (!t) return [];
  const out = new Set<string>();
  for (const part of t.split(/[;,/]|\s+and\s+/)) {
    const p = part.trim().toUpperCase();
    const hk = p.match(/(\d{3,5})\s*\.?\s*HK\b/) ?? p.match(/(?:HKEX|SEHK|HK)\s*:?\s*(\d{3,5})/);
    if (hk) out.add(`HK:${String(Number(hk[1]))}`);
    const sym = p.match(/(?:NASDAQ|NYSE|AMEX|NYSE AMERICAN)\s*:?\s*([A-Z.]{1,6})\b/) ?? p.match(/^([A-Z]{1,5})$/);
    if (sym) out.add(`US:${sym[1]}`);
  }
  return [...out];
}

export class CompanyIndex {
  private keys = new Set<string>();
  private longKeys: string[] = [];
  private hosts = new Set<string>();
  private tickers = new Set<string>();
  readonly size: number;

  constructor(companies: CompanyLike[]) {
    for (const c of companies) {
      for (const k of companyKeys(c)) this.keys.add(k);
      const h = hostOf(c.website);
      if (h) this.hosts.add(h);
      for (const t of tickerKeys(c.ticker)) this.tickers.add(t);
    }
    this.longKeys = [...this.keys].filter((k) => k.length >= 5);
    this.size = companies.length;
  }

  /** True when the name, website or ticker matches a company record. */
  has(name: string, opts: { website?: string; ticker?: string; aliases?: boolean } = {}): boolean {
    const k = companyKey(name);
    if (k.length >= 3 && (this.keys.has(k) || this.keys.has(norm(name)))) return true;
    if (k.length >= 5) for (const c of this.longKeys) if (k.startsWith(c + " ") || k.endsWith(" " + c) || k.includes(" " + c + " ")) return true;
    if (opts.aliases !== false && resolveSponsor(name).matched) return true;
    const h = hostOf(opts.website);
    if (h && (this.hosts.has(h) || [...this.hosts].some((x) => h.endsWith("." + x)))) return true;
    return tickerKeys(opts.ticker).some((t) => this.tickers.has(t));
  }
}

/**
 * Oncology, as a company describes itself. Whole words only (AGENTS.md: a fragment needs word boundaries), and "ADC"
 * and "CAR-T" only in capitals so an analogue-to-digital converter or a car company does not pass.
 */
const ONCO_TEXT = /\b(cancers?|oncolog\w*|onco|immuno-oncology|tumou?rs?|tumou?r-\w+|carcinomas?|leuka?emias?|lymphomas?|myelomas?|melanomas?|sarcomas?|gliomas?|\w*blastomas?|metasta\w+|neoplas\w+|mesotheliomas?|myelodysplastic|myeloproliferative|myelofibrosis|polycyth\w*mia vera|thrombocyth\w*mia|mastocytosis|histiocytosis|macroglobulin\w*mia|malignan\w+|chemotherap\w*|radiopharmaceuticals?|radioligands?|theranostics?|antibody[- ]drug conjugates?)\b/i;
const ONCO_CAPS = /\b(ADCs?|CAR-?T|CAR-?NK|TCR-T|PD-?L?1)\b/;
export const isOncologyText = (s?: string): boolean => !!s && (ONCO_TEXT.test(s) || ONCO_CAPS.test(s));

/** The words that made a text count as oncology, for the review queue ("why is this here?"). */
export function oncologyEvidence(s?: string): string | undefined {
  if (!s) return undefined;
  return s.match(ONCO_TEXT)?.[0] ?? s.match(ONCO_CAPS)?.[0];
}
