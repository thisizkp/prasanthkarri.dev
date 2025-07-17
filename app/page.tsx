import Link from '@/components/Link'
import { getAllPosts, getPostExcerpt } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Writing</h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-2">
            <h2 className="text-xl">
              <Link href={`/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </h2>
            <p className="text-gray-600">{getPostExcerpt(post.content)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}