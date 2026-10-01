"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { services } from "@/content/site"

const selectedWorks = [services[0], services[1], services[2], services[4]] as const

export function PinnedProjects() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mt-14 pb-24">
      <div className="space-y-12 md:space-y-20">
        {selectedWorks.map((work, index) => (
          <motion.article
            key={work.number}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 48 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={reduceMotion ? { duration: 0 } : {
              scale: { type: "spring", stiffness: 100, damping: 24, mass: 1 },
              y: { type: "spring", stiffness: 100, damping: 26, mass: 1 },
              opacity: { duration: 0.4, ease: [0.44, 0, 0.56, 1] },
            }}
            className="group overflow-hidden rounded-[10px] border border-[#303034] bg-[#17171a] shadow-[0_-20px_45px_rgba(0,0,0,.55)] md:sticky md:top-20 md:grid md:min-h-[500px] md:grid-cols-[.95fr_1.05fr] md:will-change-transform"
            style={{ zIndex: index + 10 }}
          >
            <div className="relative min-h-72 overflow-hidden md:min-h-full">
              <Image
                src={work.image}
                alt={`${work.title} solution showcase`}
                fill
                sizes="(max-width: 767px) 100vw, 48vw"
                className="cinematic-image object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-2 border-b border-white/10 pb-5 font-mono text-[12px] font-medium uppercase tracking-[.08em] text-white/45">
                <span>/ {String(index + 1).padStart(2, "0")}</span>
                <span className="text-white/20">•</span>
                <span>Solution showcase</span>
              </div>

              <h3 className="mt-7 text-3xl leading-[1.05] tracking-[-.05em] md:text-4xl">
                {work.title}
              </h3>
              <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/50">
                {work.description}
              </p>

              <ul className="mt-8 grid gap-x-6 border-t border-white/10 sm:grid-cols-2">
                {work.items.slice(0, 4).map((item) => (
                  <li key={item} className="border-b border-white/10 py-4 font-mono text-[10px] uppercase tracking-[.08em] text-white/45">
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="focus-ring mt-10 inline-flex min-h-11 w-fit items-center gap-6 rounded-[6px] bg-white/10 px-4 text-xs font-medium transition-colors hover:bg-white/20 md:mt-auto"
              >
                Discuss a similar project
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
