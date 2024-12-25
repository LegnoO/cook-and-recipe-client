"use client";

// ** React Imports
import { useEffect } from "react";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Components
import LoadingScreen from "@/components/LoadingScreen";

// ** Services
import { refreshUser } from "@/services/authService";

export default function RefreshAPI() {
  const router = useRouter();

  useEffect(() => {
    async function handleRefresh() {
      try {
        await refreshUser();
        router.back();
      } catch {
        router.push("/");
      }
    }

    handleRefresh();
  }, [router]);

  return <LoadingScreen />;
}
