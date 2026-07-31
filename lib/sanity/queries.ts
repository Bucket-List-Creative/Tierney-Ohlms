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
const headerProjection = groq`{ eyebrow, heading, lead }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  wordmark,
  phone,
  phoneHref,
  email,
  addressLine1,
  addressLine2,
  hours,
  mapEmbedUrl,
  footerBlurb,
  copyrightName,
  footerColumns[]{ title, links[]{ label, href } },
  legalLinks[]{ label, href }
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{ label, href },
  ctaLabel,
  ctaHref
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  seo{ metaTitle, metaDescription, ogImage${imageProjection} },
  hero{
    eyebrow,
    heading,
    lead,
    primaryCta${ctaProjection},
    secondaryCta${ctaProjection},
    image${imageProjection}
  },
  servicesHeader${headerProjection},
  whyHeader${headerProjection},
  processHeader${headerProjection},
  faqHeader${headerProjection},
  ctaBanner{ heading, lead, cta${ctaProjection} },
  contact{ eyebrow, heading, lead, serviceOptions }
}`;

export const servicesQuery = groq`*[_type == "service"] | order(orderRank){
  _id, title, "slug": slug.current, icon, description,
  tagline, audience, detail, youGet, topTier
}`;

export const featuresQuery = groq`*[_type == "feature"] | order(orderRank){
  _id, title, description, icon
}`;

export const processStepsQuery = groq`*[_type == "processStep"] | order(index){
  _id, index, title, description
}`;

export const highlightsQuery = groq`*[_type == "highlight"] | order(orderRank){
  _id, icon, claim, caption
}`;

export const statsQuery = groq`*[_type == "stat"] | order(orderRank){
  _id, value, label
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
