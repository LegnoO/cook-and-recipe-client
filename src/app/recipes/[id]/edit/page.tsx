"use client";

// ** React Imports
import { useState, useEffect } from "react";

// ** Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import DifficultySelect from "./DifficultySelect";
import AddIngredient from "./AddIngredient";
import AddInstruction from "./AddInstruction";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

// ** Services
import { fetchRecipeDetail } from "@/services/recipeServer";

// ** Lib
import { convertMBToBytes, isEmptyObject } from "@/lib/utils";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Schema
const formSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  serves: z.number().min(1, "Number of servings is required"),
  timeToCook: z.number().min(1, "Cook duration is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard", "Professional", "Expert"]),
  category: z.string().min(1, "Category is required"),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name is required"),
      quantity: z.number().min(1, "Quantity must be a positive number"),
      measurement: z.string().min(1, "Measurement is required"),
    }),
  ),
  instructionSections: z.array(
    z.object({
      title: z.string().min(1, "Section title is required"),
      instructions: z.array(
        z.object({
          step: z.number().min(1, "Step number is required"),
          description: z.string().min(1, "Step description is required"),
        }),
      ),
    }),
  ),
  imageUrls: z.array(z.string()).nullable(),
  newImages: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= convertMBToBytes(5),
          `Max file size is 5MB.`,
        )
        .refine(
          (file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              file.type,
            ),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    )
    .nullable(),
});
export type FormValues = z.infer<typeof formSchema>;

// ** Types
type Props = {
  params: { id: string };
};

type ListImage = {
  file: File | null;
  url: string;
}[];

export default function UpdateRecipePage({ params }: Props) {
  const { data: recipeDetail } = useQuery({
    queryKey: ["recipe-detail-edit"],
    queryFn: () => fetchRecipeDetail(params.id),
    ...queryOptionsConfig,
  });
  const { toast } = useToast();
  const [images, setImages] = useState<ListImage>([]);
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  console.log("🚀 ~ UpdateRecipePage ~ recipeDetail:", recipeDetail);
  function handleCategoryChange(value: FormValues["category"]) {
    form.setValue("category", value);
  }

  function handleDifficultyChange(value: FormValues["difficulty"]) {
    form.setValue("difficulty", value);
  }
  console.log(form.formState.errors);
  async function onSubmit(dataSubmit: FormValues) {
    console.log("🚀 ~ onSubmit ~ dataSubmit:", dataSubmit);
    setLoading(true);
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });
    // const formData = appendFormData({
    //   name: dataSubmit.name,
    //   serves: dataSubmit.serves,
    //   timeToCook: dataSubmit.timeToCook,
    //   description: dataSubmit.description,
    //   difficulty: dataSubmit.difficulty,
    //   category: dataSubmit.category,
    //   ingredients: JSON.stringify(dataSubmit.ingredients),
    //   instructionSections: JSON.stringify(dataSubmit.instructionSections),
    //   images: dataSubmit.images,
    // });

    try {
      // await createRecipe(formData);
      toast({
        title: "Success!",
        description: "Your recipe has been created successfully.",
        variant: "successful",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (recipeDetail) {
      form.reset({
        ...recipeDetail,
        newImages: null,
        category: recipeDetail.category.id,
      });
    }
  }, [form, recipeDetail]);

  if (isEmptyObject(form.getValues())) {
    return (
      <div className="bg-background">
        <div className="container py-[calc(72px+30px)]">Load</div>
      </div>
    );
  }
  console.log(form.getValues());

  return (
    <div className="bg-background">
      <div className="container py-16">
        <Form {...form}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-4xl">
            <div className="mb-4">
              <h1 className="mb-2 text-4xl font-semibold">Edit Recipe</h1>
              <p className="text-muted-foreground">
                Modify your culinary creation and share the updated version with
                our community.
              </p>
            </div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recipe General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload
                  form={form}
                  images={images}
                  setImages={setImages}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Vietnamese Pho, Spaghetti Carbonara, Chicken Tikka Masala"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="timeToCook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cook duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            min={0}
                            type="number"
                            placeholder="e.g. 30"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serves"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of serving (person)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            min={0}
                            type="number"
                            placeholder="e.g. 4 or 3-5"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CategorySelect onChange={handleCategoryChange} form={form} />
                  <DifficultySelect
                    onChange={handleDifficultyChange}
                    form={form}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="e.g., A hearty Vietnamese soup with rich broth, tender beef, and fresh herbs. Perfect for cold days!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Recipe Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AddIngredient form={form} />
                <Separator />
                <AddInstruction form={form} />
              </CardContent>
            </Card>
            <div className="mt-8 flex items-center justify-end gap-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button disabled={isLoading} type="submit">
                Publish Recipe
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
