import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import rehypeCallouts from 'rehype-callouts'
import remarkMath from 'remark-math'
import sectionize from '@hbsnow/rehype-sectionize'

import icon from 'astro-icon'

export default defineConfig({
  site: 'https://fadyio.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    react(),
    icon(),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeKatex,
      rehypeCallouts,
      sectionize,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-mocha',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji,],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
})
