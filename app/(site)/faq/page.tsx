import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageIntro, PageCta } from "@/components/sections/PageShell";
import { Faq } from "@/components/sections/Faq";

export async function generateMetadata(): Promise<Metadata> {
  const { home, site } = await getHomeData();
  return pageMetadata({
    path: "/faq",
    seo: {
      metaDescription:
        home.faqHeader.lead ??
        "Answers to the questions businesses ask us most about outsourced accounting and controller services.",
    },
    fallbackTitle: "Questions, answered",
    fallbackImage: site.ogImage,
  });
}

export default async function FaqPage() {
  const { home, faqs } = await getHomeData();
  return (
    <>
      <PageIntro
        crumb="FAQ"
        eyebrow={home.faqHeader.eyebrow}
        heading={home.faqHeader.heading}
        emphasis={home.faqHeader.emphasis}
        lead={home.faqHeader.lead}
      />
      <Faq header={home.faqHeader} faqs={faqs} hideHeader />
      <PageCta
        heading="Still have a question?"
        lead="If it isn't answered above, ask us directly — you'll hear back within one business day."
        primary={{ href: "/contact", label: "Ask us" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
