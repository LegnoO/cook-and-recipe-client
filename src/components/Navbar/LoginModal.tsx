"use client";

// ** React Imports
import { Fragment } from "react";

// ** Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Scroll } from "@/components/Scroll";
import { Button } from "../ui/button";
import LoginForm from "@/components/LoginForm";

// ** Library Imports
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// ** Context
import { useIdContext } from "@/context/IdProvider";

const LoginModal = () => {
  const { modalId, setId } = useIdContext();

  return (
    <Fragment>
      <Button
        onClick={() => setId("login-modal")}
        className="uppercase tracking-widest">
        Sign In
      </Button>
      <Dialog
        open={modalId === "login-modal"}
        onOpenChange={(open) => setId(open ? "login-modal" : "")}>
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>
        <DialogOverlay>
          <DialogContent
            aria-describedby={undefined}
            className="w-[calc(100%-2.5rem)] rounded-lg p-0 sm:max-w-[425px]">
            <Scroll>
              <div className="max-h-[calc(100dvh-30px)]">
                <LoginForm isModal={false} />
              </div>
            </Scroll>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </Fragment>
  );
};

export default LoginModal;
