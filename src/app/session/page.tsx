"use client";

// ** React Imports
import { useEffect } from "react";

// ** Components
import LoadingScreen from "@/components/LoadingScreen";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Services
import { refreshUser } from "@/services/client/authService";

export default function SessionPage() {
  const router = useRouter();

  useEffect(() => {
    async function tryRefresh() {
      await refreshUser();
      router.back();
    }

    tryRefresh();
  }, [router]);

  return <LoadingScreen />;
}
