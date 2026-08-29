"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { faqs } from "@/content/site"

import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"

const testimonials = [
  { quote: "PIXANDCO helped us turn a messy process into a clear system. Tasks that used to take hours of manual work now run automatically, and our team can focus on what really matters.", name: "Cristin Tambun", role: "FOUNDER OF PANDAWA", company: "Pandawa™", image: "/images/site/jpIBn59XJaU6dp08UvhhxX984e2e.jpg" },
  { quote: "Working with PIXANDCO completely changed how we handle our operations. What used to feel chaotic is now organized, automated, and much easier to track.", name: "Simo Tedjo", role: "FOUNDER OF SHINTA", company: "Shinta", image: "/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg" },
  { quote: "We shipped the first useful workflow in weeks. Adoption was natural because the design met our team inside the work they already knew.", name: "Asha Morgan", role: "REVENUE DIRECTOR, CURRENT", company: "Current", image: "/images/site/KmimP8fJf3KTg25QrfWgNhSOI4e64.jpg" },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const visible = [testimonials[index] ?? testimonials[0]!, testimonials[(index + 1) % testimonials.length] ?? testimonials[1]!, testimonials[(index + 2) % testimonials.length] ?? testimonials[2]!]
  return <div className="relative"><div className="mb-12 flex items-end justify-between gap-8"><div><AnimatedEyebrow text="Testimonials" /><h2 className="section-title">What our partners say</h2></div><div className="flex gap-2"><button onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)} className="focus-ring grid size-11 place-items-center rounded-[7px] border border-white/15 bg-[#1a1a1d] hover:bg-white/10 transition-colors" aria-label="Previous testimonial"><ChevronLeft className="size-4" /></button><button onClick={() => setIndex((index + 1) % testimonials.length)} className="focus-ring grid size-11 place-items-center rounded-[7px] border border-white/15 bg-[#1a1a1d] hover:bg-white/10 transition-colors" aria-label="Next testimonial"><ChevronRight className="size-4" /></button></div></div><div className="-mx-5 md:mx-0 md:-mr-[50vw] overflow-hidden pr-[50vw] md:pr-[50vw]"><AnimatePresence mode="popLayout" initial={false}><motion.div key={index} className="flex gap-6 w-max px-5 md:px-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: .5, ease: [.22,1,.36,1] }}>{visible.map(item => <figure key={item.name} className="flex flex-col md:flex-row gap-6 p-6 lg:p-8 w-[85vw] md:w-[700px] lg:w-[600px] xl:w-[720px] min-h-[380px] xl:min-h-[420px] rounded-[12px] border border-white/10 bg-[#1a1a1d] shrink-0"><div className="flex flex-1 flex-col justify-between"><p className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">{item.company}</p><h4 className="mt-8 text-[16px] leading-[1.65] tracking-[-.02em] text-white/90">{item.quote}</h4><figcaption className="mt-8 text-sm"><span className="font-medium text-white/90">{item.name}</span><span className="eyebrow mt-1 block text-white/40 uppercase">{item.role}</span></figcaption></div><div className="relative min-h-[260px] md:min-h-[100%] w-full md:w-[45%] shrink-0 overflow-hidden rounded-[8px] border border-white/10"><Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div></figure>)}</motion.div></AnimatePresence></div></div>
}

const plans = [{ name: "Diagnostic", monthly: 1800, yearly: 1650, text: "A focused systems audit and implementation blueprint.", features: ["Workflow mapping", "Opportunity model", "Technical architecture", "90-day roadmap"] }, { name: "Build", monthly: 6800, yearly: 6200, text: "A dedicated team to design and ship your priority system.", features: ["Everything in Diagnostic", "Product design", "Implementation", "Evaluation & launch"] }, { name: "Partner", monthly: 11200, yearly: 9900, text: "Continuous automation and systems improvement.", features: ["Embedded senior team", "Monthly build cycles", "Monitoring & optimization", "Priority support"] }]

export function Pricing() {
  const [yearly, setYearly] = useState(true)
  return <><div className="mb-12 flex justify-center"><div className="flex rounded-[9px] border border-white/15 bg-[#1a1a1d] p-1" aria-label="Billing period"><button onClick={() => setYearly(false)} className={`focus-ring min-h-10 rounded-[6px] px-7 text-xs transition ${!yearly ? "bg-white text-black" : "text-white/45"}`}>Monthly</button><button onClick={() => setYearly(true)} className={`focus-ring min-h-10 rounded-[6px] px-7 text-xs transition ${yearly ? "bg-white text-black" : "text-white/45"}`}>Yearly <span className="ml-1 text-[10px]">−20%</span></button></div></div><div className="grid items-start gap-6 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`rounded-[9px] border border-[#303034] p-6 ${index === 1 ? "bg-[#1a1a1d]" : "bg-transparent"}`}><div className="grid size-9 place-items-center rounded-[7px] border border-white/15 bg-white/5 text-xs">0{index + 1}</div><div className="mt-5 flex items-center gap-2"><h3 className="text-xl">{plan.name}</h3>{index === 1 && <span className="eyebrow rounded-full border border-white/15 px-2 py-1 text-white/55">Popular</span>}</div><p className="mt-3 min-h-12 text-sm leading-6 text-white/45">{plan.text}</p><div className="mt-8 flex items-end gap-2"><AnimatePresence mode="wait"><motion.span key={String(yearly)} className="text-5xl tracking-[-.055em]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>${(yearly ? plan.yearly : plan.monthly).toLocaleString()}</motion.span></AnimatePresence><span className="pb-1 text-xs text-white/35">/mo</span></div><button className={`focus-ring mt-8 flex min-h-11 w-full items-center justify-center gap-3 rounded-[6px] border text-xs font-medium ${index === 1 ? "border-white bg-white text-black" : "border-white/15 bg-white/5"}`}>Choose {plan.name} <ArrowRight className="size-3.5" /></button><p className="mt-4 text-center text-[11px] text-white/45">✓ 30-day implementation guarantee</p><ul className="mt-7 border-t border-white/10 pt-5">{plan.features.map(item => <li key={item} className="py-2 text-sm text-white/70">✓ <span className="ml-2">{item}</span></li>)}</ul></article>)}</div></>
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
