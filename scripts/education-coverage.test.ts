import { describe, expect, it } from "vitest";
import { candidateFinder, dependencyProblems, fieldHash, reviewProblems, type CurriculumItem } from "./education-coverage";

const record = { id: "example", kind: "term", name: "Example assay", summary: "Measures one readout under specified conditions." };
const item = (): CurriculumItem => ({ path: "wiki/education/concepts/example.md", title: "Example assay", aliases: [], sourceType: "concept", domain: "measurement", sourceSha256: "source", gitBlob: "blob", sourceURL: "https://example.org/source", priorOwnerIds: [], review: { status: "unreviewed", points: [] } });

describe("curriculum coverage closure", () => {
  it("does not close an exact name match or a retrieved prior owner", () => {
    const row = item(); row.priorOwnerIds = [record.id];
    const hit = candidateFinder([{ version: "main", record }])(row)[0];
    expect(hit.exactName).toBe(true);
    expect(reviewProblems(row, new Map([["main:example", record]]))).toEqual(["Content remains unreviewed"]);
  });

  it("rejects an empty or unexplained semantic review", () => {
    const row = item(); row.review = { status: "reviewed", points: [] };
    expect(reviewProblems(row, new Map())).toContain("Semantic review has no learning points");
    expect(reviewProblems(row, new Map())).toContain("Semantic review lacks auditor, date or rationale");
  });

  it("does not discard unique teaching content just because a page is called navigation", () => {
    const row = item(); row.sourceType = "navigation";
    row.review = { status: "navigation", auditor: "agent", checkedAt: "2026-11-08", rationale: "An index that also has a unique example.", points: [{ id: "example", requirement: "Explain the additional example.", status: "gap", evidence: [], remaining: ["Not yet represented."] }] };
    expect(reviewProblems(row, new Map())).toContain("Navigation with unique teaching content must be assessed as content");
    row.review.status = "reviewed";
    expect(reviewProblems(row, new Map())).toContain("example: gap");
  });

  it("requires unchanged field evidence and keeps pending drafts distinct from main", () => {
    const row = item(); row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "Read the source and the record field.", points: [{ id: "readout", requirement: "Explain the readout and its assay context.", status: "covered-main", remaining: [], evidence: [{ recordId: "example", version: "draft-373", field: "summary", fieldSha256: fieldHash(record.summary), explanation: "The field names both the measurement and its conditions." }] }] };
    const catalog = new Map([["draft-373:example", record]]);
    expect(reviewProblems(row, catalog)).toContain("readout: draft evidence cannot establish main coverage");
    row.review.points[0].status = "covered-draft";
    expect(reviewProblems(row, catalog)).toEqual([]);
    catalog.set("draft-373:example", { ...record, summary: "Changed after review." });
    expect(reviewProblems(row, catalog)).toContain("readout: evidence field changed");
  });

  it("keeps a named partial, source blocker or residual gap open", () => {
    const row = item(); row.review = { status: "reviewed", auditor: "agent", checkedAt: "2026-11-08", rationale: "Reviewed.", points: [{ id: "interpretation", requirement: "Interpretation boundary.", status: "source-blocked", remaining: ["Primary evidence not yet read."], evidence: [] }] };
    const problems = reviewProblems(row, new Map());
    expect(problems).toContain("interpretation: source-blocked");
    expect(problems).toContain("interpretation: residual gaps remain");
    expect(problems).toContain("interpretation: no field evidence");
  });

  it("keeps schema and literature work open even when a content subset is covered", () => {
    expect(dependencyProblems([{ id: "assay-status", status: "pending approval" }], [{ queryId: "immunology", rank: 1, reviewStatus: "unreviewed" }])).toEqual(["Schema gap remains open: assay-status", "Literature screening remains open: immunology:1"]);
    expect(dependencyProblems([{ id: "assay-status", status: "resolved" }], [{ queryId: "immunology", rank: 1, reviewStatus: "screened-unused" }])).toEqual([]);
  });
});
