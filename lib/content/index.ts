/**
 * Local content — a typed mirror of the Sanity seed. Used only when Sanity
 * isn't configured yet (lib/data falls back to this). Once you add real
 * credentials and import scripts/seed.ndjson, live CMS data takes over.
 *
 * Content here is the REAL content pulled from tierneyohlms.com (services,
 * "why choose us" points, contact details). FAQ + highlight copy is written
 * honestly from that same source material.
 */
import type {
  HomeData,
  Service,
  Feature,
  ProcessStep,
  Highlight,
  Stat,
  FaqItem,
  SiteSettings,
  Navigation,
  HomePage,
  AboutPage,
} from "@/lib/types";

export const siteSettings: SiteSettings = {
  wordmark: "Tierney & Ohlms",
  phone: "(314) 828-1564",
  phoneHref: "tel:+13148281564",
  email: "info@tierneyohlms.com",
  addressLine1: "1015 Locust Street, Suite 1000",
  addressLine2: "Saint Louis, MO 63101",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-90.2019%2C38.6264%2C-90.1879%2C38.6344&layer=mapnik&marker=38.6304%2C-90.1949",
  footerBlurb:
    "Expert outsourced bookkeeping and controller services for growing businesses, from startup to enterprise.",
  copyrightName: "Tierney & Ohlms",
  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Bookkeeping & Monthly Close", href: "/services" },
        { label: "Controller & Reporting", href: "/services" },
        { label: "Tax Preparation & Planning", href: "/services" },
        { label: "Systems & Automation", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Why Choose Us", href: "/#why" },
        { label: "How It Works", href: "/#process" },
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "(314) 828-1564", href: "tel:+13148281564" },
        { label: "info@tierneyohlms.com", href: "mailto:info@tierneyohlms.com" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#top" },
    { label: "Terms of Service", href: "#top" },
  ],
};

export const navigation: Navigation = {
  items: [
    { label: "Services", href: "/services" },
    { label: "Our Story", href: "/about" },
    { label: "Why Us", href: "/#why" },
    { label: "How It Works", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  ctaLabel: "Get Started",
  ctaHref: "/#contact",
  portalLabel: "Client Login",
  portalHref: "https://app.financial-cents.com/cp/tierneyohlms",
};

export const homePage: HomePage = {
  seo: {
    metaTitle: "Tierney & Ohlms | Bookkeeping & Controller Services",
    metaDescription:
      "Expert outsourced bookkeeping and controller services for growing businesses. Professional CPA-level accounting from startup to enterprise.",
  },
  hero: {
    eyebrow: "Bookkeeping & Controller Services",
    heading: "Expert bookkeeping and controller services.",
    lead: "Outsource your accounting with confidence. From day-to-day bookkeeping to controller-level expertise, we handle your financials so you can focus on growing your business.",
    primaryCta: { label: "Get Started Today", href: "/#contact", variant: "primary" },
    secondaryCta: { label: "Explore Services", href: "/services", variant: "secondary" },
    image: null,
    strategyScene: {
      eyebrow: "Tax & Strategy",
      heading: "Tax strategy that stays ahead of every deadline",
      emphasis: "ahead",
      lead: "Proactive planning, quarterly reviews, and filings handled before they become fire drills. Your dedicated team keeps every date on the calendar and every dollar working.",
    },
    artifacts: {
      monthlyCloseLabel: "Monthly close",
      monthlyClosePeriod: "Mar",
      revenue: "248,900",
      expenses: "173,215",
      net: "75,685",
      closeSummary: "Books closed in 5 days",
      automation: "86% automated",
      note: "Every number tells a story. Make yours legible.",
      cashFlowChange: "+18.4%",
      invoiceNumber: "Invoice #2041",
      invoiceAmount: "4,250.00",
      filingTitle: "Q1 Estimated Tax",
      filingDue: "Due April 15",
      filingProgress: "72% prepared",
      reviewTitle: "Advisory Review",
      reviewSubtitle: "Quarterly strategy call",
      reviewTime: "Thu 10:00",
      taxSavings: "31,200",
    },
  },
  servicesHeader: {
    eyebrow: "Services",
    heading: "Everything, under one roof.",
    lead: "From cleanup to controller oversight: a full accounting department on a modern stack, for one flat monthly fee. Start wherever you are, and grow into the rest.",
  },
  whyHeader: {
    eyebrow: "Why Tierney & Ohlms",
    heading: "The difference expert support makes.",
    lead: "Partner with us and get CPA-level expertise, modern tools, and a team that scales with you, without the cost of hiring in-house.",
  },
  processHeader: {
    eyebrow: "How it works",
    heading: "A clear path from day one.",
    lead: "Getting started is simple. Here's how we take accounting off your plate and keep it running smoothly.",
  },
  faqHeader: {
    eyebrow: "FAQ",
    heading: "Questions, answered.",
    lead: "A few of the things businesses ask us most. Have another question? Reach out any time.",
  },
  ctaBanner: {
    heading: "Ready to get started?",
    lead: "Let's discuss how we can streamline your accounting and free up your time to focus on what matters most.",
    cta: { label: "Get Started Today", href: "/#contact", variant: "inverse" },
  },
  contact: {
    eyebrow: "Contact",
    heading: "Send us a message.",
    lead: "Fill out the form below and we'll get back to you shortly, usually within one business day.",
    serviceOptions: [
      "Catch-Up & Cleanup",
      "Bookkeeping & Monthly Close",
      "Controller Services & Reporting",
      "Tax Preparation & Planning",
      "Payroll",
      "Systems & Automation",
    ],
  },
};

export const services: Service[] = [
  {
    _id: "service-cleanup",
    title: "Catch-Up & Cleanup",
    slug: "catch-up-cleanup",
    icon: "cleanup",
    description:
      "Months or years behind? We reconcile, fix, and hand you a clean starting point. No judgment.",
    tagline: "Months behind? Years? We've seen worse.",
    audience: "For owners whose books are a mess, or barely exist.",
    detail:
      "We reconcile every account, untangle the history, fix what's wrong, and hand you a clean starting point. Most clients come to us this way. There's no judgment here; there's just a before and an after.",
    youGet:
      "Reconciled accounts, accurate historical financials, a tax-ready baseline, and a clear picture of where the business actually stands, often for the first time.",
  },
  {
    _id: "service-close",
    title: "Bookkeeping & Monthly Close",
    slug: "bookkeeping-monthly-close",
    icon: "close",
    description:
      "Bills paid, invoices out, accounts reconciled, and the books closed every month.",
    tagline: "Your books, handled. Every month, on time.",
    audience: "For businesses that need the books to just work.",
    detail:
      "We run the day-to-day accounting and close the books every month: bills paid on time, invoices out and followed up, transactions categorized, accounts reconciled, and financial statements delivered with a plain-English note on what changed and why it matters.",
    youGet:
      "A close that lands every month, payables and receivables handled (so cash flow stops being a guess), financials you can read in five minutes, and the end of 11pm QuickBooks sessions.",
  },
  {
    _id: "service-controller",
    title: "Controller Services & Reporting",
    slug: "controller-services-reporting",
    icon: "controller",
    description:
      "Controller-level oversight, budgets, forecasts, and CPA-prepared financials your bank will take seriously.",
    tagline: "Numbers you can run the business on.",
    audience: "For owners who need more than clean books. They need to understand them.",
    detail:
      "A controller-level review of every close, reporting built around what drives your business (job costs, per-location profit, margins by line), budgets and forecasts so next quarter isn't a surprise, and CPA-prepared financials your bank, bonding agent, or buyer will take seriously.",
    youGet:
      "Oversight from people who've done this at enterprise scale, reports that answer real questions, and numbers that hold up under scrutiny.",
    topTier: true,
  },
  {
    _id: "service-tax",
    title: "Tax Preparation & Planning",
    slug: "tax-preparation-planning",
    icon: "tax",
    description:
      "Returns filed right and on time, with planning that happens before year-end.",
    tagline: "Taxes without the scramble.",
    audience: "For owners tired of the spring fire drill.",
    detail:
      "Because we keep your books all year, tax season stops being an archaeology project. Returns get filed right and on time, and planning happens before year-end, when there's still time to do something about it.",
    youGet: "Business and personal returns handled, proactive planning, and no more March panic.",
  },
  {
    _id: "service-payroll",
    title: "Payroll",
    slug: "payroll",
    icon: "payroll",
    description:
      "Payroll that just runs: on time, taxes filed, certified payroll where projects require it.",
    tagline: "Payroll that just runs.",
    audience:
      "For businesses where payroll eats owner time or lives on one person's shoulders.",
    detail:
      "We run it: on time, taxes filed, and certified payroll handled where your projects require it.",
    youGet:
      "Employees paid correctly every time, filings done, and one less thing that's yours to remember.",
  },
  {
    _id: "service-automation",
    title: "Systems & Automation",
    slug: "systems-automation",
    icon: "automation",
    description:
      "We modernize your back office and automate the busywork: AI-assisted, CPA-reviewed, data-private.",
    tagline: "Your back office, brought up to speed.",
    audience: "For businesses running on spreadsheets, paper, or a system nobody trusts.",
    detail:
      "We move you onto a modern stack (QuickBooks Online, NetSuite, or Xero), connect the tools you already use, and automate the busywork: receipts that file themselves, bills that route for approval, invoices that chase themselves, reports that show up finished. We use AI and the newest accounting tools wherever they make the work faster and more accurate, and every number still gets reviewed by a CPA. The machines do the typing; our people do the thinking.",
    youGet:
      "Dramatically less manual entry, a faster close, fewer errors, and a back office that mostly runs itself, with humans accountable for every number in it.",
  },
];

export const features: Feature[] = [
  {
    _id: "feature-cost",
    title: "Cost-Effective",
    icon: "cost",
    description:
      "Save up to 60% compared to hiring full-time accounting staff while getting expert-level service.",
  },
  {
    _id: "feature-team",
    title: "Experienced Team",
    icon: "team",
    description:
      "Work with certified CPAs and seasoned accounting professionals with decades of combined experience.",
  },
  {
    _id: "feature-scalable",
    title: "Scalable Solutions",
    icon: "scalable",
    description:
      "Our services grow with your business. From startup to enterprise, we scale to meet your needs.",
  },
  {
    _id: "feature-technology",
    title: "Latest Technology",
    icon: "technology",
    description:
      "We leverage cutting-edge accounting software and automation to deliver efficient, accurate results.",
  },
  {
    _id: "feature-support",
    title: "Dedicated Support",
    icon: "support",
    description:
      "Get responsive support from your dedicated accounting team whenever you need it.",
  },
  {
    _id: "feature-peace",
    title: "Peace of Mind",
    icon: "peace",
    description:
      "Rest easy knowing your finances are in expert hands, allowing you to focus on your core business.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    _id: "step-consult",
    index: "01",
    title: "Consult",
    description:
      "We start with a conversation to understand your business, your goals, and your current financial picture.",
  },
  {
    _id: "step-onboard",
    index: "02",
    title: "Onboard",
    description:
      "We connect your accounts, set up the right tools, and get your books clean and current.",
  },
  {
    _id: "step-manage",
    index: "03",
    title: "Manage",
    description:
      "We handle day-to-day bookkeeping, reporting, and compliance on a dependable monthly cadence.",
  },
  {
    _id: "step-advise",
    index: "04",
    title: "Advise",
    description:
      "You get controller-level insight and strategy to guide smarter decisions as you grow.",
  },
];

export const highlights: Highlight[] = [
  {
    _id: "hl-savings",
    icon: "cost",
    claim: "Up to 60%",
    caption: "Lower cost than hiring in-house",
  },
  {
    _id: "hl-cpa",
    icon: "team",
    claim: "Certified CPAs",
    caption: "Decades of combined experience",
  },
  {
    _id: "hl-scale",
    icon: "scalable",
    claim: "Startup to Enterprise",
    caption: "Solutions that scale with you",
  },
  {
    _id: "hl-support",
    icon: "support",
    claim: "Dedicated Support",
    caption: "A responsive team, whenever you need it",
  },
];

export const stats: Stat[] = [
  { _id: "stat-years", value: "25+", label: "Years in business" },
  { _id: "stat-clients", value: "500+", label: "Clients served" },
  { _id: "stat-industries", value: "12", label: "Industries supported" },
  { _id: "stat-certified", value: "100%", label: "Certified professionals" },
];

export const faqs: FaqItem[] = [
  {
    _id: "faq-remote",
    question: "Do you work with businesses outside St. Louis?",
    answer:
      "Yes. We serve clients remotely across the country through secure cloud accounting, with in-person meetings available locally in St. Louis.",
  },
  {
    _id: "faq-savings",
    question: "How much can outsourcing really save us?",
    answer:
      "Most clients save up to 60% compared to hiring full-time in-house accounting staff, while getting CPA-level expertise on demand instead of a single hire.",
  },
  {
    _id: "faq-software",
    question: "What accounting software do you use?",
    answer:
      "We work in the leading cloud accounting platforms and layer in automation where it helps, so your books stay accurate and always up to date.",
  },
  {
    _id: "faq-scale",
    question: "Can you scale with us as we grow?",
    answer:
      "Absolutely. Our support flexes from startup bookkeeping to enterprise controller services, adjusting as your needs change.",
  },
  {
    _id: "faq-start",
    question: "How do we get started?",
    answer:
      "Reach out through the contact form or give us a call. We'll schedule a short consultation, learn about your business, and map out the right level of support.",
  },
];

export const localHomeData: HomeData = {
  site: siteSettings,
  nav: navigation,
  home: homePage,
  services,
  features,
  processSteps,
  highlights,
  stats,
  faqs,
};

export const aboutPage: AboutPage = {
  seo: {
    metaTitle: "Our Story | Tierney & Ohlms",
    metaDescription:
      "Two St. Louis CPAs started Tierney & Ohlms on nights and weekends to give every business the financial clarity the big firms reserve for their biggest clients.",
  },
  hero: {
    eyebrow: "Our Story",
    heading: "We built the firm these businesses deserve.",
    lead: "What started as nights-and-weekends bookkeeping for a handful of companies is now a full accounting team, working with clients in St. Louis and across the country.",
  },
  story: {
    eyebrow: "The story",
    heading: "It started as a side hustle.",
    body: [
      "Six years ago, Dan and I started this business as a side hustle. We were doing the books for a few companies on nights and weekends, and we kept seeing the same thing: sharp owners building real businesses, flying half-blind because nobody was giving them real financial help. The big firms were chasing bigger clients. The local shops were stuck in 1995. So the owner carried it all.",
      "At some point we thought, why not just build the firm these businesses deserve? So we did.",
      "Aptly named by two creative CPAs, Tierney & Ohlms is a complete, modern accounting team. You get what the big guys get: accurate books, 24-hour responses, a close that is actually on time, controller-level controls, and CPA-prepared financials, all on modern tools, all for one flat monthly fee. No bloat. No surprise invoices. Real CPAs reviewing the work and the processes that keep your business running.",
      "The goal is simple: give every business, big or small, the financial clarity the big guys take for granted. What started on nights and weekends is now a full team, working with clients in St. Louis and across the country. Reach out if you are facing a similar problem, or just want some time back to grow your business.",
    ].join("\n\n"),
  },
  rooted: {
    eyebrow: "Rooted in St. Louis",
    heading: "A St. Louis firm, through and through.",
    body: [
      "Tierney & Ohlms is a St. Louis firm through and through. Paul was born and raised in O'Fallon, MO, went to school here, and still has most of his family in the St. Louis metro. Both founders are raising their families in the area, so the businesses they serve are quite literally their neighbors.",
      "St. Louis is a small town, and reputation matters. The firm gives every client, no matter their size, the same high level of service, and most of its growth has come through referrals from existing clients, one trusted introduction at a time. Fittingly, the very first client came through a referral too.",
    ].join("\n\n"),
    pullQuote:
      "Big firms save their best service for their biggest clients. We give every client, whatever their size, the same attention. In a town this small, that is the only reputation worth having.",
  },
  founders: {
    eyebrow: "Founders",
    heading: "Two CPAs who kept seeing the same problem.",
    people: [
      {
        name: "Paul Ohlms",
        credential: "CPA, Co-founder",
        bio: "Before starting the firm, Paul spent his career at JPMorgan and Ernst & Young. During that period, he saw that smaller businesses were behind on technology, understaffed, and underserved, so he set out to build a team that brought real focus and work ethic to that market, the kind of service even businesses with smaller balance sheets could count on. He leads the operational accounting side and cares most about the direct impact of the work: at this level, the numbers change what the owner takes home, who they hire, and how fast the company grows.",
        outsideWork:
          "Born and raised in O'Fallon, MO, with most of his family still in the St. Louis metro. He and his wife are raising their son Bennett in St. Louis, and he loves to travel, visit the Botanical Garden, cheer on the Mizzou Tigers and golf when time allows.",
        photo: null,
      },
      {
        name: "Dan Tierney",
        credential: "CPA, Co-founder",
        bio: "Dan is a CPA who had talked with Paul for years about building a firm dedicated to small businesses. A conversation with a local banker reinforced what they already believed: St. Louis small businesses needed more support, and affordable, modern solutions existed to give it to them. Dan loves getting to know clients, understanding their challenges, and making accounting a valuable part of the business rather than a burden, clear financial insight and efficient processes that help owners make better decisions, save time, and grow.",
        // outsideWork intentionally omitted — Dan has not sent his paragraph yet.
        photo: null,
      },
    ],
  },
  promises: {
    eyebrow: "What we promise",
    heading: "What you can count on.",
    items: [
      "A response within 24 hours.",
      "Staying ahead of the curve on industry changes, we demo and investigate treasury solutions, ERPs, and automation and process tools for accounting departments.",
      "Private, data-safe AI with a CPA reviewing every output. Client financials are never used to train models.",
    ],
  },
  firstClient: {
    eyebrow: "The first client",
    heading: "A barrel company and a banker's introduction.",
    body: "Our first non-family client was a barrel company that needed financials a bank would trust to approve a loan. Their legacy firm was mostly tax preparers doing some accounting on the side, so the books were behind and not something a lender would accept. A local banker introduced us, and from the moment we met them the need was obvious. We cleaned up the prior financials, built out a full accounting process, and set a real close timeline. That experience validated the vision and became the foundation of the firm.",
  },
};
