import type { SearchDoc } from "./search-index";

/**
 * The first of the two search files, search-names.json beside search.json in the API: every document of search.json
 * with the two long fields left out (the TL;DR and the tags), so a reader typing a name gets an answer before the full
 * index arrives.
 *
 * Why: the owner searched for "Jaime Leandro Foundation" on 4 November 2026 and saw an empty list. The record ranked
 * first; search.json (9.5 MB, 2.1 MB over the wire) had not finished loading. This file is under half the bytes and
 * holds everything the ranking reads for a name (src/lib/search-rank.ts: name, aka and id are the indexed fields that
 * matter for a name; kind decides the tier; status, cancers, parent, portrait and cls are what the lists show), so the
 * header palette, the search box, the search page and the 404 helper answer from it, then re-run on search.json when
 * it lands.
 * scripts/search-health.test.ts runs the exact-name audit against an index built from this file too.
 *
 * No heavy imports: the search client, which the root layout reaches, imports `fromNameDoc`.
 */
export type SearchNameDoc = Omit<SearchDoc, "tldr" | "tags">;

/** The fields search-names.json keeps, in this order. */
export const NAME_DOC_FIELDS = ["id", "kind", "name", "aka", "route", "status", "cancers", "parent", "portrait", "cls"] as const satisfies ReadonlyArray<keyof SearchNameDoc>;

/** One document as search-names.json ships it: the kept fields, and only those with a value. */
export function toNameDoc(d: SearchDoc): SearchNameDoc {
  const out: Record<string, unknown> = {};
  for (const k of NAME_DOC_FIELDS) { const v = d[k]; if (v !== undefined && v !== "") out[k] = v; }
  return out as SearchNameDoc;
}

/**
 * A name document as the browser indexes it: the two missing text fields empty, so it has SearchDoc's shape and the
 * lists can render it before the TL;DR arrives. An empty field adds no term, so the name, alias and id scores are the
 * ones the full index gives (MiniSearch scores each field against that field's own statistics).
 */
export function fromNameDoc(d: SearchNameDoc): SearchDoc {
  // `aka` is dropped from the file when empty (toNameDoc), so it is restored here.
  return { ...d, aka: d.aka ?? "", tldr: "", tags: "" };
}
