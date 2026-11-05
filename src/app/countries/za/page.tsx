import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ZA_DIVE } from "@/data/country-za";

export const metadata: Metadata = pageMeta({ title: ZA_DIVE.title, description: ZA_DIVE.description, path: "/countries/za/" });

export default function SouthAfricaPage() {
  return <CountryDeepDive dive={ZA_DIVE} />;
}
