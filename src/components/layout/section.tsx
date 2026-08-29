import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ children, className, id, ...props }, ref) => {
  return (
    <section ref={ref} id={id} className={cn("py-16 lg:py-[100px]", className)} {...props}>
      {children}
    </section>
  )
})
Section.displayName = "Section"
