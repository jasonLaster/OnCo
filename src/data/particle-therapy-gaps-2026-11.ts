import type { InstitutionInput } from "@/lib/schema";

/**
 * Particle therapy facilities, gap census November 2026 (type `radiotherapy-facilities`): the twenty US proton
 * centres the census found missing or only mentioned, from the National Association for Proton Therapy's "Find a
 * Center" list (http://proton-therapy.org/findacenter/, read raw on 4 November 2026: 60 entries, member and
 * non-member, some flagged "Center In Development"). Name, NAPT status and street address come from that list;
 * everything else comes from the operator's own page, or a partner's or university's release where the operator's
 * site refused a script, and each record says which. Coordinates are the map pins NAPT publishes in its directions
 * links, rounded to three decimals: street-level as NAPT placed them, not surveyed.
 *
 * The worldwide list (PTCOG, ptcog.online) needs a login and was not used. Several operators' sites answered a
 * script with a bot wall (Incapsula on pennmedicine.org and hamptonproton.org; 403 on moffitt.org, rwjbh.org and
 * hopkinsmedicine.org; 429 on orlandohealth.com; no connection to stjude.org); those were not worked around, and
 * the records built on them hold only what the NAPT list and other readable pages state.
 */

const asOf = "2026-11-04";
const NAPT = { label: "National Association for Proton Therapy: Find a Center", url: "http://proton-therapy.org/findacenter/" };

type I = Omit<InstitutionInput, "kind" | "asOf" | "institutionType" | "country">;
const i = (x: I): InstitutionInput => ({
  kind: "institution", asOf, institutionType: "hospital", country: "US",
  ...x,
  links: [...(x.links ?? []), NAPT],
});

export const institutionsParticleTherapyGaps2026: InstitutionInput[] = [
  i({ id: "st-jude-proton-therapy-center", name: "St. Jude Proton Therapy Center", aka: ["St. Jude Red Frog Events Proton Therapy Center"],
    city: "Memphis", lat: 35.154, lng: -90.042,
    tldr: "The proton therapy centre on the campus of St. Jude Children's Research Hospital in Memphis, Tennessee, where children with cancer receive proton radiotherapy.",
    summary: "The National Association for Proton Therapy lists the St. Jude Proton Therapy Center at 262 Danny Thomas Place, Memphis, Tennessee 38105, the address of St. Jude Children's Research Hospital, as an operating centre that is not a member of the association.\n\nProton therapy aims a beam of protons that stops in the tumour, so less radiation reaches the tissue beyond it. That matters most for children, whose growing tissues are the most sensitive to radiation.",
    institutions: ["st-jude"], technologies: ["proton-therapy"],
    notes: ["stjude.org did not answer a script on 4 November 2026 (no connection, two attempts), so opening date, rooms, equipment and patient numbers are not stated here. The alias is the name the gap census checked; it was not confirmed on a St. Jude page."] }),

  i({ id: "cincinnati-childrens-proton-therapy-center", name: "Cincinnati Children's Proton Therapy Center", aka: ["Cincinnati Children's/UC Health Proton Therapy Center"],
    city: "Liberty Township", lat: 39.377, lng: -84.368, website: "https://www.cincinnatichildrens.org/service/p/proton-therapy",
    tldr: "A proton therapy centre run by Cincinnati Children's Hospital in Ohio, open since 2016, mostly for children and young adults. It ran the first trial of FLASH proton therapy, which gives the whole dose in under a second, in people.",
    summary: "Cincinnati Children's describes its centre as one of the first proton therapy centres in the world opened by a paediatric hospital. It treats with pencil-beam scanning, and the hospital reports more than 1,900 patients treated since the centre opened in 2016, nearly 1,100 of them children. A full inpatient paediatric cancer unit is down the hall, so children who need to stay in hospital do not have to be transported for each treatment. Young adults aged 15 to 39 with paediatric-type cancers are also treated, and more than half of patients travel from outside the area.\n\nThe hospital states that it is the only academic medical centre with a dedicated research gantry usable for both basic and clinical research, built with a 24 million dollar investment, and that its researchers led the first in-human clinical trial of FLASH proton therapy, in 2022, in adults: ultra-high dose-rate radiation delivered in under one second. NAPT lists the centre at 7777 Yankee Road, Liberty Township, Ohio.",
    institutions: ["cincinnati-childrens-cancer"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"], trials: ["fast-01"],
    links: [{ label: "Proton Therapy, Cincinnati Children's", url: "https://www.cincinnatichildrens.org/service/p/proton-therapy" }],
    notes: ["The hospital's page names the 2022 FLASH trial without its acronym; it is linked to the corpus record fast-01, which names this centre as its site. The alias is the site name that record uses."] }),

  i({ id: "md-anderson-proton-therapy-center", name: "MD Anderson Proton Therapy Center", aka: ["UT MD Anderson Proton Therapy Center", "MD Anderson Cancer Center - Proton Therapy"],
    city: "Houston", lat: 29.695, lng: -95.399, website: "https://www.mdanderson.org/patients-family/diagnosis-treatment/care-centers-clinics/proton-therapy-center.html",
    tldr: "The proton therapy centre of MD Anderson Cancer Center in Houston, Texas: two buildings, eight treatment rooms, treating prostate, lung, head and neck, liver, oesophageal, brain and children's cancers and lymphoma.",
    summary: "MD Anderson describes its Proton Therapy Center as the world's first proton therapy facility located within a comprehensive cancer center, and says it pioneered pencil-beam scanning proton therapy. The centre treats cancers of the prostate, lung, head and neck, liver, oesophagus and brain, lymphoma, paediatric cancers and other rare tumours. Its two buildings, Proton Therapy Center 1 and 2, cover more than 160,000 square feet with eight treatment rooms, anaesthesia and recovery areas, a dedicated paediatric bay and an on-site machine shop that makes the apertures used to shape the beam. It sits just south of the Texas Medical Center; NAPT lists it at 1840 Old Spanish Trail, Houston.",
    institutions: ["md-anderson"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "Proton Therapy Center, MD Anderson", url: "https://www.mdanderson.org/patients-family/diagnosis-treatment/care-centers-clinics/proton-therapy-center.html" }, { label: "Why choose MD Anderson Proton Therapy", url: "https://www.mdanderson.org/patients-family/diagnosis-treatment/care-centers-clinics/proton-therapy-center/why-choose-md-anderson-proton-therapy.html" }],
    notes: ["Opening year and patient totals were not stated on the two pages read on 4 November 2026."] }),

  i({ id: "roberts-proton-therapy-center", name: "Roberts Proton Therapy Center (Penn Medicine)", aka: ["Roberts Proton Therapy Center - Penn Medicine", "Roberts Proton Therapy Center"],
    city: "Philadelphia", lat: 39.947, lng: -75.193,
    tldr: "Penn Medicine's proton therapy centre in Philadelphia, part of the University of Pennsylvania's Abramson Cancer Center.",
    summary: "NAPT lists the Roberts Proton Therapy Center - Penn Medicine as a member centre at 3400 Civic Center Boulevard, Philadelphia, Pennsylvania 19104, the Perelman Center for Advanced Medicine campus of the University of Pennsylvania Health System. Penn Medicine runs further proton centres listed separately by NAPT (Penn Medicine Lancaster General Health, and Penn Medicine | Virtua Health in Voorhees, New Jersey).",
    institutions: ["penn-abramson"], technologies: ["proton-therapy"],
    notes: ["pennmedicine.org answered a script with an Incapsula bot wall on 4 November 2026, so opening year, rooms and patient numbers are not stated here."] }),

  i({ id: "s-lee-kling-proton-therapy-center", name: "S. Lee Kling Proton Therapy Center (Siteman Cancer Center)", aka: ["S. Lee Kling Center for Proton Therapy", "Siteman Cancer Center - S. Lee Kling Proton Therapy Center"],
    city: "St. Louis", lat: 38.639, lng: -90.262,
    tldr: "The proton therapy centre of Siteman Cancer Center in St. Louis, Missouri, for adults at Siteman and children from St. Louis Children's Hospital. In December 2013 it treated the first patient anywhere on a compact, single-room proton machine.",
    summary: "Washington University's news release of 22 January 2014 reports that the S. Lee Kling Proton Therapy Center at Washington University Medical Center treated its first patient the previous month, a 33-year-old man with a chondrosarcoma at the base of the skull, on the world's first proton system of its kind: a superconducting synchrocyclotron small enough to fit in a single room little larger than a conventional radiotherapy vault. The centre treats adult patients of Siteman Cancer Center and paediatric patients of St. Louis Children's Hospital, and at opening was the only proton centre in Missouri. It is named after S. Lee Kling, a former chairman of the Foundation for Barnes-Jewish Hospital's board, who had travelled to the East Coast for proton therapy of an eye tumour and helped raise 2.3 million dollars toward research and construction.\n\nA release of 13 January 2015 reports more than 100 patients in the first year: 6,700 treatment fields to 118 patients, about a quarter of them children, and more than 20 patients treated in a single day. The machine is the MEVION S250, made by Mevion Medical Systems of Littleton, Massachusetts, which Washington University radiation oncologists and physicists helped develop. NAPT lists the centre at 224 S. Euclid Avenue, St. Louis.",
    institutions: ["wustl-siteman"], companies: ["mevion"], technologies: ["proton-therapy", "proton-therapy-systems"],
    links: [{ label: "Siteman Cancer Center treats first patient with novel proton therapy system (WashU, 22 January 2014)", url: "https://source.washu.edu/2014/01/siteman-cancer-center-treats-first-patient-with-novel-proton-therapy-system/" }, { label: "S. Lee Kling Center for Proton Therapy completes first year of patient care (WashU, 13 January 2015)", url: "https://source.washu.edu/2015/01/s-lee-kling-center-forproton-therapycompletes-first-year-of-patient-care/" }],
    notes: ["The two WashU releases give different costs for the single-vault system (about 20 million dollars in 2014, about 25 million in 2015), so neither is stated in the summary.", "Siteman's current proton therapy page returned 404 on 4 November 2026; current rooms, equipment beyond the first unit and patient totals are not stated."] }),

  i({ id: "moffitt-schulze-proton-center", name: "Richard M. Schulze Family Foundation Proton Center (Moffitt Cancer Center)", aka: ["Moffitt Cancer Center - Richard M. Schulze Family Foundation Proton Center", "Moffitt Proton Center"],
    city: "Land O'Lakes", lat: 28.278, lng: -82.545,
    tldr: "Moffitt Cancer Center's proton therapy centre at Land O'Lakes, north of Tampa, Florida.",
    summary: "NAPT lists the Moffitt Cancer Center - Richard M. Schulze Family Foundation Proton Center as a member centre at 16370 Wilton Way, Land O'Lakes, Florida 34638, Moffitt's Pasco County campus.",
    institutions: ["moffitt"], technologies: ["proton-therapy"],
    notes: ["moffitt.org answered every request with 403 on 4 November 2026, so opening year, rooms, equipment and patient numbers are not stated here."] }),

  i({ id: "uf-health-proton-therapy-institute", name: "University of Florida Health Proton Therapy Institute", aka: ["UF Health Proton Therapy Institute", "UFHPTI", "Florida Proton"],
    city: "Jacksonville", lat: 30.349, lng: -81.663, website: "https://www.floridaproton.org/",
    tldr: "The University of Florida's proton therapy centre in Jacksonville. It treated its first patient in 2006 and, by its own count, more than 13,000 people since.",
    summary: "The institute describes itself as the first proton therapy facility in the Southeast. It treated its first patient in 2006 and reports more than 13,000 patients treated over 20 years, across more than 20 cancer types. It is part of the University of Florida Health Cancer Institute and is a designated Florida Cancer Center of Excellence. NAPT lists it at 2015 North Jefferson Street, Jacksonville.",
    institutions: ["uf-health-cancer-center"], technologies: ["proton-therapy"],
    links: [{ label: "UF Health Proton Therapy Institute", url: "https://www.floridaproton.org/" }],
    notes: ["Rooms and equipment were not stated on the home page read on 4 November 2026."] }),

  i({ id: "maryland-proton-treatment-center", name: "Maryland Proton Treatment Center", aka: ["MPTC"],
    city: "Baltimore", lat: 39.290, lng: -76.630, website: "https://mdproton.com/",
    tldr: "Maryland's only proton therapy centre, in Baltimore, staffed by radiation oncologists from the University of Maryland. It reports more than 6,000 patients treated since 2016.",
    summary: "The centre describes itself as the first and only proton therapy centre in Maryland and one of a few in the United States with pencil-beam scanning, used for intensity-modulated proton therapy, in every treatment room. Treatment is delivered by radiation oncologists from the University of Maryland, and the centre reports more than 6,000 patients treated since 2016. NAPT lists it at 850 West Baltimore Street, Baltimore.",
    institutions: ["maryland-greenebaum"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "Maryland Proton Treatment Center", url: "https://mdproton.com/" }],
    notes: ["The number of treatment rooms was not stated on the home page read on 4 November 2026."] }),

  i({ id: "texas-center-for-proton-therapy", name: "Texas Center for Proton Therapy",
    city: "Irving", lat: 32.900, lng: -96.970, website: "https://www.texasoncology.com/proton-therapy",
    tldr: "A proton therapy centre in Irving, in the Dallas-Fort Worth area of Texas, run with Texas Oncology. It has three treatment rooms.",
    summary: "The centre's site, now served from Texas Oncology's domain, describes three treatment rooms named Hope, Courage and Strength, and pencil-beam scanning. Patients outside the Dallas-Fort Worth area can have some consultations and follow-up by telemedicine with a local Texas Oncology physician but travel to Irving for treatment. NAPT lists it at 1501 West Royal Lane, Irving.",
    institutions: ["us-oncology-network"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "Texas Center for Proton Therapy (Texas Oncology)", url: "https://www.texasoncology.com/proton-therapy" }],
    notes: ["texascenterforprotontherapy.com redirected to texasoncology.com on 4 November 2026. The corpus holds Texas Oncology inside the US Oncology Network record, which is what the institution link points at. Opening year and patient numbers were not stated on the page read."] }),

  i({ id: "california-protons-cancer-therapy-center", name: "California Protons Cancer Therapy Center", aka: ["California Protons"],
    city: "San Diego", lat: 32.895, lng: -117.173, website: "https://www.californiaprotons.com/",
    tldr: "A proton therapy centre in San Diego, California, with five treatment rooms that all use pencil-beam scanning.",
    summary: "The centre states that intensity-modulated pencil-beam scanning is offered in all five of its treatment rooms, and that it treats both common and rare cancers. NAPT lists it at 9730 Summers Ridge Road, San Diego.",
    technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "California Protons Cancer Therapy Center", url: "https://www.californiaprotons.com/" }],
    notes: ["The home page links an affiliates page but names no hospital on the page read on 4 November 2026, so no host is linked. Opening year and patient numbers were not stated."] }),

  i({ id: "oklahoma-proton-center", name: "Oklahoma Proton Center", aka: ["OKC Proton"],
    city: "Oklahoma City", lat: 35.609, lng: -97.621, website: "https://www.okcproton.com/",
    tldr: "A proton therapy centre in Oklahoma City that reports more than a decade of treating patients.",
    summary: "The centre's site refers to over a decade of experience delivering proton therapy and names the Oklahoma Cancer Center alongside it; a staff story on the site places the centre in operation by 2010. NAPT lists it at 5901 West Memorial Road, Oklahoma City.",
    technologies: ["proton-therapy"],
    links: [{ label: "Oklahoma Proton Center", url: "https://www.okcproton.com/" }],
    notes: ["okproton.com did not connect and okcproton.com was read on 4 November 2026. Its ownership history, rooms and patient totals were not stated on that page and are left out."] }),

  i({ id: "procure-proton-therapy-center-new-jersey", name: "ProCure Proton Therapy Center (Somerset, New Jersey)", aka: ["ProCure Proton Treatment Center", "ProCure"],
    city: "Somerset", lat: 40.526, lng: -74.521, website: "https://www.procure.com/",
    tldr: "New Jersey's first proton therapy centre, in Somerset, treating patients since 2012. It reports more than 7,500 people treated.",
    summary: "ProCure describes itself as the first proton therapy centre in New Jersey and the longest established in the New York tri-state area, treating patients since 2012, with more than 7,500 patients treated, and the first in New Jersey with pencil-beam scanning. It names clinical affiliations with Hackensack Meridian Health, NYU and Northwell Health. NAPT lists it at 103 Cedar Grove Lane, Somerset.",
    institutions: ["nyu-perlmutter", "northwell-cancer-institute"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "ProCure Proton Therapy Center", url: "https://www.procure.com/" }],
    notes: ["ProCure's page names 'NYU' and 'Northwell Health' as clinical affiliations; the links point at the corpus records for those systems' cancer centres. Hackensack Meridian Health has no record."] }),

  i({ id: "covenant-health-proton-center", name: "Covenant Health Proton Center", aka: ["Thompson Proton Center", "Provision CARES Proton Therapy Center Knoxville"],
    city: "Knoxville", lat: 35.901, lng: -84.121,
    tldr: "A proton therapy centre in West Knoxville, Tennessee, bought by Covenant Health in 2022 from Provision CARES and run as part of its Thompson Cancer Survival Center.",
    summary: "Covenant Health announced on 19 July 2022 that it had bought the Provision CARES Proton Therapy Center in Knoxville, renamed it Covenant Health Proton Center, kept its staff, and made it part of the cancer services of Thompson Cancer Survival Center and the Covenant Cancer Network. The 2026 brochure lists brain and spine, gastrointestinal and oesophageal, breast, head and neck, lung, prostate and paediatric cancers, lymphoma and re-irradiation among the cancers treated, and states ASTRO APEx accreditation. Address: 6450 Provision Cares Way, Knoxville, Tennessee 37909.",
    technologies: ["proton-therapy"],
    links: [{ label: "Covenant Health announces Covenant Health Proton Center (19 July 2022)", url: "https://www.covenanthealth.com/blog/thompson-proton-center-announcement/" }, { label: "Covenant Health Proton Center brochure (2026, PDF)", url: "https://www.covenanthealth.com/wp-content/uploads/2026/04/0405-1738-CH-Proton-Center-General-Trifold-Brochure-.pdf" }],
    notes: ["The 2022 release said the centre was one of 40 US proton facilities at the time; that count is the operator's and is not repeated as current.", "The alias Thompson Proton Center is taken from the address of Covenant's announcement (/thompson-proton-center-announcement/); the release text itself uses Covenant Health Proton Center, which is the name used here."] }),

  i({ id: "hampton-university-proton-cancer-institute", name: "Hampton University Proton Cancer Institute", aka: ["Hampton Proton", "Hampton University Proton Therapy Institute", "HUPTI"],
    city: "Hampton", lat: 37.056, lng: -76.408,
    tldr: "The proton therapy centre of Hampton University in Virginia, open since 2010: the eighth in the US and the first owned and run by a historically Black university. More than 60 per cent of its patients are treated for prostate cancer.",
    summary: "Hampton University's 15th-anniversary release (31 July 2025) says the institute opened in 2010 as the eighth proton therapy centre in the United States and the first owned and operated by a historically Black college or university, with five treatment rooms in 98,000 square feet, then the largest free-standing proton centre in the world. It was conceived in 2005 by the university's then-president William R. Harvey, prompted by high prostate cancer rates in nearby underserved communities. More than 60 per cent of its patients are treated for prostate cancer; it enrolled more than 200 patients, including the largest number of African American participants, in COMPPARE, a study comparing proton and photon therapy for prostate cancer. In 2024 it extended pencil-beam scanning beyond prostate cancer to brain and head and neck cancers and began a rebranding; the release uses the name Hampton University Proton Cancer Institute, while NAPT still lists Hampton University Proton Therapy Institute. NAPT lists it at 40 Enterprise Parkway, Hampton.",
    technologies: ["proton-therapy", "intensity-modulated-proton-therapy"], cancers: ["prostate"],
    links: [{ label: "Hampton Proton celebrates 15 years (Hampton University, 31 July 2025)", url: "https://home.hamptonu.edu/blog/2025/07/31/hampton-proton-celebrates-15-years-of-innovation-equity-and-impact-in-cancer-care/" }],
    notes: ["hamptonproton.org answered a script with an Incapsula bot wall on 4 November 2026; the university's release was read instead. The release says 'several thousand patients' without a figure."] }),

  i({ id: "laurie-proton-therapy-center", name: "Laurie Proton Therapy Center (Robert Wood Johnson University Hospital)", aka: ["Laurie Proton Therapy Center at Robert Wood Johnson University Hospital", "The Laurie Proton Therapy Center"],
    city: "New Brunswick", lat: 40.495, lng: -74.450,
    tldr: "The proton therapy centre of Robert Wood Johnson University Hospital in New Brunswick, New Jersey, run with Rutgers Cancer Institute and opened in 2016 with a compact single-room proton machine.",
    summary: "Robert Wood Johnson University Hospital announced the Laurie Proton Therapy Center in March 2016, as reported by Innovation New Jersey on 18 March 2016, offering proton therapy on its New Brunswick academic campus in partnership with Rutgers Cancer Institute of New Jersey and Rutgers Robert Wood Johnson Medical School. The programme was led by Bruce G. Haffty, chair of radiation oncology at Rutgers, with Atif J. Khan as medical director. The machine is the MEVION S250 by Mevion Medical Systems, which the release describes as 75 per cent smaller and using 90 per cent less energy than traditional systems. NAPT lists the centre at 1 Robert Wood Johnson Place, New Brunswick.",
    institutions: ["rutgers-cinj"], companies: ["mevion"], technologies: ["proton-therapy", "proton-therapy-systems"],
    links: [{ label: "Robert Wood Johnson University Hospital unveils Laurie Proton Therapy Center (Innovation New Jersey, 18 March 2016)", url: "https://www.innovationnj.net/news/robert-wood-johnson-university-hospital-unveils-laurie-proton-therapy-center" }],
    notes: ["rwjbh.org answered 403 on 4 November 2026, so the hospital's own page could not be read; the 2016 announcement as republished by Innovation New Jersey was used. Current leadership and patient numbers are not stated."] }),

  i({ id: "williams-center-for-proton-therapy-orlando", name: "Marjorie and Leonard Williams Center for Proton Therapy (Orlando Health)", aka: ["Marjorie and Leonard Williams Center for Proton Therapy at the Orlando Health Cancer Institute", "Orlando Health proton therapy"],
    city: "Orlando", lat: 28.526, lng: -81.377,
    tldr: "The proton therapy centre of the Orlando Health Cancer Institute in Orlando, Florida.",
    summary: "NAPT lists the Marjorie and Leonard Williams Center for Proton Therapy at the Orlando Health Cancer Institute as a member centre at 1400 S. Orange Avenue, first floor, Orlando, Florida 32806.",
    institutions: ["orlando-health-cancer-institute"], technologies: ["proton-therapy"],
    notes: ["orlandohealth.com answered 429 to every request on 4 November 2026, including its own news releases on the centre's opening and naming, so opening date, equipment and patient numbers are not stated here."] }),

  i({ id: "willis-knighton-proton-therapy-center", name: "Willis-Knighton Cancer Center proton therapy", aka: ["Willis-Knighton Cancer Center", "Willis Knighton Proton Therapy"],
    city: "Shreveport", lat: 32.481, lng: -93.779, website: "https://www.wkhs.com/cancer/cancer-treatment-services/proton-therapy",
    tldr: "The proton therapy service of Willis-Knighton Cancer Center in Shreveport, Louisiana, the first clinical site of IBA's compact single-room Proteus ONE machine.",
    summary: "Willis-Knighton states that its cancer centre is home to the world's first clinical installation of the IBA Proteus ONE, a compact, single-room, cyclotron-fed proton system with pencil-beam scanning for intensity-modulated proton therapy. Its physicists' paper on commissioning the system won the George Starkschall Award of Excellence for a radiation oncology physics article in the Journal of Applied Clinical Medical Physics in 2018. NAPT lists the centre at 2600 Kings Highway, Shreveport.",
    companies: ["iba"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy", "proton-therapy-systems"],
    links: [{ label: "Proton therapy, Willis-Knighton Health", url: "https://www.wkhs.com/cancer/cancer-treatment-services/proton-therapy" }],
    notes: ["The installation date of the Proteus ONE was not stated on the page read on 4 November 2026."] }),

  i({ id: "northwestern-medicine-proton-center", name: "Northwestern Medicine Proton Center", aka: ["Chicago Proton Center"],
    city: "Warrenville", lat: 41.805, lng: -88.158, website: "https://protoncenter.nm.org/explore-the-center",
    tldr: "Illinois's first proton therapy centre, in Warrenville west of Chicago, run by Northwestern Medicine since 2010, with four treatment rooms.",
    summary: "Northwestern Medicine describes the centre as the first proton therapy centre in Illinois, open since 2010, having treated thousands of adults and children from over 30 states and 14 countries. It has four treatment rooms (two inclined-beam rooms, a fixed-beam room and a 360-degree gantry room), pencil-beam scanning, and cone-beam CT imaging in the gantry room. NAPT lists it at 4455 Weaver Parkway, Warrenville.",
    institutions: ["northwestern-lurie"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "Explore the Northwestern Medicine Proton Center", url: "https://protoncenter.nm.org/explore-the-center" }],
    notes: ["The alias Chicago Proton Center is the name an architect's project page uses for the building; it was not confirmed on a Northwestern page and is kept for search only. The institution link points at Northwestern's Lurie Comprehensive Cancer Center, the corpus record for Northwestern Medicine's cancer programme; the centre's page does not name Lurie."] }),

  i({ id: "emory-proton-therapy-center", name: "Emory Proton Therapy Center",
    city: "Atlanta", lat: 33.773, lng: -84.385, website: "https://www.emoryhealthcare.org/centers-programs/proton-therapy-center",
    tldr: "The proton therapy centre of Emory Healthcare in Atlanta, Georgia, part of Winship Cancer Institute of Emory University.",
    summary: "Emory Healthcare presents proton beam therapy as one of the treatments of Winship Cancer Institute of Emory University, offered after review by a multidisciplinary team, and names children and patients with head and neck or prostate cancer among those who may benefit from lower doses to nearby tissue. NAPT lists the centre at 615 Peachtree Street NE, Atlanta.",
    institutions: ["emory-winship"], technologies: ["proton-therapy"],
    links: [{ label: "Emory Proton Therapy Center", url: "https://www.emoryhealthcare.org/centers-programs/proton-therapy-center" }],
    notes: ["Opening year, rooms and patient numbers were not stated on the page read on 4 November 2026."] }),

  i({ id: "johns-hopkins-proton-therapy-center", name: "Johns Hopkins Proton Therapy Center (Sibley Memorial Hospital)", aka: ["Johns Hopkins National Proton Therapy Center", "Johns Hopkins Proton Therapy Center"],
    city: "Washington", lat: 38.937, lng: -77.109,
    tldr: "Johns Hopkins' proton therapy centre at Sibley Memorial Hospital in Washington, DC, opened in October 2019 with Children's National Hospital, which supplies a dedicated paediatric team.",
    summary: "Children's National Hospital reported on 31 October 2019 that the Johns Hopkins Proton Therapy Center opened on 28 October 2019 at Sibley Memorial Hospital, in collaboration with Children's National, giving the Washington region its only proton centre with a dedicated paediatric team. It offers pencil-beam proton therapy with a 360-degree gantry, dual-energy CT guidance and MRI for moving tumours, and a research room. It was opening in phases: the first treatment room in October 2019, with the second, third and a fixed-beam research room then scheduled for 2020. NAPT lists it at 5255 Loughboro Road NW, Washington, DC.",
    institutions: ["johns-hopkins", "childrens-national-hospital"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    links: [{ label: "Johns Hopkins Proton Therapy Center opens in collaboration with Children's National (31 October 2019)", url: "https://innovationdistrict.childrensnational.org/johns-hopkins-proton-therapy-center-opens-in-collaboration-with-childrens-national/" }],
    notes: ["hopkinsmedicine.org answered 403 on 4 November 2026. Whether the 2020 rooms opened as scheduled was not confirmed on a page read, so the summary gives the 2019 plan only."] }),
];

/**
 * Existing records that should link to the new facilities (for the orphan ratchet). Hosts first; facilities
 * without a host record in the corpus are listed under the technology record for proton therapy.
 */
export const particleTherapyHostBacklinks: Record<string, string[]> = {
  "st-jude": ["st-jude-proton-therapy-center"],
  "cincinnati-childrens-cancer": ["cincinnati-childrens-proton-therapy-center"],
  "md-anderson": ["md-anderson-proton-therapy-center"],
  "penn-abramson": ["roberts-proton-therapy-center"],
  "wustl-siteman": ["s-lee-kling-proton-therapy-center"],
  "moffitt": ["moffitt-schulze-proton-center"],
  "uf-health-cancer-center": ["uf-health-proton-therapy-institute"],
  "maryland-greenebaum": ["maryland-proton-treatment-center"],
  "us-oncology-network": ["texas-center-for-proton-therapy"],
  "rutgers-cinj": ["laurie-proton-therapy-center"],
  "orlando-health-cancer-institute": ["williams-center-for-proton-therapy-orlando"],
  "northwestern-lurie": ["northwestern-medicine-proton-center"],
  "emory-winship": ["emory-proton-therapy-center"],
  "johns-hopkins": ["johns-hopkins-proton-therapy-center"],
  "proton-therapy": ["california-protons-cancer-therapy-center", "oklahoma-proton-center", "procure-proton-therapy-center-new-jersey", "covenant-health-proton-center", "hampton-university-proton-cancer-institute", "willis-knighton-proton-therapy-center"],
};
