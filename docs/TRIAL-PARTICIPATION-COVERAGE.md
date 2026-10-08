# Trial participation coverage

Repository growth, build/deployment costs and browser loading behavior are measured in [Trial participation: repository size and build impact](TRIAL-PARTICIPATION-SIZE.md).

Captured 25,407 of 25,408 explicit ClinicalTrials.gov identifiers across 6,021 canonical trials and 33,950 drug-linked snapshot rows. 53 ISRCTN registry snapshots cover 55 canonical records. In total, 5935 canonical records have captured participation data; 86 remain named gaps.

| Field | Studies |
|---|---:|
| Eligibility text | 25407 |
| Lead sponsor | 25407 |
| Locations | 23329 |
| Recruiting overall | 5407 |
| Not returned by registry | 1 |
| Fetch unresolved | 0 |

Each `public/trial-participation/studies/NCT*.json` preserves the requested registry modules, with a retrieval timestamp, source URLs, attribution and SHA-256 of the stored study. Eligibility includes the complete posted inclusion/exclusion text, ages, sex and healthy-volunteer rules. Study metadata includes lead sponsor and collaborators, recruitment status and stop reasons, facility/city/state/postcode/country/site status/coordinates, conditions, summaries, treatment arms and interventions, design and enrolment, primary/secondary outcomes and their time frames, start/completion dates and registry update dates.

Overall recruitment does not establish that a particular site or cohort is open. Missing site status is recorded as missing. Criteria are verbatim and are not an automated eligibility decision. Biomarker, prior-treatment, organ-function, performance-status, washout and visit requirements may be embedded in that text; they are not inferred when unstated. Costs, travel support, available slots and cohort availability need confirmation with the study team. Use the source record's Contacts and Locations section for current contacts; investigator names, emails and phone numbers are excluded from these captures under the repository's data-source policy, including the few a registry typed into a site's name.

The manifest `public/trial-participation/index.json` maps canonical record IDs and drug snapshots to studies, lists missing registry fields, records retrieval failures separately from registry omissions, and lists sponsor wording differences for review. Corpus sponsors are preserved; a name difference is not treated as an error. Small references on canonical trial records point to these separate snapshots so the full locations and eligibility do not enlarge every page's hydration payload.

## Records without an explicit ClinicalTrials.gov identifier

These records were inventoried, but no ClinicalTrials.gov identifier was guessed. Some are historical trials, combined programmes or meta-analyses; existing alternate-registry/publication links are retained for follow-up.

| Record | Name | Existing sources |
|---|---|---|
| abc-07 | ABC-07 | [source](https://www.isrctn.com/ISRCTN10639376); [source](https://doi.org/10.1016/j.clon.2025.103993); [source](https://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/a-trial-looking-chemotherapy-stereotactic-radiotherapy-people-locally-advanced-bile-duct-cancer-abc-07) |
| abc-12 | ABC-12 | [source](https://www.isrctn.com/ISRCTN11210442); [source](https://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial/a-study-determine-whether-number-types-bacteria-gut-affects-how-well-treatment-works-bile-duct-cancer-abc-12) |
| ace-breast-02 | ACE-Breast-02 | [source](https://pubmed.ncbi.nlm.nih.gov/39956849/) |
| almanac | ALMANAC (Axillary Lymphatic Mapping Against Nodal Axillary Clearance) | [source](https://doi.org/10.1093/jnci/djj158) |
| ample | AMPLE | [source](https://doi.org/10.1001/jama.2017.17426) |
| angiotax | ANGIOTAX | [source](https://doi.org/10.1200/JCO.2008.17.3146) |
| anita | ANITA (Adjuvant Navelbine International Trialist Association) | [source](https://doi.org/10.1016/S1470-2045(06)70804-X); [source](https://www.isrctn.com/ISRCTN95053737) |
| artistic-meta-analysis | ARTISTIC meta-analysis | [source](https://doi.org/10.1016/S0140-6736(20)31952-8); [source](https://www.crd.york.ac.uk/PROSPERO/view/132669) |
| ascot-jcog1202 | ASCOT (JCOG1202) | [source](https://doi.org/10.1016/S0140-6736(22)02038-4); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000013644) |
| avf2107g | AVF2107g | [source](https://doi.org/10.1056/NEJMoa032691); [source](https://www.ema.europa.eu/en/medicines/human/EPAR/avastin); [source](https://www.nice.org.uk/guidance/ta1136) |
| best-bra | Best-BRA | [source](https://www.isrctn.com/ISRCTN10081873); [source](https://doi.org/10.1136/bmjopen-2021-050886) |
| big-lung-trial | Big Lung Trial | [source](https://europepmc.org/article/MED/15454647); [source](https://europepmc.org/article/MED/15200998); [source](https://europepmc.org/article/MED/10817793) |
| cadance-304 | CaDAnCe-304 | [source](https://ashpublications.org/blood/article/146/Supplement%201/5691/550156/CaDAnCe-304-a-phase-3-open-label-randomized-study) |
| calgb-9343 | CALGB 9343 | [source](https://doi.org/10.1056/NEJMoa040587); [source](https://doi.org/10.1200/JCO.2012.45.2615) |
| cao-aro-aio-94 | CAO/ARO/AIO-94 (German Rectal Cancer Study) | [source](https://doi.org/10.1056/NEJMoa040694); [source](https://doi.org/10.1200/JCO.2011.40.1836) |
| capp2 | CAPP2 | [source](https://www.isrctn.com/ISRCTN59521990) |
| chart-lung | CHART | [source](https://europepmc.org/article/MED/9250182); [source](https://europepmc.org/article/MED/10577699) |
| circulate-japan | CIRCULATE-Japan (GALAXY / VEGA / ALTAIR) | [source](https://www.nature.com/articles/s41591-022-02115-4); [source](https://doi.org/10.1038/s41591-026-04428-0) |
| conko-001 | CONKO-001 | [source](https://www.isrctn.com/ISRCTN34802808) |
| conko-005 | CONKO-005 | [source](https://doi.org/10.1200/JCO.2017.72.6463); [source](https://doi.org/10.1097/COC.0000000000000633) |
| create-x | CREATE-X | [source](https://doi.org/10.1056/NEJMoa1612645); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000000989) |
| crest-thoracic-rt | CREST: consolidation thoracic radiotherapy in extensive-stage small-cell lung cancer | [source](https://doi.org/10.1016/S0140-6736(14)61085-0); [source](https://onderzoekmetmensen.nl/en/trial/21669) |
| cross | CROSS | [source](https://www.nejm.org/doi/full/10.1056/NEJMoa1112088); [source](https://ascopubs.org/doi/10.1200/JCO.20.03614) |
| dahanca-5 | DAHANCA 5 | [source](https://doi.org/10.1016/S0167-8140(97)00220-X) |
| dbcg-82bc | DBCG 82b and 82c | [source](https://doi.org/10.1056/NEJM199710023371401) |
| dutch-bone-metastasis-study | Dutch Bone Metastasis Study | [source](https://doi.org/10.1016/j.ijrobp.2003.10.006) |
| dutch-tme-trial | Dutch TME trial | [source](https://doi.org/10.1056/NEJMoa010580) |
| dynamic | DYNAMIC | [source](https://www.nejm.org/doi/full/10.1056/NEJMoa2200075) |
| dynamic-iii | DYNAMIC-III | [source](https://doi.org/10.1038/s41591-025-04030-w); [source](https://www.anzctr.org.au/Trial/Registration/TrialReview.aspx?id=374135) |
| enrich | ENRICH | [source](https://doi.org/10.1016/S0140-6736(25)01432-1); [source](https://www.clinicaltrialsregister.eu/ctr-search/search?query=2015-000832-13) |
| slotman-pci-es-sclc | EORTC 08993 (Slotman): prophylactic cranial irradiation in extensive-stage small-cell lung cancer | [source](https://doi.org/10.1056/NEJMoa071780) |
| eortc-10801 | EORTC 10801 | [source](https://doi.org/10.1016/S1470-2045(12)70042-6) |
| eortc-26951 | EORTC 26951 | [source](https://doi.org/10.1200/JCO.2012.43.2229) |
| erspc | ERSPC (European Randomized Study of Screening for Prostate Cancer) | [source](https://doi.org/10.1056/NEJMoa0810084); [source](https://doi.org/10.1016/j.eururo.2019.02.009); [source](https://www.isrctn.com/ISRCTN49127736) |
| espac-1 | ESPAC-1 | [source](https://doi.org/10.1056/NEJMoa032295) |
| espac-5 | ESPAC-5 | [source](https://doi.org/10.1016/S2468-1253(22)00348-X); [source](https://www.isrctn.com/ISRCTN89500674) |
| europac | EUROPAC | [source](https://www.isrctn.com/ISRCTN62546421); [source](https://europepmc.org/article/MED/41740463); [source](https://europepmc.org/article/MED/40180412); [source](https://www.pancreaticcancer.org.uk/information-and-support/family-history-of-pancreatic-cancer/) |
| fast-trial | FAST (5-fraction whole-breast radiotherapy) | [source](https://doi.org/10.1200/JCO.19.02750) |
| fast-forward | FAST-Forward | [source](https://www.isrctn.com/ISRCTN19906132); [source](https://doi.org/10.1016/S0140-6736(20)30932-6) |
| first-308 | FIRST-308 | [source](https://www.biospace.com/transthera-announces-the-global-multicenter-phase-3-clinical-trial-completed-first-patient-dosing-in-the-us-evaluating-tinengotinib-in-fgfri-relapsed-refractory-patients-with-cholangiocarcinoma) |
| focus4 | FOCUS4 | [source](https://www.isrctn.com/ISRCTN90061546); [source](https://doi.org/10.1200/JCO.21.01435); [source](https://doi.org/10.1200/JCO.21.01436); [source](https://doi.org/10.3310/HTNB6908); [source](https://doi.org/10.1177/17407745211069879) |
| funen-fob | Funen faecal occult blood screening trial | [source](https://doi.org/10.1016/S0140-6736(96)03430-7) |
| gefitinib-chemo-tmh | Gefitinib vs gefitinib plus pemetrexed-carboplatin in EGFR-mutant lung cancer (Tata Memorial) | [source](https://doi.org/10.1200/JCO.19.01154) |
| goteborg-2 | GÖTEBORG-2 (MRI-based prostate cancer screening) | [source](https://doi.org/10.1056/NEJMoa2209454) |
| hypo-rt-pc | HYPO-RT-PC | [source](https://www.isrctn.com/ISRCTN45905321); [source](https://doi.org/10.1016/S0140-6736(19)31131-6); [source](https://doi.org/10.1016/S0140-6736(19)31131-6); [source](https://doi.org/10.1016/S1470-2045(20)30581-7); [source](https://www.isrctn.com/ISRCTN45905321) |
| i-spy-1 | I-SPY 1 (CALGB 150007/150012, ACRIN 6657) | [source](https://www.ispytrials.org/i-spy-platform/i-spy1); [source](https://ascopubs.org/doi/10.1200/JCO.2011.39.2779) |
| ialt | IALT (International Adjuvant Lung Cancer Trial) | [source](https://doi.org/10.1056/NEJMoa031644) |
| iarc-india-hpv-dose-study | IARC India HPV vaccine dose study (one, two or three doses) | [source](https://doi.org/10.1016/S1470-2045(21)00453-8); [source](https://doi.org/10.1016/S1470-2045(15)00414-3) |
| ibra-study | iBRA (implant Breast Reconstruction evAluation) | [source](https://www.isrctn.com/ISRCTN37664281); [source](https://doi.org/10.1016/S1470-2045(18)30781-2) |
| idea-collaboration | IDEA collaboration | [source](https://doi.org/10.1056/NEJMoa1713709) |
| imagine-varnimcabtagene | IMAGINE (varnimcabtagene autoleucel, Immuneel) | [source](https://doi.org/10.1002/hon.3165_632); [source](https://doi.org/10.1182/blood-2023-181585); [source](https://doi.org/10.1182/blood-2023-181120) |
| impact-bcc | IMPACT (cemiplimab in advanced basal cell carcinoma) | [source](https://www.isrctn.com/ISRCTN10511385) |
| int-0116 | INT-0116 (Macdonald trial) | [source](https://doi.org/10.1056/NEJMoa010187) |
| turrisi-intergroup-0096 | Intergroup 0096 (Turrisi): twice-daily versus once-daily thoracic radiotherapy | [source](https://doi.org/10.1056/NEJM199901283400403) |
| iwwd | International Watch & Wait Database | [source](https://doi.org/10.1016/S0140-6736(18)31078-X); [source](https://www.iwwd.org/) |
| j-alex | J-ALEX | [source](https://doi.org/10.1016/S0140-6736(17)30565-2); [source](https://www.clinicaltrials.jp/) |
| jaspac-01 | JASPAC 01 | [source](https://doi.org/10.1016/S0140-6736(16)30583-9); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000000791); [source](https://doi.org/10.1200/JCO.2012.43.3680) |
| jbr-10 | JBR.10 (NCIC CTG) | [source](https://doi.org/10.1056/NEJMoa043623) |
| jcog0403 | JCOG0403 | [source](https://doi.org/10.1016/j.ijrobp.2015.07.2278) |
| jcog0802 | JCOG0802 / WJOG4607L | [source](https://doi.org/10.1016/S2213-2600(23)00382-X); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000002300) |
| jrosg-99-1 | JROSG 99-1 (Aoyama): stereotactic radiosurgery with or without whole-brain radiotherapy | [source](https://doi.org/10.1001/jama.295.21.2483); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000000496) |
| kerala-oral-screening | Kerala oral cancer visual screening trial (Trivandrum) | [source](https://doi.org/10.1016/S0140-6736(05)66658-5); [source](https://doi.org/10.1016/j.oraloncology.2012.11.004) |
| lace-pooled-analysis | LACE (Lung Adjuvant Cisplatin Evaluation) pooled analysis | [source](https://doi.org/10.1200/JCO.2007.13.9030) |
| low-dose-nivolumab-tmh | Low-dose nivolumab plus metronomic chemotherapy (Tata Memorial) | [source](https://doi.org/10.1200/JCO.22.01015) |
| olanzapine-appetite-tmh | Low-dose olanzapine for cancer anorexia (Tata Memorial) | [source](https://doi.org/10.1200/JCO.22.01997) |
| majic-et | MAJIC-ET | [source](https://www.isrctn.com/ISRCTN61925716) |
| majic-pv | MAJIC-PV | [source](https://www.isrctn.com/ISRCTN61925716); [source](https://doi.org/10.1200/JCO.22.01935) |
| mroc | Mastectomy Reconstruction Outcomes Consortium (MROC) | [source](https://doi.org/10.1001/jamasurg.2018.1677); [source](https://doi.org/10.1001/jamasurg.2018.1687) |
| mercury | MERCURY | [source](https://europepmc.org/article/MED/16984925) |
| metro-plus-varanasi | METRO PLUS (Tata Memorial Centre, Varanasi) | [source](https://doi.org/10.1200/GO-25-00721) |
| milan-i | Milan I (quadrantectomy against radical mastectomy) | [source](https://doi.org/10.1056/NEJMoa020989) |
| minnesota-fob | Minnesota Colon Cancer Control Study | [source](https://doi.org/10.1056/NEJM199305133281901) |
| mohs-versus-excision-facial-bcc | Mohs surgery against ordinary excision for facial basal cell carcinoma (Maastricht trial) | [source](https://www.isrctn.com/ISRCTN65009900); [source](https://doi.org/10.1016/S1470-2045(08)70260-2); [source](https://doi.org/10.1016/j.ejca.2014.08.018); [source](https://pubmed.ncbi.nlm.nih.gov/25262378/) |
| molemate | MoleMate UK Trial | [source](https://doi.org/10.1136/bmj.e4110); [source](https://www.isrctn.com/ISRCTN79932379) |
| mumbai-via-screening | Mumbai VIA cervical screening trial (Tata Memorial) | [source](https://doi.org/10.1093/jnci/dju009) |
| national-polyp-study | National Polyp Study | [source](https://doi.org/10.1056/NEJMoa1100370) |
| netherlands-hipec | Netherlands Cancer Institute HIPEC trial | [source](https://doi.org/10.1200/JCO.2003.04.187) |
| nottingham-fob | Nottingham faecal occult blood screening trial | [source](https://europepmc.org/article/MED/8942775); [source](https://www.isrctn.com/ISRCTN11631712) |
| nsabp-b04 | NSABP B-04 | [source](https://doi.org/10.1056/NEJMoa020128) |
| nsabp-b06 | NSABP B-06 | [source](https://doi.org/10.1056/NEJMoa022152) |
| metronomic-vs-cisplatin-tmh | Oral metronomic chemotherapy vs intravenous cisplatin (Tata Memorial) | [source](https://doi.org/10.1016/S2214-109X(20)30275-8) |
| osmanabad-hpv-screening | Osmanabad cervical screening trial (HPV testing vs cytology vs VIA) | [source](https://doi.org/10.1056/NEJMoa0808516) |
| lidocaine-peritumoral-tmh | Peritumoral lidocaine before breast cancer surgery (Tata Memorial) | [source](https://doi.org/10.1200/JCO.22.01966) |
| mal-pdt-versus-cryotherapy-superficial-bcc | Photodynamic therapy against cryotherapy for superficial basal cell carcinoma | [source](https://pubmed.ncbi.nlm.nih.gov/18693158/) |
| mal-pdt-imiquimod-fluorouracil-superficial-bcc | Photodynamic therapy against imiquimod against fluorouracil for superficial basal cell carcinoma | [source](https://www.isrctn.com/ISRCTN79701845); [source](https://doi.org/10.1016/S1470-2045(13)70143-8); [source](https://doi.org/10.1016/j.jid.2017.09.033); [source](https://pubmed.ncbi.nlm.nih.gov/29045820/) |
| mal-pdt-versus-surgery-nodular-bcc | Photodynamic therapy against surgery for nodular basal cell carcinoma | [source](https://doi.org/10.1001/archderm.140.1.17); [source](https://doi.org/10.1001/archderm.143.9.1131); [source](https://pubmed.ncbi.nlm.nih.gov/17875873/); [source](https://doi.org/10.1016/j.pdpdt.2025.104702) |
| pre-bra | Pre-BRA (pre-pectoral breast reconstruction evaluation) | [source](https://www.isrctn.com/ISRCTN11898000); [source](https://doi.org/10.1093/bjs/znac077); [source](https://doi.org/10.1093/bjs/znaf032) |
| precision-panc | Precision-Panc | [source](https://www.isrctn.com/ISRCTN14879538); [source](https://europepmc.org/article/MED/39833722) |
| prehab-trial | PREHAB: multimodal prehabilitation before colorectal cancer surgery | [source](https://doi.org/10.1001/jamasurg.2023.0198) |
| preopanc | PREOPANC-1 | [source](https://doi.org/10.1200/JCO.19.02274); [source](https://doi.org/10.1200/JCO.21.02233) |
| preopanc-2 | PREOPANC-2 | [source](https://doi.org/10.1016/S1470-2045(25)00363-8); [source](https://www.clinicaltrialsregister.eu/ctr-search/search?query=2017-002036-17) |
| prime-ii | PRIME II | [source](https://www.isrctn.com/ISRCTN95889329); [source](https://doi.org/10.1056/NEJMoa2207586) |
| pci-overview-1999 | Prophylactic Cranial Irradiation Overview (Auperin meta-analysis) | [source](https://doi.org/10.1056/NEJM199908123410703) |
| propsma | proPSMA | [source](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30314-7/fulltext) |
| mcc-rational-treatment | Rational treatment selection for Merkel cell carcinoma | [source](https://www.isrctn.com/ISRCTN16290169) |
| reliance | RELIANCE | [source](https://doi.org/10.1002/cam4.3686) |
| rtog-91-11 | RTOG 91-11 | [source](https://doi.org/10.1056/NEJMoa031317) |
| rtog-9202 | RTOG 92-02 | [source](https://doi.org/10.1200/JCO.2007.14.9021) |
| scc-after | SCC-AFTER | [source](https://www.isrctn.com/ISRCTN54806122) |
| progesterone-preop-tmh | Single-injection depot progesterone before breast surgery (Tata Memorial) | [source](https://doi.org/10.1200/JCO.2010.33.0738) |
| smile-enktl | SMILE | [source](https://doi.org/10.1200/JCO.2011.35.6287) |
| spcg-4 | SPCG-4 (Scandinavian Prostate Cancer Group Study 4) | [source](https://doi.org/10.1056/NEJMoa1807801) |
| spcg-7 | SPCG-7/SFUO-3 | [source](https://www.isrctn.com/ISRCTN01534787); [source](https://doi.org/10.1016/S0140-6736(08)61815-2) |
| spot-it | SPOT-IT | [source](https://www.isrctn.com/ISRCTN80116429) |
| avril-surgery-versus-radiotherapy-bcc | Surgery against radiotherapy for basal cell carcinoma of the face | [source](https://doi.org/10.1038/bjc.1997.343); [source](https://pubmed.ncbi.nlm.nih.gov/9218740/); [source](https://doi.org/10.1097/00006534-200006000-00039) |
| swedish-rectal-cancer-trial | Swedish Rectal Cancer Trial | [source](https://doi.org/10.1056/NEJM199704033361402) |
| swog-8794 | SWOG 8794 | [source](https://doi.org/10.1016/j.juro.2008.11.032) |
| takahashi-pci | Takahashi trial: prophylactic cranial irradiation with MRI surveillance in extensive-stage small-cell lung cancer | [source](https://doi.org/10.1016/S1470-2045(17)30230-9) |
| talicel-phase-1-2 | Talicabtagene autoleucel (NexCAR19) phase 1/2 | [source](https://doi.org/10.1016/S2352-3026(24)00377-6) |
| targeted-axillary-dissection-md-anderson | Targeted axillary dissection (MD Anderson prospective study) | [source](https://doi.org/10.1200/JCO.2015.64.0094) |
| tax-327 | TAX 327 | [source](https://doi.org/10.1056/NEJMoa040720); [source](https://www.nice.org.uk/guidance/ta101) |
| time2 | TIME2 | [source](https://doi.org/10.1001/jama.2012.5535); [source](https://www.isrctn.com/ISRCTN87514420) |
| transform-prostate | TRANSFORM | [source](https://www.isrctn.com/ISRCTN13801649); [source](https://prostatecanceruk.org/research/transform-trial); [source](https://view-health-screening-recommendations.service.gov.uk/review/prostate-cancer-screening-modelling-report-2025/download-documents/cover_sheet/) |
| triumph | TRIUMPH | [source](https://doi.org/10.1038/s41591-021-01553-w); [source](https://doi.org/10.1016/j.esmoop.2026.107734); [source](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000031949) |
| ukfss | UK Flexible Sigmoidoscopy Screening Trial | [source](https://europepmc.org/article/MED/20430429); [source](https://europepmc.org/article/MED/28236467); [source](https://www.isrctn.com/ISRCTN28352761) |
| ukls | UKLS | [source](https://europepmc.org/article/MED/27224642); [source](https://europepmc.org/article/MED/34806061); [source](https://www.isrctn.com/ISRCTN78513845) |
| xm01-22 | XM01-22 | [source](https://www.isrctn.com/ISRCTN08063129); [source](https://doi.org/10.1111/j.1753-5174.2011.00035.x); [source](https://www.ema.europa.eu/en/medicines/human/EPAR/eporatio) |
| xm22-03 | XM22-03 | [source](https://doi.org/10.1186/1471-2407-13-386); [source](https://www.ema.europa.eu/en/medicines/human/EPAR/lonquex) |
| ylst | YLST | [source](https://europepmc.org/article/MED/35777775); [source](https://europepmc.org/article/MED/39709114); [source](https://europepmc.org/article/MED/38636970); [source](https://www.isrctn.com/ISRCTN42704678) |

## Alternate registry captures

ISRCTN snapshots preserve posted inclusion and exclusion wording, participant rules, sponsors, funders, countries and centres, intervention/design descriptions, outcomes, recruitment dates and update timestamps. Their licence and source are recorded in each capture. A registry-declared NCT cross-reference is recorded with its source before it is added to the fetch inventory. Dates are not used to infer current recruitment. Other registries are audited for access and identity; unverified redistribution licences remain named gaps.

## Source identity mismatches

These linked pages return a different registry identifier from the one named in the original source label. Their criteria were not attached to the canonical trial. The source links have been corrected; the original mismatch audits are retained here.

| Record | Intended identifier | Returned identifier | Returned title | Source |
|---|---|---|---|---|
| ascot-jcog1202 | UMIN000011688 | UMIN000011702 | NEuromuscular pathology in CRitically ill patients: an autOPSY Study "NECROPSY Study" | [registry](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000013683) |
| create-x | UMIN000000843 | UMIN000000835 | not found | [registry](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000001004) |
| jaspac-01 | UMIN000000655 | UMIN000000665 | not found | [registry](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000000794) |
| jcog0802 | UMIN000002317 | UMIN000002300 | not found | [registry](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000002809) |
| triumph | UMIN000027887 | UMIN000027829 | not found | [registry](https://center6.umin.ac.jp/cgi-open-bin/ctr_e/ctr_view.cgi?recptno=R000031885) |

## Registry identifiers not returned

- [NCT02475097](https://clinicaltrials.gov/study/NCT02475097)

## Unresolved fetches
