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
  const { pages, createPage, deletePage, duplicatePage } = useCMSStore()

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

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newSlug) {
      toast.error("Title and slug are required")
      return
    }

    const created = createPage({
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

  const handleBatchDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} pages?`)) {
      selectedIds.forEach((id) => deletePage(id))
      toast.success(`${selectedIds.length} pages deleted`)
      setSelectedIds([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            PAGE MANAGER
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Author, reorder, and configure blocks across all public routes.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2 font-mono text-xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Page</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs font-mono"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card p-1 text-xs font-mono">
            {(["all", "published", "draft", "archived"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded capitalize transition-all ${
                  statusFilter === st
                    ? "bg-foreground text-background font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
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
              className="text-xs font-mono gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border border-border/70 bg-card/40 backdrop-blur-sm overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-border/60 bg-muted/40 uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-4 w-10">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {selectedIds.length === filteredPages.length &&
                  filteredPages.length > 0 ? (
                    <CheckSquare className="h-4 w-4 text-foreground" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="p-4">Title & Route</th>
              <th className="p-4">Status</th>
              <th className="p-4">Blocks</th>
              <th className="p-4">Author</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredPages.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No pages match your search criteria.
                </td>
              </tr>
            ) : (
              filteredPages.map((page) => {
                const isSelected = selectedIds.includes(page.id)
                return (
                  <tr
                    key={page.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      isSelected ? "bg-muted/20" : ""
                    }`}
                  >
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => toggleSelectOne(page.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-foreground" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {page.title}
                      </Link>
                      <div className="text-[10px] text-muted-foreground">
                        /{page.slug}
                      </div>
                    </td>
                    <td className="p-4">
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
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{page.blocks.length}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{page.author}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => router.push(`/admin/pages/${page.slug}`)}
                            className="gap-2"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span>Edit Builder</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const dup = duplicatePage(page.id)
                              if (dup) toast.success(`Duplicated as "${dup.title}"`)
                            }}
                            className="gap-2"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span>Duplicate Page</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(page.slug === "home" ? "/" : `/${page.slug}`, "_blank")
                            }
                            className="gap-2"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Open Public View</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm(`Delete "${page.title}"?`)) {
                                deletePage(page.id)
                                toast.success("Page deleted")
                              }
                            }}
                            className="text-destructive gap-2"
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

      {/* Create Page Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md font-mono">
          <form onSubmit={handleCreateSubmit}>
            <DialogHeader>
              <DialogTitle>CREATE NEW PAGE</DialogTitle>
              <DialogDescription>
                Define the title, URL path slug, and initial status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Page Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. AI Strategy Consulting"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">URL Slug</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">/</span>
                  <Input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="ai-strategy"
                    className="pl-6"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Description (Optional)</label>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Internal summary or short intro..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as PageStatus)}
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs font-mono"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Live)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Page</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

