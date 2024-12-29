// ** Lib
import clientFetch from "@/lib/clientFetch";

export async function createRecipe(formData: FormData) {
  const response = await clientFetch("/recipe/owned", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function fetchRecipeDetail(id: string): Promise<Recipe> {
  const response = await clientFetch(`/recipe/owned/find/${id}`, {
    method: "GET",
  });

  return await response.json();
}

export async function requestVerifyRecipe(id: string) {
  const response = await clientFetch(
    `/recipe/owned/find/${id}/request-verifying`,
    {
      method: "PATCH",
    },
  );

  return await response.json();
}

export async function publicRecipe(id: string) {
  const response = await clientFetch(`/recipe/owned/find/${id}/public`, {
    method: "PATCH",
  });

  return await response.json();
}

export async function privateRecipe(id: string) {
  const response = await clientFetch(`/recipe/owned/find/${id}/private`, {
    method: "PATCH",
  });

  return await response.json();
}
