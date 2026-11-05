"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { MotionProvider } from "@/components/motion/motion-provider"
import { PageTransition } from "@/components/motion/page-transition"

export function PublicLayoutFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    // Admin routes render entirely dedicated in their own standalone workspace
    return <>{children}</>
  }

  return (
    <>
      <ScrollProgress />
      <MotionProvider>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </MotionProvider>
      <div className="site-noise" aria-hidden />
    </>
  )
}
