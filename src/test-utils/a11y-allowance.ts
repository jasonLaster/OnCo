/**
 * What the axe-core accessibility checks sample, which rules they run, and the allowance list. Shared by the
 * ship-gate test (src/app/a11y.test.ts, jsdom, no browser) and the browser audit (scripts/a11y.ts, headless
 * Chrome in three themes, weekly and on pull requests), so both read one list.
 *
 * THE ALLOWANCE LIST CAN ONLY SHRINK. It was set on 10 November 2026 (owner: "6. do") after every other serious or
 * critical violation either check found on the sampled pages was fixed. An entry covers named elements (`nodes`, a
 * pattern matched against each failing element's markup), never a whole rule, so a new violation of the same rule
 * still fails. Add one only where the tool cannot see why the markup is right, say why in `why`, and never to make
 * a new page pass. Removing an entry that no longer fires is always right; A11Y_ALLOWANCE_CAP follows it down.
 */

/** axe tags run by both checks: WCAG 2.0, 2.1 and 2.2 A and AA, plus Deque's best practices. */
export const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] as const;

/** Impacts that fail a run. Moderate and minor findings are reported by the browser audit but do not fail it. */
export const A11Y_GATE_IMPACTS: readonly string[] = ["serious", "critical"];

/**
 * Rules switched off in jsdom only, because they need layout, paint or a live browser that jsdom does not have.
 * The browser audit runs all of them.
 */
export const A11Y_JSDOM_DISABLED: readonly string[] = [
  "color-contrast", // needs computed colours over painted backgrounds
  "color-contrast-enhanced", // AAA, not in the tag set, listed for clarity
  "link-in-text-block", // compares rendered link and text colours
  "target-size", // needs box geometry
  "scrollable-region-focusable", // needs overflow geometry
  "frame-tested", // iframes are not loaded in jsdom
];

/**
 * One rendered page of each type a reader meets. `file` is the page module under src/app, `params` what the static
 * export passes it. Keep to one page per type: the jsdom run is in the ship gates and each page costs seconds.
 */
export type A11yPage = { url: string; file: string; params?: Record<string, string> };
export const A11Y_PAGES: readonly A11yPage[] = [
  { url: "/", file: "./page.tsx" },
  { url: "/cancers/tnbc/", file: "./[kind]/[id]/page.tsx", params: { kind: "cancers", id: "tnbc" } },
  { url: "/drugs/pembrolizumab/", file: "./[kind]/[id]/page.tsx", params: { kind: "drugs", id: "pembrolizumab" } },
  { url: "/biomarkers/ctdna-mrd-positive/", file: "./[kind]/[id]/page.tsx", params: { kind: "biomarkers", id: "ctdna-mrd-positive" } },
  { url: "/trials/checkmate-067/", file: "./[kind]/[id]/page.tsx", params: { kind: "trials", id: "checkmate-067" } },
  { url: "/drugs/", file: "./[kind]/page.tsx", params: { kind: "drugs" } },
  { url: "/countries/fr/", file: "./countries/fr/page.tsx" },
  { url: "/pipeline/engine/small-molecule/", file: "./pipeline/engine/[format]/page.tsx", params: { format: "small-molecule" } },
  { url: "/timeline/", file: "./timeline/page.tsx" },
  { url: "/machines/", file: "./machines/page.tsx" },
  { url: "/map/", file: "./map/page.tsx" },
  { url: "/forest/", file: "./forest/page.tsx" },
  { url: "/survival/", file: "./survival/page.tsx" },
  { url: "/technologies/adc/", file: "./[kind]/[id]/page.tsx", params: { kind: "technologies", id: "adc" } },
  { url: "/body/", file: "./body/page.tsx" },
  { url: "/resistance/", file: "./resistance/page.tsx" },
  { url: "/dependencies/", file: "./dependencies/page.tsx" },
  { url: "/explained/", file: "./explained/page.tsx" },
  { url: "/for-me/", file: "./for-me/page.tsx" },
  { url: "/first-60-days/", file: "./first-60-days/page.tsx" },
  { url: "/calculators/", file: "./calculators/page.tsx" },
];

export type A11yAllowance = { url: string; rule: string; nodes: RegExp; why: string };
export const A11Y_ALLOWED: readonly A11yAllowance[] = [
  {
    url: "*",
    rule: "target-size",
    nodes: /^<button type="button" aria-haspopup="menu" aria-expanded="(true|false)" aria-label="Open [^"]+ menu"/,
    why: "The header's menu chevrons are 20 x 40 px beside their section link. WCAG 2.5.8 exempts a target when an equivalent control meets the size: the section link opens the same menu on hover and focus, and the menu drawer lists every item. axe cannot see the equivalence. Widening them costs 48 px on a header tuned to fit 1263 px (docs/proposals/accessibility-2026-11.md, Moderate).",
  },
];
/** How many entries the list may hold. It only ever goes down. */
export const A11Y_ALLOWANCE_CAP = 1;

export const allowed = (url: string, rule: string, html: string) =>
  A11Y_ALLOWED.some((a) => a.rule === rule && (a.url === "*" || a.url === url) && a.nodes.test(html));
