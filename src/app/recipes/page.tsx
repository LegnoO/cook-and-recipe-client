// ** Components

// ** Library Imports
import QueryRecipe from "./QueryRecipe";
import RecipeCard from "./RecipeCard";

// ** Types
// type Props = {
//   searchParams: { [key: string]: string | string[] | undefined };
// };

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

export default async function RecipesListPage() {
  const recipes = [
    {
      id: "67333090416b753d2f9d0d9d",
      name: "Vietnamese Pho",
      timeToCook: 180,
      difficulty: "Medium",
      serves: 4,
      imageUrls: [
        "https://res.cloudinary.com/dzl5ur69n/image/upload/v1735030474/wu3l8pvxbyibnkhhxob8.jpg",
      ],
      createdDate: "2024-11-12T10:40:09.503Z",
      createdBy: {
        level: "Beginner",
        startedDate: "2024-10-15T20:46:43.587Z",
        description: "",
        userInfo: {
          id: "670d73f1beeeb06c352ab012",
          avatar:
            "https://res.cloudinary.com/dzl5ur69n/image/upload/v1735030474/wu3l8pvxbyibnkhhxob8.jpg",
          fullName: "Legno",
          email: "legno@gmail.com",
        },
      },
      category: {
        id: "672f8ea7c330e0e55e65b27e",
        name: "Main dished",
        imageUrl:
          "https://res.cloudinary.com/dzl5ur69n/image/upload/v1731169958/yhyoixb3yctsqxzq23kh.png",
        description: "This is a main dished in a 3 course meal",
      },
      viewCount: 0,
      feedbackCount: 0,
      rating: null,
    },
  ];
  return (
    <main className="bg-background py-12">
      <div className="container">
        <div className="mb-6 py-4">
          <div className="flex w-full gap-4 pt-3">
            <QueryRecipe />
          </div>
        </div>
        {(recipes as Recipe[]).map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
