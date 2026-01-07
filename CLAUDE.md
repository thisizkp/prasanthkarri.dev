# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production
pnpm lint             # Run ESLint
```

Always use pnpm (not npm or yarn).

## Architecture

This is a personal blog built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

### Content System
- Blog posts are Markdown files in `content/posts/`
- Posts require frontmatter: `title`, `pubDate`, `tags` (optional: `updatedDate`)
- `lib/posts.ts` handles reading/parsing posts using gray-matter
- Posts are rendered via remark/remark-html in `app/[slug]/page.tsx`

### Key Files
- `lib/posts.ts` - Post fetching and utilities (getAllPosts, getPostBySlug, getReadingTime, getPostExcerpt)
- `lib/types.ts` - TypeScript interfaces for Post and PostFrontmatter
- `lib/env.ts` - Zod-validated environment variables
- `app/actions/newsletter.ts` - Server action for Plunk newsletter subscription

### Routing
- `/` - Homepage with post list (`app/page.tsx`)
- `/[slug]` - Individual post pages (`app/[slug]/page.tsx`)
- `/rss.xml` - RSS feed route handler

### Environment Variables
Copy `.env.example` to `.env.local` and set:
- `PLUNK_API_KEY` - Required for newsletter functionality
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata
