"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      {/* Full viewport height container */}
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Sidebar (collapsible on mobile) */}
        <AppSidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col">

          {/* Scrollable content area */}
          <main className="flex-1 overflow-auto p-6">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
