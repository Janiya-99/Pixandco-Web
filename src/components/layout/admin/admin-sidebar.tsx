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
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sky-500/20 bg-slate-950/90 backdrop-blur-2xl transition-all duration-300 select-none lg:static",
          collapsed ? "lg:w-20" : "lg:w-64",
          mobileOpen ? "translate-x-0 w-72 shadow-[0_0_50px_rgba(14,165,233,0.3)]" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sky-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <Link href="/admin/dashboard" onClick={handleLinkClick} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950 text-xs shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              P
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                  Pix&Co CMS
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                </span>
                <span className="text-[10px] text-sky-400/80 font-mono">
                  Luminous Core
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 hidden lg:flex rounded-lg"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile close toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white lg:hidden rounded-lg"
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
                <h4 className="px-3 text-[10px] font-mono uppercase tracking-widest text-sky-400/60 mb-2 font-semibold">
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
                        ? "bg-gradient-to-r from-sky-500/20 via-sky-500/10 to-transparent text-sky-300 font-semibold border-l-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100 hover:border-l-2 hover:border-slate-600"
                    )}
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" : "text-slate-500 group-hover:text-slate-300"
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
        <div className="p-3 border-t border-sky-500/20 space-y-2 bg-slate-950/60">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-all font-mono border border-transparent hover:border-sky-500/20",
              collapsed && !mobileOpen && "justify-center px-0"
            )}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Live Public Site</span>}
          </Link>

          <div
            className={cn(
              "flex items-center justify-between rounded-xl border border-sky-500/20 bg-slate-900/60 p-2.5 shadow-sm",
              collapsed && !mobileOpen && "flex-col gap-2"
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="overflow-hidden">
                  <p className="truncate text-xs font-medium text-slate-200">{user?.email || "admin@pixandco.lk"}</p>
                  <p className="text-[10px] text-sky-400/70 capitalize font-mono">{user?.role || "Administrator"}</p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
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
