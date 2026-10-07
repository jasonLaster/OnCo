"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** One listener set for a page of native section disclosures. */
export function SectionDisclosures({ children, className }: { children: ReactNode; className?: string }) {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = (hash: string) => {
      let anchor: string;
      try { anchor = decodeURIComponent(hash.slice(1)); } catch { return; }
      if (!anchor) return;
      const target = document.getElementById(anchor);
      if (target && section.current?.contains(target)) {
        const fold = target.closest<HTMLDetailsElement>("details[data-section-fold]") ?? target.querySelector<HTMLDetailsElement>("details[data-section-fold]");
        if (fold) fold.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    const onHash = () => reveal(window.location.hash);
    // A second click on the current hash must reopen a section the reader closed.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search) reveal(url.hash);
    };
    const printOpened = new Set<HTMLDetailsElement>();
    const beforePrint = () => {
      section.current?.querySelectorAll<HTMLDetailsElement>("details[data-section-fold]:not([open])").forEach((fold) => { fold.open = true; printOpened.add(fold); });
    };
    const afterPrint = () => {
      printOpened.forEach((fold) => { fold.open = false; });
      printOpened.clear();
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return <div ref={section} className={className}>{children}</div>;
}
