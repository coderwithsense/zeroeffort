interface PlaygroundState {
    prompt: string;
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    setPrompt: (prompt: string) => void;
    submitPrompt: (prompt: string, userId?: string) => Promise<void>;
    reset: () => void;
}

interface WaitlistState {
    email: string;
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    setEmail: (email: string) => void;
    submitEmail: (email: string) => Promise<void>;
    reset: () => void;
}

