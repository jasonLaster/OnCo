import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TH_DIVE } from "@/data/country-th";

export const metadata: Metadata = pageMeta({ title: TH_DIVE.title, description: TH_DIVE.description, path: "/countries/th/" });

export default function ThailandPage() {
  return <CountryDeepDive dive={TH_DIVE} />;
}
