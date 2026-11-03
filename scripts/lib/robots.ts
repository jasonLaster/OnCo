/**
 * robots.txt, read once per host, so a monitor that reads a web page (not a documented API) stops by itself when the
 * site's rules forbid the path. Implements the parts of RFC 9309 that matter here: the group for our product token
 * ("OnCo") if there is one, otherwise the "*" group; Allow and Disallow with `*` and `$`; the longest matching rule
 * wins and Allow wins a tie.
 *
 * A host that serves no robots.txt (404) allows everything. One that answers with something other than a robots file
 * (a 403, or an HTML bot challenge) is treated as "cannot read the rules", and the caller skips the source and says so.
 */
export type RobotsVerdict = { allowed: boolean; reason: string };
type Rule = { allow: boolean; pattern: string };

export function parseRobots(txt: string, token = "onco"): Rule[] {
  const groups: Array<{ agents: string[]; rules: Rule[] }> = [];
  let cur: { agents: string[]; rules: Rule[] } | null = null;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase(), val = m[2].trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if (key === "allow" || key === "disallow") {
      lastWasAgent = false;
      if (cur && val) cur.rules.push({ allow: key === "allow", pattern: val });
    } else lastWasAgent = false;
  }
  const mine = groups.filter((g) => g.agents.some((a) => a !== "*" && token.startsWith(a)));
  const chosen = mine.length ? mine : groups.filter((g) => g.agents.includes("*"));
  return chosen.flatMap((g) => g.rules);
}

function ruleMatches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith("$");
  const body = (anchored ? pattern.slice(0, -1) : pattern).split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`).test(path);
}

export function robotsAllows(rules: Rule[], pathAndQuery: string): boolean {
  let best: Rule | null = null;
  for (const r of rules) {
    if (!ruleMatches(r.pattern, pathAndQuery)) continue;
    if (!best || r.pattern.length > best.pattern.length || (r.pattern.length === best.pattern.length && r.allow)) best = r;
  }
  return !best || best.allow;
}

const cache = new Map<string, Rule[] | "unreadable">();

export async function checkRobots(url: string, ua: string): Promise<RobotsVerdict> {
  const u = new URL(url);
  let rules = cache.get(u.origin);
  if (!rules) {
    try {
      const r = await fetch(`${u.origin}/robots.txt`, { headers: { "User-Agent": ua }, redirect: "follow" });
      const text = await r.text();
      if (r.status === 404 || r.status === 410) rules = [];
      else if (!r.ok || /<html|<!doctype/i.test(text.slice(0, 500))) rules = "unreadable";
      else rules = parseRobots(text);
    } catch { rules = "unreadable"; }
    cache.set(u.origin, rules);
  }
  if (rules === "unreadable") return { allowed: false, reason: `${u.origin}/robots.txt could not be read (an error or a bot challenge instead of a robots file)` };
  return robotsAllows(rules, u.pathname + u.search) ? { allowed: true, reason: "allowed by robots.txt" } : { allowed: false, reason: `${u.origin}/robots.txt disallows ${u.pathname}${u.search}` };
}
