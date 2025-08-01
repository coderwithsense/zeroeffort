import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { ChatItem } from "./ChatItem";
import TodoModal from "@/components/TodoModal";

interface SidebarProps {
  chats: Chat[];
  chatsError: boolean | undefined;
  currentChatId: string;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  isMobile?: boolean;
  onChatSelect?: () => void;
}

export const Sidebar = ({
  chats,
  chatsError,
  currentChatId,
  onNewChat,
  onDeleteChat,
  isMobile = false,
  onChatSelect = () => {},
}: SidebarProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <SidebarHeader />

      <div className="p-3">
        <Button
          className="w-full flex items-center justify-center gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          onClick={onNewChat}
        >
          <PlusIcon size={16} />
          New Chat
        </Button>
      </div>

      <div className="px-3 py-2 text-xs font-medium text-sidebar-foreground/60 uppercase">
        Recent Chats
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {chatsError ? (
          <div className="p-4 text-destructive text-sm">
            Failed to load chats
          </div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-sm text-sidebar-foreground/60 text-center">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                currentChatId={currentChatId}
                onDeleteChat={onDeleteChat}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex gap-2">
          <TodoModal />
          <Button
            className="flex-1 rounded-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
            onClick={() => {
              router.push("/brain");
            }}
          >
            VIEW BRAIN
          </Button>
        </div>
      </div>
    </div>
  );
};
