import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { RollingLink } from "@/components/ui/rolling-link"
import { AmbientVideo } from "@/components/media/ambient-video"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
  { label: "404", href: "/404" },
] as const

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#010004] pb-8 pt-16 lg:pt-[100px]">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.05fr_.55fr_.85fr] lg:gap-20">
          <div>
            <Link className="focus-ring inline-flex items-center gap-3" href="/">
              <span className="grid size-8 place-items-center border border-white/60 text-[11px] font-semibold">N</span>
              <span className="text-xl font-medium tracking-[-.03em]">northline</span>
            </Link>
            <h2 className="mt-9 max-w-md text-[clamp(2.5rem,4vw,3.5rem)] leading-[.98] tracking-[-.06em]">Clear. Precise.<br />Automated.</h2>
            <AmbientVideo
              src="/videos/footer-system.mp4"
              poster="/images/video-posters/footer-system.webp"
              alt="Floating reflective modular system"
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="mt-12 aspect-square w-full max-w-[340px]"
              mediaClassName="object-cover brightness-[.82] contrast-[1.08]"
            />
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-6 text-white/45">Navigation</p>
            <div className="flex flex-col items-start gap-1">
              {footerLinks.map((link) => (
                <RollingLink className="min-h-9 text-base text-white/80 hover:text-white" href={link.href} key={link.href}>{link.label}</RollingLink>
              ))}
            </div>
          </nav>

          <div className="flex flex-col">
            <div>
              <p className="eyebrow mb-4 text-white/45">Socials</p>
              <div className="flex gap-2">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="focus-ring grid size-10 place-items-center rounded-[8px] border border-white/15 bg-[#1a1a1d] text-lg font-semibold text-white/80 transition hover:border-white/30 hover:text-white">f</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="focus-ring grid size-10 place-items-center rounded-[8px] border border-white/15 bg-[#1a1a1d] text-sm text-white/80 transition hover:border-white/30 hover:text-white">𝕏</a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="focus-ring grid size-10 place-items-center rounded-[8px] border border-white/15 bg-[#1a1a1d] text-lg text-white/80 transition hover:border-white/30 hover:text-white">◎</a>
              </div>
            </div>

            <div className="mt-7">
              <p className="eyebrow text-white/45">Email</p>
              <a className="focus-ring mt-3 inline-block text-2xl tracking-[-.04em] hover:text-white/70 md:text-3xl" href="mailto:hello@northline.studio">hello@northline.studio</a>
            </div>

            <div className="mt-7">
              <p className="eyebrow text-white/45">Phone</p>
              <a className="focus-ring mt-3 inline-block text-lg text-white/80 hover:text-white" href="tel:+94112345678">+94 11 234 5678</a>
            </div>

            <form className="mt-16 lg:mt-auto">
              <label className="eyebrow text-white/45" htmlFor="newsletter">Subscribe to our newsletter</label>
              <div className="mt-4 flex overflow-hidden rounded-[8px] border border-white/15 bg-[#1a1a1d] focus-within:border-white/35">
                <input id="newsletter" type="email" placeholder="Email address" className="min-h-14 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/40" />
                <button className="focus-ring grid w-14 shrink-0 place-items-center border-l border-white/15" aria-label="Subscribe"><ArrowRight className="size-4" /></button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#212121] pt-6 font-mono text-[10px] uppercase tracking-[.1em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Northline. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
          <p>Designed for useful progress</p>
        </div>
      </Container>
    </footer>
  )
}
