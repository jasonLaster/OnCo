import { describe, expect, it } from "vitest";
import { runInNewContext } from "node:vm";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ThemeScript } from "@/components/ThemeToggle";
import { DEFAULT_THEME, THEME_KEY, readTheme } from "./theme";

/**
 * The default theme follows the device (owner, 10 November 2026: "6. do"). With nothing saved the pre-paint script
 * sets no `data-theme`, so the prefers-color-scheme rules in globals.css decide before first paint; a saved explicit
 * choice still wins. The script is run here as the browser runs it, against a stub <html> and storage.
 */
function prePaint(saved: string | null, storageThrows = false): string | null {
  const html = renderToStaticMarkup(createElement(ThemeScript));
  const js = html.replace(/^<script>/, "").replace(/<\/script>$/, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  const attrs: Record<string, string> = {};
  const localStorage = { getItem: (k: string) => { if (storageThrows) throw new Error("blocked"); return k === THEME_KEY ? saved : null; } };
  const document = { documentElement: { setAttribute: (k: string, v: string) => { attrs[k] = v; } } };
  runInNewContext(js, { localStorage, document });
  return attrs["data-theme"] ?? null;
}

describe("the default theme follows the device", () => {
  it("the default is the device setting", () => {
    expect(DEFAULT_THEME).toBe("system");
    expect(readTheme()).toBe("system"); // no window in the test: the server and first-render value
  });

  it("sets no data-theme before paint when nothing is saved or storage is blocked", () => {
    expect(prePaint(null)).toBeNull();
    expect(prePaint("system")).toBeNull();
    expect(prePaint(null, true)).toBeNull();
  });

  it("a saved explicit choice still wins", () => {
    expect(prePaint("light")).toBe("light");
    expect(prePaint("dark")).toBe("dark");
    expect(prePaint("contrast")).toBe("contrast");
  });

  it("the stylesheet paints dark from the device when no theme is set, and a set theme overrides it", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toMatch(/@media \(prefers-color-scheme: dark\) \{\s*:root \{\s*--background: #121816;/);
    expect(css).toMatch(/:root \{[^}]*color-scheme: light dark;/);
    expect(css).toMatch(/\[data-theme="light"\] \{[^}]*color-scheme: light;/);
    // `dark:` utilities follow the device too unless the reader chose light.
    expect(css).toContain(`&:where(:not([data-theme="light"], [data-theme="light"] *))`);
  });
});
