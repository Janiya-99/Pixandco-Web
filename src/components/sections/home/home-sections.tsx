"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextReveal } from "@/components/motion/text-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"
import { RollingButton } from "@/components/ui/rolling-button"
import { HyperText } from "@/components/ui/hyper-text"
import { SectionHeader } from "@/components/ui/section-header"
import { ArticleCard } from "@/components/blog/article-card"
import { AmbientVideo } from "@/components/media/ambient-video"
import { projects } from "@/content/projects"
import { posts } from "@/content/posts"
import { Testimonials, Pricing, Faq } from "./interactive-sections"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"
import { ConcentricScrollSection } from "./concentric-scroll-section"
import { PinnedProjects } from "./pinned-projects"
import { IntegrationSection } from "./integration-section"
import { ServicesSection } from "./services-section"
import { WhyUsSection } from "./why-us-section"
import { Ripple } from "@/components/ui/ripple"

gsap.registerPlugin(useGSAP)

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
        mediaClassName="object-cover object-center brightness-[.58] contrast-[1.12] scale-[1.3] md:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,4,.05)_0%,transparent_48%,rgba(1,0,4,.88)_100%)]" />

      <Container className="relative z-10 flex min-h-[750px] flex-col pt-24 md:pt-28 pb-12 md:pb-16 lg:pb-20">
        
        {/* Top Section: AI List and Paragraph */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 w-full flex-1">
          <div className="flex flex-col items-start gap-3">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.5 }} className="eyebrow text-white/70">/ AI AUTOMATION</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.6 }} className="eyebrow text-white/70">/ AI INTEGRATION</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.7 }} className="eyebrow text-white/70">/ AI AGENT DEVELOPMENT</motion.span>
          </div>
          
          {/* Flexible space to push the paragraph down on mobile */}
          <div className="flex-1 md:hidden" />
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.6 }} className="mb-8 md:mb-0 max-w-sm self-end text-right text-[15px] leading-relaxed text-white/90 md:justify-self-end md:text-base">We design automation that brings clarity, precision, and efficiency to the way your company operates.</motion.p>
        </div>

        {/* Bottom Section: Badge, Heading, and Card */}
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] w-full">
          <div className="flex flex-col items-start">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.5 }} className="eyebrow inline-flex bg-[#1a1a1d] border border-white/5 px-3 py-1.5 text-white/75">
              <HyperText text="WE AUTOMATE 100+ BUSINESSES" className="font-mono text-[10px] tracking-widest text-white/50" />
            </motion.span>
            
            {/* Desktop Heading */}
            <div className="hidden md:block mt-5 w-full">
              <TextReveal animateOnMount className="display w-full tracking-[-.04em]" lines={["Clear. Precise.", "Automated."]} />
            </div>

            {/* Mobile Heading */}
            <div className="md:hidden mt-4 mb-4 w-full">
              <TextReveal animateOnMount className="w-full tracking-[-.04em] whitespace-nowrap !text-[8.5vw] sm:!text-4xl" lines={["Clear. Precise. Automated."]} />
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: 1.0 }} className="rounded-[9px] border border-white/15 bg-[#111114]/90 p-2 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-24 overflow-hidden rounded-[4px] bg-[#202024] flex items-center justify-center text-white/50 text-xl font-medium">
                <video 
                  src="/videos/girl.mp4"
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="min-w-44"><p className="text-sm">Talk with Clarissa</p><p className="eyebrow mt-2 text-white/40 tracking-[0.2em]">DIRECTOR OF PIXANDCO</p><Link href="/contact" style={{ color: '#000' }} className="group focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium transition-colors hover:bg-white/90"><span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">Book 15-min call</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">Book 15-min call</span></span><ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" /></Link></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

const trustedCompanies = [
  { name: "Meridian", mark: "M", style: "font-semibold tracking-[-.04em]" },
  { name: "Formworks", mark: "F", style: "font-medium tracking-[.08em] uppercase" },
  { name: "Current", mark: "C", style: "font-semibold tracking-[-.05em]" },
  { name: "Aurelia", mark: "A", style: "font-normal tracking-[.04em]" },
  { name: "Arcvault", mark: "AV", style: "font-semibold tracking-[.02em] uppercase" },
  { name: "Kinetic", mark: "K", style: "font-black tracking-[-.06em] uppercase" },
  { name: "Northstar", mark: "N", style: "font-normal tracking-[.1em] uppercase" },
  { name: "Orbital", mark: "O", style: "font-semibold tracking-[-.04em]" },
  { name: "Foundry", mark: "FD", style: "font-medium tracking-[.04em] uppercase" },
  { name: "Fieldwork", mark: "FW", style: "font-semibold tracking-[-.02em]" },
] as const

function TrustCard({ company }: { company: typeof trustedCompanies[number] }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current) return
    container.current.addEventListener("mouseenter", () => {
      gsap.to(container.current, { backgroundColor: "#1a1a1d", color: "#ffffff", duration: 0.8, ease: "power2.out" })
    })
    container.current.addEventListener("mouseleave", () => {
      gsap.to(container.current, { backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.4)", duration: 0.8, ease: "power2.out" })
    })
  }, { scope: container })

  return (
    <motion.div
      ref={container}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 1 } } }}
      className="relative flex min-h-[110px] items-center justify-center border-b border-r border-[#212121] px-4 text-white/40"
    >
      <div className="flex items-center gap-3 pointer-events-none">
        <span className="grid size-7 place-items-center border border-current text-[9px] font-semibold tracking-[-.04em] opacity-75" aria-hidden>{company.mark}</span>
        <span className={`text-lg md:text-xl ${company.style}`}>{company.name}</span>
      </div>
    </motion.div>
  )
}

function MiniCallCard() {
  return (
    <div className="inline-flex items-center gap-3 rounded-[9px] border border-white/15 bg-[#1a1a1d] p-2">
      <div className="relative w-20 h-24 overflow-hidden rounded-[4px] bg-[#27272b]">
        <video
          src="/videos/girl.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="min-w-44">
        <p className="text-sm">Talk with Clarissa</p>
        <p className="eyebrow mt-2 text-white/40">DIRECTOR OF PIXANDCO</p>
        <Link href="/contact" style={{ color: '#000' }} className="group focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium transition-colors hover:bg-white/90">
          <span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">Book 15-min call</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">Book 15-min call</span></span> <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-[#010004] pt-8 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <Ripple mainCircleSize={400} numCircles={6} mainCircleOpacity={0.15} />
      <Container className="relative z-10">
        <p className="eyebrow mb-10 text-center text-white/45 tracking-[0.2em]">TRUSTED COMPANIES ACROSS INDUSTRIES</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 border-l border-t border-[#212121] md:grid-cols-5"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        >
          {trustedCompanies.map((company) => (
            <TrustCard key={company.name} company={company} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

function StepCard({ step, index }: { step: { n: string, t: string, d: string, img: string }, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    const img = cardRef.current.querySelector('img')
    const overlay = cardRef.current.querySelector('.overlay-bg')

    cardRef.current.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 1, ease: "power2.out" })
      gsap.to(overlay, { opacity: 0.8, duration: 0.5 })
      gsap.to(cardRef.current, { borderColor: "rgba(255,255,255,0.15)", duration: 0.3 })
    })

    cardRef.current.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" })
      gsap.to(overlay, { opacity: 1, duration: 0.5 })
      gsap.to(cardRef.current, { borderColor: "#2b2b2f", duration: 0.3 })
    })
  }, { scope: cardRef })

  return (
    <Reveal className={`${index === 1 ? 'md:mt-10' : index === 2 ? 'md:mt-20' : ''}`}>
      <div ref={cardRef} className="relative aspect-[4/5] overflow-hidden rounded-[12px] border border-[#2b2b2f] bg-[#1a1a1d]">
        <Image src={step.img} alt="" fill sizes="33vw" className="cinematic-image object-cover" />
        <div className="overlay-bg absolute inset-0 bg-gradient-to-t from-[#010004]/90 via-[#010004]/45 to-transparent opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
          <h4 className="text-xl font-medium tracking-[-.04em] text-white font-primary">{step.n}. {step.t}</h4>
          <p className="mt-3 text-[15px] leading-6 text-white/60 font-secondary">{step.d}</p>
        </div>
      </div>
    </Reveal>
  )
}

export function HomeSections() {
  return <>
    <TrustSection />

    <ConcentricScrollSection />

    <Section><Container><SectionHeader align="center" eyebrow="OUR WORKS" title={<>Structured. Automated.<br />Delivered.</>} description="Selected workflow transformations across operations, revenue, and internal systems." /><PinnedProjects /><div className="flex justify-center"><RollingButton variant="outline" href="/projects" className="mt-12">See all case studies</RollingButton></div></Container></Section>

    <Section><Container><SectionHeader align="center" eyebrow="HOW IT WORKS" title={<>A simple, structured<br />approach to automation</>} description="We design systems that remove friction, sharpen workflows, and help your team operate with clarity and control." /><div className="mt-16 grid gap-6 md:grid-cols-3 pb-16">{[{ n: "1", t: "Understand Your Workflow", d: "We analyze your workflow, tools, and bottlenecks.", img: "/images/site/pGKzMvVMxZif17kRFV5Tn7pC3382fe7.jpg" }, { n: "2", t: "Design & Build the System", d: "We implement automation tailored to your business.", img: "/images/site/5G1JBCX3fkqZAKYA6QK55SRIiZo4e2e.jpg" }, { n: "3", t: "Optimize & Scale", d: "We refine, improve, and scale as your operations.", img: "/images/site/GoY7QtIQYXxZ0jQ1f9q10cj7cMId19d.jpg" }].map((step, i) => <StepCard key={step.n} step={step} index={i} />)}</div></Container></Section>

    <IntegrationSection />

    <ServicesSection />

    <WhyUsSection />

    <Section><Container><Testimonials /></Container></Section>
    <section><Container><div className="grid grid-cols-2 border-l border-t border-[#303034] lg:grid-cols-4">{[{ v: 100, s: "+", l: "workflows automated" }, { v: 50, s: "%", l: "time saved" }, { v: 3, s: "x", l: "process efficiency" }, { v: 70, s: "%", l: "less human error" }].map(stat => <Reveal key={stat.l} className="border-b border-r border-[#303034] px-6 lg:px-8 py-8 flex items-start gap-3"><div className="text-4xl tracking-[-.05em] md:text-[3.5rem] leading-none"><Counter value={stat.v} /></div><div className="flex flex-col mt-0.5"><span className="text-lg md:text-xl leading-none">{stat.s}</span><span className="eyebrow mt-2 text-white/40 uppercase font-mono max-w-[100px] leading-[1.3]">{stat.l}</span></div></Reveal>)}</div></Container></section>

    <Section><Container><SectionHeader align="center" eyebrow="PRICING" title={<>Flexible plans for your<br />automation goals</>} /><Reveal className="mt-14"><Pricing /></Reveal></Container></Section>

    <Section><Container><div className="flex items-end justify-between gap-8"><div><AnimatedEyebrow text="BLOG" /><h2 className="section-title mt-6 tracking-[-.04em]">Insights on AI & automation</h2></div><RollingButton variant="outline" href="/blog">See more</RollingButton></div><div className="mt-12 grid gap-8 md:grid-cols-3">{posts.map(post => <Reveal key={post.slug}><ArticleCard post={post} /></Reveal>)}</div></Container></Section>

    <Section><Container><div className="grid gap-14 lg:grid-cols-[.55fr_1fr]"><div className="flex flex-col items-start"><SectionHeader eyebrow="FAQ" title={<>Have questions?<br />Check out the FAQs</>} /><Reveal className="mt-auto pt-16"><MiniCallCard /></Reveal></div><Reveal><Faq /></Reveal></div></Container></Section>
  </>
}
