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
      <div className="flex h-screen w-full items-center justify-center bg-black text-white font-[var(--font-poppins)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <p className="text-[11px] text-white/50 tracking-wider">
            Loading Admin Portal...
          </p>
        </div>
      </div>
    )
  }

  // Auth pages like /admin/login
  if (pathname.includes("/login")) {
    return (
      <div data-admin-root="true" className="admin-scope min-h-screen bg-black text-white font-[var(--font-poppins)]">
        <Toaster position="top-right" theme="dark" />
        {children}
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div data-admin-root="true" className="admin-scope flex h-screen w-full overflow-hidden bg-black text-white font-[var(--font-poppins)] antialiased select-none">
      <Toaster position="top-right" theme="dark" />
      <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 z-10 bg-[#050507]">
        <AdminHeader onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 bg-[#050507]">
          <div className="mx-auto max-w-6xl w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
