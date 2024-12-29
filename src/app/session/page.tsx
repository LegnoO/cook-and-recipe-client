"use client";

// ** React Imports
import { useEffect } from "react";

// ** Components
import LoadingScreen from "@/components/LoadingScreen";
import { ToastAction } from "@/components/ui/toast";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Services
import { refreshUser } from "@/services/authService";

export default function SessionPage() {
  const {} = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function tryRefresh() {
      try {
        await refreshUser();
        router.back();
      } catch {
        router.push("/");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Session expired. Please log in again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }

    tryRefresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingScreen />;
}
