# Scoped evidence schema proposal

This product proposal follows the four schema findings in the [education audit in #375](https://github.com/judegomila/OnCo/pull/375). That audit lives on a separate branch. The baseline is upstream `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`. This proposal does not close the full curriculum audit or claim coverage on main.

The fields are optional. Existing records retain their parsed shape; an omitted value is not silently converted to zero, a status, a clinical-utility grade or an evidence claim. Sources and check dates belong to each scoped observation. Source dates, source versions and event dates have distinct meanings. Touched record dates mark this scoped check, not a revalidation of every inherited sentence.

| Finding | Representation | Verified example and remaining boundary |
| --- | --- | --- |
| Regulatory labels collapse different subjects and intended uses | `regulatoryClaims` on drug/test records and assay registry: subject, claim type, authority, jurisdiction, scope, intended use, source and dates | PD-L1 IHC 22C3 pharmDx has two separately scoped FDA NSCLC uses with different therapies and TPS rules. Laboratory certification is a different subject. No clinical-utility score follows from authorization. |
| Trial-wide recruitment is insufficient for site/cohort access | Optional registry `facilities` plus independently sourced `cohortObservations` | NCT06382142 names a facility without a facility status. That omission survives normalization. Actual local cohort/slot observations need a separate dated source; this proposal invents none. |
| Mechanism edges lack context and evidence basis | Optional edge `evidence` with basis, context, statement, limitation, source and dates; accessible disclosure in the diagram | The RAF–MEK example names CRAF/MEK1 and its recombinant Sf9 system. Observed, hypothesis and model-derived bases remain distinct. The renderer has no context-joining inference engine, so it does not propagate treatment block/escape illustrations through newly scoped relationships. Legacy illustration behavior is retained until those relationships are separately reviewed. |
| ADC cargo, payload target, analytes and loading are conflated | Optional `conjugateComposition`, separate delivery targets, components, payload classes/targets, attached/released species and sourced loading observations | T-DM1 distinguishes attached MCC-DM1 from reported plasma catabolites and a mean loading. CLIO-8221 retains exatecan and berzosertib separately without inventing a ratio. Loading is a count per antibody; activity and absorbed dose are rejected as units. This does not claim that every platform's loading/distribution or every future cargo is already characterized. |

The browser check also found diagnostic tests among pathway products described as hitting targets. The resolver now uses the existing shared product classification to offer medicines for treatment highlighting; tests and imaging measurements remain in their own records and graph relationships. A corpus-wide pathway assertion checks this distinction while retaining a known targeted medicine.

Each graph reference is validated and indexed with a distinct relation (delivery target, cargo, class, molecular target, released species or regulatory intended use). Existing export code retains the structured optional fields. No new global entity or duplicate paper is created by a component's local identifier. A named molecular target or chemical may remain unlinked when no verified canonical identity exists.

## Capture and update behavior

[Source crosswalk](source-crosswalk.json), [facility receipt](registry-capture.json) and [CLIO registry context](clio-registry-check.json) record the sources checked. Raw public responses are retained outside the checkout. Complete copyrighted abstracts/manuscripts and personal contacts are excluded from this proposal.

`responseStudySha256` hashes the structured projected registry response before facility-name contact redaction; `studySha256` verifies the retained structured study after that redaction. A separate receipt hashes the response bytes. Older captures keep their existing retained-study hash and do not acquire a fabricated response hash.

The participation fetcher captures facility rows only for explicitly selected registry ids (`--facilities=NCT...`) or ids already opted in. Routine refresh preserves independently sourced cohort observations and their dates. A missing facility status remains absent even when the overall study is recruiting. An empty captured facility list remains distinguishable from capture not requested. Exact eligibility wording and contact exclusions retain their existing tests. The full fetcher was not run against a partial cache; one verified example was normalized and attached through the same helper.

## Product review and validation

The schema, renderer and graph library require owner approval under [PRODUCT-APPROVAL](../../docs/PRODUCT-APPROVAL.md). The associated contribution remains a draft pending issue triage and the scientific/regulatory review tracks. No expert or conflict-of-interest sign-off is asserted.

The map route also imports its unchanged graph JSON path from a library rather than exporting an unsupported named constant from `page.tsx`, so the Next.js 16 route contract can be checked. This prerequisite changes no URL.

Validation accepts 22,683 records and typecheck passes. The full suite passed 284 files / 2,824 tests (two existing skips); the final source-link target adjustment also passed the focused renderer checks. Lint has zero errors and the seven baseline warnings. API generation succeeded and a five-entity round-trip retained every new example field. `next build --webpack` compiled, typechecked and exported all 52,905 pages; six affected local routes returned HTTP 200. The default Turbopack build rejects the required external `node_modules` symlink in this worktree. No dependency copy or bundler configuration change was made.

Actual exported pages were checked at 320, 393, 1,440 and 1,920 pixels. The disclosure/source targets measure at least 44 pixels, Enter and Space toggle correctly, and scoped panel content fits each viewport. Measured source and muted text contrast on the card exceeds 4.5:1. Component fixtures additionally cover a short mobile viewport. At 320 pixels, the whole page retains 39 pixels of overflow outside this panel in existing page/navigation content; the isolated before/after fixture has none. This is an explicit whole-page limitation, not a claim of full-site accessibility compliance. The analytics-consent overlay was dismissed in the isolated local browser before final captures. Review screenshots, generated references and browser profiles stay outside the repository.

Hosted preview limitation: the connected deployment account does not expose the upstream OnCo project. No different project was substituted, no project was relinked and no production deployment was attempted. Local matched renders are being prepared; a hosted preview remains dependent on upstream deployment access/authorization. The source proposal may be reviewed as a draft while that dependency remains explicit.

The existing `exatecan` term covers exatecan and derivatives. The CLIO component therefore keeps the exact named cargo without forcing that broader term into a chemical-identity reference. Missing canonical chemical identity is explicit, rather than a new duplicate record.

This fork proposal is prepared manually because the product helper assumes upstream push/deployment access. The `product/` branch prefix preserves queue discovery. A hosted upstream preview and GitHub-accessible paired attachments remain pending; local captures are not described as public previews.
