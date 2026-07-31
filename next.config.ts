import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // Sanity Studio ships its own build; keep it out of type/lint failures in CI if needed.
  experimental: {
    // taint APIs help keep server-only data (tokens) from leaking to the client
    taint: true,
  },
};

export default nextConfig;
