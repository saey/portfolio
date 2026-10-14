import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev badge clear of the copyright in the bottom-left rail.
  devIndicators: { position: "bottom-right" },
  experimental: {
    agentFeedback: true,
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
