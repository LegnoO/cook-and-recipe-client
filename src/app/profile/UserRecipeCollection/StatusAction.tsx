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
};

const StatusAction = ({ status, verifyStatus }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const renderStatus = () => {
    switch (verifyStatus) {
      case "verified":
        return (
          <Switch
            checked={status}
            // onCheckedChange={() => togglePublish(recipe.id)}
          />
        );
      case "pending":
        return (
          <Label className="text-nowrap text-muted-foreground">
            Waiting for verification
          </Label>
        );
      default:
        return (
          <div className="h-9 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80">
            Request Verify Recipe
          </div>
        );
    }
  };

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

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div className="flex flex-1 items-center justify-center space-x-2">
          {renderStatus()}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Recipe Visibility</DialogTitle>
          <DialogDescription>{renderDialogContent()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button onClick={closeDialog}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusAction;
