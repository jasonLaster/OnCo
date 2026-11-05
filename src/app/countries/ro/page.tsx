import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { RO_DIVE } from "@/data/country-ro";

export const metadata: Metadata = pageMeta({ title: RO_DIVE.title, description: RO_DIVE.description, path: "/countries/ro/" });

export default function RomaniaPage() {
  return <CountryDeepDive dive={RO_DIVE} />;
}
