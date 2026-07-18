import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import { satteri } from "@astrojs/markdown-satteri"
import {
  blockExpressiveCode,
  inlineExpressiveCode,
} from "./src/lib/expressive-code"
import { temmlMath } from "./src/lib/math"
import { calloutDirective } from "./src/lib/callout"
import { externalLinks } from "./src/lib/external-links"
import { headingAnchors } from "./src/lib/heading-anchors"

export default defineConfig({
  site: "https://fadyio.com",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  prefetch: { prefetchAll: true },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !/^\/tags(?:\/|$)/.test(new URL(page).pathname),
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      features: { directive: true, math: true },
      mdastPlugins: [calloutDirective, inlineExpressiveCode, temmlMath],
      hastPlugins: [externalLinks, blockExpressiveCode, headingAnchors],
    }),
  },
})
