import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PH_DIVE } from "@/data/country-ph";

export const metadata: Metadata = pageMeta({ title: PH_DIVE.title, description: PH_DIVE.description, path: "/countries/ph/" });

export default function PhilippinesPage() {
  return <CountryDeepDive dive={PH_DIVE} />;
}
