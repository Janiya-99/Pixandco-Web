import { Reveal } from "@/components/motion/reveal"

export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: React.ReactNode; description?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-5xl"}>
      {eyebrow && <p className="eyebrow mb-7 text-white/50">/ {eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {description && <p className={`mt-6 max-w-2xl text-base leading-7 text-white/55 ${align === "center" ? "mx-auto" : ""}`}>{description}</p>}
    </Reveal>
  )
}
