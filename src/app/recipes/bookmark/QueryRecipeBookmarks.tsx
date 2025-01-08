"use client";

// ** React Imports
import { useCallback, ChangeEvent } from "react";

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
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
import { useDebouncedCallback } from "use-debounce";

// ** Icons
import { Search } from "lucide-react";

const QueryRecipeBookmarks = () => {
  const chefLevel = ["Beginner", "Home cook", "Professional", "Master Chef"];
  const router = useRouter();
  const searchParams = useSearchParams();

  function getQueryValue(field: "sort" | "chefLevel") {
    if (field === "sort") {
      const sort = searchParams.get("sort") || "name";
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return `${sort}_${sortOrder}`;
    }

    if (field === "chefLevel") {
      return searchParams.get("chefLevel") || "all";
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

  function handleQuery(value: string, field: "chefLevel" | "sort") {
    const params = new URLSearchParams(searchParams);
    if (field === "sort") {
      const [sortBy, sortOrder] = value.split("_");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    if (field === "chefLevel") {
      params.set("chefLevel", value);
    }
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <section>
      <div>
        <h1 className="mb-6 text-4xl font-semibold">Bookmarked Recipes</h1>
        <div className="flex w-full items-center justify-between gap-4">
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
            {chefLevel && (
              <Select
                defaultValue={getQueryValue("chefLevel")}
                onValueChange={(value) => handleQuery(value, "chefLevel")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chef Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Chef Level</SelectItem>
                  {chefLevel.map((level, index) => (
                    <SelectItem key={index} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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
          </div>
        </div>
      </div>
    </section>
  );
};
export default QueryRecipeBookmarks;
