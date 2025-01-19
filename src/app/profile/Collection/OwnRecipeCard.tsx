"use client";

// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Rating from "@/components/Rating";
import ButtonDeleteRecipe from "@/components/ButtonDeleteRecipe";

// ** Icons
import {
  Users,
  GaugeCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Pencil,
  Loader2,
} from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { privateRecipe, publicRecipe } from "@/services/client/recipeService";

// ** Types
type Props = {
  recipe: Recipe;
  refetch: () => void;
};

const OwnRecipeCard = ({ refetch, recipe }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});

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

  function handleOpenDropdown(open: boolean, dropdownId: string) {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownId]: open,
    }));
  }

  async function handleTogglePublish() {
    try {
      setIsLoading(true);
      if (recipe.status) {
        await privateRecipe(recipe.id);
      } else {
        await publicRecipe(recipe.id);
      }

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
              onCheckedChange={handleTogglePublish}
            />
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Label>{recipe.status ? "Public" : "Private"}</Label>
            )}
          </div>
          <DropdownMenu
            open={openDropdown[recipe.id]}
            onOpenChange={(open) => handleOpenDropdown(open, recipe.id)}>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="h-5 w-5 cursor-pointer text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Fragment>
                <Link href={`/recipes/manage/${recipe.id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
                </Link>
              </Fragment>

              <DropdownMenuSeparator />

              <Link href={`/recipes/manage/${recipe.id}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="cursor-pointer">
                <ButtonDeleteRecipe recipeId={recipe.id} refetch={refetch} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default OwnRecipeCard;
