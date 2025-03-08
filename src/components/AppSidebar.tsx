import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";

// Icons (import them from lucide-react or your custom location)
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Timer,
  MessageSquare,
  Target,
  LineChart,
  Settings,
} from "lucide-react";

// Example arrays
const mainMenuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
];

const productivityItems = [
  {
    name: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    name: "Focus",
    path: "/focus",
    icon: Timer,
  },
];

const insightsItems = [
  {
    name: "Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: Target,
  },
  {
    name: "Insights",
    path: "/insights",
    icon: LineChart,
  },
];

const bottomItems = [
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  creditsUsed?: number;
  creditsLeft?: number;
}

export function AppSidebar({
  creditsUsed = 10,
  creditsLeft = 90,
}: AppSidebarProps) {
  const pathname = usePathname(); // for highlighting active link

  // Reusable function for rendering a set of sidebar links
  const renderMenuItems = (
    items: { name: string; path: string; icon: any }[]
  ) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname.startsWith(item.path);
      return (
        <Link
          key={item.path}
          href={item.path}
          className={`
            flex items-center p-2 rounded-md transition-colors 
            hover:bg-muted hover:text-primary 
            ${isActive ? "bg-muted text-primary" : "text-foreground"}
          `}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      );
    });
  };

  return (
    <Sidebar className="border-r border-gray-100 dark:border-gray-800">
      <SidebarContent className="flex flex-col justify-between h-full py-6 px-3">

        {/* Top Group (Brand / New Chat) */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-medium px-2 mb-6 flex items-center justify-between">
            <span className="text-primary">ZeroEffort</span>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                {/* <AddChat /> Place your "Add Chat" icon/button here */}
                <span className="cursor-pointer text-sm font-medium">+</span>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                New Chat
              </TooltipContent>
            </Tooltip>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Main Menu Items */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wide px-2 mb-2 text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            {renderMenuItems(mainMenuItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Productivity Items */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wide px-2 mb-2 text-muted-foreground">
            Productivity
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            {renderMenuItems(productivityItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Insights Items */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-xs uppercase tracking-wide px-2 mb-2 text-muted-foreground">
            Insights
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            {renderMenuItems(insightsItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Children can go anywhere you want them, for example below:
           <SidebarGroup>
             <SidebarGroupContent>
               {children}
             </SidebarGroupContent>
           </SidebarGroup>
        */}

        {/* Bottom Items (e.g., Settings) */}
        <SidebarGroup>
          <SidebarGroupContent className="space-y-1">
            {renderMenuItems(bottomItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto pt-4 px-2">
          <div className="flex items-center justify-between">
            {/* Credits Info */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Credits:{" "}
                <Badge variant="outline" className="text-xs px-2">
                  {creditsUsed} / {creditsLeft}
                </Badge>
              </span>
            </div>
            {/* User Button */}
            <UserButton />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
