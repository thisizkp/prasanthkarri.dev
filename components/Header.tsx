import Link from './Link'

export default function Header() {
  return (
    <header className="mt-8 mb-16">
      <nav>
        <ul className="flex flex-row gap-4 justify-end">
          <li>
            <Link href="https://github.com/thisizkp" external>
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://bsky.app/profile/prasanthkarri.dev" external>
              Bluesky
            </Link>
          </li>
          <li>
            <Link href="/rss.xml">RSS</Link>
          </li>
          <li className="flex flex-row gap-4"></li>
        </ul>
      </nav>
    </header>
  )
}