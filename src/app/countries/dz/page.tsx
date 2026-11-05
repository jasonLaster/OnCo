import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { DZ_DIVE } from "@/data/country-dz";

export const metadata: Metadata = pageMeta({ title: DZ_DIVE.title, description: DZ_DIVE.description, path: "/countries/dz/" });

export default function AlgeriaPage() {
  return <CountryDeepDive dive={DZ_DIVE} />;
}
