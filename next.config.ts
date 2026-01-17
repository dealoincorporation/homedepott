import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings for Vercel deployment
  images: {
    domains: ['careers.homedepot.ca', 'homedepot.ca'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Disable experimental CSS optimization to avoid critters dependency issues
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;