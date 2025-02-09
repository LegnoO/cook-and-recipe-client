"use client";

// * React Imports
import { useState, useEffect } from "react";

// ** Next Imports
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";

// ** Library Imports
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

// ** Icons
import {
  Edit,
  Clock,
  Users,
  ChefHat,
  Star,
  Globe,
  Lock,
  Eye,
} from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getRecipesOwnedDetail } from "@/services/client/recipeService";

// ** Types
type Props = { params: { id: string } };

export default function RecipesOwnedDetail({ params }: Props) {
  const [recipe, setRecipe] = useState<RecipeDetail>();

  const {
    data: recipeDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipes-owned-detail", params.id],
    queryFn: () => getRecipesOwnedDetail(params.id),
    ...queryOptionsConfig,
  });

  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
    { title: "Manage", href: "/recipes/manage" },
  ];

  if (recipe) {
    breadcrumbLinks.push({
      title: recipe.name,
    });
  }

  if (isError) {
    notFound();
  }
  // const ImagePreview = ({ index, image }: { index: number; image: string }) => {
  //   return (
  //     <div className="relative h-[220px] w-full overflow-hidden rounded-lg border-2 border-dashed">
  //       <Image
  //         src={image}
  //         alt={`Recipe image ${index + 1}`}
  //         fill
  //         className="object-cover"
  //       />
  //     </div>
  //   );
  // };

  const Ingredients = () => {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Ingredients</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Measurement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipe!.ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {ingredient.name}
                    </TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                    <TableCell>{ingredient.measurement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const Instructions = () => {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Instructions</h2>

            <div className="flex flex-col">
              {recipe!.instructionSections!.map((instructionSection, index) => (
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
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  console.log("RecipeDetailPage ", recipeDetail);

  useEffect(() => {
    if (recipeDetail) {
      setRecipe(recipeDetail);
    }
  }, [recipeDetail]);

  if (!recipe || (isLoading && !recipe)) {
    return <>loading</>;
  }

  return (
    <section>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <div className="mb-8">
            <Breadcrumb items={breadcrumbLinks} />
          </div>
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">
            {recipe.name}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{recipe.category.name}</Badge>
            <span className="text-sm text-muted-foreground">
              Created on {format(new Date(recipe.createdDate), "MMMM d, yyyy")}
            </span>
            <Badge variant={true ? "default" : "secondary"}>
              {true ? (
                <Globe className="mr-1 h-3 w-3" />
              ) : (
                <Lock className="mr-1 h-3 w-3" />
              )}
              {true ? "Public" : "Private"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex cursor-default items-center gap-2 hover:bg-secondary hover:text-foreground">
            <Eye className="h-4 w-4" />
            {recipe.viewCount} views
          </Button>
          <Button asChild variant="default">
            <Link href={`/recipes/manage/${params.id}/edit`}>
              <Edit className="h-4 w-4" />
              Edit Recipe
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          {recipe.imageUrls.slice(0, 4).map((url, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden rounded-lg border ${
                index === 0 && recipe.imageUrls.length === 3 ? "col-span-2" : ""
              }`}>
              <Image
                src={url || "/placeholder.svg"}
                alt={`${recipe.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Cook Time</p>
                <p className="font-medium">{recipe.timeToCook} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Servings</p>
                <p className="font-medium">{recipe.serves} people</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ChefHat className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-medium">{recipe.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-medium">
                  {recipe.rating
                    ? `${recipe.rating.toFixed(1)} / 5`
                    : "Not rated yet"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="mb-1 text-base font-semibold lg:text-lg">
              Description
            </h4>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ingredients">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <Ingredients />
        </TabsContent>
        <TabsContent value="instructions">
          <Instructions />
        </TabsContent>
      </Tabs>
    </section>
  );
}
