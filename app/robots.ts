import type { MetadataRoute } from "next";
import { absoluteUrl, siteIsLive } from "@/lib/seo/urls";

/**
 * Blocked unless NEXT_PUBLIC_SITE_LIVE is exactly "true", so previews and any
 * environment missing the flag cannot be crawled. No sitemap is advertised
 * while blocked either — there is nothing there to crawl.
 *
 * Once live: permissive. Everything worth hiding is handled elsewhere (the
 * embedded Studio sets its own noindex, and the 404 route is noindex).
 *
 * Deliberately no AI-crawler directives. Whether to allow Google-Extended is
 * a business decision, and blocking it would not affect Google Search or
 * remove the site from AI Overviews, which draw on the regular Googlebot index.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteIsLive) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
