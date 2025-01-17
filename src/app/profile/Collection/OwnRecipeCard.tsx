"use client";

// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// ** Icons
import {
  Star,
  Users,
  GaugeCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
  Loader2,
} from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import {
  requestVerifyRecipe,
  toggleRecipeBookmark,
} from "@/services/client/recipeService";
import Rating from "@/components/Rating";

// ** Types
type Props = {
  recipe: Recipe;
  refetch: () => void;
};

const OwnRecipeCard = ({ refetch, recipe }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: <Clock className="h-4 w-4" />,
      value: <span>{recipe.timeToCook} mins</span>,
    },
    {
      icon: <Users className="h-4 w-4" />,
      value: <span>Serves: {recipe.serves}</span>,
    },
    {
      icon: <GaugeCircle className="h-4 w-4" />,
      value: <span>Difficulty: {recipe.difficulty}</span>,
    },
  ];

  async function togglePublish() {
    try {
      setIsLoading(true);
      // await requestVerifyRecipe(recipe.id);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative aspect-[1/0.65] p-0">
        <Image
          className="object-cover"
          fill
          src={
            recipe.imageUrls[0] ||
            "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg"
          }
          alt="card"
        />
      </CardHeader>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="mb-1 text-sm font-medium text-primary">Beverages</p>
          <Rating disableSelect defaultValue={recipe.rating} readOnly />
        </div>
        <h3 className="mb-2 line-clamp-1 text-xl font-semibold">
          {recipe.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <div className="flex flex-wrap gap-4.5">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-sm text-muted-foreground">
              {item.icon}
              {item.value}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              disabled={isLoading}
              checked={recipe.status}
              onCheckedChange={togglePublish}
            />
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Label>{recipe.status ? "Public" : "Private"}</Label>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="h-5 w-5 cursor-pointer text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/recipes/manage/${recipe.id}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {recipe.status && (
                <Fragment>
                  <Link href={`/recipes/${recipe.id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                </Fragment>
              )}
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2 text-destructive">
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default OwnRecipeCard;
