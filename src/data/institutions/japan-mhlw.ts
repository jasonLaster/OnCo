import type { InstitutionInput } from "@/lib/schema";

const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

/**
 * Japan: prefectural designated cancer care hospitals and cancer genomic medicine core hospitals on the Ministry of
 * Health, Labour and Welfare lists (src/data/universe-lists/mhlw-cancer-hospitals.json) that the corpus lacked when the
 * list was first measured on 4 November 2026 (scripts/institution-coverage.ts). Facts are from each hospital's own
 * pages and the ministry lists, read as raw text; coordinates are city-centre approximations. Each English name is the
 * one the hospital prints on its own site (src/data/universe-lists/mhlw-english.ts says where); the ministry's Japanese
 * name is kept as an alias.
 */
const MHLW = { label: "Ministry of Health, Labour and Welfare: designated cancer care hospitals (がん診療連携拠点病院等)", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/gan/gan_byoin.html" };
/** The ministry's sentence, the same on every record: which tier, for which prefecture. */
const hub = (prefecture: string) => `The Ministry of Health, Labour and Welfare lists it as the prefectural cancer care hub hospital (都道府県がん診療連携拠点病院) for ${prefecture} Prefecture, the top tier of the ministry's designated cancer care hospitals.`;
const hubOfTwo = (prefecture: string) => `The Ministry of Health, Labour and Welfare lists it as one of the two prefectural cancer care hub hospitals (都道府県がん診療連携拠点病院) for ${prefecture} Prefecture, the top tier of the ministry's designated cancer care hospitals.`;
const CORE = "The ministry also lists it among the 13 cancer genomic medicine core hospitals (がんゲノム医療中核拠点病院) from 1 November 2026, the hospitals at the centre of Japan's insured tumour gene-panel testing.";

export const institutionsJapanMhlw: InstitutionInput[] = [
  i({ id: "aomori-prefectural-central-hospital", name: "Aomori Prefectural Central Hospital", aka: ["青森県立中央病院"], institutionType: "hospital", city: "Aomori", country: "JP", lat: 40.822, lng: 140.747, website: "https://aomori-kenbyo.jp/",
    tldr: "The prefectural general hospital in Aomori city that the health ministry designates as Aomori Prefecture's hub hospital for cancer care.",
    summary: `${hub("Aomori")} The hospital is run by Aomori Prefecture. Its site is in Japanese; the English name used here is the one printed in its own copyright line.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Aomori Prefectural Central Hospital (Japanese)", url: "https://aomori-kenbyo.jp/" }] }),

  i({ id: "akita-university-hospital", name: "Akita University Hospital", aka: ["秋田大学医学部附属病院"], institutionType: "hospital", city: "Akita", country: "JP", lat: 39.72, lng: 140.103, website: "https://www.hos.akita-u.ac.jp/en/index.html", university: "Akita University",
    tldr: "Akita University's teaching hospital, which the health ministry designates as Akita Prefecture's hub hospital for cancer care.",
    summary: `${hub("Akita")} Its own history records that the Akita University School of Medicine was established in April 1970, the first medical school set up at a national university after the Second World War, and that the hospital moved to its present site beside the school in September 1976. It offers emergency care 24 hours a day and reports ISO 9001 quality-management certification since May 2005.`,
    programs: ["Prefectural cancer care hub", "24-hour emergency care"],
    links: [MHLW, { label: "Akita University Hospital (English)", url: "https://www.hos.akita-u.ac.jp/en/index.html" }, { label: "Akita University Hospital: history", url: "https://www.hos.akita-u.ac.jp/en/aboutus/history.html" }] }),

  i({ id: "yamagata-prefectural-central-hospital", name: "Yamagata Prefectural Central Hospital", aka: ["山形県立中央病院"], institutionType: "hospital", city: "Yamagata", country: "JP", lat: 38.255, lng: 140.34, website: "https://www.ypch.gr.jp/",
    tldr: "The prefectural general hospital in Yamagata city that the health ministry designates as Yamagata Prefecture's hub hospital for cancer care.",
    summary: `${hub("Yamagata")} The hospital is run by Yamagata Prefecture. Its site is in Japanese; the English name used here is the one on its own home page.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Yamagata Prefectural Central Hospital (Japanese)", url: "https://www.ypch.gr.jp/" }] }),

  i({ id: "fukushima-medical-university-hospital", name: "Fukushima Medical University Hospital", aka: ["公立大学法人福島県立医科大学附属病院", "福島県立医科大学附属病院"], institutionType: "hospital", city: "Fukushima", country: "JP", lat: 37.75, lng: 140.468, website: "https://www.fmu.ac.jp/en/medical_care/hospital.html", university: "Fukushima Medical University",
    tldr: "The teaching hospital of Fukushima Medical University, Fukushima Prefecture's only advanced treatment hospital and its designated hub hospital for cancer care.",
    summary: `${hub("Fukushima")} The hospital describes itself as Fukushima Prefecture's sole Designated Advanced Treatment Hospital, with 39 departments and 778 beds, and states that 650 physicians, 950 nurses and 600 allied professionals work there. It traces its roots to a medical lecture centre of the Shirakawa Temporary Hospital in the early Meiji era; the medical university was approved in 1952 and the hospital moved to Hikarigaoka in 1988.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)"],
    links: [MHLW, { label: "Fukushima Medical University Hospital (English)", url: "https://www.fmu.ac.jp/en/medical_care/hospital.html" }] }),

  i({ id: "ibaraki-prefectural-central-hospital", name: "Ibaraki Prefectural Central Hospital", aka: ["茨城県立中央病院", "Ibaraki Cancer Center", "茨城県地域がんセンター"], institutionType: "hospital", city: "Kasama", country: "JP", lat: 36.345, lng: 140.304, website: "https://www.hospital.pref.ibaraki.jp/chuo/",
    tldr: "The prefectural general hospital in Kasama that also houses the Ibaraki Cancer Center and is the health ministry's designated hub hospital for cancer care in Ibaraki.",
    summary: `${hub("Ibaraki")} The hospital names itself Ibaraki Prefectural Central Hospital, Ibaraki Cancer Center, and its site describes the arrangement that lets it play the central role in cancer care in the prefecture. It is also designated a regional disaster base hospital and a nuclear disaster base hospital.`,
    programs: ["Prefectural cancer care hub", "Ibaraki Cancer Center", "Disaster and nuclear disaster base hospital"],
    links: [MHLW, { label: "Ibaraki Prefectural Central Hospital (Japanese)", url: "https://www.hospital.pref.ibaraki.jp/chuo/" }] }),

  i({ id: "tochigi-cancer-center", name: "Tochigi Cancer Center", aka: ["栃木県立がんセンター"], institutionType: "cancer-center", city: "Utsunomiya", country: "JP", lat: 36.555, lng: 139.883, website: "https://www.tochigi-cc.jp/",
    tldr: "Tochigi Prefecture's specialist cancer hospital in Utsunomiya, the health ministry's designated hub hospital for cancer care in the prefecture.",
    summary: `${hub("Tochigi")} Its site describes a clinical trial management centre that runs trials of new cancer treatment, and work with the prefecture's other designated hospitals to deliver cancer care under the prefectural cancer control plan. It opened a facility it calls the Research Park in August 2025. The prefecture's list of designated hospitals places it in Utsunomiya.`,
    programs: ["Prefectural cancer care hub", "Clinical trial management centre", "Research Park (from 2025)"],
    links: [MHLW, { label: "Tochigi Cancer Center (Japanese)", url: "https://www.tochigi-cc.jp/" }, { label: "Tochigi Prefecture: designated cancer hospitals in the prefecture", url: "https://www.pref.tochigi.lg.jp/e04/welfare/gantaisaku/gankyotenbyouin.html" }] }),

  i({ id: "chiba-cancer-center", name: "Chiba Cancer Center", aka: ["千葉県がんセンター"], institutionType: "cancer-center", city: "Chiba", country: "JP", lat: 35.607, lng: 140.106, website: "https://www.pref.chiba.lg.jp/gan/",
    tldr: "Chiba Prefecture's specialist cancer centre, with a hospital and a research institute, designated by the health ministry as the prefecture's hub hospital for cancer care.",
    summary: `${hub("Chiba")} Its own site adds that it is designated a cancer genomic medicine hub hospital (がんゲノム医療拠点病院) and a paediatric cancer cooperating hospital. It runs the Chiba Cancer Center Research Institute alongside the hospital, which since 2005 has taught graduate students in molecular biology and oncology with the Chiba University Graduate School of Medicine. It is in Chuo-ku, Chiba.`,
    programs: ["Prefectural cancer care hub", "Cancer genomic medicine hub hospital", "Chiba Cancer Center Research Institute"],
    links: [MHLW, { label: "Chiba Cancer Center (Japanese)", url: "https://www.pref.chiba.lg.jp/gan/" }, { label: "Chiba Cancer Center Research Institute", url: "https://www.pref.chiba.lg.jp/gan/kenkyujo/index.html" }] }),

  i({ id: "komagome-hospital", name: "Tokyo Metropolitan Cancer and Infectious Diseases Center Komagome Hospital", aka: ["地方独立行政法人東京都立病院機構東京都立駒込病院", "東京都立駒込病院", "Komagome Hospital"], institutionType: "hospital", city: "Tokyo", country: "JP", lat: 35.729, lng: 139.753, website: "https://www.tmhp.jp/komagome/",
    tldr: "The Tokyo metropolitan hospital for cancer and infectious diseases in Bunkyo, one of Tokyo's two hub hospitals for cancer care designated by the health ministry.",
    summary: `${hubOfTwo("Tokyo")} The hospital is run by the Tokyo Metropolitan Hospital Organization and calls itself the Tokyo Metropolitan Cancer and Infectious Diseases Center Komagome Hospital. Its site describes an outpatient chemotherapy unit with 36 beds and 14 reclining chairs, cancer genomic medicine, an appearance care centre and a referral form for CAR-T therapy. It is in Bunkyo, Tokyo.`,
    programs: ["Prefectural cancer care hub", "Outpatient chemotherapy", "Cancer genomic medicine", "CAR-T referrals", "Appearance care centre"],
    links: [MHLW, { label: "Komagome Hospital: foreign language page", url: "https://www.tmhp.jp/komagome/foreignlanguage.html" }, { label: "Komagome Hospital (Japanese)", url: "https://www.tmhp.jp/komagome/" }],
    technologies: ["car-t"] }),

  i({ id: "kanagawa-cancer-center", name: "Kanagawa Cancer Center", aka: ["地方独立行政法人神奈川県立病院機構神奈川県立がんセンター", "神奈川県立がんセンター"], institutionType: "cancer-center", city: "Yokohama", country: "JP", lat: 35.444, lng: 139.638, website: "https://kcch.kanagawa-pho.jp/",
    tldr: "Kanagawa Prefecture's specialist cancer hospital in Yokohama, with a carbon-ion therapy facility, designated by the health ministry as the prefecture's hub hospital for cancer care.",
    summary: `${hub("Kanagawa")} The hospital is run by the Kanagawa Prefectural Hospital Organization. Its site lists a heavy-ion (carbon-ion) radiotherapy facility and a designation as a cancer genomic medicine hub hospital (がんゲノム医療拠点病院). It is in Asahi-ku, Yokohama.`,
    programs: ["Prefectural cancer care hub", "Heavy-ion radiotherapy facility", "Cancer genomic medicine hub hospital", "Clinical trials"],
    links: [MHLW, { label: "Kanagawa Cancer Center (Japanese)", url: "https://kcch.kanagawa-pho.jp/" }],
    technologies: ["carbon-ion"] }),

  i({ id: "niigata-cancer-center-hospital", name: "Niigata Cancer Center Hospital", aka: ["新潟県立がんセンター新潟病院"], institutionType: "cancer-center", city: "Niigata", country: "JP", lat: 37.916, lng: 139.036, website: "https://www.niigata-cc.jp/",
    tldr: "Niigata Prefecture's specialist cancer hospital, designated by the health ministry as the prefecture's hub hospital for cancer care.",
    summary: `${hub("Niigata")} The hospital is run by Niigata Prefecture. Its site records a cancer genome outpatient clinic opened in September 2021 and a clinical trial support office that lists the trials under way.`,
    programs: ["Prefectural cancer care hub", "Cancer genome outpatient clinic (from 2021)", "Clinical trial support office"],
    links: [MHLW, { label: "Niigata Cancer Center Hospital (Japanese)", url: "https://www.niigata-cc.jp/" }] }),

  i({ id: "toyama-prefectural-central-hospital", name: "Toyama Prefectural Central Hospital", aka: ["富山県立中央病院"], institutionType: "hospital", city: "Toyama", country: "JP", lat: 36.696, lng: 137.214, website: "https://www.tch.pref.toyama.jp/",
    tldr: "The prefectural general hospital in Toyama city that the health ministry designates as Toyama Prefecture's hub hospital for cancer care.",
    summary: `${hub("Toyama")} Its site lists it also as the prefecture's core disaster base hospital and an allergy disease hub hospital.`,
    programs: ["Prefectural cancer care hub", "Core disaster base hospital"],
    links: [MHLW, { label: "Toyama Prefectural Central Hospital (Japanese)", url: "https://www.tch.pref.toyama.jp/" }] }),

  i({ id: "kanazawa-university-hospital", name: "Kanazawa University Hospital", aka: ["金沢大学附属病院"], institutionType: "hospital", city: "Kanazawa", country: "JP", lat: 36.561, lng: 136.656, website: "https://web.hosp.kanazawa-u.ac.jp/en/", university: "Kanazawa University",
    tldr: "Kanazawa University's teaching hospital, founded in 1862, which the health ministry designates as Ishikawa Prefecture's hub hospital for cancer care.",
    summary: `${hub("Ishikawa")} The director's message states that the hospital was established in 1862. It is an advanced treatment hospital approved by the ministry and takes new patients on referral from other medical institutions; patients without a referral letter pay an additional first-visit fee. It stands at 13-1 Takara-machi, Kanazawa.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)"],
    links: [MHLW, { label: "Kanazawa University Hospital (English)", url: "https://web.hosp.kanazawa-u.ac.jp/en/" }, { label: "Kanazawa University Hospital: director's message", url: "https://web.hosp.kanazawa-u.ac.jp/en/director.html" }] }),

  i({ id: "fukui-prefectural-hospital", name: "Fukui Prefectural Hospital", aka: ["福井県立病院"], institutionType: "hospital", city: "Fukui", country: "JP", lat: 36.064, lng: 136.22, website: "https://fph.pref.fukui.lg.jp/lang/english/",
    tldr: "The prefectural general hospital in Fukui city, with a dedicated Cancer Care Center, designated by the health ministry as Fukui Prefecture's hub hospital for cancer care.",
    summary: `${hub("Fukui")} Its English pages describe a Cancer Care Center with a cancer outpatient clinic on a dedicated floor and a Palliative Care Center established inside it in April 2016. The hospital runs the Cancer Counselling & Support Center, trains staff and reports to the prefectural government, and oversees the prefecture's cooperation and support systems for cancer care.`,
    programs: ["Prefectural cancer care hub", "Cancer Care Center", "Palliative Care Center (from 2016)", "Cancer Counselling & Support Center", "Second opinions"],
    links: [MHLW, { label: "Fukui Prefectural Hospital (English)", url: "https://fph.pref.fukui.lg.jp/lang/english/" }, { label: "Fukui Prefectural Hospital: Cancer Care Center", url: "https://fph.pref.fukui.lg.jp/lang/english/info-hospital-visiting/about-cancer-care-center.html" }] }),

  i({ id: "yamanashi-prefectural-central-hospital", name: "Yamanashi Prefectural Central Hospital", aka: ["地方独立行政法人山梨県立病院機構山梨県立中央病院", "山梨県立中央病院"], institutionType: "hospital", city: "Kofu", country: "JP", lat: 35.662, lng: 138.568, website: "https://www.ych.pref.yamanashi.jp/",
    tldr: "The prefectural general hospital in Kofu, designated by the health ministry as Yamanashi Prefecture's hub hospital for cancer care since 2006.",
    summary: `${hub("Yamanashi")} Its site states that it was first designated in October 2006, that it holds Yamanashi's only advanced critical care centre (designated on 1 April 2019, the 42nd in Japan) and the prefecture's only comprehensive perinatal medical centre, and that it has a department of comprehensive genomic medicine. It is run by the Yamanashi Prefectural Hospital Organization.`,
    programs: ["Prefectural cancer care hub (since 2006)", "Comprehensive genomic medicine", "Advanced critical care centre", "Comprehensive perinatal medical centre"],
    links: [MHLW, { label: "Yamanashi Prefectural Central Hospital (Japanese)", url: "https://www.ych.pref.yamanashi.jp/" }, { label: "Yamanashi Prefectural Central Hospital: clinical trial site information (PDF)", url: "https://www.ych.pref.yamanashi.jp/wp-content/uploads/2025/12/857dea4f0e2c163ed8abc9d12f951841.pdf" }] }),

  i({ id: "shinshu-university-hospital", name: "Shinshu University Hospital", aka: ["信州大学医学部附属病院"], institutionType: "hospital", city: "Matsumoto", country: "JP", lat: 36.238, lng: 137.972, website: "https://wwwhp.md.shinshu-u.ac.jp/", university: "Shinshu University",
    tldr: "Shinshu University's teaching hospital in Matsumoto, which the health ministry designates as Nagano Prefecture's hub hospital for cancer care.",
    summary: `${hub("Nagano")} The hospital belongs to Shinshu University. Its site is in Japanese, with a clinical research support centre; the English name used here is the one in its own copyright line.`,
    programs: ["Prefectural cancer care hub", "Clinical research support centre"],
    links: [MHLW, { label: "Shinshu University Hospital (Japanese)", url: "https://wwwhp.md.shinshu-u.ac.jp/" }] }),

  i({ id: "gifu-university-hospital", name: "Gifu University Hospital", aka: ["岐阜大学医学部附属病院"], institutionType: "hospital", city: "Gifu", country: "JP", lat: 35.423, lng: 136.761, website: "https://www.hosp.gifu-u.ac.jp/eng/index.html", university: "Gifu University",
    tldr: "Gifu University's teaching hospital, which the health ministry designates as Gifu Prefecture's hub hospital for cancer care.",
    summary: `${hub("Gifu")} The hospital belongs to Gifu University and stands at 1-1 Yanagido, Gifu. Its English pages give first-visit reception from 8:30 to 11:00 on weekdays and an appointment centre by telephone.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Gifu University Hospital (English)", url: "https://www.hosp.gifu-u.ac.jp/eng/index.html" }] }),

  i({ id: "mie-university-hospital", name: "Mie University Hospital", aka: ["国立大学法人三重大学医学部附属病院", "三重大学医学部附属病院"], institutionType: "hospital", city: "Tsu", country: "JP", lat: 34.719, lng: 136.506, website: "https://www.hosp.mie-u.ac.jp/english/",
    tldr: "Mie University's teaching hospital in Tsu, which the health ministry designates as Mie Prefecture's hub hospital for cancer care.",
    summary: `${hub("Mie")} Its department list includes medical oncology, a breast centre and a department of genomic medicine, and it has an International Medical Support Center for patients from abroad.`,
    programs: ["Prefectural cancer care hub", "Medical oncology", "Genomic medicine department", "International Medical Support Center"],
    links: [MHLW, { label: "Mie University Hospital (English)", url: "https://www.hosp.mie-u.ac.jp/english/" }] }),

  i({ id: "shiga-general-hospital", name: "Shiga General Hospital", aka: ["滋賀県立総合病院"], institutionType: "hospital", city: "Moriyama", country: "JP", lat: 35.058, lng: 135.994, website: "https://www.pref.shiga.lg.jp/kensou/",
    tldr: "The prefectural general hospital in Moriyama that the health ministry designates as Shiga Prefecture's hub hospital for cancer care.",
    summary: `${hub("Shiga")} The hospital is run by Shiga Prefecture. Its site is in Japanese; the English name used here is the one in its own copyright line.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Shiga General Hospital (Japanese)", url: "https://www.pref.shiga.lg.jp/kensou/" }] }),

  i({ id: "kpum-hospital", name: "University Hospital, Kyoto Prefectural University of Medicine", aka: ["京都府立医科大学附属病院"], institutionType: "hospital", city: "Kyoto", country: "JP", lat: 35.024, lng: 135.77, website: "https://www.h.kpu-m.ac.jp/en/", university: "Kyoto Prefectural University of Medicine",
    tldr: "The teaching hospital of Kyoto Prefectural University of Medicine, one of Kyoto Prefecture's two hub hospitals for cancer care designated by the health ministry.",
    summary: `${hubOfTwo("Kyoto")} Its English pages describe it as an advanced treatment hospital designated by the ministry that offers specialised and complex treatment, with English-speaking staff on call on weekdays. It stands at Kawaramachi-Hirokoji, Kamigyo-ku, Kyoto.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)", "English-language assistance"],
    links: [MHLW, { label: "University Hospital, Kyoto Prefectural University of Medicine (English)", url: "https://www.h.kpu-m.ac.jp/en/" }, { label: "KPUM Hospital: overview", url: "https://www.h.kpu-m.ac.jp/en/aboutus/overview.html" }] }),

  i({ id: "hyogo-cancer-center", name: "Hyogo Cancer Center", aka: ["兵庫県立がんセンター"], institutionType: "cancer-center", city: "Akashi", country: "JP", lat: 34.643, lng: 134.997, website: "https://hyogo-cc.jp/",
    tldr: "Hyogo Prefecture's specialist cancer hospital in Akashi, designated by the health ministry as the prefecture's hub hospital for cancer care.",
    summary: `${hub("Hyogo")} The hospital is run by Hyogo Prefecture. Its site describes a genomic medicine and clinical trials centre with a genome outpatient clinic.`,
    programs: ["Prefectural cancer care hub", "Genomic medicine and clinical trials centre", "Genome outpatient clinic"],
    links: [MHLW, { label: "Hyogo Cancer Center (Japanese)", url: "https://hyogo-cc.jp/" }] }),

  i({ id: "nara-medical-university-hospital", name: "Nara Medical University Hospital", aka: ["奈良県立医科大学附属病院"], institutionType: "hospital", city: "Kashihara", country: "JP", lat: 34.509, lng: 135.792, website: "https://hospital.naramed-u.ac.jp/", university: "Nara Medical University",
    tldr: "The teaching hospital of Nara Medical University in Kashihara, Nara Prefecture's only advanced treatment hospital and its designated hub hospital for cancer care.",
    summary: `${hub("Nara")} Its site describes it as the only advanced treatment hospital (特定機能病院) in Nara Prefecture, with an advanced critical care centre, and as the prefecture's core disaster base hospital.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)", "Advanced critical care centre"],
    links: [MHLW, { label: "Nara Medical University Hospital (Japanese)", url: "https://hospital.naramed-u.ac.jp/" }] }),

  i({ id: "wakayama-medical-university-hospital", name: "Wakayama Medical University Hospital", aka: ["和歌山県立医科大学附属病院"], institutionType: "hospital", city: "Wakayama", country: "JP", lat: 34.226, lng: 135.167, website: "https://www.wakayama-med.ac.jp/english/hospital/index.html", university: "Wakayama Medical University",
    tldr: "The 800-bed teaching hospital of Wakayama Medical University, designated by the health ministry as Wakayama Prefecture's hub hospital for cancer care.",
    summary: `${hub("Wakayama")} Its English page gives 800 beds and a department list that includes pulmonary medicine and medical oncology, haematology, radiology and pathological diagnosis; telephone booking is for patients with a letter of referral. It stands at 811-1 Kimiidera, Wakayama.`,
    programs: ["Prefectural cancer care hub", "Pulmonary medicine and medical oncology"],
    links: [MHLW, { label: "Wakayama Medical University Hospital (English)", url: "https://www.wakayama-med.ac.jp/english/hospital/index.html" }] }),

  i({ id: "shimane-university-hospital", name: "Shimane University Hospital", aka: ["島根大学医学部附属病院"], institutionType: "hospital", city: "Izumo", country: "JP", lat: 35.367, lng: 132.755, website: "https://www.med.shimane-u.ac.jp/hospital/English/", university: "Shimane University",
    tldr: "Shimane University's teaching hospital in Izumo, which the health ministry designates as Shimane Prefecture's hub hospital for cancer care.",
    summary: `${hub("Shimane")} The hospital belongs to Shimane University's Faculty of Medicine and stands at 89-1 Enya-cho, Izumo. Its English pages cover first and return visits and hospital admission.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Shimane University Hospital (English)", url: "https://www.med.shimane-u.ac.jp/hospital/English/" }] }),

  i({ id: "okayama-university-hospital", name: "Okayama University Hospital", aka: ["国立大学法人岡山大学病院", "岡山大学病院"], institutionType: "hospital", city: "Okayama", country: "JP", lat: 34.655, lng: 133.919, website: "https://www.okayama-u.ac.jp/user/hospital/en/index.html", university: "Okayama University",
    tldr: "Okayama University's teaching hospital, Okayama Prefecture's designated hub hospital for cancer care and one of Japan's 13 cancer genomic medicine core hospitals.",
    summary: `${hub("Okayama")} ${CORE} Its Clinical Cancer Center runs outpatient chemotherapy for every cancer type with a team that includes doctors, pharmacists, nurses, palliative care, social workers, psychologists, dietitians and peer supporters, and the hospital also lists a Center for Comprehensive Genomic Medicine, a Head and Neck Cancer Center and a hospital-based cancer registry. It stands at 2-5-1 Shikata-cho, Kita-ku, Okayama.`,
    programs: ["Prefectural cancer care hub", "Cancer genomic medicine core hospital", "Clinical Cancer Center", "Center for Comprehensive Genomic Medicine", "Head and Neck Cancer Center"],
    links: [MHLW, { label: "Okayama University Hospital (English)", url: "https://www.okayama-u.ac.jp/user/hospital/en/index.html" }, { label: "Okayama University Hospital: Clinical Cancer Center", url: "https://www.okayama-u.ac.jp/user/hospital/en/index178.html" }],
    technologies: ["cgp"] }),

  i({ id: "hiroshima-university-hospital", name: "Hiroshima University Hospital", aka: ["国立大学法人広島大学 広島大学病院", "広島大学病院"], institutionType: "hospital", city: "Hiroshima", country: "JP", lat: 34.385, lng: 132.455, website: "https://www.hiroshima-u.ac.jp/en/hosp", university: "Hiroshima University",
    tldr: "Hiroshima University's teaching hospital, which the health ministry designates as Hiroshima Prefecture's hub hospital for cancer care.",
    summary: `${hub("Hiroshima")} Its English pages state that first-time patients need a referral letter from a local medical institution, through which appointments are made. Its news pages report new virtual-reality software to support children with cancer during treatment (April 2026). It stands at Kasumi 1-2-3, Minami-ku, Hiroshima.`,
    programs: ["Prefectural cancer care hub", "Paediatric cancer support"],
    links: [MHLW, { label: "Hiroshima University Hospital (English)", url: "https://www.hiroshima-u.ac.jp/en/hosp" }] }),

  i({ id: "yamaguchi-university-hospital", name: "Yamaguchi University Hospital", aka: ["山口大学医学部附属病院"], institutionType: "hospital", city: "Ube", country: "JP", lat: 33.952, lng: 131.247, website: "https://www.yamaguchi-u.ac.jp/hosp/en/", university: "Yamaguchi University",
    tldr: "Yamaguchi University's teaching hospital in Ube, which the health ministry designates as Yamaguchi Prefecture's hub hospital for cancer care.",
    summary: `${hub("Yamaguchi")} Its history records that the university hospital was transferred from Yamaguchi Prefectural Medical College in 1967 and approved as a hospital of special functions in 1994. Its English pages list an Oncology Center and departments of radiation oncology and therapeutic radiology.`,
    programs: ["Prefectural cancer care hub", "Oncology Center", "Radiation oncology"],
    links: [MHLW, { label: "Yamaguchi University Hospital (English)", url: "https://www.yamaguchi-u.ac.jp/hosp/en/" }, { label: "Yamaguchi University Hospital: history", url: "https://www.yamaguchi-u.ac.jp/hosp/en/introduction/history.html" }] }),

  i({ id: "kagawa-university-hospital", name: "Kagawa University Hospital", aka: ["香川大学医学部附属病院"], institutionType: "hospital", city: "Miki", country: "JP", lat: 34.268, lng: 134.135, website: "https://www.med.kagawa-u.ac.jp/hosp/english/index.html", university: "Kagawa University",
    tldr: "Kagawa University's teaching hospital in Miki, which the health ministry designates as Kagawa Prefecture's hub hospital for cancer care.",
    summary: `${hub("Kagawa")} Its English page gives its establishment as 1 April 1983, its opening as 20 October 1983 and 613 authorised beds. It stands at 1750-1 Ikenobe, Miki-cho, Kita-gun, Kagawa.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Kagawa University Hospital (English)", url: "https://www.med.kagawa-u.ac.jp/hosp/english/index.html" }] }),

  i({ id: "shikoku-cancer-center", name: "Shikoku Cancer Center", aka: ["National Hospital Organization Shikoku Cancer Center", "独立行政法人国立病院機構四国がんセンター", "四国がんセンター"], institutionType: "cancer-center", city: "Matsuyama", country: "JP", lat: 33.839, lng: 132.765, website: "https://shikoku-cc.hosp.go.jp/hospital/",
    tldr: "The National Hospital Organization's cancer centre for the Shikoku region, in Matsuyama, designated by the health ministry as Ehime Prefecture's hub hospital for cancer care.",
    summary: `${hub("Ehime")} Its site describes it as the centre for cancer in the Shikoku region, working with the national centre to provide advanced specialist care, clinical research, training and information, and as the centre of cancer genomic medicine cooperation in Shikoku; it lists itself as a cancer genomic medicine hub hospital (がんゲノム医療拠点病院). It runs a clinical research centre and a patient and family support centre. Its English page was marked as in preparation when read.`,
    programs: ["Prefectural cancer care hub", "Cancer genomic medicine hub hospital", "Clinical research centre", "Patient and family support centre", "AYA, employment and appearance support"],
    links: [MHLW, { label: "Shikoku Cancer Center (Japanese)", url: "https://shikoku-cc.hosp.go.jp/hospital/" }] }),

  i({ id: "kochi-medical-school-hospital", name: "Kochi Medical School Hospital", aka: ["高知大学医学部附属病院"], institutionType: "hospital", city: "Nankoku", country: "JP", lat: 33.575, lng: 133.641, website: "https://www.kochi-u.ac.jp/kms/en/facilities/hospital/", university: "Kochi University",
    tldr: "Kochi University's teaching hospital in Nankoku, which the health ministry designates as Kochi Prefecture's hub hospital for cancer care.",
    summary: `${hub("Kochi")} Its English page describes it as the only hospital in the prefecture specialising in medical education and research under the standards for establishing universities, functioning as an advanced treatment hospital, and reports that the first stage of its redevelopment, a newly built second ward, is complete. It stands at Kohasu, Oko-cho, Nankoku.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)"],
    links: [MHLW, { label: "Kochi Medical School Hospital (English)", url: "https://www.kochi-u.ac.jp/kms/en/facilities/hospital/" }] }),

  i({ id: "kyushu-cancer-center", name: "Kyushu Cancer Center", aka: ["独立行政法人国立病院機構九州がんセンター", "九州がんセンター"], institutionType: "cancer-center", city: "Fukuoka", country: "JP", lat: 33.59, lng: 130.402, website: "https://kyushu-cc.hosp.go.jp/",
    tldr: "The National Hospital Organization's cancer centre in Fukuoka, one of Fukuoka Prefecture's two hub hospitals for cancer care designated by the health ministry.",
    summary: `${hubOfTwo("Fukuoka")} The hospital belongs to the National Hospital Organization; its site lists cancer genomic medicine and clinical trials. It is in Minami-ku, Fukuoka.`,
    programs: ["Prefectural cancer care hub", "Cancer genomic medicine", "Clinical trials"],
    links: [MHLW, { label: "Kyushu Cancer Center (Japanese)", url: "https://kyushu-cc.hosp.go.jp/" }] }),

  i({ id: "saga-university-hospital", name: "Saga University Hospital", aka: ["佐賀大学医学部附属病院"], institutionType: "hospital", city: "Saga", country: "JP", lat: 33.249, lng: 130.299, website: "https://www.hospital.med.saga-u.ac.jp/", university: "Saga University",
    tldr: "Saga University's teaching hospital, which the health ministry designates as Saga Prefecture's hub hospital for cancer care.",
    summary: `${hub("Saga")} The hospital belongs to Saga University. Its site is in Japanese, with a clinical research centre; the English name used here is the one in its own copyright line.`,
    programs: ["Prefectural cancer care hub", "Clinical research centre"],
    links: [MHLW, { label: "Saga University Hospital (Japanese)", url: "https://www.hospital.med.saga-u.ac.jp/" }] }),

  i({ id: "nagasaki-university-hospital", name: "Nagasaki University Hospital", aka: ["長崎大学病院"], institutionType: "hospital", city: "Nagasaki", country: "JP", lat: 32.75, lng: 129.878, website: "https://www.mh.nagasaki-u.ac.jp/en/", university: "Nagasaki University",
    tldr: "Nagasaki University's teaching hospital, which the health ministry designates as Nagasaki Prefecture's hub hospital for cancer care.",
    summary: `${hub("Nagasaki")} Its stated aims include improving healthcare on the prefecture's islands and in its regions, and it runs an International Medical Center for patients from abroad.`,
    programs: ["Prefectural cancer care hub", "Island and regional healthcare", "International Medical Center"],
    links: [MHLW, { label: "Nagasaki University Hospital (English)", url: "https://www.mh.nagasaki-u.ac.jp/en/" }, { label: "About Nagasaki University Hospital", url: "https://www.mh.nagasaki-u.ac.jp/en/kouhou/about/about/index.html" }] }),

  i({ id: "kumamoto-university-hospital", name: "Kumamoto University Hospital", aka: ["熊本大学病院"], institutionType: "hospital", city: "Kumamoto", country: "JP", lat: 32.803, lng: 130.708, website: "https://www.kuh.kumamoto-u.ac.jp/", university: "Kumamoto University",
    tldr: "Kumamoto University's teaching hospital, which the health ministry designates as Kumamoto Prefecture's hub hospital for cancer care.",
    summary: `${hub("Kumamoto")} Its cancer centre takes in an outpatient chemotherapy centre, a cancer consultation and support centre, a cancer registry, a palliative care centre, a cancer genome centre and a support team for adolescents and young adults with cancer. Its site offers English through an automatic translation service.`,
    programs: ["Prefectural cancer care hub", "Outpatient chemotherapy centre", "Cancer genome centre", "Palliative care centre", "AYA cancer support team"],
    links: [MHLW, { label: "Kumamoto University Hospital: foreign language page", url: "https://www.kuh.kumamoto-u.ac.jp/foreign/" }] }),

  i({ id: "oita-university-hospital", name: "Oita University Hospital", aka: ["大分大学医学部附属病院"], institutionType: "hospital", city: "Yufu", country: "JP", lat: 33.18, lng: 131.427, website: "https://www.med.oita-u.ac.jp/hospital/en/index.html", university: "Oita University",
    tldr: "Oita University's teaching hospital in Yufu, which the health ministry designates as Oita Prefecture's hub hospital for cancer care.",
    summary: `${hub("Oita")} Its English page states that it was accredited as a General Hospital 3 and a Psychiatric Hospital by the Japan Health Care Evaluation Organization on 7 February 2020.`,
    programs: ["Prefectural cancer care hub"],
    links: [MHLW, { label: "Oita University Hospital (English)", url: "https://www.med.oita-u.ac.jp/hospital/en/index.html" }, { label: "Oita University Hospital: outline", url: "https://www.med.oita-u.ac.jp/hospital/en/policy.html" }] }),

  i({ id: "university-of-miyazaki-hospital", name: "University of Miyazaki Hospital", aka: ["宮崎大学医学部附属病院"], institutionType: "hospital", city: "Miyazaki", country: "JP", lat: 31.911, lng: 131.424, website: "https://www.med.miyazaki-u.ac.jp/home/hospital/english/", university: "University of Miyazaki",
    tldr: "The University of Miyazaki's 632-bed teaching hospital, designated by the health ministry as Miyazaki Prefecture's hub hospital for cancer care.",
    summary: `${hub("Miyazaki")} Its English history states that the hospital opened on 31 October 1977, that it has 632 beds in a seven-storey building, and that it was designated a hospital with specific facilities in 1994. Its departments include clinical oncology and a cancer centre.`,
    programs: ["Prefectural cancer care hub", "Clinical oncology", "Cancer centre"],
    links: [MHLW, { label: "University of Miyazaki Hospital: history", url: "https://www.med.miyazaki-u.ac.jp/home/hospital/english/history/" }] }),

  i({ id: "kagoshima-university-hospital", name: "Kagoshima University Hospital", aka: ["鹿児島大学病院"], institutionType: "hospital", city: "Kagoshima", country: "JP", lat: 31.597, lng: 130.557, website: "https://www.hosp.kagoshima-u.ac.jp/en/", university: "Kagoshima University",
    tldr: "Kagoshima University's teaching hospital, which the health ministry designates as Kagoshima Prefecture's hub hospital for cancer care.",
    summary: `${hub("Kagoshima")} Its site describes it as an advanced treatment hospital (特定機能病院) that serves as the last line of care for hard-to-treat disease in Kagoshima Prefecture. It stands at 8-35-1 Sakuragaoka, Kagoshima.`,
    programs: ["Prefectural cancer care hub", "Advanced treatment hospital (特定機能病院)"],
    links: [MHLW, { label: "Kagoshima University Hospital (English)", url: "https://www.hosp.kagoshima-u.ac.jp/en/" }] }),

  i({ id: "university-of-the-ryukyus-hospital", name: "University of the Ryukyus Hospital", aka: ["国立大学法人琉球大学 琉球大学病院", "琉球大学病院"], institutionType: "hospital", city: "Ginowan", country: "JP", lat: 26.282, lng: 127.778, website: "https://www.hosp.u-ryukyu.ac.jp/", university: "University of the Ryukyus",
    tldr: "The University of the Ryukyus' teaching hospital in Ginowan, which the health ministry designates as Okinawa Prefecture's hub hospital for cancer care.",
    summary: `${hub("Okinawa")} The hospital belongs to the University of the Ryukyus and is in Ginowan. Its site is in Japanese and names the hospital in English in its own page title.`,
    programs: ["Prefectural cancer care hub", "Clinical research support centre"],
    links: [MHLW, { label: "University of the Ryukyus Hospital (Japanese)", url: "https://www.hosp.u-ryukyu.ac.jp/" }] }),

  i({ id: "university-of-tokyo-hospital", name: "The University of Tokyo Hospital", aka: ["東京大学病院", "UTH"], institutionType: "hospital", city: "Tokyo", country: "JP", lat: 35.712, lng: 139.763, website: "https://www.h.u-tokyo.ac.jp/english/", university: "The University of Tokyo",
    tldr: "The University of Tokyo's teaching hospital, one of Japan's 13 cancer genomic medicine core hospitals.",
    summary: `${CORE} The hospital's English history traces it to the Kanda Otamaga-ike Vaccination Center, established in May 1858, and to the hospital of Tokyo Medical School built in Hongo in 1876. It runs an International Medical Center and a Center for International Preventive Medicine for patients from abroad.`,
    programs: ["Cancer genomic medicine core hospital", "International Medical Center"],
    links: [MHLW, { label: "The University of Tokyo Hospital (English)", url: "https://www.h.u-tokyo.ac.jp/english/" }, { label: "The University of Tokyo Hospital: history", url: "https://www.h.u-tokyo.ac.jp/english/about-us/history/" }],
    technologies: ["cgp"] }),

  i({ id: "nagoya-university-hospital", name: "Nagoya University Hospital", aka: ["名古屋大学医学部附属病院"], institutionType: "hospital", city: "Nagoya", country: "JP", lat: 35.155, lng: 136.92, website: "https://www.med.nagoya-u.ac.jp/hospital_en/", university: "Nagoya University",
    tldr: "Nagoya University's teaching hospital, one of Japan's 13 cancer genomic medicine core hospitals.",
    summary: `${CORE} Its English home page reports that it was re-accredited by Joint Commission International and offers a guide to advanced and high-level medical care. It stands at 65 Tsurumai-cho, Showa-ku, Nagoya.`,
    programs: ["Cancer genomic medicine core hospital", "JCI accreditation"],
    links: [MHLW, { label: "Nagoya University Hospital (English)", url: "https://www.med.nagoya-u.ac.jp/hospital_en/" }],
    technologies: ["cgp"] }),
];
