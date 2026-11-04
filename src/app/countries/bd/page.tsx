import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BD_DIVE } from "@/data/country-bd";

export const metadata: Metadata = pageMeta({ title: BD_DIVE.title, description: BD_DIVE.description, path: "/countries/bd/" });

export default function BangladeshPage() {
  return <CountryDeepDive dive={BD_DIVE} />;
}
