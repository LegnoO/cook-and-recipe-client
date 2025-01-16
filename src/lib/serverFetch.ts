// ** Next Imports
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

// ** Config

// ** Types
type Headers = Record<string, string>;
type CustomRequestInit = RequestInit & {
  headers?: Headers;
};

export default async function serverFetch(
  endpoint: string | URL,
  options: CustomRequestInit = {},
) {
  const fullUrl = `${process.env.DATABASE_URL}${endpoint}`;

  options.headers = {
    "Content-Type": "application/json",
    ...(options.headers || undefined),
  };

  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) options.headers!["Authorization"] = `Bearer ${accessToken}`;

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    console.log({ accessToken, fullUrl, error: await response.json() });
    if (response.status === 401) {
      redirect("/session");
    }

    if (response.status === 404 || response.status === 500) {
      notFound();
    }
  }

  return response;

  // try {
  //   console.log("alo alo");
  //   return await performFetch();
  // } catch (error) {
  //   throw error;
  // }
}
