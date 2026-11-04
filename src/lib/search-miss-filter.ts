/**
 * The privacy filter for the `search_miss` event (docs/SEARCH-MISSES.md). A query leaves the browser only if it is
 * short and shaped like the name of a thing: one to six words, at most 60 characters, and nothing that looks like a
 * person's own details. Anything doubtful is dropped, not cleaned: a lost miss costs one research lead, a leaked
 * health detail cannot be taken back. Kept apart from search-miss.ts so the PostHog filter (posthog.ts) can re-check
 * every event with it without pulling the rest into the root bundle.
 */

export const MISS_MIN_CHARS = 3;
export const MISS_MAX_CHARS = 60;
export const MISS_MAX_WORDS = 6;

const MONTH = "(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?";
const UNSAFE: readonly RegExp[] = [
  /@/, // an email address, or a handle
  /(?:https?:|www\.|\.com\b|\.org\b|\.co\.uk\b)/i, // a link, which can carry anything
  /\d{5,}/, // a long number: US ZIP, record number, phone fragment, id
  /\b\d{1,4}[/.-]\d{1,2}(?:[/.-]\d{1,4})?\b/, // a numeric date: 12/03, 2026-11-04, 4.11.26
  new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?\\s+${MONTH}(?=\\s|$)`, "i"), // 4 November
  new RegExp(`\\b${MONTH}\\s+\\d{1,4}\\b`, "i"), // November 4, Nov 2026
  /\b[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}\b/i, // a UK postcode: SW1A 1AA, M1 1AE
  /\b[a-z]\d[a-z]\s?\d[a-z]\d\b/i, // a Canadian postcode: K1A 0B1
  /\b(?:i|i'm|im|i've|ive|i'd|me|my|mine|myself|we|we're|our|ours|mum's|dad's)\b/i, // first person: "my", "I have"
  /\b(?:born|dob|aged?|years? old|yo)\b/i, // age and birth date
];

/** How many digits the query holds in all: a phone number split by spaces has no five-digit run. */
const digitCount = (s: string) => (s.match(/\d/g) ?? []).length;

/**
 * The query as it would be sent, or null if it must not be. Lowercased, accents and punctuation gone, one space
 * between words (the same folding as search-rank.ts normaliseName, repeated here so this file imports nothing).
 */
export function safeMissQuery(raw: string): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed.length < MISS_MIN_CHARS || trimmed.length > MISS_MAX_CHARS) return null;
  if (UNSAFE.some((re) => re.test(trimmed)) || digitCount(trimmed) >= 7) return null;
  const q = trimmed.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/(?<=[a-z0-9])[-−–](?=[a-z0-9])/g, " ")
    .replace(/[^a-z0-9+−-]+/g, " ")
    .trim();
  if (q.length < MISS_MIN_CHARS) return null;
  const words = q.split(" ").length;
  if (words > MISS_MAX_WORDS) return null;
  // The folding can join what the raw text kept apart; check the sent form too.
  if (UNSAFE.some((re) => re.test(q))) return null;
  return q;
}
