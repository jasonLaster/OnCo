/** Summarise the dates of successful snapshots, including older retained entries. */
export function registryDateRange(entries: Iterable<{ fetched: string }>): { oldest: string; newest: string } {
  let oldest = "", newest = "";
  for (const { fetched } of entries) {
    if (!fetched) continue;
    if (!oldest || fetched < oldest) oldest = fetched;
    if (fetched > newest) newest = fetched;
  }
  return { oldest, newest };
}

/**
 * A date, or a date with its oldest contributor, for text that follows the word "fetched".
 *
 * This said "between X and Y (dates differ by product)" when the two differed. Measured on the day it was
 * merged, that sentence would have appeared because 2 product snapshots out of 1,090 were a fortnight behind:
 * true that the dates differ, misleading about how many. A reader should be told the figures are current and
 * that something is lagging, not that the whole index is of uncertain vintage. So the newest date leads, and
 * the oldest follows it as the qualifier it is.
 */
export function registryDateLabel(oldest: string, newest: string): string {
  if (!newest) return "on an unknown date";
  if (!oldest || oldest === newest) return newest;
  return `${newest}, with the oldest from ${oldest}`;
}
