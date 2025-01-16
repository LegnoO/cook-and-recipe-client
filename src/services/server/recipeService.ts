// ** Next Imports
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// ** Utils
import { createSearchParams, getTruthyObject } from "@/utils";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getRecipeList(searchParams: SearchParams) {
  const params = createSearchParams(getTruthyObject(searchParams || {}));

  if (params.get("chefName")) params.delete("chefName");

  const res = await fetch(
    `${API_BASE_URL}/recipe/public/find?${params.toString()}`,
    {
      next: { tags: ["home-recipes"] },
    },
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch recipes: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: RecipeListResponse = await res.json();
  if (!data) notFound();

  return data;
}

export async function getRecipeDetails(recipeId: string, accessToken?: string) {
  const headers: HeadersInit = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE_URL}/recipe/public/find/${recipeId}`, {
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("🚀 ~ getRecipeDetails ~ error:", error);

    throw new Error(
      `Failed to fetch recipes: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: RecipeDetails = await res.json();
  if (!data) notFound();

  return data;
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
    const error = await res.json();

    throw new Error(`Failed to toggle bookmark: ${error.message}`);
  }

  const data = await res.json();
  if (!data) notFound();

  return data;
}

export async function postReview({ recipeId, message, rating }: ReviewPayload) {
  const headers: HeadersInit = {};
  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const [ratingResponse, feedbackResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/recipe/public/find/${recipeId}/rating`, {
      method: "POST",
      headers,
    }),
    fetch(`${API_BASE_URL}/recipe/public/find/${recipeId}/feedback`, {
      method: "POST",
      headers,
    }),
  ]);

  if (!ratingResponse.ok || !feedbackResponse.ok) {
    const errorMessages = [];
    if (!ratingResponse.ok) {
      const ratingError = await ratingResponse.json();
      errorMessages.push(`Rating error: ${ratingError.message}`);
    }
    if (!feedbackResponse.ok) {
      const feedbackError = await feedbackResponse.json();
      errorMessages.push(`Feedback error: ${feedbackError.message}`);
    }
    throw new Error(`Failed to post review: ${errorMessages.join(", ")}`);
  }

  const [ratingData, feedbackData] = await Promise.all([
    ratingResponse.json(),
    feedbackResponse.json(),
  ]);

  if (!ratingData || !feedbackData) notFound();

  return { rating: ratingData, feedback: feedbackData };
}

export async function getOwnRecipes(chefId: string) {
  const res = await fetch(
    `${API_BASE_URL}/recipe/public/find?index=1&size=10&sortOrder=desc&chefId=${chefId}`,
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch recipes: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: RecipeListResponse = await res.json();
  if (!data) notFound();

  return data;
}
