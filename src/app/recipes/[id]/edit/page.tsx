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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UploadImage from "./UploadImage";
import SelectCategory from "./SelectCategory";
import SelectDifficulty from "./SelectDifficulty";
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
import {
  updateRecipe,
  fetchRecipeDetail,
  privateRecipe,
  publicRecipe,
  requestVerifyRecipe,
} from "@/services/client/recipeService";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Lib
import { cn, appendFormData, convertMBToBytes, isEmptyObject } from "@/utils";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Schema
const formSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  serves: z.number().min(1, "Number of servings is required"),
  timeToCook: z.number().min(1, "Cook duration is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard", "Professional", "Expert"]),
  categoryId: z.string().min(1, "Category is required"),
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
  oldImageUrls: z.array(z.string()).nullable(),
  newImages: z.union([
    z.null(),
    z.array(
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
    ),
  ]),
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
  const router = useRouter();
  const [recipeStatus, setRecipeStatus] = useState<RecipeStatus>("private");
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

  function handleCategoryChange(value: FormValues["categoryId"]) {
    form.setValue("categoryId", value);
  }

  function handleDifficultyChange(value: FormValues["difficulty"]) {
    form.setValue("difficulty", value);
  }

  function handleRecipeStatusChange(value: RecipeStatus) {
    setRecipeStatus(value);
  }

  async function handleRequestRecipeStatus() {
    if (!recipeDetail) {
      return;
    }
    if (
      recipeStatus === "public" &&
      ["unverified", "rejected"].includes(recipeDetail.verifyStatus)
    ) {
      await requestVerifyRecipe(recipeDetail.id);
    }

    if (recipeDetail.verifyStatus === "verified") {
      if (recipeStatus === "public") {
        await publicRecipe(recipeDetail.id);
      } else {
        await privateRecipe(recipeDetail.id);
      }
    }
  }

  async function onSubmit(dataSubmit: FormValues) {
    setLoading(true);
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });

    const formData = appendFormData({
      ...dataSubmit,
      ingredients: JSON.stringify(dataSubmit.ingredients),
      instructionSections: JSON.stringify(dataSubmit.instructionSections),
      newImages: images
        .filter((image) => image.file !== null)
        .map((x) => x.file),

      oldImageUrls: JSON.stringify(
        images.filter((image) => image.file === null).map((x) => x.url),
      ),
    });

    try {
      await updateRecipe(formData, recipeDetail!.id);

      if ((recipeStatus === "public") !== recipeDetail?.status) {
        await handleRequestRecipeStatus();
      }

      toast({
        title: "Success!",
        description: "Your recipe has been updated successfully.",
        variant: "successful",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
      router.push("/profile");
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
        categoryId: recipeDetail.category.id,
        newImages: null,
        oldImageUrls: null,
      });
      setImages(
        recipeDetail.imageUrls.map((url) => ({
          url,
          file: null,
        })),
      );
      setRecipeStatus(recipeDetail.status ? "public" : "private");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeDetail]);

  if (!recipeDetail || isEmptyObject(form.getValues())) {
    return (
      <div className="bg-background">
        <div className="container py-[calc(72px+30px)]">Load</div>
      </div>
    );
  }

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
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <UploadImage
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
                    <SelectCategory
                      onChange={handleCategoryChange}
                      form={form}
                    />
                    <SelectDifficulty
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Set Recipe As</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    disabled={recipeDetail.verifyStatus === "pending"}
                    defaultValue={recipeStatus}
                    onValueChange={handleRecipeStatusChange}>
                    <div
                      className={cn(
                        "mt-2 flex items-start space-x-3 space-y-0 rounded-lg border p-4 has-button-checked:bg-secondary",
                        {
                          "bg-secondary":
                            recipeDetail.verifyStatus === "pending",
                        },
                      )}>
                      <RadioGroupItem
                        value="private"
                        id="private"
                        className="mt-1"
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor="private"
                          className="flex flex-col gap-1.5 font-medium">
                          <span>Private - Only you can see</span>
                          <span className="text-sm text-muted-foreground">
                            This recipe will be visible only to you as the
                            creator
                          </span>
                        </Label>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "mt-2 flex items-start space-x-3 space-y-0 rounded-lg border p-4 has-button-checked:bg-secondary",
                        {
                          "bg-secondary":
                            recipeDetail.verifyStatus === "pending",
                        },
                      )}>
                      <RadioGroupItem
                        value="public"
                        id="public"
                        className="mt-1"
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor="public"
                          className="flex flex-col gap-1.5 font-medium">
                          <span>Public for everyone</span>
                          <span className="text-sm text-muted-foreground">
                            Anyone can view this recipe{" "}
                            {recipeDetail.verifyStatus === "unverified" &&
                              "after admin approval"}
                            creator
                          </span>
                        </Label>
                      </div>
                    </div>
                    {recipeDetail.verifyStatus === "pending" && (
                      <p className="text-nowrap text-muted-foreground">
                        Waiting for verification
                      </p>
                    )}
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="flex items-center justify-end gap-4">
                <Button
                  onClick={() => router.push("/profile")}
                  type="button"
                  variant="outline">
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
