import { Container } from "@/components/layout/container"
import { TextReveal } from "@/components/motion/text-reveal"

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="border-b border-white/10 pb-20 pt-40 md:pb-28 md:pt-48"><Container><p className="eyebrow mb-10 text-white/45">/ {eyebrow}</p><TextReveal className="display max-w-6xl" lines={[title]} /><div className="mt-14 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-2"><p className="eyebrow text-white/35">The brief</p><p className="max-w-xl text-base leading-7 text-white/60 md:text-lg">{intro}</p></div></Container></section>
}
