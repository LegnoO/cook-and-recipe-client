// ** Lib
import serverFetch from "@/lib/serverFetch";

export async function getRecipeList(): Promise<RecipeListResponse> {
  const response = await serverFetch(
    `/recipe/public/find?index=1&size=4&sortOrder=desc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getRecipeDetails(id: string): Promise<RecipeDetails> {
  const response = await serverFetch(`/recipe/public/find/${id}`);

  const recipeDetails = await response.json();
  return recipeDetails;
}
