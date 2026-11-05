"use client"

import { confirmAction } from "@/lib/sweet-alert"

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
      <div className="py-20 text-center space-y-3 font-[var(--font-poppins)]">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
          <Trash2 className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold text-white">Page Not Found</h2>
        <p className="text-xs text-white/40">
          No page matching slug &ldquo;{slug}&rdquo; exists in the CMS store.
        </p>
        <div className="pt-2">
          <Link href="/admin/pages">
            <button type="button" className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white border border-white/15 rounded-lg px-3 py-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Page Manager
            </button>
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
      name: `${selectedBlockType.charAt(0).toUpperCase() + selectedBlockType.slice(1)} Section`,
      visible: true,
    }

    if (selectedBlockType === "hero") {
      newBlockData = {
        ...newBlockData,
        title: "New Headline",
        subtitle: "High precision engineering and strategic brand systems.",
        badge: "Featured Section",
        primaryCtaText: "Get in touch",
        primaryCtaLink: "/contact",
        mediaUrl: "/videos/hero-system.mp4",
        mediaType: "video",
      }
    } else if (selectedBlockType === "features") {
      newBlockData = {
        ...newBlockData,
        heading: "Core Workflows & Capabilities",
        subheading: "Tailored to modern enterprise operations.",
        features: [
          {
            id: `f_${timestamp}_1`,
            icon: "Layers",
            title: "Modular Architecture",
            description: "Scalable systems built on modern cloud frameworks.",
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
        title: "Ready to discuss your requirements?",
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
    <div className="space-y-4 font-[var(--font-poppins)]">
      {/* Top Floating Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <Link href="/admin/pages">
            <button
              type="button"
              className="h-7 w-7 rounded-lg border border-white/10 bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-white">
                {page.title}
              </h1>
              <Badge
                className={`text-[9px] uppercase px-1.5 py-0.5 rounded-md font-normal ${
                  page.status === "published"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                {page.status}
              </Badge>
            </div>
            <p className="text-[10px] text-white/40 flex items-center gap-1 mt-0.5">
              <span>Path: /{page.slug === "home" ? "" : page.slug}</span>
              <a
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white inline-flex items-center"
              >
                <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
              </a>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Live Simulator Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="admin-glass-btn group hover:border-white/30"
              >
                <Eye className="h-2.5 w-2.5 text-white/50 group-hover:text-white transition-colors" />
                <span className="text-[10px]">Live Simulator</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl bg-[#09090c] border-white/10 p-5 backdrop-blur-xl">
              <SheetHeader className="mb-3">
                <SheetTitle className="text-xs tracking-wider uppercase text-white flex items-center gap-1.5 font-normal">
                  <Globe className="h-3.5 w-3.5 text-white/50" />
                  Simulator : /{page.slug}
                </SheetTitle>
              </SheetHeader>
              <LivePreviewDrawer page={page} />
            </SheetContent>
          </Sheet>

          <button
            type="button"
            onClick={handleSavePageMeta}
            className="admin-glass-btn group hover:border-red-500/50 hover:bg-red-500/10"
          >
            <Save className="h-2.5 w-2.5 text-red-400 group-hover:text-red-300 transition-colors" />
            <span className="text-[10px] text-white group-hover:text-red-200">Save Live</span>
          </button>
        </div>
      </div>

      {/* Main Tabbed Interface */}
      <Tabs defaultValue="blocks" className="space-y-4 text-xs">
        <TabsList className="bg-[#0c0c0f] border border-white/[0.08] rounded-lg p-0.5 h-8">
          <TabsTrigger
            value="blocks"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[11px] px-2.5 py-1"
          >
            <Layers className="h-3 w-3" />
            <span>Section Blocks ({page.blocks.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[11px] px-2.5 py-1"
          >
            <Globe className="h-3 w-3" />
            <span>SEO & OpenGraph</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[11px] px-2.5 py-1"
          >
            <Sliders className="h-3 w-3" />
            <span>Page Config</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: SECTION BLOCKS BUILDER */}
        <TabsContent value="blocks" className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-0.5">
            <p className="text-[11px] text-white/40">
              Compose this page by rearranging, toggling, or editing modular section blocks.
            </p>
            <button
              type="button"
              onClick={() => setIsAddBlockOpen(true)}
              className="inline-flex items-center gap-1 h-6 text-[10px] rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10 px-2 self-start sm:self-auto transition-colors"
            >
              <Plus className="h-2.5 w-2.5" />
              <span>Add New Section</span>
            </button>
          </div>

          {/* Block Cards List */}
          <div className="space-y-3">
            {page.blocks.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-white/10 bg-[#0c0c0f] p-8 text-center space-y-2">
                <Layers className="mx-auto h-6 w-6 text-white/30" />
                <h3 className="text-xs font-semibold text-white">No section blocks configured</h3>
                <p className="text-[10px] text-white/40 max-w-xs mx-auto">
                  Click below to add your first Hero, Feature Matrix, or Media block.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddBlockOpen(true)}
                  className="admin-glass-btn-accent"
                >
                  <Plus className="mr-1 h-3 w-3 inline text-red-300" />
                  <span className="text-[10.5px]">Add Block</span>
                </button>
              </div>
            ) : (
              page.blocks.map((block, index) => {
                const isFirst = index === 0
                const isLast = index === page.blocks.length - 1

                return (
                  <div
                    key={block.id}
                    className={`rounded-xl border transition-all duration-150 bg-[#0c0c0f] ${
                      block.visible
                        ? "border-white/[0.08] hover:border-white/15 shadow-sm"
                        : "border-white/5 opacity-50 bg-black/40"
                    }`}
                  >
                    {/* Block Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2.5 bg-white/[0.01]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-white/40">
                          <button
                            type="button"
                            disabled={isFirst}
                            onClick={() => handleMoveBlock(index, "up")}
                            className="h-5 w-5 flex items-center justify-center text-white/50 hover:text-white rounded disabled:opacity-20 transition-colors"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={isLast}
                            onClick={() => handleMoveBlock(index, "down")}
                            className="h-5 w-5 flex items-center justify-center text-white/50 hover:text-white rounded disabled:opacity-20 transition-colors"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0 text-[9px] uppercase text-white/70">
                            {block.type}
                          </span>
                          <span className="font-medium text-white text-[11px]">
                            {block.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-white/40 hidden sm:inline">
                            {block.visible ? "Active" : "Hidden"}
                          </span>
                          <Switch
                            checked={block.visible}
                            onCheckedChange={(checked) =>
                              updateBlock(page.id, block.id, { visible: checked })
                            }
                          />
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            const ok = await confirmAction({
                              title: `Remove block "${block.name}"?`,
                              text: "This block will be removed from this page.",
                              confirmText: "Yes, remove block",
                            })
                            if (ok) {
                              removeBlock(page.id, block.id)
                              toast.success("Block removed")
                            }
                          }}
                          className="h-6 w-6 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Block Fields Editor */}
                    <div className="p-3.5 space-y-3 text-[11px]">
                      {/* HERO BLOCK */}
                      {block.type === "hero" && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Badge Text</label>
                            <Input
                              value={block.badge || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { badge: e.target.value })
                              }
                              placeholder="e.g. AI Automation / Intelligent Operations"
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Headline</label>
                            <Input
                              value={block.title || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { title: e.target.value })
                              }
                              placeholder="Main Hero Title"
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Subtitle</label>
                            <textarea
                              value={block.subtitle || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { subtitle: e.target.value })
                              }
                              rows={2}
                              className="w-full rounded-lg border border-white/10 bg-black/60 p-2 text-xs text-white focus:border-white/20 focus:outline-none"
                              placeholder="Hero description"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Primary CTA Text</label>
                            <Input
                              value={block.primaryCtaText || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { primaryCtaText: e.target.value })
                              }
                              placeholder="e.g. Start a Project"
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Primary CTA Link</label>
                            <Input
                              value={block.primaryCtaLink || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { primaryCtaLink: e.target.value })
                              }
                              placeholder="e.g. /contact"
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>

                          {/* HERO MEDIA UPLOAD */}
                          <div className="sm:col-span-2 pt-2 border-t border-white/[0.08] space-y-3">
                            <MediaUploadField
                              label="Main Hero Background Media (Video loop or Image)"
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
                              placeholder="/videos/ruNWMG1hPz7eOeYESQefyP03dc.mp4 or image URL..."
                            />

                            <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] space-y-2.5">
                              <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider block">
                                Top Bullet Categories (3 items)
                              </span>
                              <div className="grid sm:grid-cols-3 gap-2">
                                <Input
                                  value={block.eyebrow1 || ""}
                                  onChange={(e) => updateBlock(page.id, block.id, { eyebrow1: e.target.value })}
                                  placeholder="/ Business Software"
                                  className="h-7 text-[11px] bg-black/60 border-white/10"
                                />
                                <Input
                                  value={block.eyebrow2 || ""}
                                  onChange={(e) => updateBlock(page.id, block.id, { eyebrow2: e.target.value })}
                                  placeholder="/ Web Platforms"
                                  className="h-7 text-[11px] bg-black/60 border-white/10"
                                />
                                <Input
                                  value={block.eyebrow3 || ""}
                                  onChange={(e) => updateBlock(page.id, block.id, { eyebrow3: e.target.value })}
                                  placeholder="/ Digital Growth"
                                  className="h-7 text-[11px] bg-black/60 border-white/10"
                                />
                              </div>
                            </div>

                            <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] space-y-2.5">
                              <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider block">
                                Floating Contact Video Card
                              </span>
                              <div className="grid sm:grid-cols-2 gap-2">
                                <Input
                                  value={block.videoCardTitle || ""}
                                  onChange={(e) => updateBlock(page.id, block.id, { videoCardTitle: e.target.value })}
                                  placeholder="Talk with Pix & Co"
                                  className="h-7 text-[11px] bg-black/60 border-white/10"
                                />
                                <Input
                                  value={block.videoCardSubtitle || ""}
                                  onChange={(e) => updateBlock(page.id, block.id, { videoCardSubtitle: e.target.value })}
                                  placeholder="BUSINESS SOLUTIONS"
                                  className="h-7 text-[11px] bg-black/60 border-white/10"
                                />
                              </div>
                              <MediaUploadField
                                label="Card Video Loop or Avatar"
                                value={block.videoCardMediaUrl}
                                onChange={(url) => updateBlock(page.id, block.id, { videoCardMediaUrl: url })}
                                mediaType="any"
                                placeholder="/videos/girl.mp4 or photo..."
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FEATURES BLOCK */}
                      {block.type === "features" && (
                        <div className="space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Eyebrow</label>
                              <Input
                                value={block.eyebrow || ""}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { eyebrow: e.target.value })
                                }
                                placeholder="e.g. What We Deliver"
                                className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Section Heading</label>
                              <Input
                                value={block.heading}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { heading: e.target.value })
                                }
                                className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                              />
                            </div>
                          </div>

                          {/* Repeating items */}
                          <div className="space-y-2 pt-1">
                            <div className="flex items-center justify-between">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">
                                Feature Items ({block.features.length})
                              </label>
                              <button
                                type="button"
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
                                className="h-6 text-[10px] rounded-md border border-white/15 text-white/80 hover:bg-white/10 px-2 transition-colors"
                              >
                                <Plus className="h-2.5 w-2.5 mr-1 inline" /> Add Feature
                              </button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-2.5">
                              {block.features.map((feat, fIdx) => (
                                <div
                                  key={feat.id}
                                  className="rounded-lg border border-white/10 bg-black/60 p-2.5 space-y-1.5"
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
                                      className="h-7 text-[11px] font-medium rounded border-white/10 bg-black/40 text-white"
                                      placeholder="Feature Title"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = block.features.filter((_, i) => i !== fIdx)
                                        updateBlock(page.id, block.id, { features: updated })
                                      }}
                                      className="h-6 w-6 flex items-center justify-center text-white/40 hover:text-red-400 ml-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
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
                                    className="w-full rounded border border-white/10 bg-black/40 p-1.5 text-[10px] text-white/70 focus:border-white/20 focus:outline-none"
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
                        <div className="space-y-2.5">
                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Headline</label>
                            <Input
                              value={block.headline || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { headline: e.target.value })
                              }
                              placeholder="Section Heading"
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Content</label>
                            <textarea
                              value={block.content}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { content: e.target.value })
                              }
                              rows={5}
                              className="w-full rounded-lg border border-white/10 bg-black/60 p-2.5 text-xs text-white focus:border-white/20 focus:outline-none leading-relaxed"
                              placeholder="Write your editorial copy..."
                            />
                          </div>
                        </div>
                      )}

                      {/* MEDIA BLOCK WITH UPLOAD */}
                      {block.type === "media" && (
                        <div className="space-y-3">
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

                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Caption</label>
                              <Input
                                value={block.caption || ""}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, { caption: e.target.value })
                                }
                                placeholder="Optional description or credit"
                                className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Aspect Ratio</label>
                              <select
                                value={block.aspectRatio || "16:9"}
                                onChange={(e) =>
                                  updateBlock(page.id, block.id, {
                                    aspectRatio: e.target.value as any,
                                  })
                                }
                                className="w-full h-8 rounded-lg border border-white/10 bg-black/60 px-2 text-xs text-white focus:border-white/20 focus:outline-none"
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
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">
                              Metric Counters
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [
                                  ...block.stats,
                                  { id: `s_${Date.now()}`, value: "100%", label: "Metric" },
                                ]
                                updateBlock(page.id, block.id, { stats: updated })
                              }}
                              className="h-6 text-[10px] rounded-md border border-white/15 text-white/80 hover:bg-white/10 px-2"
                            >
                              <Plus className="h-2.5 w-2.5 mr-1 inline" /> Add Counter
                            </button>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-2.5">
                            {block.stats.map((st, sIdx) => (
                              <div
                                key={st.id}
                                className="rounded-lg border border-white/10 bg-black/60 p-2.5 space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] text-white/40">#{sIdx + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = block.stats.filter((_, i) => i !== sIdx)
                                      updateBlock(page.id, block.id, { stats: updated })
                                    }}
                                    className="h-5 w-5 flex items-center justify-center text-white/40 hover:text-red-400"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
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
                                  className="h-7 font-bold text-white bg-black/40 border-white/10 rounded text-xs"
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
                                  className="h-7 text-[10px] text-white/70 bg-black/40 border-white/10 rounded"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FAQ BLOCK */}
                      {block.type === "faq" && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">FAQ Section Title</label>
                            <Input
                              value={block.heading}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { heading: e.target.value })
                              }
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">
                                Questions & Answers ({block.items.length})
                              </label>
                              <button
                                type="button"
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
                                className="h-6 text-[10px] rounded-md border border-white/15 text-white/80 hover:bg-white/10 px-2"
                              >
                                <Plus className="h-2.5 w-2.5 mr-1 inline" /> Add FAQ
                              </button>
                            </div>

                            <div className="space-y-2">
                              {block.items.map((item, qIdx) => (
                                <div
                                  key={item.id}
                                  className="rounded-lg border border-white/10 bg-black/60 p-2.5 space-y-1.5"
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
                                      className="h-7 text-[11px] font-medium text-white bg-black/40 border-white/10 rounded"
                                      placeholder="Question title"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = block.items.filter((_, i) => i !== qIdx)
                                        updateBlock(page.id, block.id, { items: updated })
                                      }}
                                      className="h-6 w-6 flex items-center justify-center text-white/40 hover:text-red-400 ml-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
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
                                    className="w-full rounded border border-white/10 bg-black/40 p-1.5 text-[10px] text-white/70 focus:border-white/20 focus:outline-none"
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
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Headline</label>
                            <Input
                              value={block.title}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { title: e.target.value })
                              }
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Description</label>
                            <Input
                              value={block.description || ""}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { description: e.target.value })
                              }
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Button Text</label>
                            <Input
                              value={block.buttonText}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { buttonText: e.target.value })
                              }
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Button Link</label>
                            <Input
                              value={block.buttonLink}
                              onChange={(e) =>
                                updateBlock(page.id, block.id, { buttonLink: e.target.value })
                              }
                              className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
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
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 space-y-4 shadow-sm">
            <div>
              <h2 className="text-xs font-semibold uppercase text-white tracking-wider flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-white/50" />
                SEO Metadata & Social Previews
              </h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                Configure browser tab titles, search engine descriptions, and social share banners.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Meta Title</label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Pix & Co — Business Software"
                  className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-black/60 p-2 text-xs text-white focus:border-white/20 focus:outline-none"
                  placeholder="Appears in Google search snippets..."
                />
              </div>

              {/* Social OG Image Upload */}
              <div className="pt-1">
                <MediaUploadField
                  label="OpenGraph Social Share Image (1200x630)"
                  value={ogImage}
                  onChange={(url) => setOgImage(url)}
                  mediaType="image"
                  placeholder="/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="space-y-0.5">
                  <div className="font-medium text-white text-[11px]">Search Engine Indexing</div>
                  <div className="text-[10px] text-white/40">
                    Instruct crawlers not to index this page (noindex tag).
                  </div>
                </div>
                <Switch checked={noIndex} onCheckedChange={setNoIndex} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSavePageMeta}
              className="admin-glass-btn-accent"
            >
              <Save className="mr-1 h-3 w-3 inline text-red-300" />
              <span className="text-[10.5px]">Save SEO Settings</span>
            </button>
          </div>
        </TabsContent>

        {/* TAB 3: PAGE CONFIG */}
        <TabsContent value="settings">
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 space-y-4 shadow-sm">
            <div>
              <h2 className="text-xs font-semibold uppercase text-white tracking-wider flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-white/50" />
                Page Identity & Routing Configuration
              </h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                Manage publication status, internal description, and custom URL slug.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Page Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">URL Slug</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-white/40 text-xs">/</span>
                  <Input
                    value={pageSlug}
                    onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="pl-5 h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Publication Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PageStatus)}
                  className="w-full h-8 rounded-lg border border-white/10 bg-black/60 px-2.5 text-xs text-white focus:border-white/20 focus:outline-none"
                >
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="published">Published (Live Online)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-white/40 uppercase text-[9px] font-medium tracking-wider">Internal Description / Notes</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief internal note regarding this page..."
                  className="h-8 rounded-lg border-white/10 bg-black/60 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSavePageMeta}
              className="admin-glass-btn-accent"
            >
              <Save className="mr-1 h-3 w-3 inline text-red-300" />
              <span className="text-[10.5px]">Save Configuration</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Block Modal */}
      <Dialog open={isAddBlockOpen} onOpenChange={setIsAddBlockOpen}>
        <DialogContent className="max-w-md bg-[#0c0c0f] border-white/15 p-5 backdrop-blur-xl rounded-xl shadow-2xl text-xs font-[var(--font-poppins)]">
          <DialogHeader>
            <DialogTitle className="text-xs tracking-wider uppercase text-white flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Insert Section Block
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2.5 py-3">
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
                className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                  selectedBlockType === item.type
                    ? "border-white/40 bg-white/10 font-semibold text-white"
                    : "border-white/10 bg-black/60 hover:border-white/20 hover:bg-white/5 text-white/60"
                }`}
              >
                <span className="text-white text-[11px] font-medium">{item.label}</span>
                <span className="text-[9px] text-white/40 mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => setIsAddBlockOpen(false)}
              className="h-7 px-3 text-[11px] rounded-md border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateBlock}
              className="admin-glass-btn-accent"
            >
              Insert Block
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
