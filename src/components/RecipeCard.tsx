// ** Next Imports
import Image from "next/image";

// ** Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookMarkButton from "./BookMarkButton";

// ** Icons
import { Star, MoveUpRight } from "lucide-react";

export default function RecipeCard() {
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
    <section className="section-spacing bg-background">
      <div className="container">
        <div className="flex flex-col gap-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wider lg:text-3xl">
              Popular Recipes
            </h2>
            <Button>
              View more
              <MoveUpRight />
            </Button>
          </div>
          <div className="grid-cols-3-res gap-8">
            {fake_data.map((data, index) => (
              <div className="group" key={index}>
                <Card className="overflow-hidden rounded-none border-none shadow-none">
                  <CardHeader className="relative p-0">
                    <div className="relative aspect-[1/0.85] w-full rounded-lg">
                      <Image
                        className="rounded-inherit object-cover"
                        fill
                        src={data.image}
                        alt={data.name}
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
                  <CardContent className="px-0 pb-4 pt-3">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="mb-1 text-sm font-medium text-primary">
                          Beverages
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium">4.5</span>
                        </div>
                      </div>
                      <h3 className="line-clamp-1 text-xl font-bold lg:text-2xl">
                        Russian Salad
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
