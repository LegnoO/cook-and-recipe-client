"use client";

// ** React Imports
import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

// ** Components
import LoadingScreen from "@/components/LoadingScreen";

// ** Services
import { getUserInfo, login } from "@/services/authService";

// ** Types
interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authLoading: boolean;
  login: ({ email, password, rememberMe }: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function handleLogin({
    email,
    password,
    rememberMe,
  }: LoginCredentials) {
    try {
      const accessToken = await login({ email, password, rememberMe });
      localStorage.setItem("access-token", accessToken);
    } catch (error) {
      throw error;
    }
  }

  async function handleLogout() {
    localStorage.removeItem("access-token");
    setUser(null);
  }

  useEffect(() => {
    async function checkUserInfo() {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Failed to refresh:", error);
        if (user) setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkUserInfo();
  }, []);

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        login: handleLogin,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
