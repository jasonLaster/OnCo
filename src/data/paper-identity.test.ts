import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import type { Paper } from "@/lib/schema";
import snapshot from "./paper-ids.json";
import { tokens } from "../../scripts/check-link-dois";
import { normaliseDoi } from "../../scripts/lib/duplicate-records";

/**
 * A paper's identifiers name the paper the record describes. AGENTS.md calls a remembered identifier the commonest
 * real error in the corpus, and the 3 November 2026 accuracy sample measured it: of 2,504 PubMed ids on paper records,
 * four pointed at unrelated papers (a photocatalysis study, a hip-anaesthesia trial, a nanopore paper and a dendritic-cell
 * review), and three of the four were in one file, src/data/key-papers/prevention-detection-biology.ts, whose figures
 * then turned out to disagree with their abstracts in 28 of 102 records.
 *
 * src/data/paper-ids.json is PubMed's own record for every PubMed id on a paper (and Crossref's for DOIs PubMed cannot
 * vouch for), written by `npx tsx scripts/paper-ids.ts`. This test reads it offline. When you add a paper, run that
 * script: a PubMed id the snapshot has never seen is an identifier nobody has resolved.
 */
type Entry = { title: string; year?: number; journal?: string; doi?: string };
const ids = (snapshot as { ids: Record<string, Entry> }).ids;
const dois = (snapshot as { dois: Record<string, Entry> }).dois;
const papers = graph().kind("paper") as Paper[];
const indexed = (p: Paper): Entry | undefined => (p.pmid ? ids[p.pmid] : undefined) ?? (p.doi ? dois[normaliseDoi(p.doi)] : undefined);

/** A distinctive word shared between the indexed title and anything the record says about itself. */
function shares(title: string, p: Paper): boolean {
  const rec = tokens([p.name, ...p.aka, p.tldr, p.summary, ...p.findings, p.whatItMeans].join(" "));
  const words = tokens(title);
  // "Global cancer statistics" is all stop words: nothing to compare, so nothing to fail on.
  if (words.size === 0) return true;
  return [...words].some((t) => rec.has(t) || (t.length >= 8 && [...rec].some((r) => r.length >= 8 && r.slice(0, 8) === t.slice(0, 8))));
}

describe("paper identifiers resolve to the paper the record describes", () => {
  it("a PubMed id and a DOI on the same record name the same paper", () => {
    const bad = papers.filter((p) => p.pmid && p.doi && ids[p.pmid]?.doi && ids[p.pmid].doi !== normaliseDoi(p.doi))
      .map((p) => `${p.id}: PubMed ${p.pmid} is ${ids[p.pmid!].doi} ("${ids[p.pmid!].title.slice(0, 70)}"), the record's DOI is ${p.doi}`);
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("the indexed title shares a distinctive word with the record", () => {
    const bad = papers.flatMap((p) => {
      const e = indexed(p);
      return e && !shares(e.title, p) ? [`${p.id}: indexed as "${e.title.slice(0, 90)}" (${e.journal ?? ""} ${e.year ?? ""})`] : [];
    });
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("the record's year is within a year of the indexed year (online-first and issue dates differ by one)", () => {
    const bad = papers.flatMap((p) => {
      const e = indexed(p);
      return e?.year && Math.abs(e.year - p.year) > 1 ? [`${p.id}: record ${p.year}, indexed ${e.year}`] : [];
    });
    expect(bad, bad.join("\n")).toEqual([]);
  });

  // Ratchet: may fall, never rise. Both were zero when the snapshot was first written on 3 November 2026.
  const UNRESOLVED_PMID_FLOOR = 0;
  const UNRESOLVED_DOI_FLOOR = 0;
  it("every PubMed id has been resolved into the snapshot", () => {
    const unseen = papers.filter((p) => p.pmid && !ids[p.pmid]).map((p) => `${p.id} (PubMed ${p.pmid})`);
    expect(unseen.length, `PubMed ids nobody has resolved; run npx tsx scripts/paper-ids.ts and read what it says:\n${unseen.join("\n")}`).toBeLessThanOrEqual(UNRESOLVED_PMID_FLOOR);
  });
  it("every DOI that PubMed cannot vouch for has been resolved through Crossref", () => {
    const unseen = papers.filter((p) => p.doi && !(p.pmid && ids[p.pmid]?.doi) && !dois[normaliseDoi(p.doi)]).map((p) => `${p.id} (${p.doi})`);
    expect(unseen.length, `DOIs nobody has resolved; run npx tsx scripts/paper-ids.ts:\n${unseen.join("\n")}`).toBeLessThanOrEqual(UNRESOLVED_DOI_FLOOR);
  });
});

/**
 * paperType "rct" renders as a randomised trial. The same sample found single-arm phase 2 studies (SPEARHEAD-1,
 * KEYNOTE-199, RESTORE, botensilimab) typed "rct", because the enum has no value for a non-randomised trial; adding
 * one is a schema change and waits for the owner. Until then the count is held: a record whose own text says it was
 * single-arm or non-randomised, and never says anyone was randomised, should not be typed "rct".
 */
describe("paper type", () => {
  const SINGLE_ARM_AS_RCT_FLOOR = 50;
  it("single-arm studies typed as randomised trials do not increase", () => {
    const bad = papers.filter((p) => p.paperType === "rct"
      && /single[- ]arm|non-?randomi[sz]ed|phase 1\b|phase I\b|multicohort|basket/i.test([p.name, p.tldr, p.summary, ...p.caveats].join(" "))
      && !/\brandomi[sz]ed (to|between|1:1|2:1)|randomly assigned|were randomi[sz]ed/i.test([p.name, p.tldr, p.summary].join(" "))).map((p) => p.id);
    expect(bad.length, `typed rct but described as single-arm: ${bad.join(", ")}`).toBeLessThanOrEqual(SINGLE_ARM_AS_RCT_FLOOR);
  });
});
