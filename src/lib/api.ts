import { createTitle } from '@/services/chat.service';
import prisma from './prisma';

type MessageRole = 'system' | 'user' | 'assistant';
interface CreateMessageParams {
  chatId: string;
  role: MessageRole;
  content?: string;
  prompt?: string;
}

export const getChatById = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        chatId: chatId
      }
    })
    return chat;
  } catch (error) {
    console.error(`[CHAT_API_FETCH_ERROR]: ${error}`)
    throw error;
  }
}

export const createChat = async (chatId: string, prompt: string, userId: string) => {
  try {
    const newTitle = await createTitle(prompt);
    const newChat = await prisma.chat.create({
      data: {
        chatId: chatId,
        title: newTitle,
        userId: userId
      }
    })
    return newChat;
  } catch (error) {
    console.error(`[CHAT_API_CREATE_ERROR]: ${error}`)
    throw error;
  }
}

export const createMessage = async ({
  chatId,
  role,
  content,
  prompt,
}: CreateMessageParams) => {
  try {
    const messageContent = role === "user" ? prompt : content;

    if (!messageContent) {
      throw new Error(`Missing content for role: ${role}`);
    }

    const message = await prisma.message.create({
      data: {
        content: messageContent,
        role,
        chatId,
      },
    });

    return message;
  } catch (error) {
    console.error(`[MESSAGE_API_CREATE_ERROR]: ${error}`);
    throw error;
  }
};

export const getMessagesByChatId = async (chatId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return messages;
  } catch (error) {
    console.error(`[MESSAGE_API_FETCH_ERROR]: ${error}`);
    throw error;
  }
}

export const saveWaitlistEmail = async (email: string) => {
  try {
    await prisma.waitlistEntry.create({
      data: { email }
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving waitlist email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const savePlaygroundPrompt = async (prompt: string, userId?: string) => {
  try {
    await prisma.playgroundPrompt.create({
      data: { prompt, userId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving playground prompt:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const saveUserData = async (userId: string, email: string) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: { clerkId: userId, email }
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};