// ** Next Imports
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ** Config

// ** Types
type Headers = Record<string, string>;
type CustomRequestInit = RequestInit & {
  headers?: Headers;
};

export default async function clientFetch(
  endpoint: string | URL,
  options: CustomRequestInit = {},
): Promise<Response> {
  const fullUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}${endpoint}`;

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

    if (!response.ok && response.status === 401) {
      redirect("/session");
    }

    return response;
  }

  try {
    return await performFetch();
  } catch (error) {
    throw error;
  }
}
