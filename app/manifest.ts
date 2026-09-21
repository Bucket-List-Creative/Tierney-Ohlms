import type { MetadataRoute } from "next";

/**
 * `output: export` refuses a metadata route that has not opted into being
 * static — the same requirement app/robots.ts and app/sitemap.ts carry.
 */
export const dynamic = "force-static";

/**
 * GitHub Pages serves this as a project site under /<repo>, so asset paths in
 * the manifest need that prefix. Next applies basePath to its own generated
 * URLs, but not to strings we hand it.
 *
 * Must match REPO_BASE_PATH in next.config.ts.
 */
const basePath = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/Tierney-Ohlms" : "";

/**
 * Replaces public/Favicon/site.webmanifest, which shipped with icon paths that
 * pointed at the public root ("/android-chrome-192x192.png") while the files
 * live under /Favicon — both icons would have 404'd.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tierney & Ohlms",
    short_name: "T&O",
    icons: [
      {
        src: `${basePath}/Favicon/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/Favicon/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
  };
}
