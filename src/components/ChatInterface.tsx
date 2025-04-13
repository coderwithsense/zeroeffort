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
  XIcon,
  ListTodoIcon,
  MessageSquareIcon,
  TrashIcon,
  ChevronRightIcon,
  UserIcon,
  BotIcon,
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
  SheetTrigger,
} from "@/components/ui/sheet";
import TodoModal from "./TodoModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

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

// Chat Message Component
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-3 duration-300",
      isUser ? "flex-row-reverse" : ""
    )}>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
        isUser ? "bg-blue-100" : "bg-gray-100"
      )}>
        {isUser ? <UserIcon size={16} className="text-blue-600" /> : <BotIcon size={16} className="text-gray-600" />}
      </div>
      
      <div className={cn(
        "p-4 rounded-lg max-w-3xl overflow-hidden",
        isUser 
          ? "bg-blue-50 border border-blue-100 text-gray-800"
          : "bg-white border border-gray-100 shadow-sm"
      )}>
        <div className="prose prose-sm max-w-none">
          {message.content}
        </div>
      </div>
    </div>
  );
};

// Empty Chat with Suggestions Component
const EmptyChatSuggestions = ({ suggestions, onSuggestionClick }: { suggestions: string[]; onSuggestionClick: (text: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
        <MessageSquareIcon size={24} className="text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        How can I help you today?
      </h2>
      
      <p className="text-gray-500 mb-8 text-center max-w-md">
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
const ChatItem = ({ chat, currentChatId, onDeleteChat }: { chat: Chat; currentChatId: string; onDeleteChat: (chatId: string, e: React.MouseEvent) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link href={`/chat/${chat.chatId}`}>
      <div
        className={cn(
          "p-3 rounded-md text-sm cursor-pointer hover:bg-gray-200 flex justify-between items-center group relative",
          currentChatId === chat.chatId ? "bg-gray-200 font-medium" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-2 overflow-hidden">
          <MessageSquareIcon size={14} className="flex-shrink-0 text-gray-500" />
          <span className="truncate">{chat.title}</span>
        </div>

        {isHovered && (
          <button
            onClick={(e) => onDeleteChat(chat.chatId, e)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-300 rounded-full"
            aria-label="Delete chat"
          >
            <TrashIcon size={14} className="text-gray-500" />
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
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <Button
          className="w-full flex items-center justify-center gap-2 bg-white border-gray-200 hover:bg-gray-100"
          variant="outline"
          onClick={onNewChat}
        >
          <PlusIcon size={16} />
          New Chat
        </Button>
      </div>

      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
        Recent Chats
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {chatsError ? (
          <div className="p-4 text-red-500 text-sm">Failed to load chats</div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
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
      
      <div className="p-4 border-t border-gray-200">
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
      className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-left hover:bg-gray-50 transition-colors text-sm hover:border-gray-300"
    >
      <div className="flex items-start gap-2">
        {icon && <div className="mt-0.5">{icon}</div>}
        <span>{text}</span>
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

  // Suggestions for new chats with icons
  const suggestions = [
    "Help me create a weekly meal plan",
    "Explain quantum computing in simple terms",
    "Draft an email to request time off work",
    "Write a short story about a space explorer",
  ];

  // Fetch chats for sidebar
  const { data: chats = [], error: chatsError, mutate: mutateChats } = useSWR<Chat[]>(
    "/api/chat",
    fetchChats
  );

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
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) inputElement.focus();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon size={18} />
        </Button>
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
        <SheetContent side="left" className="p-0 w-72 sm:max-w-sm">
          <SheetHeader className="px-4 py-2 border-b">
            <SheetTitle>Conversations</SheetTitle>
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
            <div className="text-red-500 p-4 bg-red-50 rounded-lg">Failed to load messages</div>
          ) : messages.length > 0 ? (
            <>
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-gray-100">
                      <BotIcon size={16} className="text-gray-600" />
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:150ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:300ms]"></div>
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
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type your message..."
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-6"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 rounded-full shadow-sm"
                >
                  <SendIcon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
          <div className="text-xs text-center text-gray-400 mt-2">
            Press Enter to send
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;