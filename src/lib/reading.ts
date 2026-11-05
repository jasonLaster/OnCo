"use client";

import { useEffect, useState } from "react";

/**
 * Reading preferences from the Aa menu: text size, reading spacing and reduce motion (owner approval, 4 November
 * 2026: "add text size control, reading spacing control (dont change our default), reduce motion switch").
 *
 * The same shape as the theme store (src/lib/theme.ts): one localStorage key, applied as attributes on <html>, and
 * broadcast on a window event so every control follows one write. Defaults write nothing: a reader who never opens
 * the menu gets no attribute, so the page renders exactly as it did before the controls existed. CSS keyed off the
 * attributes lives in globals.css ("Reading preferences"); ReadingScript in src/components/LayerToggle.tsx applies
 * the saved choice before first paint.
 *
 *   text     default | larger | largest   <html data-text="larger">        root font size 112.5% or 125%
 *   spacing  default | relaxed            <html data-spacing="relaxed">    WCAG 1.4.12 spacing on running text
 *   motion   device | reduce | full       <html data-reduce-motion="on">   "device" follows prefers-reduced-motion
 */
export type TextSize = "default" | "larger" | "largest";
export type Spacing = "default" | "relaxed";
export type MotionPref = "device" | "reduce" | "full";
export type Reading = { text: TextSize; spacing: Spacing; motion: MotionPref };

export const TEXT_SIZES: readonly TextSize[] = ["default", "larger", "largest"];
export const SPACINGS: readonly Spacing[] = ["default", "relaxed"];
export const MOTION_PREFS: readonly MotionPref[] = ["device", "reduce", "full"];
export const READING_KEY = "onco:reading";
export const READING_EVENT = "onco:reading";
export const DEFAULT_READING: Reading = { text: "default", spacing: "default", motion: "device" };

const pick = <T extends string>(list: readonly T[], v: unknown, fallback: T): T => (typeof v === "string" && (list as readonly string[]).includes(v) ? (v as T) : fallback);

/** Parse a stored value; anything unknown or malformed falls back to the default for that field. */
export function parseReading(raw: string | null | undefined): Reading {
  if (!raw) return { ...DEFAULT_READING };
  let o: Record<string, unknown> = {};
  try { const v = JSON.parse(raw); if (v && typeof v === "object") o = v as Record<string, unknown>; } catch { /* malformed */ }
  return { text: pick(TEXT_SIZES, o.text, "default"), spacing: pick(SPACINGS, o.spacing, "default"), motion: pick(MOTION_PREFS, o.motion, "device") };
}

export function isDefaultReading(r: Reading): boolean {
  return r.text === "default" && r.spacing === "default" && r.motion === "device";
}

/** The attributes a choice puts on <html>; a default writes none (null means remove). */
export function readingAttrs(r: Reading): Record<"data-text" | "data-spacing" | "data-reduce-motion", string | null> {
  return {
    "data-text": r.text === "default" ? null : r.text,
    "data-spacing": r.spacing === "default" ? null : r.spacing,
    "data-reduce-motion": r.motion === "device" ? null : r.motion === "reduce" ? "on" : "off",
  };
}

export function readReading(): Reading {
  if (typeof window === "undefined") return { ...DEFAULT_READING };
  try { return parseReading(window.localStorage.getItem(READING_KEY)); } catch { return { ...DEFAULT_READING }; }
}

export function applyReading(r: Reading) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(readingAttrs(r))) { if (v === null) root.removeAttribute(k); else root.setAttribute(k, v); }
}

/** Persist, apply and announce. A default choice removes the key, so storage holds nothing for a reader who changes nothing back. */
export function writeReading(r: Reading) {
  try {
    if (isDefaultReading(r)) window.localStorage.removeItem(READING_KEY);
    else window.localStorage.setItem(READING_KEY, JSON.stringify(r));
  } catch { /* storage blocked */ }
  applyReading(r);
  window.dispatchEvent(new CustomEvent(READING_EVENT, { detail: r }));
}

/** Whether motion should be reduced: the reader's switch when set, otherwise the device setting. */
export function reducedMotion(pref: MotionPref, deviceReduced: boolean): boolean {
  return pref === "reduce" ? true : pref === "full" ? false : deviceReduced;
}

/** For one-off checks (smooth scroll or jump): the switch, else prefers-reduced-motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return reducedMotion(readReading().motion, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/**
 * Inline pre-paint script source. Mirrors `readingAttrs`; kept short because it is in every page's HTML. The
 * stored object is written only by `writeReading`, so values are checked against the same lists here.
 */
export const READING_SCRIPT = `try{var r=JSON.parse(localStorage.getItem(${JSON.stringify(READING_KEY)})||"{}"),t=r.text,m=r.motion,d=document.documentElement.dataset;if(t=="larger"||t=="largest")d.text=t;if(r.spacing=="relaxed")d.spacing="relaxed";if(m=="reduce"||m=="full")d.reduceMotion=m=="reduce"?"on":"off"}catch(e){}`;

/** The current choice: defaults on the server and first client render, then synced with storage and every write. */
export function useReading(): [Reading, (patch: Partial<Reading>) => void] {
  const [reading, setReading] = useState<Reading>(DEFAULT_READING);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const r = readReading();
      setReading(r);
      // React may re-render <html> after a hydration mismatch and drop what the pre-paint script set; put it back.
      applyReading(r);
    });
    const onEvent = (e: Event) => { const d = (e as CustomEvent<Reading>).detail; if (d) setReading(d); };
    const onStorage = (e: StorageEvent) => { if (e.key === READING_KEY) { const r = readReading(); setReading(r); applyReading(r); } };
    window.addEventListener(READING_EVENT, onEvent);
    window.addEventListener("storage", onStorage);
    return () => { cancelAnimationFrame(id); window.removeEventListener(READING_EVENT, onEvent); window.removeEventListener("storage", onStorage); };
  }, []);
  return [reading, (patch) => writeReading({ ...readReading(), ...patch })];
}
