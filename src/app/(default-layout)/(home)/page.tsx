// ** Components
import { typography } from "@/components/Primitives";
import { Button } from "@/components/ui/Button";
import RecipeCard from "@/components/ui/Card/RecipeCard";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

import Repeat from "@/components/Repeat";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <section className="relative min-h-[100dvh] max-w-full bg-first-slider bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="flex items-center">
            <div
              className={
                "inline-block w-2/3 space-y-6 py-[180px] pl-0 pr-[80px] text-foreground"
              }>
              <h2
                className={typography({
                  className: "font-medium text-foreground",
                  display: "lg",
                })}>
                The Easiest Way To Make Your Favorite Meal
              </h2>
              <h3
                className={typography({
                  className: "text-foreground",
                  text: "xl",
                })}>
                Discover 1000+ recipes in your hand with the best recipe. Help
                you to find the easiest way to cook.
              </h3>
              <Button className="h-10" variant="primary">
                Explore Recipes
              </Button>
            </div>
            <div className="w-1/3">
              <div className="rounded-xl">
                <img
                  className="rounded-inherit pointer-events-none border-inherit"
                  src="https://res.cloudinary.com/dzl5ur69n/image/upload/v1728751718/cvscoxzgqltmwnmhdkxl.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container pb-[50px] pt-[75px]">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <h2 className="mb-8 text-3xl font-semibold tracking-wider text-primary">
              Recipe Categories
            </h2>
            <div className="grid grid-cols-4 gap-x-4 gap-y-8">
              <Repeat times={4}>
                <Card className="overflow-hidden border-none shadow-none">
                  <div className="flex flex-row flex-wrap items-center justify-center">
                    <div className="relative aspect-square h-[120px] rounded-full">
                      <Image
                        src={
                          "https://pivoo.themepreview.xyz/home-two/wp-content/uploads/sites/3/2024/04/beth-macdonald-V6LEV6CBVLw-unsplash-1-150x150.jpg"
                        }
                        alt={""}
                        fill
                        className="rounded-inherit"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-2xl font-bold">
                        {"Baked Good"}
                      </h3>
                      <p className="text-secondary">{"10"} Recipes</p>
                    </CardContent>
                  </div>
                </Card>
                {/* <div className="flex items-center gap-4">
                  <div className="h-[120px] w-[120px] overflow-hidden rounded-full">
                  =""
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-medium text-primary">
                      Baked Good
                    </h3>
                    <p className="text-secondary">10 Recipe</p>
                  </div>
                </div> */}
              </Repeat>
            </div>
          </div>
        </div>
        {/* Product */}
      </section>
      <section className="container py-16">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2
              className={typography({
                className: "font-medium text-foreground",
                display: "sm",
              })}>
              Popular Recipes Of The Week
            </h2>
            <h3
              className={typography({
                className: "text-muted-foreground",
              })}>
              Our most popular recipes of this week
            </h3>
          </div>
          <Link className="text-primary-foreground" href="#">
            See all
          </Link>
        </div>
        <section className="section-padding"></section>
        <div className="py-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* {popularRecipes.map((recipe) => (
              <div key={recipe.title}>{recipe.title}</div>
            ))} */}
            {/* <RecipeCard />
            <RecipeCard />
            <RecipeCard /> */}
          </div>
        </div>
      </section>
    </>
  );
}
