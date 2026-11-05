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
      <div className="flex h-screen w-full items-center justify-center bg-[#020617] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-sky-400 border-t-transparent shadow-[0_0_20px_#38bdf8]" />
          <p className="font-mono text-xs text-sky-400 uppercase tracking-widest">
            Initializing Pix&Co CMS...
          </p>
        </div>
      </div>
    )
  }

  // Auth pages like /admin/login shouldn't show the dashboard shell
  if (pathname.includes("/login")) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <Toaster position="top-right" theme="dark" />
        {children}
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#020617] text-slate-100 font-sans relative">
      {/* Background Luminous Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[150px]" />

      <Toaster position="top-right" theme="dark" />
      <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 z-10">
        <AdminHeader onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gradient-to-b from-slate-950/40 to-[#020617]">
          <div className="mx-auto max-w-7xl w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
