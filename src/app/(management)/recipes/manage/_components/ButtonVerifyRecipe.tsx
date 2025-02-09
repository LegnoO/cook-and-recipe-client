"use client";

// ** React Imports
import { useState } from "react";

// ** Component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Icons
import { ShieldCheck } from "lucide-react";

// ** Services
import { requestVerifyRecipe } from "@/services/client/recipeService";

// ** Types
type Props = {
  recipeId: string;
  refetch: () => void;
};

const ButtonVerifyRecipe = ({ recipeId, refetch }: Props) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);

  async function handleVerifyRecipe() {
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });

    try {
      await requestVerifyRecipe(recipeId);
      toast({
        title: "Success!",
        description: "Your request has been sent.",
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Request Verification</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Recipe Verification</DialogTitle>
          <DialogDescription>
            Are you sure you want to submit this recipe for verification? Our
            admin team will review your recipe to ensure it meets our quality
            standards.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleVerifyRecipe}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonVerifyRecipe;
