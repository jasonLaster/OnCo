"use client";

import Link from "next/link";
import { NAV_GROUPS } from "@/lib/nav";
import { useT } from "@/lib/i18n/ui";
import { navGroupText, navItemText } from "@/lib/i18n/nav";

/** Footer site map: one column per navigation group, labels following the site language. */
export function FooterNav() {
  const { lang } = useT();
  return (
    <>
      {NAV_GROUPS.map((g) => {
        const gt = navGroupText(g, lang);
        return (
          <nav key={g.id} aria-label={gt.label}>
            <div className="kicker mb-2"><Link className="inline-block py-1.5 hover:text-foreground" href={g.href}>{gt.label}</Link></div>
            {/* The link styles sit once on the list rather than on each of ~150 links: the footer is repeated in every
                exported page, and the per-link class string was a quarter of its markup. */}
            <ul className="space-y-2 text-[13px] leading-snug [&_a]:text-foreground/80 [&_a:hover]:text-foreground [&_a:hover]:underline">
              {g.items.map((it) => {
                const label = navItemText(it, lang).label;
                return (
                  <li key={it.href}>
                    {it.href.startsWith("http")
                      ? <a href={it.href} rel="noopener">{label}</a>
                      : <Link href={it.href}>{label}</Link>}
                  </li>
                );
              })}
            </ul>
          </nav>
        );
      })}
    </>
  );
}
