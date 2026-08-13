"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextReveal } from "@/components/motion/text-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"
import { RollingButton } from "@/components/ui/rolling-button"
import { ScrambleText } from "@/components/ui/scramble-text"
import { SectionHeader } from "@/components/ui/section-header"
import { ArticleCard } from "@/components/blog/article-card"
import { AmbientVideo } from "@/components/media/ambient-video"
import { projects } from "@/content/projects"
import { posts } from "@/content/posts"
import { Faq, Pricing, Testimonials } from "./interactive-sections"
import { ConcentricScrollSection } from "./concentric-scroll-section"
import { PinnedProjects } from "./pinned-projects"
import { IntegrationSection } from "./integration-section"
import { ServicesSection } from "./services-section"
import { WhyUsSection } from "./why-us-section"

export function HeroSection() {
  return (
    <section className="relative min-h-[750px] lg:min-h-screen overflow-hidden">
      <AmbientVideo
        src="/videos/ruNWMG1hPz7eOeYESQefyP03dc.mp4"
        poster="/images/video-posters/hero-system.webp"
        alt="Reflective precision-engineered machine surface"
        priority
        sizes="100vw"
        className="absolute inset-0"
        mediaClassName="object-cover grayscale brightness-[.58] contrast-[1.12]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,4,.72)_0%,rgba(1,0,4,.18)_58%,rgba(1,0,4,.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,4,.05)_0%,transparent_48%,rgba(1,0,4,.88)_100%)]" />

      <Container className="relative z-10 flex min-h-[750px] lg:min-h-screen flex-col pb-14 pt-32 md:pb-16 md:pt-36 lg:pb-24 lg:pt-48">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start gap-3">
            <span className="eyebrow text-white/70">/ AI AUTOMATION</span>
            <span className="eyebrow text-white/70">/ AI INTEGRATION</span>
            <span className="eyebrow text-white/70">/ AI AGENT DEVELOPMENT</span>
          </div>
          <p className="max-w-sm justify-self-end text-base leading-6 text-white/80 md:text-right">We design automation that brings clarity, precision, and efficiency to the way your company operates.</p>
        </div>

        <div className="mt-auto grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow inline-flex bg-[#1a1a1d] border border-white/5 px-3 py-1.5 text-white/75">
              <ScrambleText text="WE AUTOMATE 100+ BUSINESSES" chars=">?/@#$%^&*<-+" delay={0.5} />
            </span>
            <TextReveal animateOnMount className="display mt-5 w-full" lines={["Clear. Precise. Automated."]} />
          </div>
          <div className="rounded-[9px] border border-white/15 bg-[#111114]/90 p-2 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative size-16 overflow-hidden rounded-[4px] bg-[#202024] flex items-center justify-center text-white/50 text-xl font-medium">
                C
              </div>
              <div className="min-w-44"><p className="text-sm">Talk with Clarissa</p><p className="eyebrow mt-2 text-white/40">DIRECTOR OF SANJAYA</p><Link href="/contact" className="focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium text-black">Book 15-mins call <ArrowRight className="size-3.5" /></Link></div>
            </div>
          </div>
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

function MiniCallCard() {
  return <div className="inline-flex items-center gap-3 rounded-[9px] border border-white/15 bg-[#1a1a1d] p-2"><div className="grid size-16 place-items-center bg-[#27272b] text-xl font-semibold">N</div><div className="min-w-44"><p className="text-sm">Talk with Northline</p><p className="eyebrow mt-2 text-white/40">Systems studio</p><Link href="/contact" className="focus-ring mt-3 flex min-h-9 items-center justify-between rounded-[6px] bg-white px-3 text-xs font-medium text-black">Book 15-min call <ArrowRight className="size-3.5" /></Link></div></div>
}

function ProjectShowcaseRow({ project }: { project: (typeof projects)[number] }) {
  return <article className="grid overflow-hidden rounded-[9px] border border-[#303034] bg-[#1a1a1d] md:grid-cols-2"><div className="relative min-h-72 md:min-h-[420px]"><Image src={project.coverImage} alt={`${project.title} project`} fill sizes="(max-width: 768px) 100vw, 50vw" className="cinematic-image object-cover" /></div><div className="flex flex-col p-6 md:p-8"><div className="flex items-center gap-2 border-b border-white/10 pb-4"><span className="eyebrow text-white/50">{project.year}</span><span className="text-white/20">•</span><span className="eyebrow text-white/50">{project.industry}</span></div><p className="mt-5 text-xl text-white/50">{project.title}</p><h3 className="mt-7 text-3xl leading-[1.05] tracking-[-.05em]">{project.summary}</h3><Link href={`/projects/${project.slug}`} className="focus-ring mt-6 inline-flex min-h-10 w-fit items-center gap-5 rounded-[6px] bg-white/10 px-4 text-xs font-medium">View case study <ArrowRight className="size-3.5" /></Link><div className="mt-auto grid grid-cols-2 gap-5 border-t border-white/10 pt-6">{project.metrics.slice(0,2).map(metric => <div key={metric.label}><p className="text-3xl tracking-[-.04em]">{metric.value}</p><p className="eyebrow mt-3 text-white/35">{metric.label}</p></div>)}</div></div></article>
}

function TrustSection() {
  return (
    <section className="bg-[#010004] pt-8 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <Container>
        <p className="eyebrow mb-10 text-center text-white/45">TRUSTED COMPANIES ACROSS INDUSTRIES</p>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="grid grid-cols-2 border-l border-t border-[#212121] md:grid-cols-5"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        >
          {trustedCompanies.map((company) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              key={company.name}
              className="group flex min-h-[110px] items-center justify-center border-b border-r border-[#212121] px-4 text-white/40 transition-colors duration-300 hover:bg-[#1a1a1d] hover:text-white/80"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center border border-current text-[9px] font-semibold tracking-[-.04em] opacity-75" aria-hidden>{company.mark}</span>
                <span className={`text-lg md:text-xl ${company.style}`}>{company.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export function HomeSections() { return <>
  <TrustSection />

  <ConcentricScrollSection />

  <Section><Container><SectionHeader align="center" eyebrow="Our work" title={<>Structured. Automated.<br />Delivered.</>} description="Selected workflow transformations across operations, revenue, and internal systems." /><PinnedProjects /><div className="flex justify-center"><RollingButton variant="outline" href="/projects" className="mt-12">See all case studies</RollingButton></div></Container></Section>

  <Section><Container><SectionHeader align="center" eyebrow="How it works" title={<>A simple, structured<br />approach to automation</>} description="We design systems that remove friction, sharpen workflows, and help your team operate with clarity and control." /><div className="mt-16 grid gap-6 md:grid-cols-3">{[{n:"1",t:"Understand your workflow",d:"We analyze your workflow, tools, and bottlenecks.",img:"/images/terrain-system.png"},{n:"2",t:"Design & build the system",d:"We implement automation tailored to your business.",img:"/images/hero-portal.png"},{n:"3",t:"Optimize & scale",d:"We refine, improve, and scale as your operations evolve.",img:"/images/robotic-system.png"}].map(step => <Reveal key={step.n}><div className="group relative aspect-square overflow-hidden rounded-[9px] border border-[#2b2b2f]"><Image src={step.img} alt="" fill sizes="33vw" className="cinematic-image object-cover transition-transform duration-1000 ease-out group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#010004]/90 via-[#010004]/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" /><div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8"><h3 className="text-xl font-medium tracking-[-.04em] text-white">{step.n}. {step.t}</h3><p className="mt-3 text-sm leading-6 text-white/60">{step.d}</p></div></div></Reveal>)}</div></Container></Section>

  <IntegrationSection />

  <ServicesSection />

  <WhyUsSection />

  <Section><Container><Testimonials /></Container></Section>
  <section><Container className="grid grid-cols-2 border-l border-t border-[#303034] lg:grid-cols-4">{[{v:100,s:"+",l:"workflows automated"},{v:50,s:"%",l:"time saved"},{v:3,s:"x",l:"process efficiency"},{v:70,s:"%",l:"less human error"}].map(stat => <Reveal key={stat.l} className="border-b border-r border-[#303034] px-6 py-8"><p className="text-4xl tracking-[-.05em] md:text-5xl"><Counter value={stat.v} suffix={stat.s} /></p><p className="eyebrow mt-4 text-white/35">{stat.l}</p></Reveal>)}</Container></section>

  <Section><Container><SectionHeader align="center" eyebrow="Pricing" title={<>Flexible plans for your<br />automation goals</>} /><Reveal className="mt-14"><Pricing /></Reveal></Container></Section>

  <Section><Container><div className="flex items-end justify-between gap-8"><div><p className="eyebrow inline-flex border border-white/15 bg-white/5 px-3 py-2 text-white/60">Blog</p><h2 className="section-title mt-6">Insights on AI & automation</h2></div><RollingButton variant="outline" href="/blog">See more</RollingButton></div><div className="mt-12 grid gap-8 md:grid-cols-3">{posts.map(post => <Reveal key={post.slug}><ArticleCard post={post} /></Reveal>)}</div></Container></Section>

  <Section><Container><div className="grid gap-14 lg:grid-cols-[.55fr_1fr]"><div className="flex flex-col items-start"><SectionHeader eyebrow="FAQ" title={<>Have questions?<br />Check out the FAQs</>} /><Reveal className="mt-auto pt-16"><MiniCallCard /></Reveal></div><Reveal><Faq /></Reveal></div></Container></Section>
  </> }
