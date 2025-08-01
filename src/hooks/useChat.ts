import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { askAIRequest } from "@/hooks/useAskAI";
import { generateUniqueId } from "@/lib/utils";

const fetchChats = async () => {
    const res = await fetch("/api/chat");
    if (!res.ok) throw new Error("Failed to fetch chats");
    const data = await res.json();
    return data.chats;
};

export const useChat = (chatId: string) => {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const {
        data: chats = [],
        error: chatsError,
        mutate: mutateChats,
    } = useSWR<Chat[]>("/api/chat", fetchChats);

    const { trigger, isMutating } = useSWRMutation("/api/chat", askAIRequest);

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
            mutateChats();

            if (chatId === chatId) {
                router.push("/chat");
            }
        } catch (error: any) {
            toast.error("Failed to delete chat");
            console.error(error);
        }
    };

    const handleSubmit = async (prompt: string) => {
        if (!prompt.trim()) return toast.error("Message cannot be empty");

        const userMessage: Message = {
            id: Date.now().toString(),
            content: prompt,
            role: "user",
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);

        setIsTyping(true);

        try {
            const res = await trigger({
                chatId: chatId || generateUniqueId(),
                prompt,
            });

            const aiMessage: Message = {
                id: Date.now().toString() + "-ai",
                content: res.message,
                role: "assistant",
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMessage]);

            if (!chatId) {
                toast.success("New chat created");
                router.push(`/chat/${res.chatId}`);
                mutateChats();
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
    };

    return {
        chats,
        chatsError,
        messages,
        setMessages,
        isTyping,
        isMutating,
        handleDeleteChat,
        handleSubmit,
        handleNewChat,
        mutateChats,
    };
};