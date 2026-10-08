import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageIntro } from "@/components/sections/PageShell";
import { Contact } from "@/components/sections/Contact";
import { OfficeMap } from "@/components/sections/OfficeMap";

export async function generateMetadata(): Promise<Metadata> {
  const { home, site } = await getHomeData();
  return pageMetadata({
    path: "/contact",
    seo: {
      metaDescription:
        home.contact.lead ??
        `Talk to Tierney & Ohlms about outsourced accounting. Call ${site.phone} or send a message — we reply within one business day.`,
    },
    fallbackTitle: "Contact",
    fallbackImage: site.ogImage,
  });
}

/**
 * The conversion page. No closing CTA block: the form is the call to action,
 * and the office details underneath are the substance that keeps this from
 * being a thin duplicate of the homepage section.
 */
export default async function ContactPage() {
  const { home, site } = await getHomeData();
  return (
    <>
      <PageIntro
        crumb="Contact"
        eyebrow={home.contact.eyebrow}
        heading={home.contact.heading}
        emphasis={home.contact.emphasis}
        lead={home.contact.lead}
      />
      <Contact contact={home.contact} site={site} hideHeader />
      <OfficeMap site={site} />
    </>
  );
}
