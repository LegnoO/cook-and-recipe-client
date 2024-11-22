// ** Components

// ** Library Imports
import QueryRecipe from "./QueryRecipe";
import RecipeCard from "./RecipeCard";

// ** Types
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fakeApiCall() {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          image:
            "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
          name: "Salmon Pasta Pomodoro",
          by: "Eren",
          category: "Drink Recipes",
          description:
            "A handful of simple ingredients typify the fresh, vibrant flavors of Greek cooking",
        },
        {
          image:
            "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
          name: "Salmon Pasta Pomodoro",
          by: "Eren",
          category: "Drink Recipes",
          description:
            "A handful of simple ingredients typify the fresh, vibrant flavors of Greek cooking",
        },
      ]);
    }, 1000); // Simulate a 1-second delay
  });
}

export default async function ListRecipePage({ searchParams }: Props) {
  const data = await fakeApiCall();
  return (
    <main className="bg-background py-12">
      <div className="container">
        <div className="mb-6 py-4">
          <div className="flex w-full gap-4 pt-3">
            <QueryRecipe />
          </div>
        </div>
        <RecipeCard data={data} />
      </div>
    </main>
  );
}
