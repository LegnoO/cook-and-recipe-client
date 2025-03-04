"use client";

// ** React Imports
import { useState, useEffect, Fragment } from "react";

// ** Next Imports
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ** Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ButtonDeleteRecipe from "@/components/ButtonDeleteRecipe";
import Pagination from "@/components/Pagination";
import ButtonToggleStatus from "./ButtonToggleStatus";
import ButtonVerifyRecipe from "./ButtonVerifyRecipe";
import Loading from "@/app/(management)/_components/Loading";

// ** Icons
import { Star, Eye, MoreHorizontal, Edit } from "lucide-react";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getAllRecipesOwned } from "@/services/client/recipeService";

// ** Utils
import { cn } from "@/utils";

const RecipeList = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [paginate, setPaginate] = useState<Pagination | null>(null);

  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("index") || "1";
  const pageSize = searchParams.get("size") || "6";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";

  function queryParams() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", pageIndex);
    params.set("size", pageSize);
    params.set("sortOrder", sortOrder);
    params.set("sortBy", sortBy);

    return params.toString();
  }

  const {
    data: recipeResponse,
    isLoading: queryLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-recipe-owned", queryParams()],
    queryFn: () => getAllRecipesOwned(queryParams()),
    ...queryOptionsConfig,
  });

  function handleOpenDropdown(open: boolean, dropdownId: string) {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownId]: open,
    }));
  }

  useEffect(() => {
    if (recipeResponse) {
      setRecipes(recipeResponse.data);
      setPaginate(recipeResponse.paginate);
    }
  }, [recipeResponse]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="min-h-[340px] min-w-[1200px]">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Time (min)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verify Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queryLoading && (
              <TableRow>
                <TableCell className="text-center" colSpan={99}>
                  <Loading />
                </TableCell>
              </TableRow>
            )}
            {!recipes && !queryLoading && (
              <TableRow>
                <TableCell className="text-center" colSpan={99}>
                  No Data
                </TableCell>
              </TableRow>
            )}
            {recipes && recipes.length > 0 && (
              <Fragment>
                {recipes?.map((recipe) => (
                  <TableRow key={recipe.id}>
                    <TableCell>
                      <div className="relative h-20 w-20">
                        <Image
                          src={recipe.imageUrls[0] || "/images/default.png"}
                          alt={recipe.name}
                          width={64}
                          height={64}
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{recipe.name}</TableCell>
                    <TableCell>{recipe.category.name}</TableCell>
                    <TableCell>{recipe.difficulty}</TableCell>
                    <TableCell>{recipe.timeToCook}</TableCell>
                    <TableCell>
                      <p
                        className={cn(
                          "rounded-2xl px-2 py-1.5 text-center text-sm font-medium leading-none",
                          {
                            "bg-primary": recipe.status,
                            "bg-muted-foreground": !recipe.status,
                          },
                        )}>
                        {recipe.status ? (
                          <span className="text-primary-foreground">
                            Public
                          </span>
                        ) : (
                          <span className="text-background">Private</span>
                        )}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p
                        className={cn(
                          "rounded-2xl px-2 py-1.5 text-center text-sm font-medium leading-none",
                          {
                            "bg-grey-500": recipe.verifyStatus === "rejected",
                            "bg-green-500": recipe.verifyStatus === "verified",
                            "bg-red-500": recipe.verifyStatus === "unverified",
                            "bg-yellow-500": recipe.verifyStatus === "pending",
                          },
                        )}>
                        <span className="text-background">
                          {recipe.verifyStatus}
                        </span>
                      </p>
                    </TableCell>
                    <TableCell>
                      {format(new Date(recipe.createdDate), "MMMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{recipe.viewCount}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{recipe.feedbackCount}</p>
                    </TableCell>
                    <TableCell>
                      <p className="flex items-center gap-1 text-sm">
                        <span>{recipe.rating || 0}</span>
                        <span>
                          <Star className="h-4 w-4 select-none fill-primary stroke-primary" />
                        </span>
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu
                        open={openDropdown[recipe.id]}
                        onOpenChange={(open) =>
                          handleOpenDropdown(open, recipe.id)
                        }>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal className="h-5 w-5 cursor-pointer text-muted-foreground" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="center">
                          <Link href={`/recipes/manage/${recipe.id}`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                          </Link>

                          <DropdownMenuSeparator />

                          <Link href={`/recipes/manage/${recipe.id}/edit`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>

                          <DropdownMenuSeparator />

                          {["unverified", "rejected"].includes(
                            recipe.verifyStatus,
                          ) && (
                            <Fragment>
                              <DropdownMenuItem
                                onSelect={(event) => event.preventDefault()}
                                className="cursor-pointer">
                                <ButtonVerifyRecipe
                                  recipeId={recipe.id}
                                  refetch={refetch}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </Fragment>
                          )}

                          {recipe.verifyStatus === "verified" && (
                            <Fragment>
                              <DropdownMenuItem
                                onSelect={(event) => event.preventDefault()}
                                className="cursor-pointer">
                                <ButtonToggleStatus
                                  status={recipe.status}
                                  recipeId={recipe.id}
                                  refetch={refetch}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </Fragment>
                          )}

                          <DropdownMenuItem
                            onSelect={(event) => event.preventDefault()}
                            className="cursor-pointer">
                            <ButtonDeleteRecipe
                              recipeId={recipe.id}
                              refetch={refetch}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-24">
        <Pagination
          currentPage={Number(pageIndex)}
          totalPages={paginate?.total || 1}
        />
      </div>
    </div>
  );
};

export default RecipeList;
