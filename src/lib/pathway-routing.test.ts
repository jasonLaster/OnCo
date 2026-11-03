import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { layoutPathway, routingStats, segmentHitsRect, wrapLabel, type PathwayLayout, type Point, type RoutingEdge, type RoutingNode } from "./pathway-routing";

type Fixture = { name: string; nodes: RoutingNode[]; edges: RoutingEdge[] };
const n = (id: string, x: number, y: number, label = id): RoutingNode => ({ id, label, x, y });
const e = (from: string, to: string): RoutingEdge => ({ from, to });

/** Small diagrams that used to draw an edge through a box, or that stress shared sides and tight gaps. */
const FIXTURES: Fixture[] = [
  {
    // /pathways/cancer-neuroscience/ as it stood on 2 November 2026: "Neuron-glioma synapse" to "Growth or restraint"
    // went straight through "Tumour-to-brain sensory input".
    name: "cancer neuroscience",
    nodes: [n("brain", 15, 25, "Brain circuit"), n("auto", 40, 25, "Autonomic output"), n("nerve", 65, 25, "Tumour nerve fibres"),
      n("signal", 65, 60, "Norepinephrine, acetylcholine, GABA"), n("immune", 88, 60, "Tumour and immune cells"), n("growth", 88, 90, "Growth or restraint"),
      n("sensory", 40, 80, "Tumour-to-brain sensory input"), n("syn", 15, 65, "Neuron-glioma synapse")],
    edges: [e("brain", "auto"), e("auto", "nerve"), e("nerve", "signal"), e("signal", "immune"), e("immune", "growth"), e("sensory", "brain"), e("immune", "sensory"), e("syn", "growth")],
  },
  {
    // A straight row with an edge from one end to the other: the long edge must go round the middle boxes.
    name: "row with a skip",
    nodes: [n("a", 10, 50), n("b", 37, 50), n("c", 63, 50), n("d", 90, 50)],
    edges: [e("a", "b"), e("b", "c"), e("c", "d"), e("a", "d"), e("d", "a")],
  },
  {
    // A box in the middle of a ring, with every corner wired to the opposite corner.
    name: "ring with crossings",
    nodes: [n("tl", 10, 10), n("tr", 90, 10), n("bl", 10, 90), n("br", 90, 90), n("mid", 50, 50, "Centre box with a long label")],
    edges: [e("tl", "br"), e("tr", "bl"), e("bl", "tr"), e("br", "tl"), e("mid", "tl"), e("mid", "br")],
  },
  {
    // Boxes the data places almost on top of each other.
    name: "overlapping positions",
    nodes: [n("p", 40, 30, "eIF4E"), n("q", 47, 32, "eIF4F (4E/4G/4A)"), n("r", 44, 70, "MYC, cyclin D1, MCL-1 translation")],
    edges: [e("p", "q"), e("q", "r"), e("r", "p")],
  },
  {
    // One source fanning out to three targets on its right.
    name: "fan out",
    nodes: [n("src", 8, 50, "Source"), n("t1", 92, 35, "Target one"), n("t2", 92, 50, "Target two"), n("t3", 92, 65, "Target three")],
    edges: [e("src", "t1"), e("src", "t2"), e("src", "t3")],
  },
];

const rect = (b: PathwayLayout["nodes"][number]) => ({ l: b.cx - b.w / 2, t: b.cy - b.h / 2, r: b.cx + b.w / 2, b: b.cy + b.h / 2 });
function hitsOtherBox(L: PathwayLayout, edges: RoutingEdge[]): string[] {
  const bad: string[] = [];
  L.edges.forEach((r, i) => {
    if (!r) return;
    L.nodes.forEach((b) => {
      if (b.id === edges[i].from || b.id === edges[i].to) return;
      for (let k = 0; k + 1 < r.points.length; k++) if (segmentHitsRect(r.points[k], r.points[k + 1], rect(b))) { bad.push(`${edges[i].from}>${edges[i].to} through ${b.id}`); return; }
    });
  });
  return bad;
}
const orthogonal = (pts: Point[]) => pts.every((p, k) => k === 0 || Math.abs(p.x - pts[k - 1].x) < 0.01 || Math.abs(p.y - pts[k - 1].y) < 0.01);

describe("pathway edge routing", () => {
  for (const f of FIXTURES) {
    it(`${f.name}: no route passes through a box other than its own ends`, () => {
      const L = layoutPathway(f.nodes, f.edges);
      expect(hitsOtherBox(L, f.edges)).toEqual([]);
      expect(L.edges.every((r) => r && orthogonal(r.points))).toBe(true);
    });
  }

  it("routes every corpus diagram without entering a box, and every route is horizontal and vertical runs", () => {
    const bad: string[] = [];
    let edges = 0, crossings = 0;
    for (const p of graph().kind("pathway")) {
      const L = layoutPathway(p.nodes, p.edges);
      bad.push(...hitsOtherBox(L, p.edges).map((s) => `${p.id}: ${s}`));
      for (const r of L.edges) if (!r || !orthogonal(r.points)) bad.push(`${p.id}: a route is missing or diagonal`);
      edges += p.edges.length;
      crossings += routingStats(L, p.edges).crossings;
    }
    expect(bad).toEqual([]);
    // 104 crossings between straight edges on 2 November 2026, and 25 once routed. A loose ceiling, so a change to the corpus
    // passes and a change that stops the router avoiding crossings does not.
    expect(crossings).toBeLessThan(Math.max(40, edges / 20));
  });

  it("is deterministic", () => {
    for (const f of FIXTURES) expect(JSON.stringify(layoutPathway(f.nodes, f.edges))).toBe(JSON.stringify(layoutPathway(structuredClone(f.nodes), structuredClone(f.edges))));
  });

  it("gives edges that share a side of a box their own ports", () => {
    const f = FIXTURES.find((x) => x.name === "fan out")!;
    const L = layoutPathway(f.nodes, f.edges);
    expect(L.edges.map((r) => r!.fromSide)).toEqual([0, 0, 0]);
    const starts = L.edges.map((r) => r!.points[0]);
    expect(new Set(starts.map((p) => `${p.x},${p.y}`)).size).toBe(3);
    // Spread along the side, at least an arrowhead apart.
    const ys = starts.map((p) => p.y).sort((a, b) => a - b);
    expect(ys[1] - ys[0]).toBeGreaterThanOrEqual(12);
    expect(ys[2] - ys[1]).toBeGreaterThanOrEqual(12);
    // And the fan does not cross itself.
    expect(routingStats(L, f.edges).crossings).toBe(0);
  });

  it("leaves and enters boxes square to the side, with a small gap before the arrowhead", () => {
    for (const f of FIXTURES) {
      const L = layoutPathway(f.nodes, f.edges);
      L.edges.forEach((r, i) => {
        const pts = r!.points, from = L.nodes.find((b) => b.id === f.edges[i].from)!, to = L.nodes.find((b) => b.id === f.edges[i].to)!;
        const a = pts[0], b = pts[1], y = pts[pts.length - 2], z = pts[pts.length - 1];
        // Leaves from the side it names, perpendicular to it.
        if (r!.fromSide === 0 || r!.fromSide === 2) { expect(a.x).toBeCloseTo(from.cx + (r!.fromSide === 0 ? 1 : -1) * from.w / 2, 1); expect(b.y).toBeCloseTo(a.y, 1); }
        else { expect(a.y).toBeCloseTo(from.cy + (r!.fromSide === 1 ? 1 : -1) * from.h / 2, 1); expect(b.x).toBeCloseTo(a.x, 1); }
        // Ends 3 px short of the target's side, on a straight run.
        if (r!.toSide === 0 || r!.toSide === 2) { expect(Math.abs(z.x - (to.cx + (r!.toSide === 0 ? 1 : -1) * to.w / 2))).toBeCloseTo(3, 1); expect(y.y).toBeCloseTo(z.y, 1); }
        else { expect(Math.abs(z.y - (to.cy + (r!.toSide === 1 ? 1 : -1) * to.h / 2))).toBeCloseTo(3, 1); expect(y.x).toBeCloseTo(z.x, 1); }
      });
    }
  });

  it("rounds the corners of a bent route", () => {
    const f = FIXTURES.find((x) => x.name === "cancer neuroscience")!;
    const L = layoutPathway(f.nodes, f.edges);
    const bent = L.edges.filter((r) => r && r.points.length > 2);
    expect(bent.length).toBeGreaterThan(0);
    for (const r of bent) expect(r!.d).toMatch(/Q/);
  });

  it("pushes apart boxes the data places on top of each other", () => {
    const f = FIXTURES.find((x) => x.name === "overlapping positions")!;
    const L = layoutPathway(f.nodes, f.edges);
    const [p, q] = L.nodes;
    const apartX = Math.abs(p.cx - q.cx) >= (p.w + q.w) / 2, apartY = Math.abs(p.cy - q.cy) >= (p.h + q.h) / 2;
    expect(apartX || apartY).toBe(true);
  });

  it("fits the canvas to the drawing, with the legend below it", () => {
    for (const f of FIXTURES) {
      const L = layoutPathway(f.nodes, f.edges);
      for (const b of L.nodes) {
        expect(b.cx - b.w / 2).toBeGreaterThanOrEqual(L.view.x);
        expect(b.cx + b.w / 2).toBeLessThanOrEqual(L.view.x + L.view.w);
        expect(b.cy + b.h / 2).toBeLessThan(L.legend.y);
      }
      expect(L.legend.y).toBeLessThan(L.view.y + L.view.h);
    }
  });
});

describe("pathway box labels", () => {
  it("keeps short labels on one line and wraps long ones instead of cutting them", () => {
    expect(wrapLabel("Brain circuit")).toEqual(["Brain circuit"]);
    expect(wrapLabel("Norepinephrine, acetylcholine, GABA")).toEqual(["Norepinephrine,", "acetylcholine, GABA"]);
    const long = "Interception: chemoprevention, ablation and surveillance";
    expect(wrapLabel(long).join(" ")).toBe(long);
    expect(wrapLabel(long)).toHaveLength(3);
  });

  it("fits every corpus label in at most three lines, whole", () => {
    const bad: string[] = [];
    for (const p of graph().kind("pathway")) for (const node of p.nodes) {
      const lines = wrapLabel(node.label);
      if (lines.join(" ") !== node.label.trim().replace(/\s+/g, " ") || lines.length > 3 || lines.some((l) => l.length > 28)) bad.push(`${p.id}: ${node.label} -> ${JSON.stringify(lines)}`);
    }
    expect(bad).toEqual([]);
  });

  it("grows a box to fit a wrapped label", () => {
    const L = layoutPathway([n("a", 20, 50, "Short"), n("b", 80, 50, "Mutant clones in normal tissue (NOTCH1, TP53)")], [e("a", "b")]);
    expect(L.nodes[0].lines).toHaveLength(1);
    expect(L.nodes[1].lines.length).toBeGreaterThan(1);
    expect(L.nodes[1].h).toBeGreaterThan(L.nodes[0].h);
  });
});
