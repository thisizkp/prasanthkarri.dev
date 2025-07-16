import Link from './Link'

export default function Header() {
  return (
    <header className="mt-8 mb-16">
      <nav className="flex items-center justify-between">
        <span className="text-xl">
          <Link href="/">Prasanth Karri</Link>
        </span>
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="https://github.com/thisizkp">
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://bsky.app/profile/prasanthkarri.dev">
              Bluesky
            </Link>
          </li>
          <li>
            <Link href="/rss.xml">RSS</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}