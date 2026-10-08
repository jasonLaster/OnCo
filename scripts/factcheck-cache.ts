/** Timestamped fact-check responses. Legacy, malformed, future-dated and expired files are misses. */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const DEFAULT_CACHE_MAX_AGE_SECONDS = 24 * 60 * 60;
export type SourceCheck = { url: string; fetchedAt: string | null; checkedAt: string; cached: boolean; httpStatus: number | null; error?: string };
type CacheEntry = { version: 1; fetchedAt: string; status: 200; body: unknown } | { version: 1; fetchedAt: string; status: 404 };

export function cacheMaxAgeSeconds(raw?: string): number {
  if (raw === undefined) return DEFAULT_CACHE_MAX_AGE_SECONDS;
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) > Number.MAX_SAFE_INTEGER / 1000) {
    throw new Error("FACTCHECK_CACHE_MAX_AGE_SECONDS must be a non-negative integer number of seconds");
  }
  return Number(raw);
}

export function freshEntry(raw: unknown, now: number, maxAgeMs: number): CacheEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  if (c.version !== 1 || typeof c.fetchedAt !== "string") return null;
  const age = now - Date.parse(c.fetchedAt);
  if (!Number.isFinite(age) || age < 0 || age >= maxAgeMs) return null;
  if (c.status === 404) return { version: 1, fetchedAt: c.fetchedAt, status: 404 };
  if (c.status === 200 && Object.hasOwn(c, "body")) return { version: 1, fetchedAt: c.fetchedAt, status: 200, body: c.body };
  return null;
}

type Options = { cacheDir: string; maxAgeMs: number; useCache: boolean; fetch?: typeof fetch; now?: () => number; sleep?: (ms: number) => Promise<void> };
export class FactcheckClient {
  readonly sources: SourceCheck[] = [];
  lastFromCache = false;
  private readonly request: typeof fetch;
  private readonly now: () => number;
  private readonly pause: (ms: number) => Promise<void>;
  constructor(private readonly options: Options) {
    this.request = options.fetch ?? fetch;
    this.now = options.now ?? Date.now;
    this.pause = options.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  }

  async getJson(url: string): Promise<unknown | null | "404"> {
    const cp = join(this.options.cacheDir, `${createHash("sha1").update(url).digest("hex")}.json`);
    this.lastFromCache = false;
    if (this.options.useCache) {
      let cached: CacheEntry | null = null;
      try { cached = freshEntry(JSON.parse(readFileSync(cp, "utf8")), this.now(), this.options.maxAgeMs); }
      catch { /* Missing or malformed cache files are fetched again. */ }
      if (cached) {
        this.lastFromCache = true;
        this.sources.push({ url, fetchedAt: cached.fetchedAt, checkedAt: new Date(this.now()).toISOString(), cached: true, httpStatus: cached.status });
        return cached.status === 404 ? "404" : cached.body;
      }
    }
    let httpStatus: number | null = null;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        httpStatus = null;
        const r = await this.request(url, { headers: { Accept: "application/json", "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
        httpStatus = r.status;
        if (r.status === 429 || r.status >= 500) throw new Error(`HTTP ${r.status}`);
        if (r.status !== 404 && !r.ok) {
          this.sources.push({ url, fetchedAt: null, checkedAt: new Date(this.now()).toISOString(), cached: false, httpStatus, error: `HTTP ${r.status}` });
          return null;
        }
        const fetchedAt = new Date(this.now()).toISOString();
        const entry: CacheEntry = r.status === 404 ? { version: 1, fetchedAt, status: 404 } : { version: 1, fetchedAt, status: 200, body: await r.json() };
        mkdirSync(this.options.cacheDir, { recursive: true });
        writeFileSync(cp, JSON.stringify(entry));
        this.sources.push({ url, fetchedAt, checkedAt: new Date(this.now()).toISOString(), cached: false, httpStatus });
        return entry.status === 404 ? "404" : entry.body;
      } catch (e) {
        if (attempt === 4) {
          const error = String(e);
          console.warn(`  giving up ${url}: ${error}`);
          this.sources.push({ url, fetchedAt: null, checkedAt: new Date(this.now()).toISOString(), cached: false, httpStatus, error });
          return null;
        }
        await this.pause(1500 * 2 ** attempt);
      }
    }
    return null;
  }
}
