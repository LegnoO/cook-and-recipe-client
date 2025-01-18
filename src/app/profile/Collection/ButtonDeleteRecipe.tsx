"use client";

// ** React Imports
import { useState } from "react";

// ** Component
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Icons
import { Trash } from "lucide-react";

// ** Services
import { deleteRecipe } from "@/services/client/recipeService";

// ** Types
type Props = {
  recipeId: string;
  refetch: () => void;
};

const ButtonDeleteRecipe = ({ recipeId, refetch }: Props) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);

  async function handleDeleteRecipe() {
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });

    try {
      await deleteRecipe(recipeId);
      toast({
        title: "Success!",
        description: "Your recipe has been deleted.",
        variant: "successful",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
      });
    } finally {
      closeDialog();
    }
  }

  function closeDialog() {
    setOpenDialog(false);
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>
        <div className="flex items-center gap-2 text-destructive">
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteRecipe}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonDeleteRecipe;
