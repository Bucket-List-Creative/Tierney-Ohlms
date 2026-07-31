import type { NextConfig } from "next";

/**
 * Static-export mode (GitHub Pages). Enabled by NEXT_PUBLIC_STATIC_EXPORT=true
 * in the deploy workflow. Normal dev / server deploys (Vercel, Netlify) leave
 * it unset and keep the full server feature set (API routes, Studio, ISR).
 *
 * GitHub Pages serves a project site under /<repo>, so we set basePath and
 * assetPrefix to the repo name and disable the image optimizer (Pages can't
 * run it). Update REPO_BASE_PATH if the repo is ever renamed.
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const REPO_BASE_PATH = "/Tierney-Ohlms";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  experimental: {
    // taint APIs help keep server-only data (tokens) from leaking to the client
    taint: true,
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath: REPO_BASE_PATH,
        assetPrefix: REPO_BASE_PATH,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
