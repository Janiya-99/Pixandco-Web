"use client"

import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { MotionConfig } from "motion/react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const configure = () => {
      cancelAnimationFrame(frame)
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (preference.matches) return

      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true })
      lenisRef.current = lenis
      const raf = (time: number) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    }
    configure()
    preference.addEventListener("change", configure)
    return () => {
      preference.removeEventListener("change", configure)
      cancelAnimationFrame(frame)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const lenis = lenisRef.current
      if (!lenis) return
      lenis.resize()
      // Adopt Next's restored position instead of carrying old scroll momentum.
      lenis.scrollTo(window.scrollY, { immediate: true, force: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
