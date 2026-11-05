# Accessibility, November 2026: what was measured, what was fixed, what is proposed

Written 4 November 2026 after the owner asked: "do we need a color blind mode? what accessibility features do we
miss and could do?"

## How it was measured

- **axe-core 4** (WCAG 2.0, 2.1 and 2.2 A and AA plus best practice) in headless Chrome over the Chrome DevTools
  Protocol, against a local dev server, in the light, dark and high-contrast themes. Pages: home, `/cancers/tnbc/`,
  `/drugs/pembrolizumab/`, `/biomarkers/ctdna-mrd-positive/`, `/trials/trak-er/`, `/trials/checkmate-067/` (survival
  chart), `/technologies/adc/`, `/countries/fr/`, `/pipeline/engine/small-molecule/`, `/drugs/` with a column filter
  open, the search palette open, and a second pass over 22 tool pages (`/body/`, `/resistance/`, `/forest/`,
  `/timeline/`, `/dependencies/`, `/explained/`, `/calculators/`, `/for-me/`, `/first-60-days/` and others).
- **Custom checks** on the same pages: heading order, landmarks, skip link, `lang`, images without `alt`, unnamed
  buttons, positive `tabindex`, focus ring on the first twelve Tab stops, and page width at 320, 360 to 1180 px.
- **Colour**: every token and Tailwind colour converted from OKLCH to sRGB, alpha composited on the card colour,
  WCAG contrast computed, then each set of colours that carries a meaning simulated for protanopia, deuteranopia and
  tritanopia (Machado, Oliveira and Fernandes 2009, severity 1.0) and compared pairwise with CIEDE2000. Below 5 the
  two colours are effectively the same; 5 to 10 is weak. Chrome's own vision-deficiency emulation was used for the
  screenshots.

`scripts/a11y.ts` does the axe part of this against a built `out/`; it was not run as-is because a ship was in
progress and a full build was not allowed beside it.

## Do we need a colour-blind mode?

**No. The default palette plus non-colour cues is the better fix, and WCAG 1.4.1 asks for exactly that.**

| Colour set | Normal | Protanopia | Deuteranopia | Tritanopia | Carries meaning alone? |
|---|---|---|---|---|---|
| Status chips (approved, phase 3, recruiting, phase 1, negative, other) | 8.0 | 2.3 | **0.7** (phase 3 ~ phase 1) | 2.7 | No: every chip prints its status |
| Kind pills (cancer, drug, trial...) | 6.1 | 1.2 | 2.8 | 1.7 | No: every pill prints its name |
| Survival chart arms | 15.1 | 4.8 | **0.5** (blue ~ violet) | 13.3 | **Yes, before this round** |
| Engine grid cells | 6.8 | **5.0** (approved ~ stopped) | 6.8 | 6.1 | **Yes, before this round** (title only) |
| Incidence and mortality trend lines | 45 | 54 | 60 | 64 | No: mortality is dashed |
| Country map ramp | 13.6 | 9.9 | 9.5 | 14.1 | Luminance rises monotonically in all four, so order survives |

Hue confusion is real (phase 3 and phase 1 chips are the same colour to a deuteranope), but almost everywhere a word
already carries the meaning. Where colour alone carried it, the cure is a pattern or a shape on the default view,
which helps every reader, prints in greyscale and needs no toggle that most colour-blind readers would never find. A
mode would also double the visual QA of every chart.

## Fixed in this round (one product commit)

1. **Survival charts** (`KMChart`, every trial with landmark curves): each arm now has its own line pattern (solid,
   dashed, dotted, dash-dot) and point shape (circle, square, triangle, diamond), in the legend too. Arm labels take a
   lighter tone in dark themes: they were 2.6 to 3.2:1 on the card, now 6.0 to 8.9:1. The fourth series moved from
   `#0d9488` (3.6:1) to `#0f766e` (5.3:1).
2. **Engine grid**: "Tried and stopped" squares are hatched as well as dark grey; legend counts lost `opacity-80`
   (3.6 to 4.2:1, now full chip contrast); approved cells' numbers use the accent foreground, so the high-contrast
   theme no longer prints white on yellow (1.43:1). The row filter button grew from 5 x 10 px to 24 x 24 px.
3. **White on the pink accent in dark mode**: 27 controls in 23 files used `bg-accent text-white`. In dark mode the
   accent is a light pink and the text was 1.81:1 (the "See all" buttons on every cancer page, Find trials, body map,
   prep tools, timeline scrubber); in the high-contrast theme it was white on yellow. They now use the button tokens
   (`bg-accent-solid text-accent-fg`): 4.62:1 light, 4.60:1 dark, 14.7:1 high contrast. In the light theme the pink
   moves from `#c2185b` to the primary-button `#d6336c`.
4. **Reflow at 320 px** (WCAG 1.4.10, which is also a 1280 px window at 400% zoom): the header was 389 px wide, so the
   account and menu buttons sat off screen. Below 390 px the wordmark and language code fold away; from 640 px to
   `md` the gap narrows (it was 10 px over at 640). Measured with no sideways scroll at every width from 320 to 1180.
5. **Interactive drawings hidden from screen readers**: the body map, resistance escape-route diagram, forest plot,
   timeline chart and dependency map were `role="img"` with buttons and links inside. `img` makes its children
   presentational, so a screen reader never reached the organs or nodes. They are now labelled groups.
6. **Resistance matrix table roles**: header and totals cells had no `row`, and the row header was a link with a
   `rowheader` role. Rows are now `display: contents` rows; the render is pixel-identical.
7. **Duplicate landmark names**: the Connected section's "trials" and "key papers" regions had the same name as the
   page's own Trials and Key papers sections. They are now "Connected trials" and so on.
8. **Spacing for 24 px targets** (WCAG 2.5.8): footer link rows 6 to 8 px apart and the sidebar Connected list 2 to
   4 px, so neighbouring links are 24 px centre to centre.

After the round, axe reports nothing on the ten core pages in any theme except the header menu chevrons (see below)
and a handful of single source links.

Before and after screenshots, same page and viewport, are attached to the pull request, not committed.

## Already in place (worth saying so)

Skip link; one `main`, banner and contentinfo landmark per page; visible 2 px focus ring on every Tab stop sampled;
no heading-level skips on any page tested; `alt` on every image tested, including hero portraits; `lang` and `dir`
on `<html>` from the language layer and `lang` on each translated TL;DR; light, dark and a high-contrast theme;
`forced-colors` styles; `prefers-reduced-motion` plus the motion budget (`data-motion`); print styles; reading levels
through the layer toggle; the search palette is a labelled combobox with a focus trap; column filters are labelled
dialogs.

## Remaining gaps, by severity

**Serious**

- `/explained/`: 799 `<summary>` elements contain a link (nested interactive). A screen reader announces the summary
  and may not reach the link. Fix: move the trial-name link out of `<summary>` into the opened body, or make the
  summary text plain and add a "Read the record" link. The page has a markup budget, so it needs measuring. Small.
- `/resistance/`: category colours used as text (amber `#d97706` 3.1:1 and others, 61 nodes). Needs a darker text
  shade per category beside the existing fill colour. Small.
- `/timeline/`: year counts at `opacity-60` (4.3:1, 98 nodes) and muted links inside text distinguished by colour
  only (2.75:1 against body text, 52 nodes). Fix: drop the opacity, underline the links. Small, product-visible.
- Engine grid "In development" amber and "unclear" grey squares are 1.7:1 and 1.4:1 against the card (WCAG 1.4.11
  asks 3:1 for graphics needed to understand). The table below the grid is a full text alternative, so this is not a
  failure, but a 1 px darker outline on tried squares would lift them. Small.

**Moderate**

- Header menu chevrons are 20 x 40 px and overlap their link by 4 px. They fall under 2.5.8's "equivalent control"
  exception (the link opens the same menu on hover and focus, and the drawer lists every item), but widening them
  costs 48 px on a header that is tuned to fit 1263 px. Leave, or redesign the header row.
- Map choropleth: countries are links with `tabindex="-1"`; keyboard readers use the ranked list beside it, which is
  the right alternative, but the map does not say so. Add "The list beside the map has every country" to its label.
- The default theme is light even when the device asks for dark (a reader must pick "auto"). People on chemotherapy
  often report light sensitivity. Proposal: make "auto" the default. One line; owner's call.

**Minor**

- Source links in country pages and list links in sidebars are 14 to 18 px tall in tight lists (2.5.8 spacing).
- Pictogram dot grids keep the light-theme series colours in dark mode (they are labelled, so no meaning is lost).
- No `text-spacing` (1.4.12) test has been run; chips use `white-space: nowrap` with ellipsis, so extra letter
  spacing truncates rather than overlaps, and the full label is in a tooltip.
- No screen-reader session has been recorded. Suggested script: VoiceOver on macOS Safari and iOS, NVDA on Windows
  Firefox; tasks: find a cancer, open the treatment tab, filter the drugs table by phase, open the search palette and
  pick a result, read a survival chart (its label carries every number), use the body map.

## Proposals for the owner (bigger than a fix)

| Option | Evidence for it | Effort | Recommendation |
|---|---|---|---|
| Colour-blind mode | The data above: once the two colour-only charts carry patterns, no meaning on the tested pages depends on hue | 2 to 3 days plus permanent QA | **No** |
| High-contrast mode | Exists (`data-theme="contrast"`); this round removed its two failures | - | Keep; add it to the axe run so it stays clean |
| Text-size control (A- / A / A+ on `<html>` font size) | Every size is in rem, so browser zoom already works and reflows; a control helps readers who do not know about zoom, common among older patients | 1 day: a fourth header control or a row in the layer menu, and `font-size` on `<html>` | **Yes, as a row in the existing Aa menu** rather than another header button |
| Dyslexia-friendly option (Atkinson Hyperlegible or OpenDyslexic, wider spacing) | A small alternating-treatment study found no gain in reading rate or accuracy with OpenDyslexic, and no participant preferred it (Wery and Diliberto, Annals of Dyslexia 2017, doi:10.1007/s11881-016-0127-1). Spacing options were not tested here | 1 day; a webfont adds 40 to 80 KB only when chosen | Maybe: offer "easier reading" spacing (line height 1.8, 0.05 em letter spacing, max 65 ch) before a font |
| Reduce-motion switch in the UI | The OS setting and the motion budget already stop animation; a site switch helps people who do not know the OS setting | Half a day: set `data-motion="reduced"` from the Aa menu | Yes, small |
| Default theme follows the device | See above | One line in `ThemeToggle` | Yes, owner's call |
| Add axe to CI on a built `out/` | `scripts/a11y.ts` exists but needs Playwright; the CDP runner used here needs only Chrome | 1 day: port the runner into `scripts/a11y.ts`, run nightly on 20 pages in three themes | Yes |
