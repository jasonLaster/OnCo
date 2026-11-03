import { describe, expect, it } from "vitest";
import { parseA16z, parseArch, parseAtlas, parseEmaSponsor, parseFlagshipCompany, parseFlagshipGrid, parseHkexRows, parseKhosla, parseOopd, parseOrbimed, parseRaCapital, parseThirdRock, screen } from "./startup-monitors";
import { CompanyIndex, isOncologyText, tickerKeys } from "./lib/company-match";
import { parseRobots, robotsAllows } from "./lib/robots";

// Fixtures are trimmed copies of the real markup read on 3 November 2026, so a change of shape on a firm's page shows
// up as a failing parser here rather than as a silent zero in the weekly issue.

describe("portfolio parsers", () => {
  it("ARCH: company blocks with title, site and description", () => {
    const html = `<div class="company"><div class="co-title"> Boundless Bio </div><div class="co-content"><div class="co-logo"><a target="co" href="https://boundlessbio.com" title="Boundless Bio"><img alt="Boundless Bio" /></a></div><div class="co-desc"> Therapeutics based on ecDNA discoveries </div><div class="co-location"> San Diego, CA | NASDAQ: BOLD </div></div></div>
      <div class="company"><div class="co-title"> Carrick Therapeutics </div><div class="co-logo"><a target="co" href="http://www.carricktherapeutics.com"><img/></a></div><div class="co-desc"> Cancer therapeutics </div></div></main>`;
    const rows = parseArch(html);
    expect(rows.map((r) => r.name)).toEqual(["Boundless Bio", "Carrick Therapeutics"]);
    expect(rows[1]).toMatchObject({ website: "http://www.carricktherapeutics.com", description: "Cancer therapeutics" });
  });

  it("Third Rock: the Cancer focus tag decides, names come from slugs", () => {
    const html = `<select name="status" data-filter-property="status" class="js-filter-option"><option value="83">Private</option><option value="85">Acquired</option></select>
      <select name="category" data-filter-property="focus" class="js-filter-option"><option value="86">Autoimmune Disease</option><option value="87">Cancer</option></select>
      <div class="x js-portfolio-company"  data-slug="flare-therapeutics" data-location="156" data-status="83" data-focus="87,103" ></div>
      <div class="x js-portfolio-company"  data-slug="azalea-therapeutics" data-location="157" data-status="83" data-focus="86" ></div>`;
    const rows = parseThirdRock(html);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ name: "Flare Therapeutics", oncology: "stated", detail: "Private" });
    expect(rows[1].oncology).toBeUndefined();
  });

  it("a16z: embedded JSON objects", () => {
    const html = `x{"id":"24689","logo_width":"","title":"IDRx","socials":[],"web":"https:\\/\\/www.idrx.com\\/","stages":["M&A"],"overview":"Precision therapies, including a novel KIT inhibitor being developed for GIST"}{"id":"1","logo_width":"","title":"Carta","web":"https:\\/\\/carta.com","overview":"Equity management"}`;
    const rows = parseA16z(html);
    expect(rows[0]).toMatchObject({ name: "IDRx", website: "https://www.idrx.com/", detail: "M&A" });
    expect(rows).toHaveLength(2);
  });

  it("Khosla, OrbiMed, RA Capital and Atlas", () => {
    expect(parseKhosla(`<div class="card-container"><a style="x" href="https://radicalhealth.ai/" target="_blank" class="company-card-wrapper w-inline-block"><div class="fund-round-text">Seed</div><div class="company-card-title">AI Oncologist</div><div class="back-company-title">Radical Health</div><div class="back-text">AI-driven oncology platform.</div></a></div>`)[0])
      .toMatchObject({ name: "Radical Health", website: "https://radicalhealth.ai/", description: "AI Oncologist. AI-driven oncology platform.", detail: "Seed" });
    expect(parseOrbimed(`<div class="portfolio-modal" id="adcendo" style="display: none;"><h2>Adcendo</h2><div class="p-area"><p>First-in-class ADCs for the treatment of cancers.</p></div><div class="column-box"><h5>Sector</h5>\n<p>Biopharmaceutical</p></div><div class="social-link-modal"><a href="https://www.adcendo.com/" target="_blank"><img src="https://www.orbimed.com/x/icon-world.svg" alt="world"></a></div></div>`)[0])
      .toMatchObject({ name: "Adcendo", website: "https://www.adcendo.com/", detail: "Biopharmaceutical" });
    expect(parseRaCapital(`<article v-show="rowMatches(4)"><a href="https://www.racap.com/portfolio/acrivon" class="g"><h3 class="sr-only">Acrivon</h3><div class="relative">Acrivon is a&nbsp;clinical-stage oncology company.</div></a></article>`)[0])
      .toMatchObject({ name: "Acrivon", url: "https://www.racap.com/portfolio/acrivon", description: "Acrivon is a clinical-stage oncology company." });
    expect(parseAtlas(`<article class="company-tile"><div class="inner"><div class="title" style="display: none">Bicycle Therapeutics</div><div class="content"><div class="copy">Bicycle drug conjugates for cancer<br>NASDAQ: BCYC (2019)</div></div></div></article>`)[0])
      .toMatchObject({ name: "Bicycle Therapeutics", description: "Bicycle drug conjugates for cancer NASDAQ: BCYC (2019)" });
  });

  it("Flagship: grid names and the company page text", () => {
    const grid = parseFlagshipGrid(`<a href="https://www.flagshippioneering.com/companies/foghorn-therapeutics" class="companies__grid-link" title="Foghorn Therapeutics"><div class="company__grid-year">2016</div></a>`);
    expect(grid[0]).toMatchObject({ name: "Foghorn Therapeutics", date: "2016" });
    expect(parseFlagshipCompany(`<div class="company__promt"><span>What if…</span> cells lose control.</div><div class="company__body redactor "><p>The Company is developing multiple product candidates in oncology.</p></div>`)).toMatch(/oncology/);
  });
});

describe("filings, designations and lists", () => {
  it("HKEX: equities ending -B are the Chapter 18A biotechs", () => {
    const rows = parseHkexRows([{ A: "List of Securities" }, { A: "Stock Code", B: "Name of Securities", C: "Category" }, { A: "01167", B: "JACOBIO-B", C: "Equity", D: "Equity Securities (Main Board)" }, { A: "00001", B: "CKH HOLDINGS", C: "Equity" }]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ name: "JACOBIO", ticker: "1167.HK", oncology: "unknown" });
  });

  it("FDA OOPD export: header names, not positions", () => {
    const rows = parseOopd(`<table><tr><th> Generic Name </th><th>Date Designated</th><th>Orphan Designation</th><th>Sponsor Company</th><th>Sponsor Zip</th></tr><tr><td>cantrixil</td><td>11/01/2026</td><td>treatment of acute myeloid leukemia</td><td>Vivesto AB</td><td>' 17165 '</td></tr></table>`);
    expect(rows[0]).toMatchObject({ "Generic Name": "cantrixil", "Sponsor Company": "Vivesto AB", "Sponsor Zip": "17165" });
  });

  it("EMA designation page: the sponsor", () => {
    expect(parseEmaSponsor(`<dt>Date</dt><dd>23/06/2026</dd><div class="label">Sponsor</div><div class="field__item">Comac Medical Ltd</div><h2>EMA list of opinions on orphan medicinal product designation</h2>`)).toBe("Comac Medical Ltd");
  });
});

describe("matching and screening", () => {
  const index = new CompanyIndex([
    { id: "akeso", name: "Akeso", aka: [], website: "https://www.akesobio.com/", ticker: "9926.HK" },
    { id: "bicycle", name: "Bicycle Therapeutics", aka: [], website: "https://www.bicycletherapeutics.com" },
  ]);
  it("matches by name, stripped suffix, host and stock code", () => {
    expect(index.has("Akeso Biopharma, Inc.")).toBe(true);
    expect(index.has("Bicycle Therapeutics plc")).toBe(true);
    expect(index.has("Unrelated Name", { website: "https://ir.bicycletherapeutics.com/" })).toBe(true);
    expect(index.has("AKESO-B", { ticker: "9926.HK" })).toBe(true);
    expect(index.has("Selvana", { website: "https://selvana.bio/" })).toBe(false);
  });
  it("reads tickers written several ways", () => {
    expect(tickerKeys("HKEX: 09926")).toEqual(["HK:9926"]);
    expect(tickerKeys("NASDAQ: BCYC")).toEqual(["US:BCYC"]);
  });
  it("oncology words need word boundaries and capitals for acronyms", () => {
    expect(isOncologyText("Treatment of progressive multifocal leukoencephalopathy")).toBe(false);
    expect(isOncologyText("an analogue to digital adc for sensors")).toBe(false);
    expect(isOncologyText("Next-generation ADCs")).toBe(true);
    expect(isOncologyText("Treatment of soft tissue sarcoma")).toBe(true);
    expect(isOncologyText("treatment of neuroblastoma")).toBe(true);
  });
  it("screens: oncology and unmatched goes to missing, names-only rows to unscreened", () => {
    const r = screen([{ name: "Selvana", description: "cancer immunotherapy" }, { name: "Bicycle Therapeutics", description: "cancer" }, { name: "Some Bio", oncology: "unknown" }, { name: "Software Co", description: "payroll" }], index);
    expect(r.missing.map((x) => x.name)).toEqual(["Selvana"]);
    expect(r.oncology).toHaveLength(2);
    expect(r.unscreened.map((x) => x.name)).toEqual(["Some Bio"]);
  });
});

describe("robots.txt", () => {
  it("longest rule wins, Allow wins a tie, wildcards and the * group", () => {
    const rules = parseRobots("User-Agent: *\nDisallow: /companies?*\nAllow: /\n\nUser-Agent: facebookexternalhit\nAllow: /verify/*\n");
    expect(robotsAllows(rules, "/companies?industry=Healthcare")).toBe(false);
    expect(robotsAllows(rules, "/companies")).toBe(true);
    expect(robotsAllows(parseRobots("User-agent: *\nDisallow:\n"), "/portfolio/")).toBe(true);
    expect(robotsAllows(parseRobots("User-agent: OnCo\nDisallow: /\n\nUser-agent: *\nAllow: /\n"), "/x")).toBe(false);
  });
});
