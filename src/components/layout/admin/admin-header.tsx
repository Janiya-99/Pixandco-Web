"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Sun, Moon, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "./command-menu"

export function AdminHeader() {
  const pathname = usePathname()
  const [openCommand, setOpenCommand] = React.useState(false)

  // Generate breadcrumb items
  const pathSegments = pathname
    .replace("/admin", "")
    .split("/")
    .filter(Boolean)

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-6 backdrop-blur-md">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href="/admin/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            CMS
          </Link>
          {pathSegments.map((segment, idx) => {
            const isLast = idx === pathSegments.length - 1
            const href = `/admin/${pathSegments.slice(0, idx + 1).join("/")}`

            return (
              <React.Fragment key={segment}>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                {isLast ? (
                  <span className="font-semibold text-foreground uppercase tracking-wider">
                    {segment}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
                  >
                    {segment}
                  </Link>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Global Controls & Palette */}
        <div className="flex items-center gap-3">
          {/* Command Search Trigger */}
          <Button
            variant="outline"
            className="h-8 w-64 justify-between text-xs text-muted-foreground bg-muted/20 border-border/60 hover:bg-muted/40 font-mono hidden md:flex"
            onClick={() => setOpenCommand(true)}
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Search or jump to...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-border/80 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => {
              // Notification preview
            }}
          >
            <Bell className="h-4 w-4" />
          </Button>

          <div className="h-4 w-[1px] bg-border/60 mx-1" />

          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-[11px] font-mono border-border/80 hover:border-foreground"
            >
              Public Site
            </Button>
          </Link>
        </div>
      </header>

      <CommandMenu open={openCommand} setOpen={setOpenCommand} />
    </>
  )
}
