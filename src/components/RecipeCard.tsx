// ** Next Imports
import Image from "next/image";

// ** Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookMarkButton from "./BookMarkButton";

// ** Icons
import Rating from "./Rating";

// ** Types
type Props = { recipe: Recipe | RecipeDetails };

export default function RecipeCard({ recipe }: Props) {
  console.log("🚀 ~ RecipeCard ~ recipe:", recipe);
  // const fake_data = [
  //   {
  //     name: "Quick Chicken Piccata",
  //     category: "Main Dishes",
  //     description:
  //       "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
  //     image:
  //       "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
  //   },
  //   {
  //     name: "Quick Chicken Piccata",
  //     category: "Main Dishes",
  //     description:
  //       "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
  //     image:
  //       "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
  //   },
  //   {
  //     name: "Quick Chicken Piccata",
  //     category: "Main Dishes",
  //     description:
  //       "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
  //     image:
  //       "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
  //   },
  //   {
  //     name: "Quick Chicken Piccata",
  //     category: "Main Dishes",
  //     description:
  //       "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
  //     image:
  //       "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
  //   },
  // ];

  return (
    <div className="group">
      <Card className="overflow-hidden rounded-none border-none shadow-none">
        <CardHeader className="relative p-0">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              className="rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              width={384}
              height={257}
              src={
                recipe.imageUrls[0] ||
                "https://gourmand.qodeinteractive.com/wp-content/uploads/2018/02/port-f-img-1.jpg"
              }
              alt={recipe.name}
            />

            <BookMarkButton />
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-4 pt-5">
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="line-clamp-1 text-sm font-semibold uppercase tracking-[1.90px] lg:text-base">
                {recipe.name}
              </h3>

              <Rating defaultValue={recipe.rating || 0} />
            </div>
            <p className="text-sm font-medium text-primary lg:text-base">
              {recipe.category.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
