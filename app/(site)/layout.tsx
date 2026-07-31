import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getHomeData } from "@/lib/data";

/**
 * Site chrome: skip link, sticky header, footer. Header/footer content comes
 * from Sanity (siteSettings + navigation) via getHomeData.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { site, nav } = await getHomeData();

  return (
    <>
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
