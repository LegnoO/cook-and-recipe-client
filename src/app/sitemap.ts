import type { MetadataRoute } from "next";

// ** Services
import { getRecipeList } from "@/services/server/recipeService";
import { getChefList } from "@/services/server/chefService";

// ** Types
type ChangeFrequency =
  | "always"
  | "weekly"
  | "hourly"
  | "daily"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: recipesResponse } = await getRecipeList({
    index: "1",
    size: "1000000",
    sortOrder: "desc",
  });

  const { data: chefsResponse } = await getChefList({
    index: "1",
    size: "1000000",
    sortOrder: "desc",
  });

  const recipes = recipesResponse.map((recipe) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${recipe.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 1,
  }));

  const chefs = chefsResponse.map((chef) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/chefs/${chef.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 1,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...recipes,
    ...chefs,
  ];
}
