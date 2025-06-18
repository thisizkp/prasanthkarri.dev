import Link from '@/components/Link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-7xl md:text-9xl">Prasanth Karri</h1>

      <div className="flex flex-col gap-2">
        <p className="text-xl">Software Engineer</p>
        <p className="text-xl">
          Building Analytics & Design Systems at{' '}
          <Link href="https://odysseyenergysolutions.com" external>
            Odyssey Energy Solutions
          </Link>
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Recent Posts</h2>
        <ul className="text-lg flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="flex items-center before:content-['•'] before:mr-2 before:text-blue-500 before:text-xl"
            >
              <Link href={`/${post.slug}`}>{post.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}