/* OnCo service worker: offline for a static site.
 *
 * Strategy
 *  - shell (home, offline page, manifest) is cached on install;
 *  - hashed build assets under /_next/static/ are cache-first (immutable by construction);
 *  - the search index and entity JSON under /api/v1/ are network-first (fresh after every deploy), falling back to the cached copy offline;
 *  - molecule structures, logos and other media are cache-first on demand;
 *  - page navigations are network-first with a short timeout, then the cached copy, then /offline/.
 * Visited pages accumulate in the page cache, capped at PAGE_LIMIT entries (oldest evicted).
 * Bump VERSION to drop every old cache on the next activation. Registered by src/components/RegisterSW.tsx.
 *
 * The page cache is additionally dropped whenever the site is rebuilt, which is what BUILD_KEY below does.
 * Without it the site loads unstyled on a first visit after a deploy, and correctly on a refresh: cached HTML
 * from the previous build names a hashed stylesheet under /_next/static/ that the new deployment no longer
 * has, so the markup arrives and the CSS 404s. The refresh then reaches the network and looks right, which is
 * why it reads as intermittent. VERSION was hand-bumped and had sat at v4 across many deploys. Reported by the
 * owner, 8 October 2026.
 */
const VERSION = "onco-v5";
const SHELL_CACHE = `${VERSION}-shell`;
const PAGE_CACHE = `${VERSION}-pages`;
const ASSET_CACHE = `${VERSION}-assets`;
const DATA_CACHE = `${VERSION}-data`;
const MEDIA_CACHE = `${VERSION}-media`;
const SHELL = ["/", "/offline/", "/manifest.webmanifest", "/saved/"];
const PAGE_LIMIT = 200;
const MEDIA_LIMIT = 400;
const NETWORK_TIMEOUT_MS = 6000;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL).catch(() => undefined)).then(() => self.skipWaiting()));
});

/**
 * The build this cache belongs to, read from the API's own meta.json. When it changes, every cached page is
 * from a build whose stylesheets have gone, so the page cache and the shell are dropped. Hashed assets are
 * left alone: they are immutable and a new build simply asks for new names.
 */
const BUILD_KEY = `${VERSION}-build`;

async function dropStaleBuild() {
  try {
    const res = await fetch("/api/v1/meta.json", { cache: "no-store" });
    if (!res.ok) return;
    const built = String((await res.json()).built || "");
    if (!built) return;
    const store = await caches.open(BUILD_KEY);
    const seen = await store.match("/__build");
    if (seen && (await seen.text()) === built) return;
    await Promise.all([caches.delete(PAGE_CACHE), caches.delete(SHELL_CACHE)]);
    await store.put("/__build", new Response(built));
  } catch {
    // Offline, or the API is unreachable: keep what we have, which is the whole point of the cache.
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))).then(dropStaleBuild).then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

const isNavigation = (req) => req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");

async function trim(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - limit; i++) await cache.delete(keys[i]);
}

async function cacheFirst(req, cacheName, limit) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) { cache.put(req, res.clone()); if (limit) trim(cacheName, limit); }
  return res;
}

async function networkFirstData(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  const refresh = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => undefined);
  return hit || (await refresh) || Response.error();
}

/**
 * Activation only runs when this file's bytes change, and this file does not change on every deploy, so the
 * build check also runs once per page load. It is one conditional request against a small JSON file that the
 * data cache already holds.
 */
let buildChecked = false;
function checkBuildOnce() {
  if (buildChecked) return;
  buildChecked = true;
  dropStaleBuild();
}

async function networkFirstPage(req) {
  checkBuildOnce();
  const cache = await caches.open(PAGE_CACHE);
  try {
    // Give the network a head start; after the timeout serve a cached copy if there is one, otherwise keep waiting for the
    // network. The offline page is for a real network failure, not a slow connection or a cold edge.
    const network = fetch(req).then((res) => { if (res && res.ok) { cache.put(req, res.clone()); trim(PAGE_CACHE, PAGE_LIMIT); } return res; });
    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NETWORK_TIMEOUT_MS));
    const first = await Promise.race([network.catch(() => null), timeout]);
    if (first) return first;
    const cached = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
    if (cached) return cached;
    return await network;
  } catch {
    const hit = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
    if (hit) return hit;
    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match(req, { ignoreSearch: true })) || (await shell.match("/offline/")) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/_next/static/")) { event.respondWith(cacheFirst(req, ASSET_CACHE)); return; }
  if (url.pathname.startsWith("/api/v1/") || url.pathname === "/provenance.json" || url.pathname.startsWith("/feeds/")) { event.respondWith(networkFirstData(req, DATA_CACHE)); return; }
  if (/^\/(structures|logos|globocan|openalex|trials|papers)\//.test(url.pathname) || /\.(svg|png|jpg|jpeg|webp|ico|woff2?|json)$/.test(url.pathname)) { event.respondWith(cacheFirst(req, MEDIA_CACHE, MEDIA_LIMIT)); return; }
  if (isNavigation(req)) { event.respondWith(networkFirstPage(req)); return; }
});
