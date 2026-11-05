import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { EG_DIVE } from "@/data/country-eg";

export const metadata: Metadata = pageMeta({ title: EG_DIVE.title, description: EG_DIVE.description, path: "/countries/eg/" });

export default function EgyptPage() {
  return <CountryDeepDive dive={EG_DIVE} />;
}
