"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrambleTextPlugin)

const SCRAMBLE_CHARACTERS = "01X/"

function useScrambleText(text: string, playOnMount: boolean, delay: number) {
  const textRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)

  const scramble = useCallback(() => {
    const element = textRef.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    tweenRef.current?.kill()
    tweenRef.current = gsap.to(element, {
      duration: 0.72,
      ease: "none",
      scrambleText: {
        text,
        chars: SCRAMBLE_CHARACTERS,
        speed: 0.55,
        revealDelay: 0.08,
        tweenLength: false,
      },
      keyframes: {
        color: ["#FF3B30", "#9C27B0", "#FF9500", ""],
        easeEach: "none"
      }
    })
  }, [text])

  useEffect(() => {
    const element = textRef.current
    if (!element || !playOnMount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setTimeout(scramble, delay * 1000)
    return () => {
      window.clearTimeout(timer)
      tweenRef.current?.kill()
      element.textContent = text
    }
  }, [delay, playOnMount, scramble, text])

  return { textRef, scramble }
}

export function ScrambleText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { textRef, scramble } = useScrambleText(text, true, delay)

  return (
    <span className={cn("inline-grid", className)} onPointerEnter={scramble}>
      <span className="invisible col-start-1 row-start-1" aria-hidden>{text}</span>
      <span ref={textRef} className="col-start-1 row-start-1" aria-hidden>{text}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

export function ScrambleLink({
  href,
  text,
  className,
  delay = 0,
  active = false,
}: {
  href: string
  text: string
  className?: string
  delay?: number
  active?: boolean
}) {
  const { textRef, scramble } = useScrambleText(text, true, delay)

  return (
    <Link
      href={href}
      aria-label={text}
      aria-current={active ? "page" : undefined}
      className={cn("focus-ring inline-flex min-h-11 items-center", className)}
      onPointerEnter={scramble}
      onFocus={scramble}
    >
      <span className="inline-grid" aria-hidden>
        <span className="invisible col-start-1 row-start-1">{text}</span>
        <span ref={textRef} className="col-start-1 row-start-1">{text}</span>
      </span>
      {active && <span className="nav-caret ml-1.5" aria-hidden />}
    </Link>
  )
}
