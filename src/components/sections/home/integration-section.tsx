"use client"

import Image from "next/image"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { motion } from "framer-motion"

const row1 = [
  "/images/integration-logos/logo-1.png",
  "/images/integration-logos/logo-2.png",
  "/images/integration-logos/logo-3.png",
  "/images/integration-logos/logo-4.png",
  "/images/integration-logos/logo-5.png",
]
const row2 = [
  "/images/integration-logos/logo-6.png",
  "/images/integration-logos/logo-7.png",
  "/images/integration-logos/logo-8.png",
  "/images/integration-logos/logo-9.png",
  "/images/integration-logos/logo-10.png",
  "/images/integration-logos/logo-11.png",
]

export function IntegrationSection() {
  return (
    <Section className="min-h-[600px] flex items-center overflow-hidden pt-24 pb-32">
      <Container className="flex flex-col items-center">
        {/* Grid Container with Radial Mask */}
        <div 
          className="relative flex w-full max-w-[1200px] flex-col gap-4 overflow-hidden py-4"
          style={{ 
            maskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 10%, transparent 85%)", 
            WebkitMaskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 10%, transparent 85%)" 
          }}
        >
          {/* Row 1 - Sliding Left */}
          <motion.div 
            className="flex w-max gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {row1.map((src, index) => (
                  <div
                    key={index}
                    className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-[12px] border border-white/10 bg-[#1a1a1d] md:size-[100px]"
                  >
                    <div className="relative h-full w-full">
                      <Image src={src} alt="" fill sizes="100px" className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
          
          {/* Row 2 - Sliding Right */}
          <motion.div 
            className="flex w-max gap-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {row2.map((src, index) => (
                  <div
                    key={index}
                    className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-[12px] border border-white/10 bg-[#1a1a1d] md:size-[100px]"
                  >
                    <div className="relative h-full w-full">
                      <Image src={src} alt="" fill sizes="100px" className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Text content below */}
        <div className="mt-14 flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-white/25" />
            <p className="font-mono text-xs font-medium uppercase tracking-[.08em] text-white">
              Integration
            </p>
            <div className="h-[1px] w-8 bg-white/25" />
          </div>
          
          <h2 className="mt-8 text-4xl font-medium tracking-[-.04em] md:text-[48px] md:leading-[1.1]">
            Connected Systems,
            <br />
            Not More Tools
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-7 text-white/50">
            Your CRM, marketing, finance, and operations tools working as one unified workflow. We integrate with the platforms you already use.
          </p>
        </div>
      </Container>
    </Section>
  )
}
