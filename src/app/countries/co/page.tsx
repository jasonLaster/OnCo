import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CO_DIVE } from "@/data/country-co";

export const metadata: Metadata = pageMeta({ title: CO_DIVE.title, description: CO_DIVE.description, path: "/countries/co/" });

export default function ColombiaPage() {
  return <CountryDeepDive dive={CO_DIVE} />;
}
