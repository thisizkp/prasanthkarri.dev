import Link from './Link'
import { Github, Rss } from 'lucide-react'
import { BlueskyIcon } from './BlueskyIcon'

export default function Header() {
  return (
    <header className="mt-8 mb-16">
      <nav className="flex items-center justify-between">
        <span className="text-xl">
          <Link href="/">Prasanth Karri</Link>
        </span>
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="https://github.com/thisizkp" aria-label="GitHub" isIcon>
              <Github className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="https://bsky.app/profile/prasanthkarri.dev" aria-label="Bluesky" isIcon>
              <BlueskyIcon className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="/rss.xml" aria-label="RSS Feed" isIcon>
              <Rss className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}