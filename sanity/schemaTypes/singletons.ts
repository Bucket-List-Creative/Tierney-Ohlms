import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "wordmark",
      title: "Wordmark",
      type: "string",
      group: "brand",
      description: "The firm name as it appears in the header and footer.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phoneHref",
      title: "Phone (tel: link)",
      type: "string",
      group: "contact",
      description: "e.g. tel:+13145550100",
    }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({
      name: "addressLine1",
      title: "Address line 1",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "addressLine2",
      title: "Address line 2",
      type: "string",
      group: "contact",
    }),
    defineField({ name: "hours", title: "Business hours", type: "string", group: "contact" }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map embed URL",
      type: "url",
      group: "contact",
      description: "Google Maps embed URL. Leave blank to show a placeholder.",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 2,
      group: "footer",
    }),
    defineField({
      name: "copyrightName",
      title: "Copyright name",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "footer",
      of: [{ type: "footerColumn" }],
      validation: (r) => r.max(3).warning("The footer layout is designed for 3 columns."),
    }),
    defineField({
      name: "legalLinks",
      title: "Legal / bottom links",
      type: "array",
      group: "footer",
      of: [{ type: "linkItem" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Nav links",
      type: "array",
      of: [{ type: "linkItem" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA URL / anchor",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "portalLabel",
      title: "Client portal label",
      type: "string",
      description: "Leave empty (with the URL) to hide the client login button.",
      initialValue: "Client Login",
    }),
    defineField({
      name: "portalHref",
      title: "Client portal URL",
      type: "url",
      description: "Opens in a new tab. e.g. https://app.financial-cents.com/cp/tierneyohlms",
      initialValue: "https://app.financial-cents.com/cp/tierneyohlms",
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Section headers" },
    { name: "cta", title: "CTA banner" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (r) => r.required(),
        },
        { name: "lead", title: "Lead paragraph", type: "text", rows: 3 },
        { name: "primaryCta", title: "Primary CTA", type: "cta" },
        { name: "secondaryCta", title: "Secondary CTA", type: "cta" },
        {
          name: "image",
          title: "Hero image",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "servicesHeader",
      title: "Services header",
      type: "sectionHeader",
      group: "sections",
    }),
    defineField({
      name: "whyHeader",
      title: "Why-us header",
      type: "sectionHeader",
      group: "sections",
    }),
    defineField({
      name: "processHeader",
      title: "Process header",
      type: "sectionHeader",
      group: "sections",
    }),
    defineField({
      name: "faqHeader",
      title: "FAQ header",
      type: "sectionHeader",
      group: "sections",
    }),
    defineField({
      name: "ctaBanner",
      title: "CTA banner",
      type: "object",
      group: "cta",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (r) => r.required(),
        },
        { name: "lead", title: "Lead", type: "text", rows: 2 },
        { name: "cta", title: "Button", type: "cta" },
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (r) => r.required(),
        },
        { name: "lead", title: "Lead", type: "text", rows: 2 },
        {
          name: "serviceOptions",
          title: "Service dropdown options",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
