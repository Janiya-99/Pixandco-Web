import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { PageHero } from "@/components/sections/shared/page-hero"
import { insightTopics } from "@/content/site"

export const metadata: Metadata = { title: "Insights", description: "Practical insights for growing businesses: business software, digital transformation, website strategy, brand development, B2B marketing, SEO and lead generation." }

export default function BlogPage() {
  return <><PageHero eyebrow="INSIGHTS" title="Practical Insights for Growing Businesses" intro="Business Software · Digital Transformation · Website Strategy · Brand Development · B2B Marketing · SEO and Lead Generation" /><Section><Container><div className="grid gap-6 md:grid-cols-3">{insightTopics.map(topic => <article key={topic} className="rounded-lg border border-white/10 p-8"><h2 className="text-2xl">{topic}</h2><p className="mt-4 text-sm text-white/50">Insights will be published here.</p></article>)}</div></Container></Section><FinalCta /></>
}
