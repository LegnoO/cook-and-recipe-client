"use client";

// ** React Imports
import { Fragment } from "react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Icons
import { Globe, Lock } from "lucide-react";

// ** Services
import { privateRecipe, publicRecipe } from "@/services/client/recipeService";

// ** Types
type Props = {
  status: boolean;
  recipeId: string;
  refetch: () => void;
};

const ButtonToggleStatus = ({ refetch, status, recipeId }: Props) => {
  const { toast } = useToast();

  async function handleTogglePublish() {
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });
    try {
      if (status) {
        await privateRecipe(recipeId);
      } else {
        await publicRecipe(recipeId);
      }

      refetch();
      toast({
        title: "Success!",
        description: "Your recipe has been updated successfully.",
        variant: "successful",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
      });
    }
  }
  return (
    <div onClick={handleTogglePublish} className="flex items-center gap-2">
      {status ? (
        <Fragment>
          <Lock className="h-4 w-4" />
          <span>Private Recipe</span>
        </Fragment>
      ) : (
        <Fragment>
          <Globe className="h-4 w-4" />
          <span>Public Recipe</span>
        </Fragment>
      )}
    </div>
  );
};

export default ButtonToggleStatus;
