import Link from "next/link";
import { reviews, type Review } from "@/data/reviews";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { reviewIssueUrl, reviewerCount, reviewerLevel, tracksFor } from "@/lib/review-queue";
import { loadModelReviews } from "@/lib/model-reviews";
import { ModelPanel } from "./ModelPanel";

const TRACK: Record<Review["track"], { label: string; cls: string }> = {
  expert: { label: "Expert-reviewed", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" },
  advocate: { label: "Patient-advocate reviewed", cls: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" },
};

/**
 * Review state of a page, in two layers.
 *
 * Model panel (machine commentary): when public/reviews/models/<id>.json exists, one card per AI model
 * with name, version, date, confidence, summary and sourced verdicts, plus a "Models disagree" strip.
 * Human reviews: who signed the page off, on which track, when, and their declared conflicts of
 * interest, with a level chip and a link to the roster. When neither exists this renders nothing and the
 * page foot carries a chip instead: see ReviewNote below.
 */
/** Whether this page has a review card at all: a model panel or a named reviewer. Nothing renders an empty box. */
export function hasReviewCard(id: string): boolean {
  return (reviews[id] ?? []).length > 0 || loadModelReviews(id).length > 0;
}

export function ReviewBadge({ id }: { id: string }) {
  const list = reviews[id] ?? [];
  const e = graph().get(id);
  const models = loadModelReviews(id);
  const issue = e && tracksFor(e.kind).length ? reviewIssueUrl(e) : undefined;

  const human = list.length ? (
    <div className="card p-3 text-xs space-y-2">
      {list.map((r, i) => {
        const n = reviewerCount(r);
        const level = reviewerLevel(n);
        const person = r.personId ? graph().get(r.personId) : undefined;
        const href = person ? routeFor(person) : r.url;
        return (
          <div key={i}>
            <span className={`chip mr-2 ${TRACK[r.track].cls}`}>{TRACK[r.track].label} {r.date}</span>
            <span className="font-medium">{href ? <a className="underline" href={href} rel={person ? undefined : "noopener"}>{r.reviewer}</a> : r.reviewer}</span>
            <span className="text-muted">, {r.role}</span>
            <Link href="/reviewers/" className="chip ml-2 bg-foreground/5 hover:bg-foreground/10" title={`${level.label}: ${n} page${n === 1 ? "" : "s"} signed off. See the roster.`}>{level.label} · {n}</Link>
            {r.note && <div className="text-muted mt-1">{r.note}</div>}
            <div className="text-muted mt-1"><span className="kicker mr-1">Conflicts of interest</span>{r.coi}</div>
          </div>
        );
      })}
      {e && <div className="text-muted"><a className="underline" href={reviewIssueUrl(e)} rel="noopener">Add a review</a> on another track or a later date.</div>}
    </div>
  ) : null;

  if (models.length) {
    return (
      <>
        <ModelPanel reviews={models} recordId={id} humanReviewUrl={issue}>
          {list.length ? <>A named reviewer signed this page off; their entry is below.</> : undefined}
        </ModelPanel>
        {human}
      </>
    );
  }

  // A page with neither a model panel nor a named reviewer says so at the foot of the page, in three words.
  // See ReviewNote below.
  return human;
}

/**
 * The review state of an unreviewed page: a chip at the foot, beside the provenance line.
 *
 * This was a card in the right-hand column on about 19,500 pages. It said what was true of all of them (every
 * fact carries a dated source, the checks run on every build), when the page was next due, that no reviewer had
 * signed it off, where the queue and the roster are, and that model commentary was coming. Five sentences of
 * the page talking about itself, beside a page a reader came to for something else. The owner, 8 October 2026:
 * "could just be a 'Sourced, not expert reviewed' at the bottom of the page."
 *
 * The chip keeps the one fact a reader needs, which is what it is not. Everything else it used to say is on
 * /review/, which it links to. Pages that do have a panel or a reviewer render that card in the column instead.
 */
export function ReviewNote({ id }: { id: string }) {
  if (hasReviewCard(id)) return null;
  return (
    <Link href="/review/#queue" className="chip bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-foreground/10"
      title="No named expert has signed this page off. Every fact on it carries a dated source and is checked on every build; the review queue explains both.">
      Sourced, not expert-reviewed
    </Link>
  );
}
