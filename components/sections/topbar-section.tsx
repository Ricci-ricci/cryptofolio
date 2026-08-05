"use client"

import { Moon, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const TopBar = () => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search a token, a wallet, a transaction..."
          className="h-10 rounded-full pl-9"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Dark / light mode */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {/* Only one is visible at a time, driven by the `dark` class on
              <html>, so the server and the client render the same markup. */}
          <Sun className="size-5 dark:hidden" />
          <Moon className="hidden size-5 dark:block" />
        </Button>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-muted"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            JD
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-medium">John Doe</span>
            <span className="block text-xs text-muted-foreground">
              john@cryptofolio.io
            </span>
          </span>
        </button>
      </div>
    </header>
  )
}
export default TopBar
