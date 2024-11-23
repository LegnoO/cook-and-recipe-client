// ** Next Imports
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ** Config
import { externalAPI } from "@/config/endpoints";

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
    const cookieStore = cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken)
      options.headers!["Authorization"] = `Bearer ${accessToken}`;

    const response = await fetch(fullUrl, options);
    console.log("🚀 ~ performFetch ~ fullUrl, options:", { fullUrl, options });

    if (!response.ok && response.status === 401) {
      console.log("🚀 ~ performFetch ~ response:", await response.json());
      redirect("/?session=expired");
    }

    return response;
  }

  try {
    return await performFetch();
  } catch (error) {
    throw error;
  }
}
