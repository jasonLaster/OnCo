"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  ["biology", "Biology"], ["elsewhere", "Elsewhere"], ["prevalence", "Prevalence"],
  ["hotspots", "Hotspots"], ["products", "Products"], ["trials", "Trials"],
  ["resistance", "Resistance"], ["pathways", "Pathways"], ["assays", "Assays"],
  ["models", "Models"], ["questions", "Open questions"], ["papers", "Papers"], ["export", "Export"],
] as const;

export function DossierNav({ omit = [] }: { omit?: readonly string[] }) {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const bar = nav.current;
    const dossier = bar?.parentElement;
    if (!bar || !dossier) return;
    const sections = SECTIONS.map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section && dossier.contains(section));
    let frame = 0;
    const offset = () => (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight + 16;
    const update = () => {
      frame = 0;
      const top = offset();
      dossier.style.setProperty("--dossier-scroll-offset", `${top}px`);
      // The last heading above the reading edge owns the section, even when a long table fills the viewport.
      let current: string | undefined;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > top + 1) break;
        current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    // A jump past a paged table can load rows mid-scroll and move its target after the browser aimed: from Trials to
    // Resistance on a phone, the heading landed 31px under the bar. Once the jump settles, land it again; a reader who
    // scrolls, swipes or presses a key in the meantime keeps their own position.
    let jump: HTMLElement | undefined;
    let settle = 0;
    const land = () => {
      const target = jump;
      jump = undefined;
      if (!target) return;
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1;
      if (!atBottom && Math.abs(target.getBoundingClientRect().top - offset()) > 2) target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const onScroll = () => {
      schedule();
      if (jump) { clearTimeout(settle); settle = window.setTimeout(land, 150); }
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && sections.find((section) => `#${section.id}` === link.getAttribute("href"));
      if (!target) return;
      jump = target;
      clearTimeout(settle);
      settle = window.setTimeout(land, 150);
    };
    const cancel = () => { jump = undefined; clearTimeout(settle); };
    const resize = new ResizeObserver(schedule);
    resize.observe(bar);
    resize.observe(dossier);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    dossier.addEventListener("click", onClick);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    frame = requestAnimationFrame(() => {
      dossier.style.setProperty("--dossier-scroll-offset", `${offset()}px`);
      // Native fragment scrolling happens before hydration; leave room for the wrapped sticky bar.
      const target = sections.find((section) => `#${section.id}` === window.location.hash);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
      update();
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      dossier.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      dossier.style.removeProperty("--dossier-scroll-offset");
    };
  }, []);

  return (
    <nav ref={nav} data-dossier-nav aria-label="Dossier sections" className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mt-4 bg-background/95 backdrop-blur border-y border-border flex flex-wrap items-center gap-1.5 text-sm">
      <span className="kicker mr-1 hidden sm:inline">Jump to</span>
      {SECTIONS.filter(([id]) => !omit.includes(id)).map(([id, label]) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
          className={`chip border ${active === id ? "bg-accent-soft border-accent text-accent" : "bg-card border-border hover:bg-foreground/5"}`}>{label}</a>
      ))}
    </nav>
  );
}
