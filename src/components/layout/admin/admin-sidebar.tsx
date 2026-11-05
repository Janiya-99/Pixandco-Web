"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuthStore } from "@/hooks/use-auth-store"

const navItems = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content & Pages",
    items: [
      {
        label: "Page Manager",
        href: "/admin/pages",
        icon: FileText,
      },
      {
        label: "Media Library",
        href: "/admin/media",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        label: "Site Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
]

interface AdminSidebarProps {
  mobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export function AdminSidebar({ mobileOpen = false, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [collapsed, setCollapsed] = React.useState(false)

  const handleLinkClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false)
    }
  }

  const isCollapsedDesktop = collapsed && !mobileOpen

  return (
    <TooltipProvider delayDuration={150}>
      {/* Mobile Backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.08] bg-[#070709] transition-all duration-200 select-none lg:static",
          isCollapsedDesktop ? "lg:w-16" : "lg:w-56",
          mobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "flex h-13 items-center border-b border-white/[0.08] bg-[#070709]",
            isCollapsedDesktop ? "justify-center px-0" : "justify-between px-3.5"
          )}
        >
          {isCollapsedDesktop ? (
            /* Perfectly centered collapsed toggle pill */
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setCollapsed(false)}
                  className="inline-flex items-center justify-center gap-1 h-8 px-2 rounded-xl border border-white/15 bg-black hover:border-white/30 hover:bg-white/[0.05] transition-all cursor-pointer"
                >
                  <span className="font-bold text-white text-xs">P</span>
                  <ChevronRight className="h-3 w-3 text-white/50" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Link href="/admin/dashboard" onClick={handleLinkClick} className="flex items-center gap-2.5 min-w-0">
                <div className="h-7 w-7 rounded-lg border border-white/20 bg-black flex items-center justify-center font-bold text-white text-xs shrink-0">
                  P
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold tracking-wider text-white uppercase truncate">
                    Pix&Co CMS
                  </span>
                  <span className="text-[9px] text-white/40 leading-none">
                    Admin Panel
                  </span>
                </div>
              </Link>

              {/* Desktop collapse toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/10 hidden lg:flex items-center justify-center rounded-md p-0 transition-colors"
                    onClick={() => setCollapsed(true)}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Collapse sidebar</TooltipContent>
              </Tooltip>

              {/* Mobile close toggle */}
              <button
                type="button"
                className="h-7 w-7 text-white/50 hover:text-white lg:hidden flex items-center justify-center rounded-md"
                onClick={() => setMobileOpen?.(false)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Sections */}
        <div className={cn("flex-1 overflow-y-auto py-3 space-y-4", isCollapsedDesktop ? "px-2" : "px-2")}>
          {navItems.map((group) => (
            <div key={group.title} className="space-y-1">
              {!isCollapsedDesktop && (
                <h4 className="px-2.5 text-[9px] uppercase tracking-wider text-white/35 font-medium mb-1">
                  {group.title}
                </h4>
              )}
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive =
                  item.href === "/admin/dashboard"
                    ? pathname === "/admin/dashboard"
                    : pathname.startsWith(item.href)

                const linkContent = (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center rounded-lg text-[11px] font-medium transition-colors group",
                      isCollapsedDesktop
                        ? "h-10 w-10 mx-auto justify-center"
                        : "gap-2.5 px-2.5 py-1.5",
                      isActive
                        ? "bg-white/[0.08] text-white font-semibold border border-white/15"
                        : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white"
                      )}
                    />
                    {!isCollapsedDesktop && <span className="truncate">{item.label}</span>}
                  </Link>
                )

                if (isCollapsedDesktop) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  )
                }

                return <React.Fragment key={item.href}>{linkContent}</React.Fragment>
              })}
            </div>
          ))}
        </div>

        {/* User & Quick Actions Footer */}
        <div className={cn("p-2 border-t border-white/[0.08] space-y-2 bg-[#070709]", isCollapsedDesktop && "px-1.5")}>
          {isCollapsedDesktop ? (
            <>
              {/* Public site pill with tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    target="_blank"
                    className="h-8 w-8 mx-auto flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Public Website</TooltipContent>
              </Tooltip>

              {/* Symmetrical User Avatar & Logout Box */}
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/60 p-2 mx-auto w-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-7 w-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-bold text-white cursor-default">
                      {user?.email?.charAt(0).toUpperCase() || "A"}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {user?.email || "admin@pixandco.lk"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={logout}
                      className="h-6 w-6 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                      <LogOut className="h-3 w-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Log out</TooltipContent>
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Public Website</span>
                <ExternalLink className="h-2.5 w-2.5 ml-auto text-white/30" />
              </Link>

              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/60 p-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="h-6 w-6 shrink-0 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-[10px] font-medium text-white">{user?.email || "admin@pixandco.lk"}</p>
                    <p className="text-[9px] text-white/40 leading-none">Superadmin</p>
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="h-6 w-6 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                      onClick={logout}
                    >
                      <LogOut className="h-3 w-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Log out</TooltipContent>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
