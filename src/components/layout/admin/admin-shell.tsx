"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/hooks/use-auth-store"
import { useCMSStore } from "@/hooks/use-cms-store"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { Toaster } from "sonner"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore()
  const { init } = useCMSStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    checkAuth()
    init()
  }, [checkAuth, init])

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathname.includes("/login")) {
      router.push("/admin/login")
    }
  }, [isLoading, isAuthenticated, pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Initializing Pix&Co CMS...
          </p>
        </div>
      </div>
    )
  }

  // Auth pages like /admin/login shouldn't show the dashboard shell
  if (pathname.includes("/login")) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Toaster position="top-right" theme="dark" />
        {children}
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Toaster position="top-right" theme="dark" />
      <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <AdminHeader onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-background/50">
          <div className="mx-auto max-w-7xl w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
