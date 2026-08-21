import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ProjectCard } from "@/components/projects/project-card"
import { FinalCta } from "@/components/sections/shared/final-cta"
import Image from "next/image"
import { projects } from "@/content/projects"

export const metadata: Metadata = { title: "Projects", description: "Selected intelligent systems and workflow automation work by PIXANDCO Systems." }

export default function ProjectsPage() { 
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden pt-32 pb-24 text-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/site/KmimP8fJf3KTg25QrfWgNhSOI4e64.jpg" alt="Projects Background" fill priority className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010004]/50 via-[#010004]/80 to-[#010004]" />
        </div>
        <Container className="relative z-10 flex flex-col items-center">
          <p className="mb-6 inline-flex rounded-[4px] bg-[#2a2a2a] px-3 py-1.5 text-[10px] font-medium text-white/80 uppercase tracking-widest">
            PROJECTS
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-[-.02em] md:text-[56px] md:leading-[1.1]">
            The Minds Behind the Automation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] text-white/70">
            Ideas, strategies, and practical guides to help businesses streamline operations and grow with AI.
          </p>
        </Container>
      </section>
      <Section className="relative z-20 -mt-32 pb-32">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index === 0} />
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  )
}
