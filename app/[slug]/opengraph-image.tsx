import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const title = post?.frontmatter.title ?? 'Prasanth Karri'
  const date = post
    ? new Date(post.frontmatter.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          color: '#fafafa',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#c4b5fd' }}>
          {date}
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 80, fontSize: 20, color: '#a78bfa' }}>
          prasanthkarri.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
