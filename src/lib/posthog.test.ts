import { describe, expect, it, vi } from "vitest";
vi.mock("./analytics-consent", () => ({ readConsent: vi.fn(() => "granted") }));
import { readConsent } from "./analytics-consent";
import { posthogConfig } from "./posthog";

const filter = (event: unknown) => {
  if (typeof posthogConfig.before_send !== "function") throw new Error("Missing event filter");
  return posthogConfig.before_send(event as never);
};

describe("consented PostHog page counts", () => {
  it("excludes health inputs, identities, referrers, query strings and fragments", () => {
    const result = filter({ event: "$pageview", properties: {
      token: "public-project-token", $process_person_profile: false, distinct_id: "anonymous-test", $current_url: "https://oncoopen.com/trials/?q=private#report",
      $referrer: "https://example.com/?private=value", email: "test@example.com",
      cancer: "private", $initial_current_url: "https://onco.cc/?private=value", $set: { name: "private" },
    } });
    expect(result?.properties).toEqual({ token: "public-project-token", $process_person_profile: false, distinct_id: "anonymous-test", $current_url: "https://oncoopen.com/trials/", $pathname: "/trials/" });
  });
  it("drops non-pageview events and drops queued events after consent withdrawal", () => {
    expect(filter({ event: "$autocapture", properties: {} })).toBeNull();
    vi.mocked(readConsent).mockReturnValueOnce("denied");
    expect(filter({ event: "$pageview", properties: {} })).toBeNull();
  });
  it("lets a search miss through with the folded query and nothing about the page, device or session", () => {
    const result = filter({ event: "search_miss", properties: {
      token: "public-project-token", $process_person_profile: false, distinct_id: "anonymous-test", query: "zorvex therapeutics",
      $current_url: "https://oncoopen.com/search/?q=zorvex", $pathname: "/search/", $session_id: "s", $window_id: "w", $device_id: "d",
      $browser: "Firefox", $screen_width: 1000, $referrer: "https://example.com/",
    } });
    expect(result?.properties).toEqual({ token: "public-project-token", $process_person_profile: false, distinct_id: "anonymous-test", query: "zorvex therapeutics" });
  });
  it("drops a search miss whose query fails the privacy filter, is not folded, or arrives without consent", () => {
    expect(filter({ event: "search_miss", properties: { query: "my lump 12/03" } })).toBeNull();
    expect(filter({ event: "search_miss", properties: { query: "Zorvex Therapeutics" } })).toBeNull();
    expect(filter({ event: "search_miss", properties: {} })).toBeNull();
    vi.mocked(readConsent).mockReturnValueOnce("denied");
    expect(filter({ event: "search_miss", properties: { query: "blorft" } })).toBeNull();
  });
  it("disables recording, automatic input capture and persisted visitor profiles", () => {
    expect(posthogConfig).toMatchObject({ persistence: "memory", person_profiles: "never", autocapture: false,
      capture_exceptions: false, disable_session_recording: true, disable_surveys: true, advanced_disable_flags: true });
  });
});
