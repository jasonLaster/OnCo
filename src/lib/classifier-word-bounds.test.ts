import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import type { Drug } from "./schema";
import { classifyDrug } from "./checkpoints";
import { modalityGroup } from "./modality-group";
import { modalityClass as sideEffectClass } from "./side-effects";
import { modalityClass as companyClass } from "./company-score";
import { buildBrowser } from "./kind-browser";
import { engine } from "./modular";
import { subgroupOf } from "./sequencing";

/**
 * Fragments that fired from the middle of a word and put a wrong label on a record (found by
 * scripts/link-sense-audit.ts, fragment class). Each case is the record or text that was mislabelled before November
 * 2026: "agonist" inside "antagonist", "imid" inside benzimidazole and pyrimidine, "til" inside "instilled" and
 * "pastille", "alpha" inside "PI3K-alpha" and "alpha-gal", "pet" inside "competitive", "MET" inside "metabolite",
 * "HIF" inside "shift", "menin" inside "meningeal", "endocrine" inside "neuroendocrine", "egfr" inside "vegfr".
 */
const drug = (id: string): Drug => {
  const d = graph().get(id);
  if (!d || d.kind !== "drug") throw new Error(`no drug ${id}`);
  return d;
};

describe("classifier patterns are word-bounded", () => {
  it("an antagonist is not an agonist (checkpoint map)", () => {
    for (const id of ["enzalutamide", "apalutamide", "darolutamide", "plerixafor", "ondansetron", "aprepitant", "tamoxifen"]) expect(classifyDrug(drug(id)), id).not.toBe("agonist");
    expect(classifyDrug({ ...drug("enzalutamide"), modality: "IL-15 superagonist", mechanism: "" })).toBe("agonist");
  });

  it("benzimidazoles, nitroimidazoles and pyrimidines are not IMiD degraders", () => {
    for (const id of ["mebendazole", "fenbendazole", "nimorazole", "anagrelide", "uridine-triacetate"]) expect(modalityGroup(drug(id).modality), id).not.toBe("Degrader");
    for (const id of ["capecitabine", "fluorouracil", "cytarabine", "mebendazole", "nimorazole"]) expect(companyClass(drug(id).modality), id).not.toBe("Degrader or glue");
    expect(modalityGroup("Oral IMiD (cereblon-binding immunomodulatory drug)")).toBe("Degrader");
    expect(modalityGroup("IMiD")).toBe("Degrader");
  });

  it("'instilled', 'pastille' and 'volatile' are not tumour-infiltrating lymphocytes", () => {
    for (const id of ["hexaminolevulinate", "iothalamate-meglumine", "apg-157", "toby-urine-mced"]) expect(sideEffectClass(drug(id).modality), id).not.toBe("Cell therapy");
    for (const id of ["ksq-001ex", "mightytil", "agx-148"]) expect(sideEffectClass(drug(id).modality), id).toBe("Cell therapy");
    expect(sideEffectClass("Autologous TIL therapy")).toBe("Cell therapy");
  });

  it("'alpha' in a receptor or antigen name is not an alpha emitter", () => {
    for (const id of ["rec-7735", "algenpantucel-l", "tasonermin", "olaratumab"]) {
      expect(sideEffectClass(drug(id).modality), id).not.toBe("Radiopharmaceutical");
      expect(companyClass(drug(id).modality), id).not.toBe("Radiopharmaceutical");
    }
    expect(sideEffectClass("Targeted alpha therapy (actinium-225)")).toBe("Radiopharmaceutical");
    const kb = new Map(buildBrowser("drug").rows.map((r) => [r.id, r.facets.modality]));
    expect(kb.get("rec-7735")).not.toContain("Radiopharmaceutical");
    expect(kb.get("tilmanocept-tc99m")).not.toContain("Cell therapy");
  });

  it("'competitive' is not PET and 'tested' is not a test (company pipeline classes)", () => {
    expect(companyClass(drug("relcobatinib").modality)).toBe("Small molecule");
    expect(companyClass(drug("cosibelimab").modality)).toBe("Antibody");
    expect(companyClass(drug("mebendazole").modality)).not.toBe("Diagnostic");
    expect(companyClass("PET imaging agent")).toBe("Imaging agent");
  });

  it("the modular engine reads antagonists, metabolites and gene symbols by whole word", () => {
    const cls = new Map(engine().formats.flatMap((f) => f.drugs).map((d) => [d.id, d.components.mechanismClass?.id]));
    for (const id of ["enzalutamide", "darolutamide", "plerixafor", "zibotentan"]) expect(cls.get(id), id).toBe("receptor-antagonist");
    expect(cls.get("bexarotene")).toBe("receptor-agonist");
    expect(cls.get("soquelitinib")).toBe("kinase-inhibitor");
    for (const id of ["acitretin", "isotretinoin", "dronabinol", "hr070803", "allopurinol"]) expect(cls.get(id), id).not.toBe("kinase-inhibitor");
    expect(cls.get("hr070803")).not.toBe("metabolic-inhibitor");
  });

  it("standard-of-care subgroups do not read a marker inside a longer word", () => {
    expect(subgroupOf("Neuroendocrine carcinoma (poorly differentiated)")).toBe("All comers");
    expect(subgroupOf("Driver-positive lung cancer, asymptomatic metastases")).not.toBe("HR-positive");
    expect(subgroupOf("Brain and leptomeningeal metastases")).not.toBe("KMT2A");
    expect(subgroupOf("Advanced, first line", "Pazopanib or other VEGFR inhibitor")).toBe("All comers");
    expect(subgroupOf("Metastatic, HR-positive")).toBe("HR-positive");
    expect(subgroupOf("Advanced, endocrine-sensitive")).toBe("HR-positive");
    expect(subgroupOf("Metastatic, EGFR-mutant")).toBe("EGFR");
    expect(subgroupOf("Relapsed, menin inhibitor")).toBe("KMT2A");
  });
});
