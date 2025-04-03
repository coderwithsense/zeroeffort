import prisma from "@/lib/prisma";
import { createTitle } from "@/services/chat.service";
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
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({
                success: false,
                message: 'Prompt is required',
            }, { status: 400 });
        }

        // Create a new chat entry
        const chat = await prisma.chat.create({
            data: {
                title: await createTitle(prompt),
                userId: userId,
            }
        })
        return NextResponse.json({
            success: true,
            chatId: chat.id,
            title: chat.title,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while processing your request',
        }, { status: 500 });
    }
}