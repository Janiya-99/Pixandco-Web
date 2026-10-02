import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"
import { companyOverview, insightTopics } from "@/content/site"
import { RollingButton } from "@/components/ui/rolling-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Testimonials, Pricing, Faq } from "./interactive-sections"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"
import { TrustedCompaniesSection } from "./trusted-companies-section"
import { ConcentricScrollSection } from "./concentric-scroll-section"
import { PinnedProjects } from "./pinned-projects"
import { IntegrationSection } from "./integration-section"
import { ServicesSection } from "./services-section"
import { WhyUsSection } from "./why-us-section"

function MiniCallCard() {
  return (
    <div className="inline-flex items-center gap-3 rounded-[9px] border border-white/15 bg-[#1a1a1d] p-2">
      <video src="/videos/girl.mp4" autoPlay muted loop playsInline preload="none" aria-hidden="true" className="h-24 w-20 shrink-0 rounded-[4px] bg-[#27272b] object-cover" />
      <div className="min-w-44">
        <p className="text-sm">Talk with Pix &amp; Co</p>
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
  return (
    <Reveal className={`${index === 1 ? 'md:mt-10' : index === 2 ? 'md:mt-20' : ''}`}>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[12px] border border-[#2b2b2f] bg-[#1a1a1d] transition-[border-color] duration-300 hover:border-white/15">
        <Image src={step.img} alt="" fill sizes="(min-width: 1200px) calc(max((min(100vw - 40px, 1240px) - 48px) / 3, 1px) + 0.5px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(100vw - 40px, 1240px) - 48px) / 3, 1px) + 0.5px), (max-width: 809.98px) calc(min(100vw - 40px, 1240px) + 0.5px)" className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010004]/90 via-[#010004]/45 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
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
    <TrustedCompaniesSection />

    <TrustSection />

    <ConcentricScrollSection />

    <Section><Container><SectionHeader align="center" eyebrow="OUR WORKS" title={<>Solutions Built Around<br />Business Outcomes</>} description="Selected software, website, brand, and digital growth solutions developed for businesses of different sizes and sectors." /><PinnedProjects /><Reveal className="mt-16 flex justify-center"><RollingButton href="/projects">View All Case Studies</RollingButton></Reveal></Container></Section>

    <Section><Container><SectionHeader align="center" eyebrow="HOW WE WORK" title={<>A Clear Process From<br />Problem to Solution</>} description="We understand the requirement, build the right solution, and improve it as the business grows." /><div className="mt-16 grid gap-6 md:grid-cols-3 pb-16">{[{ n: "1", t: "Understand the Business", d: "We review your operations, customers, current systems, challenges, and business objectives.", img: "/images/site/uzBphIDqI0PbwOqso2AzaFeAw884f21.png" }, { n: "2", t: "Design and Develop", d: "We plan and build a practical solution around your actual processes and commercial requirements.", img: "/images/site/Ur5L7stgzjVpLuLg9LTa7PP3W7g4f21.png" }, { n: "3", t: "Launch and Improve", d: "We launch, monitor, support, and improve the solution based on performance and business growth.", img: "/images/site/weOlvtCQtvQqEObp7dFtnwJImcY4f21.png" }].map((step, i) => <StepCard key={step.n} step={step} index={i} />)}</div></Container></Section>

    <IntegrationSection />

    <ServicesSection />

    <WhyUsSection />

    <Section>
      <Container>
        <Testimonials />
        <div className="mt-14 grid grid-cols-2 border-l border-t border-[#212121] lg:grid-cols-4 md:mt-20">
          {[
            { value: 10, suffix: "+", label: "WORKFLOWS AUTOMATED" },
            { value: 60, suffix: "%", label: "TIME SAVED" },
            { value: 4, suffix: "x", label: "PROCESS EFFICIENCY" },
            { value: 90, suffix: "%", label: "LESS HUMAN ERROR" },
          ].map((stat) => (
            <Reveal
              key={stat.label}
              className="flex items-baseline gap-3 border-b border-r border-[#212121] px-6 py-7 md:py-9 lg:px-8"
            >
              <p className="text-5xl font-normal leading-none tracking-[-.04em] text-white md:text-[3.5rem] lg:text-[4rem]">
                <Counter value={stat.value} />
              </p>
              <div className="flex flex-col">
                <span className="text-lg font-normal leading-none text-white/90 md:text-xl">
                  {stat.suffix}
                </span>
                <span className="eyebrow mt-2 max-w-[110px] font-mono text-[9px] leading-[1.3] tracking-[0.2em] text-white/40 uppercase md:text-[10px]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>

    <Section><Container><SectionHeader align="center" eyebrow="WORK WITH PIX & CO" title={<>Flexible Ways to<br />Build and Grow</>} /><Reveal className="mt-14"><Pricing /></Reveal></Container></Section>

    <Section><Container><div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><AnimatedEyebrow text="INSIGHTS" /><h2 className="section-title mt-6 tracking-[-.04em]">Practical Insights for Growing Businesses</h2></div><RollingButton variant="outline" href="/blog">View All Insights</RollingButton></div><div className="mt-12 grid gap-8 md:grid-cols-3">{insightTopics.map(topic => <Reveal key={topic} className="rounded-lg border border-white/10 p-6"><h3 className="text-xl">{topic}</h3></Reveal>)}</div></Container></Section>

    <Section><Container><div className="grid gap-14 lg:grid-cols-[.55fr_1fr]"><div className="flex flex-col items-start"><SectionHeader eyebrow="FAQ" title={<>Common Questions About<br />Working With Pix & Co</>} /><Reveal className="mt-auto pt-16"><MiniCallCard /></Reveal></div><Reveal><Faq /></Reveal></div></Container></Section>
  </>
}
