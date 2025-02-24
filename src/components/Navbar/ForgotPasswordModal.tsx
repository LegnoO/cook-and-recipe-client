"use client";

// ** React Imports
import { Fragment } from "react";

// ** Components
import { Scroll } from "@/components/Scroll";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import ForgotPasswordForm from "../ForgotPasswordForm";

// ** Library Imports
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// ** Context
import { useIdContext } from "@/context/IdProvider";

export default function ForgotPasswordModal() {
  const { modalId, setId } = useIdContext();

  return (
    <Fragment>
      <Dialog
        open={modalId === "forgot-password-modal"}
        onOpenChange={(open) => setId(open ? "forgot-password-modal" : "")}>
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>
        <DialogOverlay>
          <DialogContent
            aria-describedby={undefined}
            className="w-[calc(100%-2.5rem)] rounded-lg p-0 sm:max-w-[425px]">
            <Scroll>
              <div className="max-h-[calc(100dvh-30px)]">
                <ForgotPasswordForm />
              </div>
            </Scroll>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </Fragment>
  );
}
