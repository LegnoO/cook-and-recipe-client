"use client";

// ** React Imports
import { useState, useEffect, ChangeEvent } from "react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/SearchInput";
import Repeat from "@/components/Repeat";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getRecipeOwned } from "@/services/chefService";
import PaginationCustom from "@/components/PaginationCustom";
import RecipeCard from "@/components/RecipeCard";

const RecipeCollection = () => {
  const defaultQueryOptions: QueryOptions<{ name: string }> = {
    index: 1,
    size: 1,
    total: 1,
    name: "",
    sortBy: "name",
    sortOrder: "asc",
  };
  const [chefRecipe, setChefRecipe] = useState<Recipe[] | null>(null);
  console.log("🚀 ~ RecipeCollection ~ chefRecipe:", chefRecipe);
  const [queryOptions, setQueryOptions] =
    useState<QueryOptions<{ name: string }>>(defaultQueryOptions);

  const { data: recipe, isLoading } = useQuery({
    queryKey: [
      "chef-recipe",
      queryOptions.index,
      queryOptions.name,
      queryOptions.sortBy,
      queryOptions.sortOrder,
    ],
    queryFn: () => getRecipeOwned<{ name: string }>(queryOptions),
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
    if (recipe) {
      setChefRecipe(recipe.data);
      setQueryOptions((prev) => ({ ...prev, ...recipe.paginate }));
    }
  }, [recipe]);

  return (
    <Card className="border-none shadow-md md:col-span-2">
      <CardHeader>
        <CardTitle>My recipes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Các món ăn bạn đã chia sẻ 15
        </p>
        <div className="flex w-full gap-4 pt-3">
          <SearchInput
            onSearch={onSearchRecipe}
            placeholder="Search recipes..."
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
      <CardContent className="h-full px-4 pb-4">
        {/* {recipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardContent className="flex items-center space-x-4 pt-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={recipe.image} alt={recipe.title} />
                  <AvatarFallback>
                    {recipe.title.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookingTime} phút</span>
                    <Users className="ml-2 h-4 w-4" />
                    <span>{recipe.servings} người</span>
                  </div>
                  <Badge
                    variant={
                      recipe.difficulty === "easy"
                        ? "secondary"
                        : "default"
                    }
                    className="mt-2">
                    {recipe.difficulty === "easy"
                      ? "Dễ"
                      : recipe.difficulty === "medium"
                        ? "Vừa"
                        : "Khó"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))} */}

        <div className="grid gap-4 sm:grid-cols-2">
          <Repeat times={4}>
            <RecipeCard />
          </Repeat>
        </div>
        {false && (
          <p className="mt-4 text-center text-muted-foreground">
            Không tìm thấy công thức nào phù hợp.
          </p>
        )}
        <div className="mt-6">
          <PaginationCustom
            totalPages={queryOptions.total}
            currentPage={queryOptions.index}
            onPageChange={onPageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default RecipeCollection;
