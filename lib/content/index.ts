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
  // Structured mirror of the two display lines above, for JSON-LD. Keep in sync.
  address: {
    streetAddress: "1015 Locust Street, Suite 1000",
    addressLocality: "Saint Louis",
    addressRegion: "MO",
    postalCode: "63101",
    addressCountry: "US",
  },
  // 1015 Locust Building, geocoded from the street address. Matches the marker
  // in mapEmbedUrl below — keep the two in step.
  geo: { latitude: 38.6304, longitude: -90.1949 },
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-90.2019%2C38.6264%2C-90.1879%2C38.6344&layer=mapnik&marker=38.6304%2C-90.1949",
  footerBlurb:
    "Expert outsourced bookkeeping and controller services for growing businesses, from startup to enterprise.",
  copyrightName: "Tierney & Ohlms",
  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Accounting & Monthly Close", href: "/services/accounting-monthly-close" },
        { label: "Controller & Reporting", href: "/services/controller-services-reporting" },
        { label: "Shared Services", href: "/services/shared-services" },
        { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
        { label: "All services", href: "/services" },
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
    emphasis: "one roof.",
    lead: "From cleanup to controller oversight: a full accounting department on a modern stack, for one flat monthly fee. Start wherever you are, and grow into the rest.",
  },
  whyHeader: {
    eyebrow: "Why Tierney & Ohlms",
    heading: "The difference expert support makes.",
    emphasis: "support",
    lead: "Partner with us and get CPA-level expertise, modern tools, and a team that scales with you, without the cost of hiring in-house.",
  },
  processHeader: {
    eyebrow: "How it works",
    heading: "A clear path from day one.",
    emphasis: "day one.",
    lead: "Getting started is simple. Here's how we take accounting off your plate and keep it running smoothly.",
  },
  faqHeader: {
    eyebrow: "FAQ",
    heading: "Questions, answered.",
    emphasis: "answered.",
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
    emphasis: "message.",
    lead: "Fill out the form below and we'll get back to you shortly, usually within one business day.",
    serviceOptions: [
      "Catch-Up & Cleanup",
      "Accounting & Monthly Close",
      "Controller Services & Reporting",
      "Shared Services",
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
    audience: "Owners months or years behind, or with books that don't reflect reality.",
    detail:
      "We reconcile every account, untangle the history, fix what's wrong, and hand you a clean starting point. Most clients come to us this way. There's no judgment here; there's just a before and an after.",
    includes: [
      "Full reconciliation of every general ledger account, including bank, credit card, and loans",
      "Historical transaction cleanup and recategorization",
      "Correction of misclassified or missing entries",
      "A tax-ready baseline financial package",
    ],
    youGet:
      "Accurate historical financials, a clean starting point, and a clear read on where the business actually stands, often for the first time.",
    seo: {
      metaTitle: "Catch-Up & Cleanup Bookkeeping",
      metaDescription:
        "Months or years behind on the books? We reconcile every account, fix the history, and hand you a tax-ready baseline you can actually trust.",
    },
  },
  {
    _id: "service-close",
    title: "Accounting & Monthly Close",
    slug: "accounting-monthly-close",
    icon: "close",
    description:
      "Bills paid, invoices out, accounts reconciled, and the books closed every month.",
    tagline: "Your books, handled. Every month, on time.",
    audience:
      "Businesses that need the books to just work, every month, without an in-house hire.",
    detail:
      "We run the day-to-day accounting and close the books every month: bills paid on time, invoices out and followed up, transactions categorized, accounts reconciled, and financial statements delivered with a plain-English note on what changed and why it matters.",
    includes: [
      "Transaction categorization and reconciliation on a monthly cadence",
      "AP and AR management, so bills get paid on time and invoices get sent and followed up",
      "A monthly close with financials delivered on an agreed date every month",
      "A plain-English summary of what changed and why it matters",
    ],
    youGet:
      "A close that lands every month, cash flow that stops being a guess, financials you can read in five minutes, and the end of 11pm QuickBooks sessions.",
    seo: {
      metaTitle: "Accounting & Monthly Close",
      metaDescription:
        "Day-to-day accounting and a monthly close that actually lands: AP and AR handled, accounts reconciled, and financials delivered on a set date each month.",
    },
  },
  {
    _id: "service-controller",
    title: "Controller Services & Reporting",
    slug: "controller-services-reporting",
    icon: "controller",
    description:
      "Controller-level oversight, budgets, forecasts, and CPA-prepared financials your bank will take seriously.",
    tagline: "Numbers you can run the business on.",
    audience: "Owners who need to understand the numbers, not just receive them.",
    detail:
      "A controller-level review of every close, reporting built around what drives your business (job costs, per-location profit, margins by line), budgets and forecasts so next quarter isn't a surprise, and CPA-prepared financials your bank, bonding agent, or buyer will take seriously.",
    includes: [
      "Controller-level review of every close",
      "Custom reporting built around what actually drives the business: job costs, per-location P&L, margin by line",
      "Budgets and forecasts",
      "CPA-prepared financials suitable for a bank, bonding agent, or buyer",
    ],
    youGet:
      "Enterprise-level oversight, reports that answer real questions, and numbers that hold up under scrutiny.",
    topTier: true,
    seo: {
      metaTitle: "Controller Services & Financial Reporting",
      metaDescription:
        "Controller-level review of every close, custom reporting, budgets and forecasts, and CPA-prepared financials a bank, bonding agent, or buyer will take seriously.",
    },
  },
  {
    _id: "service-shared",
    title: "Shared Services",
    slug: "shared-services",
    icon: "shared",
    description:
      "One back-office function, run end-to-end on an ongoing basis: AP, reconciliation, controls.",
    tagline: "One function, run right, every month.",
    audience:
      "Businesses and private-equity-owned portfolio companies that need one specific back-office function run reliably on an ongoing basis.",
    detail:
      "Not every business needs the full bookkeeping-through-controller ladder. Sometimes one function is the bottleneck, and it needs an owner. We take that function, run it end-to-end on a recurring basis, and document it so it holds up without depending on any one person.",
    practiceExamples: [
      {
        _key: "pe-retail",
        title: "A multi-location retail client",
        body: "We took over AP end to end and reconcile POS transactions across every location each month, so nothing slips through between systems.",
      },
      {
        _key: "pe-distribution",
        title: "A distribution and parts business",
        body: "We ran a full AP walkthrough, plugged in automated bill pay, integrated it with their ERP, and documented the internal controls so the process holds up without relying on one person's memory.",
      },
    ],
    includes: [
      "AP processing and payment automation",
      "Reconciliation across multiple locations or systems, including POS, ERP, and bill pay tools",
      "Internal controls documentation, so the process isn't dependent on one person",
      "Ongoing management, not a one-time project",
    ],
    youGet:
      "A defined, recurring back-office function handled end-to-end, without adding headcount or hoping one employee never leaves.",
    seo: {
      metaTitle: "Shared Services for Back-Office Functions",
      metaDescription:
        "One back-office function, run end-to-end: AP processing and payment automation, multi-location and multi-system reconciliation, and documented internal controls.",
    },
  },
  {
    _id: "service-tax",
    title: "Tax Preparation & Planning",
    slug: "tax-preparation-planning",
    icon: "tax",
    description:
      "Returns filed right and on time, with planning that happens before year-end.",
    tagline: "Taxes without the scramble.",
    audience: "Owners tired of the spring scramble.",
    detail:
      "Because we keep your books all year, tax season stops being an archaeology project. Returns get filed right and on time, and planning happens before year-end, when there's still time to do something about it.",
    includes: [
      "Business and personal return preparation",
      "Quarterly estimated tax planning",
      "Year-end tax strategy, while there's still time to act on it",
      "Entity structure and election guidance where relevant",
    ],
    youGet:
      "Returns filed right and on time, planning that happens before year-end, and no March panic.",
    seo: {
      metaTitle: "Tax Preparation & Planning",
      metaDescription:
        "Business and personal returns, quarterly estimates, and year-end strategy that happens while there is still time to act on it. No spring scramble.",
    },
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
      "Businesses where payroll eats owner time or lives on one person's shoulders.",
    detail:
      "We run it: on time, taxes filed, and certified payroll handled where your projects require it.",
    includes: [
      "Payroll processing on your schedule",
      "Tax filings and deposits handled",
      "Certified payroll where your projects require it",
    ],
    youGet:
      "Employees paid correctly every time, filings done, and one less recurring task on your plate.",
    seo: {
      metaTitle: "Outsourced Payroll",
      metaDescription:
        "Payroll processed on your schedule, tax filings and deposits handled, and certified payroll where projects require it.",
    },
  },
  {
    _id: "service-automation",
    title: "Systems & Automation",
    slug: "systems-automation",
    icon: "automation",
    description:
      "We modernize your back office and automate the busywork: AI-assisted, CPA-reviewed, data-private.",
    tagline: "Your back office, brought up to speed.",
    audience: "Businesses running on spreadsheets, paper, or a system nobody trusts.",
    detail:
      "We move you onto a modern stack, connect the tools you already use, and automate the busywork: receipts that file themselves, bills that route for approval, invoices that chase themselves, reports that show up finished. We use AI and the newest accounting tools wherever they make the work faster and more accurate, and every number still gets reviewed by a CPA. The machines do the typing; our people do the thinking.",
    includes: [
      "Migration to a modern stack: QuickBooks Online, NetSuite, or Xero",
      "Integration of the tools you already run, including AP automation, expense tools, and bill pay",
      "Automated workflows for receipts, approval routing, invoice follow-up, and recurring reports",
      "CPA review of every automated output",
    ],
    youGet:
      "Less manual entry, a faster close, and fewer errors, with a human accountable for every number.",
    seo: {
      metaTitle: "Accounting Systems & Automation",
      metaDescription:
        "Migration to QuickBooks Online, NetSuite, or Xero, integration of the tools you already run, and automated workflows with CPA review of every output.",
    },
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
