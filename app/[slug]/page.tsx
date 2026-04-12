import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getAdjacentPosts, getPostBySlug, getPostExcerpt, getReadingTime } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'
import NewsletterForm from '@/components/NewsletterForm'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {}
  }

  return {
    title: post.frontmatter.title,
    description: getPostExcerpt(post.content),
    openGraph: {
      title: post.frontmatter.title,
      description: getPostExcerpt(post.content),
      type: 'article',
      publishedTime: post.frontmatter.pubDate,
      ...(post.frontmatter.updatedDate && { modifiedTime: post.frontmatter.updatedDate }),
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  'use cache'
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="flex flex-col h-full">
      <article className="flex-1">
        <header className="mb-8">
          <h1 className="text-5xl text-gray-900 dark:text-zinc-50">{post.frontmatter.title}</h1>
          <div className="mt-4 text-sm text-gray-500 dark:text-zinc-400 flex flex-wrap items-center gap-x-2">
            <span>{new Date(post.frontmatter.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>·</span>
            <span>{getReadingTime(post.content)} min read</span>
            {post.frontmatter.updatedDate && (
              <>
                <span>·</span>
                <span>
                  Updated {new Date(post.frontmatter.updatedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </>
            )}
          </div>
        </header>
        <div
          className="text-lg prose prose-lg dark:prose-invert max-w-none font-light"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
      <NewsletterForm />
      {(prev || next) && (
        <nav className="flex justify-between border-t border-gray-200 dark:border-zinc-700 py-8">
          <div>
            {prev && (
              <Link href={`/${prev.slug}`} className="group">
                <span className="block text-sm text-gray-400 dark:text-zinc-500 mb-1">&larr; Previous</span>
                <span className="text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-zinc-100">{prev.frontmatter.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/${next.slug}`} className="group">
                <span className="block text-sm text-gray-400 dark:text-zinc-500 mb-1">Next &rarr;</span>
                <span className="text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-zinc-100">{next.frontmatter.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}