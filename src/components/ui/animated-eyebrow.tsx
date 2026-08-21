"use client"

import { useRef, useState } from "react"
import { useInView, motion } from "motion/react"
import { HyperText } from "./hyper-text"
import { cn } from "@/lib/utils"

export function AnimatedEyebrow({ text, className }: { text: string, className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { margin: "-10%" })
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <p ref={ref} className={cn("eyebrow mb-7 relative z-10 inline-flex overflow-hidden border-l-2 border-white/50 px-3 py-1.5 text-white/70 uppercase", className)}>
      <motion.div 
        className="absolute inset-0 -z-10 origin-right bg-[#1a1a1d]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: bgLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <HyperText text={text} animateOnLoad={false} triggerAnimation={isInView} onComplete={() => setBgLoaded(true)} />
    </p>
  )
}
