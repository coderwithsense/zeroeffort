// DashboardNav.tsx
"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()
  const { state, openMobile, setOpenMobile, isMobile } = useSidebar()

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname === "/calendar") return "Calendar"
    if (pathname === "/focus") return "Focus Mode"
    if (pathname === "/chat") return "Chat"
    return "Page Title"
  }

  return (
    <header className="sticky top-0 w-full h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-border z-10">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button - Always visible on mobile */}
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl md:text-2xl font-semibold truncate">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Additional nav items could go here */}
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full shrink-0" />
      </div>
    </header>
  )
}