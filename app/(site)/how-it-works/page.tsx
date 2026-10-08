import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageIntro, PageCta } from "@/components/sections/PageShell";
import { Process } from "@/components/sections/Process";

export async function generateMetadata(): Promise<Metadata> {
  const { home, site } = await getHomeData();
  return pageMetadata({
    path: "/how-it-works",
    seo: {
      metaDescription:
        home.processHeader.lead ??
        "How we take accounting off your plate and keep it running: consult, onboard, manage, advise.",
    },
    fallbackTitle: "How it works",
    fallbackImage: site.ogImage,
  });
}

export default async function HowItWorksPage() {
  const { home, processSteps } = await getHomeData();
  return (
    <>
      <PageIntro
        crumb="How It Works"
        eyebrow={home.processHeader.eyebrow}
        heading={home.processHeader.heading}
        emphasis={home.processHeader.emphasis}
        lead={home.processHeader.lead}
      />
      <Process header={home.processHeader} steps={processSteps} hideHeader />
      <PageCta
        heading="Ready to start?"
        lead="The first step is a conversation about where your books are today."
        primary={{ href: "/contact", label: "Get started" }}
        secondary={{ href: "/services", label: "Explore services" }}
      />
    </>
  );
}
