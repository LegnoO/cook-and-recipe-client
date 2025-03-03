"use client";

// ** React Imports
import { useState, useTransition } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookMarkButton from "./BookMarkButton";
import Rating from "./Rating";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Actions
import { toggleRecipeBookmarkAction } from "@/app/actions";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Types
type Props = { recipe: Recipe | RecipeDetail };

export default function RecipeCard({ recipe }: Props) {
  console.log("🚀 ~ RecipeCard ~ recipe:", recipe);
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(recipe.bookmarked);

  async function handleToggleBookmark() {
    startTransition(async () => {
      const result = await toggleRecipeBookmarkAction(recipe.id, "/");
      if (result.success) {
        setIsBookmarked((prev) => !prev);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You cannot bookmark your own recipe.",
        });
      }
    });
  }

  return (
    <Card className="overflow-hidden rounded-none border-none shadow-none">
      <CardHeader className="relative rounded-lg p-0">
        <Link
          className="relative aspect-[1/0.68] overflow-hidden"
          href={`/recipes/${recipe.id}`}>
          <Image
            className="h-full w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            width={384}
            height={258}
            src={
              recipe.imageUrls[0] ||
              "https://gourmand.qodeinteractive.com/wp-content/uploads/2018/02/port-f-img-1.jpg"
            }
            alt={recipe.name}
          />
        </Link>
        {user && (
          <BookMarkButton
            isLoading={isPending}
            onClick={handleToggleBookmark}
            bookmarked={isBookmarked}
          />
        )}
      </CardHeader>
      <CardContent className="px-0 pb-4 pt-5">
        <Link href={`/recipes/${recipe.id}`}>
          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h3 className="line-clamp-1 w-full text-sm font-semibold uppercase tracking-[1.90px] lg:text-base">
                {recipe.name}
              </h3>

              <Rating
                defaultValue={recipe.rating || 0}
                disableSelect
                readOnly
              />
            </div>
            <p className="text-sm font-medium text-primary lg:text-base">
              {recipe.category.name}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
