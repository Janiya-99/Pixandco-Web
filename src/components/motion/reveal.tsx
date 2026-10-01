"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={cn(className)} initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .18 }} transition={reduce ? { duration: 0 } : { y: { type: "spring", stiffness: 180, damping: 28, mass: 1, delay }, opacity: { duration: .4, delay, ease: [.44, 0, .56, 1] }, filter: { duration: .4, delay, ease: [.44, 0, .56, 1] } }}>{children}</motion.div>
}
