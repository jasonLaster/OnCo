import type { CollectionInput, EntityInput, TechnologyInput, TermInput } from "@/lib/schema";

/**
 * November 2026 gap fill for three census types (docs/proposals/gap-census-2026-11.md): palliative and end-of-life
 * services, patient navigation, and fertility preservation services. Every fact is from the page or statute linked on
 * the record, read as raw text on 4 November 2026; papers were resolved through Europe PMC before they were cited.
 * Assisted dying laws are modelled like src/data/law-wave.ts (glossary terms tagged "law") but are not in LAW_INDEX,
 * which would change the /law/ page. They state what each statute or official page says and nothing more.
 */
const asOf = "2026-11-04";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;

type T = Omit<TermInput, "kind" | "asOf">;
const term = (x: T): TermInput => ({ kind: "term", asOf, ...x });
type L = Omit<TermInput, "kind" | "asOf" | "category">;
const law = (x: L): TermInput => ({ kind: "term", asOf, category: "Regulation & policy", ...x, tags: ["law", ...(x.tags ?? [])] });
const tech = (x: Omit<TechnologyInput, "kind" | "asOf">): TechnologyInput => ({ kind: "technology", asOf, ...x });
const coll = (x: Omit<CollectionInput, "kind" | "asOf">): CollectionInput => ({ kind: "collection", asOf, ...x });

const ACP_IDS = ["respect-process", "polst", "five-wishes", "advance-decision-to-refuse-treatment", "lasting-power-of-attorney-health-welfare", "serious-illness-conversation-guide"];
const LAW_IDS = [
  "law-oregon-death-with-dignity-act", "law-washington-death-with-dignity-act", "law-california-end-of-life-option-act", "law-canada-maid",
  "law-netherlands-euthanasia-act", "law-spain-euthanasia-act", "law-victoria-voluntary-assisted-dying-act", "law-england-wales-terminally-ill-adults-bill",
  "law-scotland-assisted-dying-bill",
];
const others = (id: string) => LAW_IDS.filter((x) => x !== id);

// ---------------------------------------------------------------------------------------------------------------------
// Planning ahead: advance care planning and its documents
// ---------------------------------------------------------------------------------------------------------------------
const planning: TermInput[] = [
  term({ id: "advance-care-planning", name: "Advance care planning", category: "Supportive care", wikipedia: W("Advance_care_planning"),
    aka: ["advanced care planning", "ACP"],
    tldr: "Advance care planning means talking with your family and your care team about what matters to you and writing down the care you would want if you became too unwell to say. You can start at any point, and you can change it later.",
    summary: "Advance care planning is the process by which a person, while able to decide, discusses and records their values, goals and preferences for future care so that they guide treatment if the person later loses the ability to decide or communicate. ESMO published a clinical practice guideline on it in 2014 (Schrijvers and Cherny, Annals of Oncology).\n\nThe documents differ by country and by legal force. Some are legal instruments: in England and Wales an advance decision to refuse treatment and a health and welfare lasting power of attorney, both under the Mental Capacity Act 2005; in the US an advance directive such as Five Wishes. Others are clinical recommendations or orders: ReSPECT in the UK, which its own page describes as a non-legally binding form, and POLST in the US, a signed medical order for people who are seriously ill or frail. Structured conversation tools such as the Serious Illness Conversation Guide help clinicians open the discussion.",
    terms: ACP_IDS, technologies: ["palliative-care", "hospice-end-of-life"],
    links: [
      { label: "ESMO Clinical Practice Guidelines on palliative care: advanced care planning (Ann Oncol 2014)", url: "https://doi.org/10.1093/annonc/mdu241" },
      { label: "NHS: end of life care", url: "https://www.nhs.uk/tests-and-treatments/end-of-life-care/" },
    ],
    tags: ["supportive", "carer"] }),

  term({ id: "respect-process", name: "ReSPECT (Recommended Summary Plan for Emergency Care and Treatment)", category: "Supportive care",
    aka: ["ReSPECT process", "ReSPECT form", "Recommended Summary Plan for Emergency Care and Treatment"],
    tldr: "ReSPECT is a UK form, filled in with your doctor or nurse, that records what care you would and would not want in a future emergency when you cannot speak for yourself. It is a recommendation for the team, not a legal document, and can be changed if things change.",
    summary: "The Recommended Summary Plan for Emergency Care and Treatment (ReSPECT) process creates personalised recommendations for a person's clinical care and treatment in a future emergency in which they are unable to make or express choices. Resuscitation Council UK describes the recommendations as created through conversations between a person, their families and their health and care professionals, and recorded on a non-legally binding form that can be reviewed and adapted if circumstances change.\n\nIts page says the process can be for anyone but has increasing relevance for people with complex health needs, people likely to be nearing the end of their lives and people at risk of sudden deterioration or cardiac arrest, and that it is increasingly being adopted around the UK; the page lists where it has been adopted. Version 3 of the form has been introduced. The process and form were developed over two years with public consultation, patient focus groups and usability testing.",
    terms: ["advance-care-planning"], technologies: ["palliative-care"],
    links: [{ label: "Resuscitation Council UK: ReSPECT", url: "https://www.resus.org.uk/respect" }],
    tags: ["supportive", "uk"] }),

  term({ id: "polst", name: "POLST (Portable Medical Orders for Life-Sustaining Treatment)", category: "Supportive care", wikipedia: W("Physician_Orders_for_Life-Sustaining_Treatment"),
    aka: ["POLST form", "Physician Orders for Life-Sustaining Treatment", "Portable Medical Orders"],
    tldr: "In the US, a POLST form turns the wishes of someone who is seriously ill or very frail into signed medical orders, so emergency teams know which treatments to give or not give. It is optional and is different from an advance directive.",
    summary: "The National POLST Collaborative describes a POLST form as a portable medical order for patients who have a progressing serious illness or frailty due to ageing. It tells health care providers what the patient wants if they become unresponsive and what their goals of care are given their current medical condition; having one is completely optional.\n\nPOLST is distinct from an advance directive. In the Collaborative's comparison, an advance directive is a legal document for all adults that authorises someone to make decisions and states general wishes, while a POLST form is a signed medical order for anyone, regardless of age, who is seriously ill or frail, and carries more specific instructions that emergency personnel can follow. Programmes are run state by state; the Collaborative lists them.",
    terms: ["advance-care-planning", "five-wishes"], technologies: ["palliative-care", "hospice-end-of-life"],
    links: [{ label: "National POLST Collaborative", url: "https://polst.org/" }, { label: "National POLST: about POLST", url: "https://polst.org/about-polst/" }],
    tags: ["supportive", "us"] }),

  term({ id: "five-wishes", name: "Five Wishes advance directive", category: "Supportive care",
    aka: ["Five Wishes"],
    tldr: "Five Wishes is a plain-language US advance directive in which you name who decides for you and write down the medical care, comfort and spiritual support you want, and what you want your family to know.",
    summary: "Five Wishes is a programme of the US nonprofit Aging with Dignity, which describes it as the most widely used advance directive in America. The document has five parts: a health care power of attorney (who can make decisions for me), a living will (the kind of medical treatment I want or don't want), physical comfort, spiritual comfort, and what I want my loved ones to know. Its site states that it meets legal requirements in 46 states and is available on paper or completed and signed online.",
    terms: ["advance-care-planning", "polst"],
    links: [{ label: "Five Wishes", url: "https://www.fivewishes.org/" }],
    tags: ["supportive", "us"] }),

  term({ id: "advance-decision-to-refuse-treatment", name: "Advance decision to refuse treatment (England and Wales)", category: "Supportive care",
    aka: ["advance decision", "ADRT", "living will (England and Wales)"],
    tldr: "In England and Wales, an adult can write down in advance which treatments they refuse if they later cannot decide. To refuse treatment that keeps you alive, it must be in writing, signed, witnessed and say it applies even if your life is at risk.",
    summary: "Section 24 of the Mental Capacity Act 2005 defines an advance decision as a decision made by a person aged 18 or over, while they have capacity, that if a specified treatment is later proposed at a time when they lack capacity to consent, it is not to be carried out or continued. It may be expressed in layman's terms and may be withdrawn or altered at any time while the person has capacity.\n\nSection 25(5) and (6) set the extra conditions for refusing life-sustaining treatment: the decision must be verified by a statement that it applies even if life is at risk, and the decision and statement must be in writing, signed by the person (or by another in their presence and at their direction), and signed or acknowledged in the presence of a witness who also signs. A later health and welfare lasting power of attorney covering the same treatment can override an earlier advance decision; section 25 sets out when.",
    terms: ["advance-care-planning", "lasting-power-of-attorney-health-welfare"],
    links: [
      { label: "Mental Capacity Act 2005, section 24 (legislation.gov.uk)", url: "https://www.legislation.gov.uk/ukpga/2005/9/section/24" },
      { label: "Mental Capacity Act 2005, section 25 (legislation.gov.uk)", url: "https://www.legislation.gov.uk/ukpga/2005/9/section/25" },
    ],
    tags: ["supportive", "uk"] }),

  term({ id: "lasting-power-of-attorney-health-welfare", name: "Lasting power of attorney for health and welfare (England and Wales)", category: "Supportive care",
    aka: ["health and welfare LPA", "lasting power of attorney", "LPA"],
    tldr: "A health and welfare lasting power of attorney lets you choose someone you trust to make decisions about your care, including life-sustaining treatment, if you become unable to decide. It has to be registered before it can be used, which takes weeks, so it is worth doing early.",
    summary: "GOV.UK describes two types of lasting power of attorney: health and welfare, and property and financial affairs. A health and welfare LPA gives an attorney power to make decisions about daily routine, medical care, moving into a care home and life-sustaining treatment, and can only be used when the person is unable to make their own decisions. The person must be 18 or over and have mental capacity when making it.\n\nAn LPA must be registered with the Office of the Public Guardian before use. GOV.UK states that registration takes 8 to 10 weeks if there are no mistakes and that applying costs £92 unless a reduction or exemption applies.",
    terms: ["advance-care-planning", "advance-decision-to-refuse-treatment"],
    links: [{ label: "GOV.UK: make, register or end a lasting power of attorney", url: "https://www.gov.uk/power-of-attorney" }],
    tags: ["supportive", "uk", "carer"] }),

  term({ id: "serious-illness-conversation-guide", name: "Serious Illness Conversation Guide", category: "Supportive care",
    aka: ["Serious Illness Care Program"],
    tldr: "The Serious Illness Conversation Guide is a set of questions clinicians use to ask people with serious illness what matters most to them, so that their care can follow it. You can ask your team to have this conversation with you.",
    summary: "The Serious Illness Conversation Guide was developed by palliative care experts at Ariadne Labs as part of the Serious Illness Care Program, a system-level care delivery model. Ariadne Labs describes the guide as a framework for physicians, nurses, social workers, chaplains and other clinicians to explore what is most important to patients, and offers it for download with clinician training and support for health systems. The programme also publishes resources for patients and families on sharing wishes.",
    terms: ["advance-care-planning"], technologies: ["palliative-care"],
    links: [{ label: "Ariadne Labs: Serious Illness Care", url: "https://www.ariadnelabs.org/serious-illness-care/" }],
    tags: ["supportive"] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Where end-of-life care happens, how it is paid for, and what it includes
// ---------------------------------------------------------------------------------------------------------------------
const services: TermInput[] = [
  term({ id: "hospice-inpatient-and-respite-care", name: "Hospice inpatient care and respite care", category: "Supportive care",
    aka: ["inpatient hospice", "respite care", "hospice respite"],
    tldr: "Most hospice care is given at home, but a hospice team can arrange a short stay in an inpatient unit when symptoms need closer care, or a respite stay so that a family carer can rest.",
    summary: "Medicare's hospice page states that care is usually given in the home or the facility where the person lives, and that a person who meets certain conditions can also receive care in an inpatient hospice facility. If the hospice team determines that short-term inpatient care or respite care is needed and arranges it, Medicare covers the stay. The plan of care can include short-term inpatient care for pain and symptom management, and inpatient respite care for up to 5 days at a time, more than once but only occasionally, so that a family carer can rest; the respite copayment is 5 per cent of the Medicare-approved amount and cannot exceed the inpatient deductible. Hospital inpatient care for the terminal illness must be arranged by the hospice team, or the person may have to pay the full cost.\n\nIn England, the NHS end of life care pages list a hospice among the places end of life care can be given, alongside home, hospital and care home.",
    terms: ["medicare-hospice-benefit", "hospice-at-home"], technologies: ["hospice-end-of-life"],
    links: [{ label: "Medicare.gov: hospice care", url: "https://www.medicare.gov/coverage/hospice-care" }, { label: "NHS: end of life care", url: "https://www.nhs.uk/tests-and-treatments/end-of-life-care/" }],
    tags: ["supportive", "carer"] }),

  term({ id: "hospice-at-home", name: "End-of-life care at home (hospice at home)", category: "Supportive care",
    aka: ["hospice at home", "home hospice care", "dying at home"],
    tldr: "Many people can be cared for at the end of life in their own home, with visits from nurses, doctors and carers, equipment and medicines arranged by the hospice or community team. Ask early, because setting it up can take time.",
    summary: "The NHS end of life care pages state that end of life care can be given at home, in hospital, in a care home or in a hospice, and cover planning, what to expect and the financial support available. Under Medicare, hospice care is usually given in the home or the facility where the person lives, and the plan of care can include nursing and medical services, aide and homemaker services, drugs and equipment for pain and symptom management, medical supplies, therapy services, social services, dietary counselling, short inpatient stays, and spiritual and grief counselling for the patient and family. In England, NHS continuing healthcare can fund care at home for people with complex needs, and its assessment routes include a Fast Track.",
    terms: ["hospice-inpatient-and-respite-care", "medicare-hospice-benefit", "nhs-continuing-healthcare"], technologies: ["hospice-end-of-life", "palliative-care"],
    links: [{ label: "NHS: end of life care", url: "https://www.nhs.uk/tests-and-treatments/end-of-life-care/" }, { label: "Medicare.gov: hospice care", url: "https://www.medicare.gov/coverage/hospice-care" }],
    tags: ["supportive", "carer"] }),

  term({ id: "medicare-hospice-benefit", name: "Medicare hospice benefit (United States)", category: "Access",
    aka: ["Medicare hospice", "hospice benefit"],
    tldr: "In the US, Medicare pays for hospice care with nothing to pay for covered services when a doctor certifies a life expectancy of six months or less and the person chooses comfort care instead of treatment aimed at cure. Care can continue beyond six months if the doctor recertifies.",
    summary: "Medicare Part A covers hospice when the hospice doctor and the person's regular doctor (if any) certify terminal illness with a life expectancy of six months or less, and the person accepts comfort (palliative) care instead of care to cure the terminal illness and signs a statement choosing hospice. Coverage runs for two 90-day benefit periods followed by an unlimited number of 60-day periods, with recertification after a face-to-face meeting. The person can change hospice provider once in each benefit period.\n\nThe person pays nothing for hospice care from a Medicare-approved provider, apart from a copayment of up to $5 per prescription for outpatient drugs for pain and symptoms and 5 per cent of the approved amount for inpatient respite care; room and board in a facility where the person lives may be charged. Once hospice starts, Medicare will not cover treatment intended to cure the terminal illness, but it still covers health problems unrelated to it.",
    terms: ["hospice-inpatient-and-respite-care", "hospice-at-home"], technologies: ["hospice-end-of-life"],
    links: [{ label: "Medicare.gov: hospice care", url: "https://www.medicare.gov/coverage/hospice-care" }],
    tags: ["supportive", "us"] }),

  term({ id: "nhs-continuing-healthcare", name: "NHS continuing healthcare (England)", category: "Access",
    aka: ["NHS CHC", "continuing healthcare", "CHC Fast Track"],
    tldr: "In England, adults with complex long-term health needs can have their care at home or in a care home arranged and paid for entirely by the NHS. A team of health professionals assesses whether you qualify; ask the hospital or community team to start an assessment.",
    summary: "NHS continuing healthcare is free health and social care arranged and funded solely by the NHS for some people with long-term complex health needs. It can be given outside hospital, in the person's own home or in a care home. It is for adults; children and young people may receive a continuing care package instead. Eligibility is decided by a multidisciplinary team looking at what help is needed, how complex, intense and unpredictable the needs are. The NHS page names the assessment tools as the Checklist, the Decision Support Tool and the Fast Track.",
    terms: ["hospice-at-home"], technologies: ["hospice-end-of-life"],
    links: [{ label: "NHS: NHS continuing healthcare", url: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/" }],
    tags: ["supportive", "uk"] }),

  term({ id: "gold-standards-framework", name: "Gold Standards Framework", category: "Supportive care",
    aka: ["GSF", "GSF Quality Hallmark Award"],
    tldr: "The Gold Standards Framework is a UK charity that trains GP practices, care homes and other services to care well for people in the last years of life, and accredits those that do. Its site lists accredited care homes and providers.",
    summary: "The Gold Standards Framework Centre is a registered charity (number 1203244) that describes itself as the UK's leading training provider for generalist frontline staff caring for people in the last years of life, for over 25 years. It calls GSF a practical, evidence-based end of life care service improvement programme for any condition, in any setting. Organisations that complete the programme can receive the Quality Hallmark Award, and GSF publishes a list of accredited organisations; its site states that the Care Quality Commission recognises GSF as a marker of quality care.",
    technologies: ["hospice-end-of-life", "palliative-care"],
    links: [{ label: "The Gold Standards Framework", url: "https://www.goldstandardsframework.org.uk/" }],
    tags: ["supportive", "uk"] }),

  term({ id: "palliative-sedation", name: "Palliative sedation", category: "Supportive care", wikipedia: W("Palliative_sedation"),
    aka: ["terminal sedation", "continuous palliative sedation"],
    tldr: "Palliative sedation means giving medicines that make a dying person sleep when severe suffering cannot be relieved any other way. It is ordinary medical care in the last days of life, and it is not euthanasia.",
    summary: "ESMO published clinical practice guidelines on the management of refractory symptoms at the end of life and the use of palliative sedation in 2014 (Cherny, Annals of Oncology 25 Suppl 3).\n\nThe Netherlands government describes palliative sedation as administering drugs to render the patient unconscious at the end of life to relieve suffering, specifically unbearable pain, that cannot be relieved in any other way. It regards it as part of normal medical practice and not termination of life, because the drugs are not the cause of death; it is permissible where remaining life expectancy is no more than two weeks, and doctors do not need to notify or have it reviewed. The request can come from the patient, family or professional carers, and if the patient cannot decide, the doctor discusses it with their representative.",
    terms: ["last-days-of-life-care"], technologies: ["palliative-care", "hospice-end-of-life"],
    links: [
      { label: "ESMO guidelines: refractory symptoms at the end of life and palliative sedation (Ann Oncol 2014)", url: "https://doi.org/10.1093/annonc/mdu238" },
      { label: "Government of the Netherlands: palliative sedation", url: "https://www.government.nl/themes/family-health-and-care/euthanasia/palliative-sedation-a-normal-medical-procedure" },
    ],
    tags: ["supportive"] }),

  term({ id: "last-days-of-life-care", name: "Care of dying adults in the last days of life", category: "Supportive care",
    aka: ["care of the dying", "last days of life", "anticipatory prescribing", "just in case medicines"],
    tldr: "In the last days of life, care focuses on comfort: recognising that someone is dying, talking openly with them and their family, keeping them hydrated if that helps, and having medicines ready for pain, breathlessness, sickness, agitation and noisy breathing.",
    summary: "NICE guideline NG31, Care of dying adults in the last days of life, was published on 16 December 2015 and covers the clinical care of adults (18 and over) who are dying during the last 2 to 3 days of life. Its recommendations cover recognising when people are entering the last few days of life, communicating and shared decision-making, clinically assisted hydration, medicines for pain, breathlessness, nausea and vomiting, anxiety, delirium, agitation and noisy respiratory secretions, and anticipatory prescribing. It is written for professionals in primary care, care homes, hospices, hospitals and people's homes, and for people who are dying and those important to them.",
    terms: ["palliative-sedation", "hospice-at-home"], technologies: ["hospice-end-of-life", "palliative-care", "pain-management"],
    links: [{ label: "NICE NG31: care of dying adults in the last days of life", url: "https://www.nice.org.uk/guidance/ng31" }],
    tags: ["supportive", "carer"] }),

  term({ id: "prognostic-evaluation-advanced-cancer", name: "Prognostic evaluation in advanced cancer", category: "Supportive care",
    aka: ["prognostication in advanced cancer", "Palliative Prognostic Score", "Palliative Prognostic Index", "PaP", "PPI"],
    tldr: "When cancer is advanced, doctors sometimes estimate how much time may be left so that people can plan care and what matters to them. Any estimate is about groups of people, is uncertain for one person, and you can choose whether and how you hear it.",
    summary: "ESMO's 2023 clinical practice guideline on prognostic evaluation in patients with advanced cancer in the last months of life (Stone and colleagues, ESMO Open) gives recommendations for patients with an expected survival of months or less. It notes that prognostication in practice often relies on subjective clinician predictions of survival, and reviews multivariable tools including the Palliative Prognostic Score (PaP), which stratifies patients into three groups by 30-day survival probability, its delirium-modified version, and the Palliative Prognostic Index, which combines performance status, oral intake, oedema, breathlessness and delirium. The guideline states that clinicians need to understand the characteristics and limitations of these tools for appropriate use.",
    terms: ["advance-care-planning"], technologies: ["palliative-care"],
    links: [{ label: "Stone et al., prognostic evaluation in the last months of life: ESMO Clinical Practice Guideline (ESMO Open 2023)", url: "https://doi.org/10.1016/j.esmoop.2023.101195" }],
    tags: ["supportive"] }),

  term({ id: "spiritual-care-in-cancer", name: "Spiritual care in cancer", category: "Supportive care",
    aka: ["spiritual care", "chaplaincy in cancer care", "spirituality in cancer care"],
    tldr: "Spiritual care is support with questions of meaning, faith, hope and fear that serious illness brings, whether or not you are religious. Hospital chaplains offer it to anyone, and in US hospice care it is part of the plan for you and your family.",
    summary: "The National Cancer Institute's PDQ summary Spirituality in Cancer Care reviews how spiritual and religious concerns affect people with cancer, how they can be assessed with spiritual history tools that open a dialogue and identify the need for referral to a chaplain or support group, and how responsibility has moved from the chaplain alone towards the whole care team; one cancer centre developed a four-stage model so each professional can give spiritual care at their own skill level. Medicare's hospice plan of care includes spiritual and grief counselling for the patient and family.",
    terms: ["bereavement-support"], technologies: ["palliative-care", "psycho-oncology"],
    links: [
      { label: "NCI PDQ: Spirituality in Cancer Care (health professional version)", url: "https://www.cancer.gov/about-cancer/coping/day-to-day/faith-and-spirituality/spirituality-hp-pdq" },
      { label: "Medicare.gov: hospice care", url: "https://www.medicare.gov/coverage/hospice-care" },
    ],
    tags: ["supportive", "psychosocial"] }),

  term({ id: "bereavement-support", name: "Grief and bereavement support", category: "Supportive care", wikipedia: W("Grief"),
    aka: ["bereavement care", "bereavement services", "grief counselling", "prolonged grief disorder"],
    tldr: "Grief after someone dies of cancer is normal and takes its own time. Hospices and cancer charities offer bereavement support to families, and help is available if grief stays very intense for many months.",
    summary: "The National Cancer Institute's PDQ summary Grief, Bereavement, and Coping With Loss defines grief as the primarily emotional process of reacting to the loss of a loved one through death, and bereavement as the objective situation one faces after losing an important person. It describes a complicated grief reaction that ICD-11 recognises as prolonged grief disorder, when elevated grief continues six months after the death, and DSM-5 describes as persistent complex bereavement disorder. In the US, the Medicare hospice plan of care includes grief counselling for the family.",
    terms: ["spiritual-care-in-cancer"], technologies: ["hospice-end-of-life", "psycho-oncology"],
    links: [
      { label: "NCI PDQ: Grief, Bereavement, and Coping With Loss (health professional version)", url: "https://www.cancer.gov/about-cancer/advanced-cancer/caregivers/planning/bereavement-hp-pdq" },
      { label: "Medicare.gov: hospice care", url: "https://www.medicare.gov/coverage/hospice-care" },
    ],
    tags: ["supportive", "carer", "psychosocial"] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Psychotherapies tested at the end of life
// ---------------------------------------------------------------------------------------------------------------------
const therapies: TechnologyInput[] = [
  tech({ id: "dignity-therapy", name: "Dignity therapy", status: "established",
    principle: "An individualised, short-term psychotherapy for patients with life-threatening or life-limiting illness, and their families, aimed at mitigating distress and bolstering the experience of the end of life.", wikipedia: W("Dignity_therapy"),
    tldr: "Dignity therapy is a short, one-to-one talking therapy for people near the end of life and their families. In a large trial it did not lower distress more than usual care, but patients said it helped them, their sense of dignity and their families.",
    summary: "Dignity therapy is an individualised, short-term psychotherapy developed for patients, and their families, living with life-threatening or life-limiting illness. In the randomised trial by Chochinov and colleagues (Lancet Oncology 2011; NCT00133965), 441 patients with a life expectancy of six months or less receiving palliative care in Canada, the USA and Australia were assigned to dignity therapy, client-centred care or standard palliative care. Distress levels before and after the study did not differ significantly between the three groups. In the secondary end-of-life experience survey, patients reported that dignity therapy was more likely than the other two to have been helpful, to improve quality of life, to increase their sense of dignity, to change how their family saw and appreciated them, and to be helpful to their family.",
    technologies: ["psycho-oncology", "palliative-care"], terms: ["spiritual-care-in-cancer"],
    links: [{ label: "Chochinov et al., dignity therapy randomised controlled trial (Lancet Oncol 2011)", url: "https://doi.org/10.1016/S1470-2045(11)70153-X" }],
    tags: ["supportive", "psychosocial"] }),

  tech({ id: "calm-psychotherapy", name: "Managing Cancer and Living Meaningfully (CALM)", status: "established",
    principle: "A brief, manualised psychotherapy for patients with advanced cancer, intended to treat and prevent depression and end-of-life distress and to address the predictable challenges these patients face.",
    aka: ["CALM therapy", "CALM psychotherapy", "Managing Cancer And Living Meaningfully"],
    tldr: "CALM is a brief talking therapy for people with advanced cancer, designed to treat and prevent depression and distress about the end of life. In a trial of 305 people it eased depression symptoms and helped people feel more prepared.",
    summary: "Managing Cancer And Living Meaningfully (CALM) is a brief, manualised psychotherapeutic intervention intended to treat and prevent depression and end-of-life distress in patients with advanced cancer. In the randomised trial by Rodin and colleagues (Journal of Clinical Oncology 2018), 305 outpatients at a comprehensive cancer centre were assigned to CALM plus usual care or usual care alone. CALM participants reported less severe depressive symptoms at 3 months (the primary end point) and at 6 months, and greater end-of-life preparation at 6 months; no adverse effects were identified.",
    technologies: ["psycho-oncology", "palliative-care"],
    links: [{ label: "Rodin et al., CALM randomised controlled trial (J Clin Oncol 2018)", url: "https://doi.org/10.1200/JCO.2017.77.1097" }],
    tags: ["supportive", "psychosocial"] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Assisted dying laws and bills: from the statute or the official page only
// ---------------------------------------------------------------------------------------------------------------------
const laws: TermInput[] = [
  law({ id: "law-oregon-death-with-dignity-act", name: "Oregon Death with Dignity Act (1997)",
    aka: ["Oregon Death with Dignity Act", "ORS 127.800 to 127.897"],
    tldr: "Oregon's 1997 law allows a capable adult with a terminal disease expected to cause death within six months to request medication they take themselves to end their life, after a voluntary written request confirmed by two physicians.",
    summary: "United States, Oregon, state statute (ORS 127.800 to 127.897). The Oregon Health Authority states that Oregon enacted the Death with Dignity Act on 27 October 1997, allowing terminally ill individuals to end their lives through the voluntary self-administration of lethal medications expressly prescribed by a physician for that purpose, and requiring the Authority to collect information and publish an annual report.\n\nUnder ORS 127.805, an adult (18 or over) who is capable and has been determined by the attending and consulting physicians to be suffering from a terminal disease, and who has voluntarily expressed the wish to die, may make a written request for the medication. A terminal disease is an incurable and irreversible disease, medically confirmed, that will within reasonable medical judgement produce death within six months. No one qualifies solely because of age or disability. An informed decision requires being told of feasible alternatives, including comfort care, hospice care and pain control.",
    related: others("law-oregon-death-with-dignity-act"), technologies: ["hospice-end-of-life"],
    links: [
      { label: "Oregon Health Authority: Death with Dignity Act", url: "https://www.oregon.gov/oha/ph/providerpartnerresources/evaluationresearch/deathwithdignityact/pages/index.aspx" },
      { label: "ORS chapter 127 (Oregon Legislature)", url: "https://www.oregonlegislature.gov/bills_laws/ors/ors127.html" },
    ],
    tags: ["us"] }),

  law({ id: "law-washington-death-with-dignity-act", name: "Washington Death with Dignity Act (Initiative 1000, 2008)",
    aka: ["Washington Death with Dignity Act", "Initiative 1000", "chapter 70.245 RCW"],
    tldr: "Washington's law, passed by public vote in 2008, allows some terminally ill adult residents expected to die within six months to request medication to end their life as part of end-of-life care.",
    summary: "United States, Washington, state statute (chapter 70.245 RCW) and regulation (chapter 246-978 WAC). The Washington State Department of Health states that Initiative 1000 passed on 4 November 2008 and took effect on 5 March 2009, allowing some terminally ill patients to request and use lethal doses of medication from qualified medical providers. The Department lists eligibility as: 18 or older; able to make and communicate an informed decision; diagnosed with an incurable and irreversible disease that will produce death within six months; and a Washington resident. RCW 70.245.010 defines terminal disease in those terms. After the 2025 legislative session the Department paused its annual statistical reports for budget reasons and states that access under the Act remains in place.",
    related: others("law-washington-death-with-dignity-act"), technologies: ["hospice-end-of-life"],
    links: [
      { label: "Washington State Department of Health: Death with Dignity Act", url: "https://doh.wa.gov/data-and-statistical-reports/health-statistics/death-dignity-act" },
      { label: "RCW 70.245.010 definitions", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=70.245.010" },
    ],
    tags: ["us"] }),

  law({ id: "law-california-end-of-life-option-act", name: "California End of Life Option Act (2015)",
    aka: ["End of Life Option Act", "EOLA", "AB 15 (2015)"],
    tldr: "California's End of Life Option Act allows an adult diagnosed with a terminal disease who meets the Act's conditions to request aid-in-dying drugs from their attending physician.",
    summary: "United States, California, state statute. The California Department of Public Health states that the End of Life Option Act allows an adult diagnosed with a terminal disease, who meets certain qualifications, to request aid-in-dying drugs from their attending physician, and requires physicians to submit specified forms and information to the Department, which collects the data and publishes annual reports. The Department's page cites the enacting bill as AB 15 (Eggman), Chapter 1, Statutes of 2015. The statutory text at leginfo.legislature.ca.gov returned an error to a script on 4 November 2026, so the eligibility conditions are not restated here.",
    related: others("law-california-end-of-life-option-act"), technologies: ["hospice-end-of-life"],
    links: [{ label: "California Department of Public Health: End of Life Option Act", url: "https://www.cdph.ca.gov/Programs/CHSI/Pages/End-of-Life-Option-Act-.aspx" }],
    tags: ["us"] }),

  law({ id: "law-canada-maid", name: "Medical assistance in dying in Canada (Criminal Code, section 241.2)",
    aka: ["MAID", "medical assistance in dying", "Criminal Code s. 241.2"],
    tldr: "In Canada, an adult who can make health decisions, has a serious and incurable condition with intolerable suffering, and asks voluntarily may receive medical assistance in dying after being told about all ways to relieve suffering, including palliative care.",
    summary: "Canada, federal statute: section 241.2 of the Criminal Code, introduced in 2016 (S.C. 2016, c. 3) and amended in 2021 (S.C. 2021, c. 2). Under subsection (1) a person may receive medical assistance in dying only if they are eligible for publicly funded health services in Canada, are at least 18 and capable of making decisions about their health, have a grievous and irremediable medical condition, have made a voluntary request not resulting from external pressure, and give informed consent after being told of the means available to relieve their suffering, including palliative care.\n\nUnder subsection (2) a grievous and irremediable condition means a serious and incurable illness, disease or disability, an advanced state of irreversible decline in capability, and enduring physical or psychological suffering that is intolerable to the person and cannot be relieved under conditions they consider acceptable. Subsection (2.1) states that a mental illness is not considered an illness, disease or disability for these purposes. The section sets separate safeguards depending on whether natural death is reasonably foreseeable, including a written, signed and independently witnessed request.",
    related: others("law-canada-maid"), technologies: ["palliative-care"],
    links: [{ label: "Justice Laws Website: Criminal Code, section 241.2", url: "https://laws-lois.justice.gc.ca/eng/acts/c-46/section-241.2.html" }],
    tags: [] }),

  law({ id: "law-netherlands-euthanasia-act", name: "Netherlands Termination of Life on Request and Assisted Suicide (Review Procedures) Act (2001)",
    aka: ["Wet toetsing levensbeëindiging op verzoek en hulp bij zelfdoding", "Dutch euthanasia law", "Termination of Life on Request and Assisted Suicide (Review Procedures) Act"],
    tldr: "In the Netherlands, a doctor may end a patient's life on request, or assist suicide, only when the patient asks voluntarily, the suffering is unbearable with no prospect of improvement and the doctor meets six legal due care criteria. Patients have no right to it and doctors may refuse.",
    summary: "Netherlands, statute of 12 April 2001 (Wet toetsing levensbeëindiging op verzoek en hulp bij zelfdoding, BWBR0012410). The government explains that euthanasia and assisted suicide remain offences under articles 293 and 294 of the Criminal Code, with an exception for a physician who meets six statutory due care criteria and notifies the municipal pathologist: the request is voluntary and well considered; the suffering is unbearable with no prospect of improvement; the patient has been informed of their situation and prognosis; doctor and patient agree there is no reasonable alternative; at least one independent physician has seen the patient and given a written opinion; and the procedure is carried out with due medical care.\n\nThe request must come from the patient personally and may be oral; a written advance directive can replace an oral request if the patient later cannot express their will. Children may request from age 12, with parental consent at 12 to 15 and parental involvement at 16 and 17. The suffering must have a medical dimension, which can include cancer; being 'finished with life' does not qualify. Patients have no right to euthanasia and physicians may refuse. Every case is reviewed by one of five regional euthanasia review committees.",
    related: [...others("law-netherlands-euthanasia-act"), "palliative-sedation"],
    links: [
      { label: "Government of the Netherlands: is euthanasia allowed?", url: "https://www.government.nl/themes/family-health-and-care/euthanasia/is-euthanasia-allowed" },
      { label: "wetten.overheid.nl: BWBR0012410 (Dutch text)", url: "https://wetten.overheid.nl/BWBR0012410" },
    ],
    tags: [] }),

  law({ id: "law-spain-euthanasia-act", name: "Spain Organic Law 3/2021 regulating euthanasia",
    aka: ["Ley Orgánica 3/2021, de 24 de marzo, de regulación de la eutanasia", "LORE", "prestación de ayuda para morir"],
    tldr: "Spain's 2021 law gives adults with a serious and incurable illness, or a serious, chronic and disabling condition, the right to request help to die, after two written requests at least 15 days apart and information about palliative care.",
    summary: "Spain, organic law of 24 March 2021, published in the Boletín Oficial del Estado on 25 March 2021 (BOE-A-2021-4628) and in force three months after publication. Article 5 sets the requirements to receive the 'prestación de ayuda para morir': Spanish nationality, legal residence or registered residence of more than twelve months; being of age and capable and conscious when requesting; having in writing the information on the medical process and alternatives, including access to comprehensive palliative care; two voluntary written requests at least fifteen calendar days apart (a shorter interval is allowed if loss of capacity is imminent); suffering from a serious and incurable illness or a serious, chronic and disabling condition, certified by the responsible doctor; and informed consent. Where the person has lost capacity, a prior advance directive or living will can stand in for the requests.",
    related: others("law-spain-euthanasia-act"), technologies: ["palliative-care"],
    links: [{ label: "BOE: Ley Orgánica 3/2021, de regulación de la eutanasia", url: "https://www.boe.es/eli/es/lo/2021/03/24/3" }],
    tags: [] }),

  law({ id: "law-victoria-voluntary-assisted-dying-act", name: "Victoria Voluntary Assisted Dying Act 2017 (Australia)",
    aka: ["Voluntary Assisted Dying Act 2017 (Vic)", "voluntary assisted dying Victoria"],
    tldr: "In the Australian state of Victoria, people at the end of life who meet the law's eligibility criteria can ask for voluntary assisted dying. Amendments passed in November 2025 take effect from April 2027.",
    summary: "Australia, Victoria, state statute: the Voluntary Assisted Dying Act 2017. The Victorian Department of Health states that Victorians who are at the end of their life and who meet eligibility criteria can ask for voluntary assisted dying, and links an overview of eligibility, supports and safeguards. A Voluntary Assisted Dying Review Board oversees the Act, and a five-year review of its operation has been published. On 18 November 2025 the Victorian Parliament passed amendments to the Act, which the Department states will take effect from April 2027 after an 18-month implementation period. Other Australian states have their own laws; they are not sourced here.",
    related: others("law-victoria-voluntary-assisted-dying-act"), technologies: ["palliative-care"],
    links: [{ label: "Victoria Department of Health: voluntary assisted dying", url: "https://www.health.vic.gov.au/patient-care/voluntary-assisted-dying" }],
    tags: [] }),

  law({ id: "law-england-wales-terminally-ill-adults-bill", name: "Terminally Ill Adults (End of Life) Bill (England and Wales)",
    aka: ["Terminally Ill Adults (End of Life) Bill", "Leadbeater bill", "assisted dying bill England and Wales"],
    tldr: "This private member's bill would have let terminally ill adults in England and Wales ask for help to end their own life. It passed the House of Commons in June 2025 but did not complete its House of Lords stages in that session, so it is not law.",
    summary: "United Kingdom (England and Wales), private member's bill, not enacted. Parliament's record gives its long title as 'A Bill to allow adults who are terminally ill, subject to safeguards and protections, to request and be provided with assistance to end their own life', sponsored by Kim Leadbeater in the Commons and Lord Falconer of Thoroton in the Lords; it originated in the Commons and its last recorded stage is Lords committee stage, which began on 14 November 2025. A Bevan Brittan briefing of 5 May 2026 reports that the Commons passed it at third reading on 20 June 2025, that as drafted it applied to people with a life expectancy of six months or less, and that it did not complete its Lords stages by 24 April 2026, the last scheduled day of committee stage, so it will not pass in that parliamentary session.",
    related: others("law-england-wales-terminally-ill-adults-bill"),
    links: [
      { label: "UK Parliament Bills API: Terminally Ill Adults (End of Life) Bill (bill 3774)", url: "https://bills-api.parliament.uk/api/v1/Bills/3774" },
      { label: "Bevan Brittan: where are we now? (5 May 2026)", url: "https://www.bevanbrittan.com/insights/articles/2026/the-terminally-ill-adults-end-of-life-bill-where-are-we-now/" },
    ],
    tags: ["uk"] }),

  law({ id: "law-scotland-assisted-dying-bill", name: "Assisted Dying for Terminally Ill Adults (Scotland) Bill",
    aka: ["Assisted Dying for Terminally Ill Adults (Scotland) Bill", "McArthur bill"],
    tldr: "This Scottish member's bill would have let eligible terminally ill adults in Scotland ask for help from health professionals to end their own life. It fell at the final stage on 17 March 2026, so it is not law.",
    summary: "United Kingdom (Scotland), member's bill, not enacted. The Scottish Parliament states that Liam McArthur MSP introduced the bill (documents posted 27 March 2024) to allow terminally ill adults in Scotland, who are eligible, to lawfully request and be provided with assistance by health professionals to end their own life. It completed Stage 1 and Stage 2 (ending 25 November 2025); Stage 3 amending proceedings concluded on 13 March 2026, and the Parliament's page records that the bill fell on 17 March 2026 at Stage 3.",
    related: others("law-scotland-assisted-dying-bill"),
    links: [{ label: "Scottish Parliament: Assisted Dying for Terminally Ill Adults (Scotland) Bill", url: "https://www.parliament.scot/bills-and-laws/bills/s6/assisted-dying-for-terminally-ill-adults-scotland-bill" }],
    tags: ["uk"] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Patient navigation
// ---------------------------------------------------------------------------------------------------------------------
const navigation: EntityInput[] = [
  term({ id: "patient-navigation", name: "Patient navigation in cancer care", category: "Supportive care",
    aka: ["patient navigator", "nurse navigator", "oncology nurse navigator", "cancer navigator", "lay navigator", "peer navigator"],
    tldr: "A patient navigator is a nurse, social worker or trained lay person who helps you through cancer care: booking tests, explaining the steps, sorting out money and transport, and connecting you with support. Many cancer centres have one; ask who yours is.",
    summary: "The American Cancer Society National Navigation Roundtable defines patient navigation in the cancer care setting as individualised assistance offered to patients, families and caregivers to help overcome health care system barriers and facilitate timely access to quality health and psychosocial care from pre-diagnosis through all phases of the cancer experience. Navigators include clinical oncology nurse navigators, social work navigators and lay patient navigators; the Roundtable publishes standards for navigation programmes, and the Academy of Oncology Nurse & Patient Navigators runs certification for nurse and patient navigators.\n\nIn the US, Medicare has paid for navigation through the Principal Illness Navigation codes G0023 and G0024, which name cancer among eligible conditions. In Australia, McGrath Cancer Care Nurses give free nursing and psychosocial support through treatment. Financial navigation, a narrower service focused on costs, has its own record.",
    terms: ["medicare-principal-illness-navigation"], technologies: ["financial-navigation", "oncology-nursing"],
    related: ["aonn-plus", "national-navigation-roundtable", "mcgrath-cancer-care-nurses"],
    links: [{ label: "ACS National Navigation Roundtable", url: "https://navigationroundtable.org/" }, { label: "Academy of Oncology Nurse & Patient Navigators", url: "https://www.aonnonline.org/" }],
    tags: ["supportive", "carer"] }),

  term({ id: "medicare-principal-illness-navigation", name: "Medicare Principal Illness Navigation services (G0023, G0024)", category: "Access",
    aka: ["Principal Illness Navigation", "PIN services", "G0023", "G0024"],
    tldr: "In the US, Medicare can pay for a trained navigator to help people with serious illnesses including cancer coordinate care, find support services and speak up for themselves. Your doctor has to set it up at a visit, with your consent, and cost sharing may apply.",
    summary: "Principal Illness Navigation (PIN) services are billed to Medicare with two HCPCS codes for services by certified or trained auxiliary personnel under the direction of a physician or other practitioner: G0023, PIN services including by a patient navigator, 60 minutes per calendar month, and G0024, each additional 30 minutes. The Rural Health Information Hub lists the services as person-centred planning, care coordination and health system navigation, referral to supportive and community-based resources, and promotion of patient self-advocacy skills, for serious high-risk conditions including cancer. An initiating visit (an evaluation and management visit, an annual wellness visit or certain behavioural assessments) establishes the need and a treatment plan; the practitioner must document consent before services start and annually, make sure the patient knows about cost sharing, and only one practitioner may bill the services per month.",
    terms: ["patient-navigation"], technologies: ["financial-navigation"],
    links: [{ label: "Rural Health Information Hub: Principal Illness Navigation services", url: "https://www.ruralhealthinfo.org/care-management/principal-illness-navigation-services" }],
    tags: ["supportive", "us"] }),

  coll({ id: "aonn-plus", name: "Academy of Oncology Nurse & Patient Navigators (AONN+)", url: "https://www.aonnonline.org/", maintainer: "Academy of Oncology Nurse & Patient Navigators",
    aka: ["AONN+", "AONN"],
    holds: "The US professional society for oncology nurse navigators and patient navigators: conferences, toolkits, continuing education, national committees and Local Navigator Networks, with a linked foundation that runs navigator certification exams.",
    tldr: "AONN+ is the professional society for cancer nurse navigators and patient navigators in the US; it trains and certifies the people who guide patients through care.",
    summary: "The Academy of Oncology Nurse & Patient Navigators (AONN+) describes its focus as developing a local and regional network of navigators to support communication and education among peers and improve patient outcomes and survivorship. It runs annual and midyear conferences, national committees (including clinical trials, survivorship and genetics and genomics), toolkits, continuing education and Local Navigator Networks. A separate legal entity, the AONN+ Foundation for Learning, oversees the Oncology Nurse Navigator-Certified Generalist (ONN-CG) and Oncology Patient Navigator-Certified Generalist (OPN-CG) exams.",
    terms: ["patient-navigation"], technologies: ["oncology-nursing"],
    tags: ["us"] }),

  coll({ id: "national-navigation-roundtable", name: "American Cancer Society National Navigation Roundtable", url: "https://navigationroundtable.org/", maintainer: "American Cancer Society",
    aka: ["ACS National Navigation Roundtable", "ACS NNRT", "NNRT"],
    holds: "A national coalition convened by the American Cancer Society that publishes patient navigation standards, an implementation guide, a resource centre and a strategic roadmap for navigation programmes.",
    tldr: "The National Navigation Roundtable is a coalition led by the American Cancer Society that sets standards for patient navigation programmes so more people get help through cancer care.",
    summary: "The American Cancer Society serves as the backbone of the National Navigation Roundtable, which it describes as a collaboration that advances patient navigation efforts to eliminate barriers to quality care, reduce disparities in health outcomes and foster health equity across the cancer continuum. It publishes standards for navigation programmes covering clinical oncology nurse navigators, social work navigators and patient navigators, an implementation guide and a resource centre, surveys members on navigation reimbursement, and launched 2026 to 2029 Strategic Roadmap Priority Teams.",
    terms: ["patient-navigation"], related: ["american-cancer-society"],
    tags: ["us"] }),

  coll({ id: "mcgrath-cancer-care-nurses", name: "McGrath Cancer Care Nurses (McGrath Foundation, Australia)", url: "https://www.mcgrathfoundation.com.au/", maintainer: "McGrath Foundation",
    aka: ["McGrath Foundation", "McGrath nurses", "McGrath breast care nurses"],
    holds: "Specialist cancer nurses funded by the McGrath Foundation who give free clinical, psychosocial and emotional support to people with cancer and their families in Australia, through treatment.",
    tldr: "In Australia, McGrath Cancer Care Nurses give free nursing and emotional support to people with any cancer and their families through treatment; ask your treating hospital whether one works there.",
    summary: "The McGrath Foundation funds McGrath Cancer Care Nurses, who provide expert clinical, psychosocial and emotional support to people experiencing cancer and their families through treatment, free of charge. The Foundation states that its nurses have supported people with breast cancer since 2005 and that it is now taking its care to all cancers. Its site reports 430 McGrath Cancer Care Nurses. Since 2009 Cricket Australia, the Sydney Cricket Ground and the Foundation have run the Pink Test as a fundraiser.",
    terms: ["patient-navigation"], technologies: ["oncology-nursing"], cancers: ["breast-cancer"],
    tags: ["patient-org", "free"] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Fertility preservation services and funding
// ---------------------------------------------------------------------------------------------------------------------
const fertility: EntityInput[] = [
  coll({ id: "alliance-for-fertility-preservation", name: "Alliance for Fertility Preservation", url: "https://www.allianceforfertilitypreservation.org/", maintainer: "Alliance for Fertility Preservation",
    holds: "US patient information on fertility risks from cancer treatment, preservation options, costs and financial assistance, and a state-by-state map of laws requiring insurers to cover fertility preservation.",
    tldr: "The Alliance for Fertility Preservation helps people with cancer in the US understand how treatment can affect fertility, what preservation costs, and whether their state's law makes insurers pay for it.",
    summary: "The Alliance for Fertility Preservation publishes patient information on fertility risks, preservation options, post-treatment family building, the cost of treatment and financial assistance programmes, and maintains a coverage map of US state fertility preservation laws. It describes working with cancer and fertility organisations, oncology and reproductive clinicians, local patient groups and patients in many states on coverage bills.",
    technologies: ["fertility-preservation"], terms: ["us-state-fertility-preservation-laws"],
    tags: ["patient-org", "us"] }),

  law({ id: "us-state-fertility-preservation-laws", name: "US state fertility preservation coverage laws",
    aka: ["iatrogenic infertility coverage laws", "fertility preservation insurance mandates"],
    tldr: "Some US states have laws that require certain health insurers to pay for fertility preservation, such as egg or sperm freezing, for people whose cancer treatment may cause infertility. Check your state on the Alliance for Fertility Preservation map before treatment starts.",
    summary: "United States, state statutes. The Alliance for Fertility Preservation explains that states have introduced bills requiring certain insurers to cover fertility preservation for cancer patients and others facing infertility as a result of medical treatment (iatrogenic infertility), and that in 2017 Connecticut and Rhode Island were the first two states to pass such laws. Its State List (updated 9 July 2026) names 44 jurisdictions with some legislative activity; whether each has coverage enacted, pending or only previous legislation is shown on an interactive map that could not be read as text, so the enacted states are not listed here.",
    technologies: ["fertility-preservation"], related: ["alliance-for-fertility-preservation"],
    links: [{ label: "Alliance for Fertility Preservation: laws and legislation", url: "https://www.allianceforfertilitypreservation.org/expenses/laws-legislation/" }],
    tags: ["us"] }),

  coll({ id: "livestrong-fertility", name: "Livestrong Fertility", url: "https://www.livestrong.org/we-can-help/livestrong-fertility", maintainer: "Livestrong Foundation",
    aka: ["LIVESTRONG Fertility"],
    holds: "A US programme for people whose cancer diagnosis may affect their ability to have children: discounted fertility preservation and free medications through a network of partner clinics and cryobanks, with case management.",
    tldr: "Livestrong Fertility helps eligible people with cancer in the US get fertility preservation at a discount, with free medicines from partner companies and a case manager to guide them. Apply before treatment starts.",
    summary: "Livestrong Fertility was created for people whose cancer diagnosis may affect their ability to create or add to their families. Its page states that its partners are nationwide and offer discounts and free medications to eligible cancer patients, and reports more than 150 fertility clinics and cryobanks in its network, 17,000 people served and $100 million saved by patients. It gives a typical cost of around $12,000 for fertility preservation for birthing parents and about $700 for non-birthing parents, and provides case management by phone. CancerCare's 2026 resource guide lists it under fertility preservation help.",
    technologies: ["fertility-preservation"], related: ["livestrong-at-the-ymca"],
    links: [{ label: "CancerCare: A Helping Hand, 2026 resource guide (PDF)", url: "https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US" }],
    tags: ["patient-org", "us"] }),

  coll({ id: "oncofertility-consortium", name: "The Oncofertility Consortium", url: "https://oncofertility.msu.edu/", maintainer: "Michigan State University",
    aka: ["Oncofertility Consortium"],
    holds: "An international, interdisciplinary initiative on the health care and quality-of-life issues of people with cancer whose fertility may be threatened by the disease or its treatment, based at Michigan State University in East Lansing.",
    tldr: "The Oncofertility Consortium is an international group of clinicians and researchers working to protect the fertility of people with cancer; it shares information on preservation options for patients and professionals.",
    summary: "CancerCare's 2026 resource guide lists The Oncofertility Consortium, at 965 Wilson Road, East Lansing, Michigan, under fertility preservation help, and describes it as an international, interdisciplinary initiative designed to address the complex health care and quality-of-life issues that concern cancer patients whose fertility may be threatened by cancer and its treatment. The Consortium's own site returned a bot challenge to a script on 4 November 2026, so nothing further is stated here.",
    technologies: ["fertility-preservation"],
    links: [{ label: "CancerCare: A Helping Hand, 2026 resource guide (PDF)", url: "https://www.cancercare.org/getContentAsset/e1c062c8-54d7-4cfb-9454-ba84b2422e55/14588f85-a65c-4169-b8c4-c49268c84ed1/A-Helping-Hand-The-2026-Resource-Guide-for-People-With-Cancer_i23wbgbe-nqq.pdf?language=en-US" }],
    tags: [] }),

  coll({ id: "fertiprotekt", name: "FertiPROTEKT Netzwerk", url: "https://fertiprotekt.com/", maintainer: "FertiPROTEKT Netzwerk e.V.",
    aka: ["FertiPROTEKT", "FertiPROTEKT Netzwerk e.V."],
    holds: "A network of more than 150 university and non-university fertility preservation centres in Germany, Austria and parts of Switzerland, with shared quality standards, a register and patient contact points.",
    tldr: "In Germany, Austria and parts of Switzerland, FertiPROTEKT links more than 150 centres that can protect fertility before cancer treatment; its site lists a contact centre near you.",
    summary: "FertiPROTEKT Netzwerk e.V. was founded in May 2006 because fertility protection techniques were at first offered only at a few expert centres. Its site states that the network now includes more than 150 university and non-university centres and has been extended to Austria and parts of Switzerland. Member centres commit to its standards and quality controls and to taking part in scientific evaluation through a shared register. The site has pages for patients by disease and treatment, for children and adolescents, and a list of contact centres.",
    technologies: ["fertility-preservation"],
    links: [{ label: "FertiPROTEKT: the network (German)", url: "https://fertiprotekt.com/aerzte-fachpersonen/netzwerk/" }],
    tags: [] }),

  coll({ id: "jp-oncofertility-subsidy", name: "Japan's oncofertility subsidy for children, adolescents and young adults with cancer", url: "https://www.pref.fukushima.lg.jp/sec/21045c/ninnyousei-onnzonn.html", maintainer: "Ministry of Health, Labour and Welfare, run by each prefecture",
    aka: ["小児・AYA世代のがん患者等の妊孕性温存療法研究促進事業", "oncofertility subsidy Japan"],
    holds: "A national scheme, started in April 2021 and run by each prefecture, that pays part of the cost of fertility preservation, and of later assisted reproduction using the frozen eggs, embryos or sperm, for children, adolescents and young adults with cancer, at designated hospitals.",
    tldr: "In Japan, children, teenagers and young adults with cancer can get part of the cost of freezing eggs, embryos or sperm, and of later fertility treatment, paid through a national scheme run by their prefecture. Ask the cancer consultation support centre at your hospital.",
    summary: "Fukushima Prefecture's page describes the national subsidy (小児・AYA世代のがん患者等の妊孕性温存療法研究促進事業), begun in April 2021 (令和3年4月), under which each prefecture subsidises part of the cost of fertility preservation and of assisted reproduction using specimens frozen by it, for children and AYA-generation patients who wish to have children in future, to reduce the financial burden and to spread effective and safe fertility preservation based on clinical data. Prefectures designate the hospitals that may provide it: preservation centres approved by the Japan Society of Obstetrics and Gynecology or the Japanese Urological Association, and assisted reproduction centres approved by the former. The Ministry of Health, Labour and Welfare's implementation outline was last partly revised on 7 April 2026 (令和8年4月7日). Each prefecture publishes its own application pages; cancer consultation support centres at designated cancer hospitals answer questions.",
    technologies: ["fertility-preservation"], terms: ["aya-oncology"],
    tags: ["free"] }),
];

export const palliativeNavigationFertilityGaps: EntityInput[] = [...planning, ...services, ...therapies, ...laws, ...navigation, ...fertility];
