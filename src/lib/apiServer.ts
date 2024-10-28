"use server";

// ** Next Imports
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// ** Lib
import { ServerError } from "@/lib/ServerError";

// ** Config
import { DATABASE_URL } from "@/config/environment";

export default async function fetcher(
  endpoint: string | URL,
  options: RequestInit = {},
) {
  const baseUrl = DATABASE_URL;
  const fullUrl =
    typeof endpoint === "string" && endpoint.includes("localhost")
      ? endpoint
      : `${baseUrl}${endpoint}`;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  };
  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(fullUrl, mergedOptions);

    if (!response.ok) {
      if (response.status === 401) {
        // redirect("/");
      }
      if (response.status === 404) {
        // redirect("/404");
      }
      const errorData = await response.json();
      
      throw new ServerError(errorData.message, response.status);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);

    throw error;
  }
}
