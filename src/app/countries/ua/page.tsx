import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { UA_DIVE } from "@/data/country-ua";

export const metadata: Metadata = pageMeta({ title: UA_DIVE.title, description: UA_DIVE.description, path: "/countries/ua/" });

export default function UkrainePage() {
  return <CountryDeepDive dive={UA_DIVE} />;
}
