import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/lib/content/legal";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getHomeData();
  return pageMetadata({
    path: "/privacy",
    seo: {
      metaDescription:
        "What this website collects, who it is shared with, and how it is used. No analytics, no tracking cookies, no sale of personal information.",
    },
    fallbackTitle: "Privacy Policy",
    fallbackImage: site.ogImage,
  });
}

export default async function PrivacyPage() {
  const { site } = await getHomeData();
  return <LegalDocument doc={privacyPolicy} site={site} />;
}
