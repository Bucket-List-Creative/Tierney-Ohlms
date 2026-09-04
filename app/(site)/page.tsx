import type { Metadata } from "next";
import { getHomeData } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";
import { OfficeMap } from "@/components/sections/OfficeMap";
import styles from "./home.module.css";
import { absoluteUrl } from "@/lib/seo/urls";

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHomeData();
  return {
    alternates: { canonical: absoluteUrl("/") },
    title: home.seo?.metaTitle,
    description: home.seo?.metaDescription,
  };
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className={styles.homePage}>
      <Hero hero={data.home.hero} />
      <Services header={data.home.servicesHeader} services={data.services} />
      <WhyUs header={data.home.whyHeader} features={data.features} />
      <Process header={data.home.processHeader} steps={data.processSteps} />
      <Faq header={data.home.faqHeader} faqs={data.faqs} />
      <CtaBanner banner={data.home.ctaBanner} />
      <Contact contact={data.home.contact} site={data.site} />
      <OfficeMap site={data.site} />
    </div>
  );
}
