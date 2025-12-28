# prasanthkarri.dev

My personal website and blog, built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Setup

```bash
pnpm install
cp .env.example .env.local  # Add your environment variables
pnpm dev
```

## Commands

| Command        | Action                        |
| :------------- | :---------------------------- |
| `pnpm dev`     | Start dev server              |
| `pnpm build`   | Build for production          |
| `pnpm start`   | Preview production build      |
| `pnpm lint`    | Run ESLint                    |

## Writing Posts

Add Markdown files to `content/posts/` with frontmatter:

```yaml
---
title: "Post Title"
description: "A brief description"
pubDate: "2024-01-01"
tags: ["tag1", "tag2"]
---
```

## Deployment

Deployed on [Vercel](https://vercel.com).