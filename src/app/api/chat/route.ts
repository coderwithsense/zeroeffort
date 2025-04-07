import { createChat, getChatById, getMessagesByChatId } from "@/lib/api";
import prisma from "@/lib/prisma";
import { askAI } from "@/services/chat.service";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated',
            }, { status: 401 });
        }

        const { chatId, prompt, messages } = await request.json();

        if (!prompt) {
            return NextResponse.json({
                success: false,
                message: 'Prompt is required',
            }, { status: 400 });
        }

        let chat = await getChatById(chatId);
        if (!chat) {
            chat = await createChat(chatId, prompt, userId);
        }

        const message = await askAI(prompt, chat?.chatId as string)

        return NextResponse.json({
            success: true,
            message: message
        }, { status: 200 });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while processing your request',
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const chatId = searchParams.get("chatId");

        if (!chatId) {
            return NextResponse.json({
                success: false,
                message: "chatId is required",
            }, { status: 400 });
        }

        const messages = await getMessagesByChatId(chatId);

        if (!messages || messages.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No messages found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            messages,
        }, { status: 200 });

    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while processing your request",
        }, { status: 500 });
    }
}
