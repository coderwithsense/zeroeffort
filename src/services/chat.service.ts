import { createMessage } from "@/lib/api";
import geminiModel from "@/lib/gemini";
import { generateText } from "ai";

const askAI = async (prompt: string, chatId: string) => {
    try {
        await createMessage({
            chatId,
            role: 'user',
            prompt,
        });

        const message = "You are chatting with an AI assistant. Please ask your question.";

        await createMessage({
            chatId,
            role: 'assistant',
            content: message,
        });

        return message;
    } catch (error) {
        console.error(`[ASK_AI_ERROR]:`, error);
        // Optional: return fallback or throw for upstream handling
        throw new Error("Failed to process AI response.");
    }
};


const createTitle = async (prompt: string) => {
    const result = await generateText({
        model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
        prompt: `Do NOT include explanations, punctuation, or quotation marks. Just return the title, nothing else. Create a title for my chat in not more then 3-5 words, this is the first prompt for the user: "${prompt}"`,
        temperature: 0.5,
    })
    return result.text;
}

export { askAI, createTitle };