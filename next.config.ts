import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev badge clear of the copyright in the bottom-left rail.
  // 90 is used for the home thumbnails, which are cropped into tall stripes.
  images: { qualities: [75, 90] },
  devIndicators: { position: "bottom-right" },
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
