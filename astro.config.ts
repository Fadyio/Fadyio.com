import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkEmoji from 'remark-emoji'
import rehypeCallouts from 'rehype-callouts'
import remarkMath from 'remark-math'
import sectionize from '@hbsnow/rehype-sectionize'
import icon from 'astro-icon'
import expressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import rehypeExternalLinks from 'rehype-external-links'
import remarkToc from 'remark-toc'

export default defineConfig({
  site: 'https://fadyio.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    expressiveCode({
      themes: ['catppuccin-latte', 'catppuccin-mocha'],
      plugins: [pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => {
        // Match dark/light class on html element
        return theme.name === 'catppuccin-mocha' ? '.dark' : ':root:not(.dark)'
      },
      defaultProps: {
        showLineNumbers: true,
        overridesByLang: {
          // Disable line numbers for terminal/shell languages
          'bash,sh,zsh,shell,terminal,console,powershell': {
            showLineNumbers: false,
          },
        },
      },
      styleOverrides: {
        borderRadius: '0.75rem',
        codeFontSize: '1rem',
        codeLineHeight: '1.75',
        codePaddingBlock: '1rem',
        codePaddingInline: '1rem',
        codeFontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      },
    }),
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
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji, remarkToc],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
})