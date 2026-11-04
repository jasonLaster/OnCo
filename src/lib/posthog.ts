"use client";

import type { PostHog, PostHogConfig } from "posthog-js";
import { readConsent } from "./analytics-consent";
import { safeMissQuery } from "./search-miss-filter";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
let client: PostHog | undefined;
let loading: Promise<PostHog | undefined> | undefined;

/**
 * Only anonymous page counts, and one exception: a short search that found nothing (`search_miss`,
 * docs/SEARCH-MISSES.md), carrying the folded query and nothing else. Never fragments, text inputs, account or
 * profile data.
 */
export const posthogConfig: Partial<PostHogConfig> = {
  api_host: HOST,
  persistence: "memory",
  person_profiles: "never",
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  capture_dead_clicks: false,
  capture_heatmaps: false,
  capture_exceptions: false,
  disable_session_recording: true,
  disable_surveys: true,
  disable_external_dependency_loading: true,
  advanced_disable_flags: true,
  before_send: (event) => {
    if (!event || readConsent() !== "granted") return null;
    if (event.event === "search_miss") {
      // Re-checked here so nothing but a query that passes the filter can leave under this name. No page, device,
      // session or window: the distinct id (held in memory, so it lasts one visit) is kept only so the weekly count
      // can require three different visitors before a query is read by anyone.
      const query = event.properties?.query;
      if (typeof query !== "string" || safeMissQuery(query) !== query) return null;
      const safe: Record<string, unknown> = { query };
      for (const key of ["token", "$process_person_profile", "distinct_id", "$lib", "$lib_version"]) {
        if (event.properties?.[key] !== undefined) safe[key] = event.properties[key];
      }
      return { ...event, properties: safe };
    }
    if (event.event !== "$pageview") return null;
    const safe: Record<string, unknown> = {};
    for (const key of ["token", "$process_person_profile", "distinct_id", "$device_id", "$session_id", "$window_id", "$lib", "$lib_version", "$browser", "$os", "$device_type", "$screen_height", "$screen_width", "$viewport_height", "$viewport_width", "$host", "$pathname", "$current_url"]) {
      if (event.properties?.[key] !== undefined) safe[key] = event.properties[key];
    }
    if (typeof safe.$current_url === "string") {
      const url = new URL(safe.$current_url);
      safe.$current_url = `${url.origin}${url.pathname}`;
      safe.$pathname = url.pathname;
    }
    return { ...event, properties: safe };
  },
};

async function getClient(): Promise<PostHog | undefined> {
  if (!KEY || readConsent() !== "granted") return;
  if (client) { client.opt_in_capturing({ captureEventName: false }); return client; }
  if (!loading) loading = import("posthog-js").then(({ default: posthog }) => {
    if (readConsent() !== "granted") return;
    client = posthog.init(KEY, posthogConfig);
    return client;
  }).catch(() => undefined).finally(() => { loading = undefined; });
  return loading;
}

export async function trackPosthogPage(pathname: string): Promise<void> {
  const ph = await getClient();
  if (!ph || readConsent() !== "granted") return;
  ph.capture("$pageview", { $current_url: `${location.origin}${pathname}`, $pathname: pathname });
}

/** A settled search that found nothing, already through the filter (src/lib/search-miss.ts noteSearch). */
export async function trackSearchMiss(query: string): Promise<void> {
  if (safeMissQuery(query) !== query) return;
  const ph = await getClient();
  if (!ph || readConsent() !== "granted") return;
  ph.capture("search_miss", { query });
}

export function stopPosthog(): void {
  client?.opt_out_capturing();
  client?.reset();
}
