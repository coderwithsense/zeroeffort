import { create } from 'zustand';

interface WaitlistState {
    email: string;
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
    setEmail: (email: string) => void;
    submitEmail: (email: string) => Promise<void>;
    reset: () => void;
}

export const useWaitlistStore = create<WaitlistState>((set) => ({
    email: '',
    isSubmitting: false,
    isSuccess: false,
    error: null,

    setEmail: (email) => set({ email }),

    submitEmail: async (email) => {
        try {
            set({ isSubmitting: true, error: null });

            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to join waitlist');
            }

            set({ isSuccess: true, email: '' });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        } finally {
            set({ isSubmitting: false });
        }
    },

    reset: () => set({ email: '', isSubmitting: false, isSuccess: false, error: null }),
}));