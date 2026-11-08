# Next-generation antibody-conjugate payload coverage

Date: 2026-11-08. Baseline: `0f8ebc256` (current upstream main at the start of this contribution). Issue: https://github.com/judegomila/OnCo/issues/368.

This contribution adds 31 mechanism and scaffold concepts and revises four existing parent records. It does not claim every proprietary payload molecule has been disclosed or found. Conventional TOP1, auristatin, maytansinoid, PBD, calicheamicin and duocarmycin records remain their existing owners.

## Search boundary

Public oncology antibody-conjugate payload mechanisms, including historical experimental scaffolds and negative studies that remain relevant to current diversification. Web search extended beyond OncoGuide to primary papers, conference abstracts, and direct ClinicalTrials.gov v2 records. Five Elicit paper queries and one trial query were run. No patient data or private-project material was queried or copied.

### Elicit requests and full JSON responses

- [clinical-exemplars](elicit/clinical-exemplars.json): `{"query": "Antibody conjugates carrying non-topoisomerase payloads: amanitin HDP-101, BCL-XL ABBV-155, degrader ORM-5029 ORM-6151, STING agonist XMT-2056 TAK-500, TLR agonist BDC-1001 SBT6050", "searchMode": "semantic", "maxResults": 25}`
- [completion-check](elicit/completion-check.json): `{"query": "Antibody drug conjugates carrying MCL-1 inhibitor S64315 S227928, ferroptosis inducer sulfasalazine FGFR4 RZ-11, RIG-I agonist RNA and XPO1 inhibitor payloads: primary evidence for directly attached payloads rather than separate drug combinations", "searchMode": "semantic", "maxResults": 20, "corpus": "elicit"}`
- [emerging-families](elicit/emerging-families.json): `{"query": "Antibody drug conjugates delivering novel non-topoisomerase payloads: spliceosome inhibitors thailanstatin, kinesin spindle protein inhibitors, BCL-XL inhibitors, NAMPT inhibitors, ferroptosis inducers, protein alkylators and epigenetic inhibitors", "searchMode": "semantic", "maxResults": 30, "corpus": "elicit"}`
- [expanded-frontier](elicit/expanded-frontier.json): `{"query": "Antibody drug conjugates with Gq/11 inhibitors SDZ475 DYP688, PI3K PIKK kinase inhibitor payloads HMPL-A580, pyridinobenzodiazepines PDD, protein alkylator PA289 and ferroptosis inducer payloads", "searchMode": "semantic", "maxResults": 20, "corpus": "elicit"}`
- [immune-ddr-degrader](elicit/immune-ddr-degrader.json): `{"query": "Antibody conjugate payloads beyond cytotoxic chemotherapy: STING TLR7 TLR8 immune agonists, ATR PARP DNA damage repair inhibitors, GSPT1 molecular glue and BRD4 PROTAC degraders, dual payload constructs", "searchMode": "semantic", "maxResults": 25, "corpus": "elicit"}`
- [mechanisms](elicit/mechanisms.json): `{"query": "What novel antibody drug conjugate payload mechanisms beyond topoisomerase I inhibition have primary preclinical or clinical evidence, including NAMPT, BCL-XL, kinesin spindle protein, RNA splicing, amanitin, CDK9, protein degradation and immune agonists?", "searchMode": "semantic", "maxResults": 30, "corpus": "elicit"}`

These are saved API discovery responses, not permanent Elicit report URLs. Every publication used for a new concept was independently resolved through Europe PMC or Crossref, and its abstract read. Search-engine summaries are discovery material. Publisher fetches for some AACR/RSC pages returned 403; the load-bearing abstracts were read from raw Crossref/Europe PMC JSON instead. Initial Crossref requests hit rate limits; all required abstract captures were ultimately recovered and checked.

## Added concepts and primary evidence

| Concept | Primary source |
|---|---|
| [Next-generation antibody-conjugate payloads](https://onco.cc/terms/next-generation-adc-payloads/) | [Yamazaki et al., dual-payload conjugates in breast cancer models (2021)](https://doi.org/10.1038/s41467-021-23793-7); [Carlino et al., Gq/11 inhibitor conjugate phase 1 study (2026)](https://doi.org/10.1038/s41591-026-04518-z) |
| [Transcription-inhibitor payloads](https://onco.cc/terms/transcription-inhibitor-payloads/) | [HDP-101 in proliferating and resting myeloma models (2021)](https://doi.org/10.1158/1535-7163.MCT-20-0287); [Hayashi et al., CD26-directed triptolide conjugate (2019)](https://doi.org/10.3390/cancers11081138) |
| [Amanitin payloads](https://onco.cc/terms/amanitin-payloads/) | [HDP-101 preclinical study (2021)](https://doi.org/10.1158/1535-7163.MCT-20-0287) |
| [Triptolide payloads](https://onco.cc/terms/triptolide-payloads/) | [Hayashi et al., Y-TR1 transcription-inhibitor conjugate (2019)](https://doi.org/10.3390/cancers11081138) |
| [Spliceosome-inhibitor payloads](https://onco.cc/terms/spliceosome-inhibitor-payloads/) | [Puthenveetil et al., splicing inhibitors as conjugate payloads (2016)](https://doi.org/10.1021/acs.bioconjchem.6b00291); [Site-specific thailanstatin conjugates (2017)](https://doi.org/10.1371/journal.pone.0178452) |
| [Cyclin-dependent kinase inhibitor payloads](https://onco.cc/terms/cdk-inhibitor-payloads/) | [Cetuximab-SNS-032 in breast cancer models (2024)](https://doi.org/10.1158/1078-0432.CCR-23-3110) |
| [DNA damage response inhibitor payloads](https://onco.cc/terms/ddr-inhibitor-payloads/) | [CLIO-8221 phase 1/2 trial-design abstract (2026)](https://doi.org/10.1200/JCO.2026.44.16_suppl.TPS3162); [Azenosertib plus conjugates: a separate-drug combination study (2026)](https://doi.org/10.1016/j.isci.2026.116390) |
| [ATR inhibitor payloads](https://onco.cc/terms/atr-inhibitor-payloads/) | [CLIO-8221 trial-design abstract (2026)](https://doi.org/10.1200/JCO.2026.44.16_suppl.TPS3162) |
| [NAMPT inhibitor payloads](https://onco.cc/terms/nampt-inhibitor-payloads/) | [Karpov et al., NAMPT inhibitors as conjugate payloads (2018)](https://doi.org/10.1021/acsmedchemlett.8b00254); [Ruedas et al., NAMPT payload optimization (2026)](https://doi.org/10.1021/acsbiomedchemau.6c00047) |
| [BCL-XL inhibitor payloads](https://onco.cc/terms/bcl-xl-inhibitor-payloads/) | [Judd et al., BCL-XL inhibitor conjugates (2024)](https://doi.org/10.1126/sciadv.ado7120) |
| [MCL-1 inhibitor payloads](https://onco.cc/terms/mcl1-inhibitor-payloads/) | [Maragno et al., S227928 preclinical ASH abstract (2024)](https://doi.org/10.1182/blood-2024-210048) |
| [Histone deacetylase inhibitor payloads](https://onco.cc/terms/hdac-inhibitor-payloads/) | [Cini et al., antibody delivery of an HDAC inhibitor (2018)](https://doi.org/10.1039/c7sc05266a) |
| [GSPT1 degrader payloads](https://onco.cc/terms/gspt1-degrader-payloads/) | [Palacino et al., ORM-5029 preclinical abstract (2022)](https://doi.org/10.1158/1538-7445.AM2022-3933) |
| [BRD4 degrader payloads](https://onco.cc/terms/brd4-degrader-payloads/) | [Dragovich et al., antibody delivery of BRD4 degraders, part 2 (2021)](https://doi.org/10.1021/acs.jmedchem.0c01846) |
| [KIF11 degrader payloads](https://onco.cc/terms/kif11-degrader-payloads/) | [Feng et al., KIF11 degrader conjugate, ASCO abstract (2025)](https://doi.org/10.1200/JCO.2025.43.16_suppl.3092) |
| [Kinesin spindle protein inhibitor payloads](https://onco.cc/terms/ksp-inhibitor-payloads/) | [Lerchen et al., pyrrole-based KSP inhibitor conjugates (2018)](https://doi.org/10.1002/anie.201807619) |
| [STING agonist payloads](https://onco.cc/terms/sting-agonist-payloads/) | [XMT-2056 preclinical pharmacology (2025)](https://doi.org/10.1158/1078-0432.CCR-24-2449); [STING agonist conjugate platform development (2023)](https://doi.org/10.1021/acs.jmedchem.3c00907) |
| [Toll-like receptor agonist payloads](https://onco.cc/terms/tlr-agonist-payloads/) | [Ackerman et al., immune-stimulating conjugates (2021)](https://doi.org/10.1038/s43018-020-00136-x) |
| [Gq/11 inhibitor payloads](https://onco.cc/terms/gq11-inhibitor-payloads/) | [DYP688 phase 1 clinical study (2026)](https://doi.org/10.1038/s41591-026-04518-z) |
| [PI3K/PIKK inhibitor payloads](https://onco.cc/terms/pi3k-pikk-inhibitor-payloads/) | [Cai et al., HMPL-A580 preclinical AACR abstract (2026)](https://doi.org/10.1158/1538-7445.AM2026-4549) |
| [Anthracycline payloads](https://onco.cc/terms/anthracycline-payloads/) | [uPAR-directed anthracycline conjugate in pancreatic cancer models (2025)](https://doi.org/10.1126/sciadv.adq0513) |
| [Eribulin as an antibody-conjugate payload](https://onco.cc/terms/eribulin-payload/) | [MORAb-202 in breast cancer models (2021)](https://doi.org/10.1111/cas.14898) |
| [Tubulysin payloads](https://onco.cc/terms/tubulysin-payloads/) | [Tubulysin conjugation site, stability and efficacy study (2025)](https://doi.org/10.1002/open.202400522) |
| [Hemiasterlin payloads](https://onco.cc/terms/hemiasterlin-payloads/) | [Discovery of STRO-002 and its hemiasterlin payload (2023)](https://doi.org/10.1158/1535-7163.MCT-22-0322) |
| [Cryptophycin payloads](https://onco.cc/terms/cryptophycin-payloads/) | [Lai et al., cryptophycin-55/52 antibody conjugates (2020)](https://doi.org/10.1016/j.ejmech.2020.112364) |
| [Indolinobenzodiazepine payloads](https://onco.cc/terms/ign-payloads/) | [IGN DNA-binding and catabolite mechanism study (2019)](https://doi.org/10.1021/acs.molpharmaceut.9b00675) |
| [Pyridinobenzodiazepine payloads](https://onco.cc/terms/pdd-payloads/) | [Andriollo et al., sequence-selective PDD payload (2025)](https://doi.org/10.1039/d4md01040j) |
| [Protein-alkylating payloads](https://onco.cc/terms/protein-alkylator-payloads/) | [Mysliwy et al., PA289 preclinical AACR abstract (2025)](https://doi.org/10.1158/1538-7445.AM2025-1579) |
| [Proteasome inhibitor payloads](https://onco.cc/terms/proteasome-inhibitor-payloads/) | [Carfilzomib conjugates and lysosomal inactivation (2019)](https://doi.org/10.1124/dmd.119.086595) |
| [Ferroptosis-inducing payloads and antibody-directed carriers](https://onco.cc/terms/ferroptosis-conjugate-payloads/) | [FGFR4 conjugate carrying sulfasalazine (2025)](https://doi.org/10.1016/j.isci.2025.113718); [Antibody nanogel delivery of a ferroptosis inducer (2024)](https://doi.org/10.1016/j.chembiol.2024.10.014) |
| [Protein toxin payloads and immunotoxins](https://onco.cc/terms/protein-toxin-payloads/) | [DeBouganin conjugates and fusion proteins in resistant cells (2016)](https://doi.org/10.3390/molecules21121741) |

The OnCo routes above are intended destinations after merge and deployment; they were not live at capture time.

## Evidence boundaries retained

- Distinct targets: the surface antigen directs delivery; the intracellular payload target controls what happens after delivery.
- Distinct formats: bispecific targeting, two different payloads on one antibody, and separate-drug combinations are not interchangeable.
- Distinct cellular processes: transcription, RNA splicing, translation termination, protein degradation and proteasome inhibition remain separate.
- Distinct chemistry: SC209 is a released hemiasterlin cytotoxin; SC239 is its linker-warhead. IGN/PDD mono-alkylators are not assigned PBD crosslinking. KSP inhibitors and KIF11 degraders are not tubulin-binding payloads.
- Distinct evidence: cell assays, xenografts, animal toxicology, conference abstracts, trial designs and human activity reports retain their setting. No response percentages, survival comparisons or clinical post-TOP1 benefit claims were added.
- Negative evidence: the carfilzomib conjugate study lost potency after lysosomal inactivation. Terminated GSPT1/STING/TLR program trials remain visible. The reason for a terminated trial is not inferred from its status.
- Adjacent delivery: sulfasalazine was directly conjugated to an FGFR4 antibody; IKE was encapsulated in an antibody-directed nanogel; deBouganin was delivered as a conjugate or fusion protein. Neither is silently treated as a conventional small-molecule ADC.

The uPAR anthracycline paper has a transposed payload identifier in its indexed abstract. Its primary full-text Results identify PNU-159682; the authored concept follows the body. The [identity note](primary/anthracycline-identity-note.json) records the location and full-text response hash.

## Reconciliation and custody

- [Concept/source ledger](concept-source-ledger.json): exact resolved titles, identifiers and source captures for every added concept.
- [Paper dispositions](paper-dispositions.json): every Elicit paper result, including existing records and discoveries not used for facts.
- [Trial dispositions](trial-dispositions.json): every directly captured trial and all semantic NCT results, reconciled to canonical owners where present.
- [Registry capture manifest](registry/manifest.json) and [supplement](registry-supplement/manifest.json): full raw pages, complete pagination and SHA-256 hashes.
- [Primary capture manifest](primary/manifest.json): resolver URLs, saved times and raw-response hashes.
- [Artifact hashes](sha256.json): saved discovery/source artifacts.

## Remaining schema work

The five-class comparison registry still requires boolean permeability and other values that many experimental payload studies do not report. These concepts enter the existing glossary and graph without filling those unknown fields with guessed measurements. Multiple structured payload identities, measured-property uncertainty, construct-specific loading and assertion-level evidence are still separate schema work. No schema or product behavior is changed here.

## Unresolved scope

PARP/WEE1 combination papers did not establish attached PARP/WEE1 payloads in this search. They are not promoted into supported payload classes. Proprietary or patent-only claims without a resolved supporting abstract remain outside the new factual records. This is broad mechanism coverage within a declared search boundary, not a census of all global programs.
