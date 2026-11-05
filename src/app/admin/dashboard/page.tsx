"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileText,
  Image as ImageIcon,
  ArrowUpRight,
  Plus,
  Layers,
  Globe,
  Activity,
  Folder,
  Calendar,
  Edit2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCMSStore } from "@/hooks/use-cms-store"

export default function AdminDashboardPage() {
  const { pages, mediaAssets, init } = useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const totalBlocks = pages.reduce((acc, p) => acc + p.blocks.length, 0)

  return (
    <div className="space-y-5 font-[var(--font-poppins)]">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">
              System Console
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white">
            Operational Dashboard
          </h1>
          <p className="text-[10.5px] text-white/40 mt-0.5">
            Overview of live surfaces, block architectures, and media pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/pages">
            <button
              type="button"
              className="admin-glass-btn-accent"
            >
              <Plus className="h-2.5 w-2.5 text-red-300" />
              <span className="text-[10.5px]">Create / Manage Pages</span>
            </button>
          </Link>
          <Link href="/" target="_blank">
            <button
              type="button"
              className="admin-glass-btn hover:border-white/30"
            >
              <Globe className="h-2.5 w-2.5 text-white/50" />
              <span className="text-[10.5px]">Preview Live</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Metrics Row - 4 Pure Black Glassmorphic Compact Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Pages */}
        <div className="admin-glass-card rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <FileText className="h-3 w-3" />
            </div>
            <span className="text-[10.5px] text-white/60 font-medium">
              Total Pages
            </span>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {pages.length}
          </div>
          <div className="flex items-center gap-1 text-[9.5px] text-white/40">
            <span className="text-emerald-400 font-medium">↑ 1 new</span>
            <span>this week</span>
          </div>
        </div>

        {/* Card 2: Active Blocks */}
        <div className="admin-glass-card rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <Layers className="h-3 w-3" />
            </div>
            <span className="text-[10.5px] text-white/60 font-medium">
              Active Blocks
            </span>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {totalBlocks}
          </div>
          <div className="flex items-center gap-1 text-[9.5px] text-white/40">
            <span className="text-emerald-400 font-medium">↑ 2 updated</span>
          </div>
        </div>

        {/* Card 3: Media Assets */}
        <div className="admin-glass-card rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <ImageIcon className="h-3 w-3" />
            </div>
            <span className="text-[10.5px] text-white/60 font-medium">
              Media Assets
            </span>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {mediaAssets.length}
          </div>
          <div className="flex items-center gap-1 text-[9.5px] text-white/40">
            <span className="text-emerald-400 font-medium">↑ 1 new</span>
            <span>upload</span>
          </div>
        </div>

        {/* Card 4: Production Gate with Crimson Red Heartbeat */}
        <div className="admin-glass-card rounded-xl p-3.5 space-y-2 border-red-500/20 bg-gradient-to-b from-red-950/20 to-transparent hover:border-red-500/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Activity className="h-3 w-3" />
              </div>
              <span className="text-[10.5px] text-white/60 font-medium">
                Production Gate
              </span>
            </div>
            <ShieldCheck className="h-3.5 w-3.5 text-red-400/80" />
          </div>
          <div className="text-lg font-bold text-red-400 tracking-tight flex items-center gap-1.5">
            ONLINE
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
          </div>
          <div className="text-[9.5px] text-white/40">
            VPS Staging (SSL Secured)
          </div>
        </div>
      </div>

      {/* Website Page Directory Card Container with Glassmorphism */}
      <div className="admin-glass-panel rounded-xl overflow-hidden shadow-2xl">
        {/* Header bar of table */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <Folder className="h-3 w-3" />
            </div>
            <div>
              <h2 className="text-[11px] font-medium tracking-wide text-white">
                Website Page Directory
              </h2>
              <p className="text-[10px] text-white/40">
                Instant access to edit sections, metadata, and design tokens.
              </p>
            </div>
          </div>
          <Link href="/admin/pages">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[10px] text-white/50 hover:text-white transition-colors"
            >
              <span>View All Pages</span>
              <ArrowUpRight className="h-2.5 w-2.5" />
            </button>
          </Link>
        </div>

        {/* Directory Row Items */}
        <div className="divide-y divide-white/[0.04]">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors gap-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-7 w-7 shrink-0 rounded-md border border-white/10 bg-white/[0.03] flex items-center justify-center text-xs font-semibold text-white">
                  {page.slug === "home" ? (
                    <Globe className="h-3 w-3 text-white/60" />
                  ) : (
                    <FileText className="h-3 w-3 text-white/60" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-normal text-white truncate">
                      {page.title}
                    </span>
                    <span
                      className={`admin-glass-badge text-[9px] ${
                        page.status === "published"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/15 bg-white/5 text-white/60"
                      }`}
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      {page.status === "published" ? "Published" : page.status}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-white/40 truncate mt-0.5">
                    /{page.slug} • {page.blocks.length} blocks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 sm:self-center">
                <div className="flex items-center gap-1 text-[9.5px] text-white/35 mr-1">
                  <Calendar className="h-2.5 w-2.5" />
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <Link href={`/admin/pages/${page.slug}`}>
                  <button
                    type="button"
                    className="admin-glass-btn group hover:border-red-500/40"
                  >
                    <Edit2 className="h-2.5 w-2.5 text-white/50 group-hover:text-red-400 transition-colors" />
                    <span className="text-[10px]">Edit Blocks</span>
                  </button>
                </Link>

                <Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank">
                  <button
                    type="button"
                    className="h-6.5 w-6.5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="Open live view"
                  >
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
