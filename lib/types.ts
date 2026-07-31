/**
 * Shared content types. These describe the shape returned by the GROQ queries
 * AND the local fallback content (lib/content). Components never know or care
 * where their data came from.
 */
import type { IconKey } from "@/components/icons/registry";

export type SanityImage = {
  src: string | null;
  alt: string;
  lqip?: string | null;
  width?: number;
  height?: number;
};

export type LinkItem = { label: string; href: string };

export type CtaVariant = "primary" | "secondary" | "inline" | "inverse";
export type Cta = { label: string; href: string; variant?: CtaVariant };

export type SectionHeader = {
  eyebrow?: string;
  heading: string;
  lead?: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  icon: IconKey;
  description: string; // short, used in the homepage overview
  tagline?: string; // punchy headline for the services page
  audience?: string; // "For ..." line
  detail?: string; // body paragraph
  youGet?: string; // the "You get:" summary
  topTier?: boolean; // highlight this card
};

export type Feature = {
  _id: string;
  title: string;
  description: string;
  icon: IconKey;
};

export type ProcessStep = {
  _id: string;
  index: string; // "01".."04"
  title: string;
  description: string;
};

export type Highlight = {
  _id: string;
  icon: IconKey;
  claim: string; // e.g. "Up to 60%"
  caption: string; // e.g. "Lower cost than hiring in-house"
};

export type Stat = {
  _id: string;
  value: string; // e.g. "25+", "100%"
  label: string;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

export type FooterColumn = { title: string; links: LinkItem[] };

export type SiteSettings = {
  wordmark: string;
  phone: string;
  phoneHref: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  hours?: string;
  mapEmbedUrl?: string | null;
  footerBlurb: string;
  copyrightName: string;
  footerColumns: FooterColumn[];
  legalLinks: LinkItem[];
};

export type Navigation = {
  items: LinkItem[];
  ctaLabel: string;
  ctaHref: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage | null;
};

export type HomePage = {
  seo?: Seo;
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    image?: SanityImage | null;
  };
  servicesHeader: SectionHeader;
  whyHeader: SectionHeader;
  processHeader: SectionHeader;
  faqHeader: SectionHeader;
  ctaBanner: {
    heading: string;
    lead: string;
    cta: Cta;
  };
  contact: {
    eyebrow: string;
    heading: string;
    lead?: string;
    serviceOptions: string[];
  };
};

/** Everything the homepage needs, resolved in one call. */
export type HomeData = {
  site: SiteSettings;
  nav: Navigation;
  home: HomePage;
  services: Service[];
  features: Feature[];
  processSteps: ProcessStep[];
  highlights: Highlight[];
  stats: Stat[];
  faqs: FaqItem[];
};

export type GenericPage = {
  title: string;
  slug: string;
  seo?: Seo;
  sections: SectionHeader[];
};
