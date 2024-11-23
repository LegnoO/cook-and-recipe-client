// ** Config
import { externalAPI } from "@/config/endpoints";
import { refreshUser } from "@/services/authService";

// ** Lib
import { getCookieValue } from "@/lib/utils/cookies";

// ** Types
type Headers = Record<string, string>;
type CustomRequestInit = RequestInit & {
  headers?: Headers;
};

export default async function clientFetch(
  endpoint: string | URL,
  options: CustomRequestInit = {},
): Promise<Response> {
  const fullUrl = `${externalAPI}${endpoint}`;

  options.headers = {
    "Content-Type": "application/json",
    ...(options.headers || undefined),
  };

  async function performFetch(): Promise<Response> {
    const accessToken = getCookieValue("accessToken");

    if (accessToken)
      options.headers!["Authorization"] = `Bearer ${accessToken}`;

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      if (
        response.status === 401 &&
        !fullUrl.includes("/users/owned/info") &&
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
      console.log("🚀 ~ performFetch ~ errorMessage:", errorMessage);
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
