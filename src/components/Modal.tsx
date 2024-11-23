"use client";

// ** React Imports
import { ReactNode } from "react";

// ** Library Imports
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "nextjs-toploader/app";

// ** Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

// ** Types
type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  function handleOpenChange() {
    router.back();
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle />
      </VisuallyHidden.Root>
      <DialogOverlay>
        <DialogContent
          aria-describedby={undefined}
          className="w-[calc(100%-2.5rem)] rounded-lg p-0 sm:max-w-[425px]">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
