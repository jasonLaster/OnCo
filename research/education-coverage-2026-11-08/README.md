# Systematic education coverage and gap closure

This audit implements the requested ongoing goal: account for the entire public education corpus, identify content and schema gaps, and fill the gaps with verified, reviewable changes. [Issue #374](https://github.com/judegomila/OnCo/issues/374) tracks the work.

The pinned public curriculum has 537 Markdown sources: 411 concepts/comparisons, 112 guides/lessons and 14 navigation pages. The OnCo baseline is `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`; the curriculum baseline is `7510db6be8053b64708b6c6c037ab1ea564a35ab`. Drafts [#369](https://github.com/judegomila/OnCo/pull/369), [#371](https://github.com/judegomila/OnCo/pull/371) and [#373](https://github.com/judegomila/OnCo/pull/373) are captured at their exact heads. Their 96 new records and 18 existing-record updates are proposed coverage, separately from main.

Data from [OnCo (onco.cc)](https://onco.cc), [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). The public curriculum inventory retains titles, paths, aliases and exact blob hashes. Patient-specific examples and lesson bodies are not copied into this repository. Local review packs stay outside the checkout.

## Current checkpoint

First-pass review covers 54 curriculum sources: all 9 access/regulation, 28 biology and 17 antibody-based therapeutic pages. Thirty-five have complete proposed representation under the current requirements. Nineteen reviewed sources retain explicit follow-ups; 469 content sources and 14 navigation pages remain unreviewed. These are review counts, not a claim that every unreviewed source is missing from OnCo. The curriculum ledger now has 212 explicit learning requirements: 161 have field evidence and 51 remain open.

The source-section check has reopened several earlier pages: a mechanism summary alone cannot close an unread worked example or side section. Every general teaching section now has a pinned hash, with completed section review recorded separately from semantic coverage. The 37 earlier pages have been reread for supplemental teaching and their newly identified requirements remain visible.

Draft [#375](https://github.com/judegomila/OnCo/pull/375) contains 22 new terms and 54 canonical-owner updates across access/regulation, biology and therapeutics. The 76 owners do not overlap the three earlier proposals, and no proposal is counted as main coverage. CHK1 and PARP1 cargo concepts retain their preclinical conference-abstract evidence. Histone lactylation is a third independently discovered concept, alongside receptor reserve and biased agonism; all three have proposed representation.

Four schema gaps need concrete proposals and product review. Another 105 literature occurrences remain unscreened. [Therapeutic checks](therapeutic-validation.md), [biology checks](biology-validation.md) and the per-domain record-source indexes retain the evidence and validation limits. The goal remains active; this is not the final re-audit.

## Method

1. Inventory every pinned Markdown source. Verify working bytes against its Git blob before extracting public metadata. No silently omitted file or unknown document type is permitted.
2. Generate canonical-owner candidates from names, aliases and explanatory fields, including the three draft versions separately. Candidates are retrieval aids; an exact name or high score never closes a gap.
3. Read every general teaching section, including practice, worked examples, side panels and source-scope qualifications, and the candidate records. Section hashes record actual reading; title or mechanism-only review is insufficient. Write explicit, generic learning requirements. Assess the definition/mechanism, measurement or use, and interpretation boundaries where applicable. Guide objectives add requirements that are not already represented by their linked concepts. Navigation pages must be checked for unique teaching content before exclusion.
4. Identify existing owners before adding a record. Record field-level evidence with a hash of the actual field and an explanation of what it covers. A list of related names alone is insufficient. Existing-source coverage is an assessment of representation, not a new expert sign-off or a certification of every number elsewhere on the page.
5. Keep each missing or partial requirement open. Resolve new/changed claims through primary publications, official guidance or registries. Capture web/Elicit queries, returned identifiers, raw responses and dispositions. Search adjacent concepts systematically by domain; add new omissions to the same ledger.
6. Implement, date, deduplicate and validate changes; read the affected rendered pages and small examples. Schema additions need a concrete question that existing fields cannot answer. Keep product approval dependencies separate from content implementation.
7. Re-audit every source and every newly discovered in-scope concept. Closure requires no unreviewed items, no residual content gaps, unchanged field evidence, complete source dispositions and successful relevant checks. Draft implementation and coverage on main are reported separately. A source or approval dependency remains visible and does not become covered by being named.

## Ledger states

- `unreviewed`: no completed semantic assessment.
- `covered-main`: the required distinction is represented by cited fields on main.
- `covered-draft`: represented by an explicitly versioned proposed change; not main coverage.
- `gap` / `partial`: missing or incomplete explanation, relationship, source or structure.
- `source-blocked`: a required source has not been verified; still open.
- Navigation is excluded only after a dated check that its teaching content is repeated in audited sources, or after adding any unique requirements to the ledger.

[ledger.json](ledger.json) is the authoritative worklist. [candidates.json](candidates.json) contains unreviewed retrieval suggestions. [open-items.json](open-items.json) is generated from the content closure checks. [open-dependencies.json](open-dependencies.json) retains schema work and unreviewed literature. [adjacent-concepts.json](adjacent-concepts.json) adds independently discovered requirements to the same closure rules. Repeat `--proposal` for independently versioned domain snapshots. Earlier selected-batch crosswalks are retained as provenance and suggestions, not copied as completed assessments.

## Reproduce

The baseline file is a JSON serialization of `graph().entities` from the pinned OnCo commit. The three compact pending snapshots are derived in the same way and retain only records that differ from the baseline after JSON normalization; runtime-only `undefined` properties do not create spurious changes. Their source heads are retained in each capture. `js-yaml` is already in the locked ESLint dependency tree.

```sh
npx tsx scripts/education-coverage.ts \
  --guide /path/to/public/oncoguide \
  --guide-ref 7510db6be8053b64708b6c6c037ab1ea564a35ab \
  --baseline /path/to/onco-baseline.json \
  --out research/education-coverage-2026-11-08 \
  --proposal research/education-coverage-2026-11-08/pending/proposal-access.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-biology.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-therapeutic.json
```

Add `--check-closed` to fail while any review, learning requirement, schema gap or literature-screening task remains open. Rerunning preserves manual reviews only for unchanged source hashes; a changed source requires an explicit re-review. Field evidence that changes after review fails closure. Counts are derived from the ledger, never entered as a success target.

The boundary is this pinned curriculum plus concepts discovered through the declared adjacent-literature plan and follow-up primary-source checks. It is not a claim that all possible oncology knowledge can be enumerated. The ledger and search plan expand when new in-scope omissions are found. Two complete review passes with no new unrepresented learning requirement are required before claiming completion within that boundary.
