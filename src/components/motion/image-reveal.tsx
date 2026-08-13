"use client"

import { motion, useReducedMotion } from "motion/react"

export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", scale: 1.04 }} whileInView={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduce ? 0 : 1.05, ease: [.16,1,.3,1] }}>{children}</motion.div>
}
