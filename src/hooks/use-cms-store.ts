import { create } from "zustand"
import { CMSPage, GlobalSiteSettings, MediaAsset, PageBlock } from "@/types/cms.types"
import { initialMediaAssets, initialPages, initialSiteSettings } from "@/lib/mock-cms-data"

interface CMSStore {
  pages: CMSPage[]
  mediaAssets: MediaAsset[]
  settings: GlobalSiteSettings
  isHydrated: boolean

  // Page Actions
  init: () => Promise<void>
  getPageBySlug: (slug: string) => CMSPage | undefined
  createPage: (page: Omit<CMSPage, "id" | "createdAt" | "updatedAt">) => Promise<CMSPage>
  updatePage: (id: string, updates: Partial<CMSPage>) => Promise<void>
  deletePage: (id: string) => Promise<void>
  duplicatePage: (id: string) => Promise<CMSPage | undefined>

  // Block Actions inside page
  addBlock: (pageId: string, block: PageBlock) => Promise<void>
  updateBlock: (pageId: string, blockId: string, updates: Partial<PageBlock>) => Promise<void>
  removeBlock: (pageId: string, blockId: string) => Promise<void>
  reorderBlocks: (pageId: string, sourceIndex: number, destinationIndex: number) => Promise<void>

  // Media Actions
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "uploadedAt">) => Promise<MediaAsset>
  deleteMediaAsset: (id: string) => Promise<void>
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => Promise<void>

  // Settings Actions
  updateSettings: (updates: Partial<GlobalSiteSettings>) => Promise<void>
  resetToDefaults: () => Promise<void>
}

const STORAGE_KEYS = {
  PAGES: "pixandco_cms_pages_v1",
  MEDIA: "pixandco_cms_media_v1",
  SETTINGS: "pixandco_cms_settings_v1",
}

async function persistPagesToServer(pages: CMSPage[]) {
  try {
    await fetch("/api/cms/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages }),
    })
  } catch (err) {
    console.error("Persist pages failed:", err)
  }
}

async function persistSettingsToServer(settings: GlobalSiteSettings) {
  try {
    await fetch("/api/cms/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    })
  } catch (err) {
    console.error("Persist settings failed:", err)
  }
}

async function persistMediaToServer(media: MediaAsset[]) {
  try {
    await fetch("/api/cms/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ media }),
    })
  } catch (err) {
    console.error("Persist media failed:", err)
  }
}

export const useCMSStore = create<CMSStore>((set, get) => ({
  pages: initialPages,
  mediaAssets: initialMediaAssets,
  settings: initialSiteSettings,
  isHydrated: false,

  init: async () => {
    if (typeof window === "undefined") return
    try {
      // First try fetching real data from server API
      const [pagesRes, settingsRes, mediaRes] = await Promise.allSettled([
        fetch("/api/cms/pages").then((r) => r.json()),
        fetch("/api/cms/settings").then((r) => r.json()),
        fetch("/api/cms/media").then((r) => r.json()),
      ])

      let loadedPages = initialPages
      let loadedSettings = initialSiteSettings
      let loadedMedia = initialMediaAssets

      if (pagesRes.status === "fulfilled" && pagesRes.value?.success && Array.isArray(pagesRes.value.pages)) {
        loadedPages = pagesRes.value.pages
      } else {
        const stored = localStorage.getItem(STORAGE_KEYS.PAGES)
        if (stored) loadedPages = JSON.parse(stored)
      }

      if (settingsRes.status === "fulfilled" && settingsRes.value?.success && settingsRes.value.settings) {
        loadedSettings = settingsRes.value.settings
      } else {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
        if (stored) loadedSettings = JSON.parse(stored)
      }

      if (mediaRes.status === "fulfilled" && mediaRes.value?.success && Array.isArray(mediaRes.value.media)) {
        loadedMedia = mediaRes.value.media
      } else {
        const stored = localStorage.getItem(STORAGE_KEYS.MEDIA)
        if (stored) loadedMedia = JSON.parse(stored)
      }

      set({
        pages: loadedPages,
        settings: loadedSettings,
        mediaAssets: loadedMedia,
        isHydrated: true,
      })

      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(loadedPages))
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(loadedSettings))
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(loadedMedia))
    } catch (e) {
      console.error("Failed to load CMS from server or storage", e)
      set({ isHydrated: true })
    }
  },

  getPageBySlug: (slug: string) => {
    return get().pages.find((p) => p.slug === slug || p.id === slug)
  },

  createPage: async (pageData) => {
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
    await persistPagesToServer(updated)
    return newPage
  },

  updatePage: async (id, updates) => {
    const updated = get().pages.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    )
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
    await persistPagesToServer(updated)
  },

  deletePage: async (id) => {
    const updated = get().pages.filter((p) => p.id !== id)
    set({ pages: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(updated))
    }
    await persistPagesToServer(updated)
  },

  duplicatePage: async (id) => {
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
    await persistPagesToServer(updated)
    return duplicated
  },

  addBlock: async (pageId, block) => {
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
    await persistPagesToServer(updated)
  },

  updateBlock: async (pageId, blockId, updates) => {
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
    await persistPagesToServer(updated)
  },

  removeBlock: async (pageId, blockId) => {
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
    await persistPagesToServer(updated)
  },

  reorderBlocks: async (pageId, sourceIndex, destinationIndex) => {
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
    await persistPagesToServer(updated)
  },

  addMediaAsset: async (assetData) => {
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
    await persistMediaToServer(updated)
    return newAsset
  },

  deleteMediaAsset: async (id) => {
    const updated = get().mediaAssets.filter((a) => a.id !== id)
    set({ mediaAssets: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated))
    }
    await persistMediaToServer(updated)
  },

  updateMediaAsset: async (id, updates) => {
    const updated = get().mediaAssets.map((a) => (a.id === id ? { ...a, ...updates } : a))
    set({ mediaAssets: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(updated))
    }
    await persistMediaToServer(updated)
  },

  updateSettings: async (updates) => {
    const updated = { ...get().settings, ...updates }
    set({ settings: updated })
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
    }
    await persistSettingsToServer(updated)
  },

  resetToDefaults: async () => {
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
    await Promise.allSettled([
      persistPagesToServer(initialPages),
      persistSettingsToServer(initialSiteSettings),
      persistMediaToServer(initialMediaAssets),
    ])
  },
}))
