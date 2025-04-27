import { createTodos, deleteTodo, fetchTodos, updateTodo } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const todos = await fetchTodos(userId);
        return NextResponse.json({ todos }, { status: 200 });
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

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { title, frequency, endDate } = body;

        if (!title) {
            return new NextResponse("Todo title is required", { status: 400 });
        }

        await createTodos([
            {
                title,
                userId,
                frequency: frequency ?? "normal",
                endDate: endDate ? new Date(endDate) : undefined,
            }
        ]);

        return new NextResponse("Todo created successfully", { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { todoId, completed } = await request.json();
        if (!todoId) {
            return new NextResponse("Todo ID is required", { status: 400 });
        }

        //   await prisma.todo.update({
        //     where: { id: todoId },
        //     data: { completed },
        //   });
        await updateTodo(todoId, { completed });

        return new NextResponse("Todo updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating todo:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
