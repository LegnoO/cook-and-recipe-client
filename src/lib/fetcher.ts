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
      const excludedApiUrls = [
        "/auth/refresh",
        "/auth/logout",
        "/auth/public/register",
        "/auth/public/login",
      ];

      if (
        response.status === 401 &&
        !excludedApiUrls.some((url) => fullUrl.includes(url))
      ) {
        try {
          await refreshUser();
          return await performFetch();
        } catch {
          window.location.replace("/?session=expired");
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
