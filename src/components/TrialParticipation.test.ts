import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { graph } from "@/lib/graph";
import type { Trial } from "@/lib/schema";
import { TrialParticipation } from "./TrialParticipation";
import { TRIAL_PARTICIPATION } from "@/data/trial-participation";

/**
 * The trial participation block (src/components/TrialParticipation.tsx) and the data behind it.
 *
 * The capture this came from was 390 MB of registry snapshots in `public/`, for 25,407 studies of which 5,910
 * have a page here (docs/TRIAL-PARTICIPATION-SIZE.md). What the repository keeps is the parsed fields and the
 * hash; these tests hold that line: no snapshot paths, no eligibility text, and a hash on every reference.
 */
describe("what the corpus keeps about taking part", () => {
  const refs = Object.values(TRIAL_PARTICIPATION).flat();

  it("carries a dated, hashed reference for every registry id and no eligibility payload", () => {
    expect(refs.length).toBeGreaterThan(5000);
    for (const r of refs) {
      expect(r.studySha256, r.nct).toMatch(/^[0-9a-f]{64}$/);
      expect(r.source, r.nct).toBe(`https://clinicaltrials.gov/study/${r.nct}`);
      expect(r.fetchedAt, r.nct).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    }
  });

  it("does not republish the capture: no snapshot paths and no criteria text in the data file", () => {
    const file = readFileSync("src/data/trial-participation.ts", "utf8");
    expect(file).not.toContain("/trial-participation/studies/");
    expect(file).not.toMatch(/eligibilityCriteria|Inclusion Criteria/i);
    // The whole file is small enough to live in the repository; the capture it came from was not.
    expect(Buffer.byteLength(file), `${Math.round(Buffer.byteLength(file) / 1048576)} MB`).toBeLessThan(8 * 1024 * 1024);
  });

  it("shows who a trial is open to, where it runs and when it was read", () => {
    const t = graph().kind("trial").find((x) => (x.participation?.length ?? 0) > 0 && (x.participation![0].countries?.length ?? 0) > 1) as Trial;
    const p = t.participation![0];
    const html = renderToStaticMarkup(createElement(TrialParticipation, { t }));
    expect(html).toContain(p.nct);
    expect(html).toContain(`data-study-sha256="${p.studySha256}"`);
    expect(html).toContain(p.countries![0]);
    expect(html).toContain(p.fetchedAt.slice(0, 10));
    // The criteria are read at the registry; the page links there rather than reprinting them.
    expect(html).toContain(`href="${p.source}"`);
    // And it does not tell a reader that a site near them is open just because the trial is recruiting.
    expect(html).toContain("does not mean a particular site is open");
  });
});
