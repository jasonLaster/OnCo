/**
 * Accessibility audit in a real browser: serve the static export in `out/` (or point at a running site), open a
 * representative set of pages in headless Chrome over the DevTools protocol and run axe-core (WCAG 2.0, 2.1 and 2.2
 * A and AA plus best practices) in three themes:
 *
 *   light     a light device, nothing saved
 *   dark      a dark device, nothing saved: the default theme follows the device (owner, 10 November 2026)
 *   contrast  the high-contrast theme, saved as a reader's choice
 *
 * This is the half of the accessibility check that needs layout and paint: colour contrast, link-in-text, target
 * size, scrollable regions. The rules that need only markup run in the ship gates (src/app/a11y.test.ts, jsdom).
 * Both read the tags, the sampled pages and the allowance list (which can only shrink) from
 * src/test-utils/a11y-allowance.ts. Serious and critical violations not on that list fail the run; everything is
 * written to a JSON report. The dark run also fails if the page did not actually paint dark, which is the guard on
 * the device-following default.
 *
 *   npm run build && npx tsx scripts/a11y.ts                       # all pages in light, the sample in all three themes
 *   npx tsx scripts/a11y.ts --url http://localhost:3000 --only /cancers/tnbc/,/timeline/ --themes dark
 *   npx tsx scripts/a11y.ts --report a11y-report.json --pages 40 --warn-only --all-kinds
 *
 * Needs Google Chrome: CHROME=/path/to/chrome, else the macOS app path, else `google-chrome` (on GitHub's Ubuntu
 * runners). No Playwright; axe-core is a devDependency.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer, type Server } from "node:http";
import { createReadStream, existsSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META, KINDS, routeFor } from "../src/lib/schema";
import { NAV_GROUPS } from "../src/lib/nav";
import { THEME_KEY } from "../src/lib/theme";
import { CONSENT_KEY } from "../src/lib/analytics-consent";
import { A11Y_GATE_IMPACTS, A11Y_PAGES, A11Y_TAGS, allowed } from "../src/test-utils/a11y-allowance";

type Violation = { id: string; impact?: string | null; allowed?: number; help: string; helpUrl: string; description: string; nodes: Array<{ html: string; target: string[]; failureSummary?: string }> };
type AxeResults = { violations: Violation[] };
type Theme = "light" | "dark" | "contrast";
const THEMES: readonly Theme[] = ["light", "dark", "contrast"];

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const opt = (name: string, dflt: string) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : dflt; };
const REPORT = opt("--report", "a11y-report.json");
const MAX_PAGES = Number(opt("--pages", "36"));
const WARN_ONLY = flag("--warn-only");
const BASE_URL = opt("--url", "").replace(/\/$/, "");
const ONLY = opt("--only", "").split(",").map((s) => s.trim()).filter(Boolean);
const RUN_THEMES = opt("--themes", THEMES.join(",")).split(",").filter((t): t is Theme => (THEMES as readonly string[]).includes(t));
const PORT = Number(opt("--port", "9379"));

const MIME: Record<string, string> = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };

/** Static server for `out/` mirroring Vercel's trailing-slash behaviour. */
function serve(root: string): Promise<{ server: Server; url: string }> {
  const server = createServer((req, res) => {
    const path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = normalize(join(root, path));
    if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    else if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
    if (!existsSync(file)) { const nf = join(root, "404.html"); if (existsSync(nf)) { res.writeHead(404, { "content-type": "text/html" }); createReadStream(nf).pipe(res); } else { res.writeHead(404); res.end(); } return; }
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => { const a = server.address(); resolve({ server, url: typeof a === "object" && a ? `http://127.0.0.1:${a.port}` : "http://127.0.0.1" }); }));
}

/** Representative pages: home, the landings, every kind index, one object of each kind, the tools that carry the most interaction, and the shared sample. */
function pickPages(): string[] {
  const g = graph();
  const pages: string[] = ["/", ...NAV_GROUPS.map((n) => n.href)];
  for (const k of KINDS) pages.push(`/${KIND_META[k].route}/`);
  const featured = ["tnbc", "trastuzumab-deruxtecan", "trop2", "pembrolizumab", "destiny-breast03"].map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e);
  for (const e of featured) pages.push(routeFor(e));
  const seen = new Set(featured.map((e) => e.kind));
  for (const k of KINDS) { if (seen.has(k)) continue; const first = g.kind(k)[0]; if (first) pages.push(routeFor(first)); }
  pages.push("/explore/", "/compare/", "/pivot/", "/saved/", "/api/", "/about/", "/calendar/", "/regulatory/");
  const unique = [...new Set(pages)];
  return [...new Set([...A11Y_PAGES.map((p) => p.url), ...(flag("--all-kinds") ? unique : unique.slice(0, MAX_PAGES))])];
}

/** Every page in light; the shared sample (one page of each type) in the dark and high-contrast themes too. */
function plan(): Array<{ path: string; theme: Theme }> {
  const sample = new Set(A11Y_PAGES.map((p) => p.url));
  const pages = ONLY.length ? ONLY : pickPages();
  return pages.flatMap((path) => RUN_THEMES.filter((t) => t === "light" || ONLY.length || sample.has(path)).map((theme) => ({ path, theme })));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function chromePath(): string {
  if (process.env.CHROME) return process.env.CHROME;
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return existsSync(mac) ? mac : "google-chrome";
}

type Msg = { id?: number; method?: string; params?: Record<string, unknown>; sessionId?: string; result?: Record<string, unknown> & { result?: { value?: unknown }; exceptionDetails?: unknown }; error?: { message: string } };

/** A minimal DevTools client: one headless Chrome, one tab, request and response by id, and a wait for page load. */
async function openChrome() {
  const profile = `/tmp/cdp-profile-a11y-${process.pid}`;
  const chrome = spawn(chromePath(), ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  let ver: { webSocketDebuggerUrl: string } | undefined;
  for (let i = 0; i < 60 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json() as { webSocketDebuggerUrl: string }; } catch { await sleep(250); } }
  if (!ver) { chrome.kill(); throw new Error(`Chrome did not start (${chromePath()}); set CHROME=/path/to/chrome`); }
  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((r) => { ws.onopen = r; });
  let id = 0;
  const pending = new Map<number, (m: Msg) => void>();
  const loads: Array<() => void> = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(String(m.data)) as Msg;
    if (d.id && pending.has(d.id)) { pending.get(d.id)!(d); pending.delete(d.id); }
    else if (d.method === "Page.loadEventFired") loads.splice(0).forEach((f) => f());
  };
  const send = (method: string, params: Record<string, unknown> = {}, sessionId?: string) => new Promise<Msg>((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
  const { result: t } = await send("Target.createTarget", { url: "about:blank" });
  const { result: a } = await send("Target.attachToTarget", { targetId: t!.targetId, flatten: true });
  const sid = a!.sessionId as string;
  const s = (m: string, p?: Record<string, unknown>) => send(m, p, sid);
  await s("Page.enable"); await s("Runtime.enable");
  await s("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  const loaded = (ms: number) => new Promise<void>((r) => { const timer = setTimeout(r, ms); loads.push(() => { clearTimeout(timer); r(); }); });
  const evaluate = async <T>(expression: string): Promise<T> => {
    const r = await s("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.error || r.result?.exceptionDetails) throw new Error(r.error?.message ?? JSON.stringify(r.result?.exceptionDetails).slice(0, 300));
    return r.result?.result?.value as T;
  };
  const close = () => { ws.close(); chrome.kill(); try { rmSync(profile, { recursive: true, force: true }); } catch { /* still locked */ } };
  return { s, loaded, evaluate, close };
}

/**
 * Theme set-up before any page script runs: the device colour scheme, and the saved choice (or none). The
 * analytics question is answered "no" so its fixed bar does not cover the page: covered controls fail axe's target
 * size rule for a reason a reader closes with one click. The bar itself is checked once, on the first page (below).
 */
function themeSetup(theme: Theme, consentAnswered: boolean) {
  const scheme = theme === "light" ? "light" : "dark";
  const storage = theme === "contrast" ? `localStorage.setItem(${JSON.stringify(THEME_KEY)},"contrast")` : `localStorage.removeItem(${JSON.stringify(THEME_KEY)})`;
  const consent = consentAnswered ? `localStorage.setItem(${JSON.stringify(CONSENT_KEY)},"denied")` : `localStorage.removeItem(${JSON.stringify(CONSENT_KEY)})`;
  return { scheme, script: `try{${storage};${consent}}catch(e){}` };
}

async function main() {
  const require = createRequire(import.meta.url);
  let axeSource: string;
  try { axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"); } catch { console.error("a11y: axe-core is missing; run npm ci"); process.exit(2); }
  const outDir = join(process.cwd(), "out");
  let server: Server | null = null;
  let base = BASE_URL;
  if (!base) {
    if (!existsSync(join(outDir, "index.html"))) { console.error("a11y: out/ is missing; run `npm run build` first or pass --url"); process.exit(2); }
    const sv = await serve(outDir); server = sv.server; base = sv.url;
  }
  const runs = plan();
  console.log(`a11y: ${runs.length} page and theme runs at ${base}`);
  const cdp = await openChrome();
  const report: Array<{ url: string; theme: Theme; violations: Violation[]; counts: Record<string, number>; background?: string }> = [];
  let failing = 0;
  let scriptId: string | undefined;
  let current: string | undefined;
  for (const [index, { path, theme }] of runs.entries()) {
    try {
      // The first run leaves the analytics question open, so the bar is audited once; every later run answers it.
      const setup = `${theme} ${index > 0}`;
      if (setup !== current) {
        const { scheme, script } = themeSetup(theme, index > 0);
        if (scriptId) await cdp.s("Page.removeScriptToEvaluateOnNewDocument", { identifier: scriptId });
        scriptId = (await cdp.s("Page.addScriptToEvaluateOnNewDocument", { source: script })).result?.identifier as string;
        await cdp.s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: scheme }] });
        current = setup;
      }
      const load = cdp.loaded(60_000);
      await cdp.s("Page.navigate", { url: `${base}${path}` });
      await load;
      await sleep(1500); // hydration and the client-only parts of the page
      // The guard on the default: with nothing saved on a dark device the page must paint dark, with no data-theme set.
      // A transparent body means the stylesheet had not applied (a dev server recompiling), which is a page error, not a theme fault.
      const paint = await cdp.evaluate<{ attr: string | null; bg: string; dark: boolean; styled: boolean }>(`(() => { const bg = getComputedStyle(document.body).backgroundColor; const m = bg.match(/\\d+(\\.\\d+)?/g)?.map(Number) ?? [255,255,255]; const lum = 0.2126*m[0] + 0.7152*m[1] + 0.0722*m[2]; return { attr: document.documentElement.getAttribute("data-theme"), bg, dark: lum < 100, styled: m.length < 4 || m[3] > 0 }; })()`);
      if (!paint.styled) throw new Error(`the stylesheet had not applied (body background ${paint.bg})`);
      const paintFault = theme === "dark" && (!paint.dark || paint.attr !== null) ? `dark device, nothing saved: painted ${paint.bg} with data-theme=${paint.attr}` : theme === "light" && paint.dark ? `light device, nothing saved: painted ${paint.bg}` : "";
      if (!(await cdp.evaluate<boolean>("typeof window.axe === 'object'"))) await cdp.evaluate<unknown>(`${axeSource};0`);
      const results = await cdp.evaluate<AxeResults>(`axe.run(document, { runOnly: { type: "tag", values: ${JSON.stringify(A11Y_TAGS)} }, resultTypes: ["violations"] }).then((r) => ({ violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, description: v.description, nodes: v.nodes.map((n) => ({ html: n.html.slice(0, 300), target: n.target, failureSummary: n.failureSummary })) })) }))`);
      const counts: Record<string, number> = {};
      const gate: string[] = [];
      for (const v of results.violations) {
        const imp = v.impact ?? "unknown";
        counts[imp] = (counts[imp] ?? 0) + v.nodes.length;
        // The allowance covers named elements, so a rule's other nodes still count.
        const open = A11Y_GATE_IMPACTS.includes(imp) ? v.nodes.filter((n) => !allowed(path, v.id, n.html)) : [];
        if (open.length) { failing += open.length; gate.push(`      ${imp}: ${v.id} (${open.length}) ${v.help} -> ${open[0].target.join(" ")}`); }
      }
      if (paintFault) { failing += 1; counts.paint = 1; gate.push(`      paint: ${paintFault}`); }
      report.push({ url: path, theme, background: paint.bg, violations: results.violations.map((v) => ({ ...v, nodes: v.nodes.slice(0, 40), allowed: v.nodes.filter((n) => allowed(path, v.id, n.html)).length })), counts });
      const summary = Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(", ") || "clean";
      console.log(`  ${theme.padEnd(9)} ${summary.padEnd(36)} ${path}`);
      for (const line of gate) console.log(line);
    } catch (err) {
      console.log(`  ${theme.padEnd(9)} error ${path}: ${err instanceof Error ? err.message : String(err)}`);
      report.push({ url: path, theme, violations: [], counts: { error: 1 } });
      failing += 1;
    }
  }
  cdp.close();
  server?.close();
  const byRule = new Map<string, number>();
  for (const r of report) for (const v of r.violations) { const k = `${v.impact ?? "unknown"} ${v.id} (${r.theme})`; byRule.set(k, (byRule.get(k) ?? 0) + v.nodes.length); }
  writeFileSync(REPORT, JSON.stringify({ ran: new Date().toISOString(), base, runs: report.length, failing, byRule: Object.fromEntries([...byRule.entries()].sort((a, b) => b[1] - a[1])), report }, null, 2));
  console.log(`a11y: ${failing} serious or critical issue${failing === 1 ? "" : "s"} (or page errors) across ${report.length} runs; report in ${REPORT}`);
  if (failing > 0 && !WARN_ONLY) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
