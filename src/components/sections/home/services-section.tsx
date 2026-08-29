"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HyperText } from "@/components/ui/hyper-text"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"
import { services } from "@/content/site"

gsap.registerPlugin(useGSAP, ScrollTrigger)

function ServiceCard({ service, index }: { service: (typeof services)[number], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    const imgs = cardRef.current.querySelectorAll('img')
    
    imgs.forEach((img) => {
      const targetOpacity = img.classList.contains('opacity-65') ? 0.65 : 1;
      gsap.fromTo(img, 
        { opacity: 0, scale: 1.1 },
        {
          opacity: targetOpacity, 
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    });

    cardRef.current.addEventListener('mouseenter', () => {
      gsap.to(cardRef.current, { scale: 1.02, borderColor: "rgba(255,255,255,0.15)", backgroundColor: "#1a1a1d", duration: 0.4, ease: "power2.out" })
      gsap.to(imgs, { scale: 1.05, duration: 1, ease: "power2.out" })
    })
    
    cardRef.current.addEventListener('mouseleave', () => {
      gsap.to(cardRef.current, { scale: 1, borderColor: "#2b2b2f", backgroundColor: "#17171a", duration: 0.4, ease: "power2.out" })
      gsap.to(imgs, { scale: 1, duration: 1, ease: "power2.out" })
    })
  }, { scope: cardRef })

  return (
    <motion.article 
      ref={cardRef}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0, duration: 1, delay: index * 0.1 }}
      className="overflow-hidden rounded-[9px] border border-[#2b2b2f] bg-[#17171a]"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-6">
          <p className="eyebrow text-white/30 font-mono">/ {service.number}</p>
          <h3 className="mt-5 text-2xl tracking-[-.04em] font-primary"><HyperText text={service.title} /></h3>
          <p className="mt-3 text-sm text-white/40 font-secondary">{service.description}</p>
        </div>
        <div className="relative min-h-52 overflow-hidden">
          <Image src={service.image} alt="" fill sizes="40vw" className="cinematic-image object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
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
        <div className="relative hidden min-h-40 md:block overflow-hidden">
          <Image src={service.image} alt="" fill sizes="40vw" className="cinematic-image object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.article>
  )
}

export function ServicesSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatedEyebrow text="SERVICES" />
            <h2 className="section-title mt-6 tracking-[-.04em] font-primary">
              Built to Simplify
              <br />
              Operations
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.6] text-white/50 font-secondary">
              We design intelligent systems that streamline workflows, strengthen revenue processes, and connect your tools into one cohesive ecosystem.
            </p>
          </div>
          <div className="space-y-7">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
