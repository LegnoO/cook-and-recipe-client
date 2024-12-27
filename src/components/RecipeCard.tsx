// ** Next Imports
import Image from "next/image";

// ** Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookMarkButton from "./BookMarkButton";

// ** Icons
import { Star } from "lucide-react";

// ** Types
type Props = { recipe: Recipe };
export default function RecipeCard({ recipe }: Props) {
  console.log("🚀 ~ RecipeCard ~ recipe:", recipe);
  const fake_data = [
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg",
    },
  ];

  return (
    // <section className="section-spacing bg-background">
    //   <div className="container">
    //     <div className="flex flex-col gap-2">

    //     </div>
    //   </div>
    // </section>
    <div className="group">
      <Card className="overflow-hidden rounded-none border-none shadow-none">
        <CardHeader className="relative p-0">
          <div className="relative aspect-[136/91] w-full rounded-lg">
            <Image
              className="rounded-inherit object-cover"
              fill
              src={
                recipe.imageUrls[0] ||
                "https://gourmand.qodeinteractive.com/wp-content/uploads/2018/02/port-f-img-1.jpg"
              }
              alt={recipe.name}
            />

            {/* <div className="rounded-inherit bg-overlay absolute inset-0 bg-opacity-0 opacity-0 transition-opacity duration-300 group-hover:bg-opacity-40 group-hover:opacity-100">
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-lg font-semibold text-white">
                    {data.name}
                  </p>
                </div>
              </div> */}
            <BookMarkButton />
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-4 pt-5">
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="line-clamp-1 text-sm font-semibold uppercase tracking-[1.90px] lg:text-base">
                Russian Salad
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-medium">4.5</span>
              </div>
            </div>
            <p className="text-sm font-medium text-primary lg:text-base">
              Beverages
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
