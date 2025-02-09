"use client";

// ** React Imports
import { Fragment } from "react";

// ** Library Imports
import type { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

// ** Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// ** Icons
import { CalendarIcon } from "lucide-react";

// ** Utils
import { cn } from "@/utils";

// ** Types
type Props = {
  date: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
};

export function DateRangeCalendar({ date, onChange }: Props) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal sm:flex-1",
              !date && "text-muted-foreground",
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <Fragment>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </Fragment>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
