"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { TextReveal } from "@/components/motion/text-reveal"
import { HyperText } from "@/components/ui/hyper-text"
import { AmbientVideo } from "@/components/media/ambient-video"

export function HeroSection() {
  return (
    <section className="relative min-h-[750px] overflow-hidden">
      <AmbientVideo
        src="/videos/ruNWMG1hPz7eOeYESQefyP03dc.mp4"
        poster="/images/video-posters/hero-system.webp"
        alt="Hero background video"
        priority
        sizes="100vw"
        className="absolute inset-0"
        mediaClassName="object-cover object-center brightness-[.85] contrast-[1.12] scale-[1.3] md:scale-100"
      />

      <Container className="relative z-10 flex min-h-[750px] flex-col pt-24 md:pt-28 pb-12 md:pb-16 lg:pb-20">

        {/* Top Section: Solutions and Introduction */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 w-full flex-1">
          <div className="flex flex-col items-start gap-3">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.5 }} className="eyebrow text-white/70">/ Business Software</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.6 }} className="eyebrow text-white/70">/ Web Platforms</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.7 }} className="eyebrow text-white/70">/ Digital Growth</motion.span>
          </div>

          {/* Flexible space to push the paragraph down on mobile */}
          <div className="flex-1 md:hidden" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.6 }} className="mb-8 md:mb-0 max-w-sm self-end text-right text-[15px] leading-relaxed text-white/90 md:justify-self-end md:text-base">Pix & Co develops business software, websites, brands, and digital growth systems that solve real operational and commercial problems.</motion.p>
        </div>

        {/* Bottom Section: Badge, Heading, and Card */}
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] w-full">
          <div className="flex flex-col items-start">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.5 }} className="eyebrow inline-flex bg-[#1a1a1d] border border-white/5 px-3 py-1.5 text-white/75">
              <HyperText text="BUILT FOR BUSINESSES AT EVERY SCALE" animateOnLoad={true} delay={0.5} className="font-mono text-[10px] tracking-widest text-white/50" />
            </motion.span>

            {/* Desktop Heading */}
            <h1 className="mt-5 w-full">
              <TextReveal animateOnMount className="display w-full tracking-[-.04em]" lines={["Build Better.", "Operate Smarter.", "Grow Faster."]} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 1.0 }} className="rounded-[9px] border border-white/15 bg-[#111114]/90 p-2 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <video src="/videos/girl.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="h-24 w-20 shrink-0 rounded-[4px] bg-[#27272b] object-cover" />
              <div className="min-w-44"><p className="text-sm">Talk with Pix & Co</p><p className="eyebrow mt-2 text-white/40 tracking-[0.2em]">BUSINESS SOLUTIONS</p><Link href="/contact" style={{ color: '#000' }} className="group focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium transition-colors hover:bg-white/90"><span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span></span><ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" /></Link></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
