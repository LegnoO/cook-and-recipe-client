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
      quantity: z.number().min(0, "Quantity must be a positive number"),
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
      ingredients: [
        { name: "", quantity: 0, measurement: "" },
        { name: "", quantity: 0, measurement: "" },
      ],
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
    <div className="bg-background py-[35px]">
      <div className="container">
        <Form {...form}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-8 md:flex-row">
            <div className="w-1/2">
              <h2 className="mb-4 text-lg font-medium uppercase text-muted">
                Recipe general information
              </h2>

              <div className="flex flex-col gap-4">
                <ImageUpload form={form} />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: Vietnamese Pho, Spaghetti Carbonara, Chicken Tikka Masala"
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
                        <FormLabel>Cook duration</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              min={0}
                              type="number"
                              placeholder="eg: 30"
                              {...field}
                            />
                            <span>minute</span>
                          </div>
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
                        <FormLabel>Number of serving</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              min={0}
                              type="number"
                              placeholder="eg: 4 or 3-5"
                              {...field}
                            />
                            <span>person</span>
                          </div>
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
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="mb-4 text-lg font-medium uppercase text-muted">
                Recipe detail
              </h2>
              <div className="flex flex-col gap-4">
                <AddIngredient form={form} />
                <AddInstruction form={form} />
              </div>
            </div>
            {false && (
              <button
                onClick={() => {
                  console.log({
                    error: form.formState.errors,
                    data: form.getValues(),
                  });
                }}
                type="submit">
                submit
              </button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreateRecipe;
