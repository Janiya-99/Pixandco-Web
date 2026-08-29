"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PinnedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    const mm = gsap.matchMedia();

    // Desktop animations (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        const image = card.querySelector(".project-image");
        const content = card.querySelector(".project-content");
        
        // Image fade-in and scale down (large to normal) as card enters
        gsap.fromTo(image, 
          { opacity: 0, scale: 1.1 },
          {
            opacity: 1, 
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          }
        );

        // When next card overlaps: current image fades to opacity 0.2, content to 0.4
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          
          gsap.to(image, {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom-=100",
              end: "top top+=120", // Roughly 12vh
              scrub: true,
            }
          });
          
          gsap.to(content, {
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom-=100",
              end: "top top+=120",
              scrub: true,
            }
          });
        }
      });
    });

    // Mobile animations (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        const image = card.querySelector(".project-image");
        
        // Simple fade-in without scroll scrub and without overlapping logic
        gsap.fromTo(image, 
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, 
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          }
        );
      });
    });

    // Hover effects (apply generally)
    cards.forEach((card) => {
      const image = card.querySelector(".project-image");
      
      card.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.05, duration: 0.8, ease: "power2.out", overwrite: "auto" })
        gsap.to(card, { borderColor: "rgba(255,255,255,0.15)", duration: 0.3 })
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" })
        gsap.to(card, { borderColor: "#303034", duration: 0.3 })
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mt-16 relative">
      <div className="space-y-12 md:space-y-20 lg:space-y-24 pb-24"> 
        {projects.map((project, index) => (
          <article 
            key={project.slug} 
            className="project-card relative md:sticky top-[12vh] grid overflow-hidden rounded-[9px] border border-[#303034] bg-[#1a1a1d] md:grid-cols-2"
            style={{ 
              zIndex: index + 10,
              boxShadow: "0 -20px 40px rgba(0,0,0,0.5)"
            }}
          >
            <div className="relative min-h-72 md:min-h-[420px] overflow-hidden">
              <Image 
                src={project.coverImage} 
                alt={`${project.title} project`} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="project-image cinematic-image object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
            </div>
            <div className="project-content flex flex-col p-6 md:p-8">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="eyebrow text-white/50 font-mono">{project.year}</span>
                <span className="text-white/20">•</span>
                <span className="eyebrow text-white/50 font-mono">{project.industry}</span>
              </div>
              <p className="mt-5 text-xl text-white/50 font-secondary">{project.title}</p>
              <h3 className="mt-7 text-3xl leading-[1.05] tracking-[-.05em] font-primary">{project.summary}</h3>
              <Link href={`/projects/${project.slug}`} className="focus-ring mt-6 inline-flex min-h-10 w-fit items-center gap-5 rounded-[6px] bg-white/10 px-4 text-xs font-medium transition-colors hover:bg-white/20">
                View case study <ArrowRight className="size-3.5" />
              </Link>
              <div className="mt-auto grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                {project.metrics.slice(0,2).map(metric => (
                  <div key={metric.label}>
                    <p className="text-3xl tracking-[-.04em]">{metric.value}</p>
                    <p className="eyebrow mt-3 text-white/35 font-mono">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
