"use client";

// ** React Imports
import { useState } from "react";

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
import { Fingerprint } from "lucide-react";

// ** Library Imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// ** Services
import { resetPassword } from "@/services/client/authService";

// ** Schema
const schema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password should be at least 6 characters long"),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ** Types
type FormData = z.infer<typeof schema>;
type Props = {
  handleNextStep: () => void;
  codeId: string;
};

const ResetPasswordStep = ({ codeId, handleNextStep }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [errorResponse, setErrorResponse] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setErrorResponse("");
    setLoading(true);
    try {
      await resetPassword({ codeId, ...data });
      handleNextStep();
    } catch (error) {
      setErrorResponse(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex justify-center">
        <Fingerprint className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-center text-2xl font-bold">Set new password</h3>
      <p className="text-center text-sm text-gray-500">
        Enter a new password for your account
      </p>

      <Form {...form}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 space-y-6">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <LoadingButton
              label="Reset password"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
            {errorResponse && (
              <p className="text-destructive">{errorResponse}</p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordStep;
