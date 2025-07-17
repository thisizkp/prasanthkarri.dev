import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getPostExcerpt } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'

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
    <>
      <header className="text-5xl mb-8">{post.frontmatter.title}</header>
      <div 
        className="text-lg/relaxed font-light flex flex-col gap-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </>
  )
}