import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PK_DIVE } from "@/data/country-pk";

export const metadata: Metadata = pageMeta({ title: PK_DIVE.title, description: PK_DIVE.description, path: "/countries/pk/" });

export default function PakistanPage() {
  return <CountryDeepDive dive={PK_DIVE} />;
}
