// ** React Imports
import { Fragment } from "react";

// ** Components
import QueryRecipe from "./QueryRecipe";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";

// ** Services
import { getRecipeList } from "@/services/server/recipeService";

// ** Types
type Props = {
  searchParams: SearchParams;
};

export default async function RecipesListPage({ searchParams }: Props) {
  const breadcrumbItems: {
    title: string;
    href?: string;
  }[] = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
  ];

  if (searchParams.chefId && searchParams.chefName) {
    breadcrumbItems.push({
      title: `${searchParams.chefName}'s Recipe`,
    });
  }

  const pageIndex = Number(searchParams.index);
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

  console.log("🚀 ~ RecipesListPage ~ recipes:", recipes);
  return (
    <Fragment>
      <section className="relative max-w-full bg-recipes-banner bg-cover bg-center bg-no-repeat">
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

      <main className="bg-background py-12">
        <div className="container">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="mb-6 py-4 pt-3">
            <QueryRecipe />
          </div>
          <div className="grid-cols-3-res grid gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>
          <div className="mt-20">
            <Pagination totalPages={paginate.total} currentPage={pageIndex} />
          </div>
        </div>
      </main>
    </Fragment>
  );
}
