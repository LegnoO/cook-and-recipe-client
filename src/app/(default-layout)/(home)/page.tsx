// ** Next Imports
import Image from "next/image";

// ** Components
import { Button } from "@/components/ui/button";
import RecipeCategories from "@/components/RecipeCategories";
import Recipes from "@/components/RecipeCard";

export default async function Home() {
  return (
    <>
      <section className="relative max-w-full bg-first-slider bg-cover bg-center bg-no-repeat">
        <div className="container min-h-screen">
          <div className="flex flex-col items-center lg:flex-row">
            <div
              className={
                "inline-block w-full space-y-6 pb-[180px] pl-0 pt-[240px] text-foreground lg:w-2/3 lg:pr-[80px]"
              }>
              <h2
                className={
                  "text-[3rem] font-medium leading-[3.75rem] text-foreground"
                }>
                The Easiest Way To Make Your Favorite Meal
              </h2>
              <h3 className="text-xl text-muted-foreground">
                Discover 1000+ recipes in your hand with the best recipe. Help
                you to find the easiest way to cook.
              </h3>
              <Button className="h-10">Explore Recipes</Button>
            </div>
            <div className="hidden lg:block lg:w-1/3">
              <div className="pointer-events-none aspect-square h-[400px] overflow-hidden rounded-full">
                <Image
                  className="object-cover"
                  src="https://res.cloudinary.com/dzl5ur69n/image/upload/v1728751718/cvscoxzgqltmwnmhdkxl.jpg"
                  alt="Recipe Slide"
                  width={400}
                  height={400}
                />
              </div>
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
      <Recipes />
    </>
  );
}
