import { describe, expect, it } from "vitest";
import { graph } from "../src/lib/graph";
import { JOURNALS, aboutCancer, authorString, corpusIds, guessPaperType, isOncology, jatsToText, parsePubmedXml, suggestId } from "./landmark-papers";

describe("landmark-paper watch", () => {
  it("every watched journal is a corpus journal record with an ISSN, so Crossref is queried by a resolved id", () => {
    const g = graph();
    for (const j of JOURNALS) {
      const rec = g.get(j.id) as unknown as { kind: string; issn?: string } | undefined;
      expect(rec?.kind, j.id).toBe("journal");
      expect(rec?.issn, j.id).toMatch(/^\d{4}-\d{3}[\dX]$/);
    }
  });

  it("JATS abstracts become plain text without changing the words", () => {
    const jats = `<jats:title>Abstract</jats:title><jats:p>Late-stage NSCLC is rarely curable<jats:sup>1</jats:sup>. Effector regulatory CD4<jats:sup>+</jats:sup> T cells (eT<jats:sub>reg</jats:sub> cells) accumulated.</jats:p>`;
    expect(jatsToText(jats)).toBe("Late-stage NSCLC is rarely curable. Effector regulatory CD4+ T cells (eTreg cells) accumulated.");
  });

  it("authors in the house format", () => {
    expect(authorString([{ family: "Gamble", given: "Samuel" }, { family: "Whiteman", given: "Zoe E." }, { family: "Peinador-Marín", given: "Claudia" }, { family: "Janes", given: "Sam M." }])).toBe("Gamble S, Whiteman ZE, Peinador-Marín C, et al.");
    expect(authorString([{ name: "Pre-Cancer Atlas Team" }])).toBe("Pre-Cancer Atlas Team");
  });

  it("suggested ids and paper types", () => {
    expect(suggestId({ authors: [{ family: "Gamble", given: "S" }], title: "A preinvasive regulatory T cell axis for lung cancer interception", journalId: "nature", published: "2026-10-07" })).toBe("paper-gamble-preinvasive-regulatory-cell-axis-nature-2026");
    expect(guessPaperType("A randomised phase 3 trial of X versus Y")).toBe("rct");
    expect(guessPaperType("Mouse models reveal a pathway")).toBe("basic");
  });

  it("the oncology filter for general journals has word boundaries", () => {
    expect(isOncology("A preinvasive regulatory T cell axis for lung cancer interception")).toBe(true);
    expect(isOncology("Progressive multifocal leukoencephalopathy after natalizumab")).toBe(false);
    expect(isOncology("Neuroblastoma risk groups")).toBe(true);
    expect(aboutCancer("Heart Transplant for Advanced Heart Failure", "Contraindications include active malignancy.")).toBe(false);
    expect(aboutCancer("Immune circuits in early disease", "Lung cancer develops from preinvasive lesions; tumour growth and carcinoma.")).toBe(true);
  });

  it("corpus DOIs and PubMed ids come from paper fields and from links on any record", () => {
    const ids = corpusIds([{ doi: "10.1038/ABC" }, { links: [{ url: "https://doi.org/10.1056/NEJMoa1" }, { url: "https://pubmed.ncbi.nlm.nih.gov/123/" }] }]);
    expect([...ids.dois].sort()).toEqual(["10.1038/abc", "10.1056/nejmoa1"]);
    expect([...ids.pmids]).toEqual(["123"]);
  });

  it("PubMed XML: the article's own DOI, not its references", () => {
    const xml = `<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID Version="1">42844481</PMID><Abstract><AbstractText Label="BACKGROUND">Late-stage NSCLC.</AbstractText><AbstractText>Here we explore.</AbstractText></Abstract></MedlineCitation><PubmedData><ArticleIdList><ArticleId IdType="pubmed">42844481</ArticleId><ArticleId IdType="doi">10.1038/s41586-026-11066-6</ArticleId></ArticleIdList><ReferenceList><Reference><ArticleIdList><ArticleId IdType="doi">10.1016/j.immuni.2016.07.011</ArticleId></ArticleIdList></Reference></ReferenceList></PubmedData></PubmedArticle></PubmedArticleSet>`;
    const m = parsePubmedXml(xml);
    expect(m.get("10.1038/s41586-026-11066-6")).toEqual({ pmid: "42844481", abstract: "BACKGROUND: Late-stage NSCLC. Here we explore." });
    expect(m.size).toBe(1);
  });
});
