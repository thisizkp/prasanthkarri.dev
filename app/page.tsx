import Link from '@/components/Link'
import { getAllPosts, getPostExcerpt } from '@/lib/posts'
import Image from 'next/image'

export default async function Home() {
  'use cache'
  const posts = getAllPosts()

  return (
    <section aria-labelledby="writing-heading" className="flex flex-col gap-8">
      <div className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
        <Image
          src="/avatar.png"
          alt="KP"
          width={80}
          height={80}
          className="float-left mr-4 mb-2 rounded-full"
        />
        <p>
          👋 Hey, I&apos;m KP. Been interested in how things work under the hood for as long as I can remember.
        </p>
        <p className="mt-4">
          Spent years doing web development (mostly frontend, some backend, minimal DevOps). Currently exploring systems programming and writing about what I learn here.
        </p>
      </div>
      <h1 id="writing-heading" className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Writing</h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-2">
            <h2 className="text-xl">
              <Link href={`/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </h2>
            <time className="text-sm text-gray-500 dark:text-zinc-400">
              {new Date(post.frontmatter.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">{getPostExcerpt(post.content)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}