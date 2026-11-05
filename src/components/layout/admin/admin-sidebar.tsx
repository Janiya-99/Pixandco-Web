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
  Shield,
  Layers,
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

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border/70 bg-card/40 backdrop-blur-xl transition-all duration-300 z-30 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                Pix&Co CMS
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                Studio Studio v2.4
              </span>
            </div>
          </Link>
        )}

        {collapsed && (
          <div className="mx-auto h-7 w-7 rounded bg-foreground text-background flex items-center justify-center font-mono font-bold text-xs">
            P
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground hidden lg:flex"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navItems.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
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
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-all group",
                    isActive
                      ? "bg-foreground/10 text-foreground font-semibold border-l-2 border-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
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
            collapsed && "justify-center px-0"
          )}
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span>Live Public Site</span>}
        </Link>

        <div
          className={cn(
            "flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-2",
            collapsed && "flex-col gap-2"
          )}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-7 w-7 shrink-0 rounded-full bg-border flex items-center justify-center font-mono text-xs font-medium text-foreground">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            {!collapsed && (
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
  )
}
