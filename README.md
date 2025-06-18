# Personal Blog

A minimalist blog built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🚀 Project Structure

```text
/
├── app/
│   ├── [slug]/
│   │   └── page.tsx         # Dynamic blog post pages
│   ├── rss.xml/
│   │   └── route.ts         # RSS feed endpoint
│   ├── favicon.ico/
│   │   └── route.ts         # Favicon handler
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Navigation header
│   └── Link.tsx             # Custom link with animations
├── content/
│   └── posts/               # Markdown blog posts
├── lib/
│   ├── posts.ts             # Post utilities
│   └── types.ts             # TypeScript types
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `pnpm install`    | Installs dependencies                       |
| `pnpm dev`        | Starts local dev server at `localhost:3000` |
| `pnpm build`      | Build your production site to `./.next/`    |
| `pnpm start`      | Preview your production build locally       |
| `pnpm lint`       | Run ESLint                                  |

## 📝 Writing Posts

Create new blog posts by adding Markdown files to the `content/posts/` directory with the following frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description"
pubDate: "2024-01-01"
tags: ["tag1", "tag2"]
---
```

## 🚀 Deployment

The blog is configured for deployment on Vercel with static export enabled.