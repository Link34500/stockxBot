import type { NextConfig } from "next";
import path from "path";
import "dotenv/config";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production" // ou .env
    : ".env.local";

const fullPath = path.resolve(__dirname, "..", envFile);

require("dotenv").config({ path: fullPath });

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@common": path.resolve(__dirname, "../common/src"),
    },
  },
};

export default nextConfig;
