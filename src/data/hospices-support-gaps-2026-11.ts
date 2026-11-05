import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Hospices and drop-in cancer support centres (gap census, November 2026, type hospices-support-centres): the Maggie's
 * centres listed at https://www.maggies.org/our-centres/ that are open, the nine Marie Curie hospices listed at
 * https://www.mariecurie.org.uk/services/hospices, and two national end-of-life charities, Sue Ryder and Hospice UK.
 * Every fact is from the centre's or charity's own page, read as raw text on 4 November 2026: the address, the hospital
 * it sits beside, opening hours, phone number and what the page says it offers. Nothing else is added: no opening years
 * unless the page states one, no figures beyond the page's own. Coordinates are approximations to the town or district,
 * not the building. Maggie's Coventry and Maggie's Liverpool have pages but were still being built (Liverpool "expected
 * to open in 2027"), so they have no record yet. Charity-run centres use institutionType "consortium"; inpatient
 * hospices use "hospital".
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const MAGGIES_URL = (slug: string) => `https://www.maggies.org/our-centres/${slug}/`;

type UkCentre = {
  slug: string; name: string; place: string; city: string; lat: number; lng: number;
  /** Address lines exactly as the centre page gives them. */
  address: string; hospital: string; hostId?: string; phone: string; hours: string;
  /** The page lists grief and bereavement support. */
  bereavement: boolean;
  /** One extra sentence from the page, when it says something the template does not. */
  extra?: string;
};

const ukCentre = (c: UkCentre): InstitutionInput => i({
  id: c.slug, name: c.name, aka: [c.name.replace("Maggie's ", "Maggie's, ")], institutionType: "consortium",
  city: c.city, country: "GB", lat: c.lat, lng: c.lng, website: MAGGIES_URL(c.slug),
  tldr: `A Maggie's cancer support centre at ${c.hospital}, where anyone with cancer, and their family and friends, can walk in without an appointment for free support from cancer specialists, benefits advice and a psychologist if needed.`,
  summary: `${c.name} is one of the Maggie's cancer support centres, at ${c.address}. The centre page says it is open ${c.hours}, that no appointment is needed, and that its cancer support specialists have expert knowledge of cancer and treatment, many of them NHS-trained. It lists, in the centre: a cancer support specialist to talk to, benefits advisers who help with money worries, parking permits and extra money that may be claimable, and a route to a psychologist. Its sessions and workshops cover support groups, managing stress, family and friends, getting started with treatment (with prehabilitation sessions), the effects of treatment, living with cancer that cannot be cured, exercise, the end of treatment, body image${c.bereavement ? ", grief and bereavement" : ""}, eating well and creative groups.${c.extra ? " " + c.extra : ""} Phone ${c.phone}; Maggie's national line is 0300 123 1801. Maggie's says its centres offer support free to anyone with cancer and their families.`,
  programs: ["Drop-in support from cancer support specialists, no appointment", "Benefits and money advice", "Psychological support", "Support groups, courses and workshops", ...(c.bereavement ? ["Grief and bereavement support"] : [])],
  links: [{ label: `${c.name}: centre page`, url: MAGGIES_URL(c.slug) }, { label: "Maggie's: our centres", url: "https://www.maggies.org/our-centres/" }],
  institutions: ["maggies", ...(c.hostId ? [c.hostId] : [])], technologies: ["psycho-oncology"], related: ["maggies-centres", ...(c.slug === "maggies-northampton" ? ["maggies-southampton"] : [])], tags: ["uk"],
});

const MON_FRI = "Monday to Friday, 9 am to 5 pm";

const UK_CENTRES: UkCentre[] = [
  { slug: "maggies-aberdeen", name: "Maggie's Aberdeen", place: "Aberdeen", city: "Aberdeen", lat: 57.149, lng: -2.094, address: "the Elizabeth Montgomerie Building, Aberdeen Royal Infirmary, Aberdeen AB25 2UZ", hospital: "Aberdeen Royal Infirmary", hostId: "aberdeen-royal-infirmary", phone: "01224 645928", hours: MON_FRI, bereavement: true },
  { slug: "maggies-barts", name: "Maggie's Barts", place: "Barts", city: "London", lat: 51.517, lng: -0.100, address: "St Bartholomew's Hospital, London EC1A 7BE", hospital: "St Bartholomew's Hospital in London", hostId: "barts-cancer-institute", phone: "020 3904 3448", hours: MON_FRI, bereavement: true },
  { slug: "maggies-cambridge", name: "Maggie's Cambridge", place: "Cambridge", city: "Cambridge", lat: 52.175, lng: 0.140, address: "21 Milton House, Addenbrooke's Hospital, Puddicombe Way, Cambridge CB2 0AD", hospital: "Addenbrooke's Hospital in Cambridge", hostId: "addenbrookes-cambridge", phone: "01223 249220", hours: MON_FRI, bereavement: true },
  { slug: "maggies-cardiff", name: "Maggie's Cardiff", place: "Cardiff", city: "Cardiff", lat: 51.481, lng: -3.179, address: "the Chris McGuigan Building, Velindre Cancer Centre, Velindre Road, Whitchurch, Cardiff CF14 2TQ", hospital: "Velindre Cancer Centre in Cardiff", hostId: "velindre-cardiff", phone: "029 2240 8024", hours: "Monday 9 am to 6.30 pm and Tuesday to Friday 9 am to 5 pm", bereavement: true },
  { slug: "maggies-cheltenham", name: "Maggie's Cheltenham", place: "Cheltenham", city: "Cheltenham", lat: 51.900, lng: -2.078, address: "The Lodge, College Baths Road, Cheltenham GL53 7QB", hospital: "Cheltenham General Hospital", phone: "01242 250611", hours: MON_FRI, bereavement: true, extra: "Its directions place it opposite the entrance to the Oncology Centre at the rear of Cheltenham General Hospital." },
  { slug: "maggies-dundee", name: "Maggie's Dundee", place: "Dundee", city: "Dundee", lat: 56.462, lng: -2.971, address: "Ninewells Hospital, Tom McDonald Avenue, Dundee DD2 1NH", hospital: "Ninewells Hospital in Dundee", hostId: "ninewells-dundee", phone: "01382 632999", hours: MON_FRI, bereavement: true },
  { slug: "maggies-edinburgh", name: "Maggie's Edinburgh", place: "Edinburgh", city: "Edinburgh", lat: 55.953, lng: -3.189, address: "Western General Hospital, Crewe Road South, Edinburgh EH4 2XU", hospital: "the Western General Hospital in Edinburgh", hostId: "edinburgh-cancer-centre", phone: "0131 537 3131", hours: MON_FRI, bereavement: true },
  { slug: "maggies-fife", name: "Maggie's Fife", place: "Fife", city: "Kirkcaldy", lat: 56.111, lng: -3.159, address: "Victoria Hospital, Hayfield Road, Kirkcaldy KY2 5AH", hospital: "Victoria Hospital in Kirkcaldy", phone: "01592 647997", hours: MON_FRI, bereavement: true },
  { slug: "maggies-forth-valley", name: "Maggie's Forth Valley", place: "Forth Valley", city: "Larbert", lat: 56.023, lng: -3.826, address: "the Nina Barough Building, Forth Valley Royal Hospital, off Quintinshill Drive, Larbert FK5 4SG", hospital: "Forth Valley Royal Hospital in Larbert", phone: "01324 868069", hours: MON_FRI, bereavement: true },
  { slug: "maggies-glasgow", name: "Maggie's Glasgow", place: "Glasgow", city: "Glasgow", lat: 55.864, lng: -4.252, address: "Gartnavel General Hospital, 1053 Great Western Road, Glasgow G12 0YN", hospital: "Gartnavel General Hospital in Glasgow", phone: "0141 357 2269", hours: MON_FRI, bereavement: true },
  { slug: "maggies-highlands", name: "Maggie's Highlands", place: "Highlands", city: "Inverness", lat: 57.478, lng: -4.224, address: "Raigmore Hospital, Old Perth Road, Inverness IV2 3FL", hospital: "Raigmore Hospital in Inverness", hostId: "raigmore-inverness", phone: "01463 382900", hours: MON_FRI, bereavement: true },
  { slug: "maggies-lanarkshire", name: "Maggie's Lanarkshire", place: "Lanarkshire", city: "Airdrie", lat: 55.866, lng: -3.981, address: "the Elizabeth Montgomerie Building, Monklands Hospital, Monkscourt Avenue, Airdrie ML6 0JS", hospital: "Monklands Hospital in Airdrie", phone: "01236 771199", hours: MON_FRI, bereavement: true },
  { slug: "maggies-manchester", name: "Maggie's Manchester", place: "Manchester", city: "Manchester", lat: 53.429, lng: -2.231, address: "the Robert Parfett Building, The Christie Hospital NHS Foundation Trust, 15 Kinnaird Road, Manchester M20 4QL", hospital: "The Christie in Manchester", hostId: "the-christie", phone: "0161 641 4848", hours: MON_FRI, bereavement: true },
  { slug: "maggies-middlesbrough", name: "Maggie's Middlesbrough", place: "Middlesbrough", city: "Middlesbrough", lat: 54.576, lng: -1.235, address: "The James Cook University Hospital, Marton Road, Middlesbrough TS4 3BW", hospital: "The James Cook University Hospital in Middlesbrough", phone: "01642 449737", hours: MON_FRI, bereavement: false },
  { slug: "maggies-newcastle", name: "Maggie's Newcastle", place: "Newcastle", city: "Newcastle upon Tyne", lat: 54.978, lng: -1.617, address: "Freeman Hospital, Melville Grove, Newcastle upon Tyne NE7 7NU", hospital: "the Freeman Hospital in Newcastle upon Tyne", hostId: "newcastle-cancer-centre", phone: "0191 233 6600", hours: MON_FRI, bereavement: true },
  { slug: "maggies-north-wales", name: "Maggie's North Wales", place: "North Wales", city: "Bodelwyddan", lat: 53.268, lng: -3.500, address: "the Steve Morgan Foundation Building, Glan Clwyd Hospital, Bodelwyddan, Rhyl, Denbighshire LL18 5UJ", hospital: "Glan Clwyd Hospital in Bodelwyddan", phone: "01745 625850", hours: MON_FRI, bereavement: false, extra: "Call-back requests made through the centre page are answered from Maggie's Wirral." },
  { slug: "maggies-northampton", name: "Maggie's Northampton", place: "Northampton", city: "Northampton", lat: 52.240, lng: -0.902, address: "the Diana Russell Building, Northampton General Hospital NHS Trust, Cliftonville, Northampton NN1 5BD", hospital: "Northampton General Hospital", phone: "01604 218425", hours: MON_FRI, bereavement: false },
  { slug: "maggies-nottingham", name: "Maggie's Nottingham", place: "Nottingham", city: "Nottingham", lat: 52.954, lng: -1.158, address: "City Hospital Campus, Gate 3, Hucknall Road, Nottingham NG5 1PH", hospital: "Nottingham City Hospital", hostId: "nottingham-cancer-centre", phone: "0115 924 6210", hours: MON_FRI, bereavement: true },
  { slug: "maggies-oldham", name: "Maggie's Oldham", place: "Oldham", city: "Oldham", lat: 53.541, lng: -2.111, address: "The Royal Oldham Hospital, Rochdale Road, Oldham OL1 2JH", hospital: "The Royal Oldham Hospital", phone: "0161 989 0550", hours: MON_FRI, bereavement: true },
  { slug: "maggies-oxford", name: "Maggie's Oxford", place: "Oxford", city: "Oxford", lat: 51.752, lng: -1.258, address: "the Patricia Thompson Building, Churchill Hospital, Old Road, Oxford OX3 7LE", hospital: "the Churchill Hospital in Oxford", hostId: "oxford-cancer", phone: "01865 751882", hours: MON_FRI, bereavement: true },
  { slug: "maggies-royal-free", name: "Maggie's Royal Free", place: "Royal Free", city: "London", lat: 51.553, lng: -0.165, address: "The Royal Free Hospital, Rowland Hill Street, London NW3 2PF", hospital: "the Royal Free Hospital in north London", hostId: "royal-free-hospital", phone: "020 3981 4840", hours: MON_FRI, bereavement: true, extra: "The page says support now comes from the new centre on Rowland Hill Street." },
  { slug: "maggies-royal-marsden", name: "Maggie's Royal Marsden", place: "Royal Marsden", city: "Sutton", lat: 51.361, lng: -0.194, address: "The Royal Marsden, 2 Oakleaf Avenue, Sutton SM2 5GP", hospital: "The Royal Marsden in Sutton", hostId: "royal-marsden", phone: "020 3982 3141", hours: MON_FRI, bereavement: true },
  { slug: "maggies-southampton", name: "Maggie's Southampton", place: "Southampton", city: "Southampton", lat: 50.910, lng: -1.404, address: "University Hospital Southampton, 101-103 Tremona Road, Southampton SO16 6HT", hospital: "University Hospital Southampton", hostId: "southampton-cancer", phone: "023 8212 4549", hours: MON_FRI, bereavement: true },
  { slug: "maggies-swansea", name: "Maggie's Swansea", place: "Swansea", city: "Swansea", lat: 51.621, lng: -3.944, address: "Singleton Hospital, Sketty Lane, Swansea SA2 8QL", hospital: "Singleton Hospital in Swansea", phone: "01792 200000", hours: MON_FRI, bereavement: true },
  { slug: "maggies-west-london", name: "Maggie's West London", place: "West London", city: "London", lat: 51.487, lng: -0.220, address: "Charing Cross Hospital, Fulham Palace Road, London W6 8RF", hospital: "Charing Cross Hospital in west London", hostId: "imperial-cancer-centre", phone: "020 7386 1750", hours: MON_FRI, bereavement: true },
  { slug: "maggies-wirral", name: "Maggie's Wirral", place: "Wirral", city: "Bebington", lat: 53.350, lng: -3.004, address: "the Steve Morgan Foundation Building, The Clatterbridge Cancer Centre, Clatterbridge Road, Bebington CH63 4JY", hospital: "The Clatterbridge Cancer Centre on the Wirral", hostId: "clatterbridge", phone: "0151 334 4301", hours: MON_FRI, bereavement: true },
  { slug: "maggies-yorkshire", name: "Maggie's Yorkshire", place: "Yorkshire", city: "Leeds", lat: 53.801, lng: -1.549, address: "St James's University Hospital, Alma Street, Leeds LS9 7BE", hospital: "St James's University Hospital in Leeds", hostId: "leeds-cancer-centre", phone: "0113 457 8364", hours: MON_FRI, bereavement: true },
];

const INTERNATIONAL: InstitutionInput[] = [
  i({ id: "maggies-groningen", name: "Maggie's Groningen", institutionType: "consortium", city: "Groningen", country: "NL", lat: 53.219, lng: 6.567, website: MAGGIES_URL("maggies-groningen"),
    tldr: "A Maggie's cancer support centre beside the University Medical Center Groningen in the Netherlands, where anyone affected by cancer can walk in without an appointment.",
    summary: "Maggie's Groningen is one of Maggie's international centres. Its page gives the address as University Medical Center, Vrydemalaan 15A, 9713 WS Groningen, and says it sits in a park along a watercourse near the north side of the University Medical Centre. It opened in April 2024 and was designed by Marlies Rohmer Architects & Urbanist with landscaping by Piet Oudolf. The page says no appointment is needed. Phone 050 211 1744.",
    programs: ["Drop-in cancer support, no appointment"],
    links: [{ label: "Maggie's Groningen: centre page", url: MAGGIES_URL("maggies-groningen") }],
    institutions: ["maggies", "umcg-groningen"], technologies: ["psycho-oncology"], related: ["maggies-centres"] }),
  i({ id: "maggies-hong-kong", name: "Maggie's Hong Kong", institutionType: "consortium", city: "Hong Kong", country: "HK", lat: 22.391, lng: 113.977, website: MAGGIES_URL("maggies-hong-kong"),
    tldr: "A Maggie's cancer support centre at Tuen Mun Hospital in Hong Kong, a short walk from the oncology department, where anyone affected by cancer can walk in without an appointment.",
    summary: "Maggie's Hong Kong is based in Tuen Mun Hospital, Tsing Chung Koon Road, Tuen Mun, within walking distance of the hospital's oncology department. Maggie's describes it as its first international centre; it was designed by Frank Gehry and landscaped by Lily Jencks, the daughter of Maggie's founder Maggie Keswick Jencks. The page says no appointment is needed. Phone 2465 6006.",
    programs: ["Drop-in cancer support, no appointment"],
    links: [{ label: "Maggie's Hong Kong: centre page", url: MAGGIES_URL("maggies-hong-kong") }],
    institutions: ["maggies"], technologies: ["psycho-oncology"], related: ["maggies-centres"] }),
  i({ id: "maggies-tokyo", name: "Maggie's Tokyo", institutionType: "consortium", city: "Tokyo", country: "JP", lat: 35.655, lng: 139.796, website: MAGGIES_URL("maggies-tokyo"),
    tldr: "A Maggie's cancer support centre in Toyosu, Tokyo, where anyone affected by cancer can walk in without an appointment.",
    summary: "Maggie's Tokyo, at 6-4-18 Toyosu, Koto City, Tokyo, is the second of Maggie's affiliated overseas centres after Hong Kong. Its page says it opened in 2016 after a local group worked for many years to bring the Maggie's model to Japan, led by Masako Akiyama, director of Hakujuji Visiting Nurse Station, and the journalist Miho Suzuki. The page says no appointment is needed. Phone 03-3520-9913.",
    programs: ["Drop-in cancer support, no appointment"],
    links: [{ label: "Maggie's Tokyo: centre page", url: MAGGIES_URL("maggies-tokyo") }],
    institutions: ["maggies"], technologies: ["psycho-oncology"], related: ["maggies-centres"] }),
  i({ id: "kalida-barcelona", name: "Kálida Barcelona", aka: ["Kalida Barcelona", "Kálida Sant Pau"], institutionType: "consortium", city: "Barcelona", country: "ES", lat: 41.412, lng: 2.175, website: MAGGIES_URL("kalida-barcelona"),
    tldr: "A cancer support centre in the Maggie's network at Hospital Sant Pau in Barcelona, where anyone affected by cancer can walk in without an appointment.",
    summary: "Kálida Barcelona is part of the Maggie's network and is described as its first centre in mainland Europe and the third overseas, after Hong Kong and Tokyo. Its page gives the address as Hospital Sant Pau, 89 Carrer Sant Quinti, Barcelona, and says it opened in May 2019; the building is by Benedetta Tagliabue of Miralles Tagliabue EMBT, with interiors by Patricia Urquiola. The page says no appointment is needed. Phone 935 53 79 30.",
    programs: ["Drop-in cancer support, no appointment"],
    links: [{ label: "Kálida Barcelona: Maggie's centre page", url: MAGGIES_URL("kalida-barcelona") }],
    institutions: ["maggies", "hospital-de-sant-pau"], technologies: ["psycho-oncology"], related: ["maggies-centres"] }),
];

const MC_URL = (slug: string) => `https://www.mariecurie.org.uk/services/hospices/${slug}`;
const MC_INTRO = "The hospice page says Marie Curie helps people with an illness they are likely to die from, and the people close to them, receive specialist care and support for free, including people with advanced cancer as well as dementia, heart, liver, kidney and lung disease, motor neurone disease and Parkinson's.";
const MC_REFER = "Patients cannot refer themselves: the page asks you to contact the professional in charge of your care, such as the community palliative care team, GP, hospital consultant or district nurse.";
const MC_TLDR = (where: string) => `Marie Curie's hospice ${where} gives free specialist care to people with an illness they are likely to die from, including advanced cancer, and support to the people close to them; ask your GP, hospital consultant, district nurse or palliative care team to refer you.`;

type Hospice = { slug: string; id: string; name: string; city: string; lat: number; lng: number; address: string; phone: string; services: string; tldr?: string; summaryOverride?: string };
const hospice = (h: Hospice): InstitutionInput => i({
  id: h.id, name: h.name, institutionType: "hospital", city: h.city, country: "GB", lat: h.lat, lng: h.lng, website: MC_URL(h.slug),
  tldr: h.tldr ?? MC_TLDR(`in ${h.city}`),
  summary: h.summaryOverride ?? `${h.name} is one of Marie Curie's nine hospices, at ${h.address}. ${MC_INTRO} It lists ${h.services} ${MC_REFER} Phone ${h.phone}; Marie Curie's national phone number is 0800 090 2309.`,
  programs: ["Specialist palliative and end-of-life care", "Outpatient and wellbeing services", "Support for families and carers"],
  links: [{ label: `${h.name}: hospice page`, url: MC_URL(h.slug) }, { label: "Marie Curie: our hospices", url: "https://www.mariecurie.org.uk/services/hospices" }],
  institutions: ["marie-curie-uk"], technologies: ["hospice-end-of-life", "palliative-care"], tags: ["uk"],
});

const HOSPICES: InstitutionInput[] = [
  hospice({ slug: "belfast", id: "marie-curie-hospice-belfast", name: "Marie Curie Hospice, Belfast", city: "Belfast", lat: 54.597, lng: -5.930, address: "1A Kensington Road, Belfast BT5 6NF", phone: "028 9088 2000",
    services: "short-stay in-patient care, day procedures such as blood transfusions and treatment of high blood calcium, community and outpatient services from breathlessness workshops to relaxing therapies, and emotional support; outpatient services are open Monday to Friday, 9 am to 5 pm, and visiting for in-patients is flexible." }),
  hospice({ slug: "bradford", id: "marie-curie-hospice-bradford", name: "Marie Curie Hospice, Bradford", city: "Bradford", lat: 53.795, lng: -1.759, address: "Maudsley Street, Bradford BD3 9LE", phone: "01274 337 000",
    services: "in-patient stays for round-the-clock care until symptoms settle or for the final days, outpatient visits whether newly diagnosed or near the end of life, and wellbeing support from gentle exercise to reiki." }),
  hospice({ slug: "cardiff", id: "marie-curie-hospice-cardiff", name: "Marie Curie Hospice, Cardiff and the Vale", city: "Penarth", lat: 51.436, lng: -3.174, address: "Bridgeman Road, Penarth CF64 3YR", phone: "029 2042 6000",
    services: "in-patient stays for round-the-clock care until symptoms settle or for the final days, outpatient care, and wellbeing support from light exercise to hypnotherapy; the page is also available in Welsh." }),
  hospice({ slug: "edinburgh", id: "marie-curie-hospice-edinburgh", name: "Marie Curie Hospice, Edinburgh", city: "Edinburgh", lat: 55.905, lng: -3.215, address: "Frogston Road West, Edinburgh EH10 7DR", phone: "0131 470 2201",
    services: "in-patient stays, outpatient care, wellbeing support from arts and crafts to acupuncture, and home visits in which the specialist team assesses needs and helps plan ahead." }),
  hospice({ slug: "glasgow", id: "marie-curie-hospice-glasgow", name: "Marie Curie Hospice, Glasgow", city: "Glasgow", lat: 55.887, lng: -4.218, address: "133 Balornock Road, Glasgow G21 3US", phone: "0141 557 7400",
    services: "in-patient stays, outpatient care, wellbeing support from gentle exercise to reiki, and home visits wherever the person lives, including care homes." }),
  hospice({ slug: "hampstead", id: "marie-curie-hospice-hampstead", name: "Marie Curie Hospice, Hampstead", city: "London", lat: 51.556, lng: -0.178, address: "Hampstead, north London", phone: "020 3370 2208",
    services: "",
    tldr: "Marie Curie's Hampstead hospice building in north London is temporarily closed to in-patients, but its team still gives outpatient and wellbeing support remotely to people with a terminal illness and their families.",
    summaryOverride: "Marie Curie Hospice, Hampstead is one of Marie Curie's nine hospices. Its page says the building is temporarily closed and not accepting in-patient referrals while Marie Curie explores new ways to deliver care in North Central London; the Support and Wellbeing team continues to provide outpatient care and support remotely, and families of people already cared for there can contact the hospice directly. For outpatient services, the page asks you to contact the professional in charge of your care, such as the community palliative care team, GP, hospital consultant or district nurse. Phone 020 3370 2208; Marie Curie's national phone number is 0800 090 2309." }),
  hospice({ slug: "liverpool", id: "marie-curie-hospice-liverpool", name: "Marie Curie Hospice, Liverpool", city: "Liverpool", lat: 53.375, lng: -2.866, address: "Speke Road, Woolton, Liverpool L25 8QA", phone: "0151 801 1400",
    services: "",
    tldr: "Marie Curie's Liverpool hospice no longer has in-patient beds, but still gives free outpatient care, wellbeing support, home visits and bereavement support to people with a terminal illness and their families.",
    summaryOverride: "Marie Curie Hospice, Liverpool, at Speke Road, Woolton, Liverpool L25 8QA, is one of Marie Curie's nine hospices. Its page says the in-patient unit is permanently closed and that all other services in the hospice and in Liverpool continue; some staff have been seconded to a new in-patient palliative care ward at Liverpool Heart and Chest Hospital. It lists outpatient care, including procedures such as paracentesis, blood transfusions and iron infusions, bereavement support for families, wellbeing activities, and in some cases home assessment visits. Marie Curie says its hospice care is free. Phone 0151 801 1400; Marie Curie's national phone number is 0800 090 2309." }),
  hospice({ slug: "newcastle", id: "marie-curie-hospice-newcastle", name: "Marie Curie Hospice, Newcastle", city: "Newcastle upon Tyne", lat: 54.975, lng: -1.660, address: "Marie Curie Drive, Newcastle upon Tyne NE4 6SS", phone: "0191 219 1000",
    services: "in-patient stays, outpatient visits, and wellbeing support from art therapy to tai chi." }),
  hospice({ slug: "west-midlands", id: "marie-curie-hospice-west-midlands", name: "Marie Curie Hospice, West Midlands", city: "Solihull", lat: 52.412, lng: -1.778, address: "Marsh Lane, Solihull, West Midlands B91 2PQ", phone: "0121 703 3600",
    services: "in-patient stays for round-the-clock care until symptoms settle or for the final days, outpatient care, and wellbeing support." }),
];

const NETWORKS: InstitutionInput[] = [
  i({ id: "sue-ryder", name: "Sue Ryder", institutionType: "consortium", city: "Colchester", country: "GB", lat: 51.889, lng: 0.901, website: "https://www.sueryder.org",
    tldr: "A UK charity that gives end-of-life care in its hospices and care centres and in people's homes in parts of England, and free grief support online to anyone.",
    summary: "Sue Ryder says it is there so that everyone approaching the end of life or living with grief can get the support they need, and that it has done this work since 1954. It runs palliative care hubs, hospices and community support in a number of English counties, Sue Ryder Nurses, and Hospice at Home teams. For grief it runs a free Online Bereavement Community, open at any hour, and a self-help platform, Grief Guide. Its about page reports more than 657,000 hours of end-of-life care and nearly 58,000 face-to-face visits by its Hospice at Home and community teams in 2025-26. It is a charity registered in England and Wales (1052076) and in Scotland (SC039578), with its registered office in Colchester.",
    programs: ["Hospices and palliative care hubs in England", "Hospice at Home and community teams", "Online Bereavement Community", "Grief Guide self-help platform", "Campaigning on dying and grief"],
    links: [{ label: "About Sue Ryder", url: "https://www.sueryder.org/about-us/" }, { label: "Sue Ryder: our hospices and care centres", url: "https://www.sueryder.org/end-of-life-care/our-hospices-and-care-centres/" }],
    technologies: ["hospice-end-of-life", "palliative-care"], related: ["hospice-uk", "marie-curie-uk"], tags: ["uk"] }),
  i({ id: "hospice-uk", name: "Hospice UK", institutionType: "consortium", city: "London", country: "GB", lat: 51.529, lng: -0.118, website: "https://www.hospiceuk.org",
    tldr: "The UK's national charity for hospice care: its online hospice finder shows the adult and children's hospices near you, and it explains what hospices offer and how care is paid for.",
    summary: "Hospice UK describes itself as the national voice on hospice care; its mission is to promote and protect hospice care for all. Its information pages explain what hospice care is, the services hospices offer, hospice care for children and young people, choosing where to be cared for, paying for care and how to complain about end-of-life care, and its Hospice Care Finder lists adult and children's hospices near a given place. It runs the Dying Matters campaign for open conversation about death, dying and grief, gives grants and clinical expertise to hospices, and hosts the Hospice Jobs Board. It is a company limited by guarantee and a charity registered in England and Wales (1014851) and in Scotland (SC041112), based at Hospice House, Britannia Street, London.",
    programs: ["Hospice Care Finder", "Dying Matters campaign", "Information on hospice care and paying for care", "Grants and clinical support for hospices", "Hospice Jobs Board"],
    links: [{ label: "Hospice UK: about us", url: "https://www.hospiceuk.org/about-us" }, { label: "Hospice UK: about hospice care", url: "https://www.hospiceuk.org/about-hospice-care" }, { label: "Hospice Care Finder", url: "https://www.hospiceuk.org/hospice-care-finder" }],
    technologies: ["hospice-end-of-life", "palliative-care"], related: ["sue-ryder", "marie-curie-uk"], tags: ["uk"] }),
];

export const hospicesSupportGaps: EntityInput[] = [...UK_CENTRES.map(ukCentre), ...INTERNATIONAL, ...HOSPICES, ...NETWORKS];

