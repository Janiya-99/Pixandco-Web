import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHero } from "@/components/sections/shared/page-hero"
import { ContactForm } from "@/components/sections/shared/contact-form"

export const metadata: Metadata = { title: "Contact", description: "Tell Northline what should work better. Start a focused AI systems or automation project." }

export default function ContactPage() { return <><PageHero eyebrow="Start a conversation" title="WHAT SHOULD WORK BETTER?" intro="Bring us the process that feels heavier than it should, the AI idea that needs operational clarity, or the system your team has outgrown." /><Section><Container><div className="grid gap-16 lg:grid-cols-[.35fr_1fr]"><aside><p className="eyebrow text-white/35">/ Direct</p><a href="mailto:hello@northline.studio" className="focus-ring mt-6 block text-lg">hello@northline.studio</a><p className="mt-3 text-sm text-white/45">Colombo · Working globally</p><div className="mt-12 border-t border-white/10 pt-6"><p className="text-sm leading-6 text-white/50">We reply within two working days. A first conversation is 30 minutes and focused on the constraint—not a sales presentation.</p></div></aside><ContactForm /></div></Container></Section></> }
