"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { askAIRequest } from "@/hooks/useAskAI";
import { PlusIcon, SendIcon, MenuIcon, XIcon, ListTodoIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

interface Todo {
  id: string;
  title: string;
  completed: boolean;
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

const ChatInterface = () => {
  const router = useRouter();
  const params = useParams();
  const chatId = (params?.chatId as string) || "";

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [todosOpen, setTodosOpen] = useState(false);

  // Mock todos data - this would be replaced with an API call
  const mockTodos: Todo[] = [
    { id: "1", title: "Complete the sidebar component", completed: false },
    { id: "2", title: "Add responsive design", completed: true },
    { id: "3", title: "Implement todos modal", completed: false },
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

      {/* Todos Button */}
      <div className="fixed top-4 right-4 z-30">
        <Dialog open={todosOpen} onOpenChange={setTodosOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
            >
              <ListTodoIcon size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Todos</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-96 overflow-y-auto py-4">
              {mockTodos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border"
                >
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    className="h-4 w-4"
                    readOnly
                  />
                  <span className={cn(
                    "flex-1",
                    todo.completed && "line-through text-gray-400"
                  )}>
                    {todo.title}
                  </span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sidebar - Desktop (always visible) and Mobile (Sheet component) */}
      {/* For Desktop */}
      <div className={cn(
        "hidden md:flex w-64 bg-gray-100 border-r border-gray-200 flex-col transition-all duration-300",
      )}>
        <SidebarContent 
          chats={chats} 
          chatsError={chatsError} 
          chatId={chatId} 
          handleNewChat={handleNewChat} 
        />
      </div>

      {/* For Mobile - Sheet Component */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 sm:max-w-sm">
          <SheetHeader className="px-4 py-2">
            <SheetTitle>Conversations</SheetTitle>
          </SheetHeader>
          <SidebarContent 
            chats={chats} 
            chatsError={chatsError} 
            chatId={chatId} 
            handleNewChat={handleNewChat} 
          />
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
                className={`p-4 rounded-lg max-w-3xl ${
                  message.role === "user"
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {message.content}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Start a new conversation
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
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
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted SidebarContent component for reuse between desktop and mobile
const SidebarContent = ({ 
  chats, 
  chatsError, 
  chatId, 
  handleNewChat 
}: { 
  chats: Chat[], 
  chatsError: any, 
  chatId: string,
  handleNewChat: () => void 
}) => {
  return (
    <>
      <div className="p-4">
        <Button
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={handleNewChat}
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
              <Link href={`/chat/${chat.chatId}`} key={chat.id}>
                <div
                  className={cn(
                    "p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200",
                    chatId === chat.chatId ? "bg-gray-200 font-medium" : ""
                  )}
                >
                  {chat.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatInterface;