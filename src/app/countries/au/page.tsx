import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AU_DIVE } from "@/data/country-au";

export const metadata: Metadata = pageMeta({ title: AU_DIVE.title, description: AU_DIVE.description, path: "/countries/au/" });

export default function AustraliaPage() {
  return <CountryDeepDive dive={AU_DIVE} />;
}
