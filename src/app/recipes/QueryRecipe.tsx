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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
import { useDebouncedCallback } from "use-debounce";

// ** Icons
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// ** Services
import { getCategories } from "@/services/client/recipeService";

const QueryRecipe = () => {
  const [categories, setCategories] = useState<Category[]>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState({
    name: false,
    category: false,
  });

  function getQueryValue(field: "sort" | "category") {
    if (field === "sort") {
      const sort = searchParams.get("sort") || "name";
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return `${sort}_${sortOrder}`;
    }

    if (field === "category") {
      return searchParams.get("category") || "all";
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

  function handleQuery(value: string, field: "category" | "sort") {
    const params = new URLSearchParams(searchParams);
    if (field === "sort") {
      const [sortBy, sortOrder] = value.split("_");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    if (field === "category") {
      params.set("category", value);
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
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => {
          if (open) {
            setPopoverOpen(open);
          } else {
            if (!isSelectOpen.name && !isSelectOpen.category) {
              setPopoverOpen(false);
            }
          }
        }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full active:scale-100 md:w-auto">
            <SlidersHorizontal className="mr-1 h-4 w-4" />
            Filter
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Sort by</h4>
              <Select
                open={isSelectOpen.name}
                onOpenChange={(open) => {
                  handleToggleSelect(open, "name");
                }}
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
            </div>
            {categories && (
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Category</h4>
                <Select
                  value={getQueryValue("category")}
                  open={isSelectOpen.category}
                  onOpenChange={(open) => {
                    handleToggleSelect(open, "category");
                  }}
                  defaultValue={getQueryValue("category")}
                  onValueChange={(value) => handleQuery(value, "category")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default QueryRecipe;
