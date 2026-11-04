import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SE_DIVE } from "@/data/country-se";

export const metadata: Metadata = pageMeta({ title: SE_DIVE.title, description: SE_DIVE.description, path: "/countries/se/" });

export default function SwedenPage() {
  return <CountryDeepDive dive={SE_DIVE} />;
}
