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

const QueryRecipeOwn = () => {
  const [categories, setCategories] = useState<Category[]>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSelectOpen, setSelectOpen] = useState({
    name: false,
    category: false,
  });

  function getQueryValue(
    field: "sort" | "categoryId" | "verifyStatus" | "status",
  ) {
    if (field === "sort") {
      const sort = searchParams.get(field) || "name";
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return `${sort}_${sortOrder}`;
    }

    return searchParams.get(field) || "all";
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
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

  function handleQuery(
    value: string,
    field: "categoryId" | "sort" | "verifyStatus" | "status",
  ) {
    const params = new URLSearchParams(searchParams);

    if (value !== "all" && field !== "sort") {
      params.set(field, value);
    } else {
      params.delete(field);
    }

    if (field === "sort") {
      const [sortBy, sortOrder] = value.split("_");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
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
          defaultValue={searchParams.get("name") || ""}
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

        <Select
          value={getQueryValue("verifyStatus")}
          defaultValue={getQueryValue("verifyStatus")}
          onValueChange={(value) => handleQuery(value, "verifyStatus")}>
          <SelectTrigger>
            <SelectValue placeholder="Choose sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Select Verify Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={getQueryValue("status")}
          defaultValue={getQueryValue("status")}
          onValueChange={(value) => handleQuery(value, "status")}>
          <SelectTrigger>
            <SelectValue placeholder="Choose sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Select Status</SelectItem>
            <SelectItem value="true">Public</SelectItem>
            <SelectItem value="false">Private</SelectItem>
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
export default QueryRecipeOwn;
