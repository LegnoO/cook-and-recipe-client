// ** Lib
import fetcher from "@/lib/fetcher";

// **  Utils
// import { createSearchParams, getTruthyObject } from "@/utils";

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

export async function publicRecipe(recipeId: string) {
  const response = await fetcher(`/recipe/owned/find/${recipeId}/public`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function privateRecipe(recipeId: string) {
  const response = await fetcher(`/recipe/owned/find/${recipeId}/private`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function deleteRecipe(recipeId: string) {
  const response = await fetcher(`/recipe/owned/find/${recipeId}/delete`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function getCategories() {
  const response = await fetcher(`/category/public/find`);

  const categoryData: Category[] = await response.json();
  return categoryData;
}

export async function getRecipeBookmarkList(): Promise<RecipeListResponse> {
// searchParams: SearchParams,
  // const params = createSearchParams(getTruthyObject(searchParams || {}));

  const response = await fetcher(
    // `/recipe/public/find/bookmarked?${params.toString()}`,
    `/recipe/public/find/bookmarked?index=1&size=10&sortOrder=desc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getVerifiedRecipes(
  params: string,
): Promise<RecipeListResponse> {
  const response = await fetcher(`/recipe/owned/find?${params}`);
  const recipeData = await response.json();
  return recipeData;
}

export async function toggleRecipeBookmark(recipeId: string) {
  const response = await fetcher(`/recipe/public/find/${recipeId}/bookmark`, {
    method: "PATCH",
  });

  return await response.json();
}
