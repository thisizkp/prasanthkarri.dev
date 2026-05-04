import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPostExcerpt, sortPosts } from '@/lib/posts'

export async function GET(context: { site: URL }) {
  const posts = sortPosts(await getCollection('posts'))

  return rss({
    title: "KP's Writings",
    description: 'Whatever comes to my mind',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: getPostExcerpt(post.body ?? ''),
      pubDate: post.data.pubDate,
      link: `/${post.id}`,
    })),
  })
}
