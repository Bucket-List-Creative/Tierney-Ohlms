import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getPage, getPageSlugs } from "@/lib/data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription,
  };
}

/** Generic content page — Services / Industries / About / Contact detail pages. */
export default async function GenericPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      <Section ground="white">
        <h1 className="m-0 max-w-[20ch] font-display text-display max-[767px]:text-[36px]">
          {page.title}
        </h1>
      </Section>
      {page.sections?.map((section, i) => (
        <Section key={i} ground={i % 2 === 0 ? "bone" : "white"} ruleTop>
          <SectionHeader data={section} />
        </Section>
      ))}
    </>
  );
}
