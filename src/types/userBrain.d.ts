interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: string;
}

interface Chat {
    id: string;
    chatId: string;
    title: string;
    createdAt: string;
}

interface SuggestionProps {
    text: string;
    icon?: React.ReactNode;
    onClick: (text: string) => void;
}

type MessageRole = 'system' | 'user' | 'assistant';
interface CreateMessageParams {
    chatId: string;
    role: MessageRole;
    content?: string;
    prompt?: string;
}

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    todoListId: string;
    frequency: 'normal' | 'daily' | 'weekly' | 'monthly';
    createdAt: Date;
    endDate?: Date;
}

interface UserBrain {
    id: string;
    userId: string;
    likes: string[];
    dislikes: string[];
    writingStyle?: string;
    timezone?: string;
    dailyActiveHours?: {
        start: string;
        end: string;
    };
    preferredTools: string[];
    shortTermGoals?: Array<{
        goal: string;
        timeframe: string;
    }>;
    longTermGoals?: Array<{
        goal: string;
        timeframe: string;
    }>;
    currentProjects?: Array<{
        name: string;
        status: string;
        due: string;
    }>;
    projectBacklog?: Array<{
        name: string;
        priority: string;
    }>;
    workloadStatus?: string;
    knownTopics: string[];
    interestedTopics: string[];
    currentLearning?: Array<{
        topic: string;
        progress: string;
    }>;
    checkInPreferences?: {
        frequency: string;
        preferredTime: string;
    };
    customTriggers?: Array<{
        trigger: string;
        action: string;
    }>;
    recentRoutines?: Array<{
        name: string;
        lastCompleted: string;
    }>;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}


interface UserMemory {
    likes?: string[];
    dislikes?: string[];
    writingStyle?: string;
    timezone?: string;
    dailyActiveHours?: {
        start: string;
        end: string;
    };
    preferredTools?: string[];

    shortTermGoals?: {
        goal: string;
        timeframe: string;
    }[];

    longTermGoals?: {
        goal: string;
        timeframe: string;
    }[];

    currentProjects?: {
        name: string;
        status: string;
        due?: string;
    }[];

    projectBacklog?: {
        idea: string;
        priority?: string;
    }[];

    workloadStatus?: string;
    knownTopics?: string[];
    interestedTopics?: string[];

    currentLearning?: {
        topic: string;
        progress: number;
    }[];

    checkInPreferences?: {
        moodTracking: boolean;
        askEvery: string;
    };

    customTriggers?: {
        phrase: string;
        action: string;
    }[];

    recentRoutines?: {
        time: string;
        task: string;
    }[];

    notes?: string;
}