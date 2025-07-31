import prisma from "@/lib/prisma";
import { z } from "zod";

const todoItemSchema = z.object({
    title: z.string().describe("The content/title of the todo item"),
});

export const addTodoSchema = z.object({
    todos: z.array(todoItemSchema).describe("List of todos to add")
});


export const upsertHybridMemory = async (userId: string, memory: UserMemory) => {
    const brain = await prisma.userMetadata.findUnique({
        where: { userId }
    });

    // Helper to combine arrays instead of overwriting them
    function mergeArray<T>(existing?: T[], incoming?: T[]) {
        if (!incoming || incoming.length === 0) return existing;
        return existing ? [...existing, ...incoming] : incoming;
    }

    if (brain) {
        console.log("Brain found for user:", userId);
        const updatedBrain = await prisma.userMetadata.update({
            where: { userId },
            data: {
                likes: mergeArray(brain.likes, memory.likes),
                dislikes: mergeArray(brain.dislikes, memory.dislikes),
                writingStyle: memory.writingStyle ?? brain.writingStyle,
                timezone: memory.timezone ?? brain.timezone,
                dailyActiveHours: memory.dailyActiveHours ?? brain.dailyActiveHours,
                preferredTools: mergeArray(brain.preferredTools, memory.preferredTools),
                shortTermGoals: mergeArray(
                    Array.isArray(brain.shortTermGoals) ? brain.shortTermGoals : undefined,
                    Array.isArray(memory.shortTermGoals) ? memory.shortTermGoals : undefined
                ),
                longTermGoals: mergeArray(
                    Array.isArray(brain.longTermGoals) ? brain.longTermGoals : undefined,
                    Array.isArray(memory.longTermGoals) ? memory.longTermGoals : undefined
                ),
                currentProjects: mergeArray(
                    Array.isArray(brain.currentProjects) ? brain.currentProjects : undefined,
                    Array.isArray(memory.currentProjects) ? memory.currentProjects : undefined
                ),
                projectBacklog: mergeArray(
                    Array.isArray(brain.projectBacklog) ? brain.projectBacklog : undefined,
                    Array.isArray(memory.projectBacklog) ? memory.projectBacklog : undefined
                ),
                workloadStatus: memory.workloadStatus ?? brain.workloadStatus,
                knownTopics: mergeArray(brain.knownTopics, memory.knownTopics),
                interestedTopics: mergeArray(brain.interestedTopics, memory.interestedTopics),
                currentLearning: mergeArray(
                    Array.isArray(brain.currentLearning) ? brain.currentLearning : undefined,
                    memory.currentLearning
                ),
                checkInPreferences: memory.checkInPreferences ?? brain.checkInPreferences,
                customTriggers: mergeArray(
                    Array.isArray(brain.customTriggers) ? brain.customTriggers : undefined,
                    Array.isArray(memory.customTriggers) ? memory.customTriggers : undefined
                ),
                recentRoutines: mergeArray(
                    Array.isArray(brain.recentRoutines) ? brain.recentRoutines : undefined,
                    memory.recentRoutines
                ),
                notes: memory.notes ?? brain.notes
            }
        });
        console.log("Updated brain:", updatedBrain);
        return { success: true };
    } else {
        console.log("No existing brain found, creating a new one for user:", userId);
        const brainUpload = await prisma.userMetadata.create({
            // where: { /* If using unique constraint, omit or adapt as needed */ },
            data: {
                userId,
                ...memory
            }
        });
        console.log("Created new brain:", brainUpload);
    }

    console.log(`Upserting memory for user ${userId}:`, memory);
    return { success: true };
};

export async function getBrain(userId: string) {
    const brain = await prisma.userMetadata.findUnique({
        where: {
            userId: userId
        }
    });
    if (brain) {
        console.log("Brain found for user:", userId);
        return brain;
    } else {
        console.log("No existing brain found for user:", userId);
        return null;
    }
}