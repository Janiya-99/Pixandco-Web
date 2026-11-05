import { create } from "zustand"
import { CMSPage, GlobalSiteSettings, MediaAsset, PageBlock } from "@/types/cms.types"
import { initialMediaAssets, initialPages, initialSiteSettings } from "@/lib/mock-cms-data"

interface CMSStore {
  pages: CMSPage[]
  mediaAssets: MediaAsset[]
  settings: GlobalSiteSettings
  isHydrated: boolean

  // Page Actions
  init: () => void
  getPageBySlug: (slug: string) => CMSPage | undefined
  createPage: (page: Omit<CMSPage, "id" | "createdAt" | "updatedAt">) => CMSPage
  updatePage: (id: string, updates: Partial<CMSPage>) => void
  deletePage: (id: string) => void
  duplicatePage: (id: string) => CMSPage | undefined

  // Block Actions inside page
  addBlock: (pageId: string, block: PageBlock) => void
  updateBlock: (pageId: string, blockId: string, updates: Partial<PageBlock>) => void
  removeBlock: (pageId: string, blockId: string) => void
  reorderBlocks: (pageId: string, sourceIndex: number, destinationIndex: number) => void

  // Media Actions
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "uploadedAt">) => MediaAsset
  deleteMediaAsset: (id: string) => void
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void

  // Settings Actions
  updateSettings: (updates: Partial<GlobalSiteSettings>) => void
  resetToDefaults: () => void
}

const STORAGE_KEYS = {
  PAGES: "pixandco_cms_pages_v1",
  MEDIA: "pixandco_cms_media_v1",
  SETTINGS: "pixandco_cms_settings_v1",
}

export const useCMSStore = create<CMSStore>((set, get) => ({
  pages: initialPages,
  mediaAssets: initialMediaAssets,
  settings: initialSiteSettings,
  isHydrated: false,

  init: () => {
    if (typeof window === "undefined") return
    try {
      const storedPages = localStorage.getItem(STORAGE_KEYS.PAGES)
      const storedMedia = localStorage.getItem(STORAGE_KEYS.MEDIA)
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS)

      set({
        pages: storedPages ? JSON.parse(storedPages) : initialPages,
        mediaAssets: storedMedia ? JSON.parse(storedMedia) : initialMediaAssets,
        settings: storedSettings ? JSON.parse(storedSettings) : initialSiteSettings,
        isHydrated: true,
      })
    } catch (e) {
      console.error("Failed to load CMS from storage", e)
      set({ isHydrated: true })
    }
  },

  getPageBySlug: (slug: string) => {
    return get().pages.find((p) => p.slug === slug || p.id === slug)
  },

  createPage: (pageData) => {
    const newPage: CMSPage = {
      ...pageData,
      id: `page_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [newPage, ...get().pages]
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
    return newPage
  },

  updatePage: (id, updates) => {
    const updated = get().pages.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    )
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  deletePage: (id) => {
    const updated = get().pages.filter((p) => p.id !== id)
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  duplicatePage: (id) => {
    const original = get().pages.find((p) => p.id === id)
    if (!original) return undefined

    const duplicated: CMSPage = {
      ...original,
      id: `page_${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: JSON.parse(JSON.stringify(original.blocks)).map((b: PageBlock) => ({
        ...b,
        id: `blk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      })),
    }

    const updated = [duplicated, ...get().pages]
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
    return duplicated
  },

  addBlock: (pageId, block) => {
    const updated = get().pages.map((p) => {
      if (p.id !== pageId) return p
      return {
        ...p,
        blocks: [...p.blocks, block],
        updatedAt: new Date().toISOString(),
      }
    })
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  updateBlock: (pageId, blockId, updates) => {
    const updated = get().pages.map((p) => {
      if (p.id !== pageId) return p
      return {
        ...p,
        blocks: p.blocks.map((b) => (b.id === blockId ? ({ ...b, ...updates } as PageBlock) : b)),
        updatedAt: new Date().toISOString(),
      }
    })
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  removeBlock: (pageId, blockId) => {
    const updated = get().pages.map((p) => {
      if (p.id !== pageId) return p
      return {
        ...p,
        blocks: p.blocks.filter((b) => b.id !== blockId),
        updatedAt: new Date().toISOString(),
      }
    })
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  reorderBlocks: (pageId, sourceIndex, destinationIndex) => {
    const page = get().pages.find((p) => p.id === pageId)
    if (!page) return

    const newBlocks = Array.from(page.blocks)
    const [moved] = newBlocks.splice(sourceIndex, 1)
    if (!moved) return
    newBlocks.splice(destinationIndex, 0, moved)

    const updated = get().pages.map((p) =>
      p.id === pageId ? { ...p, blocks: newBlocks, updatedAt: new Date().toISOString() } : p
    )
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
  },

  addMediaAsset: (assetData) => {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `med_${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    }
    const updated = [newAsset, ...get().mediaAssets]
    set({ mediaAssets: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated))
    }
    return newAsset
  },

  deleteMediaAsset: (id) => {
    const updated = get().mediaAssets.filter((a) => a.id !== id)
    set({ mediaAssets: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated))
    }
  },

  updateMediaAsset: (id, updates) => {
    const updated = get().mediaAssets.map((a) => (a.id === id ? { ...a, ...updates } : a))
    set({ mediaAssets: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated))
    }
  },

  updateSettings: (updates) => {
    const updated = { ...get().settings, ...updates }
    set({ settings: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
    }
  },

  resetToDefaults: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.PAGES)
      localStorage.removeItem(STORAGE_KEYS.MEDIA)
      localStorage.removeItem(STORAGE_KEYS.SETTINGS)
    }
    set({
      pages: initialPages,
      mediaAssets: initialMediaAssets,
      settings: initialSiteSettings,
    })
  },
}))
