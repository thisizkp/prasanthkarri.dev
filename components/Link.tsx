import React from 'react'
import { cn } from '@/lib/utils'

interface LinkProps {
  href: string
  external?: boolean
  children: React.ReactNode
  className?: string
}

export default function Link({ href, external, children, className }: LinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      href={href}
      className={cn("group relative no-underline", className)}
      {...externalProps}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-full h-[1px]">
        <span className="absolute bottom-0 left-0 w-0 h-full bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full" />
      </span>
    </a>
  )
}