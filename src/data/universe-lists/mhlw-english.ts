/**
 * English names and websites for the hospitals on the Japanese Ministry of Health, Labour and Welfare cancer hospital
 * lists (src/data/universe-lists/mhlw-cancer-hospitals.json), keyed by the ministry's Japanese name exactly as the
 * list prints it. Each English name is the one the hospital uses on its own English-language pages, checked by hand;
 * a hospital missing here is listed under its Japanese name only.
 *
 * Read on 4 November 2026. Where a hospital has no English-language section, the English name is the one its own site
 * prints in a title, logo or copyright line (Aomori, Yamagata, Ibaraki, Tochigi, Komagome, Kanagawa, Niigata, Toyama,
 * Shinshu, Shiga, Hyogo, Nara, Shikoku, Kyushu Cancer Center, Saga, Kumamoto, Ryukyus), in its own clinical-trial site
 * form (Yamanashi), or on the English page of its research institute (Chiba Cancer Center Research Institute).
 * Left out: NHO Hokkaido Cancer Center, Iwate Medical University Hospital, Miyagi Cancer Center, Gunma University
 * Hospital and Saitama Cancer Center (no English name found on their own sites); Osaka International Cancer Institute
 * (oici.jp/en/ returned 403); Tottori University Hospital (connection timed out); Tokushima University Hospital (403 to
 * every request).
 */
export const MHLW_ENGLISH: Record<string, { name: string; website?: string }> = {
  "青森県立中央病院": { name: "Aomori Prefectural Central Hospital", website: "https://aomori-kenbyo.jp/" },
  "東北大学病院": { name: "Tohoku University Hospital", website: "https://www.hosp.tohoku.ac.jp/" },
  "秋田大学医学部附属病院": { name: "Akita University Hospital", website: "https://www.hos.akita-u.ac.jp/en/index.html" },
  "山形県立中央病院": { name: "Yamagata Prefectural Central Hospital", website: "https://www.ypch.gr.jp/" },
  "公立大学法人福島県立医科大学附属病院": { name: "Fukushima Medical University Hospital", website: "https://www.fmu.ac.jp/en/medical_care/hospital.html" },
  "茨城県立中央病院": { name: "Ibaraki Prefectural Central Hospital", website: "https://www.hospital.pref.ibaraki.jp/chuo/" },
  "栃木県立がんセンター": { name: "Tochigi Cancer Center", website: "https://www.tochigi-cc.jp/" },
  "千葉県がんセンター": { name: "Chiba Cancer Center", website: "https://www.pref.chiba.lg.jp/gan/" },
  "公益財団法人がん研究会 有明病院": { name: "Cancer Institute Hospital of JFCR", website: "https://www.jfcr.or.jp/english/" },
  "地方独立行政法人東京都立病院機構東京都立駒込病院": { name: "Tokyo Metropolitan Cancer and Infectious Diseases Center Komagome Hospital", website: "https://www.tmhp.jp/komagome/" },
  "地方独立行政法人神奈川県立病院機構神奈川県立がんセンター": { name: "Kanagawa Cancer Center", website: "https://kcch.kanagawa-pho.jp/" },
  "新潟県立がんセンター新潟病院": { name: "Niigata Cancer Center Hospital", website: "https://www.niigata-cc.jp/" },
  "富山県立中央病院": { name: "Toyama Prefectural Central Hospital", website: "https://www.tch.pref.toyama.jp/" },
  "金沢大学附属病院": { name: "Kanazawa University Hospital", website: "https://web.hosp.kanazawa-u.ac.jp/en/" },
  "福井県立病院": { name: "Fukui Prefectural Hospital", website: "https://fph.pref.fukui.lg.jp/lang/english/" },
  "地方独立行政法人山梨県立病院機構山梨県立中央病院": { name: "Yamanashi Prefectural Central Hospital", website: "https://www.ych.pref.yamanashi.jp/" },
  "信州大学医学部附属病院": { name: "Shinshu University Hospital", website: "https://wwwhp.md.shinshu-u.ac.jp/" },
  "岐阜大学医学部附属病院": { name: "Gifu University Hospital", website: "https://www.hosp.gifu-u.ac.jp/eng/index.html" },
  "静岡県立静岡がんセンター": { name: "Shizuoka Cancer Center", website: "https://www.scchr.jp/en/" },
  "愛知県がんセンター": { name: "Aichi Cancer Center", website: "https://cancer-c.pref.aichi.jp/" },
  "国立大学法人三重大学医学部附属病院": { name: "Mie University Hospital", website: "https://www.hosp.mie-u.ac.jp/english/" },
  "滋賀県立総合病院": { name: "Shiga General Hospital", website: "https://www.pref.shiga.lg.jp/kensou/" },
  "京都大学医学部附属病院": { name: "Kyoto University Hospital", website: "https://www.kuhp.kyoto-u.ac.jp/english/" },
  "京都府立医科大学附属病院": { name: "University Hospital, Kyoto Prefectural University of Medicine", website: "https://www.h.kpu-m.ac.jp/en/" },
  "兵庫県立がんセンター": { name: "Hyogo Cancer Center", website: "https://hyogo-cc.jp/" },
  "奈良県立医科大学附属病院": { name: "Nara Medical University Hospital", website: "https://hospital.naramed-u.ac.jp/" },
  "和歌山県立医科大学附属病院": { name: "Wakayama Medical University Hospital", website: "https://www.wakayama-med.ac.jp/english/hospital/index.html" },
  "島根大学医学部附属病院": { name: "Shimane University Hospital", website: "https://www.med.shimane-u.ac.jp/hospital/English/" },
  "国立大学法人岡山大学病院": { name: "Okayama University Hospital", website: "https://www.okayama-u.ac.jp/user/hospital/en/index.html" },
  "国立大学法人広島大学 広島大学病院": { name: "Hiroshima University Hospital", website: "https://www.hiroshima-u.ac.jp/en/hosp" },
  "山口大学医学部附属病院": { name: "Yamaguchi University Hospital", website: "https://www.yamaguchi-u.ac.jp/hosp/en/" },
  "香川大学医学部附属病院": { name: "Kagawa University Hospital", website: "https://www.med.kagawa-u.ac.jp/hosp/english/index.html" },
  "独立行政法人国立病院機構四国がんセンター": { name: "Shikoku Cancer Center", website: "https://shikoku-cc.hosp.go.jp/hospital/" },
  "高知大学医学部附属病院": { name: "Kochi Medical School Hospital", website: "https://www.kochi-u.ac.jp/kms/en/facilities/hospital/" },
  "九州大学病院": { name: "Kyushu University Hospital", website: "https://www.hosp.kyushu-u.ac.jp/" },
  "独立行政法人国立病院機構九州がんセンター": { name: "Kyushu Cancer Center", website: "https://kyushu-cc.hosp.go.jp/" },
  "佐賀大学医学部附属病院": { name: "Saga University Hospital", website: "https://www.hospital.med.saga-u.ac.jp/" },
  "長崎大学病院": { name: "Nagasaki University Hospital", website: "https://www.mh.nagasaki-u.ac.jp/en/" },
  "熊本大学病院": { name: "Kumamoto University Hospital", website: "https://www.kuh.kumamoto-u.ac.jp/" },
  "大分大学医学部附属病院": { name: "Oita University Hospital", website: "https://www.med.oita-u.ac.jp/hospital/en/index.html" },
  "宮崎大学医学部附属病院": { name: "University of Miyazaki Hospital", website: "https://www.med.miyazaki-u.ac.jp/home/hospital/english/" },
  "鹿児島大学病院": { name: "Kagoshima University Hospital", website: "https://www.hosp.kagoshima-u.ac.jp/en/" },
  "国立大学法人琉球大学 琉球大学病院": { name: "University of the Ryukyus Hospital", website: "https://www.hosp.u-ryukyu.ac.jp/" },
  "北海道大学病院": { name: "Hokkaido University Hospital", website: "https://www.huhp.hokudai.ac.jp/" },
  "国立がん研究センター東病院": { name: "National Cancer Center Hospital East", website: "https://www.ncc.go.jp/en/ncce/" },
  "慶應義塾大学病院": { name: "Keio University Hospital", website: "https://www.hosp.keio.ac.jp/en/" },
  "国立がん研究センター中央病院": { name: "National Cancer Center Hospital", website: "https://www.ncc.go.jp/en/" },
  "東京大学病院": { name: "The University of Tokyo Hospital", website: "https://www.h.u-tokyo.ac.jp/english/" },
  "がん研究会 有明病院": { name: "Cancer Institute Hospital of JFCR", website: "https://www.jfcr.or.jp/english/" },
  "名古屋大学医学部附属病院": { name: "Nagoya University Hospital", website: "https://www.med.nagoya-u.ac.jp/hospital_en/" },
  "大阪大学医学部附属病院": { name: "The University of Osaka Hospital", website: "https://www.hosp.med.osaka-u.ac.jp/english/" },
  "岡山大学病院": { name: "Okayama University Hospital", website: "https://www.okayama-u.ac.jp/user/hospital/en/index.html" },
};
