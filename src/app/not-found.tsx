// ** Next Imports
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center bg-404 bg-cover bg-no-repeat">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-8 text-7xl font-extrabold tracking-tight text-white/95 lg:text-9xl">
            404
          </h1>
          <p className="mb-2 text-3xl font-bold tracking-tight text-white/95 md:text-4xl">
            Opps! Page not found.
          </p>
          <p className="mb-4 text-base text-[rgb(209,213,219)] lg:text-lg">
            {"We can't find the page. You're looking for."}
          </p>

          <Button asChild>
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
