"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextReveal } from "@/components/motion/text-reveal"
import { ScrambleText } from "@/components/ui/scramble-text"
import { services } from "@/content/site"

export function ServicesSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow inline-flex border border-white/15 bg-white/5 px-3 py-2 text-white/60">
              Services
            </p>
            <TextReveal 
              className="section-title mt-6" 
              lines={["Built to simplify", "operations"]} 
            />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              We design intelligent systems that streamline workflows, strengthen revenue processes, and connect your tools into one cohesive ecosystem.
            </p>
          </div>
          <div className="space-y-7">
            {services.map((service, index) => (
              <motion.article 
                key={service.number} 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="overflow-hidden rounded-[9px] border border-[#2b2b2f] bg-[#17171a]"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-6">
                    <p className="eyebrow text-white/30">/ {service.number}</p>
                    <h3 className="mt-5 text-2xl tracking-[-.04em]"><ScrambleText text={service.title} /></h3>
                    <p className="mt-3 text-sm text-white/40">{service.description}</p>
                  </div>
                  <div className="relative min-h-52">
                    <Image src={service.image} alt="" fill sizes="40vw" className="cinematic-image object-cover" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2">
                  <ul className="p-6 font-mono text-[10px] uppercase tracking-[.08em] text-white/45">
                    {service.items.map((item) => (
                      <li key={item} className="border-b border-white/10 py-3 last:border-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="relative hidden min-h-40 md:block">
                    <Image src={service.image} alt="" fill sizes="40vw" className="cinematic-image object-cover opacity-65" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
