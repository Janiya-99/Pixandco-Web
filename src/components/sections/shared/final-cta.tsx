"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { RollingButton } from "@/components/ui/rolling-button"

export function FinalCta() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section ref={containerRef} className="relative flex min-h-[620px] items-center overflow-hidden py-24">
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <Image src="/images/site/i7JDvEU4cYXg2aOX5cF0L3UIV82fe7.jpg" alt="" fill sizes="100vw" className="cinematic-image object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#010004]/30" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#010004] via-[#010004]/80 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010004] to-transparent z-10" />
      <Container className="relative z-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-7 inline-flex border-l-2 border-white/50 bg-[#1a1a1d] px-3 py-1.5 text-white/70 uppercase">Let&apos;s get started</p>
          <h2 className="section-title mt-7">Ready to Refine Your Workflow?</h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/65">
            Share your current process. We’ll help identify what can be automated and where efficiency can be improved.
          </p>
          <RollingButton href="/contact" className="mt-9">Get a consultation</RollingButton>
        </Reveal>
      </Container>
    </section>
  )
}
