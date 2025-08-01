export const formatChatTitle = (message: string, maxLength: number = 50) => {
    return message.length > maxLength
        ? message.substring(0, maxLength) + "..."
        : message;
};

export const generateChatId = () => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};