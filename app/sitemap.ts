import type { MetadataRoute } from "next";
import { getSitemapRoutes } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo/urls";

/**
 * Generated from Sanity rather than maintained by hand, so it can't drift out
 * of step with the content. Lists only canonical, indexable, 200-status URLs —
 * the Studio is noindex and the 404 route is excluded by construction.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getSitemapRoutes();

  return routes.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  }));
}
