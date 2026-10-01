"use client"

import { ViewTransition, type ReactNode } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <ViewTransition
      key={pathname}
      name="page-content"
      share="page-transition"
      enter="page-transition"
      exit="page-transition"
      default="none"
    >
      <main>{children}</main>
    </ViewTransition>
  )
}
