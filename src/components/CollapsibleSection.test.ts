import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CollapsibleSection } from "./CollapsibleSection";

describe("collapsible sections", () => {
  it("renders a closed section with its heading, link and sourced contents intact", () => {
    const html = renderToStaticMarkup(CollapsibleSection({
      id: "prevalence", title: "How common it is in each cancer", defaultOpen: false,
      aside: createElement("a", { href: "/prevalence/" }, "Full matrix"),
      children: createElement("p", null, "Sourced prevalence table"),
    }));
    expect(html).toContain('id="prevalence"');
    expect(html).not.toMatch(/<details[^>]*\bopen=/);
    expect(html).toMatch(/<summary[^>]*>[\s\S]*<h2/);
    expect(html).toContain('href="/prevalence/"');
    expect(html).toContain("Sourced prevalence table");
  });

  it("keeps sections open unless explicitly configured to start closed", () => {
    const html = renderToStaticMarkup(CollapsibleSection({
      title: "Products", children: "Products table",
    }));
    expect(html).toMatch(/<details[^>]*\bopen=""/);
  });
});
