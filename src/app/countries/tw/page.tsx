import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TW_DIVE } from "@/data/country-tw";

export const metadata: Metadata = pageMeta({ title: TW_DIVE.title, description: TW_DIVE.description, path: "/countries/tw/" });

export default function TaiwanPage() {
  return <CountryDeepDive dive={TW_DIVE} />;
}
