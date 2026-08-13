import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ProjectCard } from "@/components/projects/project-card"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { ImageReveal } from "@/components/motion/image-reveal"
import { projects } from "@/content/projects"

type ProjectPageProps = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })) }
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> { const { slug } = await params; const project = projects.find(item => item.slug === slug); return project ? { title: project.title, description: project.summary, openGraph: { images: [project.coverImage] } } : {} }

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find(item => item.slug === slug)
  if (!project) notFound()
  const related = projects.filter(item => item.slug !== project.slug).slice(0, 2)
  return <><article><header className="pb-16 pt-40 md:pb-24 md:pt-48"><Container><p className="eyebrow text-white/40">/ {project.industry} · {project.year}</p><h1 className="display mt-10 max-w-6xl">{project.title.toUpperCase()}</h1><div className="mt-14 grid gap-8 border-t border-white/10 pt-7 md:grid-cols-2"><p className="eyebrow text-white/35">The system</p><p className="max-w-2xl text-lg leading-8 text-white/60">{project.summary}</p></div></Container></header><Container><ImageReveal className="relative aspect-[16/9] overflow-hidden"><Image src={project.coverImage} alt={`${project.title} case study`} fill priority sizes="100vw" className="cinematic-image object-cover" /></ImageReveal><div className="grid gap-8 border-b border-white/10 py-8 sm:grid-cols-3"><div><p className="eyebrow text-white/30">Year</p><p className="mt-3 text-sm">{project.year}</p></div><div><p className="eyebrow text-white/30">Industry</p><p className="mt-3 text-sm">{project.industry}</p></div><div><p className="eyebrow text-white/30">Services</p><p className="mt-3 text-sm">{project.services.join(" · ")}</p></div></div></Container><Section><Container className="max-w-[1180px]"><div className="space-y-28">{[{label:"The challenge",title:"Complexity was consuming the team's capacity.",body:project.challenge},{label:"Our approach",title:"Build clarity around the decision, then automate.",body:project.approach},{label:"The result",title:"A system that becomes part of how the team thinks.",body:project.result}].map(block => <section key={block.label} className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[.4fr_1fr]"><p className="eyebrow text-white/35">/ {block.label}</p><div><h2 className="text-3xl leading-tight tracking-[-.04em] md:text-5xl">{block.title}</h2><p className="mt-8 max-w-2xl text-base leading-8 text-white/55">{block.body}</p></div></section>)}</div><div className="mt-28 grid gap-10 border-y border-white/10 py-12 sm:grid-cols-3">{project.metrics.map(metric => <div key={metric.label}><p className="text-5xl tracking-[-.05em]">{metric.value}</p><p className="eyebrow mt-4 text-white/35">{metric.label}</p></div>)}</div></Container></Section></article><Section className="bg-[#080808]"><Container><p className="eyebrow mb-12 text-white/35">/ Related work</p><div className="grid gap-10 md:grid-cols-2">{related.map(item => <ProjectCard key={item.slug} project={item} />)}</div></Container></Section><FinalCta /></>
}
