import Link from "next/link"
import { services } from "@/content/site"
import { Container } from "@/components/layout/container"
import { RollingLink } from "@/components/ui/rolling-link"
import { AmbientVideo } from "@/components/media/ambient-video"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Case Studies", href: "/projects" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
] as const

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#010004] pb-8 pt-16 lg:pt-[100px]">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.05fr_.55fr_.85fr] lg:gap-20">
          <div>
            <Link className="focus-ring inline-flex items-center gap-3" href="/">
              <span className="grid size-8 place-items-center border border-white/60 text-[11px] font-semibold">P</span>
              <span className="text-xl font-medium tracking-[-.03em]">Pix & Co</span>
            </Link>
            <h2 className="mt-9 max-w-md text-[clamp(1.8rem,3vw,2.5rem)] leading-[.98] tracking-[-.06em]">Business software and digital growth solutions built around real business needs.</h2>
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
            <div><p className="eyebrow mb-4 text-white/45">Solutions</p><div className="flex flex-col gap-3">{services.map(service => <Link key={service.number} href="/#solutions" className="text-sm text-white/70">{service.title}</Link>)}</div></div>

            <div className="mt-7">
              <p className="eyebrow text-white/45">Email</p>
              <a className="focus-ring mt-3 inline-block text-xl break-all tracking-[-.04em] hover:text-white/70 md:text-2xl" href="mailto:marketing@pixandco.lk">marketing@pixandco.lk</a>
            </div>

            <div className="mt-7">
              <p className="eyebrow text-white/45">Phone</p>
              <a className="focus-ring mt-3 inline-block text-lg text-white/80 hover:text-white" href="tel:+94719980916">071 998 0916</a>
            </div>

            <div className="mt-7"><p className="eyebrow text-white/45">Location</p><p className="mt-3 text-white/80">Battaramulla</p><p className="mt-6 text-sm text-white/50">Pix & Co IT Solutions (Pvt) Ltd</p></div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#212121] pt-6 font-mono text-[10px] uppercase tracking-[.1em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Pix & Co IT Solutions (Pvt) Ltd. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
          <p>Built in Colombo. Working Worldwide.</p>
        </div>
      </Container>
    </footer>
  )
}
