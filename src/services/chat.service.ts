import {
  createMessage,
  createTodos,
  fetchTodos,
  getMessagesByChatId,
} from "@/lib/api";
import { geminiModel, gptModel } from "@/lib/models";
import { generateText, tool } from "ai";
import { addTodoSchema, getBrain, upsertHybridMemory } from "./ai.tools";
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
      model: geminiModel("gemini-2.0-flash-001"),
      // model: gptModel("gpt-4"),
      system: `"You are Pushpa, the user’s contextual second brain. Track their preferences, projects, and goals silently through conversation. Add todos/reminders when mentioned. Reflect, don’t ask generic questions. Learn passively. Use all chats as memory."`,
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
        getMemory: tool({
          description:
            "Get the user's memory. This includes preferences, mindset, ongoing projects, goals, tools, timezone, learning progress, and open-ended notes. and update the answer to the user query if the user has relevant memory. If the user has no memory, return a message saying 'No memory found.'",
          parameters: z.object({}),
          execute: async () => {
            const memory = await getBrain(userId);
            if (!memory) {
              return {
                success: false,
                message: "No memory found.",
              };
            }
            return {
              success: true,
              message: "Memory retrieved successfully.",
              memory: memory
            };
          }
        }),
        updateUserMemoryHybrid: tool({
          description:
            "Extracts structured and unstructured memory from user input. This includes preferences, mindset, ongoing projects, goals, tools, timezone, learning progress, and open-ended notes. Automatically detect and persist any updates to the user's brain metadata.",
          parameters: z.object({
            likes: z.array(z.string()).optional().describe("Topics, activities, or tools the user enjoys or is passionate about"),
            dislikes: z.array(z.string()).optional().describe("Things the user dislikes, avoids, or finds unproductive"),
            writingStyle: z.string().optional().describe("User's preferred tone or style of writing (e.g., casual, direct, structured)"),
            timezone: z.string().optional().describe("User's current timezone (e.g., Asia/Kolkata, UTC+5:30)"),
            preferredTools: z.array(z.string()).optional().describe("Technologies, frameworks, or platforms the user prefers working with"),

            shortTermGoals: z.array(z.object({
              goal: z.string().describe("Specific goal the user wants to achieve in the short term"),
              timeframe: z.string().describe("Target date or duration for achieving this goal (e.g., 'by April 25, 2025')")
            })).optional().describe("Immediate or near-future objectives"),

            longTermGoals: z.array(z.object({
              goal: z.string().describe("A broader or long-range personal/professional goal"),
              timeframe: z.string().describe("Expected completion timeframe for the long-term goal (e.g., '2025')")
            })).optional().describe("Long-term or ambitious personal/professional goals"),

            currentProjects: z.array(z.object({
              name: z.string().describe("Name or title of the active project"),
              status: z.string().describe("Current status of the project (e.g., active, paused, completed)"),
              due: z.string().optional().describe("Optional due date or milestone for the project (ISO string or natural format)")
            })).optional().describe("Projects the user is actively working on or maintaining"),

            projectBacklog: z.array(z.object({
              idea: z.string().describe("Idea or feature the user wants to pursue"),
              priority: z.string().optional().describe("Optional priority level (e.g., high, medium, low)")
            })).optional().describe("Unstarted ideas, features, or project suggestions the user has noted"),

            knownTopics: z.array(z.string()).optional().describe("Subjects or concepts the user already understands or is confident with"),
            interestedTopics: z.array(z.string()).optional().describe("Topics the user is curious about or wants to explore"),

            currentLearning: z.array(z.object({
              topic: z.string().describe("What the user is currently learning"),
              progress: z.number().describe("Progress in percentage (0–100) or rough estimate of completion")
            })).optional().describe("Ongoing learning efforts, certifications, or personal upskilling plans"),

            notes: z.string().optional().describe("Freeform notes, thoughts, mindset, patterns, or personality insights about the user")
          }),
          execute: async (data) => {
            await upsertHybridMemory(userId, data);
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
