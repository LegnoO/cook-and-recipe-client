"use client";

// ** React Imports
import { forwardRef } from "react";

// ** Components
import { Button } from "./ui/button";

// ** Library Imports
import { format } from "date-fns";

// ** Icons
import { CalendarIcon } from "lucide-react";

// ** Lib
import { cn } from "@/utils";

// ** Types
type Props = {
  value: Date | null;
};

const CalendarButton = forwardRef<HTMLButtonElement, Props>(
  ({ value }, ref) => {
    return (
      <Button
        type="button"
        ref={ref}
        variant="outline"
        className={cn("w-full pl-3 text-left font-normal active:scale-100", {
          "text-muted-foreground": !value,
        })}>
        {value ? format(value, "PPP") : "Pick a date"}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    );
  },
);

CalendarButton.displayName = "CalendarButton";

export default CalendarButton;
