// ** React Imports
import { useState, useEffect } from "react";

// ** Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

// ** Services
import { getCategories } from "@/services/client/recipeService";

// ** Types
type Props = {
  open: boolean;
  value: string | undefined;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
};

const SelectCategory = ({
  value = "all",
  open,
  onOpenChange,
  onValueChange,
  className,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>();
  console.log("🚀 ~ categories:", { isLoading, categories });

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const categories = await getCategories();
      setIsLoading(false);
      if (categories) setCategories(categories);
    }

    fetchCategories();
  }, []);

  if (isLoading || !categories) {
    return <Skeleton className="h-9 min-w-[145px]" />;
  }

  return (
    <Select
      value={value}
      open={open}
      onOpenChange={onOpenChange}
      defaultValue={value}
      onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Select Category</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
