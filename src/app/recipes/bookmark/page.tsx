// ** Next Imports

// ** Components
import QueryRecipeBookmarks from "./QueryRecipeBookmarks";
import RecipeCard from "@/components/RecipeCard";
import PaginationServer from "@/components/Pagination/PaginationServer";
import Repeat from "@/components/Repeat";
import Breadcrumb from "@/components/Breadcrumb";

// ** Services
import { getRecipeList } from "@/services/server/recipeService";

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

export default async function RecipesListPage({ searchParams }: Props) {
  const { data: recipes, paginate } = await getRecipeList();

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
            <QueryRecipeBookmarks />
          </div>
          <div className="grid-cols-4-res grid gap-8">
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
