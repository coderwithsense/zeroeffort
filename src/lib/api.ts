import { createTitle } from '@/services/chat.service';
import { addDays, addWeeks, addMonths, isBefore, isAfter, isSameDay } from "date-fns";
import prisma from './prisma';

export type MessageRole = 'system' | 'user' | 'assistant';
interface CreateMessageParams {
  chatId: string;
  role: MessageRole;
  content?: string;
  prompt?: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  todoListId: string;
  frequency: 'normal' | 'daily' | 'weekly' | 'monthly';
  createdAt: Date;
  endDate?: Date;
}

export async function getChats(userId: string) {
  return prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      chatId: true,
      title: true,
      createdAt: true
    }
  });

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

export const deleteChatAndMessages = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        chatId: chatId
      }
    })
    if (!chat) {
      throw new Error(`Chat not found with ID: ${chatId}`);
    }

    await prisma.message.deleteMany({
      where: {
        chatId: chatId
      }
    });

    await prisma.chat.delete({
      where: {
        chatId: chatId
      }
    });

    return { success: true };
  } catch (error) {
    console.error(`[CHAT_API_DELETE_ERROR]: ${error}`);
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

export async function saveMessage(content: string, role: MessageRole, chatId: string) {
  return prisma.message.create({
    data: {
      content,
      role,
      chatId,
    },
  });
}

export async function fetchTodos(userId: string) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
    },
    orderBy: { createdAt: "desc" },
  });

  const today = new Date();

  const expandedTodos = todos.flatMap(todo => {
    if (todo.frequency === 'normal') {
      return [todo];
    }

    const todosToShow = [];
    let nextDate = todo.createdAt;

    // Generate future instances till endDate
    while (isBefore(nextDate, today) || isSameDay(nextDate, today)) {
      if (todo.endDate && isAfter(nextDate, todo.endDate)) {
        break;
      }
      if (isSameDay(nextDate, today)) {
        todosToShow.push({
          ...todo,
          createdAt: nextDate
        });
      }

      if (todo.frequency === 'daily') {
        nextDate = addDays(nextDate, 1);
      } else if (todo.frequency === 'weekly') {
        nextDate = addWeeks(nextDate, 1);
      } else if (todo.frequency === 'monthly') {
        nextDate = addMonths(nextDate, 1);
      }
    }

    return todosToShow;
  });

  return expandedTodos;
}

export async function createTodos(
  todos: {
    title: string;
    userId: string;
    todoListId?: string;
    frequency?: 'normal' | 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  }[]
) {
  try {
    const createdTodos = await prisma.$transaction(
      todos.map((todo) =>
        prisma.todo.create({
          data: {
            title: todo.title,
            userId: todo.userId,
            todoListId: todo.todoListId,
            frequency: todo.frequency ?? 'normal',
            endDate: todo.endDate,
          },
        })
      )
    );
    return createdTodos;
  } catch (error) {
    console.error(`[TODO_API_CREATE_ERROR]: ${error}`);
    throw error;
  }
}

export async function updateTodo(id: string, data: Partial<Todo>) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  return prisma.todo.update({
    where: { id },
    data,
  });
}

export async function deleteTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  return prisma.todo.delete({ where: { id } });
}

export async function toggleTodoCompletion(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  return prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });
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