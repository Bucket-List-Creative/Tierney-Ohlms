import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/urls";

/**
 * Permissive by design: everything worth hiding is already handled elsewhere
 * (the embedded Studio sets its own noindex, and the 404 route is noindex).
 *
 * Deliberately no AI-crawler directives. Whether to allow Google-Extended and
 * similar is a business decision about AI training and grounding, not a
 * technical default — and blocking it would not affect Google Search or remove
 * the site from AI Overviews, which draw on the regular Googlebot index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
