"use client";

// ** Next Imports
import Link from "next/link";

// ** React Imports
import { useState, useEffect, ChangeEvent, Fragment } from "react";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

// ** Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OwnRecipeCard from "./OwnRecipeCard";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";
import PaginationClient from "@/components/Pagination/PaginationClient";
// import BookMarkButton from "@/components/BookMarkButton";

// ** Icons
import { Plus, Loader2 } from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getRecipeOwned } from "@/services/chefService";

const UserRecipeCollection = () => {
  const defaultQueryOptions: QueryOptions<{ name: string }> = {
    index: 1,
    size: 4,
    total: 1,
    name: "",
    sortBy: "name",
    sortOrder: "asc",
  };

  const [chefRecipe, setChefRecipe] = useState<Recipe[] | null>(null);

  const [queryOptions, setQueryOptions] =
    useState<QueryOptions<{ name: string }>>(defaultQueryOptions);

  const {
    data: recipeData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "chef-recipe",
      queryOptions.index,
      queryOptions.name,
      queryOptions.sortBy,
      queryOptions.sortOrder,
    ],
    queryFn: () => getRecipeOwned(queryOptions),
    ...queryOptionsConfig,
  });

  function onPageChange(page: number) {
    setQueryOptions((prev) => ({
      ...prev,
      index: prev.index !== page ? page : prev.index,
    }));
  }

  function handleSort(value: string) {
    const [sortBy, sortOrder] = value.split("-") as [string, SortOrder];
    setQueryOptions((prev) => ({ ...prev, sortBy, sortOrder }));
  }

  const onSearchRecipe = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQueryOptions((prev) => ({
        ...prev,
        name: event.target.value,
      }));
    },
    300,
  );

  useEffect(() => {
    if (recipeData) {
      setChefRecipe(recipeData.data);
      setQueryOptions((prev) => ({ ...prev, ...recipeData.paginate }));
    }
  }, [recipeData]);

  return (
    <Card className="flex h-full flex-col items-stretch border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>My recipes</CardTitle>
            <p className="text-sm text-muted-foreground">
              Dishes you have shared: {chefRecipe?.length || 0}
            </p>
          </div>
          <Link href="/recipes/create">
            <Button>
              <Plus className="h-4 w-4" />
              Create Recipe
            </Button>
          </Link>
        </div>
        <div className="flex w-full gap-4 pt-3">
          <SearchInput
            onSearch={onSearchRecipe}
            placeholder="Search recipes..."
            isLoading={isLoading}
          />

          <Select
            value={`${queryOptions.sortBy}-${queryOptions.sortOrder}`}
            onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="series-asc">Series (A-Z)</SelectItem>
              <SelectItem value="series-desc">Series (Z-A)</SelectItem>
              <SelectItem value="difficulty-asc">
                Difficulty (Low to High)
              </SelectItem>
              <SelectItem value="difficulty-desc">
                Difficulty (High to Low)
              </SelectItem>
              <SelectItem value="cookingTime-asc">
                Cooking Time (Short to Long)
              </SelectItem>
              <SelectItem value="cookingTime-desc">
                Cooking Time (Long to Short)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6">
        {chefRecipe ? (
          <Fragment>
            {chefRecipe.length === 0 && (
              <p className="mt-4 text-center text-muted-foreground">
                No matching recipes found.
              </p>
            )}
            <div className="grid grid-cols-2 gap-8">
              {chefRecipe.map((recipe, index) => (
                <OwnRecipeCard recipe={recipe} refetch={refetch} key={index} />
              ))}
            </div>
          </Fragment>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-8">
        <PaginationClient
          totalPages={queryOptions.total}
          currentPage={queryOptions.index}
          onPageChange={onPageChange}
        />
      </CardFooter>
    </Card>
  );
};
export default UserRecipeCollection;
