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
  Layers,
  Globe,
  Activity,
  Folder,
  Calendar,
  MoreVertical,
  Edit2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCMSStore } from "@/hooks/use-cms-store"

export default function AdminDashboardPage() {
  const { pages, mediaAssets, isHydrated, init } = useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const publishedCount = pages.filter((p) => p.status === "published").length
  const totalBlocks = pages.reduce((acc, p) => acc + p.blocks.length, 0)

  return (
    <div className="space-y-8 font-sans">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">
              SYSTEM CONSOLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
            Operational Dashboard
          </h1>
          <p className="text-xs text-white/50 font-mono mt-1">
            Overview of live surfaces, block architectures, and media pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button
              size="sm"
              className="gap-2 bg-white text-black font-semibold rounded-full px-5 py-2 hover:bg-white/90 font-mono text-xs shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create / Manage Pages</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 font-mono text-xs border-white/15 bg-black/60 text-white hover:bg-white/10 rounded-full px-4"
            >
              <Globe className="h-3.5 w-3.5 text-white/60" />
              <span>Preview Live</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row - 4 Pure Black 3D Glass Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Pages */}
        <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d10] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono text-white/60 font-medium">
              Total Pages
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {pages.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              ↑ 1 new
            </span>
            <span>this week</span>
          </div>
        </div>

        {/* Card 2: Active Blocks */}
        <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d10] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono text-white/60 font-medium">
              Active Blocks
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {totalBlocks}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              ↑ 2 updated
            </span>
          </div>
        </div>

        {/* Card 3: Media Assets */}
        <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d10] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <ImageIcon className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono text-white/60 font-medium">
              Media Assets
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {mediaAssets.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              ↑ 1 new
            </span>
            <span>upload</span>
          </div>
        </div>

        {/* Card 4: Production Gate (with subtle green status accent from image) */}
        <div className="group relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0a140f] to-[#0d0d10] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-emerald-500/40 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-xs font-mono text-white/60 font-medium">
                Production Gate
              </span>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-400/80" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 tracking-tight flex items-center gap-2">
            ONLINE
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>
          <div className="text-[11px] text-white/40 font-mono">
            VPS staging (SSL Secured)
          </div>
        </div>
      </div>

      {/* Website Page Directory Card Container */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d10] shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header bar of table */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Folder className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono tracking-wider text-white">
                Website Page Directory
              </h2>
              <p className="text-xs text-white/40 font-mono mt-0.5">
                Instant access to edit sections, metadata, and design tokens.
              </p>
            </div>
          </div>
          <Link href="/admin/pages">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono gap-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <span>View All Pages</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Directory Row Items */}
        <div className="divide-y divide-white/5">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 hover:bg-white/[0.02] transition-colors gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-black/60 flex items-center justify-center font-mono text-xs font-bold text-white">
                  {page.slug === "home" ? (
                    <Globe className="h-4 w-4 text-white/70" />
                  ) : (
                    <FileText className="h-4 w-4 text-white/70" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold font-mono text-white truncate">
                      {page.title}
                    </span>
                    <Badge
                      className={`text-[9px] font-mono rounded-full px-2 py-0.5 flex items-center gap-1 ${
                        page.status === "published"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/15 bg-white/5 text-white/60"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {page.status === "published" ? "Published" : page.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/40 font-mono truncate mt-0.5">
                    /{page.slug} • {page.blocks.length} blocks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 sm:self-center">
                <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <Link href={`/admin/pages/${page.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-mono border-white/15 bg-white/5 text-white hover:bg-white/15 rounded-xl px-3 gap-1.5"
                  >
                    <Edit2 className="h-3 w-3 text-white/70" />
                    <span>Edit Blocks</span>
                  </Button>
                </Link>

                <Link href={page.slug === "home" ? "/" : `/${page.slug}`} target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-lg"
                    title="Open live view"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
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
