# Merge plan, November 2026: two drug pairs that are one product each

Status: **approved by the owner on 10 November 2026 and merged the same day** with `scripts/merge-records.ts`. Both
pairs are in `MERGED_RECORDS` in `src/data/merged-records.ts`, the retired ids redirect, and the cross-references and
`related` links of 3 November are gone. The translated and simple-English text keyed to the retired ids was dropped
rather than renamed: it described the retired record (VS-7375 and GC012F in phase 2), which the survivor is not, and
each survivor keeps its own.

The procedure is the one in `docs/DUPLICATE-RECORDS.md`. Both pairs were run through
`npx tsx scripts/merge-records.ts <survivor> <retired> "<reason>" --dry` on 3 November 2026; the dry run reported
nothing it could not do.

## 1. GFH375 and VS-7375 (one KRAS G12D inhibitor)

**Evidence.** Verastem's investor presentation filed with its Form 8-K on 8 January 2026
(https://www.sec.gov/Archives/edgar/data/1526119/000110465926002135/tm262531d1_ex99-1.htm): "GenFleet Therapeutics has
an ongoing Phase 1/2 and Phase 3 clinical trials in China with VS-7375, known as GFH375 in China. GenFleet retains
greater China rights." The same deck records that Verastem "Exercised Ex-China Option to VS-7375 G12D (ON/OFF)
inhibitor from GenFleet Therapeutics" in 2025.

**Survivor: `gfh375`. Retired: `vs-7375`.** GFH375 is the originator's code, the phase 3 trials (NCT07262567,
NCT07668752) are registered under it, and its record is the fuller one. The dry run: "vs-7375 -> gfh375: 4 fields
moved, 0 lines of its own reading dropped; 10 lines rewritten, 1 key renamed, 8 keys dropped".

**Carry over to `gfh375`** (as a supplement in `src/data/merged-records.ts`, which the merge script writes):

- `aka`: "VS-7375".
- `companies`: `verastem` (`genfleet` is already there).
- `trials`: nct07659782, nct07659795, nct07644559, nct07020221 (Verastem's phase 1/2 and phase 2 trials).
- `cancers`: `colorectal`.
- `links`: "ClinicalTrials.gov: trials of VS-7375".
- Reading to fold in by hand after the merge, in one sentence: the registry's description of VS-7375 as an oral,
  non-covalent KRAS G12D (ON/OFF) inhibitor, and that Verastem holds rights outside greater China.
- Remove the cross-reference sentence and `related: ["vs-7375"]` added on 3 November; the "no record references
  itself" test catches the second if it is left.

**Redirect:** `/drugs/vs-7375/:path*` to `/drugs/gfh375/:path*`, then `npx tsx scripts/build-redirect-stubs.ts`.
Translation keys `vs-7375` in `src/data/i18n/*.ts` and `src/data/simple/*.ts`: the merge script reports keys it drops;
the `gfh375` keys stay.

## 2. GC012F and AZD0120 (one BCMA and CD19 dual CAR-T)

**Evidence.** AstraZeneca's first-quarter 2024 results, filed as Form 6-K on 25 April 2024
(https://www.sec.gov/Archives/edgar/data/901832/000165495424004975/a9413l.htm): "The acquisition enriches
AstraZeneca's growing pipeline of cell therapies with AZD0120 (formerly GC012F), a novel, clinical-stage T-cell (CAR-T)
therapy." The registry describes both as a BCMA/CD19 dual CAR (NCT06235229 for GC012F, NCT05850234 for AZD0120).
`src/data/deals.ts` already records the acquisition with the asset as "GC012F (AZD0120)".

**Survivor: `azd0120`. Retired: `gc012f`.** AZD0120 is the current owner's name, the phase 3 trials (DURGA-4,
NCT07391657; NCT07764978) and the deal record use it. The dry run: "gc012f -> azd0120: 3 fields moved, 0 lines of its
own reading dropped; 6 lines rewritten, 8 keys renamed, 1 key dropped".

**Carry over to `azd0120`:**

- `aka`: "GC012F".
- `companies`: `gracell-biotechnologies` (`astrazeneca` is already there).
- `trials`: nct06235229 (Gracell's phase 1/2 trial).
- `links`: "ClinicalTrials.gov: trials of GC012F".
- Mechanism: replace AZD0120's generic registry wording with GC012F's specific one ("a dual chimeric antigen receptor
  T-cell product engineered to recognise ... cells expressing either BCMA or CD19"), which AstraZeneca's 2024 annual
  report supports ("autologous anti-CD19 and anti-BCMA CAR-T cell immunotherapy").
- References elsewhere that move with the merge: `targets.ts` (`bcma`), `companies-makers-wave4.ts` (Gracell),
  `pipeline-trials-wave5.ts` (NCT06235229), `cancers.ts` (myeloma pipeline).
- Remove the cross-reference sentence and `related: ["gc012f"]` added on 3 November.

**Redirect:** `/drugs/gc012f/:path*` to `/drugs/azd0120/:path*`, then the stubs.

## After the merge

`npm run validate`, `npm run typecheck`, `npx vitest run src/lib/corpus-rules.test.ts`, `npx tsx
scripts/gap-audit.ts` (the `duplicate` count should fall) and `npx tsx scripts/link-sense-audit.ts`; the
link-sense findings on `azd0120.targets` (CD19, BCMA "neither record's text names") should clear once GC012F's
mechanism text moves across.
