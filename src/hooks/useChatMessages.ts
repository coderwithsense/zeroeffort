import { useEffect } from "react";
import useSWR from "swr";

const fetchMessages = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch messages");
    const data = await res.json();
    return data.messages;
};

export const useChatMessages = (
    chatId: string,
    setMessages: (messages: Message[]) => void
) => {
    const { data: fetchedMessages, error: messagesError } = useSWR(
        chatId ? `/api/chat?chatId=${chatId}` : null,
        fetchMessages
    );

    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages, setMessages]);

    return { messagesError };
};