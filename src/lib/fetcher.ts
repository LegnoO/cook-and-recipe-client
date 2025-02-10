// ** Services
import { refreshUser } from "@/services/client/authService";

// ** Lib
import { getCookieValue } from "@/utils/cookies";

// ** Types
type Headers = Record<string, string>;
type CustomRequestInit = RequestInit & {
  headers?: Headers;
};

export default async function fetcher(
  endpoint: string | URL,
  options: CustomRequestInit = {},
): Promise<Response> {
  const fullUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}${endpoint}`;

  if (!(options.body instanceof FormData)) {
    options.headers = {
      "Content-Type": "application/json",
      ...(options.headers as Headers),
    };
  } else {
    options.headers = { ...options.headers };
  }

  async function performFetch(): Promise<Response> {
    const accessToken = getCookieValue("accessToken");

    if (accessToken)
      options.headers!["Authorization"] = `Bearer ${accessToken}`;

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      if (response.status === 401 && !fullUrl.includes("/auth/refresh")) {
        console.log("🚀 ~ performFetch ~ fullUrl:", fullUrl);
        try {
          await refreshUser();
          return await performFetch();
        } catch {
          const excludedUrls = ["/login", "/register", "/forgot-password"];
          if (
            !excludedUrls.some((url) => window.location.pathname.includes(url))
          )
            window.location.replace("/login");
        }
      }

      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    return response;
  }

  try {
    return await performFetch();
  } catch (error) {
    throw error;
  }
}
