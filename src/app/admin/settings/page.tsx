"use client"

import { confirmAction } from "@/lib/sweet-alert"

import * as React from "react"
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Globe,
  Sliders,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useCMSStore } from "@/hooks/use-cms-store"
import { MediaUploadField } from "@/components/cms/media-upload-field"
import { toast } from "sonner"

export default function SiteSettingsPage() {
  const { settings, updateSettings, resetToDefaults, init } = useCMSStore()

  React.useEffect(() => {
    init()
  }, [init])

  const [siteName, setSiteName] = React.useState("")
  const [logoUrl, setLogoUrl] = React.useState("")
  const [faviconUrl, setFaviconUrl] = React.useState("")
  const [defaultOgImage, setDefaultOgImage] = React.useState("")
  const [contactEmail, setContactEmail] = React.useState("")
  const [contactPhone, setContactPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [headerCtaText, setHeaderCtaText] = React.useState("")
  const [headerCtaLink, setHeaderCtaLink] = React.useState("")
  const [analyticsId, setAnalyticsId] = React.useState("")

  // Navigation Links state
  const [navItems, setNavItems] = React.useState(settings.navItems)

  React.useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName)
      setLogoUrl(settings.logoUrl)
      setFaviconUrl(settings.faviconUrl)
      setDefaultOgImage(settings.defaultOgImage)
      setContactEmail(settings.contactEmail)
      setContactPhone(settings.contactPhone)
      setAddress(settings.address)
      setHeaderCtaText(settings.headerCtaText)
      setHeaderCtaLink(settings.headerCtaLink)
      setAnalyticsId(settings.analyticsId || "")
      setNavItems(settings.navItems)
    }
  }, [settings])

  const handleSave = async () => {
    await updateSettings({
      siteName,
      logoUrl,
      faviconUrl,
      defaultOgImage,
      contactEmail,
      contactPhone,
      address,
      headerCtaText,
      headerCtaLink,
      analyticsId,
      navItems,
    })
    toast.success("Global site settings saved live")
  }

  const handleAddNavItem = () => {
    setNavItems([
      ...navItems,
      { id: `nav_${Date.now()}`, label: "NEW LINK", href: "/new-link" },
    ])
  }

  const handleRemoveNavItem = (id: string) => {
    setNavItems(navItems.filter((item) => item.id !== id))
  }

  const handleResetDefaults = async () => {
    const ok = await confirmAction({
      title: "Reset all settings to defaults?",
      text: "This will restore site settings, links, and identity back to defaults.",
      confirmText: "Yes, reset to defaults",
    })
    if (ok) {
      await resetToDefaults()
      toast.success("Settings restored to defaults")
    }
  }

  return (
    <div className="space-y-4 font-[var(--font-poppins)]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/10 bg-[#0c0c0f] p-3 shadow-md">
        <div>
          <h1 className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-white">
            Site Settings
          </h1>
          <p className="text-[10px] text-white/40 mt-0.5">
            Site identity, brand assets, navigation links, and SEO tracking defaults.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="admin-glass-btn hover:border-white/30"
          >
            <RotateCcw className="h-3 w-3 text-white/50" />
            <span className="text-[10px]">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="admin-glass-btn-accent"
          >
            <Save className="h-3 w-3 text-red-300" />
            <span className="text-[10px]">Save Settings</span>
          </button>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-3.5 text-[10px]">
        <TabsList className="bg-[#0c0c0f] border border-white/10 rounded-lg p-0.5 h-auto">
          <TabsTrigger
            value="identity"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[10px] px-2.5 py-1"
          >
            <Sliders className="h-3 w-3" />
            <span>Site Identity & Branding</span>
          </TabsTrigger>
          <TabsTrigger
            value="navigation"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[10px] px-2.5 py-1"
          >
            <Layers className="h-3 w-3" />
            <span>Navigation Builder</span>
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="gap-1.5 data-[state=active]:bg-white/15 data-[state=active]:text-white rounded-md text-[10px] px-2.5 py-1"
          >
            <Globe className="h-3 w-3" />
            <span>SEO & Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Identity */}
        <TabsContent value="identity">
          <div className="rounded-xl border border-white/10 bg-[#0c0c0f] p-3.5 space-y-3.5 shadow-md">
            <div>
              <h2 className="text-[11px] font-semibold text-white tracking-wide">
                Branding & Global Contact Information
              </h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                Configure basic corporate identity and contact metadata.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 text-[10px]">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-white/50 text-[10px] uppercase font-medium">Site Name</label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              {/* Logo Upload */}
              <div className="sm:col-span-2">
                <MediaUploadField
                  label="Header Brand Logo / Identity"
                  value={logoUrl}
                  onChange={(url) => setLogoUrl(url)}
                  mediaType="image"
                  placeholder="/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Contact Email</label>
                <Input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Contact Phone</label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-white/50 text-[10px] uppercase font-medium">HQ Office Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Header CTA Button Text</label>
                <Input
                  value={headerCtaText}
                  onChange={(e) => setHeaderCtaText(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">Header CTA Button Link</label>
                <Input
                  value={headerCtaLink}
                  onChange={(e) => setHeaderCtaLink(e.target.value)}
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="admin-glass-btn-accent"
              >
                <Save className="h-3 w-3 text-red-300" />
                <span className="text-[10px]">Save Identity Settings</span>
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Navigation Builder */}
        <TabsContent value="navigation">
          <div className="rounded-xl border border-white/10 bg-[#0c0c0f] p-3.5 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-semibold text-white tracking-wide">
                  Primary Header Navigation Links
                </h2>
                <p className="text-[10px] text-white/40 mt-0.5">
                  Configure the menu items visible in the top navigation bar.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddNavItem}
                className="admin-glass-btn hover:border-red-500/40"
              >
                <Plus className="h-3 w-3 text-white/70" />
                <span className="text-[10px]">Add Link</span>
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 p-2"
                >
                  <span className="text-white/40 w-5 text-[10px]">#{idx + 1}</span>
                  <div className="flex-1 grid sm:grid-cols-2 gap-2">
                    <Input
                      value={item.label}
                      onChange={(e) => {
                        const updated = [...navItems]
                        const itm = updated[idx]
                        if (itm) {
                          itm.label = e.target.value
                          setNavItems(updated)
                        }
                      }}
                      placeholder="Label (e.g. Projects)"
                      className="h-6.5 rounded-md border-white/10 bg-black/40 text-white text-[10px]"
                    />
                    <Input
                      value={item.href}
                      onChange={(e) => {
                        const updated = [...navItems]
                        const itm = updated[idx]
                        if (itm) {
                          itm.href = e.target.value
                          setNavItems(updated)
                        }
                      }}
                      placeholder="Link (e.g. /projects)"
                      className="h-6.5 rounded-md border-white/10 bg-black/40 text-white text-[10px]"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNavItem(item.id)}
                    className="h-6.5 w-6.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="admin-glass-btn-accent"
              >
                <Save className="h-3 w-3 text-red-300" />
                <span className="text-[10px]">Save Navigation Menu</span>
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: SEO & Analytics */}
        <TabsContent value="seo">
          <div className="rounded-xl border border-white/10 bg-[#0c0c0f] p-3.5 space-y-3.5 shadow-md">
            <div>
              <h2 className="text-[11px] font-semibold text-white tracking-wide">
                Analytics & Global Fallback SEO
              </h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                Configure measurement trackers and default social metadata across unconfigured pages.
              </p>
            </div>

            <div className="space-y-3 text-[10px]">
              <div className="space-y-1">
                <label className="text-white/50 text-[10px] uppercase font-medium">
                  Google Analytics / Measurement ID
                </label>
                <Input
                  value={analyticsId}
                  onChange={(e) => setAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="h-7 rounded-md border-white/10 bg-black/60 text-white text-[10px]"
                />
              </div>

              {/* Fallback OG Image Upload */}
              <MediaUploadField
                label="Default Fallback OpenGraph Share Image"
                value={defaultOgImage}
                onChange={(url) => setDefaultOgImage(url)}
                mediaType="image"
                placeholder="/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"
              />
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="admin-glass-btn-accent"
              >
                <Save className="h-3 w-3 text-red-300" />
                <span className="text-[10px]">Save Analytics & SEO Defaults</span>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
