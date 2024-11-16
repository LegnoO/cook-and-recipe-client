"use client";

// ** React Imports
import { ReactNode } from "react";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Components
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

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
      <DialogOverlay>
        <DialogContent className="p-0 w-[calc(100%-2.5rem)] rounded-lg sm:max-w-[425px]">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
