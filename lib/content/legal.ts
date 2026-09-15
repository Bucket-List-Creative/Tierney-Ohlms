/**
 * Privacy Policy and Terms of Service.
 *
 * DRAFTED FROM THE CODEBASE, NOT FROM A TEMPLATE. Every factual claim below
 * about data handling was verified against the source:
 *
 *   - the contact form's fields            components/sections/ContactForm.tsx
 *   - where submissions go                 app/api/contact/route.ts -> Jotform
 *   - the embedded map                     components/primitives/MapCard.tsx
 *   - the client portal link               lib/content/index.ts (navigation)
 *   - the absence of analytics or cookies  verified by search across app/, components/, lib/
 *
 * Nothing here asserts a retention period, a governing law, a legal entity
 * type, or a regulatory position, because none of those are discoverable from
 * the repository and inventing them would be worse than omitting them. The
 * open questions are listed in seo-audit/2026-09-15-legal-pages.md.
 *
 * `LEGAL_REVIEW_PENDING` renders a visible notice at the top of both pages.
 * Set it to false once a qualified reviewer has signed the content off — that
 * is the only change needed to publish them as final.
 */
export const LEGAL_REVIEW_PENDING = true;

export type LegalSection = { heading: string; body: string[] };
export type LegalDocument = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  updated: "September 15, 2026",
  intro:
    "This policy explains what this website collects, who it is shared with, and what we do with it. It covers this website only — the handling of client financial records under an engagement is governed by your engagement letter, not by this page.",
  sections: [
    {
      heading: "The short version",
      body: [
        "This site runs no analytics, sets no advertising or tracking cookies of its own, and builds no visitor profiles. The only information we receive is what you choose to type into the contact form.",
        "We do not sell personal information, and we do not share it with anyone except the service providers named below who help us operate the site.",
      ],
    },
    {
      heading: "Information you give us",
      body: [
        "The contact form asks for your name, email address and message, and optionally your company, phone number, and the service you are interested in. You control all of it — nothing is required beyond name, email and message.",
        "The form includes a hidden field that is invisible to people and only ever filled in by automated bots. Submissions with that field completed are discarded without being read.",
      ],
    },
    {
      heading: "Information collected automatically",
      body: [
        "Like nearly all websites, the server that hosts this site keeps standard request logs, which typically include an IP address, the page requested, a timestamp and a browser user-agent string. These are used to operate and secure the site.",
        "This site does not use Google Analytics or any equivalent, and it does not load advertising or social media tracking scripts. Web fonts are served from this site's own domain rather than from a font provider, so displaying a page makes no request to a third party for them.",
      ],
    },
    {
      heading: "Service providers",
      body: [
        "Contact form submissions are transmitted to and stored by Jotform, which hosts the form backend and delivers submissions to us. Your submission is subject to Jotform's own privacy policy in addition to this one.",
        "The office location page embeds a map from Google Maps. When that map loads, Google receives your IP address and may set its own cookies, under Google's privacy policy. The rest of the site does not embed third-party content.",
        "This site's content is managed in Sanity, a content management system. Sanity stores our published page content; it does not receive information about you.",
      ],
    },
    {
      heading: "The client portal",
      body: [
        "The \"Client Login\" link leaves this website for Financial Cents, a separate service we use to work with clients. Anything you do there is governed by Financial Cents' terms and privacy policy, not by this page.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "This website sets no cookies of its own, and stores nothing in your browser's local storage. The embedded Google map described above may set cookies when it loads. You can block or remove cookies in your browser settings without affecting your ability to read this site or submit the contact form.",
      ],
    },
    {
      heading: "How we use what you send",
      body: [
        "To reply to your enquiry, to understand what you need, and to follow up about working together. We do not add contact form submissions to a marketing mailing list without asking you first.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Write to the address or email below and we will respond. Depending on where you live, you may have additional rights under local law.",
        "You can browse this entire site without providing any personal information. The contact form is the only place that asks for it.",
      ],
    },
    {
      heading: "Security",
      body: [
        "This site is served over HTTPS, and contact form submissions are transmitted over an encrypted connection. No method of transmission over the internet is completely secure, so please do not send sensitive financial documents, account numbers or tax identification numbers through the contact form. Once we are working together we will give you a secure way to share documents.",
      ],
    },
    {
      heading: "Children",
      body: [
        "This site is intended for businesses and is not directed to children. We do not knowingly collect information from children.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If this policy changes, the revised version will be posted here with a new date at the top. Material changes to how we handle information will be described rather than made quietly.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  eyebrow: "Legal",
  title: "Terms of Service",
  updated: "September 15, 2026",
  intro:
    "These terms cover your use of this website. They are not an engagement agreement — if we work together, the terms of that work are set out in a separate engagement letter, which takes precedence over anything on this page.",
  sections: [
    {
      heading: "This site is information, not advice",
      body: [
        "Everything on this website is general information about the services we offer. It is not accounting, tax, audit, legal or financial advice, and it is not a substitute for advice about your own circumstances.",
        "Reading this site, downloading anything from it, or sending us a message through the contact form does not create a professional relationship between us. A client relationship begins only when we have both signed an engagement letter.",
      ],
    },
    {
      heading: "Accuracy",
      body: [
        "We try to keep this site accurate and current, but tax law, accounting standards and our own services all change. Information here may become out of date, and we make no promise that it is complete or error-free. Do not act on anything here without checking whether it applies to your situation.",
      ],
    },
    {
      heading: "Using this site",
      body: [
        "You may read, print and share this site's pages for your own business purposes. Please do not use the site in ways that break the law, attempt to gain access to systems or data you are not entitled to, interfere with the site's operation or security, scrape it at a volume that degrades it for others, or misrepresent your identity when contacting us.",
      ],
    },
    {
      heading: "Content and trademarks",
      body: [
        "The text, design, graphics and arrangement of this site belong to us or are used with permission, and the Tierney & Ohlms name and mark are ours. Quoting or linking to the site with attribution is welcome; republishing substantial portions as your own is not.",
      ],
    },
    {
      heading: "Links and third-party services",
      body: [
        "This site links to and embeds services operated by others, including the client portal and an embedded map. We do not control those services and are not responsible for their content, availability or practices. Your use of them is governed by their own terms.",
      ],
    },
    {
      heading: "Availability",
      body: [
        "We aim to keep this site available, but we do not guarantee uninterrupted access. The site may be unavailable during maintenance, or for reasons outside our control, and we may change or remove content at any time without notice.",
      ],
    },
    {
      heading: "Disclaimer and limitation of liability",
      body: [
        "This website is provided as is, without warranties of any kind, to the fullest extent permitted by law. To the extent permitted by law, we are not liable for indirect, incidental or consequential losses arising from your use of this website or from reliance on information published here.",
        "Nothing in these terms limits any liability that cannot lawfully be limited, and nothing here limits or varies the terms of a signed engagement letter.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: [
        "We may update these terms. The current version is always the one posted here, with its date shown at the top. Continuing to use the site after a change means you accept the updated terms.",
      ],
    },
  ],
};
