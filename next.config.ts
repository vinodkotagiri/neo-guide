import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    loader: 'default',  // Use default loader
    unoptimized: true,  // Disable optimization (allow all domains)
  },
};


export default nextConfig;
