import { fetchTodos } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const todos = await fetchTodos(userId);
        return NextResponse.json({todos: todos}, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    
}