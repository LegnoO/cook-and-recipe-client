// ** Next Imports

// ** Components
import QueryRecipe from "./QueryRecipe";
import RecipeCard from "@/components/RecipeCard";
import PaginationServer from "@/components/Pagination/PaginationServer";

// ** Lib
import serverFetch from "@/lib/serverFetch";
import Repeat from "@/components/Repeat";

// ** Types
type Props = {
  searchParams: SearchParams;
};

// async function fakeApiCall() {
//   return new Promise<Omit<Recipe[], "createdBy">>((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           imageUrls: [
//             "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
//           ],
//           name: "Salmon Pasta Pomodoro",
//           category: "Drink Recipes",
//           description:
//             "A handful of simple ingredients typify the fresh, vibrant flavors of Greek cooking",
//         },
//         {
//           imageUrls: [
//             "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
//           ],
//           name: "Salmon Pasta Pomodoro",

//           category: "Drink Recipes",
//           description:
//             "A handful of simple ingredients typify the fresh, vibrant flavors of Greek cooking",
//         },
//       ]);
//     }, 1000); // Simulate a 1-second delay
//   });
// }

async function getRecipeList() {
  const response = await serverFetch(
    `/recipe/public/find?index=1&size=10&sortOrder=desc`,
  );

  const recipeData: ListRecipe = await response.json();
  return recipeData;
}

async function getCategories() {
  const response = await serverFetch(`/category/public/find`);

  const categoryData: Category[] = await response.json();
  return categoryData;
}

export default async function RecipesListPage({ searchParams }: Props) {
  const { data: recipes, paginate } = await getRecipeList();
  const categories = await getCategories();

  console.log("🚀 ~ RecipesListPage ~ searchParams:", searchParams);

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
    <>
      <section className="bg-recipes-banner relative max-w-full bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="mt-16 w-full text-center text-background">
              <h2 className="title-slider-responsive mb-6 uppercase">
                Recipes
              </h2>
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
          <div className="mb-6 py-4 pt-3">
            <QueryRecipe categories={categories} />
          </div>
          <div className="grid-cols-3-res grid gap-8">
            {/* {recipes.map((recipe, index) => (
            
            ))} */}
            <Repeat times={6}>
              <RecipeCard recipe={recipes[0]} />
            </Repeat>
          </div>
          <div className="mt-20">
            <PaginationServer
              totalPages={paginate.total}
              currentPage={Number(searchParams.index) || 1}
            />
          </div>
        </div>
      </main>
    </>
  );
}
