"use client";

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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import DifficultySelect from "./DifficultySelect";
import AddIngredient from "./AddIngredient";
import AddInstruction from "./AddInstruction";

// ** Library Imports
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";

// ** Services
import { createRecipe } from "@/services/recipeServer";

// ** Icons
import { Trash2, Info, Plus } from "lucide-react";

// ** Lib
import { appendFormData } from "@/lib/utils";

// ** Schema
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    )
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images are allowed"),
});
export type FormValues = z.infer<typeof formSchema>;

const CreateRecipe = () => {
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

  function handleCategoryChange(value: FormValues["category"]) {
    form.setValue("category", value);
  }

  function handleDifficultyChange(value: FormValues["difficulty"]) {
    form.setValue("difficulty", value);
  }

  async function onSubmit(dataSubmit: FormValues) {
    console.log("🚀 ~ CreateRecipe ~ dataSubmit:", dataSubmit);

    const formData = appendFormData({
      name: dataSubmit.name,
      serves: dataSubmit.serves,
      timeToCook: dataSubmit.timeToCook,
      description: dataSubmit.description,
      difficulty: dataSubmit.difficulty,
      category: dataSubmit.category,
      ingredients: JSON.stringify(dataSubmit.ingredients),
      instructionSections: JSON.stringify(dataSubmit.instructionSections),
      images: dataSubmit.images,
    });

    try {
      await createRecipe(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-background">
      <div className="container py-[calc(72px+30px)]">
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
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recipe General Information</CardTitle>
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
                <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
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
              <Button
                onClick={() => {
                  console.log({
                    error: form.formState.errors,
                    data: form.getValues(),
                  });
                }}
                type="submit">
                Publish Recipe
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreateRecipe;
