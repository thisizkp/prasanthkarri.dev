import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getPostExcerpt } from '@/lib/posts'
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <header className="mb-8">
          <h1 className="text-5xl text-gray-900 dark:text-zinc-50">{post.frontmatter.title}</h1>
          <div className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
            {new Date(post.frontmatter.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            {post.frontmatter.updatedDate && (
              <>
                <span className="mx-2">·</span>
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
      </div>
      <NewsletterForm />
    </div>
  )
}