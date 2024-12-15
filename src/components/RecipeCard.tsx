// ** Next Imports
import Image from "next/image";

// ** Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BookMarkButton from "./BookMarkButton";

// ** Icons
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MoveUpRight, Bookmark, ChevronRight } from "lucide-react";

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
              <Card key={index} className="overflow-hidden">
                <CardHeader className="relative p-0">
                  <div className="relative h-[240px] w-full">
                    <Image
                      className="object-cover"
                      fill
                      src={data.image}
                      alt={data.name}
                    />
                    <BookMarkButton />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-3">
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

                <CardFooter className="flex justify-between px-4 pb-5 pt-4">
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-between gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">John Doe</span>
                      </div>
                      <Button
                        variant="link"
                        className="h-auto gap-1 p-0 text-primary">
                        Read More <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
