/**
 * Device gaps, November 2026 round, part one: vascular access, infusion pumps, ostomy products, breast implants and
 * external prostheses, lymphoedema devices and laryngectomy devices. Filled from the gap census in
 * docs/proposals/gap-census-2026-11.md (types vascular-access-devices, infusion-pumps, ostomy-products,
 * breast-prostheses-reconstruction, lymphoedema-devices and the laryngectomy rows of prosthetics-orthotics).
 *
 * Every 510(k), De Novo and PMA number below was read from the openFDA device API on 4 November 2026 (applicant, device
 * name, decision date and product code), and indication wording is quoted from the 510(k) summary PDF on
 * accessdata.fda.gov where one was readable. NICE recommendations are quoted from the guidance pages, which moved from
 * the MTG numbers to HealthTech guidance (HTG) numbers. NHS supply figures are counts of rows in the NHS Drug Tariff
 * Part IX file for November 2026 (one row per pack line, so a product sold in several sizes appears several times).
 *
 * A 510(k) is the FDA's finding that a device is substantially equivalent to one already on the market; it is not
 * evidence that the device improves outcomes, and it says nothing about devices sold only outside the United States.
 * Device families are technology records; a product is named inside its family with the regulator record that proves
 * it exists. No `machineFamily` field exists on main (src/lib/kinds.ts has no MACHINE_FAMILIES), so none is set.
 */
import type { CompanyInput, TechnologyInput, TermInput } from "@/lib/schema";
import { fda510k, fdaDeNovo } from "./machines-wave3";

const asOf = "2026-11-04";
const tags = ["devices-gaps-2026-11"];
const provenance = { editedBy: "OnCo device gap fill (openFDA, accessdata.fda.gov, NICE, NHS Drug Tariff Part IX, FDA, maker and society pages)", editedOn: asOf };

/** An FDA premarket approval (PMA) record page. */
export const fdaPma = (p: string, what: string) => ({ label: `FDA PMA ${p}: ${what}`, url: `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=${p}` });
/** A NICE HealthTech guidance page. */
export const nice = (htg: string, what: string) => ({ label: `NICE ${htg.toUpperCase()}: ${what}`, url: `https://www.nice.org.uk/guidance/${htg}` });
const fdaClass = (code: string, what: string) => ({ label: `FDA product code ${code}: ${what}`, url: `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPCD/classification.cfm?ID=${code}` });

type Tc = Omit<TechnologyInput, "kind" | "asOf">;
const tech = (x: Tc): TechnologyInput => ({ kind: "technology", asOf, tags, provenance, ...x } as TechnologyInput);
type Co = Omit<CompanyInput, "kind" | "asOf">;
const co = (x: Co): CompanyInput => ({ kind: "company", asOf, tags, provenance, ...x } as CompanyInput);
type Te = Omit<TermInput, "kind" | "asOf">;
const term = (x: Te): TermInput => ({ kind: "term", asOf, tags, provenance, ...x } as TermInput);

const PART_IX = { label: "NHS Drug Tariff Part IX, November 2026 (NHSBSA, CSV)", url: "https://www.nhsbsa.nhs.uk/sites/default/files/2026-10/Drug%20Tariff%20Part%20IX%20November%202026.csv" };
const PART_IX_PAGE = { label: "NHSBSA: Drug Tariff Part IX and the appliance advanced services", url: "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff/drug-tariff-part-ix" };
const FDA_BREAST = { label: "FDA: breast implants (safety communications and labeling guidance)", url: "https://www.fda.gov/medical-devices/implants-and-prosthetics/breast-implants" };
const FDA_BREAST_RISKS = { label: "FDA: risks and complications of breast implants", url: "https://www.fda.gov/medical-devices/breast-implants/risks-and-complications-breast-implants" };
const FDA_SCC = { label: "FDA safety communication: squamous cell carcinoma in the capsule around breast implants (update 8 March 2023)", url: "https://www.fda.gov/medical-devices/safety-communications/update-reports-squamous-cell-carcinoma-scc-capsule-around-breast-implants-fda-safety-communication" };
const OSU_HCPCS = { label: "OSU Health Plan: external breast prostheses policy, HCPCS L8000 to L8039", url: "https://osuhealthplan.com/sites/default/files/2022-12/external_breast_prosthesis.pdf" };
const BCIR = { label: "BAPRAS: 20,000 operations recorded on England's Breast and Cosmetic Implant Registry", url: "https://bapras.org.uk/media-government/media-resources/press-releases/20-000-operations-recorded-on-england-s-breast-and-cosmetic-implant-registry" };

// ---------------------------------------------------------------------------------------------------------------------
// Vascular access
// ---------------------------------------------------------------------------------------------------------------------
export const devicesGapsTechnologies: TechnologyInput[] = [
  tech({ id: "implanted-ports", name: "Implanted ports for chemotherapy (port-a-cath, power-injectable, apheresis and intraperitoneal ports)", aka: ["Implanted port", "Portacath", "Port-a-cath", "Chemo port", "Totally implantable venous access device", "Power-injectable port", "Apheresis port", "Intraperitoneal port", "SmartPort", "Vital-Port", "Dignity port", "PowerFlow port"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care", since: 1987,
    tldr: "A port is a small disc placed under the skin of the chest or arm with a thin tube running into a large vein. Nurses reach it through the skin with a special needle, so chemotherapy and blood tests do not need a new needle in an arm vein every time.",
    summary: "The FDA classes implanted venous ports under product code LJT (port and catheter, implanted, subcutaneous, intravascular; 21 CFR 880.5965, class II). Current examples in the 510(k) database include AngioDynamics SmartPort+ and SmartPort plastic ports (K190559, 22 May 2020), the Medcomp Dignity Dual Port (K153238, 15 March 2016) and the Cook Vital-Port power-injectable port (K150733, 21 May 2015). Power-injectable ports tolerate the high pressures of contrast injection for CT. Two special kinds share the same regulation: apheresis ports (code PTD), such as C.R. Bard's PowerFlow implantable apheresis port (K191143, 2 August 2019), which carry the higher flows needed to collect or exchange blood cells, and intraperitoneal ports (code LLD), which lead into the abdominal cavity rather than a vein for intraperitoneal chemotherapy; the earliest LLD clearance in the database is Pharmacia's Port-A-Cath implantable catheter system (K864552, 31 March 1987).\n\nA port is reached with a non-coring (Huber) needle, which has its own record, and needs flushing when not in use. The risks named on the vascular access record apply: infection, blood clots in the vein and blockage of the catheter.",
    principle: "A titanium or plastic reservoir with a self-sealing silicone septum sits in a pocket under the skin; its catheter tip lies in the superior vena cava (or in the peritoneal cavity for an intraperitoneal port), and a non-coring needle passed through the skin and septum gives repeated access.",
    strengths: ["Repeated access for months or years without peripheral cannulas", "Fully under the skin when not in use, so bathing and swimming are possible", "Power-injectable models accept contrast for CT"],
    limitations: ["Needs a minor operation to place and remove", "Catheter infection, thrombosis and occlusion", "Must be flushed regularly when not in use"],
    cancers: ["breast-cancer", "colorectal", "ovarian"], technologies: ["infusion-devices-vascular-access", "huber-needles-port-access", "picc-lines", "catheter-lock-solutions", "needleless-connector-disinfecting-caps"], terms: ["central-venous-access"], companies: ["angiodynamics", "cook-medical", "becton-dickinson"],
    links: [fdaClass("LJT", "implanted subcutaneous intravascular port"), fda510k("K190559", "AngioDynamics SmartPort+ implantable ports (22 May 2020)"), fda510k("K153238", "Medcomp Dignity Dual Port (15 March 2016)"), fda510k("K150733", "Cook Vital-Port power-injectable port (21 May 2015)"), fda510k("K191143", "Bard PowerFlow implantable apheresis port (2 August 2019)"), fda510k("K864552", "Pharmacia Port-A-Cath implantable catheter system, intraperitoneal (31 March 1987)")] }),

  tech({ id: "picc-lines", name: "Peripherally inserted central catheters (PICC lines)", aka: ["PICC", "PICC line", "Peripherally inserted central catheter", "PowerPICC", "Groshong PICC", "HydroPICC"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care", since: 2016,
    tldr: "A long thin tube put in through a vein in the upper arm so that its tip lies near the heart. It stays in for weeks or months, so chemotherapy can be given and blood taken without repeated needles.",
    summary: "PICCs fall under FDA product code LJS (intravascular therapeutic catheter, long-term greater than 30 days; 21 CFR 880.5970). Examples cleared in the 510(k) database include C.R. Bard's PowerPICC Provena catheters (K162443, 25 October 2016), the Groshong NXT PICC catheter (K201452, 12 March 2021) and Access Vascular's HydroPICC (dual lumen 5Fr, K251212, 1 July 2025). The tip position matters: systems that confirm it by the heart's electrical signal and magnetic tracking have their own record, as do the subcutaneous anchors used to hold a PICC in place. Unlike a port, part of the line stays outside the skin, so it needs a dressing, weekly care and protection when washing.",
    principle: "A soft polyurethane or silicone catheter is threaded under ultrasound guidance from an upper-arm vein to the lower superior vena cava; the external hub is closed with a needleless connector and flushed between uses.",
    strengths: ["Placed at the bedside or in a treatment room without an operation", "Removed by pulling it out", "Suitable for weeks to months of treatment"],
    limitations: ["The external part needs dressing changes and limits swimming", "Arm vein thrombosis and line infection", "Tip may move and need checking"],
    cancers: ["breast-cancer", "colorectal", "aml"], technologies: ["infusion-devices-vascular-access", "implanted-ports", "picc-tip-location-systems", "catheter-securement-devices", "needleless-connector-disinfecting-caps"], terms: ["central-venous-access"], companies: ["becton-dickinson"],
    links: [fdaClass("LJS", "long-term intravascular therapeutic catheter"), fda510k("K162443", "PowerPICC Provena catheters (25 October 2016)"), fda510k("K201452", "Groshong NXT PICC catheter (12 March 2021)"), fda510k("K251212", "Access Vascular HydroPICC (1 July 2025)")] }),

  tech({ id: "huber-needles-port-access", name: "Non-coring (Huber) needles for port access", aka: ["Huber needle", "Non-coring needle", "Port needle", "SafeStep Huber needle", "PowerLoc"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care", since: 2021,
    tldr: "The bent needle a nurse pushes through the skin into an implanted port. Its tip is shaped so it slices rather than punches the port's rubber seal, which lets the seal close again after thousands of uses.",
    summary: "The FDA lists these as product code PTI (non-coring (Huber) needle; 21 CFR 880.5570, class II). Examples include Bard Access Systems' PowerLoc Max power-injectable infusion set and SafeStep Huber needle set (K241353, 27 November 2024) and Intera Oncology's non-coring refill and bolus needles for its implanted hepatic artery pump (K211121, 14 October 2021). A standard needle would cut a core out of the port's silicone septum, which over time would make it leak; the deflected tip of a Huber needle avoids that. Safety designs shield the tip on removal to protect staff from needlestick injury.",
    principle: "A needle with a deflected, side-opening bevel parts the septum fibres instead of cutting a plug, and is usually bent at right angles so it lies flat on the skin under a dressing.",
    strengths: ["Preserves the port septum over repeated access", "Safety versions reduce needlestick injury"],
    limitations: ["Each access is a needle through the skin", "Needle dislodgement can let a vesicant drug leak under the skin"],
    technologies: ["implanted-ports", "infusion-devices-vascular-access", "hepatic-arterial-infusion-pump"], terms: ["central-venous-access"], companies: ["becton-dickinson"],
    links: [fdaClass("PTI", "non-coring (Huber) needle"), fda510k("K241353", "PowerLoc Max and SafeStep Huber needle sets (27 November 2024)"), fda510k("K211121", "Intera non-coring refill and bolus needles (14 October 2021)")] }),

  tech({ id: "picc-tip-location-systems", name: "PICC tip location systems (Sherlock 3CG, SmartPICC)", aka: ["Tip confirmation system", "ECG-guided PICC placement", "Sherlock 3CG", "SmartPICC"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "established", since: 2015,
    tldr: "Systems that use the heart's electrical signal and a magnetic tracker to show where the tip of a PICC line is while it is being put in, so most patients do not need a chest X-ray afterwards before the line can be used.",
    summary: "NICE medical technologies guidance MTG24, now HealthTech guidance HTG368 (published 25 March 2015, updated 30 May 2019), says the case for adopting the Sherlock 3CG Tip Confirmation System \"is supported by the evidence\" and that it \"usually avoids the need for a confirmatory chest X-ray in patients who would otherwise have blind insertion\". It recommends it be considered for adults, noting that patients whose electrocardiogram shows no P wave, for example with atrial fibrillation, still need a chest X-ray. The Sherlock 3CG tip positioning stylet was most recently cleared in the United States in 2022 (K222232, Bard Access Systems). Piccolo Medical's SmartPICC system, an ECG-guided navigation system, was cleared on 22 January 2021 (K200037).",
    principle: "A stylet in the catheter acts as an intracavitary ECG lead: the P wave grows as the tip approaches the junction of the superior vena cava and right atrium, while a magnetic sensor on the chest tracks the tip's path.",
    strengths: ["Avoids most confirmatory chest X-rays (NICE)", "Line can be used sooner after insertion"],
    limitations: ["Needs a visible P wave on the ECG", "Adds a device cost per insertion"],
    technologies: ["picc-lines", "infusion-devices-vascular-access"], terms: ["central-venous-access"], companies: ["becton-dickinson"],
    links: [nice("htg368", "Sherlock 3CG Tip Confirmation System for placement of PICCs"), fda510k("K222232", "Sherlock 3CG tip positioning system stylet (24 August 2022)"), fda510k("K200037", "Piccolo Medical SmartPICC system (22 January 2021)")] }),

  tech({ id: "catheter-securement-devices", name: "Catheter securement devices and dressings (SecurAcath, Tegaderm CHG)", aka: ["Subcutaneous catheter securement", "SecurAcath", "Tegaderm CHG", "Chlorhexidine gel dressing", "Catheter securement"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "established", since: 2015,
    tldr: "Ways of holding a PICC or central line in place without stitches: a small anchor that sits just under the skin, or a see-through dressing containing an antiseptic gel that also helps keep infection away.",
    summary: "NICE recommends SecurAcath \"as a cost-saving option for securing peripherally inserted central catheters (PICCs) with an anticipated medium- to long-term dwell time\" (HTG440, formerly MTG34, published 5 June 2017, updated 10 August 2022); its cost model found savings when the PICC stays in place for 21 days or longer, because the anchor does not need replacing at weekly dressing changes. SecurAcath's 510(k) (K210629, 12 April 2021, product code OKC) is for \"catheter securement to the access site by means of subcutaneous anchors\". For dressings, NICE says the case for 3M's Tegaderm CHG IV securement dressing \"is supported by the evidence\" for central venous and arterial catheter sites in critically ill adults in intensive care or high dependency units, because it reduces catheter-related bloodstream and local site infections compared with standard transparent dressings (HTG379, formerly MTG25).",
    principle: "Flexible anchors deployed under the skin at the insertion site hold the catheter hub without adhesive or sutures; antiseptic dressings hold a chlorhexidine gel pad over the insertion site under a transparent film.",
    strengths: ["Anchor does not need changing at each dressing change", "Chlorhexidine dressing lowers catheter infection in intensive care (NICE)"],
    limitations: ["NICE's dressing recommendation is for critically ill adults, not outpatients", "Anchor removal can be uncomfortable"],
    technologies: ["picc-lines", "infusion-devices-vascular-access", "needleless-connector-disinfecting-caps"], terms: ["central-venous-access"],
    links: [nice("htg440", "SecurAcath for securing percutaneous catheters"), fda510k("K210629", "SecurAcath (12 April 2021)"), nice("htg379", "Tegaderm CHG securement dressing for vascular access sites in critically ill adults")] }),

  tech({ id: "needleless-connector-disinfecting-caps", name: "Disinfecting caps for needleless connectors (Curos)", aka: ["Curos", "Disinfecting cap", "Alcohol cap", "Needleless connector cap"],
    sections: ["supportive-care", "devices"], status: "emerging", since: 2019,
    tldr: "A small cap soaked in alcohol that screws onto the end of a central line between uses, meant to keep the connector clean and lower the chance of a line infection.",
    summary: "NICE HealthTech guidance HTG510 (formerly MTG44, 9 May 2019) found that the Curos disinfecting cap \"shows promise for preventing infections when using needleless connectors, but there is currently insufficient evidence to support the case for routine adoption in the NHS\". NICE asked for research on whether Curos adds value to the standard care bundle, especially for people at high risk of infection and people managed in the community. The cap can stay on for up to 7 days but must be replaced each time the line is used.",
    principle: "A cap containing isopropyl alcohol is screwed onto the needleless connector at the end of the line, bathing the connector surface while it is not in use.",
    strengths: ["Simple to use between line accesses", "Protects the connector surface while capped"],
    limitations: ["NICE found insufficient evidence for routine adoption", "Adds a consumable at every access"],
    technologies: ["picc-lines", "implanted-ports", "catheter-securement-devices", "infusion-devices-vascular-access"], terms: ["central-venous-access"],
    links: [nice("htg510", "Curos for preventing infections when using needleless connectors")] }),

  tech({ id: "catheter-lock-solutions", name: "Catheter lock solutions (heparin, taurolidine and DefenCath)", aka: ["Lock solution", "Catheter lock", "Taurolidine lock", "DefenCath", "Taurolidine and heparin"],
    sections: ["supportive-care", "devices"], status: "established", since: 2023,
    tldr: "A small volume of liquid left inside a central line or port between uses to stop it clotting and, in some products, to kill bacteria. The one American antimicrobial lock approved so far is licensed only for kidney dialysis lines, not cancer lines.",
    summary: "Between uses a central line or port is filled with a lock solution so blood does not clot in it. DefenCath, a combination of taurolidine, an antimicrobial, and heparin, was approved by the FDA on 15 November 2023 (NDA 214520, CorMedix). Its label limits it: \"LIMITED POPULATION: DEFENCATH is indicated to reduce the incidence of catheter-related bloodstream infections (CRBSI) in adult patients with kidney failure receiving chronic hemodialysis (HD) through a central venous catheter (CVC)\", and \"The safety and effectiveness of DEFENCATH have not been established for use in populations other than\" those patients. For cancer ports and PICCs, any antimicrobial lock is therefore off-label in the United States; this record does not grade the oncology evidence.",
    principle: "The catheter's internal volume is filled and left closed; an anticoagulant prevents clot and an antimicrobial agent reduces bacterial colonisation of the catheter lumen.",
    strengths: ["Keeps lines patent between uses", "An approved antimicrobial lock exists for dialysis catheters"],
    limitations: ["DefenCath is not approved for cancer catheters", "Heparin carries bleeding and heparin-allergy risks"],
    technologies: ["implanted-ports", "picc-lines", "infusion-devices-vascular-access"], terms: ["central-venous-access"],
    links: [{ label: "Drugs@FDA: DefenCath, NDA 214520", url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=214520" }, { label: "DailyMed: DefenCath label", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13b3a61e-5a4b-4afb-8fa1-d76ebdb344d6" }] }),

  // -------------------------------------------------------------------------------------------------------------------
  // Infusion pumps
  // -------------------------------------------------------------------------------------------------------------------
  tech({ id: "ambulatory-chemotherapy-pumps", name: "Ambulatory and elastomeric pumps for home chemotherapy (CADD-Solis, Curlin, Sapphire, Avoset, SMARTeZ)", aka: ["Ambulatory infusion pump", "Portable chemotherapy pump", "Elastomeric pump", "Balloon pump", "CADD-Solis", "Curlin 8000", "Sapphire pump", "Avoset", "Halo II", "SMARTeZ"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care", since: 2016,
    tldr: "Small pumps carried in a bag or pocket that keep chemotherapy running into a port or PICC line for one or two days at home, for example the 46-hour fluorouracil infusion used for bowel cancer.",
    summary: "Two kinds are used. Electronic ambulatory pumps (FDA product code FRN, infusion pump, or MEA for PCA-capable models; 21 CFR 880.5725) include Smiths Medical's CADD-Solis ambulatory infusion pump (K170982, 24 August 2017), the Curlin 8000 ambulatory infusion system (Zevex, K232793, 17 May 2024), Q Core Medical's Sapphire (K192860, 19 November 2020), Eitan Medical's Avoset (K213744, 10 March 2023) and Zyno Medical's Halo II (K153193, 30 August 2016). Elastomeric pumps (code MEB) have no electronics: a stretched balloon pushes the drug through a flow-restricting tube at a set rate, for example Epic Medical's SMARTeZ (K250234, 24 April 2026); the vascular access record names Baxter Infusor and B. Braun Easypump. Elastomeric flow varies with temperature and the height of the pump, which is why patients are told how to wear them.",
    principle: "A peristaltic or cassette mechanism (electronic) or the elastic recoil of a balloon reservoir (elastomeric) drives the drug through a fixed or programmed flow path into the central line.",
    strengths: ["Lets multi-day infusions run at home", "Elastomeric pumps are silent and need no programming"],
    limitations: ["Elastomeric flow rate drifts with temperature and position", "Disconnection or leakage of a cytotoxic drug at home"],
    cancers: ["colorectal", "pancreatic", "gastric"], technologies: ["infusion-devices-vascular-access", "smart-infusion-pumps", "pca-pumps", "implanted-ports", "picc-lines"], companies: ["baxter", "b-braun"],
    links: [fda510k("K170982", "CADD-Solis ambulatory infusion pump (24 August 2017)"), fda510k("K232793", "Curlin 8000 ambulatory infusion system (17 May 2024)"), fda510k("K192860", "Sapphire infusion pump (19 November 2020)"), fda510k("K213744", "Avoset infusion pump system (10 March 2023)"), fda510k("K153193", "Halo II ambulatory infusion system (30 August 2016)"), fda510k("K250234", "SMARTeZ elastomeric infusion pump (24 April 2026)"), fdaClass("MEB", "elastomeric infusion pump")] }),

  tech({ id: "pca-pumps", name: "Patient-controlled analgesia pumps", aka: ["PCA pump", "Patient-controlled analgesia", "LifeCare PCA", "ambIT PCA"],
    sections: ["supportive-care", "devices"], status: "standard-of-care", since: 2016,
    tldr: "A pump that lets a person in pain give themselves a small, pre-set dose of pain relief by pressing a button, with a lock-out so they cannot take too much.",
    summary: "PCA pumps are FDA product code MEA (pump, infusion, PCA; 21 CFR 880.5725). Examples include Hospira's LifeCare PCA infusion system (K143612, 8 April 2016) and Summit Medical Products' ambIT PCA and programmable intermittent bolus pumps (K162165, 29 August 2017). In cancer care they are used after surgery and for pain that is hard to control at the end of life; the programme sets the bolus size, the lock-out interval and any continuous background rate.",
    principle: "A programmable syringe or cassette pump delivers a fixed bolus when the patient presses a handset, refusing further boluses until a lock-out interval has passed and logging every request.",
    strengths: ["The patient controls timing of relief", "Lock-out and dose limits guard against overdose"],
    limitations: ["Programming errors are a known hazard", "Needs a patient able to use the button"],
    technologies: ["pain-management", "infusion-devices-vascular-access", "syringe-drivers", "ambulatory-chemotherapy-pumps"], companies: ["icu-medical"],
    links: [fdaClass("MEA", "PCA infusion pump"), fda510k("K143612", "LifeCare PCA infusion system (8 April 2016)"), fda510k("K162165", "ambIT PCA and programmable intermittent bolus pumps (29 August 2017)")] }),

  tech({ id: "syringe-drivers", name: "Syringe pumps and subcutaneous syringe drivers", aka: ["Syringe driver", "Syringe pump", "Continuous subcutaneous infusion", "Perfusor Space", "Novum IQ syringe pump"],
    sections: ["supportive-care", "devices"], status: "standard-of-care", since: 2018,
    tldr: "A small pump that pushes the plunger of a syringe slowly over a day, used in palliative care to give medicines for pain, sickness and agitation under the skin when someone can no longer swallow.",
    summary: "Syringe pumps are cleared under the general infusion pump code FRN. Examples in the 510(k) database include B. Braun's Perfusor Space syringe infusion pump system (K172831, 12 June 2018) and Baxter's Novum IQ syringe pump (K242390, 5 September 2024). In palliative care a portable syringe driver delivers a 24-hour continuous subcutaneous infusion; the hospital pumps named here are usually used intravenously. Which portable models a hospice uses was not found in a regulator list, so none is named.",
    principle: "A motor-driven lead screw advances the syringe plunger at a programmed rate; occlusion and end-of-syringe alarms stop the infusion when flow is blocked or the syringe empties.",
    strengths: ["Steady medicine levels without repeated injections", "Works through a fine needle under the skin at home"],
    limitations: ["Site reactions under the skin", "Drug compatibility limits what can be mixed in one syringe"],
    technologies: ["palliative-care", "pca-pumps", "infusion-devices-vascular-access", "smart-infusion-pumps"], companies: ["b-braun", "baxter"],
    links: [fda510k("K172831", "Perfusor Space syringe infusion pump system (12 June 2018)"), fda510k("K242390", "Novum IQ syringe pump (5 September 2024)")] }),

  tech({ id: "smart-infusion-pumps", name: "Smart infusion pumps with drug libraries (Novum IQ, Plum, Infusomat Space, Agilia, Ivenix)", aka: ["Smart pump", "Large volume pump", "Volumetric infusion pump", "Drug library pump", "Novum IQ", "Plum Duo", "Plum Solo", "Infusomat Space", "Agilia", "Ivenix"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care", since: 2015,
    tldr: "The hospital pumps on drip stands that run chemotherapy and fluids into a vein. Their built-in library of drug limits warns the nurse if a dose or rate is outside the safe range.",
    summary: "Large-volume pumps are FDA product code FRN. Clearances in the 510(k) database include Baxter's Novum IQ large volume pump (K211122, 29 March 2024), ICU Medical's Plum Duo and Plum Solo precision IV pumps (K242115 and K242114, 2 April 2025), B. Braun's Infusomat Space volumetric pump (K142596, 18 June 2015), Fresenius Kabi's Agilia VP and SP infusion systems (K210073 and K210074, 1 March 2022) and the Ivenix infusion system (K183311, 7 June 2019). The vascular access record covers the safety history (recalls and programming errors) and other models; this record holds the current model lines.",
    principle: "A peristaltic or cassette mechanism delivers a programmed volume per hour; dose-error reduction software checks each programme against a hospital drug library with soft and hard limits.",
    strengths: ["Drug libraries catch many programming errors", "Wireless models can connect to electronic prescribing"],
    limitations: ["Limits can be overridden", "Recalls and software faults have affected major models"],
    technologies: ["infusion-devices-vascular-access", "ambulatory-chemotherapy-pumps", "syringe-drivers", "oncology-infusion-chairs", "enteral-feeding-pumps"], companies: ["baxter", "icu-medical", "b-braun", "fresenius-kabi"],
    links: [fda510k("K211122", "Novum IQ large volume pump (29 March 2024)"), fda510k("K242115", "Plum Duo precision IV pump (2 April 2025)"), fda510k("K242114", "Plum Solo precision IV pump (2 April 2025)"), fda510k("K142596", "Infusomat Space volumetric infusion pump (18 June 2015)"), fda510k("K210073", "Agilia VP infusion system (1 March 2022)"), fda510k("K210074", "Agilia SP infusion system (1 March 2022)"), fda510k("K183311", "Ivenix infusion system (7 June 2019)")] }),

  tech({ id: "hepatic-arterial-infusion-pump", name: "Implanted hepatic artery infusion pump (Intera 3000)", aka: ["HAI pump", "Hepatic artery infusion pump", "Intera 3000", "Model 3000 constant flow pump", "HAIP"],
    sections: ["chemotherapy", "surgery", "devices"], status: "established", since: 1996,
    tldr: "A pump about the size of a hockey puck placed under the skin of the abdomen during an operation, with a tube into the artery feeding the liver. It sends chemotherapy straight to tumours in the liver and is refilled through the skin every few weeks.",
    summary: "The pump in current American use is the Intera 3000 hepatic artery infusion pump, held by Intera Oncology under PMA P890055 (product code LKK, implanted programmable infusion pump, class III). The PMA's earliest record in the FDA database is dated 11 March 1996, and 1996 and 1997 supplements name the Model 3000 constant flow implantable pump; supplements from 2025 and 2026 carry the Intera 3000 name. It is refilled with a non-coring needle (Intera refill kit and needles, K213823 and K211121). Trials in the corpus that use hepatic arterial infusion include NCT05286814, which names the hepatic artery infusion pump in its title, NCT06857773 in colorectal liver metastases, and NCT00268463, which gave floxuridine by hepatic arterial infusion.",
    principle: "A gas-propellant chamber presses on a drug reservoir at constant pressure, pushing drug through a flow restrictor into a catheter in the hepatic artery; refills through a central septum also recharge the propellant.",
    strengths: ["High drug concentration in the liver with less in the rest of the body", "Refilled in clinic without further surgery"],
    limitations: ["Needs an operation and a centre experienced in pump care", "Hepatic artery and bile duct complications"],
    cancers: ["colorectal", "intrahepatic-cholangiocarcinoma"], technologies: ["huber-needles-port-access", "infusion-devices-vascular-access", "intrathecal-drug-delivery-pumps"], drugs: ["floxuridine"], terms: ["liver-directed-therapy"], trials: ["nct05286814", "nct06857773", "nct00268463"],
    links: [fdaPma("P890055", "Intera 3000 hepatic artery infusion pump (Intera Oncology)"), fda510k("K213823", "Intera refill kit (16 March 2022)")] }),

  tech({ id: "intrathecal-drug-delivery-pumps", name: "Implanted intrathecal drug delivery pumps for cancer pain (SynchroMed, Prometra)", aka: ["Intrathecal pump", "Intrathecal drug delivery system", "Spinal pump", "SynchroMed", "Prometra"],
    sections: ["supportive-care", "devices"], status: "established", since: 1988,
    tldr: "A pump placed under the skin of the abdomen that delivers tiny doses of pain medicine directly into the fluid around the spinal cord, for cancer pain that tablets and patches do not control.",
    summary: "Two implanted programmable pumps hold FDA premarket approval under product code LKK: Medtronic's SynchroMed (PMA P860004, with records in the FDA database from 24 May 1988 and more than 400 supplements, the latest in October 2026 naming the SynchroMed infusion system and Ascenda intrathecal catheters) and the Prometra programmable infusion pump system (P080012, approved 7 February 2012, now held by Infusyn Therapeutics). The glossary's intrathecal therapy entry covers intrathecal chemotherapy, which is a different use.",
    principle: "A battery-powered peristaltic or valve-metering pump in a subcutaneous pocket delivers drug through a catheter into the intrathecal space; a clinician reprograms it wirelessly and refills it through the skin.",
    strengths: ["Small intrathecal doses can control pain with fewer whole-body side effects", "Dose can be changed without surgery"],
    limitations: ["Needs an operation, refills and a specialist team", "Infection, catheter problems and dosing errors"],
    technologies: ["pain-management", "palliative-care", "hepatic-arterial-infusion-pump", "pca-pumps"], terms: ["intrathecal-therapy"], companies: ["medtronic"],
    links: [fdaPma("P860004", "Medtronic SynchroMed infusion system"), fdaPma("P080012", "Prometra programmable infusion pump system (7 February 2012)")] }),

  tech({ id: "enteral-feeding-pumps", name: "Enteral feeding pumps and enteral-specific connectors", aka: ["Feeding pump", "Enteral pump", "Kangaroo OMNI", "Enteral-specific connectors"],
    sections: ["supportive-care", "devices"], status: "standard-of-care", since: 2022,
    tldr: "A small pump that runs liquid feed through a feeding tube at a steady rate, used at home by people who cannot eat enough after head and neck or gullet cancer treatment.",
    summary: "Enteral feeding pumps are FDA product code LZH (pump, infusion, enteral; 21 CFR 880.5725). An example is Cardinal Health's Kangaroo OMNI enteral feeding pump with its feeding sets (K221603, 20 December 2022). Feeding tubes and syringes now use connectors that fit only enteral devices, so a feed cannot be connected to an intravenous line by mistake; the FDA lists them as separate product codes (PIF tubes, PNR syringes, PIO enteral-specific transition connectors). The feeding tubes themselves are in the glossary and the nutrition record.",
    principle: "A peristaltic pump meters feed from a bag through a giving set into a gastrostomy, jejunostomy or nasogastric tube at a programmed rate and volume.",
    strengths: ["Steady feeding overnight or through the day", "Portable models allow feeding while moving about"],
    limitations: ["Tube blockage and displacement", "Diarrhoea and aspiration risk with fast rates"],
    cancers: ["head-and-neck", "esophageal"], technologies: ["enteral-parenteral-nutrition", "smart-infusion-pumps"], terms: ["feeding-tube"], companies: ["cardinal-health"],
    links: [fdaClass("LZH", "enteral infusion pump"), fda510k("K221603", "Kangaroo OMNI enteral feeding pump (20 December 2022)")] }),

  // -------------------------------------------------------------------------------------------------------------------
  // Ostomy products
  // -------------------------------------------------------------------------------------------------------------------
  tech({ id: "ostomy-appliances", name: "Stoma bags and baseplates (one-piece, two-piece, convex, urostomy, caps and leak alerts)", aka: ["Ostomy appliance", "Stoma bag", "Ostomy pouch", "Colostomy bag", "Ileostomy bag", "Urostomy bag", "Two-piece ostomy system", "Convex baseplate", "Stoma cap", "Colostomy plug", "Heylo", "SenSura Mio"],
    sections: ["surgery", "supportive-care", "devices"], status: "standard-of-care",
    tldr: "The bags that collect stool or urine from a stoma. They come as one piece or as a bag that clips onto a separate sticky base, in closed, drainable and urostomy versions, with curved (convex) bases for stomas that sit flat or below the skin.",
    summary: "In the United States ostomy pouches and accessories are class I devices under 21 CFR 876.5900 (product codes EXB collector, ostomy; EZQ pouch, colostomy; EXH bag, urinary, ileostomy). In England they are prescribed from Part IXC of the NHS Drug Tariff, which in November 2026 lists 1,619 ileostomy bag rows, 1,410 colostomy bag rows, 783 urostomy bag rows and 1,120 rows of two-piece systems. Closed bags suit firm colostomy output; drainable bags suit ileostomies; urostomy bags have a tap. Convex baseplates press gently around a flush or retracted stoma to improve the seal, for example B. Braun's Softima convex range. Part IXC also lists stoma caps (14 rows) and colostomy plugs (4 rows, Coloplast's Conseal), used by some people with a regular colostomy, and a leakage notification system (10 rows, Coloplast's Heylo), a sensor layer under the baseplate that alerts a phone when output is spreading under it.\n\nThe largest suppliers by Part IXC rows are Coloplast (936), AMI Medical (798, mostly belts), Marlen (612), Nu-Hope (612), CUI (564), Salts (541), Dansac (530), Unora (496), ConvaTec (487), Pelican (483), Hollister (477) and Welland (354). The busiest bag lines are SenSura Mio (Coloplast), Moderma Flex (Hollister), Confidence BE (Salts), Welland Aura and Pelican Platinum. Continent diversions such as the Kock pouch are emptied with a catheter instead of a bag (FDA code KPH, catheter, rectal for continent ileostomy).",
    principle: "A hydrocolloid or silicone adhesive baseplate cut or moulded to the stoma seals to the skin; a pouch attached by adhesive, a mechanical ring or a single-piece weld collects output, with a filter to vent gas and an outlet or tap for drainable designs.",
    strengths: ["Many shapes and fittings, prescribed free in England for people with a stoma", "Convex and mouldable bases solve most seal problems"],
    limitations: ["Leaks and sore skin are common and need a stoma nurse's review", "Choice is wide enough to be confusing without specialist help"],
    cancers: ["colorectal", "rectal-cancer", "urothelial", "muscle-invasive-bladder-cancer"], technologies: ["ostomy-skin-care-products", "ostomy-support-garments", "colostomy-irrigation", "ostomy-output-management-products", "rejuv-recon-stoma-reversal", "rejuv-mind-body-after-stoma-and-limb-loss"],
    terms: ["stoma", "living-with-a-stoma-bowel-cancer", "nhs-stoma-supply-route"], companies: ["coloplast", "convatec", "hollister", "salts-healthcare", "b-braun", "uoaa", "wocn-society"],
    links: [fdaClass("EXB", "ostomy collector"), fdaClass("EZQ", "colostomy pouch"), fdaClass("EXH", "urinary ileostomy bag"), fdaClass("KPH", "rectal catheter for continent ileostomy"), PART_IX] }),

  tech({ id: "colostomy-irrigation", name: "Colostomy irrigation systems", aka: ["Colostomy irrigation", "Stoma irrigation", "Irrigation sleeve", "Ostomy irrigator", "Colotip", "Visi-Flow", "Irri-Drain"],
    sections: ["surgery", "supportive-care", "devices"], status: "established",
    tldr: "A way for some people with a colostomy to empty the bowel with water through the stoma once a day or every other day, so that they need only a small cap or patch in between instead of a bag.",
    summary: "An ostomy irrigator is a class II device in the United States (FDA product code EXD, 21 CFR 876.5895). Part IXC of the NHS Drug Tariff lists 70 rows of irrigation appliances in November 2026, including sleeves and cones from Coloplast (Assura, Colotip), Dansac and ConvaTec. Irrigation is used with a colostomy, where output is formed, rather than an ileostomy, and a stoma nurse teaches it.",
    principle: "Warm water from a bag runs through a soft cone held in the stoma; the bowel then empties into a sleeve draining into the toilet, and regular irrigation trains the bowel to stay quiet between sessions.",
    strengths: ["Can replace a bag with a cap between irrigations", "Gives control over timing"],
    limitations: ["Only for colostomies with formed output", "Takes up to an hour and needs training"],
    cancers: ["colorectal", "rectal-cancer"], technologies: ["ostomy-appliances", "ostomy-output-management-products"], terms: ["stoma"], companies: ["coloplast", "convatec"],
    links: [fdaClass("EXD", "ostomy irrigator"), PART_IX] }),

  tech({ id: "ostomy-support-garments", name: "Ostomy belts and parastomal hernia support garments", aka: ["Ostomy belt", "Stoma support belt", "Hernia support belt", "Parastomal hernia support", "Stoma support garment"],
    sections: ["surgery", "supportive-care", "devices"], status: "established",
    tldr: "Belts, pants and wraps that support the tummy around a stoma, worn to hold the bag securely or to support a bulge (parastomal hernia) that can develop next to a stoma.",
    summary: "Ostomy belts are the largest group in Part IXC of the NHS Drug Tariff: 2,507 rows in November 2026, mostly from AMI Medical (798), Nu-Hope (551), CUI (495), Kavendor (313) and Vanilla Blush (136), with lines such as Suportx, Comfizz and Nu-Hope belts. A parastomal hernia is a bulge of bowel through the abdominal wall beside the stoma; the glossary's stoma entries describe it. Support garments are made to measure or in standard sizes and are prescribed after a stoma nurse's assessment. This record does not grade whether support garments prevent hernias.",
    principle: "An elastic garment with or without a stoma opening applies even pressure over the abdominal wall around the stoma, supporting the baseplate and the muscles beside it.",
    strengths: ["Comfort and confidence during activity", "Prescribable on the NHS in many styles"],
    limitations: ["Prevention of hernia not established here", "Fit needs specialist measurement"],
    cancers: ["colorectal", "rectal-cancer"], technologies: ["ostomy-appliances", "ostomy-skin-care-products"], terms: ["stoma", "living-with-a-stoma-bowel-cancer"],
    links: [PART_IX] }),

  tech({ id: "ostomy-skin-care-products", name: "Stoma skin protectors, seals, pastes and adhesive removers", aka: ["Barrier ring", "Stoma seal", "Mouldable ring", "Stoma paste", "Skin barrier film", "Adhesive remover", "Brava", "Ally ring", "Stomahesive"],
    sections: ["supportive-care", "devices"], status: "standard-of-care",
    tldr: "Rings, pastes, wipes and sprays that protect the skin around a stoma and stop leaks, and sprays that dissolve the glue so a bag comes off without pulling the skin.",
    summary: "In the United States these are class I accessories under 21 CFR 876.5900 (FDA codes EXE protector, ostomy, and EZR cement, stomal appliance). Part IXC of the NHS Drug Tariff lists, in November 2026, 153 rows of ostomy skin protectors (Coloplast 30, Salts 22, Hollister 21, among them Brava protective seals, CeraPlus rings and Salts mouldable seals), 113 rows of skin protectives such as barrier films and wipes, 12 rows of skin fillers (pastes such as Adapt, Ally, Brava and Esenta Stomahesive) and 66 rows of adhesive removers (Lift Plus, Peel, Brava, Esenta Sting). Sore skin under the baseplate is often caused by output reaching the skin through a poor seal.",
    principle: "Mouldable hydrocolloid rings and pastes fill gaps and creases between the stoma and the baseplate; silicone films protect the skin from output and adhesive; silicone-based removers release the adhesive bond without stripping skin.",
    strengths: ["Fix most leaks without changing the bag type", "Silicone removers reduce skin stripping"],
    limitations: ["Persistent sore skin needs a stoma nurse, not more products", "Some ingredients cause allergic reactions"],
    technologies: ["ostomy-appliances", "ostomy-support-garments", "ostomy-output-management-products"], terms: ["stoma"], companies: ["coloplast", "hollister", "convatec", "salts-healthcare"],
    links: [fdaClass("EXE", "ostomy protector"), fdaClass("EZR", "stomal appliance cement"), PART_IX] }),

  tech({ id: "ostomy-output-management-products", name: "Stoma output thickeners and deodorants", aka: ["Ostomy gelling agent", "Solidifying sachet", "Ostomy deodorant", "Absorbian", "Morform", "Esenta Diamonds"],
    sections: ["supportive-care", "devices"], status: "established",
    tldr: "Sachets put in the bag that turn watery output into gel, and drops or sprays that cut down on smell, used mostly with an ileostomy.",
    summary: "Part IXC of the NHS Drug Tariff lists 13 rows of ostomy discharge solidifying agents in November 2026 (for example Absorbian sachets from Charles S Bullen Stomacare, Morform sachets and ConvaTec's Esenta Diamonds) and 46 rows of ostomy deodorants (for example Respond's Neutralise, Day-drop and Coloplast Brava). Gelling agents make high-output bags easier to empty and less likely to leak; they do not reduce how much fluid is lost, which matters for dehydration with a high-output ileostomy and is managed medically.",
    principle: "Superabsorbent polymers in a sachet absorb liquid output in the bag to form a gel; deodorants neutralise or mask odour compounds in the bag.",
    strengths: ["Fewer leaks and easier emptying with liquid output", "More confidence about smell"],
    limitations: ["Do not treat high output or dehydration", "An added cost for each bag"],
    technologies: ["ostomy-appliances", "ostomy-skin-care-products", "colostomy-irrigation"], terms: ["stoma"], companies: ["convatec", "coloplast"],
    links: [PART_IX] }),

  // -------------------------------------------------------------------------------------------------------------------
  // Breast implants, expanders, matrices and external prostheses
  // -------------------------------------------------------------------------------------------------------------------
  tech({ id: "breast-implants", name: "Breast implants for reconstruction (silicone gel, saline and shaped cohesive gel)", aka: ["Breast implant", "Silicone breast implant", "Saline breast implant", "Natrelle", "MemoryGel", "MemoryShape", "Motiva", "Sientra", "Natrelle highly cohesive"],
    sections: ["surgery", "supportive-care", "devices"], status: "standard-of-care", since: 2000,
    tldr: "Implants filled with silicone gel or salt water used to rebuild a breast after mastectomy. They are not lifetime devices: some need replacing, and the FDA requires a warning and a checklist that patients read before agreeing to them.",
    summary: "Breast implants are class III devices in the United States, approved by PMA. Silicone gel-filled implants (product code FTR) include Allergan's Natrelle (P020056) and Mentor's MemoryGel (P030053), both approved on 17 November 2006, Sientra's silicone gel implants (P070004, 9 March 2012, now held by Tiger Aesthetics Medical), Allergan's Natrelle highly cohesive silicone-filled implants (P040046, 20 February 2013) and Mentor MemoryShape (P060028, 14 June 2013), and Motiva SmoothSilk implants (P230005, 26 September 2024). Saline-filled implants (code FWM) are Natrelle saline (P990074) and Mentor's saline-filled and Spectrum implants (P990075), both approved on 10 May 2000.\n\nThe FDA's breast implant page lists the actions that shape choice today: the request of 24 July 2019 that Allergan voluntarily recall Natrelle BIOCELL textured breast implants and tissue expanders from the market; labeling guidance from September 2020 adding a boxed warning and a patient decision checklist; and orders on 27 October 2021 restricting sale and distribution so that patients receive that risk information before surgery. The FDA lists local complications that occur in at least 1 per cent of patients, including capsular contracture, rupture and further operations, and describes the systemic symptoms some patients call breast implant illness. England's Breast and Cosmetic Implant Registry was launched in October 2016 after the high rupture rate of Poly Implant Prothese (PIP) implants and the inability to trace affected women, according to the plastic surgery associations (BAPRAS).",
    principle: "An elastomer silicone shell filled with silicone gel or saline is placed under or over the chest muscle, often after a tissue expander has stretched the skin, to restore breast volume and shape.",
    strengths: ["Shorter operation and recovery than reconstruction with the patient's own tissue", "Range of shapes, sizes and fills"],
    limitations: ["Not lifetime devices; further operations are common", "Capsular contracture, rupture and, with textured surfaces, lymphoma risk", "Radiotherapy raises complication rates"],
    cancers: ["breast-cancer", "breast-implant-associated-alcl"], technologies: ["rejuv-recon-breast", "breast-tissue-expanders", "acellular-dermal-matrix-breast", "nipple-areola-tattooing", "external-breast-prostheses"], terms: ["breast-reconstruction", "bia-alcl", "breast-implant-capsule-cancers", "breast-implant-illness"], trials: ["ibra-study"], companies: ["establishment-labs"],
    links: [fdaPma("P020056", "Natrelle silicone-filled breast implants"), fdaPma("P030053", "Mentor MemoryGel silicone gel-filled breast implants"), fdaPma("P070004", "Sientra silicone gel breast implants"), fdaPma("P040046", "Natrelle highly cohesive silicone-filled implants"), fdaPma("P060028", "Mentor MemoryShape breast implants"), fdaPma("P230005", "Motiva SmoothSilk silicone gel-filled implants"), fdaPma("P990074", "Natrelle saline breast implants"), fdaPma("P990075", "Mentor saline-filled and Spectrum mammary prostheses"), FDA_BREAST, FDA_BREAST_RISKS, BCIR] }),

  tech({ id: "breast-tissue-expanders", name: "Breast tissue expanders (saline and carbon dioxide)", aka: ["Tissue expander", "Natrelle 133", "Mentor CPX4", "PliaForm", "AlloX2", "Motiva Flora", "AeroForm"],
    sections: ["surgery", "devices"], status: "standard-of-care", since: 2016,
    tldr: "A temporary empty implant placed at mastectomy and gradually filled over weeks to stretch the skin, so that a permanent implant can be put in later.",
    summary: "Saline tissue expanders are cleared in the United States under product code LCJ. Current examples include AbbVie's Natrelle 133S (K254126, 16 January 2026), Mentor's CPX4 Plus Enhance (K241918, 2 August 2024) and PliaForm with suture tabs (K242963, 24 April 2025), Sientra's AlloX2 Pro (K214124, 8 June 2023) and Motiva's Flora SmoothSilk expander (K211676, 13 October 2023). AeroForm, made by AirXpanders, took a different approach: it was filled with carbon dioxide from a canister inside the device, released by a remote controller, and was granted De Novo classification as a carbon dioxide gas controlled tissue expander (DEN150055, 21 December 2016, product code PQN). Textured Natrelle expanders were part of the 2019 BIOCELL recall described on the breast implants record.",
    principle: "A silicone shell with an integrated or remote injection port is filled stepwise with saline through the skin (or with carbon dioxide released from an internal reservoir) to stretch the overlying skin and muscle.",
    strengths: ["Creates space for an implant when skin is tight after mastectomy", "Can be kept in place through radiotherapy in some pathways"],
    limitations: ["A second operation is needed to exchange for an implant", "Infection and expander loss"],
    cancers: ["breast-cancer"], technologies: ["breast-implants", "acellular-dermal-matrix-breast", "rejuv-recon-breast"], terms: ["breast-reconstruction"], companies: ["abbvie", "establishment-labs"],
    links: [fda510k("K254126", "Natrelle 133S tissue expanders (16 January 2026)"), fda510k("K241918", "Mentor CPX4 Plus Enhance (2 August 2024)"), fda510k("K242963", "Mentor PliaForm (24 April 2025)"), fda510k("K214124", "Sientra AlloX2 Pro (8 June 2023)"), fda510k("K211676", "Motiva Flora SmoothSilk tissue expander (13 October 2023)"), fdaDeNovo("DEN150055", "AeroForm tissue expander system")] }),

  tech({ id: "acellular-dermal-matrix-breast", name: "Acellular dermal matrices and meshes in implant reconstruction", aka: ["Acellular dermal matrix", "ADM", "Biological mesh", "SurgiMend", "GalaFLEX", "AlloDerm"],
    sections: ["surgery", "devices"], status: "established", since: 2009,
    tldr: "Sheets of processed animal or human skin, or absorbable synthetic mesh, used by surgeons to cover or support a breast implant or expander. The FDA has warned that complication rates differ between products.",
    summary: "Matrices and meshes reach the US market under general surgical mesh codes rather than for breast reconstruction specifically: TEI Biosciences' SurgiMend was cleared as surgical mesh (K083898, 4 February 2009, code FTM) and Tepha's GalaFLEX absorbable mesh as surgical film (K140533, 21 May 2014, code OOD). On 31 March 2021 the FDA issued a safety communication, now archived on its breast implant page, titled \"Acellular Dermal Matrix (ADM) Products Used in Implant-Based Breast Reconstruction Differ in Complication Rates\". In implant reconstruction the matrix forms a sling at the lower edge of the implant or wraps it completely when the implant sits in front of the chest muscle.",
    principle: "A decellularised collagen scaffold or bioabsorbable polymer mesh is sutured to the chest wall and muscle to cover and position the implant while the patient's own tissue grows into it.",
    strengths: ["Allows implant placement in front of the muscle", "Supports the implant's position"],
    limitations: ["Complication rates differ between products (FDA, 2021)", "Seroma and infection; adds cost"],
    cancers: ["breast-cancer"], technologies: ["breast-implants", "breast-tissue-expanders", "rejuv-recon-breast"], terms: ["breast-reconstruction"],
    links: [fda510k("K083898", "SurgiMend (4 February 2009)"), fda510k("K140533", "GalaFLEX mesh (21 May 2014)"), FDA_BREAST] }),

  tech({ id: "external-breast-prostheses", name: "External breast prostheses, mastectomy bras and nipple prostheses", aka: ["Breast form", "Breast prosthesis", "Silicone breast form", "Mastectomy bra", "Post-mastectomy camisole", "Nipple prosthesis", "Adhesive breast prosthesis", "American Breast Care", "Trulife"],
    sections: ["supportive-care", "devices"], status: "standard-of-care",
    tldr: "A breast form worn inside a bra after mastectomy instead of, or before, reconstruction. They come in silicone, foam and fibre, stick-on and pocket versions, and as stick-on nipples; American insurers cover replacements on a set schedule.",
    summary: "The FDA classes external breast prostheses as class I devices under 21 CFR 878.3800, product codes KCZ (used with adhesive) and NOJ (no adhesive). American billing codes describe the range: L8000 a mastectomy bra with pockets, L8001 and L8002 bras with an integrated form, L8015 a post-mastectomy camisole with a fibre-filled form, L8020 a mastectomy form, L8030 and L8031 silicone prostheses without and with integral adhesive, L8032 and L8033 reusable and custom nipple prostheses and L8035 a custom prosthesis moulded to the patient. A health plan policy that follows the Medicare coverage rules (OSU Health Plan) gives the expected useful life as two years for a silicone prosthesis, six months for fabric, foam or fibre forms and three months for a nipple prosthesis. The NHS Drug Tariff Part IX lists no breast prostheses. Firms registered with the FDA for these codes include American Breast Care and Anita Dr. Helbig (KCZ) and Trulife and Thuasne (NOJ).",
    principle: "A weighted silicone gel or lightweight form shaped like a breast, held in a bra pocket or attached to the chest wall with adhesive, restores symmetry and balance after mastectomy.",
    strengths: ["No surgery; can be worn soon after the wound heals", "Weighted forms help posture and bra fit"],
    limitations: ["Heat, sweating and skin irritation with adhesive forms", "Replacement depends on insurer or NHS service rules"],
    cancers: ["breast-cancer"], technologies: ["breast-implants", "rejuv-rehab-assistive-devices", "nipple-areola-tattooing", "pneumatic-compression-lymphoedema"], terms: ["mastectomy", "breast-reconstruction"], related: ["knitted-knockers"],
    links: [fdaClass("KCZ", "external breast prosthesis used with adhesive"), fdaClass("NOJ", "external breast prosthesis, no adhesive"), OSU_HCPCS, { label: "openFDA registration and listing: firms listing product code NOJ", url: "https://api.fda.gov/device/registrationlisting.json?search=products.product_code:NOJ&limit=100" }, { label: "openFDA registration and listing: firms listing product code KCZ", url: "https://api.fda.gov/device/registrationlisting.json?search=products.product_code:KCZ&limit=100" }] }),

  tech({ id: "nipple-areola-tattooing", name: "Nipple and areola tattooing after breast surgery", aka: ["Areola tattoo", "Nipple tattoo", "Medical micropigmentation", "3D nipple tattoo", "Medical tattooing"],
    sections: ["surgery", "supportive-care"], status: "standard-of-care",
    tldr: "Tattooing colour onto a rebuilt breast to create the look of an areola and nipple, usually done some months after reconstruction is finished.",
    summary: "Dorset NHS hospital patient information describes the procedure: \"After breast and nipple reconstruction surgery, colour can be added to create a natural looking areola to your new breast(s)\", using semi-permanent colour applied into the top layer of skin with a small hand-held machine. It may be done on a reconstructed nipple or, with shading, to give the appearance of a nipple on a flat surface (often called 3D tattooing). The colour fades and may need topping up.",
    principle: "Pigment is implanted into the superficial dermis with a hand-held machine, shaded to imitate the colour and projection of an areola and nipple.",
    strengths: ["Completes reconstruction without further surgery", "Can be repeated as colour fades"],
    limitations: ["Pigment fades and may need repeating", "Less predictable on irradiated skin"],
    cancers: ["breast-cancer"], technologies: ["breast-implants", "external-breast-prostheses", "rejuv-recon-breast"], terms: ["breast-reconstruction"],
    links: [{ label: "Dorset County Hospital NHS: medical tattoos after breast surgery (patient leaflet)", url: "https://www.dgft.nhs.uk/pil/medical-tattoos-after-breast-surgery/" }] }),

  // -------------------------------------------------------------------------------------------------------------------
  // Lymphoedema
  // -------------------------------------------------------------------------------------------------------------------
  tech({ id: "pneumatic-compression-lymphoedema", name: "Pneumatic compression pumps for lymphoedema (Flexitouch, Lympha Press, Hydroven)", aka: ["Pneumatic compression device", "Sequential compression pump", "Intermittent pneumatic compression", "Lymphoedema pump", "Flexitouch", "Lympha Press", "Hydroven", "entré"],
    sections: ["supportive-care", "devices"], status: "established", since: 2007,
    tldr: "An inflatable sleeve or garment connected to a pump that squeezes the swollen arm or leg in waves, used at home alongside compression garments to move fluid out of a limb with lymphoedema.",
    summary: "These pumps are cleared under FDA product code JOW (sleeve, limb, compressible; 21 CFR 870.5800, class II), which also covers pumps used to prevent blood clots. Lymphoedema models include Tactile Medical's Flexitouch Plus (K203178, 20 December 2020, and an advanced pneumatic compression system cleared on 31 July 2026, K253555), whose indication lists lymphoedema, post-mastectomy oedema and, for a head and neck garment, \"head and neck lymphedema\"; Tactile's entré (K143185, 7 May 2015); Mego Afek's Lympha Press Optimal Plus (K182003, 27 February 2019); Bio Compression Systems' Sequential Circulator (K261807, 11 September 2026); Huntleigh's Hydroven 12 (K152228, 4 April 2016); Airos Medical's AIROS 8P (K223193, 9 December 2022); and Wright Linear Pump's models 51 and 52 (K071040, 22 May 2007). Pumps are an addition to decongestive therapy and compression garments, which have their own record; this record does not grade the trial evidence.",
    principle: "Multi-chamber garments inflate in sequence from the far end of the limb towards the trunk at set pressures, then deflate, moving interstitial fluid towards working lymphatics.",
    strengths: ["Home treatment between therapist visits", "Head, neck and trunk garments for sites a sleeve cannot reach"],
    limitations: ["An addition to compression and decongestive therapy, not a replacement", "Cost and insurer criteria for advanced pumps"],
    cancers: ["breast-cancer", "head-and-neck", "cervical"], technologies: ["lymphoedema-decongestive-therapy", "lymphoedema-surgery-and-early-detection", "rejuv-measure-lymphoedema"], terms: ["breast-cancer-related-lymphoedema"],
    links: [fdaClass("JOW", "compressible limb sleeve"), fda510k("K203178", "Flexitouch Plus system (20 December 2020)"), fda510k("K253555", "Flexitouch Plus advanced pneumatic compression system (31 July 2026)"), fda510k("K143185", "entré (7 May 2015)"), fda510k("K182003", "Lympha Press Optimal Plus (27 February 2019)"), fda510k("K261807", "Sequential Circulator (11 September 2026)"), fda510k("K152228", "Hydroven 12 (4 April 2016)"), fda510k("K223193", "AIROS 8P (9 December 2022)"), fda510k("K071040", "Wright models 51 and 52 (22 May 2007)")] }),

  // -------------------------------------------------------------------------------------------------------------------
  // Laryngectomy
  // -------------------------------------------------------------------------------------------------------------------
  tech({ id: "voice-prostheses", name: "Voice prostheses after laryngectomy (Provox, Blom-Singer)", aka: ["Voice prosthesis", "Tracheoesophageal voice prosthesis", "Speaking valve", "Provox Vega", "Provox ActiValve", "Blom-Singer"],
    sections: ["surgery", "supportive-care", "devices"], status: "standard-of-care", since: 1999,
    tldr: "A small one-way valve fitted between the windpipe and the gullet after the voice box is removed. Covering the breathing hole in the neck sends air through the valve, and the throat vibrates to make a voice.",
    summary: "The FDA classes voice prostheses as laryngeal prostheses (product code EWL, 21 CFR 874.3730). Atos Medical's clearances include Provox Vega (K090455, 5 June 2009), Provox ActiValve (K092593, 14 October 2010) and the Provox FreeHands FlexiVoice (K141380, 26 September 2014). Helix Medical (InHealth) holds clearances for the Blom-Singer Indwelling 2000 (K991587, 25 June 1999) and Blom-Singer dual valve indwelling prosthesis (K082206, 4 September 2008). The record on voice after laryngectomy covers how the prosthesis is used, why it is changed and why people stop using it.",
    principle: "A silicone one-way valve sits in a surgical puncture between the posterior tracheal wall and the oesophagus; occluding the stoma diverts exhaled air through it into the pharynx, whose tissue vibrates to produce voice, while the valve closes to stop food and drink entering the airway.",
    strengths: ["Fluent speech for most people fitted", "Indwelling models changed in clinic"],
    limitations: ["Leakage through or around the valve, often from Candida biofilm", "Needs regular replacement by a specialist team"],
    cancers: ["laryngeal-cancer", "hypopharyngeal-cancer", "head-and-neck"], technologies: ["rejuv-recon-voice-after-laryngectomy", "laryngectomy-stoma-care-devices", "rejuv-rehab-assistive-devices"], companies: ["atos-medical"],
    links: [fdaClass("EWL", "laryngeal prosthesis"), fda510k("K090455", "Provox Vega (5 June 2009)"), fda510k("K092593", "Provox ActiValve (14 October 2010)"), fda510k("K141380", "Provox FreeHands FlexiVoice (26 September 2014)"), fda510k("K991587", "Blom-Singer Indwelling 2000 (25 June 1999)"), fda510k("K082206", "Blom-Singer dual valve indwelling (4 September 2008)")] }),

  tech({ id: "laryngectomy-stoma-care-devices", name: "Heat and moisture exchangers, laryngectomy tubes and stoma protectors", aka: ["HME", "Heat and moisture exchanger", "Artificial nose", "Laryngectomy tube", "LaryTube", "Stoma button", "Stoma protector", "Shower protector", "Provox Micron"],
    sections: ["supportive-care", "devices"], status: "standard-of-care", since: 2008,
    tldr: "Small filters worn over the breathing hole in the neck after the voice box is removed. They warm, moisten and clean the air the nose used to, and covers and guards keep water and dust out when showering or outdoors.",
    summary: "After total laryngectomy air goes straight into the windpipe without passing through the nose. Heat and moisture exchangers (HMEs) clip into a baseplate stuck around the stoma or into a laryngectomy tube or button. Atos Medical's Provox Micron HME was cleared on 30 May 2008 (K072582, product code JOH). In England these are prescribed from Part IXA of the NHS Drug Tariff: in November 2026 it lists 482 rows of tracheostomy breathing aids, most from Severn Healthcare Technologies (207) and Atos Medical (137), including Provox Life HMEs and Provox LaryTube tubes, and 58 rows of tracheostomy and laryngectomy protectors such as Provox protectors and shower aids.",
    principle: "A foam or paper cassette in the stoma traps the heat and moisture of each exhaled breath and returns it on the next inhalation, adds a little breathing resistance like the nose did, and filters particles.",
    strengths: ["Reduces coughing and mucus after laryngectomy", "Prescribable in England"],
    limitations: ["Baseplate adhesion problems on irradiated skin", "Daily replacement of cassettes"],
    cancers: ["laryngeal-cancer", "hypopharyngeal-cancer"], technologies: ["voice-prostheses", "rejuv-recon-voice-after-laryngectomy", "rejuv-rehab-assistive-devices"], companies: ["atos-medical"],
    links: [fda510k("K072582", "Provox Micron HME (30 May 2008)"), PART_IX] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Companies and organisations
// ---------------------------------------------------------------------------------------------------------------------
export const devicesGapsCompanies: CompanyInput[] = [
  co({ id: "coloplast", name: "Coloplast", aka: ["Coloplast Ltd", "Coloplast A/S"], hq: "Humlebaek", country: "DK", companyType: "devices", sections: ["supportive-care", "devices"],
    tldr: "Coloplast makes stoma bags, skin care and continence products. It is the largest stoma product supplier on the NHS prescription list for England by number of product lines.",
    summary: "Coloplast A/S is registered with the FDA at Humlebaek, Denmark. Coloplast has 936 rows in Part IXC (stoma appliances) of the NHS Drug Tariff for November 2026, more than any other supplier, across lines including SenSura Mio (371 rows), SenSura Click, SenSura Flex and Assura bags, Brava seals, pastes and adhesive removers, the Conseal colostomy plug, Assura irrigation and the Heylo leakage notification system. OnCo links it to the stoma product records.",
    technologies: ["ostomy-appliances", "colostomy-irrigation", "ostomy-skin-care-products", "ostomy-output-management-products"], links: [PART_IX] }),
  co({ id: "convatec", name: "ConvaTec", aka: ["ConvaTec Ltd", "ConvaTec Inc", "Convatec"], hq: "Greensboro, NC", country: "US", companyType: "devices", website: "https://www.convatec.com/", sections: ["supportive-care", "devices"],
    tldr: "ConvaTec makes stoma bags and skin care products, including the Esteem and Natura lines, alongside wound and infusion care products.",
    summary: "ConvaTec has 487 rows in Part IXC of the NHS Drug Tariff for November 2026, including Combihesive Natura and Esteem bags, Esenta skin protectives and Stomahesive paste, and Esenta Diamonds gelling sachets. The owner operator named in its FDA establishment registrations is ConvaTec of Greensboro, North Carolina, with sites registered in Deeside, Wales, and the Dominican Republic among others.",
    technologies: ["ostomy-appliances", "ostomy-skin-care-products", "ostomy-output-management-products", "colostomy-irrigation"], links: [PART_IX, { label: "openFDA registration listing for product code EXB", url: "https://api.fda.gov/device/registrationlisting.json?search=products.product_code:EXB&limit=100" }] }),
  co({ id: "hollister", name: "Hollister", aka: ["Hollister Incorporated", "Hollister Ltd"], hq: "Libertyville, IL", country: "US", companyType: "devices", website: "https://www.hollister.com/", sections: ["supportive-care", "devices"],
    tldr: "Hollister makes stoma bags and skin barriers, including the Moderma Flex and CeraPlus lines.",
    summary: "Hollister Incorporated is registered with the FDA at Libertyville, Illinois. Hollister has 477 rows in Part IXC of the NHS Drug Tariff for November 2026, including Moderma Flex (310 rows) and Conform 2 bags, CeraPlus skin barriers and Adapt paste. Dansac, a separate supplier name in the same list, has 530 rows including NovaLife and Nova bags; the corporate relationship between the two is not stated in the Drug Tariff and is not asserted here.",
    technologies: ["ostomy-appliances", "ostomy-skin-care-products"], links: [PART_IX] }),
  co({ id: "salts-healthcare", name: "Salts Healthcare", aka: ["Salts", "Salts Healthcare Limited"], hq: "Aston, Birmingham", country: "GB", companyType: "devices", website: "https://www.salts.co.uk/", sections: ["supportive-care", "devices"],
    tldr: "Salts Healthcare is a British maker of stoma bags and seals, including the Confidence range.",
    summary: "Salts Healthcare Limited, registered with the FDA at Aston, Birmingham, has 541 rows in Part IXC of the NHS Drug Tariff for November 2026, led by Confidence BE (238 rows) and Confidence Natural bags, mouldable seals and adhesive removers. Other British stoma makers in the same list include Welland Medical (354 rows, Welland Aura and FreeStyle), Pelican Healthcare (483, Platinum, Select and ModaVi), Marlen Healthcare (612, UltraMax and UltraLite) and CliniMed (35).",
    technologies: ["ostomy-appliances", "ostomy-skin-care-products"], links: [PART_IX] }),
  co({ id: "atos-medical", name: "Atos Medical", aka: ["Atos Medical AB", "Provox"], hq: "Horby", country: "SE", companyType: "devices", website: "https://www.atosmedical.com/", sections: ["supportive-care", "devices"],
    tldr: "Atos Medical makes the Provox voice prostheses and the filters, tubes and covers people use after their voice box is removed.",
    summary: "Atos Medical AB, registered with the FDA at Horby, Sweden, holds FDA clearances for Provox Vega (K090455), Provox ActiValve (K092593), Provox FreeHands FlexiVoice (K141380) and the Provox Micron heat and moisture exchanger (K072582). It has 177 rows in Part IXA of the NHS Drug Tariff for November 2026, 137 of them tracheostomy breathing aids and 19 laryngectomy protectors.",
    technologies: ["voice-prostheses", "laryngectomy-stoma-care-devices"], links: [fda510k("K090455", "Provox Vega"), fda510k("K072582", "Provox Micron HME"), PART_IX] }),
  co({ id: "establishment-labs", name: "Establishment Labs (Motiva)", aka: ["Establishment Labs", "Motiva", "Motiva USA"], hq: "Coyol, Alajuela", country: "CR", companyType: "devices", sections: ["surgery", "devices"],
    tldr: "Establishment Labs makes Motiva breast implants and tissue expanders, approved in the United States in 2024.",
    summary: "Establishment Labs S.A. is registered with the FDA at Coyol, Alajuela, Costa Rica. Motiva USA, LLC holds PMA P230005 for Motiva SmoothSilk silicone gel-filled breast implants (approved 26 September 2024) and 510(k) K211676 for the Motiva Flora SmoothSilk tissue expander (13 October 2023).",
    technologies: ["breast-implants", "breast-tissue-expanders"], links: [fdaPma("P230005", "Motiva SmoothSilk breast implants"), fda510k("K211676", "Motiva Flora tissue expander")] }),
  co({ id: "uoaa", name: "United Ostomy Associations of America (UOAA)", aka: ["UOAA", "United Ostomy Associations of America, Inc."], hq: "United States", country: "US", companyType: "nonprofit", website: "https://www.ostomy.org/", sections: ["supportive-care"],
    tldr: "A national charity in the United States for people who have or will have a stoma, running local support groups, a virtual clinic and advocacy.",
    summary: "UOAA describes itself as \"a 501(c)(3) nonprofit organization that supports, empowers, and advocates for people who have had or who will have ostomy or continent diversion surgery\", with \"275+ support groups in the U.S.\", a virtual ostomy clinic and an annual Ostomy Awareness Day.",
    technologies: ["ostomy-appliances"], terms: ["stoma"], links: [{ label: "UOAA", url: "https://www.ostomy.org/" }] }),
  co({ id: "wocn-society", name: "Wound, Ostomy and Continence Nurses Society (WOCN)", aka: ["WOCN", "WOCN Society", "WOC nurse"], hq: "United States", country: "US", companyType: "nonprofit", website: "https://www.wocn.org/", sections: ["supportive-care"],
    tldr: "The professional society for specialist wound, ostomy and continence nurses in the United States, the nurses who mark the stoma site before surgery and help with bags and sore skin afterwards.",
    summary: "The WOCN Society trains and supports wound, ostomy and continence (WOC) nurses and runs an Ostomy Care Associate programme for other licensed clinicians; its site carries stoma site marking resources. In the United Kingdom the equivalent role is the stoma care nurse.",
    technologies: ["ostomy-appliances", "ostomy-skin-care-products"], terms: ["stoma"], links: [{ label: "WOCN Society", url: "https://www.wocn.org/" }] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Terms
// ---------------------------------------------------------------------------------------------------------------------
export const devicesGapsTerms: TermInput[] = [
  term({ id: "nhs-stoma-supply-route", name: "Stoma supplies on NHS prescription in England (appliance contractors and customisation)", category: "Clinic basics", aka: ["Dispensing appliance contractor", "DAC", "Stoma appliance customisation", "Appliance use review", "Drug Tariff Part IX"],
    tldr: "In England stoma bags and accessories are prescribed by the GP and supplied by a pharmacy or a specialist home-delivery company, which can also cut bags to fit and review how the products are working.",
    summary: "Stoma products are listed in Part IXC of the NHS Drug Tariff (8,229 rows in November 2026). NHSBSA explains that dispensing appliance contractors (DACs) and pharmacy contractors \"may choose to provide either one or both of the following advanced services: stoma appliance customisation\" and \"appliance use reviews\", after declaring their intention to NHS Prescription Services. In practice the stoma nurse chooses the products, the GP prescribes them and the contractor delivers them, often cut to the stoma's size.",
    technologies: ["ostomy-appliances", "ostomy-skin-care-products"], related: ["stoma"],
    links: [PART_IX_PAGE, PART_IX] }),
  term({ id: "breast-implant-capsule-cancers", name: "Squamous cell carcinoma and lymphomas in the capsule around breast implants", category: "Side effects", aka: ["BIA-SCC", "Breast implant-associated squamous cell carcinoma", "Capsule cancer"],
    tldr: "Besides the lymphoma linked to textured breast implants, the FDA has received reports of a skin-type cancer (squamous cell carcinoma) and other lymphomas in the scar tissue around implants. It believes they may be rare and does not yet know their cause or how often they happen.",
    summary: "In a safety communication updated on 8 March 2023 the FDA said it \"is aware of 19 cases of SCC in the capsule around the breast implant from published literature\", that deaths from progression have been reported, and that \"the cause, incidence and risk factors remain unknown\". It first warned of SCC and various lymphomas in the capsule on 8 September 2022. These lymphomas are not the same as breast implant-associated anaplastic large cell lymphoma (BIA-ALCL), which has its own record. Since 22 March 2023 clinicians can report cases to the PROFILE registry run by the American Society of Plastic Surgeons, the Plastic Surgery Foundation and the FDA. In December 2023 the FDA added mesenchymal tumours, including sarcoma, to the same section of its risks page.",
    technologies: ["breast-implants"], related: ["bia-alcl", "breast-implant-associated-alcl", "breast-implant-illness"],
    links: [FDA_SCC, FDA_BREAST_RISKS] }),
  term({ id: "breast-implant-illness", name: "Breast implant illness (systemic symptoms with breast implants)", category: "Side effects", aka: ["BII", "Breast implant illness", "Systemic symptoms of breast implants"],
    tldr: "Some people with breast implants report tiredness, memory problems, rashes and joint pain that they call breast implant illness. The FDA says these symptoms and their cause are poorly understood, and that removal without replacement has been reported to help some people.",
    summary: "The FDA's risks and complications page says: \"Symptoms such as fatigue, memory loss, rash, 'brain fog,' and joint pain may be associated with breast implants. Some patients may use the term 'breast implant illness' (BII) to describe these symptoms.\" It adds that \"These symptoms and what causes them are poorly understood\" and that \"In some cases, removal of the breast implants without replacement is reported to reverse symptoms\". The FDA published an analysis of medical device reports of these symptoms on 20 August 2020 and asks patients to report them through MedWatch.",
    technologies: ["breast-implants"], related: ["breast-implant-capsule-cancers", "bia-alcl"],
    links: [FDA_BREAST_RISKS, FDA_BREAST] }),
];
