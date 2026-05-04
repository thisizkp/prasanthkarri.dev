import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://prasanthkarri.dev',
  trailingSlash: 'never',
  markdown: {
    // Preserve straight quotes/apostrophes from the original Markdown posts.
    smartypants: false,
  },
})
