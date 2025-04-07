"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { askAIRequest } from "@/hooks/useAskAI";
import { PlusIcon, SendIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

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
      console.log("Fetched messages:", fetchedMessages);
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
        chatId: chatId || "new-chat",
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
        router.push(`/chat/${res.chatId}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    router.push("/chat");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
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
                    className={`p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200 ${
                      chatId === chat.id ? "bg-gray-200 font-medium" : ""
                    }`}
                  >
                    {chat.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

export default ChatInterface;
