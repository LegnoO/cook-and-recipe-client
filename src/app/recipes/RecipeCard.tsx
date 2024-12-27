"use client";

// ** Next Imports
import Image from "next/image";

// ** Components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// ** Icons
import { User } from "lucide-react";

// ** Types
type Props = { recipe: Recipe };

export default function RecipeCard({ recipe }: Props) {
  return (
    <Card className="h-[470px] rounded-lg bg-background shadow-sm transition-shadow hover:shadow-lg">
      <article className="flex flex-col">
        <figure className="relative">
          <Image
            src={recipe.imageUrls[0]}
            alt={""}
            width={400}
            height={260}
            className="h-[260px] w-full rounded-t-lg"
          />
          <Badge className="absolute right-4 top-4 gap-1 rounded-[20px] px-3 py-1">
            <User className="h-4 w-4" />
            <span>by {recipe.createdBy.userInfo.fullName}</span>
          </Badge>

          <figcaption className="flex flex-col gap-2.5 px-4 pb-8 pt-4">
            <span className="font-medium uppercase tracking-wider text-primary">
              {recipe.category.name || "category"}
            </span>
            <h4 className="mb-2 line-clamp-2 text-2xl font-bold">
              {recipe.name}
            </h4>
            <p className="line-clamp-3 text-muted-foreground">
              {recipe.description}
            </p>
          </figcaption>
        </figure>
      </article>
    </Card>
  );
}
