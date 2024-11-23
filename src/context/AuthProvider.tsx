"use client";

// ** Next Imports
import { usePathname, useSearchParams } from "next/navigation";

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
import { getUserInfo, logout } from "@/services/authService";

// ** Lib
import { deleteCookie, getCookieValue } from "@/lib/utils/cookies";
import { isSSR } from "@/lib/utils";
import { internalAPI } from "@/config/endpoints";

// ** Types
interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const clearAuth = searchParams.get("session");

  function redirectToHome() {
    if (pathname !== "/") router.push("/");
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      deleteCookie("accessToken");
      redirectToHome();
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function checkUserInfo() {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch {
        redirectToHome();
        if (user) setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clearAuth) {
      if (user) setUser(null);
      redirectToHome();
    }
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
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
