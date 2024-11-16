"use client";

// ** Next Imports
import { usePathname } from "next/navigation";

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

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Services
import { getUserInfo, login, logout } from "@/services/authService";

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
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function handleLogin({
    email,
    password,
    rememberMe,
  }: LoginCredentials) {
    try {
      await login({ email, password, rememberMe });
    } catch (error) {
      throw error;
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      if (pathname !== "/") router.push("/");
    } catch (error) {
      throw error;
    }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        login: handleLogin,
        logout: handleLogout,
      }}>
      {authLoading && <LoadingScreen />}
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
