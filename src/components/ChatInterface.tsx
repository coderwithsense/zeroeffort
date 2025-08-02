"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useChat } from "@/hooks/useChat";
import { useChatMessages } from "@/hooks/useChatMessages";
import { ThemeToggle } from "./ThemeToggle";
import { ChatMessage } from "./chat/ChatMessage";
import { EmptyChatSuggestions } from "./chat/EmptyChatSuggestions";
import { ChatInput } from "./chat/ChatInput";
import { TypingIndicator } from "./chat/TypingIndicator";

const ChatInterface = () => {
  const params = useParams();
  const chatId = (params?.chatId as string) || "";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Suggestions for new chats
  const suggestions = [
    "Learn that i like to play the guitar",
    "Add to make an AI saas as a todo, and also list all my todos",
    "Draft an email to request time off work",
    "Write a short story about a space explorer",
  ];

  // Custom hooks
  const {
    chats,
    chatsError,
    messages,
    setMessages,
    isTyping,
    isMutating,
    handleDeleteChat,
    handleSubmit,
    handleNewChat,
  } = useChat(chatId);

  const { messagesError } = useChatMessages(chatId, setMessages);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSuggestionClick = (text: string) => {
    handleSubmit(text);
  };

  const handleInputSubmit = (message: string) => {
    handleSubmit(message);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon size={18} />
        </Button>
      </div>

      {/* App Logo for Mobile */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 md:hidden flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="ZeroEffort Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium text-foreground">ZeroEffort</span>
      </div>

      {/* Theme toggle for mobile */}
      <div className="fixed top-4 right-4 z-30 md:hidden">
        <ThemeToggle />
      </div>

      {/* Sidebar - Desktop (always visible) */}
      <div className="hidden md:flex w-72 flex-col transition-all duration-300">
        <Sidebar
          chats={chats}
          chatsError={chatsError}
          currentChatId={chatId}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* For Mobile - Sheet Component */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72 sm:max-w-sm bg-sidebar">
          <SheetHeader className="px-4 py-3 border-b border-sidebar-border">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="ZeroEffort Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sidebar-foreground">ZeroEffort</span>
              </div>
              <ThemeToggle />
            </SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100%-60px)]">
            <Sidebar
              chats={chats}
              chatsError={chatsError}
              currentChatId={chatId}
              onNewChat={handleNewChat}
              onDeleteChat={handleDeleteChat}
              isMobile={true}
              onChatSelect={() => setSidebarOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 px-4 md:px-6 space-y-6 pt-16 md:pt-4">
          {messagesError ? (
            <div className="text-destructive p-4 bg-destructive/10 rounded-lg">
              Failed to load messages
            </div>
          ) : messages.length > 0 ? (
            <>
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping && <TypingIndicator />}
              </div>
              <div ref={messagesEndRef} />
            </>
          ) : (
            <EmptyChatSuggestions
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSubmit={handleInputSubmit} disabled={isMutating} />
      </div>
    </div>
  );
};

export default ChatInterface;
