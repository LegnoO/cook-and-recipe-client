"use client";

// ** React Imports
import { useState } from "react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import CalendarButton from "@/components/CalendarButton";
import LoadingButton from "@/components/LoadingButton";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
// import { requestBecomeChef } from "@/services/chefService";

// ** Lib
import { Scroll } from "@/components/Scroll";

// ** Schema
const formSchema = z.object({
  level: z.enum(["Beginner", "Home cook", "Professional", "Master chef"]),
  startedDate: z
    .date({
      required_error: "Date of birth is required.",
    })
    .min(new Date(), { message: "Date cannot be in the past." }),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ButtonRequestChef = () => {
  const { toast } = useToast();
  const id = "select-level-chef";
  const experienceLevels: FormValues["level"][] = [
    "Beginner",
    "Home cook",
    "Professional",
    "Master chef",
  ];
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  async function onSubmit(dataSubmit: FormValues) {
    console.log("🚀 ~ onSubmit ~ dataSubmit:", dataSubmit);

    setLoading(true);
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });
    try {
      // await requestBecomeChef(dataSubmit);
      setDialogOpen(false);
      toast({
        title: "Success!",
        description: "Your request has been submitted.",
        variant: "successful",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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

      <DialogContent aria-describedby={undefined} className="p-0">
        <Scroll>
          <Form {...form}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 p-6">
              <DialogHeader>
                <DialogTitle className="tracking-unset leading-7">
                  Request to become a Chef
                </DialogTitle>
                <DialogDescription className="!mt-2">
                  Please provide some information about your cooking experience.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <FormField
                  name="level"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger
                            id={id}
                            ref={field.ref}
                            className="w-full">
                            <SelectValue placeholder="Select Difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceLevels.map((level, index) => (
                            <SelectItem key={index} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Desired Promotion Date</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div>
                              <CalendarButton value={field.value} />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>
                        Tell us about your cooking experience
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder={
                            "Share your cooking journey, specialties, or any relevant experience..."
                          }
                          className="h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <LoadingButton
                  label="Continue"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </DialogFooter>
            </form>
          </Form>
        </Scroll>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonRequestChef;
