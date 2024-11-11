// ** Next Imports
import Image from "next/image";

// ** Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ** Icons
import { User, MoveUpRight } from "lucide-react";

export default function Recipes() {
  const fake_data = [
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/chicken-65.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/chicken-65.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/chicken-65.jpg",
    },
    {
      name: "Quick Chicken Piccata",
      category: "Main Dishes",
      description:
        "Habitant accumsan suscipit sodales phasellus nulla elit placerat sapien quisque gravida tincidunt",
      image:
        "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/chicken-65.jpg",
    },
  ];

  return (
    <section className="pb-32 pt-[75px]">
      <div className="container">
        <div className="flex flex-col gap-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wider">
              Popular Recipes
            </h2>
            <Button>
              View more
              <MoveUpRight />
            </Button>
          </div>
          <div className="grid-4-res gap-6">
            {fake_data.map((data, index) => (
              <div
                key={index}
                className="flex flex-col h-[550px] gap-2.5 rounded-lg bg-background px-4 pb-8 pt-4 transition-shadow shadow-sm hover:shadow-lg">
                <div className="relative">
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={260}
                    height={260}
                    className="h-[260px] rounded-lg object-cover"
                  />
                  <Badge className="hover:bg-primray absolute right-4 top-4 gap-1 rounded-[20px] px-3 py-1">
                    <User className="h-4 w-4" /> <span>by Eren</span>
                  </Badge>
                </div>
                <h6 className="font-medium uppercase tracking-wider text-primary">
                  {data.category}
                </h6>
                <h4 className="text-2xl font-bold">{data.name}</h4>
                <p className="line-clamp-3 text-muted-foreground">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
