// ** Components
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/ui/RecipeCard";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import Repeat from "@/components/Repeat";
import Image from "next/image";
import RecipeCategories from "@/components/RecipeCategories";
import Recipes from "@/components/Recipes";

export default async function Home() {
  return (
    <>
      <section className="relative min-h-screen max-w-full bg-first-slider bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="flex items-center">
            <div
              className={
                "inline-block w-2/3 space-y-6 py-[180px] pl-0 pr-[80px] text-foreground"
              }>
              <h2
                className={
                  "text-[3rem] font-medium leading-[3.75rem] text-foreground"
                }>
                The Easiest Way To Make Your Favorite Meal
              </h2>
              <h3 className="text-xl text-foreground">
                Discover 1000+ recipes in your hand with the best recipe. Help
                you to find the easiest way to cook.
              </h3>
              <Button className="h-10">Explore Recipes</Button>
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
      <RecipeCategories />
      <Recipes />
    </>
  );
}
