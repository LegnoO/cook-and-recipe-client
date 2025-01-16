"use client";

// ** Components
import QueryRecipe from "../QueryRecipe";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Services
import { getRecipeBookmarkList } from "@/services/client/recipeService";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Types
type Props = {
  searchParams: SearchParams;
};

export default function RecipeBookmarksPage({ searchParams }: Props) {
  const { index = "1", size = "10", sortOrder = "desc" } = searchParams;
  const pageIndex = Number(index);

  const { data: recipeResponse, isLoading } = useQuery({
    queryKey: ["recipeBookmarks", searchParams],
    queryFn: () => getRecipeBookmarkList({ index, size, sortOrder }),
    ...queryOptionsConfig,
  });

  const recipes = recipeResponse?.data ?? [];
  const totalPages = recipeResponse?.paginate.total || 1;

  return (
    <>
      <main className="bg-background py-12">
        <div className="container">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { title: "Home", href: "/" },
                { title: "Recipes", href: "/recipes" },
                { title: "Bookmark", href: "/recipes/bookmark" },
              ]}
            />
          </div>
          <div className="mb-6 py-4 pt-3">
            <QueryRecipe />
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : recipes.length > 0 ? (
            <div className="grid-cols-4-res grid gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard recipe={recipe} key={recipe.id || index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h2 className="mb-2 text-2xl font-semibold">No recipes found</h2>
            </div>
          )}
          <div className="mt-20">
            <Pagination totalPages={totalPages} currentPage={pageIndex} />
          </div>
        </div>
      </main>
    </>
  );
}
