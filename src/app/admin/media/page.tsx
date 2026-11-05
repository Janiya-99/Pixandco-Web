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
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [selectedAsset, setSelectedAsset] = React.useState<MediaAsset | null>(null)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  // Upload dialog state
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const [newUrl, setNewUrl] = React.useState("")
  const [newName, setNewName] = React.useState("")
  const [newAlt, setNewAlt] = React.useState("")
  const [newType, setNewType] = React.useState<"image" | "video">("image")

  const filteredAssets = mediaAssets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.altText.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success("Media URL copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl || !newName) {
      toast.error("File name and URL are required")
      return
    }

    addMediaAsset({
      name: newName,
      url: newUrl,
      altText: newAlt || newName,
      type: newType,
      format: newType === "video" ? "MP4" : "JPG",
      size: 450000,
      dimensions: newType === "video" ? "1920x1080" : "1600x1200",
    })

    toast.success(`Asset "${newName}" added to library`)
    setIsUploadOpen(false)
    setNewUrl("")
    setNewName("")
    setNewAlt("")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            MEDIA ASSET LIBRARY
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Central repository for logos, imagery, editorial graphics, and video loops.
          </p>
        </div>

        <Button
          onClick={() => setIsUploadOpen(true)}
          className="gap-2 font-mono text-xs"
        >
          <Upload className="h-4 w-4" />
          <span>Register / Upload Asset</span>
        </Button>
      </div>

      {/* Filter and View Toggles */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs font-mono"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border/70 bg-card p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-7 w-7"
          >
            <Grid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-7 w-7"
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Assets Display */}
      {filteredAssets.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/80 p-12 text-center font-mono">
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/60 mb-3" />
          <p className="text-sm text-muted-foreground">No media assets match your search.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-lg border border-border/70 bg-card/50 overflow-hidden hover:border-foreground/40 transition-all font-mono"
            >
              {/* Preview Thumbnail */}
              <div className="relative aspect-video bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border/60">
                {asset.type === "video" ? (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <Video className="h-8 w-8" />
                    <span className="text-[10px]">VIDEO ASSET</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-[9px]">
                    {asset.format}
                  </Badge>
                </div>
              </div>

              {/* Asset Info & Controls */}
              <div className="p-3 space-y-2">
                <div className="truncate text-xs font-semibold text-foreground">
                  {asset.name}
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{(asset.size / 1024).toFixed(0)} KB</span>
                  <span>{asset.dimensions || "Vector"}</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border/60">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="h-7 text-[10px] gap-1 px-2"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm(`Delete "${asset.name}"?`)) {
                        deleteMediaAsset(asset.id)
                        toast.success("Asset deleted")
                      }
                    }}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border/70 bg-card/40 overflow-hidden font-mono text-xs">
          <table className="w-full text-left">
            <thead className="border-b border-border/60 bg-muted/40 uppercase text-muted-foreground">
              <tr>
                <th className="p-3">File Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Size</th>
                <th className="p-3">Dimensions</th>
                <th className="p-3">Alt Text</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">{asset.name}</td>
                  <td className="p-3 text-muted-foreground uppercase">{asset.format}</td>
                  <td className="p-3 text-muted-foreground">{(asset.size / 1024).toFixed(0)} KB</td>
                  <td className="p-3 text-muted-foreground">{asset.dimensions || "—"}</td>
                  <td className="p-3 text-muted-foreground truncate max-w-xs">{asset.altText}</td>
                  <td className="p-3 text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="h-7 text-xs"
                    >
                      Copy URL
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMediaAsset(asset.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload / Register Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-md font-mono">
          <form onSubmit={handleUploadSubmit}>
            <DialogHeader>
              <DialogTitle>REGISTER MEDIA ASSET</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Asset Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. system-architecture-diagram.jpg"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Media Path or URL</label>
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="/images/site/custom-mock.jpg or https://..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Alt Text (Accessibility)</label>
                <Input
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Descriptive caption for screen readers..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-muted-foreground">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "image" | "video")}
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs font-mono"
                >
                  <option value="image">Image (JPG, PNG, WebP, SVG)</option>
                  <option value="video">Video (MP4, WebM)</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Asset</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

