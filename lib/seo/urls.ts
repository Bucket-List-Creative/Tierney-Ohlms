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

/**
 * Whether this deployment may be indexed.
 *
 * Fails closed by design: only the exact string "true" opens the site up.
 * A missing, empty, misspelled or differently-cased value leaves the
 * deployment blocked, so the failure mode of forgetting the variable is an
 * unindexed preview rather than a staging environment competing with
 * production in search results.
 *
 * NEXT_PUBLIC_ values are inlined at build time, so flipping this requires a
 * redeploy, and it must be set per environment in the host's config — not
 * only in .env.example.
 *
 * Canonicals and structured data are deliberately NOT gated: they stay
 * correct underneath so a preview build can be inspected for what it will
 * emit once live.
 */
export const siteIsLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
