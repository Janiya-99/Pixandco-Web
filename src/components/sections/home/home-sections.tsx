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
import { companyOverview, insightTopics } from "@/content/site"
import { RollingButton } from "@/components/ui/rolling-button"
import { HyperText } from "@/components/ui/hyper-text"
import { SectionHeader } from "@/components/ui/section-header"
import { AmbientVideo } from "@/components/media/ambient-video"
import { Testimonials, Pricing, Faq } from "./interactive-sections"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"
import { ConcentricScrollSection } from "./concentric-scroll-section"
import { IntegrationSection } from "./integration-section"
import { ServicesSection } from "./services-section"
import { WhyUsSection } from "./why-us-section"

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
              <video src="/videos/girl.mp4" autoPlay muted loop playsInline aria-hidden="true" className="h-24 w-20 shrink-0 rounded-[4px] bg-[#27272b] object-cover" />
              <div className="min-w-44"><p className="text-sm">Talk with Pix & Co</p><p className="eyebrow mt-2 text-white/40 tracking-[0.2em]">BUSINESS SOLUTIONS</p><Link href="/contact" style={{ color: '#000' }} className="group focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium transition-colors hover:bg-white/90"><span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span></span><ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" /></Link></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function MiniCallCard() {
  return (
    <div className="inline-flex items-center gap-3 rounded-[9px] border border-white/15 bg-[#1a1a1d] p-2">
      <video src="/videos/girl.mp4" autoPlay muted loop playsInline aria-hidden="true" className="h-24 w-20 shrink-0 rounded-[4px] bg-[#27272b] object-cover" />
      <div className="min-w-44">
        <p className="text-sm">Talk with Pix & Co</p>
        <p className="eyebrow mt-2 text-white/40">BUSINESS SOLUTIONS</p>
        <Link href="/contact" style={{ color: '#000' }} className="group focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium transition-colors hover:bg-white/90">
          <span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">Discuss Your Project</span></span> <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function TrustSection() {
  return <Section><Container><SectionHeader align="center" eyebrow="COMPANY OVERVIEW" title="Built in Colombo. Working Worldwide." description={companyOverview} /><p className="mx-auto mt-6 max-w-3xl text-center text-white/50">With more than ten years of experience and clients worldwide, we work with businesses at every stage and scale - from blue-chip organisations and established B2B companies to entrepreneurs and single-owner businesses ready to build, improve, or grow.</p></Container></Section>
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
        <Image src={step.img} alt="" fill sizes="(min-width: 1200px) calc(max((min(100vw - 40px, 1240px) - 48px) / 3, 1px) + 0.5px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(100vw - 40px, 1240px) - 48px) / 3, 1px) + 0.5px), (max-width: 809.98px) calc(min(100vw - 40px, 1240px) + 0.5px)" className="object-cover" />
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

    <Section><Container><SectionHeader align="center" eyebrow="SELECTED WORK" title={<>Solutions Built Around<br />Business Outcomes</>} description="Selected software, website, brand, and digital growth solutions developed for businesses of different sizes and sectors." /><p className="mt-12 text-center text-white/50">Case studies will be published here.</p><Reveal className="mt-16 mb-24 flex justify-center"><RollingButton href="/projects">View All Case Studies</RollingButton></Reveal></Container></Section>

    <Section><Container><SectionHeader align="center" eyebrow="HOW WE WORK" title={<>A Clear Process From<br />Problem to Solution</>} description="We understand the requirement, build the right solution, and improve it as the business grows." /><div className="mt-16 grid gap-6 md:grid-cols-3 pb-16">{[{ n: "1", t: "Understand the Business", d: "We review your operations, customers, current systems, challenges, and business objectives.", img: "/images/site/uzBphIDqI0PbwOqso2AzaFeAw884f21.png" }, { n: "2", t: "Design and Develop", d: "We plan and build a practical solution around your actual processes and commercial requirements.", img: "/images/site/Ur5L7stgzjVpLuLg9LTa7PP3W7g4f21.png" }, { n: "3", t: "Launch and Improve", d: "We launch, monitor, support, and improve the solution based on performance and business growth.", img: "/images/site/weOlvtCQtvQqEObp7dFtnwJImcY4f21.png" }].map((step, i) => <StepCard key={step.n} step={step} index={i} />)}</div></Container></Section>

    <IntegrationSection />

    <ServicesSection />

    <WhyUsSection />

    <Section><Container><Testimonials /></Container></Section>
    <Section><Container><SectionHeader align="center" eyebrow="RESULTS" title="Measured by Business Results" /><div className="mt-10 grid grid-cols-2 lg:grid-cols-4">{["Solutions Delivered", "Operational Improvement", "Businesses Supported", "Client Retention"].map(label => <div key={label} className="border border-white/10 p-6"><p className="text-xl">{label}</p><p className="mt-3 text-sm text-white/50">Results to be published.</p></div>)}</div></Container></Section>

    <Section><Container><SectionHeader align="center" eyebrow="WORK WITH PIX & CO" title={<>Flexible Ways to<br />Build and Grow</>} /><Reveal className="mt-14"><Pricing /></Reveal></Container></Section>

    <Section><Container><div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><AnimatedEyebrow text="INSIGHTS" /><h2 className="section-title mt-6 tracking-[-.04em]">Practical Insights for Growing Businesses</h2></div><RollingButton variant="outline" href="/blog">View All Insights</RollingButton></div><div className="mt-12 grid gap-8 md:grid-cols-3">{insightTopics.map(topic => <Reveal key={topic} className="rounded-lg border border-white/10 p-6"><h3 className="text-xl">{topic}</h3></Reveal>)}</div></Container></Section>

    <Section><Container><div className="grid gap-14 lg:grid-cols-[.55fr_1fr]"><div className="flex flex-col items-start"><SectionHeader eyebrow="FAQ" title={<>Common Questions About<br />Working With Pix & Co</>} /><Reveal className="mt-auto pt-16"><MiniCallCard /></Reveal></div><Reveal><Faq /></Reveal></div></Container></Section>
  </>
}
