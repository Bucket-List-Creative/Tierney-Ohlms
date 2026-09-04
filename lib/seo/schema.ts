import { absoluteUrl, siteUrl } from "./urls";
import type { SiteSettings } from "@/lib/types";

/**
 * JSON-LD for the firm's identity, built from siteSettings so there is one
 * source of truth for the business facts.
 *
 * Two rules hold throughout: every value must correspond to something a
 * visitor can actually see on the site, and a property with no real data is
 * omitted rather than emitted empty. That is why several properties the
 * vocabulary allows are absent here — see the notes on buildLocalBusiness.
 */

const ORGANIZATION_ID = `${siteUrl}/#organization`;

type JsonLdObject = Record<string, unknown>;

/** Drops keys whose value is undefined, null or an empty string. */
function compact(input: JsonLdObject): JsonLdObject {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

function postalAddress(site: SiteSettings): JsonLdObject | undefined {
  const a = site.address;
  if (!a?.streetAddress || !a.addressLocality) return undefined;
  return compact({
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  });
}

function geoCoordinates(site: SiteSettings): JsonLdObject | undefined {
  const g = site.geo;
  if (typeof g?.latitude !== "number" || typeof g?.longitude !== "number") {
    return undefined;
  }
  return { "@type": "GeoCoordinates", latitude: g.latitude, longitude: g.longitude };
}

/** Telephone in the E.164 form the tel: link already uses. */
function telephone(site: SiteSettings): string | undefined {
  return site.phoneHref?.replace(/^tel:/, "") || site.phone || undefined;
}

export function buildOrganization(site: SiteSettings): JsonLdObject {
  return compact({
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.wordmark,
    url: `${siteUrl}/`,
    description: site.footerBlurb,
    email: site.email,
    telephone: telephone(site),
    address: postalAddress(site),
    // Deliberately absent until the business confirms them:
    //   legalName  — only the trading name is published anywhere
    //   logo       — no logo asset exists in the CMS yet
    //   sameAs     — an identity claim; no confirmed profile URLs
  });
}

/**
 * AccountingService is the most specific accurate LocalBusiness subtype for
 * this firm, which is what Google's guidance asks for.
 *
 * Still omitted, each blocked on a business answer rather than on code:
 *   areaServed              — "St. Louis" and "Missouri" are different claims
 *   openingHoursSpecification — `hours` is one free-text string
 *   priceRange              — outside the NAP-and-geo scope agreed for launch
 *   hasMap                  — mapEmbedUrl is an iframe embed, not a map page
 *   aggregateRating/review  — Google restricts these to sites reviewing OTHER
 *                             businesses; a firm rating itself is self-serving
 */
export function buildLocalBusiness(site: SiteSettings): JsonLdObject {
  return compact({
    "@type": "AccountingService",
    "@id": `${siteUrl}/#localbusiness`,
    name: site.wordmark,
    url: `${siteUrl}/`,
    description: site.footerBlurb,
    email: site.email,
    telephone: telephone(site),
    address: postalAddress(site),
    geo: geoCoordinates(site),
    parentOrganization: { "@id": ORGANIZATION_ID },
  });
}

/** The site-wide identity graph, emitted once per page. */
export function buildSiteGraph(site: SiteSettings): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(site),
      buildLocalBusiness(site),
      compact({
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.wordmark,
        publisher: { "@id": ORGANIZATION_ID },
      }),
    ],
  };
}

export { absoluteUrl };
