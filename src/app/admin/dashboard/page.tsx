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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">
              System Console
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Operational Dashboard
          </h1>
          <p className="text-[11px] text-white/40 mt-0.5">
            Overview of live surfaces, block architectures, and media pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/pages">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-7 bg-white text-black font-semibold rounded-md px-3 text-[11px] hover:bg-white/90 hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-all shadow-sm"
            >
              <Plus className="h-3 w-3" />
              <span>Create / Manage Pages</span>
            </button>
          </Link>
          <Link href="/" target="_blank">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-7 border border-white/15 bg-[#0c0c0f] text-white hover:bg-white/10 hover:border-red-500/40 rounded-md px-2.5 text-[11px] transition-colors"
            >
              <Globe className="h-3 w-3 text-white/60" />
              <span>Preview Live</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Metrics Row - 4 Pure Black Compact Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Pages */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] text-white/60 font-medium">
              Total Pages
            </span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {pages.length}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/40">
            <span className="text-emerald-400 font-semibold">↑ 1 new</span>
            <span>this week</span>
          </div>
        </div>

        {/* Card 2: Active Blocks */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] text-white/60 font-medium">
              Active Blocks
            </span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalBlocks}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/40">
            <span className="text-emerald-400 font-semibold">↑ 2 updated</span>
          </div>
        </div>

        {/* Card 3: Media Assets */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <ImageIcon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] text-white/60 font-medium">
              Media Assets
            </span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {mediaAssets.length}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/40">
            <span className="text-emerald-400 font-semibold">↑ 1 new</span>
            <span>upload</span>
          </div>
        </div>

        {/* Card 4: Production Gate with Red / Crimson Heartbeat Accent */}
        <div className="rounded-xl border border-red-500/20 bg-gradient-to-b from-[#140a0c] to-[#0c0c0f] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-red-500/40 transition-all space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Activity className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] text-white/60 font-medium">
                Production Gate
              </span>
            </div>
            <ShieldCheck className="h-4 w-4 text-red-400/80" />
          </div>
          <div className="text-xl font-bold text-red-400 tracking-tight flex items-center gap-1.5">
            ONLINE
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
          </div>
          <div className="text-[10px] text-white/40">
            VPS Staging (SSL Secured)
          </div>
        </div>
      </div>

      {/* Website Page Directory Card Container */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] shadow-[0_8px_24px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Header bar of table */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.01]">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Folder className="h-3.5 w-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wider text-white">
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
              className="inline-flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors"
            >
              <span>View All Pages</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </Link>
        </div>

        {/* Directory Row Items */}
        <div className="divide-y divide-white/[0.05]">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 shrink-0 rounded-lg border border-white/10 bg-black/60 flex items-center justify-center text-xs font-semibold text-white">
                  {page.slug === "home" ? (
                    <Globe className="h-3.5 w-3.5 text-white/70" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 text-white/70" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white truncate">
                      {page.title}
                    </span>
                    <Badge
                      className={`text-[9px] rounded-md px-1.5 py-0.5 flex items-center gap-1 font-normal ${
                        page.status === "published"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/15 bg-white/5 text-white/60"
                      }`}
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      {page.status === "published" ? "Published" : page.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-white/40 truncate mt-0.5">
                    /{page.slug} • {page.blocks.length} blocks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 sm:self-center">
                <div className="flex items-center gap-1 text-[10px] text-white/40">
                  <Calendar className="h-2.5 w-2.5" />
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <Link href={`/admin/pages/${page.slug}`}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 h-7 text-[11px] border border-white/15 bg-white/5 text-white hover:bg-white/15 rounded-lg px-2.5 transition-colors"
                  >
                    <Edit2 className="h-2.5 w-2.5 text-white/60" />
                    <span>Edit Blocks</span>
                  </button>
                </Link>

                <Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank">
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="Open live view"
                  >
                    <ExternalLink className="h-3 w-3" />
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
