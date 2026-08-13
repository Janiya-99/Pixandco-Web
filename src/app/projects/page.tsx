import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ProjectCard } from "@/components/projects/project-card"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { PageHero } from "@/components/sections/shared/page-hero"
import { projects } from "@/content/projects"

export const metadata: Metadata = { title: "Projects", description: "Selected intelligent systems and workflow automation work by Northline Systems." }

export default function ProjectsPage() { return <><PageHero eyebrow="Selected projects" title="WORK THAT MOVES THE WORK FORWARD." intro="A selection of connected systems designed around real operational constraints, human judgment, and measurable change." /><Section><Container><div className="grid gap-x-10 gap-y-24 md:grid-cols-2">{projects.map((project, index) => <div key={project.slug} className={index % 2 ? "md:mt-32" : ""}><ProjectCard project={project} priority={index === 0} /></div>)}</div></Container></Section><FinalCta /></> }
