import { isSanityConfigured } from "@/lib/sanity/env";
import { sanityFetch, CACHE_TAGS } from "@/lib/sanity/fetch";
import {
  siteSettingsQuery,
  navigationQuery,
  homePageQuery,
  aboutPageQuery,
  servicesQuery,
  featuresQuery,
  processStepsQuery,
  highlightsQuery,
  faqsQuery,
  pageBySlugQuery,
  pageSlugsQuery,
  sitemapEntriesQuery,
} from "@/lib/sanity/queries";
import { localHomeData, aboutPage as localAboutPage } from "@/lib/content";
import type {
  HomeData,
  SiteSettings,
  Navigation,
  HomePage,
  AboutPage,
  Service,
  Feature,
  ProcessStep,
  Highlight,
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

  const [site, nav, home, services, features, processSteps, highlights, faqs] =
    await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: [CACHE_TAGS.siteSettings] }),
      sanityFetch<Navigation>({ query: navigationQuery, tags: [CACHE_TAGS.navigation] }),
      sanityFetch<HomePage>({ query: homePageQuery, tags: [CACHE_TAGS.homePage] }),
      sanityFetch<Service[]>({ query: servicesQuery, tags: [CACHE_TAGS.service] }),
      sanityFetch<Feature[]>({ query: featuresQuery, tags: [CACHE_TAGS.feature] }),
      sanityFetch<ProcessStep[]>({ query: processStepsQuery, tags: [CACHE_TAGS.processStep] }),
      sanityFetch<Highlight[]>({ query: highlightsQuery, tags: [CACHE_TAGS.highlight] }),
      sanityFetch<FaqItem[]>({ query: faqsQuery, tags: [CACHE_TAGS.faq] }),
    ]);

  // Fall back per-field so a not-yet-seeded document never blanks the page.
  const fb = localHomeData;
  const mergedHome: HomePage = home
    ? {
        ...fb.home,
        ...home,
        hero: {
          ...fb.home.hero,
          ...home.hero,
          strategyScene: home.hero?.strategyScene ?? fb.home.hero.strategyScene,
          artifacts: {
            ...fb.home.hero.artifacts!,
            ...home.hero?.artifacts,
          } as NonNullable<HomePage["hero"]["artifacts"]>,
        },
      }
    : fb.home;
  return {
    site: site ?? fb.site,
    nav: nav ?? fb.nav,
    home: mergedHome,
    services: services?.length ? services : fb.services,
    features: features?.length ? features : fb.features,
    processSteps: processSteps?.length ? processSteps : fb.processSteps,
    highlights: highlights?.length ? highlights : fb.highlights,
    faqs: faqs?.length ? faqs : fb.faqs,
  };
}

/**
 * A single service by slug, for /services/[slug]. Reads from the same resolved
 * list as every other surface, so the detail page can never disagree with the
 * ladder that links into it — and the local mirror keeps the pages alive
 * before Sanity is seeded.
 */
export async function getService(slug: string): Promise<Service | null> {
  const { services } = await getHomeData();
  return services.find((s) => s.slug === slug) ?? null;
}

/** Slugs for `generateStaticParams` — every service, in ladder order. */
export async function getServiceSlugs(): Promise<string[]> {
  const { services } = await getHomeData();
  return services.map((s) => s.slug).filter(Boolean);
}

/**
 * Our Story page content. Falls back per-section, so a half-filled `aboutPage`
 * document in the Studio still renders complete copy: any section the editor
 * hasn't touched yet keeps the local text instead of collapsing to nothing.
 */
export async function getAboutPage(): Promise<AboutPage> {
  const fb = localAboutPage;
  if (!isSanityConfigured) return fb;

  const doc = await sanityFetch<Partial<AboutPage> | null>({
    query: aboutPageQuery,
    tags: [CACHE_TAGS.aboutPage],
  });
  if (!doc) return fb;

  return {
    seo: doc.seo ?? fb.seo,
    hero: doc.hero ?? fb.hero,
    story: doc.story ?? fb.story,
    rooted: doc.rooted ?? fb.rooted,
    // Arrays fall back on empty, not just on null: an editor who created the
    // document but hasn't added the founders yet should still see them.
    founders: doc.founders?.people?.length ? doc.founders : fb.founders,
    promises: doc.promises?.items?.length ? doc.promises : fb.promises,
    firstClient: doc.firstClient ?? fb.firstClient,
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

/** A route the sitemap should list, with a real modification date if we have one. */
export type SitemapRoute = { path: string; lastModified?: string };

/** Routes that exist regardless of CMS content. */
const STATIC_ROUTES = ["/", "/about", "/services"];

/**
 * Every indexable route, for app/sitemap.ts.
 *
 * `lastModified` is omitted rather than defaulted: a sitemap where every entry
 * claims to have changed at build time tells search engines nothing, and the
 * local content mirror has no edit dates to report.
 */
export async function getSitemapRoutes(): Promise<SitemapRoute[]> {
  const routes: SitemapRoute[] = STATIC_ROUTES.map((path) => ({ path }));

  if (!isSanityConfigured) {
    // No CMS yet — list the service routes the local mirror renders.
    return [
      ...routes,
      ...localHomeData.services
        .filter((service) => service.slug)
        .map((service) => ({ path: `/services/${service.slug}` })),
    ];
  }

  const data = await sanityFetch<{
    services: { slug: string; _updatedAt?: string }[] | null;
    pages: { slug: string; _updatedAt?: string }[] | null;
  }>({
    query: sitemapEntriesQuery,
    tags: [CACHE_TAGS.service, CACHE_TAGS.page],
  });

  const services: { slug: string; _updatedAt?: string }[] = data?.services?.length
    ? data.services
    : localHomeData.services.map((service) => ({ slug: service.slug }));

  return [
    ...routes,
    ...services
      .filter((entry) => entry.slug)
      .map((entry) => ({
        path: `/services/${entry.slug}`,
        lastModified: entry._updatedAt,
      })),
    ...(data?.pages ?? [])
      .filter((entry) => entry.slug)
      .map((entry) => ({ path: `/${entry.slug}`, lastModified: entry._updatedAt })),
  ];
}
