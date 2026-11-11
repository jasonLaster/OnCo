import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import type { Metadata } from "next";
import RootLayout, { metadata as siteMetadata } from "./layout";
import { A11Y_ALLOWANCE_CAP, A11Y_ALLOWED, A11Y_GATE_IMPACTS, A11Y_JSDOM_DISABLED, A11Y_PAGES, A11Y_TAGS, allowed } from "@/test-utils/a11y-allowance";

/**
 * Accessibility in the ship gates (owner, 10 November 2026: "6. do"). A representative page of every type is rendered
 * the way the static export renders it (react-dom/server inside the root layout, against the real graph), parsed
 * into jsdom and checked with axe-core: names and labels, ARIA roles and attributes, landmarks, duplicate ids, list
 * and table structure, headings, language. Any serious or critical violation fails the run unless it is on the
 * allowance list in src/test-utils/a11y-allowance.ts, which can only shrink.
 *
 * jsdom has no layout, so rules that need rendered geometry or colour (contrast, target size, scrollable regions)
 * are off here; scripts/a11y.ts checks those in headless Chrome, in the light, dark and high-contrast themes, from
 * the weekly accessibility workflow. Everything here is deterministic: same markup in, same result out.
 */
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

type Params = Record<string, string>;
type PageModule = {
  default: (props: { params: Promise<Params> }) => ReactElement | Promise<ReactElement>;
  metadata?: Metadata;
  generateMetadata?: (props: { params: Promise<Params> }) => Metadata | Promise<Metadata>;
};
const modules = import.meta.glob("./**/page.tsx") as Record<string, () => Promise<PageModule>>;

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) =>
  renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));

/**
 * Next writes <title> from the metadata API, which react-dom/server does not run, so the page's own title (or the
 * site default) is put back into <head> here. The browser audit reads the real exported title.
 */
async function titleOf(mod: PageModule, params: Params): Promise<string> {
  const m = mod.generateMetadata ? await mod.generateMetadata({ params: Promise.resolve(params) }) : mod.metadata;
  const t = m?.title ?? siteMetadata.title;
  if (typeof t === "string") return t;
  if (t && typeof t === "object") return "absolute" in t && t.absolute ? t.absolute : "default" in t && t.default ? t.default : "";
  return "";
}
const withTitle = (html: string, title: string) => html.replace(/<head>/, `<head><title>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</title>`);

type Found = { rule: string; impact: string; nodes: Array<{ target: string; html: string }> };

/** Run axe over one document in its own jsdom window (axe keeps global state, so each page gets a fresh copy). */
async function audit(html: string): Promise<Found[]> {
  const dom = new JSDOM(`<!DOCTYPE html>${html}`, { runScripts: "outside-only", pretendToBeVisual: true });
  const win = dom.window as unknown as Window & { eval: (src: string) => void; axe: typeof axe };
  win.eval(axe.source);
  const rules = Object.fromEntries(A11Y_JSDOM_DISABLED.map((id) => [id, { enabled: false }]));
  const res = await win.axe.run(win.document, { runOnly: { type: "tag", values: [...A11Y_TAGS] }, rules, resultTypes: ["violations"] });
  dom.window.close();
  return res.violations.map((v) => ({ rule: v.id, impact: v.impact ?? "unknown", nodes: v.nodes.map((n) => ({ target: n.target.join(" "), html: n.html })) }));
}

describe("axe-core finds no serious or critical violation on a page of each type", () => {
  it.each(A11Y_PAGES.map((p) => [p.url, p] as const))("%s", async (_url, page) => {
    const load = modules[page.file];
    expect(load, `${page.file} is not a page module`).toBeTruthy();
    const mod = await load();
    const params = page.params ?? {};
    const title = await titleOf(mod, params);
    expect(title, `${page.url} has no title`).not.toBe("");
    const html = withTitle(render(await mod.default({ params: Promise.resolve(params) })), title);
    expect(html).toMatch(/<main[\s>]/);
    expect(html, "the title went into <head>").toMatch(/<head[^>]*><title>/);
    const found = await audit(html);
    const failing = found
      .filter((f) => A11Y_GATE_IMPACTS.includes(f.impact))
      .map((f) => ({ ...f, nodes: f.nodes.filter((n) => !allowed(page.url, f.rule, n.html)) }))
      .filter((f) => f.nodes.length > 0);
    const say = (f: Found) => `${f.impact} ${f.rule} x${f.nodes.length} at ${f.nodes[0]?.target} ${f.nodes[0]?.html.slice(0, 160)}`;
    if (process.env.A11Y_VERBOSE) for (const f of found) console.log(`a11y ${page.url} ${say(f)}`);
    expect(failing, `${page.url}: ${failing.map(say).join("\n")}`).toEqual([]);
  }, SLOW_MS);

  it("the check catches what it guards against", async () => {
    const found = await audit('<html lang="en"><body><main><h1>T</h1><img src="x.png"><button></button><div id="a"></div><div id="a"></div><a href="/x"></a><input type="text"></main></body></html>');
    const rules = new Set(found.map((f) => f.rule));
    for (const r of ["image-alt", "button-name", "link-name", "label"]) expect(rules, r).toContain(r);
    expect((await audit('<html lang="en"><head><title>Fine</title></head><body><main><h1>Fine</h1><p>Plain text.</p></main></body></html>')).filter((f) => A11Y_GATE_IMPACTS.includes(f.impact))).toEqual([]);
  });

  it("every allowance names a sampled page, a real axe rule, the nodes it covers and why", () => {
    const urls = new Set(A11Y_PAGES.map((p) => p.url));
    const known = new Set(axe.getRules().map((r) => r.ruleId));
    for (const a of A11Y_ALLOWED) {
      expect(a.url === "*" || urls.has(a.url), `${a.url} is not a sampled page`).toBe(true);
      expect(known.has(a.rule), `${a.rule} is not an axe rule`).toBe(true);
      // An allowance covers named elements, never a whole rule: a new violation of the same rule still fails.
      expect(a.nodes.source.length, `${a.rule} on ${a.url} must say which elements it covers`).toBeGreaterThan(8);
      expect(a.why.length, `${a.rule} on ${a.url} needs a reason`).toBeGreaterThan(40);
    }
    // The list can only shrink: raise this number only with the owner's say-so, and lower it whenever an entry goes.
    expect(A11Y_ALLOWED.length).toBeLessThanOrEqual(A11Y_ALLOWANCE_CAP);
  });
});
