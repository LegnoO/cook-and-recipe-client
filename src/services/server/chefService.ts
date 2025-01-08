// ** Lib
import serverFetch from "@/lib/serverFetch";

export async function getChefDetail(id: string): Promise<Chef> {
  const response = await serverFetch(`/chefs/public/find/${id}`);

  const recipeData = await response.json();
  return recipeData;
}

export async function getChefList(): Promise<ChefListResponse> {
  const response = await serverFetch(
    `/chefs/public/find?index=1&size=10&sortOrder=asc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getAllChef(): Promise<ChefListResponse> {
  const response = await serverFetch(
    `/chefs/public/find?index=1&size=10000&sortOrder=asc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getOwnRecipe(id: string): Promise<RecipeListResponse> {
  const response = await serverFetch(
    `/recipe/public/find?index=1&size=10&sortOrder=desc&chefId=${id}`,
  );

  const recipeData = await response.json();
  return recipeData;
}
