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

  const pathSegments = pathname
    .replace("/admin", "")
    .split("/")
    .filter(Boolean)

  return (
    <>
      <header className="sticky top-0 z-20 flex h-12 w-full items-center justify-between border-b border-white/[0.08] bg-[#070709] px-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10 lg:hidden rounded-md border border-white/10 flex items-center justify-center transition-colors"
            onClick={onMobileMenuToggle}
            title="Open menu"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] overflow-hidden">
            <Link
              href="/admin/dashboard"
              className="text-white/40 hover:text-white transition-colors shrink-0"
            >
              CMS
            </Link>
            <ChevronRight className="h-2.5 w-2.5 text-white/20 shrink-0" />
            <span className="font-medium text-white capitalize truncate text-[11px]">
              {pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Dashboard"}
            </span>
          </div>
        </div>

        {/* Global Controls & Palette */}
        <div className="flex items-center gap-2">
          {/* Command Search Bar - Sleek rounded-md, not pill/oval */}
          <button
            type="button"
            className="h-7 w-7 sm:w-56 px-2.5 flex items-center justify-center sm:justify-between text-[11px] text-white/60 bg-[#0c0c0f] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.03] rounded-md transition-all cursor-pointer"
            onClick={() => setOpenCommand(true)}
            title="Search (⌘K)"
          >
            <div className="flex items-center gap-1.5">
              <Search className="h-3 w-3 text-white/40" />
              <span className="hidden sm:inline text-white/40 text-[11px]">Search pages or jump...</span>
            </div>
            <kbd className="pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-0.5 rounded border border-white/20 bg-black px-1 text-[9px] font-medium text-white/60">
              ⌘K
            </kbd>
          </button>

          {/* Notification bell with Red Pulse Accent */}
          <button
            type="button"
            className="relative h-7 w-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.05] rounded-md border border-white/10 bg-[#0c0c0f] transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
          </button>

          {/* Dark theme moon indicator */}
          <button
            type="button"
            className="h-7 w-7 items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.05] rounded-md border border-white/10 bg-[#0c0c0f] hidden sm:flex transition-colors"
          >
            <Moon className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />

          {/* Public Site button */}
          <Link href="/" target="_blank">
            <button
              type="button"
              className="h-7 text-[11px] border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-red-500/40 rounded-md px-2.5 flex items-center gap-1.5 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="h-2.5 w-2.5 text-white/50" />
            </button>
          </Link>
        </div>
      </header>

      <CommandMenu open={openCommand} setOpen={setOpenCommand} />
    </>
  )
}
