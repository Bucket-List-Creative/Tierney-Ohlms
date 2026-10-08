import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageIntro, PageCta } from "@/components/sections/PageShell";
import { WhyUs } from "@/components/sections/WhyUs";

export async function generateMetadata(): Promise<Metadata> {
  const { home, site } = await getHomeData();
  return pageMetadata({
    path: "/why-us",
    seo: {
      metaDescription:
        home.whyHeader.lead ??
        "CPA-level expertise, modern tools, and a team that scales with you — without the cost of hiring in-house.",
    },
    fallbackTitle: "Why Tierney & Ohlms",
    fallbackImage: site.ogImage,
  });
}

export default async function WhyUsPage() {
  const { home, features } = await getHomeData();
  return (
    <>
      <PageIntro
        crumb="Why Us"
        eyebrow={home.whyHeader.eyebrow}
        heading={home.whyHeader.heading}
        emphasis={home.whyHeader.emphasis}
        lead={home.whyHeader.lead}
      />
      <WhyUs header={home.whyHeader} features={features} hideHeader />
      <PageCta
        heading="See what this costs for a business your size."
        lead="We publish real client fees rather than hiding behind a quote form."
        primary={{ href: "/pricing", label: "View pricing" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}
