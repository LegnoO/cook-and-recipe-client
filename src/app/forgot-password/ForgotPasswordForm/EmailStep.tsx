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
import { requestReset } from "@/services/authService";

// ** Schemas
const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof schema>;

// ** Types
type Props = {
  onNextStep: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailStep = ({ onNextStep, setEmail }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { setError, control, handleSubmit } = form;

  const [isLoading, setLoading] = useState(false);

  async function onSubmit({ email }: FormData) {
    try {
      setLoading(true);
      setEmail(email);
      await requestReset(email);
      onNextStep();
    } catch (error) {
      if (error instanceof Error) setError("email", { message: error.message });
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
        {"No worries, we'll send you reset instructions."}
      </p>

      <Form {...form}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <FormField
              control={control}
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
          </div>

          <div className="flex flex-col gap-1">
            <LoadingButton
              label="Send OTP"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailStep;
