import "server-only";
import { client } from "./client";
import { readToken } from "./env";

/** Cache tags — a Sanity webhook hits /api/revalidate to bust these on publish. */
export const CACHE_TAGS = {
  siteSettings: "siteSettings",
  navigation: "navigation",
  homePage: "homePage",
  aboutPage: "aboutPage",
  service: "service",
  feature: "feature",
  processStep: "processStep",
  highlight: "highlight",
  faq: "faq",
  page: "page",
} as const;

type FetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  /** ISR window in seconds. Tag-based revalidation makes this a safety net. */
  revalidate?: number | false;
};

/**
 * Fail the build, rather than quietly shipping the local mirror, when Sanity
 * cannot be reached. Set by the `build` script; unset everywhere else.
 *
 * The two situations want opposite behaviour. A build that silently falls back
 * produces a deployment whose content is whatever was committed months ago,
 * and nothing in CI goes red — so builds are strict. A single request hitting
 * a DNS blip should serve the mirror rather than a 500, so runtime is not.
 */
const strict = process.env.SANITY_STRICT_FETCH === "true";

/**
 * Server-only GROQ fetch with Next cache tags. Uses the read token so drafts
 * and private datasets resolve; published content still comes off the CDN.
 *
 * Returns null rather than throwing when Sanity is unreachable. Every caller
 * in lib/data.ts already falls back to the local content mirror per document
 * and per field, so a null degrades into committed content instead of an
 * error page. Before this, one failed DNS lookup inside the Promise.all in
 * getHomeData took the whole route down with a 500 — which is exactly what
 * happened with `getaddrinfo ENOTFOUND ofayde3h.apicdn.sanity.io`.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: FetchOptions): Promise<T | null> {
  if (!client) {
    if (strict) throw new Error("Sanity client is not configured.");
    return null;
  }

  try {
    return await client
      .withConfig({ token: readToken || undefined })
      .fetch<T>(query, params, {
        next: { revalidate, tags },
      });
  } catch (error) {
    if (strict) throw error;
    // Loud on purpose: silent degradation to stale committed content is the
    // failure mode this whole arrangement exists to make visible.
    console.error(
      "[sanity] query failed — serving the local content mirror for this document.",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
