"use client";

// ** React Imports
import { useState, useEffect } from "react";

// ** Components
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ** Library Imports
import { UseFormReturn } from "react-hook-form";

// ** Lib
import fetcher from "@/lib/fetcher";

// ** Types
import { FormValues } from "../page";

interface Category {
  name: string;
  id: string;
}

type Props = {
  form: UseFormReturn<FormValues>;
  onChange: (value: FormValues["categoryId"]) => void;
};

const SelectCategory = ({ form, onChange }: Props) => {
  const id = "select-category-create-recipe";
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetcher("/category/public/find", {
          method: "GET",
        });
        const data: Category[] = await response.json();
        setCategories(data);
      } catch {
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Category</Label>
      <Select
        value={form.getValues("categoryId")}
        onValueChange={onChange}
        disabled={isLoading}>
        <SelectTrigger className="w-full" id={id}>
          <SelectValue
            placeholder={isLoading ? "Loading..." : "Select category"}
          />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0
            ? categories.map((category) => (
                <SelectItem key={category.name} value={category.id}>
                  {category.name}
                </SelectItem>
              ))
            : !isLoading && <div>No categories available</div>}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;
