"use client"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Command, Workflow, Shield, Star, Hexagon, Circle, Triangle, Box, Cloud, Database, Network, Globe, Lock, Cpu } from "lucide-react"
import { motion } from "framer-motion"

const row1 = [Command, Workflow, Shield, Star, Hexagon, Circle, Triangle]
const row2 = [Box, Cloud, Database, Network, Globe, Lock, Cpu]

export function IntegrationSection() {
  return (
    <Section className="min-h-[600px] flex items-center overflow-hidden pt-24 pb-32">
      <Container className="flex flex-col items-center">
        {/* Grid Container with Radial Mask */}
        <div 
          className="relative flex w-full max-w-6xl flex-col gap-3 overflow-hidden py-4 md:gap-4"
          style={{ 
            maskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 10%, transparent 85%)", 
            WebkitMaskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 10%, transparent 85%)" 
          }}
        >
          {/* Row 1 - Sliding Left */}
          <motion.div 
            className="flex w-max gap-3 md:gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 md:gap-4">
                {row1.map((Icon, index) => (
                  <div
                    key={index}
                    className="grid size-16 shrink-0 place-items-center rounded-[16px] bg-[#1a1a1d] text-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:size-[90px] md:rounded-[20px]"
                  >
                    <Icon strokeWidth={1.5} className="size-6 md:size-8" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
          
          {/* Row 2 - Sliding Right */}
          <motion.div 
            className="flex w-max gap-3 md:gap-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 md:gap-4">
                {row2.map((Icon, index) => (
                  <div
                    key={index}
                    className="grid size-16 shrink-0 place-items-center rounded-[16px] bg-[#1a1a1d] text-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:size-[90px] md:rounded-[20px]"
                  >
                    <Icon strokeWidth={1.5} className="size-6 md:size-8" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Text content below */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="eyebrow inline-flex items-center gap-1.5 rounded-[4px] bg-[#1a1a1d] px-2.5 py-1 text-[#00ff51] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <span className="opacity-80">&gt;_</span> INTEGRATION
          </p>
          <h2 className="mt-6 text-3xl font-medium tracking-[-.04em] md:text-[44px] md:leading-[1.1]">
            Connected Systems,
            <br />
            Not More Tools
          </h2>
        </div>
      </Container>
    </Section>
  )
}
