"use client";

// ** Components
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import QueryRecipe from "../../_components/QueryRecipe";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Services
import { getRecipeBookmarkList } from "@/services/client/recipeService";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Utils
import { parseSearchParams } from "@/utils";

// ** Types
type Props = {
  searchParams: SearchParams;
};

export default function RecipeBookmarksPage({ searchParams }: Props) {
  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
    { title: "Bookmark" },
  ];

  const searchParamsParsed = parseSearchParams(searchParams);
  const { data: recipeResponse } = useQuery({
    queryKey: ["recipeBookmarks", searchParamsParsed],
    queryFn: () => getRecipeBookmarkList(queryParams()),
    ...queryOptionsConfig,
  });

  const pageIndex = searchParamsParsed.get("index") || "1";
  const pageSize = searchParamsParsed.get("size") || "4";
  const sortOrder = searchParamsParsed.get("sortOrder") || "asc";
  const totalPages = recipeResponse?.paginate.total || 1;
  const recipes = recipeResponse?.data ?? [];

  function queryParams() {
    searchParamsParsed.set("index", pageIndex);
    searchParamsParsed.set("size", pageSize);
    searchParamsParsed.set("sortOrder", sortOrder);
    searchParamsParsed.set("sortBy", "name");

    return searchParamsParsed.toString();
  }

  return (
    <section className="flex h-full min-h-screen flex-col bg-background py-16">
      <div className="container flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbLinks} />
          </div>
          <div className="mb-12 py-4 pt-3">
            <QueryRecipe />
          </div>
          <div className="flex flex-1 items-center justify-center">
            {recipes.length > 0 ? (
              <div className="grid-cols-3-res grid gap-8">
                {recipes.map((recipe, index) => (
                  <RecipeCard recipe={recipe} key={recipe.id || index} />
                ))}
              </div>
            ) : (
              <p className="font-medium">No recipes found</p>
            )}
          </div>
        </div>
        <div className="mt-24">
          <Pagination totalPages={totalPages} currentPage={Number(pageIndex)} />
        </div>
      </div>
    </section>
  );
}
