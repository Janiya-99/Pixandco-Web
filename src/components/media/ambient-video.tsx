"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type AmbientVideoProps = {
  src: string
  poster: string
  alt: string
  className?: string
  mediaClassName?: string
  priority?: boolean
  sizes?: string
}

export function AmbientVideo({ src, poster, alt, className, mediaClassName, priority = false, sizes = "100vw" }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      const video = videoRef.current
      if (!video) return
      video.defaultMuted = true
      if (preference.matches) {
        video.pause()
        video.currentTime = 0
      } else {
        void video.play().catch(() => undefined)
      }
    }
    update()
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      <Image src={poster} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", mediaClassName)} />
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        disablePictureInPicture
        loop
        muted
        playsInline
        poster={poster}
        preload={priority ? "auto" : "metadata"}
        className={cn("absolute inset-0 size-full object-cover opacity-100 motion-reduce:opacity-0", mediaClassName)}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
