// ** Next Imports
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// ** Utils
import { parseSearchParams, getTruthyObject } from "@/utils";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getRecipeList(searchParams: SearchParams) {
  const params = parseSearchParams(getTruthyObject(searchParams || {}));

  if (params.get("chefName")) params.delete("chefName");
  console.log({
    here: `${API_BASE_URL}/recipe/public/find?${params.toString()}`,
  });
  const res = await fetch(
    `${API_BASE_URL}/recipe/public/find?${params.toString()}`,
    {
      next: { tags: ["home-recipes"] },
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data: RecipeListResponse = await res.json();

  return data;
}

export async function getRecipeDetail(
  recipeId: string,
  accessToken?: string,
): Promise<RecipeDetail> {
  const headers: HeadersInit = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE_URL}/recipe/public/find/${recipeId}`, {
    headers,
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
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
      throw new Error(`Failed to fetch: ${res.statusText}`);
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
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }
  const data: RecipeListResponse = await res.json();

  return data;
}
