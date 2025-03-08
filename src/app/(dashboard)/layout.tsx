// Layout.tsx
"use client";

import { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { DashboardNav } from "@/components/DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
}

function MainLayout({ children }: { children: ReactNode }) {
  const { state, isMobile } = useSidebar();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Navbar - Fixed at top */}
      <DashboardNav />
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-black text-white transition-all duration-300",
            isMobile ? "w-full" : ""
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}