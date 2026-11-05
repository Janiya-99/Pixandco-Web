"use client"

import * as React from "react"
import { CMSPage, PageBlock } from "@/types/cms.types"
import { Globe, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LivePreviewDrawer({ page }: { page: CMSPage }) {
  const [device, setDevice] = React.useState<"desktop" | "mobile">("desktop")

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold text-foreground">
            Live Simulator: /{page.slug}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border/70 bg-card p-1">
          <Button
            variant={device === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDevice("desktop")}
            className="h-7 px-2.5 text-xs font-mono gap-1.5"
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </Button>
          <Button
            variant={device === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDevice("mobile")}
            className="h-7 px-2.5 text-xs font-mono gap-1.5"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
          </Button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-y-auto rounded-lg border border-border/80 bg-black p-4 flex justify-center">
        <div
          className={`transition-all duration-300 bg-background text-foreground rounded-md overflow-hidden border border-border/60 shadow-2xl ${
            device === "desktop"
              ? "w-full min-h-[700px]"
              : "w-[375px] min-h-[700px] border-x-4 border-t-8 border-b-8 border-muted"
          }`}
        >
          {/* Simulated Page Content */}
          <div className="divide-y divide-border/40">
            {page.blocks.filter((b) => b.visible).length === 0 ? (
              <div className="py-24 text-center text-xs font-mono text-muted-foreground">
                No visible blocks on this page. Add or toggle blocks in the builder.
              </div>
            ) : (
              page.blocks
                .filter((b) => b.visible)
                .map((block) => (
                  <div key={block.id} className="p-6">
                    {renderSimulatedBlock(block)}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderSimulatedBlock(block: PageBlock) {
  switch (block.type) {
    case "hero":
      return (
        <div className="space-y-4 py-8 text-center sm:text-left">
          {block.badge && (
            <span className="inline-block rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {block.badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-mono uppercase">
            {block.title || "Untitled Hero"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            {block.subtitle || "No subtitle configured."}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {block.primaryCtaText && (
              <span className="rounded bg-foreground px-4 py-1.5 text-xs font-mono font-medium text-background">
                {block.primaryCtaText}
              </span>
            )}
            {block.secondaryCtaText && (
              <span className="rounded border border-border px-4 py-1.5 text-xs font-mono text-foreground">
                {block.secondaryCtaText}
              </span>
            )}
          </div>
        </div>
      )

    case "features":
      return (
        <div className="space-y-6 py-4">
          <div className="space-y-1">
            {block.eyebrow && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {block.eyebrow}
              </span>
            )}
            <h2 className="text-lg font-bold font-mono text-foreground">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-xs text-muted-foreground">{block.subheading}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {block.features.map((f) => (
              <div
                key={f.id}
                className="rounded-md border border-border/60 bg-card/40 p-4 space-y-1.5"
              >
                <h3 className="text-xs font-semibold font-mono text-foreground">
                  {f.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )

    case "richtext":
      return (
        <div className="space-y-3 py-4">
          {block.headline && (
            <h2 className="text-base font-bold font-mono text-foreground">
              {block.headline}
            </h2>
          )}
          <div className="whitespace-pre-line text-xs text-muted-foreground leading-relaxed font-sans">
            {block.content}
          </div>
        </div>
      )

    case "stats":
      return (
        <div className="grid grid-cols-3 gap-2 py-4 text-center">
          {block.stats.map((s) => (
            <div key={s.id} className="rounded border border-border/60 p-3 bg-card/40">
              <div className="text-lg font-bold font-mono text-foreground">{s.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )

    case "faq":
      return (
        <div className="space-y-4 py-4">
          <h2 className="text-sm font-bold font-mono">{block.heading}</h2>
          <div className="space-y-2">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="rounded border border-border/60 p-3 bg-card/40 space-y-1"
              >
                <div className="text-xs font-semibold font-mono">{item.question}</div>
                <div className="text-[11px] text-muted-foreground">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case "cta":
      return (
        <div className="rounded-lg border border-border/80 bg-muted/20 p-6 text-center space-y-3 my-4">
          <h2 className="text-base font-bold font-mono uppercase">{block.title}</h2>
          {block.description && (
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {block.description}
            </p>
          )}
          <div>
            <span className="inline-block rounded bg-foreground px-5 py-2 text-xs font-mono font-medium text-background">
              {block.buttonText}
            </span>
          </div>
        </div>
      )

    default:
      return (
        <div className="p-4 text-xs font-mono text-muted-foreground">
          [Block: {block.name}]
        </div>
      )
  }
}
