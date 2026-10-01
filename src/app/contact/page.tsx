import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHero } from "@/components/sections/shared/page-hero"
import { ContactForm } from "@/components/sections/shared/contact-form"

export const metadata: Metadata = { title: "Contact", description: "Discuss your software, website, branding, social media, or SEO project with Pix & Co." }

export default function ContactPage() { return <><PageHero eyebrow="Start a conversation" title="Discuss Your Project" intro="Tell us what is slowing your business down. We will help you define, build, and implement the right solution." /><Section><Container><div className="grid gap-16 lg:grid-cols-[.35fr_1fr]"><aside><p className="eyebrow text-white/35">/ Direct</p><a href="mailto:marketing@pixandco.lk" className="focus-ring mt-6 block text-lg">marketing@pixandco.lk</a><a href="tel:+94719980916" className="focus-ring mt-4 block text-lg">071 998 0916</a><p className="mt-3 text-sm text-white/45">Battaramulla · Working worldwide</p><div className="mt-12 border-t border-white/10 pt-6"><p className="text-sm leading-6 text-white/50">Begin with a consultation. We will review your business requirements, identify the main challenges, and recommend the most suitable solution.</p></div></aside><ContactForm /></div></Container></Section></> }
