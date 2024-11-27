"use client";

// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Image from "next/image";

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

// ** Icons
import { Trash2, Info, Plus } from "lucide-react";

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
          ".jpg, .jpeg, .png and .webp files are accepted.",
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
      ingredients: [{ name: "", quantity: 1, measurement: "" }],
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
  }

  return (
    <div className="bg-background pb-[70px] pt-[35px]">
      <div className="container">
        <Form {...form}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex max-w-4xl flex-col gap-8">
            <Card>
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
                <CardTitle> Recipe Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AddIngredient form={form} />
                <AddInstruction form={form} />
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-4">
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
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreateRecipe;
