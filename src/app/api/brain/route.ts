import { getBrain } from "@/services/ai.tools";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        const brain = await getBrain(userId);
        if (!brain) {
            return new Response("Brain not found", { status: 404 });
        }
        return new Response(JSON.stringify(brain), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in brain API:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}