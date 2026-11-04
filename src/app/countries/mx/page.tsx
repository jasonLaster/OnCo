import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MX_DIVE } from "@/data/country-mx";

export const metadata: Metadata = pageMeta({ title: MX_DIVE.title, description: MX_DIVE.description, path: "/countries/mx/" });

export default function MexicoPage() {
  return <CountryDeepDive dive={MX_DIVE} />;
}
