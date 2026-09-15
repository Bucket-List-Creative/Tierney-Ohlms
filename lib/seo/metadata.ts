import type { Metadata } from "next";
import type { SanityImage, Seo } from "@/lib/types";
import { absoluteUrl } from "@/lib/seo/urls";

/** The brand, and how the root template appends it. Kept in one place so the
 *  de-duplication below can never drift from `app/layout.tsx`. */
const BRAND = "Tierney & Ohlms";

/**
 * Strip the brand when an editor has already typed it into `metaTitle`.
 *
 * The root layout appends `· Tierney & Ohlms` to every page title. A CMS value
 * that also carries the brand therefore renders it twice — the homepage came
 * out at 79 characters with "Tierney & Ohlms" at both ends, pushing the
 * descriptive half toward truncation.
 *
 * Content hygiene alone would not hold: nothing stops the next editor typing
 * it back in. This makes the template the single owner of the suffix, so both
 * the current values and anything typed later resolve to one brand mention.
 */
export function withoutBrand(title: string | undefined | null): string | undefined {
  if (!title) return undefined;
  const cleaned = title
    // "Brand | Rest" or "Brand — Rest" -> "Rest"
    .replace(new RegExp(`^\\s*${BRAND}\\s*[|·—–-]\\s*`, "i"), "")
    // "Rest | Brand" -> "Rest"
    .replace(new RegExp(`\\s*[|·—–-]\\s*${BRAND}\\s*$`, "i"), "")
    .trim();
  // A title that is only the brand still needs to say something.
  return cleaned || undefined;
}

/** Open Graph image entry, or nothing when neither source has one. */
function ogImageFor(image?: SanityImage | null) {
  if (!image?.src) return undefined;
  return [
    {
      url: image.src,
      ...(image.width ? { width: image.width } : {}),
      ...(image.height ? { height: image.height } : {}),
      alt: image.alt || BRAND,
    },
  ];
}

/**
 * Metadata for a CMS-driven page.
 *
 * Derives what can be derived — canonical from the route, OG title from the
 * SEO title, the card type from whether an image actually exists — so editors
 * are not retyping the same values on every document.
 *
 * `fallbackImage` is the site-wide default, letting a page with no image of
 * its own still share with one.
 */
export function pageMetadata({
  path,
  seo,
  fallbackTitle,
  fallbackImage,
}: {
  path: string;
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackImage?: SanityImage | null;
}): Metadata {
  const title = withoutBrand(seo?.metaTitle) ?? fallbackTitle;
  const description = seo?.metaDescription;
  const images = ogImageFor(seo?.ogImage) ?? ogImageFor(fallbackImage);

  return {
    alternates: { canonical: absoluteUrl(path) },
    title,
    description,
    openGraph: {
      url: absoluteUrl(path),
      title,
      ...(description ? { description } : {}),
      ...(images ? { images } : {}),
    },
    // summary_large_image only earns its name with an image behind it;
    // without one Twitter/X renders a broken large card.
    ...(images ? { twitter: { card: "summary_large_image" as const, title, ...(description ? { description } : {}), images } } : {}),
  };
}
