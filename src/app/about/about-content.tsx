"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Diamond, Accessibility, Rocket, Handshake } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { Counter } from "@/components/motion/counter"

const values = [
  { icon: Diamond, title: "Clarity Over\nComplexity", text: "We simplify complex workflows into clear, structured systems." },
  { icon: Accessibility, title: "Human-Centered\nAutomation", text: "Automation should support how teams actually work." },
  { icon: Rocket, title: "Thoughtful\nExecution", text: "Every system is carefully designed for reliability and efficiency." },
  { icon: Handshake, title: "Long-Term\nDevelopment", text: "We create automation that grows with the business." }
]

const team = [
  { name: "John Smith", role: "Product Manager", img: "/images/site/dqnCbtTjxB2BMDWIbbltr5HnYff71.jpg" },
  { name: "Sarah Jenkins", role: "Software Engineer", img: "/images/site/fJCyipaZmFOAcrvMpcNWnkeQpuQ4b29.jpg" },
  { name: "Hannah Brown", role: "System Designer", img: "/images/site/GH4QoaMu8RYFLKuhxm439mvWGfY9dd3.jpg" },
  { name: "David Chen", role: "Operations Lead", img: "/images/site/GoY7QtIQYXxZ0jQ1f9q10cj7cMI7744.jpg" },
  { name: "Maya Patel", role: "Data Scientist", img: "/images/site/ho4zNmz230ij3u9hxzoHO7liY40531.jpg" },
  { name: "Emily Watson", role: "UX Researcher", img: "/images/site/fJCyipaZmFOAcrvMpcNWnkeQpuQ4b29.jpg" }
]

export function AboutContent() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[750px] lg:min-h-[85vh] flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/site/about-1.png" alt="Team Background" fill priority className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010004] via-[#010004]/60 to-transparent" />
        </div>
        <Container className="relative z-10 flex min-h-[750px] lg:min-h-[85vh] flex-col pb-12 pt-32 md:pb-16 md:pt-36 lg:pb-20 lg:pt-48">
          <div className="mt-auto flex flex-col items-center text-center gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="eyebrow inline-flex bg-[#1a1a1d] border border-white/5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/75">
                ABOUT US
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="display mt-2 w-full text-center">
              The Minds Behind the<br />Automation
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-2 max-w-xl text-[16px] text-white/70 text-center">
              Ideas, strategies, and practical guides to help businesses streamline operations and grow with AI.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* 2. Our Story (Text Left, Image Right) */}
      <Section className="py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="flex flex-col">
              <p className="eyebrow text-white/40">OUR STORY</p>
              <h2 className="mt-6 text-3xl font-medium leading-[1.2] tracking-[-.02em] md:text-4xl">Designing an Automation System to Simplify Campaign Management.</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-white/50">PIXANDCO was formed around a simple belief: intelligent systems should reduce cognitive load, not add another layer of complexity. We work close to the people doing the work, understand the decisions underneath it, and build the smallest system capable of changing the outcome.</p>
              <div className="mt-10">
                <a href="#" className="inline-flex items-center gap-3 rounded-[6px] border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[.1em] text-white transition-colors hover:bg-white/10">View Case Study <ArrowRight className="size-3.5" /></a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="relative min-h-[400px] overflow-hidden rounded-[16px] border border-white/5 bg-[#141416]">
              <Image src="/images/site/dkpghgxjwxqlrykTdpS9NmsQd19d.png" alt="Team meeting" fill className="object-cover" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 3. Our Vision (Image Left, Text Right) */}
      <Section className="py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="relative min-h-[400px] overflow-hidden rounded-[16px] border border-white/5 bg-[#141416] order-2 md:order-1">
              <Image src="/images/site/86z1WWJUjfxdfsu9JnKX80ltBAd19d.png" alt="Working together" fill className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="flex flex-col order-1 md:order-2">
              <p className="eyebrow text-white/40">OUR VISION</p>
              <h2 className="mt-6 text-3xl font-medium leading-[1.2] tracking-[-.02em] md:text-4xl">Faster Campaign Execution and More Efficient Team Operations</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-white/50">Our model stays deliberately compact. The people diagnosing the constraint are the same people designing and shipping the solution. We build to keep changing, ensuring your systems scale alongside your operations effortlessly.</p>
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-medium tracking-[-.02em] text-white">2.4x</p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[.1em] text-white/40">MORE SALES</p>
                </div>
                <div>
                  <p className="text-3xl font-medium tracking-[-.02em] text-white">3x</p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[.1em] text-white/40">FASTER EXECUTION</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 4. Values Grid */}
      <Section className="py-24">
        <Container>
          <div className="grid overflow-hidden rounded-[16px] border border-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`flex flex-col p-8 md:p-10 ${i !== values.length - 1 ? 'border-b border-white/5 lg:border-b-0 lg:border-r' : ''} ${i === 1 ? 'sm:border-b-0' : ''}`}>
                  <Icon className="mb-20 size-8 text-white" />
                  <h3 className="mb-4 whitespace-pre-line text-[22px] font-medium leading-[1.2] tracking-tight">{v.title}</h3>
                  <p className="text-[14px] leading-relaxed text-white/50">{v.text}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Stats + Image */}
      <Section className="py-32">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:items-center">
            <div className="flex flex-col gap-12">
              {[
                { v: 14, s: "", l: "Years of Experience" },
                { v: 50, s: "M+", l: "Client ROI" },
                { v: 4, s: "", l: "Global Offices" },
                { v: 90, s: "%", l: "Team Adoption" }
              ].map((stat, i) => (
                <motion.div key={stat.l} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <p className="text-5xl font-medium tracking-[-.04em]">
                    <Counter value={stat.v} suffix={stat.s} />
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[.1em] text-white/40">{stat.l}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative min-h-[500px] w-full overflow-hidden rounded-[16px] border border-white/5">
              <Image src="/images/site/USJzwoljJMVT6SqJoDeM0lTkeC4bc73.png" alt="Team meeting" fill className="object-cover" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 6. Quote Section */}
      <Section className="py-24">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-16 md:flex-row">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="flex-1">
              <svg className="mb-10 size-12 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <h2 className="max-w-2xl text-4xl font-medium leading-[1.2] tracking-[-.02em] md:text-[44px]">
                Our goal is simple: build thoughtful systems that help businesses run more clearly and scale with confidence.
              </h2>
              <div className="mt-12 flex flex-col gap-1.5">
                <p className="text-[17px] font-medium text-white/90">Bagus William</p>
                <p className="eyebrow text-[10px] tracking-[0.15em] text-white/40 uppercase">CEO & CO-FOUNDER OF PIXANDCO</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="relative w-full max-w-sm shrink-0 md:max-w-md">
              <div className="relative aspect-[4/5] w-full">
                <Image src="/images/site/nuJVsgB5Vt7403nVugJ6U0hdjE8a9f.png" alt="Bagus William" fill className="object-contain object-bottom" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#010004] to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 7. Team Grid */}
      <Section className="pt-24 pb-40">
        <Container>
          <div className="text-center">
            <p className="eyebrow text-white/40">MEET OUR</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-.04em] md:text-5xl">The People Behind PIXANDCO</h2>
          </div>
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative overflow-hidden rounded-[16px] border border-white/5 bg-[#141416]">
                <div className="relative aspect-[3/4] w-full">
                  <Image src={member.img} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010004]/90 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <h4 className="text-lg font-medium tracking-wide">{member.name}</h4>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="grid size-8 place-items-center rounded bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"><svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}
