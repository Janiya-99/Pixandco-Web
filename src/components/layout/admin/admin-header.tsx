"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, ChevronRight, Moon, Sun, ExternalLink, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandMenu } from "./command-menu"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface AdminHeaderProps {
  onMobileMenuToggle?: () => void
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname()
  const [openCommand, setOpenCommand] = React.useState(false)
  const [unreadNotifications, setUnreadNotifications] = React.useState(3)
  const [isLightMode, setIsLightMode] = React.useState(false)

  const notifications = [
    { id: 1, title: "System Online", desc: "Production staging gate connected and SSL verified.", time: "10m ago" },
    { id: 2, title: "Page Updated", desc: "Homepage content changes saved successfully.", time: "1h ago" },
    { id: 3, title: "Deployment Active", desc: "Git branch chathuranga-dev synchronized with VPS.", time: "3h ago" },
  ]

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
    toast.info(!isLightMode ? "Obsidian Dark is the standard CMS theme." : "Dark mode restored.")
  }

  const markAllRead = () => {
    setUnreadNotifications(0)
    toast.success("All notifications marked as read")
  }

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
          {/* Command Search Bar - Glassmorphic */}
          <button
            type="button"
            className="h-6.5 w-6.5 sm:w-52 px-2.5 flex items-center justify-center sm:justify-between text-[10px] text-white/50 bg-white/[0.03] border border-white/10 hover:border-red-500/40 hover:bg-white/[0.05] rounded-md backdrop-blur-md transition-all cursor-pointer shadow-sm"
            onClick={() => setOpenCommand(true)}
            title="Search (⌘K)"
          >
            <div className="flex items-center gap-1.5">
              <Search className="h-3 w-3 text-white/40" />
              <span className="hidden sm:inline text-white/40 text-[10px]">Search pages or jump...</span>
            </div>
            <kbd className="pointer-events-none hidden sm:inline-flex h-3.5 select-none items-center gap-0.5 rounded border border-white/15 bg-black/60 px-1 text-[8.5px] font-medium text-white/50">
              ⌘K
            </kbd>
          </button>

          {/* Functional Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="relative h-6.5 w-6.5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-md border border-white/10 bg-white/[0.02] backdrop-blur-md transition-colors"
                title="Notifications"
              >
                <Bell className="h-3 w-3" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-[#0c0c10] border-white/10 p-0 text-white rounded-xl shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between p-3 border-b border-white/[0.08]">
                <span className="text-[11px] font-semibold">Notifications</span>
                {unreadNotifications > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[9.5px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <Check className="h-2.5 w-2.5" /> Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-white/[0.05] max-h-60 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-white/[0.02] transition-colors space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-medium text-white/90">{item.title}</span>
                      <span className="text-[9px] text-white/40">{item.time}</span>
                    </div>
                    <p className="text-[9.5px] text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Functional Theme / Night Mode button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-6.5 w-6.5 items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-md border border-white/10 bg-white/[0.02] backdrop-blur-md hidden sm:flex transition-colors"
            title={isLightMode ? "Switch to Dark Mode" : "Switch theme mode"}
          >
            {isLightMode ? <Sun className="h-3 w-3 text-amber-400" /> : <Moon className="h-3 w-3" />}
          </button>

          <div className="h-3.5 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />

          {/* Public Site button styled in glass */}
          <Link href="/" target="_blank">
            <button
              type="button"
              className="admin-glass-btn group hover:border-red-500/40"
            >
              <span className="text-[10px] text-white/80 group-hover:text-white">Public Site</span>
              <ExternalLink className="h-2.5 w-2.5 text-white/40 group-hover:text-red-400 transition-colors" />
            </button>
          </Link>
        </div>
      </header>

      <CommandMenu open={openCommand} setOpen={setOpenCommand} />
    </>
  )
}
