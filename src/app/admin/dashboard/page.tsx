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
    <div className="space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Overview of digital surfaces, active modules, and live pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              <span>Create / Manage Pages</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="gap-1.5 font-mono">
              <Globe className="h-3.5 w-3.5" />
              <span>Preview Live</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border/70 bg-card/60 p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">
              Total Pages
            </span>
            <FileText className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold font-mono">{pages.length}</div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
            <span className="text-emerald-400 font-medium">{publishedCount} published</span>
            <span>•</span>
            <span>{draftCount} drafts</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/60 p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">
              Configured Blocks
            </span>
            <Layers className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold font-mono">{totalBlocks}</div>
          <div className="text-[11px] text-muted-foreground font-mono">
            Across {pages.length} active routes
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/60 p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">
              Media Assets
            </span>
            <ImageIcon className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold font-mono">{mediaAssets.length}</div>
          <div className="text-[11px] text-muted-foreground font-mono">
            Videos, logos & editorial images
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/60 p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">
              Environment
            </span>
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            HEALTHY
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            VPS Staging (PM2 / Let&apos;s Encrypt)
          </div>
        </div>
      </div>

      {/* Pages Overview Table */}
      <div className="rounded-lg border border-border/70 bg-card/40 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border/60">
          <div>
            <h2 className="text-sm font-semibold font-mono tracking-wider uppercase text-foreground">
              Recent Website Pages
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Direct access to edit blocks, meta tags, and layouts.
            </p>
          </div>
          <Link href="/admin/pages">
            <Button variant="ghost" size="sm" className="text-xs font-mono gap-1">
              <span>View All</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-border/60">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded border border-border/70 bg-muted/40 flex items-center justify-center font-mono text-xs font-medium">
                  /{page.slug.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium font-mono text-foreground">
                      {page.title}
                    </span>
                    <Badge
                      variant={
                        page.status === "published"
                          ? "success"
                          : page.status === "draft"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {page.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Slug: /{page.slug} • {page.blocks.length} blocks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline-block">
                  Updated {new Date(page.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/admin/pages/${page.slug}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
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
