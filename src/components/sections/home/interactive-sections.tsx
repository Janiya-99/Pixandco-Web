"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { faqs, plans } from "@/content/site"

import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"

export function Testimonials() {
  return <div><AnimatedEyebrow text="CLIENT FEEDBACK" /><h2 className="section-title">What Our Clients Say</h2><p className="mt-8 text-white/50">Client feedback will be published here.</p></div>
}

export function Pricing() {
  return <div className="grid items-start gap-6 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className="rounded-[9px] border border-[#303034] bg-[#1a1a1d] p-6"><p className="eyebrow">0{index + 1}</p><h3 className="mt-5 text-2xl">{plan.name}</h3><p className="mt-4 text-sm leading-6 text-white/50">{plan.text}</p><ul className="my-7 border-t border-white/10 pt-5">{plan.features.map(item => <li key={item} className="py-2 text-sm text-white/70">✓ {item}</li>)}</ul><Link href="/contact" className="focus-ring flex min-h-12 items-center justify-between gap-3 rounded-md bg-white px-4 text-sm text-black">{plan.button}<ArrowRight className="size-4" /></Link></article>)}</div>
}

function FaqItem({ faq, isOpen, onToggle }: { faq: any; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-[7px] border border-[#303034] bg-[#1a1a1d]">
      <button 
        onClick={onToggle}
        className="group focus-ring flex min-h-16 w-full items-center justify-between gap-8 px-5 py-4 text-left text-base"
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <span 
          className={`text-xl font-light text-white/60 transition-transform ${isOpen ? "rotate-45" : ""}`} 
          style={{ transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl px-5 pb-6 text-sm leading-7 text-white/50">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() { 
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <FaqItem 
          key={faq.question} 
          faq={faq} 
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  ) 
}
