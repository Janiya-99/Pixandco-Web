"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, ChevronRight, Sparkles } from "lucide-react"
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
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-sky-500/20 bg-slate-950/80 px-4 sm:px-6 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-300 hover:text-white hover:bg-sky-500/10 lg:hidden rounded-lg border border-sky-500/20"
            onClick={onMobileMenuToggle}
            title="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Dynamic Breadcrumbs with Blue Accents */}
          <div className="flex items-center gap-1.5 text-xs font-mono overflow-hidden">
            <Link
              href="/admin/dashboard"
              className="text-sky-400/80 hover:text-sky-300 transition-colors shrink-0 font-medium"
            >
              CMS
            </Link>
            {pathSegments.map((segment, idx) => {
              const isLast = idx === pathSegments.length - 1
              const href = `/admin/${pathSegments.slice(0, idx + 1).join("/")}`

              return (
                <React.Fragment key={segment}>
                  <ChevronRight className="h-3 w-3 text-sky-500/40 shrink-0" />
                  {isLast ? (
                    <span className="font-semibold text-white uppercase tracking-wider truncate max-w-[120px] sm:max-w-none drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
                      {segment}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-slate-400 hover:text-sky-300 uppercase tracking-wider transition-colors shrink-0 hidden sm:inline"
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
          {/* Command Search Trigger with Luminous Border */}
          <Button
            variant="outline"
            className="h-9 w-9 sm:w-64 p-0 sm:px-3.5 justify-center sm:justify-between text-xs text-slate-300 bg-slate-900/60 border-sky-500/25 hover:border-sky-400/50 hover:bg-sky-500/10 font-mono rounded-lg shadow-sm"
            onClick={() => setOpenCommand(true)}
            title="Search (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-sky-400" />
              <span className="hidden sm:inline">Search pages or jump...</span>
            </div>
            <kbd className="pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-1 rounded border border-sky-500/30 bg-slate-950 px-1.5 font-mono text-[9px] font-medium text-sky-300">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg hidden sm:flex border border-sky-500/20"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <div className="h-5 w-[1px] bg-sky-500/20 mx-1 hidden sm:block" />

          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-[11px] font-mono border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.2)]"
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
