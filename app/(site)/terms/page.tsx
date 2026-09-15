import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsOfService } from "@/lib/content/legal";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getHomeData();
  return pageMetadata({
    path: "/terms",
    seo: {
      metaDescription:
        "Terms covering use of the Tierney & Ohlms website. Information published here is general and does not create a professional relationship.",
    },
    fallbackTitle: "Terms of Service",
    fallbackImage: site.ogImage,
  });
}

export default async function TermsPage() {
  const { site } = await getHomeData();
  return <LegalDocument doc={termsOfService} site={site} />;
}
