type IntegrationKey =
    | "googleCalendar"
    | "gmail"
    | "notion"
    | "slack"
    | "discord"
    | "trello";

type NotificationKey =
    | "email"
    | "push"
    | "voice"
    | "dailyRecap"
    | "reminderFreq"
    | "quietStart"
    | "quietEnd";

type AiPrefKey = "tone" | "summarization" | "memory" | "tags";