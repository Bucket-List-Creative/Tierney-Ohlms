import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * Read-only client used by Server Components. Returns null until Sanity is
 * configured so importing this never throws at build time.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // published, cacheable content, fast reads
      perspective: "published",
      stega: {
        studioUrl: "/studio",
      },
    })
  : null;
