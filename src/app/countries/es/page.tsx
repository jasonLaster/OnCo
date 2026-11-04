import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ES_DIVE } from "@/data/country-es";

export const metadata: Metadata = pageMeta({ title: ES_DIVE.title, description: ES_DIVE.description, path: "/countries/es/" });

export default function SpainPage() {
  return <CountryDeepDive dive={ES_DIVE} />;
}
