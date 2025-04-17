import { deleteTodo, fetchTodos } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const todos = await fetchTodos(userId);
        return NextResponse.json({ todos: todos }, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { todoId } = await request.json();
        if (!todoId) {
            return new NextResponse("Todo ID is required", { status: 400 });
        }
        await deleteTodo(todoId);
        return new NextResponse("Todo deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {

}