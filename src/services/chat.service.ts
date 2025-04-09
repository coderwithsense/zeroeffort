import { createMessage, createTodos, fetchTodos } from "@/lib/api";
import geminiModel from "@/lib/gemini";
import { generateText, tool } from "ai";
import { addTodoSchema } from "./ai.tools";
import { z } from "zod";

const askAI = async (prompt: string, chatId: string, userId: string) => {
    try {
        await createMessage({
            chatId,
            role: 'user',
            prompt,
        });

        const message = await generateResponse(prompt, userId);

        await createMessage({
            chatId,
            role: 'assistant',
            content: message,
        });

        return message;
    } catch (error) {
        console.error(`[ASK_AI_ERROR]:`, error);
        throw new Error("Failed to process AI response.");
    }
};

const generateResponse = async (prompt: string, userId: string) => {
    try {
        const response = await generateText({
            model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
            system: `You are Pushpa bot.`,
            tools: {
                addTodos: tool({
                    description: "Add one or more todo items with optional priority, due date, or tags. Only use this tool if the user explicitly asks to add todos/tasks in the database.",
                    parameters: addTodoSchema,
                    execute: async ({ todos }) => {
                        console.log("Received todos:", todos);

                        const formattedTodos = todos.map((todo) => ({
                            title: todo.title,
                            userId,
                        }));

                        await createTodos(formattedTodos);

                        return {
                            success: true,
                            message: `${todos.length} todo(s) added successfully!`
                        };
                    }
                })
            },
            prompt: prompt,
            onStepFinish: ({ usage }) => {
                console.log(`Usage after total: ${usage.completionTokens}`);
            },
            temperature: 0.5,
            maxSteps: 10
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