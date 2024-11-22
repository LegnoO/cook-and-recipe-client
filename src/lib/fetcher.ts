// ** Config
import { internalAPI } from "@/config/endpoints";
import { refreshUser } from "@/services/authService";

// ** Types
type CustomRequestInit = RequestInit & {
  headers?: Record<string, string>;
};

export default async function fetcher(
  endpoint: string | URL,
  options: CustomRequestInit = {},
): Promise<Response> {
  const fullUrl = `${internalAPI}${endpoint}`;

  async function performFetch(): Promise<Response> {
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      if (
        response.status === 401 &&
        !fullUrl.includes("/user-info") &&
        !fullUrl.includes("/refresh") &&
        !fullUrl.includes("/login")
      ) {
        try {
          await refreshUser();
          return await performFetch();
        } catch {
          window.location.replace("/");
        }
      }

      const errorMessage = await response.json();
      throw new Error(errorMessage);
    }

    return response;
  }

  try {
    return await performFetch();
  } catch (error) {
    throw error;
  }
}
