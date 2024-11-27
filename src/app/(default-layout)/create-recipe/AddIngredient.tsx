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
import { Trash2, Info, Plus } from "lucide-react";

// ** Types
import { FormValues } from "./page";

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
    <div className="rounded-lg border border-divider p-4">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="font-medium">Ingredients</h3>
        <Info className="h-4 w-4 text-muted" />
      </div>

      {ingredientFields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <div className="grid grid-cols-[2fr,1fr,1fr,auto] gap-2">
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Ingredient name" {...field} />
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
                      placeholder="Quantity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeIngredient(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          appendIngredient({
            name: "",
            quantity: 0,
            measurement: "",
          })
        }>
        <Plus className="mr-2 h-4 w-4" />
        Add ingredient
      </Button>
    </div>
  );
};

export default AddIngredient;
