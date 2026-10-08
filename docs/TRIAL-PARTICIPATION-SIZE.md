# Trial participation: repository size and build impact

Measured on 7 October 2026 for PR #234. Sizes below use decimal MB (1 MB = 1,000,000 bytes), count tracked blob content once per path, and exclude dependencies, generated build output and Git history.

| Measure | PR base `0697ab2f` | Data head `82879e56` | Increase |
|---|---:|---:|---:|
| Tracked files | 15,074 | 40,504 | 25,430 (+169%) |
| Tracked file content | 201.04 MB | 631.97 MB | **430.93 MB (+214%; 3.14× total)** |
| Tracked `public/` content | 106.24 MB | 534.58 MB | 428.34 MB (+403%; 5.03× total) |
| Participation snapshots and manifests | 0 | 428.34 MB / 25,421 files | 428.34 MB |
| Generated canonical reference modules | 0 | 2.52 MB | 2.52 MB |

Main subsequently advanced to `d84073ec`, with 201.36 MB in 15,092 files; the participation increase is still approximately 431 MB. These measurements describe the captured data change, before the small CI/accessibility/documentation follow-up.

Git compresses the JSON, but that does not eliminate its cost. Packing only the blobs in each tree with default `git pack-objects --stdout` produced 70.13 MB for the base and 203.72 MB for the data head. Packing the objects introduced by the two data commits relative to the base produced **134.32 MB**. These are local pack measurements, not a prediction of every clone's transfer size or the repository's full historical `.git` size; protocol, delta reuse and clone depth affect the result.

## What gets slower or larger

- **Clone and checkout:** more bytes must be transferred/decompressed, and approximately 25,000 additional files must be written. Full clones also retain prior committed versions after a refresh or deletion. Changing `fetchedAt` creates new blob versions even when the registry content is unchanged, though Git can delta-compress them.
- **Build and deployment I/O:** the data lives in `public/`, so the static export copies it into `out/` and deployment packaging must account for it. The snapshots add approximately 428 MB and 25,421 files to that output, independently of generated HTML/API files. Upload speed, filesystem throughput, deployment file limits and artifact storage become more significant as the inventory grows.
- **Build computation:** `npm run build` does not fetch the registries or import the complete snapshots. It does import the 2.52 MB of generated reference modules through the graph, and generated API exports serialize the references. This adds some compilation/graph/serialization work; the 428 MB of raw criteria and locations is predominantly a storage/copying cost.
- **Normal page visits:** there is no automatic 428 MB download. Full criteria and locations stay in separate JSON assets. Page size still depends on which references a page or API response serializes; the existing markup and hydration budgets remain necessary.
- **Local review page:** `docs/trial-participation-review.html` initially fetches the **19.18 MB** inventory manifest plus the 0.08 MB alternate-registry manifest, then fetches individual studies when selected. The median ClinicalTrials.gov snapshot is 12.1 KB and the largest is 314.8 KB. The up-front manifest can materially affect review startup and browser memory on slower devices; listing only 100 rows does not reduce that initial download.

## Observed build evidence and its limits

The existing [accessibility workflow run 37664311408](https://github.com/judegomila/OnCo/actions/runs/37664311408) successfully completed `npm run build` in **17 minutes 43 seconds**, including the API generation chain and a static export of 46,523 routes. Compilation reported 3.2 minutes and static page generation 9.2 minutes. Its subsequent failure was in the accessibility audit, after the build had passed.

A local copy of the participation directory to a fresh destination took 0.79 seconds on this workspace's warm filesystem. That isolates a copy operation only; it is not a cold clone, remote upload or end-to-end build benchmark. Neither the CI run nor that copy establishes a before/after build-time delta. A controlled same-machine, same-cache base/head build comparison would be needed to claim one.

The successful CI export also retried page batches that exceeded Next.js's existing 60-second generation limit. This documents the observed behavior without attributing it to the snapshots: there is no controlled base export here.

The follow-up CI suite ran for more than 11 minutes after roughly three minutes of setup/validation/typecheck/lint. Combined with the observed 17m43s export, the serial pipeline would exceed its 30-minute job window. CI now runs the validation/test/freshness gates and the static build in parallel jobs, each retaining that window; the existing `check` status requires both to succeed and fails if either fails, is skipped or is cancelled. This reduces pipeline elapsed time without changing the work performed or a page-size assertion. It does not make an individual build faster.

The PR's earlier controlled ADC-roadmap render probe reported identical 113,460-byte rendered output with real and empty participation maps. That is evidence for that route only, not a site-wide performance guarantee. The CI timeout was the first graph-heavy render encountering a 30-second allowance while the ship chain already used 600 seconds. Aligning those wall-clock allowances preserves the page-size assertions.

## Recommendation before repeated refreshes

This is a material repository and deployment size increase, with no evidence that ordinary readers load the entire dataset. It is workable as a bounded first capture, but repeatedly committing a growing registry inventory will create a maintenance and CI cost.

For ongoing refreshes, store full snapshots in separately hosted object storage or a versioned dataset artifact, and keep compact manifests/references in Git. Preserve source URLs, retrieval timestamps, attribution/licensing, content hashes and retained historical captures; use immutable versioned or hash-addressed URLs. Otherwise replacing a mutable remote object could make a historical reference misleading. Cache verified captures for CI, and serve a compact or partitioned review inventory instead of requiring the 19 MB manifest for the first selection. This PR does not implement that storage migration.

## Reproduce the size measurements

`git ls-tree -r -l <ref>` supplies each path's stored blob byte size. Sum those sizes and count paths for the complete tree or the `public/` and participation prefixes. For the packed history increment, run:

```sh
git rev-list --objects 82879e56ead3008c3e2cb8f7b859c0540c56e314 \
  ^0697ab2f813d2ccb5b804962f2542fe91c5318d6 |
  git pack-objects --stdout > /tmp/trial-participation-added.pack
wc -c /tmp/trial-participation-added.pack
```

Build output and `.git` sizes are different measures and should not be added to these tracked-content totals or described as page downloads.

## What was done instead, 8 October 2026

The measurements above are the contributor's and they stand; this section records what the repository took in.

GitHub's own guidance is the ceiling that matters: "We recommend repositories remain small, ideally less than
1 GB, and less than 5 GB is strongly recommended"
([about large files on GitHub](https://github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)).
OnCo is already past the first number, and the capture would have pushed it towards the second: on 8 October the
working tree carried 956 MB in `public/` and `.git` had reached 3.7 GB. The capture adds 390 MB of snapshots in
25,407 files, about 134 MB packed, and `scripts/ship.sh` packs `public/` into the deployment archive on every
ship, so the cost is paid again on each deploy rather than once.

Three measurements decided the shape.

1. **Three quarters of the capture is for trials with no page here.** 25,407 studies were captured; 5,910 of them
   have a canonical trial record. The rest are registry ids named on a product page.
2. **Trimming does not save enough.** Reduced to the modules a page could show and to the 5,910 trials with
   records, the snapshots still came to 66 MB, because eligibility text (26% of the capture) and site lists
   (25%) are most of it.
3. **Nothing rendered any of it.** The capture attached `participation` to the trial schema and no component
   read the field, so the 390 MB bought a reader nothing.

So the complete capture stays in `.cache/trial-participation`, which is in `.gitignore`, and
`src/data/trial-participation.ts` carries 4.5 MB of parsed fields: for each of 5,910 registry ids, the status,
the lead sponsor and collaborator count, why a stopped trial stopped, the age, sex and healthy-volunteer rules,
enrolment and whether it is actual or estimated, the number of sites and how many are recruiting, the countries,
the registry's last update, the retrieval date, and the SHA-256 of the study as it was retrieved. That is what
the new "Taking part" tab on a trial page shows, with no fetch and nothing added to the hydration payload, and
the hash on the block is what lets anyone check it against the registry record. The eligibility text is read at
the registry, which is linked.

Net: `public/` grows by 640 KB rather than 428 MB, the repository by 4.5 MB, and a trial page gains a section it
did not have. `npx tsx scripts/fetch-trial-participation.ts` rebuilds the cache from the registry and regenerates
the parsed file; nothing is lost that a refresh cannot restore.
