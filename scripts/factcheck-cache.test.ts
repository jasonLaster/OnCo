import { afterEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cacheMaxAgeSeconds, FactcheckClient, freshEntry } from "./factcheck-cache";

const NOW = Date.parse("2026-10-07T20:00:00Z");
const URL = "https://clinicaltrials.gov/api/v2/studies/NCT06625320";
const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) rmSync(d, { recursive: true }); vi.restoreAllMocks(); });
function setup(opts: { useCache?: boolean; maxAgeMs?: number; request?: typeof fetch } = {}) {
  const cacheDir = mkdtempSync(join(tmpdir(), "onco-cache-test-")); dirs.push(cacheDir);
  const request = opts.request ?? vi.fn<typeof fetch>().mockImplementation(async () => new Response(JSON.stringify({ status: "COMPLETED" }), { status: 200 }));
  const client = new FactcheckClient({ cacheDir, maxAgeMs: opts.maxAgeMs ?? 1000, useCache: opts.useCache ?? true, now: () => NOW, fetch: request, sleep: async () => {} });
  const cp = join(cacheDir, `${createHash("sha1").update(URL).digest("hex")}.json`);
  return { client, request, cp };
}
const entry = (offset = 0) => ({ version: 1, fetchedAt: new Date(NOW - offset).toISOString(), status: 200, body: { status: "RECRUITING" } });

describe("cache lifetime configuration", () => {
  it("defaults to a day and permits zero", () => { expect(cacheMaxAgeSeconds()).toBe(86400); expect(cacheMaxAgeSeconds("0")).toBe(0); });
  it.each(["", "-1", "Infinity", "NaN", "1.5", "abc", "9007199254740991"])("rejects invalid age %s", (raw) => { expect(() => cacheMaxAgeSeconds(raw)).toThrow(/non-negative integer/); });
});
describe("fresh cache validation", () => {
  it("rejects exact-expiry, future, invalid-date and unversioned entries", () => {
    expect(freshEntry(entry(1000), NOW, 1000)).toBeNull();
    expect(freshEntry(entry(-1), NOW, 1000)).toBeNull();
    expect(freshEntry({ ...entry(), fetchedAt: "bad" }, NOW, 1000)).toBeNull();
    expect(freshEntry({ body: {} }, NOW, 1000)).toBeNull();
  });
  it("rejects missing body, unsupported version/status and nonobjects", () => {
    for (const raw of [null, 4, { ...entry(), version: 2 }, { ...entry(), status: 500 }, { version: 1, fetchedAt: entry().fetchedAt, status: 200 }]) expect(freshEntry(raw, NOW, 1000)).toBeNull();
  });
});
describe("fact-check lookups", () => {
  it("reuses a fresh response and records the original retrieval date", async () => {
    const { client, cp, request } = setup(); writeFileSync(cp, JSON.stringify(entry(100)));
    expect(await client.getJson(URL)).toEqual({ status: "RECRUITING" }); expect(request).not.toHaveBeenCalled();
    expect(client.lastFromCache).toBe(true); expect(client.sources[0]).toEqual({ url: URL, fetchedAt: entry(100).fetchedAt, checkedAt: new Date(NOW).toISOString(), cached: true, httpStatus: 200 });
  });
  it.each(["expired", "legacy", "corrupt", "future"])("refreshes %s responses", async (kind) => {
    const { client, cp, request } = setup();
    writeFileSync(cp, kind === "corrupt" ? "{broken" : JSON.stringify(kind === "legacy" ? { body: {} } : entry(kind === "expired" ? 1001 : -1)));
    expect(await client.getJson(URL)).toEqual({ status: "COMPLETED" }); expect(request).toHaveBeenCalledTimes(1); expect(client.lastFromCache).toBe(false);
    expect(JSON.parse(readFileSync(cp, "utf8"))).toMatchObject({ version: 1, fetchedAt: new Date(NOW).toISOString(), status: 200 });
    expect(client.sources[0]).toMatchObject({ cached: false, httpStatus: 200 });
  });
  it.each([{ useCache: false }, { maxAgeMs: 0 }])("forces retrieval for %j", async (options) => {
    const { client, cp, request } = setup(options); writeFileSync(cp, JSON.stringify(entry()));
    await client.getJson(URL); expect(request).toHaveBeenCalledTimes(1);
  });
  it("reuses fresh 404s but refreshes expired and legacy 404s", async () => {
    const { client, cp, request } = setup();
    writeFileSync(cp, JSON.stringify({ version: 1, status: 404, fetchedAt: entry(100).fetchedAt }));
    expect(await client.getJson(URL)).toBe("404"); expect(request).not.toHaveBeenCalled();
    writeFileSync(cp, JSON.stringify({ version: 1, status: 404, fetchedAt: entry(1000).fetchedAt }));
    await client.getJson(URL); expect(request).toHaveBeenCalledTimes(1);
    writeFileSync(cp, JSON.stringify({ notFound: true }));
    await client.getJson(URL); expect(request).toHaveBeenCalledTimes(2);
  });
  it("timestamps a network 404 and retains not-found semantics", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 404 }));
    const { client, cp } = setup({ request }); expect(await client.getJson(URL)).toBe("404");
    expect(JSON.parse(readFileSync(cp, "utf8"))).toEqual({ version: 1, fetchedAt: new Date(NOW).toISOString(), status: 404 });
    expect(client.sources[0]).toMatchObject({ httpStatus: 404, cached: false });
  });
  it("reports unavailable responses without a fabricated retrieval date", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const request = vi.fn<typeof fetch>().mockRejectedValue(new Error("offline"));
    const { client } = setup({ request }); expect(await client.getJson(URL)).toBeNull(); expect(request).toHaveBeenCalledTimes(4);
    expect(client.sources).toHaveLength(1); expect(client.sources[0]).toMatchObject({ fetchedAt: null, httpStatus: null, cached: false, error: "Error: offline" });
  });
  it("retries a server error and records only the final logical lookup", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValueOnce(new Response(null, { status: 503 })).mockResolvedValueOnce(new Response('{"ok":true}'));
    const { client } = setup({ request }); expect(await client.getJson(URL)).toEqual({ ok: true }); expect(request).toHaveBeenCalledTimes(2); expect(client.sources).toHaveLength(1);
  });
  it("does not cache permanent HTTP errors", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 403 }));
    const { client, cp } = setup({ request }); expect(await client.getJson(URL)).toBeNull();
    expect(() => readFileSync(cp)).toThrow(); expect(client.sources[0]).toMatchObject({ fetchedAt: null, httpStatus: 403 });
  });
});
