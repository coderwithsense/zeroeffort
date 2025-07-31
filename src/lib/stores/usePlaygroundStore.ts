import { create } from 'zustand';

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  prompt: '',
  isSubmitting: false,
  isSuccess: false,
  error: null,
  
  setPrompt: (prompt) => set({ prompt }),
  
  submitPrompt: async (prompt, userId) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const response = await fetch('/api/playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, userId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save prompt');
      }
      
      set({ isSuccess: true, prompt: '' });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    } finally {
      set({ isSubmitting: false });
    }
  },
  
  reset: () => set({ prompt: '', isSubmitting: false, isSuccess: false, error: null }),
}));