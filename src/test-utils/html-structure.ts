// Shared scanners only: importing a .test.ts file registers and reruns its whole suite.
/** Snippets around each `<a` that opens while another `<a` is still open. SVG subtrees are skipped (SVG <a> is a different element). */
export function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0, svg = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 200), m.index + 120));
    open++;
  }
  return found;
}

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr", "param", "keygen"]);
/** Start tags that close an open <p> ("closes a p element" in the HTML spec), so a p wrapping one ends early. */
const P_CLOSERS = new Set(["address", "article", "aside", "blockquote", "center", "details", "dialog", "dir", "div", "dl", "dd", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "listing", "main", "menu", "nav", "ol", "p", "pre", "search", "section", "table", "ul", "xmp"]);
/** HTML start tags that pop the parser out of an <svg> unless inside foreignObject, desc or title. */
const SVG_BREAKOUT = new Set(["b", "big", "blockquote", "body", "br", "center", "code", "dd", "div", "dl", "dt", "em", "embed", "h1", "h2", "h3", "h4", "h5", "h6", "head", "hr", "i", "img", "li", "listing", "menu", "meta", "nobr", "ol", "p", "pre", "ruby", "s", "small", "span", "strong", "strike", "sub", "sup", "table", "tt", "u", "ul", "var"]);
/** The spec's "special" category: a dd/dt/li start tag stops looking for an open dd/dt/li at one of these (bar address, div, p). */
const SPECIAL = new Set("address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input keygen li link listing main marquee menu meta nav noembed noframes noscript object ol p param plaintext pre script search section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp svg math foreignobject desc".split(" "));
const TABLE_KIDS = new Set(["caption", "colgroup", "thead", "tbody", "tfoot", "tr", "script", "template", "style"]);
const SECTION_KIDS = new Set(["tr", "script", "template"]);
const ROW_KIDS = new Set(["td", "th", "script", "template"]);
const TABLE_TEXT_PARENTS = new Set(["table", "tbody", "thead", "tfoot", "tr", "colgroup"]);

export type StructureIssue = { rule: string; at: string };

/**
 * Places where a browser's HTML parser builds a different tree from the one React serialised, so hydration fails
 * (React error 418) although the text looks fine. No HTML parser ships in node_modules, so this walks the tag stream
 * with the tree-construction rules that rearrange or drop elements: an <a> or <button> inside another, a block inside
 * <p> (the p closes early), nested forms (the inner one is ignored), li/dd/dt closing an open li/dd/dt, table parts
 * outside their table (foster-parented, or dropped), non-whitespace text directly in a table, elements inside
 * <option>, HTML tags that break out of an <svg>, and an empty <title> inside an <svg>: React's server renderer
 * applies the document-title rule to every <title>, so one with several JSX children (`{a} ({b})`) is emitted empty
 * while the client renders the text (first seen on /targets/kras/, HotspotPlot). React output is balanced, so the
 * stack is exact; nothing here handles misnested end tags.
 */
export function structureIssues(html: string): StructureIssue[] {
  const issues: StructureIssue[] = [];
  const stack: string[] = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>/g;
  const ctx = (i: number) => html.slice(Math.max(0, i - 200), i + 100).replace(/\s+/g, " ");
  const flag = (rule: string, i: number) => issues.push({ rule, at: ctx(i) });
  const top = () => stack[stack.length - 1];
  /** Does a dd/dt/li start tag reach an open `tags` element before a special element (address, div and p excepted)? */
  const closesOpen = (tags: string[]) => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const t = stack[i];
      if (tags.includes(t)) return t;
      if (t !== "address" && t !== "div" && t !== "p" && SPECIAL.has(t)) return null;
    }
    return null;
  };
  let lastEnd = 0;
  for (const m of html.matchAll(re)) {
    const text = html.slice(lastEnd, m.index);
    lastEnd = m.index + m[0].length;
    if (text.trim() && TABLE_TEXT_PARENTS.has(top())) flag(`text-foster-parented-out-of-${top()}`, m.index);
    if (m[0].startsWith("<!")) continue;
    const [, close, rawTag, , selfClose] = m;
    const tag = rawTag.toLowerCase();
    if (close) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) { flag(`stray-close-${tag}`, m.index); continue; }
      if (idx !== stack.length - 1) flag(`unbalanced-${tag}-over-${stack.slice(idx + 1).join(">")}`, m.index);
      if (tag === "title" && stack.includes("svg") && !text.trim()) flag("empty-svg-title", m.index);
      stack.length = idx;
      continue;
    }
    const svgAt = stack.lastIndexOf("svg");
    if (svgAt >= 0) {
      if (SVG_BREAKOUT.has(tag) && !stack.slice(svgAt).some((t) => t === "foreignobject" || t === "desc" || t === "title")) flag(`${tag}-breaks-out-of-svg`, m.index);
    } else {
      const p = top();
      if (tag === "a" && stack.includes("a")) flag("a-in-a", m.index);
      if (tag === "button" && stack.includes("button")) flag("button-in-button", m.index);
      if (P_CLOSERS.has(tag) && stack.includes("p")) flag(`${tag}-in-p`, m.index);
      if (tag === "form" && stack.includes("form")) flag("form-in-form", m.index);
      if (tag === "dd" || tag === "dt") { const o = closesOpen(["dd", "dt"]); if (o) flag(`${tag}-closes-open-${o}`, m.index); }
      if (tag === "li") { if (closesOpen(["li"])) flag("li-closes-open-li", m.index); if (p !== "ul" && p !== "ol" && p !== "menu") flag(`li-in-${p}`, m.index); }
      if (tag === "tr" && p !== "tbody" && p !== "thead" && p !== "tfoot") flag(`tr-in-${p}`, m.index);
      if ((tag === "td" || tag === "th") && p !== "tr") flag(`${tag}-in-${p}`, m.index);
      if ((tag === "tbody" || tag === "thead" || tag === "tfoot" || tag === "caption" || tag === "colgroup") && p !== "table") flag(`${tag}-in-${p}`, m.index);
      if (p === "table" && !TABLE_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-table`, m.index);
      if ((p === "tbody" || p === "thead" || p === "tfoot") && !SECTION_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-${p}`, m.index);
      if (p === "tr" && !ROW_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-tr`, m.index);
      if (p === "option") flag(`${tag}-in-option`, m.index);
      if (p === "select" && tag !== "option" && tag !== "optgroup" && tag !== "hr" && tag !== "script" && tag !== "template") flag(`${tag}-in-select`, m.index);
      if (/^h[1-6]$/.test(tag) && /^h[1-6]$/.test(p)) flag(`${tag}-in-${p}`, m.index);
    }
    if (VOID.has(tag) || (selfClose && (svgAt >= 0 || tag === "svg"))) continue;
    stack.push(tag);
  }
  if (stack.length) issues.push({ rule: `unclosed-${stack.join(">")}`, at: "" });
  return issues;
}

