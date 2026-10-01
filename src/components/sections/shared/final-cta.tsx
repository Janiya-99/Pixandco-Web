"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { RollingButton } from "@/components/ui/rolling-button"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"

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
        <Image src="/images/site/KmimP8fJf3KTg25QrfWgNhSOI4e64.jpg" alt="" fill sizes="100vw" className="cinematic-image object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#010004]/30" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#010004] via-[#010004]/80 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010004] to-transparent z-10" />
      <Container className="relative z-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <AnimatedEyebrow text="Let's get started" />
          <h2 className="section-title mt-7">Ready to Solve Your Next Business Challenge?</h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/65">
            Tell us what is slowing your business down. We will help you define, build, and implement the right solution.
          </p>
          <RollingButton href="/contact" className="mt-9">Discuss Your Project</RollingButton><RollingButton href="/projects" variant="outline" className="mt-4 sm:ml-4">View Case Studies</RollingButton>
        </Reveal>
      </Container>
    </section>
  )
}
