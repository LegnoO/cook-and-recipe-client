// ** Lib
import fetcher from "@/lib/fetcher";

export async function getRecipeOwned(params: string) {
  const response = await fetcher(`/recipe/owned/find?${params}`);
  return await response.json();
}

export async function requestBecomeChef(requestInfo: {
  level: string;
  description: string;
}) {
  const response = await fetcher("/chefs/owned/register", {
    method: "POST",
    body: JSON.stringify({
      requestInfo,
    }),
  });

  return await response.text();
}

export async function updateInfo(formData: FormData) {
  const response = await fetcher("/users/owned/profile/edit", {
    method: "PUT",
    body: formData,
  });

  return await response.json();
}
