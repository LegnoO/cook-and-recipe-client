// ** Lib
import clientFetch from "@/lib/clientFetch";
import { createSearchParams } from "@/lib/utils";

export async function getRecipeOwned(
  queryOptions: QueryOptions<{ name: string }>,
) {
  const params = createSearchParams(queryOptions);
  const response = await clientFetch(`/recipe/owned/find?${params}`);
  return await response.json();
}

export async function requestBecomeChef(formData: {
  level: string;
  description: string;
}) {
  const response = await clientFetch("/", {
    method: "POST",
    body: JSON.stringify({
      formData,
    }),
  });

  return await response.text();
}

export async function updateInfo(formData: FormData) {
  const response = await clientFetch("/users/owned/profile/edit", {
    method: "PUT",
    body: formData,
  });

  return await response.json();
}
