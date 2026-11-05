"use client"

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
  Sparkles,
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
  const { mediaAssets, addMediaAsset, deleteMediaAsset, updateMediaAsset } =
    useCMSStore()

  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterType, setFilterType] = React.useState<"all" | "image" | "video">("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [selectedAsset, setSelectedAsset] = React.useState<MediaAsset | null>(null)
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

      addMediaAsset({
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

  const handleSaveAltText = () => {
    if (!editingAsset) return
    updateMediaAsset(editingAsset.id, { altText: editAltText })
    toast.success("Alt text updated")
    setEditingAsset(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-sky-500/20 bg-slate-950/70 p-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              MEDIA ASSET LIBRARY
            </h1>
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px] font-mono">
              {mediaAssets.length} Assets
            </Badge>
          </div>
          <p className="text-xs text-white/50 font-mono mt-1">
            Central repository for images, video loops, banners, and logos with instant upload.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="gap-2 font-mono text-xs rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 hover:to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>Upload Media</span>
          </Button>
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
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? "border-sky-400 bg-sky-500/10 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            : "border-sky-500/20 bg-slate-950/40 hover:border-sky-400/50 hover:bg-sky-500/5 backdrop-blur-xl"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 rounded-2xl border border-sky-500/40 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold font-mono text-white">
              Drop images or video loops here to upload
            </p>
            <p className="text-xs text-white/40 font-mono mt-0.5">
              Supports PNG, JPG, WebP, SVG, and MP4 videos up to 100MB
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-sky-500/20 bg-slate-950/60 p-3 backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assets by filename or alt text..."
            className="pl-9 h-9 rounded-xl border-sky-500/20 bg-black/50 text-xs font-mono text-white focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Type Filters */}
          <div className="flex items-center rounded-xl border border-sky-500/20 bg-black/50 p-1">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                filterType === "all"
                  ? "bg-sky-500/20 text-sky-300 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("image")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                filterType === "image"
                  ? "bg-sky-500/20 text-sky-300 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setFilterType("video")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                filterType === "video"
                  ? "bg-sky-500/20 text-sky-300 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Videos
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-sky-500/20 bg-black/50 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-sky-500/20 text-sky-300"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-sky-500/20 text-sky-300"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Asset Grid / List Display */}
      {filteredAssets.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-sky-500/20 bg-slate-950/40 p-12 text-center space-y-3 font-mono">
          <FolderOpen className="mx-auto h-8 w-8 text-sky-400/40" />
          <h3 className="text-sm font-bold text-white">No media files found</h3>
          <p className="text-xs text-white/40">Try adjusting your search or upload a new asset above.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const isVideo = asset.type === "video"

            return (
              <div
                key={asset.id}
                className="group relative rounded-2xl border border-sky-500/20 bg-slate-950/80 overflow-hidden backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
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
                    <span className="flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase text-white/80 backdrop-blur-md border border-white/10">
                      {isVideo ? (
                        <Video className="h-2.5 w-2.5 text-cyan-400" />
                      ) : (
                        <ImageIcon className="h-2.5 w-2.5 text-sky-400" />
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
                      className="h-8 w-8 rounded-lg bg-black/80 border border-white/20 text-white hover:bg-sky-500 hover:text-white"
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
                      className="h-8 w-8 rounded-lg bg-black/80 border border-white/20 text-white hover:bg-sky-500 hover:text-white flex items-center justify-center"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${asset.name}"?`)) {
                          deleteMediaAsset(asset.id)
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
                <div className="p-3 space-y-1 font-mono">
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
                    className="cursor-pointer text-[11px] text-white/50 truncate hover:text-sky-300 transition-colors"
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
        <div className="rounded-2xl border border-sky-500/20 bg-slate-950/80 overflow-hidden backdrop-blur-xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/5 bg-white/[0.02] text-white/40 text-[10px] uppercase">
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
                        <Video className="h-4 w-4 text-cyan-400" />
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
                      className="h-7 w-7 text-white/60 hover:text-sky-300"
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
                      onClick={() => {
                        if (confirm(`Delete "${asset.name}"?`)) {
                          deleteMediaAsset(asset.id)
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
        <DialogContent className="max-w-md bg-slate-950/95 border-sky-500/30 p-6 backdrop-blur-2xl rounded-2xl font-mono text-xs shadow-[0_0_35px_rgba(56,189,248,0.2)]">
          <DialogHeader>
            <DialogTitle className="text-sm uppercase text-sky-400">
              EDIT ASSET ACCESSIBILITY
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-3">
            <div className="space-y-1">
              <label className="text-white/50 uppercase text-[10px]">Asset File Name</label>
              <div className="text-white font-semibold">{editingAsset?.name}</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/50 uppercase text-[10px]">Alt Text / Description</label>
              <Input
                value={editAltText}
                onChange={(e) => setEditAltText(e.target.value)}
                placeholder="Accessible description for screen readers and SEO"
                className="rounded-xl border-sky-500/20 bg-black/50 text-white"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditingAsset(null)}
              className="rounded-xl border-white/10 text-white/70 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAltText}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Save Alt Text
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
