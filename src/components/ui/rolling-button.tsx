import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function RollingButton({ href, children, variant = "light", className }: { href: string; children: React.ReactNode; variant?: "light" | "outline"; className?: string }) {
  return (
    <Link href={href} className={cn("group focus-ring inline-flex min-h-12 items-center gap-8 rounded-[8px] border px-5 text-xs font-medium uppercase tracking-[.12em] transition-colors", variant === "light" ? "border-white bg-white text-black hover:bg-[#dcdcd8]" : "border-white/20 hover:border-white/50", className)}>
      <span className="relative block overflow-hidden leading-none"><span className="block transition-transform duration-500 group-hover:-translate-y-full">{children}</span><span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">{children}</span></span>
      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  )
}
