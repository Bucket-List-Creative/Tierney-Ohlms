"use client";

/**
 * Sanity Studio configuration — mounted at /studio by Next.
 * Reads project/dataset from the same env vars the front end uses.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import {
  structure,
  singletonActions,
  singletonTypes,
} from "./sanity/structure";
import { projectId, dataset, apiVersion } from "./lib/sanity/env";

export default defineConfig({
  name: "tierney-ohlms",
  title: "Tierney & Ohlms",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Singletons can't be created or deleted from the "new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Restrict the actions available on singleton documents.
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? input.filter((action) =>
            action.action ? singletonActions.has(action.action) : false,
          )
        : input,
  },
});
