import React, { useState } from "react";
import Link from "next/link";
import { MessageSquareIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatItemProps {
  chat: Chat;
  currentChatId: string;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
}

export const ChatItem = ({
  chat,
  currentChatId,
  onDeleteChat,
}: ChatItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/chat/${chat.chatId}`}>
      <div
        className={cn(
          "p-3 rounded-md text-sm cursor-pointer hover:bg-sidebar-accent flex justify-between items-center group relative",
          currentChatId === chat.chatId ? "bg-sidebar-accent font-medium" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-2 overflow-hidden">
          <MessageSquareIcon
            size={14}
            className="flex-shrink-0 text-sidebar-primary"
          />
          <span className="truncate text-sidebar-foreground">{chat.title}</span>
        </div>

        {isHovered && (
          <button
            onClick={(e) => onDeleteChat(chat.chatId, e)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-sidebar-accent/80 rounded-full"
            aria-label="Delete chat"
          >
            <TrashIcon size={14} className="text-sidebar-foreground/60" />
          </button>
        )}
      </div>
    </Link>
  );
};
