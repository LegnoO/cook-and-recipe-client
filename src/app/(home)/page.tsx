// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";
import Categories from "@/components/Categories";
import RecipeCard from "@/components/RecipeCard";

// ** Icons
import { MoveUpRight } from "lucide-react";

// ** Services
import { getCategories } from "@/services/server/categoryService";
import { getRecipeList } from "@/services/server/recipeService";

export default async function Home() {
  const categories = await getCategories();
  const { data: recipes } = await getRecipeList({
    index: "1",
    size: "4",
    sortOrder: "desc",
  });

  return (
    <Fragment>
      <section className="relative max-w-full bg-home-banner bg-center bg-no-repeat">
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
            </div>
          </div>
        </div>
      </section>
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="pointer-events-none relative aspect-square w-full max-w-md overflow-hidden rounded-md shadow lg:aspect-[5/6]">
              <Image
                className="object-cover"
                src="https://res.cloudinary.com/dzyqhkgxy/image/upload/v1733823949/iq6wdoaqeji7esbwndmr.jpg"
                alt="Recipe Slide"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
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
                <Button size="lg">Create new Recipe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container">
          <div className="flex flex-col gap-2">
            <h2 className="mb-12 text-center text-4xl font-bold tracking-wider lg:text-3xl">
              Recipe Categories
            </h2>
            <div className="grid-cols-5-res grid-cols-2 gap-16">
              {categories.map((category, index) => (
                <Categories key={index} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>
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
    </Fragment>
  );
}
