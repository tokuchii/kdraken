import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: process.env.GITHUB_PAGES === "true",
  },
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  trailingSlash: true,
};

export default nextConfig;
