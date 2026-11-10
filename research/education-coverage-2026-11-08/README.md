# Systematic education coverage and gap closure

This audit implements the requested ongoing goal: account for the entire public education corpus, identify content and schema gaps, and fill the gaps with verified, reviewable changes. [Issue #374](https://github.com/judegomila/OnCo/issues/374) tracks the work.

The pinned public curriculum has 537 Markdown sources: 411 concepts/comparisons, 112 guides/lessons and 14 navigation pages. The OnCo baseline is `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`; the curriculum baseline is `7510db6be8053b64708b6c6c037ab1ea564a35ab`. Drafts [#369](https://github.com/judegomila/OnCo/pull/369), [#371](https://github.com/judegomila/OnCo/pull/371) and [#373](https://github.com/judegomila/OnCo/pull/373) are captured at their exact heads. Their 99 new records and 45 existing-record updates are proposed coverage, separately from main.

Data from [OnCo (onco.cc)](https://onco.cc), [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). The public curriculum inventory retains titles, paths, aliases and exact blob hashes. Patient-specific examples and lesson bodies are not copied into this repository. Local review packs stay outside the checkout.

## Current checkpoint

The original 537-file census has 108 teaching sources assessed, including seven nominal navigation pages. Another seven navigation files contain routing/generated metadata only, so 115 of 537 files have an explicit assessment/classification. Of 475 per-source learning requirements, 468 have exact field evidence and seven remain open. One hundred four assessed sources have complete draft representation; four retain follow-ups, and 422 ordinary content sources remain unread.

The later 550-file census independently has 100 teaching sources assessed and completely represented in drafts, with all 455 assessed requirements evidenced. It retains 445 unread ordinary sources and five unclassified navigation sources. Its counts overlap the original version and are never added to it. Each ref also retains 1,888 non-Markdown assets: 34 teaching assets have evidence and 1,854 remain unclassified. Reading, draft representation and main coverage stay separate.

Draft [#375](https://github.com/judegomila/OnCo/pull/375) proposes 47 new graph records and 147 existing-owner updates, for 194 canonical owners distinct from the earlier drafts, plus one directory consumer. Across this draft, #373 and #369, 432 selected summary-consumer entries are snapshotted: 301 contain actual text and 131 use the English fallback. These are audit consumers, not new graph entities or named language reviews.

The [T-cell checkpoint](tcells-2026-11-09/README.md) adds fourteen assessed files to each inventory. Its 261 blocks map to 49 shared semantic requirements and 84 per-source requirement occurrences in each version. Seven terms are registered, seven existing owners are corrected/supplemented, and three existing owners in [#373](https://github.com/judegomila/OnCo/pull/373) receive ten requirements at head `3ce595e96cb429b3a5580377b55c2cf85b0e8022`. A duplicate repertoire proposal is removed. The generated FOXP3 file is unchanged; the existing manual-target precedence rule supplies its dated interpretation. All 49 passages appear in actual reader body text, 126 selected summaries use actual loaders, and real JSON/Markdown generation retains all 39 root-branch passages. Fresh MED checks confirm 39 publication identities and match the 37 original MED abstract bodies. Crossref resolves the unrelated DOI in one MED record to the correct original paper. Reading depth and failed/unused sources remain explicit.

The [chemical-species checkpoint](payload-chemical-species-2026-11-09/README.md) retains [#369](https://github.com/judegomila/OnCo/pull/369) at `c6deecb92b279b11964c7ef81f419e6a18e26aeb`: 65 canonical owners (34 new/31 existing) and 46 scoped observations. Actual combined comparison/JSON/Markdown checks require coordinated data #369 and product #376 before release. Closing the earlier breadth requirement did not add a newly read page. Broader ambiguous payload-prose inference remains partial.

The adjacent ledger has 24 findings: 22 represented and two open, covering payload inference and the newly queued immune-map/prognostic questions. Literature has 398 occurrences: 290 screened and 108 unreviewed; occurrences are not independent studies. Other completed worker packets and Haiku identity/asset triage await coordinator integration and receive no automatic curriculum credit.

Five optional schema/consumer contract families are implemented in [#376](https://github.com/judegomila/OnCo/pull/376), head `d994b257f1c4ad6ddc2681ab1dee20ec01bd0ffe`, pending owner approval and accessible hosted review. Classification context remains a sixth finding requiring design. The data-only T-cell checkpoint passes both standalone suites and actual reader/export checks. No new production build is claimed: the unchanged named GRAPH_JSON page export remains a documented baseline limitation. Historical product build/hydration checks retain their own heads and scope.

Both closure checks exit 2 for genuine unread/open work, with zero stale/missing field proofs. No main coverage, deployment, expert sign-off or final re-audit is claimed. The current checkpoint and generated ledgers are authoritative; other dated counts below belong to historical checkpoints. The goal remains active.

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
  --proposal research/education-coverage-2026-11-08/pending/proposal-tcell-summary-consumers.json
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
