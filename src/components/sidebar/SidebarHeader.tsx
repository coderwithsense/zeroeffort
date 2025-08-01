import React from "react";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";

export const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="ZeroEffort Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium text-sidebar-foreground">ZeroEffort</span>
      </div>
      <ThemeToggle />
    </div>
  );
};
