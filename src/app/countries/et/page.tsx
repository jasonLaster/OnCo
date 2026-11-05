import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ET_DIVE } from "@/data/country-et";

export const metadata: Metadata = pageMeta({ title: ET_DIVE.title, description: ET_DIVE.description, path: "/countries/et/" });

export default function EthiopiaPage() {
  return <CountryDeepDive dive={ET_DIVE} />;
}
