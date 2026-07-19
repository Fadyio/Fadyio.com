import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "node",
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "astro:content": path.resolve(
        __dirname,
        "./src/lib/__tests__/__mocks__/astro:content.ts",
      ),
    },
  },
})
