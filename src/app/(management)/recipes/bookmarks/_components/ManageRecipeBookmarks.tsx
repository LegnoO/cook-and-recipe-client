"use client";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** Components
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import QueryRecipe from "../../_components/QueryRecipe";
import Loading from "@/app/(management)/_components/Loading";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Services
import { getRecipeBookmarkList } from "@/services/client/recipeService";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

const ManageRecipeBookmarks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
    { title: "Bookmark" },
  ];

  const { data: recipeResponse, isLoading } = useQuery({
    queryKey: ["recipeBookmarks", searchParams.toString()],
    queryFn: () => getRecipeBookmarkList(queryParams()),
    ...queryOptionsConfig,
  });

  const pageIndex = params.get("index") || "1";
  const pageSize = params.get("size") || "4";
  const sortOrder = params.get("sortOrder") || "asc";
  const totalPages = recipeResponse?.paginate.total || 1;
  const recipes = recipeResponse?.data ?? [];

  function queryParams() {
    params.set("index", pageIndex);
    params.set("size", pageSize);
    params.set("sortOrder", sortOrder);
    params.set("sortBy", "name");

    return params.toString();
  }

  return (
    <section className="flex h-full min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbLinks} />
          </div>
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">
            Recipe Bookmark
          </h1>
          <div className="mb-12 py-4 pt-3">
            <QueryRecipe />
          </div>

          {isLoading ? (
            <Loading />
          ) : recipes.length > 0 ? (
            <div className="flex flex-1">
              <div className="grid-cols-4-res grid w-full gap-8">
                {recipes.map((recipe, index) => (
                  <RecipeCard recipe={recipe} key={recipe.id || index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[50dvh] w-full items-center justify-center">
              <p className="font-medium">No recipes found</p>
            </div>
          )}
        </div>
        <div className="mt-24">
          <Pagination totalPages={totalPages} currentPage={Number(pageIndex)} />
        </div>
      </div>
    </section>
  );
};

export default ManageRecipeBookmarks;
