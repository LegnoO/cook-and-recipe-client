"use client";

// ** Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ** Library Imports
import { UseFormReturn, useFieldArray } from "react-hook-form";

// ** Icons
import { X, Plus } from "lucide-react";

// ** Types
import { FormValues } from "../page";

type Props = {
  form: UseFormReturn<FormValues>;
};

const AddIngredient = ({ form }: Props) => {
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Ingredients</h2>
      </div>

      {ingredientFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-[2fr,1fr,1fr,auto] gap-2">
          <FormField
            control={form.control}
            name={`ingredients.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g. All-purpose flour, Fresh basil leaves, Olive oil"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Quantity"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.measurement`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="hover:bg-destructive hover:text-destructive-foreground"
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeIngredient(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full py-6 font-semibold uppercase tracking-wider"
        onClick={() =>
          appendIngredient({
            name: "",
            quantity: 0,
            measurement: "",
          })
        }>
        <Plus className="h-4 w-4" />
        Add ingredient
      </Button>
    </div>
  );
};

export default AddIngredient;
