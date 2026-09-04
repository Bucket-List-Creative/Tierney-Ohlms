/**
 * Absolute URLs for canonicals, sitemap entries and structured data.
 *
 * www is the canonical host: it matches what the current live site already
 * declares, so nothing that is already indexed shifts at cutover. Set
 * NEXT_PUBLIC_SITE_URL in the deploy environment — the fallback exists so
 * local builds work, not so production can go without it.
 */
const FALLBACK_SITE_URL = "https://www.tierneyohlms.com";

/** Origin with no trailing slash, e.g. "https://www.tierneyohlms.com". */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
).replace(/\/+$/, "");

/**
 * Absolute URL for a route path. Pass the route as it appears in the app
 * ("/", "/about", "/services/payroll") — not a already-absolute URL.
 */
export function absoluteUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return suffix === "/" ? `${siteUrl}/` : `${siteUrl}${suffix.replace(/\/+$/, "")}`;
}
