/**
 * The shape of a country deep dive written as data, for the wave 2 pages (/countries/au/, es, br, se, ch). Each
 * country file exports one CountryDive; src/components/CountryDeepDive.tsx renders it. The cards are hand-written
 * from the country's own sources, every card carries its links, and the entity id lists are resolved from the graph
 * on the page so they stay in step with the corpus.
 *
 * Wave 1 pages (de, gb, jp, il, ru, us) predate this and keep their own page components.
 */
export type CountryLink = { label: string; url: string };

export type CountryCard = { id: string; title: string; plain: string; detail: string; links: CountryLink[] };

/** A small hand-built table read from one named source, such as a registry's headline counts. */
export type DiveTable = {
  id: string;
  title: string;
  /** One line under the title: what the numbers are, the year and the unit. */
  caption: string;
  columns: Array<{ key: string; label: string; numeric?: boolean }>;
  rows: Array<Record<string, string | number | null>>;
  /** What the table does and does not count, in a sentence or two. */
  note: string;
  sources: CountryLink[];
};

export type DiveSection = {
  id: string;
  /** Short label for the section chips at the top of the page. */
  nav: string;
  title: string;
  aside?: CountryLink;
  cards: CountryCard[];
  tables?: DiveTable[];
};

export type CountryDive = {
  iso2: string;
  /** GLOBOCAN country code, e.g. "AUS". */
  iso3: string;
  name: string;
  flag: string;
  asOf: string;
  /** Page metadata. */
  title: string;
  description: string;
  /** The opening sentence or two; the page appends what it gathers from the corpus and the date checked. */
  lede: string;
  /** Under the GLOBOCAN table: how IARC's estimates differ from the national registry's own counts. */
  globocanNote: string;
  /** In order. The GLOBOCAN table is placed after the section whose id is "profile". */
  sections: DiveSection[];
  gaps: CountryCard[];
  institutions: string[];
  companies: string[];
  drugs: string[];
  trials: string[];
  papers: string[];
  people: string[];
  /** "How this page is built" and "Verify before relying on it". */
  how: string;
  verify: string;
  verifyLinks: CountryLink[];
};

export const diveCards = (d: CountryDive): CountryCard[] => [...d.sections.flatMap((s) => s.cards), ...d.gaps];
export const diveIds = (d: CountryDive): string[] => [...d.institutions, ...d.companies, ...d.drugs, ...d.trials, ...d.papers, ...d.people];
