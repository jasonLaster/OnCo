import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { graph, outgoing, type Graph } from "../src/lib/graph";
import { EntitySchema, type Entity, type EntityInput, type Kind } from "../src/lib/schema";
import { resolveSponsor } from "../src/data/sponsor-aliases";
import { audit, companyFindings, drugCancerFindings, FLOOR_FILE, floorCounts, makeCtx, midWordInputs, nameFindings, roleFindings, targetFindings, timeFindings } from "./link-sense-audit";

/**
 * Link-sense guards (docs/proposals/link-sense-strategies.md). A link can resolve and still say something false: a
 * cancer medicine filed among the tests that measure a readout, a prostate vaccine on the myeloma page, a regex
 * fragment that fires inside a longer word. Each class has a detector in scripts/link-sense-audit.ts, a fixture below
 * that reproduces a real past error, and a ratchet: the count per class cannot grow past src/data/link-sense-floor.json.
 * A rule absent from the floor has a floor of zero.
 */

const base = { asOf: "2026-11-03", tldr: "A plain sentence for a general reader that is long enough.", summary: "A technical summary." };
const mk = (x: Record<string, unknown>) => EntitySchema.parse({ ...base, ...x } as EntityInput);

/** The parts of Graph the detectors read, over a handful of records. */
function fakeGraph(es: Entity[]): Graph {
  const byId = new Map(es.map((e) => [e.id, e]));
  const back = new Map<string, Entity[]>();
  for (const e of es) for (const [to] of outgoing(e)) if (to !== e.id) back.set(to, [...(back.get(to) ?? []), e]);
  return {
    entities: es, byId,
    get: (id: string) => byId.get(id),
    kind: (k: Kind) => es.filter((e) => e.kind === k),
    incoming: (id: string) => {
      const out = new Map<Kind, Entity[]>();
      for (const e of new Set(back.get(id) ?? [])) out.set(e.kind, [...(out.get(e.kind) ?? []), e]);
      return out;
    },
  } as unknown as Graph;
}

describe("link-sense detectors reproduce the errors that prompted them", () => {
  it("a fragment that starts mid-word: `imid` inside fluoropyrimidine", () => {
    const site = { file: "x.ts", line: 1, source: "protac|degrader|imid", flags: "" };
    expect(midWordInputs(site, ["fluoropyrimidine plus alkylating agent", "lenalidomide (imid)"])).toEqual(["fluoropyrimidine plus alkylating agent"]);
    expect(midWordInputs({ ...site, source: "\\bimid" }, ["fluoropyrimidine"])).toEqual([]);
  });

  it("a namesake: the lymphoma group linked to the ovarian PRIMA trial rather than the follicular one", () => {
    const es = [
      mk({ kind: "cancer", id: "ovarian", name: "Ovarian cancer", group: "gynae" }),
      mk({ kind: "cancer", id: "follicular-lymphoma", name: "Follicular lymphoma", group: "blood" }),
      mk({ kind: "trial", id: "prima", name: "PRIMA", phase: "3", setting: "Maintenance niraparib", cancers: ["ovarian"] }),
      mk({ kind: "trial", id: "prima-follicular", name: "PRIMA (follicular)", aka: ["PRIMA"], phase: "3", setting: "Rituximab maintenance", cancers: ["follicular-lymphoma"] }),
      mk({ kind: "company", id: "lysa", name: "LYSA", hq: "Pierre-Benite", country: "FR", companyType: "cooperative-group", cancers: ["follicular-lymphoma"], trials: ["prima"] }),
    ];
    const f = nameFindings(makeCtx(fakeGraph(es), { ctgovDir: null })).filter((x) => x.rule === "namesake");
    expect(f.map((x) => `${x.from}>${x.to}`)).toEqual(["lysa>prima"]);
  });

  it("a product on a cancer it has nothing to do with: a prostate vaccine on the myeloma page", () => {
    const es = [
      mk({ kind: "cancer", id: "multiple-myeloma", name: "Multiple myeloma", group: "blood", drugs: ["sipuleucel-t"] }),
      mk({ kind: "cancer", id: "prostate", name: "Prostate cancer", group: "urology" }),
      mk({ kind: "drug", id: "sipuleucel-t", name: "Sipuleucel-T", modality: "Autologous cellular immunotherapy", mechanism: "Primes T cells against PAP.", cancers: ["prostate"] }),
    ];
    const f = drugCancerFindings(makeCtx(fakeGraph(es), { ctgovDir: null }));
    expect(f.filter((x) => x.confidence === "high").map((x) => [x.from, x.to])).toEqual([["multiple-myeloma", "sipuleucel-t"]]);
  });

  it("an institution credited with a trial that ended before it was founded (MILAN-I)", () => {
    const es = [
      mk({ kind: "institution", id: "new-institute", name: "New Institute", summary: "The New Institute was founded in 1994 in Milan.", city: "Milan", country: "IT", lat: 45.46, lng: 9.19, institutionType: "cancer-center" }),
      mk({ kind: "trial", id: "milan-i", name: "Milan I", phase: "3", setting: "Quadrantectomy against mastectomy", started: "1973", yearReported: 1981, institutions: ["new-institute"] }),
    ];
    const f = timeFindings(makeCtx(fakeGraph(es), { ctgovDir: null })).filter((x) => x.rule === "institution-after-trial");
    expect(f).toHaveLength(1);
    expect(f[0].confidence).toBe("high");
  });

  it("a medicine filed among a readout's tests (the ctDNA MRD page) and a funder credited as a maker", () => {
    const es = [
      mk({ kind: "drug", id: "mrd-test", name: "An MRD test", modality: "Tumour-informed ctDNA minimal residual disease test", mechanism: "Tracks variants in plasma." }),
      mk({ kind: "drug", id: "atezo", name: "Atezolizumab", modality: "Monoclonal antibody (anti-PD-L1)", mechanism: "Blocks PD-L1.", companies: ["a-fund"] }),
      mk({ kind: "company", id: "a-fund", name: "A Fund", hq: "Boston", country: "US", companyType: "investor" }),
      mk({ kind: "biomarker", id: "mrd-positive", name: "ctDNA MRD positivity", measurement: "ctdna-detection", forPatient: "A plain sentence.", scoringRule: { text: "Detection.", quote: "Detected.", source: "https://example.org/", sourceLabel: "FDA" }, drugs: ["mrd-test", "atezo"] }),
    ];
    const f = roleFindings(makeCtx(fakeGraph(es), { ctgovDir: null }));
    expect(f.find((x) => x.rule === "role-mixed")?.from).toBe("mrd-positive");
    expect(f.find((x) => x.rule === "developer-type")?.to).toBe("a-fund");
  });

  it("a company that only claims a product someone else makes, and a drug linked to the wrong isoform", () => {
    const es = [
      mk({ kind: "company", id: "maker", name: "Maker Health", hq: "Palo Alto", country: "US", companyType: "diagnostics" }),
      mk({ kind: "company", id: "rival", name: "Rival Diagnostics", hq: "San Francisco", country: "US", companyType: "diagnostics", drugs: ["screen-test"] }),
      mk({ kind: "drug", id: "screen-test", name: "Screen", modality: "Blood-based screening test", mechanism: "Methylation.", companies: ["maker"] }),
      mk({ kind: "target", id: "pik3ca", name: "PIK3CA / PI3K-alpha", symbol: "PIK3CA", biology: "A kinase." }),
      mk({ kind: "target", id: "pik3cd", name: "PI3K delta (PIK3CD)", symbol: "PIK3CD", biology: "A kinase." }),
      mk({ kind: "drug", id: "idelalisib", name: "Idelalisib", modality: "Small-molecule PI3Kδ inhibitor", mechanism: "Blocks B-cell receptor signalling.", targets: ["pik3ca"] }),
    ];
    const c = makeCtx(fakeGraph(es), { ctgovDir: null });
    expect(companyFindings(c).filter((x) => x.confidence === "high").map((x) => x.from)).toEqual(["rival"]);
    expect(targetFindings(c).filter((x) => x.confidence === "high").map((x) => `${x.from}>${x.to}`)).toEqual(["idelalisib>pik3ca"]);
  });
});

describe("sponsor aliases match whole names, not fragments", () => {
  it.each([
    ["AMMF, the Cholangiocarcinoma Charity", "charite"],
    ["Bristol Haematology and Oncology Centre", "bms"],
    ["Molecular Insight Pharmaceuticals, Inc.", "molecular-partners"],
    ["Phoenix Molecular Designs", "molecular-partners"],
    ["Diffusion Pharmaceuticals Inc", "astrazeneca"],
    ["South Australian immunoGENomics Cancer Institute (SAiGENCI), University of Adelaide", "abbvie"],
    ["Agios Savvas", "servier"],
    ["Osaka International Cancer Institute", "nci"],
    ["NCI Egypt", "nci"],
    ["NCI Cairo", "nci"],
    ["French National Cancer Institute", "nci"],
    ["Jiangsu Institute of Cancer Research", "icr-london"],
    ["Academisch Medisch Centrum - Universiteit van Amsterdam (AMC-UvA)", "aids-malignancy-consortium"],
    ["Big Picture Bio", "big"],
    ["Heidelberg Pharma AG", "heidelberg-nct"],
    ["Sumitomo Heavy Industries", "sumitomo-pharma"],
    ["Sidney Kimmel Comprehensive Cancer Center at Jefferson Health", "johns-hopkins"],
    ["Technical University of Munich", "lmu-munich"],
    ["Hospital Clínico San Carlos", "hospital-clinic-barcelona"],
    ["Hôpital Maisonneuve-Rosemont / CIUSSS de l'Est-de-l'Île-de-Montréal", "chum"],
    ["Zhongshan Hospital, Fudan University", "fuscc"],
    ["First Affiliated Hospital of Sun Yat-sen University", "sysucc"],
    ["Peking University People's Hospital", "pku-cancer-hospital"],
    ["Institute of Hematology and Blood Diseases Hospital, Chinese Academy of Medical Sciences", "cams-cancer-hospital"],
    ["Alliance Against Cancer", "alliance-oncology"],
  ])("%s is not counted for %s", (name, wrong) => {
    expect(resolveSponsor(name).id).not.toBe(wrong);
  });

  it.each([
    ["Bristol-Myers Squibb", "bms"], ["Charité – Universitätsmedizin Berlin", "charite"], ["Charite University, Berlin, Germany", "charite"],
    ["Molecular Partners AG", "molecular-partners"], ["Fusion Pharmaceuticals Inc.", "astrazeneca"], ["ImmunoGen, Inc.", "abbvie"],
    ["Agios Pharmaceuticals, Inc.", "servier"], ["National Cancer Institute (NCI)", "nci"], ["Institute of Cancer Research, United Kingdom", "icr-london"],
    ["The Institute of Cancer Research (ICR-CTSU)", "icr-london"], ["AIDS Malignancy Consortium", "aids-malignancy-consortium"], ["Breast International Group", "big"],
    ["Sumitomo Pharma America, Inc.", "sumitomo-pharma"], ["Sidney Kimmel Comprehensive Cancer Center at Johns Hopkins", "johns-hopkins"],
    ["Hospital Clinic of Barcelona", "hospital-clinic-barcelona"], ["CRCHUM", "chum"], ["Sun Yat-sen University", "sysucc"], ["Fudan University", "fuscc"],
    ["Peking University Cancer Hospital & Institute", "pku-cancer-hospital"], ["Cancer Institute and Hospital, Chinese Academy of Medical Sciences", "cams-cancer-hospital"],
    ["Universitäres Centrum für Tumorerkrankungen Frankfurt", "uct-frankfurt"], ["Johann Wolfgang Goethe University Hospital", "uct-frankfurt"],
    ["PrECOG, LLC.", "ecog-acrin"], ["ECOG-ACRIN Cancer Research Group", "ecog-acrin"],
    ["Alliance for Clinical Trials in Oncology", "alliance-oncology"], ["Alliance Foundation Trials, LLC.", "alliance-oncology"],
  ])("%s still resolves to %s", (name, id) => {
    expect(resolveSponsor(name).id).toBe(id);
  });
});

describe("link-sense ratchet", () => {
  it("no class grows past its floor", { timeout: Number(process.env.SLOW_TEST_MS ?? 240_000) }, () => {
    const findings = audit(graph(), { ctgovDir: null });
    const now = floorCounts(findings);
    const floor = JSON.parse(readFileSync(FLOOR_FILE, "utf8")).counts as Record<string, number>;
    const over = Object.entries(now).filter(([k, v]) => v > (floor[k] ?? 0));
    const detail = over.map(([k, v]) => `${k}: ${v} > ${floor[k] ?? 0}; e.g. ${findings.filter((f) => `${f.cls}/${f.rule}` === k).slice(-3).map((f) => f.reason).join(" | ")}`);
    expect(detail, "link-sense findings above the floor (fix the record or the pattern; see docs/proposals/link-sense-strategies.md)").toEqual([]);
  });
});
