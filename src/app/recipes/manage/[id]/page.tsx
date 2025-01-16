// ** Next Imports
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// ** Services
import { getRecipeDetails } from "@/services/server/recipeService";

// ** Types
type Props = { params: { id: string } };

export default async function RecipeDetailPage({ params }: Props) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const recipeDetail = await getRecipeDetails(params.id, accessToken);

  if (!accessToken || !recipeDetail) {
    notFound();
  }
  const ImagePreview = ({ index, image }: { index: number; image: string }) => {
    return (
      <div className="relative h-[220px] w-full overflow-hidden rounded-lg border-2 border-dashed">
        <Image
          src={image}
          alt={`Recipe image ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  const Ingredients = () => {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <h4 className="mb-2 text-sm text-muted-foreground">
          Step-by-step guide to make this recipe.
        </h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Measurement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipeDetail.ingredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell>{ingredient.quantity}</TableCell>
                <TableCell>{ingredient.measurement}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const Instructions = () => {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Instructions</h3>
        <h4 className="mb-2 text-sm text-muted-foreground">
          All the ingredients used in this recipe.
        </h4>
        <div className="flex flex-col pb-8">
          {recipeDetail.instructionSections!.map(
            (instructionSection, index) => (
              <div className="mb-5" key={index}>
                <h5 className="flex items-center gap-2 text-lg font-medium text-primary">
                  {index + 1}.<span>{instructionSection.title}</span>
                </h5>
                <div className="ml-5 flex flex-col">
                  {instructionSection.instructions.map((instruction, index) => (
                    <p key={index} className="flex gap-2 text-muted-foreground">
                      <span className="whitespace-nowrap font-medium">
                        Step {instruction.step}:
                      </span>
                      <span>{instruction.description}</span>
                    </p>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">
          Recipe Details
        </h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recipe General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* {images.map((image, index) => (
            <ImagePreview key={index} index={index} image={image.url} />
          ))} */}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-6 pt-6">
            <Ingredients />
            <Separator />
            <Instructions />
          </CardContent>
        </Card>
        <div className="mt-8 text-end">
          <Button asChild>
            <Link href={`/recipes/manage/${params.id}/edit`}>Edit Recipe</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
