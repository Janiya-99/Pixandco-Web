"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  FileText,
  Search,
  Plus,
  Settings,
  Image as ImageIcon,
  ExternalLink,
  Laptop,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { useCMSStore } from "@/hooks/use-cms-store"

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter()
  const { pages } = useCMSStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/pages?create=true"))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Page</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/media"))}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>Open Media Library</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/settings"))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Site Identity & Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Website Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.id}
              onSelect={() => runCommand(() => router.push(`/admin/pages/${page.slug}`))}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{page.title}</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground uppercase">
                /{page.slug}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="System">
          <CommandItem
            onSelect={() => runCommand(() => window.open("/", "_blank"))}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>View Public Site</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
