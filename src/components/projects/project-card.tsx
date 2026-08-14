"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "@/types/project"

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group grid overflow-hidden rounded-[16px] border border-white/5 bg-[#141416] md:grid-cols-[40%_60%]"
    >
      {/* Left: Image */}
      <div className="relative min-h-[300px] w-full overflow-hidden md:min-h-[100%]">
        <Image 
          src={project.coverImage} 
          alt={project.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 40vw" 
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority={priority}
        />
      </div>

      {/* Right: Content */}
      <div className="flex flex-col p-8 md:p-14">
        {/* Year & Industry */}
        <div className="flex items-center gap-2">
          <span className="eyebrow text-[10px] uppercase tracking-widest text-white/40">{project.year}</span>
          <span className="text-white/20">•</span>
          <span className="eyebrow text-[10px] uppercase tracking-widest text-white/40">{project.industry}</span>
        </div>

        {/* Project Title (Serif) */}
        <h2 className="mt-8 font-serif text-xl uppercase tracking-[0.15em] text-white/80">
          {project.title}
        </h2>

        {/* Project Summary (Large) */}
        <h3 className="mt-6 text-3xl font-medium leading-[1.25] tracking-[-.02em] text-white/95 md:text-4xl">
          {project.summary}
        </h3>

        {/* Project Description */}
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/50">
          {project.challenge}
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-3 rounded-[6px] border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[.1em] text-white transition-colors hover:bg-white/10">
            View Case Study <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-10 h-[1px] w-full bg-white/5" />

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          {project.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <p className="text-4xl font-medium tracking-[-.02em] text-white md:text-[40px]">{metric.value}</p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[.1em] text-white/40">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
