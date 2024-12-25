"use client";

// ** React Imports
import { Fragment } from "react";

// ** Lib
import { cn } from "@/lib/utils";

// ** Types
type Props = {
  currentStep: number;
  maxStep: number;
};

const Stepper = ({ currentStep = 0, maxStep }: Props) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxStep }, (_, index) => {
        const step = index + 1;
        const isActive = currentStep >= step;
        return (
          <Fragment key={step}>
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 transition-colors duration-500",
                {
                  "bg-primary": isActive,
                },
              )}>
              <span
                className={cn("font-medium text-foreground", {
                  "text-background": isActive,
                })}>
                {step}
              </span>
            </div>
            {step < maxStep && (
              <div className="h-1 flex-1 rounded-full bg-gray-200">
                <div
                  className={cn(
                    "h-full w-0 bg-primary transition-width duration-500",
                    {
                      "w-full": currentStep > step,
                    },
                  )}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
