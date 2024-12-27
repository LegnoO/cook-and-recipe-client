"use client";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import StatusAction from "./StatusAction";

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
} from "lucide-react";

// ** Services
// import { requestVerifyRecipe } from "@/services/recipeServer";

// ** Lib

// ** Types
type Props = {
  recipe: Recipe;
  refetch: () => void;
};
const OwnRecipeCard = ({ recipe }: Props) => {
  const infoContact = [
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

  // async function togglePublish(id: string) {
  //   await requestVerifyRecipe(id);
  //   refetch();
  // }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[1/0.65] w-full">
          <Image
            className="object-cover"
            fill
            src={
              recipe.imageUrls[0] ||
              "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg"
            }
            alt="card"
          />
        </div>
      </CardHeader>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="mb-1 text-sm font-medium text-primary">Beverages</p>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>
        <h3 className="mb-2 line-clamp-1 text-xl font-semibold">
          {recipe.name}
        </h3>
        <p className="mb-4 line-clamp-2 h-10 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <div className="flex flex-wrap justify-between gap-2">
          {infoContact.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-sm text-muted-foreground">
              {item.icon}
              {item.value}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <StatusAction
            verifyStatus={recipe.verifyStatus}
            status={recipe.status}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/recipes/${recipe.id}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={`/recipes/${recipe.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

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
