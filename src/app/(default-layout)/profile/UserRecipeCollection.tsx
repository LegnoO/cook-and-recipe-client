"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaginationCustom from "@/components/PaginationCustom";
import RecipeCard from "@/components/RecipeCard";
import SearchInput from "@/components/SearchInput";

// ** Icons
import { Plus } from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getRecipeOwned } from "@/services/chefService";

const UserRecipeCollection = () => {
  const fake_data = [
    {
      name: "Vietnamese Pho",
      description:
        "A delicious and aromatic Vietnamese soup made with beef, fresh herbs, and rice noodles. Perfect for any occasion.",
      ingredients: [
        { name: "Beef bones", quantity: 500, measurement: "grams" },
        { name: "Beef brisket", quantity: 200, measurement: "grams" },
        { name: "Rice noodles", quantity: 200, measurement: "grams" },
        { name: "Onion", quantity: 1, measurement: "piece" },
        { name: "Ginger", quantity: 1, measurement: "piece" },
        { name: "Star anise", quantity: 3, measurement: "pieces" },
        { name: "Cloves", quantity: 5, measurement: "pieces" },
        { name: "Cinnamon stick", quantity: 1, measurement: "piece" },
        { name: "Fish sauce", quantity: 2, measurement: "tablespoons" },
        { name: "Salt", quantity: 1, measurement: "teaspoon" },
        { name: "Green onions", quantity: 2, measurement: "pieces" },
        { name: "Cilantro", quantity: 1, measurement: "bunch" },
        { name: "Bean sprouts", quantity: 100, measurement: "grams" },
        { name: "Basil leaves", quantity: 1, measurement: "bunch" },
        { name: "Chili peppers", quantity: 2, measurement: "pieces" },
        { name: "Lime", quantity: 1, measurement: "piece" },
      ],
      instructionSections: [
        {
          title: "Prepare the Broth",
          instructions: [
            {
              step: 1,
              description: "Rinse beef bones and brisket under cold water.",
            },
            {
              step: 2,
              description:
                "Add beef bones and brisket to a large pot, cover with water, and bring to a boil.",
            },
            {
              step: 3,
              description:
                "Skim off any impurities, then add onion, ginger, star anise, cloves, and cinnamon stick.",
            },
            {
              step: 4,
              description:
                "Simmer for 2-3 hours to develop a rich broth flavor.",
            },
            { step: 5, description: "Add fish sauce and salt to taste." },
          ],
        },
        {
          title: "Prepare the Noodles and Garnishes",
          instructions: [
            {
              step: 1,
              description:
                "Soak rice noodles in warm water for 10-15 minutes, then drain.",
            },
            {
              step: 2,
              description:
                "Blanch noodles in boiling water for 30 seconds, then transfer to bowls.",
            },
            {
              step: 3,
              description:
                "Slice green onions and cilantro, set aside along with bean sprouts, basil leaves, chili peppers, and lime.",
            },
          ],
        },
        {
          title: "Assemble the Pho",
          instructions: [
            {
              step: 1,
              description: "Place a portion of noodles in each serving bowl.",
            },
            {
              step: 2,
              description:
                "Add slices of brisket, then pour hot broth over the ingredients.",
            },
            {
              step: 3,
              description:
                "Garnish with green onions, cilantro, bean sprouts, basil, chili peppers, and a wedge of lime.",
            },
          ],
        },
      ],
      timeToCook: 180,
      difficulty: "Medium",
      serves: 4,
      images: ["", "", "", ""],
      category: "Soup",
    },
  ];

  const defaultQueryOptions: QueryOptions<{ name: string }> = {
    index: 1,
    size: 10,
    total: 1,
    name: "",
    sortBy: "name",
    sortOrder: "asc",
  };

  const [chefRecipe, setChefRecipe] = useState<Recipe[] | null>(null);

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

  if (!chefRecipe) {
    return null;
  }

  return (
    <Card className="flex h-full flex-col items-stretch border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>My recipes</CardTitle>
            <p className="text-sm text-muted-foreground">
              Dishes you have shared: {fake_data.length}
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create Recipe
          </Button>
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
        {chefRecipe.length === 0 && (
          <p className="mt-4 text-center text-muted-foreground">
            No matching recipes found.
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {chefRecipe.map((recipe, index) => (
            <Fragment key={index}>
              <RecipeCard recipe={recipe} />
            </Fragment>
          ))}
        </div>

        <PaginationCustom
          totalPages={queryOptions.total}
          currentPage={queryOptions.index}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
};
export default UserRecipeCollection;
