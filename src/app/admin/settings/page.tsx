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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useCMSStore } from "@/hooks/use-cms-store"
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
      { id: `nav_${Date.now()}`, label: "New Link", href: "/new-link" },
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            GLOBAL SITE SETTINGS
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Site identity, navigation links, and operational configurations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            className="gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </Button>

          <Button onClick={handleSave} size="sm" className="gap-2 font-mono text-xs">
            <Save className="h-3.5 w-3.5" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-6 font-mono text-xs">
        <TabsList>
          <TabsTrigger value="identity" className="gap-2">
            <Sliders className="h-3.5 w-3.5" />
            <span>Site Identity</span>
          </TabsTrigger>
          <TabsTrigger value="navigation" className="gap-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Navigation Builder</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Globe className="h-3.5 w-3.5" />
            <span>SEO & Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Identity */}
        <TabsContent value="identity">
          <div className="rounded-lg border border-border/80 bg-card/40 p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase text-foreground">
              Branding & Contact Info
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-muted-foreground uppercase">Brand / Studio Name</label>
                <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Logo URL or Path</label>
                <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Favicon Path</label>
                <Input value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Contact Email</label>
                <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Contact Phone</label>
                <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-muted-foreground uppercase">Headquarters Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Header Action Button Text</label>
                <Input value={headerCtaText} onChange={(e) => setHeaderCtaText(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">Header Action Button Link</label>
                <Input value={headerCtaLink} onChange={(e) => setHeaderCtaLink(e.target.value)} />
              </div>
            </div>

            <Button onClick={handleSave} className="mt-2">
              Save Identity
            </Button>
          </div>
        </TabsContent>

        {/* Tab 2: Navigation Builder */}
        <TabsContent value="navigation">
          <div className="rounded-lg border border-border/80 bg-card/40 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase text-foreground">
                  Primary Header Navigation
                </h2>
                <p className="text-xs text-muted-foreground">
                  Configure top-level navigation links.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAddNavItem}
                className="gap-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Link</span>
              </Button>
            </div>

            <div className="space-y-3">
              {navItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/20 p-3"
                >
                  <span className="text-muted-foreground w-6">#{idx + 1}</span>
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
                      placeholder="Label (e.g. Projects)"
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
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNavItem(item.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={handleSave} className="mt-2">
              Save Navigation
            </Button>
          </div>
        </TabsContent>

        {/* Tab 3: SEO & Analytics */}
        <TabsContent value="seo">
          <div className="rounded-lg border border-border/80 bg-card/40 p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase text-foreground">
              Analytics & Global Fallback SEO
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">
                  Google Analytics / Measurement ID
                </label>
                <Input
                  value={analyticsId}
                  onChange={(e) => setAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase">
                  Default Fallback OpenGraph Image
                </label>
                <Input
                  value={defaultOgImage}
                  onChange={(e) => setDefaultOgImage(e.target.value)}
                  placeholder="/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="mt-2">
              Save Analytics & SEO
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
