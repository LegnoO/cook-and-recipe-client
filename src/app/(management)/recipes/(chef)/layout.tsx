"use client";

// ** React Imports
import { ReactNode, useEffect } from "react";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

export default function ChefLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user && !user.chefId) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user && user?.chefId) return children;
  return null;
}
