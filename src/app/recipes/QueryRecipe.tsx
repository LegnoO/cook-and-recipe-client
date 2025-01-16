"use client";

// ** React Imports
import { useState, useCallback, ChangeEvent, useEffect } from "react";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
import { useDebouncedCallback } from "use-debounce";

// ** Icons
import { Search } from "lucide-react";

// ** Services
import { getCategories } from "@/services/client/recipeService";

const QueryRecipe = () => {
  const [categories, setCategories] = useState<Category[]>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSelectOpen, setSelectOpen] = useState({
    name: false,
    category: false,
  });

  function getQueryValue(field: "sort" | "categoryId") {
    if (field === "sort") {
      const sort = searchParams.get("sort") || "name";
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return `${sort}_${sortOrder}`;
    }

    if (field === "categoryId") {
      return searchParams.get("categoryId") || "all";
    }
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  const onSearchRecipe = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  function handleToggleSelect(value: boolean, field: "name" | "category") {
    setSelectOpen((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleQuery(value: string, field: "categoryId" | "sort") {
    const params = new URLSearchParams(searchParams);
    if (field === "sort") {
      const [sortBy, sortOrder] = value.split("_");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    if (field === "categoryId") {
      if (value === "all") {
        params.delete("categoryId");
      } else {
        params.set("categoryId", value);
      }
    }
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      if (categories) setCategories(categories);
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          onChange={onSearchRecipe}
          defaultValue={searchParams.get("search") || ""}
          type="search"
          className="max-w-3xl pl-8"
        />
      </div>
      <div className="flex items-center gap-4">
        <Select
          value={getQueryValue("sort")}
          defaultValue={getQueryValue("sort")}
          onValueChange={(value) => handleQuery(value, "sort")}>
          <SelectTrigger>
            <SelectValue placeholder="Choose sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">Alphabetical (A-Z)</SelectItem>
            <SelectItem value="name_desc">Alphabetical (Z-A)</SelectItem>
            <SelectItem value="date_desc">Newest</SelectItem>
            <SelectItem value="date_asc">Oldest</SelectItem>
          </SelectContent>
        </Select>

        {categories && (
          <Select
            value={getQueryValue("categoryId")}
            open={isSelectOpen.category}
            onOpenChange={(open) => {
              handleToggleSelect(open, "category");
            }}
            defaultValue={getQueryValue("categoryId")}
            onValueChange={(value) => handleQuery(value, "categoryId")}>
            <SelectTrigger>
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
        )}
      </div>
    </div>
  );
};
export default QueryRecipe;
