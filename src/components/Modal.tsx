"use client";

// ** React Imports
import { useState, useEffect, useRef, ReactNode } from "react";

// ** Next Imports
import { usePathname } from "next/navigation";

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
  const initialRender = useRef(true);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  function handleOpenChange() {
    setOpen(false);
    router.back();
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setOpen(false);
    }
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
