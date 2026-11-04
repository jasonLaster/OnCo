import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NG_DIVE } from "@/data/country-ng";

export const metadata: Metadata = pageMeta({ title: NG_DIVE.title, description: NG_DIVE.description, path: "/countries/ng/" });

export default function NigeriaPage() {
  return <CountryDeepDive dive={NG_DIVE} />;
}
