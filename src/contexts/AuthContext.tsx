import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  role: "student" | "teacher" | "admin";
  isAnonymous: boolean;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string,
    role: "student" | "teacher"
  ) => Promise<boolean>;
  register: (
    username: string,
    password: string,
    role: "student" | "teacher",
    verificationFile?: File
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    username: string,
    password: string,
    role: "student" | "teacher"
  ): Promise<boolean> => {
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      role,
      isAnonymous: role === "student",
      verified: role === "teacher",
    };

    setUser(newUser);
    return true;
  };

  const register = async (
    username: string,
    password: string,
    role: "student" | "teacher",
    verificationFile?: File
  ): Promise<boolean> => {
    // Simulate registration with verification for teachers
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (role === "teacher" && !verificationFile) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      role,
      isAnonymous: role === "student",
      verified: role === "teacher",
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
