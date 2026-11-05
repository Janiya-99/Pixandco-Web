import { getStoredPageBySlug } from "@/lib/server-cms"
import { HeroSection } from "@/components/sections/home/hero-section"
import { HomeSections } from "@/components/sections/home/home-sections"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { HeroBlock, FaqBlock, StatsBlock, ShowcaseBlock, ProcessBlock, FeaturesBlock } from "@/types/cms.types"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const homeData = await getStoredPageBySlug("home")

  const heroBlock = homeData?.blocks.find((b) => b.type === "hero" && b.visible) as HeroBlock | undefined
  const showcaseBlock = homeData?.blocks.find((b) => b.type === "showcase" && b.visible) as ShowcaseBlock | undefined
  const processBlock = homeData?.blocks.find((b) => b.type === "process" && b.visible) as ProcessBlock | undefined
  const featuresBlock = homeData?.blocks.find((b) => b.type === "features" && b.visible) as FeaturesBlock | undefined
  const statsBlock = homeData?.blocks.find((b) => b.type === "stats" && b.visible) as StatsBlock | undefined
  const faqBlock = homeData?.blocks.find((b) => b.type === "faq" && b.visible) as FaqBlock | undefined

  return (
    <>
      <HeroSection heroData={heroBlock} />
      <HomeSections
        faqData={faqBlock}
        statsData={statsBlock}
        showcaseData={showcaseBlock}
        processData={processBlock}
        featuresData={featuresBlock}
      />
      <FinalCta />
    </>
  )
}
