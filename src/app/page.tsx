// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";

import RecipeCategories from "@/components/RecipeCategories";
import RecipeCard from "@/components/RecipeCard";

// ** Icons
import { MoveUpRight } from "lucide-react";

// ** Lib
import serverFetch from "@/lib/serverFetch";

export async function getRecipeDetails() {
  const response = await serverFetch(
    `/recipe/public/find?index=1&size=10&sortOrder=desc`,
  );

  const recipeData: ListRecipe = await response.json();
  return recipeData;
}

export default async function Home() {
  const { data: recipes } = await getRecipeDetails();

  return (
    <>
      <section className="relative max-w-full bg-home bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="mt-16 w-full text-center text-background">
              <Logo className="title-slider-responsive mx-auto mb-6 h-8 w-8 text-background sm:h-10 sm:w-10 md:h-14 md:w-14" />
              <h2 className="title-slider-responsive mb-6 uppercase">
                food made with love
              </h2>
              <div className="mx-auto mb-4 h-[2px] w-[4%] bg-primary" />
              <h3 className="description-slider-responsive mb-4">
                Take a slice of our perfect culinary heaven!
              </h3>
              <Button className="rounded-sm p-4 font-playfair text-sm font-medium uppercase tracking-widest md:p-6 md:text-base">
                See Menu
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="pointer-events-none relative aspect-square w-full max-w-md overflow-hidden rounded-md shadow lg:aspect-[5/6]">
              <Image
                className="dev object-cover"
                src="https://res.cloudinary.com/dzyqhkgxy/image/upload/v1733823949/iq6wdoaqeji7esbwndmr.jpg"
                alt="Recipe Slide"
                fill
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-center gap-6 px-4 py-8">
                <h4 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  Share Your <span className="text-primary">Recipes</span>
                </h4>
                <p className="max-w-[600px] text-center leading-relaxed tracking-wide text-muted-foreground">
                  Discover a world of culinary creativity where passionate home
                  chefs and food enthusiasts come together. Share your favorite
                  recipes, explore unique cooking techniques, and join a
                  community that celebrates the joy of cooking. From traditional
                  family recipes to modern fusion dishes, every meal has a story
                  to tell.
                </p>
                <Button>Create new Recipe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RecipeCategories />

      <section className="section-spacing bg-background">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wider lg:text-3xl">
              Popular Recipes
            </h2>
            <Link href="/chefs">
              <Button>
                View more
                <MoveUpRight />
              </Button>
            </Link>
          </div>
          <div className="grid-cols-3-res gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
