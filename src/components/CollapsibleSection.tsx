import type { ReactNode } from "react";

/** Native disclosure keeps the server-rendered contents available without JavaScript. */
export function CollapsibleSection({ title, children, id, aside, defaultOpen = true }: {
  title: string; children: ReactNode; id?: string; aside?: ReactNode; defaultOpen?: boolean;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-40">
      <details open={defaultOpen} className="section-disclosure" data-section-fold>
        <summary className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
          <h2 className="flex items-baseline gap-2 text-lg font-semibold tracking-tight leading-snug">
            <span className="section-chevron text-muted" aria-hidden="true">›</span>{title}
          </h2>
          {aside}
        </summary>
        <div className="mt-3">{children}</div>
      </details>
    </section>
  );
}
