import RSS from 'rss'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()
  
  const feed = new RSS({
    title: "KP's Writings",
    description: 'Whatever comes to my mind',
    site_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://prasanthkarri.dev',
    feed_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prasanthkarri.dev'}/rss.xml`,
    language: 'en',
    pubDate: new Date(),
  })

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prasanthkarri.dev'}/${post.slug}`,
      date: new Date(post.frontmatter.pubDate),
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}