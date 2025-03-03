// ** Next Imports
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// ** Utils
import { parseSearchParams, getTruthyObject } from "@/utils";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";
import { getCookieValue } from "@/utils/cookies";

async function getTokenRefreshed() {
  const rememberMe = getCookieValue("rememberMe");
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: false },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export async function getRecipeList(
  searchParams: SearchParams,
  accessToken?: string,
): Promise<RecipeListResponse> {
  const headers: HeadersInit = {};

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  const params = parseSearchParams(getTruthyObject(searchParams || {}));
  const url = `${API_BASE_URL}/recipe/public/find?${params.toString()}`;

  console.log("🚀 ~ request:", { url, headers });
  if (params.get("chefName")) params.delete("chefName");

  let res = await fetch(url, {
    headers,
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    console.log("res not ok");
    if (res.status === 404) {
      console.log({ res });
      notFound();
    }

    if (res.status === 401) {
      console.log({ res });
      try {
        accessToken = await getTokenRefreshed();
        console.log("🚀 ~ new accessToken refreshed", accessToken);
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
        console.log("🚀 ~ headers:", headers);
      } catch {
        delete headers["Authorization"];
      } finally {
        res = await fetch(url, {
          headers,
          next: { revalidate: 1 },
        });
      }
    }
  }

  return await res.json();
}

export async function getRecipeDetail(
  recipeId: string,
  accessToken?: string,
): Promise<RecipeDetail> {
  const headers: HeadersInit = {};

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const url = `${API_BASE_URL}/recipe/public/find/${recipeId}`;

  let res = await fetch(url, {
    headers,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      try {
        accessToken = await getTokenRefreshed();
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
      } catch {
        delete headers["Authorization"];
      } finally {
        res = await fetch(url, {
          headers,
          next: { revalidate: 1 },
        });
      }
    }
  }

  return await res.json();
}

export async function toggleRecipeBookmark(recipeId: string) {
  const headers: HeadersInit = {};
  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(
    `${API_BASE_URL}/recipe/public/find/${recipeId}/bookmark`,
    {
      method: "PATCH",
      headers,
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      console.error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data = await res.json();
  return data;
}

export async function getOwnRecipes(chefId: string) {
  const res = await fetch(
    `${API_BASE_URL}/recipe/public/find?index=1&size=4&sortOrder=desc&chefId=${chefId}`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      console.error(`Failed to fetch: ${res.statusText}`);
    }
  }
  const data: RecipeListResponse = await res.json();

  return data;
}
