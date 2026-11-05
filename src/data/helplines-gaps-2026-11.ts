import type { CollectionInput, EntityInput } from "@/lib/schema";

/**
 * Cancer helplines and information services, from the November 2026 gap census (docs/proposals/gap-census-2026-11.md,
 * type "helplines"). The denominator is the International Cancer Information Service Group's list of member
 * organisations (https://icisg.org/membership/membership-list/, read 4 November 2026). Every number and every opening
 * time below was copied from the service's own page, read as raw text on 4 November 2026; nothing else is stated. A line
 * is called free only where its page says so. Services whose page could not be read by script (Hellenic Cancer Society,
 * Hungarian League Against Cancer, Portuguese League Against Cancer and Hong Kong Cancer Fund returned 403; INCa's Cancer
 * info timed out; the Israel Cancer Association's English page did not load) are left out, and so is the National Cancer
 * Society of Malaysia, whose home page carried injected gambling spam when read.
 *
 * Each service is a `collection` record, as the existing helplines in src/data/free-wave.ts are, linked to the
 * organisation that runs it and to the ICISG record when the organisation is an ICISG member; `freeServices` in
 * free-wave.ts lists the lines on /free/.
 */
const asOf = "2026-11-04";
type C = Omit<CollectionInput, "kind" | "asOf" | "links"> & { links?: CollectionInput["links"]; icisg?: boolean };

const ROWS: C[] = [
  { id: "cancer-society-nz-helpline", name: "Cancer Information Helpline (Cancer Society of New Zealand)", icisg: true,
    url: "https://www.cancer.org.nz/", maintainer: "Cancer Society of New Zealand",
    holds: "The Cancer Society of New Zealand's national phone line, 0800 226 237, and the option to email an information nurse.",
    tldr: "Anyone in New Zealand can call 0800 226 237 to talk about cancer with the Cancer Society, or email one of its information nurses.",
    summary: "The Cancer Society of New Zealand's home page lists its Cancer Information Helpline on 0800 226 237 beside a link to email an information nurse. The same page lists the society's other support: one-on-one support, coping-with-cancer videos, and psychology and counselling. The Cancer Society of New Zealand, and three of its divisions (Auckland, Wellington and West Coast), are full members of the International Cancer Information Service Group.",
    institutions: ["cancer-society-new-zealand"], tags: ["helpline", "free"] },

  { id: "japan-cancer-information-service-support-center", name: "Cancer Information Service Support Center (Japan)", aka: ["がん情報サービスサポートセンター"], icisg: true,
    url: "https://ganjoho.jp/public/institution/consultation/support_center/guide.html", maintainer: "National Cancer Center Japan, Institute for Cancer Control",
    holds: "Japan's national cancer phone and chat line, run by the National Cancer Center's Institute for Cancer Control: 03-6706-7797 or 0570-02-3410, weekdays 10:00 to 15:00, and chat on weekdays 12:00 to 15:00, in Japanese.",
    tldr: "In Japan you can phone the National Cancer Center's support line on 03-6706-7797 or 0570-02-3410 on weekdays, or chat online, to ask about treatment, money, work or where to get help near you.",
    summary: "The Cancer Information Service Support Center (がん情報サービスサポートセンター) is a consultation service run by the National Cancer Center Japan's Institute for Cancer Control. Its page lists two numbers: 03-6706-7797, for callers on flat-rate or free-call mobile plans, and the Navi Dial number 0570-02-3410, which costs the same from anywhere in Japan; neither is described as free. Phone lines are open on weekdays from 10:00 to 15:00 and chat on weekdays from 12:00 to 15:00, excluding weekends, public holidays and the New Year period. Nurses, psychologists and other staff with national qualifications who are trained in cancer consultation answer questions about treatment, tests and symptoms, daily life including money and work, choosing a hospital and second opinions, palliative care and talking to the medical team, and they direct callers to a cancer consultation support centre near them. They cannot answer questions that need a medical judgement, and the service is in Japanese only.",
    institutions: ["ncc-japan"], related: ["japan-cancer-consultation-support-centres"], tags: ["helpline"] },

  { id: "japan-cancer-consultation-support-centres", name: "Cancer consultation support centres (Japan)", aka: ["がん相談支援センター", "Gan Sodan Shien Center"],
    url: "https://ganjoho.jp/public/institution/consultation/cisc/cisc.html", maintainer: "Designated cancer hospitals in Japan, described by the National Cancer Center Japan",
    holds: "Walk-in and telephone cancer consultation desks in every designated cancer care hospital, paediatric cancer hub hospital and regional cancer hospital in Japan, free and anonymous for anyone.",
    tldr: "Every designated cancer hospital in Japan has a cancer consultation support centre where anyone, including people who are not its patients, can talk to a nurse or social worker for free and without giving their name.",
    summary: "The National Cancer Center's information service describes the cancer consultation support centres (がん相談支援センター) as consultation desks set up in the designated cancer care hospitals (がん診療連携拠点病院), the paediatric cancer hub hospitals and the regional cancer hospitals across Japan; some hospitals give them another name, such as medical consultation room or patient support centre. Nurses who know cancer well and social workers who can advise on daily life act as consultants. Patients, families and local people who do not attend that hospital can use them free and anonymously, mainly face to face or by phone, at any point from a suspected diagnosis through treatment and follow-up. People can ask about diagnosis, treatment and side effects, life after treatment, money, work and school, and relationships with family and the medical team; what is said is not passed on, even to the treating doctor, without the person's consent. The centres do not make treatment decisions in place of the doctor. The National Cancer Center's booklets can be read or taken free at the centres.",
    institutions: ["ncc-japan"], related: ["japan-cancer-information-service-support-center"], tags: ["helpline", "free"] },

  { id: "korea-national-cancer-information-center-line", name: "National Cancer Information Center telephone counselling (Korea)", aka: ["국가암정보센터 암관련 상담전화"], icisg: true,
    url: "https://www.cancer.go.kr/", maintainer: "National Cancer Center Korea",
    holds: "Korea's national cancer counselling line, 1577-8899, answered on weekdays from 09:00 to 18:00, with recorded information around the clock and booking for email and phone counselling.",
    tldr: "In Korea, call 1577-8899 on weekdays between 9am and 6pm to ask the National Cancer Information Center about cancer.",
    summary: "The National Cancer Information Center (국가암정보센터, cancer.go.kr) lists its cancer counselling line on 1577-8899, answered on weekdays from 09:00 to 18:00 and closed at weekends and on public holidays, with an automated information service (ARS) available 24 hours. Email and telephone counselling can also be booked from the site. The site gives the National Cancer Center's address in Goyang as its own and states that its content is written by the clinical staff of the National Cancer Center's sixteen treatment centres and the researchers of its national cancer control division. The National Cancer Center Korea is a full member of the International Cancer Information Service Group.",
    institutions: ["ncc-korea"], tags: ["helpline"] },

  { id: "aecc-cancer-line", name: "AECC free cancer line (Spain)", aka: ["Asociación Española Contra el Cáncer 900 100 036"], icisg: true,
    url: "https://www.contraelcancer.es/es", maintainer: "Asociación Española Contra el Cáncer",
    holds: "The Spanish Association Against Cancer's free phone line, 900 100 036, open 24 hours a day, seven days a week.",
    tldr: "In Spain, the Spanish Association Against Cancer answers 900 100 036 free of charge at any hour, every day of the week.",
    summary: "The home page of the Asociación Española Contra el Cáncer lists 900 100 036 with the words \"Atención gratuita 24h - 7 días\": a free line answered 24 hours a day, seven days a week. The association is a full member of the International Cancer Information Service Group.",
    institutions: ["aecc"], tags: ["helpline", "free"] },

  { id: "ligue-soutien-cancer", name: "Ligue Soutien Cancer (France)", aka: ["Ligue contre le cancer numéro vert"], icisg: true,
    url: "https://www.ligue-cancer.net/", maintainer: "Ligue nationale contre le cancer",
    holds: "The Ligue contre le cancer's free phone number for patients and families, 0 800 940 939, and its support services during and after treatment.",
    tldr: "In France, the Ligue contre le cancer's free number 0 800 940 939 connects you to its support services for patients and families during and after treatment.",
    summary: "The Ligue nationale contre le cancer's home page gives its numéro vert, a free number, as 0 800 940 939 under the name Ligue Soutien Cancer. The page describes support services designed to improve care and quality of life during and after the illness. The Ligue is a full member of the International Cancer Information Service Group; so is the Institut National du Cancer, whose own line could not be read for this record.",
    institutions: ["ligue-contre-le-cancer"], tags: ["helpline", "free"] },

  { id: "cancer-support-france-helpline", name: "Cancer Support France helpline", icisg: true,
    url: "https://cancersupportfrance.org/", maintainer: "Cancer Support France",
    holds: "A free phone line, 0800 240 200, for English-speaking people in France affected by cancer, staffed by trained volunteers who call back.",
    tldr: "English speakers in France affected by cancer can call Cancer Support France free on 0800 240 200; a trained volunteer calls back within a day.",
    summary: "Cancer Support France supports English-speaking people in France whose lives have been touched by cancer. Its trained volunteers offer free and confidential support to patients, carers and families, and the support continues after bereavement. Its phone number, 0800 240 200, can be called free from a French landline or mobile; calls go to an answerphone, and the site says one of the team will make contact within 24 hours. It is a full member of the International Cancer Information Service Group.",
    tags: ["helpline", "free"] },

  { id: "cancerinfo-belgium", name: "Cancerinfo (Foundation against Cancer, Belgium)", aka: ["Cancerinfo 0800 15 801"], icisg: true,
    url: "https://www.cancer.be/", maintainer: "Fondation contre le Cancer",
    holds: "The Belgian Foundation against Cancer's free phone line, 0800 15 801, answered by professionals on weekdays from 9:00 to 18:00, with a call-back form.",
    tldr: "In Belgium, call 0800 15 801 on a weekday between 9am and 6pm and a professional from the Foundation against Cancer will answer your questions about cancer.",
    summary: "The Fondation contre le Cancer's site describes Cancerinfo as professionals who answer any question about cancer, reached on 0800 15 801 from Monday to Friday between 9:00 and 18:00, through a contact form, or by asking to be called back. The Foundation's own record notes that Cancerinfo answers in confidence and does not give diagnoses, name doctors or rate hospitals. The Foundation is a full member of the International Cancer Information Service Group.",
    institutions: ["foundation-against-cancer-belgium"], tags: ["helpline", "free"] },

  { id: "kraeftlinjen", name: "Kræftlinjen (Danish Cancer Society)", aka: ["Kraeftlinjen", "Danish Cancer Society hotline"], icisg: true,
    url: "https://www.cancer.dk/faa-raadgivning/", maintainer: "Kræftens Bekæmpelse",
    holds: "The Danish Cancer Society's phone and written advice line, 80 30 10 30, alongside its twelve counselling centres and 34 local advice services.",
    tldr: "In Denmark, call or write to Kræftlinjen on 80 30 10 30; the Danish Cancer Society's help for patients and relatives is free.",
    summary: "The Danish Cancer Society (Kræftens Bekæmpelse) says that all cancer patients and relatives can get free help from it, from professional advice to ways of meeting others in the same situation. Its advice page invites people to ring or write to Kræftlinjen on 80 30 10 30. The same page lists twelve counselling centres (kræftrådgivninger) and 34 local advice services across Denmark, where all offers are free, and the patient forum Cancerforum. The society is a full member of the International Cancer Information Service Group.",
    institutions: ["danish-cancer-society"], tags: ["helpline", "free"] },

  { id: "kreftforeningen-advice-line", name: "Kreftforeningen advice service (Norway)", aka: ["Norwegian Cancer Society advice line"], icisg: true,
    url: "https://kreftforeningen.no/", maintainer: "Kreftforeningen",
    holds: "The Norwegian Cancer Society's free advice service on 21 49 49 21, with chat and booked call-backs, for children and adults.",
    tldr: "In Norway, call the Norwegian Cancer Society free on 21 49 49 21, chat online or book a call, with any question about cancer.",
    summary: "Kreftforeningen's home page says its advice service is staffed by experienced professionals who have time to talk with both children and adults, and helps with every question about cancer free of charge. It can be reached by phone on 21 49 49 21, by chat, or by booking a conversation at a time the caller chooses. The Norwegian Cancer Society is a full member of the International Cancer Information Service Group.",
    institutions: ["norwegian-cancer-society"], tags: ["helpline", "free"] },

  { id: "finland-cancer-helpline", name: "Cancer Society of Finland helpline", icisg: true,
    url: "https://www.cancersociety.fi/", maintainer: "Cancer Society of Finland",
    holds: "A free nurse phone line, 0800 19414, open on set hours each weekday, and a nurse chat on kaikkisyovasta.fi.",
    tldr: "In Finland, a nurse answers the Cancer Society's free helpline on 0800 19414 on weekdays, and a nurse chat runs on kaikkisyovasta.fi.",
    summary: "The Cancer Society of Finland's English page lists a free phone consultation on 0800 19414. A nurse answers on Mondays and Thursdays from 10:00 to 18:00 and on Tuesdays, Wednesdays and Fridays from 10:00 to 15:00, and the service is free of charge. A nurse chat is available on kaikkisyovasta.fi from 9:00 to 15:00, and regional cancer societies offer local services. The society is a full member of the International Cancer Information Service Group.",
    institutions: ["cancer-society-of-finland"], tags: ["helpline", "free"] },

  { id: "estonian-cancer-helpline", name: "Estonian Cancer Society advice line", aka: ["Eesti Vähiliidu nõuandetelefon"], icisg: true,
    url: "https://cancer.ee/patsiendile/nouandetelefon/", maintainer: "Eesti Vähiliit",
    holds: "The Estonian Cancer Society's free advice line: 800 2233 from a landline or 631 1727 from a mobile, every working day from 10:00 to 12:00 and 18:00 to 20:00.",
    tldr: "In Estonia, the Cancer Society's free advice line answers on 800 2233 from a landline or 631 1727 from a mobile, on working days in the late morning and evening.",
    summary: "The Estonian Cancer Society (Eesti Vähiliit) offers free help by phone every working day from 10:00 to 12:00 and from 18:00 to 20:00. Callers from a landline dial 800 2233 and from a mobile 631 1727. The page says the line is supported by the National Institute for Health Development (Tervise Arengu Instituut). The society also runs e-counselling and information rooms for cancer patients. The Cancer Society of Estonia is a full member of the International Cancer Information Service Group.",
    institutions: ["estonian-cancer-society"], tags: ["helpline", "free"] },

  { id: "iceland-cancer-society-counselling", name: "Icelandic Cancer Society counselling line", aka: ["Krabbameinsfélagið ráðgjöf", "Iceland Cancer Society"], icisg: true,
    url: "https://www.krabb.is/", maintainer: "Krabbameinsfélagið (The Icelandic Cancer Society)",
    holds: "Free counselling from the Icelandic Cancer Society's social workers, nurses and psychologists, on 800 4040 or by email, in Icelandic, English, Polish and German, for patients and relatives.",
    tldr: "In Iceland, call 800 4040 for free advice and support from the Cancer Society's nurses, social workers and psychologists, in Icelandic, English, Polish or German.",
    summary: "The Icelandic Cancer Society (Krabbameinsfélagið), based in Reykjavík, offers advice and support at no cost. Its social workers, nurses and psychologists are available during diagnosis, during treatment and after it, in Icelandic, English, Polish and German, and the service is also for relatives. The counselling number is 800 4040, with email to radgjof@krabb.is. The Iceland Cancer Society is a full member of the International Cancer Information Service Group.",
    tags: ["helpline", "free"] },

  { id: "cancer-focus-ni-nurseline", name: "Cancer Focus Northern Ireland NurseLine", icisg: true,
    url: "https://cancerfocusni.org/", maintainer: "Cancer Focus Northern Ireland",
    holds: "A freephone cancer nurse line in Northern Ireland, 0800 783 3339, open Monday, Wednesday and Friday mornings.",
    tldr: "In Northern Ireland, call the Cancer Focus nurse line free on 0800 783 3339 on Monday, Wednesday or Friday morning.",
    summary: "Cancer Focus Northern Ireland lists its Nurseline Cancer Freephone Helpline on 0800 783 3339, open on Monday, Wednesday and Friday from 9am to 1pm. The charity's site also lists a support finder, a driving service and cancer support centres, with sections for people recently diagnosed, living with cancer, caring for someone, facing advanced cancer and living well after treatment. Cancer Focus Northern Ireland is a full member of the International Cancer Information Service Group.",
    tags: ["helpline", "free"] },

  { id: "ovacome-support-line", name: "Ovacome support line", icisg: true,
    url: "https://www.ovacome.org.uk/", maintainer: "Ovacome",
    holds: "The UK ovarian cancer support charity's support number, 0800 008 7054, with support groups, events and information.",
    tldr: "Anyone in the UK affected by ovarian cancer can call Ovacome's support line on 0800 008 7054.",
    summary: "Ovacome describes itself as the UK's ovarian cancer support charity, providing personalised support and information to people affected by ovarian cancer since 1996. Its support number is 0800 008 7054, separate from its office number, and the site lists support groups and events, support in other languages, and information on rarer types of ovarian cancer and on diagnosis under 45. The site states that it answered 2,100 calls to its support line in the last year reported. Ovacome is a full member of the International Cancer Information Service Group.",
    cancers: ["ovarian"], tags: ["helpline", "free"] },

  { id: "aimac-help-line", name: "AIMaC help-line (Italy)", aka: ["Associazione Italiana Malati di Cancro help-line"], icisg: true,
    url: "https://www.aimac.it/aimac-per-te/help-line", maintainer: "Associazione Italiana Malati di Cancro, parenti e amici (AIMaC)",
    holds: "The Italian cancer patients' association's help-line, 06 42989570, staffed on weekdays from 9:00 to 19:00 by trained volunteers backed by an oncologist and a psychologist.",
    tldr: "In Italy, call the cancer patients' association AIMaC on 06 42989570 on weekdays from 9am to 7pm for information about the illness, treatment, side effects and your rights at work.",
    summary: "AIMaC (Associazione Italiana Malati di Cancro) describes its help-line as a space for listening and welcome that gives each person answers tailored to them. A team of specially trained volunteer operators, supported by a lawyer, a clinical oncologist and a psychologist or psychotherapist, gives information about the illness, treatments and their side effects, and about access to the benefits the law provides at work, in social security and in welfare, and points to the health and social services, cancer centres and volunteer associations to turn to. The service runs from Monday to Friday, 9:00 to 19:00, on 06 42989570 or a mobile number, and by email. AIMaC is a full member of the International Cancer Information Service Group.",
    tags: ["helpline"] },

  { id: "lpr-slovakia-onkoporadna", name: "Onkoporadňa (League Against Cancer, Slovakia)", aka: ["Liga proti rakovine Onkoporadňa"], icisg: true,
    url: "https://www.lpr.sk/", maintainer: "Liga proti rakovine (League Against Cancer, Slovakia)",
    holds: "The Slovak League Against Cancer's free advice line, 0800 11 88 11, with doctors, psychologists, nutrition and social and legal advisers, by phone and email every day.",
    tldr: "In Slovakia, call the League Against Cancer's free line 0800 11 88 11 any day to talk to a doctor, psychologist, nutrition adviser or social and legal adviser.",
    summary: "The League Against Cancer in Slovakia (Liga proti rakovine) runs Onkoporadňa on the free number 0800 11 88 11. Telephone and email advice is available every day, and callers can consult doctors, psychologists, and nutrition or social and legal advisers. The League also runs a network of onco-psychologists who see patients and their families in person on hospital wards in selected Slovak towns. The League Against Cancer in Slovakia is a full member of the International Cancer Information Service Group.",
    tags: ["helpline", "free"] },

  { id: "lpr-prague-advice-line", name: "League Against Cancer Prague advice line", aka: ["Poradenská linka Ligy proti rakovině"], icisg: true,
    url: "https://www.lpr.cz/", maintainer: "Liga proti rakovině Praha",
    holds: "The Prague League Against Cancer's advice line, 224 920 935, answered by experienced doctors every day from 9:00 to 16:00, with email questions and in-person consultation in Prague 9.",
    tldr: "In the Czech Republic, call the League Against Cancer's advice line on 224 920 935 any day between 9am and 4pm and an experienced doctor will answer.",
    summary: "The League Against Cancer Prague (Liga proti rakovině Praha) runs an advice line every day from 9:00 to 16:00 on 224 920 935, where experienced doctors answer questions. Questions can also be sent by email, and people can come for a consultation in person at the Černý Most polyclinic in Prague 9. The League Against Cancer Prague is a full member of the International Cancer Information Service Group.",
    institutions: ["liga-proti-rakovine-praha"], tags: ["helpline"] },

  { id: "cansa-helpline", name: "CANSA toll-free line (South Africa)", icisg: true,
    url: "https://cansa.org.za/", maintainer: "Cancer Association of South Africa",
    holds: "The Cancer Association of South Africa's toll-free number, 0800 22 6622, for questions and booking a counselling session, and a text-only line in English and Afrikaans, 072 197 9305.",
    tldr: "In South Africa, call CANSA toll-free on 0800 22 6622 to ask a question or book a counselling session, or text 072 197 9305 in English or Afrikaans.",
    summary: "The Cancer Association of South Africa (CANSA) lists 0800 22 6622 as its toll-free number for asking CANSA a question and booking a counselling session, and 072 197 9305 as a text-only line in English and Afrikaans. Its record in OnCo describes its care centres, care homes for out-of-town patients and tele-counselling. CANSA is a full member of the International Cancer Information Service Group.",
    institutions: ["cansa"], tags: ["helpline", "free"] },

  { id: "kanker-nl-infolijn", name: "Kanker.nl infolijn (Netherlands)", aka: ["kanker.nl", "KWF kanker.nl"], icisg: true,
    url: "https://www.kanker.nl/hulp-en-ondersteuning/de-kankernl-infolijn", maintainer: "KWF Kankerbestrijding",
    holds: "The Dutch cancer information platform kanker.nl and its information line, 0800-0226622, open on weekdays from 12:00 to 17:00, with chat from 9:00 to 17:00 and email.",
    tldr: "In the Netherlands, the kanker.nl information line on 0800-0226622 listens, explains tests, treatments and side effects, and helps you sort out the questions to ask your doctor.",
    summary: "Kanker.nl is the Dutch Cancer Society's (KWF) platform for information, help and contact with others who have had cancer. Its information line (infolijn) listens to people with cancer and those around them, explains tests, treatments, side effects and consequences of cancer, and helps callers work out what they want to ask their doctor; it cannot assess medical results, images or tissue reports. It is open on weekdays except public holidays: phone 0800-0226622 from 12:00 to 17:00, chat from 9:00 to 17:00, and email. The site also lists specialist helplines for particular cancers. The Dutch Cancer Society is a full member of the International Cancer Information Service Group.",
    institutions: ["kwf"], tags: ["helpline"] },

  { id: "cancerlinjen-sweden", name: "Cancerlinjen (Swedish Cancer Society)", aka: ["Cancerfonden Cancerlinjen"], icisg: true,
    url: "https://www.cancerfonden.se/rad-och-stod", maintainer: "Cancerfonden",
    holds: "The Swedish Cancer Society's support line for people affected and those close to them, 010-199 10 10, free and anonymous, with chat.",
    tldr: "In Sweden, call Cancerlinjen on 010-199 10 10 to talk about cancer free and anonymously, or chat online.",
    summary: "Cancerlinjen is the Swedish Cancer Society's (Cancerfonden) support line for people affected by cancer and their relatives, described on its page as by your side with support and answers about cancer. Calls to 010-199 10 10 are free of charge and anonymous; the line is open Monday 9 to 16, Tuesday 10 to 16 and Wednesday to Friday 9 to 16, and there is a chat. The ICISG lists both the Swedish Cancer Society and the Swedish Cancer Information Service as full members.",
    related: ["cancerfonden"], tags: ["helpline", "free"] },

  { id: "infonetz-krebs", name: "INFONETZ KREBS (Deutsche Krebshilfe)", aka: ["Infonetz Krebs"],
    url: "https://www.krebshilfe.de/helfen/rat-hilfe/persoenliche-krebsberatung-infonetzkrebs/", maintainer: "Deutsche Krebshilfe",
    holds: "German Cancer Aid's free personal cancer advice line, 0800 80708877, Monday to Friday 8:00 to 17:00, with email and tailored information packs.",
    tldr: "In Germany, call INFONETZ KREBS free on 0800 80708877 on weekdays between 8am and 5pm for personal advice at any stage of cancer and help finding support near you.",
    summary: "INFONETZ KREBS is the personal cancer advice service of Deutsche Krebshilfe, run with the German Cancer Society (Deutsche Krebsgesellschaft) and the Stiftung Deutsche Leukämie- & Lymphom-Hilfe. Its team advises on the current state of medicine and science at every stage of the illness, points people to local contacts, and after a conversation puts together information material tailored to the caller's questions. The free number 0800 80708877 is open Monday to Friday from 8:00 to 17:00, and questions can be sent by email or post, anonymously if wished. Germany's other national line is the German Cancer Research Center's Krebsinformationsdienst.",
    institutions: ["deutsche-krebshilfe"], related: ["krebsinformationsdienst"], tags: ["helpline", "free"] },

  { id: "singapore-cancer-society-hotline", name: "Singapore Cancer Society hotline",
    url: "https://singaporecancersociety.org.sg/", maintainer: "Singapore Cancer Society",
    holds: "The Singapore Cancer Society's hotline, 1800-727-3333, open Monday to Friday from 9:00am to 5:30pm.",
    tldr: "In Singapore, call the Singapore Cancer Society on 1800-727-3333 on weekdays between 9am and 5.30pm.",
    summary: "The Singapore Cancer Society lists its hotline as 1800-727-3333, operating Monday to Friday from 9.00am to 5.30pm and closed at weekends and on public holidays. Singapore's members of the International Cancer Information Service Group are the National Cancer Centre Singapore and Parkway Cancer Centre; the Society is not listed as one.",
    institutions: ["singapore-cancer-society"], tags: ["helpline"] },
];

const icisg: CollectionInput = {
  kind: "collection", asOf, id: "icisg", name: "International Cancer Information Service Group", aka: ["ICISG"],
  url: "https://icisg.org/membership/membership-list/", maintainer: "International Cancer Information Service Group",
  holds: "The member list of the international network of cancer information services (phone and email helplines, websites, in-person and outreach services), by continent, with full and associate members.",
  tldr: "The international group of cancer helplines and information services; its member list is a quick way to find the national cancer information line in your country.",
  summary: "The International Cancer Information Service Group describes itself as an independent organisation made up of cancer information service programmes worldwide, whose mission is to help organisations provide high-quality information on all aspects of cancer to people affected by it. Its members run telephone and email helplines, websites, in-person help, publications and outreach. It was founded in 1996, and its site says membership includes more than 70 cancer information services from more than 40 countries. It has worked with the Union for International Cancer Control to help UICC members start, develop and evaluate their cancer information services. Its member list, read on 4 November 2026, names full members in 40 countries and territories, among them the US National Cancer Institute's Cancer Information Service, the American Cancer Society, Macmillan Cancer Support, Cancer Research UK and the German Cancer Research Center.",
  links: [{ label: "ICISG: list of member organisations", url: "https://icisg.org/membership/membership-list/" }, { label: "ICISG: about us", url: "https://icisg.org/about-icisg/" }, { label: "ICISG: collaboration with UICC", url: "https://icisg.org/about-icisg/our-collaboration-with-uicc/" }],
  institutions: ["uicc", "nci", "dkfz", "macmillan-cancer-support", "cruk", "ncc-japan", "ncc-korea", "nccs"],
  related: ["nci-cancer-information-service", "macmillan-support-line", "cruk-nurse-helpline", "acs-cancer-helpline", "krebsinformationsdienst", ...ROWS.filter((r) => r.icisg).map((r) => r.id)],
  tags: ["helpline"],
};

export const helplineCollections: CollectionInput[] = ROWS.map(({ icisg: member, links, ...x }) => ({
  kind: "collection", asOf, ...x,
  links: links ?? [{ label: x.name, url: x.url }],
  related: [...(x.related ?? []), ...(member ? ["icisg"] : [])],
}));

export const helplinesGaps: EntityInput[] = [icisg, ...helplineCollections];
