import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output:'export',
  images: {
    loader: 'default',  // Use default loader
    unoptimized: true,  // Disable optimization (allow all domains)
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore eslint checks during build
  },
};


export default nextConfig;
