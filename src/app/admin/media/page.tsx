"use client"

import { confirmAction } from "@/lib/sweet-alert"

import * as React from "react"
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Copy,
  Trash2,
  Search,
  Grid,
  List,
  Check,
  ExternalLink,
  Plus,
  Loader2,
  FolderOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCMSStore } from "@/hooks/use-cms-store"
import { MediaAsset } from "@/types/cms.types"
import { toast } from "sonner"

export default function MediaLibraryPage() {
  const { mediaAssets, addMediaAsset, deleteMediaAsset, updateMediaAsset, init } =
    useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterType, setFilterType] = React.useState<"all" | "image" | "video">("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  // Direct Upload State
  const [isUploading, setIsUploading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Alt Text Edit State
  const [editingAsset, setEditingAsset] = React.useState<MediaAsset | null>(null)
  const [editAltText, setEditAltText] = React.useState("")

  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.altText.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || asset.type === filterType
    return matchesSearch && matchesType
  })

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success("Media URL copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed")
      }

      const isVideo = file.type.startsWith("video")
      const format = file.name.split(".").pop()?.toUpperCase() || (isVideo ? "MP4" : "PNG")

      await addMediaAsset({
        name: file.name,
        url: data.url,
        altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        type: isVideo ? "video" : "image",
        format,
        size: file.size,
        dimensions: isVideo ? "1920x1080" : "1920x1080",
      })

      toast.success(`Uploaded: ${file.name}`)
    } catch (err: unknown) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach((file) => handleFileUpload(file))
    }
  }

  const handleSaveAltText = async () => {
    if (!editingAsset) return
    await updateMediaAsset(editingAsset.id, { altText: editAltText })
    toast.success("Alt text updated")
    setEditingAsset(null)
  }

  return (
    <div className="space-y-4 font-[var(--font-poppins)]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/10 bg-[#0c0c0f] p-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[13px] font-semibold tracking-tight text-white">
              Media Asset Library
            </h1>
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] px-1.5 py-0 rounded-md">
              {mediaAssets.length} Assets
            </Badge>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">
            Central repository for images, video loops, banners, and logos with instant upload.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="admin-glass-btn-accent"
          >
            {isUploading ? (
              <Loader2 className="h-3 w-3 animate-spin text-red-300" />
            ) : (
              <Upload className="h-3 w-3 text-red-300" />
            )}
            <span className="text-[10px]">Upload Media</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                Array.from(e.target.files).forEach((f) => handleFileUpload(f))
              }
            }}
          />
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border border-dashed p-3.5 text-center transition-all ${
          dragActive
            ? "border-red-500/50 bg-red-500/[0.04] shadow-lg"
            : "border-white/15 bg-[#0c0c0f] hover:border-red-500/40 hover:bg-white/[0.02]"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-1.5">
          <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/70">
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
            ) : (
              <Upload className="h-3.5 w-3.5 text-white/70" />
            )}
          </div>
          <div>
            <p className="text-[11px] font-medium text-white">
              Drop images or video loops here to upload
            </p>
            <p className="text-[9px] text-white/40 mt-0.5">
              Supports PNG, JPG, WebP, SVG, and MP4 videos up to 100MB
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0c0c0f] p-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1.5 h-3 w-3 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assets by filename or alt text..."
            className="pl-7 h-6 rounded-md border-white/10 bg-black/60 text-[10px] placeholder:text-[10px] text-white placeholder:text-white/30 focus:border-red-500/40"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Type Filters */}
          <div className="flex items-center rounded-md border border-white/10 bg-black/60 p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "image", label: "Images" },
              { id: "video", label: "Videos" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilterType(id as any)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                  filterType === id
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-md border border-white/10 bg-black/60 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded transition-all ${
                viewMode === "grid"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <Grid className="h-3 w-3" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded transition-all ${
                viewMode === "list"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <List className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Asset Grid / List Display */}
      {filteredAssets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#0c0c0f] p-10 text-center space-y-2">
          <FolderOpen className="mx-auto h-7 w-7 text-white/30" />
          <h3 className="text-xs font-semibold text-white">No media files found</h3>
          <p className="text-[11px] text-white/40">Try adjusting your search or upload a new asset above.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredAssets.map((asset) => {
            const isVideo = asset.type === "video"

            return (
              <div
                key={asset.id}
                className="group relative rounded-xl border border-white/10 bg-[#0c0c0f] overflow-hidden shadow-md transition-all hover:border-white/20"
              >
                {/* Media Preview Window */}
                <div className="relative aspect-video w-full bg-black/80 overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <video
                      src={asset.url}
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                      onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset.url}
                      alt={asset.altText}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-[10px] uppercase text-white/80 border border-white/10">
                      {isVideo ? (
                        <Video className="h-2.5 w-2.5 text-white/70" />
                      ) : (
                        <ImageIcon className="h-2.5 w-2.5 text-white/70" />
                      )}
                      {asset.format}
                    </span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="h-8 w-8 rounded-lg bg-black/80 border border-white/20 text-white hover:bg-white hover:text-black"
                      title="Copy URL"
                    >
                      {copiedId === asset.id ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="h-8 w-8 rounded-lg bg-black/80 border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={async () => {
                        const ok = await confirmAction({
                          title: `Delete "${asset.name}"?`,
                          text: "This file will be permanently removed from your media library.",
                          confirmText: "Yes, delete asset",
                        })
                        if (ok) {
                          await deleteMediaAsset(asset.id)
                          toast.success("Asset removed from library")
                        }
                      }}
                      className="h-8 w-8 rounded-lg bg-black/80 border border-white/20 text-red-400 hover:bg-red-500 hover:text-white"
                      title="Delete asset"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate max-w-[140px]">
                      {asset.name}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {Math.round(asset.size / 1024)} KB
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setEditingAsset(asset)
                      setEditAltText(asset.altText)
                    }}
                    className="cursor-pointer text-[11px] text-white/50 truncate hover:text-white transition-colors"
                    title="Click to edit alt text"
                  >
                    Alt: {asset.altText || "(empty)"}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="rounded-2xl border border-white/10 bg-[#0d0d10] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-white/40 text-[10px] uppercase">
              <tr>
                <th className="p-3 pl-4">Asset</th>
                <th className="p-3">Type</th>
                <th className="p-3">Size</th>
                <th className="p-3">Alt Text</th>
                <th className="p-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 pl-4 flex items-center gap-3">
                    <div className="h-8 w-12 rounded bg-black/60 overflow-hidden flex items-center justify-center shrink-0">
                      {asset.type === "video" ? (
                        <Video className="h-4 w-4 text-white/60" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={asset.url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="font-semibold text-white truncate max-w-[200px]">
                      {asset.name}
                    </span>
                  </td>
                  <td className="p-3 text-white/50 uppercase">{asset.format}</td>
                  <td className="p-3 text-white/50">{Math.round(asset.size / 1024)} KB</td>
                  <td className="p-3 text-white/50 truncate max-w-[220px]">
                    {asset.altText}
                  </td>
                  <td className="p-3 text-right pr-4 space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="h-7 w-7 text-white/60 hover:text-white"
                    >
                      {copiedId === asset.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={async () => {
                        const ok = await confirmAction({
                          title: `Delete "${asset.name}"?`,
                          text: "This file will be permanently removed from your media library.",
                          confirmText: "Yes, delete asset",
                        })
                        if (ok) {
                          await deleteMediaAsset(asset.id)
                          toast.success("Asset deleted")
                        }
                      }}
                      className="h-7 w-7 text-white/40 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Alt Text Dialog */}
      <Dialog open={!!editingAsset} onOpenChange={(open) => !open && setEditingAsset(null)}>
        <DialogContent className="max-w-md bg-[#0c0c0f] border-white/15 p-5 backdrop-blur-2xl rounded-xl text-[11px] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-white">
              Edit Asset Accessibility
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-3">
            <div className="space-y-1">
              <label className="text-white/50 text-[10px] uppercase font-medium">Asset File Name</label>
              <div className="text-white font-medium text-[11px] truncate">{editingAsset?.name}</div>
            </div>

            <div className="space-y-1">
              <label className="text-white/50 text-[10px] uppercase font-medium">Alt Text / Description</label>
              <Input
                value={editAltText}
                onChange={(e) => setEditAltText(e.target.value)}
                placeholder="Accessible description for screen readers and SEO"
                className="h-8 rounded-md border-white/10 bg-black/60 text-white text-[11px]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 mt-2">
            <button
              type="button"
              onClick={() => setEditingAsset(null)}
              className="h-7 px-3 text-[11px] rounded-md border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAltText}
              className="admin-glass-btn-accent"
            >
              Save Alt Text
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
