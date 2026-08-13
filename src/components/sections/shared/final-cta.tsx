"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { RollingButton } from "@/components/ui/rolling-button"

export function FinalCta() {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden border-t border-[#212121] py-24">
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image src="/images/terrain-system.png" alt="" fill sizes="100vw" className="cinematic-image object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#010004]/55 via-[#010004]/25 to-[#010004]" />
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow inline-flex border border-white/20 bg-black/25 px-3 py-2 text-white/65">/ Let&apos;s get started</p>
          <h2 className="section-title mt-7">Ready to refine your workflow?</h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/65">
            Share your current process. We’ll help identify what can be automated and where efficiency can be improved.
          </p>
          <RollingButton href="/contact" className="mt-9">Get a consultation</RollingButton>
        </Reveal>
      </Container>
    </section>
  )
}
