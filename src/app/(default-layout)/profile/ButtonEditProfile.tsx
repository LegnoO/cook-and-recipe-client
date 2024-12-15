"use client";

// ** React Imports
import { useState, useEffect, ChangeEvent } from "react";

// ** Components
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// ** Icons
import { CalendarIcon, Camera } from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { useAuthContext } from "@/context/AuthProvider";
import { cn, getCharInitials } from "@/lib/utils";
import { Scroll } from "../../../components/Scroll";

// ** Types
type Props = { userProfile: UserProfile };

// ** Schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.object({
    number: z.string().min(1, "House number is required"),
    street: z.string().min(1, "Street is required"),
    ward: z.string().min(1, "Ward is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  // dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;
type Avatar = { url: string; file: File | null };

const ButtonEditProfile = ({ userProfile }: Props) => {
  const { setUser } = useAuthContext();
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<Avatar>({
    url: "",
    file: null,
  });

  const [error, setError] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }
  function closeDialog() {
    setIsOpen(false);
  }

  async function onSubmit(dataSubmit: FormValues) {
    try {
      setLoading(true);
      setError("");
    } catch (error) {
      setError((prev) => (typeof error === "string" ? error : prev));
    } finally {
      setLoading(false);
    }
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar((prev) => ({ ...prev, url: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    form.setValue("fullName", userProfile.fullName, {
      shouldValidate: true,
    });
    form.setValue("email", userProfile.email, {
      shouldValidate: true,
    });
    // if (userProfile.dateOfBirth) {
    form.setValue("dateOfBirth", new Date("2024-10-15T20:46:43.587Z"), {
      shouldValidate: true,
    });
    // }

    form.setValue("address", userProfile.address, {
      shouldValidate: true,
    });
    form.setValue("gender", userProfile.gender, {
      shouldValidate: true,
    });
    form.setValue("phone", userProfile.phone, {
      shouldValidate: true,
    });
  }, [userProfile]);

  // console.log("🚀 ~ ButtonEditProfile ~ form:", form.getValues());
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="h-full max-h-[calc(100dvh-30px)] rounded-lg p-0 sm:max-w-[460px]">
        <Scroll>
          <DialogHeader className="p-6">
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 px-4 pb-6 pt-4">
              <div className="relative mx-auto">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    className="object-cover"
                    src={avatar.url ? avatar.url : userProfile.avatar}
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {getCharInitials(userProfile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-1 text-primary-foreground hover:bg-primary/90">
                  <Camera className="h-4 w-4" />
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <FormField
                name="fullName"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your fullName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                disabled
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal active:scale-100",
                              !field.value && "text-secondary",
                            )}>
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
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
                name="gender"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.ward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward</FormLabel>
                        <FormControl>
                          <Input placeholder="Central Ward" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder="Downtown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Metropolis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="!mt-8 flex justify-end gap-4">
                <Button onClick={closeDialog} type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Form>
        </Scroll>
      </DialogContent>
    </Dialog>
  );
};
export default ButtonEditProfile;
