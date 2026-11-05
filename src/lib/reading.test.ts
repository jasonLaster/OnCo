import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DEFAULT_READING, parseReading, READING_EVENT, READING_KEY, READING_SCRIPT, readingAttrs, readReading, reducedMotion, writeReading, type Reading } from "./reading";
import { LayerScript, LayerToggle } from "@/components/LayerToggle";

/**
 * The Aa menu's reading preferences (owner approval, 4 November 2026). Two promises are tested here: a choice
 * persists and is applied, and a reader who changes nothing gets exactly the page that existed before the controls.
 */

/** A browser stand-in: localStorage, <html> attributes and dataset, and the window event the controls listen to. */
function fakeBrowser(stored: Record<string, string> = {}) {
  const store = new Map(Object.entries(stored));
  const attrs = new Map<string, string>();
  const events: Reading[] = [];
  const toAttr = (k: string) => "data-" + k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
  const dataset = new Proxy({} as Record<string, string>, {
    set: (_t, k: string, v: string) => { attrs.set(toAttr(k), String(v)); return true; },
    get: (_t, k: string) => attrs.get(toAttr(k)),
  });
  const localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
  };
  const documentElement = {
    dataset,
    setAttribute: (k: string, v: string) => { attrs.set(k, v); },
    removeAttribute: (k: string) => { attrs.delete(k); },
    getAttribute: (k: string) => attrs.get(k) ?? null,
  };
  const window = { localStorage, dispatchEvent: (e: CustomEvent<Reading>) => { if (e.type === READING_EVENT) events.push(e.detail); return true; } };
  return { store, attrs, events, window, document: { documentElement }, localStorage };
}

/** Run the pre-paint script against a fake browser, as the inline <script> does at the top of <body>. */
function runScript(b: ReturnType<typeof fakeBrowser>) {
  new Function("localStorage", "document", READING_SCRIPT)(b.localStorage, b.document);
}

afterEach(() => { vi.unstubAllGlobals(); });

describe("reading preferences: parsing", () => {
  it("falls back to the defaults for nothing stored, malformed JSON or unknown values", () => {
    expect(parseReading(null)).toEqual(DEFAULT_READING);
    expect(parseReading("not json")).toEqual(DEFAULT_READING);
    expect(parseReading('{"text":"huge","spacing":7,"motion":"fast"}')).toEqual(DEFAULT_READING);
    expect(parseReading('{"text":"largest","spacing":"relaxed","motion":"full"}')).toEqual({ text: "largest", spacing: "relaxed", motion: "full" });
  });

  it("writes no attribute for a default choice", () => {
    expect(readingAttrs(DEFAULT_READING)).toEqual({ "data-text": null, "data-spacing": null, "data-reduce-motion": null });
  });

  it("lets the switch win over the device setting either way, and follows the device otherwise", () => {
    expect(reducedMotion("device", true)).toBe(true);
    expect(reducedMotion("device", false)).toBe(false);
    expect(reducedMotion("reduce", false)).toBe(true);
    expect(reducedMotion("full", true)).toBe(false);
  });
});

describe("reading preferences: persistence", () => {
  it("persists a choice, applies it to <html> and announces it", () => {
    const b = fakeBrowser();
    vi.stubGlobal("window", b.window);
    vi.stubGlobal("document", b.document);
    writeReading({ text: "larger", spacing: "relaxed", motion: "reduce" });
    expect(JSON.parse(b.store.get(READING_KEY)!)).toEqual({ text: "larger", spacing: "relaxed", motion: "reduce" });
    expect(Object.fromEntries(b.attrs)).toEqual({ "data-text": "larger", "data-spacing": "relaxed", "data-reduce-motion": "on" });
    expect(b.events).toHaveLength(1);
    expect(readReading()).toEqual({ text: "larger", spacing: "relaxed", motion: "reduce" });
  });

  it("returning every control to its default clears storage and every attribute", () => {
    const b = fakeBrowser({ [READING_KEY]: '{"text":"largest","spacing":"relaxed","motion":"full"}' });
    vi.stubGlobal("window", b.window);
    vi.stubGlobal("document", b.document);
    writeReading({ text: "largest", spacing: "relaxed", motion: "full" });
    expect(b.attrs.get("data-reduce-motion")).toBe("off");
    writeReading(DEFAULT_READING);
    expect(b.store.has(READING_KEY)).toBe(false);
    expect(b.attrs.size).toBe(0);
  });

  it("the pre-paint script applies a saved choice exactly as writeReading does", () => {
    const cases: Reading[] = [
      { text: "larger", spacing: "default", motion: "device" },
      { text: "largest", spacing: "relaxed", motion: "reduce" },
      { text: "default", spacing: "relaxed", motion: "full" },
    ];
    for (const r of cases) {
      const b = fakeBrowser({ [READING_KEY]: JSON.stringify(r) });
      runScript(b);
      const want = Object.fromEntries(Object.entries(readingAttrs(r)).filter(([, v]) => v !== null));
      expect(Object.fromEntries(b.attrs), JSON.stringify(r)).toEqual(want);
    }
  });
});

describe("reading preferences: a reader who changes nothing", () => {
  it("the pre-paint script sets no attribute with nothing, or rubbish, in storage", () => {
    const cases: Record<string, string>[] = [{}, { [READING_KEY]: "{" }, { [READING_KEY]: '{"text":"<b>","motion":1}' }];
    for (const stored of cases) {
      const b = fakeBrowser(stored);
      runScript(b);
      expect(b.attrs.size).toBe(0);
    }
  });

  it("the Aa button renders byte for byte as it did before the controls (closed, defaults)", () => {
    // Captured from the dev server's HTML for / at the commit before this change (12bb33ebf).
    // The one difference since is the accessible name, renamed once the menu held text size, spacing and motion as
    // well as reading level and language.
    const before = '<div class="relative flex items-center "><button type="button" data-onco-toggle="layer" aria-haspopup="dialog" aria-expanded="false" aria-label="Aa EN · English · Reading, language and display settings" class="ctl px-2.5 " title="Technical · English"><span class="ctl-text"><span aria-hidden="true" class="font-semibold tracking-tight">Aa</span> <span class="ctl-label text-muted max-[389px]:hidden xl:hidden 2xl:inline">EN</span></span></button></div>';
    expect(renderToStaticMarkup(createElement(LayerToggle))).toBe(before);
  });

  it("the pre-paint script keeps the language script unchanged and only appends the reading part", () => {
    const before = 'try{var l=JSON.parse(localStorage.getItem("onco.layer")||"{}");var g=l.lang||"en";var h=document.documentElement;h.lang=g;h.dir=g==="ar"?"rtl":"ltr";h.dataset.lang=g;h.dataset.level=l.level||"technical"}catch(e){}';
    expect(renderToStaticMarkup(createElement(LayerScript))).toBe(`<script>${before}${READING_SCRIPT}</script>`);
    // Kept small: it is in the HTML of every page.
    expect(READING_SCRIPT.length).toBeLessThan(300);
  });
});
