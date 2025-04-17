import {
  createMessage,
  createTodos,
  fetchTodos,
  getMessagesByChatId,
} from "@/lib/api";
import geminiModel from "@/lib/gemini";
import { generateText, tool } from "ai";
import { addTodoSchema } from "./ai.tools";
import { z } from "zod";
import type { CoreMessage } from "ai";
import { title } from "process";

const todosObjectSchema = z.object({
  title: z.string().describe("The content/title of the todo item"),
  completed: z.boolean().describe("Whether the todo item is completed"),
});

const askAI = async (prompt: string, userId: string, chatId: string) => {
  try {
    await createMessage({
      chatId,
      role: "user",
      prompt,
    });

    const message = await generateResponse(prompt, userId, chatId);

    await createMessage({
      chatId,
      role: "assistant",
      content: message,
    });

    return message;
  } catch (error) {
    console.error(`[ASK_AI_ERROR]:`, error);
    throw new Error("Failed to process AI response.");
  }
};

const generateResponse = async (prompt: string, userId: string, chatId: string) => {
  try {
    const previousMessages = await getMessagesByChatId(chatId);
    const messages: CoreMessage[] = previousMessages.map(({ role, content }) => ({
      role,
      content,
    }));

    messages.push({ role: "user", content: prompt });

    const response = await generateText({
      model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
      system: `You are Pushpa bot. You know everything about the user from the past, preferences, and projects. Use this to personalize your suggestions. Extract metadata if useful for future conversations.`,
      messages,
      tools: {
        addTodos: tool({
          description:
            "Add one or more todo items with optional priority, due date, or tags. Only use this tool if the user explicitly asks to add todos/tasks in the database.",
          parameters: addTodoSchema,
          execute: async ({ todos }) => {
            const formattedTodos = todos.map(({ title }) => ({ title, userId }));
            await createTodos(formattedTodos);
            return {
              success: true,
              message: `${todos.length} todo(s) added successfully!`,
            };
          },
        }),
        listTodos: tool({
          description:
            "List all todos for the current user in a format of listed items and points.",
          parameters: z.object({}),
          execute: async () => {
            const todos = await fetchTodos(userId);
            return {
              success: true,
              todos: todos.map(({ title, createdAt }) => ({ title, createdAt })),
            };
          },
        }),
        addReminder: tool({
          description: `Add a reminder for a specific task asked by the user. A reminder is a date and time when the user wants to be reminded about that particular task. Current time is ${new Date().toISOString()} for context. Do not except the past date and time as a reminder. Say the reminder was not set if the date and time is in the past.`,
          parameters: z.object({
            title: z.string().describe("The content/title of the todo item"),
            dueDate: z.string().describe("The date and time for the reminder."),
            repeat: z.enum(["daily", "weekly", "monthly", "yearly"]).optional().describe("The frequency of the reminder"),
            repeatEnd: z.string().optional().describe("The end date for the repeat reminder in the format YYYY-MM-DDTHH:mm:ss"),
          }),
          execute: async ({ title, dueDate, repeat, repeatEnd }) => {
            console.log(`Setting reminder for ${title} on ${dueDate}`);
          }
        }),
        extractUserMemoryHybrid: tool({
          description: "Extract structured and unstructured user memory like likes, goals, projects, and freeform notes.",
          parameters: z.object({
            likes: z.array(z.string()).optional(),
            dislikes: z.array(z.string()).optional(),
            writingStyle: z.string().optional(),
            timezone: z.string().optional(),
            preferredTools: z.array(z.string()).optional(),
            shortTermGoals: z.array(z.object({
              goal: z.string(),
              timeframe: z.string()
            })).optional(),
            longTermGoals: z.array(z.object({
              goal: z.string(),
              timeframe: z.string()
            })).optional(),
            currentProjects: z.array(z.object({
              name: z.string(),
              status: z.string(),
              due: z.string().optional()
            })).optional(),
            projectBacklog: z.array(z.object({
              idea: z.string(),
              priority: z.string().optional()
            })).optional(),
            knownTopics: z.array(z.string()).optional(),
            interestedTopics: z.array(z.string()).optional(),
            currentLearning: z.array(z.object({
              topic: z.string(),
              progress: z.number()
            })).optional(),
            notes: z.string().optional()
          }),
          execute: async (data) => {
            // await upsertHybridMemory(userId, data); // You'll implement this
            console.log(`User memory updated for ${userId}:`, data);
            return { success: true, message: "Pushpa brain updated successfully." };
          }
        })
      },
      temperature: 0.5,
      maxSteps: 10,
      onStepFinish: ({ usage }) =>
        console.log(`Usage after total: ${usage.completionTokens}`),
    });

    return response.text;
  } catch (error) {
    console.error(`[GENERATE_TEXT_ERROR]:`, error);
    throw new Error("Failed to generate text.");
  }
};

const createTitle = async (prompt: string) => {
  const result = await generateText({
    model: geminiModel("gemini-2.0-flash-lite-preview-02-05"),
    prompt: `Do NOT include explanations, punctuation, or quotation marks. Just return the title, nothing else. Create a title for my chat in not more than 3-5 words, this is the first prompt for the user: "${prompt}"`,
    temperature: 0.5,
  });

  return result.text;
};

export { askAI, createTitle };
