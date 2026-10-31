import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export, deployed to both GitHub Pages and Vercel. The address search
  // engines should use is profile.siteUrl in src/content/site.ts.
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
