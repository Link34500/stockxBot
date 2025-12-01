import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./common/src"),
      "@bot": path.resolve(__dirname, "./bot/src"),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    setupFiles: [path.resolve(globalThis.__dirname, "./test/setup.ts")],
  },
});
