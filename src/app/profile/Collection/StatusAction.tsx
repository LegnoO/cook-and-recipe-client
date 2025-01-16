// ** React Imports
import { useState } from "react";

// ** Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ** Types
type Props = {
  verifyStatus: RecipeVerifyStatusEnum;
  status: boolean;
  recipeId: string;
  togglePublish: () => Promise<void>;
};

const StatusAction = ({
  recipeId,
  status,
  verifyStatus,
  togglePublish,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  // const renderStatus = () => {
  //   switch (verifyStatus) {
  //     case "verified":
  //       return (
  //         <div className="flex items-center gap-2">
  //           <Switch
  //             checked={status}
  //             // onCheckedChange={() => togglePublish(recipeId)}
  //           />
  //           <Label>{status ? "Public" : "Private"}</Label>
  //         </div>
  //       );
  //     case "pending":
  //       return (
  //         <Label className="text-nowrap text-muted-foreground">
  //           Waiting for verification
  //         </Label>
  //       );
  //     default:
  //       return (
  //         <div
  //           onClick={togglePublish}
  //           className="h-9 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80">
  //           Request Verify Recipe
  //         </div>
  //       );
  //   }
  // };

  const renderDialogContent = () => {
    if (!status) {
      if (verifyStatus === "unverified") {
        return "You'll receive a notification once the admin has reviewed your recipe.";
      }
      if (verifyStatus === "verified") {
        return "Your recipe will be visible to everyone in the community.";
      }
    }

    return "Your recipe will only be visible to you.";
  };

  function closeDialog() {
    setOpenDialog(false);
  }

  function handleSubmit() {
    try {
    } catch {
    } finally {
      closeDialog();
    }
  }

  return (
    // <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    //   <DialogTrigger>

    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Change Recipe Visibility</DialogTitle>
    //       <DialogDescription>{renderDialogContent()}</DialogDescription>
    //     </DialogHeader>
    //     <DialogFooter>
    //       <Button variant="secondary" onClick={closeDialog}>
    //         Cancel
    //       </Button>
    //       <Button onClick={handleSubmit}>Confirm</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
   
  );
};

export default StatusAction;
