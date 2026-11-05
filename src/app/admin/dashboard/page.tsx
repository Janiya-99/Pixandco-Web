"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Sparkles,
  Layers,
  Globe,
  Zap,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCMSStore } from "@/hooks/use-cms-store"

export default function AdminDashboardPage() {
  const { pages, mediaAssets, settings } = useCMSStore()

  const publishedCount = pages.filter((p) => p.status === "published").length
  const draftCount = pages.filter((p) => p.status === "draft").length
  const totalBlocks = pages.reduce((acc, p) => acc + p.blocks.length, 0)

  return (
    <div className="space-y-8 font-sans">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-sky-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
              SYSTEM CONSOLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Overview of live surfaces, block architectures, and media pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:brightness-110 border-0 font-mono text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create / Manage Pages</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 font-mono text-xs border-sky-500/30 bg-slate-900/60 text-sky-300 hover:bg-sky-500/10 rounded-xl"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Preview Live</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row - 3D Luminous Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Pages */}
        <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(56,189,248,0.1)_inset] hover:border-sky-400/40 hover:shadow-[0_15px_35px_-10px_rgba(14,165,233,0.3)] transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
              Total Pages
            </span>
            <div className="h-8 w-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {pages.length}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-1 border-t border-sky-500/10">
            <span className="text-emerald-400 font-medium">{publishedCount} published</span>
            <span>•</span>
            <span className="text-amber-400">{draftCount} drafts</span>
          </div>
        </div>

        {/* Configured Blocks */}
        <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(56,189,248,0.1)_inset] hover:border-sky-400/40 hover:shadow-[0_15px_35px_-10px_rgba(14,165,233,0.3)] transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
              Active Blocks
            </span>
            <div className="h-8 w-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {totalBlocks}
          </div>
          <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-sky-500/10">
            Across {pages.length} modular layouts
          </div>
        </div>

        {/* Media Assets */}
        <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(56,189,248,0.1)_inset] hover:border-sky-400/40 hover:shadow-[0_15px_35px_-10px_rgba(14,165,233,0.3)] transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
              Media Assets
            </span>
            <div className="h-8 w-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <ImageIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {mediaAssets.length}
          </div>
          <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-sky-500/10">
            Static images, logos & 4K loops
          </div>
        </div>

        {/* Deployment Status */}
        <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(56,189,248,0.1)_inset] hover:border-sky-400/40 hover:shadow-[0_15px_35px_-10px_rgba(14,165,233,0.3)] transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
              Production Gate
            </span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight flex items-center gap-2">
            ONLINE
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
          </div>
          <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-sky-500/10">
            VPS Staging (SSL Secured)
          </div>
        </div>
      </div>

      {/* Pages Overview Table */}
      <div className="rounded-2xl border border-sky-500/20 bg-slate-950/60 backdrop-blur-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-sky-500/20 bg-slate-900/40">
          <div>
            <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white flex items-center gap-2">
              Website Page Directory
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Instant access to edit sections, metadata, and design tokens.
            </p>
          </div>
          <Link href="/admin/pages">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono gap-1 text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-sky-500/10">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-sky-500/5 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-xl border border-sky-500/30 bg-slate-900/80 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  /{page.slug.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold font-mono text-white truncate">
                      {page.title}
                    </span>
                    <Badge
                      className={`text-[9px] font-mono ${
                        page.status === "published"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : page.status === "draft"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-slate-500/30 bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {page.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 font-mono truncate">
                    /{page.slug} • {page.blocks.length} blocks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-slate-400 font-mono hidden md:inline-block">
                  Updated {new Date(page.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/admin/pages/${page.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-mono border-sky-500/30 bg-slate-900/60 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 rounded-lg shadow-sm"
                  >
                    Edit Blocks
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
