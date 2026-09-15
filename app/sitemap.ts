import type { MetadataRoute } from "next";
import { getSitemapRoutes } from "@/lib/data";
import { absoluteUrl, siteIsLive } from "@/lib/seo/urls";

/**
 * `output: export` refuses a metadata route that has not opted into being
 * static. Everything here is build-time already — getSitemapRoutes() resolves at build time
 * — so this is a declaration, not a behaviour change. Without it the
 * GitHub Pages deploy fails at "Collecting page data".
 */
export const dynamic = "force-static";

/**
 * Empty unless NEXT_PUBLIC_SITE_LIVE is exactly "true" — a preview build
 * should not hand a crawler a list of its URLs, and robots.txt does not
 * advertise this route while blocked.
 *
 * Once live: generated from Sanity so it cannot drift out of step with the
 * content, listing only canonical, indexable, 200-status URLs. `lastModified`
 * is omitted rather than defaulted to build time — a sitemap where every entry
 * claims to have changed at deploy tells search engines nothing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteIsLive) return [];

  const routes = await getSitemapRoutes();

  return routes.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  }));
}
