// ** Lib
import fetcher from "@/lib/fetcher";

// **  Utils
import { createSearchParams, getTruthyObject } from "@/utils";

export async function createRecipe(formData: FormData) {
  const response = await fetcher("/recipe/owned", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function updateRecipe(formData: FormData, recipeId: string) {
  const response = await fetcher(`/recipe/owned/find/${recipeId}/edit`, {
    method: "PUT",
    body: formData,
  });

  return await response.json();
}

export async function fetchRecipeDetail(id: string): Promise<Recipe> {
  const response = await fetcher(`/recipe/owned/find/${id}`, {
    method: "GET",
  });

  return await response.json();
}

export async function requestVerifyRecipe(id: string) {
  const response = await fetcher(`/recipe/owned/find/${id}/request-verifying`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function publicRecipe(id: string) {
  const response = await fetcher(`/recipe/owned/find/${id}/public`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function privateRecipe(id: string) {
  const response = await fetcher(`/recipe/owned/find/${id}/private`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function getCategories() {
  const response = await fetcher(`/category/public/find`);

  const categoryData: Category[] = await response.json();
  return categoryData;
}

export async function getRecipeBookmarkList(
  searchParams: SearchParams,
): Promise<RecipeListResponse> {
  const params = createSearchParams(getTruthyObject(searchParams || {}));

  const response = await fetcher(
    // `/recipe/public/find/bookmarked?${params.toString()}`,
    `/recipe/public/find/bookmarked?index=1&size=10&sortOrder=desc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getPublicRecipes(
  params: string,
): Promise<RecipeListResponse> {
  // const params = createSearchParams(getTruthyObject(searchParams || {}));

  const response = await fetcher(`/recipe/public/find?${params}`);
  const recipeData = await response.json();
  return recipeData;
}

export async function toggleRecipeBookmark(recipeId: string) {
  const response = await fetcher(`/recipe/public/find/${recipeId}/bookmark`, {
    method: "PATCH",
  });

  return await response.json();
}
