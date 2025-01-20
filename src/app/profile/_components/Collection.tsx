"use client";

// ** React Imports
import { useState, useEffect, ChangeEvent, Fragment } from "react";

// ** Next Imports
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import OwnRecipeCard from "./OwnRecipeCard";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import Repeat from "@/components/Repeat";

// ** Icons
import { Plus } from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getVerifiedRecipes } from "@/services/client/recipeService";

const UserRecipeCollection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("index") || "1";
  const pageSize = searchParams.get("size") || "4";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";

  const [chefRecipe, setChefRecipe] = useState<Recipe[] | null>(null);
  const [paginate, setPaginate] = useState<Pagination | null>(null);

  console.log("🚀 ~ UserRecipeCollection ~ chefRecipe:", chefRecipe);

  const {
    data: recipeData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipe-collection", searchParams.toString()],
    queryFn: () => getVerifiedRecipes(queryParams()),
    ...queryOptionsConfig,
  });

  function queryParams() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", pageIndex);
    params.set("size", pageSize);
    params.set("sortOrder", sortOrder);
    params.set("sortBy", "name");
    params.set("verifyStatus", "verified");

    return params.toString();
  }

  function handleSort(value: string) {
    const [sortBy, sortOrder] = value.split("_");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.push(`?${params.toString()}`);
  }

  const onSearchRecipe = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("name", value);
      } else {
        params.delete("name");
      }

      router.push(`?${params.toString()}`, {
        scroll: false,
      });
    },
    300,
  );

  useEffect(() => {
    if (recipeData) {
      setChefRecipe(recipeData.data);
      setPaginate(recipeData.paginate);
    }
  }, [recipeData]);

  const OwnRecipeCardSkeleton = () => {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="relative aspect-[1/0.65] p-0">
          <Skeleton className="h-full w-full rounded-xl" />
        </CardHeader>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-8" />
          </div>

          <Skeleton className="mb-2 h-4 w-[150px]" />

          <Skeleton className="mb-4 h-4 w-[250px]" />

          <div className="flex flex-wrap gap-4">
            <Repeat times={3}>
              <Skeleton className="h-4 w-16" />
            </Repeat>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </Card>
    );
  };

  const CollectionSkeleton = () => {
    return (
      <Card className="flex h-full flex-col items-stretch border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>

            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
          <div className="flex w-full gap-4 pt-3">
            <Skeleton className="h-9 w-full rounded-md" />

            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6">
          <div className="grid-cols-2-res grid gap-8">
            <Repeat times={2}>
              <OwnRecipeCardSkeleton />
            </Repeat>
          </div>
        </CardContent>
      </Card>
    );
  };

  if ((!chefRecipe && isLoading) || !chefRecipe) {
    return <CollectionSkeleton />;
  }

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
            defaultValue={searchParams.get("name") || ""}
            onSearch={onSearchRecipe}
            placeholder="Search recipes..."
          />

          <Select value={`${sortBy}_${sortOrder}`} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name_asc">Name (A-Z)</SelectItem>
              <SelectItem value="name_desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6">
        <Fragment>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {chefRecipe.length > 0 &&
              chefRecipe?.map((recipe, index) => (
                <OwnRecipeCard refetch={refetch} recipe={recipe} key={index} />
              ))}
          </div>
          {chefRecipe.length <= 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="mt-4 w-full text-center text-muted-foreground">
                No matching recipes found.
              </p>
            </div>
          )}
        </Fragment>
      </CardContent>

      <CardFooter className="mt-8">
        <Pagination
          totalPages={paginate?.total || 1}
          currentPage={Number(pageIndex)}
        />
      </CardFooter>
    </Card>
  );
};
export default UserRecipeCollection;
