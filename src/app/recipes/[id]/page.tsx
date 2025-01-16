// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageGallery from "./ImageGallery";
import RecipeCard from "@/components/RecipeCard";
import Comment from "./Comment";

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
import { calculateDaysAgo, getCharInitials } from "@/utils";

// ** Services
import {
  getRecipeDetails,
  getRecipeList,
} from "@/services/server/recipeService";

// ** Types
type Props = {
  params: { id: string };
  searchParams: SearchParams;
};

// export async function generateStaticParams() {
//   const { data: recipes } = await getRecipeList({
//     index: "1",
//     sortOrder: "desc",
//     size: "100000",
//   });

//   return recipes.map((recipe) => ({
//     id: recipe.id,
//   }));
// }

export async function generateMetadata({ params }: Props) {
  const recipe = await getRecipeDetails(params.id);

  if (!recipe) {
    return {
      title: "Recipe not found",
    };
  }

  return {
    title: `${recipe.name}`,
    description: recipe.description,
    openGraph: {
      images: [{ url: recipe.imageUrls[0] }],
    },
  };
}

export default async function RecipeDetailPage({
  params,
  searchParams,
}: Props) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const recipeDetail = await getRecipeDetails(params.id, accessToken);
  // console.log("🚀 ~ recipeDetail:", recipeDetail);
  console.log("RecipeDetailPage");
  const { data: recipesResponse } = await getRecipeList({
    index: "1",
    size: "3",
    sortOrder: "desc",
    chefId: recipeDetail.createdBy.id,
  });

  const recipes = recipesResponse.filter((recipe) => recipe.id !== params.id);
  const commentIndex = Number(searchParams.comment);

  // const _s = {
  //   id: "670ed5fe95ce989ba6a00276",
  //   name: "Lamb soup with spices & rice",
  //   timeToCook: 4,
  //   difficulty: "Medium",
  //   serves: 4,
  //   imageUrls: [
  //     "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
  //     "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
  //     // "https://braise.qodeinteractive.com/wp-content/uploads/2021/09/recipe-single-featured.jpg",
  //     "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
  //     "https://point.moxcreative.com/yumma/wp-content/uploads/sites/2/2022/04/mojito.jpg",
  //   ],
  //   createdDate: "2024-10-15T20:50:17.235Z",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo co nsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fu giat nulla pariatur. Excepteur sint occaecat cupidatat non proident. sunt in culpa qui officia deser unt a mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipicibe elit sed do eiusmo.",
  //   ingredients: [
  //     { name: "All-purpose flour", quantity: 2, measurement: "cups" },
  //     { name: "Granulated sugar", quantity: 1, measurement: "cup" },
  //     { name: "Baking powder", quantity: 2, measurement: "teaspoons" },
  //     { name: "Salt", quantity: 0.5, measurement: "teaspoon" },
  //     { name: "Unsalted butter", quantity: 0.5, measurement: "cup" },
  //     { name: "Eggs", quantity: 2, measurement: "large" },
  //     { name: "Milk", quantity: 0.75, measurement: "cup" },
  //     { name: "Vanilla extract", quantity: 1, measurement: "teaspoon" },
  //   ],
  // instructionSections: [
  //   {
  //     title: "Prepare the ingredients",
  //     instructions: [
  //       { step: 1, description: "Cut the lamb into bite-sized pieces" },
  //       { step: 2, description: "Dice the onion and carrots" },
  //       { step: 3, description: "Mince the garlic" },
  //     ],
  //   },
  //   {
  //     title: "Cook the soup",
  //     instructions: [
  //       { step: 1, description: "Brown the lamb in a large pot" },
  //       { step: 2, description: "Add vegetables and sauté until soft" },
  //       { step: 3, description: "Add spices and rice" },
  //       {
  //         step: 4,
  //         description: "Pour in broth and simmer until meat is tender",
  //       },
  //     ],
  //   },
  // ],
  //   createdBy: {
  //     id: "670d73f1beeeb06c352ab012",
  //     avatar:
  //       "https://res.cloudinary.com/dzl5ur69n/image/upload/v1730112900/hcanawuro1lszydjponm.png",
  //     fullName: "Legno",
  //     email: "legno@gmail.com",
  //     description:
  //       "Lorem ipsum dolor sit amet, ad consectetur adi picibe elit, sed do eiusmod tempor inci didunt quo labore e dolore magna aliqua ut.",
  //   },
  //   category: "baked",
  // };

  // const recipeId = params.id;
  // const servings =
  //   Number(searchParams.serving) > 1 ? Number(searchParams.serving) : 1;

  // function getServingsUrl(servings: number) {
  //   if (servings > 1) {
  //     return `/recipe-detail/${recipeId}/?serving=${servings}`.toString();
  //   }
  //   return `/recipe-detail/${recipeId}/?serving=1`;
  // }

  // const IngredientRow = ({
  //   ingredient,
  // }: {
  //   ingredient: { name: string; quantity: number; measurement: string };
  // }) => (
  //   <TableRow className="hover:bg-inherit [&:has(button[data-state=checked])_td:nth-child(2)]:line-through">
  //     <TableCell className="h-[48px] w-[40px] border-r">
  //       <Checkbox className="shadow-none" />
  //     </TableCell>
  //     <TableCell>
  //       {ingredient.quantity * servings} {ingredient.measurement}{" "}
  //       {ingredient.name}
  //     </TableCell>
  //   </TableRow>
  // );

  return (
    <Fragment>
      <section className="bg-background pb-20 pt-12">
        <div className="container flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <ImageGallery images={recipeDetail.imageUrls} />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex h-full flex-col gap-3 p-8">
              <h6 className="mb-2 font-medium uppercase tracking-wider text-primary">
                {recipeDetail.category.name}
              </h6>
              <h2 className="mb-2 text-5xl font-bold">{recipeDetail.name}</h2>
              <p className="mb-3 text-muted-foreground">
                {recipeDetail.description}
              </p>

              <div className="mb-2 flex items-center rounded-lg">
                <div className="flex w-full items-center gap-3 px-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      className="object-cover"
                      src={recipeDetail.createdBy.userInfo.avatar}
                      alt={`Author ${recipeDetail.createdBy.userInfo.fullName}`}
                    />
                    <AvatarFallback>
                      {getCharInitials(
                        recipeDetail.createdBy.userInfo.fullName,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-medium text-primary lg:text-base">
                      {recipeDetail.createdBy.userInfo.fullName}
                    </span>

                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Posted {calculateDaysAgo(recipeDetail.createdDate)} days
                        ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="grid-cols-3-res mt-2 grid place-items-center items-center rounded-lg bg-background p-4 shadow">
                <li className="flex flex-col px-6 py-2">
                  <div className="flex items-center gap-1">
                    <UtensilsCrossed className="h-4 w-4" />
                    <h4 className="font-semibold">Yields:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {recipeDetail.serves} Servings
                  </p>
                </li>

                <li className="flex flex-col border-l border-r px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <h4 className="font-semibold">Cooking:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {recipeDetail.timeToCook} min
                  </p>
                </li>

                <li className="flex flex-col px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-semibold">Difficulties:</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {recipeDetail.difficulty}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background pb-28 pt-12">
        <div className="container flex flex-col gap-20 lg:flex-row">
          <div className="w-full lg:w-[65%]">
            <div className="lined-paper-background flex h-full flex-col rounded-lg px-6 pb-8 pt-5 shadow-md">
              <h2 className="mb-4.5 flex items-center gap-2 text-2xl font-semibold">
                <span>
                  <ChefHat />
                </span>
                <span>Cooking Instructions</span>
              </h2>

              {recipeDetail.instructionSections ? (
                <div className="flex flex-col pb-8">
                  {recipeDetail.instructionSections.map(
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
                                className="flex gap-2 text-muted-foreground">
                                <span className="whitespace-nowrap font-medium">
                                  Step {instruction.step}:
                                </span>
                                <span>{instruction.description}</span>
                              </p>
                            ),
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-4 text-center">
                    <p className="text-muted-foreground">
                      Please login to view the cooking instructions
                    </p>
                    <Link href="/login">
                      <Button
                        variant="default"
                        size="lg"
                        className="font-medium">
                        Login to read
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-[35%]">
            <div className="lined-paper-background rounded-lg px-6 pb-8 pt-5 shadow-md">
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-semibold">
                <span>
                  <Utensils />
                </span>
                <span>Ingredients</span>
              </h2>
              <div className="flex flex-col gap-3">
                {recipeDetail.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex w-full items-center gap-2">
                    <Checkbox id={`ingredient-${index}`} />
                    <Label
                      className="flex w-full items-center justify-between"
                      htmlFor={`ingredient-${index}`}>
                      <span>{ingredient.name}</span>
                      <span className="text-muted-foreground">
                        {ingredient.quantity} {ingredient.measurement}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container pb-32 pt-[75px]">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-wider lg:text-3xl">
            SUBMITTED BY
          </h2>
          <div className="flex w-full items-stretch gap-4">
            <div className="w-full">
              <div className="flex h-full w-full flex-col items-stretch lg:flex-row">
                <div className="relative aspect-[1/1.5] h-[320px] max-w-full lg:aspect-square lg:max-w-[300px]">
                  <Image
                    fill
                    className="rounded-lg object-cover"
                    src={recipeDetail.createdBy.userInfo.avatar}
                    alt={`Chef ${recipeDetail.createdBy.userInfo.fullName}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="h-full rounded-md bg-background p-2.5">
                    <div className="h-full w-full rounded-lg border p-4">
                      <div className="flex h-full w-full flex-col gap-4 lg:w-[70%]">
                        <h4 className="underline-animation w-fit text-2xl font-bold">
                          {recipeDetail.createdBy.userInfo.fullName}
                        </h4>
                        <i className="font-medium text-primary">
                          {recipeDetail.createdBy.level} Chef
                        </i>
                        <p className="text-muted-foreground">
                          {recipeDetail.createdBy.description} A passionate chef
                          specializing in Asian cuisine with over 5 years of
                          cooking experience. Known for creating authentic and
                          innovative dishes that blend traditional techniques
                          with modern presentation.
                        </p>
                        <Link href={`/chefs/${recipeDetail.createdBy.id}`}>
                          <Button className="mt-auto max-w-36">
                            Read More
                            <ChevronsRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container">
          <Comment
            recipeDetail={recipeDetail}
            commentIndex={commentIndex || 1}
          />
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container">
          <h3 className="mb-8 text-4xl font-bold tracking-wider lg:text-3xl">
            More Recipes by Chef{" "}
            <span className="text-primary">
              {recipeDetail.createdBy.userInfo.fullName}
            </span>
          </h3>

          {recipes.length > 0 ? (
            <div className="grid-cols-4-res gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard recipe={recipe} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {"This chef hasn't published any other recipes yet."}
            </p>
          )}
        </div>
      </section>
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
