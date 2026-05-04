import type { CollectionEntry } from 'astro:content'
import readingTime from 'reading-time'

export type Post = CollectionEntry<'posts'>

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export function getReadingTime(content: string) {
  return Math.max(1, Math.ceil(readingTime(content).minutes))
}

export function getPostExcerpt(content: string, length = 150) {
  const plainText = content
    .replace(/^#+\s+.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  if (plainText.length <= length) return plainText

  return `${plainText.substring(0, length).replace(/\s+\S*$/, '')}...`
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

export function getAdjacentPosts(posts: Post[], id: string) {
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return { prev: null, next: null }

  return {
    next: posts[index - 1] ?? null,
    prev: posts[index + 1] ?? null,
  }
}
