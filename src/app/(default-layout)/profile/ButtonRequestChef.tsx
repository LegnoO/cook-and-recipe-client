"use client";

// ** React Imports
import { Fragment, useState } from "react";

// ** Component
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ** Icons
import { Loader2, CalendarIcon } from "lucide-react";

// ** Library Imports
import { format } from "date-fns";

// ** Services
import { requestBecomeChef } from "@/services/chefService";

// ** Lib
import { cn } from "@/lib/utils";

// ** Types
type Props = {};

const ButtonRequestChef = ({}: Props) => {
  const id = "select-level-chef";
  const experienceLevels = [
    "Beginner",
    "Home cook",
    "Professional",
    "Master chef",
  ];
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    level: experienceLevels[0],
    description: "",
  });

  function handleFormChange(value: string, field: "level" | "description") {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit() {
    try {
      setLoading(true);
      await requestBecomeChef(formData);
      setDialogOpen(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setTimeout(() => (document.body.style.pointerEvents = "auto"), 0);
      }}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Request to become a Chef
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Fragment>
          <DialogHeader>
            <DialogTitle className="tracking-unset leading-7">
              Request to become a Chef
            </DialogTitle>
            <DialogDescription className="!mt-2">
              Please provide some information about your cooking experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={id}>Experience Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => {
                  handleFormChange(value, "level");
                }}>
                <SelectTrigger className="w-full" id={id}>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level, index) => (
                    <SelectItem key={index} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startDate">Desired Promotion Date</Label>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      {
                        "text-muted-foreground": !startDate,
                      },
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Tell us about your cooking experience
              </Label>
              <Textarea
                id="description"
                placeholder="Share your cooking journey, specialties, or any relevant experience..."
                value={formData.description}
                onChange={(event) =>
                  handleFormChange(event.target.value, "description")
                }
                className="h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary">Cancel</Button>
            <Button disabled={isLoading} onClick={onSubmit}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </DialogFooter>
        </Fragment>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonRequestChef;
