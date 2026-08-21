"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { ScrambleText } from "./scramble-text"
import { cn } from "@/lib/utils"

export function AnimatedEyebrow({ text, className }: { text: string, className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { margin: "-10%" })

  return (
    <p ref={ref} className={cn("eyebrow mb-7 inline-flex border-l-2 border-white/50 bg-[#1a1a1d] px-3 py-1.5 text-white/70 uppercase", className)}>
      <ScrambleText text={text} chars=">?/@#$%^&*<-+" delay={0} trigger={isInView} />
    </p>
  )
}
