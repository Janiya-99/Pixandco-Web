"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Container } from "@/components/layout/container"
import { ScrambleLink, ScrambleText } from "@/components/ui/scramble-text"

const links = [{ href: "/projects", label: "Projects" }, { href: "/about", label: "About" }, { href: "/blog", label: "Journal" }, { href: "/contact", label: "Contact" }]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  
  useEffect(() => { 
    let lastScrollY = window.scrollY
    const update = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 30)
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY = currentScrollY
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = "" } }, [open])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled || open ? "border-[#212121] bg-[#010004]/88 backdrop-blur-xl" : "border-transparent bg-transparent"} ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}>
      <Container className="flex h-[76px] items-center justify-between">
        <Link className="focus-ring relative z-[60] flex items-center gap-3" href="/" onClick={() => setOpen(false)}><span className="grid size-7 place-items-center border border-white/50 text-[10px] font-semibold">N</span><ScrambleText className="text-sm font-medium tracking-[.14em]" text="NORTHLINE" delay={0.12} showCursor /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">{links.map((link, index) => <ScrambleLink active={isActive(link.href)} className={isActive(link.href) ? "text-xs uppercase tracking-[.12em] text-white" : "text-xs uppercase tracking-[.12em] text-white/65 transition-colors hover:text-white"} href={link.href} text={link.label} delay={0.2 + index * 0.06} key={link.href} />)}</nav>
        <ScrambleLink className="hidden border-b border-white/40 text-xs uppercase tracking-[.12em] lg:inline-flex" href="/contact" text="Start a project" delay={0.5} />
        <button className="focus-ring relative z-[60] grid size-11 place-items-center lg:hidden" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </Container>
      <AnimatePresence>
        {open && <motion.div id="mobile-menu" className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#010004] px-5 pb-8 pt-28 lg:hidden" initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .65, ease: [.16,1,.3,1] }}>
          <nav className="flex flex-col border-t border-white/10">{links.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 + index * .07 }}><Link aria-current={isActive(link.href) ? "page" : undefined} className="focus-ring flex min-h-20 items-center justify-between border-b border-white/10 text-3xl tracking-[-.04em]" href={link.href} onClick={() => setOpen(false)}><span className="inline-flex items-center">{link.label}{isActive(link.href) && <span className="nav-caret ml-2" aria-hidden />}</span><span className="text-sm text-white/35">0{index + 1}</span></Link></motion.div>)}</nav>
          <div className="mt-auto grid grid-cols-2 gap-8 pt-12 text-xs uppercase tracking-[.12em] text-white/45"><span>Colombo · Remote</span><a href="mailto:hello@northline.studio">hello@northline.studio</a></div>
        </motion.div>}
      </AnimatePresence>
    </header>
  )
}
