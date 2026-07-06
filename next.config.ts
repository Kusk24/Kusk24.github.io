import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site is served by GitHub Pages at kusk24.github.io
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
