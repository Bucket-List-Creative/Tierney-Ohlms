/**
 * Embedded Sanity Studio at /studio. Renders the config from sanity.config.ts.
 * The catch-all route lets the Studio own all its sub-paths.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
