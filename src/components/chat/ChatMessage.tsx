import React from "react";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-3 duration-300",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-full shrink-0",
          isUser ? "bg-primary/10" : "bg-secondary/10"
        )}
      >
        {isUser ? (
          <UserIcon size={18} className="text-primary" />
        ) : (
          <Image
            src="/logo.png"
            alt="ZeroEffort Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>

      <div
        className={cn(
          "p-4 rounded-lg max-w-3xl overflow-hidden",
          isUser
            ? "bg-primary/5 border border-primary/10 text-foreground"
            : "bg-card border border-border shadow-sm"
        )}
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.content}
        </div>
      </div>
    </div>
  );
};
