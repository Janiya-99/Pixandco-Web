"use client"

import Image from "next/image"
import { useRef } from "react"
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
  const cardRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const card = cardRef.current
    if (!card) return

    const imgs = card.querySelectorAll("img")
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Card slides in from right to left as it enters viewport, and reverses smoothly on upward scroll
      gsap.fromTo(
        card,
        {
          x: () => (window.innerWidth < 768 ? 60 : 160),
          opacity: 0.25,
          scale: 0.98,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top 40%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )

      imgs.forEach((img) => {
        const targetOpacity = img.classList.contains("opacity-65") ? 0.65 : 1
        gsap.fromTo(
          img,
          { opacity: 0.25, scale: 1.08 },
          {
            opacity: targetOpacity,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 40%",
              scrub: 1,
            },
          }
        )
      })
    })

    const enter = () => {
      gsap.to(card, {
        borderColor: "rgba(255, 255, 255, 0.18)",
        backgroundColor: "#1c1c20",
        duration: 0.35,
        ease: "power2.out",
      })
      gsap.to(imgs, { scale: 1.04, duration: 0.7, ease: "power2.out" })
    }

    const leave = () => {
      gsap.to(card, {
        borderColor: "#2b2b2f",
        backgroundColor: "#161619",
        duration: 0.35,
        ease: "power2.out",
      })
      gsap.to(imgs, { scale: 1, duration: 0.7, ease: "power2.out" })
    }

    card.addEventListener("mouseenter", enter)
    card.addEventListener("mouseleave", leave)

    return () => {
      card.removeEventListener("mouseenter", enter)
      card.removeEventListener("mouseleave", leave)
      media.revert()
    }
  }, { scope: cardRef })

  return (
    <article
      ref={cardRef}
      data-service-card
      className="relative overflow-hidden rounded-[10px] border border-[#2b2b2f] bg-[#161619] transition-colors will-change-transform"
      style={{ zIndex: index + 1 }}
    >
      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-7">
          <p className="eyebrow text-white/30 font-mono text-[11px] tracking-[0.2em]">/ {service.number}</p>
          <h3 className="mt-4 text-2xl font-medium tracking-[-.04em] text-white font-primary">
            <HyperText text={service.title} className="whitespace-normal" />
          </h3>
          <p className="mt-3 text-[14px] leading-[1.6] text-white/50 font-secondary">
            {service.description}
          </p>
        </div>
        <div className="relative min-h-52 overflow-hidden bg-[#111113]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 35vw, 90vw"
            className="cinematic-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 border-t border-white/5">
        <ul className="p-6 md:p-7 font-mono text-[10px] uppercase tracking-[.08em] text-white/45">
          {service.items.map((item) => (
            <li key={item} className="border-b border-white/10 py-3 last:border-0">
              {item}
            </li>
          ))}
        </ul>
        <div className="relative hidden min-h-40 md:block overflow-hidden bg-[#111113]">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="35vw"
            className="cinematic-image object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </article>
  )
}

export function ServicesSection() {
  return (
    <Section id="solutions" className="overflow-x-clip py-20 lg:py-28">
      <Container className="max-w-[1240px]">
        {/* .framer-1kdw1pm: flex-direction row, gap 80px, width 1240px */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[80px] w-full relative">
          {/* .framer-11b8i51: sticky left sidebar, width 416px, gap 24px */}
          <div className="w-full lg:w-[416px] lg:shrink-0 lg:sticky lg:top-28 self-start flex flex-col gap-6">
            <div>
              <AnimatedEyebrow text="OUR SOLUTIONS" />
            </div>
            <h2 className="section-title tracking-[-.04em] font-primary">
              Solutions That Support
              <br />
              the Whole Business
            </h2>
            <p className="max-w-sm text-[15px] leading-[1.65] text-white/50 font-secondary">
              We solve operational and growth problems through software, digital platforms, brand systems, and measurable marketing.
            </p>
          </div>

          {/* .framer-7u50ce: cards container, width 60%, flex-col, row-gap 24px */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6 min-w-0">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
