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
 * Server-only GROQ fetch with Next cache tags. Uses the read token so drafts
 * and private datasets resolve; published content still comes off the CDN.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: FetchOptions): Promise<T> {
  if (!client) {
    throw new Error("Sanity client is not configured.");
  }
  return client
    .withConfig({ token: readToken || undefined })
    .fetch<T>(query, params, {
      next: { revalidate, tags },
    });
}
