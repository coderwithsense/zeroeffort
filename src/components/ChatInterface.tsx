"use client";
import React, { useState, useEffect } from "react";
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
  onClick: (text: string) => void;
}

const fetchMessages = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch messages");
  const data = await res.json();
  return data.messages;
};

// Extracted to its own separate component
const Sidebar = ({
  chats,
  chatsError,
  currentChatId,
  onNewChat,
  isMobile = false,
  onChatSelect = () => {},
}: {
  chats: Chat[];
  chatsError: any;
  currentChatId: string;
  onNewChat: () => void;
  isMobile?: boolean;
  onChatSelect?: () => void;
}) => {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const router = useRouter();

  const deleteChatRequest = async (
    url: string,
    { arg }: { arg: { chatId: string } }
  ) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }

    return response.json();
  };

  const { trigger: deleteChatTrigger, isMutating: isDeleting } = useSWRMutation(
    "/api/chat",
    deleteChatRequest
  );

  // const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ chatId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete chat");
  //     }

  //     toast.success("Chat deleted successfully");

  //     // Force refetch of chats
  //     window.location.href = "/chat";
  //   } catch (error) {
  //     toast.error("Failed to delete chat");
  //     console.error(error);
  //   }
  // };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteChatTrigger({ chatId });

      toast.success("Chat deleted successfully");

      // Use router.replace or mutate SWR data to refresh without full reload
      router.replace("/chat"); // if already on that page
    } catch (error: any) {
      toast.error("Failed to delete chat");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 border-r border-gray-200">
      <div className="p-4">
        <Button
          className="w-full flex items-center justify-center gap-2 hover:bg-gray-200"
          variant="outline"
          onClick={onNewChat}
        >
          <PlusIcon size={16} />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatsError ? (
          <div className="p-4 text-red-500 text-sm">Failed to load chats</div>
        ) : (
          <div className="space-y-1 p-2">
            {chats.map((chat) => (
              <Link
                href={`/chat/${chat.chatId}`}
                key={chat.id}
                onClick={() => isMobile && onChatSelect()}
              >
                <div
                  className={cn(
                    "p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200 flex justify-between items-center group relative",
                    currentChatId === chat.chatId
                      ? "bg-gray-200 font-medium"
                      : ""
                  )}
                  onMouseEnter={() => setHoveredChatId(chat.chatId)}
                  onMouseLeave={() => setHoveredChatId(null)}
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <MessageSquareIcon
                      size={14}
                      className="flex-shrink-0 text-gray-500"
                    />
                    <span className="truncate">{chat.title}</span>
                  </div>

                  {hoveredChatId === chat.chatId && (
                    <button
                      onClick={(e) => handleDeleteChat(chat.chatId, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-300 rounded-full"
                      aria-label="Delete chat"
                    >
                      <TrashIcon size={14} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Suggestion component for new chats
const SuggestionButton: React.FC<SuggestionProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-left hover:bg-gray-50 transition-colors text-sm"
    >
      {text}
    </button>
  );
};

const fetchChats = async () => {
  const res = await fetch("/api/chat");
  if (!res.ok) throw new Error("Failed to fetch chats");
  const data = await res.json();
  return data.chats;
};

const ChatInterface = () => {
  const router = useRouter();
  const params = useParams();
  const chatId = (params?.chatId as string) || "";

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Suggestions for new chats
  const suggestions = [
    "Help me create a weekly meal plan",
    "Explain quantum computing in simple terms",
    "Draft an email to request time off work",
    "Write a short story about a space explorer",
  ];

  // Fetch chats for sidebar
  const { data: chats = [], error: chatsError } = useSWR<Chat[]>(
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

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

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
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    router.push("/chat");
    setSidebarOpen(false); // Close sidebar on mobile after selecting
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
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

      <div className="fixed top-4 right-4 z-30">
        <TodoModal />
      </div>

      {/* Sidebar - Desktop (always visible) */}
      <div className="hidden md:flex w-64 flex-col transition-all duration-300">
        <Sidebar
          chats={chats}
          chatsError={chatsError}
          currentChatId={chatId}
          onNewChat={handleNewChat}
        />
      </div>

      {/* For Mobile - Sheet Component */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 sm:max-w-sm">
          <SheetHeader className="px-4 py-2">
            <SheetTitle>Conversations</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100%-60px)]">
            <Sidebar
              chats={chats}
              chatsError={chatsError}
              currentChatId={chatId}
              onNewChat={handleNewChat}
              isMobile={true}
              onChatSelect={() => setSidebarOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-16 md:pt-4">
          {messagesError ? (
            <div className="text-red-500">Failed to load messages</div>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "p-4 rounded-lg max-w-3xl",
                  message.role === "user"
                    ? "bg-blue-100 ml-auto text-blue-900"
                    : "bg-white border border-gray-100 shadow-sm"
                )}
              >
                {message.content}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-2xl font-semibold text-gray-700 mb-6">
                How can I help you today?
              </div>

              <div className="max-w-lg w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    text={suggestion}
                    onClick={handleSuggestionClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type your message..."
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={isMutating || !prompt.trim()}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
