import { defineType, defineField } from "sanity";

export const linkItem = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL / anchor",
      type: "string",
      description: "An absolute URL, a path like /about, or an anchor like #contact.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL / anchor",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      initialValue: "primary",
      options: {
        list: [
          { title: "Primary (grain)", value: "primary" },
          { title: "Secondary (outline)", value: "secondary" },
          { title: "Inline (gold underline)", value: "inline" },
          { title: "Inverse (on dark)", value: "inverse" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small uppercase label above the heading (rendered in brass).",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead paragraph",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { select: { title: "heading", subtitle: "eyebrow" } },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160).warning("Aim for under 160 characters."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer column",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Column title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const founder = defineType({
  name: "founder",
  title: "Founder",
  type:"object",
  fields:[
    defineField({
      name:"name",
      title:"Name",
      type:"string",
      validation:(r) => r.required(),
    }),
    defineField({
      name:"credential",
      title:"Credential /role",
      type:"string",
      description:'e.g. "CPA, Co-founder".',
      validation:(r)=> r.required(),
      
    }),
    defineField({
      name:"bio",
      title:"Bio",
      type:"text",
      rows:6,
   description: "The professional paragraph. Separate paragraphs with a blank line.",
      validation: (r) => r.required(),
    }),
    defineField({
      name:"outsideWork",
      title:"Outside work",
      type:"text",
      rows:3,
      description: "The personal, human paragraph. Leave blank if it isn't ready yet.",

    }),
    defineField({
      name: "photo",
      title: "Photo",
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
    }),
  ],
  preview: {select: {title:"name", subtitle:"credential", media:"photo"}},

});
