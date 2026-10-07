import type { EntityInput } from "@/lib/schema";

/** Primary-source additions. Trial phase does not establish benefit or approval. */
export const parpSelectiveReview: EntityInput[] = [
  {
    "id": "eik1004",
    "kind": "drug",
    "name": "EIK1004",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "EIK1004 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective inhibitor, also called IMP1707. The sponsor describes CNS penetration as a development feature. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "PARP1-selective inhibitor, also called IMP1707. The sponsor describes CNS penetration as a development feature.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06907043"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06907043",
        "url": "https://clinicaltrials.gov/study/NCT06907043"
      },
      {
        "label": "Primary EIK1004 clinical abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2026-ct287"
      }
    ],
    "aka": [
      "IMP1707"
    ],
    "cancers": []
  },
  {
    "id": "hrs-1167",
    "kind": "drug",
    "name": "HRS-1167",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "HRS-1167 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective inhibitor, licensed as M9466. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. Merck KGaA reports discontinuing its M9466 development in its 2025 annual report. That sponsor decision does not mean the separate Hengrui studies have all stopped.",
    "mechanism": "PARP1-selective inhibitor, licensed as M9466.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06689163",
      "nct06719973",
      "nct06568094",
      "nct06509906",
      "nct06421935",
      "nct06516289",
      "nct06308406",
      "nct05473624"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06689163",
        "url": "https://clinicaltrials.gov/study/NCT06689163"
      },
      {
        "label": "ClinicalTrials.gov NCT06719973",
        "url": "https://clinicaltrials.gov/study/NCT06719973"
      },
      {
        "label": "ClinicalTrials.gov NCT06568094",
        "url": "https://clinicaltrials.gov/study/NCT06568094"
      },
      {
        "label": "ClinicalTrials.gov NCT06509906",
        "url": "https://clinicaltrials.gov/study/NCT06509906"
      },
      {
        "label": "ClinicalTrials.gov NCT06421935",
        "url": "https://clinicaltrials.gov/study/NCT06421935"
      },
      {
        "label": "ClinicalTrials.gov NCT06516289",
        "url": "https://clinicaltrials.gov/study/NCT06516289"
      },
      {
        "label": "ClinicalTrials.gov NCT06308406",
        "url": "https://clinicaltrials.gov/study/NCT06308406"
      },
      {
        "label": "ClinicalTrials.gov NCT05473624",
        "url": "https://clinicaltrials.gov/study/NCT05473624"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://doi.org/10.1200/JCO.2024.42.16_suppl.3154"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://reports.emdgroup.com/en/annualreport/2025/management-report/fundamental-information-about-the-group/research-and-development/healthcare.html"
      }
    ],
    "aka": [
      "M9466"
    ],
    "cancers": [
      "breast-cancer",
      "ovarian"
    ]
  },
  {
    "id": "nms-03305293",
    "kind": "drug",
    "name": "NMS-03305293",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-2",
    "asOf": "2026-10-06",
    "tldr": "NMS-03305293 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "PARP1-selective, brain-penetrant inhibitor, also called NMS-293. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. The monotherapy study NCT04182516 stopped after 52 actual participants because the sponsor shifted towards combinations, explicitly not because of emerging safety or efficacy concerns. Combination studies include temozolomide and topotecan.",
    "mechanism": "PARP1-selective, brain-penetrant inhibitor, also called NMS-293.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06931626",
      "nct04910022",
      "nct06930755",
      "nct04182516"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06931626",
        "url": "https://clinicaltrials.gov/study/NCT06931626"
      },
      {
        "label": "ClinicalTrials.gov NCT04910022",
        "url": "https://clinicaltrials.gov/study/NCT04910022"
      },
      {
        "label": "ClinicalTrials.gov NCT06930755",
        "url": "https://clinicaltrials.gov/study/NCT06930755"
      },
      {
        "label": "ClinicalTrials.gov NCT04182516",
        "url": "https://clinicaltrials.gov/study/NCT04182516"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://doi.org/10.1158/1535-7163.targ-23-lb_a12"
      }
    ],
    "aka": [
      "NMS-293"
    ],
    "cancers": [
      "sclc",
      "ovarian"
    ]
  },
  {
    "id": "gs-0201",
    "kind": "drug",
    "name": "GS-0201",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "GS-0201 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "Gilead describes GS-0201 as a PARP1 inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. NCT06167317 is recruiting and tests GS-0201 alone and with sacituzumab govitecan, connecting PARP dependency with TROP-2-directed delivery.",
    "mechanism": "Gilead describes GS-0201 as a PARP1 inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06167317"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06167317",
        "url": "https://clinicaltrials.gov/study/NCT06167317"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://www.gilead.com/science/pipeline"
      }
    ],
    "aka": [],
    "cancers": []
  },
  {
    "id": "hs-10502",
    "kind": "drug",
    "name": "HS-10502",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "HS-10502 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "The registry describes HS-10502 as a PARP1-specific selective inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "The registry describes HS-10502 as a PARP1-specific selective inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct05740956",
      "nct06769425"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05740956",
        "url": "https://clinicaltrials.gov/study/NCT05740956"
      },
      {
        "label": "ClinicalTrials.gov NCT06769425",
        "url": "https://clinicaltrials.gov/study/NCT06769425"
      }
    ],
    "aka": [],
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic",
      "colorectal",
      "tnbc",
      "gastric"
    ]
  },
  {
    "id": "snv1521",
    "kind": "drug",
    "name": "SNV1521",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "SNV1521 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "Synnovation describes SNV1521 as a PARP1-selective inhibitor. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval.",
    "mechanism": "Synnovation describes SNV1521 as a PARP1-selective inhibitor.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct07756281",
      "nct06220864"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07756281",
        "url": "https://clinicaltrials.gov/study/NCT07756281"
      },
      {
        "label": "ClinicalTrials.gov NCT06220864",
        "url": "https://clinicaltrials.gov/study/NCT06220864"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://www.synnovationtx.com/news/parp1-fip-pressrelease"
      }
    ],
    "aka": [],
    "cancers": [
      "pancreatic"
    ]
  },
  {
    "id": "dsb2455",
    "kind": "drug",
    "name": "DSB2455",
    "modality": "Small-molecule PARP1 inhibitor",
    "status": "phase-1",
    "asOf": "2026-10-06",
    "tldr": "DSB2455 is an experimental pill being studied to block a DNA-repair enzyme in cancer cells.",
    "summary": "The registry describes DSB2455 as a PARP1-selective inhibitor; the sponsor describes CNS activity. The linked registry records distinguish recruiting, closed, and discontinued studies; those states do not establish comparative efficacy or approval. The sponsor reports FDA Fast Track designation for HRR-altered TNBC brain metastases. Fast Track is a development designation, not marketing approval.",
    "mechanism": "The registry describes DSB2455 as a PARP1-selective inhibitor; the sponsor describes CNS activity.",
    "targets": [
      "parp"
    ],
    "trials": [
      "nct06458712"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06458712",
        "url": "https://clinicaltrials.gov/study/NCT06458712"
      },
      {
        "label": "Primary publication or sponsor source",
        "url": "https://dukestbio.com/duke-street-bio-fda-fast-track-dsb2455/"
      }
    ],
    "aka": [],
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic"
    ]
  },
  {
    "id": "nct06167317",
    "kind": "trial",
    "name": "Study of GS-0201 Alone and in Combination in Participants With Advanced Solid Tumors",
    "nct": "NCT06167317",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1 Study to Evaluate the Safety and Tolerability of GS-0201 as Monotherapy and in Combination in Adults With Advanced Solid Tumors",
    "sponsor": "Gilead Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06167317 as recruiting, last updated 2026-08-13. Enrolment is 278 planned participants, an estimate. Interventions: GS-0201, Sacituzumab Govitecan. Primary measures include The Number of Participants with Dose Limiting Toxicities (DLTs) During Dose Escalation; The Percentage of Participants with Adverse Events (AEs) and Serious Adverse Events (SAEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp",
      "trop2"
    ],
    "drugs": [
      "gs-0201",
      "sacituzumab-govitecan"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06167317",
        "url": "https://clinicaltrials.gov/study/NCT06167317"
      }
    ],
    "status": "recruiting",
    "started": "2024-01-09",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06931626",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Adult Patient With Relapsed Small Cell Lung Cancer",
    "nct": "NCT06931626",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Study of NMS-03305293, a Non-Trapping PARP1-Specific PARP Inhibitor in Relapsed Small Cell Lung Cancer",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06931626 as recruiting, last updated 2026-07-24. Enrolment is 10 planned participants, an estimate. Interventions: NMS-03305293, Temozolomide. Primary measures include Number of Participants with Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06931626",
        "url": "https://clinicaltrials.gov/study/NCT06931626"
      }
    ],
    "status": "recruiting",
    "started": "2025-08-15",
    "startedType": "actual",
    "cancers": [
      "sclc"
    ]
  },
  {
    "id": "nct02264678",
    "kind": "trial",
    "name": "Ascending Doses of Ceralasertib in Combination With Chemotherapy and/or Novel Anti Cancer Agents",
    "nct": "NCT02264678",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Modular Phase I, Open-Label, Multicentre Study to Assess the Safety, Tolerability, Pharmacokinetics and Preliminary Anti-tumour Activity of Ceralasertib in Combination With Cytotoxic Chemotherapy and/or DNA Damage Repair/Novel Anti-cancer Agents in Patients With Advanced Solid Malignancies.",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT02264678 as active not recruiting, last updated 2026-07-24. Enrolment is 358 actual participants. Interventions: Administration of ceralasertib, Administration of ceralasertib in combination with olaparib, Administation of ceralasertib in combination with durvalumab, Administration of ceralasertib monotherapy, Administration of ceralasertib and olaparib, Administration of ceralasertib and durvalumab, Administration of ceralasertib in combination with AZD5305, Administration of ceralasertib in combination with carboplatin. Primary measures include The number of subjects with adverse events/serious adverse events; Module 4 only: Effect of food on ceralasertib absorption by Intensive PK assessments after a single oral dose of ceralasertib (Part A). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT02264678",
        "url": "https://clinicaltrials.gov/study/NCT02264678"
      }
    ],
    "status": "active",
    "enrolled": 358,
    "started": "2014-10-31",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "gastric",
      "nsclc"
    ]
  },
  {
    "id": "nct07711002",
    "kind": "trial",
    "name": "Saruparib in Combination With Physician's Choice of ARPI in Patients With mHSPC Previously Treated With Docetaxel or 177Lu-PSMA Therapy Without Disease Progression and PSA \u2265 0.2 ng/mL (EvoPAR-PR05)",
    "nct": "NCT07711002",
    "phase": "3",
    "asOf": "2026-10-06",
    "setting": "A Randomized, Double-Blind, Placebo-Controlled, 2-Cohort, Phase III Study of Saruparib Combined With Physician's Choice of Androgen Receptor Pathway Inhibitor in Patients With Metastatic Hormone-Sensitive Prostate Cancer, Previously Treated With Docetaxel or PSMA-directed 177Lutetium-Containing Therapy Without Disease Progression, and With Prostate-Specific Antigen \u2265 0.2 ng/mL: EvoPAR-Prostate05",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07711002 as not yet recruiting, last updated 2026-07-17. Enrolment is 1330 planned participants, an estimate. Interventions: Saruparib, Placebo, Enzalutamide, Darolutamide, Abiraterone. Primary measures include Radiographic progression-free survival (rPFS). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07711002",
        "url": "https://clinicaltrials.gov/study/NCT07711002"
      }
    ],
    "status": "planned",
    "started": "2026-10-01",
    "startedType": "estimated",
    "cancers": [
      "prostate"
    ]
  },
  {
    "id": "nct06719973",
    "kind": "trial",
    "name": "Phase 1 Study of M9466 Combined With Carboplatin and Platinum-based Anticancer Therapy (DDRiver 521)",
    "nct": "NCT06719973",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study of the PARP1 Inhibitor M9466 in Combination With Carboplatin and Platinum-based Anticancer Therapy (DDRiver 521)",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is withdrawn.",
    "summary": "The registry lists NCT06719973 as withdrawn, last updated 2025-06-17. Enrolment is 0 actual participants. Interventions: M9466, Carboplatin, Etoposide, Atezolizumab, M9446. Primary measures include Module 1 and Module 2: Number of Participants with Treatment-Emergent Adverse Events (TEAEs) and Treatment Related TEAEs; Module 1 and Module 2: Number of Participants with Dose-limiting Toxicity (DLT). The registry reason for stopping is: Study was terminated due to decision made not to proceed with the clinical trial DDRiver 521, that has not yet commenced enrolment, for strategic reasons. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06719973",
        "url": "https://clinicaltrials.gov/study/NCT06719973"
      }
    ],
    "status": "withdrawn",
    "enrolled": 0,
    "started": "2025-05-14",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct04550104",
    "kind": "trial",
    "name": "A Platform Study of Novel Agents in Combination With Radiotherapy in NSCLC",
    "nct": "NCT04550104",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Platform Study of DNA Damage Response Inhibitors in Combination With Conventional Radiotherapy in Non Small Cell Lung Cancer",
    "sponsor": "University of Leeds",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT04550104 as recruiting, last updated 2025-12-19. Enrolment is 200 planned participants, an estimate. Interventions: Radiotherapy, Olaparib Oral Tablet [Lynparza], AZD1390, Ceralasertib, AZD5305, Durvalumab. Primary measures include Dose limiting Toxicities. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04550104",
        "url": "https://clinicaltrials.gov/study/NCT04550104"
      }
    ],
    "status": "recruiting",
    "started": "2021-03-17",
    "startedType": "actual",
    "cancers": [
      "nsclc"
    ]
  },
  {
    "id": "nct07060365",
    "kind": "trial",
    "name": "A Master Protocol Study to Investigate Biomarker-guided Novel Anticancer Agent(s) as Monotherapy or Combination Therapy in Participants With Advanced/Recurrent Ovarian Cancer",
    "nct": "NCT07060365",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "A Master Protocol Phase I/II Study to Investigate Biomarker-Guided Novel Anticancer Agent(s) as Monotherapy or Combination Therapy for the Treatment of Participants With Advanced/Recurrent Ovarian Cancer (Ovarian Platform)",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is withdrawn.",
    "summary": "The registry lists NCT07060365 as withdrawn, last updated 2026-04-03. Enrolment is 0 actual participants. Interventions: Saruparib. Primary measures include Number of participants with treatment-emergent adverse event (TEAEs), serious adverse events (SAEs), and adverse events (AEs) leading to discontinuation. The registry reason for stopping is: The study termination is based on Sponsor decision and is not related to any safety, efficacy or quality concerns. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07060365",
        "url": "https://clinicaltrials.gov/study/NCT07060365"
      }
    ],
    "status": "withdrawn",
    "enrolled": 0,
    "started": "2025-09-02",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct07832630",
    "kind": "trial",
    "name": "Saruparib in HRDsig+ Solid Tumors",
    "nct": "NCT07832630",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "A Phase II Study of Saruparib in Patients With Platinum-Sensitive, HRDsig+ Solid Tumors",
    "sponsor": "Abramson Cancer Center at Penn Medicine",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07832630 as not yet recruiting, last updated 2026-09-22. Enrolment is 124 planned participants, an estimate. Interventions: Saruparib, FoundationOne\u00aeCDx. Primary measures include Best objective response as determined by RECIST v.1.1. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07832630",
        "url": "https://clinicaltrials.gov/study/NCT07832630"
      }
    ],
    "status": "planned",
    "started": "2026-11-01",
    "startedType": "estimated",
    "cancers": []
  },
  {
    "id": "nct06509906",
    "kind": "trial",
    "name": "M9466 in Combination With Topoisomerase 1 Inhibitors-based Regimens in Advanced Solid Tumors and Colorectal Cancer (DDRiver 511)",
    "nct": "NCT06509906",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study to Evaluate the Safety, Tolerability, and Pharmacokinetic/Pharmacodynamic Profile of the PARP1 Inhibitor M9466 in Combination With Topoisomerase 1 Inhibitor-based Regimens in Advanced Solid Tumors and Colorectal Cancer (DDRiver 511)",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is terminated.",
    "summary": "The registry lists NCT06509906 as terminated, last updated 2025-12-18. Enrolment is 3 actual participants. Interventions: M9466, Irinotecan, Folinic acid, Fluorouracil (5-FU), Bevacizumab, Granulocyte colony stimulating factor (G-CSF). Primary measures include Number of Participants with Treatment-Emergent Adverse Events (TEAEs) and Treatment Related TEAEs; Number of Participants with Dose Limiting Toxicity (DLT). The registry reason for stopping is: Sponsor Decision No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06509906",
        "url": "https://clinicaltrials.gov/study/NCT06509906"
      }
    ],
    "status": "withdrawn",
    "enrolled": 3,
    "started": "2024-10-08",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06899061",
    "kind": "trial",
    "name": "Modular Clinical Pharmacology Study to Evaluate the Drug-drug Interaction Potential and Relative Bioavailability of Saruparib",
    "nct": "NCT06899061",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Modular Phase I, Open-label Study to Assess the Safety, Pharmacokinetics, and Drug Interaction Potential and Relative Bioavailability of Saruparib in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT06899061 as active not recruiting, last updated 2026-10-01. Enrolment is 41 actual participants. Interventions: Saruparib, Digoxin, Furosemide, Metformin Hydrochloride, Rosuvastatin, Rabeprazole. Primary measures include Module 1: Area under plasma concentration-time curve from zero extrapolated to infinity (AUCinf) of digoxin, furosemide, metformin and rosuvastatin when dosed alone and in combination with saruparib; Module 1: Area under the plasma concentration curve from zero to the last quantifiable concentration (AUClast) of digoxin, furosemide, metformin and rosuvastatin when dosed alone and in combination with saruparib. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06899061",
        "url": "https://clinicaltrials.gov/study/NCT06899061"
      }
    ],
    "status": "active",
    "enrolled": 41,
    "started": "2025-03-25",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06421935",
    "kind": "trial",
    "name": "M9466 Alone or in Combination in Advanced Solid Tumors (DDriver 501)",
    "nct": "NCT06421935",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open Label, Multicenter, Phase 1 Study to Evaluate the Safety, Tolerability, and Pharmacokinetic/Pharmacodynamic Profile of the PARP1 Inhibitor M9466 Alone or in Combination in Participants With Advanced Solid Tumors",
    "sponsor": "EMD Serono Research & Development Institute, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is active not recruiting.",
    "summary": "The registry lists NCT06421935 as active not recruiting, last updated 2026-09-09. Enrolment is 60 actual participants. Interventions: M9466, Tuvusertib, Abiraterone acetate, Prednisone/Prednisolone. Primary measures include Module 1 Part A1 and Part A2: Number of Participants With Treatment-Emergent Adverse Events (TEAE), and Treatment-related AEs (TRAEs); Module 1 Part A1 and Part A2: Number of Participants with Dose Limiting Toxicity (DLT)-like events. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06421935",
        "url": "https://clinicaltrials.gov/study/NCT06421935"
      }
    ],
    "status": "active",
    "enrolled": 60,
    "started": "2024-08-07",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06516289",
    "kind": "trial",
    "name": "Neoadjuvant Treatment of gBRCA-Mutated HER2-Negative Breast Cancer With HRS-1167 and Famitinib \u00b1 Camrelizumab",
    "nct": "NCT06516289",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "Neoadjuvant Treatment of gBRCA-Mutated HER2-Negative Breast Cancer With HRS-1167 and Famitinib/ HRS-1167, Famitinib and Camrelizumab: A Prospective, Open-label, Multicenter, Phase II Trial",
    "sponsor": "Fudan University",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06516289 as recruiting, last updated 2024-12-12. Enrolment is 130 planned participants, an estimate. Interventions: HRS-1167, Famitinib, Camrelizumab. Primary measures include Safety run-in: Incidence rate of dose-limiting toxicities (DLTs); Safety run-in: adverse events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06516289",
        "url": "https://clinicaltrials.gov/study/NCT06516289"
      }
    ],
    "status": "recruiting",
    "started": "2024-09-30",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct06930755",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Adult Patients With Relapsed Ovarian Cancer",
    "nct": "NCT06930755",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Study of NMS-03305293, a Non-Trapping PARP1-Specific PARP Inhibitor in Relapsed Ovarian Cancer",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06930755 as recruiting, last updated 2026-05-28. Enrolment is 24 planned participants, an estimate. Interventions: NMS-03305293, Topotecan. Primary measures include Number of Participants with Adverse Events (AEs). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06930755",
        "url": "https://clinicaltrials.gov/study/NCT06930755"
      }
    ],
    "status": "recruiting",
    "started": "2026-05-13",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct05938270",
    "kind": "trial",
    "name": "A Study to Investigate the Biological Effects of Saruparib (AZD5305), Darolutamide, and in Combination in Men With Newly Diagnosed Prostate Cancer.",
    "nct": "NCT05938270",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "An Open-label, Randomised, Phase-I, Multi-Centre Study to Investigate the Biological Effects of Saruparib (AZD5305) Alone, Darolutamide Alone, and in Combination Given Prior to Radical Prostatectomy in Men With Newly Diagnosed Prostate Cancer (ASCERTAIN)",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is completed.",
    "summary": "The registry lists NCT05938270 as completed, last updated 2026-06-30. Enrolment is 113 actual participants. Interventions: Saruparib (AZD5305), Darolutamide, No Treatment. Primary measures include Fold change in % \u03b3H2AX positive cells from baseline value in tumour samples. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05938270",
        "url": "https://clinicaltrials.gov/study/NCT05938270"
      }
    ],
    "status": "completed",
    "enrolled": 113,
    "started": "2023-09-21",
    "startedType": "actual",
    "cancers": [
      "prostate"
    ]
  },
  {
    "id": "nct06769126",
    "kind": "trial",
    "name": "Using Biomarker Tests to Select and Test New, Personalized Treatments for Extensive Stage Small Cell Lung Cancer, PRISM Study",
    "nct": "NCT06769126",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "PRISM: PRecIsion in SCLC Via a Multicohort Study: Randomized Phase II Studies Evaluating Maintenance Durvalumab With or Without Biomarker-Directed Therapy for Extensive Stage Small Cell Lung Cancer (ES-SCLC)",
    "sponsor": "SWOG Cancer Research Network",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06769126 as recruiting, last updated 2026-03-30. Enrolment is 900 planned participants, an estimate. Interventions: Biospecimen Collection, Ceralasertib, Computed Tomography, Durvalumab, Etoposide, Magnetic Resonance Imaging, Monalizumab, Platinum Compound, Positron Emission Tomography, Saruparib, Thoracic Radiation Therapy. Primary measures include Screen success rate (Screening); Progression-free survival (PFS) (Cohort A). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06769126",
        "url": "https://clinicaltrials.gov/study/NCT06769126"
      }
    ],
    "status": "recruiting",
    "started": "2025-11-06",
    "startedType": "actual",
    "cancers": [
      "sclc"
    ]
  },
  {
    "id": "nct06308406",
    "kind": "trial",
    "name": "A Phase Ib/II Clinical Study of HRS-1167 in Combination With Bevacizumab in Patients With Recurrent Ovarian Cancer",
    "nct": "NCT06308406",
    "phase": "1/2",
    "asOf": "2026-10-06",
    "setting": "A Phase Ib/II Clinical Study of HRS-1167 in Combination With Bevacizumab in Patients With Recurrent Ovarian Cancer",
    "sponsor": "Jiangsu HengRui Medicine Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is unknown.",
    "summary": "The registry lists NCT06308406 as unknown, last updated 2024-04-11. Enrolment is 54 planned participants, an estimate. Interventions: Bevacizumab\uff1b HRS-1167. Primary measures include The number of subjects with dose-limiting toxicity (DLT); Determination of Recommended Phase II dose (RP2D). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06308406",
        "url": "https://clinicaltrials.gov/study/NCT06308406"
      }
    ],
    "started": "2024-03-15",
    "startedType": "actual",
    "cancers": [
      "ovarian"
    ]
  },
  {
    "id": "nct05573724",
    "kind": "trial",
    "name": "Drug-drug Interaction Study With AZD5305 and Itraconazole in Patients With Advanced Solid Malignancies",
    "nct": "NCT05573724",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Non-randomized, Open-label, Fixed-sequence Phase I Study to Assess the Effect of Itraconazole (a CYP3A4 Inhibitor) on the Pharmacokinetics of AZD5305 in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is completed.",
    "summary": "The registry lists NCT05573724 as completed, last updated 2024-06-18. Enrolment is 16 actual participants. Interventions: AZD5305, Itraconazole. Primary measures include Part A: Area under the concentration-time curve from time zero to infinity (AUCinf); Part A: AUC from time zero to time of last measurable concentration (AUClast). No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05573724",
        "url": "https://clinicaltrials.gov/study/NCT05573724"
      }
    ],
    "status": "completed",
    "enrolled": 16,
    "started": "2022-11-07",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct06713369",
    "kind": "trial",
    "name": "AZD5305 hADME in Patients With Advanced Solid Malignancies",
    "nct": "NCT06713369",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I, Open-label Study to Assess the Absolute Bioavailability of Saruparib (AZD5305) and Absorption, Distribution, Metabolism, and Excretion (ADME) of [14C]-Saruparib ([14C]-AZD5305) in Patients With Advanced Solid Malignancies",
    "sponsor": "AstraZeneca",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06713369 as recruiting, last updated 2026-06-24. Enrolment is 8 planned participants, an estimate. Interventions: Saruparib (AZD5305), [14C]-AZD5305 microtracer, [14C]-AZD5305 (therapeutic dose). Primary measures include Absolute bioavailability (F) of Saruparib; Total radioactivity recovery in urine and faeces. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "saruparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06713369",
        "url": "https://clinicaltrials.gov/study/NCT06713369"
      }
    ],
    "status": "recruiting",
    "started": "2025-04-02",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct04182516",
    "kind": "trial",
    "name": "Study of NMS-03305293 in Pts with Selected Advanced/Metastatic Solid Tumors",
    "nct": "NCT04182516",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Dose Escalation Study of NMS-03305293 in Adult Patients with Selected Advanced/Metastatic Solid Tumors",
    "sponsor": "Nerviano Medical Sciences",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is terminated.",
    "summary": "The registry lists NCT04182516 as terminated, last updated 2024-09-19. Enrolment is 52 actual participants. Interventions: NMS-03305293. Primary measures include Number of Participants with first-cycle dose limiting toxicity. The registry reason for stopping is: The study closure is related to sponsor decision to shift towards the clinical development of NMS-03305293 in combination in a broader range of indication and not based on emerging safety or efficacy concerns. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "nms-03305293"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04182516",
        "url": "https://clinicaltrials.gov/study/NCT04182516"
      }
    ],
    "status": "withdrawn",
    "enrolled": 52,
    "started": "2019-11-25",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05473624",
    "kind": "trial",
    "name": "Study of HRS-1167 as Monotherapy in Patients With Advanced Solid Tumors",
    "nct": "NCT05473624",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I, Open-label, Multicenter Study to Assess the Safety, Tolerability, Pharmacokinetics and Preliminary Efficacy of HRS-1167 as Monotherapy in Patients With Advanced Solid Tumors",
    "sponsor": "Jiangsu HengRui Medicine Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05473624 as recruiting, last updated 2025-04-15. Enrolment is 153 planned participants, an estimate. Interventions: HRS-1167. Primary measures include Dose-limiting toxicity (DLT) of HRS-1167; Maximum tolerated dose (MTD) of HRS-1167. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hrs-1167"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05473624",
        "url": "https://clinicaltrials.gov/study/NCT05473624"
      }
    ],
    "status": "recruiting",
    "started": "2022-08-23",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct07756281",
    "kind": "trial",
    "name": "First in Human Study of SNV1521 With a RAS Inhibitor for People With Advanced Pancreatic Cancer",
    "nct": "NCT07756281",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1, Open-Label, Dose-Escalation and Expansion Study of SNV1521 in Combination With RAS Inhibition in Participants With Locally Advanced Unresectable or Metastatic Pancreatic Cancer",
    "sponsor": "Synnovation Therapeutics, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is not yet recruiting.",
    "summary": "The registry lists NCT07756281 as not yet recruiting, last updated 2026-08-10. Enrolment is 40 planned participants, an estimate. Interventions: SNV1521, daraxonrasib. Primary measures include Safety and tolerability of SNV1521 plus daraxonrasib: treatment-emergent adverse events, serious adverse events, and dose-limiting toxicities. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "snv1521"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT07756281",
        "url": "https://clinicaltrials.gov/study/NCT07756281"
      }
    ],
    "status": "planned",
    "started": "2026-09",
    "startedType": "estimated",
    "cancers": [
      "pancreatic"
    ]
  },
  {
    "id": "nct06458712",
    "kind": "trial",
    "name": "Study to Assess Safety, Tolerability and Activity of DSB2455 in Participants With Advanced Malignancies",
    "nct": "NCT06458712",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "Phase Ia/Ib Open Label, Multi-Centre Dose Escalation Study With Expansion Cohorts to Assess the Safety, Tolerability, and Activity of DSB2455 as Monotherapy in Participants With Advanced Malignancies",
    "sponsor": "Duke Street Bio Ltd",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06458712 as recruiting, last updated 2026-09-02. Enrolment is 180 planned participants, an estimate. Interventions: DSB2455. Primary measures include Number of patients demonstrating dose limiting toxicities and SAEs; Number of patients exhibiting reduction in tumor size.. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "dsb2455"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06458712",
        "url": "https://clinicaltrials.gov/study/NCT06458712"
      }
    ],
    "status": "recruiting",
    "started": "2024-11-21",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic"
    ]
  },
  {
    "id": "nct06220864",
    "kind": "trial",
    "name": "SNV1521 in Participants With Advanced Solid Tumors",
    "nct": "NCT06220864",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase 1, Open-Label Dose Escalation and Expansion Study of SNV1521 in Participants With Advanced Solid Tumors",
    "sponsor": "Synnovation Therapeutics, Inc.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06220864 as recruiting, last updated 2026-06-25. Enrolment is 400 planned participants, an estimate. Interventions: SNV1521, DB-1310, Abiraterone, Darolutamide. Primary measures include Safety of SNV1521; Tolerability of SNV1521. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "snv1521"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06220864",
        "url": "https://clinicaltrials.gov/study/NCT06220864"
      }
    ],
    "status": "recruiting",
    "started": "2024-02-23",
    "startedType": "actual",
    "cancers": []
  },
  {
    "id": "nct05740956",
    "kind": "trial",
    "name": "A Study of Hansoh (HS)-10502 in Patients With Advanced Solid Tumors",
    "nct": "NCT05740956",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Clinical Study to Evaluate the Safety, Tolerability, Pharmacokinetics and Efficacy of HS-10502 in Patients With Advanced Solid Tumors",
    "sponsor": "Jiangsu Hansoh Pharmaceutical Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05740956 as recruiting, last updated 2025-06-05. Enrolment is 318 planned participants, an estimate. Interventions: HS-10502. Primary measures include Maximum tolerated dose (MTD) of HS-10502\uff08Stage 1\uff09; Maximum applicable dose (MAD) of HS-10502\uff08Stage 1\uff09. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hs-10502"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05740956",
        "url": "https://clinicaltrials.gov/study/NCT05740956"
      }
    ],
    "status": "recruiting",
    "started": "2023-06-09",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "ovarian",
      "prostate",
      "pancreatic",
      "colorectal"
    ]
  },
  {
    "id": "nct06769425",
    "kind": "trial",
    "name": "HS-10502 Combination Treatment in Patients With Advanced Solid Tumors",
    "nct": "NCT06769425",
    "phase": "1",
    "asOf": "2026-10-06",
    "setting": "A Phase I Study to Evaluate the Safety, Tolerability, Pharmacokinetics and Efficacy of HS-10502 Combination Treatment in Subjects With Advanced Solid Tumors",
    "sponsor": "Jiangsu Hansoh Pharmaceutical Co., Ltd.",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT06769425 as recruiting, last updated 2025-06-24. Enrolment is 157 planned participants, an estimate. Interventions: HS-10502 + NHA, HS-10502 + HS-20093, HS-10502+ Apatinib, HS-10502 + HS-20089, HS-10502 + Platinum + Bevacizumab, HS-10502 + nab-paclitaxel or Docetaxel or Irinotecan, HS-10502 + Bevacizumab. Primary measures include Maximum tolerated dose (MTD) of HS-10502\uff08Stage 1\uff1aDose escalating stage\uff09; Maximum applicable dose (MAD) of HS-10502\uff08Stage 1\uff1aDose escalating stage\uff09. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "hs-10502"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT06769425",
        "url": "https://clinicaltrials.gov/study/NCT06769425"
      }
    ],
    "status": "recruiting",
    "started": "2025-05-07",
    "startedType": "actual",
    "cancers": [
      "breast-cancer",
      "tnbc",
      "ovarian",
      "prostate",
      "gastric"
    ]
  },
  {
    "id": "nct03344965",
    "kind": "trial",
    "name": "Olaparib In Metastatic Breast Cancer",
    "nct": "NCT03344965",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "A Phase 2 Study of Olaparib Monotherapy in Metastatic Breast Cancer Patients With Germline or Somatic Mutations in DNA Repair Genes (Olaparib Expanded)",
    "sponsor": "Beth Israel Deaconess Medical Center",
    "tldr": "Olaparib showed activity in metastatic breast cancer with germline PALB2 or somatic BRCA alterations, but the somatic cohort missed its prespecified response target.",
    "summary": "The registry lists NCT03344965 as active not recruiting, last updated 2026-01-05. Enrolment is 114 planned participants, an estimate. Interventions: Olaparib. Primary measures include Objective Response Rate. No results are posted in the registry; this does not exclude separate publications. The 2026 expansion publication reports 54 participants: 24 germline PALB2 and 30 somatic BRCA1/2, with 42 ER-positive/HER2-negative, seven TNBC and five HER2-positive cancers. Germline PALB2 response was 75% (80% CI 60.2-86.3), median PFS 9.4 months (90% CI 8.3-13.1). Somatic BRCA response was 36.7% (80% CI 24.7-50.0), median PFS 5.5 months (90% CI 2.8-8.3), and failed the prespecified response target. This metastatic single-arm evidence does not establish an adjuvant somatic-BRCA indication.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03344965",
        "url": "https://clinicaltrials.gov/study/NCT03344965"
      },
      {
        "label": "TBCRC 048 expansion, 2026",
        "url": "https://doi.org/10.1200/JCO-25-02075"
      }
    ],
    "status": "active",
    "started": "2018-04-01",
    "startedType": "actual",
    "outcomes": [
      {
        "endpoint": "Objective response, germline PALB2 cohort (2026 expansion)",
        "unit": "%",
        "arms": [
          {
            "name": "Olaparib, germline PALB2",
            "n": 24,
            "value": 75,
            "note": "80% CI 60.2-86.3; single-arm cohort, predominantly ER-positive breast cancer across the trial"
          }
        ],
        "source": "https://doi.org/10.1200/JCO-25-02075"
      },
      {
        "endpoint": "Objective response, somatic BRCA1/2 cohort (2026 expansion)",
        "unit": "%",
        "arms": [
          {
            "name": "Olaparib, somatic BRCA1/2",
            "n": 30,
            "value": 36.7,
            "note": "80% CI 24.7-50.0; prespecified response target not achieved"
          }
        ],
        "source": "https://doi.org/10.1200/JCO-25-02075"
      }
    ],
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct04191135",
    "kind": "trial",
    "name": "Study of Olaparib Plus Pembrolizumab Versus Chemotherapy Plus Pembrolizumab After Induction With First-Line Chemotherapy Plus Pembrolizumab in Triple Negative Breast Cancer (TNBC) (MK-7339-009/KEYLYNK-009)",
    "nct": "NCT04191135",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "An Open-label, Randomized, Phase 2/3 Study of Olaparib Plus Pembrolizumab Versus Chemotherapy Plus Pembrolizumab After Induction of Clinical Benefit With First-line Chemotherapy Plus Pembrolizumab in Participants With Locally Recurrent Inoperable or Metastatic Triple Negative Breast Cancer (TNBC) (KEYLYNK-009)",
    "sponsor": "Merck Sharp & Dohme LLC",
    "tldr": "Replacing chemotherapy with olaparib alongside pembrolizumab did not improve the primary progression-free survival outcome in metastatic TNBC.",
    "summary": "The registry lists NCT04191135 as terminated, last updated 2026-09-14. Enrolment is 462 actual participants. Interventions: Pembrolizumab, Olaparib, Carboplatin, Gemcitabine. Primary measures include Progression-Free Survival (PFS); Overall Survival (OS). The registry reason for stopping is: Business Reasons Results are posted in the registry. The primary paper reports 460 participants receiving induction and 271 randomised; these analysis populations differ from the registry total of 462. Median PFS was 5.5 versus 5.6 months (HR 0.98, 95% CI 0.72-1.33, p=0.4556), and OS 25.1 versus 23.4 months (HR 0.95, 95% CI 0.64-1.40). Exploratory tumour-BRCA subgroup estimates were imprecise and do not establish a positive subgroup trial.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT04191135",
        "url": "https://clinicaltrials.gov/study/NCT04191135"
      },
      {
        "label": "Primary KEYLYNK-009 publication",
        "url": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      }
    ],
    "status": "withdrawn",
    "enrolled": 462,
    "started": "2019-12-19",
    "startedType": "actual",
    "outcomes": [
      {
        "endpoint": "Progression-free survival, randomised maintenance population",
        "primary": true,
        "unit": "months",
        "arms": [
          {
            "name": "Pembrolizumab plus olaparib",
            "value": 5.5
          },
          {
            "name": "Pembrolizumab plus chemotherapy",
            "value": 5.6
          }
        ],
        "hr": 0.98,
        "ci": [
          0.72,
          1.33
        ],
        "p": "0.4556",
        "source": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      },
      {
        "endpoint": "Overall survival, randomised maintenance population",
        "unit": "months",
        "arms": [
          {
            "name": "Pembrolizumab plus olaparib",
            "value": 25.1
          },
          {
            "name": "Pembrolizumab plus chemotherapy",
            "value": 23.4
          }
        ],
        "hr": 0.95,
        "ci": [
          0.64,
          1.4
        ],
        "source": "https://doi.org/10.1158/1078-0432.CCR-25-1818"
      }
    ],
    "cancers": [
      "breast-cancer",
      "tnbc"
    ]
  },
  {
    "id": "nct03990896",
    "kind": "trial",
    "name": "Evaluation of Talazoparib, a PARP Inhibitor, in Patients With Somatic BRCA Mutant Metastatic Breast Cancer: Genotyping Based Clinical Trial",
    "nct": "NCT03990896",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "Evaluation of Talazoparib, a PARP Inhibitor, in Patients With Somatic BRCA Mutant Metastatic Breast Cancer: Genotyping Based Clinical Trial",
    "sponsor": "Massachusetts General Hospital",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT03990896 as recruiting, last updated 2026-05-06. Enrolment is 30 planned participants, an estimate. Interventions: Talazoparib. Primary measures include Median Progression Free Survival. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "talazoparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT03990896",
        "url": "https://clinicaltrials.gov/study/NCT03990896"
      }
    ],
    "status": "recruiting",
    "started": "2021-11-18",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ]
  },
  {
    "id": "nct05332561",
    "kind": "trial",
    "name": "Genomics Guided Targeted Post-neoadjuvant Therapy in Patients With Early Breast Cancer (COGNITION-GUIDE)",
    "nct": "NCT05332561",
    "phase": "2",
    "asOf": "2026-10-06",
    "setting": "Genomics Guided Targeted Post-neoadjuvant Therapy in Patients With Early Breast Cancer - a Multicenter, Open-label, Umbrella Phase-II Study - COGNITION-GUIDE",
    "sponsor": "German Cancer Research Center",
    "tldr": "This study tests a PARP inhibitor; the registry reports that it is recruiting.",
    "summary": "The registry lists NCT05332561 as recruiting, last updated 2025-03-20. Enrolment is 240 planned participants, an estimate. Interventions: Atezolizumab 1200 mg in 20 ML Injection, Inavolisib, Ipatasertib, Olaparib, Sacituzumab govitecan, Trastuzumab/pertuzumab. Primary measures include Invasive Disease-free Survival (IDFS) as defined by Hudis et al in the entire study population four years after surgery. No results are posted in the registry; this does not exclude separate publications.",
    "targets": [
      "parp"
    ],
    "drugs": [
      "olaparib"
    ],
    "links": [
      {
        "label": "ClinicalTrials.gov NCT05332561",
        "url": "https://clinicaltrials.gov/study/NCT05332561"
      }
    ],
    "status": "recruiting",
    "started": "2023-06-29",
    "startedType": "actual",
    "cancers": [
      "breast-cancer"
    ]
  }
];
