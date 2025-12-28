import Link from './Link'
import { Github, Rss } from 'lucide-react'
import { BlueskyIcon } from './BlueskyIcon'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 pt-6 pb-4 mb-12 bg-gray-50 dark:bg-zinc-800">
      <nav className="flex items-center justify-between">
        <span className="text-xl flex items-center gap-3">
          <Logo />
          <Link href="/">Prasanth Karri</Link>
        </span>
        <ul className="flex flex-row gap-1 items-center">
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
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}