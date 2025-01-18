"use client";

// ** React Imports
import { useState } from "react";

// ** Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";

// ** Services
import {
  createRecipe,
  requestVerifyRecipe,
} from "@/services/client/recipeService";

// ** Lib
import { appendFormData, convertMBToBytes } from "@/utils";

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
  images: z
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
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images are allowed"),
});
export type FormValues = z.infer<typeof formSchema>;

export default function CreateRecipePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [recipeStatus, setRecipeStatus] = useState<RecipeStatus>("private");
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serves: 0,
      timeToCook: 0,
      description: "",
      ingredients: [{ name: "", quantity: 0, measurement: "" }],
      instructionSections: [
        { title: "", instructions: [{ step: 1, description: "" }] },
      ],
      images: [],
    },
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
    });

    try {
      const createdRecipe = await createRecipe(formData);

      if (recipeStatus === "public")
        await requestVerifyRecipe(createdRecipe._id);

      toast({
        title: "Success!",
        description: "Your recipe has been created successfully.",
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
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="container">
        <Form {...form}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-4xl">
            <div className="mb-4">
              <h1 className="mb-2 text-4xl font-semibold">
                Create a new Recipe
              </h1>
              <p className="text-muted-foreground">
                Share your culinary creation with our community by adding a new
                recipe.
              </p>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ImageUpload form={form} />
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
                    <CategorySelect
                      onChange={handleCategoryChange}
                      form={form}
                    />
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
                <CardContent className="pt-6">
                  <AddIngredient form={form} />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <AddInstruction form={form} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Set Recipe As</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    defaultValue={recipeStatus}
                    onValueChange={handleRecipeStatusChange}>
                    <div className="mt-2 flex items-start space-x-3 space-y-0 rounded-lg border p-4 has-button-checked:bg-secondary">
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
                    <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 has-button-checked:bg-secondary">
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
                            Anyone can view this recipe after admin approval
                            creator
                          </span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="flex items-center justify-end gap-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button disabled={isLoading} type="submit">
                  Publish Recipe
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
