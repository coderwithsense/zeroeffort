import { createMessage, createTodos, fetchTodos, getMessagesByChatId, MessageRole } from "@/lib/api"; // Import the new function
import geminiModel from "@/lib/gemini";
import { generateText, tool } from "ai";
import { addTodoSchema } from "./ai.tools";
import { z } from "zod";
import { title } from "process";

const askAI = async (prompt: string, chatId: string, userId: string) => {
    try {
        await createMessage({
            chatId,
            role: 'user',
            prompt,
        });

        const message = await generateResponse(prompt, chatId, userId); // Pass chatId to generateResponse

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

const todosObjectSchema = z.object({
    title: z.string().describe("The content/title of the todo item"),
    completed: z.boolean().describe("Whether the todo item is completed"),
})

const generateResponse = async (prompt: string, chatId: string, userId: string) => {
    try {
        const previousMessages = await getMessagesByChatId(chatId);
        console.log("Previous messages:", previousMessages);

        const context = previousMessages
            .map((msg: { role: MessageRole; content: string; }) => `${msg.role === 'user' ? 'User' : 'Pushpa bot'}: ${msg.content}`)
            .join('\n');

        console.log("Previous messages:", context);

        const fullPrompt = `${context}\nUser: ${prompt}\nPushpa bot:`;

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
                }),
                listTodos: tool({
                    description: "List all todos for the current user in a format of listed items and points.",
                    parameters: z.object({}),
                    execute: async () => {
                        const todos = await fetchTodos(userId);
                        console.log(todos);
                        return {
                            success: true,
                            todos: todos.map((todo) => ({
                                title: todo.title,
                                createdAt: todo.createdAt,
                                // Add other fields if needed
                            })),
                        };
                    }
                })
            },
            prompt: prompt, // Use the full prompt with context
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