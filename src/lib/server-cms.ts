import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import { CMSPage, GlobalSiteSettings, MediaAsset } from "@/types/cms.types"
import { initialPages, initialSiteSettings, initialMediaAssets } from "./mock-cms-data"

const DATA_DIR = path.join(process.cwd(), "data")
const PAGES_FILE = path.join(DATA_DIR, "pages.json")
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json")
const MEDIA_FILE = path.join(DATA_DIR, "media.json")

async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await readFile(PAGES_FILE, "utf-8")
  } catch {
    await writeFile(PAGES_FILE, JSON.stringify(initialPages, null, 2), "utf-8")
  }

  try {
    await readFile(SETTINGS_FILE, "utf-8")
  } catch {
    await writeFile(SETTINGS_FILE, JSON.stringify(initialSiteSettings, null, 2), "utf-8")
  }

  try {
    await readFile(MEDIA_FILE, "utf-8")
  } catch {
    await writeFile(MEDIA_FILE, JSON.stringify(initialMediaAssets, null, 2), "utf-8")
  }
}

export async function getStoredPages(): Promise<CMSPage[]> {
  try {
    await ensureDataFiles()
    const content = await readFile(PAGES_FILE, "utf-8")
    return JSON.parse(content) as CMSPage[]
  } catch (error) {
    console.error("Error reading pages.json, fallback to initialPages:", error)
    return initialPages
  }
}

export async function getStoredPageBySlug(slug: string): Promise<CMSPage | undefined> {
  const pages = await getStoredPages()
  return pages.find((p) => p.slug === slug || p.id === slug)
}

export async function saveStoredPages(pages: CMSPage[]): Promise<void> {
  await ensureDataFiles()
  await writeFile(PAGES_FILE, JSON.stringify(pages, null, 2), "utf-8")
}

export async function getStoredSettings(): Promise<GlobalSiteSettings> {
  try {
    await ensureDataFiles()
    const content = await readFile(SETTINGS_FILE, "utf-8")
    return JSON.parse(content) as GlobalSiteSettings
  } catch (error) {
    console.error("Error reading settings.json, fallback to initialSiteSettings:", error)
    return initialSiteSettings
  }
}

export async function saveStoredSettings(settings: GlobalSiteSettings): Promise<void> {
  await ensureDataFiles()
  await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8")
}

export async function getStoredMedia(): Promise<MediaAsset[]> {
  try {
    await ensureDataFiles()
    const content = await readFile(MEDIA_FILE, "utf-8")
    return JSON.parse(content) as MediaAsset[]
  } catch (error) {
    console.error("Error reading media.json, fallback to initialMediaAssets:", error)
    return initialMediaAssets
  }
}

export async function saveStoredMedia(media: MediaAsset[]): Promise<void> {
  await ensureDataFiles()
  await writeFile(MEDIA_FILE, JSON.stringify(media, null, 2), "utf-8")
}

