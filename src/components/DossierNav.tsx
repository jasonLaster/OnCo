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
    const resize = new ResizeObserver(schedule);
    resize.observe(bar);
    resize.observe(dossier);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    frame = requestAnimationFrame(() => {
      dossier.style.setProperty("--dossier-scroll-offset", `${offset()}px`);
      // Native fragment scrolling happens before hydration; leave room for the wrapped sticky bar.
      const target = sections.find((section) => `#${section.id}` === window.location.hash);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
      update();
    });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
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
