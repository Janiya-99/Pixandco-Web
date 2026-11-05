import { Metadata } from "next"
import { AdminShell } from "@/components/layout/admin/admin-shell"

export const metadata: Metadata = {
  title: "Admin Portal — Pix & Co CMS",
  description: "Production Content Management System & Digital Experience Engine",
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
