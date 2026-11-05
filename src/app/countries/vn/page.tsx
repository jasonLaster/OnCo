import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { VN_DIVE } from "@/data/country-vn";

export const metadata: Metadata = pageMeta({ title: VN_DIVE.title, description: VN_DIVE.description, path: "/countries/vn/" });

export default function VietNamPage() {
  return <CountryDeepDive dive={VN_DIVE} />;
}
