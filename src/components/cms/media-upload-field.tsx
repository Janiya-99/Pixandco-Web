"use client"

import * as React from "react"
import { Upload, X, Loader2, Image as ImageIcon, Video, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface MediaUploadFieldProps {
  label?: string
  value?: string
  onChange: (url: string) => void
  mediaType?: "image" | "video" | "any"
  placeholder?: string
  aspectRatioHint?: string
}

export function MediaUploadField({
  label,
  value,
  onChange,
  mediaType = "any",
  placeholder = "Upload or enter media URL...",
  aspectRatioHint,
}: MediaUploadFieldProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    // Basic validation
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP, SVG)")
      return
    }
    if (mediaType === "video" && !file.type.startsWith("video/")) {
      toast.error("Please upload a video file (MP4, WebM)")
      return
    }

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

      onChange(data.url)
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const isVideo =
    value?.endsWith(".mp4") ||
    value?.endsWith(".webm") ||
    value?.includes("/videos/")

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            {mediaType === "video" ? (
              <Video className="h-3 w-3 text-cyan-400" />
            ) : (
              <ImageIcon className="h-3 w-3 text-sky-400" />
            )}
            {label}
          </label>
          {aspectRatioHint && (
            <span className="text-[10px] font-mono text-white/40">
              {aspectRatioHint}
            </span>
          )}
        </div>
      )}

      {/* Preview if value exists */}
      {value ? (
        <div className="relative group rounded-xl border border-sky-500/30 bg-black/60 p-2 overflow-hidden shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          <div className="relative rounded-lg overflow-hidden bg-zinc-950 flex items-center justify-center max-h-48">
            {isVideo ? (
              <video
                src={value}
                controls
                muted
                className="w-full h-auto max-h-48 object-cover rounded-lg"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Selected media"
                className="w-full h-auto max-h-48 object-cover rounded-lg"
              />
            )}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-md rounded-lg p-1 border border-white/10">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange("")}
                className="h-7 w-7 text-white/70 hover:text-red-400 hover:bg-white/10"
                title="Remove media"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-mono text-white/60">
            <span className="truncate max-w-[280px]">{value}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="h-6 px-2 text-[10px] font-mono border-sky-500/40 text-sky-300 hover:bg-sky-500/10"
            >
              {isUploading ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <Upload className="h-3 w-3 mr-1" />
              )}
              Replace
            </Button>
          </div>
        </div>
      ) : (
        /* Dropzone / Upload Box */
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
            dragActive
              ? "border-sky-400 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
              : "border-sky-500/25 bg-black/40 hover:border-sky-400/60 hover:bg-sky-500/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="h-10 w-10 rounded-full border border-sky-500/40 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
            </div>
            <div className="text-xs font-mono">
              <span className="font-semibold text-sky-400">Click to upload</span> or drag and drop
            </div>
            <p className="text-[10px] font-mono text-white/40">
              {mediaType === "video"
                ? "MP4 or WebM video (up to 100MB)"
                : mediaType === "image"
                ? "PNG, JPG, SVG, WebP (up to 20MB)"
                : "Images (PNG/JPG) or Videos (MP4/WebM)"}
            </p>
          </div>
        </div>
      )}

      {/* Manual URL Input fallback */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-sky-500/20 bg-black/50 px-3 py-1.5 text-xs font-mono text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="h-8 px-2.5 font-mono text-xs border-sky-500/30 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400"
        >
          {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={
          mediaType === "video"
            ? "video/*"
            : mediaType === "image"
            ? "image/*"
            : "image/*,video/*"
        }
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
          }
        }}
      />
    </div>
  )
}

