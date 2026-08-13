"use client"

import { motion } from "motion/react"

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: .09 } } }}>{children}</motion.div>
}
