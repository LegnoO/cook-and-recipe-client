// ** Lib
import serverFetch from "@/lib/serverFetch";

export async function getRecipeList(): Promise<ListRecipe> {
  const response = await serverFetch(
    `/recipe/public/find?index=1&size=10&sortOrder=desc`,
  );

  const recipeData = await response.json();
  return recipeData;
}

export async function getCategories(): Promise<Category[]> {
  const response = await serverFetch(`/category/public/find`);

  const categoryData = await response.json();
  return categoryData;
}

export async function getUserProfile() {
  const response = await serverFetch(`/users/owned/profile`);

  const userInfo = await response.json();
  return userInfo;
}

export async function getRecipeDetails(id: string): Promise<RecipeDetails> {
  const response = await serverFetch(`/recipe/public/find/${id}`);

  const recipeDetails = await response.json();
  return recipeDetails;
}
