"use client"

import { confirmAction } from "@/lib/sweet-alert"

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
    const ok = await confirmAction({
      title: 'Delete Selected Pages?',
      text: `Are you sure you want to delete ${selectedIds.length} pages? This cannot be undone.`,
      confirmText: 'Yes, delete all',
    })
    if (ok) {
      for (const id of selectedIds) {
        await deletePage(id)
      }
      toast.success(`${selectedIds.length} pages deleted`)
      setSelectedIds([])
    }
  }

  return (
    <div className="space-y-4 font-[var(--font-poppins)]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/10 bg-[#0c0c0f] p-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[13px] font-semibold tracking-tight text-white">
              Page Manager
            </h1>
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] px-1.5 py-0 rounded-md">
              {pages.length} Pages
            </Badge>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">
            Author, reorder, and configure blocks and multimedia across all website routes.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="admin-glass-btn-accent"
        >
          <Plus className="h-3 w-3 text-red-300" />
          <span className="text-[10px]">New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0c0c0f] p-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1.5 h-3 w-3 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="pl-7 h-6 rounded-md border-white/10 bg-black/60 text-[10px] placeholder:text-[10px] text-white placeholder:text-white/30 focus:border-red-500/40"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="flex items-center rounded-md border border-white/10 bg-black/60 p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "published", label: "Published" },
              { id: "draft", label: "Draft" },
              { id: "archived", label: "Archived" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setStatusFilter(id)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                  statusFilter === id
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBatchDelete}
              className="inline-flex items-center gap-1 h-6 text-[10px] rounded-md bg-red-600 hover:bg-red-700 text-white px-2 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Pages Table */}
      <div className="rounded-xl border border-white/10 bg-[#0c0c0f] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="border-b border-white/10 bg-white/[0.02] text-white/40 text-[10px] uppercase">
              <tr>
                <th className="p-2.5 pl-3 w-8">
                  <button onClick={toggleSelectAll} className="flex items-center">
                    {selectedIds.length === filteredPages.length && filteredPages.length > 0 ? (
                      <CheckSquare className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Square className="h-3.5 w-3.5 text-white/30" />
                    )}
                  </button>
                </th>
                <th className="p-2.5">Page / Title</th>
                <th className="p-2.5">Slug</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Sections</th>
                <th className="p-2.5">Last Updated</th>
                <th className="p-2.5 text-right pr-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[11px] text-white/40">
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
                          className="text-[9px] uppercase font-normal rounded-md px-1.5 py-0.5"
                        >
                          {page.status}
                        </Badge>
                      </td>
                      <td className="p-2.5">
                        <span className="flex items-center gap-1.5 text-white/60">
                          <Layers className="h-3 w-3 text-white/50" />
                          {page.blocks.length} blocks
                        </span>
                      </td>
                      <td className="p-2.5 text-white/40 text-[10px]">
                        {new Date(page.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-2.5 text-right pr-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="h-7 w-7 inline-flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-[#0c0c0f] border-white/15 text-white text-[11px] backdrop-blur-xl shadow-2xl rounded-md"
                          >
                            <DropdownMenuItem
                              onClick={() => router.push(`/admin/pages/${page.slug}`)}
                              className="gap-2 focus:bg-white/10 text-[11px]"
                            >
                              <Edit2 className="h-3 w-3" />
                              <span>Edit Content Blocks</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={async () => {
                                const dup = await duplicatePage(page.id)
                                if (dup) toast.success(`Duplicated as "${dup.title}"`)
                              }}
                              className="gap-2 focus:bg-white/10 text-[11px]"
                            >
                              <Copy className="h-3 w-3" />
                              <span>Duplicate Page</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(page.slug === "home" ? "/" : `/${page.slug}`, "_blank")
                              }
                              className="gap-2 focus:bg-white/10 text-[11px]"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Open Live Public View</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                              onClick={async () => {
                                const ok = await confirmAction({
                                  title: `Delete "${page.title}"?`,
                                  text: "This will permanently remove this page and all its content blocks.",
                                  confirmText: "Yes, delete page",
                                })
                                if (ok) {
                                  await deletePage(page.id)
                                  toast.success("Page deleted")
                                }
                              }}
                              className="text-red-400 gap-2 focus:bg-red-500/20 focus:text-red-300 text-[11px]"
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
        <DialogContent className="max-w-md bg-[#0c0c0f] border-white/15 p-5 backdrop-blur-2xl rounded-xl text-[11px] shadow-2xl">
          <form onSubmit={handleCreateSubmit}>
            <DialogHeader>
              <DialogTitle className="text-sm font-semibold text-white">
                Create New CMS Page
              </DialogTitle>
              <DialogDescription className="text-white/50 text-[11px]">
                Define the page title, URL path, and initial status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-3 text-[11px]">
              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Page Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. AI Strategy Consulting"
                  className="h-8 rounded-md border-white/10 bg-black/60 text-white text-[11px]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">URL Slug</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-white/40 text-[11px]">/</span>
                  <Input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="ai-strategy"
                    className="pl-6 h-8 rounded-md border-white/10 bg-black/60 text-white text-[11px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Description (Optional)</label>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Internal summary or short intro..."
                  className="h-8 rounded-md border-white/10 bg-black/60 text-white text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as PageStatus)}
                  className="w-full h-8 rounded-md border border-white/10 bg-black/60 px-2.5 text-[11px] text-white focus:border-red-500/40 focus:outline-none"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Live Online)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <DialogFooter className="gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="h-7 px-3 text-[11px] rounded-md border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-glass-btn-accent"
              >
                Create Page
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
