import { Reveal } from "@/components/motion/reveal"
import { AnimatedEyebrow } from "@/components/ui/animated-eyebrow"

export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: React.ReactNode; description?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-5xl"}>
      {eyebrow && <AnimatedEyebrow text={eyebrow} />}
      <h2 className="section-title">{title}</h2>
      {description && <p className={`mt-6 max-w-2xl text-base leading-7 text-white/55 ${align === "center" ? "mx-auto" : ""}`}>{description}</p>}
    </Reveal>
  )
}
