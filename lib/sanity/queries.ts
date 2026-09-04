import { groq } from "next-sanity";

/** Reusable image projection: resolved URL + LQIP blur + dimensions + alt. */
const imageProjection = groq`{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const ctaProjection = groq`{ label, href, variant }`;
const headerProjection = groq`{ eyebrow, heading, emphasis, lead }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  wordmark,
  phone,
  phoneHref,
  email,
  addressLine1,
  addressLine2,
  hours,
  address{ streetAddress, addressLocality, addressRegion, postalCode, addressCountry },
  geo{ latitude, longitude },
  mapEmbedUrl,
  footerBlurb,
  copyrightName,
  footerColumns[]{ title, links[]{ label, href } },
  legalLinks[]{ label, href }
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ label, href },
  ctaLabel,
  ctaHref,
  portalLabel,
  portalHref
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  seo{ metaTitle, metaDescription, ogImage${imageProjection} },
  hero{
    eyebrow,
    heading,
    lead,
    primaryCta${ctaProjection},
    secondaryCta${ctaProjection},
    image${imageProjection},
    strategyScene{ eyebrow, heading, emphasis, lead },
    artifacts{
      monthlyCloseLabel, monthlyClosePeriod, revenue, expenses, net,
      closeSummary, automation, note, cashFlowChange, invoiceNumber,
      invoiceAmount, filingTitle, filingDue, filingProgress, reviewTitle,
      reviewSubtitle, reviewTime, taxSavings
    }
  },
  servicesHeader${headerProjection},
  whyHeader${headerProjection},
  processHeader${headerProjection},
  faqHeader${headerProjection},
  ctaBanner{ heading, lead, cta${ctaProjection} },
  contact{ eyebrow, heading, emphasis, lead, serviceOptions }
}`;

/** Everything a service needs, on the overview list AND on its own page. */
const serviceProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  icon,
  description,
  tagline,
  audience,
  detail,
  "includes": coalesce(includes, []),
  "practiceExamples": coalesce(practiceExamples[]{ _key, title, body }, []),
  youGet,
  topTier,
  seo{ metaTitle, metaDescription, ogImage${imageProjection} }
}`;

export const servicesQuery = groq`*[_type == "service"] | order(orderRank)${serviceProjection}`;

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)]
  | order(orderRank){ "slug": slug.current }`;

export const featuresQuery = groq`*[_type == "feature"] | order(orderRank){
  _id, title, description, icon
}`;

export const processStepsQuery = groq`*[_type == "processStep"] | order(index){
  _id, index, title, description
}`;

export const highlightsQuery = groq`*[_type == "highlight"] | order(orderRank){
  _id, icon, claim, caption
}`;

export const faqsQuery = groq`*[_type == "faq"] | order(orderRank){
  _id, question, answer
}`;

export const pageSlugsQuery = groq`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seo{ metaTitle, metaDescription, ogImage${imageProjection} },
  sections[]${headerProjection}
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  seo{ metaTitle, metaDescription, ogImage${imageProjection} },
  hero${headerProjection},
  story{ eyebrow, heading, body },
  rooted{ eyebrow, heading, body, pullQuote },
  founders{
    eyebrow,
    heading,
    "people": coalesce(people[]{
      _key,
      name,
      credential,
      bio,
      outsideWork,
      photo${imageProjection}
    }, [])
  },
  promises{
    eyebrow,
    heading,
    "items": coalesce(items, [])
  },
  firstClient{ eyebrow, heading, body }
}`;

/**
 * Everything the sitemap needs: the slug of each CMS-driven route plus the
 * document's real last-modified date, so `lastmod` reflects an actual edit
 * rather than the time of the last deploy.
 */
export const sitemapEntriesQuery = groq`{
  "services": *[_type == "service" && defined(slug.current)]
    | order(orderRank){ "slug": slug.current, _updatedAt },
  "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`;
