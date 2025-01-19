// ** Lib
import fetcher from "@/lib/fetcher";

// **  Utils
// import { parseSearchParams, getTruthyObject } from "@/utils";

export async function createRecipe(formData: FormData) {
  const res = await fetcher("/recipe/owned", {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

export async function updateRecipe(formData: FormData, recipeId: string) {
  const res = await fetcher(`/recipe/owned/find/${recipeId}/edit`, {
    method: "PUT",
    body: formData,
  });

  return await res.json();
}

export async function fetchRecipeDetail(id: string): Promise<Recipe> {
  const res = await fetcher(`/recipe/owned/find/${id}`, {
    method: "GET",
  });

  return await res.json();
}

export async function requestVerifyRecipe(id: string) {
  const res = await fetcher(`/recipe/owned/find/${id}/request-verifying`, {
    method: "PATCH",
  });

  return await res.json();
}

export async function publicRecipe(recipeId: string) {
  const res = await fetcher(`/recipe/owned/find/${recipeId}/public`, {
    method: "PATCH",
  });

  return await res.json();
}

export async function privateRecipe(recipeId: string) {
  const res = await fetcher(`/recipe/owned/find/${recipeId}/private`, {
    method: "PATCH",
  });

  return await res.json();
}

export async function deleteRecipe(recipeId: string) {
  const res = await fetcher(`/recipe/owned/find/${recipeId}/delete`, {
    method: "PATCH",
  });

  return await res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetcher(`/category/public/find`);

  return await res.json();
}

export async function getRecipeBookmarkList(
  params: string,
): Promise<RecipeListResponse> {
  const res = await fetcher(
    `/recipe/public/find/bookmarked?${params.toString()}`,
  );

  return await res.json();
}

export async function getVerifiedRecipes(
  params: string,
): Promise<RecipeListResponse> {
  const res = await fetcher(`/recipe/owned/find?${params}`);
  return await res.json();
}

export async function getAllRecipesOwned(
  params: string,
): Promise<RecipeListResponse> {
  const res = await fetcher(`/recipe/owned/find?${params}`);
  return await res.json();
}

export async function getRecipesOwnedDetail(
  recipeId: string,
): Promise<RecipeDetail> {
  const res = await fetcher(`/recipe/owned/find/${recipeId}`);
  return await res.json();
}

export async function toggleRecipeBookmark(recipeId: string) {
  const res = await fetcher(`/recipe/public/find/${recipeId}/bookmark`, {
    method: "PATCH",
  });

  return await res.json();
}

export async function postReview({ recipeId, content, rating }: ReviewPayload) {
  const [ratingResponse, feedbackResponse] = await Promise.all([
    fetcher(`/recipe/public/find/${recipeId}/rating`, {
      method: "POST",
      body: JSON.stringify({ rating }),
    }),
    fetcher(`/recipe/public/find/${recipeId}/feedback`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  ]);

  return await Promise.all([ratingResponse.json(), feedbackResponse.json()]);
}
