import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AR_DIVE } from "@/data/country-ar";

export const metadata: Metadata = pageMeta({ title: AR_DIVE.title, description: AR_DIVE.description, path: "/countries/ar/" });

export default function ArgentinaPage() {
  return <CountryDeepDive dive={AR_DIVE} />;
}
