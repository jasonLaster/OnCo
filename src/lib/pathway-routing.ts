/**
 * Layout and edge routing for the pathway diagrams. Pure and deterministic: the same nodes and edges always give the
 * same picture. It runs on the server only (src/lib/pathway-products.ts passes the result to the diagram as props), so
 * the browser does no routing and the static SVG and the hydrated one are the same by construction.
 *
 * Nodes keep the positions the data gives them (0-100 on each axis). Boxes are sized to their labels, which wrap to
 * two lines (three for the few very long ones) rather than being cut off. Where two boxes would touch or overlap at
 * those positions they are pushed apart by the smallest amount that leaves a routing channel between them.
 *
 * Each edge is routed as horizontal and vertical segments on a sparse grid built from the box edges, the channels
 * between them and the ports, by a shortest-path search whose cost ranks, in order: passing through another box,
 * crossing an edge already routed, running along or right beside one, hugging a box, the number of bends, and length.
 * A first pass chooses which side of each box an edge leaves and enters; ports sharing a side are then spread along
 * it and every edge is routed again to its own port, a route may still move to another side at a cost, and the ports
 * are spread again if one does. Parallel segments left sharing a channel are offset, small Z and U kinks straightened,
 * and of two ways of ordering shared ports the one with fewer crossings and bends is kept.
 */

export type RoutingNode = { id: string; label: string; x: number; y: number };
export type RoutingEdge = { from: string; to: string };
export type Point = { x: number; y: number };
/** 0 right, 1 bottom, 2 left, 3 top; also the outward direction of that side. */
export type Side = 0 | 1 | 2 | 3;

export type LaidNode = { id: string; cx: number; cy: number; w: number; h: number; lines: string[]; nudged: boolean };
export type LaidEdge = {
  /** Polyline from the source port to just short of the target port. */
  points: Point[];
  /** SVG path with rounded corners. */
  d: string;
  /** A point halfway along the route, and whether the route runs horizontally or vertically there. */
  mid: Point; midDir: "h" | "v";
  fromSide: Side; toSide: Side;
};
export type PathwayLayout = {
  nodes: LaidNode[];
  edges: Array<LaidEdge | null>;
  view: { x: number; y: number; w: number; h: number };
  /** Where the legend row starts. */
  legend: Point;
};

/** Pixel scale of the data's 0-100 coordinates, as the fixed 900 by 520 canvas used before. */
const PAD = 60, SX = 780, SY = 400;
const MIN_W = 110, MAX_W = 190, CHAR_W = 6.4, LINE_CHARS = 24, TEXT_PAD = 24;
const HEIGHTS = [40, 40, 52, 66];
/** Clearance kept around boxes, the straight stub out of and into a port, the corner radius and the arrow gap. */
const M = 12, STUB = 18, R = 11, END_GAP = 3;
/** Ports keep this far from a box's corners; an arrowhead is about 13 px across, so ports 18 px apart do not touch. */
const PORT_INSET = 8;
/** Parallel runs closer than this read as one thick line. */
const NEAR_PX = 6;
/** Smallest gap left between neighbouring boxes so an edge can pass between them. */
const GAP_X = 28, GAP_Y = 24;
/** Search costs. A box hit outweighs everything; a crossing outweighs any reasonable detour. */
const BOX = 100_000, CROSS = 600, OVERLAP = 4, NEAR = 3, BEND = 30;
const LEGEND_W = 700;

const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];

/** Wrap a label to two lines of about 24 characters, or three for the few very long ones, as evenly as it goes. */
export function wrapLabel(label: string): string[] {
  const s = label.trim();
  if (s.length <= LINE_CHARS) return [s];
  const words = s.split(/\s+/).flatMap((w) => (w.length > LINE_CHARS ? w.match(new RegExp(`.{1,${LINE_CHARS}}`, "g")) ?? [w] : [w]));
  // The most even split into two lines, else three: whichever keeps the longest line shortest. Never cut.
  let best2: string[] = [s], max2 = Infinity;
  for (let i = 1; i < words.length; i++) {
    const l = [words.slice(0, i).join(" "), words.slice(i).join(" ")], m = Math.max(...l.map((x) => x.length));
    if (m < max2) { max2 = m; best2 = l; }
  }
  if (max2 <= LINE_CHARS || words.length < 3) return best2;
  let best3: string[] = best2, max3 = max2;
  for (let i = 1; i < words.length - 1; i++) for (let j = i + 1; j < words.length; j++) {
    const l = [words.slice(0, i).join(" "), words.slice(i, j).join(" "), words.slice(j).join(" ")], m = Math.max(...l.map((x) => x.length));
    if (m < max3) { max3 = m; best3 = l; }
  }
  return best3;
}

const r1 = (v: number) => Math.round(v * 10) / 10;
const key = (v: number) => Math.round(v * 2) / 2;

function sizeBoxes(nodes: RoutingNode[]): LaidNode[] {
  return nodes.map((n) => {
    const lines = wrapLabel(n.label);
    const longest = Math.max(...lines.map((l) => l.length));
    return {
      id: n.id, lines, nudged: false,
      cx: key(PAD + (n.x / 100) * SX), cy: key(PAD + (n.y / 100) * SY),
      w: Math.min(MAX_W, Math.max(MIN_W, Math.round(longest * CHAR_W + TEXT_PAD))), h: HEIGHTS[Math.min(3, lines.length)],
    };
  });
}

/** Push apart boxes closer than the routing gap, along whichever axis needs the smaller move. Deterministic. */
function separate(boxes: LaidNode[]) {
  for (let iter = 0; iter < 60; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const dx = b.cx - a.cx, dy = b.cy - a.cy;
      const ox = (a.w + b.w) / 2 + GAP_X - Math.abs(dx), oy = (a.h + b.h) / 2 + GAP_Y - Math.abs(dy);
      if (ox <= 0.25 || oy <= 0.25) continue;
      moved = true;
      a.nudged = b.nudged = true;
      // Weight the vertical move: boxes are wider than tall, and the data's columns matter more than its rows.
      if (ox < oy * 1.5) { const s = dx > 0 || (dx === 0 && i < j) ? 1 : -1; a.cx -= (s * ox) / 2; b.cx += (s * ox) / 2; }
      else { const s = dy > 0 || (dy === 0 && i < j) ? 1 : -1; a.cy -= (s * oy) / 2; b.cy += (s * oy) / 2; }
    }
    if (!moved) break;
  }
  for (const b of boxes) { b.cx = key(b.cx); b.cy = key(b.cy); }
}

type Rect = { l: number; t: number; r: number; b: number };
const rectOf = (b: LaidNode, m = 0): Rect => ({ l: b.cx - b.w / 2 - m, t: b.cy - b.h / 2 - m, r: b.cx + b.w / 2 + m, b: b.cy + b.h / 2 + m });

/** Whether an axis-aligned segment passes through the open interior of a rectangle. */
export function segmentHitsRect(p: Point, q: Point, r: Rect): boolean {
  const e = 0.01;
  if (Math.abs(p.y - q.y) < e) {
    if (!(p.y > r.t + e && p.y < r.b - e)) return false;
    const a = Math.min(p.x, q.x), b = Math.max(p.x, q.x);
    return b > r.l + e && a < r.r - e;
  }
  if (Math.abs(p.x - q.x) < e) {
    if (!(p.x > r.l + e && p.x < r.r - e)) return false;
    const a = Math.min(p.y, q.y), b = Math.max(p.y, q.y);
    return b > r.t + e && a < r.b - e;
  }
  return lineHitsRect(p, q, r);
}

/** General segment against rectangle interior (used for straight diagonal edges when measuring the old drawing). */
export function lineHitsRect(p: Point, q: Point, r: Rect): boolean {
  // Liang-Barsky clip against the slightly shrunken rectangle.
  const e = 0.5, l = r.l + e, t = r.t + e, rr = r.r - e, b = r.b - e;
  let u0 = 0, u1 = 1;
  const dx = q.x - p.x, dy = q.y - p.y;
  const checks: Array<[number, number]> = [[-dx, p.x - l], [dx, rr - p.x], [-dy, p.y - t], [dy, b - p.y]];
  for (const [pp, qq] of checks) {
    if (pp === 0) { if (qq < 0) return false; continue; }
    const u = qq / pp;
    if (pp < 0) { if (u > u1) return false; if (u > u0) u0 = u; } else { if (u < u0) return false; if (u < u1) u1 = u; }
  }
  return u1 - u0 > 1e-6;
}

/** Length over which two axis-aligned segments lie on top of each other. */
export function collinearOverlap(a: Point, b: Point, c: Point, d: Point): number {
  const e = 0.5;
  if (Math.abs(a.y - b.y) < e && Math.abs(c.y - d.y) < e && Math.abs(a.y - c.y) < e) return Math.min(Math.max(a.x, b.x), Math.max(c.x, d.x)) - Math.max(Math.min(a.x, b.x), Math.min(c.x, d.x));
  if (Math.abs(a.x - b.x) < e && Math.abs(c.x - d.x) < e && Math.abs(a.x - c.x) < e) return Math.min(Math.max(a.y, b.y), Math.max(c.y, d.y)) - Math.max(Math.min(a.y, b.y), Math.min(c.y, d.y));
  return 0;
}

/** Whether two segments cross at a point interior to both. */
export function segmentsCross(a: Point, b: Point, c: Point, d: Point): boolean {
  const o = (p: Point, q: Point, r: Point) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
  const d1 = o(c, d, a), d2 = o(c, d, b), d3 = o(a, b, c), d4 = o(a, b, d);
  const e = 1e-6;
  return ((d1 > e && d2 < -e) || (d1 < -e && d2 > e)) && ((d3 > e && d4 < -e) || (d3 < -e && d4 > e));
}

function portPoint(b: LaidNode, side: Side, offset: number): Point {
  if (side === 0) return { x: b.cx + b.w / 2, y: b.cy + offset };
  if (side === 2) return { x: b.cx - b.w / 2, y: b.cy + offset };
  if (side === 1) return { x: b.cx + offset, y: b.cy + b.h / 2 };
  return { x: b.cx + offset, y: b.cy - b.h / 2 };
}
const stubOf = (p: Point, side: Side, len = STUB): Point => ({ x: key(p.x + DX[side] * len), y: key(p.y + DY[side] * len) });

/** Penalty for leaving (or entering) a box by a side that does not face the other end. */
function sidePenalty(from: LaidNode, to: LaidNode, side: Side): number {
  const vx = to.cx - from.cx, vy = to.cy - from.cy, len = Math.hypot(vx, vy) || 1;
  const dot = (DX[side] * vx + DY[side] * vy) / len;
  return dot >= 0 ? 0 : dot > -0.3 ? 60 : 400;
}

class Heap {
  private k: number[] = []; private v: number[] = [];
  get size() { return this.k.length; }
  push(cost: number, id: number) {
    const k = this.k, v = this.v; let i = k.length; k.push(cost); v.push(id);
    while (i > 0) { const p = (i - 1) >> 1; if (k[p] <= cost) break; k[i] = k[p]; v[i] = v[p]; i = p; }
    k[i] = cost; v[i] = id;
  }
  pop(): [number, number] {
    const k = this.k, v = this.v; const top: [number, number] = [k[0], v[0]];
    const lk = k.pop()!, lv = v.pop()!;
    if (k.length) {
      let i = 0; const n = k.length;
      for (;;) { const l = 2 * i + 1; if (l >= n) break; const c = l + 1 < n && k[l + 1] < k[l] ? l + 1 : l; if (k[c] >= lk) break; k[i] = k[c]; v[i] = v[c]; i = c; }
      k[i] = lk; v[i] = lv;
    }
    return top;
  }
}

type Grid = {
  xs: number[]; ys: number[]; nx: number; ny: number;
  xi: Map<number, number>; yi: Map<number, number>;
  /** For the unit edge from point (i, j) to (i+1, j) [h] or (i, j+1) [v]: boxes whose hard and soft zones it enters. */
  hHard: Array<number[] | null>; hSoft: Array<number[] | null>; vHard: Array<number[] | null>; vSoft: Array<number[] | null>;
  /** Committed routes: grid points passed through by a horizontal or vertical run, and unit edges used. */
  hOcc: Uint16Array; vOcc: Uint16Array; hUse: Uint16Array; vUse: Uint16Array;
  /** Unit edges within a few pixels of a committed parallel run: following one draws a double line. */
  hNear: Uint16Array; vNear: Uint16Array;
};

/**
 * Grid lines: every required one (ports, stubs, box edges and centres), and each optional one (clearance lines,
 * channel middles, the outer ring) only if no line is already there.
 */
function lines(required: number[], optional: number[]): number[] {
  const kept = [...new Set(required.map(key))].sort((a, b) => a - b);
  for (const v of [...new Set(optional.map(key))].sort((a, b) => a - b)) {
    if (kept.every((k) => Math.abs(k - v) >= 1)) kept.push(v);
  }
  return kept.sort((a, b) => a - b);
}

function buildGrid(boxes: LaidNode[], extraX: number[], extraY: number[]): Grid {
  const baseX: number[] = [], baseY: number[] = [];
  for (const b of boxes) { const r = rectOf(b, M); baseX.push(r.l, r.r); baseY.push(r.t, r.b); }
  const mids = (vals: number[]) => {
    const s = [...new Set(vals.map(key))].sort((a, b) => a - b); const out: number[] = [];
    for (let i = 1; i < s.length; i++) if (s[i] - s[i - 1] > 4) out.push((s[i] + s[i - 1]) / 2);
    return out;
  };
  const minX = Math.min(...baseX), maxX = Math.max(...baseX), minY = Math.min(...baseY), maxY = Math.max(...baseY);
  const xs = lines(extraX, [...baseX, ...mids(baseX), minX - M, maxX + M]);
  const ys = lines(extraY, [...baseY, ...mids(baseY), minY - M, maxY + M]);
  const nx = xs.length, ny = ys.length;
  const hard = boxes.map((b) => rectOf(b, 3)), soft = boxes.map((b) => rectOf(b, M));
  // Only boxes whose band contains a grid line can be entered along it.
  const rowBoxes = ys.map((y) => soft.map((r, k) => (y > r.t && y < r.b ? k : -1)).filter((k) => k >= 0));
  const colBoxes = xs.map((x) => soft.map((r, k) => (x > r.l && x < r.r ? k : -1)).filter((k) => k >= 0));
  const zone = (p: Point, q: Point, rs: Rect[], cand: number[]) => { let out: number[] | null = null; for (const k of cand) if (segmentHitsRect(p, q, rs[k])) (out ??= []).push(k); return out; };
  const hHard: Grid["hHard"] = new Array(nx * ny).fill(null), hSoft: Grid["hSoft"] = new Array(nx * ny).fill(null);
  const vHard: Grid["vHard"] = new Array(nx * ny).fill(null), vSoft: Grid["vSoft"] = new Array(nx * ny).fill(null);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const id = j * nx + i, p = { x: xs[i], y: ys[j] };
    if (i + 1 < nx) { const q = { x: xs[i + 1], y: ys[j] }; hHard[id] = zone(p, q, hard, rowBoxes[j]); hSoft[id] = zone(p, q, soft, rowBoxes[j]); }
    if (j + 1 < ny) { const q = { x: xs[i], y: ys[j + 1] }; vHard[id] = zone(p, q, hard, colBoxes[i]); vSoft[id] = zone(p, q, soft, colBoxes[i]); }
  }
  return {
    xs, ys, nx, ny, xi: new Map(xs.map((v, i) => [v, i])), yi: new Map(ys.map((v, i) => [v, i])),
    hHard, hSoft, vHard, vSoft,
    hOcc: new Uint16Array(nx * ny), vOcc: new Uint16Array(nx * ny), hUse: new Uint16Array(nx * ny), vUse: new Uint16Array(nx * ny),
    hNear: new Uint16Array(nx * ny), vNear: new Uint16Array(nx * ny),
  };
}

type End = { side: Side; port: Point; stub: Point; cost: number };

/** Shortest orthogonal route on the grid from any start stub to any goal stub, or null if a stub is off the grid. */
function search(g: Grid, starts: End[], goals: End[], own: [number, number], exempt: Rect[] = []): { pts: Point[]; s: End; t: End; cost: number } | null {
  const { nx, ny, xs, ys } = g;
  // Grid points where other routes cost nothing to cross or follow: round this route's own boxes in the first pass,
  // where every route on a side shares that side's middle port.
  const free = new Uint8Array(nx * ny);
  for (const r of exempt) for (let j = 0; j < ny; j++) if (ys[j] >= r.t && ys[j] <= r.b) for (let i = 0; i < nx; i++) if (xs[i] >= r.l && xs[i] <= r.r) free[j * nx + i] = 1;
  // A* with the Manhattan distance to the nearest goal, which never overestimates: every move costs at least its length.
  const hOf = new Float64Array(nx * ny);
  const goalPts = goals.map((t) => t.stub);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    let h = Infinity;
    for (const q of goalPts) h = Math.min(h, Math.abs(xs[i] - q.x) + Math.abs(ys[j] - q.y));
    hOf[j * nx + i] = h;
  }
  const N = nx * ny * 4;
  const dist = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1);
  const heap = new Heap();
  const startOf = new Map<number, End>();
  for (const s of starts) {
    const i = g.xi.get(key(s.stub.x)), j = g.yi.get(key(s.stub.y));
    if (i === undefined || j === undefined) continue;
    const st = (j * nx + i) * 4 + s.side;
    if (s.cost < dist[st]) { dist[st] = s.cost; startOf.set(st, s); heap.push(s.cost + hOf[j * nx + i], st); }
  }
  const goalAt = new Map<number, End[]>();
  for (const t of goals) {
    const i = g.xi.get(key(t.stub.x)), j = g.yi.get(key(t.stub.y));
    if (i === undefined || j === undefined) continue;
    const id = j * nx + i; goalAt.set(id, [...(goalAt.get(id) ?? []), t]);
  }
  let best = Infinity, bestState = -1, bestGoal: End | null = null;
  const edgeCost = (hard: number[] | null, soft: number[] | null, len: number) => {
    let c = 0;
    if (hard) c += BOX * hard.length;
    if (soft) for (const b of soft) if (b !== own[0] && b !== own[1]) c += NEAR * len;
    return c;
  };
  while (heap.size) {
    const [f, st] = heap.pop();
    const pid = st >> 2, d = st & 3, i = pid % nx, j = (pid - i) / nx;
    const c = dist[st];
    if (f > c + hOf[pid] + 1e-6) continue;
    if (f >= best) break;
    const gl = goalAt.get(pid);
    if (gl) for (const t of gl) {
      // Arrive heading into the box (straight on), or turn into it at the stub; never from inside the box.
      if (d === t.side) continue;
      const fc = c + t.cost + (d === ((t.side + 2) & 3) ? 0 : BEND);
      if (fc < best) { best = fc; bestState = st; bestGoal = t; }
    }
    for (let turn = 0; turn < 3; turn++) {
      const nd = turn === 0 ? d : turn === 1 ? (d + 1) & 3 : (d + 3) & 3;
      const ni = i + DX[nd], nj = j + DY[nd];
      if (ni < 0 || nj < 0 || ni >= nx || nj >= ny) continue;
      const npid = nj * nx + ni;
      let cost: number, len: number;
      if (nd === 0 || nd === 2) {
        const eid = nd === 0 ? pid : npid; len = Math.abs(xs[ni] - xs[i]);
        cost = len + edgeCost(g.hHard[eid], g.hSoft[eid], len) + (free[pid] && free[npid] ? 0 : OVERLAP * len * (g.hUse[eid] + g.hNear[eid]) + CROSS * g.vOcc[npid]);
      } else {
        const eid = nd === 1 ? pid : npid; len = Math.abs(ys[nj] - ys[j]);
        cost = len + edgeCost(g.vHard[eid], g.vSoft[eid], len) + (free[pid] && free[npid] ? 0 : OVERLAP * len * (g.vUse[eid] + g.vNear[eid]) + CROSS * g.hOcc[npid]);
      }
      if (nd !== d) cost += BEND;
      const ns = npid * 4 + nd, nc = c + cost;
      if (nc < dist[ns]) { dist[ns] = nc; prev[ns] = st; heap.push(nc + hOf[npid], ns); }
    }
  }
  if (bestState < 0 || !bestGoal) return null;
  const rev: Point[] = [];
  let st = bestState, first = st;
  while (st >= 0) { const pid = st >> 2, i = pid % nx, j = (pid - i) / nx; rev.push({ x: xs[i], y: ys[j] }); first = st; st = prev[st]; }
  const s = startOf.get(first);
  if (!s) return null;
  return { pts: rev.reverse(), s, t: bestGoal, cost: best };
}

function simplify(pts: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of pts) {
    if (out.length && Math.abs(out[out.length - 1].x - p.x) < 0.01 && Math.abs(out[out.length - 1].y - p.y) < 0.01) continue;
    if (out.length >= 2) {
      const a = out[out.length - 2], b = out[out.length - 1];
      if ((Math.abs(a.x - b.x) < 0.01 && Math.abs(b.x - p.x) < 0.01) || (Math.abs(a.y - b.y) < 0.01 && Math.abs(b.y - p.y) < 0.01)) { out[out.length - 1] = p; continue; }
    }
    out.push(p);
  }
  return out;
}

/** Record a committed route on the grid so later routes pay for crossing or running along it. */
function commit(g: Grid, pts: Point[], delta = 1) {
  for (let k = 0; k + 1 < pts.length; k++) {
    const p = pts[k], q = pts[k + 1];
    const i0 = g.xi.get(key(p.x)), j0 = g.yi.get(key(p.y)), i1 = g.xi.get(key(q.x)), j1 = g.yi.get(key(q.y));
    if (i0 === undefined || j0 === undefined || i1 === undefined || j1 === undefined) continue;
    if (j0 === j1) {
      const a = Math.min(i0, i1), b = Math.max(i0, i1);
      for (let i = a; i <= b; i++) g.hOcc[j0 * g.nx + i] += delta;
      for (let i = a; i < b; i++) g.hUse[j0 * g.nx + i] += delta;
      for (let j = j0 - 1; j >= 0 && g.ys[j0] - g.ys[j] < NEAR_PX; j--) for (let i = a; i < b; i++) g.hNear[j * g.nx + i] += delta;
      for (let j = j0 + 1; j < g.ny && g.ys[j] - g.ys[j0] < NEAR_PX; j++) for (let i = a; i < b; i++) g.hNear[j * g.nx + i] += delta;
    } else if (i0 === i1) {
      const a = Math.min(j0, j1), b = Math.max(j0, j1);
      for (let j = a; j <= b; j++) g.vOcc[j * g.nx + i0] += delta;
      for (let j = a; j < b; j++) g.vUse[j * g.nx + i0] += delta;
      for (let i = i0 - 1; i >= 0 && g.xs[i0] - g.xs[i] < NEAR_PX; i--) for (let j = a; j < b; j++) g.vNear[j * g.nx + i] += delta;
      for (let i = i0 + 1; i < g.nx && g.xs[i] - g.xs[i0] < NEAR_PX; i++) for (let j = a; j < b; j++) g.vNear[j * g.nx + i] += delta;
    }
  }
}

/** Fallback when the grid offers nothing: a horizontal-vertical-horizontal route between the two stubs. */
function fallback(s: End, t: End): Point[] {
  const mx = (s.stub.x + t.stub.x) / 2;
  return [s.stub, { x: mx, y: s.stub.y }, { x: mx, y: t.stub.y }, t.stub];
}

/** SVG path through the points, with rounded corners clamped to the segments either side. */
export function roundedPath(pts: Point[], radius = R, endStraight = 12): string {
  if (pts.length < 2) return "";
  const f = (v: number) => String(r1(v));
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let k = 1; k < pts.length - 1; k++) {
    const a = pts[k - 1], p = pts[k], b = pts[k + 1];
    const la = Math.hypot(p.x - a.x, p.y - a.y), lb = Math.hypot(b.x - p.x, b.y - p.y);
    let r = Math.min(radius, la / 2, lb / 2);
    if (k === pts.length - 2) r = Math.min(r, Math.max(0, lb - endStraight));
    if (k === 1) r = Math.min(r, Math.max(0, la - 4));
    if (r < 0.5) { d += `L${f(p.x)} ${f(p.y)}`; continue; }
    const ux = (p.x - a.x) / la, uy = (p.y - a.y) / la, vx = (b.x - p.x) / lb, vy = (b.y - p.y) / lb;
    d += `L${f(p.x - ux * r)} ${f(p.y - uy * r)}Q${f(p.x)} ${f(p.y)} ${f(p.x + vx * r)} ${f(p.y + vy * r)}`;
  }
  const z = pts[pts.length - 1];
  return d + `L${f(z.x)} ${f(z.y)}`;
}

function midpoint(pts: Point[]): { mid: Point; midDir: "h" | "v" } {
  let total = 0;
  for (let k = 0; k + 1 < pts.length; k++) total += Math.hypot(pts[k + 1].x - pts[k].x, pts[k + 1].y - pts[k].y);
  // The longest segment is the most readable place for a label; use its middle, else the route's halfway point.
  let bestK = 0, bestL = -1;
  for (let k = 0; k + 1 < pts.length; k++) { const l = Math.hypot(pts[k + 1].x - pts[k].x, pts[k + 1].y - pts[k].y); if (l > bestL + 0.01) { bestL = l; bestK = k; } }
  if (bestL < total * 0.25) {
    let acc = 0;
    for (let k = 0; k + 1 < pts.length; k++) {
      const l = Math.hypot(pts[k + 1].x - pts[k].x, pts[k + 1].y - pts[k].y);
      if (acc + l >= total / 2) { bestK = k; break; }
      acc += l;
    }
  }
  const a = pts[bestK], b = pts[bestK + 1];
  return { mid: { x: r1((a.x + b.x) / 2), y: r1((a.y + b.y) / 2) }, midDir: Math.abs(a.y - b.y) < 0.01 ? "h" : "v" };
}

/** Offset interior segments that share a channel with another route's, so parallel runs do not lie on top of each other. */
function spreadParallels(routes: Array<Point[] | null>, boxes: LaidNode[]) {
  type Seg = { e: number; k: number; horiz: boolean; c: number; a: number; b: number };
  const segs: Seg[] = [];
  routes.forEach((pts, e) => {
    if (!pts) return;
    for (let k = 1; k + 2 < pts.length; k++) {
      const p = pts[k], q = pts[k + 1], horiz = Math.abs(p.y - q.y) < 0.01;
      segs.push({ e, k, horiz, c: horiz ? p.y : p.x, a: horiz ? Math.min(p.x, q.x) : Math.min(p.y, q.y), b: horiz ? Math.max(p.x, q.x) : Math.max(p.y, q.y) });
    }
  });
  const hard = boxes.map((b) => rectOf(b, 3));
  const groups = new Map<string, Seg[]>();
  for (const s of segs) { const k = `${s.horiz ? "h" : "v"}${key(s.c)}`; groups.set(k, [...(groups.get(k) ?? []), s]); }
  const SPREAD = 7;
  for (const k of [...groups.keys()].sort()) {
    const list = groups.get(k)!.sort((x, y) => x.a - y.a || x.e - y.e);
    // Clusters of segments from different routes whose extents overlap.
    const clusters: Seg[][] = [];
    for (const s of list) {
      const c = clusters.find((cl) => cl.some((o) => o.e !== s.e && Math.min(o.b, s.b) - Math.max(o.a, s.a) > 1));
      if (c) c.push(s); else clusters.push([s]);
    }
    for (const cl of clusters) {
      if (cl.length < 2) continue;
      // Order across the channel by where each route comes from, so the offsets do not add crossings.
      const from = (s: Seg) => { const p = routes[s.e]![s.k - 1]; return s.horiz ? p.y : p.x; };
      cl.sort((x, y) => from(x) - from(y) || x.e - y.e);
      cl.forEach((s, idx) => {
        const off = (idx - (cl.length - 1) / 2) * SPREAD;
        if (Math.abs(off) < 0.01) return;
        const pts = routes[s.e]!;
        const moved = pts.map((p) => ({ ...p }));
        for (const m of [s.k, s.k + 1]) { if (s.horiz) moved[m].y = r1(moved[m].y + off); else moved[m].x = r1(moved[m].x + off); }
        // Keep it only if no segment it touches now enters a box or folds back on itself, and the end stubs stay long enough.
        let ok = true;
        for (let m = Math.max(0, s.k - 1); m <= Math.min(pts.length - 2, s.k + 1); m++) {
          const p = moved[m], q = moved[m + 1];
          if (hard.some((r) => segmentHitsRect(p, q, r))) ok = false;
          const before = Math.hypot(pts[m + 1].x - pts[m].x, pts[m + 1].y - pts[m].y), after = Math.hypot(q.x - p.x, q.y - p.y);
          const op = pts[m + 1].x - pts[m].x, oq = q.x - p.x, opy = pts[m + 1].y - pts[m].y, oqy = q.y - p.y;
          if (op * oq < 0 || opy * oqy < 0 || after < 4) ok = false;
          if ((m === 0 || m === pts.length - 2) && after < Math.min(before, STUB - 2)) ok = false;
        }
        if (ok) routes[s.e] = moved;
      });
    }
  }
}

/**
 * Straighten small Z-shaped jogs: where a short segment joins two parallel runs heading the same way, move one of the
 * runs onto the other's line, if that enters no box and crosses no more routes. The end segments at ports stay put.
 */
function removeJogs(routes: Array<Point[] | null>, boxes: LaidNode[]) {
  const hard = boxes.map((b) => rectOf(b, 3));
  const crossingsOf = (pts: Point[], self: number) => {
    let n = 0;
    routes.forEach((o, e) => {
      if (!o || e === self) return;
      for (let i = 0; i + 1 < pts.length; i++) for (let j = 0; j + 1 < o.length; j++) if (segmentsCross(pts[i], pts[i + 1], o[j], o[j + 1])) n++;
    });
    return n;
  };
  const len = (p: Point, q: Point) => Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
  routes.forEach((start, e) => {
    if (!start) return;
    let pts = start;
    for (let k = 1; k + 2 < pts.length; k++) {
      const a = pts[k - 1], b = pts[k], c = pts[k + 1], d = pts[k + 2];
      const horizRuns = Math.abs(a.y - b.y) < 0.01 && Math.abs(c.y - d.y) < 0.01;
      const vertRuns = Math.abs(a.x - b.x) < 0.01 && Math.abs(c.x - d.x) < 0.01;
      if (!horizRuns && !vertRuns) continue;
      const sameWay = horizRuns ? Math.sign(b.x - a.x) === Math.sign(d.x - c.x) : Math.sign(b.y - a.y) === Math.sign(d.y - c.y);
      const tries: Point[][] = [];
      if (sameWay) {
        // A Z: only a short middle step is a jog worth removing.
        if (len(b, c) >= 2 * R + 2) continue;
        // Move the run before the jog onto the line of the run after it (not the first segment, which leaves a port),
        // or the run after it onto the line of the run before it (not the last segment, which enters a port).
        if (k - 1 >= 1) tries.push(pts.map((p, i) => (i === k - 1 || i === k ? (horizRuns ? { x: p.x, y: c.y } : { x: c.x, y: p.y }) : p)));
        if (k + 2 <= pts.length - 2) tries.push(pts.map((p, i) => (i === k + 1 || i === k + 2 ? (horizRuns ? { x: p.x, y: b.y } : { x: b.x, y: p.y }) : p)));
      } else {
        // A U: pull the middle segment back so the shorter arm disappears, where that arm is not a port's segment.
        const along = (p: Point) => (horizRuns ? p.x : p.y);
        const armA = Math.abs(along(b) - along(a)), armB = Math.abs(along(d) - along(c));
        const to = armB <= armA ? along(d) : along(a);
        const ok = armB <= armA ? k + 2 <= pts.length - 2 : k - 1 >= 1;
        if (ok) tries.push(pts.map((p, i) => (i === k || i === k + 1 ? (horizRuns ? { x: to, y: p.y } : { x: p.x, y: to }) : p)));
      }
      if (!tries.length) continue;
      const before = crossingsOf(pts, e);
      for (const t of tries) {
        const s = simplify(t);
        if (s.length < 2) continue;
        let ok = true;
        for (let i = 0; i + 1 < s.length && ok; i++) if (hard.some((r) => segmentHitsRect(s[i], s[i + 1], r))) ok = false;
        // The segments at the ports must stay long enough for an arrowhead and the stub.
        if (ok && (len(s[0], s[1]) < 6 || len(s[s.length - 2], s[s.length - 1]) < 14)) ok = false;
        if (ok && crossingsOf(s, e) > before) ok = false;
        if (ok) { pts = s; routes[e] = s; k = 0; break; }
      }
    }
  });
}

type Routed = { routes: Array<Point[] | null>; ends: Array<[End, End] | null>; sides: Array<[Side, Side] | null> };

/** Route every edge between laid-out boxes. `mode` picks how ports sharing a side are ordered. */
function routeAll(boxes: LaidNode[], edges: RoutingEdge[], valid: Array<[number, number] | null>, order: number[], mode: "turn" | "geo"): Routed {
    // Stubs facing a near box are shortened to half the gap, so the two never overlap.
    const stubLen = boxes.map((b, i) => ([0, 1, 2, 3] as Side[]).map((side) => {
      const me = rectOf(b);
      let gap = Infinity;
      boxes.forEach((o, j) => {
        if (j === i) return;
        const r = rectOf(o);
        const across = side === 0 || side === 2 ? Math.min(me.b, r.b) - Math.max(me.t, r.t) : Math.min(me.r, r.r) - Math.max(me.l, r.l);
        if (across <= -M) return;
        const d = side === 0 ? r.l - me.r : side === 2 ? me.l - r.r : side === 1 ? r.t - me.b : me.t - r.b;
        if (d >= 0) gap = Math.min(gap, d);
      });
      return gap < 2 * STUB + 4 ? Math.max(6, Math.floor(gap / 2 - 1)) : STUB;
    }));
    const endAt = (ni: number, side: Side, offset: number, cost: number): End => {
      const port = portPoint(boxes[ni], side, offset);
      return { side, port, stub: stubOf(port, side, stubLen[ni][side]), cost };
    };

    // Pass 1: choose sides, with every port at the middle of its side. Route everything, then route each edge again
    // against all the others, so an early edge can move out of the way of later ones.
    const centreEnds = (from: number, to: number): End[] => ([0, 1, 2, 3] as Side[]).map((side) => endAt(from, side, 0, sidePenalty(boxes[from], boxes[to], side)));
    const g1 = buildGrid(boxes,
      boxes.flatMap((b, i) => [b.cx, b.cx - b.w / 2, b.cx + b.w / 2, b.cx - b.w / 2 - stubLen[i][2], b.cx + b.w / 2 + stubLen[i][0]]),
      boxes.flatMap((b, i) => [b.cy, b.cy - b.h / 2, b.cy + b.h / 2, b.cy - b.h / 2 - stubLen[i][3], b.cy + b.h / 2 + stubLen[i][1]]));
    const sides: Array<[Side, Side] | null> = edges.map(() => null);
    const first: Array<Point[] | null> = edges.map(() => null);
    for (let round = 0; round < 2; round++) for (const e of order) {
      const [a, b] = valid[e]!;
      if (first[e]) commit(g1, first[e]!, -1);
      const r = search(g1, centreEnds(a, b), centreEnds(b, a), [a, b], [rectOf(boxes[a], STUB + 1), rectOf(boxes[b], STUB + 1)]);
      if (r) { sides[e] = [r.s.side, r.t.side]; first[e] = [r.s.port, ...r.pts, r.t.port]; commit(g1, first[e]!); }
      else if (!sides[e]) {
        const sa = centreEnds(a, b).sort((x, y) => x.cost - y.cost)[0], sb = centreEnds(b, a).sort((x, y) => x.cost - y.cost)[0];
        sides[e] = [sa.side, sb.side];
      }
    }

    // Spread the ports that share a side. Routes heading towards one end of the side take the ports at that end, the
    // one turning nearest the box outermost, so their first bends nest instead of crossing. Which way a route heads is
    // read from its last routing ("turn") or from where its other end lies ("geo"); neither is always better.
    const assignPorts = () => {
      const usage = new Map<string, Array<{ e: number; end: 0 | 1 }>>();
      order.forEach((e) => {
        const [a, b] = valid[e]!, [sa, sb] = sides[e]!;
        usage.set(`${a}:${sa}`, [...(usage.get(`${a}:${sa}`) ?? []), { e, end: 0 }]);
        usage.set(`${b}:${sb}`, [...(usage.get(`${b}:${sb}`) ?? []), { e, end: 1 }]);
      });
      const turn = (u: { e: number; end: 0 | 1 }, horizontalSide: boolean): [number, number] => {
        const pts = first[u.e];
        if (!pts) return [0, 0];
        const seq = u.end === 0 ? pts : [...pts].reverse();
        const along = (p: Point) => (horizontalSide ? p.x : p.y), out = (p: Point) => (horizontalSide ? p.y : p.x);
        for (let k = 1; k < seq.length; k++) {
          const d = along(seq[k]) - along(seq[0]);
          if (Math.abs(d) > 0.5) return [Math.sign(d), Math.abs(out(seq[k - 1]) - out(seq[0]))];
        }
        return [0, 0];
      };
      const offsets: Array<[number, number]> = edges.map(() => [0, 0]);
      for (const [k, list] of [...usage.entries()].sort((x, y) => (x[0] < y[0] ? -1 : 1))) {
        const [ni, sideS] = k.split(":").map(Number);
        const box = boxes[ni], horizontalSide = sideS === 1 || sideS === 3;
        const other = (u: { e: number; end: 0 | 1 }) => boxes[valid[u.e]![u.end === 0 ? 1 : 0]];
        // Where the other end lies along this side: -1 or +1 beyond either end of the side, 0 facing it; and how far.
        const geo = (u: { e: number; end: 0 | 1 }): [number, number] => {
          const o = other(u);
          const c = horizontalSide ? box.cx : box.cy, oc = horizontalSide ? o.cx : o.cy;
          const half = (horizontalSide ? box.w : box.h) / 2, ohalf = (horizontalSide ? o.w : o.h) / 2;
          if (Math.abs(oc - c) < half + ohalf - 2 * PORT_INSET) return [0, oc - c];
          return [Math.sign(oc - c), Math.abs(oc - c)];
        };
        list.sort((x, y) => {
          const [dx, lx] = mode === "geo" ? geo(x) : turn(x, horizontalSide), [dy, ly] = mode === "geo" ? geo(y) : turn(y, horizontalSide);
          if (dx !== dy) return dx - dy;
          if (mode === "geo" && dx === 0) { if (Math.abs(lx - ly) > 0.5) return lx - ly; }
          else if (dx !== 0 && Math.abs(lx - ly) > 0.5) return dx < 0 ? lx - ly : ly - lx;
          const ox = other(x), oy = other(y);
          return (horizontalSide ? ox.cx - oy.cx : ox.cy - oy.cy) || x.end - y.end || x.e - y.e;
        });
        const L = horizontalSide ? box.w : box.h;
        const gap = list.length > 1 ? Math.min(18, (L - 2 * PORT_INSET) / (list.length - 1)) : 0;
        list.forEach((u, i) => { offsets[u.e][u.end] = key((i - (list.length - 1) / 2) * gap); });
      }
      // A lone port facing the other end: line it up with the port there, or both lone ports with each other where the two
      // sides overlap, so the edge is one straight segment instead of a small jog.
      const halfRange = (b: LaidNode, horizontalSide: boolean) => (horizontalSide ? b.w : b.h) / 2 - PORT_INSET;
      for (const e of order) {
        const [a, b] = valid[e]!, [sa, sb] = sides[e]!;
        if (sb !== ((sa + 2) & 3)) continue;
        const loneA = usage.get(`${a}:${sa}`)!.length === 1, loneB = usage.get(`${b}:${sb}`)!.length === 1;
        if (!loneA && !loneB) continue;
        const A = boxes[a], B = boxes[b], horizontalSide = sa === 1 || sa === 3;
        const ca = horizontalSide ? A.cx : A.cy, cb = horizontalSide ? B.cx : B.cy, ha = halfRange(A, horizontalSide), hb = halfRange(B, horizontalSide);
        if (loneA && loneB) {
          const lo = Math.max(ca - ha, cb - hb), hi = Math.min(ca + ha, cb + hb);
          if (lo > hi) continue;
          const v = key(Math.min(hi, Math.max(lo, (ca + cb) / 2)));
          offsets[e] = [v - ca, v - cb];
        } else if (loneA) {
          const v = cb + offsets[e][1];
          if (Math.abs(v - ca) <= ha) offsets[e][0] = key(v - ca);
        } else {
          const v = ca + offsets[e][0];
          if (Math.abs(v - cb) <= hb) offsets[e][1] = key(v - cb);
        }
      }
      return offsets;
    };

    // Pass 2: route every edge to its own ports, in two rounds. While it may, a route can also move to another side of
    // either box at a cost; if any does, the ports are spread again and everything is routed again.
    const SWITCH = 150;
    const gx = boxes.flatMap((b, i) => [b.cx, b.cx - b.w / 2, b.cx + b.w / 2, b.cx - b.w / 2 - stubLen[i][2], b.cx + b.w / 2 + stubLen[i][0]]);
    const gy = boxes.flatMap((b, i) => [b.cy, b.cy - b.h / 2, b.cy + b.h / 2, b.cy - b.h / 2 - stubLen[i][3], b.cy + b.h / 2 + stubLen[i][1]]);
    let ends: Array<[End, End] | null> = [];
    let mids: Array<Point[] | null> = [];
    const ITERS = 4;
    for (let iter = 0; iter < ITERS; iter++) {
      const flexible = iter < ITERS - 1;
      const offsets = assignPorts();
      ends = edges.map((_, e) => {
        if (!valid[e]) return null;
        const [a, b] = valid[e]!, [sa, sb] = sides[e]!;
        return [endAt(a, sa, offsets[e][0], 0), endAt(b, sb, offsets[e][1], 0)] as [End, End];
      });
      const exX = [...gx], exY = [...gy];
      for (const en of ends) if (en) for (const t of en) { exX.push(t.port.x, t.stub.x); exY.push(t.port.y, t.stub.y); }
      const g2 = buildGrid(boxes, exX, exY);
      mids = edges.map(() => null);
      const full = (e: number) => [ends[e]![0].port, ...mids[e]!, ends[e]![1].port];
      let changed = false;
      for (let round = 0; round < 2; round++) for (const e of order) {
        const [a, b] = valid[e]!;
        if (mids[e]) commit(g2, full(e), -1);
        const alt = (from: number, to: number, own: End) => [own, ...([0, 1, 2, 3] as Side[]).filter((sd) => sd !== own.side).map((sd) => endAt(from, sd, 0, SWITCH + sidePenalty(boxes[from], boxes[to], sd)))];
        const r = search(g2, flexible ? alt(a, b, ends[e]![0]) : [ends[e]![0]], flexible ? alt(b, a, ends[e]![1]) : [ends[e]![1]], [a, b]);
        if (r) {
          if (r.s.side !== ends[e]![0].side || r.t.side !== ends[e]![1].side) { changed = true; sides[e] = [r.s.side, r.t.side]; ends[e] = [r.s, r.t]; }
          mids[e] = r.pts;
        } else if (!mids[e]) mids[e] = fallback(ends[e]![0], ends[e]![1]);
        commit(g2, full(e));
      }
      order.forEach((e) => { first[e] = full(e); });
      if (!changed && !flexible) break;
      if (!changed) iter = ITERS - 2;
    }
    const routes: Array<Point[] | null> = mids.map((m, e) => (m ? simplify([ends[e]![0].port, ...m, ends[e]![1].port]) : null));
    spreadParallels(routes, boxes);
    removeJogs(routes, boxes);
  return { routes, ends, sides };
}

/** What a routing costs to read, on the same scale as the search: crossings, bends and length. */
function routingCost(r: Routed): number {
  let c = 0;
  r.routes.forEach((pts, e) => {
    if (!pts) return;
    c += BEND * (pts.length - 2);
    for (let k = 0; k + 1 < pts.length; k++) c += Math.abs(pts[k + 1].x - pts[k].x) + Math.abs(pts[k + 1].y - pts[k].y);
    for (let f = e + 1; f < r.routes.length; f++) {
      const o = r.routes[f];
      if (o) for (let i = 0; i + 1 < pts.length; i++) for (let j = 0; j + 1 < o.length; j++) if (segmentsCross(pts[i], pts[i + 1], o[j], o[j + 1])) c += CROSS;
    }
  });
  return c;
}

/** Lay out a pathway diagram: box sizes and positions, routed edges, and the fitted canvas. */
export function layoutPathway(nodes: RoutingNode[], edges: RoutingEdge[]): PathwayLayout {
  const boxes = sizeBoxes(nodes);
  separate(boxes);
  const idx = new Map(boxes.map((b, i) => [b.id, i]));
  const valid = edges.map((e) => { const a = idx.get(e.from), b = idx.get(e.to); return a !== undefined && b !== undefined && a !== b ? [a, b] as [number, number] : null; });
  // Route short edges first: they have the fewest options.
  const order = valid.map((v, i) => i).filter((i) => valid[i]).sort((x, y) => {
    const [a, b] = valid[x]!, [c, d] = valid[y]!;
    const lx = Math.abs(boxes[a].cx - boxes[b].cx) + Math.abs(boxes[a].cy - boxes[b].cy), ly = Math.abs(boxes[c].cx - boxes[d].cx) + Math.abs(boxes[c].cy - boxes[d].cy);
    return lx - ly || x - y;
  });

  // Two orderings of shared ports; keep whichever routing reads better (the first on a tie).
  const tried = (["turn", "geo"] as const).map((mode) => routeAll(boxes, edges, valid, order, mode));
  const costs = tried.map(routingCost);
  const { routes, ends, sides } = tried[costs[1] < costs[0] ? 1 : 0];

  const laid: Array<LaidEdge | null> = routes.map((pts, e) => {
    if (!pts) return null;
    const [, t] = ends[e]!;
    const out = pts.map((p) => ({ x: r1(p.x), y: r1(p.y) }));
    const z = out[out.length - 1];
    out[out.length - 1] = { x: r1(z.x + DX[t.side] * END_GAP), y: r1(z.y + DY[t.side] * END_GAP) };
    return { points: out, d: roundedPath(out), ...midpoint(out), fromSide: sides[e]![0], toSide: sides[e]![1] };
  });

  // Fit the canvas to the boxes (with room above each for the product label) and the routes.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const b of boxes) { minX = Math.min(minX, b.cx - b.w / 2); maxX = Math.max(maxX, b.cx + b.w / 2); minY = Math.min(minY, b.cy - b.h / 2 - 18); maxY = Math.max(maxY, b.cy + b.h / 2); }
  for (const r of laid) if (r) for (const p of r.points) { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); }
  if (!boxes.length) { minX = 0; minY = 0; maxX = LEGEND_W; maxY = 0; }
  const P = 16;
  const x = Math.floor(minX - P), y = Math.floor(minY - P);
  const w = Math.ceil(Math.max(maxX + P - x, LEGEND_W + 2 * P));
  const legend = { x: x + P, y: Math.ceil(maxY + 34) };
  return { nodes: boxes, edges: laid, view: { x, y, w, h: legend.y + 14 - y }, legend };
}

/** Diagnostics for a laid-out diagram: routes that enter a box other than their own ends, and edge-edge crossings. */
export function routingStats(layout: PathwayLayout, edges: RoutingEdge[]): { boxHits: number; crossings: number; overlaps: number } {
  const idx = new Map(layout.nodes.map((b, i) => [b.id, i]));
  const rects = layout.nodes.map((b) => rectOf(b));
  let boxHits = 0, crossings = 0, overlaps = 0;
  layout.edges.forEach((r, e) => {
    if (!r) return;
    const own = [idx.get(edges[e].from), idx.get(edges[e].to)];
    const hit = rects.some((rect, k) => !own.includes(k) && r.points.some((p, i) => i + 1 < r.points.length && segmentHitsRect(p, r.points[i + 1], rect)));
    if (hit) boxHits++;
  });
  for (let a = 0; a < layout.edges.length; a++) for (let b = a + 1; b < layout.edges.length; b++) {
    const A = layout.edges[a], B = layout.edges[b];
    if (!A || !B) continue;
    for (let i = 0; i + 1 < A.points.length; i++) for (let j = 0; j + 1 < B.points.length; j++)
      if (segmentsCross(A.points[i], A.points[i + 1], B.points[j], B.points[j + 1])) crossings++;
    for (let i = 0; i + 1 < A.points.length; i++) for (let j = 0; j + 1 < B.points.length; j++) if (collinearOverlap(A.points[i], A.points[i + 1], B.points[j], B.points[j + 1]) > 2) overlaps++;
  }
  return { boxHits, crossings, overlaps };
}
