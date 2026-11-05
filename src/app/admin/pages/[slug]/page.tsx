"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Eye,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  ExternalLink,
  Globe,
  Sliders,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCMSStore } from "@/hooks/use-cms-store"
import { BlockType, PageBlock, PageStatus } from "@/types/cms.types"
import { LivePreviewDrawer } from "@/components/cms/live-preview-drawer"
import { MediaUploadField } from "@/components/cms/media-upload-field"
import { toast } from "sonner"

export default function PageEditorPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const {
    pages,
    getPageBySlug,
    updatePage,
    addBlock,
    updateBlock,
    removeBlock,
    reorderBlocks,
    init,
  } = useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const page = getPageBySlug(slug)

  // Form states for general info & meta
  const [title, setTitle] = React.useState("")
  const [pageSlug, setPageSlug] = React.useState("")
  const [status, setStatus] = React.useState<PageStatus>("draft")
  const [description, setDescription] = React.useState("")

  // Meta states
  const [metaTitle, setMetaTitle] = React.useState("")
  const [metaDescription, setMetaDescription] = React.useState("")
  const [ogImage, setOgImage] = React.useState("")
  const [noIndex, setNoIndex] = React.useState(false)

  // Block modal state
  const [isAddBlockOpen, setIsAddBlockOpen] = React.useState(false)
  const [selectedBlockType, setSelectedBlockType] = React.useState<BlockType>("hero")

  // Sync state when page loads
  React.useEffect(() => {
    if (page) {
      setTitle(page.title)
      setPageSlug(page.slug)
      setStatus(page.status)
      setDescription(page.description || "")
      setMetaTitle(page.meta.metaTitle)
      setMetaDescription(page.meta.metaDescription)
      setOgImage(page.meta.ogImage || "")
      setNoIndex(page.meta.noIndex || false)
    }
  }, [page])

  if (!page) {
    return (
      <div className="py-24 text-center font-mono space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
          <Trash2 className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-white/50">
          No page matching slug &ldquo;{slug}&rdquo; exists in the CMS store.
        </p>
        <div className="pt-2">
          <Link href="/admin/pages">
            <Button variant="outline" size="sm" className="font-mono text-xs border-white/15 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Page Manager
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSavePageMeta = async () => {
    await updatePage(page.id, {
      title,
      slug: pageSlug,
      status,
      description,
      meta: {
        metaTitle,
        metaDescription,
        ogImage,
        noIndex,
      },
    })
    toast.success("Page settings & meta saved live")
    if (pageSlug !== slug) {
      router.push(`/admin/pages/${pageSlug}`)
    }
  }

  const handleCreateBlock = async () => {
    const timestamp = Date.now()
    let newBlockData: any = {
      id: `blk_${selectedBlockType}_${timestamp}`,
      type: selectedBlockType,
      name: `${selectedBlockType.toUpperCase()} Section`,
      visible: true,
    }

    if (selectedBlockType === "hero") {
      newBlockData = {
        ...newBlockData,
        title: "NEW HERO TITLE",
        subtitle: "High precision engineering and strategic brand systems.",
        badge: "FEATURED / ACTIVE",
        primaryCtaText: "Get in touch",
        primaryCtaLink: "/contact",
        mediaUrl: "/videos/hero-system.mp4",
        mediaType: "video",
      }
    } else if (selectedBlockType === "features") {
      newBlockData = {
        ...newBlockData,
        heading: "CORE WORKFLOWS & CAPABILITIES",
        subheading: "Tailored to modern enterprise operations.",
        features: [
          {
            id: `f_${timestamp}_1`,
            icon: "Layers",
            title: "Modular Architecture",
            description: "Scalable systems built on modern cloud frameworks.",
          },
          {
            id: `f_${timestamp}_2`,
            icon: "Sparkles",
            title: "Real-time Intelligence",
            description: "Instant data flows and predictive operational automation.",
          },
        ],
      }
    } else if (selectedBlockType === "richtext") {
      newBlockData = {
        ...newBlockData,
        headline: "Editorial Headline",
        content: "Write detailed page copy or formatted markdown content here.",
      }
    } else if (selectedBlockType === "media") {
      newBlockData = {
        ...newBlockData,
        caption: "System architectural schematic",
        mediaUrl: "/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg",
        mediaType: "image",
        aspectRatio: "16:9",
      }
    } else if (selectedBlockType === "stats") {
      newBlockData = {
        ...newBlockData,
        stats: [
          { id: `s_${timestamp}_1`, value: "99.9%", label: "Uptime" },
          { id: `s_${timestamp}_2`, value: "<15ms", label: "Latency" },
          { id: `s_${timestamp}_3`, value: "10+", label: "Years Experience" },
        ],
      }
    } else if (selectedBlockType === "faq") {
      newBlockData = {
        ...newBlockData,
        heading: "Frequently Asked Questions",
        items: [
          {
            id: `faq_${timestamp}_1`,
            question: "How do we get started?",
            answer: "Begin with a discovery call where we outline project specifications.",
          },
        ],
      }
    } else if (selectedBlockType === "cta") {
      newBlockData = {
        ...newBlockData,
        title: "Ready to discuss your enterprise requirements?",
        description: "Speak with our software engineers and digital architects.",
        buttonText: "Discuss a Project",
        buttonLink: "/contact",
      }
    }

    await addBlock(page.id, newBlockData)
    toast.success(`Added ${selectedBlockType} block`)
    setIsAddBlockOpen(false)
  }

  const handleMoveBlock = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= page.blocks.length) return

    await reorderBlocks(page.id, index, newIndex)
    toast.success("Block position updated")
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Floating Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d10] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl border-white/15 bg-black/40 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">
                {page.title}
              </h1>
              <Badge
                variant={
                  page.status === "published"
                    ? "success"
                    : page.status === "archived"
                    ? "destructive"
                    : "outline"
                }
                className="text-[10px] font-mono uppercase"
              >
                {page.status}
              </Badge>
            </div>
            <p className="text-xs font-mono text-white/40 flex items-center gap-1.5 mt-0.5">
              <span>Path: /{page.slug === "home" ? "" : page.slug}</span>
              <a
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white inline-flex items-center"
              >
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Live Simulator Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 font-mono text-xs rounded-full border-white/15 bg-white/5 text-white hover:bg-white/15 px-4"
              >
                <Eye className="h-3.5 w-3.5 text-white/70" />
                <span className="hidden sm:inline">Live Simulator</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-2xl bg-[#0a0a0d] border-white/15 p-6 backdrop-blur-2xl">
              <SheetHeader className="mb-4">
                <SheetTitle className="font-mono text-sm tracking-widest text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-white/60" />
                  PAGE SIMULATOR : /{page.slug}
                </SheetTitle>
              </SheetHeader>
              <LivePreviewDrawer page={page} />
            </SheetContent>
          </Sheet>

          <Button
            onClick={handleSavePageMeta}
            size="sm"
            className="h-9 gap-2 font-mono text-xs rounded-full bg-white text-black font-semibold hover:bg-white/90 px-5 shadow-lg"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Live</span>
          </Button>
        </div>
      </div>

      {/* Main Tabbed Interface */}
      <Tabs defaultValue="blocks" className="space-y-6 font-mono text-xs">
        <TabsList className="bg-[#0d0d10] border border-white/10 rounded-xl p-1">
          <TabsTrigger
            value="blocks"
            className="gap-2 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-lg text-xs"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Section Blocks ({page.blocks.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="gap-2 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-lg text-xs"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>SEO & OpenGraph</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-2 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-lg text-xs"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Page Config</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: SECTION BLOCKS BUILDER */}
        <TabsContent value="blocks" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <p className="text-xs text-white/50">
                Compose this page by rearranging, toggling, or editing modular section blocks.
              </p>
            </div>
            <Button
              onClick={() => setIsAddBlockOpen(true)}
              size="sm"
              className="gap-2 font-mono text-xs rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add New Section</span>
            </Button>
          </div>

          {/* Block Cards List */}
          <div className="space-y-4">
            {page.blocks.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-white/10 bg-[#0d0d10] p-12 text-center space-y-3">
                <Layers className="mx-auto h-8 w-8 text-white/30" />
                <h3 className="text-sm font-bold text-white">No section blocks configured</h3>
                <p className="text-xs text-white/40 max-w-sm mx-auto">
                  Click below to add your first Hero, Feature Matrix, or Media block.
                </p>
                <Button
                  onClick={() => setIsAddBlockOpen(true)}
                  size="sm"
                  className="rounded-full bg-white text-black font-semibold hover:bg-white/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Section Block
                </Button>
              </div>
            ) : (
              page.blocks.map((block, index) => {
                const isFirst = index === 0
                const isLast = index === page.blocks.length - 1

                return (
                  <div
                    key={block.id}
                    className={`rounded-2xl border transition-all duration-200 bg-[#0d0d10] ${
                      block.visible
                        ? "border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:border-white/20"
                        : "border-white/5 opacity-50 bg-black/40"
                    }`}
                  >
                    {/* Block Header */}
                    <div className="flex items-center justify-between border-b border-white/5 p-4 bg-white/[0.01]">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-white/40">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isFirst}
                            onClick={() => handleMoveBlock(index, "up")}
                            className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-20"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isLast}
                            onClick={() => handleMoveBlock(index, "down")}
                            className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-20"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-lg border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase text-white/80">
                            {block.type}
                          </span>
                          <span className="font-semibold text-white text-xs">
                            {block.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/50 hidden sm:inline">
                            {block.visible ? "Active" : "Hidden"}
                          </span>
                          <Switch
                            checked={block.visible}
                            onCheckedChange={(checked) =>
                              updateBlock(page.id, block.id, { visible: checked })
                            }
                          />
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm(`Remove block "${block.name}"?`)) {
                              removeBlock(page.id, block.id)
                              toast.success("Block removed")
                            }
                          }}
                          className="h-7 w-7 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Block Fields Editor */}
                    <div className="p-5 space-y-4 text-xs font-mono">
                      {/* HERO BLOCK */}
                      {block.type === "hero" && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-white/50 uppercase text-[11px]">Badge Text</label>
                            <Input
                              value={block.badge || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { badge: e.target.value })
                              }
                              placeholder="e.g. AI AUTOMATION / OPERATIONS"
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>

                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-white/50 uppercase text-[11px]">Headline</label>
                            <Input
                              value={block.title || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { title: e.target.value })
                              }
                              placeholder="Main Hero Title"
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>

                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-white/50 uppercase text-[11px]">Subtitle</label>
                            <textarea
                              value={block.subtitle || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { subtitle: e.target.value })
                              }
                              rows={3}
                              className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
                              placeholder="Hero description"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Primary CTA Text</label>
                            <Input
                              value={block.primaryCtaText || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { primaryCtaText: e.target.value })
                              }
                              placeholder="e.g. Start a Project"
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Primary CTA Link</label>
                            <Input
                              value={block.primaryCtaLink || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { primaryCtaLink: e.target.value })
                              }
                              placeholder="e.g. /contact"
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>

                          {/* HERO MEDIA UPLOAD */}
                          <div className="sm:col-span-2 pt-2 border-t border-white/5">
                            <MediaUploadField
                              label="Hero Media Asset (Background Video or Image)"
                              value={block.mediaUrl}
                              onChange={(url) => {
                                const isVid =
                                  url.endsWith(".mp4") ||
                                  url.endsWith(".webm") ||
                                  url.includes("/videos/")
                                updateBlock(page.id, block.id, {
                                  mediaUrl: url,
                                  mediaType: isVid ? "video" : "image",
                                })
                              }}
                              mediaType="any"
                              placeholder="/videos/hero-system.mp4 or /images/..."
                            />
                          </div>
                        </div>
                      )}

                      {/* FEATURES BLOCK */}
                      {block.type === "features" && (
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-white/50 uppercase text-[11px]">Eyebrow</label>
                              <Input
                                value={block.eyebrow || ""}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { eyebrow: e.target.value })
                                }
                                placeholder="e.g. WHAT WE DELIVER"
                                className="rounded-xl border-white/10 bg-black/60 text-white"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-white/50 uppercase text-[11px]">Section Heading</label>
                              <Input
                                value={block.heading}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { heading: e.target.value })
                                }
                                className="rounded-xl border-white/10 bg-black/60 text-white"
                              />
                            </div>
                          </div>

                          {/* Repeating items */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between">
                              <label className="text-white/50 uppercase text-[11px]">
                                Feature Items ({block.features.length})
                              </label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = [
                                    ...block.features,
                                    {
                                      id: `f_${Date.now()}`,
                                      icon: "Layers",
                                      title: "New Capability",
                                      description: "Workflow description.",
                                    },
                                  ]
                                  updateBlock(page.id, block.id, { features: updated })
                                }}
                                className="h-7 text-[10px] rounded-lg border-white/15 text-white/80 hover:bg-white/10"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Feature
                              </Button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                              {block.features.map((feat, fIdx) => (
                                <div
                                  key={feat.id}
                                  className="rounded-xl border border-white/10 bg-black/60 p-3 space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <Input
                                      value={feat.title}
                                      onChange={(e) => {
                                        const updated = [...block.features]
                                        const target = updated[fIdx]
                                        if (target) {
                                          target.title = e.target.value
                                          updateBlock(page.id, block.id, { features: updated })
                                        }
                                      }}
                                      className="h-7 text-xs font-semibold rounded-lg border-white/10 bg-black/40 text-white"
                                      placeholder="Feature Title"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const updated = block.features.filter((_, i) => i !== fIdx)
                                        updateBlock(page.id, block.id, { features: updated })
                                      }}
                                      className="h-7 w-7 text-white/40 hover:text-red-400 ml-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <textarea
                                    value={feat.description}
                                    onChange={(e) => {
                                      const updated = [...block.features]
                                      const target = updated[fIdx]
                                      if (target) {
                                        target.description = e.target.value
                                        updateBlock(page.id, block.id, { features: updated })
                                      }
                                    }}
                                    rows={2}
                                    className="w-full rounded-lg border border-white/10 bg-black/40 p-2 text-[11px] text-white/80 focus:border-white/30 focus:outline-none"
                                    placeholder="Feature description"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* RICHTEXT BLOCK */}
                      {block.type === "richtext" && (
                        <div className="space-y-3">
                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Headline</label>
                            <Input
                              value={block.headline || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { headline: e.target.value })
                              }
                              placeholder="Section Heading"
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Content (Markdown / Multi-paragraph)</label>
                            <textarea
                              value={block.content}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { content: e.target.value })
                              }
                              rows={6}
                              className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs font-mono text-white focus:border-white/30 focus:outline-none leading-relaxed"
                              placeholder="Write your editorial copy..."
                            />
                          </div>
                        </div>
                      )}

                      {/* MEDIA BLOCK WITH UPLOAD */}
                      {block.type === "media" && (
                        <div className="space-y-4">
                          <MediaUploadField
                            label="Media Asset (Image or Video)"
                            value={block.mediaUrl}
                            onChange={(url) => {
                              const isVid =
                                url.endsWith(".mp4") ||
                                url.endsWith(".webm") ||
                                url.includes("/videos/")
                              updateBlock(page.id, block.id, {
                                mediaUrl: url,
                                mediaType: isVid ? "video" : "image",
                              })
                            }}
                            mediaType="any"
                            placeholder="/images/... or /videos/..."
                          />

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-white/50 uppercase text-[11px]">Caption</label>
                              <Input
                                value={block.caption || ""}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { caption: e.target.value })
                                }
                                placeholder="Optional description or credit"
                                className="rounded-xl border-white/10 bg-black/60 text-white"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-white/50 uppercase text-[11px]">Aspect Ratio</label>
                              <select
                                value={block.aspectRatio || "16:9"}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, {
                                    aspectRatio: e.target.value as any,
                                  })
                                }
                                className="w-full rounded-xl border border-white/10 bg-black/60 p-2 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
                              >
                                <option value="16:9">16:9 Landscape</option>
                                <option value="4:3">4:3 Standard</option>
                                <option value="1:1">1:1 Square</option>
                                <option value="auto">Auto Native</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STATS BLOCK */}
                      {block.type === "stats" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-white/50 uppercase text-[11px]">
                              Key Metric Counters
                            </label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [
                                  ...block.stats,
                                  { id: `s_${Date.now()}`, value: "100%", label: "Metric" },
                                ]
                                updateBlock(page.id, block.id, { stats: updated })
                              }}
                              className="h-7 text-[10px] rounded-lg border-white/15 text-white/80 hover:bg-white/10"
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add Counter
                            </Button>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-3">
                            {block.stats.map((st, sIdx) => (
                              <div
                                key={st.id}
                                className="rounded-xl border border-white/10 bg-black/60 p-3 space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-white/40">#{sIdx + 1}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const updated = block.stats.filter((_, i) => i !== sIdx)
                                      updateBlock(page.id, block.id, { stats: updated })
                                    }}
                                    className="h-6 w-6 text-white/40 hover:text-red-400"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Input
                                  value={st.value}
                                  onChange={(e) => {
                                    const updated = [...block.stats]
                                    const target = updated[sIdx]
                                    if (target) {
                                      target.value = e.target.value
                                      updateBlock(page.id, block.id, { stats: updated })
                                    }
                                  }}
                                  placeholder="e.g. 10+"
                                  className="h-8 font-bold text-white bg-black/40 border-white/10 rounded-lg"
                                />
                                <Input
                                  value={st.label}
                                  onChange={(e) => {
                                    const updated = [...block.stats]
                                    const target = updated[sIdx]
                                    if (target) {
                                      target.label = e.target.value
                                      updateBlock(page.id, block.id, { stats: updated })
                                    }
                                  }}
                                  placeholder="e.g. Years Experience"
                                  className="h-7 text-[11px] text-white/70 bg-black/40 border-white/10 rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FAQ BLOCK */}
                      {block.type === "faq" && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">FAQ Section Title</label>
                            <Input
                              value={block.heading}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { heading: e.target.value })
                              }
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-white/50 uppercase text-[11px]">
                                Questions & Answers ({block.items.length})
                              </label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = [
                                    ...block.items,
                                    {
                                      id: `faq_${Date.now()}`,
                                      question: "New Question?",
                                      answer: "Detailed answer explaining process or details.",
                                    },
                                  ]
                                  updateBlock(page.id, block.id, { items: updated })
                                }}
                                className="h-7 text-[10px] rounded-lg border-white/15 text-white/80 hover:bg-white/10"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add FAQ
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {block.items.map((item, qIdx) => (
                                <div
                                  key={item.id}
                                  className="rounded-xl border border-white/10 bg-black/60 p-4 space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <Input
                                      value={item.question}
                                      onChange={(e) => {
                                        const updated = [...block.items]
                                        const target = updated[qIdx]
                                        if (target) {
                                          target.question = e.target.value
                                          updateBlock(page.id, block.id, { items: updated })
                                        }
                                      }}
                                      className="h-8 font-semibold text-white bg-black/40 border-white/10 rounded-lg"
                                      placeholder="Question title"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const updated = block.items.filter((_, i) => i !== qIdx)
                                        updateBlock(page.id, block.id, { items: updated })
                                      }}
                                      className="h-7 w-7 text-white/40 hover:text-red-400 ml-2"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                  <textarea
                                    value={item.answer}
                                    onChange={(e) => {
                                      const updated = [...block.items]
                                      const target = updated[qIdx]
                                      if (target) {
                                        target.answer = e.target.value
                                        updateBlock(page.id, block.id, { items: updated })
                                      }
                                    }}
                                    rows={2}
                                    className="w-full rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs text-white/80 focus:border-white/30 focus:outline-none"
                                    placeholder="Answer explanation"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTA BLOCK */}
                      {block.type === "cta" && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-white/50 uppercase text-[11px]">Headline</label>
                            <Input
                              value={block.title}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { title: e.target.value })
                              }
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-white/50 uppercase text-[11px]">Description</label>
                            <Input
                              value={block.description || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { description: e.target.value })
                              }
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Button Text</label>
                            <Input
                              value={block.buttonText}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { buttonText: e.target.value })
                              }
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-white/50 uppercase text-[11px]">Button Link</label>
                            <Input
                              value={block.buttonLink}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { buttonLink: e.target.value })
                              }
                              className="rounded-xl border-white/10 bg-black/60 text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </TabsContent>

        {/* TAB 2: SEO & OPENGRAPH */}
        <TabsContent value="seo">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div>
              <h2 className="text-sm font-semibold uppercase text-white tracking-wider flex items-center gap-2">
                <Globe className="h-4 w-4 text-white/70" />
                SEO Metadata & Social Previews
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Configure browser tab titles, search engine descriptions, and social share banners.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[11px]">Meta Title</label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Pix & Co — Business Software"
                  className="rounded-xl border-white/10 bg-black/60 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[11px]">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
                  placeholder="Appears in Google search snippets..."
                />
              </div>

              {/* Social OG Image Upload */}
              <div className="pt-2">
                <MediaUploadField
                  label="OpenGraph Social Share Image (1200x630)"
                  value={ogImage}
                  onChange={(url) => setOgImage(url)}
                  mediaType="image"
                  placeholder="/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Search Engine Indexing</div>
                  <div className="text-[11px] text-white/50">
                    Instruct crawlers not to index this page (noindex tag).
                  </div>
                </div>
                <Switch checked={noIndex} onCheckedChange={setNoIndex} />
              </div>
            </div>

            <Button
              onClick={handleSavePageMeta}
              className="rounded-full bg-white text-black font-semibold hover:bg-white/90 px-6"
            >
              Save SEO Settings
            </Button>
          </div>
        </TabsContent>

        {/* TAB 3: PAGE CONFIG */}
        <TabsContent value="settings">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div>
              <h2 className="text-sm font-semibold uppercase text-white tracking-wider flex items-center gap-2">
                <Sliders className="h-4 w-4 text-white/70" />
                Page Identity & Routing Configuration
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Manage publication status, internal description, and custom URL slug.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/50 uppercase text-[11px]">Page Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border-white/10 bg-black/60 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[11px]">URL Slug</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-white/40">/</span>
                  <Input
                    value={pageSlug}
                    onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="pl-6 rounded-xl border-white/10 bg-black/60 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[11px]">Publication Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PageStatus)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
                >
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="published">Published (Live Online)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/50 uppercase text-[11px]">Internal Description / Notes</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief internal note regarding this page..."
                  className="rounded-xl border-white/10 bg-black/60 text-white"
                />
              </div>
            </div>

            <Button
              onClick={handleSavePageMeta}
              className="rounded-full bg-white text-black font-semibold hover:bg-white/90 px-6"
            >
              Save Configuration
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Block Modal */}
      <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
        <DialogContent className="max-w-lg bg-[#0e0e12] border-white/15 p-6 backdrop-blur-2xl rounded-2xl shadow-2xl font-mono text-xs">
          <DialogHeader>
            <DialogTitle className="text-sm tracking-wider uppercase text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              INSERT SECTION BLOCK
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {[
              { type: "hero", label: "Hero Block", desc: "Badge, title, CTAs, media upload" },
              { type: "features", label: "Feature Matrix", desc: "Multi-item capability grid" },
              { type: "richtext", label: "Editorial Text", desc: "Multi-paragraph markdown" },
              { type: "media", label: "Media Showcase", desc: "Single image or video embed" },
              { type: "stats", label: "Metric Counters", desc: "Key numerical achievements" },
              { type: "faq", label: "FAQ Accordion", desc: "Question & answer accordion" },
              { type: "cta", label: "Conversion CTA", desc: "Bottom action banner" },
            ].map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => setSelectedBlockType(item.type as BlockType)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                  selectedBlockType === item.type
                    ? "border-white/40 bg-white/10 font-semibold text-white"
                    : "border-white/10 bg-black/60 hover:border-white/25 hover:bg-white/5 text-white/60"
                }`}
              >
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-[10px] text-white/40 mt-1">{item.desc}</span>
              </button>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddBlockOpen(false)}
              className="rounded-xl border-white/10 text-white/70 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBlock}
              className="rounded-xl bg-white text-black font-semibold hover:bg-white/90"
            >
              Insert Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
