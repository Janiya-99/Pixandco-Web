"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "./command-menu"

interface AdminHeaderProps {
  onMobileMenuToggle?: () => void
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname()
  const [openCommand, setOpenCommand] = React.useState(false)

  // Generate breadcrumb items
  const pathSegments = pathname
    .replace("/admin", "")
    .split("/")
    .filter(Boolean)

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={onMobileMenuToggle}
            title="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Dynamic Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs font-mono overflow-hidden">
            <Link
              href="/admin/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              CMS
            </Link>
            {pathSegments.map((segment, idx) => {
              const isLast = idx === pathSegments.length - 1
              const href = `/admin/${pathSegments.slice(0, idx + 1).join("/")}`

              return (
                <React.Fragment key={segment}>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                  {isLast ? (
                    <span className="font-semibold text-foreground uppercase tracking-wider truncate max-w-[120px] sm:max-w-none">
                      {segment}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors shrink-0 hidden sm:inline"
                    >
                      {segment}
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Global Controls & Palette */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Search Trigger */}
          <Button
            variant="outline"
            className="h-8 w-9 sm:w-64 p-0 sm:px-3 justify-center sm:justify-between text-xs text-muted-foreground bg-muted/20 border-border/60 hover:bg-muted/40 font-mono"
            onClick={() => setOpenCommand(true)}
            title="Search (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search or jump to...</span>
            </div>
            <kbd className="pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-1 rounded border border-border/80 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <div className="h-4 w-[1px] bg-border/60 mx-1 hidden sm:block" />

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
