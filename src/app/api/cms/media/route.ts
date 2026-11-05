import { NextRequest, NextResponse } from "next/server"
import { getStoredMedia, saveStoredMedia } from "@/lib/server-cms"
import { MediaAsset } from "@/types/cms.types"

export async function GET() {
  const media = await getStoredMedia()
  return NextResponse.json({ success: true, media })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body || !Array.isArray(body.media)) {
      return NextResponse.json({ success: false, error: "Invalid payload: media array required" }, { status: 400 })
    }

    await saveStoredMedia(body.media as MediaAsset[])
    return NextResponse.json({ success: true, count: body.media.length })
  } catch (error) {
    console.error("Failed to save media:", error)
    return NextResponse.json({ success: false, error: "Failed to persist media" }, { status: 500 })
  }
}

