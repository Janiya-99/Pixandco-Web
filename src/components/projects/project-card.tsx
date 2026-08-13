import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/types/project"
import { ImageReveal } from "@/components/motion/image-reveal"

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <article className="image-hover group border-t border-white/10 pt-5">
    <div className="mb-5 flex justify-between text-[10px] uppercase tracking-[.14em] text-white/40"><span>{project.year} / {project.industry}</span><span>{project.services[0]}</span></div>
    <Link href={`/projects/${project.slug}`} className="focus-ring block"><ImageReveal className="relative aspect-[4/3] overflow-hidden bg-white/5"><Image className="cinematic-image object-cover transition duration-700 ease-[cubic-bezier(.22,1,.36,1)]" src={project.coverImage} alt={`${project.title} project`} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} /></ImageReveal>
      <div className="grid gap-5 py-7 md:grid-cols-[1fr_auto]"><div><h3 className="text-3xl tracking-[-.04em] md:text-4xl">{project.title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-white/50">{project.summary}</p></div><ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" /></div>
    </Link>
  </article>
}
