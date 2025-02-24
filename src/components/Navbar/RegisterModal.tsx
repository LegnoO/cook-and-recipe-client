// ** React Imports
import { Fragment, ReactNode } from "react";

// ** Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Scroll } from "@/components/Scroll";
import RegisterForm from "../../app/(main)/register/_components/RegisterForm";

// ** Library Imports
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// ** Context
import { useIdContext } from "@/context/IdProvider";

export default function RegisterModal({ trigger }: { trigger: ReactNode }) {
  const { modalId, setId } = useIdContext();

  return (
    <Fragment>
      <div onClick={() => setId("register-modal")}>{trigger}</div>
      <Dialog
        open={modalId === "register-modal"}
        onOpenChange={(open) => setId(open ? "register-modal" : "")}>
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>
        <DialogOverlay>
          <DialogContent
            aria-describedby={undefined}
            className="w-[calc(100%-2.5rem)] rounded-lg p-0 sm:max-w-[425px]">
            <Scroll>
              <div className="max-h-[calc(100dvh-30px)]">
                <RegisterForm />
              </div>
            </Scroll>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </Fragment>
  );
}
