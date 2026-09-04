import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeData } from "@/lib/data";
import { buildSiteGraph } from "@/lib/seo/schema";

/**
 * Site chrome: skip link, sticky header, footer. Header/footer content comes
 * from Sanity (siteSettings + navigation) via getHomeData.
 *
 * The identity graph (Organization / AccountingService / WebSite) is emitted
 * here so it appears once on every page of the site, built from the same
 * siteSettings the footer renders.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { site, nav } = await getHomeData();

  return (
    <>
      <JsonLd data={buildSiteGraph(site)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header wordmark={site.wordmark} nav={nav} />
      <main id="main">{children}</main>
      <Footer site={site} />
    </>
  );
}
