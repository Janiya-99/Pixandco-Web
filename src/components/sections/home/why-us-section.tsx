"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Check, TriangleAlert, X } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/ui/section-header"

gsap.registerPlugin(useGSAP)

const comparisonData = [
  ["", "PIXANDCO", "Other Agencies", "Hire In House"],
  ["Approach", "✓  Process mapping first", "△  Tool-first approach", "△  Depends on hire"],
  ["Workflow", "✓  Around your operations", "×  Mostly templated", "✓  If expertise exists"],
  ["Speed", "✓  Weeks, not months", "△  Most often delayed", "×  Hiring & onboarding"],
  ["Optimization", "✓  Continuous improvement", "△  Setup & disappear", "△  Limited by bandwidth"],
  ["Cost efficiency", "✓  Fixed project clarity", "△  Scope creep common", "×  Salary + overhead"],
]

function renderIcon(char: string) {
  if (char === "✓") return <Check className="size-4 md:size-4" strokeWidth={1.5} />
  if (char === "△") return <TriangleAlert className="size-4 md:size-4" strokeWidth={1.5} />
  if (char === "×") return <X className="size-4 md:size-4" strokeWidth={1.5} />
  return null
}

function parseCell(cell: string) {
  const match = cell.match(/^(✓|△|×)\s+(.*)$/)
  if (match) {
    return { icon: renderIcon(match[1]), text: match[2] }
  }
  return { icon: null, text: cell }
}

function ComparisonRow({ row, rowIndex }: { row: string[], rowIndex: number }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = rowRef.current
    if (!el || rowIndex === 0) return
    const children = el.children
    
    el.addEventListener('mouseenter', () => {
      gsap.to(children, { backgroundColor: "rgba(255,255,255,0.05)", duration: 0.3 })
      if (children.length > 1) {
        gsap.to(children[1] as Element, { backgroundColor: "rgba(255,255,255,0.15)", duration: 0.3 })
      }
    })
    
    el.addEventListener('mouseleave', () => {
      gsap.to(children, { backgroundColor: "rgba(1,1,1,0.25)", duration: 0.3 })
      if (children.length > 1) {
        gsap.to(children[1] as Element, { backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 })
      }
    })
  }, { scope: rowRef })

  return (
    <motion.div 
      ref={rowRef}
      className="hidden md:grid grid-cols-[.6fr_1fr_1fr_1fr] cursor-default"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 1 } }
      }}
    >
      {row.map((cell, index) => {
        const { icon, text } = parseCell(cell)
        const isHeader = rowIndex === 0
        const isPixandco = index === 1
        const isRowLabel = index === 0
        
        // Define base styles
        const bgClass = isPixandco ? "bg-white/10" : "bg-[rgba(1,1,1,0.25)]"
        
        let textClass = "text-white/60"
        if (isRowLabel) textClass = "text-white/80"
        if (isHeader) textClass = "text-white/80 text-sm" 
        if (isPixandco) textClass = "text-white"
        
        return (
          <div
            key={`${rowIndex}-${index}`}
            className={`border-b border-r border-white/10 px-5 py-5 text-sm font-secondary flex items-center gap-3 ${bgClass} ${textClass}`}
          >
            {icon && <span className={isPixandco ? "text-white" : "text-white/50"}>{icon}</span>}
            <span>{text}</span>
          </div>
        )
      })}
    </motion.div>
  )
}

function MobileComparisonCard({ row }: { row: string[] }) {
  if (!row[0]) return null // Skip header

  return (
    <motion.div 
      className="md:hidden mb-12 last:mb-0"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 1 } }
      }}
    >
      <div className="bg-[rgba(1,1,1,0.25)] py-3 px-4 border-t border-x border-white/10">
        <h3 className="text-base font-medium text-white/90">{row[0]}</h3>
      </div>
      <div className="grid grid-cols-3 border-y border-l border-white/10">
        {row.slice(1).map((cell, idx) => {
          const { icon, text } = parseCell(cell)
          const isPixandco = idx === 0
          return (
            <div key={idx} className={`border-r border-white/10 p-4 flex flex-col gap-3 ${isPixandco ? "bg-white/10 text-white" : "bg-[rgba(1,1,1,0.25)] text-white/50"}`}>
              {icon && <div className={isPixandco ? "text-white" : "text-white/40"}>{icon}</div>}
              <span className="text-xs font-secondary leading-snug">{text}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <Section ref={containerRef} className="relative overflow-hidden py-24 lg:py-40">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 pointer-events-none scale-[1.2]"
      >
        <Image
          src="/images/site/2ypHShhhuvlhIHGoRNi0sTmlo51ae.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </motion.div>
      
      {/* Gradient Overlay (fade top/bottom into section color) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010004] via-transparent to-[#010004] pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeader
          align="center"
          eyebrow="WHY US"
          title={
            <>
              Built for real business
              <br />
              impact
            </>
          }
          description="We build systems that reduce manual work, improve accuracy, and scale with your operations."
        />
        <div className="mt-14 w-full">
          <motion.div 
            className="w-full md:border-l md:border-t md:border-white/10"
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
              <ComparisonRow key={`desktop-${rowIndex}`} row={row} rowIndex={rowIndex} />
            ))}
            
            {comparisonData.map((row, rowIndex) => (
              <MobileComparisonCard key={`mobile-${rowIndex}`} row={row} />
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
