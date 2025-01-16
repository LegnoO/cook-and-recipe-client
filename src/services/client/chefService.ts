// ** Lib
import clientFetch from "@/lib/clientFetch";

export async function getRecipeOwned(params: string) {
  console.log("🚀 ~ getRecipeOwned ~ params:", params);
  const response = await clientFetch(`/recipe/owned/find?${params}`);
  return await response.json();
}

export async function requestBecomeChef(requestInfo: {
  level: string;
  description: string;
}) {
  const response = await clientFetch("/chefs/owned/register", {
    method: "POST",
    body: JSON.stringify({
      requestInfo,
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
