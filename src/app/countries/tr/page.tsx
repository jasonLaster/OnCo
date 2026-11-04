import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TR_DIVE } from "@/data/country-tr";

export const metadata: Metadata = pageMeta({ title: TR_DIVE.title, description: TR_DIVE.description, path: "/countries/tr/" });

export default function TurkiyePage() {
  return <CountryDeepDive dive={TR_DIVE} />;
}
