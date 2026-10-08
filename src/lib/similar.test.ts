import { beforeEach, describe, expect, it, vi } from "vitest";

const fixture = vi.hoisted(() => {
  const entities = [
    { id: "a", kind: "drug", tags: ["x", "y"] },
    { id: "b", kind: "drug", tags: ["x", "y"] },
    { id: "c", kind: "drug", tags: ["x"] },
    { id: "direct", kind: "drug", tags: ["x", "y"] },
    { id: "tags-only", kind: "drug", tags: ["x", "y"] },
    { id: "h1", kind: "target", tags: [] },
    { id: "h2", kind: "target", tags: [] },
    { id: "section", kind: "section", tags: ["x", "y"] },
  ];
  const links: Record<string, string[]> = {
    a: ["h1", "h2", "direct", "section"], b: ["h1", "h2"], c: ["h1"],
    direct: ["a"], "tags-only": [], h1: ["a", "b", "c"], h2: ["a", "b"], section: ["a"],
  };
  const must = (id: string) => entities.find((e) => e.id === id)!;
  return {
    entities, must,
    neighbours: vi.fn((id: string) => {
      const groups = new Map<string, typeof entities>();
      for (const neighbour of links[id]) {
        const e = must(neighbour);
        groups.set(e.kind, [...(groups.get(e.kind) ?? []), e]);
      }
      return groups;
    }),
    degree: (id: string) => links[id].length,
  };
});

vi.mock("./graph", () => ({ graph: () => fixture }));
vi.mock("./tags", () => ({ publicTags: (tags: string[]) => tags }));

beforeEach(() => { vi.resetModules(); fixture.neighbours.mockClear(); });

describe("similar page lookup", () => {
  it("keeps weighted scores, explanations and ordering while excluding direct links and sections", async () => {
    const { similarFor } = await import("./similar");
    const result = similarFor("a");
    const h1 = 1 / Math.log2(5), h2 = 1 / Math.log2(4), direct = 1 / Math.log2(3);
    const round = (n: number) => Math.round(n * 1000) / 1000;
    expect(result).toEqual([
      { id: "b", score: round((h1 + h2) / (h1 + h2 + direct) + 0.5), shared: ["h2", "h1"], sharedTags: ["x", "y"] },
      { id: "c", score: round(h1 / (h1 + h2 + direct) + 0.25), shared: ["h1"], sharedTags: ["x"] },
      { id: "tags-only", score: 0.5, shared: [], sharedTags: ["x", "y"] },
    ]);
    expect(similarFor("a")).toBe(result);
    expect(fixture.neighbours).toHaveBeenCalledTimes(fixture.entities.length - 1);
    expect(similarFor("section")).toEqual([]);
    expect(similarFor("missing")).toEqual([]);
  });

  it("exports every non-section record in corpus order after an individual lookup", async () => {
    const { similarFor, similarAll } = await import("./similar");
    const b = similarFor("b");
    const all = similarAll();
    expect([...all.keys()]).toEqual(fixture.entities.filter((e) => e.kind !== "section").map((e) => e.id));
    expect(all.get("b")).toBe(b);
    for (const [id, result] of all) expect(similarFor(id)).toBe(result);
    expect(similarAll()).toBe(all);
    expect(fixture.neighbours).toHaveBeenCalledTimes(fixture.entities.length - 1);
  });
});
