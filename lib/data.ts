import { isSanityConfigured } from "@/lib/sanity/env";
import { sanityFetch, CACHE_TAGS } from "@/lib/sanity/fetch";
import {
  siteSettingsQuery,
  navigationQuery,
  homePageQuery,
  servicesQuery,
  featuresQuery,
  processStepsQuery,
  highlightsQuery,
  statsQuery,
  faqsQuery,
  pageBySlugQuery,
  pageSlugsQuery,
} from "@/lib/sanity/queries";
import { localHomeData } from "@/lib/content";
import type {
  HomeData,
  SiteSettings,
  Navigation,
  HomePage,
  Service,
  Feature,
  ProcessStep,
  Highlight,
  Stat,
  FaqItem,
  GenericPage,
} from "@/lib/types";

/**
 * Single entry point for all homepage content. When Sanity is configured this
 * runs the real GROQ queries in parallel with cache tags; otherwise it serves
 * the local content mirror so the site works before credentials are added.
 */
export async function getHomeData(): Promise<HomeData> {
  if (!isSanityConfigured) {
    return localHomeData;
  }

  const [site, nav, home, services, features, processSteps, highlights, stats, faqs] =
    await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: [CACHE_TAGS.siteSettings] }),
      sanityFetch<Navigation>({ query: navigationQuery, tags: [CACHE_TAGS.navigation] }),
      sanityFetch<HomePage>({ query: homePageQuery, tags: [CACHE_TAGS.homePage] }),
      sanityFetch<Service[]>({ query: servicesQuery, tags: [CACHE_TAGS.service] }),
      sanityFetch<Feature[]>({ query: featuresQuery, tags: [CACHE_TAGS.feature] }),
      sanityFetch<ProcessStep[]>({ query: processStepsQuery, tags: [CACHE_TAGS.processStep] }),
      sanityFetch<Highlight[]>({ query: highlightsQuery, tags: [CACHE_TAGS.highlight] }),
      sanityFetch<Stat[]>({ query: statsQuery, tags: [CACHE_TAGS.stat] }),
      sanityFetch<FaqItem[]>({ query: faqsQuery, tags: [CACHE_TAGS.faq] }),
    ]);

  // Fall back per-field so a not-yet-seeded document never blanks the page.
  const fb = localHomeData;
  return {
    site: site ?? fb.site,
    nav: nav ?? fb.nav,
    home: home ?? fb.home,
    services: services?.length ? services : fb.services,
    features: features?.length ? features : fb.features,
    processSteps: processSteps?.length ? processSteps : fb.processSteps,
    highlights: highlights?.length ? highlights : fb.highlights,
    stats: stats?.length ? stats : fb.stats,
    faqs: faqs?.length ? faqs : fb.faqs,
  };
}

export async function getPageSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  const rows = await sanityFetch<{ slug: string }[]>({
    query: pageSlugsQuery,
    tags: [CACHE_TAGS.page],
  });
  return (rows ?? []).map((r) => r.slug).filter(Boolean);
}

export async function getPage(slug: string): Promise<GenericPage | null> {
  if (!isSanityConfigured) return null;
  return sanityFetch<GenericPage | null>({
    query: pageBySlugQuery,
    params: { slug },
    tags: [CACHE_TAGS.page],
  });
}
