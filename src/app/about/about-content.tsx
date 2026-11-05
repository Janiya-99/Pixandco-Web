import Image from "next/image"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/motion/reveal"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { companyOverview } from "@/content/site"
import { CMSPage, HeroBlock, RichTextBlock } from "@/types/cms.types"

const defaultSections = [
  [
    "OUR STORY",
    "Where Pixels Meet Purpose",
    [
      "Pix & Co stands for Pixels and Colours, representing the integration of technology and creativity. Founded on Ashan’s vision, the business brings these capabilities together to develop practical solutions that address real-world business needs."
    ]
  ],
  [
    "OUR EVOLUTION",
    "From Marketing to Business Solutions",
    [
      "Pix & Co began as a marketing agency in the year 2016. Under Ashan’s direction, it has shifted into a B2B business solutions provider, placing greater emphasis on custom business software and websites while continuing to offer branding, social media marketing, and SEO.",
      "This evolution reflects his purpose: to support businesses beyond their marketing needs, helping them improve how they operate, serve their customers, and grow."
    ]
  ],
  [
    "ABOUT THE FOUNDER",
    "Ashan Thilakarathene",
    [
      "Ashan Thilakarathene, 29, is the founder of Pix and Co IT Solutions (Pvt) Ltd. Educated at Royal Institute College and a software graduate of the University of Plymouth, he applies his technical expertise to developing tailored solutions that address business needs and priorities.",
      "Ashan established Pix & Co as his first professional venture, pursuing entrepreneurship from the outset of his career. Built on his vision and direct involvement, his business focuses on understanding client requirements and delivering solutions that support business performance."
    ]
  ],
  [
    "HIS VISION",
    "Supporting Businesses at Every Scale",
    [
      "To enable sustainable business growth through accessible technology, creative expertise, and strategic support for organisations of every scale, from individual entrepreneurs to blue chip companies in Sri Lanka and worldwide."
    ]
  ]
] as const

export function AboutContent({ cmsData }: { cmsData?: CMSPage }) {
  const heroBlock = cmsData?.blocks.find((b) => b.type === "hero" && b.visible) as HeroBlock | undefined
  const richBlocks = cmsData?.blocks.filter((b) => b.type === "richtext" && b.visible) as RichTextBlock[] | undefined

  const heroImage = heroBlock?.mediaUrl || "/images/site/about-1.png"
  const heroBadge = heroBlock?.badge || "ABOUT PIX & CO"
  const heroTitle = heroBlock?.title || "Built in Colombo.\nWorking Worldwide."
  const heroSubtitle = heroBlock?.subtitle || companyOverview

  return (
    <>
      <section className="relative flex min-h-[750px] flex-col justify-end overflow-hidden pb-20 pt-40">
        <Image src={heroImage} alt="" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010004] via-[#010004]/60 to-transparent" />
        <Container className="relative z-10 text-center">
          <p className="eyebrow">{heroBadge}</p>
          <h1 className="display mt-6 whitespace-pre-line">{heroTitle}</h1>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/70">{heroSubtitle}</p>
        </Container>
      </section>

      {richBlocks && richBlocks.length > 0 ? (
        richBlocks.map((blk) => (
          <Section key={blk.id}>
            <Container>
              <Reveal className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[.5fr_1fr]">
                <p className="eyebrow text-white/45">{blk.name}</p>
                <div>
                  <h2 className="section-title">{blk.headline || blk.name}</h2>
                  {blk.content.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx} className="mt-6 text-base leading-8 text-white/55">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </Container>
          </Section>
        ))
      ) : (
        defaultSections.map(([eyebrow, title, paragraphs]) => (
          <Section key={String(title)}>
            <Container>
              <Reveal className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[.5fr_1fr]">
                <p className="eyebrow text-white/45">{eyebrow}</p>
                <div>
                  <h2 className="section-title">{title}</h2>
                  {title === "Ashan Thilakarathene" && (
                    <p className="mt-4 text-white/70">Founder | Pix and Co IT Solutions (Pvt) Ltd</p>
                  )}
                  {paragraphs.map((text) => (
                    <p key={text} className="mt-6 text-base leading-8 text-white/55">
                      {text}
                    </p>
                  ))}
                </div>
              </Reveal>
            </Container>
          </Section>
        ))
      )}

      <FinalCta />
    </>
  )
}
