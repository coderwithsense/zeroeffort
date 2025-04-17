import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the Zod schema for a single todo item
const todoItemSchema = z.object({
    title: z.string().describe("The content/title of the todo item"),
    // priority: z.enum(["low", "medium", "high"]).optional().describe("Optional priority of the todo"),
    // dueDate: z.string().datetime().optional().describe("Optional due date in ISO 8601 format"),
    // tags: z.array(z.string()).optional().describe("Optional list of tags")
});

// Define the schema for the tool input
export const addTodoSchema = z.object({
    todos: z.array(todoItemSchema).describe("List of todos to add")
});

// const aiTools = {
//     addTodo: tool({
//         description: "Add one or more todo items with optional priority, due date, or tags.",
//         parameters: addTodoSchema,
//         execute: async ({ todos }) => {
//             console.log("Received todos:", todos);
//             await createTodo(todos[0].title, userId as string);
//             return {
//                 success: true,
//                 message: `${todos.length} todo(s) added successfully!`
//             };
//         }
//     })
// }

export interface UserMemory {
    likes?: string[];
    dislikes?: string[];
    writingStyle?: string;
    timezone?: string;
    dailyActiveHours?: {
        start: string;
        end: string;
    };
    preferredTools?: string[];

    shortTermGoals?: {
        goal: string;
        timeframe: string;
    }[];

    longTermGoals?: {
        goal: string;
        timeframe: string;
    }[];

    currentProjects?: {
        name: string;
        status: string;
        due?: string;
    }[];

    projectBacklog?: {
        idea: string;
        priority?: string;
    }[];

    workloadStatus?: string;
    knownTopics?: string[];
    interestedTopics?: string[];

    currentLearning?: {
        topic: string;
        progress: number;
    }[];

    checkInPreferences?: {
        moodTracking: boolean;
        askEvery: string;
    };

    customTriggers?: {
        phrase: string;
        action: string;
    }[];

    recentRoutines?: {
        time: string;
        task: string;
    }[];

    notes?: string;
}


export const upsertHybridMemory = async (userId: string, memory: UserMemory) => {
    const brain = await prisma.userMetadata.findUnique({
        where: {
            userId: userId
        }
    });
    if (brain) {
        console.log("Brain found for user:", userId);
        const updatedBrain = await prisma.userMetadata.update({
            where: {
                userId: userId
            },
            data: {
                likes: memory.likes,
                dislikes: memory.dislikes,
                writingStyle: memory.writingStyle,
                timezone: memory.timezone,
                dailyActiveHours: memory.dailyActiveHours,
                preferredTools: memory.preferredTools,
                shortTermGoals: memory.shortTermGoals,
                longTermGoals: memory.longTermGoals,
                currentProjects: memory.currentProjects,
                projectBacklog: memory.projectBacklog,
                workloadStatus: memory.workloadStatus,
                knownTopics: memory.knownTopics,
                interestedTopics: memory.interestedTopics,
                currentLearning: memory.currentLearning,
                checkInPreferences: memory.checkInPreferences,
                customTriggers: memory.customTriggers,
                recentRoutines: memory.recentRoutines,
                notes: memory.notes
            }
        });
        console.log("Updated brain:", updatedBrain);
        return Promise.resolve({ success: true });
    } else {
        console.log("No existing brain found, creating a new one for user:", userId);
        const brainUpload = await prisma.userMetadata.create({
            data: {
                userId: userId,
                likes: memory.likes,
                dislikes: memory.dislikes,
                writingStyle: memory.writingStyle,
                timezone: memory.timezone,
                dailyActiveHours: memory.dailyActiveHours,
                preferredTools: memory.preferredTools,
                shortTermGoals: memory.shortTermGoals,
                longTermGoals: memory.longTermGoals,
                currentProjects: memory.currentProjects,
                projectBacklog: memory.projectBacklog,
                workloadStatus: memory.workloadStatus,
                knownTopics: memory.knownTopics,
                interestedTopics: memory.interestedTopics,
                currentLearning: memory.currentLearning,
                checkInPreferences: memory.checkInPreferences,
                customTriggers: memory.customTriggers,
                recentRoutines: memory.recentRoutines,
                notes: memory.notes,
            }
        });
        console.log("Created new brain:", brainUpload);
    }
    console.log(`Upserting memory for user ${userId}:`, memory);
    return Promise.resolve({ success: true });
}