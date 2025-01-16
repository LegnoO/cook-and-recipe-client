"use client";

// ** React Imports
import { useState, useEffect, useCallback } from "react";

// ** Next Imports
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// ** Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Icons
import { Star, Trash2, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getOwnRecipes } from "@/services/server/recipeService";

const ListTable = () => {
  const [chefRecipe, setChefRecipe] = useState<Recipe[] | null>(null);
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("index") || "1";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";
  const queryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", pageIndex);
    params.set("size", searchParams.get("size") || "4");
    params.set("sortOrder", sortOrder);
    params.set("sortBy", "name");

    return params.toString();
  }, [searchParams]);

  const {
    data: recipeResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipe-owned", searchParams.toString()],
    queryFn: () => getOwnRecipes(queryParams()),
    ...queryOptionsConfig,
  });

  useEffect(() => {
    if (recipeResponse) {
      setChefRecipe(recipeResponse.data);
    }
  }, [recipeResponse]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Recipe Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((item) => (
            <TableRow key={item}>
              <TableCell>
                <div className="relative h-16 w-16">
                  {/* <Image
                  src="/placeholder.svg"
                  alt="Vietnamese Pho"
                  fill
                  className="rounded-md object-cover"
                /> */}
                </div>
              </TableCell>
              <TableCell className="font-medium">Vietnamese Pho</TableCell>
              <TableCell>Main dished</TableCell>
              <TableCell>
                <Rating disableSelect defaultValue={0} readOnly />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" title="View Recipe">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Share Recipe">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    title="Remove from Wishlist">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListTable;
