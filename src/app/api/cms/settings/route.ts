import { NextRequest, NextResponse } from "next/server"
import { getStoredSettings, saveStoredSettings } from "@/lib/server-cms"
import { GlobalSiteSettings } from "@/types/cms.types"

export async function GET() {
  const settings = await getStoredSettings()
  return NextResponse.json({ success: true, settings })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body || !body.settings) {
      return NextResponse.json({ success: false, error: "Invalid payload: settings object required" }, { status: 400 })
    }

    await saveStoredSettings(body.settings as GlobalSiteSettings)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save settings:", error)
    return NextResponse.json({ success: false, error: "Failed to persist settings" }, { status: 500 })
  }
}

