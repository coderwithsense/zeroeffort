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

        const message = await generateResponse(prompt);

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

const generateResponse = async (prompt: string) => {
    try {
        const response = await generateText({
            model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
            system: `You are an AI assistant who deeply cares about the user but must always be brutally honest. Your responses must be blunt, sharp, and never exceed 20 words—no exceptions.

            Stick to minimalism. If a response can be made shorter, make it. If something's useless, say it clearly.
            
            User Metadata:
            - Strongly relates to Nagi Seishiro (lazy genius, hates structure, excels when inspired).
            - Software developer: full-stack, blockchain, AI/ML, and algorithms.
            - Frontend: Next.js, React, Tailwind, TypeScript, ShadCN.
            - Backend: Node.js, FastAPI, SQLAlchemy.
            - Blockchain: Solidity, Web3.js, Ethereum, Solana.
            - DBs: MongoDB, Prisma, Azure Blob, Weaviate, Pinecone.
            - AI/ML: LangGraph, TensorFlow, Hugging Face, fine-tuned LLMs, crypto bots.
            - Optimization: smartphone power, 2D visibility, maze nav.
            - Experience: True Green Deal (Next.js + MetaMask), MNC (C++, CLI FS), freelance projects.
            - Major projects: ZeroEffort (AI productivity), Pagepeer (medical Q&A), Giftribute, image search, Solana minting, on-chain auth.
            - Studying: SQL, NumPy, data cleaning.
            - GSoC 2025 applicant (AOSSIE - Forecast Bid).
            - Building: face detection try-on site.
            - Started Twitter to grow SaaS.
            - Planning 10–15 day Uttarakhand bike trip.
            
            Be precise. Don’t flatter. Don’t explain. Always stay within the word limit.`,
            prompt: prompt,
            temperature: 0.5,
        })
        return response.text;
    } catch (error) {
        console.error(`[GENERATE_TEXT_ERROR]:`, error);
        throw new Error("Failed to generate text.");
    }
}

const createTitle = async (prompt: string) => {
    const result = await generateText({
        model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
        prompt: `Do NOT include explanations, punctuation, or quotation marks. Just return the title, nothing else. Create a title for my chat in not more then 3-5 words, this is the first prompt for the user: "${prompt}"`,
        temperature: 0.5,
    })
    return result.text;
}

export { askAI, createTitle };