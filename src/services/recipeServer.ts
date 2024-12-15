// ** Lib
import clientFetch from "@/lib/clientFetch";

export async function createRecipe(formData: FormData) {
  const response = await clientFetch("/recipe/owned", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
