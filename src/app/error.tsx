"use client";

// ** React Imports
import { useEffect } from "react";

// ** Components
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error Exception: ", {
      cause: error.cause,
      stack: error.stack,
      name: error.name,
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <section className="flex min-h-screen items-center bg-404">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-8 text-7xl font-extrabold tracking-tight text-white/95 lg:text-9xl">
            Server Error
          </h1>
          <p className="mb-2 text-3xl font-bold tracking-tight text-white/95 md:text-4xl">
            Something went wrong!
          </p>
          <p className="mb-4 text-base text-[rgb(209,213,219)] lg:text-lg">
            {"We are working on fixing the problem. Please try again."}
          </p>

          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </section>
  );
}
