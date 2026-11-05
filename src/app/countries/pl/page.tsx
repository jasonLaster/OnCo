import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PL_DIVE } from "@/data/country-pl";

export const metadata: Metadata = pageMeta({ title: PL_DIVE.title, description: PL_DIVE.description, path: "/countries/pl/" });

export default function PolandPage() {
  return <CountryDeepDive dive={PL_DIVE} />;
}
