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

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { fetchUserInfo, logout } from "@/services/client/authService";

// ** Lib
import { deleteCookie } from "@/utils/cookies";

// ** Types
interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
  authLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function handleLogout() {
    try {
      setUser(null);
      await logout();
      deleteCookie("accessToken");
      toast({
        variant: "successful",
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        duration: 3000,
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    async function checkUserInfo() {
      setAuthLoading(true);
      try {
        const userData = await fetchUserInfo();
        setUser(userData);
      } catch {
        setUser(null);
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
        logout: handleLogout,
        setAuthLoading,
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
