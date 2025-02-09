"use client";

// ** React Imports
import { useState, ChangeEvent } from "react";

// ** Next Imports
import { useRouter } from "next/navigation";

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
import { Scroll } from "@/components/Scroll";
import CalendarButton from "@/components/CalendarButton";
import LoadingButton from "@/components/LoadingButton";
import { ToastAction } from "@/components/ui/toast";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Icons
import { Camera } from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

//** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Lib
import { appendFormData, cn, convertMBToBytes, getCharInitials } from "@/utils";

// ** Services
import { updateInfo } from "@/services/client/chefService";

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
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required.",
    })
    .nullable(),
  avatar: z.union([
    z.null(),
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= convertMBToBytes(5),
        `Max file size is 5MB.`,
      )
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .nullable(),
  ]),
});

type FormValues = z.infer<typeof formSchema>;
type Avatar = { url: string; file: File | null };

const ButtonEditProfile = ({ userProfile }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthContext();
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<Avatar>({
    url: "",
    file: null,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...userProfile,
      avatar: null,
      dateOfBirth: userProfile.dateOfBirth
        ? new Date(userProfile.dateOfBirth)
        : null,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }
  function closeDialog() {
    setIsOpen(false);
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (file) {
      form.setValue("avatar", file);
      setAvatar(() => ({ file, url: URL.createObjectURL(file) }));
    }
  }

  const renderAddressFields = () => {
    const fields = [
      {
        name: "address.number",
        label: "Number",
        placeholder: "123",
        column: 6,
      },
      {
        name: "address.street",
        label: "Street",
        placeholder: "Main St",
        column: 6,
      },
      {
        name: "address.ward",
        label: "Ward",
        placeholder: "Central Ward",
        column: 6,
      },
      {
        name: "address.district",
        label: "District",
        placeholder: "Downtown",
        column: 6,
      },
      { name: "address.city", label: "City", placeholder: "123", column: 12 },
    ];

    return (
      <div className="flex flex-wrap gap-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className={cn({
              "w-full md:w-[calc(50%-0.5rem)]": field.column !== 12,
              "w-full": field.column === 12,
            })}>
            <FormField
              control={form.control}
              name={field.name as `address.${keyof FormValues["address"]}`}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} placeholder={field.placeholder} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    );
  };

  async function onSubmit(dataSubmit: FormValues) {
    setLoading(true);
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });

    try {
      const formData = appendFormData({
        ...dataSubmit,
        avatar: dataSubmit.avatar,
        address: JSON.stringify(dataSubmit.address),
      });
      const newData = await updateInfo(formData);

      toast({
        title: "Success!",
        description: "Your request has been submitted.",
        variant: "successful",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setUser(newData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An error has occurred",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={openDialog}>Edit Profile</Button>
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
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Enter your email"
                        {...field}
                      />
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
                name="gender"
                control={form.control}
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
                {renderAddressFields()}
              </div>
              <div className="!mt-8 flex justify-end gap-4">
                <Button onClick={closeDialog} type="button" variant="outline">
                  Cancel
                </Button>
                <LoadingButton
                  label="Save changes"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </div>
            </form>
          </Form>
        </Scroll>
      </DialogContent>
    </Dialog>
  );
};
export default ButtonEditProfile;
