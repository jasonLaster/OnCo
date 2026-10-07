/** Adapted from Oncobase's MIT-licensed smart-table layout:
 * https://github.com/jasonLaster/oncobase/tree/main/packages/smart-table
 * See docs/licenses/oncobase-smart-table.txt. Keep compact values narrow and
 * give text the remaining space, using percentiles so one outlier cannot dominate.
 */
export type ColumnSize = { min: number; preferred: number; weight: number };
export const MIN_COLUMN_WIDTH = 56;
export const MAX_COLUMN_WIDTH = 2000;
export function clampColumnWidth(width: number) {
  return Math.round(Math.min(MAX_COLUMN_WIDTH, Math.max(MIN_COLUMN_WIDTH, width)));
}
const percentile = (values: number[], fraction: number) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.round((sorted.length - 1) * fraction)] ?? 0;
};
export function columnSize(texts: string[], widths: number[], tokens: number[], headerWidth: number): ColumnSize {
  const values = texts.filter(Boolean);
  const numeric = values.length > 0 && values.filter((s) => /^[\d\s,.%$€£()+\-/:]+$/.test(s)).length / values.length >= 0.7;
  const length = values.reduce((sum, s) => sum + s.length, 0) / Math.max(1, values.length);
  const kind = numeric ? "numeric" : length <= 16 ? "compact" : "text";
  const floor = kind === "numeric" ? 72 : kind === "compact" ? 96 : 144;
  const ceiling = kind === "numeric" ? 160 : kind === "compact" ? 240 : 420;
  const min = Math.ceil(Math.max(headerWidth, floor, Math.min(220, percentile(tokens, 0.9))));
  const preferred = Math.ceil(Math.max(min, Math.min(ceiling, percentile(widths, kind === "text" ? 0.74 : 0.82) * (kind === "text" ? 0.72 : 1))));
  return { min, preferred, weight: kind === "text" ? 1.4 + length / 40 : kind === "compact" ? 0.9 : 0.45 };
}
export function fitColumns(models: ColumnSize[], available: number, manual: Map<number, number> = new Map()): number[] {
  const widths = models.map((m, i) => manual.get(i) ?? m.min);
  let remaining = Math.max(0, Math.floor(available) - widths.reduce((a, b) => a + b, 0));
  // Allocate toward preferred widths first, then let text columns fill the card.
  for (const preferredOnly of [true, false]) {
    const eligible = models.map((m, i) => ({ m, i })).filter(({ m, i }) => !manual.has(i) && (!preferredOnly || widths[i] < m.preferred));
    let active = eligible;
    while (remaining > 0 && active.length) {
      const weight = active.reduce((sum, { m }) => sum + m.weight, 0);
      const budget = remaining;
      for (const { m, i } of active) {
        const share = Math.min(remaining, Math.max(1, Math.floor(budget * m.weight / weight)), preferredOnly ? m.preferred - widths[i] : Infinity);
        widths[i] += share;
        remaining -= share;
      }
      active = active.filter(({ m, i }) => !preferredOnly || widths[i] < m.preferred);
    }
  }
  return widths;
}
