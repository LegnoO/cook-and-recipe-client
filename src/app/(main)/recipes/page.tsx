// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import { cookies } from "next/headers";

// ** Components
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import QueryRecipe from "./_components/QueryRecipe";

// ** Services
import { getRecipeList } from "@/services/server/recipeService";

// ** Types
type Props = {
  searchParams: SearchParams;
};

export default async function RecipesListPage({ searchParams }: Props) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Recipes" },
  ];

  if (searchParams.chefId && searchParams.chefName) {
    breadcrumbLinks.push({
      title: `${searchParams.chefName}'s Recipe`,
    });
  }

  const pageIndex = Number(searchParams.index) || 1;
  const { data: recipes, paginate } = await getRecipeList(
    {
      index: searchParams.index || "1",
      sortOrder: searchParams.sortOrder || "desc",
      size: "9",
      ...searchParams,
    },
    accessToken,
  );

  console.log("🚀 ~ RecipesListPage ~ recipes:", recipes);
  return (
    <Fragment>
      <section className="relative max-w-full bg-recipes-banner bg-cover bg-fixed bg-center bg-no-repeat">
        <div className="container">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="mt-16 w-full text-center text-background">
              <h1 className="title-slider-responsive mb-6 uppercase">
                Recipes
              </h1>
              <div className="mx-auto mb-4 h-[2px] w-[4%] bg-primary" />
              <h3 className="description-slider-responsive">
                Complete atmosphere in your home
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="flex h-full min-h-screen flex-col bg-background py-16">
        <div className="container flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <div className="mb-6">
              <Breadcrumb items={breadcrumbLinks} />
            </div>
            <div className="mb-12 py-4 pt-3">
              <QueryRecipe />
            </div>
            <div className="flex flex-1 items-center">
              {recipes.length > 0 ? (
                <div className="flex flex-1 items-center">
                  <div className="grid-cols-4-res grid gap-8">
                    {recipes.map((recipe, index) => (
                      <RecipeCard recipe={recipe} key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="font-medium">No recipes found</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-24">
            <Pagination totalPages={paginate.total} currentPage={pageIndex} />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
