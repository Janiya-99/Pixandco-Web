"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: .5 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setShown(value); return }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => { const progress = Math.min((now - start) / 1600, 1); setShown(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick) }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, value])
  return <span ref={ref}>{shown}{suffix}</span>
}
