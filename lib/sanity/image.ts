import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Build a Sanity image URL. Returns null when Sanity isn't configured or the
 * source is empty, so callers can fall back to a placeholder.
 */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max");
}
