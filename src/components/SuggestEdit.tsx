import type { Kind } from "@/lib/kinds";
import type { SourceLocation } from "@/lib/source-location";
import { issueUrl, suggestEditUrl, entityRef, pageUrl } from "@/lib/issue-links";
import { WatchButton } from "./WatchButton";
import { T } from "./T";

type Props = { id: string; kind: Kind; name: string; fields?: string[]; source?: SourceLocation; recordJson?: string; /** Page path and record date for the watch button; optional. */ route?: string; asOf?: string };

/**
 * Suggest an edit via a GitHub issue form, prefilled with the object and page. There is no form
 * on the site and, deliberately, no link that edits the record directly: every correction and
 * improvement enters through the issue gate so it can be safety-checked, sourced and validated
 * before a maintainer merges it. The record's read-only location goes into the issue body so the
 * maintainer can find the line; contributors who can code say so in the issue.
 */
export function SuggestEdit({ id, kind, name, source, route, asOf }: Props) {
  const e = { id, kind, name };
  const suggest = suggestEditUrl(e, { recordUrl: source?.url });
  const entity = `${entityRef(kind, id)} · ${name}`;
  const page = pageUrl(kind, id);
  const readout = kind === "trial" ? issueUrl("trial-readout", { trial: entity, page }, { title: `readout: ${id}` }) : null;
  const approval = kind === "drug" ? issueUrl("regional-approval", { product: entity, page }, { title: `approval: ${id}` }) : null;
  return (
    <div className="card p-4 text-sm">
      {/* One way in, and no heading over it. There were two entry points, an edit form and a discussion
          thread, then a heading and a paragraph explaining the gate; the owner asked for a single button:
          "we dont need a section name". The button's own words say what it does. */}
      <div className="flex flex-wrap items-center justify-between gap-2 no-print">
        <WatchButton id={id} kind={kind} name={name} route={route} asOf={asOf} />
        <a href={suggest} rel="noopener" className="rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:brightness-110"><T k="suggest.cta" /></a>
      </div>
      {/* Only trials and products have news to report, so the list is absent rather than empty elsewhere. */}
      {(readout || approval) && <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
        {readout && <li><a className="underline" href={readout} rel="noopener"><T k="suggest.readout" /></a></li>}
        {approval && <li><a className="underline" href={approval} rel="noopener"><T k="suggest.approval" /></a></li>}
      </ul>}
    </div>
  );
}
