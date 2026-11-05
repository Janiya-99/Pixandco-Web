"use client"

import * as React from "react"
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Globe,
  Sliders,
  Shield,
  Layers,
  Sparkles,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useCMSStore } from "@/hooks/use-cms-store"
import { MediaUploadField } from "@/components/cms/media-upload-field"
import { toast } from "sonner"

export default function SiteSettingsPage() {
  const { settings, updateSettings, resetToDefaults } = useCMSStore()

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

  const handleSave = () => {
    updateSettings({
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
    toast.success("Global site settings updated successfully")
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

  const handleResetDefaults = () => {
    if (confirm("Reset all settings and pages back to default starter content?")) {
      resetToDefaults()
      toast.success("Settings restored to defaults")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-sky-500/20 bg-slate-950/70 p-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
            GLOBAL SITE SETTINGS
          </h1>
          <p className="text-xs text-white/50 font-mono mt-1">
            Site identity, brand assets, navigation links, and SEO tracking defaults.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            className="gap-1.5 font-mono text-xs rounded-xl border-white/10 text-white/70 hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </Button>

          <Button
            onClick={handleSave}
            size="sm"
            className="gap-2 font-mono text-xs rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-6 font-mono text-xs">
        <TabsList className="bg-slate-950/70 border border-sky-500/20 rounded-xl p-1">
          <TabsTrigger
            value="identity"
            className="gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 data-[state=active]:border-sky-500/40 rounded-lg text-xs"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Site Identity & Branding</span>
          </TabsTrigger>
          <TabsTrigger
            value="navigation"
            className="gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 data-[state=active]:border-sky-500/40 rounded-lg text-xs"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Navigation Builder</span>
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="gap-2 data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 data-[state=active]:border-sky-500/40 rounded-lg text-xs"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>SEO & Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Identity */}
        <TabsContent value="identity">
          <div className="rounded-2xl border border-sky-500/20 bg-slate-950/80 p-6 space-y-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <h2 className="text-sm font-semibold uppercase text-white tracking-wider">
              Branding & Global Contact Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/50 uppercase text-[10px]">Site Name</label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
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

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[10px]">Contact Email</label>
                <Input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[10px]">Contact Phone</label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/50 uppercase text-[10px]">HQ Office Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[10px]">Header CTA Button Text</label>
                <Input
                  value={headerCtaText}
                  onChange={(e) => setHeaderCtaText(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[10px]">Header CTA Button Link</label>
                <Input
                  value={headerCtaLink}
                  onChange={(e) => setHeaderCtaLink(e.target.value)}
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Save Identity Settings
            </Button>
          </div>
        </TabsContent>

        {/* Tab 2: Navigation Builder */}
        <TabsContent value="navigation">
          <div className="rounded-2xl border border-sky-500/20 bg-slate-950/80 p-6 space-y-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase text-white tracking-wider">
                  Primary Header Navigation Links
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Configure the menu items visible in the top navigation bar.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAddNavItem}
                className="gap-1.5 text-xs rounded-xl border-sky-500/30 text-sky-300 hover:bg-sky-500/10"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Link</span>
              </Button>
            </div>

            <div className="space-y-3">
              {navItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-sky-500/20 bg-black/50 p-3"
                >
                  <span className="text-white/40 w-6 font-mono text-[11px]">#{idx + 1}</span>
                  <div className="flex-1 grid sm:grid-cols-2 gap-3">
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
                      placeholder="Label (e.g. PROJECTS)"
                      className="rounded-lg border-white/10 bg-black/40 text-white"
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
                      className="rounded-lg border-white/10 bg-black/40 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNavItem(item.id)}
                    className="h-8 w-8 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Save Navigation Menu
            </Button>
          </div>
        </TabsContent>

        {/* Tab 3: SEO & Analytics */}
        <TabsContent value="seo">
          <div className="rounded-2xl border border-sky-500/20 bg-slate-950/80 p-6 space-y-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div>
              <h2 className="text-sm font-semibold uppercase text-white tracking-wider">
                Analytics & Global Fallback SEO
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Configure measurement trackers and default social metadata across unconfigured pages.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-white/50 uppercase text-[10px]">
                  Google Analytics / Measurement ID
                </label>
                <Input
                  value={analyticsId}
                  onChange={(e) => setAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="rounded-xl border-sky-500/20 bg-black/50 text-white"
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

            <Button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Save Analytics & SEO Defaults
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
