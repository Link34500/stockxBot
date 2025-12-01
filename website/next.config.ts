import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@common": path.resolve(__dirname, "../common/src"),
    };
    return config;
  },
};

export default nextConfig;
