import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CH_DIVE } from "@/data/country-ch";

export const metadata: Metadata = pageMeta({ title: CH_DIVE.title, description: CH_DIVE.description, path: "/countries/ch/" });

export default function SwitzerlandPage() {
  return <CountryDeepDive dive={CH_DIVE} />;
}
