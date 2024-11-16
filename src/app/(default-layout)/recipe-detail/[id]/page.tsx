// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** React Imports
import { Fragment } from "react";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "./_components/ImageGallery";

// ** Icons
import {
  Calendar,
  ChefHat,
  Utensils,
  UtensilsCrossed,
  Timer,
  Clock,
  ChevronsRight,
} from "lucide-react";

// ** Lib
import { getCharInitials } from "@/lib/utils";

import Recipes from "@/components/Recipes";
import BannerLog from "@/components/BannerLog";
import Repeat from "@/components/Repeat";

// ** Types
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RecipeDetail({ params, searchParams }: Props) {
  const fake_data = {
    id: "670ed5fe95ce989ba6a00276",
    name: "Lamb soup with spices & rice",
    timeToCook: 4,
    difficulty: "Medium",
    serves: 4,
    imageUrls: [
      "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
      "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
      // "https://braise.qodeinteractive.com/wp-content/uploads/2021/09/recipe-single-featured.jpg",
      "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
      "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
    ],
    createdDate: "2024-10-15T20:50:17.235Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo co nsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fu giat nulla pariatur. Excepteur sint occaecat cupidatat non proident. sunt in culpa qui officia deser unt a mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipicibe elit sed do eiusmo.",
    ingredients: [
      { name: "All-purpose flour", quantity: 2, measurement: "cups" },
      { name: "Granulated sugar", quantity: 1, measurement: "cup" },
      { name: "Baking powder", quantity: 2, measurement: "teaspoons" },
      { name: "Salt", quantity: 0.5, measurement: "teaspoon" },
      { name: "Unsalted butter", quantity: 0.5, measurement: "cup" },
      { name: "Eggs", quantity: 2, measurement: "large" },
      { name: "Milk", quantity: 0.75, measurement: "cup" },
      { name: "Vanilla extract", quantity: 1, measurement: "teaspoon" },
    ],
    instructionSections: [
      {
        title: "Prepare the ingredients",
        instructions: [
          { step: 1, description: "Cut the lamb into bite-sized pieces" },
          { step: 2, description: "Dice the onion and carrots" },
          { step: 3, description: "Mince the garlic" },
        ],
      },
      {
        title: "Cook the soup",
        instructions: [
          { step: 1, description: "Brown the lamb in a large pot" },
          { step: 2, description: "Add vegetables and sauté until soft" },
          { step: 3, description: "Add spices and rice" },
          {
            step: 4,
            description: "Pour in broth and simmer until meat is tender",
          },
        ],
      },
    ],
    createdBy: {
      id: "670d73f1beeeb06c352ab012",
      avatar:
        "https://res.cloudinary.com/dzl5ur69n/image/upload/v1730112900/hcanawuro1lszydjponm.png",
      fullName: "Legno",
      email: "legno@gmail.com",
      description:
        "Lorem ipsum dolor sit amet, ad consectetur adi picibe elit, sed do eiusmod tempor inci didunt quo labore e dolore magna aliqua ut.",
    },
    category: "baked",
  };

  const recipeId = params.id;
  const servings =
    Number(searchParams.serving) > 1 ? Number(searchParams.serving) : 1;

  function getServingsUrl(servings: number) {
    if (servings > 1) {
      return `/recipe-detail/${recipeId}/?serving=${servings}`.toString();
    }
    return `/recipe-detail/${recipeId}/?serving=1`;
  }

  const IngredientRow = ({
    ingredient,
  }: {
    ingredient: { name: string; quantity: number; measurement: string };
  }) => (
    <TableRow className="hover:bg-inherit [&:has(button[data-state=checked])_td:nth-child(2)]:line-through">
      <TableCell className="h-[48px] w-[40px] border-r">
        <Checkbox className="border-divider shadow-none" />
      </TableCell>
      <TableCell>
        {ingredient.quantity * servings} {ingredient.measurement}{" "}
        {ingredient.name}
      </TableCell>
    </TableRow>
  );

  return (
    <Fragment>
      <BannerLog title="Recipe Detail" />
      <section className="pb-28 pt-12">
        <div className="container flex">
          <div className="w-1/2">
            <ImageGallery images={fake_data.imageUrls} />
          </div>
          <div className="w-1/2">
            <div className="flex h-full flex-col justify-center gap-3 p-12">
              <h6 className="mb-2 font-medium uppercase tracking-wider text-primary">
                Drink Recipes
              </h6>
              <h2 className="mb-2 text-5xl font-bold">The Real Mojito</h2>
              <p className="mb-3 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              <div className="mb-2 flex items-center rounded-lg">
                <div className="flex w-full items-center gap-1.5 px-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/profile-image-100x100.jpg"
                      }
                      alt={`avatar`}
                    />
                    {/* <AvatarFallback> */}
                    {/* {getCharInitials(userProfile.fullName)} */}
                    {/* </AvatarFallback> */}
                  </Avatar>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span>Author</span>
                      <span className="text-primary">Tester</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Posted 2 days ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-2 grid grid-cols-3 items-center rounded-lg bg-background p-4">
                <li className="flex flex-col px-6 py-2">
                  <div className="flex items-center gap-1">
                    <UtensilsCrossed className="h-4 w-4" />
                    <h4 className="font-semibold">Yields:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {fake_data.serves} Servings
                  </p>
                </li>

                <li className="flex flex-col border-l border-r border-divider px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <h4 className="font-semibold">Cooking:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {fake_data.timeToCook} min
                  </p>
                </li>

                <li className="flex flex-col px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-semibold">Difficulties:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {fake_data.difficulty}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background pb-28 pt-12">
        <div className="container flex gap-20">
          <div className="w-[65%]">
            <div className="lined-paper-background rounded-lg px-6 pb-8 pt-5 shadow-md">
              <h2 className="mb-4.5 flex items-center gap-2 text-2xl font-semibold">
                <span>
                  <ChefHat />
                </span>
                <span>Cooking Instructions</span>
              </h2>
              <div className="flex flex-col pb-10 [&:has(p.a)]:bg-red-500">
                {fake_data.instructionSections.map(
                  (instructionSection, index) => (
                    <div className="mb-5" key={index}>
                      <h5 className="flex items-center gap-2 text-lg font-medium text-primary">
                        {index + 1}.<span>{instructionSection.title}</span>
                      </h5>
                      <div className="ml-5 flex flex-col">
                        {instructionSection.instructions.map(
                          (instruction, index) => (
                            <p
                              key={index}
                              className="flex items-center gap-2 text-muted-foreground">
                              <span>Step {instruction.step}:</span>
                              <span> {instruction.description}</span>
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="w-[35%]">
            <div className="lined-paper-background rounded-lg px-6 pb-8 pt-5 shadow-md">
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-semibold">
                <span>
                  <Utensils />
                </span>
                <span>Ingredients</span>
              </h2>
              <div className="flex flex-col">
                {fake_data.ingredients.map((ingredient, index) => (
                  <Fragment key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox /> <span>{ingredient.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">
                          {ingredient.quantity} {ingredient.measurement}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="pb-32 pt-[75px]">
          <h2 className="mb-4.5 flex items-center gap-2 text-3xl font-bold tracking-wider">
            Chef Info
          </h2>
          <div className="flex w-full items-stretch gap-4">
            <div className="w-[65%]">
              <div className="flex h-full w-full items-stretch">
                <img
                  className="aspect-square h-[280px]"
                  src="https://recipepress.inspirythemes.com/third/wp-content/uploads/sites/4/2017/01/chef-5-479x492.jpg"
                  alt=""
                />
                <div className="w-[80%]">
                  <div className="h-full bg-background p-2.5">
                    <div className="flex h-full flex-col gap-4 border border-divider p-4">
                      <h4 className="relative w-fit font-bold before:absolute before:-bottom-2 before:h-[2px] before:w-2/5 before:bg-primary before:transition-all before:content-[''] hover:before:w-full">
                        <a>{fake_data.createdBy.fullName}</a>
                      </h4>
                      <span className="text-sm text-primary">
                        Assistant Chef
                      </span>
                      <p className="line-clamp-3 text-sm">
                        {fake_data.createdBy.description}
                      </p>
                      <Button
                        variant="link"
                        className="max-w-[140px] justify-start p-0 text-foreground hover:text-primary hover:no-underline">
                        Read More
                        <ChevronsRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-[35%]">
              <div className="flex flex-col gap-4.5 rounded-lg px-3 pb-3">
                <h4 className="text-2xl font-bold">Featured Recipes</h4>
                <div className="flex flex-col gap-2">
                  <Repeat times={3}>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://braise.qodeinteractive.com/wp-content/uploads/2021/09/main-home-recipe-list-img-10-600x680.jpg"
                        alt=""
                        className="aspect-square h-16 rounded-sm object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h4 className="mb-1 font-medium">Ultimate Pot Roast</h4>
                        <p className="text-sm text-muted-foreground">
                          September 21, 2021
                        </p>
                      </div>
                    </div>
                  </Repeat>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <Recipes />
      </div>
    </Fragment>
    // <main className="flex items-center">
    //   <div className="container">
    //     <BannerLog title="Recipe Detail" />
    //     <section className="w-8/12"></section>
    //     <aside className="w-4/12"></aside>
    //   </div>
    // </main>
  );
}
