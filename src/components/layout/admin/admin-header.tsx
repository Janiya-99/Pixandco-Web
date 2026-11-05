"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, ChevronRight, Moon, ExternalLink } from "lucide-react"
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
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#070709]/90 px-4 sm:px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white/70 hover:text-white hover:bg-white/10 lg:hidden rounded-lg border border-white/10"
            onClick={onMobileMenuToggle}
            title="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Breadcrumbs matching image */}
          <div className="flex items-center gap-2 text-xs font-mono overflow-hidden">
            <Link
              href="/admin/dashboard"
              className="text-white/40 hover:text-white transition-colors shrink-0"
            >
              CMS
            </Link>
            <ChevronRight className="h-3 w-3 text-white/20 shrink-0" />
            <span className="font-medium text-white capitalize truncate">
              {pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Dashboard"}
            </span>
          </div>
        </div>

        {/* Global Controls & Palette */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Search Pill */}
          <Button
            variant="outline"
            className="h-9 w-9 sm:w-64 p-0 sm:px-3.5 justify-center sm:justify-between text-xs text-white/70 bg-[#0d0d11] border-white/10 hover:border-white/25 hover:bg-white/5 font-mono rounded-xl shadow-inner"
            onClick={() => setOpenCommand(true)}
            title="Search (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-white/40" />
              <span className="hidden sm:inline text-white/50">Search pages or jump...</span>
            </div>
            <kbd className="pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-1 rounded border border-white/20 bg-black px-1.5 font-mono text-[9px] font-medium text-white/60">
              ⌘K
            </kbd>
          </Button>

          {/* Notification bell with red badge */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 bg-[#0d0d11]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
          </Button>

          {/* Dark theme moon indicator */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 bg-[#0d0d11] hidden sm:flex"
          >
            <Moon className="h-4 w-4" />
          </Button>

          <div className="h-5 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          {/* Public Site button styled as pill */}
          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-[11px] font-mono border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 rounded-xl px-3.5 gap-1.5"
            >
              <span>Public Site</span>
              <ExternalLink className="h-3 w-3 text-white/50" />
            </Button>
          </Link>
        </div>
      </header>

      <CommandMenu open={openCommand} setOpen={setOpenCommand} />
    </>
  )
}
