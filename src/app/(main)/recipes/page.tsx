// ** React Imports
import { Fragment } from "react";

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
  const { data: recipes, paginate } = await getRecipeList({
    index: searchParams.index || "1",
    sortOrder: searchParams.sortOrder || "desc",
    size: "9",
    ...searchParams,
  });

  // const recipes = [
  //   {
  //     id: "67333090416b753d2f9d0d9d",
  //     name: "Vietnamese Pho",
  //     timeToCook: 180,
  //     difficulty: "Medium",
  //     serves: 4,
  //     imageUrls: [
  //       "https://res.cloudinary.com/dzl5ur69n/image/upload/v1735030474/wu3l8pvxbyibnkhhxob8.jpg",
  //     ],
  //     createdDate: "2024-11-12T10:40:09.503Z",
  //     createdBy: {
  //       level: "Beginner",
  //       startedDate: "2024-10-15T20:46:43.587Z",
  //       description: "",
  //       userInfo: {
  //         id: "670d73f1beeeb06c352ab012",
  //         avatar:
  //           "https://res.cloudinary.com/dzl5ur69n/image/upload/v1735030474/wu3l8pvxbyibnkhhxob8.jpg",
  //         fullName: "Legno",
  //         email: "legno@gmail.com",
  //       },
  //     },
  //     category: {
  //       id: "672f8ea7c330e0e55e65b27e",
  //       name: "Main dished",
  //       imageUrl:
  //         "https://res.cloudinary.com/dzl5ur69n/image/upload/v1731169958/yhyoixb3yctsqxzq23kh.png",
  //       description: "This is a main dished in a 3 course meal",
  //     },
  //     viewCount: 0,
  //     feedbackCount: 0,
  //     rating: null,
  //   },
  // ];

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
            
              {recipes.length > 0 ? (
                <div className="flex flex-1">
                  <div className="grid-cols-4-res grid gap-8">
                    {recipes.map((recipe, index) => (
                      <RecipeCard recipe={recipe} key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[50dvh] items-center justify-center w-full">
                  <p className="font-medium">No recipes found</p>
                </div>
              )}
         
          </div>
          <div className="mt-24">
            <Pagination totalPages={paginate.total} currentPage={pageIndex} />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
