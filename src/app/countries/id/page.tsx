import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ID_DIVE } from "@/data/country-id";

export const metadata: Metadata = pageMeta({ title: ID_DIVE.title, description: ID_DIVE.description, path: "/countries/id/" });

export default function IndonesiaPage() {
  return <CountryDeepDive dive={ID_DIVE} />;
}
