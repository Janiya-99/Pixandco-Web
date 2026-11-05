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
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/70 bg-card/95 backdrop-blur-xl transition-all duration-300 select-none lg:static",
          collapsed ? "lg:w-16" : "lg:w-64",
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
          <Link href="/admin/dashboard" onClick={handleLinkClick} className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
              P
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Pix&Co CMS
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Enterprise Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile close toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen?.(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
          {navItems.map((group) => (
            <div key={group.title} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <h4 className="px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 mb-2">
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
                      "flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-all group",
                      isActive
                        ? "bg-foreground/10 text-foreground font-semibold border-l-2 border-foreground"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    )}
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
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
        <div className="p-3 border-t border-border/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors font-mono",
              collapsed && !mobileOpen && "justify-center px-0"
            )}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Live Public Site</span>}
          </Link>

          <div
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-2",
              collapsed && !mobileOpen && "flex-col gap-2"
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-7 w-7 shrink-0 rounded-full bg-border flex items-center justify-center font-mono text-xs font-medium text-foreground">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="overflow-hidden">
                  <p className="truncate text-xs font-medium text-foreground">{user?.email || "admin@pixandco.lk"}</p>
                  <p className="text-[10px] text-muted-foreground capitalize font-mono">{user?.role || "Administrator"}</p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
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
