import { Reveal } from "@/components/motion/reveal"
import { ScrambleText } from "@/components/ui/scramble-text"
import { useRef } from "react"
import { useInView } from "motion/react"

export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: React.ReactNode; description?: string; align?: "left" | "center" }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { margin: "-10%" })

  return (
    <Reveal className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-5xl"}>
      {eyebrow && (
        <p ref={ref} className="eyebrow mb-7 inline-flex border-l-2 border-white/50 bg-[#1a1a1d] px-3 py-1.5 text-white/70 uppercase">
          <ScrambleText text={eyebrow} chars=">?/@#$%^&*<-+" delay={0} trigger={isInView} />
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className={`mt-6 max-w-2xl text-base leading-7 text-white/55 ${align === "center" ? "mx-auto" : ""}`}>{description}</p>}
    </Reveal>
  )
}
