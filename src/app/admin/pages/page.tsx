"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  Layers,
  CheckSquare,
  Square,
  Globe,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { useCMSStore } from "@/hooks/use-cms-store"
import { CMSPage, PageStatus } from "@/types/cms.types"
import { toast } from "sonner"

export default function PageManagerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pages, createPage, deletePage, duplicatePage, init } = useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  // Create page dialog state
  const [isCreateOpen, setIsCreateOpen] = React.useState(
    searchParams.get("create") === "true"
  )
  const [newTitle, setNewTitle] = React.useState("")
  const [newSlug, setNewSlug] = React.useState("")
  const [newDescription, setNewDescription] = React.useState("")
  const [newStatus, setNewStatus] = React.useState<PageStatus>("draft")

  // Auto-slug generation from title
  const handleTitleChange = (val: string) => {
    setNewTitle(val)
    if (!newSlug || newSlug === newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setNewSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      )
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newSlug) {
      toast.error("Title and slug are required")
      return
    }

    const created = await createPage({
      title: newTitle,
      slug: newSlug,
      description: newDescription,
      status: newStatus,
      author: "Janith C.",
      meta: {
        metaTitle: `${newTitle} — Pix & Co`,
        metaDescription: newDescription || `${newTitle} page on Pix & Co`,
      },
      blocks: [
        {
          id: `blk_hero_${Date.now()}`,
          type: "hero",
          name: "Hero Section",
          visible: true,
          title: newTitle.toUpperCase(),
          subtitle: newDescription || "Engineered digital experiences.",
          primaryCtaText: "Get in touch",
          primaryCtaLink: "/contact",
          mediaUrl: "/videos/hero-system.mp4",
          mediaType: "video",
        },
      ],
    })

    toast.success(`Page "${created.title}" created successfully`)
    setIsCreateOpen(false)
    setNewTitle("")
    setNewSlug("")
    setNewDescription("")
    router.push(`/admin/pages/${created.slug}`)
  }

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || page.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPages.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPages.map((p) => p.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleBatchDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} pages?`)) {
      for (const id of selectedIds) {
        await deletePage(id)
      }
      toast.success(`${selectedIds.length} pages deleted`)
      setSelectedIds([])
    }
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d10] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              PAGE MANAGER
            </h1>
            <Badge className="bg-white/10 text-white/80 border-white/15 text-[10px] font-mono">
              {pages.length} Pages
            </Badge>
          </div>
          <p className="text-xs text-white/40 font-mono mt-1">
            Author, reorder, and configure blocks and multimedia across all website routes.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2 font-mono text-xs rounded-full bg-white text-black font-semibold hover:bg-white/90 px-5 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>New Page</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d0d10] p-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="pl-9 h-9 rounded-xl border-white/10 bg-black/60 text-xs font-mono text-white placeholder:text-white/30 focus:border-white/30"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="flex items-center rounded-xl border border-white/10 bg-black/60 p-1">
            {["all", "published", "draft", "archived"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                  statusFilter === st
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBatchDelete}
              className="gap-1.5 font-mono text-xs rounded-xl"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Pages Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d10] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-white/40 text-[10px] uppercase">
              <tr>
                <th className="p-3 pl-4 w-10">
                  <button onClick={toggleSelectAll} className="flex items-center">
                    {selectedIds.length === filteredPages.length && filteredPages.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-white" />
                    ) : (
                      <Square className="h-4 w-4 text-white/30" />
                    )}
                  </button>
                </th>
                <th className="p-3">Page / Title</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Status</th>
                <th className="p-3">Sections</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-white/40 font-mono">
                    No pages found matching &ldquo;{searchTerm}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => {
                  const isSelected = selectedIds.includes(page.id)

                  return (
                    <tr
                      key={page.id}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        isSelected ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <td className="p-3 pl-4">
                        <button
                          onClick={() => toggleSelectOne(page.id)}
                          className="flex items-center"
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-white" />
                          ) : (
                            <Square className="h-4 w-4 text-white/30" />
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/admin/pages/${page.slug}`}
                          className="font-semibold text-white hover:text-white/80 transition-colors flex items-center gap-2"
                        >
                          <span>{page.title}</span>
                          {page.slug === "home" && (
                            <Badge className="bg-white/10 text-white/80 border border-white/15 text-[9px] px-1.5 py-0">
                              Root
                            </Badge>
                          )}
                        </Link>
                        {page.description && (
                          <div className="text-[11px] text-white/40 truncate max-w-sm mt-0.5">
                            {page.description}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-white/60">/{page.slug}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            page.status === "published"
                              ? "success"
                              : page.status === "archived"
                              ? "destructive"
                              : "outline"
                          }
                          className="text-[10px] uppercase font-mono"
                        >
                          {page.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="flex items-center gap-1.5 text-white/60">
                          <Layers className="h-3.5 w-3.5 text-white/50" />
                          {page.blocks.length} blocks
                        </span>
                      </td>
                      <td className="p-3 text-white/40 text-[11px]">
                        {new Date(page.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3 text-right pr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10 rounded-lg"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-[#0e0e12] border-white/15 text-white font-mono text-xs backdrop-blur-xl shadow-2xl"
                          >
                            <DropdownMenuItem
                              onClick={() => router.push(`/admin/pages/${page.slug}`)}
                              className="gap-2 focus:bg-white/10"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                              <span>Edit Content Blocks</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={async () => {
                                const dup = await duplicatePage(page.id)
                                if (dup) toast.success(`Duplicated as "${dup.title}"`)
                              }}
                              className="gap-2 focus:bg-white/10"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              <span>Duplicate Page</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(page.slug === "home" ? "/" : `/${page.slug}`, "_blank")
                              }
                              className="gap-2 focus:bg-white/10"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span>Open Live Public View</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                              onClick={async () => {
                                if (confirm(`Delete "${page.title}"?`)) {
                                  await deletePage(page.id)
                                  toast.success("Page deleted")
                                }
                              }}
                              className="text-red-400 gap-2 focus:bg-red-500/20 focus:text-red-300"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete Page</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Page Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md bg-[#0e0e12] border-white/15 p-6 backdrop-blur-2xl rounded-2xl font-mono text-xs shadow-2xl">
          <form onSubmit={handleCreateSubmit}>
            <DialogHeader>
              <DialogTitle className="text-sm uppercase text-white">
                CREATE NEW CMS PAGE
              </DialogTitle>
              <DialogDescription className="text-white/50 text-xs">
                Define the page title, URL path, and initial status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <label className="uppercase text-white/50 text-[10px]">Page Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. AI Strategy Consulting"
                  className="rounded-xl border-white/10 bg-black/60 text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-white/50 text-[10px]">URL Slug</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-white/40">/</span>
                  <Input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="ai-strategy"
                    className="pl-6 rounded-xl border-white/10 bg-black/60 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-white/50 text-[10px]">Description (Optional)</label>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Internal summary or short intro..."
                  className="rounded-xl border-white/10 bg-black/60 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-white/50 text-[10px]">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as PageStatus)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Live Online)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl border-white/10 text-white/70 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                Create Page
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
