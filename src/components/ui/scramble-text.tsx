"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrambleTextPlugin)

const SCRAMBLE_CHARACTERS = "@$&*$#"

function useScrambleText(text: string, playOnMount: boolean, delay: number, chars: string = SCRAMBLE_CHARACTERS) {
  const textRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)
  const [isComplete, setIsComplete] = useState(!playOnMount)

  const scramble = useCallback(() => {
    const element = textRef.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setIsComplete(false)
    tweenRef.current?.kill()
    tweenRef.current = gsap.to(element, {
      duration: 0.72,
      ease: "none",
      scrambleText: {
        text,
        chars: chars,
        speed: 0.55,
        revealDelay: 0.08,
        tweenLength: false,
      },
      keyframes: {
        color: ["#FF3B30", "#9C27B0", "#FF9500", ""],
        easeEach: "none"
      },
      onComplete: () => setIsComplete(true)
    })
  }, [text, chars])

  useEffect(() => {
    const element = textRef.current
    if (!element || !playOnMount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true)
      return
    }

    const timer = window.setTimeout(scramble, delay * 1000)
    return () => {
      window.clearTimeout(timer)
      tweenRef.current?.kill()
      element.textContent = text
    }
  }, [delay, playOnMount, scramble, text])

  return { textRef, scramble, isComplete }
}

export function ScrambleText({ text, className, delay = 0, showCursor = false, chars }: { text: string; className?: string; delay?: number; showCursor?: boolean; chars?: string }) {
  const { textRef, scramble, isComplete } = useScrambleText(text, true, delay, chars)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span 
      className={cn("inline-flex items-center", className)} 
      onPointerEnter={() => { setIsHovered(true); scramble(); }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <span className="inline-grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden>{text}</span>
        <span ref={textRef} className="col-start-1 row-start-1" aria-hidden>{text}</span>
        <span className="sr-only">{text}</span>
      </span>
      {showCursor && isComplete && isHovered && <span className="nav-caret ml-[1ch]" aria-hidden />}
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
  const { textRef, scramble, isComplete } = useScrambleText(text, true, delay)

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
