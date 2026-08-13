import { cn } from "@/lib/utils"

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1536px] px-5 md:px-10 lg:px-16", className)}>{children}</div>
}
