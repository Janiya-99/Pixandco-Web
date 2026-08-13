"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/ui/section-header"

const comparisonData = [
  ["", "Northline", "Other agencies", "Hire in-house"],
  ["Approach", "✓  Process mapping first", "△  Tool-first approach", "△  Depends on hire"],
  ["Workflow", "✓  Around your operations", "×  Mostly templated", "✓  If expertise exists"],
  ["Speed", "✓  Weeks, not months", "△  Most often delayed", "×  Hiring & onboarding"],
  ["Optimization", "✓  Continuous improvement", "△  Setup & disappear", "△  Limited by bandwidth"],
  ["Cost efficiency", "✓  Fixed project clarity", "△  Scope creep common", "×  Salary + overhead"],
]

export function WhyUsSection() {
  return (
    <Section className="relative overflow-hidden py-24 lg:py-40">
      <Image
        src="/images/terrain-system.png"
        alt=""
        fill
        sizes="100vw"
        className="cinematic-image object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#010004] via-[#010004]/70 to-[#010004]" />
      
      <Container className="relative z-10">
        <SectionHeader
          align="center"
          eyebrow="Why us"
          title={
            <>
              Built for real business
              <br />
              impact
            </>
          }
          description="We build systems that reduce manual work, improve accuracy, and scale with your operations."
        />
        <div className="mt-14 overflow-x-auto">
          <motion.div 
            className="min-w-[850px] border-l border-t border-[#303034]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {comparisonData.map((row, rowIndex) => (
              <motion.div 
                key={rowIndex} 
                className="grid grid-cols-[.6fr_1fr_1fr_1fr]"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                {row.map((cell, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className={`border-b border-r border-[#303034] px-5 py-5 text-sm ${index === 1 ? "bg-white/[.13] text-white" : index > 1 ? "text-white/60" : "text-white/75"}`}
                  >
                    {cell}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
