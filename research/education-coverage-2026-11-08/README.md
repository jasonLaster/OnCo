# Systematic education coverage and gap closure

This audit implements the requested ongoing goal: account for the entire public education corpus, identify content and schema gaps, and fill the gaps with verified, reviewable changes. [Issue #374](https://github.com/judegomila/OnCo/issues/374) tracks the work.

The pinned public curriculum has 537 Markdown sources: 411 concepts/comparisons, 112 guides/lessons and 14 navigation pages. The OnCo baseline is `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`; the curriculum baseline is `7510db6be8053b64708b6c6c037ab1ea564a35ab`. Drafts [#369](https://github.com/judegomila/OnCo/pull/369), [#371](https://github.com/judegomila/OnCo/pull/371) and [#373](https://github.com/judegomila/OnCo/pull/373) are captured at their exact heads. Their 97 new records and 21 existing-record updates are proposed coverage, separately from main.

Data from [OnCo (onco.cc)](https://onco.cc), [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). The public curriculum inventory retains titles, paths, aliases and exact blob hashes. Patient-specific examples and lesson bodies are not copied into this repository. Local review packs stay outside the checkout.

## Current checkpoint

First-pass review covers 64 curriculum sources: all 9 access/regulation, 28 biology, 17 antibody-based therapeutic pages and 10 cell-therapy pages. Fifty-one have complete proposed representation under the recorded requirements. Thirteen reviewed sources retain follow-ups; 459 content sources and 14 navigation pages remain unreviewed. These are review counts, not a claim that every unread source is absent from OnCo. Of 265 curriculum requirements, 243 have field evidence and 22 remain open.

Every general teaching section has a pinned hash. Reading is distinct from semantic coverage. Definitions, measurement, worked examples, interpretation and source-scope sections are assessed together; name matches alone do not close requirements.

Draft [#375](https://github.com/judegomila/OnCo/pull/375) proposes 24 new terms and 69 existing-owner updates (93 owners), separately from earlier drafts. The latest checkpoint covers safety switches, T-cell-engager/TCR scaffolds, TIL origin and manufacture, and linked study/label scopes. It corrects contributing records as well as overviews, preserving exact clinical populations, measured endpoints and serious harms. The changed owners do not overlap the three earlier proposals, and no draft is counted as main coverage.

Thirteen adjacent concepts have been recorded: ten have proposed representation and three remain open. Open findings concern the existing T-cell-exhaustion/persistence owner, esophageal 22C3 intended-use scopes and exact chemical/derivative identity in legacy consumers. The [payload reconciliation](payload-follow-up-reconciliation.json) refreshes draft #369 at `b5a3c341deb1f5cce51dcb3791b239898eea3647`: 39 owners, including the retained exatecan id with a defined-chemical owner and a new POLR2A target. Twenty already-read curriculum requirements now have actual field evidence. Payload-family breadth remains partial: CHK1/repair-directed attached cargo, legacy comparison profiles and modular derivative inference still require work. The HDP-101 registry age conflict is disclosed without inventing corrected eligibility; protocol confirmation or external registry correction remains necessary. A historical additional review path was not found in the pinned public tree; it is excluded as an unverified source.

Four schema findings have a concrete, locally verified implementation in [draft #376](https://github.com/judegomila/OnCo/pull/376), head `1982abcba38e08085e11dcbd244acca940630ad7`. Reader, Ask, semantic, Markdown/API and format-decomposition consumers preserve the scoped evidence, including dual cargo as one bundle. Legacy Ed-04/brengitecan inference still collapses a derivative to the exact exatecan id; that older rule remains explicitly open. Full tests and a 52,905-page webpack export pass there, with named global-layout limitations. Owner approval and an upstream-accessible preview remain pending; the connected deployment scope returned 403 and native consent lookup 404. The combined drafts are not built or deployed, and no expert sign-off is claimed.

The declared literature plan contains 200 result occurrences: 95 have screening dispositions and 105 remain unreviewed. Public discovery metadata retains capture/abstract hashes; full response bytes and reading files remain outside the checkout. Interactive Elicit report/question URLs were not returned by the semantic API, so none are invented.

[Cell-control checks](cell-control-validation.md), [earlier cell checks](cell-validation.md), [therapeutic checks](therapeutic-validation.md), [biology checks](biology-validation.md) and the source indexes retain evidence boundaries. The goal remains active. Two clean full re-audits have not been performed.

## Method

1. Inventory every pinned Markdown source. Verify working bytes against its Git blob before extracting public metadata. No silently omitted file or unknown document type is permitted.
2. Generate canonical-owner candidates from names, aliases and explanatory fields, including the three draft versions separately. Candidates are retrieval aids; an exact name or high score never closes a gap.
3. Read every general teaching section, including practice, worked examples, side panels and source-scope qualifications, and the candidate records. Section hashes record actual reading; title or mechanism-only review is insufficient. Write explicit, generic learning requirements. Assess the definition/mechanism, measurement or use, and interpretation boundaries where applicable. Guide objectives add requirements that are not already represented by their linked concepts. Navigation pages must be checked for unique teaching content before exclusion.
4. Identify existing owners before adding a record. Record field-level evidence with a hash of the actual field and an explanation of what it covers. A list of related names alone is insufficient. Existing-source coverage is an assessment of representation, not a new expert sign-off or a certification of every number elsewhere on the page.
5. Keep each missing or partial requirement open. Resolve new/changed claims through primary publications, official guidance or registries. Retain exact web/Elicit response bytes outside the public checkout, and publish query/bibliographic metadata, capture hashes and dispositions. Search adjacent concepts systematically by domain; add new omissions to the same ledger.
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
  --proposal research/education-coverage-2026-11-08/pending/proposal-therapeutic.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-schema.json
```

Add `--check-closed` to fail while any review, learning requirement, schema gap or literature-screening task remains open. Rerunning preserves manual reviews only for unchanged source hashes; a changed source requires an explicit re-review. Field evidence that changes after review fails closure. Counts are derived from the ledger, never entered as a success target.

The boundary is this pinned curriculum plus concepts discovered through the declared adjacent-literature plan and follow-up primary-source checks. It is not a claim that all possible oncology knowledge can be enumerated. The ledger and search plan expand when new in-scope omissions are found. Two complete review passes with no new unrepresented learning requirement are required before claiming completion within that boundary.

Discovery capture custody: the public Elicit files contain the returned metadata and abstract hashes, not abstract bodies. Exact original responses remain outside the public checkout. The earlier public copies retained abstracts despite the stated exclusion; this checkpoint removes those bodies without rewriting or shortening quotations.
