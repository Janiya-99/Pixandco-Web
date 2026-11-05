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
import { useAuthStore } from "@/hooks/use-auth-store"

const navItems = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "CONTENT & PAGES",
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
    title: "CONFIGURATION",
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

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-[#070709] backdrop-blur-2xl transition-all duration-300 select-none lg:static",
          collapsed ? "lg:w-20" : "lg:w-64",
          mobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 bg-[#0a0a0d]">
          <Link href="/admin/dashboard" onClick={handleLinkClick} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/15 bg-black flex items-center justify-center font-mono font-bold text-white text-sm shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              P
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
                  PIX&CO CMS
                </span>
                <span className="text-[10px] text-white/40 font-mono tracking-tight">
                  Premium CMS
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10 hidden lg:flex rounded-lg"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile close toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/50 hover:text-white lg:hidden rounded-lg"
            onClick={() => setMobileOpen?.(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
          {navItems.map((group) => (
            <div key={group.title} className="space-y-1.5">
              {(!collapsed || mobileOpen) && (
                <h4 className="px-3 text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 font-semibold">
                  {group.title}
                </h4>
              )}
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive =
                  item.href === "/admin/dashboard"
                    ? pathname === "/admin/dashboard"
                    : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all group relative font-mono",
                      isActive
                        ? "bg-[#141418] text-white font-semibold border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white"
                      )}
                    />
                    {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* User & Quick Actions Footer */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-[#0a0a0d]">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all font-mono border border-transparent hover:border-white/10",
              collapsed && !mobileOpen && "justify-center px-0"
            )}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Live Public Site</span>}
            {(!collapsed || mobileOpen) && <ExternalLink className="h-3 w-3 ml-auto text-white/30" />}
          </Link>

          <div
            className={cn(
              "flex items-center justify-between rounded-xl border border-white/10 bg-black/60 p-2.5",
              collapsed && !mobileOpen && "flex-col gap-2"
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="overflow-hidden">
                  <p className="truncate text-xs font-medium text-white">{user?.email || "admin@pixandco.lk"}</p>
                  <p className="text-[10px] text-white/40 capitalize font-mono">Superadmin</p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
              onClick={logout}
              title="Log out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
