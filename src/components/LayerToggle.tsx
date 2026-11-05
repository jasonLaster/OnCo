"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { LANGS, LEVELS, LAYER_KEY, useLayer } from "@/lib/layer";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { DEFAULT_READING, isDefaultReading, READING_SCRIPT, reducedMotion, SPACINGS, TEXT_SIZES, useReading } from "@/lib/reading";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeDevice = (cb: () => void) => { const mq = window.matchMedia(REDUCED_QUERY); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); };
const deviceReduced = () => window.matchMedia(REDUCED_QUERY).matches;

/** A labelled row of pressed/unpressed buttons, styled like the reading-level row. */
function Segmented<T extends string>({ labelId, options, value, label, onPick }: { labelId: string; options: readonly T[]; value: T; label: (v: T) => string; onPick: (v: T) => void }) {
  return (
    <div role="group" aria-labelledby={labelId} className="flex rounded-lg border border-border overflow-hidden mb-3 p-0.5 gap-0.5 bg-surface">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onPick(o)} aria-pressed={value === o}
          className={`flex-1 rounded-md px-2 py-1.5 transition-colors ${value === o ? "bg-foreground text-background font-medium shadow-sm" : "hover:bg-card"}`}>{label(o)}</button>
      ))}
    </div>
  );
}

/**
 * Compact header control (the Aa menu) for reading level, text size, reading spacing, reduce motion and site
 * language. Text size, spacing and motion are stored by src/lib/reading.ts; their defaults write nothing.
 */
export function LayerToggle({ className = "" }: { className?: string }) {
  const [layer, update] = useLayer();
  const [reading, setReading] = useReading();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const uid = useId();
  const device = useSyncExternalStore(subscribeDevice, deviceReduced, () => false);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const lang = LANGS.find((l) => l.code === layer.lang) ?? LANGS[0];
  const level = LEVELS.find((l) => l.code === layer.level) ?? LEVELS[0];
  const levelLabel = (code: string) => t(`level.${code}` as UiKey);
  const nonDefault = layer.level !== "technical" || layer.lang !== "en" || !isDefaultReading(reading);
  const motionOn = reducedMotion(reading.motion, device);

  return (
    <div ref={box} className={`relative flex items-center ${className}`}>
      <button type="button" data-onco-toggle="layer" onClick={() => setOpen((o) => !o)} aria-haspopup="dialog" aria-expanded={open} aria-label={`Aa ${lang.code.toUpperCase()} · ${lang.native} · ${t("layer.aria")}`}
        className={`ctl px-2.5 ${nonDefault ? "border-accent bg-accent-soft" : ""}`} title={`${levelLabel(level.code)} · ${lang.native}`}>
        {/* Both runs of text share one baseline (see .ctl-text), whatever their sizes. */}
        <span className="ctl-text">
          <span aria-hidden className="font-semibold tracking-tight">Aa</span>{" "}
          <span className="ctl-label text-muted max-[389px]:hidden xl:hidden 2xl:inline">{lang.code.toUpperCase()}</span>
        </span>
      </button>
      {/* Phones: span the viewport below the header (an end-anchored 18rem panel would run off the far edge). Scrolls
          inside itself when the rows outgrow a short screen or the largest text size. */}
      {open && (
        <div role="dialog" aria-label={t("layer.aria")} className="fixed inset-x-4 top-[calc(var(--header-h)+0.375rem)] z-50 max-h-[calc(100dvh-var(--header-h)-1rem)] overflow-y-auto overscroll-contain sm:absolute sm:inset-x-auto sm:end-0 sm:top-full sm:mt-1.5 sm:w-72 card shadow-pop p-3 text-sm">
          <div className="kicker mb-1.5">{t("layer.readingLevel")}</div>
          <div className="flex rounded-lg border border-border overflow-hidden mb-1.5 p-0.5 gap-0.5 bg-surface">
            {LEVELS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ level: l.code })} aria-pressed={layer.level === l.code}
                className={`flex-1 rounded-md px-2 py-1.5 transition-colors ${layer.level === l.code ? "bg-foreground text-background font-medium shadow-sm" : "hover:bg-card"}`}>{levelLabel(l.code)}</button>
            ))}
          </div>
          <p className="text-xs text-muted mb-3 leading-relaxed">{t(`level.${level.code}.blurb` as UiKey)}.</p>

          <div id={`${uid}-size`} className="kicker mb-1.5">{t("reading.textSize")}</div>
          <Segmented labelId={`${uid}-size`} options={TEXT_SIZES} value={reading.text} label={(v) => t(`reading.text.${v}` as UiKey)} onPick={(text) => setReading({ text })} />

          <div id={`${uid}-spacing`} className="kicker mb-1.5">{t("reading.spacing")}</div>
          <Segmented labelId={`${uid}-spacing`} options={SPACINGS} value={reading.spacing} label={(v) => t(`reading.spacing.${v}` as UiKey)} onPick={(spacing) => setReading({ spacing })} />
          <p className="text-xs text-muted -mt-1.5 mb-3 leading-relaxed">{t("reading.spacing.blurb")}</p>

          <div className="flex items-center justify-between gap-3 mb-1">
            <span id={`${uid}-motion`} className="kicker">{t("reading.motion")}</span>
            <button type="button" role="switch" aria-checked={motionOn} aria-labelledby={`${uid}-motion`} aria-describedby={`${uid}-motion-note`}
              onClick={() => setReading({ motion: motionOn ? "full" : "reduce" })}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${motionOn ? "bg-foreground border-foreground" : "bg-surface border-border-strong"}`}>
              <span aria-hidden className={`inline-block h-4 w-4 rounded-full transition-transform ${motionOn ? "translate-x-6 rtl:-translate-x-6 bg-background" : "translate-x-1 rtl:-translate-x-1 bg-muted"}`} />
            </button>
          </div>
          <p id={`${uid}-motion-note`} className="text-xs text-muted mb-3 leading-relaxed">
            {reading.motion === "device" ? t("reading.motion.device")
              : <button type="button" onClick={() => setReading({ motion: "device" })} className="underline hover:text-foreground">{t("reading.motion.useDevice")}</button>}
          </p>

          <div className="kicker mb-1.5">{t("layer.siteLanguage")}</div>
          <div className="grid grid-cols-3 gap-1">
            {LANGS.map((l) => (
              <button key={l.code} type="button" onClick={() => update({ lang: l.code })} title={l.label} lang={l.code} aria-pressed={layer.lang === l.code}
                className={`rounded-md border px-1 py-1.5 text-xs transition-colors ${layer.lang === l.code ? "bg-foreground text-background border-foreground font-medium" : "border-border hover:bg-surface"}`}>{l.native}</button>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-2.5 leading-relaxed">{t("layer.blurb")}</p>
          {nonDefault && <button type="button" onClick={() => { update({ level: "technical", lang: "en" }); setReading(DEFAULT_READING); }} className="mt-2 text-xs underline text-muted hover:text-foreground">{t("reset")}</button>}
        </div>
      )}
    </div>
  );
}

/**
 * Inline script that applies the saved language to <html> before first paint: `lang` so the browser offers
 * translation straight away, `dir="rtl"` for Arabic so the layout does not flip after hydration, and the
 * data attributes CSS keys off. Mirrors `applyLayer` in src/lib/layer.ts. The same script applies the saved text
 * size, reading spacing and motion choice (READING_SCRIPT, src/lib/reading.ts), so a larger text size never
 * flashes at the default first; a reader who has chosen nothing gets no attribute.
 */
export function LayerScript() {
  const js = `try{var l=JSON.parse(localStorage.getItem(${JSON.stringify(LAYER_KEY)})||"{}");var g=l.lang||"en";var h=document.documentElement;h.lang=g;h.dir=g==="ar"?"rtl":"ltr";h.dataset.lang=g;h.dataset.level=l.level||"technical"}catch(e){}${READING_SCRIPT}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
