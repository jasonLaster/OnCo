import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { IR_DIVE } from "@/data/country-ir";

export const metadata: Metadata = pageMeta({ title: IR_DIVE.title, description: IR_DIVE.description, path: "/countries/ir/" });

export default function IranPage() {
  return <CountryDeepDive dive={IR_DIVE} />;
}
