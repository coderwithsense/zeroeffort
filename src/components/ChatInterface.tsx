"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { askAIRequest } from "@/hooks/useAskAI";
import {
  PlusIcon,
  SendIcon,
  MenuIcon,
  MessageSquareIcon,
  TrashIcon,
  UserIcon,
  ZapIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { generateUniqueId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TodoModal from "./TodoModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
}

interface Chat {
  id: string;
  chatId: string;
  title: string;
  createdAt: string;
}

interface SuggestionProps {
  text: string;
  icon?: React.ReactNode;
  onClick: (text: string) => void;
}

const fetchMessages = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch messages");
  const data = await res.json();
  return data.messages;
};

const fetchChats = async () => {
  const res = await fetch("/api/chat");
  if (!res.ok) throw new Error("Failed to fetch chats");
  const data = await res.json();
  return data.chats;
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  // Use state to track if component has mounted
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5 text-muted-foreground" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-muted-foreground" />
      ) : (
        <MoonIcon className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
};

// Chat Message Component
const ChatMessage = ({ message }: { message: Message }) => {
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
          <ZapIcon size={18} className="text-primary" />
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

// Empty Chat with Suggestions Component
const EmptyChatSuggestions = ({
  suggestions,
  onSuggestionClick,
}: {
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
        <ZapIcon size={24} className="text-primary" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">
        How can I help you today?
      </h2>

      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Start a conversation or select a suggestion below
      </p>

      <div className="max-w-lg w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            text={suggestion}
            onClick={onSuggestionClick}
          />
        ))}
      </div>
    </div>
  );
};

// Sidebar Chat Item Component
const ChatItem = ({
  chat,
  currentChatId,
  onDeleteChat,
}: {
  chat: Chat;
  currentChatId: string;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
}) => {
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

// Sidebar Component
const Sidebar = ({
  chats,
  chatsError,
  currentChatId,
  onNewChat,
  onDeleteChat,
  isMobile = false,
  onChatSelect = () => {},
}: {
  chats: Chat[];
  chatsError: boolean | undefined;
  currentChatId: string;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  isMobile?: boolean;
  onChatSelect?: () => void;
}) => {
  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <ZapIcon className="h-5 w-5 text-sidebar-primary" />
          <span className="font-medium text-sidebar-foreground">
            ZeroEffort
          </span>
        </div>
        {/* <ThemeToggle /> */}
      </div>

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
        <TodoModal />
      </div>
    </div>
  );
};

// Suggestion Button Component
const SuggestionButton = ({ text, icon, onClick }: SuggestionProps) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="p-4 bg-card rounded-lg shadow-sm border border-border text-left hover:bg-accent/5 transition-colors text-sm hover:border-primary/20"
    >
      <div className="flex items-start gap-2">
        {icon && <div className="mt-0.5">{icon}</div>}
        <span className="text-foreground">{text}</span>
      </div>
    </button>
  );
};

// Main Chat Interface Component
const ChatInterface = () => {
  const router = useRouter();
  const params = useParams();
  const chatId = (params?.chatId as string) || "";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Suggestions for new chats
  const suggestions = [
    "Help me create a weekly meal plan",
    "Explain quantum computing in simple terms",
    "Draft an email to request time off work",
    "Write a short story about a space explorer",
  ];

  // Fetch chats for sidebar
  const {
    data: chats = [],
    error: chatsError,
    mutate: mutateChats,
  } = useSWR<Chat[]>("/api/chat", fetchChats);

  // Fetch messages for current chat
  const { data: fetchedMessages, error: messagesError } = useSWR(
    chatId ? `/api/chat?chatId=${chatId}` : null,
    fetchMessages
  );

  // Handle sending messages
  const { trigger, isMutating } = useSWRMutation("/api/chat", askAIRequest);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("/api/chat", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      toast.success("Chat deleted successfully");

      // Force refetch of chats
      mutateChats();

      // Redirect to main chat page if the current chat was deleted
      if (params?.chatId === chatId) {
        router.push("/chat");
      }
    } catch (error: any) {
      toast.error("Failed to delete chat");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return toast.error("Message cannot be empty");

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;
    setPrompt("");
    setIsTyping(true);

    try {
      const res = await trigger({
        chatId: chatId || generateUniqueId(),
        prompt: currentPrompt,
      });

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: res.message,
        role: "assistant",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // If this was a new chat, redirect to the chat page
      if (!chatId) {
        toast.success("New chat created");
        router.push(`/chat/${res.chatId}`);
        mutateChats(); // Refresh chat list
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    router.push("/chat");
    setSidebarOpen(false); // Close sidebar on mobile after selecting
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
    // Auto-focus input after selecting a suggestion
    const inputElement = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (inputElement) inputElement.focus();
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
        <ZapIcon className="h-5 w-5 text-primary" />
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
                <ZapIcon className="h-5 w-5 text-sidebar-primary" />
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

                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 bg-secondary/10">
                      <ZapIcon size={18} className="text-primary" />
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:150ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:300ms]"></div>
                      </div>
                    </div>
                  </div>
                )}
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
        <div className="border-t border-border p-4 bg-card">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type your message..."
              className="flex-1 border-input focus:ring-2 focus:ring-primary/30 focus:border-primary py-6"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSubmit}
                  disabled={isMutating || !prompt.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 rounded-full shadow-sm disabled:bg-primary/50"
                >
                  <SendIcon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
          <div className="text-xs text-center text-muted-foreground mt-2">
            Press Enter to send
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
