"use client"

import { motion, useReducedMotion } from "motion/react"

export function TextReveal({ lines, className }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion()
  return <div className={className}>{lines.map((line, index) => <div className="overflow-hidden" key={line}><motion.span className="block" initial={reduce ? false : { y: "105%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: reduce ? 0 : .8, delay: .14 + index * .075, ease: [.22,1,.36,1] }}>{line}</motion.span></div>)}</div>
}
