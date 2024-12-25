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
  useCallback,
} from "react";

// ** Components
// import LoadingScreen from "@/components/LoadingScreen";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

//** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { logout } from "@/services/authService";

// ** Lib
import { deleteCookie } from "@/lib/utils/cookies";

// ** Types
interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authLoading: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const clearAuth = searchParams.get("session");

  const redirectToHome = useCallback(() => {
    if (pathname !== "/") {
      router.push("/");
    }
  }, [pathname, router]);

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      setUser(null);
      deleteCookie("accessToken");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        duration: 3000,
      });
      redirectToHome();
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // async function checkUserInfo() {
    //   try {
    //     const userData = await fetchUserInfo();
    //     setUser(userData);
    //   } catch {
    //     // redirectToHome();
    //     if (user) setUser(null);
    //   } finally {
    //     setAuthLoading(false);
    //   }
    // }
    // checkUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    if (clearAuth) {
      if (user) setUser(null);
      redirectToHome();
    }
  }, [redirectToHome, user, clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        isLoading,
        logout: handleLogout,
      }}>
      {/* {authLoading && <LoadingScreen />} */}
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
