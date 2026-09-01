import { defineType, defineField } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { serviceIconOptions, featureIconOptions } from "./iconOptions";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "service" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: serviceIconOptions },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "One line, shown in the homepage services overview.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Punchy headline shown on the services page.",
    }),
    defineField({
      name: "audience",
      title: "Audience line",
      type: "string",
      description: 'e.g. "For owners whose books are a mess."',
    }),
    defineField({
      name: "detail",
      title: "Detail paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "includes",
      title: "What’s included",
      type: "array",
      of: [{ type: "string" }],
      description:
        "The bulleted scope list on the service’s own page. One line per item, no trailing punctuation.",
    }),
    defineField({
      name: "practiceExamples",
      title: "What this looks like in practice",
      type: "array",
      of: [{ type: "practiceExample" }],
      description:
        "Optional. Short, anonymised illustrations of the work. Leave empty to hide the section.",
    }),
    defineField({
      name: "youGet",
      title: "“You get” summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "topTier",
      title: "Highlight as top tier",
      type: "boolean",
      initialValue: false,
      description: "Renders this service as the dark, gold-accented featured card.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Overrides for this service’s own page. Falls back to the title and short description.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "icon" } },
});

export const feature = defineType({
  name: "feature",
  title: "Feature (Why us)",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "feature" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: featureIconOptions },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "icon" } },
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "document",
  orderings: [
    {
      title: "Step order",
      name: "indexAsc",
      by: [{ field: "index", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "index",
      title: "Index",
      type: "string",
      description: 'Zero-padded, e.g. "01".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "index" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Step ${subtitle}` }),
  },
});

export const highlight = defineType({
  name: "highlight",
  title: "Highlight",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "highlight" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: featureIconOptions },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "claim",
      title: "Claim",
      type: "string",
      description: 'Short bold claim, e.g. "Up to 60%".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "claim", subtitle: "caption" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "faq" }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "question" } },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "sectionHeader" }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
