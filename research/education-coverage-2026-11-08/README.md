# Systematic education coverage and gap closure

This audit implements the requested ongoing goal: account for the entire public education corpus, identify content and schema gaps, and fill the gaps with verified, reviewable changes. [Issue #374](https://github.com/judegomila/OnCo/issues/374) tracks the work.

The pinned public curriculum has 537 Markdown sources: 411 concepts/comparisons, 112 guides/lessons and 14 navigation pages. The OnCo baseline is `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`; the curriculum baseline is `7510db6be8053b64708b6c6c037ab1ea564a35ab`. Drafts [#369](https://github.com/judegomila/OnCo/pull/369), [#371](https://github.com/judegomila/OnCo/pull/371) and [#373](https://github.com/judegomila/OnCo/pull/373) are captured at their exact heads. Their 99 new records and 45 existing-record updates are proposed coverage, separately from main.

Data from [OnCo (onco.cc)](https://onco.cc), [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). The public curriculum inventory retains titles, paths, aliases and exact blob hashes. Patient-specific examples and lesson bodies are not copied into this repository. Local review packs stay outside the checkout.

## Current checkpoint

The original census has **260/537 files assessed or classified**: 253 teaching sources and seven routing-only files. Of 1,493 assessed learning requirements, 1,486 have exact draft evidence and seven remain open. Complete draft representation covers 249 sources; four retain residual requirements. Another 277 ordinary sources are unread.

The later census independently has **245/550 teaching sources assessed and draft represented**, with 1,478/1,478 requirements evidenced. It retains 300 ordinary unread sources and five unclassified navigation sources. These overlapping inventories are never added. Each ref retains 1,888 assets: 252 teaching paths are reviewed and 1,636 remain unclassified.

The [binder and manufacturing checkpoint](binders-cmc-2026-11-10/README.md) adds fourteen lessons at both refs: 81 requirements per ref, 308 section identities and 112 exact authored passages. Five new subjects are registered in #375; two root owners and eight shared owners are supplemented. Source scopes distinguish selected peptide benchmarks, combination regimens, predicted versus measured binder properties, product quality and clinical evidence. Earlier [innate-immunity work](innate-immunity-2026-11-10/README.md) remains preserved.

Validation, TypeScript and lint pass in both drafts, with seven existing warnings each. The root full suite passes 284 files and 2,829 tests; the shared suite passes 281 files and 2,813 tests, each with two existing skips. All fourteen distinct JSON owners match their graphs, and all 112 passages survive actual server rendering and Markdown generation. The 126 distinct short-summary selectors retain eighteen existing texts and 108 English fallbacks. No new Next production build, browser hydration, expert/language sign-off or deployment is claimed.

The audit's versioned snapshots span 348 canonical owners across the drafts: 103 absent from the pinned baseline and 245 existing, plus one directory consumer. The root runtime has 22,779 entities and 96 additions over baseline; seven of the snapshotted new binder/quality owners remain in shared draft #373. Across the recorded drafts, 2,043 distinct summary-consumer entries are snapshotted: 523 contain existing text and 1,520 use English fallback. Literature counts source/discovery occurrences rather than unique papers: 852/917 are screened and 65 remain unread. The latest thirty-occurrence screen retains identifier and access holds and seven queued proposals; screening creates no scientific claim credit. Of 48 adjacent findings, 23 are represented and 25 remain open. Six schema items remain open: five implemented optional contracts await product approval and one classification-context contract needs design. Main coverage and complete final re-audits remain zero.

The prior [breast](breast-pathology-2026-11-10/README.md), [measurement](measurement-sequencing-2026-11-10/README.md), [spatial](spatial-computational-2026-11-10/README.md), [repair](repair-signaling-2026-11-10/README.md), [RNA](rna-delivery-2026-11-10/README.md), [death](death-metabolism-2026-11-09/README.md), [antigen](antigen-antibodies-2026-11-09/README.md), [T-cell](tcells-2026-11-09/README.md) and [chemical](payload-chemical-species-2026-11-09/README.md) checkpoints retain their evidence and limits. Statistics, tissue/pathology and blood/immune worker packets await coordinator integration and earn no current ledger credit.

## Method

1. Inventory every pinned Markdown source and separately census every non-Markdown education blob. Verify Markdown working bytes and all asset metadata against pinned Git trees. A path-based role suggestion is not permission to exclude teaching: images, script-generated quiz text and archives need an explicit, dated scope review bound to their blob. No silently omitted file or unknown document type is permitted.
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
  --proposal research/education-coverage-2026-11-08/pending/proposal-schema.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-service-directory.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/pr-373-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/pr-369-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-chemical-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-tcells.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-tcell-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-antigen-antibodies.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-antigen-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-death-metabolism.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-death-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-rna-delivery.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-rna-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-repair-signaling.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-repair-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-spatial-computational.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-spatial-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-measurement-sequencing.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-measurement-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-breast-pathology.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-breast-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-innate-immunity.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-innate-summary-consumers.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-binders-cmc.json \
  --proposal research/education-coverage-2026-11-08/pending/proposal-cmc-summary-consumers.json
```

Add `--check-closed` to fail while any review, learning requirement, schema gap or literature-screening task remains open. Rerunning preserves manual reviews only for unchanged source hashes; a changed source requires an explicit re-review. Field evidence that changes after review fails closure. Counts are derived from the ledger, never entered as a success target.

The boundary is this pinned curriculum plus concepts discovered through the declared adjacent-literature plan and follow-up primary-source checks. It is not a claim that all possible oncology knowledge can be enumerated. The ledger and search plan expand when new in-scope omissions are found. Two complete review passes with no new unrepresented learning requirement are required before claiming completion within that boundary.

Discovery capture custody: the public Elicit files contain the returned metadata and abstract hashes, not abstract bodies. Eleven original education responses and the earlier payload capture bundle have been recovered byte-exactly into persistent local storage; four newer education response bodies and newer temporary-only primary captures remain unavailable. The earlier public copies retained abstracts despite the stated exclusion; those bodies were removed without rewriting or shortening quotations.

## Persistent review inputs and capture recovery

The 9 November [recovery receipt](artifact-recovery-2026-11-09.json) distinguishes available original bytes, historical hashes and unavailable captures. The pinned OnCo baseline was rebuilt byte-exactly. Unchanged Git blobs restore 11 education responses and 39 earlier payload capture files, verified against their original hashes; copyrighted bodies remain outside the public checkout. The newer temporary-only responses cannot be recreated from hashes. New source captures use persistent local storage and need explicit availability/capture dates.

The audit writes its private review pack to the local cache by default. `--review-pack-out /path/outside/git` overrides the location; a containing Git checkout is rejected before source bodies are written. The new local visual-review bundle contains 32 matched SSR captures from pinned main and the current product implementation. These do not recreate the historical hydrated screenshots, and hosted review/owner approval remain pending. The goal and unread-content/literature work remain active.

The [source-isolation receipt](source-checkout-isolation-2026-11-09.json) records an input-checkout change: the active source checkout advanced and removed paths from the pinned census. The audit now reads an owned detached sparse checkout of `7510db6be8053b64708b6c6c037ab1ea564a35ab`; all 537 source hashes match. This preserves the declared census and does not claim to have reviewed the newer source commit.

The [later source phase](source-phases/c9689645/README.md) now inventories all 550 files at the observed newer ref. It preserves 57 exact teaching/metadata assessments and adds 18 explicit delta reviews. Of 329 phase requirements, 328 have field evidence and one remains open; 468 ordinary content pages and five navigation sources remain unread/unclassified. The original census and its eight residual requirements stay required. Shared canonical proposals and literature are not duplicated into divergent copies. Root closure also fails on any missing, changed-ref/census or incomplete registered phase; counts across versions are never added.

The [service-cost checkpoint](service-cost-2026-11-09/scope.json) repairs one actual `/free/` directory card: the free service is public information, while product supply, clinical care and institutional review may involve separate charges. A direct link leads to the corrected canonical owner. This is one non-graph consumer in addition to 171 graph owners, with its own field hashes and actual page-body verification. Reproduce its snapshot before running either source phase:

```sh
npx tsx scripts/education-service-consumers.ts --id expanded-access \
  --out research/education-coverage-2026-11-08/pending/proposal-service-directory.json
```

`service-directory-entry` is an audit owner type, not an added graph schema kind. Only explicitly selected entries are exported. Supply access or clinical treatment is not promised free.

Service-cost validation passes: 22,719 graph entities, typecheck, lint (zero errors/seven existing warnings), 12 focused tests and the fresh 283-file/2,825-test suite, with two existing skips. The [validation receipt](service-cost-2026-11-09/validation.json) retains the open closure states.

The [synthetic-receptor checkpoint](cytokine-receptors-2026-11-09/scope.json) adds the missing scientific receptor category, resolves Enoda's MIMIC naming from the raw sponsor page and separates specific ligand-dependent experiments, ligand-independent macrophage preprints and clinical claims. Ten resolved MED abstracts, selected preprint methods/results and one exact zero-result registry search retain their evidence boundaries. Eleven new screened occurrences bring the shared literature total to 291, with 105 still unread. The newer Markdown lab requirement closes; its remaining reviewed-source gap is payload-family breadth.

The Markdown-only census missed script-generated teaching. [source-assets.json](source-assets.json) now separately inventories all 1,888 non-Markdown blobs at each source pin. All paths, sizes and Git identities are checked against their actual trees during closure. The blobs happen to be identical across these two refs, but their overlapping counts are not added. At each pin, the standalone lab and its two exact external PNG counterparts have full teaching reviews with actual field hashes. The lab has eight requirements; each PNG is assessed against the two applicable visual requirements from that set. The other 1,885 asset roles per pin remain unclassified. Suggested provenance/visual/archive roles do not close them. A supporting-material disposition needs a dated blob-bound rationale; teaching assets also need complete section and field evidence.

Reproduce the supplemental census before the source ledgers:

```sh
python3 scripts/education-source-assets.py \
  --guide /path/to/pinned/oncoguide \
  --registry research/education-coverage-2026-11-08/source-phases.json \
  --out research/education-coverage-2026-11-08/source-assets.json
```

The source repository must contain both registered commit objects. Existing scope/teaching reviews survive only unchanged identities; disappeared entries fail. [open-source-assets.json](open-source-assets.json) lists unresolved source occurrences. The actual synthetic-receptor reader passes eight authored body-part checks, and all 172 graph owners pass source/date/anchor checks. Exact HTML, original lesson/program bytes and inline images stay outside Git. No interactive-browser, hosted-page or whole-audit completion is claimed.

Receptor/source-census validation passes: 22,720 entities, typecheck, full lint (zero errors/seven existing warnings), 33 focused tests and the fresh 283-file/2,827-test suite, with two existing skips. Census regeneration preserves every identity, scope review, reading section and field proof. [Validation receipt](cytokine-receptors-2026-11-09/validation.json).

The [summary-consumer exporter](../../scripts/education-summary-consumers.ts) reads the actual eight translation dictionaries and the simplified-English table for explicitly selected graph owners. It retains missing entries as English fallback, rather than claiming translated coverage. Use repeated `--id` and mandatory `--out`; include the resulting independently versioned snapshot in both phase commands. The revised #373 consumer snapshot is bound to that draft's actual head and was read in its own checkout. Field proofs cannot be satisfied by the canonical English record when a translated consumer differs.
