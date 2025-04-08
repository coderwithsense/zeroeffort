import { createChat, getChatById, getChats, getMessagesByChatId } from "@/lib/api";
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

        const message = await askAI(prompt, chat?.chatId as string, userId)

        return NextResponse.json({
            success: true,
            message: message,
            chatId: chat?.chatId,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while processing your request',
            chatId: 'chat'
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
        if (chatId) {
            const messages = await getMessagesByChatId(chatId);
            return NextResponse.json({
                success: true,
                messages,
            }, { status: 200 });
        }

        const chats = await getChats(userId);

        return NextResponse.json({
            success: true,
            chats,
        }, { status: 200 });
    } catch (error) {
        console.error("Error in chats API:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while processing your request",
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            }, { status: 401 });
        }

        const { chatId } = await request.json();

        if (!chatId) {
            return NextResponse.json({
                success: false,
                message: "Chat ID is required",
            }, { status: 400 });
        }

        await prisma.chat.delete({
            where: {
                chatId: chatId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Chat deleted successfully",
        }, { status: 200 });
    } catch (error) {
        console.error("Error deleting chat:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting the chat",
        }, { status: 500 });
    }
}