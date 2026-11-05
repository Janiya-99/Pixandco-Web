import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"
import { companyOverview } from "@/content/site"
import { RollingButton } from "@/components/ui/rolling-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Testimonials, Pricing, Faq } from "./interactive-sections"
import { TrustedCompaniesSection } from "./trusted-companies-section"
import { ConcentricScrollSection } from "./concentric-scroll-section"
import { PinnedProjects } from "./pinned-projects"
import { IntegrationSection } from "./integration-section"
import { ServicesSection } from "./services-section"
import { WhyUsSection } from "./why-us-section"
import { FaqBlock, StatsBlock, ShowcaseBlock, ProcessBlock, FeaturesBlock } from "@/types/cms.types"

function TrustSection() {
  return <Section><Container><SectionHeader align="center" eyebrow="COMPANY OVERVIEW" title="Built in Colombo. Working Worldwide." description={companyOverview} /><p className="mx-auto mt-6 max-w-3xl text-center text-white/50">With more than ten years of experience and clients worldwide, we work with businesses at every stage and scale - from blue-chip organisations and established B2B companies to entrepreneurs and single-owner businesses ready to build, improve, or grow.</p></Container></Section>
}

function parseStat(item: { value: string | number; label: string; id?: string }) {
  if (typeof item.value === "number") {
    return { num: item.value, suffix: "", label: item.label }
  }
  const str = String(item.value || "").trim()
  const match = str.match(/^(\d+)(.*)$/)
  if (match && match[1]) {
    return {
      num: parseInt(match[1], 10),
      suffix: match[2]?.trim() || "",
      label: item.label,
    }
  }
  return {
    num: null,
    raw: str,
    suffix: "",
    label: item.label,
  }
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

interface HomeSectionsProps {
  faqData?: FaqBlock
  statsData?: StatsBlock
  showcaseData?: ShowcaseBlock
  processData?: ProcessBlock
  featuresData?: FeaturesBlock
}

export function HomeSections({
  faqData,
  statsData,
  showcaseData,
  processData,
  featuresData,
}: HomeSectionsProps) {
  return (
    <>
      <TrustedCompaniesSection />

      <TrustSection />

      <ConcentricScrollSection />

      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow={showcaseData?.eyebrow || "OUR WORKS"}
            title={showcaseData?.heading ? showcaseData.heading : (<>Solutions Built Around<br />Business Outcomes</>)}
            description={showcaseData?.subheading || "Selected software, website, brand, and digital growth solutions developed for businesses of different sizes and sectors."}
          />
          <PinnedProjects showcaseData={showcaseData} />
          <Reveal className="mt-16 flex justify-center">
            <RollingButton href="/projects">View All Case Studies</RollingButton>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow={processData?.eyebrow || "HOW WE WORK"}
            title={processData?.heading ? processData.heading : (<>A Clear Process From<br />Problem to Solution</>)}
            description={processData?.subheading || "We understand the requirement, build the right solution, and improve it as the business grows."}
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3 pb-16">
            {(processData?.steps && processData.steps.length > 0
              ? processData.steps.map((s) => ({
                  n: s.number,
                  t: s.title,
                  d: s.description,
                  img: s.image,
                }))
              : [
                  {
                    n: "1",
                    t: "Understand the Business",
                    d: "We review your operations, customers, current systems, challenges, and business objectives.",
                    img: "/images/site/uzBphIDqI0PbwOqso2AzaFeAw884f21.png",
                  },
                  {
                    n: "2",
                    t: "Design and Develop",
                    d: "We plan and build a practical solution around your actual processes and commercial requirements.",
                    img: "/images/site/Ur5L7stgzjVpLuLg9LTa7PP3W7g4f21.png",
                  },
                  {
                    n: "3",
                    t: "Launch and Improve",
                    d: "We launch, monitor, support, and improve the solution based on performance and business growth.",
                    img: "/images/site/weOlvtCQtvQqEObp7dFtnwJImcY4f21.png",
                  },
                ]
            ).map((step, i) => (
              <StepCard key={step.n || i} step={step} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <IntegrationSection />

      <ServicesSection featuresData={featuresData} />

      <WhyUsSection />

      <Section>
        <Container>
          <Testimonials />

          {/* Stats Counters */}
          <div className="mt-14 grid grid-cols-2 border-l border-t border-[#212121] lg:grid-cols-4 md:mt-20">
            {(statsData?.stats && statsData.stats.length > 0
              ? statsData.stats
              : [
                  { id: "s_1", value: "10+", label: "WORKFLOWS AUTOMATED" },
                  { id: "s_2", value: "60%", label: "TIME SAVED" },
                  { id: "s_3", value: "4x", label: "PROCESS EFFICIENCY" },
                  { id: "s_4", value: "90%", label: "LESS HUMAN ERROR" },
                ]
            ).map((item, idx) => {
              const stat = parseStat(item)
              return (
                <Reveal
                  key={item.id || item.label || idx}
                  className="flex items-baseline gap-3 border-b border-r border-[#212121] px-6 py-7 md:py-9 lg:px-8"
                >
                  <p className="text-5xl font-normal leading-none tracking-[-.04em] text-white md:text-[3.5rem] lg:text-[4rem]">
                    {stat.num !== null ? <Counter value={stat.num} /> : stat.raw}
                  </p>
                  <div className="flex flex-col">
                    {stat.suffix ? (
                      <span className="text-lg font-normal leading-none text-white/90 md:text-xl">
                        {stat.suffix}
                      </span>
                    ) : null}
                    <span className="eyebrow mt-2 max-w-[110px] font-mono text-[9px] leading-[1.3] tracking-[0.2em] text-white/40 uppercase md:text-[10px]">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Pricing />

      {/* FAQ Section */}
      <Section id="faqs">
        <Container className="max-w-[920px]">
          <SectionHeader
            align="center"
            eyebrow="QUESTIONS"
            title={faqData?.heading || "Frequently Asked Questions"}
            description={faqData?.subheading || "Straightforward answers about our process, technology, and timelines."}
          />
          <div className="mt-16">
            <Faq />
          </div>
        </Container>
      </Section>
    </>
  )
}
