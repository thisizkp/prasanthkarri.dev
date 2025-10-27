import React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'

interface LinkProps {
  href: string
  children: React.ReactNode
  isIcon?: boolean
  'aria-label'?: string
  className?: string
}

export default function Link({ href, children, isIcon = false, 'aria-label': ariaLabel, className }: LinkProps) {
  const linkClasses = cn(
    "group relative no-underline",
    isIcon && "inline-flex text-gray-700 dark:text-zinc-300 hover:text-blue-400 transition-colors duration-300",
    className
  )
  
  const hoverEffect = !isIcon ? (
    <span className="absolute -bottom-0.5 left-0 w-full h-[1px]">
      <span className="absolute bottom-0 left-0 w-0 h-full bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full" />
    </span>
  ) : null

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
        {hoverEffect}
      </a>
    )
  }

  return (
    <NextLink href={href} className={linkClasses} aria-label={ariaLabel}>
      {children}
      {hoverEffect}
    </NextLink>
  )
}