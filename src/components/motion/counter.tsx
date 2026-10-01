"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Counter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        setDisplay(Math.round(obj.val))
      },
    })

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        obj.val = 0
        setDisplay(0)
        tween.restart()
      },
      onEnterBack: () => {
        obj.val = 0
        setDisplay(0)
        tween.restart()
      },
      onLeaveBack: () => {
        obj.val = 0
        setDisplay(0)
      },
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [value, duration])

  return (
    <span ref={elRef} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}
