"use client";

// ** React Imports
import { useState, Dispatch, SetStateAction } from "react";

// ** Components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";

// ** Icons
import { MailQuestion } from "lucide-react";

// ** Library Imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// ** Services
import { requestReset } from "@/services/client/authService";

// ** Schema
const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

// ** Types
type FormData = z.infer<typeof schema>;
type Props = {
  handleNextStep: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailStep = ({ handleNextStep, setEmail }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit({ email }: FormData) {
    setLoading(true);
    try {
      setEmail(email);
      await requestReset(email);
      handleNextStep();
    } catch (error) {
      form.setError("email", {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex justify-center">
        <MailQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-center text-2xl font-bold">Forgot password?</h3>
      <p className="text-center text-sm text-muted-foreground">
        {"Enter your email below, and we’ll send you instructions to reset it."}
      </p>

      <Form {...form}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <LoadingButton
            label="Send OTP"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </form>
      </Form>
    </div>
  );
};

export default EmailStep;
