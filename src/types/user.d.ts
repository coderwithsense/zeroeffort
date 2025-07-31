interface UserData {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface UserState {
    userData: UserData | null;
    isLoading: boolean;
    error: string | null;
    saveUserData: (userId: string, email: string) => Promise<void>;
    setUserData: (data: UserData) => void;
    clearUserData: () => void;
}