import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: number
    username: string;
    password: string;
    isAdmin: boolean;
}

// Define the shape of the context
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Create a context with a default value
const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}, // Default empty function
});

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Initialize user state

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);