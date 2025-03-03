// ** Lib
import fetcher from "@/lib/fetcher";

export async function getRecipeOwned(params: string) {
  const res = await fetcher(`/recipe/owned/find?${params}`);
  return await res.json();
}

export async function requestBecomeChef(requestInfo: {
  level: string;
  description: string;
  startedDate: Date;
}) {
  const { level, description, startedDate } = requestInfo;
  const res = await fetcher("/chefs/owned/register", {
    method: "POST",
    body: JSON.stringify({
      level,
      description,
      startedDate,
    }),
  });

  return await res.text();
}

export async function updateInfo(formData: FormData) {
  const res = await fetcher("/users/owned/profile/edit", {
    method: "PUT",
    body: formData,
  });

  return await res.json();
}

export async function updateChefInfo(level: string, description: string) {
  console.log("a");
  const res = await fetcher("/chefs/owned/edit/info", {
    method: "PUT",
    body: JSON.stringify({ level, description }),
  });

  return await res.json();
}
