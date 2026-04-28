import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure static generation works well with API routes on Vercel
  trailingSlash: false,
};

export default nextConfig;
