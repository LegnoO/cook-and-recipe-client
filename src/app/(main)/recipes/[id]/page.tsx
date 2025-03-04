// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import RecipeCard from "@/components/RecipeCard";
import ImageGallery from "./_components/ImageGallery";
import Comment from "./_components/Comment";

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
import { calculateDaysAgo } from "@/utils";

// ** Services
import {
  getRecipeDetail,
  getRecipeList,
} from "@/services/server/recipeService";

// ** Types
type Props = {
  params: { id: string };
  searchParams: SearchParams;
};

// ** SEO
export async function generateMetadata({ params }: Props) {
  try {
    const recipeDetail = await getRecipeDetail(params.id);
    return {
      title: `${recipeDetail.name}`,
      description: recipeDetail.description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${params.id}`,
      },
      openGraph: {
        images: [{ url: recipeDetail.imageUrls[0] }],
      },
    };
  } catch {
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    };
  }
}

export default async function RecipeDetailPage({ params }: Props) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const recipeDetail = await getRecipeDetail(params.id, accessToken);

  const { data: recipesResponse } = await getRecipeList({
    index: "1",
    size: "3",
    sortOrder: "desc",
    chefId: recipeDetail.createdBy.id,
  });

  const recipes = recipesResponse.filter((recipe) => recipe.id !== params.id);

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
                      src={
                        recipeDetail.createdBy.userInfo.avatar ||
                        "/images/avatar-default.png"
                      }
                      alt={`Author ${recipeDetail.createdBy.userInfo.fullName}`}
                    />
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
                  <div className="text-center">
                    <p className="mb-4 text-muted-foreground">
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
                    src={
                      recipeDetail.createdBy.userInfo.avatar ||
                      "/images/avatar-default.png"
                    }
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
          <Comment recipeDetail={recipeDetail} />
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container">
          <h3 className="mb-8 text-2xl font-bold tracking-wider md:text-3xl lg:text-3xl">
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
  );
}
