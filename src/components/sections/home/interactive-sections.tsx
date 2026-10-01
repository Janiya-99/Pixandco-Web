"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { faqs, plans } from "@/content/site"

import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"

import Image from "next/image"

const testimonials = [
  {
    quote: "Sanjaya helped us turn a messy process into a clear system. Tasks that used to take hours of manual work now run automatically, and our team can focus on what really matters.",
    name: "Cristin Tambun",
    role: "FOUNDER OF PANDAWA",
    company: "Pandawa™",
    logo: "/images/site/nxa6pfbQtEYxdVeUqpkPW8Dsa4b929.webp",
    image: "/images/site/cristin-tambun.jpg",
  },
  {
    quote: "Working with Sanjaya completely changed how we handle our operations. What used to feel chaotic is now organized, automated, and much easier to track.",
    name: "Simon Tedjo",
    role: "FOUNDER OF SHINTA",
    company: "Shinta",
    logo: "/images/site/1u8H6mP6vhZLd0xVrSiW9moQdc32.webp",
    image: "/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg",
  },
  {
    quote: "Sanjaya helped us restructure our entire sales workflow. What used to require manual coordination across multiple tools is now automated and measurable.",
    name: "Sinta Widjaja",
    role: "FOUNDER OF MANDALA",
    company: "Mandala",
    logo: "/images/site/Mld8FcmFfxKKmF9yh6rbn1Bk620f011.webp",
    image: "/images/site/5G1JBCX3fkqZAKYA6QK55SRIiZo4e2e.jpg",
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const visible = [
    testimonials[index] ?? testimonials[0]!,
    testimonials[(index + 1) % testimonials.length] ?? testimonials[1]!,
  ]

  return (
    <div>
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <span className="eyebrow inline-flex rounded-[4px] border border-white/10 bg-[#1a1a1d] px-3 py-1.5 text-white/70">
            TESTIMONIALS
          </span>
          <h2 className="section-title mt-4 tracking-[-.04em]">
            Hear from our satisfied clients
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)}
            className="focus-ring grid size-11 place-items-center rounded-[7px] border border-white/15 bg-[#1a1a1d] transition-colors hover:bg-white/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => setIndex((index + 1) % testimonials.length)}
            className="focus-ring grid size-11 place-items-center rounded-[7px] border border-white/15 bg-[#1a1a1d] transition-colors hover:bg-white/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col justify-between gap-6 rounded-[12px] border border-white/10 bg-[#161618] p-6 sm:flex-row lg:p-8"
            >
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex h-7 items-center">
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={120}
                      height={28}
                      className="h-6 w-auto object-contain opacity-85"
                    />
                  </div>
                  <p className="mt-8 text-[15px] leading-[1.65] tracking-[-.01em] text-white/90 md:text-[16px]">
                    {item.quote}
                  </p>
                </div>
                <figcaption className="mt-8 text-sm">
                  <span className="font-medium text-white/90">{item.name}</span>
                  <span className="eyebrow mt-1 block font-mono text-[11px] text-white/40 uppercase">
                    {item.role}
                  </span>
                </figcaption>
              </div>

              <div className="relative min-h-[260px] w-full shrink-0 overflow-hidden rounded-[8px] border border-white/5 bg-[#212124] sm:min-h-[280px] sm:w-[200px] lg:w-[220px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Pricing() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <article key={plan.name} className="flex flex-col justify-between rounded-[9px] border border-[#303034] bg-[#1a1a1d] p-6 h-full">
          <div>
            <p className="eyebrow font-mono text-[11px] text-white/40">0{index + 1}</p>
            <h3 className="mt-5 text-2xl font-normal tracking-[-.03em] text-white">{plan.name}</h3>
            <p className="mt-4 text-sm leading-6 text-white/50">{plan.text}</p>
            <ul className="my-7 border-t border-white/10 pt-5 space-y-2">
              {plan.features.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-white/40">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/contact"
            style={{ color: "#000000" }}
            className="group focus-ring mt-4 flex min-h-12 w-full items-center justify-between rounded-[8px] bg-white px-5 text-sm font-medium !text-black transition-colors hover:bg-white/90"
          >
            <span style={{ color: "#000000" }} className="!text-black font-medium">{plan.button}</span>
            <ArrowRight className="size-4 !text-black transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#000000" }} />
          </Link>
        </article>
      ))}
    </div>
  )
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
