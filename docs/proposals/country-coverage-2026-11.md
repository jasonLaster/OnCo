# Country coverage, November 2026: which countries have a page, and which should come next

Status: **analysis, 4 November 2026.** Written to choose wave 3 of the country deep dives. Wave 3 builds the first ten
countries of the missing list below; the other fifty are the queue.

## How the ranking was made

Every country in IARC's GLOBOCAN 2024 file (`public/globocan/countries.json`, 182 countries that map to a World Bank
ISO code; French Guiana, Guadeloupe, Martinique and La Réunion are reported separately by IARC and have no World Bank
row) was ranked on four measures, and the four ranks were averaged:

- **New cases**, all cancers (code 39, C00-97, which includes non-melanoma skin cancer), GLOBOCAN 2024.
- **Deaths**, all cancers, GLOBOCAN 2024.
- **Research output**: oncology works in 2025 from `public/openalex/countries.json` (OpenAlex, primary topic subfield
  2730, whole counting, built 8 September 2026).
- **Population**: World Bank `SP.POP.TOTL`, 2024, read from the World Bank API on 4 November 2026.

Equal weights are a choice, not a finding: they put burden (two measures) ahead of research and population (one
each), which is the right order for a site whose readers are patients. Two other columns describe what OnCo already
holds rather than feed the rank, because ranking a country by what our corpus holds would mistake a gap in our
reading for a gap in the country (the lesson of wave 1, `docs/CONTENT-ROADMAP.md` section 6):

- **CT.gov studies**: ClinicalTrials.gov studies with at least one site in the country, all conditions, from the same
  OpenAlex file (`trials`).
- **Corpus trials**: OnCo trial records whose ClinicalTrials.gov participation snapshot lists a site in the country.
- **Institutions / companies**: OnCo records with that `country`.
- **country-extras row**: whether `src/data/country-extras.ts` carries a row for the research ranking.

The "why it matters" column is generated from the same numbers, so it says nothing the table does not. Where a
country's estimated deaths are 60% or more of its new cases it says so: a high mortality-to-incidence ratio is a
common proxy for late diagnosis and limited access to treatment, not a measurement of either.

## The 18 countries with a page

All 18 sit inside the composite top 62. Israel (62nd) and Switzerland (49th) are there for research and for what they
do differently, not for burden.

| Composite rank | Country | ISO | New cases 2024 | Deaths 2024 | Works 2025 | Corpus trials | Institutions / companies |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | China | CN | 5,150,572 | 2,582,164 | 17,535 | 2,454 | 33 / 170 |
| 2 | United States of America | US | 2,462,729 | 632,166 | 23,279 | 2,879 | 151 / 927 |
| 3 | India | IN | 1,562,581 | 901,828 | 5,149 | 212 | 27 / 22 |
| 4 | Japan | JP | 1,066,842 | 455,037 | 4,604 | 925 | 17 / 42 |
| 5 | Brazil | BR | 640,575 | 286,654 | 1,672 | 703 | 13 / 2 |
| 6 | Russian Federation | RU | 633,830 | 307,941 | 1,094 | 398 | 7 / 2 |
| 7 | Germany | DE | 566,587 | 256,954 | 4,230 | 1,227 | 34 / 61 |
| 8 | United Kingdom | GB | 458,379 | 183,607 | 5,201 | 1,278 | 100 / 86 |
| 10 | Italy | IT | 429,695 | 182,212 | 3,890 | 1,343 | 32 / 15 |
| 11 | France (metropolitan) | FR | 421,655 | 182,173 | 3,121 | 1,478 | 37 / 58 |
| 14 | Spain | ES | 271,898 | 115,696 | 2,955 | 1,553 | 28 / 16 |
| 15 | Korea, Republic of | KR | 250,247 | 101,333 | 2,095 | 1,142 | 10 / 39 |
| 18 | Canada | CA | 301,741 | 91,998 | 2,497 | 1,227 | 29 / 27 |
| 25 | Australia | AU | 224,864 | 54,551 | 2,216 | 1,214 | 20 / 22 |
| 32 | The Netherlands | NL | 131,204 | 51,051 | 1,913 | 753 | 18 / 27 |
| 44 | Sweden | SE | 68,934 | 24,410 | 954 | 406 | 14 / 22 |
| 49 | Switzerland | CH | 56,828 | 19,408 | 1,469 | 386 | 16 / 40 |
| 62 | Israel | IL | 30,468 | 12,657 | 685 | 607 | 14 / 24 |

## The 60 highest-ranked countries without a page

| Rank | Country | ISO | New cases 2024 | Deaths 2024 | Incidence ASR | Mortality ASR | Population 2024 (m) | OpenAlex oncology works 2025 | CT.gov studies, all conditions | Corpus trials with a site | Institutions / companies | country-extras row | Why it matters |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| 1 | Indonesia | ID | 474,083 | 283,299 | 151.2 | 90.56 | 283.5 | 782 | 1,713 | 2 | 1 / 0 | no | 8th by new cases and 7th by deaths; 4th by population. |
| 2 | Pakistan | PK | 190,308 | 119,742 | 106.82 | 69.39 | 251.3 | 1,023 | 6,058 | 1 | 2 / 0 | no | 19th by new cases and 13th by deaths; 5th by population; estimated deaths are 63% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 3 | Türkiye | TR | 235,949 | 113,805 | 205.99 | 95.11 | 85.5 | 2,209 | 26,123 | 568 | 4 / 0 | yes | 15th by new cases and 17th by deaths; 12th by oncology papers (2025). |
| 4 | Bangladesh | BD | 187,263 | 138,906 | 117.51 | 88.08 | 173.6 | 469 | 823 | 0 | 1 / 0 | no | 20th by new cases and 12th by deaths; 8th by population; estimated deaths are 74% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there. |
| 5 | Iran, Islamic Republic of | IR | 156,467 | 97,732 | 146.88 | 92.19 | 91.6 | 1,225 | 1,463 | 2 | 1 / 0 | yes | 23rd by new cases and 20th by deaths; 17th by population; estimated deaths are 62% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 6 | Mexico | MX | 201,137 | 96,264 | 136.38 | 62.73 | 130.9 | 527 | 7,890 | 368 | 4 / 1 | yes | 18th by new cases and 21st by deaths; 11th by population. |
| 7 | Egypt | EG | 137,390 | 80,512 | 137.57 | 82.35 | 116.5 | 893 | 17,478 | 24 | 2 / 0 | yes | 28th by new cases and 26th by deaths; 13th by population. |
| 8 | Poland | PL | 202,797 | 114,190 | 255.75 | 123.93 | 36.6 | 1,089 | 11,608 | 905 | 7 / 5 | yes | 17th by new cases and 16th by deaths. |
| 9 | Nigeria | NG | 152,261 | 90,795 | 113.72 | 71.28 | 232.7 | 356 | 459 | 4 | 2 / 0 | no | 25th by new cases and 23rd by deaths; 6th by population. |
| 10 | Thailand | TH | 176,951 | 116,234 | 141.75 | 89.55 | 71.7 | 383 | 4,324 | 237 | 3 / 1 | no | 22nd by new cases and 14th by deaths; estimated deaths are 66% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 11 | Viet Nam | VN | 177,404 | 111,015 | 142.4 | 88.51 | 101.0 | 233 | 1,304 | 70 | 2 / 1 | no | 21st by new cases and 18th by deaths; 16th by population; estimated deaths are 63% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 12 | Philippines | PH | 149,852 | 86,338 | 149.69 | 88.5 | 115.8 | 165 | 1,353 | 69 | 1 / 0 | no | 26th by new cases and 24th by deaths; 14th by population. |
| 13 | Ethiopia | ET | 79,239 | 46,841 | 94.64 | 59.36 | 132.1 | 327 | 364 | 0 | 1 / 0 | no | 34th by new cases and 35th by deaths; 10th by population; no trial in the corpus lists a site there. |
| 14 | South Africa | ZA | 101,598 | 55,356 | 161.5 | 87.91 | 64.0 | 436 | 3,864 | 155 | 6 / 1 | no | 31st by new cases and 29th by deaths; 24th by population. |
| 15 | Colombia | CO | 123,053 | 55,981 | 180.75 | 78.89 | 52.9 | 283 | 2,308 | 147 | 2 / 0 | no | 30th by new cases and 28th by deaths. |
| 16 | Argentina | AR | 139,470 | 71,570 | 215.49 | 99.66 | 45.7 | 286 | 4,776 | 446 | 4 / 0 | no | 27th by new cases and 27th by deaths. |
| 17 | Ukraine | UA | 153,699 | 82,596 | 218.32 | 108.41 | 37.9 | 262 | 2,715 | 172 | 2 / 0 | no | 24th by new cases and 25th by deaths. |
| 18 | Romania | RO | 98,829 | 53,326 | 265.63 | 127.97 | 19.1 | 475 | 3,681 | 326 | 2 / 0 | no | 32nd by new cases and 32nd by deaths. |
| 19 | Malaysia | MY | 54,586 | 32,830 | 140.85 | 85.45 | 35.6 | 499 | 2,618 | 171 | 1 / 1 | no | 48th by new cases and 40th by deaths; 36th by oncology papers (2025); estimated deaths are 60% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 20 | Algeria | DZ | 72,825 | 37,135 | 153.32 | 79.38 | 46.8 | 109 | 0 | 0 | 1 / 0 | no | 37th by new cases and 37th by deaths; 33rd by population; no trial in the corpus lists a site there. |
| 21 | Belgium | BE | 80,019 | 28,692 | 313.98 | 86.48 | 11.9 | 1,353 | 15,198 | 916 | 13 / 13 | yes | 33rd by new cases and 46th by deaths; 17th by oncology papers (2025). |
| 22 | Morocco | MA | 47,944 | 26,459 | 112.92 | 62.16 | 38.1 | 330 | 178 | 1 | 1 / 0 | no | 50th by new cases and 49th by deaths; 39th by population. |
| 23 | Iraq | IQ | 34,279 | 19,963 | 111.46 | 68.8 | 46.0 | 521 | 507 | 0 | 0 / 0 | no | 61st by new cases and 57th by deaths; 34th by oncology papers (2025); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 24 | Peru | PE | 77,485 | 36,956 | 186.57 | 84.17 | 34.2 | 129 | 0 | 144 | 2 / 0 | no | 35th by new cases and 38th by deaths. |
| 25 | Myanmar | MM | 74,903 | 53,412 | 125.73 | 90.08 | 54.5 | 38 | 0 | 0 | 0 / 0 | no | 36th by new cases and 31st by deaths; 27th by population; estimated deaths are 71% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 26 | Chile | CL | 59,887 | 31,498 | 161.94 | 83.33 | 19.8 | 308 | 2,849 | 314 | 2 / 0 | no | 46th by new cases and 42nd by deaths. |
| 27 | Portugal | PT | 69,439 | 33,590 | 293.22 | 106.26 | 10.7 | 566 | 3,980 | 316 | 4 / 1 | yes | 40th by new cases and 39th by deaths; 32nd by oncology papers (2025). |
| 28 | Greece | GR | 63,549 | 31,965 | 273.38 | 99.58 | 10.4 | 645 | 5,304 | 443 | 4 / 1 | yes | 44th by new cases and 41st by deaths; 28th by oncology papers (2025). |
| 29 | Kenya | KE | 35,867 | 22,888 | 111.03 | 74.58 | 56.4 | 98 | 0 | 8 | 3 / 0 | no | 60th by new cases and 52nd by deaths; 26th by population; estimated deaths are 64% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 30 | Czechia | CZ | 65,308 | 28,845 | 281.92 | 101.81 | 10.9 | 453 | 7,039 | 516 | 4 / 3 | no | 43rd by new cases and 45th by deaths; 39th by oncology papers (2025). |
| 31 | Sudan | SD | 41,022 | 25,766 | 132.48 | 87.23 | 50.4 | 81 | 0 | 0 | 0 / 0 | no | 55th by new cases and 50th by deaths; 30th by population; estimated deaths are 63% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 32 | Congo, Democratic Republic of | CD | 69,739 | 44,261 | 116.34 | 77.01 | 109.3 | 10 | 0 | 0 | 0 / 0 | no | 39th by new cases and 36th by deaths; 15th by population; estimated deaths are 63% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 33 | Hungary | HU | 66,090 | 31,415 | 332.9 | 134.54 | 9.6 | 438 | 5,872 | 477 | 2 / 3 | no | 42nd by new cases and 43rd by deaths; 40th by oncology papers (2025). |
| 34 | Austria | AT | 46,684 | 22,559 | 237.35 | 85.84 | 9.2 | 628 | 7,754 | 482 | 4 / 5 | yes | 51st by new cases and 54th by deaths; 29th by oncology papers (2025). |
| 35 | Tanzania, United Republic of | TZ | 29,044 | 18,661 | 77.9 | 52.82 | 68.6 | 79 | 0 | 0 | 2 / 0 | no | 69th by new cases and 60th by deaths; 22nd by population; estimated deaths are 64% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there. |
| 36 | Uzbekistan | UZ | 38,465 | 22,509 | 112.47 | 66.92 | 36.4 | 82 | 0 | 0 | 0 / 0 | no | 57th by new cases and 55th by deaths; no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 37 | Saudi Arabia | SA | 24,624 | 10,357 | 95.83 | 44.68 | 35.3 | 957 | 1,744 | 31 | 1 / 0 | yes | 79th by new cases and 88th by deaths; 22nd by oncology papers (2025). |
| 38 | Uganda | UG | 29,966 | 18,205 | 123.91 | 81.4 | 50.0 | 90 | 0 | 7 | 1 / 0 | no | 67th by new cases and 61st by deaths; 31st by population; estimated deaths are 61% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 39 | Venezuela | VE | 61,657 | 30,883 | 174.03 | 84.54 | 28.4 | 30 | 0 | 1 | 0 / 0 | no | 45th by new cases and 44th by deaths; the corpus holds no institution or company there. |
| 40 | Sri Lanka | LK | 43,428 | 27,165 | 133.84 | 81.85 | 21.9 | 59 | 0 | 0 | 0 / 0 | no | 54th by new cases and 48th by deaths; estimated deaths are 63% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 41 | Ghana | GH | 27,260 | 17,662 | 113.57 | 75.77 | 34.4 | 115 | 0 | 2 | 2 / 1 | no | 73rd by new cases and 63rd by deaths; estimated deaths are 65% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 42 | Denmark | DK | 46,512 | 17,720 | 345.07 | 99.89 | 6.0 | 797 | 12,732 | 422 | 7 / 17 | yes | 52nd by new cases and 62nd by deaths; 25th by oncology papers (2025). |
| 43 | Nepal | NP | 24,499 | 17,213 | 90.13 | 64.07 | 29.7 | 140 | 0 | 0 | 0 / 0 | no | 80th by new cases and 64th by deaths; estimated deaths are 70% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 44 | Kazakhstan | KZ | 29,851 | 16,355 | 125.42 | 68.11 | 20.6 | 135 | 0 | 2 | 0 / 0 | no | 68th by new cases and 67th by deaths; the corpus holds no institution or company there. |
| 45 | Ecuador | EC | 31,204 | 15,711 | 145.14 | 72.28 | 18.1 | 108 | 0 | 1 | 0 / 0 | no | 64th by new cases and 70th by deaths; the corpus holds no institution or company there. |
| 46 | Cuba | CU | 49,702 | 28,127 | 215.41 | 112.89 | 11.0 | 39 | 0 | 0 | 1 / 1 | no | 49th by new cases and 47th by deaths; no trial in the corpus lists a site there. |
| 47 | Yemen | YE | 24,836 | 14,495 | 111.58 | 71.37 | 40.6 | 63 | 0 | 0 | 0 / 0 | no | 78th by new cases and 74th by deaths; 38th by population; no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 48 | Belarus | BY | 46,420 | 22,838 | 275.25 | 124.39 | 9.1 | 103 | 0 | 23 | 0 / 0 | no | 53rd by new cases and 53rd by deaths; the corpus holds no institution or company there. |
| 49 | Serbia | RS | 37,741 | 21,481 | 266.5 | 128.24 | 6.6 | 199 | 1,890 | 75 | 1 / 0 | no | 58th by new cases and 56th by deaths. |
| 50 | Syrian Arab Republic | SY | 27,280 | 16,455 | 142.56 | 88.42 | 24.7 | 44 | 0 | 0 | 0 / 0 | no | 72nd by new cases and 65th by deaths; estimated deaths are 60% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 51 | Afghanistan | AF | 26,268 | 15,848 | 118.96 | 78.43 | 42.6 | 27 | 0 | 0 | 0 / 0 | no | 75th by new cases and 69th by deaths; 36th by population; estimated deaths are 60% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 52 | Bulgaria | BG | 31,876 | 19,354 | 219.91 | 117.07 | 6.4 | 158 | 0 | 166 | 2 / 0 | no | 62nd by new cases and 59th by deaths; estimated deaths are 61% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment). |
| 53 | Norway | NO | 39,345 | 12,472 | 334.61 | 86.4 | 5.6 | 520 | 5,761 | 238 | 3 / 5 | yes | 56th by new cases and 81st by deaths; 35th by oncology papers (2025). |
| 54 | Finland | FI | 36,289 | 13,674 | 258.88 | 77.87 | 5.6 | 395 | 4,351 | 213 | 7 / 6 | no | 59th by new cases and 76th by deaths. |
| 55 | Korea, Democratic People's Republic of | KP | 70,520 | 51,108 | 171.5 | 120.24 | 26.5 | 2 | 0 | 0 | 0 / 0 | no | 38th by new cases and 33rd by deaths; estimated deaths are 72% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 56 | Cambodia | KH | 22,111 | 14,945 | 135.54 | 93.07 | 17.6 | 114 | 0 | 0 | 0 / 0 | no | 82nd by new cases and 72nd by deaths; estimated deaths are 68% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 57 | Ireland | IE | 30,752 | 10,914 | 316.98 | 92.55 | 5.4 | 580 | 3,141 | 243 | 10 / 7 | no | 65th by new cases and 86th by deaths; 30th by oncology papers (2025). |
| 58 | Zimbabwe | ZW | 25,125 | 16,378 | 266.3 | 181.57 | 16.6 | 34 | 0 | 1 | 0 / 0 | no | 76th by new cases and 66th by deaths; estimated deaths are 65% of new cases, a high mortality-to-incidence ratio (a common proxy for late diagnosis and limited access to treatment); the corpus holds no institution or company there. |
| 59 | Angola | AO | 27,511 | 16,190 | 120.84 | 76.3 | 37.9 | 7 | 0 | 0 | 0 / 0 | no | 71st by new cases and 68th by deaths; 40th by population; no trial in the corpus lists a site there; the corpus holds no institution or company there. |
| 60 | Tunisia | TN | 16,332 | 9,059 | 105.74 | 57.95 | 12.3 | 209 | 655 | 4 | 1 / 0 | no | 95th by new cases and 94th by deaths. |

## What the list says

- **The top of the missing list is burden, not research.** Indonesia (8th by new cases and 7th by deaths in the
  world), Pakistan, Bangladesh, Nigeria and Ethiopia are among the ten most populous countries and have no page.
  Bangladesh, Iran, Pakistan, Thailand and Viet Nam all have estimated deaths above 60% of new cases.
- **Our trial data is thinnest where the burden is.** Bangladesh, Ethiopia, Algeria, Iraq, Myanmar, Sudan, the
  Democratic Republic of the Congo and several others have no trial record in the corpus with a site there.
  ClinicalTrials.gov is not where those countries register most studies (Iran uses IRCT, for example), so the column
  understates their research as well as ours.
- **Research-heavy countries without a page** sit lower on the composite: by oncology works in 2025 alone, the
  missing list is led by Türkiye (2,209), Belgium (1,353), Iran (1,225), Poland (1,089), Pakistan (1,023), Saudi
  Arabia (957), Egypt (893), Denmark (797), Indonesia (782) and Greece (645).
- **Taiwan and Hong Kong are not in GLOBOCAN** as separate populations, so they cannot enter this ranking.
  OpenAlex counts 912 oncology works from Taiwan in 2025 and 662 from Hong Kong, and OnCo holds 812 trial records
  with a site in Taiwan, more than in Brazil. A Taiwan page would have to take its burden figures from the Taiwan
  Cancer Registry, which uses its own standard population (see the comment on the `TW` row in
  `src/data/country-extras.ts`).
- **Singapore** ranks 82nd on the composite (576 works in 2025, 296 corpus trials) and is a candidate for a page on
  what it does differently rather than on burden.

## Wave 3

Built on 4 November 2026 for the first ten rows of the missing list: Indonesia, Pakistan, Türkiye, Bangladesh, Iran,
Mexico, Egypt, Poland, Nigeria and Thailand, each at `/countries/<iso2>/` from `src/data/country-<iso2>.ts`. The
next ten in order are Viet Nam, the Philippines, Ethiopia, South Africa, Colombia, Argentina, Ukraine, Romania,
Malaysia and Algeria.

## Reproduce

The ranking was computed from the three files named above and the World Bank API response
(`https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=2024&format=json&per_page=400`); corpus counts
came from `graph()` in `src/lib/graph.ts` on the same day. Re-running it after a corpus change will move the last two
columns but not the rank.
