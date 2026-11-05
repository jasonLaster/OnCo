import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MY_DIVE } from "@/data/country-my";

export const metadata: Metadata = pageMeta({ title: MY_DIVE.title, description: MY_DIVE.description, path: "/countries/my/" });

export default function MalaysiaPage() {
  return <CountryDeepDive dive={MY_DIVE} />;
}
