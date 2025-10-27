import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-zinc-50">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-zinc-400">
        This page could not be found.
      </p>
      <Link href="/" className="mt-8 text-gray-700 dark:text-zinc-300 hover:text-blue-400">
        ← Back to home
      </Link>
    </div>
  )
}
