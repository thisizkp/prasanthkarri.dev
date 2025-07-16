import React from 'react'
import NextLink from 'next/link'

interface LinkProps {
  href: string
  children: React.ReactNode
}

export default function Link({ href, children }: LinkProps) {
  const linkClasses = "group relative no-underline"
  const hoverEffect = (
    <span className="absolute -bottom-0.5 left-0 w-full h-[1px]">
      <span className="absolute bottom-0 left-0 w-0 h-full bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full" />
    </span>
  )

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {hoverEffect}
      </a>
    )
  }

  return (
    <NextLink href={href} className={linkClasses}>
      {children}
      {hoverEffect}
    </NextLink>
  )
}