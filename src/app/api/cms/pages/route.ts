import { NextRequest, NextResponse } from "next/server"
import { getStoredPages, saveStoredPages } from "@/lib/server-cms"
import { CMSPage } from "@/types/cms.types"

export async function GET() {
  const pages = await getStoredPages()
  return NextResponse.json({ success: true, pages })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body || !Array.isArray(body.pages)) {
      return NextResponse.json({ success: false, error: "Invalid payload: pages array required" }, { status: 400 })
    }

    await saveStoredPages(body.pages as CMSPage[])
    return NextResponse.json({ success: true, count: body.pages.length })
  } catch (error) {
    console.error("Failed to save pages:", error)
    return NextResponse.json({ success: false, error: "Failed to persist pages" }, { status: 500 })
  }
}

