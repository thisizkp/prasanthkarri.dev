import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostFrontmatter } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.pubDate).getTime()
      const dateB = new Date(b.frontmatter.pubDate).getTime()
      return dateB - dateA
    })

  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    }
  } catch {
    return undefined
  }
}

export function getReadingTime(content: string): number {
  // Remove markdown syntax for accurate word count
  const plainText = content
    .replace(/^#+\s+.*$/gm, '') // Remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/[*_`~]/g, '') // Remove formatting
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .trim()

  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  const wordsPerMinute = 200
  const minutes = Math.ceil(words.length / wordsPerMinute)

  return Math.max(1, minutes) // Minimum 1 minute
}

export function getPostExcerpt(content: string, length: number = 150): string {
  const plainText = content
    .replace(/^#+\s+.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  
  if (plainText.length <= length) {
    return plainText
  }
  
  return plainText.substring(0, length).replace(/\s+\S*$/, '') + '...'
}