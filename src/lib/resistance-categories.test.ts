import { describe, expect, it } from "vitest";
import { CATEGORIES } from "./resistance-categories";

/**
 * Category names and counts are printed in the category's colour on /resistance/, the resistance gaps page and
 * the dossiers. The fill colours are tuned for lines and dots and several are under 4.5:1 as text, so text uses
 * `ink`, one shade per theme. This holds each shade to WCAG AA (4.5:1) on every card and page background it sits on.
 * The backgrounds are the tokens in src/app/globals.css.
 */
const LIGHT_BACKGROUNDS = ["#fcfbf8", "#f5f4ee", "#eeece4"]; // card, page, surface
const DARK_BACKGROUNDS = ["#1a201e", "#121816", "#212927", "#000000", "#1a1a1a"]; // dark card, page, surface; contrast page, surface

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

describe("resistance category text keeps AA contrast in every theme", () => {
  it.each(CATEGORIES.map((c) => [c.id, c] as const))("%s", (_id, c) => {
    for (const bg of LIGHT_BACKGROUNDS) expect(contrast(c.ink.light, bg), `${c.id} light on ${bg}`).toBeGreaterThanOrEqual(4.5);
    for (const bg of DARK_BACKGROUNDS) expect(contrast(c.ink.dark, bg), `${c.id} dark on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
});
