import Link from "next/link"
import { cn } from "@/lib/utils"

export function RollingLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group focus-ring inline-flex min-h-11 items-center", className)}>
      <span className="relative block overflow-hidden leading-none">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
      </span>
    </Link>
  )
}
