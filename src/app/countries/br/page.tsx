import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BR_DIVE } from "@/data/country-br";

export const metadata: Metadata = pageMeta({ title: BR_DIVE.title, description: BR_DIVE.description, path: "/countries/br/" });

export default function BrazilPage() {
  return <CountryDeepDive dive={BR_DIVE} />;
}
